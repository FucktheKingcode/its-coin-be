import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../user/schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UpgradeService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async updateTapPower(id: string) {
    const userFound = await this.userModel.findById(id);

    if (!userFound) {
      throw new NotFoundException('User not found');
    }

    const level = userFound.upgrade.tap_power.level;
    const priceUpdate = userFound.upgrade.tap_power.pattern?.[`${level + 1}`];

    if (userFound.balance.amount < priceUpdate) {
      throw new NotFoundException('Not enough balance');
    }

    const newUpdate = {
      upgrade: { tap_power: { level: level + 1 } },
      balance: { amount: userFound.balance.amount - priceUpdate },
    };

    await userFound.updateOne({ $set: newUpdate }, { new: true });

    return { ...userFound, ...newUpdate };
  }

  async updateTapBot(id: string) {
    const userFound = await this.userModel.findById(id);

    if (!userFound) {
      throw new NotFoundException('User not found');
    }

    const level = userFound.upgrade.tap_bot.level;
    const priceUpdate = userFound.upgrade.tap_bot.pattern?.[`${level + 1}`];

    if (userFound.balance.amount < priceUpdate) {
      throw new NotFoundException('Not enough balance');
    }

    const newUpdate = {
      upgrade: { tap_bot: { level: level + 1 } },
      balance: { amount: userFound.balance.amount - priceUpdate },
    };

    await userFound.updateOne({ $set: newUpdate }, { new: true });

    return { ...userFound, ...newUpdate };
  }

  async updateEnergyLimit(id: string) {
    const userFound = await this.userModel.findById(id);

    if (!userFound) {
      throw new NotFoundException('User not found');
    }

    const level = userFound.upgrade.energy_limit.level;
    const priceUpdate = userFound.upgrade.energy_limit.pattern?.[`${level + 1}`];

    if (userFound.balance.amount < priceUpdate) {
      throw new NotFoundException('Not enough balance');
    }

    const newUpdate = {
      upgrade: { energy_limit: { level: level + 1 } },
      balance: { amount: userFound.balance.amount - priceUpdate },
    };

    await userFound.updateOne({ $set: newUpdate }, { new: true });

    return { ...userFound, ...newUpdate };
  }

  async updateRechargingSpeed(id: string) {
    const userFound = await this.userModel.findById(id);

    if (!userFound) {
      throw new NotFoundException('User not found');
    }

    const level = userFound.upgrade.recharging_speed.level;
    const priceUpdate = userFound.upgrade.recharging_speed.pattern?.[`${level + 1}`];

    if (userFound.balance.amount < priceUpdate) {
      throw new NotFoundException('Not enough balance');
    }

    const newUpdate = {
      upgrade: { recharging_speed: { level: level + 1 } },
      balance: { amount: userFound.balance.amount - priceUpdate },
    };

    await userFound.updateOne({ $set: newUpdate }, { new: true });

    return { ...userFound, ...newUpdate };
  }
}
