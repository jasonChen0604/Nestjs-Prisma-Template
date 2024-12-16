import { Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { RegisterDto } from './dto/Register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: RegisterDto) {
    const user = await this.prisma.user.create({
      data,
    });

    return user;
  }

  async login(data: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (user.password !== data.password) {
      throw new Error('Password is incorrect');
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      },
    );

    return token;
  }
}
