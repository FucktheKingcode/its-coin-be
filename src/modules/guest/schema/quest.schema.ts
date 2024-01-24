import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import * as paginate from 'mongoose-paginate-v2';
import { removeAccent } from 'src/common/utils/convert.util';

export type QuestDocument = HydratedDocument<Quest>;

@Schema({ timestamps: true, versionKey: false })
export class Quest {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  title: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  description: string;

  @Prop({ type: mongoose.Schema.Types.Number, required: true })
  reward: number;

  @Prop({ type: mongoose.Schema.Types.String })
  search: string;
}

export const QuestSchema = SchemaFactory.createForClass(Quest).plugin(paginate);

QuestSchema.pre('save', function (next) {
  this.search = removeAccent(this.title);
  next();
});
