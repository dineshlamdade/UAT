import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankMasterAtGroupComponent } from './bank-master-at-group.component';

describe('BankMasterAtGroupComponent', () => {
  let component: BankMasterAtGroupComponent;
  let fixture: ComponentFixture<BankMasterAtGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankMasterAtGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankMasterAtGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
