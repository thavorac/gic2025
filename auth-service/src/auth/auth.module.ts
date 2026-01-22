import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { UserRole } from './entities/user-role.entity';
import { RolePermission } from './entities/role-permission.entity';
import { RefreshToken } from './entities/refresh-token.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

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

  const mult: Record<string, number> = {
    s: 1,
    m: 60,
    h: 3600,
    d: 86400,
    w: 604800,
  };

  return value * (mult[unit] ?? 1);
}

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Role,
      Permission,
      UserRole,
      RolePermission,
      RefreshToken,
    ]),

    // ✅ JwtService provider
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        secret: cfg.get<string>('JWT_ACCESS_SECRET', 'dev_access_secret'),
        signOptions: {
          expiresIn: parseExpiresToSeconds(
            cfg.get<string>('JWT_ACCESS_EXPIRES'),
            15 * 60,
          ), // ✅ number
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
