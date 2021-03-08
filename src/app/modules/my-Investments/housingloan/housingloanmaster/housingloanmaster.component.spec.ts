import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HousingloanmasterComponent } from './housingloanmaster.component';

describe('HousingloanmasterComponent', () => {
  let component: HousingloanmasterComponent;
  let fixture: ComponentFixture<HousingloanmasterComponent>;

  beforeEach(waitForAsync(() => {
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
