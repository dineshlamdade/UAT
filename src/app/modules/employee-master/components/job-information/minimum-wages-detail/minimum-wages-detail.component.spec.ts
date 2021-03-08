import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MinimumWagesDetailComponent } from './minimum-wages-detail.component';

describe('MinimumWagesDetailComponent', () => {
  let component: MinimumWagesDetailComponent;
  let fixture: ComponentFixture<MinimumWagesDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MinimumWagesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinimumWagesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
