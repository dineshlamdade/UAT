import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeputationDetailComponent } from './deputation-detail.component';

describe('DeputationDetailComponent', () => {
  let component: DeputationDetailComponent;
  let fixture: ComponentFixture<DeputationDetailComponent>;

  beforeEach(async(() => {
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
