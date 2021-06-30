import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentTransactionApprovalComponent } from './investment-transaction-approval.component';

describe('InvestmentTransactionApprovalComponent', () => {
  let component: InvestmentTransactionApprovalComponent;
  let fixture: ComponentFixture<InvestmentTransactionApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentTransactionApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentTransactionApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
