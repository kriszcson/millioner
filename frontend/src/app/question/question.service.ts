import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Question, Topic } from './model/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private readonly http: HttpClient) { }

  getRandomByDifficulty(difficulty: number, token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${environment.API_URL}/questions/${difficulty}`, { headers: headers });
  }

  getRandomByTopic(topic: string, difficulty: number, token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${environment.API_URL}/questions/topicdiff/${topic}/${difficulty.toString()}`, { headers: headers });
  }

  insertOne(question: any) {
    const newQuestion: Question = {
      question: question.question,
      answer_options: [question.rightAnswer, question.wrongAnswerA, question.wrongAnswerB, question.wrongAnswerC],
      right_answer_index: 0,
      difficulty: question.difficulty,
      category: question.category
    }
    return this.http.post<any>(`${environment.API_URL}/questions/`, newQuestion);
  }
}
