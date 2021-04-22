import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoanService } from '../loan.service';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from '../../uploadexcel/uploadexcelhome/excel.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import jspdf from 'jspdf';
import * as _html2canvas from "html2canvas";
const html2canvas: any = _html2canvas;


@Component({
  selector: 'app-add-new-loan',
  templateUrl: './add-new-loan.component.html',
  styleUrls: ['./add-new-loan.component.scss'],

})
export class AddNewLoanComponent implements OnInit {
  AddLoanForm:FormGroup;
  public modalRef: BsModalRef;
  loanData: any;
  editflag: boolean = false;
  isVisible:boolean=false;
  isShown: boolean= true;
  loanTypeData: any;
  isAssetValue:boolean=false;
  loanType: any;
  scheduleData: any;
  loanCode: any;
  noOfInstallment: any;
  installmentAmount: number = 0;
  loanCodeName: any;
  dataOfFootballers: any[];
  documentList: any=[];
  guarantorsList: any;
  getscheduleData: any;
  // minFractionDigits: number;
  public masterfilesArray: File[] = [];
  public urlArray: Array<any> = [];
  public urlIndex: number;
  public urlSafe: SafeResourceUrl;
  approvalData: any;
  carType:boolean=false;
  instituteType:boolean=false;
  EndDate: Date;
  guarantorDataForTable: any;
  empCode: any;
  fullName: string = '';
  excelData: any[];
  guarentedCount: any=[];
  empIndex: any;
  documentIndex: any;
  selectedDoc: any;

  @Input() public data: any;
  @Input() public applyLoanData: any;
  deviationAmount: any;
  deviationIntrest: any;
  deviationNoOfInstallment: any;
  calculatedDeviationAmt: number;
  allowedLoanAmount: number;
  devaiationData: any[] = [];
  deviationVal: number;

  isUploadDocument:boolean=true;
  calculatedDeviationInt: number;
  allowedRateInterest: number;
  calculatedDeviationIntallment: number;
  allowedInstallment: any;
  guarentor: any = [];
  deletedData: any;
  approvalDetailsData: any;


  constructor(public formBuilder : FormBuilder,
    private modalService: BsModalService, public loanservice:LoanService,public toster : ToastrService ,
    private datePipe: DatePipe,private excelservice: ExcelService, public sanitizer: DomSanitizer,) {
    this.AddLoanForm = this.formBuilder.group(
      {

        "createdBy":new FormControl('PaysquareDefault'),
        "createDateTime":new FormControl(null),
        "lastModifiedBy":new FormControl(null),
        "lastModifiedDateTime":new FormControl(null),
        "active":new FormControl(true),
        "employeeCode":new FormControl(''),
        "installmentAmount":new FormControl('',[Validators.pattern(/^[1-9]\d*$/)]),
        "loanType": new FormControl(null,[Validators.required]),
        "repaymentType":new FormControl(''),
        "underlineAssestValue":new FormControl(''),
        "carOrInstitutionType":new FormControl(''),
        "loanAmount":new FormControl('',[Validators.required,Validators.pattern(/^[1-9]\d*$/)]),
        "interestRate":new FormControl(''),
        "noOfInstallment":new FormControl(''),
        "endDate":new FormControl(''),
        "remark":new FormControl(''),
        "externalReferenceNumber":new FormControl(''),
        "guarantors": new FormControl([]),
        "deviations": new FormControl([]),
        "uploadDocuments": new FormControl([]),
        "approverDetails": new FormControl([]),
        // "reason":new FormControl('',[Validators.required]),

   })

   if (localStorage.getItem('loanApplyData') != null) {
    let loandata = JSON.parse(localStorage.getItem('loanApplyData'));
    this.loanType = loandata.loanType;
    this.loanAmount = loandata.loanAmount;
    this.flatIntrest = loandata.interestRate;
    this.noOfInstallment = loandata.noOfInstallment;
    this.installmentAmount = loandata.installmentAmount;
    this.AddLoanForm.controls['loanAmount'].setValue(parseInt(loandata.loanAmount));
    this.AddLoanForm.controls['loanType'].setValue(loandata.loanType);
    this.AddLoanForm.controls['installmentAmount'].setValue(this.installmentAmount);
    this.AddLoanForm.controls['noOfInstallment'].setValue(parseInt(this.noOfInstallment));
    this.AddLoanForm.controls['interestRate'].setValue(this.flatIntrest);
    this.loanservice.getAllLoanType().subscribe(res => {
      this.loanTypeData = res.data.results[0];
      this.loanTypeData.forEach(element => {
        if(element.loanCode == this.loanType){
    this.AddLoanForm.controls['repaymentType'].setValue(element.recoveryMethod);
          if(element.loanCode == 'Car Loan'){
            this.carType = true;
            this.instituteType = false;
            this.isAssetValue = true;
            this.AddLoanForm.controls['carOrInstitutionType'].setValue(element.carOrInstitutionType);
          }
          else
          if(element.loanCode == 'Education Loan'){
            this.instituteType = true;
            this.carType = false;
            this.isAssetValue = true;
          }else
          {
            this.isAssetValue = false;
            this.carType = false;
            this.instituteType = false;
          }
       this.documentList = element.document;
      this.documentList.forEach(element => {
        element.fileName = ''
      });
      this.guarentedCount = [];

      let length = element.noOfGuarantor;
      for (let i = 0; i < length; i++) {
        this.guarentedCount.push({
          'empCode': '',
          'fullName': ''
        })
      }
        }
      })
    })
    let currentdate = new Date();
    var lastDay = new Date(currentdate.getFullYear(), currentdate.getMonth() + 1, 0);
    this.EndDate = new Date(lastDay.setMonth(lastDay.getMonth() + parseInt(this.noOfInstallment) - 1));
    this.AddLoanForm.controls['endDate'].setValue(this.datePipe.transform(this.EndDate, "dd-MMM-yyyy"))
    localStorage.removeItem('loanApplyData')

  }
  }

