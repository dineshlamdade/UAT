import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PhysicallyHandicappedSummaryComponent } from './physically-handicapped-summary.component';

describe('PhysicallyHandicappedSummaryComponent', () => {
  let component: PhysicallyHandicappedSummaryComponent;
  let fixture: ComponentFixture<PhysicallyHandicappedSummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysicallyHandicappedSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicallyHandicappedSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
