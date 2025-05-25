import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,  //after this you can't send any parameter other than that are defined in dto once for now(email and password)
  }))
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
