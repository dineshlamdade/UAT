import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingloansummaryComponent } from './housingloansummary.component';

describe('HousingloansummaryComponent', () => {
  let component: HousingloansummaryComponent;
  let fixture: ComponentFixture<HousingloansummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HousingloansummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousingloansummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
