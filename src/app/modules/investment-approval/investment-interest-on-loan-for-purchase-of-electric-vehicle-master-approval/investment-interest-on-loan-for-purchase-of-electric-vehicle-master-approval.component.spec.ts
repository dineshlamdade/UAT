import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentInterestOnLoanForPurchaseOfElectricVehicleMasterApprovalComponent } from './investment-interest-on-loan-for-purchase-of-electric-vehicle-master-approval.component';

describe('InvestmentInterestOnLoanForPurchaseOfElectricVehicleMasterApprovalComponent', () => {
  let component: InvestmentInterestOnLoanForPurchaseOfElectricVehicleMasterApprovalComponent;
  let fixture: ComponentFixture<InvestmentInterestOnLoanForPurchaseOfElectricVehicleMasterApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentInterestOnLoanForPurchaseOfElectricVehicleMasterApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentInterestOnLoanForPurchaseOfElectricVehicleMasterApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
