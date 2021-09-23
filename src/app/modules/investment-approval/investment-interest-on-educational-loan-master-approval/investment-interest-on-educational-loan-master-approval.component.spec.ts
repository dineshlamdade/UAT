import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentInterestOnEducationalLoanMasterApprovalComponent } from './investment-interest-on-educational-loan-master-approval.component';

describe('InvestmentInterestOnEducationalLoanMasterApprovalComponent', () => {
  let component: InvestmentInterestOnEducationalLoanMasterApprovalComponent;
  let fixture: ComponentFixture<InvestmentInterestOnEducationalLoanMasterApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentInterestOnEducationalLoanMasterApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentInterestOnEducationalLoanMasterApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
