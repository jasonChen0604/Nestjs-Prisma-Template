import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { BaseModule } from '../base/base.module';

@Module({
  imports: [BaseModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
