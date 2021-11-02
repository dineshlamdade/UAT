import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FlexiInputService {
  constructor(private _HTTP: HttpClient, private http: HttpClient) {}
  // http://localhost:8084/hrms/v1/SDMDerivedMaster/GetByMasterId?derivedObjectName=FlexiSectionMaster&sdmMasterId=161

  //Get APIs Lock Area
  getAllSectionTableList() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get(environment.baseUrl8084 + 'FlexiSectionMaster').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  //Get Flexi section name
  getOwnFlexiDropDownList() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get(
        environment.baseUrl8084 +
        'SDMDerivedMaster/GetByModuleName?derivedObjectName=FlexiSectionMaster').pipe(map((res: any) => {
          return res;
        })
      );
  }
  // 'SDMDerivedMaster/GetByModuleName?derivedObjectName=FlexiSectionMaster'
  //Get derived Name Cycle Name
  getDerivedNameList(name) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP
      .get(
        environment.baseUrl8084 +
          'SDMDerivedMaster/GetByMasterId?derivedObjectName=FlexiSectionMaster&sdmMasterId=' +
          name
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  // SDMDerivedMaster/GetByMasterId?derivedObjectName=FlexiSectionMaster&sdmMasterId

  postSectionMaster(data) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this.http
      .post(environment.baseUrl8084 + 'FlexiSectionMaster', data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  putMaster(data) {
    return this._HTTP.put( environment.baseUrl8084 + 'FlexiSectionMaster/UpdateFLexiSectionMaster', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }


  headEditByID() {
    return this._HTTP.get( environment.baseUrl8084 + 'FlexiHeadSetting/UpdateFlexiHeadSetting')
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  8
    //get HeadCreationById by global
    sectionMasterEditByID( id: any ) {
      return this._HTTP.get( environment.baseUrl8084 + 'FlexiSectionMaster/GetById?flexiSectionMasterId=' + id )
        .pipe( map( ( res: any ) => {
          return res;
        } ) );
    }


  //Delete


  // deleteFlexiMaster( data ) {
  //   return this._HTTP.put( environment.baseUrl8083 + 'FlexiSectionMaster/UpdateFLexiSectionMaster', data )
  //     .pipe( map( ( res: any ) => {
  //       return res;
  //     } ) );
  // }

  delete12( id: number) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.delete(environment.baseUrl8084 + 'FlexiSectionMaster/DeleteById?flexiSectionMasterId=' + id, { headers: headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }


  
  deleteHead( id: number) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.delete(environment.baseUrl8084 + 'FlexiHeadSetting/DeleteById?flexiHeadSettingId=' + id, { headers: headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }

//// Head Setting

// E/D Head Get API
  getEDHead() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get(
        environment.baseUrl8084 +
        'payrollhead-master/head-nature/earning').pipe(map((res: any) => {
          return res;
        })
      );
  }

//   {
//     "data": {
//         "results": [
//             {
//                 "headMasterId": 1,           ",
//                 "standardName": "HouseRentAllowance",
//             },
//        }
// }




// get Section of Flexi Form
 getSectionOfFlexiForm(){
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('X-TenantId', 'PaysquareDefault');
return this._HTTP.get(
    environment.baseUrl8084 +'FlexiSectionMaster/GetAllActive').pipe(map((res: any) => {
      return res;
    })
  );
 }

//  {
//
// "flexiSectionMasterId": 28,
// "flexiSectionName": "test121",
// },
//  Formula Name
getFormulaName() {
  const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
  return this._HTTP.get(
      environment.baseUrl8084 +
      'formula-master').pipe(map((res: any) => {
        return res;
      })
    );
}

// {

//   "formulaId": 1,
//   "formulaName": "BASIC_MASTER",
// },


// SDM Name
getSDMName() {
  const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
  return this._HTTP.get(
      environment.baseUrl8084 +
      'SDMDerivedMaster/GetByModuleName?derivedObjectName=FlexiHeadSetting').pipe(map((res: any) => {
        return res;
      })
    );
}

// {
//   "id": 180,
//   "sdmvalue": "SDM-Flexi"
// }

// Derived Name
getHeadDerivedNameList(name) {
  const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
  return this._HTTP
    .get(
      environment.baseUrl8084 +
        'SDMDerivedMaster/GetByMasterId?derivedObjectName=FlexiHeadSetting&sdmMasterId=' +
        name
    )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
}

// "sdmDerivedMasterId": 155,
// "derivedName": "SDM-Flexi-applicability",

getApplicabilitySDM() {
  const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
  return this._HTTP
    .get(
      environment.baseUrl8084 +
        'SDMDerivedMaster/GetByModuleName?derivedObjectName=FlexiHeadSetting'
        // 'SDMDerivedMaster/GetByModuleName?derivedObjectName=FlexiHeadSetting' +
        // name
    )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
}

//  Updation Type
getUpdationType() {
  const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
  return this._HTTP
    .get(
      environment.baseUrl8084 +
        'FlexiSettingDD/FlexiSettingDDForUpdationType'
    )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
}
// "flexiSettingDDId": 2,
// "value": "Non-Amount",



getPresentationMethod() {
  const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
  return this._HTTP.get(environment.baseUrl8084 +
      'FlexiSettingDD/FlexiSettingDDForPresentationMethod').pipe(map((res: any) => {return res;
      })
    );
}

// "flexiSettingDDId": 4,
// "type": "Presentation Method",
// "value": "Slider",


getMinEligibilityMethod() {
  const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
  return this._HTTP.get(environment.baseUrl8084 +
      'FlexiSettingDD/FlexiSettingDDForMinEligibilityMethod').pipe(map((res: any) => {return res;
      })
    );
}


// "flexiSettingDDId": 7,
//                 "type": "Min Eligibility Method",
//                 "value": "Zero",

getMaxEligibilityMethod() {
  const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
  return this._HTTP.get(environment.baseUrl8084 +
      'FlexiSettingDD/FlexiSettingDDForMaxEligibilityMethod').pipe(map((res: any) => {return res;
      })
    );
}

// "flexiSettingDDId": 10,
// "type": "Max Eligibility Method",
// "value": "SDM",



getInBetweenMinMax() {
  const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
  return this._HTTP.get(environment.baseUrl8084 +
      'FlexiSettingDD/FlexiSettingDDForInBetweenMinMax').pipe(map((res: any) => {return res;
      })
    );
}
// "flexiSettingDDId": 13,
// "type": "In Between Min & Max",
// "value": "Any Value",

postHeadMaster(data) {
  const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
  return this.http
    .post(environment.baseUrl8084 + 'FlexiHeadSetting', data)
    .pipe(
      map((res: any) => {
        return res;
      })
    );
}

getHeadSettingTableData() {
  const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('X-TenantId', 'PaysquareDefault');
  return this._HTTP
    .get(
      environment.baseUrl8084 +
        'FlexiHeadSetting'
    )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
}

}

