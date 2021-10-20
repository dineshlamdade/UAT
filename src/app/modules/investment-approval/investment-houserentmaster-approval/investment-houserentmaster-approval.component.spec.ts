import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentHouserentmasterApprovalComponent } from './investment-houserentmaster-approval.component';

describe('InvestmentHouserentmasterApprovalComponent', () => {
  let component: InvestmentHouserentmasterApprovalComponent;
  let fixture: ComponentFixture<InvestmentHouserentmasterApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentHouserentmasterApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentHouserentmasterApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
