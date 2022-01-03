import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalModuleListComponent } from './global-module-list.component';

describe('GlobalModuleListComponent', () => {
  let component: GlobalModuleListComponent;
  let fixture: ComponentFixture<GlobalModuleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalModuleListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalModuleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
