import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GgcSummaryComponent } from './ggc-summary.component';

describe('GgcSummaryComponent', () => {
  let component: GgcSummaryComponent;
  let fixture: ComponentFixture<GgcSummaryComponent>;

  beforeEach(async(() => {
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
