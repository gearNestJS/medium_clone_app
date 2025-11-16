import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const host = '0.0.0.0'; // <-- для доступа извне контейнера
  const portStr = process.env.PORT ?? '3000'; // <-- Безопасное получение строки
  const port = parseInt(portStr, 10);

  if (isNaN(port)) {
    console.error(`Invalid port value: ${portStr}`);
    process.exit(1);
  }

  await app.listen(port, host);
}
bootstrap();
