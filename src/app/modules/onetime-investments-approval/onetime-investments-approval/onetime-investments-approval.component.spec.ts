import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnetimeInvestmentsApprovalComponent } from './onetime-investments-approval.component';

describe('OnetimeInvestmentsApprovalComponent', () => {
  let component: OnetimeInvestmentsApprovalComponent;
  let fixture: ComponentFixture<OnetimeInvestmentsApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnetimeInvestmentsApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnetimeInvestmentsApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
