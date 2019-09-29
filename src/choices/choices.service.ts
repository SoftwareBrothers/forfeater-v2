import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChoiceRepository } from './choice.repository';
import { ProductRepository } from '../products/product.repository';
import { OrderRepository } from '../orders/order.repository';
import { ChoiceDto } from './dto/choice.dto';
import { Choice } from './choice.entity';
import { User } from '../auth/user.entity';
import { Order } from '../orders/order.entity';
import { ProductsService } from '../products/products.service';

@Injectable()
export class ChoicesService {
  constructor(
    @InjectRepository(ChoiceRepository)
    private readonly choiceRepository: ChoiceRepository,
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,
    @InjectRepository(OrderRepository)
    private readonly orderRepository: OrderRepository,

    private readonly productsService: ProductsService,
  ) { }

  async createChoice(choiceDto: ChoiceDto, user: User, orderId: number): Promise<Choice> {

    const product = await this.productsService.getProductById(+choiceDto.productId);

    const order = await this.checkProductForOrder(orderId, product.id);

    const choice = await this.choiceRepository.findOne({ where: { order: orderId, user: user.id }});

    if (choice) {
      throw new UnprocessableEntityException('You have already chosen product for this order!');
    }

    return this.choiceRepository.create(choiceDto, user, orderId, product.id);
  }

  async updateChoice(choiceDto: ChoiceDto, user: User, orderId: number): Promise<Choice> {

    const choice = await this.choiceRepository.findOne({ where: { order: orderId, user: user.id }, relations: ['product']});

    if (!choice) {
      throw new UnprocessableEntityException('You did not chose product for this product!');
    }

    const product = await this.productsService.getProductById(+choiceDto.productId);

    const order = await this.checkProductForOrder(orderId, product.id);

    if (choice.product.id === product.id) {
      throw new UnprocessableEntityException('You have already chosen this product for this order!');
    }

    choice.product = product;
    choice.comment = choiceDto.comment;
    await choice.save();

    return choice;
  }

  async checkProductForOrder(orderId: number, productId: number): Promise<Order> {

    const order = await this.orderRepository.findOne({ where: { id: orderId }, relations: ['orderProduct'] });
    const orderProductsIds = order.orderProduct.map(orderProduct => orderProduct.product.id);

    if (!orderProductsIds.includes(productId)) {
      throw new UnprocessableEntityException('The product does not belong to the order!');
    }

    return order;
  }

}
