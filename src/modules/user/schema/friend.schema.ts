import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type FriendDocument = HydratedDocument<Friend>;

@Schema()
export class Friend {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  friendId: string;

  @Prop({ type: mongoose.Schema.Types.Number, required: true })
  balance: number;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  commission_percentage: string;
}

export const FriendSchema = SchemaFactory.createForClass(Friend);
