import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostOfficeMasterComponent } from './post-office-master.component';

describe('PostOfficeMasterComponent', () => {
  let component: PostOfficeMasterComponent;
  let fixture: ComponentFixture<PostOfficeMasterComponent>;

  beforeEach(async(() => {
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
