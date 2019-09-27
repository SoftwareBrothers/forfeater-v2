import { Controller, Get } from '@nestjs/common';
import { SlackService } from './slack.service';

@Controller('slack')
export class SlackController {
  constructor(
    private readonly slackService: SlackService,
  ) { }

  @Get('/check')
  check() {
    try {
      const message = [
        { text: '@channel Jutro retro, więc czas na wybór dań po retro :alert:Zamawiamy z Mamine Smaki :potato::smile: Zbieram zamówienia dzisiaj do 13:00, jemy jutro ok. 13:00. :arrow_right:' },
        { text: 'https://forms.gle/T2DnL7QXd3c8AbNo9' }
      ];
      return this.slackService.postMessage(message);
    } catch (error) {
      return error;
    }
  }
}
