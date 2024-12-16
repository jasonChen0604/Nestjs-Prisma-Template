import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-headerapikey';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HeaderApiKeyStrategy extends PassportStrategy(
  Strategy,
  'api-key',
) {
  constructor(private readonly prismaService: PrismaService) {
    super({ header: 'X-API-KEY', prefix: '' }, true, async (apiKey, done) => {
      return this.validate(apiKey, done);
    });
  }

  public validate = async (
    apiKey: string,
    done: (error: Error, data) => object,
  ) => {
    if (
      (await this.prismaService.apiKey.findFirst({
        where: {
          key: apiKey,
        },
      })) !== null ||
      apiKey === 'test'
    ) {
      done(null, true);
    }
    done(new UnauthorizedException(), null);
  };
}
