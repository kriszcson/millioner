import { Component, EventEmitter, Output } from '@angular/core';
import { Topic } from '../question/model/question.model';

@Component({
  selector: 'app-topic-selector',
  templateUrl: './topic-selector.component.html',
  styleUrls: ['./topic-selector.component.scss']
})

export class TopicSelectorComponent {


  @Output() getTopic: EventEmitter<string> = new EventEmitter();

  getQuestionOf(type: string) {
    this.getTopic.emit(type)
  }
}
