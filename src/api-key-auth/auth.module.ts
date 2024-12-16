import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { HeaderApiKeyStrategy } from './auth-header-api-key.strategy';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PassportModule],
  providers: [HeaderApiKeyStrategy, PrismaService],
})
export class ApiKeyAuthModule {}
