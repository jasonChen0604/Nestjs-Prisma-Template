import { Module } from '@nestjs/common';
import { SystemService } from './system.service';
import { SystemController } from './system.controller';
import { PublicBaseModule } from '../base/base.module';

@Module({
  controllers: [SystemController],
  providers: [SystemService],
  imports: [PublicBaseModule],
})
export class SystemModule {}
