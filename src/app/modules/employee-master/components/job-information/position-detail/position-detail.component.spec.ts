import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PositionDetailComponent } from './position-detail.component';

describe('PositionDetailComponent', () => {
  let component: PositionDetailComponent;
  let fixture: ComponentFixture<PositionDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
