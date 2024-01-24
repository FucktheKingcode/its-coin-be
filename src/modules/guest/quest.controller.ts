import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { QuestService } from './quest.service';
import { CreateQuestDto } from './dto/create-quest.dto';
import { UpdateQuestDto } from './dto/update-quest.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FindQuestsDto } from './dto/find-quests.dto';
import { UpdateStatusQuestDto } from './dto';

@ApiTags('quest')
@Controller('quest')
export class QuestController {
  constructor(private readonly questService: QuestService) {}

  @ApiOkResponse({ type: () => CreateQuestDto })
  @Post()
  create(@Body() body: CreateQuestDto) {
    return this.questService.create(body);
  }

  @Get('all')
  findAll(@Query() query: FindQuestsDto) {
    return this.questService.findAll(query);
  }

  @ApiOkResponse({ type: () => CreateQuestDto })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questService.findOne(id);
  }

  @ApiOkResponse({ type: () => CreateQuestDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateQuestDto) {
    return this.questService.update(id, body);
  }

  @ApiOkResponse({ type: () => CreateQuestDto })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questService.remove(id);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: UpdateStatusQuestDto) {
    return this.questService.updateStatus(id, body);
  }
}
