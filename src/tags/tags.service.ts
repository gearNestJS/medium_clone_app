import { Injectable } from '@nestjs/common';

@Injectable()
export class TagsService {
  getAllTags(): string[] {
    return ['a', 'b', 'c'];
  }
}
