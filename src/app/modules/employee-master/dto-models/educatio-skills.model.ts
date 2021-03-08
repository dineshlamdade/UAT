

// export class EducationSkillsInformation {  
    // public employeeEducationRequest = new employeeEducationRequest('','','','','','','','','','','','','','','','')
    // public employeeLanguageRequest = new employeeLanguageRequest('','','','','','');
    // public employeeSkillDetailsRequest = new employeeSkillDetailsRequest('','','','','')

    // public employeeEducationRequestDTOList: Array<any> =[];
    // public employeeLanguageRequestDTOList: Array<any> =[];
    // public employeeSkillDetailsRequestDTOList: Array<any> =[];

//     constructor(){}  
// } 


export class employeeEducationRequest {  
    constructor(  
        public employeeEducationID : any,
        public employeeMasterId : any,
        public qualification : any,
        public education: any,
        public degreeName: any,
        public location: any,
        public instituteUniversityName:any,
        public durationOfCourse:any,
        public durationOfCourseValue:any,
        public startDate :any,
        public endDate:any,
        public percentageOrCGPAOrGrade: any,
        public courseType:any,
        public specialisation1:any,
        public specialisation2:any,
        public remark:any,
        public isHighestQualification: any
    ){}  
} 
export class employeeLanguageRequest {  
    constructor(  
        public employeeLanguageinfoId: any,
        public employeeMasterId: any,
        public language: any,
        public read: any,
        public write: any,
        public speak: any
    ){}  
} 

export class employeeSkillDetailsRequest {  
    constructor(  
        public employeeSkillInfoId: any,
        public employeeMasterId: any,
        public skillName: any,
        public proficiency: any,
        public skillDescription: any
    ){}  
} 

export class employeeCertificateRequest {  
    constructor(  
        public employeeCertificateId: any,
        public employeeMasterId: any,
        public certificateMasterMappingId: any,
        public cerificateNumber: any,
        public renewable: any,
        public renewalCertificationDate: any,
        public renewalValidityFromDate: any,
        public renewalValidityToDate: any,
        public renewalValidityRemark: any,
        public renewalFeesValidityFromDate: any,
        public renewalFeesValidityToDate: any,
        public renewalFeesValidityRemark: any,
        public renewalFeesCurrency: any,
        public renewalFees: any,
    ){}  
} 

