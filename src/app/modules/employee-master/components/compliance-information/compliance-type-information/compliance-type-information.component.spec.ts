import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComplianceTypeInformationComponent } from './compliance-type-information.component';

describe('ComplianceTypeInformationComponent', () => {
  let component: ComplianceTypeInformationComponent;
  let fixture: ComponentFixture<ComplianceTypeInformationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplianceTypeInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceTypeInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
