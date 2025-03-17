import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateElonDto {
  @ApiProperty({ example: '65a1234bcde56789012fgh34', description: 'Kategoriya ID' })
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty({ example: 'iPhone 14 Pro Max', description: 'E’lon nomi' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'https://example.com/image.jpg', description: 'Rasm', required: false })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ example: 'Yangi iPhone 14 Pro Max sotiladi', description: 'Tavsif', required: false })
  @IsOptional()
  @IsString()
  desc?: string;

  @ApiProperty({ example: 12000000, description: 'Narx' })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ example: '2025-03-17T12:00:00.000Z', description: 'E’lon boshlangan sana' })
  @IsNotEmpty()
  start: Date;

  @ApiProperty({ example: '+998901234567', description: 'Bog‘lanish uchun telefon raqam', required: false })
  @IsOptional()
  @IsString()
  contact?: string;

  @ApiProperty({ example: 'Qora', description: 'Rang', required: false })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty({ example: 'Telefon', description: 'E’lon turi', required: false })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({ example: '1 yil', description: 'Kafolat muddati', required: false })
  @IsOptional()
  @IsString()
  garant?: string;

  @ApiProperty({ example: true, description: 'Yangi yoki eski' })
  @IsNotEmpty()
  @IsBoolean()
  isNew: boolean;
}
