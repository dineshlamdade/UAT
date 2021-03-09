import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadcreationComponent } from './headcreation.component';

describe('HeadcreationComponent', () => {
  let component: HeadcreationComponent;
  let fixture: ComponentFixture<HeadcreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadcreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadcreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});