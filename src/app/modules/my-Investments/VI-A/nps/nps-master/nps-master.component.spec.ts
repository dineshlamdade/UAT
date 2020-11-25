import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NpsMasterComponent } from './nps-master.component';

describe('NpsMasterComponent', () => {
  let component: NpsMasterComponent;
  let fixture: ComponentFixture<NpsMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NpsMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NpsMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
