import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuryGenerationComponent } from './admin-qury-generation.component';

describe('AdminQuryGenerationComponent', () => {
  let component: AdminQuryGenerationComponent;
  let fixture: ComponentFixture<AdminQuryGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminQuryGenerationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminQuryGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
