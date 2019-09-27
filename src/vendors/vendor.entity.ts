import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany, } from 'typeorm';
import { Product } from '../products/product.entity';
import { Order } from '../orders/order.entity';

@Entity()
export class Vendor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  logo_url: string;

  @OneToMany(type => Product, product => product.vendor)
  products: Product[];

  @OneToMany(type => Order, order => order.owner)
  orders: Order[];

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
