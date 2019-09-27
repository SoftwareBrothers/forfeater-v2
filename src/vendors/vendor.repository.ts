import { Repository, EntityRepository } from 'typeorm';
import { Vendor } from './vendor.entity';
import { VendorDto } from './dto/vendor.dto';

@EntityRepository(Vendor)
export class VendorRepository extends Repository<Vendor> {
  async create(vendorDto: VendorDto): Promise<Vendor> {
    const { name, url, logoUrl }: VendorDto = vendorDto;
    const vendor = new Vendor();
    vendor.name = name;
    vendor.url = url;
    vendor.logoUrl = logoUrl;

    await vendor.save();

    return vendor;
  }
}
