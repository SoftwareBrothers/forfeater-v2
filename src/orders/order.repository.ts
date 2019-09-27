import { EntityRepository, Repository } from 'typeorm';
import { Order } from './order.entity';
import { User } from 'src/auth/user.entity';
import { Vendor } from 'src/vendors/vendor.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  async createOrder(user: User, vendor: Vendor) {
    const order = new Order();
    order.deadline_at = new Date();
    order.delivery_at = new Date();
    order.owner = user;
    order.vendor = vendor;

    await order.save();
    return order;
  }
}
