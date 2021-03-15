import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BankMasterAtCompanyComponent } from './bank-master-at-company.component';

describe('BankMasterAtCompanyComponent', () => {
  let component: BankMasterAtCompanyComponent;
  let fixture: ComponentFixture<BankMasterAtCompanyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BankMasterAtCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankMasterAtCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
