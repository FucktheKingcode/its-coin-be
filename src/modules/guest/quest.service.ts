import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestDto } from './dto/create-quest.dto';
import { UpdateQuestDto } from './dto/update-quest.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Quest, QuestDocument } from './schema/quest.schema';
import { Model, PaginateModel } from 'mongoose';
import { GetPaginate } from 'src/common/utils/paginate.util';
import { FindQuestsDto } from './dto/find-quests.dto';
import { removeAccent } from 'src/common/utils/convert.util';
import { User, UserDocument } from '../user/schema/user.schema';
import { UpdateStatusQuestDto } from './dto';
import { HttpService } from '@nestjs/axios';
@Injectable()
export class QuestService {
  constructor(
    @InjectModel(Quest.name) private questModel: Model<QuestDocument>,
    @InjectModel(Quest.name) private questPaginateModel: PaginateModel<QuestDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private httpService: HttpService,
  ) {}

  async create(body: CreateQuestDto) {
    const questFound = await this.questModel.findOne({ title: body.title });

    if (questFound) {
      throw new NotFoundException('Quest already exists');
    }

    const newQuest = new this.questModel(body);

    return await newQuest.save();
  }

  async findAll(query: FindQuestsDto) {
    const paginate = GetPaginate(query);

    const filter = {
      ...(query.reward && { reward: query.reward }),
      ...(query.search && { search: { $regex: removeAccent(query.search), $options: 'i' } }),
    };

    const quests = await this.questPaginateModel.paginate(filter, paginate);

    return quests;
  }

  async findOne(id: string) {
    const questFound = await this.questModel.findById(id);

    if (!questFound) {
      throw new NotFoundException('Quest not found');
    }

    return questFound;
  }

  async update(id: string, body: UpdateQuestDto) {
    const questUpdated = await this.findOne(id);

    await questUpdated.updateOne({ $set: { ...body } }, { new: true });

    return { ...questUpdated['_doc'], ...JSON.parse(JSON.stringify(body)) };
  }

  async remove(id: string) {
    const questDeleted = await this.findOne(id);

    const result = await questDeleted.deleteOne();

    if (result.deletedCount === 0) {
      throw new NotFoundException('Quest not found');
    }

    await this.userModel.updateMany(
      { $or: [{ 'quests.doing': id }, { 'quests.done': id }] },
      { $pull: { quests: { doing: id, done: id } } },
    );

    return questDeleted;
  }

  async updateStatus(id: string, body: UpdateStatusQuestDto) {
    const questFound = await this.findOne(id);

    const [followers, userLikes] = await Promise.all([
      this.httpService.axiosRef.request({
        url: 'https://twitter-api45.p.rapidapi.com/followers.php',
        params: { screenname: 'elonmusk' },
      }),
      this.httpService.axiosRef.request({
        url: 'https://twitter-api45.p.rapidapi.com/userlikes.php',
        params: { screenname: body.userId },
      }),
    ]);

    const followersData = followers?.['timeline'];
    const userLikesData = userLikes?.['timeline'];

    if (followersData.filter((fl) => fl.tweet_id === body.userId) && userLikesData.filter((ul) => ul.tweet_id === id)) {
      await this.userModel.updateOne(
        { _id: body.userId },
        { $push: { quests: { done: id } }, $set: { 'balance.amount': questFound.reward } },
      );
      return ' you finished the quest';
    }
    return 'you did not finish the quest';
  }
}
