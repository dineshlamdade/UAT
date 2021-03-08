import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GgaSummaryComponent } from './gga-summary.component';

describe('GgaSummaryComponent', () => {
  let component: GgaSummaryComponent;
  let fixture: ComponentFixture<GgaSummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GgaSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GgaSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
