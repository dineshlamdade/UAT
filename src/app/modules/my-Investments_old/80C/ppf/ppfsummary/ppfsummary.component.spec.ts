import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PPFSummaryComponent } from './ppfsummary.component';

describe('PPFSummaryComponent', () => {
  let component: PPFSummaryComponent;
  let fixture: ComponentFixture<PPFSummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PPFSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PPFSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
