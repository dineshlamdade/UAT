import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceHeadComponent } from './compliance-head.component';

describe('ComplianceHeadComponent', () => {
  let component: ComplianceHeadComponent;
  let fixture: ComponentFixture<ComplianceHeadComponent>;

  beforeEach(async(() => {
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
