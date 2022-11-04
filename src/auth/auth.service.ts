import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto, SignUpDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  // inscreva-se
  async signup(dto: SignUpDto) {
    try {
      const hash = await argon2.hash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hash,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
      });

      return this.signToken({ userId: user.id, email: user.email });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }

      throw error;
    }
  }

  // login
  async signin(dto: SignInDto) {
    try {
      const user = await this.prisma.user.findFirstOrThrow({
        where: { email: dto.email },
      });

      const pwdMatch = await argon2.verify(user.hash, dto.password);
      if (!pwdMatch) {
        throw new ForbiddenException();
      }

      return this.signToken({ userId: user.id, email: user.email });
    } catch (error) {
      throw new ForbiddenException('Credentials incorrect');
    }
  }

  async signToken({
    userId,
    email,
  }: {
    userId: number;
    email: string;
  }): Promise<{ access_token: string }> {
    const payload = { sub: userId, email };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: this.config.get('SIGN_IN_EXPIRATION_TIME'),
      secret,
    });

    return { access_token: token };
  }
}
