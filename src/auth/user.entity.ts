import bcrypt from 'bcrypt';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn, Exclusion } from 'typeorm';
import { Order } from '../orders/order.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ select: false })
  hash: string;

  @OneToMany(type => Order, order => order.owner)
  orders: Order[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.hash);
    return hash === this.password;
  }
}
