import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewlockComponent } from './newlock.component';

describe('NewlockComponent', () => {
  let component: NewlockComponent;
  let fixture: ComponentFixture<NewlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
