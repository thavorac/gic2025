import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ParseDobPipe } from './pipes/parseDobPipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('validation')
  testValidation(@Body('dob', ParseDobPipe) dob: Date): { dob: Date } {
    return { dob };
  }
}
