import { Injectable, Logger } from '@nestjs/common';
import moment from 'moment';
import * as fluentLogger from 'fluent-logger';

@Injectable()
export class BaseTaskService {
  protected readonly console: Logger;
  protected messages: string[] = [];
  protected name: string;
  protected startAt: Date;
  protected logger: any;

  constructor(name: string = BaseTaskService.name) {
    this.name = name;
    this.console = new Logger(name);

    if (!!process.env.EFK_TAG) {
      this.logger = fluentLogger.createFluentSender(
        `SCHEDULE.${process.env.EFK_TAG}`,
        {
          host: process.env.EFK_HOST,
          port: parseInt(process.env.EFK_PORT),
          timeout: 3.0,
          reconnectInterval: 600000, // 10 minutes
        },
      );
    }
  }

  async exec(cron = async () => {}) {
    // 判斷是不是 pm2 的name primary 的執行節點
    if (process.env.APP_NAME !== 'primary') {
      return;
    }

    this.start();
    let err = null;
    try {
      await cron();
    } catch (error) {
      err = error;
      this.error(error.message);
    } finally {
      this.end(err);
    }
  }

  debug(message: string) {
    this.console.debug(message);
    this.messages.push(moment().format('YYYY-MM-DD HH:mm:ss') + ' ' + message);
  }

  error(message: string) {
    this.console.error(message);
    this.messages.push(moment().format('YYYY-MM-DD HH:mm:ss') + ' ' + message);
  }

  start() {
    this.startAt = new Date();
    this.debug(this.name + ' Start');
  }

  end(error = null) {
    this.debug(this.name + ' End');
    if (!!process.env.EFK_TAG) {
      this.logger.emit('INFO', {
        NAME: this.name,
        DURATION: moment().diff(this.startAt, 'seconds', true),
        SUCCESS: !error,
        ERROR_MESSAGE: error ? error.message : '',
        CONTENT: this.messages.join('\n'),
      });
    }
  }
}
