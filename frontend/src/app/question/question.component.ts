import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../users/users.service';
import { Question, Award, levels } from './model/question.model';
import { QuestionService } from './question.service';

import { Helpers } from './helpers/helpers';


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
  token: string;
  userEmail: string;
  rightIndexTemp: number;
  rightAnswerTemp: string;

  constructor(
    private readonly questionService: QuestionService,
    private readonly userService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.token = window.history.state.access_token;
    this.userEmail = window.history.state.email;
    if (!this.token) {
      this.router.navigate(['/users'])
    }
    this.playStartingSound();
    this.getQuestion();
  }

  async getQuestion() {
    this.difficulty++;
    this.success = null;
    this.questionService.getRandomByDifficulty(this.difficulty, this.token)
      .subscribe((data => {
        this.question = data;
        this.rightAnswerTemp = this.question.answer_options[this.question.right_answer_index];
        this.question.answer_options = this.shuffleOptions(this.question.answer_options);
        this.question.right_answer_index = this.getCorrectIndex();
        this.start();
      }))
  }


  shuffleOptions(options: string[]) {
    let currentIndex = options.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = options[currentIndex];
      options[currentIndex] = options[randomIndex];
      options[randomIndex] = temporaryValue;
    }
    return options;
  }

  getCorrectIndex() {
    for (let i = 0; i < this.question.answer_options.length; i++) {
      if (this.question.answer_options[i] == this.rightAnswerTemp) {
        this.rightIndexTemp = i;
        return i;
      }
    }
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
    setTimeout(() => {
      if (answerIndex == this.question.right_answer_index) {
        this.correctAnswering();
      } else {
        this.wrongAnswering();
      }
    }, this.randomizeTime());
  }

  correctAnswering() {
    this.success = true;
    this.awardBalance();
    this.playCorrectAnswergSound();
    setTimeout(() => {
      this.nextQuestion();
    }, 3000);
  }

  wrongAnswering() {
    this.success = false;
    this.playWrongAnserSound();
    setTimeout(() => {
      this.finishQuiz();
    }, 3000);
  }


  awardBalance() {
    this.award = levels[this.difficulty].award;
    this.awardNext = levels[this.difficulty + 1].award;
  }

  finishQuiz() {
    this.failed = true;
    this.savePoints();
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

  savePoints() {
    this.userService.updatePoints(this.userEmail, this.checkAmount()).subscribe(data => {
    });
  }

  playStartingSound() {
    let audio = new Audio();
    audio.src = "../../assets/sounds/lets play.mp3";
    audio.load();
    audio.play();
  }

  playCorrectAnswergSound() {
    let audio = new Audio();
    audio.src = "../../assets/sounds/correct answer.mp3";
    audio.load();
    audio.play();
  }

  playWrongAnserSound() {
    let audio = new Audio();
    audio.src = "../../assets/sounds/wrong answer.mp3";
    audio.load();
    audio.play();
  }

  newGame() {
    this.difficulty = 0;
    this.award = Award.Enum.q0;
    this.awardNext = Award.Enum.q1;
    this.failed = false;
    this.getQuestion();
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  randomizeTime() {
    return Math.floor(Math.random() * 5000);
  }

  getHalf() {
    let twoOptions: string[] = [];
    twoOptions.push(this.question.answer_options[this.question.right_answer_index]);
    let i = 0;
    for (let i = 0; i < this.question.answer_options.length; i++) {
      if (i != this.question.right_answer_index && i < 2) {
        twoOptions.push(this.question.answer_options[i]);
        i++;
      }
    }
    this.question.answer_options = twoOptions;
    for (let i = 0; i < this.question.answer_options.length; i++) {
      if (this.question.answer_options[i] == this.rightAnswerTemp) {
        this.question.right_answer_index = i;
      }
    }
  }

  getRandomOfFour() {
    return Math.floor(Math.random() * 4);
  }

}