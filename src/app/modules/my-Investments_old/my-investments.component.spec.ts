import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MyInvestmentsComponent } from './my-investments.component';

describe('MyInvestmentsComponent', () => {
  let component: MyInvestmentsComponent;
  let fixture: ComponentFixture<MyInvestmentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MyInvestmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyInvestmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
