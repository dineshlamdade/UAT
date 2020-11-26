import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NpsSummaryComponent } from './nps-summary.component';

describe('NpsSummaryComponent', () => {
  let component: NpsSummaryComponent;
  let fixture: ComponentFixture<NpsSummaryComponent>;

  beforeEach(async(() => {
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
