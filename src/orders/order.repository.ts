import { EntityRepository, Repository } from 'typeorm';
import { Order } from './order.entity';
import { User } from '../auth/user.entity';
import { Vendor } from '../vendors/vendor.entity';
import { OrderProduct } from './order-product.entity';
import { Product } from '../products/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  private async createProducts(order: Order, productIds: Number[]): Promise<OrderProduct[]> {
    return Promise.all(productIds.map(id => {
      const orderProduct = new OrderProduct();
      orderProduct.product = id as any as Product;
      orderProduct.order = order.id as any as Order;
      return orderProduct.save();
    }));
  }

  // async createOrder(user: User, vendor: Vendor, products: Number[]): Promise<Order> {
  async createOrder(user: User, createOrderDto: CreateOrderDto): Promise<Order> {
    const { vendor, products, deadlineAt, deliveryAt } = createOrderDto;

    console.log(deadlineAt, typeof deadlineAt, deadlineAt instanceof Date);
    console.log(deliveryAt, typeof deliveryAt, deliveryAt instanceof Date);
    const order = new Order();
    order.deadline_at = deadlineAt;
    order.delivery_at = deliveryAt;
    order.owner = user;
    order.vendor = vendor as any as Vendor;

    await order.save();
    await this.createProducts(order, products);
    return order;
  }

  async getAllOrders(user: User): Promise<Order[]> {
    return this.find({ where: { user }, relations: ['owner', 'vendor', 'order_product'] });
  }
}
