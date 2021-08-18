import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentOnetimetransactionApprovalComponent } from './investment-onetimetransaction-approval.component';

describe('InvestmentOnetimetransactionApprovalComponent', () => {
  let component: InvestmentOnetimetransactionApprovalComponent;
  let fixture: ComponentFixture<InvestmentOnetimetransactionApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentOnetimetransactionApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentOnetimetransactionApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
