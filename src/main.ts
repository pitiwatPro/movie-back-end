import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/middlewares/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix(process.env.GLOBAL_PREFIX ?? 'api');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
