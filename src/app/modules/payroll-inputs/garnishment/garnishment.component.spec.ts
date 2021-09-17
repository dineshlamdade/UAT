import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GarnishmentComponent } from './garnishment.component';

describe('GarnishmentComponent', () => {
  let component: GarnishmentComponent;
  let fixture: ComponentFixture<GarnishmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GarnishmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GarnishmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
