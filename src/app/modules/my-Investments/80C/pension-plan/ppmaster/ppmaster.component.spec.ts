import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PpmasterComponent } from './ppmaster.component';

describe('PpmasterComponent', () => {
  let component: PpmasterComponent;
  let fixture: ComponentFixture<PpmasterComponent>;

  beforeEach(async(() => {
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
