import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionPlanComponent } from './pension-plan.component';

describe('PensionPlanComponent', () => {
  let component: PensionPlanComponent;
  let fixture: ComponentFixture<PensionPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PensionPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PensionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
