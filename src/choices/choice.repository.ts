import { EntityRepository, Repository } from 'typeorm';
import { Choice } from '../choices/choice.entity';
import { ChoiceDto } from './dto/choice.dto';
import { User } from '../auth/user.entity';

@EntityRepository(Choice)
export class ChoiceRepository extends Repository<Choice> {
  async create(choiceDto: ChoiceDto, user: User, orderId: number, productId: number): Promise<Choice> {
    const { comment }: ChoiceDto = choiceDto;
    const choice = new Choice();
    choice.user = user as any as User;
    choice.order = orderId as any as Order;
    choice.product = productId as any as Product;
    choice.comment = comment;

    await choice.save();

    return choice;
  }
}
