import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SkillsDetailComponent } from './skills-detail.component';

describe('SkillsDetailComponent', () => {
  let component: SkillsDetailComponent;
  let fixture: ComponentFixture<SkillsDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
