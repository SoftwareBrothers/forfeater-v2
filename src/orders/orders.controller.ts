import { Controller, Post, ValidationPipe, UsePipes, Body, UseGuards, Get, Param, Query } from '@nestjs/common';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { AuthGuard } from '@nestjs/passport';
import { Order } from './order.entity';
import { OrderListFilterDto } from './dto/order-list-filter.dto';

@Controller('orders')
@UseGuards(AuthGuard())
export class OrdersController {
  constructor(
    private readonly orderService: OrdersService
  ) { }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @GetUser() user: User
  ) {
    return this.orderService.createOrder(user, createOrderDto);
  }

  @Get()
  async list(
    @Query(new ValidationPipe({ transform: true })) orderListFilterDto: OrderListFilterDto,
    @GetUser() user: User
  ): Promise<Order[]> {
    return this.orderService.getAllOrders(user, orderListFilterDto) as any as Order[];
  }

  @Get(':id')
  async show(
    @Param('id') id: number,
    @GetUser() user: User
  ) {
    return this.orderService.getOrderById(id, user);
  }
}
