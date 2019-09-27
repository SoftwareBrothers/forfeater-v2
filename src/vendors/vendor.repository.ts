import { Repository, EntityRepository } from 'typeorm';
import { Vendor } from './vendor.entity';

@EntityRepository(Vendor)
export class VendorRepository extends Repository<Vendor> {

}
