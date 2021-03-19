

export class FamilyInformation {  
    // public employeeEducationRequest = new employeeEducationRequest('','','','','','','','','','','','','','','','')
    // public employeeLanguageRequest = new employeeLanguageRequest('','','','','','');
    // public employeeSkillDetailsRequest = new employeeSkillDetailsRequest('','','','','')

    public familyMemberInfoRequestDTO: Array<any> =[];
    public familyAddressDetailRequestDTO: Array<any> =[];
    public guardianDetailRequestDTO: Array<any> =[];

    constructor(){}  
} 


export class familyMemberInfoRequestDTO {  
    constructor(  
        public employeeMasterId : any,
        public familyMemberInfoId : any,
        public familyMemberName : any,
        public fatherHusbandName: any,
        public dateOfBirth: any,
        public relation: any,
        public gender:any,
        public maritalStatus:any,
        public aadhaar :any,
        public nameAsPerAadhaar:any,
        public ageBracket: any,
        public isDependant:any,
        public companyMediclaimApplicable:any,
        public isMemberActive: any,
        public remark:any,
    ){}

} 
export class familyAddressDetailRequestDTO {  
    constructor(  
        public employeeMasterId : any,
        public familyMemberInfoId : any,
        public address1: any,
        public address2:any,
        public address3:any,
        public country:any,
        public state: any,
        public city:any,
        public village:any,
        public pinCode:any,
        public phoneNumber: any
    ){} 
    
} 

export class guardianDetailRequestDTO {  
    constructor(  
        public employeeMasterId : any,
        public familyMemberInfoId : any,
        public guardianName : any,
        public phoneNumber: any,
        public address1: any,
        public address2:any,
        public address3:any,
        public country:any,
        public state: any,
        public pincode: any,
        public city:any,
        public village:any,
    ){} 
} 


export class NominationElementDTO {  
    constructor(  
        public familyMemberInfoId : any,
        public familyMemberName : any,
        public providentFund: any,
        public eps: any,
        public salary:any,
        public esic:any,
        public gratuity:any,
        public superAnnuation: any,
        public lifeInsurance: any
    ){} 
} 

export class NominationInformation {  

    public familyNominationRequestDTO: Array<any> =[];
    public familyESICDetailRequestDTO: Array<any> =[];
    constructor(){}  
}



export class TotalPercentageDTO {  
    constructor(  
        public remainingAccidentIns : any,
        public remainingAnnuation : any,
        public remainingEps: any,
        public remainingEsic: any,
        public remainingGratuity:any,
        public remainingLifeIns:any,
        public remainingMediclaimIns:any,
        public remainingPf: any,
        public remainingSalary: any,
        public totalAccidentIns : any,
        public totalAnnuation : any,
        public totalEps: any,
        public totalEsic: any,
        public totalGratuity:any,
        public totalLifeIns:any,
        public totalMediclaimIns:any,
        public totalPf: any,
        public totalSalary: any
    ){} 
} 

export class documentElementDTO {  
    constructor(  
        public Nomination : any,
        public Document : any,
    ){} 
} 