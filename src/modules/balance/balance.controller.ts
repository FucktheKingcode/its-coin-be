import { Body, Controller, Param, Patch } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('balance-energy')
@Controller()
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}
  @Patch('balance-energy/:id')
  async updateBalanceAndEnergyUser(@Param('id') id: string, @Body() body: UpdateBalanceDto) {
    return await this.balanceService.updateBalanceAndEnergyUser(id, body);
  }
}
