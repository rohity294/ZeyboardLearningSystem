import { TestBed } from '@angular/core/testing';

import { QuestionHandlingService } from './question-handling.service';

describe('QuestionHandlingService', () => {
  let service: QuestionHandlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionHandlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
