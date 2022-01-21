import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsadminComponentSelectionComponent } from './psadmin-component-selection.component';

describe('PsadminComponentSelectionComponent', () => {
  let component: PsadminComponentSelectionComponent;
  let fixture: ComponentFixture<PsadminComponentSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsadminComponentSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsadminComponentSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
