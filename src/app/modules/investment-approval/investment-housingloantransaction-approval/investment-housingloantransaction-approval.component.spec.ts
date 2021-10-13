import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentHousingloantransactionApprovalComponent } from './investment-housingloantransaction-approval.component';

describe('InvestmentHousingloantransactionApprovalComponent', () => {
  let component: InvestmentHousingloantransactionApprovalComponent;
  let fixture: ComponentFixture<InvestmentHousingloantransactionApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentHousingloantransactionApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentHousingloantransactionApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
