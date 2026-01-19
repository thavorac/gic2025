import { Injectable } from '@nestjs/common';
import { Receipt } from './types/receipt.types';

@Injectable()
export class ReceiptsService {
  private receipts: Receipt[] = [
    {
      receiptId: 'R-1001',
      name: 'Office Chair',
      price: 120.5,
      issuedAt: new Date('2026-01-10T09:00:00.000Z').toISOString(),
    },
    {
      receiptId: 'R-1002',
      name: 'Keyboard',
      price: 35.0,
      issuedAt: new Date('2026-01-12T12:30:00.000Z').toISOString(),
    },
  ];
  hello() {
    return 'Hello from ReceiptsService';
  }

  findAll(): Receipt[] {
    return this.receipts ?? []; // never return null/undefined
  }
}
