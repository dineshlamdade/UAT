import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComplianceInformationComponent } from './compliance-information.component';

describe('ComplianceInformationComponent', () => {
  let component: ComplianceInformationComponent;
  let fixture: ComponentFixture<ComplianceInformationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplianceInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
