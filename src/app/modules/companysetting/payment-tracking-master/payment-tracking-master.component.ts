import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import { PaymenttrackingMasterService } from './paymenttracking-master.service';

@Component({
  selector: 'app-payment-tracking-master',
  templateUrl: './payment-tracking-master.component.html',
  styleUrls: ['./payment-tracking-master.component.scss']
})
export class PaymentTrackingMasterComponent implements OnInit {
  paymenttrackingForm: any;
  applicationModuleNameList: any;
  complianceHeadList: any;
  complianceMasterList: any;
  garnishmentMasterList: any;
  jobMasterList: any;
  jobMasterMappingList: any;
  workFlowList: any;
  users1:  [];
  users2: [];
  bankDetails: any;
  summary: any;
  editFlag: any;
  jobMasterMapping: any;
  garnishmentDetailsList: any;
  ifscCode: any;
  bankName: any;
  branchName: any;
  accountNumber: any;
  isActive: any;
  row: any=[];
  rowV: any=[];
  bankDetailssummary: any;
  
 
  constructor( private formBuilder: FormBuilder, private service:PaymenttrackingMasterService,
    private alertService: AlertServiceService,) { }

  ngOnInit(): void {
    this.getApplicaationModuleName()
    this.getComplianceMasterHeads()
    this.getComplianceMaster()
    this.getGarnishmentMasterDes()
    this.getJobMaster()
    this.getJobMasterMapping()
    this.getWorkFlowApproval()
    this.getSummary()
    this.getBankdetails()

    this.paymenttrackingForm = this.formBuilder.group({
      paymentTrackMastId: new FormControl(''),
      code: new FormControl(''),
      description: new FormControl(''),
      groupCompanyId : new FormControl(''),
      nature : new FormControl(''),
      moduleId : new FormControl(''),
      paymentMode : new FormControl(''),
      complianceHead : new FormControl(''),
      complianceMaster : new FormControl(''),
      payeeName : new FormControl(''),
      autoCreaPayVouch : new FormControl(''),
      payMoreOneProcCyOneGo : new FormControl(''),
      payMoreOnePertainCyOneGo : new FormControl(''),
      partPay : new FormControl(''),
      workflowMasterHeaderId : new FormControl(''),
      defaultModePayment : new FormControl(''),
      approvalSDMId : new FormControl(''),
      remark : new FormControl(''),
      applicationModuleName :new FormControl(''),
      complianceName : new FormControl(''),
      complianceHeadName : new FormControl(''),
      contactPerson : new FormControl(''),
      jobMasterType : new FormControl(''),
      workflowCode : new FormControl(''),
      masterCode : new FormControl(''),
      
      

    })
//     this.users1 = [
//       { srno: '1', head: 'Earning',logic:'AAA',formula: 'bbb',value:'AAA Desc' },

  
//  ];
//  this.users2 = [
//   { srno: '1', ifsc:'hii',bankname:'AAA',address:'AAA Desc' ,accountno:'5646' ,default:'' },


// ];
   
 }
 

 getApplicaationModuleName(){
  this.service.getModuleName().subscribe((res) => {

    this.applicationModuleNameList = res.data.results;
    
 });
 }

 getComplianceMasterHeads(){
   this.service.getComplianceHead().subscribe(res =>{
     this.complianceHeadList = res.data.results;
   });
 }
getComplianceMaster(){
  this.service.getComplianceMaster().subscribe(res =>{
    this.complianceMasterList = res.data.results;
  })
}

getGarnishmentMasterDes(){
  this.service.getGarnishmentMaster().subscribe(res =>{
    this.garnishmentDetailsList = res.data.results;
  })
}

getJobMaster(){
  this.service.getJobMaster().subscribe(res =>{
    this.jobMasterList = res.data.results;
  })
}

getJobMasterMapping(){
  this.service.getJobMasterMapping().subscribe(res =>{
    this.jobMasterMappingList = res.data.results;
  })
}
 getWorkFlowApproval(){
   this.service.getWorkflowMaster().subscribe(res =>{
     this.workFlowList = res.data.results
   })
 }

 getBankdetails(){
   this.service.getBankMasterDetails().subscribe(res =>{
     this.bankDetailssummary = res.data.results;
   })
 }

 getJobMappingValue(){
   this.service.getJobMasterMapping().subscribe(res =>{
     this.jobMasterMapping = res.data.results;
   })
 }

 getSummary(){
   this.service.getAll().subscribe(res =>{
     this.summary = res.data.reslts;
   })
 }


 paymentTrackingFormSubmit(){

  if(!this.editFlag){
this.service.addPayment(this.paymenttrackingForm).subscribe(res =>{
  this.alertService.sweetalertMasterSuccess("Role Privilege data saved successfully", "");
})
  }

  
 }

 onSelectComplianceMaster(complianceHeadId){
if(complianceHeadId){
  this.service.getComplianceMaster().subscribe(res =>{
    this.complianceMasterList = res.data.results;
  })
  
}
console.log("complianceMasterList::::::",this.complianceMasterList)
 }

 onSelectJobFieldValue(jobMasterId){
   if(jobMasterId){
  this.service.getJobMasterMapping().subscribe(res =>{
    this.jobMasterMappingList = res.data.results;
  })
   }
   console.log("jobMasterMappingList::::::",this.jobMasterMappingList)
 }


 addTable() {
  const obj = {
    ifscCode: this.ifscCode,
    bankName: this.bankName,
    branchName: this.branchName,
    accountNumber: this.accountNumber,
    isActive: this.isActive,
  

  };


  this.row.push(obj);
 
}
deleteRows(x) {
  this.row.splice(x, 1);
  
}
addTableVoucher(){
  const obj = {
    ifscCode: this.ifscCode,
    bankName: this.bankName,
    branchName: this.branchName,
    accountNumber: this.accountNumber,
    isActive: this.isActive,
  

  };


  this.rowV.push(obj);
 
}
deleteRowsV(x) {
  this.row.splice(x, 1);
   
}
}
