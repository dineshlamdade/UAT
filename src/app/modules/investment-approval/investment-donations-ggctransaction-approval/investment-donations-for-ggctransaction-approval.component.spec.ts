import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentDonationsForRegisteredPoliticalPartyElectoralTrustSec80GGCtransactionApprovalComponent } from './investment-donations-for-registered-political-party-electoral-trust-sec80-ggctransaction-approval.component';

describe('InvestmentDonationsForRegisteredPoliticalPartyElectoralTrustSec80GGCtransactionApprovalComponent', () => {
  let component: InvestmentDonationsForRegisteredPoliticalPartyElectoralTrustSec80GGCtransactionApprovalComponent;
  let fixture: ComponentFixture<InvestmentDonationsForRegisteredPoliticalPartyElectoralTrustSec80GGCtransactionApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentDonationsForRegisteredPoliticalPartyElectoralTrustSec80GGCtransactionApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentDonationsForRegisteredPoliticalPartyElectoralTrustSec80GGCtransactionApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
