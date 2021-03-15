import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentOfSpecifiedDiseasesComponent } from './treatment-of-specified-diseases.component';

describe('TreatmentOfSpecifiedDiseasesComponent', () => {
  let component: TreatmentOfSpecifiedDiseasesComponent;
  let fixture: ComponentFixture<TreatmentOfSpecifiedDiseasesComponent>;

  beforeEach(async(() => {
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
