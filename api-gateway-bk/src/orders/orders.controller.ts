import { Body, Controller, Delete, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { DobPipe } from 'src/common/pipes/dob.pipe';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() body: any) {
    console.log('orderController create() is called');
    return this.ordersService.createOrder(body);
  }

  @Delete()
  delete() {
    console.log('Delete order!');
    return this.ordersService.deleteOrder();
  }

  @Post('test-dob')
  testDob(@Body('dob', new DobPipe()) dob: string) {
    console.log('Testing DOB:', dob);
    return { message: `Received DOB: ${dob}` };
  }
}
