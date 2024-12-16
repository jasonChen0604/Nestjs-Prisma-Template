import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CacheModule } from '@nestjs/cache-manager';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './controllers/auth/auth.module';
import { PublicBaseModule } from './public-controllers/base/base.module';
import { SystemModule as PublicSystemModule } from './public-controllers/system/system.module';
import { ApiKeyAuthModule } from './api-key-auth/auth.module';
import { KeyModule } from './public-controllers/key/key.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SyncSystemsTaskModule } from './schedules/sync-systems/sync-systems.task.modeuls';
import * as fsStore from 'cache-manager-fs-hash';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { PostModule } from './controllers/post/post.module';

@Module({
  imports: [
    CacheModule.register({
      store: fsStore,
      options: {
        path: 'cache', // 快取檔案存儲位置
        ttl: 60 * 60, // 項目在快取中的存活時間（秒）
        maxsize: 1000 * 1000 * 1000, // 快取大小限制，單位為字節
      },
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT),
        secure: false,
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        },
      },
      defaults: {
        from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new EjsAdapter(),
        options: {
          strict: false,
        },
      },
    }),
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2h' },
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    PublicBaseModule,
    PublicSystemModule,
    ApiKeyAuthModule,
    KeyModule,
    SyncSystemsTaskModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
