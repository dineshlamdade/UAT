import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewLoanComponent } from './add-new-loan.component';

describe('AddNewLoanComponent', () => {
  let component: AddNewLoanComponent;
  let fixture: ComponentFixture<AddNewLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
