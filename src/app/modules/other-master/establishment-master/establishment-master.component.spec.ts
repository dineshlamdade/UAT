import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EstablishmentMasterComponent } from './establishment-master.component';

describe('EstablishmentMasterComponent', () => {
  let component: EstablishmentMasterComponent;
  let fixture: ComponentFixture<EstablishmentMasterComponent>;

  beforeEach(waitForAsync(() => {
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
