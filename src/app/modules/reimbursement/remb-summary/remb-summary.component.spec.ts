import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RembSummaryComponent } from './remb-summary.component';

describe('RembSummaryComponent', () => {
  let component: RembSummaryComponent;
  let fixture: ComponentFixture<RembSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RembSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RembSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
