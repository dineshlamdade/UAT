import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExitInformationComponent } from './exit-information.component';

describe('ExitInformationComponent', () => {
  let component: ExitInformationComponent;
  let fixture: ComponentFixture<ExitInformationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExitInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
