import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentOfSpecifiedMasterComponent } from './treatment-of-specified-master.component';

describe('TreatmentOfSpecifiedMasterComponent', () => {
  let component: TreatmentOfSpecifiedMasterComponent;
  let fixture: ComponentFixture<TreatmentOfSpecifiedMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatmentOfSpecifiedMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentOfSpecifiedMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
