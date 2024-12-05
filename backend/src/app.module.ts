import { Module } from '@nestjs/common';
import { DraftController } from './controller/draft';
import { DraftService } from './service/draft';
import { ResponseDataInterceptor } from './interceptor/response-data';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseErrorInterceptor } from './interceptor/response-error';
import { AuthProvider } from './provider/auth-provider';
import { PrismaProvider } from './provider/prisma';
import { AuthController } from './controller/auth';
import { AuthService } from './service/auth';

@Module({
  imports: [],
  controllers: [AuthController, DraftController],
  providers: [
    DraftService,
    AuthService,
    AuthProvider,
    PrismaProvider,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseDataInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseErrorInterceptor,
    },
  ],
})
export class AppModule {}
