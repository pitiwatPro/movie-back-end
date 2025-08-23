import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/middlewares/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import configuration from './common/config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const env = configuration().app;
  app.enableCors(env.cors);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix(env.globalPrefix);

  const config = new DocumentBuilder()
    .setTitle('The Movie API ')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);

  await app.listen(env.port);
}
bootstrap();
