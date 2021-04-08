import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RembClaimNontaxComponent } from './remb-claim-nontax.component';

describe('RembClaimNontaxComponent', () => {
  let component: RembClaimNontaxComponent;
  let fixture: ComponentFixture<RembClaimNontaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RembClaimNontaxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RembClaimNontaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
