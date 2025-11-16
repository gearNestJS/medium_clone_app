import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const host = '0.0.0.0';
  // Получаем строковое значение PORT или '3000' по умолчанию
  const portStr = process.env.PORT ?? '3000';
  // Теперь parseInt получает строку
  const port = parseInt(portStr, 10);

  // Опционально: проверить, является ли результат числом
  if (isNaN(port)) {
    console.error(`Invalid port value: ${portStr}`);
    process.exit(1);
  }

  await app.listen(port, host);
}
bootstrap();
