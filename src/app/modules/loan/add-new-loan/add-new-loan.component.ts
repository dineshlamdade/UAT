import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoanService } from '../loan.service';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from '../../uploadexcel/uploadexcelhome/excel.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import jspdf from 'jspdf';
import * as _html2canvas from "html2canvas";
import { id } from 'date-fns/locale';
const html2canvas: any = _html2canvas;

@Component({
  selector: 'app-add-new-loan',
  templateUrl: './add-new-loan.component.html',
  styleUrls: ['./add-new-loan.component.scss']
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
  documentList: any;
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

        "installmentAmount":new FormControl('',[Validators.pattern(/^([-+] ?)?[0-9]+(,[0-9]+)?/)]),

        "loanType": new FormControl(null,[Validators.required]),
        "repaymentType":new FormControl(''),
        "underlineAssestValue":new FormControl(null),
        "carOrInstitutionType":new FormControl(''),

        "loanAmount":new FormControl('',[Validators.required,Validators.pattern(/^([-+] ?)?[0-9]+(,[0-9]+)?/)]),
        "interestRate":new FormControl(''),

        "noOfInstallment":new FormControl(''),
        "endDate":new FormControl(''),
        "remark":new FormControl(''),
        "externalReferenceNumber":new FormControl(''),

        "guarantors" :new FormControl('') ,
        "deviations": new FormControl(''),
    "uploadDocuments": new FormControl([]),
    "approverDetails": new FormControl(''),


   })}

  ngOnInit(): void {
    this.getAllData();
    this.getAllLoanType();
  }
  get f(){
    return this.AddLoanForm.controls;
  }
  addloanFormSubmit()
  {
    this.AddLoanForm.controls['underlineAssestValue'].setValue(parseInt(this.AddLoanForm.controls['underlineAssestValue'].value));
    this.AddLoanForm.controls['loanAmount'].setValue(parseInt(this.AddLoanForm.controls['loanAmount'].value));
    this.AddLoanForm.controls['externalReferenceNumber'].setValue(parseInt(this.AddLoanForm.controls['externalReferenceNumber'].value));
    this.AddLoanForm.controls['employeeCode'].setValue(this.empCode);

    // console.log(JSON.stringify(this.AddLoanForm.value))
    if(!this.editflag){
    this.loanservice.addLoan(this.AddLoanForm.value).subscribe(res =>
      {
        this.approvalData = res.data.results.approverDetails;
        console.log("approverDetails*****************",this.approvalData);
        this.toster.success("",'Loan Added Successfully');
        this.getAllData();
        this.reset();
      })
    }else
    {
    }
    if (this.AddLoanForm.invalid) {
      return;
    }
    this.reset();
  }
  updateLoan()
  {
    this.loanservice.updateLoan(this.AddLoanForm.value).subscribe(res =>
      {
        this.toster.success("",'Loan Updated Successfully');
        this.getAllData();
      })
  }
  editQuery(loan)
  {
    this.editflag = true;
    this.AddLoanForm.enable();
    this.AddLoanForm.patchValue(loan);
    this.isVisible =true;
    this.isShown = false;
  }
  viewQuery(loan)
  {
    this.editflag = false;
   this.AddLoanForm.patchValue(loan);
   this.AddLoanForm.disable();
  }
  reset(){
    this.AddLoanForm.enable();
    this.AddLoanForm.reset();
    this.AddLoanForm.controls['repaymentType'].disable();
    // this.AddLoanForm.controls['endDate'].disable();
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
    Object.assign({}, { class: 'gray modal-xl' })
  );
