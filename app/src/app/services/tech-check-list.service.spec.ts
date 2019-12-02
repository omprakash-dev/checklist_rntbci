import { TestBed } from '@angular/core/testing';

import { TechCheckListService } from './tech-check-list.service';

describe('TechCheckListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TechCheckListService = TestBed.get(TechCheckListService);
    expect(service).toBeTruthy();
  });
});
