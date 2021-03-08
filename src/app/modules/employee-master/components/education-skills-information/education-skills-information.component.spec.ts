import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EducationSkillsInformationComponent } from './education-skills-information.component';

describe('EducationSkillsInformationComponent', () => {
  let component: EducationSkillsInformationComponent;
  let fixture: ComponentFixture<EducationSkillsInformationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationSkillsInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationSkillsInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
