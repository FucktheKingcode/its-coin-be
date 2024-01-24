import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UpgradeDocument = HydratedDocument<Upgrade>;

@Schema()
export class Upgrade {
  _id: false;

  @Prop({ type: mongoose.Schema.Types.Number, required: true })
  tap: number;

  @Prop({ type: mongoose.Schema.Types.Number, required: true })
  energy: string;

  @Prop({ type: mongoose.Schema.Types.Number, required: true })
  recharging_speed: number;
}

export const UpgradeSchema = SchemaFactory.createForClass(Upgrade);
