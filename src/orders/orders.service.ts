import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { User } from '../auth/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './order.entity';
import { List } from '../types/generic-list.interface';
import { OrderListFilterDto } from './dto/order-list-filter.dto';
import { SlackService } from '../slack/slack.service';
import { VendorRepository } from '../vendors/vendor.repository';
import moment from 'moment';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderRepository)
    private readonly orderRepository: OrderRepository,
    private readonly vendorRepository: VendorRepository,
    private readonly slackService: SlackService,
  ) { }

  async createOrder(user: User, createOrderDto: CreateOrderDto) {
    const { vendor: vendorId } = createOrderDto;
    const vendor = await this.vendorRepository.findOne(+vendorId);

    const order = await this.orderRepository.createOrder(user, createOrderDto, vendor);
    const formattedDeadline = moment(order.deadlineAt).locale('pl');
    const formattedDelivery = moment(order.deliveryAt).locale('pl');
    const message = [
      { text: `[TEST] W ${formattedDelivery.format('dddd DD MMMM')} retro, więc czas na wybór dań po retro :alert: Zamawiamy z ${order.vendor.name} :smile: Zbieram zamówienia do ${formattedDeadline.format('HH:mm DD MMMM')}, jemy ${formattedDelivery.format('HH:mm DD MMMM')}. :arrow_right:` },
      { text: `http://forfeater.com/orders/${order.id}` }
    ];
    this.slackService.postMessage(message);

    return order;
  }

  async getAllOrders(user: User, orderListFilterDto: OrderListFilterDto = {}): Promise<List<Order>> {
    const orders = await this.orderRepository.getAllOrders(user, orderListFilterDto);

    return {
      items: orders.map(this.mapOrderProducts)
    };
  }

  async getOrderById(id: number, user: User): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id, user }, relations: ['owner', 'vendor', 'orderProduct'] });
    if (!order) {
      throw new NotFoundException(`Order (id ${id}) not found`);
    }

    return order;
  }

  async show(id: number, user: User): Promise<Order> {
    const order = await this.getOrderById(id, user);

    return this.mapOrderProducts(order);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto, user: User): Promise<Order> {
    const order = await this.getOrderById(id, user);
    const { deadlineAt, deliveryAt }: UpdateOrderDto = updateOrderDto;
    order.deadlineAt = deadlineAt;
    order.deadlineAt = deliveryAt;

    await order.save();

    return order;
  }

  private mapOrderProducts(order: Order): Order {
    const { orderProduct, ...rest } = order;

    return {
      ...rest,
      products: orderProduct.map(orderProduct => orderProduct.product)
    } as any as Order;
  }
}
