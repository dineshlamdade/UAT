import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LandingPageService {
  public apiURL = environment.baseUrl8085;

  constructor(private _HTTP: HttpClient) { }

  /**
   * GET residential And Regime API 
   */
  getResidentialAndRegime(id: number) {
   return this._HTTP.get(this.apiURL + "landingPage/residentialAndRegime/" + id)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  /**
   * Save residential And Regime API 
   * @param data 
   */
  saveResidentialAndRegime(data) {
   return this._HTTP.post(this.apiURL + "landingPage/residentialAndRegimeSave", data)
      .pipe(map((res: any) => {
        return res;
      }));
  }
  /**
   * Get Investment Actual VS declared API 
   */
  getInvestmentActualVsDeclared() {
    return this._HTTP.get(this.apiURL + "landingPage/investmentActualVsDeclaration")
      .pipe(map((res: any) => {
        return res;
      }));
  }

  /**
   * Get HRA Exemption Simulation API
   */
  getHRAExemptionSimulation() {
    return this._HTTP.get(this.apiURL + "hrms/v1/landingPage/investmentHRAExumptionSimulation")
      .pipe(map((res: any) => {
        return res;
      }));
  }
  /**
   *  Status wise Investment Data 
   * @param data
   */
  statusWiseInvestmentData(data) {
    return this._HTTP.post(this.apiURL + "landingPage/getInvestmentStatusWiseData", data)
      .pipe(map((res: any) => {
        return res;
      }));
  }
  /**
   *  Investment Summary Data 
   * @param data
   */
  investmentSummaryData(data) {
    return this._HTTP.post(this.apiURL + "landingPage/getInvestmentSummary", data)
      .pipe(map((res: any) => {
        return res;
      }));
  }


  /**
   * Investment History api 
   */



  /**
   * 
   * @param data 
   * @returns 
   */
  hraMaxBenefit(data){
    return this._HTTP.post(this.apiURL + "landingPage/hraMaxBenifit", data)
    .pipe(map((res: any) => {
      return res;
    }));
  }


  /**
   * 
   * @param pinCode 
   * @returns 
   */
  getInfoByPinCode(pinCode: number) {
    return this._HTTP.get(this.apiURL + "landingPage/infoByPincode/" + pinCode)
       .pipe(map((res: any) => {
         return res;
       }));
   }


   /**
    * 
    * @param data 
    * @returns 
    */
   HRAExumptionMonthlyAnnual(){
    return this._HTTP.get(this.apiURL + "landingPage/investmentHRAExumptionSimulationMonthlyAnual")
    .pipe(map((res: any) => {
      return res;
    }));
  }






}
