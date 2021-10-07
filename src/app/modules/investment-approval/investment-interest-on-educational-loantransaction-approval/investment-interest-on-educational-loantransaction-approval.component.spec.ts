import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentInterestOnEducationalLoantransactionApprovalComponent } from './investment-interest-on-educational-loantransaction-approval.component';

describe('InvestmentInterestOnEducationalLoantransactionApprovalComponent', () => {
  let component: InvestmentInterestOnEducationalLoantransactionApprovalComponent;
  let fixture: ComponentFixture<InvestmentInterestOnEducationalLoantransactionApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentInterestOnEducationalLoantransactionApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentInterestOnEducationalLoantransactionApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
