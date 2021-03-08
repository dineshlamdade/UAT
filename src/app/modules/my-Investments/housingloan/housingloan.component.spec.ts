import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HousingloanComponent } from './housingloan.component';

describe('HousingloanComponent', () => {
  let component: HousingloanComponent;
  let fixture: ComponentFixture<HousingloanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HousingloanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousingloanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
