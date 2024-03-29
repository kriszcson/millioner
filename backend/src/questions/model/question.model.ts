import * as mongoose from 'mongoose';

export const QuestionsSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer_options: { type: [], required: true },
    right_answer_index: { type: Number, required: true },
    category: { type: String, required: true },
    difficulty: { type: Number }
}, { timestamps: true })

export interface Question extends mongoose.Document {
    question: string;
    answer_options: string[]; // 0=A, 1=B, 2=C, 3=D
    right_answer_index: number;
    category: Topic.Enum;
    difficulty: number;
}

export namespace Topic {
    export enum Enum {
        SPORTS = 'SPORTS',
        LITERATURE = 'LITERATURE',
        MOVIES = 'MOVIES',
        HISTORY = 'HISTORY',
        MUSIC = 'MUSIC',
        GEO = 'GEO',
        IT = 'IT',
        REAL = 'REAL'
    }
}

export interface AnswerOptions {
    A: string;
    B: string;
    C: string;
    D: string;
}
