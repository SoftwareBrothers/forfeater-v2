import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { User } from '../auth/user.entity';
import { VendorRepository } from '../vendors/vendor.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.entity';
import { List } from '../types/generic-list.interface';
import { OrderProduct } from './order-product.entity';
import { OrderListFilterDto } from './dto/order-list-filter.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderRepository)
    private readonly orderRepository: OrderRepository,
    @InjectRepository(VendorRepository)
    private readonly vendorRepository: VendorRepository
  ) { }

  async createOrder(user: User, createOrderDto: CreateOrderDto) {
    return this.orderRepository.createOrder(user, createOrderDto);
  }

  async getAllOrders(user: User, orderListFilterDto: OrderListFilterDto = {}): Promise<List<Order>> {
    const orders = await this.orderRepository.getAllOrders(user, orderListFilterDto);
    return {
      items: orders.map(this.mapOrderProducts)
    };
  }

  async getOrderById(id: number, user: User): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id, user }, relations: ['owner', 'vendor', 'order_product'] });
    if (!order) {
      throw new NotFoundException(`Order (id ${id}) not found`);
    }
    return this.mapOrderProducts(order);
  }

  private mapOrderProducts(order: Order): Order {
    const { order_product, ...rest } = order;
    return {
      ...rest,
      products: order_product.map(orderProduct => orderProduct.product)
    } as any as Order;
  }
}
