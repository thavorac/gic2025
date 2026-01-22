/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, BadGatewayException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { GatewayResponse } from './proxy.types';

@Injectable()
export class ProxyService {
  constructor(private http: HttpService) {}

  async forward<T = any>(options: {
    baseUrl: string;
    method: string;
    path: string;
    headers: Record<string, any>;
    query: any;
    body: any;
  }): Promise<GatewayResponse<T>> {
    const url = `${options.baseUrl}${options.path}`;

    try {
      const res = await firstValueFrom(
        this.http.request<T>({
          url,
          method: options.method as any,
          params: options.query,
          data: options.body,
          headers: options.headers,
          validateStatus: () => true,
        }),
      );

      return {
        status: res.status,
        data: res.data,
      };
    } catch {
      throw new BadGatewayException('Upstream service unavailable');
    }
  }
}
