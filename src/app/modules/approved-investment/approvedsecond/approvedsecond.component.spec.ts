import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedsecondComponent } from './approvedsecond.component';

describe('ApprovedsecondComponent', () => {
  let component: ApprovedsecondComponent;
  let fixture: ComponentFixture<ApprovedsecondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedsecondComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedsecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
