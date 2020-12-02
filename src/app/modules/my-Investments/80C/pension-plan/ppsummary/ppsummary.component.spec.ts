import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PpsummaryComponent } from './ppsummary.component';

describe('PpsummaryComponent', () => {
  let component: PpsummaryComponent;
  let fixture: ComponentFixture<PpsummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PpsummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PpsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
