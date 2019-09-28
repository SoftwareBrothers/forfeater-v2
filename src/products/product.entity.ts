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

  @OneToMany(type => OrderProduct, orderProduct => orderProduct.product, { eager: false, nullable: false })
  orderProduct: OrderProduct[];

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ name: 'require_description' })
  requireDescription: boolean;

  @Column({ name: 'is_vege' })
  isVege: boolean;

  @Column({ name: 'is_vegan' })
  isVegan: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
