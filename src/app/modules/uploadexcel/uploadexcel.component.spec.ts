import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UploadexcelComponent } from './uploadexcel.component';

describe('UploadexcelComponent', () => {
  let component: UploadexcelComponent;
  let fixture: ComponentFixture<UploadexcelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadexcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadexcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
