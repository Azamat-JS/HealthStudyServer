import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig } from '../packages/lib/config/config';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from '../packages/lib/filters/all_exception_filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      'http://localhost:5176',
      'http://localhost:5177',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  app.use(cookieParser());
  const config = app.get(AppConfig);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );  await app.listen(config.port || 8000, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${config.port || 8000}`);
  });
}
bootstrap();
