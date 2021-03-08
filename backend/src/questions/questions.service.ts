import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuestionDTO } from './dto/questions.dto';
import { Question } from './model/question.model';

@Injectable()
export class QuestionsService {

    constructor(@InjectModel('Questions') private readonly questionModel: Model<Question>) { }

    async getAll(): Promise<Question[]> {
        return await this.questionModel.find().exec();
    }

    async insertOne(questionDto: QuestionDTO) {
        const question = new this.questionModel({
            question: questionDto.question,
            ...questionDto
        })
        await question.save();
        return question;
    }

    async getOneByDifficult(difficult: any) {
        return this.getRandomQuestion(await this.getAllByDifficulty(difficult));
    }

    private async getAllByDifficulty(difficult: any): Promise<Question[]> {
        let questionsByDifficulty: Question[] = [];
        for (let question of await this.getAll()) {
            if (question.difficulty.toString() == difficult) {
                questionsByDifficulty.push(question);
            }
        } return questionsByDifficulty;
    }

    private getRandomQuestion(questions: Question[]): Question {
        return questions[Math.floor(Math.random() * questions.length)]
    }

}
