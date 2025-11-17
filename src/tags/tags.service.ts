import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  getAllTags(): string[] {
    return ['a', 'b', 'c'];
  }

  async findAll() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return await this.prisma.tag.findMany();
  }

  // async createTag(name: string) {
  //   return await this.prisma.tag.create({
  //     data: { name },
  //   });
  // }
}
