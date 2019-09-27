import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorController } from './vendors.controller';
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
  controllers: [VendorController],
  providers: [
    ProductsService,
    VendorsService
  ],
  exports: [
  ],
})
export class VendorModule { }
