import { Module, HttpModule } from '@nestjs/common';
import { SlackService } from './slack.service';
import { SlackController } from './slack.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
    }),
  ],
  controllers: [SlackController],
  providers: [
    SlackService,
  ],
  exports: [
    SlackService
  ]
})
export class SlackModule { }
