import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LicmasterComponent } from './licmaster.component';

describe('LicmasterComponent', () => {
  let component: LicmasterComponent;
  let fixture: ComponentFixture<LicmasterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LicmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
