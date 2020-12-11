

export class EmployeeSummaryBean {  
    public identitySummaryBean = new identitySummaryBean('','','','','','','','')
    public personalSummaryBean = new personalSummaryBean('','','','','','','','','','','','','','')
    public workSummaryBean = new workSummaryBean('','','','','','','','','','','','','','','','','','')
    public nominationSummaryBean = new nominationSummaryBean('','','','','','')
    // public VisaInformation = new VisaInformation('','','','','','');
    constructor(){}  
} 
export class identitySummaryBean {
    constructor(
        public profilePicture: any,
        public designation: any,
        public fullName: any,
        public employeeCode: any,
        public officialEmailId: any,
        public personalMobileNumber: any,
        public companyName:any,
        public officialMobileNumber:any
    ){}
 }
 export class personalSummaryBean {
    constructor(
        public dateOfBirth: any,
        public bloodGroup: any,
        public maritalStatus: any,
        public nationality: any,
        public emergencyContactNo: any,
        public aadhar: any,
        public pan:any,
        public uan:any,
        public passportNo:any,
        public physicallyChallenge: any,
        public communicationAddress: any,
        public highestQualification:any,
        public language:any,
        public skills:any,
    ){}
 }
 export class workSummaryBean {
    constructor(
        public dateOfJoining: any,
        public originalHiringDate: any,
        public status: any,
        public lastWorkingDate: any,
        public reasonOfLeaving: any,
        public establishment: any,
        public workLocation: any,
        public designation1: any,
        public designation2: any,
        public reportingManager: any,
        public employmentType: any,
        public taxCategory: any,
        public strategicBusinessUnit: any,
        public project: any,
        public costCenter: any,
        public payrollArea: any,
        public grade: any,
        public department: any
    ){}
 }
 export class nominationSummaryBean {
    constructor(
        public providentFund: any,
        public eps: any,
        public sa: any,
        public gratuity: any,
        public createdBy: any,
        public salary: any
    ){}
 }
        
