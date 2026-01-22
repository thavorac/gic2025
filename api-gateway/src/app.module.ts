import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthIntrospectionService } from './auth/auth-introspection.service';
import { ProxyService } from './proxy/proxy.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService, ProxyService, AuthIntrospectionService],
})
export class AppModule {}
