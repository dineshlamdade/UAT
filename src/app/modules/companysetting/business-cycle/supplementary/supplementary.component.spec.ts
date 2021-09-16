import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplementaryComponent } from './supplementary.component';

describe('SupplementaryComponent', () => {
  let component: SupplementaryComponent;
  let fixture: ComponentFixture<SupplementaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplementaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplementaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
