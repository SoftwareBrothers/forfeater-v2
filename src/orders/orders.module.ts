import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { VendorRepository } from '../vendors/vendor.repository';
import { AuthModule } from '../auth/auth.module';
import { SlackModule } from '../slack/slack.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderRepository, VendorRepository]),
    AuthModule,
    SlackModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule { }
