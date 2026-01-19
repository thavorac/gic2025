import { Module } from '@nestjs/common';
import { ReceiptsController } from './receipts.controller';
import { ReceiptsService } from './receipts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt } from 'src/database/entities/receipts.entity';
import { ReceiptResolver } from './receipt.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Receipt])],
  providers: [ReceiptsService, ReceiptResolver],
  controllers: [ReceiptsController],
})
export class ReceiptsModule {}
