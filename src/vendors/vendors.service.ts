import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { VendorRepository } from './vendor.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Vendor } from './vendor.entity';

@Injectable()
export class VendorsService {

  constructor(
    @InjectRepository(VendorRepository)
    private vendorRepository: VendorRepository,
  ) {}

  async getVendors(): Promise<Vendor[]> {
    return this.vendorRepository.findAll();
  }

  // async getVendorById(id: number): Promise<Vendor> {
  //   const found = await this.vendorRepository.findOne(id);

  //   if (!found) {
  //     throw new NotFoundException(`Vendor (id ${id}) not found`);
  //   }

  //   return found;
  // }

  async createVendor(createVendorDto: CreateVendorDto): Promise<Vendor> {
    return this.vendorRepository.create(createVendorDto);
  }

  // async deleteVendor(id: number): Promise<void> {
  //   const result = await this.vendorRepository.delete(id);

  //   if (result.affected === 0) {
  //     throw new NotFoundException(`Vendor (id ${id}) not found`);
  //   }

  // }
}
