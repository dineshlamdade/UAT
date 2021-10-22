import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentInterestOn80TTATTBTransactionApprovalComponent } from './investment-interest-on80-tta-ttb-transaction-approval.component';

describe('InvestmentInterestOn80TTATTBTransactionApprovalComponent', () => {
  let component: InvestmentInterestOn80TTATTBTransactionApprovalComponent;
  let fixture: ComponentFixture<InvestmentInterestOn80TTATTBTransactionApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentInterestOn80TTATTBTransactionApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentInterestOn80TTATTBTransactionApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
