import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type RegionDocument = Region & Document;

@Schema()
export class Region {
  @ApiProperty({ example: '65f2c...0a12d', description: 'Regionning ID si' })
  _id: string;

  @ApiProperty({ example: 'Toshkent', description: 'Region nomi' })
  @Prop({ required: true })
  name: string;
}

export const RegionSchema = SchemaFactory.createForClass(Region);
