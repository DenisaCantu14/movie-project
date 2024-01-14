import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const configuration = new DocumentBuilder()
  .setTitle('Movie')
  .setVersion('1.0')
  .addTag('app')
  .build();

export function createSwagger(app: INestApplication): INestApplication {
  const document = SwaggerModule.createDocument(app, configuration);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });
  return app;
}
