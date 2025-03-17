import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Elektronika', description: 'Kategoriya nomi' })
  name: string;

  @ApiProperty({ example: 'https://example.com/image.jpg', description: 'Kategoriya rasmi', required: false })
  image?: string;
}
