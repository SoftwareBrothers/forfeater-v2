import { PipeTransform, ArgumentMetadata, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from '../order.repository';

export class ExistOrderValidationPipe implements PipeTransform {
  constructor(
    @InjectRepository(OrderRepository)
    private readonly orderRepository: OrderRepository,
  ) { }

  async transform(value: any) {
    const orderId = +value.orderId;
    const order = await this.orderRepository.findOne({ where: { id: orderId }, relations: ['orderProduct'] });

    if (!order) {
      throw new NotFoundException(`Order (id ${orderId}) not found`);
    }

    return value;
  }

}
