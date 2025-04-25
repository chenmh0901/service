import { Body, Controller, Get, Param, Post, Patch, UseGuards, Delete } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { MessageService } from './message.service';
import { MessageDto } from './dto';

@UseGuards(JwtGuard)
@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) { }

  @Get('all')
  getMsgAll() {
    return this.messageService.getMsgAll();
  }

  @Post('')
  async postMsg(@Body() dto: MessageDto) {
    return this.messageService.postMsg(dto);
  }

  @Patch(':id')
  async editMsg(
    @Param('id') id: string,
    @Body() dto: MessageDto,
  ) {
    return this.messageService.editMsg(parseInt(id), dto);
  }

  @Get(':id')
  getMsg(@Param('id') id: string) {
    const msgId = parseInt(id);
    return this.messageService.getMsg(msgId);
  }

  @Delete(':id')
  deleteMsg(@Param('id') id: string) {
    const msgId = parseInt(id);
    return this.messageService.deleteMsg(msgId);
  }
}
