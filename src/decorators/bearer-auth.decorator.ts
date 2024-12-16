import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

export const OptionalApiBearerAuth = (isPublic: boolean = true) => {
  return isPublic
    ? applyDecorators()
    : applyDecorators(ApiBearerAuth(), UseGuards(AuthGuard));
};
