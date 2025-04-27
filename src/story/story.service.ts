import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StoryDto } from './dto/story';

@Injectable()
export class StoryService {
  constructor(private prisma: PrismaService) {
  }

  async getStory(
  ): Promise<StoryDto[]> {
    const story = await this.prisma.story.findMany();
    return story;
  }

  async createStory(
    storyDto: StoryDto,
  ): Promise<{
    status: string;
    message: string;
    data: StoryDto;
  }> {
    const story = await this.prisma.story.create({
      data: storyDto,
    });
    return {
      status: 'success',
      message: 'Story created successfully',
      data: story,
    };
  }
}
