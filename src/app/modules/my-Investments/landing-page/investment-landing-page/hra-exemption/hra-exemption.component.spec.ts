import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HraExemptionComponent } from './hra-exemption.component';

describe('HraExemptionComponent', () => {
  let component: HraExemptionComponent;
  let fixture: ComponentFixture<HraExemptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HraExemptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HraExemptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
