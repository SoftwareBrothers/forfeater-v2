import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, ValidationPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiUseTags, ApiCreatedResponse } from '@nestjs/swagger';
import { List } from 'src/types/generic-list.interface';
import { ProductsService } from '../products/products.service';
import { Product } from '../products/product.entity';
import { ProductDto } from '../products/dto/product.dto';
import { ExistVendorValidationPipe } from './pipes/ExistVendorValidation.pipe';
import { Vendor } from './vendor.entity';

@Controller('vendors/:vendorId/products')
@UseGuards(AuthGuard())
@ApiUseTags('vendors/:vendorId/products')
@ApiBearerAuth()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({ description: 'The product has been successfully created.', type: Product })
  async create(
    @Body(ValidationPipe) productDto: ProductDto,
    @Param('vendorId', ExistVendorValidationPipe) vendor: Vendor
    ): Promise<Product> {
    return this.productsService.createProduct(productDto, vendor);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Param('vendorId', ExistVendorValidationPipe) vendor: Vendor
  ) {
    return this.productsService.deleteProduct(id);
  }

  @Get()
  @HttpCode(200)
  async list(@Param('vendorId', ExistVendorValidationPipe) vendor: Vendor): Promise<List<Product>> {
    return this.productsService.getProductsOfVendor(vendor.id);
  }

  @Get(':id')
  @HttpCode(200)
  async show(
    @Param('id', ParseIntPipe) id: number,
    @Param('vendorId', ExistVendorValidationPipe) vendor: Vendor
  ) {
    return this.productsService.getProductById(id);
  }

  @Patch(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) productDto: ProductDto,
    @Param('vendorId', ExistVendorValidationPipe) vendor: Vendor
  ) {
    return this.productsService.updateProduct(id, productDto);
  }

}
