import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

import { ApiTags } from '@nestjs/swagger';
import { TwitterGuard } from './guards/twitter.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('twitter')
  @UseGuards(TwitterGuard)
  async loginTwitter() {}

  @Get('twitter/callback')
  @UseGuards(TwitterGuard)
  async loginTwitterCallback(@Req() req, @Res() res) {
    if (req.user) {
      res.redirect(`https://inquisitive-lily-32796f.netlify.app/twitter?userId=${req.user.twitter_info.id}`);
    }
  }
}
