import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentDonationsForScientificResearchGGAtransactionApprovalComponent } from './investment-donations-ggatransaction-approval.component';

describe('InvestmentDonationsForScientificResearchGGAtransactionApprovalComponent', () => {
  let component: InvestmentDonationsForScientificResearchGGAtransactionApprovalComponent;
  let fixture: ComponentFixture<InvestmentDonationsForScientificResearchGGAtransactionApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentDonationsForScientificResearchGGAtransactionApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentDonationsForScientificResearchGGAtransactionApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
