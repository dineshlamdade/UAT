import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PPFSummaryComponent } from './ppfsummary.component';

describe('PPFSummaryComponent', () => {
  let component: PPFSummaryComponent;
  let fixture: ComponentFixture<PPFSummaryComponent>;

  beforeEach(async(() => {
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
