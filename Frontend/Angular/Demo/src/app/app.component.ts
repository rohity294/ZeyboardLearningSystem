import { Component, ElementRef, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InitializeService } from './services/initialize.service';
import { AiApp } from './models/AiApp';
import { SelectionTrackerService } from './services/selection-tracker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @ViewChild('appBeginnerButton') appBeginnerButtonRef: ElementRef | undefined;
  aiAppArray: AiApp[] = [];
  modulesMap: Map<number, AiApp[]> = new Map<number, AiApp[]>();
  pages: number[] = [1, 2, 3];
  loginStatus: boolean = false;
  loggedInUsername: string = '';

  constructor(private router: Router, private initializeService: InitializeService,
    private selectionTrackerService: SelectionTrackerService
  ) {
    this.initializeService.initialize();
    this.aiAppArray = this.initializeService.aiAppArray;
    this.modulesMap = this.initializeService.modulesPageMap;

  }



  title: string = 'AI POD Demo';
  logoPath: string = 'assets/images/new_fdm_logo.png';
  selectedAIApplication: string = 'none';
  showAIApplicationsListing: boolean = true;


  receiveDataFromChild(data: string): void {
    if (data === "Home") {
      this.reload();
    }
    else {
      this.selectedAIApplication = data;
      console.log(this.selectedAIApplication);
      this.showAIApplicationsListing = false;
    }
  }

  receiveLoginDataFromChild(data: string): void {
    console.log(data);
  }


  reload() {
    this.selectedAIApplication = 'none';
    this.router.navigate([]);
    window.location.reload();
  }


}
