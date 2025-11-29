import { ArticleEntity } from 'src/article/article.entity';
import { ArticleResponseInterface } from 'src/article/interfaces/article-response.interface';

export function articleMapper(
  article: ArticleEntity,
): ArticleResponseInterface {
  return {
    article,
  };
}
