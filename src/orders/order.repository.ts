import { EntityRepository, Repository } from 'typeorm';
import { Order } from './order.entity';
import { User } from '../auth/user.entity';
import { Vendor } from '../vendors/vendor.entity';
import { OrderProduct } from './order-product.entity';
import { Product } from '../products/product.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  private async createProducts(order: Order, productIds: Number[]) {
    return Promise.all(productIds.map(id => {
      const orderProduct = new OrderProduct();
      orderProduct.product = id as any as Product;
      orderProduct.order = order.id as any as Order;
      return orderProduct.save();
    }));
  }
  async createOrder(user: User, vendor: Vendor, products: Number[]) {
    const order = new Order();
    order.deadline_at = new Date();
    order.delivery_at = new Date();
    order.owner = user;
    order.vendor = vendor;

    await order.save();
    await this.createProducts(order, products);
    return order;
  }
}
