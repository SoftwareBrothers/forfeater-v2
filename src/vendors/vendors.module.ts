import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorController } from './vendors.controller';
import { VendorRepository } from './vendor.repository';
import { AuthModule } from '../auth/auth.module';
import { VendorsService } from './vendors.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([VendorRepository]),
    AuthModule,
  ],
  controllers: [VendorController],
  providers: [
    VendorsService
  ],
  exports: [
  ],
})
export class VendorModule { }
