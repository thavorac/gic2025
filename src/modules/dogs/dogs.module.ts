import { Module } from '@nestjs/common';
import { DogsController } from './dogs.controller';

@Module({
  controllers: [DogsController],
  providers: [],
  exports: [],
})
export class DogsModule {}
