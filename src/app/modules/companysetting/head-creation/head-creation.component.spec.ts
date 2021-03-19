import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadCreationComponent } from './head-creation.component';

describe('HeadCreationComponent', () => {
  let component: HeadCreationComponent;
  let fixture: ComponentFixture<HeadCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
