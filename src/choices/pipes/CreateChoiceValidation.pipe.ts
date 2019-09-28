import { PipeTransform, ArgumentMetadata, BadRequestException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from '../../orders/order.repository';
import { ProductRepository } from '../../products/product.repository';

export class CreateChoiceValidationPipe implements PipeTransform {
  constructor(
    @InjectRepository(OrderRepository)
    private readonly orderRepository: OrderRepository,
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,
  ) { }

  async transform(value: any) {
    const orderId = +value.orderId;
    const order = await this.orderRepository.findOne({ where: { orderId }, relations: ['order_product'] });

    if (!order) {
      throw new NotFoundException(`Order (id ${orderId}) not found`);
    }

    const productId = +value.productId;
    const product = await this.productRepository.findOne({ where: { productId } });

    if (!product) {
      throw new NotFoundException(`Product (id ${productId}) not found`);
    }

    const orderProductsIds = order.order_product.map(orderProduct => orderProduct.id);

    if (!orderProductsIds.includes(productId)) {
      throw new UnprocessableEntityException('You can not choose product for this order');
    }

    return value;
  }

}
