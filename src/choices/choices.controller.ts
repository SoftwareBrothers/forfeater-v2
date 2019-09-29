import { Body, Controller, Patch, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiUseTags, ApiCreatedResponse } from '@nestjs/swagger';
import { ChoicesService } from './choices.service';
import { ChoiceDto } from './dto/choice.dto';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { Choice } from './choice.entity';
import { ExistOrderValidationPipe } from '../orders/pipes/ExistOrderValidation.pipe';

@Controller('orders/:orderId/choices')
@UseGuards(AuthGuard())
@ApiUseTags('orders')
@ApiBearerAuth()
export class ChoicesController {
  constructor(private readonly choicesService: ChoicesService) { }

  @Post()
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({ description: 'The choice has been successfully created.', type: Choice })
  async create(
    @Param(ExistOrderValidationPipe) params,
    @Body() choiceDto: ChoiceDto,
    @GetUser() user: User
  ) {
    return this.choicesService.createChoice(choiceDto, user, params.orderId);
  }

  @Patch()
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({ description: 'The choice has been successfully updated.', type: Choice })
  async update(
    @Param(ExistOrderValidationPipe) params,
    @Body() choiceDto: ChoiceDto,
    @GetUser() user: User
  ) {
    return this.choicesService.updateChoice(choiceDto, user, params.orderId);
  }

}
