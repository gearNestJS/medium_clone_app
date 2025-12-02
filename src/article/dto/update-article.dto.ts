import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateArticleDto {
  @IsOptional() // Разрешает поле отсутствовать в запросе
  @IsString()
  @IsNotEmpty() // Запрещает пустые строки, если поле есть
  readonly title?: string; // TypeScript знает, что поле опционально

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly description?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly body?: string;
}
