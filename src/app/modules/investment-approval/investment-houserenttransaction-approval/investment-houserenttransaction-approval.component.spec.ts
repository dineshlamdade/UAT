import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentHouserenttransactionApprovalComponent } from './investment-houserenttransaction-approval.component';

describe('InvestmentHouserenttransactionApprovalComponent', () => {
  let component: InvestmentHouserenttransactionApprovalComponent;
  let fixture: ComponentFixture<InvestmentHouserenttransactionApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentHouserenttransactionApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentHouserenttransactionApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
