import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

export class CommentDto {
  @IsNumber()
  id: number;

  @IsString()
  comment: string;

  @IsString()
  userName: string;

  @IsString()
  updatedAt: string;

  @IsString()
  createdAt: string;
}
