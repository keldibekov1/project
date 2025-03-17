import { ApiProperty } from '@nestjs/swagger';

export class CreateRegionDto {
  @ApiProperty({ example: 'Toshkent', description: 'Region nomi' })
  name: string;
}
