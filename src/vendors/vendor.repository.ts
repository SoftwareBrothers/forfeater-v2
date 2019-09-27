import { Repository, EntityRepository } from 'typeorm';
import { Vendor } from './vendor.entity';
import { VendorDto } from './dto/vendor.dto';

@EntityRepository(Vendor)
export class VendorRepository extends Repository<Vendor> {
  async create(vendorDto: VendorDto): Promise<Vendor> {
    const { name, url, logo_url }: VendorDto = vendorDto;
    const vendor = new Vendor();
    vendor.name = name;
    vendor.url = url;
    vendor.logo_url = logo_url;

    await vendor.save();

    return vendor;
  }
}
