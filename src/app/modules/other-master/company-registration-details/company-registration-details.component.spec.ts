import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRegistrationDetailsComponent } from './company-registration-details.component';

describe('CompanyRegistrationDetailsComponent', () => {
  let component: CompanyRegistrationDetailsComponent;
  let fixture: ComponentFixture<CompanyRegistrationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyRegistrationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRegistrationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
