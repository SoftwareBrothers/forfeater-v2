import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { User } from '../auth/user.entity';
import { Vendor } from '../vendors/vendor.entity';
import { Order } from './order.entity';
import { VendorRepository } from '../vendors/vendor.repository';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderRepository)
    private readonly orderRepository: OrderRepository,
    @InjectRepository(VendorRepository)
    private readonly vendorRepository: VendorRepository
  ) { }

  async createOrder(user: User, createOrderDto: CreateOrderDto) {
    const { vendor: vendorId } = createOrderDto;
    const vendor = await this.vendorRepository.findOne(vendorId);
    this.orderRepository.createOrder(user, vendor);
  }
}
