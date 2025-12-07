import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class ListArticlesQueryDto {
  @IsOptional()
  // Критически важный декоратор для query-параметров. Он говорит ValidationPipe преобразовать значение (которое всегда строка) в число.
  @Type(() => Number)
  @IsInt()
  @Min(1) // Дополнительные правила (например, limit не может быть меньше 1)
  readonly limit?: number = 10; // Значение по умолчанию, если параметр не передан

  @IsOptional()
  // Критически важный декоратор для query-параметров. Он говорит ValidationPipe преобразовать значение (которое всегда строка) в число.
  @Type(() => Number) // Важно: преобразует строку из query в число
  @IsInt()
  @Min(0) // Дополнительные правила (например, offset не может быть меньше 0)
  readonly offset?: number = 0; //  Значение по умолчанию, если параметр не передан

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly tag?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly author?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly favorited?: string;
}
