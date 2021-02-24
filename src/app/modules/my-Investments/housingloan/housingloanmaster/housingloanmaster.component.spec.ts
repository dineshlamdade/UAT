import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingloanmasterComponent } from './housingloanmaster.component';

describe('HousingloanmasterComponent', () => {
  let component: HousingloanmasterComponent;
  let fixture: ComponentFixture<HousingloanmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HousingloanmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousingloanmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
