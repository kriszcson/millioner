import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { QuestionsModule } from './questions/questions.module'
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, MongooseModule.forRoot("mongodb+srv://admin:admin@cluster0.vripv.mongodb.net/Quiz?retryWrites=true&w=majority", { useNewUrlParser: true }), QuestionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
