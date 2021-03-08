import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MediclaimSummaryComponent } from './mediclaim-summary.component';

describe('MediclaimSummaryComponent', () => {
  let component: MediclaimSummaryComponent;
  let fixture: ComponentFixture<MediclaimSummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MediclaimSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediclaimSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
