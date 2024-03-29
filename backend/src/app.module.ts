/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { QuestionsModule } from './questions/questions.module'
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    MongooseModule.forRoot(process.env.MONGO_URI, { useNewUrlParser: true }),
    QuestionsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
