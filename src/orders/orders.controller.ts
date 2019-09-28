import { Controller, Post, HttpCode, ParseIntPipe, ValidationPipe, UsePipes, Body, Patch, UseGuards, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiCreatedResponse } from '@nestjs/swagger';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';
import { AuthGuard } from '@nestjs/passport';
import { Order } from './order.entity';
import { OrderListFilterDto } from './dto/order-list-filter.dto';

@Controller('orders')
@UseGuards(AuthGuard())
@ApiUseTags('orders')
@ApiBearerAuth()
export class OrdersController {
  constructor(
    private readonly orderService: OrdersService
  ) { }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiCreatedResponse({ description: 'The order has been successfully created.', type: Order })
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
    return this.orderService.show(id, user);
  }

  @Patch(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateOrderDto: UpdateOrderDto,
    @GetUser() user: User
  ) {
    return this.orderService.update(id, updateOrderDto, user);
  }
}
