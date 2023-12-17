import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  wechat: string;

  @IsString()
  @IsOptional()
  QQ: string;

  @IsString()
  @IsOptional()
  class: string;

  @IsString()
  @IsOptional()
  room: string;

  @IsString()
  @IsOptional()
  resume: string;

  @IsString()
  @IsOptional()
  birthPlace: string;
}
