import { Get } from '@nestjs/common';
import { PublicApi } from 'src/decorators/public-api.decorator';

@PublicApi({
  path: 'system',
  tag: 'System',
})
export class SystemController {
  constructor() {}

  @Get()
  async findAll() {
    return [];
  }
}
