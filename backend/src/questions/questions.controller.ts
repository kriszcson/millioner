import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { QuestionDTO } from './dto/questions.dto';
import { Topic } from './model/question.model';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {

    constructor(private readonly questionServive: QuestionsService) { }

    @Post()
    async insertOne(@Body() questionDto: QuestionDTO) {
        return await this.questionServive.insertOne(questionDto);
    }

    @Get(':difficulty')
    async getRandom(@Param('difficulty') difficult: any) {
        return await this.questionServive.getOneByDifficult(difficult);
    }
    @Get('topic/:topic')
    async getRandomOfTopic(@Param('topic') topic: any) {
        return await this.questionServive.getOneByTopic(topic);
    }

    @Get('topicdiff/:topic/:difficulty')
    async getRandomOfTopicAndDifficulty(
        @Param('topic') topic: any,
        @Param('difficulty') difficulty: any
    ) {
        return await this.questionServive.getOneOfTopicAndDifficulty(topic, difficulty);
    }

    @Delete('/:id')
    async deleteOne(@Param('id') id: string) {
        return await this.questionServive.deleteById(id);
    }

    @Get()
    async getAll() {
        return await this.questionServive.getAll();
    }


}
