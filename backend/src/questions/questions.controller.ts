import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { QuestionDTO } from './dto/questions.dto';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {

    constructor(private readonly questionServive: QuestionsService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async insertOne(@Body() questionDto: QuestionDTO) {
        return await this.questionServive.insertOne(questionDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':random')
    async getRandom(@Param('random') difficult: any) {
        return await this.questionServive.getOneByDifficult(difficult);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll() {
        return await this.questionServive.getAll();
    }


}
