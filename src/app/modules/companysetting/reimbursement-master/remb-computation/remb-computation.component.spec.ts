import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RembComputationComponent } from './remb-computation.component';

describe('RembComputationComponent', () => {
  let component: RembComputationComponent;
  let fixture: ComponentFixture<RembComputationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RembComputationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RembComputationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
