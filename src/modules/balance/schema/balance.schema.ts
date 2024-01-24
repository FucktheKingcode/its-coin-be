import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ERank } from 'src/common/enum/rank.enum';

export type BalanceDocument = HydratedDocument<Balance>;

@Schema()
export class Balance {
  _id: false;

  @Prop({ type: mongoose.Schema.Types.Number, default: 0 })
  amount: number;

  @Prop({ type: mongoose.Schema.Types.String })
  type_transaction: string;

  @Prop({ type: mongoose.Schema.Types.String })
  state_transaction: string;

  @Prop({ type: mongoose.Schema.Types.String, enum: ERank, default: ERank.BRONZE })
  rank: string;
}

export const BalanceSchema = SchemaFactory.createForClass(Balance);
