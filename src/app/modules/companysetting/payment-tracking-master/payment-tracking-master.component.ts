import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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
  jobMasterMappingList:any= [];
  masterCode : [];
  workFlowList: any;
 bankDetails: any;
  summary: any;
  editFlag: any;
  jobMasterMapping: any;
  garnishmentDetailsList: any;
  ifscCode: any;
  bankName: any;
  branchName: any;
  accountNumber: any;
  
  row: any=[];
  rowV: any=[];
  bankDetailssummary: any;
  ifscCodeList: any;
  payHead: any;
  logicMethod: any;
  formulaMasterId: any;
  products: any=[];
  bankData: any;
  sdmApproval: any;
  selectedProduct: any=[];
  logicValue: any;
  formulaName: any;
  paymentTrackingAddPayVoucherMaster: any=[];
  paymentTrackingJobFieldMaster: any=[];
  paymentTrackingMasterBankDetails: any = [];
  addPaymentTracking: any;
  updatePaymentTrackingData: any;
  active: any;
  isVisible: boolean = false;
  isShown: boolean = true;
  addPaymentTrackingForm: any;
  complianceHeadId: any;
  paymentTrackingJobFieldValueMapping: any =[];
  selectedFormulaname: any;
  jobField: any;
  modalRef: any;

  
 
  constructor(private modalService: BsModalService, private formBuilder: FormBuilder, private service:PaymenttrackingMasterService,
    private alertService: AlertServiceService,) {
      this.paymenttrackingForm = this.formBuilder.group({
      "active": new FormControl(''),
        "approvalSDMId": new FormControl(""),
        "autoCreaPayVouch": new FormControl(""),
        "code": new FormControl(""),
         "complianceHead": new FormControl(""),
        "complianceMaster": new FormControl(""),
        "defaultModePayment": new FormControl(""),
        "description": new FormControl(""),
        "groupCompanyId": new FormControl(1),
        "moduleId": new FormControl(""),
        "nature": new FormControl(""),
        "partPay": new FormControl(""),
        "payMoreOnePertainCyOneGo": new FormControl(""),
        "payMoreOneProcCyOneGo": new FormControl(""),
        "payeeName": new FormControl(""),
        "paymentMode": new FormControl(""),
        "paymentTrackMastId": new FormControl(0),
        "paymentTrackingAddPayVoucherMaster": new FormControl([]),
        "paymentTrackingJobFieldMaster": new FormControl([]),
        "paymentTrackingMasterBankDetails": new FormControl([]),
        "remark": new FormControl(""),
        "workflowMasterHeaderId": new FormControl(""),
        
      
      //  "applicationModuleName" : new FormControl('')
      

      


    })

     }

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
    this.getBankDetailsPopUp()
    this.getSDM()
    // this.getSummaryData()

   
   
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
   // this.jobMasterMappingList = res.data.results;
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

 getBankDetailsPopUp(){
   this.service.getBankMasterDetails().subscribe(res =>{
     this.bankData = res.data.results;
   })
 }

// getBankDetailsPopUp(){
//   this.bankData =[]
//   this.service.getBankMasterDetails().subscribe(res =>{
//     let bankDataList = res.data.results;
//     bankDataList.forEach(element => {
//       this.bankData.push({
//         'ifscCode':element.ifscCode,
//         'bankName' : element.bankName,
//         'branchName':element.branchName,
//         'accountNumber' : element.mappingDetails.accountNumber
//       })
      
//     });
//   })
// }


 getJobMappingValue(){
   this.service.getJobMasterMapping().subscribe(res =>{
     //this.jobMasterMapping = res.data.results;
     res.data.results.forEach(element => {
      this.jobMasterMapping.push({
        label : element.masterCode,
        value: element.jobMasterMappingId
      });
       
     });
   })
 }

 getIFSCBankCode(){
   this.service.getBankMasterDetails().subscribe(res =>{
     this.ifscCodeList = res.data.results;
   })
  
 }

 getSDM(){
   this.service.getSdmDetails().subscribe(res =>{
     this.sdmApproval = res.data.results;
   })
 }



