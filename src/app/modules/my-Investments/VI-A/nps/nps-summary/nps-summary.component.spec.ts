import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NpsSummaryComponent } from './nps-summary.component';

describe('NpsSummaryComponent', () => {
  let component: NpsSummaryComponent;
  let fixture: ComponentFixture<NpsSummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NpsSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NpsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
