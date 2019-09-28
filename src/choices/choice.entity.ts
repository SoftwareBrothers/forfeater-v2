import { BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, Entity, JoinColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Order } from '../orders/order.entity';
import { Product } from '../products/product.entity';
import { User } from '../auth/user.entity';

@Entity()
export class Choice extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, user => user.choices, { eager: false, nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(type => Order, order => order.choices, { eager: false, nullable: false })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(type => Product, product => product.choices, { eager: false, nullable: false })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  comment: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
