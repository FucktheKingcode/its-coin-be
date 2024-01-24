import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUserInfo } from 'src/common/interfaces/user-info.interface';
import { User, UserDocument } from './schema/user.schema';
import { Model, PaginateModel } from 'mongoose';
import { GetRankDto, UpdatePasswordDto } from './dto';
import { Wallet } from 'ethers';
import crypto from 'crypto-js';
import { GetPaginate } from 'src/common/utils/paginate.util';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(User.name) private userPaginateModel: PaginateModel<UserDocument>,
  ) {}

  async createNewUser(userInfo: IUserInfo) {
    let userFound = await this.userModel.findOne({ 'twitter_info.id': userInfo.id }).select('+password');

    if (!userFound) {
      userFound = await this.userModel.create({ twitter_info: { ...userInfo }, balance: { amount: 0 } });
    }

    return userFound;
  }

  async updatePasswordUser(id: string, passwordUserDto: UpdatePasswordDto) {
    const { password } = passwordUserDto;
    const userFound = await this.userModel.findById(id);

    if (!userFound) {
      throw new NotFoundException('User not found');
    }

    if (userFound.password != null) {
      throw new NotFoundException('Password not null');
    }

    const wallet = Wallet.createRandom();

    // Encrypt
    const privateKeyEncrypt = crypto.AES.encrypt(wallet.privateKey, password).toString();

    await userFound.updateOne(
      {
        $set: {
          password: crypto.SHA256(password).toString(),
          wallet_eth: {
            privateKey: privateKeyEncrypt,
            walletAddress: wallet.address,
          },
        },
      },
      { new: true },
    );
    return { ...userFound };
  }

  async signTransaction(id: string, passwordUserDto: UpdatePasswordDto) {
    const { password } = passwordUserDto;
    const userFound = await this.userModel.findById(id);

    if (!userFound) {
      throw new NotFoundException('User not found');
    }

    if (userFound.password != crypto.SHA256(password).toString()) {
      throw new NotFoundException('Password incorrect');
    }

    // Decrypt
    const bytes = crypto.AES.decrypt(userFound.wallet_eth.privateKey, password);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    const walletAddress = userFound.wallet_eth.walletAddress;

    await userFound.updateOne(
      {
        $set: {
          wallet_eth: {
            privateKey: originalText,
            walletAddress: walletAddress,
          },
        },
      },
      { new: true },
    );
    return { ...userFound };
  }

  async getUser(userId: string): Promise<UserDocument> {
    const userFound = await this.userModel.findOne({ 'twitter_info.id': userId });

    if (!userFound) {
      throw new NotFoundException('User not found');
    }

    return userFound;
  }

  async getRanking(query: GetRankDto) {
    const paginateOptions = GetPaginate(query);

    const ranking = await this.userPaginateModel.paginate({}, { ...paginateOptions });

    const docs = ranking.docs.map((rank, index) => ({ ...rank['_doc'], rank: index + 1 }));

    return { ...ranking, docs };
  }
}
