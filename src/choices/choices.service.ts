import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChoiceRepository } from './choice.repository';
import { ChoiceDto } from './dto/choice.dto';
import { Choice } from './choice.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class ChoicesService {
  constructor(
    @InjectRepository(ChoiceRepository)
    private readonly choiceRepository: ChoiceRepository,
  ) { }

  async createChoice(choiceDto: ChoiceDto, user: User, orderId: number, productId: number): Promise<Choice> {
    return this.choiceRepository.create(choiceDto, user, orderId, productId);
  }
}
