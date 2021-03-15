import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InputComplianceInformationComponent } from './input-compliance-information.component';

describe('InputComplianceInformationComponent', () => {
  let component: InputComplianceInformationComponent;
  let fixture: ComponentFixture<InputComplianceInformationComponent>;

  beforeEach(waitForAsync(() => {
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
