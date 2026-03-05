import { Body, Controller, Post, Query } from '@nestjs/common';

@Controller('api')
export class DogsController {
  // POST /api/dogs
  @Post('dogs')
  createDog(@Body() body: any, @Query() query: any): string {
    console.log(body);
    console.log(query);
    return 'This action adds a new dog';
  }
}
