import { Body, Controller, Get, Param, Patch, UseGuards, Post, UploadedFile, UseInterceptors, Res } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { UserDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as sharp from 'sharp';
import { Response, Express } from 'express';



@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @UseGuards(JwtGuard)
  @Get('all')
  getAll() {
    return this.userService.getUserAll();
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async editUser(
    @Param('id') id: string,
    @Body() dto: UserDto,
    @GetUser() user: User,
  ) {
    const userId = parseInt(id);
    if (user.id !== userId) {
      return;
    }
    return this.userService.editUser(userId, dto);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  getUser(@Param('id') id: string) {
    const userId = parseInt(id);
    return this.userService.getUser(userId);
  }

  @UseGuards(JwtGuard)
  @Post(':id/avatar')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/avatars',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))

  async uploadAvatar(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    const userId = parseInt(id);
    const webpFilename = `${file.filename.split('.')[0]}.webp`;
    const webpPath = join(__dirname, '..', '..', 'uploads', 'avatars', webpFilename);

    // Convert image to WebP format
    await sharp(file.path)
      .webp({ quality: 80 })
      .toFile(webpPath);

    // Update user avatar path in the database
    await this.userService.updateUserAvatar(userId, `/uploads/avatars/${webpFilename}`);

    return {
      message: '头像上传成功',
      filename: webpFilename,
    };
  }

  @Get(':id/avatar')
  async getAvatar(@Param('id') id: string, @Res() res: Response) {
    const userId = parseInt(id);
    const user = await this.userService.getUser(userId);

    if (!user || !user.avatarUrl) {
      return res.status(404).json({
        message: '用户头像不存在',
      });
    }

    const avatarPath = join(__dirname, '..', '..', user.avatarUrl);
    console.log(user.avatarUrl);
    console.log(avatarPath);
    return res.sendFile(avatarPath);
  }
}
