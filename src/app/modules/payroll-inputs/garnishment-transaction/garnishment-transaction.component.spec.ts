import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarnishmentTransactionComponent } from './garnishment-transaction.component';

describe('GarnishmentTransactionComponent', () => {
  let component: GarnishmentTransactionComponent;
  let fixture: ComponentFixture<GarnishmentTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GarnishmentTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GarnishmentTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
