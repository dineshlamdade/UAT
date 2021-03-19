import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessCycleComponent } from './business-cycle.component';

describe('BusinessCycleComponent', () => {
  let component: BusinessCycleComponent;
  let fixture: ComponentFixture<BusinessCycleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessCycleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
