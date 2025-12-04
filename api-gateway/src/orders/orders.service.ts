import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
  constructor(@Inject('ORDERS_SERVICE') private readonly client: ClientProxy) {}

  createOrder(orderDto: any) {
    // In real life we might validate or save to DB first
    // Here we just emit an event
    this.client.emit('order_created', orderDto);
    console.log('emit order_created');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { status: 'Order accepted', order: orderDto };
  }
}
