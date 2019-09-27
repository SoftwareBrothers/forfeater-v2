import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { User } from '../auth/user.entity';
import { Vendor } from '../vendors/vendor.entity';
import { Product } from '../products/product.entity';
import { OrderProduct } from './order-product.entity';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToMany(type => Product)
  // @JoinTable({ name: 'order_product' })
  // products: Product[];

  @ManyToOne(type => User, user => user.orders, { eager: false, nullable: false })
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @OneToMany(type => OrderProduct, orderProduct => orderProduct.order, { eager: false, nullable: false })
  order_product: OrderProduct[];

  @ManyToOne(type => Vendor, vendor => vendor.products, { eager: false, nullable: false })
  @JoinColumn({ name: 'vendor_id' })
  vendor: Vendor;

  @Column()
  deadline_at: Date;

  @Column()
  delivery_at: Date;
}
