import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class SelectionTrackerService {
  private selectedModule: string = "";

  constructor() { }

  setSelectedModule(selectedAIApplication: string) {
    this.selectedModule = selectedAIApplication;
  }

  getSelectedModule(): string {
    return this.selectedModule;
  }

  private dataSubject = new BehaviorSubject<any>({});
  data$ = this.dataSubject.asObservable();

  sendData(data:any) {
    console.log("****");
    console.log(data);
    console.log("****");
    this.dataSubject.next(data);
  }


}