// getSummaryData(){
//   this.service.getSummay().subscribe(res =>{
//     this.summary = res.data.results;
//   })
// }


 getSummary() {
  
  this.summary =[];
  this.service.getAll().subscribe((res) => {
     let ressultdata = res.data.results[0];
      
        ressultdata.forEach(element => {
           this.summary.push({
              'code': element.code,
              'description': element.description,
              'nature': element.nature,
              'remark': element.remark,
            //  'payTrackJobFieldMasterId': element.paymentTrackingJobFieldMaster,
            //  'jobField': element.paymentTrackingJobFieldMaster,
            //   'payTrackJobMappId': element.paymentTrackingJobFieldValueMapping.payTrackJobMappId,
            //   'jobFieldValue': element.paymentTrackingJobFieldValueMapping.jobFieldValue,
            //   'paymentTrackingAddPayVoucherMasterid': element.paymentTrackingAddPayVoucherMaster.paymentTrackingAddPayVoucherMasterid,
            //   'payHead': element.paymentTrackingAddPayVoucherMaster.payHead,
            //   'formulaMasterId': element.formulaMasterId,
            //   'logicMethod': element.logicMethod,
             
           })
        }); 
        console.log(JSON.stringify(this.summary))

  });
}




 paymentTrackingFormSubmit(){

  this.paymenttrackingForm.controls['paymentTrackingAddPayVoucherMaster'].setValue(this.paymentTrackingAddPayVoucherMaster);
  this.paymenttrackingForm.controls['paymentTrackingJobFieldMaster'].setValue(this.paymentTrackingJobFieldMaster);
  this.paymenttrackingForm.controls['paymentTrackingMasterBankDetails'].setValue(this.paymentTrackingMasterBankDetails);
  

  console.log(JSON.stringify(this.paymenttrackingForm.value));
  
  
  if(!this.editFlag){
   this.service.addPayment(this.paymenttrackingForm.value).subscribe(res =>{

  this.addPaymentTracking = res.data.results;
  this.getSummary()
  this.isVisible = false;
  this.isShown = true;
  this.alertService.sweetalertMasterSuccess("Payment Tracking data saved successfully", "");
})
  }
  else{
    this.updatePaymentTracking()
  }

  
 }

 updatePaymentTracking(){
  this.paymenttrackingForm.controls['paymentTrackingAddPayVoucherMaster'].setValue(this.paymentTrackingAddPayVoucherMaster);
  this.paymenttrackingForm.controls['paymentTrackingJobFieldMaster'].setValue(this.paymentTrackingJobFieldMaster);
  this.paymenttrackingForm.controls['paymentTrackingMasterBankDetails'].setValue(this.paymentTrackingMasterBankDetails);

  console.log(JSON.stringify(this.paymenttrackingForm.value));
  this.service.updatePayment(this.paymenttrackingForm.value).subscribe(res =>{
    this.updatePaymentTrackingData = res.data.results; 
    this.getSummary();
    this.isVisible = false;
    this.isShown = true;
    this.alertService.sweetalertMasterSuccess("Payment Tracking data update successfully","")
    this.reset();
  })
 }
 
 editSummary(summary){
  this.paymenttrackingForm.patchValue(summary)
  this.paymenttrackingForm.enable();
  this.isVisible = true;
  this.isShown = false;

 }
 viewSummary(summary){
  this.paymenttrackingForm.patchValue(summary)
  this.paymenttrackingForm.disable();
  this.isVisible = false;
  this.isShown = false;
 }
 deleteSummary(){
 }

 onItemSubJobMastert(event){
this.paymentTrackingJobFieldValueMapping.push({
         "active": true,
          "jobFieldValue":event.itemValue,
          "payTrackJobMappId": 0
})
console.log(event);
 }


 onSelectJobFieldValue(jobMasterId){
   if(jobMasterId){
     this.paymentTrackingJobFieldMaster.push({
      "active": true,
      "jobField": this.jobField,
      "payTrackJobFieldMasterId": 0,
      "paymentTrackingJobFieldValueMapping":this.paymentTrackingJobFieldValueMapping
      

     })
  this.service.getJobMasterMapping().subscribe(res =>{
   // this.jobMasterMappingList = res.data.results;

   res.data.results.forEach(element => {
    this.jobMasterMappingList.push({
      label : element.masterCode,
     value : element.jobMasterMappingId
    });
  });

  })
   }
   console.log("jobMasterMappingList::::::",this.jobMasterMappingList)
 }

 onSelectBanksdetails(event: any, row: any){
   if(event.checked){

    this.bankData.push({
      'ifscCode':row.ifscCode,
      'bankName':row.bankName,
      'branchName':row.branchName,
      
     })
     console.log("Row Data is: "+ JSON.stringify(this.row))

   }
 }


 addTable() {
  const obj = {
    ifscCode: this.ifscCode,
    bankName: this.bankName,
    branchName: this.branchName,
    accountNumber: this.accountNumber,
    active: this.active,
  

  };


  this.row.push(obj);
 
}
deleteRows(x) {
  this.row.splice(x, 1);
  
}
addTableVoucher(){

  

   const obj ={

     payHead: this.paymenttrackingForm.controls['paymentTrackingAddPayVoucherMaster'].value,
    logicMethod: this.logicValue,
    formulaMasterId: this.formulaMasterId,
    active: true,
    paymentTrackingAddPayVoucherMasterid: 0
      };
   
  
  

   this.paymentTrackingAddPayVoucherMaster.push(obj)


  
 this.rowV.push({
   'Head': this.paymenttrackingForm.controls['paymentTrackingAddPayVoucherMaster'].value,
   'Logic' : this.logicValue,
   'FormulaValue': this.selectedFormulaname,
  'paymentTrackingAddPayVoucherMasterid' :0
 });
 
 this.paymenttrackingForm.controls['paymentTrackingAddPayVoucherMaster'].reset()
 this.paymenttrackingForm.controls['formulaMasterId'].reset()
 this.paymenttrackingForm.controls['logicMethod'].reset()


}
deleteRowsV(x) {
  this.rowV.splice(x, 1);
   
}

onSelectBankDetails(){
 
}

onSelectFormula(value){
  this.logicValue = value 

  if(value=='Formula'){
    this.service.getFormula().subscribe(res =>{
      this.formulaName = res.data.results;
      // this.paymenttrackingForm.controls['formulaName'].setValue(this.formulaName)
      // this.formulaMasterId= res.data.results[0].formulaId
    })
  }
}

onSelectFormulaName(value){
  this.formulaName.forEach(element => {
    if(element.formulaId == value){
      this.selectedFormulaname = element.formulaName
    }
  });
}

onRowSelect(event) {
  //this.messageService.add({severity: 'info', summary: 'Product Selected', detail: event.data.name});
}

reset(){
  this.paymenttrackingForm.enable();
  this.paymenttrackingForm.reset();

}
cancel(){
         this.paymenttrackingForm.enable();    
         this.reset();
         this.isShown = true;
         this.isVisible = false;
}

bankDetailsInfo(template: TemplateRef<any>,) {
  this.modalRef = this.modalService.show(
   template,
        Object.assign({}, { class: 'gray modal-lg' })
  );
}
}
