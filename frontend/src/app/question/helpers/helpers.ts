import { Question } from "../model/question.model";

export class Helpers {

    getHalf(question: Question) {
        delete question.answer_options[this.getRandom()];
        return question;
    }

    getRandom() {
        return Math.floor(Math.random() * 2);
    }
}