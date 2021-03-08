import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FamilyDetailsComponent } from './family-details.component';

describe('FamilyDetailsComponent', () => {
  let component: FamilyDetailsComponent;
  let fixture: ComponentFixture<FamilyDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
