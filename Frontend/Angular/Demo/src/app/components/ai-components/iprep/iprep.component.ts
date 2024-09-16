import { Component } from '@angular/core';
import { AiApp } from 'src/app/models/AiApp';
import { InitializeService } from 'src/app/services/initialize.service';

@Component({
  selector: 'app-iprep',
  templateUrl: './iprep.component.html',
  styleUrls: ['./iprep.component.css']
})
export class IPrepComponent {
  aiApp: AiApp;

  constructor(private initializeService: InitializeService) {
    this.aiApp = this.initializeService.aiAppArray[1];
  }
}
