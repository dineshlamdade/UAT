import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentPhysicallyHandicappedtransactionApprovalComponent } from './investment-physically-handicappedtransaction-approval.component';

describe('InvestmentPhysicallyHandicappedtransactionApprovalComponent', () => {
  let component: InvestmentPhysicallyHandicappedtransactionApprovalComponent;
  let fixture: ComponentFixture<InvestmentPhysicallyHandicappedtransactionApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentPhysicallyHandicappedtransactionApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentPhysicallyHandicappedtransactionApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
