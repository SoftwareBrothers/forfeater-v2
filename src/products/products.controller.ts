import { Controller, Get, UseGuards, Param, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiUseTags, ApiCreatedResponse } from '@nestjs/swagger';
import { List } from 'src/types/generic-list.interface';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Controller('products')
@UseGuards(AuthGuard())
@ApiUseTags('products')
@ApiBearerAuth()
export class ProductsController {
  constructor(private readonly productService: ProductsService) { }

  @Get()
  async list(): Promise<List<Product>> {
    return this.productService.getAllProducts();
  }

}
