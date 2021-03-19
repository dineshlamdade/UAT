import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RembGeneralComponent } from './remb-general.component';

describe('RembGeneralComponent', () => {
  let component: RembGeneralComponent;
  let fixture: ComponentFixture<RembGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RembGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RembGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
