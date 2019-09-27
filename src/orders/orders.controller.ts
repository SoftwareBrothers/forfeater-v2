import { Controller, Post, ValidationPipe, UsePipes, Body, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('orders')
@UseGuards(AuthGuard())
export class OrdersController {
  constructor(
    private readonly orderService: OrdersService
  ) { }

  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @GetUser() user: User
  ) {
    return this.orderService.createOrder(user, createOrderDto);
  }
}
