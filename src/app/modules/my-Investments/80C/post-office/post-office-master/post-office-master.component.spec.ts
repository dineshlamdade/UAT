import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PostOfficeMasterComponent } from './post-office-master.component';

describe('PostOfficeMasterComponent', () => {
  let component: PostOfficeMasterComponent;
  let fixture: ComponentFixture<PostOfficeMasterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PostOfficeMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostOfficeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
