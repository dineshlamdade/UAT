import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentInterestOnLoanForPurchaseOfElectricVehicletransactionApprovalComponent } from './investment-interest-on-loan-for-purchase-of-electric-vehicletransaction-approval.component';

describe('InvestmentInterestOnLoanForPurchaseOfElectricVehicletransactionApprovalComponent', () => {
  let component: InvestmentInterestOnLoanForPurchaseOfElectricVehicletransactionApprovalComponent;
  let fixture: ComponentFixture<InvestmentInterestOnLoanForPurchaseOfElectricVehicletransactionApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentInterestOnLoanForPurchaseOfElectricVehicletransactionApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentInterestOnLoanForPurchaseOfElectricVehicletransactionApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
