import { BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, Entity, JoinColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Vendor } from '../vendors/vendor.entity';
import { Order } from '../orders/order.entity';
import { OrderProduct } from '../orders/order-product.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Vendor, vendor => vendor.products, { eager: false, nullable: false })
  @JoinColumn({ name: 'vendor_id' })
  vendor: Vendor;

  // @ManyToMany(type => Order)
  // orders: Order[];
  @OneToMany(type => OrderProduct, orderProduct => orderProduct.product, { eager: false, nullable: false })
  order_product: OrderProduct[];

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  require_description: boolean;

  @Column()
  is_vege: boolean;

  @Column()
  is_vegan: boolean;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
