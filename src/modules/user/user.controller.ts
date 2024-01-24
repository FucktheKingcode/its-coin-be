import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { GetRankDto, UpdatePasswordDto } from './dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Patch(':id/password')
  async updatePassword(@Param('id') id: string, @Body() body: UpdatePasswordDto) {
    return await this.userService.updatePasswordUser(id, body);
  }

  @Patch(':id/sign-transaction')
  async signTransaction(@Param('id') id: string, @Body() body: UpdatePasswordDto) {
    return await this.userService.signTransaction(id, body);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.userService.getUser(id);
  }

  @Get('ranking')
  async getRanking(@Query() query: GetRankDto) {
    return await this.userService.getRanking(query);
  }
}
