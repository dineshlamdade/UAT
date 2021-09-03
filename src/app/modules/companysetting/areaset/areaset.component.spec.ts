import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasetComponent } from './areaset.component';

describe('AreasetComponent', () => {
  let component: AreasetComponent;
  let fixture: ComponentFixture<AreasetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreasetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreasetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
