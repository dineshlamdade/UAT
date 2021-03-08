import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TreatmentOfSpecifiedMasterComponent } from './treatment-of-specified-master.component';

describe('TreatmentOfSpecifiedMasterComponent', () => {
  let component: TreatmentOfSpecifiedMasterComponent;
  let fixture: ComponentFixture<TreatmentOfSpecifiedMasterComponent>;

  beforeEach(waitForAsync(() => {
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
