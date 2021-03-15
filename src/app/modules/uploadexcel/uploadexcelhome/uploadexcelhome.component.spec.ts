import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadexcelhomeComponent } from './uploadexcelhome.component';

describe('UploadexcelhomeComponent', () => {
  let component: UploadexcelhomeComponent;
  let fixture: ComponentFixture<UploadexcelhomeComponent>;

  beforeEach(async(() => {
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
