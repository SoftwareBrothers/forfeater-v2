import { Injectable, NotFoundException } from '@nestjs/common';
import { VendorDto } from './dto/vendor.dto';
import { VendorRepository } from './vendor.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Vendor } from './vendor.entity';
import { List } from '../types/generic-list.interface';

@Injectable()
export class VendorsService {

  constructor(
    @InjectRepository(VendorRepository)
    private readonly vendorRepository: VendorRepository,
  ) {}

  async createVendor(createVendorDto: VendorDto): Promise<Vendor> {
    return this.vendorRepository.create(createVendorDto);
  }

  async deleteVendor(id: number): Promise<void> {
    const result = await this.vendorRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Vendor (id ${id}) not found`);
    }
  }

  async getAllVendors(): Promise<List<Vendor>> {
    const vendors = await this.vendorRepository.find();

    return {
      items: vendors
    };
  }

  async getVendorById(id: number): Promise<Vendor> {
    const vendor = await this.vendorRepository.findOne({ where: { id } });

    if (!vendor) {
      throw new NotFoundException(`Vendor (id ${id}) not found`);
    }

    return vendor;
  }

  async updateVendor(id: number, vendorDto: VendorDto): Promise<Vendor> {
    const vendor = await this.getVendorById(id);
    const { name }: VendorDto = vendorDto;
    vendor.name = name;

    await vendor.save();

    return vendor;
  }
}
