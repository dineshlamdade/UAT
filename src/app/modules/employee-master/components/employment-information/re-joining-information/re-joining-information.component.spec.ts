import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReJoiningInformationComponent } from './re-joining-information.component';

describe('ReJoiningInformationComponent', () => {
  let component: ReJoiningInformationComponent;
  let fixture: ComponentFixture<ReJoiningInformationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReJoiningInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReJoiningInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
