import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UnitLinkedSummaryComponent } from './unit-linked-summary.component';

describe('UnitLinkedSummaryComponent', () => {
  let component: UnitLinkedSummaryComponent;
  let fixture: ComponentFixture<UnitLinkedSummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitLinkedSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitLinkedSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
