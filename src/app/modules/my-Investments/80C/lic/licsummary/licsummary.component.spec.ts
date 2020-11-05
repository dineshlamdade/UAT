import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicsummaryComponent } from './licsummary.component';

describe('LicsummaryComponent', () => {
  let component: LicsummaryComponent;
  let fixture: ComponentFixture<LicsummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicsummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
