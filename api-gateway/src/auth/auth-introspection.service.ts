/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthIntrospectionService {
  constructor(
    private http: HttpService,
    private config: ConfigService,
  ) {}

  private get authUrl(): string {
    const url = this.config.get<string>('AUTH_SERVICE_URL');
    if (!url) {
      throw new Error('AUTH_SERVICE_URL is not defined in configuration');
    }
    return url;
  }

  extractBearerToken(authHeader?: string) {
    if (!authHeader?.startsWith('Bearer ')) return null;
    return authHeader.slice('Bearer '.length);
  }

  async validate(token: string) {
    try {
      // auth-service endpoint we'll build: GET /auth/me
      const res = await firstValueFrom(
        this.http.get(`${this.authUrl}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 4000,
        }),
      );
      // expected: { user: { id, email, roles } }
      return res.data;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
