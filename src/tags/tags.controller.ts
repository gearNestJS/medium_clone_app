import { Controller, Get } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag } from './tag.entity';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  findAllTags(): Promise<Tag[]> {
    return this.tagsService.findAll();
  }
}
