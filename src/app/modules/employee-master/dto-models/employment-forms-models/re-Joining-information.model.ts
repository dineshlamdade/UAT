export class ReJoiningInformationModel {  
    constructor(  
        public employementType: any,
        public rejoiningDate: any,
        public originalHireDate: any,
        public joiningDateForGratuity:any,
        public isProbationInMonth: any,
        public probationPeriodMonth: any,
        public isProbationInDays: any,
        public probationPeriodDays:any,
        public isNoticePeriodInMonth: any,
        public noticePeriodMonth: any,
        public isNoticePeriodInDays: any,
        public noticePeriodDays: any,
        public expectedConfirmationDate:any,
        public expectedConfirmationRemark: any,
        public confirmationDate: any,
        public confirmationRemark: any,
        public employeeMasterId:any,
        public employementInfoId: any,
        // public projectedRetirementDate: any
    ){} 
}