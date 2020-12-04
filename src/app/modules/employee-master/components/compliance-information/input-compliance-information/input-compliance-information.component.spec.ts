import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComplianceInformationComponent } from './input-compliance-information.component';

describe('InputComplianceInformationComponent', () => {
  let component: InputComplianceInformationComponent;
  let fixture: ComponentFixture<InputComplianceInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputComplianceInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComplianceInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
