export class InputDetailsModel {  
    public previousEPFEPSRequestDTO = new previousEPFEPSRequestDTO('','','','','','','','')
    public presentEPFEPSRequestDTO = new presentEPFEPSRequestDTO('','','','','','','','','','','','','','')
    public superAnnuationRequestDTO = new superAnnuationRequestDTO('','','')
    constructor(){}  
}

export class previousEPFEPSRequestDTO {
    constructor(
        
		public previousEmploymentPFEPSId:any,
        public isFirstEmployment: any,
		public isContributedInPast: any,
		public previousPFNumber: any,
		public isContributedBefore1Sep2014: any,
		public isPartOfEPS: any,
		public schemeCertificateNumber: any,
		public authorityIssuer: any
    ){}
 }
 
 export class presentEPFEPSRequestDTO {
    constructor(
    	public employeePFEPSDetailId:any,
        public employeeMasterId: any,
		public isEPFApplicable: any,
		public isEPSApplicable: any,
		public reasonForNilPF: any,
		public employeeContributionMethod: any,
		public employerContributionMethod: any,
		public contributionFromDate: any,
		public contributionToDate: any,
		public voluntaryPFPercent: any,
		public voluntaryPFAmount: any,
		public voluntaryFromDate: any,
		public voluntaryToDate: any,
		public isEPSContributionTill60: any
    ){}
 }
 
 export class superAnnuationRequestDTO {
    constructor(
    
        public saContributionRate: any,
		public saContributionFromDate: any,
		public saContributionToDate: any
    ){}
 }
