import { Controller, UseInterceptors, applyDecorators } from '@nestjs/common';
import { OptionalApiKeyAuth } from './api-key-auth.decorator';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { ApiTags } from '@nestjs/swagger';

const prefix = 'public';
export const PublicApi = ({ path = '', isPublic = false, tag = null }) => {
  const list = [Controller(`${prefix}/${path}`)];
  list.push(UseInterceptors(LoggingInterceptor));
  list.push(OptionalApiKeyAuth(isPublic));
  if (tag) list.push(ApiTags(tag));
  else {
    // path 轉換成駝峰式給到tag
    const tag = path.replace(/(?:^|-)(\w)/g, (_, c) => c.toUpperCase());
    list.push(ApiTags(tag));
  }

  return applyDecorators(...list);
};
