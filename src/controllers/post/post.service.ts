import { HttpException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReorderPostDto } from './dto/reorder-post.dto';
import _ from 'lodash';
import { Post } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}

  create(createPostDto: CreatePostDto) {
    return this.prismaService.post.create({
      data: createPostDto,
    });
  }

  findAll() {
    return this.prismaService.post.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: number) {
    const post = await this.prismaService.post.findUnique({
      select: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        title: true,
        content: true,
      },
      where: { id },
    });
    if (!post) {
      throw new HttpException(
        `Post id: ${id} Not Found, Please Contact Developers`,
        404,
      );
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.prismaService.post.update({
      where: { id },
      data: updatePostDto,
    });
  }

  remove(id: number) {
    return this.prismaService.post.delete({
      where: { id },
    });
  }

  async reorder(reorderPostDto: ReorderPostDto) {
    const posts = await this.findAll();

    const [sourcePost] = posts.splice(reorderPostDto.sourceIndex, 1);
    posts.splice(reorderPostDto.targetIndex, 0, sourcePost);

    const updatePromises = _.map(posts, (post: Post, index: number) => {
      return this.prismaService.post.update({
        where: { id: post.id },
        data: { order: index },
      });
    });

    return await Promise.all(updatePromises);
  }
}
