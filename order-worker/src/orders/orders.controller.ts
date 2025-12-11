/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Body, Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { EventPattern } from '@nestjs/microservices';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @EventPattern('order_created')
  handleOrderCreated() {
    console.log('incmoing message - order_created - controller');

    // const channel = context.getChannelRef();
    // const originalMsg = context.getMessage();
    // channel.ack(originalMsg);
  }
}
