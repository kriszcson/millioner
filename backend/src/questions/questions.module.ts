import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { QuestionsSchema } from './model/question.model';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';

@Module({
    imports: [MongooseModule.forFeature([{
        name: 'Questions', schema: QuestionsSchema
    }])],
    providers: [QuestionsService],
    controllers: [QuestionsController]

})
export class QuestionsModule { }
