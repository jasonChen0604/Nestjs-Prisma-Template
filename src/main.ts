import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'moment-timezone';
import moment from 'moment';
import logger from 'fluent-logger';
import { SystemModule } from './public-controllers/system/system.module';
import { KeyModule } from './public-controllers/key/key.module';

async function bootstrap() {
  moment.tz.setDefault(process.env.TZ);

  if (!!process.env.EFK_TAG) {
    logger.configure(`API.${process.env.EFK_TAG}`, {
      host: process.env.EFK_HOST,
      port: parseInt(process.env.EFK_PORT),
      timeout: 3.0,
      reconnectInterval: 600000, // 10 minutes
    });
  }

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(process.env.BASE_PATH);

  const config = new DocumentBuilder()
    .setTitle('Nestjs Prisma Template')
    .setDescription('Internal API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${process.env.BASE_PATH}/swagger`, app, document);

  const publicConfig = new DocumentBuilder()
    .setTitle('Nestjs Prisma Template')
    .setDescription('Public API description')
    .setVersion('1.0')
    .addApiKey({ type: 'apiKey', in: 'header', name: 'X-API-KEY' }, 'X-API-KEY')
    .build();

  const publicDocument = SwaggerModule.createDocument(app, publicConfig, {
    include: [SystemModule, KeyModule],
  });
  SwaggerModule.setup(
    `${process.env.BASE_PATH}/public/swagger`,
    app,
    publicDocument,
  );

  await app.listen(3000);
}
bootstrap();
