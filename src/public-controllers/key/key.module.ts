import { Module } from '@nestjs/common';
import { KeyService } from './key.service';
import { KeyController } from './key.controller';
import { PublicBaseModule } from '../base/base.module';

@Module({
  controllers: [KeyController],
  providers: [KeyService],
  imports: [PublicBaseModule],
})
export class KeyModule {}