  ngOnInit(): void {
    this.getAllData();
    this.getAllLoanType();
    // this.getApproverDetails();
  }
  get f(){
    return this.AddLoanForm.controls;
  }
  addloanFormSubmit()
  {
    // this.AddLoanForm.controls['carOrInstitutionType'].setValue("First Hand");
    let enddate =  this.AddLoanForm.controls['endDate'].value
    this.AddLoanForm.controls['endDate'].setValue(this.datePipe.transform(enddate , 'yyyy-MM-dd'))
    this.AddLoanForm.controls['underlineAssestValue'].setValue(parseInt(this.AddLoanForm.controls['underlineAssestValue'].value));
    this.AddLoanForm.controls['loanAmount'].setValue(parseInt(this.AddLoanForm.controls['loanAmount'].value));
    this.AddLoanForm.controls['externalReferenceNumber'].setValue(parseInt(this.AddLoanForm.controls['externalReferenceNumber'].value));
    this.AddLoanForm.controls['employeeCode'].setValue(this.empCode);
    // let approverDetails =
    // [{

    //   "approverLevel": "first",
    //   "approverCode": "approve001",
    //   "approverName": "approver1",
    //   "actionDate": null,
    //   "action": "done",
    //   "remark": "approved",
    //   "status": "approved",
    //   "createdBy": 'ajay',
    //   "createDateTime": null,
    //   "lastModifiedBy": null,
    //   "lastModifiedDateTime": null,
    //   "active": true
    // }]
    // this.AddLoanForm.controls['approverDetails'].setValue(approverDetails);

    let deviation = [{
    "active": true,
    "createDateTime": null,
    "createdBy": "ajay",
    "deviationType": null,
    "deviationValue": 10000,
    "lastModifiedBy": null,
    "lastModifiedDateTime": null,
    "reason": null,
    "userLimit": 200000
   }]
   this.AddLoanForm.controls['deviations'].setValue(deviation);
    console.log(JSON.stringify(this.AddLoanForm.value))
    this.loanservice.addLoan(this.AddLoanForm.value).subscribe(res =>
      {
        this.approvalData = res.data.results.approverDetails;
        console.log("approverDetails*****************",this.approvalData);
        this.toster.success("",'Loan Added Successfully');
        this.getAllData();
        this.reset();
      })

      this.AddLoanForm.value.reset();

    if (this.AddLoanForm.invalid) {
      return;
    }
  }

  // updateLoan()
  // {
  //   this.loanservice.updateLoan(this.AddLoanForm.value).subscribe(res =>
  //     {
  //       this.toster.success("",'Loan Updated Successfully');
  //       this.getAllData();

