import { TestBed } from '@angular/core/testing';

import { NodeInitializeService } from './initialize.service';

describe('InitializeService', () => {
  let service: NodeInitializeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NodeInitializeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
