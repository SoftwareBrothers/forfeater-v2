import { PipeTransform, ArgumentMetadata, BadRequestException, NotFoundException } from './node_modules/@nestjs/common';
import { InjectRepository } from './node_modules/@nestjs/typeorm';
import { OrderRepository } from '../order.repository';

export class CreateChoiceValidationPipe implements PipeTransform {
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
