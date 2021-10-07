import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldreleaseComponent } from './holdrelease.component';

describe('HoldreleaseComponent', () => {
  let component: HoldreleaseComponent;
  let fixture: ComponentFixture<HoldreleaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoldreleaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HoldreleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
