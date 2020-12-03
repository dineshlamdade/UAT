import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostOfficeTermDepositComponent } from './post-office-term-deposit.component';

describe('PostOfficeTermDepositComponent', () => {
  let component: PostOfficeTermDepositComponent;
  let fixture: ComponentFixture<PostOfficeTermDepositComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostOfficeTermDepositComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostOfficeTermDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
