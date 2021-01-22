export class PersonalInformationModel {
    // public internationalWorkerRequestDTO = new internationalWorkerRequestDTO('','','','','');
    public employeeMasterRequestDTO = new employeeMasterRequestDTO('','','','','','','','','','','','','','','','','','');
    
    constructor(
        public bloodGroup: any,
        public nationality: any,
        public maritialStatus: any,
        public anniversaryDate: any,
        public isPhysicallyChallenged: any,
        public disabilityType: any,
        public severityLevel: any,
        public employeeMasterId:any,
        public createdBy:any,
        public lastModifiedBy:any,
        public isDraft:any,
    ){}
 
 }
 export class employeeMasterRequestDTO {
    constructor(
        public employeeMasterId: any,
        public title: any,
        public firstName: any,
        public middleName: any,
        public lastName: any,
        public companyId: any,
        public fullName:any,
        public displayName:any,
        public employeeCode:any,
        public alternateEmployeeCode:any,
        public dateOfBirth: any,
        public isActive:any,
        public gender:any,
        public createdBy:any,
        public lastModifiedBy:any,
        public isDraft:any,
        public sameCode: any,
        public rejoinee: any
    ){}

 }
 export class internationalWorkerRequestDTO {
    constructor(
        public isExpatWorker: any,
        public countryOfOrigin: any,
        public isOnCOC: any,
        public cocValidTill: any,
        public cocNumber: any,
        public employeeMasterId:any,
    ){}

 }

 