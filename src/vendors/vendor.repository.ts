import { Repository, EntityRepository } from 'typeorm';
import { Vendor } from './vendor.entity';
import { CreateVendorDto } from './dto/create-vendor.dto';

@EntityRepository(Vendor)
export class VendorRepository extends Repository<Vendor> {
  async create(createVendorDto: CreateVendorDto): Promise<Vendor> {
    const vendor = this.create(createVendorDto);

    await this.save(vendor);
  }

  async findAll(): Promise<Vendor[]> {
    return this.find();
  }

  async findById(vendorId: number): Promise<Vendor> {
    return this.findOne(vendorId);
  }
}
