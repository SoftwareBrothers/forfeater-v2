import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { List } from '../types/generic-list.interface';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { Vendor } from '../vendors/vendor.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,
  ) { }

  async getAllProducts(): Promise<List<Product>> {
    const products = await this.productRepository.find({ relations: ['vendor'] });
    return {
      items: products
    };
  }

  async getProductsOfVendor(vendorId: number): Promise<List<Product>> {
    const products = await this.productRepository.find({ where: { vendor_id: vendorId } });
    return {
      items: products
    };
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id }, relations: ['vendor'] });

    if (!product) {
      throw new NotFoundException(`Product (id ${id}) not found`);
    }

    return product;
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    // TODO after vendor repository is done check if vendor exists and then pass it
    return this.productRepository.createProduct(createProductDto);
  }

  async updateProduct(id: number, createProductDto: CreateProductDto): Promise<Product> {
    const product = await this.getProductById(id);
    const { vendor, name, description, requireDescription, isVegan, isVege }: CreateProductDto = createProductDto;
    product.vendor = vendor as any as Vendor;
    product.name = name;
    product.description = description;
    product.require_description = requireDescription;
    product.is_vege = isVege;
    product.is_vegan = isVegan;

    await product.save();
    return product;
  }

  async deleteProduct(id: number): Promise<void> {
    const result = await this.productRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Product (id ${id}) not found`);
    }
  }
}
