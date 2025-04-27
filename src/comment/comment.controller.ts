import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }
  @Get('all')
  async getComment(
    @Query('storyId') storyId: number,
  ) {
    const comment = await this.commentService.getAllComment(storyId);
    return comment;
  }

  @Post('upload')
  async createComment(
    @Body() commentDto: CommentDto,
  ) {
    const comment = await this.commentService.createComment(commentDto);
    return comment;
  }
}
