import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Category } from '../../category/schemas/category.schema';
import { Types } from 'mongoose';

export type ElonDocument = Elon & Document;

@Schema()
export class Elon {
  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: Category;

  @Prop({ required: true })
  name: string;

  @Prop()
  image: string;

  @Prop()
  desc: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  start: Date;

  @Prop()
  contact: string;

  @Prop()
  color: string;

  @Prop()
  type: string;

  @Prop()
  garant: string;

  @Prop()
  isNew: boolean;
}

export const ElonSchema = SchemaFactory.createForClass(Elon);
