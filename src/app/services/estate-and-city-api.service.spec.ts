import { TestBed } from '@angular/core/testing';

import { EstateAndCityApiService } from './estate-and-city-api.service';

describe('EstateAndCityApiService', () => {
  let service: EstateAndCityApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstateAndCityApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
