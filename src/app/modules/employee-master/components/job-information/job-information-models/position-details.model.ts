export class PositionDetailsModel {
    constructor(  
       // public employeePositionDetailId:any,
        public employeeMasterId:any,
        public payrollAreaId:any,	

        public typeList:PositionDetailsDTO,
        public statusList:PositionDetailsDTO,
        public taxCategoryList:PositionDetailsDTO,
        public reportingToList:PositionDetailsDTO
        
    
        // public employeeType:any,
        // public employeeTypeDescription:any,
        // public employeeTypeFromDate:any,
        // public employeeTypeToDate:any,
    
        // public employeeStatus:any,
        // public employeeStatusDescription:any,
        // public employeeStatusFromDate:any,
        // public employeeStatusToDate:any,
    
        // public employeeTaxCategory:any,
        // public employeeTaxCategoryDescription:any,
        // public employeeTaxCategoryFromDate:any,
        // public employeeTaxCategoryToDate:any,
    
        // public gradeMasterId:any,
        // public gradeFromDate:any,
        // public gradeToDate:any,
    
        // public designation1MasterId:any,
        // public designation1FromDate:any,
        // public designation1ToDate:any,
    
        // public designation2MasterId:any,
        // public designation2FromDate:any,
        // public designation2ToDate:any,
    
        // public reportingTo:any,
        // public reportingToDescription:any,
        // public reportingFromDate:any,
        // public reportingToDate:any
    ){} 

 }

 export class PositionDetailsDTO {
	
	constructor(	
		    public employeePositionMappingId:any,
			public category:any,
			public positionDetailDDId:any,	
			public fromDate:any,
	        public toDate:any,
			public value:any,
			public description:any

	){}

	
 }

