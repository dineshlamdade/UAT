import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HouserentdeclarationComponent } from './houserentdeclaration.component';

describe('HouserentdeclarationComponent', () => {
  let component: HouserentdeclarationComponent;
  let fixture: ComponentFixture<HouserentdeclarationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HouserentdeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouserentdeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
