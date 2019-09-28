import { ApiModelProperty } from '@nestjs/swagger';
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany, } from 'typeorm';
import { Product } from '../products/product.entity';
import { Order } from '../orders/order.entity';

@Entity()
export class Vendor extends BaseEntity {
  @ApiModelProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiModelProperty()
  name: string;

  @Column({ nullable: true })
  @ApiModelProperty()
  url: string;

  @Column({ nullable: true, name: 'logo_url' })
  @ApiModelProperty()
  logoUrl: string;

  @OneToMany(type => Product, product => product.vendor)
  products: Product[];

  @OneToMany(type => Order, order => order.owner)
  orders: Order[];

  @CreateDateColumn({ name: 'created_at' })
  @ApiModelProperty()
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiModelProperty()
  updatedAt: string;
}
