import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  type: string;

  @Prop()
  region: string;

  @Prop()
  shortName: string;

  @Prop()
  location: string;

  @Prop()
  image: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
