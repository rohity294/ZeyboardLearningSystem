import { AiApp } from './../../models/AiApp';
import { InitializeService } from 'src/app/services/initialize.service';
import { SelectionTrackerService } from 'src/app/services/selection-tracker.service';
import { Component, Input } from '@angular/core';
import { Card } from 'src/app/models/Card';

@Component({
  selector: 'app-submodule-container',
  templateUrl: './submodule-container.component.html',
  styleUrls: ['./submodule-container.component.css'],
})
export class SubmoduleContainerComponent {
  public cards: Card[] = [];
  selectedModule: string = '';
  subModules: AiApp[] | undefined;
  subModulesPageMap: Map<number, AiApp[]> = new Map<number, AiApp[]>();
  pages: number[] = [1, 2, 3];
  selectedPageIndex: number = 0;
  showDisplayContainer: boolean = false;
  selectedSubModuleTitle: string = '';
  selectedSubModuleBody: Array<{ question: string, link: string, count: number }> = [];
  selectedSubModuleLink: string = '';

  constructor(
    private selectionTrackerService: SelectionTrackerService,
    private initializeService: InitializeService
  ) {
    this.selectedModule = this.selectionTrackerService.getSelectedModule();
    //console.log("102:"+this.selectedModule);//printing
    this.subModules = this.initializeService.getSubModulesByName(
      this.selectedModule
    );
    if (this.subModules) {
      this.groupSubModulesPerPage(this.subModules);
      this.populateCardArray(
        this.subModulesPageMap.get(this.selectedPageIndex)
      );
    }
  }

  ngOnInit() {
    this.selectionTrackerService.data$.subscribe((data) => {
      if (data) {
        console.log('Data From Submodule Container:', data);

        this.showDisplayContainer = data.showDisplayContainer;
        console.log('showDisplayContainer:', this.showDisplayContainer);

        this.selectedSubModuleTitle = data.title;
        console.log('selectedSubModuleTitle:', this.selectedSubModuleTitle);

        this.selectedSubModuleBody = data.body;
        console.log('selectedSubModuleBody:', this.selectedSubModuleBody);

        this.selectedSubModuleLink = data.link;
        console.log('selectedSubModuleLink:', this.selectedSubModuleLink);
      } else {
        console.log('Received undefined data');
      }
    });
  }

  populateCardArray(subModules: AiApp[] | undefined) {
    if (subModules) {
      this.cards = [];
      subModules.forEach((aiApp) => {
        let card = {
          title: aiApp.title,
          brief: aiApp.brief,
          body: aiApp.body,
          link: aiApp.link,
          myImagePath: 'assets/images/' + aiApp.myImagePath,
          labels: aiApp.labels,
          isSubmodule: true,
        };
        this.cards.push(card);
      });
    }
  }

  receiveSelectedPageIndexFromChild(selectedPageIndex: number) {
    this.selectedPageIndex = selectedPageIndex;
    this.populateCardArray(this.subModulesPageMap.get(this.selectedPageIndex));
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
}
