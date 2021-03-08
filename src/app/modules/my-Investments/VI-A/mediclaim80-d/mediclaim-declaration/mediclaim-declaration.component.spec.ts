import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MediclaimDeclarationComponent } from './mediclaim-declaration.component';

describe('MediclaimDeclarationComponent', () => {
  let component: MediclaimDeclarationComponent;
  let fixture: ComponentFixture<MediclaimDeclarationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MediclaimDeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediclaimDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
