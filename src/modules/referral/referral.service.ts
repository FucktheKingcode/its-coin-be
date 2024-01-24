import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../user/schema/user.schema';
import { Model } from 'mongoose';
import { UpdateReferrerUser } from './dto/update-referrer.dto';

@Injectable()
export class ReferralService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async updateReferrerUser(id: string, idReferrerUserDto: UpdateReferrerUser) {
    const { id_referrer } = idReferrerUserDto;
    const userFound = await this.userModel.findById(id);

    if (!userFound) {
      throw new NotFoundException('User not found');
    }

    if (userFound.id_referrer != null) {
      throw new NotFoundException('Id Referrer not null');
    }

    await userFound.updateOne({ $set: { id_referrer: id_referrer } }, { new: true });
    return { ...userFound };
  }
}
