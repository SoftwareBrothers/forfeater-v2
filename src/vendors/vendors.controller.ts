import { Controller, Get } from '@nestjs/common';

@Controller('vendors')
export class VendorController {
  @Get()
  lists() {
    return { vendors: true };
  }
}

