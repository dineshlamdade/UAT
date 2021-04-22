import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherincomesummaryComponent } from './otherincomesummary.component';

describe('OtherincomesummaryComponent', () => {
  let component: OtherincomesummaryComponent;
  let fixture: ComponentFixture<OtherincomesummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherincomesummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherincomesummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
