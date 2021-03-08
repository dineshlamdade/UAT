import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComplianceHeadComponent } from './compliance-head.component';

describe('ComplianceHeadComponent', () => {
  let component: ComplianceHeadComponent;
  let fixture: ComponentFixture<ComplianceHeadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplianceHeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
