import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GGCComponent } from './ggc.component';

describe('GGCComponent', () => {
  let component: GGCComponent;
  let fixture: ComponentFixture<GGCComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GGCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GGCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
