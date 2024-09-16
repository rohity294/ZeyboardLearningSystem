import { TestBed } from '@angular/core/testing';

import { OpenAIDataService } from './openai-data.service';

describe('GoogleDataService', () => {
  let service: OpenAIDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenAIDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
