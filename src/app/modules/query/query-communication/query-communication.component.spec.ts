import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryCOmmunicationComponent } from './query-communication.component';

describe('QueryCOmmunicationComponent', () => {
  let component: QueryCOmmunicationComponent;
  let fixture: ComponentFixture<QueryCOmmunicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryCOmmunicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryCOmmunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
