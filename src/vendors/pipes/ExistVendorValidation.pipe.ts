import { PipeTransform, ArgumentMetadata, BadRequestException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VendorRepository } from '../vendor.repository';

export class ExistVendorValidationPipe implements PipeTransform {
  constructor(
    @InjectRepository(VendorRepository)
    private readonly vendorRepository: VendorRepository,
  ) { }

  async transform(vendorId: number) {

    if (!Number.isInteger(vendorId)) {
      throw new UnprocessableEntityException('vendorId must be a number!');
    }

    console.log('validation pipe', vendorId);
    const vendor = await this.vendorRepository.findOne({ where: { id: vendorId } });

    if (!vendor) {
      throw new NotFoundException(`Vendor (id ${vendorId}) not found`);
    }

    return vendor;
  }

}
