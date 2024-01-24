import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-twitter';
import { AuthService } from '../auth.service';
import { IUserInfo } from 'src/common/interfaces/user-info.interface';
@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor(
    private configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      consumerKey: configService.get('TWITTER_CONSUMER_KEY'),
      consumerSecret: configService.get('TWITTER_CONSUMER_SECRET'),
      clientID: configService.get('TWITTER_CLIENT_ID'),
      clientSecret: configService.get('TWITTER_CLIENT_SECRET'),
      callbackURL: configService.get('TWITTER_CALLBACK_URL'),
    });
  }

  async validate(token: string, tokenSecret: string, profile: any) {
    const userInfo: IUserInfo = {
      id: profile.id,
      name: profile.displayName,
      username: profile.username,
      photos: profile.photos,
    };

    console.log(token);
    console.log(tokenSecret);

    const newUser = await this.authService.validateUser(userInfo);
    return newUser;
  }
}
