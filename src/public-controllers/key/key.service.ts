import { HttpException, Injectable } from '@nestjs/common';
import { CreateKeyDto } from './dto/create-key.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class KeyService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createKeyDto: CreateKeyDto) {
    // 產生32碼的隨機字串 英文大小寫+數字
    const key = Array.from(
      { length: 64 },
      () => Math.random().toString(36)[2],
    ).join('');

    if (
      await this.prisma.apiKey.findFirst({
        where: {
          name: createKeyDto.name,
        },
      })
    ) {
      throw new HttpException('Name already exists', 400);
    }

    return this.prisma.apiKey.create({
      data: {
        name: createKeyDto.name,
        key,
      },
    });
  }

  findAll() {
    return this.prisma.apiKey.findMany();
  }

  findOne(name: string) {
    return this.prisma.apiKey.findFirst({
      where: {
        name,
      },
    });
  }

  async remove(name: string) {
    const key = await this.prisma.apiKey.findFirst({
      where: {
        name,
      },
    });
    if (!key) return;
    return this.prisma.apiKey.delete({
      where: {
        id: key.id,
      },
    });
  }
}
