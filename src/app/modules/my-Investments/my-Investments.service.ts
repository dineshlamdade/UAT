import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of , throwError } from 'rxjs';
import { map } from 'rxjs/operators';
//import { environment } from 'src/environments/environment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MyInvestmentsService {
  getpensionplanRemarkList(transactionID: any, psId: any) {
    throw new Error('Method not implemented.');
  }
public apiUrl = environment.baseUrl8085;

  constructor(private _HTTP: HttpClient) { }

  public getBlobSASUrl(): Observable<any> {
    return this._HTTP.get('https://devstoragefile1.blob.core.windows.net/paysquarecontainer/Abbott/Abbott1/Employees/Investment/2020-2021/3/FlexGrid.pdf'
     , {headers : new HttpHeaders({ 'Content-Type': 'application/pdf' })})
    .pipe(map((res: any) => {
         return res.tokenUrl;

        }));
      }

  // getNPSSummary() {
  //   return this._HTTP.get(this.apiUrl + 'npsmaster-detail/npsMasterSummary/1')
  //   .pipe(map((res: any) => {
  //     return res;
  //   }));
  // }

  // getNPSMaster() {
  //   return this._HTTP.get(this.apiUrl + 'npsmaster-detail/3')
  //   .pipe(map((res: any) => {
  //     return res;
  //   }));
  // }

  // getNPSDeclaration() {
  //   return this._HTTP.get(this.apiUrl + 'npsmaster-detail/npsTransactionSchedule/1')
  //   .pipe(map((res: any) => {
  //     return res;
  //   }));
  // }

  // postNPSMaster(data) {

  //   return this._HTTP.post(this.apiUrl + 'npsmaster-detail', data)
  //   .pipe(map((res: any) => {
  //     return res;
  //   }));
  // }

  // puttNPSMaster(data) {

  //   return this._HTTP.put(this.apiUrl + 'npsmaster-detail/1', data)
  //   .pipe(map((res: any) => {
  //     return res;
  //   }));
  // }

  // putNPSDeclaration(data) {

  //   return this._HTTP.put(this.apiUrl + 'npsmaster-detail/npsTransactionSchedule/1', data)
  //   .pipe(map((res: any) => {
  //     return res;
  //   }));
  // }

  getEducationalLoanSummary() {
    return this._HTTP.get(this.apiUrl + 'educationalloan-transaction/summary')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getEducationalLoanMaster() {
    return this._HTTP.get(this.apiUrl + 'educationloan-master')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getEducationalLoanDeclaration() {
    return this._HTTP.get(this.apiUrl + 'educationalloan-transaction')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  postEducationalLoanMaster(data) {

    return this._HTTP.post(this.apiUrl + 'educationloan-master', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  postEducationalLoanDeclaration(data) {

    return this._HTTP.post(this.apiUrl + 'educationalloan-transaction', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getSavingAccountSummary() {
    return this._HTTP.get(this.apiUrl + 'educationalloan-transaction/summary')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getSavingAccountMaster() {
    return this._HTTP.get(this.apiUrl + 'educationloan-master')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getSavingAccountDeclaration() {
    return this._HTTP.get(this.apiUrl + 'educationalloan-transaction')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  postSavingAccountMaster(data) {

    return this._HTTP.post(this.apiUrl + 'educationloan-master', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getPHandicapped() {
    return this._HTTP.get(this.apiUrl + 'physicallyhandicapped-detail/summary/3')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  // getFamilyInfo() {
  //   return this._HTTP.get('http://localhost:8082/hrms/v1/family-details/summary/employeeMasterId/3')
  //   .pipe(map((res: any) => {
  //     return res;
  //   }));
  // }

  getFamilyInfo() : Observable<any>  {
    return this._HTTP.get(this.apiUrl + 'licmaster-detail/familyMemberList')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getFamilyInfoPPF() : Observable<any>  {
    return this._HTTP.get<any>(this.apiUrl + 'licmaster-detail/familyMemberList')
    .pipe(map((res) =>{
      return res
.filter(e => e.data.results.relation.includes('Self'));

    }));
  }

  // getEmployeePersonalInfo() {
  //   return this._HTTP.get('http://localhost:8082/hrms/v1/family-details/summary/employeeMasterId/3')
  //   .pipe(map((res: any) => {
  //     return res;
  //   }));
  // }

  getHandicapped() {
    return this._HTTP.get(this.apiUrl + 'handicappeddependent-detail/summary/3')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  postPHandicappedForm(data) {

    return this._HTTP.post(this.apiUrl + 'houserentmaster-detail/houserentmaster_agreement', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  postHandicappedForm(data) {

    return this._HTTP.post(this.apiUrl + 'handicappeddependent-detail', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getSpecifiedDiseaseSummary() {
    return this._HTTP.get(this.apiUrl + 'specifiedDiseaseMaster-detail/specifiedDiseaseMasterSummary/1')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getSpecifiedDiseaseMaster() {
    return this._HTTP.get(this.apiUrl + 'specifiedDiseaseMaster-detail/1')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  public getEightyCMaster(): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'licmaster-detail')
    .pipe(map((res: any) => {
      return res;
    },
    ));
  }

  getEightyCSummary() {
    return this._HTTP.get(this.apiUrl + 'licmaster-detail/licMasterSummary')
    .pipe(map((res: any) => {
      return res;
    },
    ));
  }

  postEightyCMaster(data) {

    return this._HTTP.post(this.apiUrl + 'licmaster-detail', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  postEightyCSummaryFuturePolicy(data) {

    return this._HTTP.post(this.apiUrl + 'licmaster-detail/licMasterSummaryFuturePolicy', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getEightyCDeclarationInstitutions() {
    return this._HTTP.get(this.apiUrl + 'lic-transaction/institutions')
    .pipe(map((res: any) => {
      return res;
    },
    ));
  }

  getEightyCDeclarationInstitutionListWithPolicyNo() {
    return this._HTTP.get(this.apiUrl + 'lic-transaction/institutionListWithPolicyNo')
    .pipe(map((res: any) => {
      return res;
    },
    ));
  }

  getTransactionInstName(data) {
    return this._HTTP.get(this.apiUrl + 'lic-transaction/' + data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getTransactionFilterData(institution: String, policyNo: String, transactionStatus: String) {
    return this._HTTP.get(this.apiUrl + 'lic-transaction/' + institution + '/' + policyNo + '/' + transactionStatus)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getTransactionByProofSubmissionId(proofSubmissionId: String) {
    return this._HTTP.get(this.apiUrl + 'lic-transaction/psid/' + proofSubmissionId)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  postEightyCDeclarationInstitutions(data) {
    return this._HTTP.post(this.apiUrl + 'lic-transaction', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  postEightyCDeclarationTransaction(data) {
    return this._HTTP.post(this.apiUrl + 'lic-transaction', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getpreviousEmployeName() {

    return this._HTTP.get(this.apiUrl + 'lic-transaction/previousemployer')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getAllInstitutesFromGlobal() {
    return this._HTTP.get(this.apiUrl + 'institution')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getBusinessFinancialYear() {
    return this._HTTP.get(this.apiUrl + 'licmaster-detail/businessFinancialYear')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getAllPreviousEmployer() {
    return this._HTTP.get(this.apiUrl + 'lic-transaction/previousemployer')
    .pipe(map((res: any) => {
      return res;
    }));
  }

  public getLicRemarkList(psId: String,): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'lic-transaction/GetRemarkTransaction/' + psId)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  // -----------------PPF-API---------------------
  public getPPFMaster(): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'ppfmaster-detail')
    .pipe(map((res: any) => {
      return res;
    },
    ));
  }

  public submitPPFMasterData(files: File[], data: any): Observable<any> {
    let formData: any = new FormData();
    console.log('in uploadMultipleFiles Service::', files);
    for (const file of files) {
      formData.append('group1MasterDocuments', file);
    }
    // formData.append('licDocuments', files);
    formData.append('investmentGroup1MasterRequestDTO', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key, ' ', value);
    });
    // return null;
    return this._HTTP.post<any>(
      this.apiUrl + 'ppfmaster-detail',
      formData,
      {

      });
  }

  public getPPFSummary(): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'ppfmaster-detail/ppfMasterSummary')
    .pipe(map((res: any) => {
      return res;

    },
    ));
  }

  public submitPPFMaster(data): Observable<any> {

    return this._HTTP.post(this.apiUrl + 'ppfmaster-detail', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  public submitPPFSummaryFuturePolicy(data): Observable<any> {

    return this._HTTP.post(this.apiUrl + 'ppfmaster-detail/ppfMasterSummaryFuturePolicy', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  public getPPFDeclarationInstitutions(): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'ppf-transaction/ppfinstitution')
    .pipe(map((res: any) => {
      return res;
    },
    ));
  }

  public getPPFDeclarationInstitutionListWithPolicyNo(): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'ppf-transaction/institutionListWithPolicyNo')
    .pipe(map((res: any) => {
      return res;
    },
    ));
  }

  public getPPFTransactionInstName(data): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'ppf-transaction/' + data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  public getPPFTransactionFilterData(institution: String, policyNo: String, transactionStatus: String): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'ppf-transaction/' + institution + '/' + policyNo + '/' + transactionStatus)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  public getRemarkList(psId: String, policyNo: String,): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'ppf-transaction/GetRemark/' + psId + '/' + policyNo)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  public getPPFTransactionByProofSubmissionId(proofSubmissionId: String): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'ppf-transaction/psid/' + proofSubmissionId)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  public submitPPFDeclarationInstitutions(data): Observable<any> {
    return this._HTTP.post(this.apiUrl + '/ppf-transaction', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  public submitPPFDeclarationTransaction(data): Observable<any> {
    return this._HTTP.post(this.apiUrl + 'ppf-transaction', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  public uploadPPFTransactionwithDocument(files: File[], data: any): Observable<any> {
    let formData: any = new FormData();
    console.log('in uploadMultipleFiles Service::', files);
    for (const file of files) {
      formData.append('transactionDocuments', file);
    }
    // formData.append('licDocuments', files);
    formData.append('transactionWithDocumentBeanJson', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key,' ', value);
    });
    // return null;
    return this._HTTP.post<any>(
      this.apiUrl + 'ppf-transaction/uploadTransactionDocuments',
      formData,
      {

      });
  }

// ---------------------------Tax-Saver Fund -----------------------------//

  public getELSSMaster(): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'elssmaster-detail')
    .pipe(map((res: any) => {
      return res;
    },
    ));
  }

  public submitELSSMasterData(files: File[], data: any): Observable<any> {
    let formData: any = new FormData();
    console.log('in uploadMultipleFiles Service::', files);
    for (const file of files) {
      formData.append('group2MasterDocuments', file);
    }
    // formData.append('licDocuments', files);
    formData.append('investmentGroup2MasterRequestDTO', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key, ' ', value);
    });
    // return null;
    return this._HTTP.post<any>(
      this.apiUrl + 'elssmaster-detail',
      formData,
      {

      });
  }

  public getELSSSummary(): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'elssmaster-detail/elssMasterSummary')
    .pipe(map((res: any) => {
      return res;

    },
    ));
  }

  public submitELSSSummaryFuturePolicy(data): Observable<any> {

    return this._HTTP.post(this.apiUrl + 'elssmaster-detail/elssMasterSummaryFuturePolicy', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  public submitELSSMaster(data): Observable<any> {

    return this._HTTP.post(this.apiUrl + 'elssmaster-detail', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  public getELSSDeclarationInstitutions(): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'elss-transaction/elssinstitution')
    .pipe(map((res: any) => {
      return res;
    },
    ));
  }

  public getElssRemarkList(psId: String, policyNo: String,): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'elss-transaction/GetRemark/' + psId + '/' + policyNo)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  public getELSSDeclarationInstitutionListWithPolicyNo(): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'elss-transaction/institutionListWithPolicyNo')
    .pipe(map((res: any) => {
      return res;
    },
    ));
  }

  public getELSSTransactionInstName(data): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'elss-transaction/' + data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  public getELSSTransactionFilterData(institution: String, policyNo: String, transactionStatus: String): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'elss-transaction/' + institution + '/' + policyNo + '/' + transactionStatus)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  public getELSSTransactionByProofSubmissionId(proofSubmissionId: String): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'elss-transaction/psid/' + proofSubmissionId)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  public submitELSSDeclarationInstitutions(data): Observable<any> {
    return this._HTTP.post(this.apiUrl + '/elss-transaction', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  public submitELSSlarationTransaction(data): Observable<any> {
    return this._HTTP.post(this.apiUrl + 'elss-transaction', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  public uploadELSSTransactionwithDocument(files: File[], data: any): Observable<any> {
    let formData: any = new FormData();
    console.log('in uploadMultipleFiles Service::', files);
    for (let file of files) {
      formData.append('transactionDocuments', file);
    }
    // formData.append('licDocuments', files);
    formData.append('transactionWithDocumentBeanJson', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key,' ', value);
    });
    // return null;
    return this._HTTP.post<any>(
      this.apiUrl + 'elss-transaction/uploadTransactionDocuments',formData,
      {

      });
  }


  //--------------------------------Housing Loan -------------------------------------------------------//
  getCountryList() {

    return this._HTTP.get(environment.baseUrl8082+ '/location-information/country/', { headers: { 'X-TenantId': 'PaysquareGlobal' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getEmployeeAddressList() : Observable<any>  {

    return this._HTTP.get(environment.baseUrl8082+ '/employeeContact-information/1',)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getAddressFromPIN(pinCode) :  Observable<any>  {

    return this._HTTP.get(environment.baseUrl8082+ '/pincode-details-check/' + pinCode , { headers: { 'X-TenantId': 'PaysquareGlobal' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }



}
