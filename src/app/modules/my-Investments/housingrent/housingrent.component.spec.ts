import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HousingrentComponent } from './housingrent.component';

describe('HousingrentComponent', () => {
  let component: HousingrentComponent;
  let fixture: ComponentFixture<HousingrentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HousingrentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousingrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
