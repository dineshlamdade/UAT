import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnetimeInvestmentsTransactionApprovalComponent } from './onetime-investments-transaction-approval.component';

describe('OnetimeInvestmentsTransactionApprovalComponent', () => {
  let component: OnetimeInvestmentsTransactionApprovalComponent;
  let fixture: ComponentFixture<OnetimeInvestmentsTransactionApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnetimeInvestmentsTransactionApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnetimeInvestmentsTransactionApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
