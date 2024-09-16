import { TestBed } from '@angular/core/testing';

import { SelectionTrackerService } from './selection-tracker.service';

describe('SelectionTrackerService', () => {
  let service: SelectionTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectionTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
