import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComplianceMasterComponent } from './compliance-master.component';

describe('ComplianceMasterComponent', () => {
  let component: ComplianceMasterComponent;
  let fixture: ComponentFixture<ComplianceMasterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplianceMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
