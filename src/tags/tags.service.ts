import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ) {}

  async findAll(): Promise<Tag[]> {
    return this.tagsRepository.find();
  }

  async create(name: string): Promise<Tag> {
    const tag = this.tagsRepository.create({ name });
    return this.tagsRepository.save(tag);
  }
}
