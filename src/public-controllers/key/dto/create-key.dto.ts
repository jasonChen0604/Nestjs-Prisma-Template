import { ApiProperty } from '@nestjs/swagger';

export class CreateKeyDto {
  @ApiProperty()
  name: string;
}
