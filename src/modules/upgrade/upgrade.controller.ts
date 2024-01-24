import { Controller, Param, Patch } from '@nestjs/common';
import { UpgradeService } from './upgrade.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('upgrade')
@Controller('upgrade')
export class UpgradeController {
  constructor(private readonly upgradeService: UpgradeService) {}

  @Patch(':id/tap-power')
  async updateTapPower(@Param('id') id: string) {
    return await this.upgradeService.updateTapPower(id);
  }

  @Patch(':id/tap-bot')
  async updateTapBot(@Param('id') id: string) {
    return await this.upgradeService.updateTapBot(id);
  }

  @Patch(':id/energy-limit')
  async updateEnergyLimit(@Param('id') id: string) {
    return await this.upgradeService.updateEnergyLimit(id);
  }

  @Patch(':id/recharging-speed')
  async updateRechargingSpeed(@Param('id') id: string) {
    return await this.upgradeService.updateRechargingSpeed(id);
  }
}
