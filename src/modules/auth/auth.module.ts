import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TwitterStrategy } from './strategies/twitter.strategy';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [JwtModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, TwitterStrategy],
})
export class AuthModule {}
