import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EightyCComponent } from './eighty-c.component';

describe('EightyCComponent', () => {
  let component: EightyCComponent;
  let fixture: ComponentFixture<EightyCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EightyCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EightyCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
