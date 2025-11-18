import { Controller, Get } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag } from './tag.entity';
import { ITags } from './interfaces/tag.interface';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  async findAllTags(): Promise<ITags> {
    const tags = await this.tagsService.findAll();
    return {
      tags: tags.map((tag: Tag) => tag.text),
    };
  }
}
