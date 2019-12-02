import { TestBed } from '@angular/core/testing';

import { AppTechStacksCheckListsService } from './app-tech-stacks-check-lists.service';

describe('AppTechStacksCheckListsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppTechStacksCheckListsService = TestBed.get(AppTechStacksCheckListsService);
    expect(service).toBeTruthy();
  });
});
