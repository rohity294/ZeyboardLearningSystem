import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent {
  @Input() parsedOpenAIDataResponse: any;

  ngOnInit() {
    console.log("component initialized");
  }
}
