import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NpsMasterComponent } from './nps-master.component';

describe('NpsMasterComponent', () => {
  let component: NpsMasterComponent;
  let fixture: ComponentFixture<NpsMasterComponent>;

  beforeEach(waitForAsync(() => {
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
