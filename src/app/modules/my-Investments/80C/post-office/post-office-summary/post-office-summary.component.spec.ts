import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostOfficeSummaryComponent } from './post-office-summary.component';

describe('PostOfficeSummaryComponent', () => {
  let component: PostOfficeSummaryComponent;
  let fixture: ComponentFixture<PostOfficeSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostOfficeSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostOfficeSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
