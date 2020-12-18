export class PayrollAreaRequestModel {  
    constructor(  
        public employeeMasterId : any,
        public payrollAreaInformationId: any,
        public description : any,
        public type: any,
        public payrollAreaFromDate: any,
        public payrollAreaToDate: any,
        public paymentMode:any,
        public bankAccount:any,
        public bankName: any,
        public nameAsPerBank :any,
        public typeOfPayment:any,
        public isPercentOfNetPay: any,
        public percentageOfNetPay:any,
        public isAmount:any,
        public amount:any,
        public payFromDate:any,
        public payToDate: any,
        public priority: any,
        public currency: any,
        public payrollAreaCode:any,
        public additionalPayrollAllowed: any,
        public multibankingAllowed: any,
        y
    ){}

} 
