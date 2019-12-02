import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTechCheckListComponent } from './display-tech-check-list.component';

describe('DisplayTechCheckListComponent', () => {
  let component: DisplayTechCheckListComponent;
  let fixture: ComponentFixture<DisplayTechCheckListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayTechCheckListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayTechCheckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
