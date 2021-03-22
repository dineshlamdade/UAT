
export class LocalAddressInformation {  
    constructor(  
        public addressType: any,
        public address1: any,
        public address2: any,
        public address3: any,
        public postalCode: any,
        public village: any,
        public city:any,
        public district:any,
        public state:any,
        public country:any,
        public isCommunicationAddress: any,
        // public isCommunicationAddressPermanent:any,
        public employeeMasterId:any,
        public createdBy:any
    ){}  
} 
export class PermanentAddressInformation {  
    constructor(  
        public addressType: any,
        public address1: any,
        public address2: any,
        public address3: any,
        public postalCode: any,
        public village: any,
        public city:any,
        public district:any,
        public state:any,
        public country:any,
        public isCommunicationAddress: any,
        // public isCommunicationAddressPermanent:any,
        public employeeMasterId:any,
        public createdBy:any
    ){}  
} 




export class ContactInformation {  
    public employeePersonalInfoRequestDTO = new employeePersonalInfoRequestDTO('','','','','','')
    public employeeMasterRequestDTO = new employeeMasterRequestDTO('','','','')
    public employeeAddressRequestDTOList: Array<any> =[];

    constructor(){}  
} 
export class employeePersonalInfoRequestDTO {
    constructor(
        public officialMobileNumber: any,
        public personalEmailID: any,
        public emergencyContactName1: any,
        public emergencyContactNumber: any,
        public employeeMasterId: any,
        public createdBy: any
    ){}
 }

 export class employeeMasterRequestDTO {
    constructor(
        public personalMobileNumber: any,
        public officialEmailId: any,
        public employeeMasterId: any,
        public createdBy: any
    ){}
 }
 export class CountryCode {
    constructor(
        public name: any,
        public phoneCode: any,
        public iso3: any,
        
    ){}
  }


 
        
