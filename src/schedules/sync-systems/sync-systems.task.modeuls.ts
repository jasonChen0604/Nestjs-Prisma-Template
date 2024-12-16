import { Module } from '@nestjs/common';
import { SyncSystemsTaskService } from './sync-systems.task.service';
import { BaseTaskModule } from '../base/base.task.module';

@Module({
  controllers: [],
  providers: [SyncSystemsTaskService],
  imports: [BaseTaskModule],
})
export class SyncSystemsTaskModule {}
