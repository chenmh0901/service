import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  IsInt,
} from 'class-validator';

export class AuthDto {
  @IsOptional()
  @IsInt()
  account: number;

  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  password: string;
}
