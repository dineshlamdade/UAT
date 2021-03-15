import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject , throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TreatmentOfSpecifiedService {

  apiUrl = environment.apiBaseUrl;

  constructor(private _HTTP: HttpClient) { }

//Summary services
<<<<<<< HEAD
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

uploadfSpecifiedDesiaseTransactionwithDocument(files: File[], data:any): Observable<any> {
  var formData: any = new FormData();
  console.log('in uploadMultipleFiles Service::', files);
  for (let file of files) {
    formData.append('proofForAmountSpent', file);
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
=======
  getMediclaimSummary() {
    return this._HTTP.get(this.apiUrl + 'mediclaimMaster/mediclaimSummary')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  // postElectricVehicleFuturePlan(data) {

  //   return this._HTTP.post(this.apiUrl + 'electricVehicleLoanMaster/interestOnFutureLoan', data)
  //   .pipe(map((res: any) => {
  //     return res;
  //   }));
  // }

   //Master Services

   getSpecifiedDiseaseMaster() : Observable<any> {
    return this._HTTP.get(this.apiUrl + 'specifiedDiseaseMaster')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

   //  Declaration services

  getMediclaimPremiumWithInstitutionList() {
    return this._HTTP.get(this.apiUrl + 'mediclaimTransaction/mediclaimPremiumInstitutionList')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  // getTransactionFilterData(expenseType:String, institution:String) {
  //   return this._HTTP.get(this.apiUrl + 'mediclaimTransaction/All' + expenseType + '/' + institution)
  //   .pipe(map((res: any) => {
  //     return res;
  //   }));
  // }

  getTransactionFilterData(){
    return this._HTTP.get(this.apiUrl + 'mediclaimTransaction/All')
    .pipe(map((res: any) => {
      return res;
    }));
  }


  // getTransactionFilterData() {
  //   return this._HTTP.get(this.apiUrl + 'mediclaimTransaction/All')
  //   .pipe(map((res: any) => {
  //     return res;
  //   }));
  // }


  getTransactionByProofSubmissionId(proofSubmissionId: String) {
    return this._HTTP.get(this.apiUrl + 'mediclaimTransaction/psid/' + proofSubmissionId)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  //902 line
  postMediclaimTransaction(data) {
    return this._HTTP.post(this.apiUrl + 'mediclaimTransaction/uploadMediclaimTransactionDocuments', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getpreviousEmployeName() {

    return this._HTTP.get(this.apiUrl + 'previousEmployer-detail')
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

  uploadMediclaim80DDocument(files: File[], data:any): Observable<any> {
    var formData: any = new FormData();
    console.log('in uploadMultipleFiles Service::', files);
    for (let file of files) {
      formData.append('document', file);
    }
    //formData.append('licDocuments', files);
    formData.append('mediclaimTransaction', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key," ",value)
    });
    //return null;
    return this._HTTP.post<any>(
      this.apiUrl + 'mediclaimTransaction/uploadMediclaimTransactionDocuments',
      formData,
      {

      });
  }
>>>>>>> cd55004c41aced666012190b6d2321e5c31082c1

}
