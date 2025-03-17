import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: '65a1234bcde56789012fgh34', description: 'Elon ID' })
  @IsNotEmpty()
  @IsString()
  elon: string;

  @ApiProperty({ example: 'user123', description: 'Foydalanuvchi ID' })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ example: '2025-03-17T12:00:00.000Z', description: 'Buyurtma sanasi' })
  @IsNotEmpty()
  @IsDate()
  orderDate: Date;
}
