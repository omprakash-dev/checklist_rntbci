import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppTechStackComponent } from './add-app-tech-stack.component';

describe('AddAppTechStackComponent', () => {
  let component: AddAppTechStackComponent;
  let fixture: ComponentFixture<AddAppTechStackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAppTechStackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAppTechStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
