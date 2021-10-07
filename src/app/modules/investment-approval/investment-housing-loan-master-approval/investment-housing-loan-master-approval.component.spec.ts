import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentHousingLoanMasterApprovalComponent } from './investment-housing-loan-master-approval.component';

describe('InvestmentHousingLoanMasterApprovalComponent', () => {
  let component: InvestmentHousingLoanMasterApprovalComponent;
  let fixture: ComponentFixture<InvestmentHousingLoanMasterApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentHousingLoanMasterApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentHousingLoanMasterApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
