import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../user/schema/user.schema';
import { Model } from 'mongoose';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { Balance } from './schema/balance.schema';

@Injectable()
export class BalanceService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async updateBalanceAndEnergyUser(userId: string, updateBalanceDto: UpdateBalanceDto): Promise<Balance> {
    const { amount_tap, typeTransaction, booster, tap_power_level, tap_bot } = updateBalanceDto;
    const userFound = await this.userModel.findById(userId);

    if (!userFound) {
      throw new NotFoundException('User not found');
    }

    if (userFound.energy < amount_tap) {
      throw new NotFoundException('Not enough energy');
    }

    const newUpdate = {
      balance: {
        amount: userFound.balance.amount + (amount_tap * tap_power_level + tap_bot) * booster,
        type_transaction: typeTransaction,
      },
      energy: userFound.energy - amount_tap,
    };

    await userFound.updateOne({ $set: { newUpdate } }, { new: true });
    return userFound.balance;
  }
}
