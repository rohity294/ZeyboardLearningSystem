import { Component, ElementRef, ViewChild } from '@angular/core';
import { OpenAIDataService } from 'src/app/services/api/openai-data.service';
import { QuestionHandlingService } from 'src/app/services/question-handling.service';
import { SpeechService } from 'src/app/services/speech.service';

@Component({
  selector: 'app-speech-to-text-capturer',
  templateUrl: './speech-to-text-capturer.component.html',
  styleUrls: ['./speech-to-text-capturer.component.css']
})
export class SpeechToTextCapturerComponent {
  @ViewChild('audioPlayer') audioPlayerRef: ElementRef | undefined;
  listening: boolean = false;
  sentences: string[] = [];
  inputQuestion: string = '';
  isQuestionSubmitted: boolean = false;
  isQuestionScreeningPassed: boolean = false;
  openAIDataResponse: any;
  parsedOpenAIDataResponse: any;

  constructor(private speechService: SpeechService,
    private questionHandlingService: QuestionHandlingService,
    private openAIDataService: OpenAIDataService) { }

  startListening() {
    //console.log("mic clicked!!");
    if (this.audioPlayerRef) {
      const audioPlayer: HTMLAudioElement = this.audioPlayerRef.nativeElement;
      audioPlayer.play();
      this.listening = true;
      this.speechService.startRecognition();
    }
  }

  async stopListening() {
    this.listening = false;
    let recognized = this.speechService.stopRecognition();
    //console.log(recognized);
    this.sentences = recognized.split(".");
    this.inputQuestion = recognized;
    this.isQuestionSubmitted = true;
    if (this.questionHandlingService.screenQuestion(this.inputQuestion)) {
      this.isQuestionScreeningPassed = true;
      //invoke api
      await this.openAIDataService.postData(this.inputQuestion).then(response => {
        //console.log(response);//gives value
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
