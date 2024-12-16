import { ApiProperty } from '@nestjs/swagger';

export class UpdateSystemDto {
  @ApiProperty()
  system_id_list: number[];
}
