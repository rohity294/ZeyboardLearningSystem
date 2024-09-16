import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InitializeService } from 'src/app/services/initialize.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() pages: any;
  @Input() selectedPageIndex: any = 0;

  @Output() passSelectedPageIndexToParent: EventEmitter<number> = new EventEmitter<number>();

  constructor(private initializeService: InitializeService) {
  }

  selectPage(selectedPageIndex: number) {
    //console.log('Button ' + selectedPageIndex + ' clicked!');
    this.selectedPageIndex = selectedPageIndex;
    //console.log(this.initializeService.getModulesByPageNumber(selectedPageNumber));
    this.passSelectedPageIndexToParent.emit(this.selectedPageIndex);
  }


}
