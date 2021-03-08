import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { JobMasterComponent } from './job-master.component';

describe('JobMasterComponent', () => {
  let component: JobMasterComponent;
  let fixture: ComponentFixture<JobMasterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JobMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
