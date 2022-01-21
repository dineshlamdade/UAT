import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LMSLeaveHeadCreationComponentComponent } from './lmsleave-head-creation-component.component';

describe('LMSLeaveHeadCreationComponentComponent', () => {
  let component: LMSLeaveHeadCreationComponentComponent;
  let fixture: ComponentFixture<LMSLeaveHeadCreationComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LMSLeaveHeadCreationComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LMSLeaveHeadCreationComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
