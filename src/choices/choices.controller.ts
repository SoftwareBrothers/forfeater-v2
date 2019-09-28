import { Controller, Get, UseGuards, Post, Put, Delete, Param, ParseIntPipe, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ChoicesService } from './choices.service';
import { ChoiceDto } from './dto/choice.dto';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { CreateChoiceValidationPipe } from './pipes/CreateChoiceValidation.pipe';

@Controller('orders/:orderId/products/:productId')
@UseGuards(AuthGuard())
export class ChoicesController {
  constructor(private readonly choicesService: ChoicesService) { }

  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @Param(CreateChoiceValidationPipe) params,
    @Body() choiceDto: ChoiceDto,
    @GetUser() user: User
  ) {
    return this.choicesService.createChoice(choiceDto, user, params.orderId, params.productId);
  }

}
