import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestmentLandingPageComponent } from './investment-landing-page/investment-landing-page.component';
import { HraExemptionComponent } from './investment-landing-page/hra-exemption/hra-exemption.component';




@NgModule({
  declarations: [InvestmentLandingPageComponent, HraExemptionComponent],
  imports: [
    CommonModule,
  ]
})
export class LandingPageModule { }
