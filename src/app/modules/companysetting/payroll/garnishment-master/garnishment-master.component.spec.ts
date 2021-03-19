import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GarnishmentMasterComponent } from './garnishment-master.component';

describe('GarnishmentMasterComponent', () => {
  let component: GarnishmentMasterComponent;
  let fixture: ComponentFixture<GarnishmentMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GarnishmentMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GarnishmentMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
