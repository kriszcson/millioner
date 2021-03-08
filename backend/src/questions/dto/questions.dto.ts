import { Topic } from "../model/question.model";

export class QuestionDTO {
    question: string;
    answer_options: string[];
    right_answer_index: number; // 0=A, 1=B, 2=C, 3=D
    category: Topic.Enum;
    difficulty: number;
}