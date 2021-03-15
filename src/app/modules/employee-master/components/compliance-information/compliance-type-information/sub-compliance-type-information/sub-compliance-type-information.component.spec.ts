import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SubComplianceTypeInformationComponent } from './sub-compliance-type-information.component';

describe('SubComplianceTypeInformationComponent', () => {
  let component: SubComplianceTypeInformationComponent;
  let fixture: ComponentFixture<SubComplianceTypeInformationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SubComplianceTypeInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubComplianceTypeInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
