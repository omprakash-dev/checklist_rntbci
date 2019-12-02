import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCheckListComponent } from './project-check-list.component';

describe('ProjectCheckListComponent', () => {
  let component: ProjectCheckListComponent;
  let fixture: ComponentFixture<ProjectCheckListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectCheckListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCheckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
