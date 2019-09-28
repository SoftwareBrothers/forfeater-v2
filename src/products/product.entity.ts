import { ApiModelProperty } from '@nestjs/swagger';
import { BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, Entity, JoinColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Vendor } from '../vendors/vendor.entity';
import { OrderProduct } from '../orders/order-product.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiModelProperty()
  id: number;

  @ManyToOne(type => Vendor, vendor => vendor.products, { eager: false, nullable: false })
  @JoinColumn({ name: 'vendor_id' })
  @ApiModelProperty()
  vendor: Vendor;

  @OneToMany(type => OrderProduct, orderProduct => orderProduct.product, { eager: false, nullable: false })
  orderProduct: OrderProduct[];

  @Column()
  @ApiModelProperty()
  name: string;

  @Column({ nullable: true })
  @ApiModelProperty()
  description: string;

  @Column({ name: 'require_description' })
  @ApiModelProperty()
  requireDescription: boolean;

  @Column({ name: 'is_vege' })
  @ApiModelProperty()
  isVege: boolean;

  @Column({ name: 'is_vegan' })
  @ApiModelProperty()
  isVegan: boolean;

  @CreateDateColumn({ name: 'created_at' })
  @ApiModelProperty()
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiModelProperty()
  updatedAt: string;
}
