import { EntityRepository, Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { Vendor } from '../vendors/vendor.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { vendor, name, description, requireDescription, isVegan, isVege }: CreateProductDto = createProductDto;
    const product = new Product();
    product.vendor = vendor as any as Vendor;
    product.name = name;
    product.description = description;
    product.requireDescription = requireDescription;
    product.isVege = isVege;
    product.isVegan = isVegan;

    await product.save();
    return product;
  }
}
