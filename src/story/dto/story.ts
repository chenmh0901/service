import { IsString, IsNumber } from 'class-validator';

export class StoryDto {
  @IsNumber()
  id: number;

  @IsString()
  userName: string;
}
