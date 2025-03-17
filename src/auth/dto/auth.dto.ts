import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'Ali' })
  name: string;

  @ApiProperty({ example: '+998901234567' })
  phone: string;

  @ApiProperty({ example: '123456' })
  password: string;

  @ApiProperty({ example: 'admin', required: false })
  type?: string;

  @ApiProperty({ example: 'Toshkent', required: false })
  region?: string;

  @ApiProperty({ example: 'AliDev', required: false })
  shortName?: string;

  @ApiProperty({ example: 'Chilonzor', required: false })
  location?: string;

  @ApiProperty({ example: 'https://example.com/avatar.jpg', required: false })
  image?: string;
}

export class LoginDto {
  @ApiProperty({ example: '+998901234567' })
  phone: string;

  @ApiProperty({ example: '123456' })
  password: string;
}
