import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicmasterComponent } from './licmaster.component';

describe('LicmasterComponent', () => {
  let component: LicmasterComponent;
  let fixture: ComponentFixture<LicmasterComponent>;

  beforeEach(async(() => {
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
