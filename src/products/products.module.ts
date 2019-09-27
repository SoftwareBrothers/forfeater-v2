import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { AuthModule } from '../auth/auth.module';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductRepository]),
    AuthModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule { }
