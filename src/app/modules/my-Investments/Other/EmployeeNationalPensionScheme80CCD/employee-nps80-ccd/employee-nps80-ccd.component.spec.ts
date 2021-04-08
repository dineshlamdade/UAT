import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeNPS80CCDComponent } from './employee-nps80-ccd.component';

describe('EmployeeNPS80CCDComponent', () => {
  let component: EmployeeNPS80CCDComponent;
  let fixture: ComponentFixture<EmployeeNPS80CCDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeNPS80CCDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeNPS80CCDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
