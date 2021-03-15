import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitInformationComponent } from './exit-information.component';

describe('ExitInformationComponent', () => {
  let component: ExitInformationComponent;
  let fixture: ComponentFixture<ExitInformationComponent>;

  beforeEach(async(() => {
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
