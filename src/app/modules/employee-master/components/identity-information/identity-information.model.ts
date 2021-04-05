
export class IdentityInformation {  
    public employeePersonalInfoRequestDTO = new employeePersonalInfoRequestDTO('','','','','','','','','','','','','','','','','')
    public employeeMasterRequestDTO = new employeeMasterRequestDTO('','','','','','','','','')
    public employeeESICDTORequestDTO = new employeeESICDTORequestDTO('','','','')
    public employeeVisaDetailRequestDTOList: Array<any> =[];
    // public VisaInformation = new VisaInformation('','','','','','');
    constructor(){}  
} 
export class employeePersonalInfoRequestDTO {
    constructor(
        public employeeMasterId: any,
        public electionCardNo: any,
        public nameAsperElectionCard: any,
        public nprNumber: any,
        public nameAsPerNPR: any,
        public drivingLicenseNo: any,
        public nameasperDrivingLicense:any,
        public drivingLicenseExpiryDate:any,
        public pran:any,
        public passportNo:any,
        public nameAsPerPassport: any,
        public countryOfOrigin:any,
        public passportPlaceOfIssue:any,
        public passportValidFrom:any,
        public passportExpiryDate:any,
        public createdBy:any,
        public lastModifiedBy:any
    ){}
 }
 export class employeeMasterRequestDTO {
    constructor(
        public aadhaar: any,
        public nameAsPerAADHAAR: any,
        public pan: any,
        public nameAsPerPAN: any,
        public uan: any,
        public nameAgainstUAN: any,
        public employeeMasterId:any,
        public createdBy:any,
        public lastModifiedBy:any,
    ){}
 }
 export class employeeESICDTORequestDTO {
    constructor(
        public esicCode: any,
        public employeeMasterId: any,
        public createdBy: any,
        public lastModifiedBy: any
    ){}
 }
 export class VisaInformation {
    constructor(
        public countryName: any,
        public visaType: any,
        public validTill: any,
        public employeeMasterId: any,
        public createdBy: any,
        public lastModifiedBy: any,
        public employeeVisaDetailId: any
    ){}
 }
        
