import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SukanyaSamriddhiDeclarationComponent } from './sukanya-samriddhi-declaration.component';

describe('SukanyaSamriddhiDeclarationComponent', () => {
  let component: SukanyaSamriddhiDeclarationComponent;
  let fixture: ComponentFixture<SukanyaSamriddhiDeclarationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SukanyaSamriddhiDeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SukanyaSamriddhiDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
