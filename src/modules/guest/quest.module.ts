import { Module } from '@nestjs/common';
import { QuestService } from './quest.service';
import { QuestController } from './quest.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Quest, QuestSchema } from './schema/quest.schema';
import { User, UserSchema } from '../user/schema/user.schema';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Quest.name, schema: QuestSchema },
      { name: User.name, schema: UserSchema },
    ]),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '745d9e41afmsh693746ca4568d85p1ca3e4jsn60feff105638',
        'X-RapidAPI-Host': 'twitter-api45.p.rapidapi.com',
      },
    }),
  ],
  controllers: [QuestController],
  providers: [QuestService],
})
export class QuestModule {}
