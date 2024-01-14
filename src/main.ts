import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createSwagger } from "./swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await createSwagger(app).listen(8080, '0.0.0.0');
}
bootstrap().then();
