import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UserDto {
  @IsBoolean()
  @IsOptional()
  isAdmin: boolean;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  no: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  sex: string;

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
  qq: string;

  @IsString()
  @IsOptional()
  className: string;

  @IsString()
  @IsOptional()
  roomName: string;

  @IsString()
  @IsOptional()
  selfResume: string;

  @IsString()
  @IsOptional()
  adminResume: string;

  @IsString()
  @IsOptional()
  birthPlace: string;

  @IsString()
  @IsOptional()
  birthday: string;

  @IsString()
  @IsOptional()
  avatarUrl: string;
}
