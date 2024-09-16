import { InitializeService } from 'src/app/services/initialize.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '../../models/Card';
import { AiApp } from 'src/app/models/AiApp';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
})
export class ContainerComponent {
  public cards: Card[] = [];
  selectedAIApplication: string = 'none';
  modifiedAiApps: AiApp[] = [];
  modulesPageMap: Map<number, AiApp[]> = new Map<number, AiApp[]>();
  initialFeaturedList: AiApp[] = [];

  @Input()
  pages: any;

  @Output() dataToParent: EventEmitter<string> = new EventEmitter<string>();

  constructor(private initializeService: InitializeService) {}

  async ngOnInit() {
    const aiApps = await this.initializeService.initialize();
    //console.log(aiApps); //printing
    //console.log(aiApps[0]); //printing
    //console.log(typeof aiApps[0]); //object

    aiApps.forEach((aiApp) => {
      // Get all keys of the object
      let obj = aiApp;
      let keys = Object.keys(obj);
    
      // Print each key
      keys.forEach((key) => {
        let value = obj[key as keyof AiApp];
        let value2 = JSON.stringify(value);
        let value3 = JSON.parse(value2);
        //console.log(`${key}: ${value3.title}`);//printing
        //console.log(value3.title);//printing
        this.modifiedAiApps.push(value3);
      });
    });

    //console.log(this.modifiedAiApps);
    //console.log(modifiedAiApps[0].title);//printing

    //initial array of initially loading 3 apps/modules on the first page
    this.initialFeaturedList = [
      this.modifiedAiApps[0],
      this.modifiedAiApps[1],
      this.modifiedAiApps[2]
    ];

    this.modulesPageMap.set(0, this.initialFeaturedList);
    this.modulesPageMap.set(1, [this.modifiedAiApps[3],  this.modifiedAiApps[4],  this.modifiedAiApps[5]]);
    this.modulesPageMap.set(2, [this.modifiedAiApps[6],  this.modifiedAiApps[7],  this.modifiedAiApps[8]]);

    this.populateCardArray(this.initialFeaturedList);
  }

  receiveDataFromChild(data: string): void {
    this.selectedAIApplication = data;
    this.dataToParent.emit(this.selectedAIApplication);
  }

  receiveSelectedPageIndexFromChild(pageNumber: number) {
    let aiApps = this.modulesPageMap.get(pageNumber);
    //console.log(aiApps); //printing
    if (aiApps) {
      //console.log(aiApps[0].title);
    }
    this.populateCardArray(aiApps);
  }

  populateCardArray(aiApps: AiApp[] | undefined) {
    if (aiApps) {
      //console.log(aiApps); //printing
      //console.log(aiApps.length); //printing
      //console.log(aiApps[0]); //printing

      this.cards = [];
      aiApps.forEach((aiApp) => {
        let card = {
          title: aiApp.title,
          body: aiApp.body,
          link: aiApp.link,
          brief: aiApp.brief,
          myImagePath: 'assets/images/' + aiApp.myImagePath,
          labels: aiApp.labels,
          isSubmodule: aiApp.isSubmodule,
        };
        this.cards.push(card);
      });
    }
  }
}
