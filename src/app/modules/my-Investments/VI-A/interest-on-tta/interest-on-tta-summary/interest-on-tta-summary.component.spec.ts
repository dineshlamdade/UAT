import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InterestOnTtaSummaryComponent } from './interest-on-tta-summary.component';

describe('InterestOnTtaSummaryComponent', () => {
  let component: InterestOnTtaSummaryComponent;
  let fixture: ComponentFixture<InterestOnTtaSummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestOnTtaSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestOnTtaSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
