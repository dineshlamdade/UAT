import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalLoanComponent } from './educational-loan.component';

describe('EducationalLoanComponent', () => {
  let component: EducationalLoanComponent;
  let fixture: ComponentFixture<EducationalLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationalLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
