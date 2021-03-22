import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalRepaymentOnHousingLoanComponent } from './principal-repayment-on-housing-loan.component';

describe('PrincipalRepaymentOnHousingLoanComponent', () => {
  let component: PrincipalRepaymentOnHousingLoanComponent;
  let fixture: ComponentFixture<PrincipalRepaymentOnHousingLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipalRepaymentOnHousingLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalRepaymentOnHousingLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
