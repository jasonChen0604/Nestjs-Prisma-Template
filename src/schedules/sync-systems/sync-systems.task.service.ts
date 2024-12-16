import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { BaseTaskService } from '../base/base.task.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SyncSystemsTaskService extends BaseTaskService {
  constructor(private readonly prisma: PrismaService) {
    super('Sync Systems Task');
  }

  @Cron(process.env.CRON_SYNC_SYSTEM_SCHEDULE)
  async handleCron() {
    this.exec(() => this.syncSystems());
  }

  async syncSystems() {
    // 全部系統
  }
}
