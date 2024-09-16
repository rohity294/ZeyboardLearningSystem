import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionHandlingService {

  constructor() { }

  screenQuestion(inputQuestion: string):boolean{
    //apply question screening rules
    return true;
  }
}
