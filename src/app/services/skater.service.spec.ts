import { TestBed } from '@angular/core/testing';

import { SkaterService } from './skater.service';

describe('SkaterService', () => {
  let service: SkaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
