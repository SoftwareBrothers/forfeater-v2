import { ApiModelProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { User } from '../auth/user.entity';
import { Vendor } from '../vendors/vendor.entity';
import { OrderProduct } from './order-product.entity';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiModelProperty()
  id: number;

  @ManyToOne(type => User, user => user.orders, { eager: false, nullable: false })
  @JoinColumn({ name: 'owner_id' })
  @ApiModelProperty()
  owner: User;

  @OneToMany(type => OrderProduct, orderProduct => orderProduct.order, { eager: false, nullable: false })
  orderProduct: OrderProduct[];

  @ManyToOne(type => Vendor, vendor => vendor.products, { eager: false, nullable: false })
  @JoinColumn({ name: 'vendor_id' })
  @ApiModelProperty()
  vendor: Vendor;

  @Column({ name: 'deadline_at' })
  @ApiModelProperty()
  deadlineAt: Date;

  @Column({ name: 'delivery_at' })
  @ApiModelProperty()
  deliveryAt: Date;
}
