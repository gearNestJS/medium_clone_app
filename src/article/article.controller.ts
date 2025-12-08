import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticleService } from './article.service';
import { ArticleResponseInterface } from './interfaces/article-response.interface';
import { User } from '../users/decorators/user.decorator';
import { AuthGuard } from '../users/guards/auth.guard';
import { articleMapper } from '../mappers/article.mapper';
import { UserEntity } from 'src/users/user.entity';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticlesResponseInterface } from './interfaces/articles-response.interface';
import { ListArticlesQueryDto } from './dto/list-articles-query.dto';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  @UsePipes(new ValidationPipe())
  async listArticles(
    @User('id') currentUserId: number,
    @Query() query: ListArticlesQueryDto,
  ): Promise<ArticlesResponseInterface> {
    return await this.articleService.listArticles(currentUserId, query);
  }

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
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

  @Put(':slug')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateArticle(
    @Body('article') updateArticleDto: UpdateArticleDto,
    @Param('slug') slug: string,
    @User('id') currentUserId: number,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.updateArticle(
      updateArticleDto,
      slug,
      currentUserId,
    );

    return articleMapper(article);
  }
}
