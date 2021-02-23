import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingrentComponent } from './housingrent.component';

describe('HousingrentComponent', () => {
  let component: HousingrentComponent;
  let fixture: ComponentFixture<HousingrentComponent>;

  beforeEach(async(() => {
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
