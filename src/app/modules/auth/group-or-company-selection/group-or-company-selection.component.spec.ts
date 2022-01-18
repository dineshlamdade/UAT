import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupOrCompanySelectionComponent } from './group-or-company-selection.component';

describe('GroupOrCompanySelectionComponent', () => {
  let component: GroupOrCompanySelectionComponent;
  let fixture: ComponentFixture<GroupOrCompanySelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupOrCompanySelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupOrCompanySelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
