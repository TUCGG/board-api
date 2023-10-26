import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cors({
      origin: 'http://localhost:3001', // 허용할 프론트엔드 애플리케이션의 주소
      credentials: true, // 인증 정보(쿠키 등)를 전달할 때 true로 설정
    }),
  );

  await app.listen(3000);
}
bootstrap();
