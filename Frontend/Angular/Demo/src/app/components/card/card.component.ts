import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'src/app/models/Card';
import { SplitFirstPartPipe } from '../../utilities/split-first-part.pipe';
import { SelectionTrackerService } from 'src/app/services/selection-tracker.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent {
  constructor(private splitFirstPipe: SplitFirstPartPipe,
    private selectionTrackerService: SelectionTrackerService
  ) {
  }

  selectedAIApplication: string = 'none';
  
  @Output() dataToParent: EventEmitter<string> = new EventEmitter<string>();

  @Input() title = '';
  @Input() isSubmodule: any;
  @Input() brief = '';
  @Input() body = '';
  @Input() link = '';
  @Input() myImagePath = '';
  @Input() labels = ([] as string[]);

  onCardChosenButton(title: string, body:string, isSubmodule: boolean, link: string): void {
    //console.log(title);
    //console.log("11:"+body);
    console.log("isSubmodule:"+isSubmodule);

    let selectedChoice = this.splitFirstPipe.transform(title, '|');
    if (selectedChoice) {
      //console.log("22:"+selectedChoice);
      this.selectedAIApplication = selectedChoice;
      //console.log("33:"+ this.selectedAIApplication);
      this.dataToParent.emit(this.selectedAIApplication);
      this.selectionTrackerService.setSelectedModule(this.selectedAIApplication);
      //console.log("44:"+this.selectionTrackerService.getSelectedModule());
    }

    if(isSubmodule){
      this.selectionTrackerService.sendData({showDisplayContainer:true, title, body, link});
    }
  }
}



