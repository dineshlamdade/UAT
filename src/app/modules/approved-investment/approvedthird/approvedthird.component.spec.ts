import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedthirdComponent } from './approvedthird.component';

describe('ApprovedthirdComponent', () => {
  let component: ApprovedthirdComponent;
  let fixture: ComponentFixture<ApprovedthirdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedthirdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedthirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
