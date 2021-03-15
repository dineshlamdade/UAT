import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UploadexcelhomeComponent } from './uploadexcelhome.component';

describe('UploadexcelhomeComponent', () => {
  let component: UploadexcelhomeComponent;
  let fixture: ComponentFixture<UploadexcelhomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadexcelhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadexcelhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
