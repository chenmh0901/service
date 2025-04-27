import { Controller, Get, Post, Body } from '@nestjs/common';
import { StoryService } from './story.service';
import { StoryDto } from './dto/story';

@Controller('story')
export class StoryController {
  constructor(private readonly storyService: StoryService) { }
  @Get('all')
  async getStory(
  ) {
    const story = await this.storyService.getStory();
    return story;
  }

  @Post('upload')
  async createStory(
    @Body() storyDto: StoryDto,
  ) {
    const story = await this.storyService.createStory(storyDto);
    return story;
  }
}
