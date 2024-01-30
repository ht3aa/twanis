import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1/');

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // enable credentials (cookies, authorization headers)
  });

  app.use((req, res, next) => {
    // Set your cookie without the 'Secure' attribute
    res.cookie('accessToken', 'your_token_value', {
      httpOnly: true,
      // other options as needed
    });
    next();
  });

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Twanis API')
    .setDescription('Twanis API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);

  await app.listen(8000);
}
bootstrap();
