import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingloandeclarationComponent } from './housingloandeclaration.component';

describe('HousingloandeclarationComponent', () => {
  let component: HousingloandeclarationComponent;
  let fixture: ComponentFixture<HousingloandeclarationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HousingloandeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousingloandeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
