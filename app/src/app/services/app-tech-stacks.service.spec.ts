import { TestBed } from '@angular/core/testing';

import { AppTechStacksService } from './app-tech-stacks.service';

describe('AppTechStacksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppTechStacksService = TestBed.get(AppTechStacksService);
    expect(service).toBeTruthy();
  });
});
