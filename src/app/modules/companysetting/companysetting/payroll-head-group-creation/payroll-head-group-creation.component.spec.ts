import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollHeadGroupCreationComponent } from './payroll-head-group-creation.component';

describe('PayrollHeadGroupCreationComponent', () => {
  let component: PayrollHeadGroupCreationComponent;
  let fixture: ComponentFixture<PayrollHeadGroupCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollHeadGroupCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollHeadGroupCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
