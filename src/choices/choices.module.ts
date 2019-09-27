import { Module } from '@nestjs/common';
import { ChoicesController } from './choices.controller';
import { ChoicesService } from './choices.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChoiceRepository } from './choice.repository';
import { OrderRepository } from '../orders/order.repository';
import { ProductRepository } from '../products/product.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChoiceRepository, OrderRepository, ProductRepository]),
    AuthModule
  ],
  controllers: [ChoicesController],
  providers: [ChoicesService]
})
export class ChoicesModule {}
