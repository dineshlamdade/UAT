
export class requestDTOString {
  constructor() { }
  public companyMasterRequestDTOs: Array<any> = [];
}

export class companyMasterRequestDTOs {
  public employeeMasterRequestDTO = new EmployeeMasterRequestDTO('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
  public companyMasterRequestDTOs: Array<any> = [];

  constructor() { }
}

export class EmployeeMasterRequestDTO {
  constructor(
    public globalCompanyMasterId: any,
    public code: any,
    public companyName: any,
    public shortName: any,
    public formerName: any,
    public companyGroupName: any,
    public address1: any,
    public address2: any,
    public address3: any,
    public country: any,
    public pinCode: any,
    public state: any,
    public city: any,
    public village: any,
    public phoneNumber: any,
    public isdCode: any,
    public emailId: any,
    public website: any,
    public isContractor: any,
    public typeOfEstablishment: any,
    public language: any,
    public currency: any,
    public industryType: any,
    public scale: any,
    public coClassification: any,
    public startDate: any,
    public endDate: any,
    public reason: any,
    public companyActive: any,
    public remark: any,
    public logo1: any,
    public logo2: any,
    public logo3: any,
  ) { }
}
