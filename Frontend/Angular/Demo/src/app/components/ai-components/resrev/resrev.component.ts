import { Component } from '@angular/core';
import { AiApp } from 'src/app/models/AiApp';
import { InitializeService } from 'src/app/services/initialize.service';

@Component({
  selector: 'app-resrev',
  templateUrl: './resrev.component.html',
  styleUrls: ['./resrev.component.css'],
})
export class ResrevComponent {
  aiApp: AiApp;

  constructor(private initializeService: InitializeService) {
    this.aiApp = this.initializeService.aiAppArray[3];
    //console.log(this.aiApp);
  }
}
