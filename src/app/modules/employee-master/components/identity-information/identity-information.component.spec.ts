import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IdentityInformationComponent } from './identity-information.component';

describe('IdentityInformationComponent', () => {
  let component: IdentityInformationComponent;
  let fixture: ComponentFixture<IdentityInformationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentityInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
