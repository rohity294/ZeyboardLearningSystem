import { Component } from '@angular/core';
import { AiApp } from 'src/app/models/AiApp';
import { InitializeService } from 'src/app/services/initialize.service';


@Component({
  selector: 'app-finwise',
  templateUrl: './finwise.component.html',
  styleUrls: ['./finwise.component.css']
})
export class FinwiseComponent {
  aiApp:AiApp;

  constructor(private initializeService: InitializeService){
    this.aiApp = this.initializeService.aiAppArray[0];
    //console.log(this.aiApp);
  }
}



