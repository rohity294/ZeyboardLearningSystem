import { SelectionTrackerService } from 'src/app/services/selection-tracker.service';
import { NodeInitializeService } from 'src/app/services/api/node-api/initialize.service';
import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-display-container',
  templateUrl: './display-container.component.html',
  styleUrls: ['./display-container.component.css'],
})
export class DisplayContainerComponent {
  @Input()
  selectedSubModuleTitle: string = '';
  @Input()
  selectedSubModuleBody: Array<{
    question: string;
    link: string;
    count: number;
  }> = [];
  @Input()
  selectedSubModuleLink: string = '';
  isLoggedIn: boolean = true;
  validationMessage = '';

  constructor(
    private selectionTrackerService: SelectionTrackerService,
    private nodeInitializeService: NodeInitializeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log(this.selectedSubModuleBody);
  }

  //with login
  // launch(event: MouseEvent) {
  //   event.preventDefault();
  //   if (!sessionStorage.getItem('loggedInUsername')) {
  //     this.validationMessage = "Please register to proceed.\n If already registered, please login.";
  //   } else {
  //     this.validationMessage = '';
  //     let portNumber: number = this.initializeService.getPortNumberBySubmoduleName(this.selectedSubModuleTitle);
  //     let urlString = "http://localhost:" + portNumber + `?username=${sessionStorage.getItem('loggedInUsername')}`;
  //     window.location.href = urlString;
  //   }
  // }

  //without login
  launch(event: MouseEvent) {
    event.preventDefault();
    this.validationMessage = '';
    // let portNumber: number =
    //   this.initializeService.getPortNumberBySubmoduleName(
    //     this.selectedSubModuleTitle
    //   );
    let portNumber = 9000;
    let urlString = 'http://localhost:' + portNumber;
    urlString = 'http://www.github.com';
    urlString = this.selectedSubModuleLink;
    // Open the URL in a new tab
    window.open(urlString, '_blank');
  }

  async incrementCount(item: { question: string; link: string; count: number }) {
    console.log('trying to increment');
    const updatedCountFromBackend = await this.saveToJSON(item);
    if (updatedCountFromBackend !== -1) {
      item.count = updatedCountFromBackend;
      console.log("Updated count from backend: " + updatedCountFromBackend);
      this.cdr.detectChanges(); // Trigger change detection
    }
    console.log("Updated count from backend: " + updatedCountFromBackend);
  }

  async saveToJSON(item: { question: string; link: string; count: number }){
    try {
      const updatedCountFromBackend = await this.nodeInitializeService.increaseCountInJsonFile(item);
      console.log("updatedCountFromBackend: ", updatedCountFromBackend);
      return updatedCountFromBackend;
    } catch (error) {
      console.error('Error saving data', error);
      return -1;
    }
  }
}
