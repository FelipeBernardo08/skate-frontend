import { TestBed } from '@angular/core/testing';

import { EventChangepageService } from './event-changepage.service';

describe('EventChangepageService', () => {
  let service: EventChangepageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventChangepageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
