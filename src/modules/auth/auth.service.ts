import { Injectable } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { IUserInfo } from 'src/common/interfaces/user-info.interface';

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userInfo: IUserInfo) {
    const newUser = await this.userService.createNewUser(userInfo);

    return newUser;
  }

  async signToken(user: any) {
    const token = await this.jwtService.sign(
      { user },
      { expiresIn: 1000 * 60 * 30, secret: this.configService.get('AT_SECRET') },
    );
    return { token };
  }
}
