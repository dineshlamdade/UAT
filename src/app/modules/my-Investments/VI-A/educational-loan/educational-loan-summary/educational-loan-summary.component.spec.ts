import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EducationalLoanSummaryComponent } from './educational-loan-summary.component';

describe('EducationalLoanSummaryComponent', () => {
  let component: EducationalLoanSummaryComponent;
  let fixture: ComponentFixture<EducationalLoanSummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationalLoanSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalLoanSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
