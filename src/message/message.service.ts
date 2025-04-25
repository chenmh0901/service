import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MessageDto } from './dto';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) { }

  async postMsg(dto: MessageDto) {
    const msg = await this.prisma.message.create({
      data: {
        ...dto,
      },
    });
    return msg;
  }

  async editMsg(id: number, dto: MessageDto) {
    const msg = await this.prisma.message.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
      },
    });
    return msg;
  }

  async getMsgAll() {
    const msgs = await this.prisma.message.findMany();
    return msgs;
  }

  async getMsg(id: number) {
    const msg = await this.prisma.message.findUnique({
      where: {
        id: id,
      },
    });
    return msg;
  }

  async deleteMsg(id: number) {
    const msg = await this.prisma.message.delete({
      where: {
        id: id,
      },
    });
    return msg;
  }
}
