import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { QuestModule } from './modules/guest/quest.module';
import { ConfigModule } from '@nestjs/config';
import { MongoModule } from './database/mongo.module';
import { BalanceModule } from './modules/balance/balance.module';
import { ReferralModule } from './modules/referral/referral.module';
import { UpgradeModule } from './modules/upgrade/upgrade.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongoModule,
    AuthModule,
    UserModule,
    ReferralModule,
    BalanceModule,
    UpgradeModule,
    QuestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
