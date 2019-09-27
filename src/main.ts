import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import SwaggerSetup from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  SwaggerSetup(app);
  app.enableCors({
    origin: '*'
  });

  await app.listen(process.env.PORT);
}
bootstrap();
