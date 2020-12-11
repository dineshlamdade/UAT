import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PPFComponent } from './ppf.component';

describe('PPFComponent', () => {
  let component: PPFComponent;
  let fixture: ComponentFixture<PPFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PPFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PPFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
