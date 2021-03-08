import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PostOfficeTermDepositSummaryComponent } from './post-office-term-deposit-summary.component';

describe('PostOfficeTermDepositSummaryComponent', () => {
  let component: PostOfficeTermDepositSummaryComponent;
  let fixture: ComponentFixture<PostOfficeTermDepositSummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PostOfficeTermDepositSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostOfficeTermDepositSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
