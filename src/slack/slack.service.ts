import { Injectable, HttpService } from "@nestjs/common";
import { SlackMessage } from "dist/slack/slack-message.interface";

@Injectable()
export class SlackService {

    slackWebhook: string;

    constructor(
        private readonly httpService: HttpService
    )
    {
        this.slackWebhook = process.env.SLACK_WEBHOOK;
    }

    prepareMessage(slackMessage: SlackMessage[]): object{
        let message = {
            "blocks": []
        }
        slackMessage.map((sm: SlackMessage) => {
            message.blocks.push({
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": sm.text
                }
            });
        });
        return message;
    }

    postMessage(message: SlackMessage[]) : any {
        this.httpService.post(
            this.slackWebhook,
            this.prepareMessage(message)
        ).toPromise().then()
        .catch(error => {
            return error;
        })
    }

}
