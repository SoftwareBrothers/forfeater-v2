import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { List } from '../types/generic-list.interface';
import { Product } from './product.entity';
import { ProductDto } from './dto/product.dto';
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
    const products = await this.productRepository.find({ where: { vendor: vendorId } });
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

  async createProduct(productDto: ProductDto, vendor: Vendor): Promise<Product> {
    return this.productRepository.createProduct(productDto, vendor);
  }

  async updateProduct(id: number, createProductDto: ProductDto): Promise<Product> {
    const product = await this.getProductById(id);
    const { name, description, requireDescription, isVegan, isVege }: ProductDto = createProductDto;
    product.name = name;
    product.description = description;
    product.requireDescription = requireDescription;
    product.isVege = isVege;
    product.isVegan = isVegan;

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
