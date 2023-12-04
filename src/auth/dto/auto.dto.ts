import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @Length(6, 20)
  password: string;

  @IsString()
  @IsEmail()
  email?: string;

  @IsString()
  phone?: string;

  @IsString()
  wechat?: string;

  @IsString()
  QQ?: string;

  @IsString()
  class?: string;

  @IsString()
  room?: string;

  @IsString()
  resume?: string;
}
