import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentHandicappedDependenttransactionApprovalComponent } from './investment-handicapped-dependenttransaction-approval.component';

describe('InvestmentHandicappedDependenttransactionApprovalComponent', () => {
  let component: InvestmentHandicappedDependenttransactionApprovalComponent;
  let fixture: ComponentFixture<InvestmentHandicappedDependenttransactionApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentHandicappedDependenttransactionApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentHandicappedDependenttransactionApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
