import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticleEntity } from './article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { generateSlug } from 'src/utils/generate-slug.util';
import { UserEntity } from 'src/users/user.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async createArticle(
    user: UserEntity,
    createArticleDto: CreateArticleDto,
  ): Promise<ArticleEntity> {
    const { title, tagList } = createArticleDto;
    const newArticle = new ArticleEntity();
    Object.assign(newArticle, createArticleDto);

    if (!tagList) {
      newArticle.tagList = [];
    }

    newArticle.slug = generateSlug(title);
    newArticle.author = user;

    return await this.articleRepository.save(newArticle);
  }

  async getArticle(slug: string): Promise<ArticleEntity> {
    const article = await this.articleRepository.findOneBy({ slug });

    if (!article) {
      throw new HttpException(
        `Article with slug '${slug}' not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return article;
  }
}
