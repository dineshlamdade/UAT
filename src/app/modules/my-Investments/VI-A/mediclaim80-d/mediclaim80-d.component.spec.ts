import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mediclaim80DComponent } from './mediclaim80-d.component';

describe('Mediclaim80DComponent', () => {
  let component: Mediclaim80DComponent;
  let fixture: ComponentFixture<Mediclaim80DComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mediclaim80DComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mediclaim80DComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
