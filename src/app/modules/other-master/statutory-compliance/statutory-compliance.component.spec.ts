import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatutoryComplianceComponent } from './statutory-compliance.component';

describe('StatutoryComplianceComponent', () => {
  let component: StatutoryComplianceComponent;
  let fixture: ComponentFixture<StatutoryComplianceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatutoryComplianceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatutoryComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
