import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../products/product.entity';

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Order, order => order.order_product, { eager: false, nullable: false })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(type => Product, product => product.order_product, { eager: false, nullable: false })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
