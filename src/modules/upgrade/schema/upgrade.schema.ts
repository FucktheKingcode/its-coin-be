import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UpgradeDocument = HydratedDocument<Upgrade>;

@Schema()
export class Upgrade {
  _id: false;

  @Prop({
    type: {
      level: {
        type: mongoose.Schema.Types.Number,
        default: 0,
      },
      pattern: Object,
    },
    required: true,
  })
  tap_power: {
    level: number;
    pattern: { '1': 100; '2': 200; '3': 300; '4': 400; '5': 500 };
  };

  @Prop({
    type: {
      level: {
        type: mongoose.Schema.Types.Number,
        default: 0,
      },
      pattern: Object,
    },
    required: true,
  })
  energy_limit: {
    level: number;
    pattern: { '1': 1000; '2': 2000; '3': 3000; '4': 4000; '5': 5000 };
  };

  @Prop({
    type: {
      level: {
        type: mongoose.Schema.Types.Number,
        default: 0,
      },
      pattern: Object,
    },
    required: true,
  })
  recharging_speed: {
    level: number;
    pattern: { '1': 100; '2': 200; '3': 300; '4': 400; '5': 500 };
  };

  @Prop({
    type: {
      level: {
        type: mongoose.Schema.Types.Number,
        default: 0,
      },
      pattern: Object,
    },
    required: true,
  })
  tap_bot: {
    level: number;
    pattern: { '1': 100; '2': 200; '3': 300; '4': 400; '5': 500 };
  };
}

export const UpgradeSchema = SchemaFactory.createForClass(Upgrade);
