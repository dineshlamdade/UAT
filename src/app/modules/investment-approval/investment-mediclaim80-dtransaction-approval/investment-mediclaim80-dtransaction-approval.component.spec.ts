import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentMediclaim80DtransactionApprovalComponent } from './investment-mediclaim80-dtransaction-approval.component';

describe('InvestmentMediclaim80DtransactionApprovalComponent', () => {
  let component: InvestmentMediclaim80DtransactionApprovalComponent;
  let fixture: ComponentFixture<InvestmentMediclaim80DtransactionApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentMediclaim80DtransactionApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentMediclaim80DtransactionApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
