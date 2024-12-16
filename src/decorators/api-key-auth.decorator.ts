import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBasicAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

export const OptionalApiKeyAuth = (isPublic: boolean = true) => {
  return isPublic
    ? applyDecorators()
    : applyDecorators(
        ApiBasicAuth('X-API-KEY'),
        UseGuards(AuthGuard('api-key')),
      );
};
