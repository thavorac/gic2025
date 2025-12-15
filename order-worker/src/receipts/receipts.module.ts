import { Module } from '@nestjs/common';
import { ReceiptsController } from './receipts.controller';

@Module({
  providers: [],
  controllers: [ReceiptsController],
})
export class ReceiptsModule {}
