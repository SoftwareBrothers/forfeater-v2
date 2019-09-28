import { Controller, Get, UseGuards, Post, Put, Delete, Param, ParseIntPipe, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags } from '@nestjs/swagger';
import { List } from 'src/types/generic-list.interface';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
@UseGuards(AuthGuard())
@ApiUseTags('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) { }

  @Get()
  async list(): Promise<List<Product>> {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  async show(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.productService.getProductById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @Body() createProductDto: CreateProductDto
  ) {
    return this.productService.createProduct(createProductDto);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() createProductDto: CreateProductDto
  ) {
    return this.productService.updateProduct(id, createProductDto);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.productService.deleteProduct(id);
  }
}
