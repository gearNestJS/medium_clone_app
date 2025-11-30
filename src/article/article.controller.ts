import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticleService } from './article.service';
import { ArticleResponseInterface } from './interfaces/article-response.interface';
import { User } from '../users/decorators/user.decorator';
import { AuthGuard } from '../users/guards/auth.guard';
import { articleMapper } from '../mappers/article.mapper';
import { UserEntity } from 'src/users/user.entity';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createArticle(
    @Body('article') createArticleDto: CreateArticleDto,
    @User() user: UserEntity,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.createArticle(
      user,
      createArticleDto,
    );

    return articleMapper(article);
  }

  @Get(':slug')
  async getArticle(
    @Param('slug') slug: string,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.getArticle(slug);

    return articleMapper(article);
  }

  @Delete(':slug')
  @UseGuards(AuthGuard)
  async deleteArticle(
    @Param('slug') slug: string,
    @User('id') id: number,
  ): Promise<void> {
    await this.articleService.deleteArticle(slug, id);
  }
}
