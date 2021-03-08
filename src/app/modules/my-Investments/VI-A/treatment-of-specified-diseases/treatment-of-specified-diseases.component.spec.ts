import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TreatmentOfSpecifiedDiseasesComponent } from './treatment-of-specified-diseases.component';

describe('TreatmentOfSpecifiedDiseasesComponent', () => {
  let component: TreatmentOfSpecifiedDiseasesComponent;
  let fixture: ComponentFixture<TreatmentOfSpecifiedDiseasesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatmentOfSpecifiedDiseasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentOfSpecifiedDiseasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
