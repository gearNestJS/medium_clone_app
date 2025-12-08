import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticleEntity } from './article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { generateSlug } from 'src/utils/generate-slug.util';
import { UserEntity } from 'src/users/user.entity';
import { DeleteResult } from 'typeorm/browser';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticlesResponseInterface } from './interfaces/articles-response.interface';
import { ListArticlesQueryDto } from './dto/list-articles-query.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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

  async deleteArticle(
    slug: string,
    currentUserId: number,
  ): Promise<DeleteResult> {
    const { id } = (await this.getArticle(slug)).author;

    if (id !== currentUserId) {
      throw new HttpException(
        'You are not the author of the article',
        HttpStatus.FORBIDDEN,
      );
    }

    return await this.articleRepository.delete({ slug });
  }

  async updateArticle(
    updateArticleDto: UpdateArticleDto,
    slug: string,
    currentUserId: number,
  ): Promise<ArticleEntity> {
    const article = await this.getArticle(slug);

    if (article.author.id !== currentUserId) {
      throw new HttpException(
        'You are not the author of the article',
        HttpStatus.FORBIDDEN,
      );
    }

    if (updateArticleDto.title) {
      article.slug = generateSlug(updateArticleDto.title);
    }

    Object.assign(article, updateArticleDto);

    return await this.articleRepository.save(article);
  }

  async listArticles(
    currentUserId: number,
    query: ListArticlesQueryDto,
  ): Promise<ArticlesResponseInterface> {
    const { author, limit, offset, tag } = query;
    const queryBuilder = this.articleRepository.createQueryBuilder('articles');

    queryBuilder.leftJoinAndSelect('articles.author', 'author');

    // Фильтрация по автору
    // Таблица users (с псевдонимом author) уже присоединена к запросу.
    // Мы можем просто добавить условие WHERE для этой присоединенной таблицы
    if (author) {
      queryBuilder.andWhere('author.username = :username', {
        username: author,
      });
    }

    // Фильтрация по тегу
    if (tag) {
      // tagList - это массив строк
      // :tag = ANY(articles.tagList) - это PostgreSQL-синтаксис для проверки наличия элемента в массиве
      queryBuilder.andWhere(':tag = ANY(articles.tagList)', { tag });
    }

    // Пагинация
    // Разработчики TypeORM официально рекомендуют использовать .take() и .skip() для пагинации.
    // Внутренне они все равно вызывают .limit() и .offset(), но предоставляют более удобный и безопасный API для разработчика.
    // Особенно это актуально при использовании getManyAndCount(), где эта пара методов работает предсказуемо.
    queryBuilder.take(limit ?? 10);
    queryBuilder.skip(offset ?? 0);

    // Сортировка по дате создания, новые первые
    queryBuilder.orderBy('articles.createdAt', 'DESC');

    const [articles, articlesCount] = await queryBuilder.getManyAndCount();

    return { articles, articlesCount };
  }

  async favoriteArticle(slug: string, id: number): Promise<ArticleEntity> {
    const article = await this.getArticle(slug);
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['favorites'],
    });

    // Проверяем, что пользователь существует
    if (!user) {
      throw new HttpException(
        `User with id '${id}' not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    // Ищем статью в списке залайканных статей
    const alreadyFavorited = user?.favorites.some(
      (fav) => fav.id === article.id,
    );

    if (!alreadyFavorited) {
      user?.favorites.push(article);
      article.favoritesCount += 1;

      await this.userRepository.save(user);
      await this.articleRepository.save(article);
    }

    return article;
  }

  async unfavoriteArticle(slug: string, id: number): Promise<ArticleEntity> {
    const article = await this.getArticle(slug);
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['favorites'],
    });

    // Проверяем, что пользователь существует
    if (!user) {
      throw new HttpException(
        `User with id '${id}' not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    // Ищем статью в списке залайканных статей
    const index = user?.favorites.findIndex((fav) => fav.id === article.id);

    if (index >= 0) {
      user.favorites.splice(index, 1);
      article.favoritesCount -= 1;

      await this.userRepository.save(user);
      await this.articleRepository.save(article);
    }

    return article;
  }
}
