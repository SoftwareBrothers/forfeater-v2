import { Module } from '@nestjs/common';
import { ChoicesController } from './choices.controller';
import { ChoicesService } from './choices.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChoiceRepository } from './choice.repository';
import { OrderRepository } from '../orders/order.repository';
import { ProductRepository } from '../products/product.repository';
import { VendorRepository } from '../vendors/vendor.repository';
import { ProductsService } from '../products/products.service';
import { OrdersService } from '../orders/orders.service';
import { SlackService } from '../slack/slack.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChoiceRepository, OrderRepository, ProductRepository]),
    AuthModule
  ],
  controllers: [ChoicesController],
  providers: [ChoicesService, ProductsService]
})
export class ChoicesModule {}
