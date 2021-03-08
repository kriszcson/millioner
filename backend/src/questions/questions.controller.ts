import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QuestionDTO } from './dto/questions.dto';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {

    constructor(private readonly questionServive: QuestionsService) { }

    @Post()
    async insertOne(@Body() questionDto: QuestionDTO) {
        return await this.questionServive.insertOne(questionDto);
    }

    @Get(':random')
    async getRandom(@Param('random') difficult: any) {
        return await this.questionServive.getOneByDifficult(difficult);
    }

    @Get()
    async getAll() {
        return await this.questionServive.getAll();
    }


}
