import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Balance, BalanceSchema } from 'src/modules/balance/schema/balance.schema';
import { Upgrade, UpgradeSchema } from 'src/modules/upgrade/schema/upgrade.schema';
import * as paginate from 'mongoose-paginate-v2';
export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: mongoose.Schema.Types.String })
  email: string;

  @Prop({ type: mongoose.Schema.Types.String })
  username_telegram: string;

  @Prop({
    type: {
      id: String,
      name: String,
      username: String,
      photos: [{ value: String }],
    },
  })
  twitter_info: { id: string; name: string; username: string; photos: { value: string }[] };

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Friend' }])
  friends: Types.ObjectId[];

  @Prop({ type: BalanceSchema })
  balance: Balance;

  @Prop({ type: mongoose.Schema.Types.Number, default: 1000 })
  energy: number;

  @Prop({
    type: {
      privateKey: String,
      walletAddress: String,
    },
  })
  wallet_eth: {
    privateKey: string;
    walletAddress: string;
  };

  @Prop({
    type: {
      doing: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quest' }],
      done: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quest' }],
    },
  })
  quests: {
    doing: Types.ObjectId[];
    done: Types.ObjectId[];
  };

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'TapBot' })
  tap_bot: Types.ObjectId;

  @Prop({ type: UpgradeSchema })
  upgrade: Upgrade;

  @Prop({ type: String || null })
  id_referrer?: string;

  @Prop({ type: mongoose.Schema.Types.String, select: false })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User).plugin(paginate);
