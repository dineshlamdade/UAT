import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReJoiningInformationComponent } from './re-joining-information.component';

describe('ReJoiningInformationComponent', () => {
  let component: ReJoiningInformationComponent;
  let fixture: ComponentFixture<ReJoiningInformationComponent>;

  beforeEach(async(() => {
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
