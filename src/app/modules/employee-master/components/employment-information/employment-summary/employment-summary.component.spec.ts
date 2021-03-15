import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmploymentSummaryComponent } from './employment-summary.component';

describe('EmploymentSummaryComponent', () => {
  let component: EmploymentSummaryComponent;
  let fixture: ComponentFixture<EmploymentSummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmploymentSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploymentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
