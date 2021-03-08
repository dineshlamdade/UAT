import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EducationalLoanMasterComponent } from './educational-loan-master.component';

describe('EducationalLoanMasterComponent', () => {
  let component: EducationalLoanMasterComponent;
  let fixture: ComponentFixture<EducationalLoanMasterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationalLoanMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalLoanMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
