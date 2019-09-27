import { Module } from '@nestjs/common';
import { ChoicesController } from './choices.controller';
import { ChoicesService } from './choices.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChoiceRepository } from './choice.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChoiceRepository]),
    AuthModule
  ],
  controllers: [ChoicesController],
  providers: [ChoicesService]
})
export class ChoicesModule {}
