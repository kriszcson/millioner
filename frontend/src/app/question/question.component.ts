import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../users/users.service';
import { Question, Award, levels, Topic } from './model/question.model';
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
  token: string;
  userEmail: string;
  rightIndexTemp: number;
  rightAnswerTemp: string;
  clickedOption: number = -1;
  haveHalf: boolean = true;
  haveTopic: boolean = true;
  havePhone: boolean = true;
  phoneHelping: boolean = false;
  randomIndexForPhone: string;
  wrongAnswer: boolean = false;
  choosingTopic: boolean = false;
  chosenTopic: string;
  seconds = 0;

  constructor(
    private router: Router,
    private readonly questionService: QuestionService,
  ) { }

  ngOnInit(): void {/* 
    this.userEmail = localStorage.getItem('email');
    this.token = localStorage.getItem('access_token');
    if (this.token == null || this.userService.tokenExpired(this.token)) {
      this.router.navigateByUrl('/users');
    } else {
      this.playStartingSound(); */
    this.getQuestion();/* 
    } */
  }

  getQuestion() {
    this.difficulty++;
    this.success = null;
    this.wrongAnswer = false;
    this.clickedOption = -1;
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
    this.phoneHelping = false;
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
    this.clickedOption = answerIndex;
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
    this.wrongAnswer = true;
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

  savePoints() {/* 
    this.userService.updatePoints(this.userEmail, this.checkAmount()).subscribe(data => {
    }); */
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
    this.haveHalf = true;
    this.havePhone = true;
    this.haveTopic = true;
    this.getQuestion();
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('email');
    this.router.navigateByUrl('/users')
  }

  randomizeTime() {
    return Math.floor(Math.random() * 5000);
  }

  getHalf() {
    this.haveHalf = false;
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

  getTopic(event: Event) {
    this.getByTopic(event.toString())
  }

  getByTopic(topic: string) {
    this.choosingTopic = false;
    this.questionService.getRandomByTopic(topic, this.difficulty, this.token)
      .subscribe(data => {
        this.question = data;
        this.rightAnswerTemp = this.question.answer_options[this.question.right_answer_index];
        this.question.answer_options = this.shuffleOptions(this.question.answer_options);
        this.question.right_answer_index = this.getCorrectIndex();
        this.start();
        this.haveTopic = false;
      })
  }

  doByTopic() {
    if (this.haveTopic) {
      this.haveTopic = false; this.choosingTopic = true
    }
  }

  getPhone() {
    this.havePhone = false;
    this.doPhoneHelp();
    this.phoneHelping = true;
  }

  doPhoneHelp() {
    const diff = this.question.difficulty;
    switch (true) {
      case (diff < 3): return this.randomizePhoneHelpValidity(90);
      case (diff < 5): return this.randomizePhoneHelpValidity(80);
      case (diff < 8): return this.randomizePhoneHelpValidity(60);
      case (diff < 11): return this.randomizePhoneHelpValidity(40);
    }
  }

  randomizePhoneHelpValidity(chancePercent: number) {
    const random = Math.random() * 100;
    if (random < chancePercent) {
      this.randomIndexForPhone = this.getLetter(this.question.right_answer_index);
    } else {
      const answersIndexes = [0, 1, 2, 3];
      const wrongAnswerIndexes = answersIndexes.filter(i => i != this.question.right_answer_index);
      this.randomIndexForPhone = this.getLetter(wrongAnswerIndexes[Math.floor(Math.random() * 3)]);
    }
  }

  getRandomOfFour() {
    return Math.floor(Math.random() * 4);
  }

  getColor(i: number): string {
    if (this.clickedOption > -1) {
      if (this.success === null && this.clickedOption === i) {
        return 'gold';
      }
      if (!this.success && i == this.question.right_answer_index && this.wrongAnswer) {
        return 'green';
      }
      if (i == this.clickedOption) {
        switch (this.success) {
          case true: return 'green';
          case false: return 'red';
        }
      }
      return null;
    }
  }

  getLetter(i: number): string {
    switch (i) {
      case 0: return 'A';
      case 1: return 'B';
      case 2: return 'C';
      case 3: return 'D';
    }
  }
}