/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  All,
  Controller,
  Get,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { ProxyService } from './proxy/proxy.service';
import { Request, Response } from 'express';
import { AuthIntrospectionService } from './auth/auth-introspection.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private config: ConfigService,
    private proxy: ProxyService,
    private auth: AuthIntrospectionService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @All('*')
  async routeAll(@Req() req: Request, @Res() res: Response) {
    // Example paths:
    // /api/auth/login
    // /api/orders
    // /api/orders/123

    // const full = req.originalUrl; // includes query
    const pathOnly = req.path; // without query
    const afterApi = pathOnly.replace(/^\/api\//, ''); // e.g. "orders/123"

    const [serviceKey, ...rest] = afterApi.split('/');
    const forwardPath = '/' + rest.join('/'); // e.g. "/123" or "/"

    const route = this.resolveRoute(serviceKey);
    if (!route) {
      return res.status(404).json({ message: `Unknown route: ${serviceKey}` });
    }

    // --- Gateway Feature 1: Authentication enforcement (for protected routes)
    let user: any = null;
    const authHeader = req.headers['authorization'] as string | undefined;

    if (route.protected) {
      const token = this.auth.extractBearerToken(authHeader);
      if (!token) throw new UnauthorizedException('Missing Bearer token');

      const payload = await this.auth.validate(token);
      user = payload.user ?? payload;
    }

    // --- Gateway Feature 2: Forward request to target service
    const upstream = await this.proxy.forward({
      baseUrl: route.baseUrl,
      method: req.method,
      path: forwardPath === '/' ? '' : forwardPath,
      headers: {
        ...req.headers,
        // --- Gateway Feature 3: propagate identity for internal services (demo-friendly)
        ...(user
          ? {
              'x-user-id': user.id,
              'x-user-email': user.email,
              'x-user-roles': JSON.stringify(user.roles ?? []),
            }
          : {}),
      },
      query: req.query,
      body: req.body,
    });

    // --- Gateway Feature 4: basic response pass-through
    res.status(upstream.status);
    return res.send(upstream.data);
  }

  private resolveRoute(
    serviceKey: string,
  ): null | { baseUrl: string; protected: boolean } {
    switch (serviceKey) {
      case 'auth':
        return {
          baseUrl: this.config.get<string>('AUTH_SERVICE_URL')!,
          protected: false,
        };
      case 'orders':
        return {
          baseUrl: this.config.get<string>('ORDER_SERVICE_URL')!,
          protected: true,
        };
      default:
        return null;
    }
  }
}
