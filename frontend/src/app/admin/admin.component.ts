import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { QuestionService } from '../question/question.service';
import { categories } from '../question/model/question.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  categories = categories;
  error: null | string = null;
  questionForm = this.formBuilder.group({
    question: ['', Validators.required],
    rightAnswer: ['', Validators.required],
    wrongAnswerA: ['', Validators.required],
    wrongAnswerB: ['', Validators.required],
    wrongAnswerC: ['', Validators.required],
    difficulty: ['', Validators.required],
    category: ['', Validators.required],
  })

  constructor(
    private readonly questionService: QuestionService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.questionService.insertOne(this.questionForm.value)
      .subscribe((data) => {
      })
    this.questionForm.reset();
  }
}
