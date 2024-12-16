import { Get, Post, Body, Param, Delete } from '@nestjs/common';
import { KeyService } from './key.service';
import { CreateKeyDto } from './dto/create-key.dto';
import { PublicApi } from 'src/decorators/public-api.decorator';

@PublicApi({
  path: 'key',
})
export class KeyController {
  constructor(private readonly keyService: KeyService) {}

  @Post()
  create(@Body() createKeyDto: CreateKeyDto) {
    return this.keyService.create(createKeyDto);
  }

  @Get()
  findAll() {
    return this.keyService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.keyService.findOne(name);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.keyService.remove(name);
  }
}
