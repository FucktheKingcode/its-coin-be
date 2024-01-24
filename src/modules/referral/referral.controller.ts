import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ReferralService } from './referral.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateReferrerUser } from './dto/update-referrer.dto';

@ApiTags('referral')
@Controller('referral')
export class ReferralController {
  constructor(private readonly referralService: ReferralService) {}
  @Patch(':id')
  async updateReferrerUser(@Param('id') id: string, @Body() body: UpdateReferrerUser) {
    return await this.referralService.updateReferrerUser(id, body);
  }
}
