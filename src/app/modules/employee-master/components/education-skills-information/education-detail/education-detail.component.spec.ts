import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationDetailComponent } from './education-detail.component';

describe('EducationSkillsDetailComponent', () => {
  let component: EducationDetailComponent;
  let fixture: ComponentFixture<EducationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
