import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { SignUpInput } from './dto/singup-input';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { LoginInput } from './dto/login-input';

@Injectable()
export class AuthService {
  constructor(
    private dbService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpInput) {
    try {
      const hashedPass = await argon.hash(dto.password);
      const user = await this.dbService.user.create({
        data: {
          userName: dto.userName,
          password: hashedPass,
          email: dto.email,
        },
      });

      return user;
    } catch (err) {
      throw new HttpException({ message: err.message, devMessage: err }, 400);
    }
  }

  async login(dto: LoginInput) {
    try {
      const user = await this.dbService.user.findUnique({
        where: {
          email: dto.email,
        },
      });
      if (!user) throw new Error('User not found.');

      const isVerifyPassword = await argon.verify(user.password, dto.password);
      if (!isVerifyPassword) throw new Error('Wrong credential.');

      const accessToken = await this.generateToken(user.id, user.email);

      return { accessToken };
    } catch (err) {
      throw new BadRequestException({
        message: err.message || 'Failed to login',
        devMessage: err,
      });
    }
  }

  async verifyUser(email: string) {
    return this.dbService.user
      .findUniqueOrThrow({
        where: {
          email: email,
        },
        select: {
          id: true,
          email: true,
        },
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error;
      });
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  async generateToken(userId: string, email: string) {
    const accessToken = this.jwtService.sign(
      {
        userId,
        email,
      },
      { expiresIn: '10h', secret: process.env.ACCESS_TOKEN_SECRET },
    );
    return accessToken;
  }
}
