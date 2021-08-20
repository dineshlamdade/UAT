import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplementryCycleComponent } from './supplementry-cycle.component';

describe('SupplementryCycleComponent', () => {
  let component: SupplementryCycleComponent;
  let fixture: ComponentFixture<SupplementryCycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplementryCycleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplementryCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
