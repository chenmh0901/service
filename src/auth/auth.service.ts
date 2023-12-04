import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: { ...dto, password: hash },
      });
      delete user.password;

      return user;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw e;
    }
  }

  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { no: dto.no },
    });
    if (!user) {
      throw new ForbiddenException('Credentials not found');
    }

    const matches = await argon.verify(user.password, dto.password);
    if (!matches) {
      throw new ForbiddenException('Credentials incorrect');
    }

    return this.signToken(user.id, user.no);
  }

  async signToken(
    id: number,
    no: string,
  ): Promise<{
    access_token: string;
  }> {
    const payload = {
      sub: id,
      no: no,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1d',
      secret,
    });
    return { access_token: token };
  }
}
