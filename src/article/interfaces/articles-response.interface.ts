import { ArticleEntity } from '../article.entity';

export interface ArticlesResponseInterface {
  readonly articles: ArticleEntity[];
  readonly articlesCount: number;
}
