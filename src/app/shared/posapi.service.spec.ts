import { TestBed } from '@angular/core/testing';

import { PosapiService } from './posapi.service';

describe('PosapiService', () => {
  let service: PosapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
