import { Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes, Body, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { List } from 'src/types/generic-list.interface';
import { VendorsService } from './vendors.service';
import { VendorDto } from './dto/vendor.dto';
import { Vendor } from './vendor.entity';

@Controller('vendors')
@UseGuards(AuthGuard())
export class VendorController {
  constructor(
    private readonly vendorsService: VendorsService,
  ) { }

  @Get()
  @HttpCode(200)
  async list(): Promise<List<Vendor>> {
    return this.vendorsService.getAllVendors();
  }

  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async create(@Body(ValidationPipe) createVendorDto: VendorDto): Promise<Vendor> {
    return this.vendorsService.createVendor(createVendorDto);
  }

  @Put(':id')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() vendorDto: VendorDto
  ) {
    return this.vendorsService.updateVendor(id, vendorDto);
  }

  @Get(':id')
  @HttpCode(200)
  async show(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.vendorsService.getVendorById(id);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.vendorsService.deleteVendor(id);
  }
}
