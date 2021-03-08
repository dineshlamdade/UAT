import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GgcSummaryComponent } from './ggc-summary.component';

describe('GgcSummaryComponent', () => {
  let component: GgcSummaryComponent;
  let fixture: ComponentFixture<GgcSummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GgcSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GgcSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
