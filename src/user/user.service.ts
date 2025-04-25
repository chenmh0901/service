import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async editUser(id: number, dto: UserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
      },
    });
    delete user.password;
    return user;
  }

  async getUserAll() {
    const users = await this.prisma.user.findMany();
    return users.map((user) => {
      delete user.password;
      return user;
    });
  }

  async getUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    delete user.password;
    return user;
  }

  async updateUserAvatar(userId: number, avatarPath: string) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        avatarUrl: avatarPath,
      },
    });
    return user;
  }
}
