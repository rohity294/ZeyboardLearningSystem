import { Injectable } from '@angular/core';

//Import SpeechRecognition from the Web Speech API type definition
// declare var SpeechRecognition: any;
// declare var webkitSpeechRecognition:any;

@Injectable({
  providedIn: 'root'
})


export class SpeechService {
  recognition: any;
  recognized: string = "";


  constructor() {
    let SpeechRecognition: any;
    if ('SpeechRecognition' in window) {
      console.log("SpeechRecognition supported in this browser");
      SpeechRecognition = window['SpeechRecognition'];
    }
    else if ('webkitSpeechRecognition' in window) {
      console.log("webkitSpeechRecognition supported in this browser");
      SpeechRecognition = window['webkitSpeechRecognition'];
    } else {
      console.log("need to find some other supporting way in browser");
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.lang = 'en-US';
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;
  }


  startRecognition() {
    this.recognition.start();
    this.recognition.onresult = (event: any) => {
      //console.log(event.results[0][0].transcript);
      //console.log(event.results);
      console.log(event.results[event.results.length - 1][0].transcript);
      this.recognized += "\n" + event.results[event.results.length - 1][0].transcript;
    }
  }

  stopRecognition() {
    this.recognition.stop();
    console.log("recognition stopped");
    return this.recognized;
  }
}