  //     })
  // }
  // editQuery(loan)
  // {
  //   this.editflag = true;
  //   this.AddLoanForm.enable();
  //   this.AddLoanForm.patchValue(loan);
  //   this.isVisible =true;
  //   this.isShown = false;
  // }
  // viewQuery(loan)
  // {
  //   this.editflag = false;
  //  this.AddLoanForm.patchValue(loan);
  //  this.AddLoanForm.disable();
  // }
  reset(){
    this.AddLoanForm.enable();
    this.AddLoanForm.reset();
    this.AddLoanForm.controls['repaymentType'].disable();
    this.AddLoanForm.controls['endDate'].disable();
    // this.AddLoanForm.controls['interestRate'].disable();
    // this.AddLoanForm.controls['noOfInstallment'].disable();
    // this.AddLoanForm.controls['installmentAmount'].disable();
  }
cancel()
{
  this.reset();
}

schedule(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(
    template,
    Object.assign({}, { class: 'gray modal-lg' })

  );
this.allScheduleData();

}
getAllData()
{
this.loanservice.getAll().subscribe(res =>
  {
    this.loanData = res.data.results;
  })
}
getAllLoanType()
{
  this.loanservice.getAllLoanType().subscribe(res => {
    this.loanTypeData = res.data.results[0];

  })
}

loanAmount:number = 0;
flatIntrest:number;
tempLoanMasterScheduleId:number;
allScheduleData()
{

  let rateOfInt = this.AddLoanForm.controls['interestRate'].value;
  let noofinsll = this.AddLoanForm.controls['noOfInstallment'].value;
  let intallamt = this.AddLoanForm.controls['installmentAmount'].value;

  let data =
  {

    "flatIntrest": this.flatIntrest,
    "loanAmount": this.loanAmount,
    "loanCode":this.loanCodeName,
    "rateOfIntrest":rateOfInt ,
   "noOfInstallment": noofinsll,
   "installmentAmount": intallamt
  }

  this.tempLoanMasterScheduleId = null;
  this.loanservice.allScheduleData(data).subscribe(res =>
    {
      this.scheduleData = res.data.results[0];
      this.tempLoanMasterScheduleId = res.data.results[0].tempLoanMasterScheduleId;
      // if(this.tempLoanMasterScheduleId != null){
        this.getallScheduleData();
      // }
    })

}
getallScheduleData()
{

  this.loanservice.getallScheduleData(this.tempLoanMasterScheduleId).subscribe(res =>
    {
      this.getscheduleData = res.data.results[0];
    })
}
getGuarantorData() {
  this.loanservice.getGuarantorData(this.empCode).subscribe(res => {
    this.guarantorDataForTable = res.data.results[0];

    this.fullName = this.guarantorDataForTable.fullName;

    this.guarentedCount.splice(this.empIndex, 1, {
      'empCode': this.empCode,
      'fullName': this.guarantorDataForTable.fullName,
    })

  })

  let guarantorData = {
    "employeeCode" : this.empCode,
    "employeeFullName": this.fullName,
    "createdBy": 'Ajay',
    "createDateTime": null,
    "lastModifiedBy": null,
    "lastModifiedDateTime": null,
    "active": true
  }
  this.guarentor.push(guarantorData);

  this.AddLoanForm.controls['guarantors'].setValue(this.guarentor);

  console.log(this.AddLoanForm.controls['guarantors'].value);

}

getEmpcode(value,index)
{
this.empCode = value;
this.empIndex = index;

this.getGuarantorData();
}

assetValueShowHide($event)
{
  this.AddLoanForm.controls['installmentAmount'].reset()
  this.AddLoanForm.controls['loanAmount'].reset()


this.loanType = $event;
this.loanTypeData.forEach(element => {
  if(element.loanCode == this.loanType){
    // this.AddLoanForm.controls['underlineAssestValue'].setValue(element.underliningAsset);
    // this.AddLoanForm.controls['loanType'].setValue(element.loanCode);
    this.AddLoanForm.controls['interestRate'].setValue(element.intRate);
    this.AddLoanForm.controls['repaymentType'].setValue(element.recoveryMethod);
    this.AddLoanForm.controls['noOfInstallment'].setValue(parseInt( element.recoveryNoOfInstallments));
    this.noOfInstallment = element.recoveryNoOfInstallments;
    this.flatIntrest = element.intRate;
    this.deviationAmount = element.deviationAmount;
    this.deviationIntrest = element.deviationIntrest;
    this.deviationNoOfInstallment = element.deviationNoOfInstallment;
    this.documentList = element.document;
    this.documentList.forEach(element => {
      element.fileName = ''
    });
    this.guarentedCount = [];

    let length = element.noOfGuarantor;
    for (let i = 0; i < length; i++) {
      this.guarentedCount.push({
        'empCode': '',
        'fullName': ''
      })
    }

    this.EndDate = null;
    let currentdate = new Date();
    var lastDay = new Date(currentdate.getFullYear(), currentdate.getMonth() + 1, 0);
    this.EndDate = new Date(lastDay.setMonth(lastDay.getMonth() + parseInt(this.noOfInstallment)-1));
    this.AddLoanForm.controls['endDate'].setValue(this.datePipe.transform(this.EndDate, "dd-MMM-yyyy"))
    console.log("**********",element);
  }
});
this.loanTypeData.forEach(element => {
  if(element.loanCode == this.loanType){
    // this.AddLoanForm.controls['carOrInstitutionType'].setValidators([Validators.required]);
    // this.AddLoanForm.controls['underlineAssestValue'].setValidators([Validators.required]);
    this.loanCodeName = element.loanCode;

  if(element.loanCode == 'Car Loan'){
    this.carType = true;
    this.instituteType = false;
    this.isAssetValue = true;
    this.AddLoanForm.controls['carOrInstitutionType'].setValue(element.carOrInstitutionType);
  }
  else{
  if(element.loanCode == 'Education Loan'){
    this.instituteType = true;
    this.carType = false;
    this.isAssetValue = true;

  }else
  {
    this.isAssetValue = false;
    this.carType = false;
    this.instituteType = false;
  }
  }
}
});

}
// ................................calculate installment amount................................................................
calculateInstallmentAmount(value) {
  this.EndDate = null;

  this.calculatedDeviationAmt = 500000 * parseInt(this.deviationAmount) / 100
  this.allowedLoanAmount = 500000 + this.calculatedDeviationAmt

  // this.calculatedDeviationInt = 12 * parseInt(this.deviationIntrest) / 100
  // this.allowedRateInterest = 12 + this.calculatedDeviationAmt


  if (parseInt(value) <= this.allowedLoanAmount) {
    this.loanAmount = value;
    this.installmentAmount = this.loanAmount / this.noOfInstallment ;
    this.installmentAmount = Math.round(this.installmentAmount);
    this.AddLoanForm.controls['installmentAmount'].setValue(this.installmentAmount);

    let currentdate = new Date();
    var lastDay = new Date(currentdate.getFullYear(), currentdate.getMonth() + 1, 0);
    this.EndDate = new Date(lastDay.setMonth(lastDay.getMonth() + parseInt(this.noOfInstallment) - 1));
    this.AddLoanForm.controls['endDate'].setValue(this.datePipe.transform(this.EndDate, "dd-MMM-yyyy"))


    if (parseInt(value) > 500000) {
      this.deviationVal = parseInt(value) - 500000

      // this.devaiationData = [];
      this.devaiationData.push({
        "deviationType": 'LoanAmount',
        "userLimit": 500000,
        "deviationValue": parseInt(value),
        "reason": null,
        "createdBy": 'ajay',
        "createDateTime": null,
        "lastModifiedBy": null,
        "lastModifiedDateTime": null,
        "active": true
      })

      this.AddLoanForm.controls['deviations'].setValue(this.devaiationData);
    } else {
      // this.devaiationData = []
      // this.AddLoanForm.controls['deviations'].setValue(this.devaiationData);

      this.devaiationData.forEach((ele,index) =>{
        if(ele.deviationType == 'LoanAmount'){
           let ind = index;
           this.devaiationData.splice(ind,1)
        }
      })
      this.AddLoanForm.controls['deviations'].setValue(this.devaiationData);
    }


  } else {
    this.toster.success("Please Enter Eligible"+ ' ' + this.allowedLoanAmount + " amount")
    this.devaiationData.forEach((ele,index) =>{
      if(ele.deviationType == 'LoanAmount'){
         let ind = index;
         this.devaiationData.splice(ind,1)
      }
    })
    this.AddLoanForm.controls['deviations'].setValue(this.devaiationData);

    this.loanAmount = 500000;
    this.installmentAmount = this.loanAmount / this.noOfInstallment;
    this.installmentAmount = Math.round(this.installmentAmount);
    this.AddLoanForm.controls['installmentAmount'].setValue(this.installmentAmount);

    let currentdate = new Date();
    var lastDay = new Date(currentdate.getFullYear(), currentdate.getMonth() + 1, 0);
    this.EndDate = new Date(lastDay.setMonth(lastDay.getMonth() + parseInt(this.noOfInstallment) - 1));
    this.AddLoanForm.controls['endDate'].setValue(this.datePipe.transform(this.EndDate, "dd-MMM-yyyy"))
  }

}
// ................................calculate No Of installment amount................................................................

calculateNoOfInstallment(value) {
  this.EndDate = null;

  this.AddLoanForm.controls['noOfInstallment'].setValue(parseInt(value));

  this.calculatedDeviationIntallment = 48 * parseInt(this.deviationNoOfInstallment) / 100
  this.allowedInstallment = 48 + this.calculatedDeviationIntallment

  if (parseInt(value) <= this.allowedInstallment) {
    this.noOfInstallment = value;
    this.installmentAmount = this.loanAmount / this.noOfInstallment;
    this.installmentAmount = Math.round(this.installmentAmount);
    this.AddLoanForm.controls['installmentAmount'].setValue(this.installmentAmount);

    // ..........................end date calculation.........................................................................
    let currentdate = new Date();
    var lastDay = new Date(currentdate.getFullYear(), currentdate.getMonth() + 1, 0);
    this.EndDate = new Date(lastDay.setMonth(lastDay.getMonth() + parseInt(this.noOfInstallment) - 1));
    this.AddLoanForm.controls['endDate'].setValue(this.datePipe.transform(this.EndDate, "dd-MMM-yyyy"))

    if (parseInt(value) > 48) {

      this.devaiationData.push({
        "deviationType":'noOfInstallment',
        "userLimit": 48,
        "deviationValue": parseInt(value),
        "reason": null,
        "createdBy": 'ajay',
        "createDateTime": null,
        "lastModifiedBy": null,
        "lastModifiedDateTime": null,
        "active": true
      })

      this.AddLoanForm.controls['deviations'].setValue(this.devaiationData);
    } else {
      // this.devaiationData = []
      this.devaiationData.forEach((ele,index) =>{
        if(ele.deviationType == 'noOfInstallment'){
           let ind = index;
           this.devaiationData.splice(ind,1)
        }
      })
      this.AddLoanForm.controls['deviations'].setValue(this.devaiationData);
    }

  }
  else {
    this.toster.success("Please Enter Eligible " +' '+ this.allowedInstallment + " installment")
    this.noOfInstallment = 48;

    this.AddLoanForm.controls['noOfInstallment'].setValue(this.noOfInstallment);

    this.installmentAmount = this.loanAmount / this.noOfInstallment;
    this.installmentAmount = Math.round(this.installmentAmount);
    this.AddLoanForm.controls['installmentAmount'].setValue(this.installmentAmount);

    // ..........................end date calculation..............................................
    let currentdate = new Date();
    var lastDay = new Date(currentdate.getFullYear(), currentdate.getMonth() + 1, 0);
    this.EndDate = new Date(lastDay.setMonth(lastDay.getMonth() + parseInt(this.noOfInstallment) - 1));
    this.AddLoanForm.controls['endDate'].setValue(this.datePipe.transform(this.EndDate, "dd-MMM-yyyy"))

    this.devaiationData.forEach((ele,index) =>{
      if(ele.deviationType == 'noOfInstallment'){
         let ind = index;
         this.devaiationData.splice(ind,1)
      }
    })
    this.AddLoanForm.controls['deviations'].setValue(this.devaiationData);
  }
}

calculateInstallments(value) {
  this.EndDate = null;
  this.installmentAmount = value;
  this.noOfInstallment = this.loanAmount / this.installmentAmount;
  this.noOfInstallment = Math.round(this.noOfInstallment);
  // this.noOfInstallment = this.noOfInstallment + 1;
  this.AddLoanForm.controls['noOfInstallment'].setValue(this.noOfInstallment);

  // ..........................end date calculation..............................................
  let currentdate = new Date();
  var lastDay = new Date(currentdate.getFullYear(), currentdate.getMonth() + 1, 0);
  this.EndDate = new Date(lastDay.setMonth(lastDay.getMonth() + parseInt(this.noOfInstallment) - 1));
  this.AddLoanForm.controls['endDate'].setValue(this.datePipe.transform(this.EndDate, "dd-MMM-yyyy"))


}
// ................................calculaterate of interest amount................................................................

calculateRateOfInterest(value){

  this.AddLoanForm.controls['interestRate'].setValue(parseInt(value));

  this.calculatedDeviationInt = 12 * parseInt(this.deviationIntrest) / 100
  this.allowedRateInterest = 12 + this.calculatedDeviationInt

  if (parseInt(value) <= this.allowedRateInterest) {

    if (parseInt(value) > 12) {

      this.devaiationData.push({
        "deviationType": 'interestRate',
        "userLimit": 12,
        "deviationValue": parseInt(value),
        "reason": null,
        "createdBy": 'ajay',
        "createDateTime": null,
        "lastModifiedBy": null,
        "lastModifiedDateTime": null,
        "active": true
      })

      this.AddLoanForm.controls['deviations'].setValue(this.devaiationData);
    } else {

      this.devaiationData.forEach((ele,index) =>{
        if(ele.deviationType == 'interestRate'){
           let ind = index;
           this.devaiationData.splice(ind,1)
        }
      })
      this.AddLoanForm.controls['deviations'].setValue(this.devaiationData);
    }

  }
  else {
    this.toster.success("Please Enter Eligible" + ' '  + this.allowedRateInterest + " interest rate")

    this.devaiationData.forEach((ele,index) =>{
      if(ele.deviationType == 'interestRate'){
         let ind = index;
         this.devaiationData.splice(ind,1)
      }
    })
    this.AddLoanForm.controls['deviations'].setValue(this.devaiationData);
  }
}

// ....................................excel and pdf code...................................................
exportAsXLSX():void {
  this.excelData = [];
  this.excelData = this.getscheduleData
  this.excelservice.exportAsExcelFile(this.excelData, 'Schedule');
}

download(){
  // console.log('hi');
  let data = document.getElementById('contentToConvert');  // Id of the table
  html2canvas(data).then(canvas => {
  // Few necessary setting options
  const imgWidth = 208;
  const pageHeight = 295;
  const imgHeight = canvas.height * imgWidth / canvas.width;
  const heightLeft = imgHeight;

  const contentDataURL = canvas.toDataURL('image/png')
  const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
  const position = 0;
  pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
  pdf.save('Schedule.pdf'); // Generated PDF
});
}
// ........................upload Document..............................................................

public UploadModalDocument(template1: TemplateRef<any>, index, document) {
  this.documentIndex = index;
  this.selectedDoc = document
  this.modalRef = this.modalService.show(
    template1,
    Object.assign({}, { class: 'gray modal-md' })

  );
}
onMasterUpload(event: { target: { files: string | any[] } }) {
  if (event.target.files.length > 0) {
    for (const file of event.target.files) {
      this.masterfilesArray.push(file);
    }
  }

  this.documentList.splice(this.documentIndex,1 ,{
    'active': this.selectedDoc.active,
    'createdBy': null,
    'documentName': "wedding card",
    'documentRemark': "wedding card",
    'loanMasterDocumentId': 1,
    'fileName': this.masterfilesArray[this.documentIndex].name
  })
}

public removeSelectedLicMasterDocument(index: number) {
  this.masterfilesArray.splice(index, 1);
}
public docViewer(template1: TemplateRef<any>, index: any) {
  console.log('---in doc viewer--');
  this.urlIndex = index;

  console.log('urlArray::', this.urlArray);
  this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
    this.urlArray[this.urlIndex].blobURI
  );
  console.log('urlSafe::', this.urlSafe);
  this.modalRef = this.modalService.show(
    template1,
    Object.assign({}, { class: 'gray modal-xl' })
  );
}

deleteLoanScheduleByID()
{
  this.loanservice.deleteLoanScheduleByID(this.tempLoanMasterScheduleId).subscribe(res =>
    {
      this.toster.success("Schedule Data Deleted Successfully");
    })
}
public getApproverDetails()
{
  this.loanservice.getApproverDetails().subscribe(res =>
    {
      this.approvalDetailsData = res.data.results[0];
    })
}
}
