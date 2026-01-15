import { Controller, Get } from '@nestjs/common';

@Controller('receipts')
export class ReceiptsController {
  // Define get endpoint for receipts
  @Get()
  getAllReceipts() {
    return 'Get receipts';
  }
}
