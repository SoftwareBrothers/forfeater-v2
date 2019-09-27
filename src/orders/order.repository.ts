import { EntityRepository, Repository, MoreThan } from 'typeorm';
import { Order } from './order.entity';
import { User } from '../auth/user.entity';
import { Vendor } from '../vendors/vendor.entity';
import { OrderProduct } from './order-product.entity';
import { Product } from '../products/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderListFilterDto } from './dto/order-list-filter.dto';

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

  async createOrder(user: User, createOrderDto: CreateOrderDto): Promise<Order> {
    const { vendor, products, deadlineAt, deliveryAt } = createOrderDto;

    const order = new Order();
    order.deadline_at = deadlineAt;
    order.delivery_at = deliveryAt;
    order.owner = user;
    order.vendor = vendor as any as Vendor;

    await order.save();
    await this.createProducts(order, products);
    return order;
  }

  async getAllOrders(user: User, orderListFilterDto: OrderListFilterDto): Promise<Order[]> {
    const { active } = orderListFilterDto;
    const condition: any = { user };

    if (active) {
      condition.deadline_at = MoreThan(new Date().toISOString());
    }
    return this.find({ where: condition, relations: ['owner', 'vendor', 'order_product'] });
  }
}
