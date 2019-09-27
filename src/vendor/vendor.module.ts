import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorController } from './vendor.controller';
import { VendorRepository } from './vendor.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([VendorRepository]),
  ],
  controllers: [VendorController],
  providers: [
  ],
  exports: [
  ],
})
export class VendorModule { }
