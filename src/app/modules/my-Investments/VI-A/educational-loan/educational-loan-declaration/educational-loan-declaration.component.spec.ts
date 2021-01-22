import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalLoanDeclarationComponent } from './educational-loan-declaration.component';

describe('EducationalLoanDeclarationComponent', () => {
  let component: EducationalLoanDeclarationComponent;
  let fixture: ComponentFixture<EducationalLoanDeclarationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationalLoanDeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalLoanDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
