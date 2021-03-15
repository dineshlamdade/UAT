import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PpmasterComponent } from './ppmaster.component';

describe('PpmasterComponent', () => {
  let component: PpmasterComponent;
  let fixture: ComponentFixture<PpmasterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PpmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PpmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
