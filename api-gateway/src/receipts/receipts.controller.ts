import { Controller, Get, Post } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';

@Controller()
export class ReceiptsController {
  // Inject ReceiptsService inside your controller
  constructor(private readonly receiptService: ReceiptsService) {}

  // Define get endpoint for receipts
  @Get('receipts') // GET http://localhost:3000/receipts
  getAllReceipts() {
    return this.receiptService.hello();
  }

  @Post('receipts') // POST http://localhost:3000/receipts
  createReceipt() {
    return 'Create receipt';
  }
}
