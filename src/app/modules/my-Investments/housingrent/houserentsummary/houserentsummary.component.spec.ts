import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HouserentsummaryComponent } from './houserentsummary.component';

describe('HouserentsummaryComponent', () => {
  let component: HouserentsummaryComponent;
  let fixture: ComponentFixture<HouserentsummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HouserentsummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouserentsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
