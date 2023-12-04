import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(no: string, dto: UserDto) {
    const user = await this.prisma.user.update({
      where: {
        no: no,
      },
      data: {
        ...dto,
      },
    });
    delete user.password;
    return user;
  }
}