this.allScheduleData();
// this.reset();

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
  let data =
  {
    "tempLoanMasterScheduleId":this.tempLoanMasterScheduleId,
    "flatIntrest": this.flatIntrest,
    "loanAmount": this.loanAmount,
    "loanCode":this.loanCodeName,
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

// this.getscheduleData = res.data.results[0];

  this.loanservice.getallScheduleData(this.tempLoanMasterScheduleId).subscribe(res =>
    {
      this.getscheduleData = res.data.results[0];
    })
}
getGuarantorData()
{
this.loanservice.getGuarantorData(this.empCode).subscribe(res =>
  {
    this.guarantorDataForTable = res.data.results;
    // console.log("@@@@@@",this.guarantorDataForTable);
    if(this.empCode == '1004'){
      this.fullName = 'Mayur Kardile'
     let data = [
      {
                  "employeeCode": this.empCode,
                  "employeeFullName":this.fullName,
                  "createdBy":null,
                  "createDateTime":null,
                  "lastModifiedBy":null,
                  "lastModifiedDateTime":null,
                  "active": true,
                }
              ]

      this.AddLoanForm.controls['guarantors'].setValue(data);
    }
    else if(this.empCode == '1002'){
      this.fullName = 'Pankaj Joshi'
      let data = [
        {
                    "employeeCode": this.empCode,
                    "employeeFullName":this.fullName,
                    "createdBy":'ajay',
                    "createDateTime":null,
                    "lastModifiedBy":null,
                    "lastModifiedDateTime":null,
                    "active": true,
                  }
                ]

        this.AddLoanForm.controls['guarantors'].setValue(data);


    }else{
      this.fullName = ''

      let data = [
        {
                    "employeeCode": this.empCode,
                    "employeeFullName":this.fullName,
                    "createdBy":null,
                    "createDateTime":null,
                    "lastModifiedBy":null,
                    "lastModifiedDateTime":null,
                    "active": true,
                  }
                ]

        this.AddLoanForm.controls['guarantors'].setValue(data);

    }
  })
  let deviation = [
    {

      "deviationType": null,
      "userLimit": 500000,
      "deviationValue": 100000,
      "reason": null,
      "createdBy": 'ajay',
      "createDateTime":null,
      "lastModifiedBy": null,
      "lastModifiedDateTime": null,
      "active": true
    }
]
this.AddLoanForm.controls['deviations'].setValue(deviation);

let approverDetails =
[{

  "approverLevel": "first",
  "approverCode": "approve001",
  "approverName": "approver1",
  "actionDate": null,
  "action": "done",
  "remark": "approved",
  "status": "approved",
  "createdBy": 'ajay',
  "createDateTime": null,
  "lastModifiedBy": null,
  "lastModifiedDateTime": null,
  "active": true
}]
this.AddLoanForm.controls['approverDetails'].setValue(approverDetails);

}

getEmpcode(value)
{
this.empCode = value;
this.getGuarantorData();
}

assetValueShowHide($event)
{
this.loanType = $event;
this.loanTypeData.forEach(element => {
  if(element.loanCode == this.loanType){
    // this.AddLoanForm.controls['underlineAssestValue'].setValue(element.underliningAsset);
    // this.AddLoanForm.controls['loanType'].setValue(element.loanCode);
    this.AddLoanForm.controls['interestRate'].setValue(element.intRate);
    this.AddLoanForm.controls['repaymentType'].setValue(element.recoveryMethod);
    this.AddLoanForm.controls['noOfInstallment'].setValue(element.recoveryNoOfInstallments);
    this.noOfInstallment = element.recoveryNoOfInstallments;
    this.flatIntrest = element.intRate;
    this.documentList = element.document;
  //  this.getGuarantorData();
    this.EndDate = null;
    let currentdate = new Date();
   this.EndDate =  new Date(currentdate.setMonth(currentdate.getMonth()+parseInt(this.noOfInstallment)));
   this.AddLoanForm.controls['endDate'].setValue(this.datePipe.transform(this.EndDate,'yyyy-MM-dd'))
    console.log("**********",element);
  }
});
// this.loanCode = $event;
this.loanTypeData.forEach(element => {
  if(element.loanCode == this.loanType){
    this.loanCodeName = element.loanCode;
  // if(element.loanCode == 'Car Loan' || element.loanCode =='Education Loan'){
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
// ................................calculate installment amount............................................
calculateInstallmentAmount(value)
{
  this.EndDate = null;
      this.loanAmount = value;
      this.installmentAmount = this.loanAmount / this.noOfInstallment;
      this.installmentAmount = Math.round(this.installmentAmount );
      this.AddLoanForm.controls['installmentAmount'].setValue(this.installmentAmount);

      let currentdate = new Date();
      this.EndDate =  new Date(currentdate.setMonth(currentdate.getMonth()+parseInt(this.noOfInstallment)));
      this.AddLoanForm.controls['endDate'].setValue(this.datePipe.transform(this.EndDate,'yyyy-MM-dd'))

}
calculateNoOfInstallment(value)
{
  this.EndDate = null;
  this.noOfInstallment = value;
  this.installmentAmount = this.loanAmount / this.noOfInstallment;
  this.installmentAmount = Math.round(this.installmentAmount );
  this.AddLoanForm.controls['installmentAmount'].setValue(this.installmentAmount);

// ..........................end date calculation..............................................
  let currentdate = new Date();
  this.EndDate =  new Date(currentdate.setMonth(currentdate.getMonth()+ parseInt(this.noOfInstallment)));
  this.AddLoanForm.controls['endDate'].setValue(this.datePipe.transform(this.EndDate,'yyyy-MM-dd'))
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
public UploadModalDocument(template1: TemplateRef<any>) {
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


}
