import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeputationDetailComponent } from './deputation-detail.component';

describe('DeputationDetailComponent', () => {
  let component: DeputationDetailComponent;
  let fixture: ComponentFixture<DeputationDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeputationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeputationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
