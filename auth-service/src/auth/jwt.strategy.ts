/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(cfg: ConfigService) {
    const secret = cfg.get<string>('JWT_ACCESS_SECRET');
    if (!secret) {
      // Fail fast with a clear message
      throw new Error(
        'JWT_ACCESS_SECRET is missing (ConfigService returned empty)',
      );
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret, // ✅ guaranteed defined
      ignoreExpiration: false,
    });
  }

  validate(payload: any) {
    return payload; // becomes req.user
  }
}
