import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../products/product.entity';

@Entity()
export class OrderProduct extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Order, order => order.orderProduct, { eager: true, nullable: false })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(type => Product, product => product.orderProduct, { eager: true, nullable: false })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
