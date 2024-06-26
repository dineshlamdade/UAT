import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediclaimMasterComponent } from './mediclaim-master.component';

describe('MediclaimMasterComponent', () => {
  let component: MediclaimMasterComponent;
  let fixture: ComponentFixture<MediclaimMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediclaimMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediclaimMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
