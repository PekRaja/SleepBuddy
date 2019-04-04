import { TestBed } from '@angular/core/testing';

import { SleepDataServiceService } from './sleep-data-service.service';

describe('SleepDataServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SleepDataServiceService = TestBed.get(SleepDataServiceService);
    expect(service).toBeTruthy();
  });
});
