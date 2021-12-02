import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherAreasComponent } from './other-areas.component';

describe('OtherAreasComponent', () => {
  let component: OtherAreasComponent;
  let fixture: ComponentFixture<OtherAreasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherAreasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
