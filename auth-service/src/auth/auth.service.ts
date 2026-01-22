/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';

import { User } from './entities/user.entity';
import { UserRole } from './entities/user-role.entity';
import { RolePermission } from './entities/role-permission.entity';
import { RefreshToken } from './entities/refresh-token.entity';
import { Role } from './entities/role.entity'; // ✅ add this entity

function parseDurationToMs(input: string): number {
  // Supports: "15m", "12h", "7d", "30s", "1w"
  // If number only, treat as seconds.
  const s = (input ?? '').trim();
  if (!s) return 7 * 24 * 60 * 60 * 1000;

  const m = /^(\d+)\s*([smhdw])?$/i.exec(s);
  if (!m) return 7 * 24 * 60 * 60 * 1000;

  const value = Number(m[1]);
  const unit = (m[2] ?? 's').toLowerCase();

  const multipliers: Record<string, number> = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
    w: 7 * 24 * 60 * 60 * 1000,
  };

  return value * (multipliers[unit] ?? 1000);
}

function parseExpiresToSeconds(
  input?: string,
  fallbackSeconds = 15 * 60,
): number {
  if (!input) return fallbackSeconds;

  const s = input.trim();
  const m = /^(\d+)\s*([smhdw])?$/i.exec(s);
  if (!m) return fallbackSeconds;

  const value = Number(m[1]);
  const unit = (m[2] ?? 's').toLowerCase();

  const multipliers: Record<string, number> = {
    s: 1,
    m: 60,
    h: 60 * 60,
    d: 24 * 60 * 60,
    w: 7 * 24 * 60 * 60,
  };

  return value * (multipliers[unit] ?? 1);
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,

    @InjectRepository(User)
    private readonly users: Repository<User>,

    @InjectRepository(Role)
    private readonly roles: Repository<Role>, // ✅ added

    @InjectRepository(UserRole)
    private readonly userRoles: Repository<UserRole>,

    @InjectRepository(RolePermission)
    private readonly rolePerms: Repository<RolePermission>,

    @InjectRepository(RefreshToken)
    private readonly refreshTokens: Repository<RefreshToken>,
  ) {}

  async register(email: string, password: string) {
    // ✅ TODO: check if email exists
    const existing = await this.users.findOne({ where: { email } });
    if (existing) throw new ConflictException('Email already exists');

    const passwordHash = await bcrypt.hash(password, 10);

    // We'll do user + role attach in one transaction
    await this.users.manager.transaction(async (manager) => {
      const userRepo = manager.getRepository(User);
      const roleRepo = manager.getRepository(Role);
      const userRoleRepo = manager.getRepository(UserRole);

      // ✅ TODO: create user
      const user = userRepo.create({ email, passwordHash, isActive: true });
      const savedUser = await userRepo.save(user);

      // ✅ TODO: attach default role "user" in user_roles
      const defaultRoleName = 'user';
      const role = await roleRepo.findOne({ where: { name: defaultRoleName } });
      if (!role) {
        // This forces students to seed roles first (recommended)
        throw new ConflictException(
          `Default role "${defaultRoleName}" not found. Seed roles first.`,
        );
      }

      const ur = userRoleRepo.create({ user: savedUser, role });
      await userRoleRepo.save(ur);
    });

    return { message: 'registered' };
  }

  async login(email: string, password: string) {
    const user = await this.users.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    // Fetch roles
    const roles = await this.userRoles.find({
      where: { user: { id: user.id } },
      relations: { role: true, user: true },
    });
    const roleNames = roles.map((r) => r.role.name);

    // Fetch permissions via roles (avoid IN () when empty)
    const roleIds = roles.map((r) => r.role.id);
    let permissionKeys: string[] = [];

    if (roleIds.length > 0) {
      const perms = await this.rolePerms
        .createQueryBuilder('rp')
        .leftJoinAndSelect('rp.permission', 'permission')
        .where('rp.roleId IN (:...roleIds)', { roleIds })
        .getMany();

      permissionKeys = [...new Set(perms.map((x) => x.permission.key))];
    }

    const accessExpiresIn = parseExpiresToSeconds(
      process.env.JWT_ACCESS_EXPIRES,
      15 * 60,
    );

    const accessToken = await this.jwt.signAsync(
      {
        sub: user.id,
        email: user.email,
        roles: roleNames,
        permissions: permissionKeys,
      },
      {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: accessExpiresIn, // ✅ number (seconds)
      },
    );

    const refreshToken = randomBytes(48).toString('hex');
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

    // ✅ TODO: store refresh token hash + compute expiresAt
    const refreshMs = parseDurationToMs(
      process.env.JWT_REFRESH_EXPIRES ?? '7d',
    );
    const expiresAt = new Date(Date.now() + refreshMs);

    await this.refreshTokens.save(
      this.refreshTokens.create({
        user: { id: user.id } as any, // works if relation is ManyToOne(User)
        tokenHash: refreshTokenHash,
        expiresAt,
        revokedAt: null,
      }),
    );

    return { accessToken, refreshToken };
  }
}
