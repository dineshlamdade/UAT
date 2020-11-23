import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitLinkedMasterComponent } from './unit-linked-master.component';

describe('UnitLinkedMasterComponent', () => {
  let component: UnitLinkedMasterComponent;
  let fixture: ComponentFixture<UnitLinkedMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitLinkedMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitLinkedMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
