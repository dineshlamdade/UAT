import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NscComponent } from './nsc.component';

describe('NscComponent', () => {
  let component: NscComponent;
  let fixture: ComponentFixture<NscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
