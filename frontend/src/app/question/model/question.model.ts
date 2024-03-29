
export interface Question {
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

export const categories = [
    Topic.Enum.GEO, Topic.Enum.HISTORY, Topic.Enum.IT, Topic.Enum.LITERATURE, Topic.Enum.MOVIES, Topic.Enum.MUSIC, Topic.Enum.REAL, Topic.Enum.SPORTS
]

export namespace Award {
    export enum Enum {
        q0 = 0,
        q1 = 1000,
        q2 = 10000,
        q3 = 50000,
        q4 = 100000, //megállhat

        q5 = 200000,
        q6 = 300000,
        q7 = 500000,//megállhat

        q8 = 1000000,
        q9 = 5000000,
        q10 = 25000000 //főnyeremény
    }
}


export const levels = [
    { award: Award.Enum.q0 },
    { award: Award.Enum.q1 },
    { award: Award.Enum.q2 },
    { award: Award.Enum.q3 },
    { award: Award.Enum.q4 },
    { award: Award.Enum.q5 },
    { award: Award.Enum.q6 },
    { award: Award.Enum.q7 },
    { award: Award.Enum.q8 },
    { award: Award.Enum.q9 },
    { award: Award.Enum.q10 },
]
