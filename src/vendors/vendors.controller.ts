import { Controller, Delete, Get, HttpCode, Post, Put, UseGuards, Body, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { VendorsService } from './vendors.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { Vendor } from './vendor.entity';

@Controller('vendors')
@UseGuards(AuthGuard())
export class VendorController {
  constructor(
    private readonly vendorsService: VendorsService,
  ) { }

  @Get()
  @HttpCode(200)
  list() {
    return this.vendorsService.getVendors();
  }

  @Post()
  @HttpCode(201)
  create(@Body(ValidationPipe) createVendorDto: CreateVendorDto): Promise<Vendor> {
    return this.vendorsService.createVendor(createVendorDto);
  }

  @Put()
  @HttpCode(200)
  update() {
    return { vendors: true };
  }

  @Get('/:id')
  @HttpCode(200)
  show() {
    return { vendors: true };
  }

  @Delete('/:id')
  @HttpCode(204)
  remove() {
    return { vendors: true };
  }
}
