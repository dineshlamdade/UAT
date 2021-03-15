import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PPFMasterComponent } from './ppfmaster.component';

describe('PPFMasterComponent', () => {
  let component: PPFMasterComponent;
  let fixture: ComponentFixture<PPFMasterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PPFMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PPFMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
