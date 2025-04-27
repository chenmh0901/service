import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentDto } from './dto/comment';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {
  }

  async getAllComment(
    storyId: number,
  ): Promise<CommentDto[]> {
    const comment = await this.prisma.comment.findMany({
      where: {
        storyId,
      },
    });
    return comment;
  }

  async getComment(
  ): Promise<CommentDto[]> {
    const comment = await this.prisma.comment.findMany();
    return comment;
  }

  async createComment(
    commentDto: CommentDto,
  ): Promise<{
    status: string;
    message: string;
    data: CommentDto;
  }> {
    const comment = await this.prisma.comment.create({
      data: commentDto,
    });
    return {
      status: 'success',
      message: 'Comment created successfully',
      data: comment,
    };
  }
}
