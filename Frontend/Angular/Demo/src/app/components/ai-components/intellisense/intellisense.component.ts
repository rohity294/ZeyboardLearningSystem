import { Component } from '@angular/core';
import { AiApp } from 'src/app/models/AiApp';
import { InitializeService } from 'src/app/services/initialize.service';

@Component({
  selector: 'app-intellisense',
  templateUrl: './intellisense.component.html',
  styleUrls: ['./intellisense.component.css']
})

export class IntellisenseComponent {
  aiApp:AiApp;

  constructor(private initializeService: InitializeService){
    this.aiApp = this.initializeService.aiAppArray[2];
    //console.log(this.aiApp);
  }
}





