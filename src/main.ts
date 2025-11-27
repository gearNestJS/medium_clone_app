import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      // Эта опция говорит ValidationPipe: "Прими только те свойства, которые описаны в DTO с помощью декораторов. Все остальные — просто отбрось".
      // Результат: В данном случае - username будет удален из updateUserDto еще до того, как запрос дойдет до сервиса.
      // Обновление username не произойдет.
      whitelist: true,
      // Эта опция работает вместе с whitelist и добавляет еще более строгое правило: "Если в запросе пришло поле, которого нет в DTO, не просто отбрось его, а немедленно верни ошибку".
      // Результат: Клиент получит ответ 400 Bad Request с сообщением вроде "property username should not exist".
      forbidNonWhitelisted: true,
      // Автоматически преобразует типы (например, строку "123" в число 123)
      transform: false,
    }),
  );

  const host = '0.0.0.0';
  const portStr = process.env.PORT ?? '3000';
  const port = parseInt(portStr, 10);

  if (isNaN(port)) {
    console.error(`Invalid port value: ${portStr}`);
    process.exit(1);
  }

  await app.listen(port, host);
}
bootstrap();
