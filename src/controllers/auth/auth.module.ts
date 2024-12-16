import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { BaseModule } from '../base/base.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [BaseModule],
})
export class AuthModule {}
