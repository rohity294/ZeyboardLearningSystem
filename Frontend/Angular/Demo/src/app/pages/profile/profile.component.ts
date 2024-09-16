import {
  Component,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AiApp } from 'src/app/models/AiApp';
import { InitializeService } from 'src/app/services/initialize.service';
import { SelectionTrackerService } from 'src/app/services/selection-tracker.service';
import {
  fadeInAnimation,
  slideInOutAnimation,
} from '../../utilities/my-animations';
import { TypewriterService } from '../../services/typewriter.service';
import 'zone.js';
import { map, Subscription } from 'rxjs';
import { Card } from 'src/app/models/Card';

@Component({
  selector: 'app-home',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [fadeInAnimation, slideInOutAnimation],
})
export class ProfileComponent {
  @ViewChild('appBeginnerButton') appBeginnerButtonRef: ElementRef | undefined;
  aiAppArray: AiApp[] = [];
  modulesMap: Map<number, AiApp[]> = new Map<number, AiApp[]>();
  pages: number[] = [1, 2, 3];
  loginStatus: boolean = false;
  loggedInUsername: string | null = null;
  titles = [
    'Welcome to Zeyboard!',
    'Connect with recruiters',
    'Connect with talent',
    'Contact Us Now!',
  ];
  typedText: any;
  title: string = 'AI POD Demo';
  logoPath: string = 'assets/images/zeyboard_logo.png';
  selectedAIApplication: string = '';
  showAIApplicationsListing: boolean = false;
  temp: string = '';
  moduleNames: string[] = [];

  cards: Card[] = [];
  selectedModule: string = '';
  subModules: any[] = [];
  subModulesPageMap: Map<number, AiApp[]> = new Map<number, AiApp[]>();

  selectedPageIndex: number = 0;
  showDisplayContainer: boolean = false;
  selectedSubModuleTitle: string = '';
  selectedSubModuleBody: Array<{ question: string, link: string, count: number }> = []
  selectedSubModuleLink: string = '';

  modifiedAiApps: any[] = [];
  modulesPageMap: Map<number, AiApp[]> = new Map<number, AiApp[]>();
  initialFeaturedList: AiApp[] = [];

  constructor(
    private router: Router,
    private initializeService: InitializeService,
    private typewriterService: TypewriterService,
    private selectionTrackerService: SelectionTrackerService,
    private route: ActivatedRoute
  ) {
    this.typedText = this.typewriterService
      .getTypewriterEffect(this.titles)
      .pipe(map((text) => text));

    if (sessionStorage.getItem('loggedInUsername')) {
      this.loginStatus = true;
      this.loggedInUsername = sessionStorage.getItem('loggedInUsername');
    }
  }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async (params) => {
      let fetchedParamsID = await params['profileID'];
      console.log('fetchedParamsID:' + fetchedParamsID);
      this.selectedAIApplication = fetchedParamsID;

      this.selectionTrackerService.setSelectedModule(
        this.selectedAIApplication
      );
      // console.log('selectedAIApplication:' + this.selectedAIApplication);

      this.selectionTrackerService.data$.subscribe((data) => {
        console.log('Data From Submodule Container:' + data);
        this.showDisplayContainer = data.showDisplayContainer;
        this.selectedSubModuleTitle = data.title;
        console.log(this.selectedSubModuleTitle);
        this.selectedSubModuleBody = data.body;
        this.selectedSubModuleLink = data.link;
      });
    });

    const aiApps = await this.initializeService.initialize();
    //console.log('Retrieved AI Apps:', aiApps);

    aiApps.forEach((aiApp) => {
      let obj = aiApp;
      let keys = Object.keys(obj);

      keys.forEach((key) => {
        let value = obj[key as keyof AiApp];
        let value2 = JSON.stringify(value);
        let value3 = JSON.parse(value2);
        this.modifiedAiApps.push(value3);
      });
    });

    this.modifiedAiApps.forEach((item: any) => {
      //console.log(this.selectedAIApplication);
      //console.log(item);
      if (
        item.name.toLowerCase().replace(/\s+/g, '') ===
        this.selectedAIApplication.toLowerCase()
      ) {
        //console.log('Matched item:', item);
        this.subModules.push(...item.subModules);
      }
    });

    if (this.subModules && this.subModules.length > 0) {
      this.subModules.forEach((subItem, index) => {
        if (index <= 2) {
          this.initialFeaturedList.push(subItem);
        }
      });
      //this.initialFeaturedList.forEach(item => console.log(item));
      this.populateCardArray(this.initialFeaturedList);
      this.groupSubModulesPerPage(this.subModules);
    }
  }

  populateCardArray(aiApps: AiApp[]) {
    this.cards = [];
    if (aiApps && aiApps.length > 0) {
      aiApps.forEach((app) => {
        let card = {
          title: app.title,
          body: app.body,
          brief: app.brief,
          link: app.link,
          myImagePath: 'assets/images/' + app.myImagePath,
          labels: app.labels,
          isSubmodule: app.isSubmodule,
        };
        this.cards.push(card);
      });
    } else {
      console.error('No AI Apps to populate cards.');
    }
  }

  groupSubModulesPerPage(subModules: AiApp[]) {
    this.subModulesPageMap.clear();

    let subModulesCount = subModules.length;
    let pagesCountQuotient = subModulesCount / 3;
    let pagesCountRemainder = subModulesCount % 3;

    let count = 0;
    for (let i = 0; i < pagesCountQuotient; i++) {
      this.subModulesPageMap.set(i, [
        subModules[count++],
        subModules[count++],
        subModules[count++],
      ]);
    }

    let lastSubModules: AiApp[] = [];
    for (let i = 1; i <= pagesCountRemainder; i++) {
      lastSubModules.push(subModules[count++]);
    }
    if (lastSubModules.length > 0) {
      this.subModulesPageMap.set(pagesCountQuotient, lastSubModules);
    }
  }

  receiveDataFromChild(data: string): void {
    if (data === 'Home') {
      this.reload();
    } else {
      this.selectedAIApplication = data;
      console.log(this.selectedAIApplication);
      this.showAIApplicationsListing = false;
    }
  }

  reload() {
    this.selectedAIApplication = '';
    this.router.navigate([]);
    window.location.reload();
  }

  receiveSelectedPageIndexFromChild(selectedPageIndex: number) {
    this.selectedPageIndex = selectedPageIndex;
    const aiApps = this.subModulesPageMap.get(this.selectedPageIndex) || [];
    this.populateCardArray(aiApps);
  }
}
