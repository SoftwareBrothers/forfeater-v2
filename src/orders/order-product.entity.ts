import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../products/product.entity';

@Entity()
export class OrderProduct extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Order, order => order.order_product, { eager: true, nullable: false })
  @JoinColumn({ name: 'order_id' })
  orderId: Order;

  @ManyToOne(type => Product, product => product.order_product, { eager: true, nullable: false })
  @JoinColumn({ name: 'product_id' })
  productId: Product;
}
