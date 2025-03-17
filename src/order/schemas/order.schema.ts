import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Elon } from '../../elon/schemas/elon.schema';
import { Types } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'Elon', required: true })
  elon: Elon;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  orderDate: Date;

  @Prop({ required: true, default: 'pending' })
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
