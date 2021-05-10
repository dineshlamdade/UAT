import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject , throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TreatmentOfSpecifiedService {

  apiUrl = environment.baseUrl8085;

  constructor(private _HTTP: HttpClient) { }

//Summary services
getSpecifiedSummary() {
  return this._HTTP.get(this.apiUrl + 'specifiedDiseaseMaster/specifiedDiseaseMasterSummary')
  .pipe(map((res: any) => {
    return res;
  }
  ));
}


 //Master Services

 getSpecifiedDiseaseMaster() : Observable<any> {
  return this._HTTP.get(this.apiUrl + 'specifiedDiseaseMaster')
  .pipe(map((res: any) => {
    return res;
  }
  ));
}

//  Declaration services

getSpecifiedDiseaseNameList() {
  return this._HTTP.get(this.apiUrl + 'specifiedDiseaseTransaction/patientNameList')
  .pipe(map((res: any) => {
    return res;
  }
  ));
}


// getElectricVehicleDeclarationLenderName() {
//   return this._HTTP.get(this.apiUrl + 'electricVehicleLoanTransaction/BOI')
//   .pipe(map((res: any) => {
//     return res;
//   }
//   ));
// }

getTransactionFilterData(patientName:String) {
  return this._HTTP.get(this.apiUrl + 'specifiedDiseaseTransaction/' + patientName)
  .pipe(map((res: any) => {
    return res;
  }));
}

//  getTransactionFilterData(){
//   return this._HTTP.get(this.apiUrl + 'specifiedDiseaseTransaction/All')
//   .pipe(map((res: any) => {
//     return res;
//   }));
// }

getTransactionByProofSubmissionId(proofSubmissionId: String) {
  return this._HTTP.get(this.apiUrl + 'specifiedDiseaseTransaction/psid/' + proofSubmissionId)
  .pipe(map((res: any) => {
    return res;
  }));
}



postSpecifiedDiseaseTransaction(data) {
  return this._HTTP.post(this.apiUrl + 'specifiedDiseaseTransaction', data)
  .pipe(map((res: any) => {
    return res;
  }));
}

getpreviousEmployeName() {
  return this._HTTP.get(this.apiUrl + 'specifiedDiseaseTransaction/previousemployer')
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

uploadMultipleMasterFiles(files: File[], data:any): Observable<any> {
  var formData: any = new FormData();
  console.log('in uploadMultipleFiles Service::', files);
  for (let file of files) {
    formData.append('doctorCertificate', file);
  }
  //formData.append('licDocuments', files);
  formData.append('specifiedDiseaseMaster', JSON.stringify(data));

  console.log('formData', formData);

  formData.forEach((value, key) => {
    console.log(key," ",value)
  });
  //return null;
  return this._HTTP.post<any>(
    this.apiUrl + 'specifiedDiseaseMaster',
    formData,
    {

    });
}

uploadfSpecifiedDesiaseTransactionwithDocument(proofForAmountSpent: File[], proofForRecoveryFromInsuranceCompany: File[], data:any): Observable<any> {
  var formData: any = new FormData();
  console.log('ProofForRecoveryFromInsuranceCompany::', proofForRecoveryFromInsuranceCompany);
  console.log('proofForAmountSpentFile', proofForAmountSpent);
  // for (let file of files) {
  //   formData.append('proofForAmountSpent', file);
  // }
  for (const proofForAmountSpentFile of proofForAmountSpent) {
    formData.append('proofForAmountSpent', proofForAmountSpentFile);
  }
  for (const proofForRecoveryFromInsuranceCompanyFile of proofForRecoveryFromInsuranceCompany) {
    formData.append('proofForRecoveryFromInsuranceCompany', proofForRecoveryFromInsuranceCompanyFile);
  }

  //formData.append('licDocuments', files);
  formData.append('specifiedDiseaseTransaction', JSON.stringify(data));

  console.log('formData', formData);

  formData.forEach((value, key) => {
    console.log(key," ",value)
  });
  //return null;
  return this._HTTP.post<any>(
    this.apiUrl + 'specifiedDiseaseTransaction/uploadSpecifiedDiseaseTransactionDocuments',
    formData,
    {

    });
}

}
