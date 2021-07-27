export class PayrollAreaRequestModel {  
    constructor(  

        // public employeeBankMapPayAreaId,
        // public employeeBankInfoId,
        public employeeMasterId : any,
        public payrollAreaInformationId: any,
        public description : any,
        public type: any,
        public payrollAreaFromDate: any,
        public payrollAreaToDate: any,
        // public paymentMode:any,
        // public accountNO:any,
        // public bankName: any,
        //public nameAsPerBank :any,
        // public typeOfPayment:any,
        // public isPercentOfNetPay: any,
        // public percentageOfNetPay:any,
        // public isAmount:any,
        // public amount:any,
        // public payFromDate:any,
        // public payToDate: any,
        // public priority: any,
        // public currency: any,
        public payrollAreaId:any,
        public payrollAreaCode:any,
        public additionalPayrollAllowed: any,
        // public multiBankingAllowed: any,
        // public isHoldSalary:any,
        // public isFFS:any,

        // public attendanceAreaId,
        // public attAreaInfoId,
        // public attendanceAreaCode:any,
        // public attendanceAreaFromDate:any,
        // public attendanceAreaToDate:any,
        
    ){}

} 

export class disbursementDTO{
    payrollAreaInformationId:any;
      employeeBankInfoId:any;
      modeOfPayment: any;
      bankName:any;
      bankDropList: Array<bankName>;
      ifsc:any;
      ifscList: Array<IFSC> ;
      accountNo: any;
      accountNoList:Array<accountList> ;
      nameAsPerBank: any;
      percentageOfNetPay: any;
      amount: any;
      priority: any;
}
export class bankName{
    bankName:any;
}
export class IFSC{
    ifsc:any;
}
export class accountList{
    accountNo:any;
}