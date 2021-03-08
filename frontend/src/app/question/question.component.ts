import { Component, OnInit } from '@angular/core';

import { Question, Award, levels } from './model/question.model';
import { QuestionService } from './question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  started = false;
  difficulty: number = 0;
  question: Question;
  success: boolean;
  award: Award.Enum = Award.Enum.q0;
  awardNext: Award.Enum = Award.Enum.q1;
  failed = false;


  constructor(private readonly questionService: QuestionService) { }

  ngOnInit(): void {
    this.getQuestion();
  }

  async getQuestion() {
    this.difficulty++;
    this.success = null;
    this.questionService.getRandomByDifficulty(this.difficulty)
      .subscribe((data => {
        this.question = data;
        this.start();
      }))
  }

  start() {
    if (this.question) {
      this.started = true;
    } else {
      this.started = false;
    }
  }

  nextQuestion() {
    this.success = false;
    this.getQuestion();
  }

  checkAnswer(answerIndex: any) {
    if (answerIndex == this.question.right_answer_index) {
      this.success = true;
      this.awardBalance();

      setTimeout(() => {
        this.nextQuestion();
      }, 3000);
    } else {
      this.success = false;
      setTimeout(() => {
        this.finishQuiz();
      }, 3000);
    }
  }

  awardBalance() {
    this.award = levels[this.difficulty].award;
    this.awardNext = levels[this.difficulty + 1].award;
  }

  finishQuiz() {
    this.failed = true;
  }

  checkAmount(): number {
    if (this.award == Award.Enum.q0 || this.award == Award.Enum.q1 || this.award == Award.Enum.q2 || this.award == Award.Enum.q3) {
      return 0;
    }
    if (this.award == Award.Enum.q4 || this.award == Award.Enum.q5 || this.award == Award.Enum.q6) {
      return Award.Enum.q4;
    }
    if (this.award == Award.Enum.q7 || this.award == Award.Enum.q8 || this.award == Award.Enum.q9) {
      return Award.Enum.q7;
    }
    return Award.Enum.q10;
  }

  newGame() {
    this.difficulty = 0;
    this.award = Award.Enum.q0;
    this.awardNext = Award.Enum.q1;
    this.failed = false;
    this.getQuestion();
  }
}