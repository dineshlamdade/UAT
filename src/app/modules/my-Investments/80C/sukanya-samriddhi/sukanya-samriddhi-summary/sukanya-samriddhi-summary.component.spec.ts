import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SukanyaSamriddhiSummaryComponent } from './sukanya-samriddhi-summary.component';

describe('SukanyaSamriddhiSummaryComponent', () => {
  let component: SukanyaSamriddhiSummaryComponent;
  let fixture: ComponentFixture<SukanyaSamriddhiSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SukanyaSamriddhiSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SukanyaSamriddhiSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
