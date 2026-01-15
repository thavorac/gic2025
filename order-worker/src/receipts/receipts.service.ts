import { Injectable } from '@nestjs/common';

@Injectable()
export class ReceiptsService {
  hello() {
    return 'Hello from ReceiptsService';
  }
}
