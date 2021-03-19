import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouserentmasterComponent } from './houserentmaster.component';

describe('HouserentmasterComponent', () => {
  let component: HouserentmasterComponent;
  let fixture: ComponentFixture<HouserentmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouserentmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouserentmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
