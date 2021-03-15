import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentMasterComponent } from './establishment-master.component';

describe('EstablishmentMasterComponent', () => {
  let component: EstablishmentMasterComponent;
  let fixture: ComponentFixture<EstablishmentMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstablishmentMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstablishmentMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
