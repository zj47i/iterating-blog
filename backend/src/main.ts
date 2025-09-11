import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule, {
    bodyParser: true,
  });
  app.enableCors();
  app.useBodyParser('json', { limit: '50mb' });
  await app.listen(3000);
}
bootstrap();
