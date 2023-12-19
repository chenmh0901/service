import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { UserDto } from './dto';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getMe(@GetUser() user: User) {
    return user;
  }

  @Get('all')
  getAll() {
    return this.userService.getUserAll();
  }

  @Patch(':no')
  async editUser(
    @Param('no') no: string,
    @Body() dto: UserDto,
    @GetUser() user: User,
  ) {
    if (user.no !== no && !user.admin) {
      return;
    }
    return this.userService.editUser(no, dto);
  }
}
