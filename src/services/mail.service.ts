import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import _ from 'lodash';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(
    list: string[],
    subject: string = 'Hello ✔',
    template: string = 'welcome',
    context: any = { showMessage: true },
  ) {
    const targets = list;
    if (process.env.MAIL_DEBUG_LIST?.length) {
      const debug_list = _.filter(
        _.split(process.env.MAIL_DEBUG_LIST, ','),
        (o) => {
          return o.match(/^.+@.+\..+$/);
        },
      );
      return Promise.all(
        _.map(debug_list, (to: string) =>
          this.mailerService.sendMail({
            to,
            subject,
            template,
            context: {
              ...context,
              debug: {
                targets,
              },
            },
          }),
        ),
      );
    } else {
      return Promise.all(
        _.map(targets, (user) =>
          this.mailerService.sendMail({
            to: user,
            subject,
            template,
            context: {
              ...context,
              debug: null,
            },
          }),
        ),
      );
    }
  }
}
