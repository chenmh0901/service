import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HotPlaceDto } from './dto/comment';

@Injectable()
export class HotPlaceService {
  constructor(private prisma: PrismaService) {
  }

  async getHotPlace(
  ): Promise<HotPlaceDto[]> {
    const hotPlace = await this.prisma.hotPlace.findMany();
    return hotPlace;
  }

  async createHotPlace(
    hotPlaceDto: HotPlaceDto,
  ): Promise<{
    status: string;
    message: string;
    data: HotPlaceDto;
  }> {
    const hotPlace = await this.prisma.hotPlace.create({
      data: hotPlaceDto,
    });
    return {
      status: 'success',
      message: 'Hot place created successfully',
      data: hotPlace,
    };
  }
}
