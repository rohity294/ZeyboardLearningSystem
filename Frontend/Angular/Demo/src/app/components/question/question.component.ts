import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OpenAIDataService } from 'src/app/services/api/openai-data.service';
import { QuestionHandlingService } from 'src/app/services/question-handling.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent {

  constructor(
    private questionHandlingService: QuestionHandlingService,
    private openAIDataService: OpenAIDataService
  ) {
  }

  inputQuestion: string = '';
  isQuestionSubmitted: boolean = false;
  isQuestionScreeningPassed: boolean = false;
  openAIDataResponse: any;
  parsedOpenAIDataResponse: any;

  async submitForm() {
    this.isQuestionSubmitted = true;
    if (this.questionHandlingService.screenQuestion(this.inputQuestion)) {
      this.isQuestionScreeningPassed = true;
      //invoke api
      await this.openAIDataService.postData(this.inputQuestion).then(response => {
        console.log("**********");
        console.log(response);//gives value
        this.openAIDataResponse = response;
      });
      //console.log(this.googleDataResponse);//gives value due to await on line above
    }
    //console.log(this.googleDataResponse);
    //console.log("*****");
    //console.log(this.googleDataResponse.predictions[0].content);
    this.parsedOpenAIDataResponse = this.openAIDataResponse.choices[0].message.content;
  }




}
