import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
  constructor(@Inject('ORDERS_SERVICE') private readonly client: ClientProxy) {}

  createOrder(orderDto: any) {
    console.log('emit order_created 22');
    this.client.emit('order_created', '');

    const bar = () => console.log('bar');
    const baz = () => console.log('baz');
    const foo = () => {
      console.log('foo');
      bar();
      baz();
    };
    foo();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { status: 'Order accepted', order: orderDto };
  }

  deleteOrder() {
    this.client.emit('order_deleted', '');
    return { status: 'Order delted' };
  }
}
