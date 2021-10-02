
	

export class OrganizationDetailsModel {
   
 
    constructor(  
    // public employeeOrganizationDetailId:any,
	// public employeeMasterId:any,
	// public payrollAreaCode:any,	

		public employeeMasterId:any,
		public payrollAreaId:any,
       // public establishmentList:any,
		//public	establishmentList: JobDetailsDTO,
		public subLocationList: JobDetailsDTO,
		public workLocationList: JobDetailsDTO,
		public businessAreaList: JobDetailsDTO,
		public subAreaList:  JobDetailsDTO,
		public strategicBusinessAreaList:  JobDetailsDTO,
		public divisionList:  JobDetailsDTO,
		public departmentList: JobDetailsDTO,
		public subDepartmentList: JobDetailsDTO,
		public costCenterList:  JobDetailsDTO,
		public subCostCenterList:  JobDetailsDTO,
		public profitCenterList: JobDetailsDTO,
		public establishmentList:JobDetailsDTO,
		public designation1List:JobDetailsDTO,
		public designation2List:JobDetailsDTO,
		public gradeList:JobDetailsDTO,
		public job1List:JobDetailsDTO,
		public job2List:JobDetailsDTO,
		public job3List:JobDetailsDTO,
		public job4List:JobDetailsDTO,
		public job5List:JobDetailsDTO,
		public position1List:JobDetailsDTO,
		public position2List:JobDetailsDTO,
		public position3List:JobDetailsDTO,
		public position4List:JobDetailsDTO,
		public position5List:JobDetailsDTO,
		public typeList:JobDetailsDTO,
        public statusList:JobDetailsDTO,
        public taxCategoryList:JobDetailsDTO,
		public skillList:JobDetailsDTO,
		public workList:JobDetailsDTO

		
		
	// public establishmentMasterId:any,
	// public establishmentFromDate:any,
	// public establishmentToDate:any,
	
	// public subLocationMasterId:any,
	// public subLocationFromDate:any,
	// public subLocationToDate:any,
	
	// public workLocationMasterId:any,
	// public workLocationFromDate:any,
	// public workLocationToDate:any,

	
	// public businessAreaMasterId:any,
	// public businessAreaFromDate:any,
	// public businessAreaToDate:any,
	
	// public subAreaId:any,
	// public subAreaFromDate:any,
	// public subAreaToDate:any,
	
	// public strategicBusinessUnitId:any,
	// public strategicBusinessFromDate:any,
	// public strategicBusinessToDate:any,
	
	// public divisionMasterId:any,
	// public divisionFromDate:any,
	// public divisionToDate:any,
	
	
	// public departmentMasterId:any,
	// public departmentFromDate:any,
	// public departmentToDate:any,
	

	// public subDepartmentId:any,
	// public subDepartmentFromDate:any,
	// public subDepartmentToDate:any,
	
	// public costCentreId:any,
	// public costCentreFromDate:any,
	// public costCentreToDate:any,
	
	// public subCostCentreId:any,
	// public subCostCentreFromDate:any,
	// public subCostCentreToDate:any,

	
	// public profitCentreMasterId:any,
	// public profitCentreFromDate:any,
	// public profitCentreToDate:any
    ){} 

	
	// constructor(  
	// 	public employeeJobMappingId:any,
	// 	public employeeMasterId:any,
	// 	public payrollAreaCode:any,	
	// 	public establishmentMasterId:any,
	// 	public jobDetailsDTO:Array<any>
	// 	){} 
	
 }

 export class JobDetailsDTO {
	
	constructor(	
		//    public employeeJobMappingId:any,
			public jobMasterType:any,
			public jobMasterMappingId:any,	
			public fromDate:any,
	        public toDate:any,
			public masterCode:any,
			public description:any,
	

	){}

	
 }
