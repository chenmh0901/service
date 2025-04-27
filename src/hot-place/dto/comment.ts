import { IsString, IsNumber } from 'class-validator';

export class HotPlaceDto {
  @IsNumber()
  id: number;

  @IsString()
  location: string;

  @IsNumber()
  recommend: number;

  @IsNumber()
  visit: number;

  @IsNumber()
  like: number;
}
