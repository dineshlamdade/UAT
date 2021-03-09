import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalLoanSummaryComponent } from './educational-loan-summary.component';

describe('EducationalLoanSummaryComponent', () => {
  let component: EducationalLoanSummaryComponent;
  let fixture: ComponentFixture<EducationalLoanSummaryComponent>;

  beforeEach(async(() => {
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
