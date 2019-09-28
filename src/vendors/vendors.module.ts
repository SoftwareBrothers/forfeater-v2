import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorsController } from './vendors.controller';
import { ProductsController } from './products.controller';
import { VendorRepository } from './vendor.repository';
import { AuthModule } from '../auth/auth.module';
import { VendorsService } from './vendors.service';
import { ProductsService } from '../products/products.service';
import { ProductRepository } from '../products/product.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductRepository, VendorRepository]),
    AuthModule,
  ],
  controllers: [ProductsController, VendorsController],
  providers: [
    ProductsService,
    VendorsService
  ],
  exports: [
  ],
})
export class VendorModule { }
