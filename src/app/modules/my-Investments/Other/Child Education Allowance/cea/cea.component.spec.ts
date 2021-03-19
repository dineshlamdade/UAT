import { async, ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD:src/app/modules/my-Investments/Other/Child Education Allowance/cea/cea.component.spec.ts
import { CeaComponent } from './cea.component';

describe('CeaComponent', () => {
  let component: CeaComponent;
  let fixture: ComponentFixture<CeaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeaComponent ]
=======
import { HousingloanComponent } from './housingloan.component';

describe('HousingloanComponent', () => {
  let component: HousingloanComponent;
  let fixture: ComponentFixture<HousingloanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HousingloanComponent ]
>>>>>>> 8344f947721814c7625c8f3732c3fe1e683427df:src/app/modules/my-Investments/housingloan/housingloan.component.spec.ts
    })
    .compileComponents();
  }));

  beforeEach(() => {
<<<<<<< HEAD:src/app/modules/my-Investments/Other/Child Education Allowance/cea/cea.component.spec.ts
    fixture = TestBed.createComponent(CeaComponent);
=======
    fixture = TestBed.createComponent(HousingloanComponent);
>>>>>>> 8344f947721814c7625c8f3732c3fe1e683427df:src/app/modules/my-Investments/housingloan/housingloan.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
