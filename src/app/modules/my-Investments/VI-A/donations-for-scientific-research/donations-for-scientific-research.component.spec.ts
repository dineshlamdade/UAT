import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DonationsForScientificResearchComponent } from './donations-for-scientific-research.component';

describe('DonationsForScientificResearchComponent', () => {
  let component: DonationsForScientificResearchComponent;
  let fixture: ComponentFixture<DonationsForScientificResearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DonationsForScientificResearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationsForScientificResearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
