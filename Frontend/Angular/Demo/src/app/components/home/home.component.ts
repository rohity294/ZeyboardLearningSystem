import { Component, ElementRef, ViewChild, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AiApp } from 'src/app/models/AiApp';
import { InitializeService } from 'src/app/services/initialize.service';
import { SelectionTrackerService } from 'src/app/services/selection-tracker.service';
import {fadeInAnimation, slideInOutAnimation} from '../../utilities/my-animations' ;
import {  } from '@angular/core';
import { TypewriterService } from '../../services/typewriter.service';
import 'zone.js';
import { Subscription, map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fadeInAnimation, slideInOutAnimation]
})
export class HomeComponent {
  @ViewChild('appBeginnerButton') appBeginnerButtonRef: ElementRef | undefined;
  aiAppArray: AiApp[] = [];
  modulesMap: Map<number, AiApp[]> = new Map<number, AiApp[]>();
  pages: number[] = [1, 2, 3];
  loginStatus: boolean = false;
  loggedInUsername: any;
  titles = ['Welcome to zeyboard.com', 'Connect with recruiters', 'Connect with talent', 'Contact Us Now!'];
  typedText;
  title: string = 'AI POD Demo';
  logoPath: string = 'assets/images/zeyboard_logo.png';
  selectedAIApplication: string = '';
  showAIApplicationsListing: boolean = true;
  private subscription: Subscription = new Subscription;
  temp:string = '';
  moduleNames:string[] = [];
 
 
  constructor(private router: Router,
    private initializeService: InitializeService,
    private typewriterService: TypewriterService
  ) {
    this.typedText = this.typewriterService
    .getTypewriterEffect(this.titles)
    .pipe(map((text) => text));

    if(sessionStorage.getItem('loggedInUsername')){
      this.loginStatus = true;
      this.loggedInUsername = sessionStorage.getItem('loggedInUsername');
    }
  }

  ngOnInit() {
    this.subscription = this.initializeService.dataArray$.subscribe(
      latestArray => {
        this.aiAppArray = latestArray;
        //console.log(this.aiAppArray);//printing
        if(this.aiAppArray){
          this.aiAppArray.forEach((item:any)=>{
            item.forEach((element:any) => {
              this.moduleNames.push(element?.name);
            });
          })
          this.temp = this.moduleNames[0];
        }
        
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  receiveDataFromChild(data: string): void {
    if (data === "Home") {
      this.reload();
    }
    else {
      this.selectedAIApplication = data;
      //console.log("101:"+this.selectedAIApplication);//printing
      this.showAIApplicationsListing = false;
    }
  }

  reload() {
    this.selectedAIApplication = '';
    this.router.navigate([]);
    window.location.reload();
  }
}
