import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LmsLeaveAttributeCreationComponent } from './lms-leave-attribute-creation.component';

describe('LmsLeaveAttributeCreationComponent', () => {
  let component: LmsLeaveAttributeCreationComponent;
  let fixture: ComponentFixture<LmsLeaveAttributeCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LmsLeaveAttributeCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LmsLeaveAttributeCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
