import { IsOptional, IsString, IsNumber } from 'class-validator';
export class MessageDto {
  @IsNumber()
  userId: number;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  content: string;

  @IsString()
  @IsOptional()
  time: string;
}
