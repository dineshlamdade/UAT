import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoanService } from '../loan.service';
import { ExcelService } from '../../uploadexcel/uploadexcelhome/excel.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import jspdf from 'jspdf';
import * as _html2canvas from "html2canvas";
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { AlertServiceService } from '../../../core/services/alert-service.service';
const html2canvas: any = _html2canvas;


@Component({
  selector: 'app-add-new-loan',
  templateUrl: './add-new-loan.component.html',
  styleUrls: ['./add-new-loan.component.scss'],

})
export class AddNewLoanComponent implements OnInit {
  AddLoanForm: FormGroup;
  public modalRef: BsModalRef;
  loanData: any;
  editflag: boolean = false;
  isShown: boolean = true;
  loanTypeData: any;
  isAssetValue: boolean = false;
  loanType: any;
  scheduleData: any;
  loanCode: any;
  noOfInstallment: any;
  installmentAmount: any = 0;
  loanCodeName: any;
  dataOfFootballers: any[];
  documentList: any = [];
  guarantorsList: any;
  getscheduleData: any;
  // minFractionDigits: number;
  public masterfilesArray: File[] = [];
  public urlArray: Array<any> = [];
  public urlIndex: number;
  public urlSafe: SafeResourceUrl;
  approvalData: any;
  carType: boolean = false;
  instituteType: boolean = false;
  EndDate: Date;
  guarantorDataForTable: any;
  empCode: any;
  fullName: string = '';
  excelData: any[];
  guarentedCount: any = [];
  empIndex: any;
  documentIndex: any;
  selectedDoc: any;
  multiplEmpFlag: boolean = false;
  @Input() public data: any;
  @Input() public applyLoanData: any;

  deviationAmount: any;
  deviationIntrest: any;
  deviationNoOfInstallment: any;
  calculatedDeviationAmt: number;
  allowedLoanAmount: number;
  devaiationData: any[] = [];
  deviationVal: number;

  isUploadDocument: boolean = true;
  calculatedDeviationInt: number;
  allowedRateInterest: number;
  calculatedDeviationIntallment: number;
  allowedInstallment: any;
  guarentor: any = [];
  deletedData: any;
  approvalDetailsData: any;
  recoveryAllMethod: any;
  flatIntrestVisible: boolean = false;
  guarantorName: any = [];
  updatedData: any;
  editLoanData: any;
  isVisible: boolean = true;
  isVisiblee: boolean = false;
  isVisibleee: boolean = false;
  viewFlag: boolean = false;
  viewAppNo: boolean = false;
  applicationNo: any;
  applicationDate: any;
  postApproverDetailsData: any;
  userData: any;
  employeeMasterId: any;
  approvalWorkFlowIdd: any;
  loanApprEditFlag: boolean;
  loanApprNormalFlag: boolean = true;
  inputRemarkFlag: boolean = false;
  inputnormalFlag: boolean = true;
  loanApprEditTimeBtns: boolean = false;
  loanAppBtns: boolean = true;
  loanTypevisible: boolean = true;
  editTimeLoanType: boolean = false;
  selectedLoanDataForApproval: any = [];
  loanApplicationId: any;
  approverEmpCode: any;
  sequence: any;
  approverName: any;
  perticularEmpDetails: any;
  selectedLoanForApprovalFlag: boolean = false;
  index: number = 0;
  selectedEmployee: any;
  loanList: any[];
  approvalRemark: any = '';
  approvalEmpMasterId: any;
  employeeMasterIdbyDefault: any;
  loanApplyData: any;
  loanAmount: number;
  flatIntrest: number;
  tempLoanMasterScheduleId: number;
  SDMLoanData: any;
  allowUnderlineAsset: number = 1;
  documentPassword:any;
  remarkList:any;
  listDoc: File[] = [];
  documentArray: any = [];
  rowIndexData: any;
  docName: any;
  documentDetailRequestDTOList: any = [];
  loanMasterId: any;
  maxLoanAmount: any;
  workflowMasterHeadId: any;

  constructor(public formBuilder: FormBuilder,
    private router: Router,
    private modalService: BsModalService, public loanservice: LoanService,
    private datePipe: DatePipe, private excelservice: ExcelService, public sanitizer: DomSanitizer,
    private authService: AuthService, private alertService: AlertServiceService,) {

      this.userData = this.authService.getprivileges()
      this.employeeMasterIdbyDefault = this.userData.UserDetails.employeeMasterId;
      this.approvalEmpMasterId = this.userData.UserDetails.employeeMasterId;
  

    this.AddLoanForm = this.formBuilder.group(
      {
        "createdBy": new FormControl('PaysquareDefault'),
        "createDateTime": new FormControl(null),
        "lastModifiedBy": new FormControl(null),
        "lastModifiedDateTime": new FormControl(null),
        "active": new FormControl(true),
        "employeeMasterId": new FormControl(this.approvalEmpMasterId),
        "installmentAmount": new FormControl(''),
        "loanType": new FormControl(null, [Validators.required]),
        "repaymentType": new FormControl(''),
        "underlineAssestValue": new FormControl(null),
        "carOrInstitutionType": new FormControl(''),
        "loanAmount": new FormControl(0, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]),
        "interestRate": new FormControl(''),
        "noOfInstallment": new FormControl(''),
        "endDate": new FormControl(null),
        "remark": new FormControl(''),
        "externalReferenceNumber": new FormControl(''),
        "guarantors": new FormControl([]),
        "deviations": new FormControl([]),
        "documentDetailRequestDTOList": new FormControl([]),
        // "approverDetails": new FormControl([]),
        "loanApplicationId": new FormControl(''),
        "loanApplicationNumber": new FormControl(''),
        "loanMasterId": new FormControl(''),
        "payrollArea": new FormControl(''),
        "subject": new FormControl('')
      })

    this.getAllLoanType();

  
    if (localStorage.getItem('loanApplyData') != null) {
      let loandata = JSON.parse(localStorage.getItem('loanApplyData'));
      this.loanApplyData = loandata
      // this.loanType = loandata.loanType;

      if (localStorage.getItem('SDMLoanData') != null) {
        this.SDMLoanData = JSON.parse(localStorage.getItem('SDMLoanData'))
      } 
      this.loanAmount = parseInt(loandata.loanAmount);
      this.flatIntrest = parseInt(loandata.interestRate);
      this.noOfInstallment = parseInt(loandata.noOfInstallment);
      this.installmentAmount = parseInt(loandata.installmentAmount);

      this.AddLoanForm.controls['loanAmount'].setValue(parseInt(loandata.loanAmount));
      this.AddLoanForm.controls['noOfInstallment'].setValue(parseInt(this.noOfInstallment));
      this.AddLoanForm.controls['interestRate'].setValue(this.flatIntrest);

      this.installmentAmount = this.loanAmount / this.noOfInstallment;
      this.installmentAmount = this.installmentAmount.toString().match(/^-?\d+(?:\.\d{0,2})?/)
      this.installmentAmount = parseFloat(this.installmentAmount);
      this.AddLoanForm.controls['installmentAmount'].setValue(this.installmentAmount);


      let currentdate = new Date();
      var lastDay = new Date(currentdate.getFullYear(), currentdate.getMonth() + 1, 0);
      this.EndDate = new Date(lastDay.setMonth(lastDay.getMonth() + parseInt(this.noOfInstallment) - 1));
      this.EndDate = new Date(this.EndDate.getFullYear(), this.EndDate.getMonth() + 1, 0);
      this.AddLoanForm.controls['endDate'].setValue(this.datePipe.transform(this.EndDate, "dd-MMM-yyyy"));
      //localStorage.removeItem('loanApplyData')

    }

    if (localStorage.getItem('EditLoanData') != null) {
      this.editLoanData = JSON.parse(localStorage.getItem('EditLoanData'));
      this.AddLoanForm.patchValue(this.editLoanData);
      this.loanType = this.editLoanData.loanType;
      this.loanAmount = this.editLoanData.loanAmount;
      this.noOfInstallment = this.editLoanData.noOfInstallment;
      this.empCode = this.editLoanData.employeeCode;
      this.EndDate = this.editLoanData.EndDate;
      this.loanCodeName = this.loanType
      this.AddLoanForm.controls['loanType'].setValue(this.editLoanData.loanType);
      this.AddLoanForm.controls['endDate'].setValue(this.datePipe.transform(this.editLoanData.endDate, "dd-MMM-yyyy"));
      this.isVisible = false;
      this.isVisiblee = true;
      this.isVisibleee = true;
      this.viewFlag = false;
      this.viewAppNo = true;
    }
    if (localStorage.getItem('ViweLoanData') != null) {
      this.editLoanData = JSON.parse(localStorage.getItem('ViweLoanData'));
      this.AddLoanForm.patchValue(this.editLoanData);
      this.loanType = this.editLoanData.loanType;
      this.EndDate = this.editLoanData.EndDate;
      this.AddLoanForm.controls['loanType'].setValue(this.editLoanData.loanType);
      this.AddLoanForm.controls['endDate'].setValue(this.datePipe.transform(this.editLoanData.endDate, "dd-MMM-yyyy"));
      this.AddLoanForm.disable();
      this.isVisible = false;
      this.isVisiblee = true;
      this.isVisibleee = false;
      this.viewFlag = true;
      this.viewAppNo = true;
      // this.loanservice.getAllLoanType().subscribe(res => {
      //   this.loanTypeData = res.data.results[0];
      //   this.loanTypeData.forEach(element => {
      //     if (element.loanCode == this.loanType) {
      //       this.AddLoanForm.controls['repaymentType'].setValue(element.recoveryMethod);
      //       if (element.loanCode == 'Car Loan') {
      //         this.carType = true;
      //         this.instituteType = false;
      //         this.isAssetValue = true;
      //         // this.AddLoanForm.controls['carOrInstitutionType'].setValue(element.carOrInstitutionType);
      //         this.AddLoanForm.controls["underlineAssestValue"].setValidators([Validators.required])
      //         this.AddLoanForm.controls["carOrInstitutionType"].setValidators([Validators.required])
      //       }
      //       else
      //         if (element.loanCode == 'Education Loan') {
      //           this.instituteType = true;
      //           this.carType = false;
      //           this.isAssetValue = true;
      //           this.AddLoanForm.controls["underlineAssestValue"].setValidators([Validators.required])
      //           this.AddLoanForm.controls["carOrInstitutionType"].setValidators([Validators.required])
      //         } else {
      //           this.isAssetValue = false;
      //           this.carType = false;
      //           this.instituteType = false;
      //           this.AddLoanForm.controls["underlineAssestValue"].clearValidators()
      //           this.AddLoanForm.controls["carOrInstitutionType"].clearValidators()
      //           this.AddLoanForm.controls["underlineAssestValue"].setValue('')
      //           this.AddLoanForm.controls["carOrInstitutionType"].setValue('')
      //         }
      //       this.flatIntrest = element.intRate;
      //       this.deviationAmount = element.deviationAmount;
      //       this.deviationIntrest = element.deviationIntrest;
      //       this.deviationNoOfInstallment = element.deviationNoOfInstallment;
      //       this.documentList = element.document;
      //       this.documentList.forEach(element => {
      //         element.fileName = ''
      //       });
      //       this.guarentedCount = [];
      //       let length = element.noOfGuarantor;
      //       this.editLoanData.guarantors.forEach(ele => {
      //         this.guarentedCount.push({
      //           'empCode': ele.employeeCode,
      //           'fullName': ele.employeeFullName
      //         })
      //       });

      //       this.devaiationData = this.editLoanData.deviations;
      //       // this.devaiationData = this.editLoanData.deviationReason.disable();

      //     }
      //   })
      // })
    }

    if (localStorage.getItem('EditLoanApprovalData') != null) {
      this.editLoanData = JSON.parse(localStorage.getItem('EditLoanApprovalData'));
      this.AddLoanForm.patchValue(this.editLoanData);
      this.loanType = this.editLoanData.loanMaster.loanCode;
      this.AddLoanForm.controls['loanType'].setValue(this.editLoanData.loanMaster.loanCode);
      this.AddLoanForm.controls['repaymentType'].setValue(this.editLoanData.loanMaster.recoveryMethod)
      console.log("this.editLoanData.loanType", this.editLoanData.loanMaster.loanCode)
      this.AddLoanForm.disable();
      this.loanApprEditFlag = true;
      this.inputRemarkFlag = true;
      this.loanApprNormalFlag = false;
      this.inputnormalFlag = false;
      this.loanApprEditTimeBtns = true;
      this.loanAppBtns = false;
      this.loanTypevisible = true;
      this.editTimeLoanType = false;
    }
    if (localStorage.getItem('ViweLoanApprovalData') != null) {
      this.editLoanData = JSON.parse(localStorage.getItem('ViweLoanApprovalData'));
      this.AddLoanForm.patchValue(this.editLoanData);
      this.loanType = this.editLoanData.loanMaster.loanCode;
      this.AddLoanForm.controls['loanType'].setValue(this.editLoanData.loanMaster.loanCode);
      this.AddLoanForm.controls['repaymentType'].setValue(this.editLoanData.loanMaster.recoveryMethod)
      this.AddLoanForm.disable();
    }

    if (localStorage.getItem('selectedLoanForApproval') != null) {
      this.selectedLoanDataForApproval = JSON.parse(localStorage.getItem('selectedLoanForApproval'));
      this.AddLoanForm.patchValue(this.selectedLoanDataForApproval[0]);
      this.loanType = this.selectedLoanDataForApproval[0].loanMaster.loanCode;
      this.AddLoanForm.controls['loanType'].setValue(this.selectedLoanDataForApproval[0].loanMaster.loanCode);
      this.AddLoanForm.disable();
      this.loanApprEditFlag = true;
      this.inputRemarkFlag = true;
      this.loanApprNormalFlag = false;
      this.inputnormalFlag = false;
      this.loanApprEditTimeBtns = true;
      this.loanAppBtns = false;
      this.loanTypevisible = true;
      this.selectedLoanForApprovalFlag = true;
      this.editTimeLoanType = false;
      this.AddLoanForm.controls['repaymentType'].setValue(this.selectedLoanDataForApproval[0].loanMaster.recoveryMethod)
      this.loanApplicationId = this.selectedLoanDataForApproval[0].loanApplicationId;
      this.index = 0;
      this.selectedEmployee = this.selectedLoanDataForApproval[this.index]
      // console.log("this.selectedEmployee",this.selectedEmployee);
      this.approvalEmpMasterId = this.selectedLoanDataForApproval[this.index].employeeMaster.employeeMasterId;
      // this.getEmpMasterDetails(this.approvalEmpMasterId)
      // console.log("this.approvalEmpMasterIdinselection ",this.approvalEmpMasterId )
      if (this.selectedLoanDataForApproval.length > 1) {
        this.multiplEmpFlag = true;
      } else {
        this.multiplEmpFlag = false;
      }
    }
    //localStorage.clear();
  }

  nextRecord() {
    //  alert()
    this.index = this.index + 1;
    //  alert(this.index)
    this.selectedEmployee = this.selectedLoanDataForApproval[this.index];
    this.AddLoanForm.patchValue(this.selectedLoanDataForApproval[this.index]);
    this.loanType = this.selectedLoanDataForApproval[this.index].loanMaster.loanCode;
    this.AddLoanForm.controls['loanType'].setValue(this.selectedLoanDataForApproval[this.index].loanMaster.loanCode);
    this.AddLoanForm.controls['repaymentType'].setValue(this.selectedLoanDataForApproval[this.index].loanMaster.recoveryMethod)
    this.approvalEmpMasterId = this.selectedLoanDataForApproval[this.index].employeeMaster.employeeMasterId
    //  console.log("this.approvalEmpMasterId next",this.approvalEmpMasterId)
    this.getEmpMasterDetails(this.approvalEmpMasterId)

  }

  priviousRecord() {
    // alert()
    this.index = this.index - 1;
    this.selectedEmployee = this.selectedLoanDataForApproval[this.index];
    this.AddLoanForm.patchValue(this.selectedLoanDataForApproval[this.index]);
    this.AddLoanForm.controls['loanType'].setValue(this.selectedLoanDataForApproval[this.index].loanMaster.loanCode);
    this.AddLoanForm.controls['repaymentType'].setValue(this.selectedLoanDataForApproval[this.index].loanMaster.recoveryMethod)
    this.approvalEmpMasterId = this.selectedLoanDataForApproval[this.index].employeeMaster.employeeMasterId;
    // console.log("this.approvalEmpMasterId privious",this.approvalEmpMasterId)
    this.getEmpMasterDetails(this.approvalEmpMasterId)

  }

  ngOnInit(): void {
    this.getAllData();
   
    this.getEmpMasterDetails(this.employeeMasterIdbyDefault)
  }

  get f() {
    return this.AddLoanForm.controls;
  }

  onMasterUpload(
    event: { target: { files: string | any[] } },
    docType: string
  ) {
    //console.log('event::', event);
    //console.log('docType::', docType);
  
    if (event.target.files.length > 0) {
      for (const file of event.target.files) {
            const data = {
              name: file.name,
            };
  
            this.documentList[this.rowIndexData].fileName = file.name
            
            this.urlArray.push(data);
            this.listDoc.push(file);
            console.log(this.listDoc)
            this.documentArray[this.rowIndexData].listDoc.push(data)

          }

          console.log("this.documentArray: "+ JSON.stringify(this.documentArray))
  
    }

  }

  setDocumentValue(){
    this.documentDetailRequestDTOList.push(
      {
          "documentRemark": this.remarkList,
          "documentType": this.docName,
          "doucumentPassword": this.documentPassword
      }
    )
    this.AddLoanForm.controls['documentDetailRequestDTOList'].setValue(this.documentDetailRequestDTOList)
  }

  public UploadModal(template2: TemplateRef<any>,rowIndex,data) {
    this.docName = data.documentName;
    this.rowIndexData = rowIndex;
    this.modalRef = this.modalService.show(
      template2,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }
    
  addloanFormSubmit() {
    // this.AddLoanForm.controls['carOrInstitutionType'].setValue("First Hand");
    // let enddate = this.AddLoanForm.controls['endDate'].value
    // this.AddLoanForm.controls['loanType'].setValue('Test Loan');


    // this.AddLoanForm.controls['loanMasterId'].setValue(this.loanMasterId)
    this.AddLoanForm.controls['endDate'].setValue(this.datePipe.transform(null, 'yyyy-MM-dd'));
    this.AddLoanForm.controls['underlineAssestValue'].setValue(parseInt(this.AddLoanForm.controls['underlineAssestValue'].value));
    this.AddLoanForm.controls['loanAmount'].setValue(parseInt(this.AddLoanForm.controls['loanAmount'].value));
    this.AddLoanForm.controls['externalReferenceNumber'].setValue(parseInt(this.AddLoanForm.controls['externalReferenceNumber'].value));
    // this.AddLoanForm.controls['employeeCode'].setValue(this.empCode);
    
    // this.AddLoanForm.controls['deviations'].setValue(deviation);
    console.log(JSON.stringify(this.AddLoanForm.value));

    if (!this.isVisiblee) {
      this.AddLoanForm.removeControl('loanApplicationId');
      // this.AddLoanForm.removeControl('loanApplicationNumber');
      // this.AddLoanForm.removeControl('loanMasterId');

      const formData  = new FormData();
      formData.append('loanApplication', JSON.stringify(this.AddLoanForm.value));
  
      if(this.listDoc.length > 0){
        for (const loanDisbursementDocument of this.listDoc) {
          formData.append('loanApplicationDocument' , loanDisbursementDocument);
        } 
      }else{
        formData.append('loanApplicationDocument' , '');
      }

      // formData.forEach((value, key) => {
      //   console.log(key,' ', value);
      // });
   
      
      this.loanservice.addLoan(formData).subscribe(res => {
        this.approvalData = res.data.results.approverDetails;
        console.log("approverDetails*****************", this.approvalData);
        this.alertService.sweetalertMasterSuccess('Loan Added Successfully', "");
        this.reset();
        // this.toster.success("", 'You Dont have apply same Loan');
        this.router.navigate(['/loan/application']);
        this.getAllData();
      }, error => {
        if (error.status.code == '409') {
          this.alertService.sweetalertMasterSuccess('Provided  employeeeCode is Already Exist!', '');
        }
      });
    } else {
      this.updateLoan();
      // this.reset();
    }

    if (this.AddLoanForm.invalid) {
      return;
    }

  }

  reset() {
    this.AddLoanForm.enable();
    this.AddLoanForm.reset();
    this.AddLoanForm.controls['repaymentType'].disable();
    this.AddLoanForm.controls['endDate'].disable();
    this.guarentedCount = [];
    this.devaiationData = [];

  }

  cancel() {
    this.reset();

  }

  schedule(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })

    );
    this.allScheduleData();

  }

  getAllData() {
    this.loanservice.getAll().subscribe(res => {
      this.loanData = res.data.results;
      this.approvalWorkFlowIdd = this.loanData.approvalWorkFlowId;
    })
  }

  getAllLoanType() {
    this.loanservice.getAllLoanType().subscribe(res => {
      this.loanTypeData = res.data.results[0];
      if (localStorage.getItem('loanApplyData') != null) {
        this.loanTypeData.forEach(element => {
          if (element.loanMasterId == this.loanApplyData.loanType) {
            this.loanType = element.loanCode
            this.loanCodeName = this.loanType
            this.loanMasterId = element.loanMasterId
          }
        });
        this.AddLoanForm.controls['loanType'].setValue(this.loanType);
        this.assetValueShowHide(this.loanType)
      }

      if (localStorage.getItem('EditLoanData') != null) {
        this.loanTypeData.forEach(element => {
          if (element.loanCode == this.editLoanData.loanType) {
            this.loanType = element.loanCode
            this.loanCodeName = this.loanType
            this.loanMasterId = element.loanMasterId
          }
        });
        this.AddLoanForm.controls['loanType'].setValue(this.loanType);
        this.assetValueShowHide(this.loanType)
      }

      if (localStorage.getItem('ViweLoanData') != null) {
        this.loanTypeData.forEach(element => {
          if (element.loanCode == this.editLoanData.loanType) {
            this.loanType = element.loanCode
            this.loanCodeName = this.loanType
            this.loanMasterId = element.loanMasterId
          }
        });
        this.AddLoanForm.controls['loanType'].setValue(this.loanType);
        this.assetValueShowHide(this.loanType)
      }
    })
  }


  allScheduleData() {

    let rateOfInt = this.AddLoanForm.controls['interestRate'].value;
    let noofinsll = this.AddLoanForm.controls['noOfInstallment'].value;
    let intallamt = this.AddLoanForm.controls['installmentAmount'].value;
    let loanamt = this.AddLoanForm.controls['loanAmount'].value;
    let loancd = this.AddLoanForm.controls['loanType'].value;

    let data =
    {

      "flatIntrest": this.flatIntrest,
      "loanAmount": loanamt,
      "loanCode": loancd,
      "rateOfIntrest": rateOfInt,
      "noOfInstallment": noofinsll,
      "installmentAmount": intallamt
    }

    this.tempLoanMasterScheduleId = null;
    console.log("loanScheduleData", data)
    this.loanservice.allScheduleData(data).subscribe(res => {
      this.scheduleData = res.data.results[0];
      this.tempLoanMasterScheduleId = res.data.results[0].tempLoanMasterScheduleId;
      // if(this.tempLoanMasterScheduleId != null){
      this.getallScheduleData();
      // }
    })

  }


  getallScheduleData() {

    this.loanservice.getallScheduleData(this.tempLoanMasterScheduleId).subscribe(res => {
      this.getscheduleData = res.data.results[0];
    })
  }

  getGuarantorData() {
    //this.guarentor = []
    this.loanservice.getGuarantorData(this.empCode).subscribe(res => {
      this.guarantorDataForTable = res.data.results[0];
      this.fullName = this.guarantorDataForTable.fullName;
      this.guarentedCount.splice(this.empIndex, 1, {
        'empCode': this.empCode,
        'fullName': this.guarantorDataForTable.fullName,
      })


      if (this.fullName != null) {
        if (this.guarentor.length > 0) {
          // console.log("fname" + this.fullName)
          this.guarentor.forEach((element, index) => {
            if (parseInt(element.employeeCode) == parseInt(this.empCode)) {
              //  console.log("in if")
              let ind = index;
              this.guarentor.splice(ind, 1)
              this.guarantorName.splice(ind, 1)
              this.guarentor.splice(ind, 1, {
                "employeeCode": this.empCode,
                "employeeFullName": this.fullName,
                "createdBy": 'Ajay',
                "createDateTime": null,
                "lastModifiedBy": null,
                "lastModifiedDateTime": null,
                "active": true
              })
              this.guarantorName.splice(ind, 1, this.fullName)
              this.AddLoanForm.controls['guarantors'].setValue(this.guarentor);

            } else {
              if (parseInt(element.empCode) == parseInt(this.empCode)) {
                // console.log("in if1")
                let ind = index;
                this.guarentor.splice(ind, 1)
                this.guarantorName.splice(ind, 1)
              }
              //console.log("in else")
              let guarantorData = {
                "employeeCode": this.empCode,
                "employeeFullName": this.fullName,
                "createdBy": 'Ajay',
                "createDateTime": null,
                "lastModifiedBy": null,
                "lastModifiedDateTime": null,
                "active": true
              }
              this.guarentor.push(guarantorData);
              this.guarantorName.push(this.fullName)
              this.AddLoanForm.controls['guarantors'].setValue(this.guarentor);
            }
          });
        } else {
          // console.log("in else1")
          let guarantorData = {
            "employeeCode": this.empCode,
            "employeeFullName": this.fullName,
            "createdBy": 'Ajay',
            "createDateTime": null,
            "lastModifiedBy": null,
            "lastModifiedDateTime": null,
            "active": true
          }
          this.guarentor.push(guarantorData);
          this.guarantorName.push(this.fullName)
          this.AddLoanForm.controls['guarantors'].setValue(this.guarentor);
        }
        console.log(JSON.stringify(this.guarentor))
        console.log("this.guarantorName: " + this.guarantorName)
      }
    })
  }

  getEmpcode(value, index) {
    if (value != '' || value != undefined) {
      this.empCode = value;
      this.empIndex = index;

      this.getGuarantorData();
    }

  }

  assetValueShowHide($event) {
    this.loanType = ''
    // this.AddLoanForm.controls['installmentAmount'].reset()
    // this.AddLoanForm.controls['loanAmount'].reset()
    console.log(JSON.stringify(this.loanTypeData))
    this.loanType = $event;
    this.loanTypeData.forEach(element => {
      if (element.loanCode == this.loanType) {
        this.loanMasterId = element.loanMasterId
        this.AddLoanForm.controls['underlineAssestValue'].setValue('');
        this.AddLoanForm.controls['loanType'].setValue(element.loanCode);
        this.AddLoanForm.controls['loanMasterId'].setValue(element.loanMasterId)
        // this.AddLoanForm.controls['interestRate'].setValue(element.intRate);
        this.AddLoanForm.controls['repaymentType'].setValue(element.recoveryMethod);
        // this.AddLoanForm.controls['noOfInstallment'].setValue(parseInt(element.recoveryNoOfInstallments));
        // this.noOfInstallment = element.recoveryNoOfInstallments;
        // this.flatIntrest = element.intRate;
        this.deviationAmount = element.deviationAmount;
        this.deviationIntrest = element.deviationInterest;
        this.deviationNoOfInstallment = element.deviationNoOfInstallment;
        this.documentList = element.document;
        this.maxLoanAmount = this.SDMLoanData.maxAmountLoan
        this.workflowMasterHeadId = element.approvalWorkFlowId
        // this.maxLoanAmount = 300000
        this.documentList.forEach(element => {
          element.fileName = ''
        });

        this.recoveryAllMethod = element.recoveryMethod;

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
        this.EndDate = new Date(lastDay.setMonth(lastDay.getMonth() + parseInt(this.noOfInstallment) - 1));
        this.EndDate = new Date(this.EndDate.getFullYear(), this.EndDate.getMonth() + 1, 0);
        this.AddLoanForm.controls['endDate'].setValue(this.datePipe.transform(this.EndDate, "dd-MMM-yyyy"));
        //console.log("**********", element);
      }

      
    });
    this.postApproverDetails();
    this.loanTypeData.forEach(element => {
      if (element.loanCode == this.loanType) {
        // this.AddLoanForm.controls['carOrInstitutionType'].setValidators([Validators.required]);
        // this.AddLoanForm.controls['underlineAssestValue'].setValidators([Validators.required]);
        this.loanCodeName = element.loanCode;
        // debugger
        if (element.loanCode == 'Car Loan') {
          this.carType = true;
          this.instituteType = false;
          this.isAssetValue = true;
          this.AddLoanForm.controls['carOrInstitutionType'].setValue(element.carOrInstitutionType);
          this.AddLoanForm.controls["underlineAssestValue"].setValidators([Validators.required])
          this.AddLoanForm.controls["carOrInstitutionType"].setValidators([Validators.required])
        }
        else {
          if (element.loanCode == 'Education Loan') {
            this.instituteType = true;
            this.carType = false;
            this.isAssetValue = true;
            this.AddLoanForm.controls["underlineAssestValue"].setValidators([Validators.required])
            this.AddLoanForm.controls["carOrInstitutionType"].setValidators([Validators.required])

          } else {
            this.isAssetValue = false;
            this.carType = false;
            this.instituteType = false;

            this.AddLoanForm.controls["underlineAssestValue"].clearValidators()
            this.AddLoanForm.controls["carOrInstitutionType"].clearValidators()
            this.AddLoanForm.controls["underlineAssestValue"].setValue('')
            this.AddLoanForm.controls["carOrInstitutionType"].setValue('')
          }
        }
      }
    });

    if (this.recoveryAllMethod == "Flat Interest") {

      this.flatIntrestVisible = true;

    } else if (this.recoveryAllMethod == 'EMI') {
      this.flatIntrestVisible = false;
    }

    this.calculatedDeviationAmt = this.maxLoanAmount * parseInt(this.deviationAmount) / 100;
    this.allowedLoanAmount = this.maxLoanAmount + this.calculatedDeviationAmt;
    this.allowUnderlineAsset = this.allowedLoanAmount


  }

  getUnderlineAssets(value){
    let assestvalue;
    assestvalue = value * (parseInt(this.SDMLoanData.underliningAsset) / 100)
    //  this.allowUnderlineAsset = assestvalue + this.SDMLoanData.maxAmountLoan
     this.allowUnderlineAsset =Math.floor(assestvalue)
  //  console.log(assestvalue)

    //  if(parseInt(value) <= this.allowUnderlineAsset){
    //   this.AddLoanForm.controls['underlineAssestValue'].setValue(value)
    //  }else{
    //    this.alertService.sweetalertWarning("Please enter value less than "+ this.allowUnderlineAsset)
    //    this.AddLoanForm.controls['underlineAssestValue'].setValue("")
    //  }
  }

  // ................................calculate installment amount................................................................
  calculateInstallmentAmount(value) {
    this.EndDate = null;

    this.allowedLoanAmount = 0
    this.allowUnderlineAsset = 0

    this.calculatedDeviationAmt = this.maxLoanAmount * parseInt(this.deviationAmount) / 100;
    this.allowedLoanAmount = this.allowUnderlineAsset + this.calculatedDeviationAmt;

    // console.log(this.allowedLoanAmount)

    if(this.isAssetValue){
      this.allowUnderlineAsset = this.allowedLoanAmount - this.allowUnderlineAsset
    }else{
      this.allowUnderlineAsset = this.allowedLoanAmount
    }

    if (parseInt(value) <= this.allowedLoanAmount) {
      this.loanAmount = value;

      // EMI
      // Reducing Balance
      // Flat Interest
      // Perpetual
      // Principal First & then Interest

      let currentdate = new Date();
      var lastDay = new Date(currentdate.getFullYear(), currentdate.getMonth() + 1, 0);
      this.EndDate = new Date(lastDay.setMonth(lastDay.getMonth() + parseInt(this.noOfInstallment) - 1));
      this.EndDate = new Date(this.EndDate.getFullYear(), this.EndDate.getMonth() + 1, 0);
      this.AddLoanForm.controls['endDate'].setValue(this.datePipe.transform(this.EndDate, "dd-MMM-yyyy"))


      if (this.recoveryAllMethod == 'Reducing Balance' || this.recoveryAllMethod == 'Principal First & then Interest') {
        this.installmentAmount = this.loanAmount / this.noOfInstallment;
        // this.installmentAmount = Math.round(this.installmentAmount);

        this.installmentAmount = this.installmentAmount.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
      }
      if (this.recoveryAllMethod == 'EMI') {
        this.installmentAmount = this.loanAmount / this.noOfInstallment;
        this.installmentAmount = this.installmentAmount.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]


        //  let diff = currentdate.getTime() - lastDay.getTime()
        //  let NoOfday_startday = (diff / (1000 * 60 * 60 * 24));
        //  let intrestcharge = (6 / 31) * NoOfday_startday;

        // let emi = (this.loanAmount * this.flatIntrest * Math.pow(1 + this.flatIntrest, currentdate.getTime()))
        //            / (Math.pow(1 + this.flatIntrest, currentdate.getTime()) - 1);
        // let cal = emi - intrestcharge;

        //       alert(cal)

      }
      if (this.recoveryAllMethod == 'Flat Interest') {

      }

      if (this.recoveryAllMethod == 'Perpetual') {
        this.installmentAmount = this.loanAmount / this.noOfInstallment;
        this.installmentAmount = this.installmentAmount.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]

        //this.installmentAmount = this.flatIntrest / (12 * 100)
      }

      this.installmentAmount = parseFloat(this.installmentAmount)
      this.AddLoanForm.controls['installmentAmount'].setValue(this.installmentAmount);




      if (parseInt(value) > this.allowedLoanAmount) {
        this.deviationVal = parseInt(value) - this.allowedLoanAmount

        if (this.devaiationData.length > 0) {
          this.devaiationData.forEach((ele, index) => {
            if (ele.deviationType == 'LoanAmount') {
              let ind = index;
              this.devaiationData.splice(ind, 1, {
                "deviationType": 'LoanAmount',
                "userLimit": this.allowedLoanAmount,
                "deviationValue": parseInt(value),
                "reason": null,
                "createdBy": 'ajay',
                "createDateTime": null,
                "lastModifiedBy": null,
                "lastModifiedDateTime": null,
                "active": true
              })
            } else {
              this.devaiationData.push({
                "deviationType": 'LoanAmount',
                "userLimit": this.allowedLoanAmount,
                "deviationValue": parseInt(value),
                "reason": null,
                "createdBy": 'ajay',
                "createDateTime": null,
                "lastModifiedBy": null,
                "lastModifiedDateTime": null,
                "active": true
              })
            }
          })
        } else {
          this.devaiationData.push({
            "deviationType": 'LoanAmount',
            "userLimit": this.allowedLoanAmount,
            "deviationValue": parseInt(value),
            "reason": null,
            "createdBy": 'ajay',
            "createDateTime": null,
            "lastModifiedBy": null,
            "lastModifiedDateTime": null,
            "active": true
          })
        }


        // this.devaiationData = [];


        this.AddLoanForm.controls['deviations'].setValue(this.devaiationData);
      } else {
        // this.devaiationData = []
        // this.AddLoanForm.controls['deviations'].setValue(this.devaiationData);

        this.devaiationData.forEach((ele, index) => {
          if (ele.deviationType == 'LoanAmount') {
            let ind = index;
            this.devaiationData.splice(ind, 1)
          }
        })
        this.AddLoanForm.controls['deviations'].setValue(this.devaiationData);
      }


    } else {
      this.alertService.sweetalertMasterSuccess("", "Please Enter Eligible" + ' ' + this.allowedLoanAmount + " amount")
      this.devaiationData.forEach((ele, index) => {
        if (ele.deviationType == 'LoanAmount') {
          let ind = index;
          this.devaiationData.splice(ind, 1)
        }
      })
      this.AddLoanForm.controls['deviations'].setValue(this.devaiationData);

      this.loanAmount = this.allowedLoanAmount;

      this.devaiationData.push({
        "deviationType": 'LoanAmount',
        "userLimit": this.allowedLoanAmount,
        "deviationValue": this.loanAmount,
        "reason": null,
        "createdBy": 'ajay',
        "createDateTime": null,
        "lastModifiedBy": null,
        "lastModifiedDateTime": null,
        "active": true
      })

      if (this.recoveryAllMethod == 'Reducing Balance' || this.recoveryAllMethod == 'Principal First & then Interest') {
        this.installmentAmount = this.loanAmount / this.noOfInstallment;
        this.installmentAmount = this.installmentAmount.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
      }
      if (this.recoveryAllMethod == 'EMI') {
        this.installmentAmount = this.loanAmount / this.noOfInstallment;
        this.installmentAmount = this.installmentAmount.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]


        //  let diff = currentdate.getTime() - lastDay.getTime()
        //  let NoOfday_startday = (diff / (1000 * 60 * 60 * 24));
        //  let intrestcharge = (6 / 31) * NoOfday_startday;

        // let emi = (this.loanAmount * this.flatIntrest * Math.pow(1 + this.flatIntrest, currentdate.getTime()))
        //            / (Math.pow(1 + this.flatIntrest, currentdate.getTime()) - 1);
        // let cal = emi - intrestcharge;

        //       alert(cal)

      }
      if (this.recoveryAllMethod == 'Flat Interest') {

      }

      if (this.recoveryAllMethod == 'Perpetual') {
        this.installmentAmount = this.loanAmount / this.noOfInstallment;
        this.installmentAmount = this.installmentAmount.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]

        //this.installmentAmount = this.flatIntrest / (12 * 100)
      }

      this.installmentAmount = parseFloat(this.installmentAmount)

      this.AddLoanForm.controls['installmentAmount'].setValue(this.installmentAmount);

      let currentdate = new Date();
      var lastDay = new Date(currentdate.getFullYear(), currentdate.getMonth() + 1, 0);
      this.EndDate = new Date(lastDay.setMonth(lastDay.getMonth() + parseInt(this.noOfInstallment) - 1));
      this.EndDate = new Date(this.EndDate.getFullYear(), this.EndDate.getMonth() + 1, 0);
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

      if (this.recoveryAllMethod == 'Reducing Balance' || this.recoveryAllMethod == 'Principal First & then Interest') {
        this.installmentAmount = this.loanAmount / this.noOfInstallment;
        this.installmentAmount = this.installmentAmount.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
      }
      else if (this.recoveryAllMethod == 'EMI') {
        this.installmentAmount = this.loanAmount / this.noOfInstallment;
        this.installmentAmount = this.installmentAmount.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]


        //  let diff = currentdate.getTime() - lastDay.getTime()
        //  let NoOfday_startday = (diff / (1000 * 60 * 60 * 24));
        //  let intrestcharge = (6 / 31) * NoOfday_startday;

        // let emi = (this.loanAmount * this.flatIntrest * Math.pow(1 + this.flatIntrest, currentdate.getTime()))
        //            / (Math.pow(1 + this.flatIntrest, currentdate.getTime()) - 1);
        // let cal = emi - intrestcharge;

        //       alert(cal)

      }
      else if (this.recoveryAllMethod == 'Flat Interest') {

      }

      else if (this.recoveryAllMethod == 'Perpetual') {
        this.installmentAmount = this.loanAmount / this.noOfInstallment;
        this.installmentAmount = this.installmentAmount.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]

        //this.installmentAmount = this.flatIntrest / (12 * 100)
      }
      else {
        // alert(this.loanAmount)
        this.installmentAmount = this.loanAmount / this.noOfInstallment;
        this.installmentAmount = this.installmentAmount.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
      }

      this.installmentAmount = parseFloat(this.installmentAmount)

      this.AddLoanForm.controls['installmentAmount'].setValue(this.installmentAmount);

      // ..........................end date calculation.........................................................................
      let currentdate = new Date();
      var lastDay = new Date(currentdate.getFullYear(), currentdate.getMonth() + 1, 0);
      this.EndDate = new Date(lastDay.setMonth(lastDay.getMonth() + parseInt(this.noOfInstallment) - 1));
      this.EndDate = new Date(this.EndDate.getFullYear(), this.EndDate.getMonth() + 1, 0);
      this.AddLoanForm.controls['endDate'].setValue(this.datePipe.transform(this.EndDate, "dd-MMM-yyyy"))

      if (parseInt(value) > 48) {

        if (this.devaiationData.length > 0) {
          this.devaiationData.forEach((ele, index) => {
            if (ele.deviationType == 'noOfInstallment') {
              let ind = index;
              this.devaiationData.splice(ind, 1)

              this.devaiationData.splice(ind, 1, {
                "deviationType": 'noOfInstallment',
                "userLimit": 48,
                "deviationValue": parseInt(value),
                "reason": null,
                "createdBy": 'ajay',
                "createDateTime": null,
                "lastModifiedBy": null,
                "lastModifiedDateTime": null,
                "active": true
              })
            } else {

              if (ele.deviationType == 'noOfInstallment') {
                let ind = index;
                this.devaiationData.splice(ind, 1)
              }
              this.devaiationData.push({
                "deviationType": 'noOfInstallment',
                "userLimit": 48,
                "deviationValue": parseInt(value),
                "reason": null,
                "createdBy": 'ajay',
                "createDateTime": null,
                "lastModifiedBy": null,
                "lastModifiedDateTime": null,
                "active": true
              })
            }
          })
        } else {

          this.devaiationData.push({
            "deviationType": 'noOfInstallment',
            "userLimit": 48,
            "deviationValue": parseInt(value),
            "reason": null,
            "createdBy": 'ajay',
            "createDateTime": null,
            "lastModifiedBy": null,
            "lastModifiedDateTime": null,
            "active": true
          })
        }


        this.AddLoanForm.controls['deviations'].setValue(this.devaiationData);
      } else {
        // this.devaiationData = []
        this.devaiationData.forEach((ele, index) => {
          if (ele.deviationType == 'noOfInstallment') {
            let ind = index;
            this.devaiationData.splice(ind, 1)
          }
        })
        this.AddLoanForm.controls['deviations'].setValue(this.devaiationData);
      }

    }
    else {
      this.alertService.sweetalertMasterSuccess("", "Please Enter Eligible " + ' ' + this.allowedInstallment + " installment")
      this.noOfInstallment = this.allowedInstallment;

      this.AddLoanForm.controls['noOfInstallment'].setValue(this.noOfInstallment);

      if (this.recoveryAllMethod == 'Reducing Balance' || this.recoveryAllMethod == 'Principal First & then Interest') {
        this.installmentAmount = this.loanAmount / this.noOfInstallment;
        this.installmentAmount = this.installmentAmount.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
      }
      if (this.recoveryAllMethod == 'EMI') {
        this.installmentAmount = this.loanAmount / this.noOfInstallment;
        this.installmentAmount = this.installmentAmount.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]


        //  let diff = currentdate.getTime() - lastDay.getTime()
        //  let NoOfday_startday = (diff / (1000 * 60 * 60 * 24));
        //  let intrestcharge = (6 / 31) * NoOfday_startday;

        // let emi = (this.loanAmount * this.flatIntrest * Math.pow(1 + this.flatIntrest, currentdate.getTime()))
        //            / (Math.pow(1 + this.flatIntrest, currentdate.getTime()) - 1);
        // let cal = emi - intrestcharge;

        //       alert(cal)

      }
      if (this.recoveryAllMethod == 'Flat Interest') {

      }

      if (this.recoveryAllMethod == 'Perpetual') {
        this.installmentAmount = this.loanAmount / this.noOfInstallment;
        this.installmentAmount = this.installmentAmount.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]

        //this.installmentAmount = this.flatIntrest / (12 * 100)
      }

      this.installmentAmount = parseFloat(this.installmentAmount)

      this.AddLoanForm.controls['installmentAmount'].setValue(this.installmentAmount);

      // ..........................end date calculation..............................................
      let currentdate = new Date();
      var lastDay = new Date(currentdate.getFullYear(), currentdate.getMonth() + 1, 0);
      this.EndDate = new Date(lastDay.setMonth(lastDay.getMonth() + parseInt(this.noOfInstallment) - 1));
      this.EndDate = new Date(this.EndDate.getFullYear(), this.EndDate.getMonth() + 1, 0);
      // this.AddLoanForm.controls['endDate'].setValue(this.datePipe.transform(this.EndDate, "dd-MMM-yyyy"))

      this.devaiationData.forEach((ele, index) => {
        if (ele.deviationType == 'noOfInstallment') {
          let ind = index;
          this.devaiationData.splice(ind, 1)
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

    this.calculatedDeviationIntallment = 48 * parseInt(this.deviationNoOfInstallment) / 100
    this.allowedInstallment = 48 + this.calculatedDeviationIntallment

    // this.noOfInstallment = this.noOfInstallment + 1;
    this.AddLoanForm.controls['noOfInstallment'].setValue(this.noOfInstallment);


    if (parseInt(this.noOfInstallment) <= this.allowedInstallment) {
      if (this.devaiationData.length > 0) {
        this.devaiationData.forEach((ele, index) => {
          if (ele.deviationType == 'noOfInstallment') {
            let ind = index;
            this.devaiationData.splice(ind, 1, {
              "deviationType": 'noOfInstallment',
              "userLimit": 48,
              "deviationValue": parseInt(this.noOfInstallment),
              "reason": null,
              "createdBy": 'ajay',
              "createDateTime": null,
              "lastModifiedBy": null,
              "lastModifiedDateTime": null,
              "active": true
            })
          } else {
            if (ele.deviationType == 'noOfInstallment') {
              let ind = index;
              this.devaiationData.splice(ind, 1)
            }
            this.devaiationData.push({
              "deviationType": 'noOfInstallment',
              "userLimit": 48,
              "deviationValue": parseInt(this.noOfInstallment),
              "reason": null,
              "createdBy": 'ajay',
              "createDateTime": null,
              "lastModifiedBy": null,
              "lastModifiedDateTime": null,
              "active": true
            })
          }
        })
      } else {
        this.devaiationData.push({
          "deviationType": 'noOfInstallment',
          "userLimit": 48,
          "deviationValue": parseInt(this.noOfInstallment),
          "reason": null,
          "createdBy": 'ajay',
          "createDateTime": null,
          "lastModifiedBy": null,
          "lastModifiedDateTime": null,
          "active": true
        })
      }
    } else {
      this.alertService.sweetalertMasterSuccess("", "Please Enter Eligible " + ' ' + this.allowedInstallment + " installment")
      this.noOfInstallment = this.allowedInstallment;

      this.AddLoanForm.controls['noOfInstallment'].setValue(this.noOfInstallment);

      if (this.recoveryAllMethod == 'Reducing Balance' || this.recoveryAllMethod == 'Principal First & then Interest') {
        this.installmentAmount = this.loanAmount / this.noOfInstallment;
        this.installmentAmount = this.installmentAmount.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
      }
      if (this.recoveryAllMethod == 'EMI') {
        this.installmentAmount = this.loanAmount / this.noOfInstallment;
        this.installmentAmount = this.installmentAmount.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
      }
      if (this.recoveryAllMethod == 'Flat Interest') {

      }

      if (this.recoveryAllMethod == 'Perpetual') {
        this.installmentAmount = this.loanAmount / this.noOfInstallment;
        this.installmentAmount = this.installmentAmount.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]

        //this.installmentAmount = this.flatIntrest / (12 * 100)
      }

      this.installmentAmount = parseFloat(this.installmentAmount)

      this.AddLoanForm.controls['installmentAmount'].setValue(this.installmentAmount);

      // ..........................end date calculation..............................................
      let currentdate = new Date();
      var lastDay = new Date(currentdate.getFullYear(), currentdate.getMonth() + 1, 0);
      this.EndDate = new Date(lastDay.setMonth(lastDay.getMonth() + parseInt(this.noOfInstallment) - 1));
      this.EndDate = new Date(this.EndDate.getFullYear(), this.EndDate.getMonth() + 1, 0);
      // this.AddLoanForm.controls['endDate'].setValue(this.datePipe.transform(this.EndDate, "dd-MMM-yyyy"))

      this.devaiationData.forEach((ele, index) => {
        if (ele.deviationType == 'noOfInstallment') {
          let ind = index;
          this.devaiationData.splice(ind, 1)
        }
      })
      this.AddLoanForm.controls['deviations'].setValue(this.devaiationData);
    }




    // ..........................end date calculation..............................................
    let currentdate = new Date();
    var lastDay = new Date(currentdate.getFullYear(), currentdate.getMonth() + 1, 0);
    this.EndDate = new Date(lastDay.setMonth(lastDay.getMonth() + parseInt(this.noOfInstallment) - 1));
    this.EndDate = new Date(this.EndDate.getFullYear(), this.EndDate.getMonth() + 1, 0);
    // this.AddLoanForm.controls['endDate'].setValue(this.datePipe.transform(this.EndDate, "dd-MMM-yyyy"))

  }

  // ................................calculaterate of interest amount................................................................

  calculateRateOfInterest(value) {

    this.AddLoanForm.controls['interestRate'].setValue(parseInt(value));

    this.calculatedDeviationInt = parseInt(this.SDMLoanData.intRate) * parseInt(this.deviationIntrest) / 100
    this.allowedRateInterest = parseInt(this.SDMLoanData.intRate)  - this.calculatedDeviationInt

    //debugger
    if (parseInt(value) <= this.SDMLoanData.intRate && parseInt(value) >= this.allowedRateInterest) {

      if (parseInt(value) >= this.allowedRateInterest && parseInt(value) < 12) {

        if (this.devaiationData.length > 0) {
          this.devaiationData.forEach((ele, index) => {
            if (ele.deviationType == 'interestRate') {
              let ind = index;
              this.devaiationData.splice(ind, 1, {
                "deviationType": 'interestRate',
                "userLimit": this.SDMLoanData.intRate,
                "deviationValue": parseInt(value),
                "reason": null,
                "createdBy": 'ajay',
                "createDateTime": null,
                "lastModifiedBy": null,
                "lastModifiedDateTime": null,
                "active": true
              })
            } else {

            }
          })
        } else {
          this.devaiationData.push({
            "deviationType": 'interestRate',
            "userLimit": this.SDMLoanData.intRate,
            "deviationValue": parseInt(value),
            "reason": null,
            "createdBy": 'ajay',
            "createDateTime": null,
            "lastModifiedBy": null,
            "lastModifiedDateTime": null,
            "active": true
          })
        }
        this.AddLoanForm.controls['deviations'].setValue(this.devaiationData);
      } else {
        this.devaiationData.forEach((ele, index) => {
          if (ele.deviationType == 'interestRate') {
            let ind = index;
            this.devaiationData.splice(ind, 1)
          }
        })
        this.AddLoanForm.controls['deviations'].setValue(this.devaiationData);
      }

    }
    else {
      this.alertService.sweetalertMasterSuccess("", "Please Enter Eligible" + ' ' + this.allowedRateInterest + " interest rate")

      this.devaiationData.forEach((ele, index) => {
        if (ele.deviationType == 'interestRate') {
          let ind = index;
          this.devaiationData.splice(ind, 1)
        }
      })
      this.AddLoanForm.controls['interestRate'].setValue(this.allowedRateInterest);
      this.devaiationData.push({
        "deviationType": 'interestRate',
        "userLimit": this.SDMLoanData.intRate,
        "deviationValue": this.allowedRateInterest,
        "reason": null,
        "createdBy": 'ajay',
        "createDateTime": null,
        "lastModifiedBy": null,
        "lastModifiedDateTime": null,
        "active": true
      })
      this.AddLoanForm.controls['deviations'].setValue(this.devaiationData);
    }
  }

  // Get Employeee details

  getEmpMasterDetails(id) {
    // alert(this.employeeMasterIdbyDefault)
    this.loanservice.getEmpMasterDetails(this.approvalEmpMasterId).subscribe((res) => {
      this.perticularEmpDetails = res.data.results[0][0];
      // this.userName2 = this.perticularEmpDetails.fullName;
      // console.log(" this.userName2", this.userName2)
    });

  }

  // ....................................excel and pdf code...................................................
  exportAsXLSX(): void {
    this.excelData = [];
    this.excelData = this.getscheduleData
    this.excelservice.exportAsExcelFile(this.excelData, 'Schedule');
  }

  download() {
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

  // onMasterUpload(event: { target: { files: string | any[] } }) {
  //   if (event.target.files.length > 0) {
  //     for (const file of event.target.files) {
  //       this.masterfilesArray.push(file);
  //     }
  //   }

  //   this.documentList.splice(this.documentIndex, 1, {
  //     'active': this.selectedDoc.active,
  //     'createdBy': null,
  //     'documentName': "wedding card",
  //     'documentRemark': "wedding card",
  //     'loanMasterDocumentId': 1,
  //     'fileName': this.masterfilesArray[this.documentIndex].name
  //   })
  // }

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

  deleteLoanScheduleByID() {
    this.loanservice.deleteLoanScheduleByID(this.tempLoanMasterScheduleId).subscribe(res => {
      // this.toster.success("Schedule Data Deleted Successfully");
    })
  }

  // public getApproverDetails()
  // {
  //   this.loanservice.getApproverDetails().subscribe(res =>
  //     {
  //       this.approvalDetailsData = res.data.results[0];
  //     })
  // }

  deviationReason: any = [];

  reasons(value, index) {
    this.deviationReason.push(value);

    this.devaiationData.forEach((ele, index) => {
      this.devaiationData.splice(index, 1, {
        "deviationType": ele.deviationType,
        "userLimit": ele.userLimit,
        "deviationValue": ele.deviationValue,
        "reason": value,
        "createdBy": 'ajay',
        "createDateTime": null,
        "lastModifiedBy": null,
        "lastModifiedDateTime": null,
        "active": true
      })
    })

    this.AddLoanForm.controls['deviations'].setValue(this.devaiationData);
  }

  documentReason: any = [];

  getDocumentReason(value) {
    this.documentReason.push(value)
  }

  updateLoan() {
    let enddate = this.AddLoanForm.controls['endDate'].value
    this.AddLoanForm.controls['endDate'].setValue(this.datePipe.transform(enddate, 'yyyy-MM-dd'));
    this.AddLoanForm.controls['underlineAssestValue'].setValue(parseInt(this.AddLoanForm.controls['underlineAssestValue'].value));
    this.AddLoanForm.controls['loanAmount'].setValue(parseInt(this.AddLoanForm.controls['loanAmount'].value));
    this.AddLoanForm.controls['externalReferenceNumber'].setValue(parseInt(this.AddLoanForm.controls['externalReferenceNumber'].value));
    this.AddLoanForm.controls['employeeCode'].setValue(this.empCode);
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

    this.loanservice.updateLoan(this.AddLoanForm.value).subscribe(res => {
      this.updatedData = res.data.results;
      // console.log("&&&&&&&&&&&&", this.updatedData);
      this.alertService.sweetalertMasterSuccess("Updated loanApplication details Successfully.", "");
      this.router.navigate(['/loan/application']);

    })
  }

  postApproverDetails() //approval details api
  {
    let data =
    {
      // this.employeeMasterId -1
      // this.approvalWorkFlowIdd
      "employeeMasterId": this.approvalEmpMasterId,
      "flag": "AllApproversInfo",
      "workflowMasterHeaderId": this.workflowMasterHeadId
    }
    this.loanservice.postApproverDetails(data).subscribe(res => {
      this.postApproverDetailsData = res.data.results[0];
      // console.log(" this.postApproverDetailsData", this.postApproverDetailsData);
      // this.AddLoanForm.controls['approverDetails'].setValue(this.postApproverDetailsData);
      this.postApproverDetailsData.forEach(element => {
        this.approverEmpCode = element.approverEmpCode;
        this.sequence = element.sequence;
        this.approverName = element.approverName;
        // console.log(" this.approverEmpCode", this.approverEmpCode);

      });

    })
  }

  postLoanApproval(value) //approval btn api
  {
    let data = {
      "action": "Done",
      "actionDate": "2021-11-25T11:34:28.400Z", //current date
      "active": true,
      "approverCode": this.approverEmpCode,
      "approverLevel": 'this.sequence',
      "approverName": this.approverName,
      "createDateTime": "2021-11-25T11:34:28.400Z",
      "createdBy": "string",
      "lastModifiedBy": "string",
      "lastModifiedDateTime": "2021-11-25T11:34:28.400Z",
      "loanApproverDetailId": 0,
      "loanApplicationId": this.loanApplicationId,
      "loanRescheduleRequestDetailsId": 0,
      "approvalRemark": this.approvalRemark,
      "status": value

    }

    // this.postApproverDetailsData.forEach(element => {
    //   element.remark = value;
    // });
    console.log("this.postApproverDetailsData", JSON.stringify(data));

    this.loanservice.postLoanApproval(data).subscribe(res => {
      if (value == 'Approved') {
        this.alertService.sweetalertMasterSuccess('Loan Application Approved Successfully!!', '');
        // this.router.navigate(['/loan/loan-approval']);
        // console.log("this.postApproverDetailsData",JSON.stringify(this.postApproverDetailsData));
      } else {
        this.alertService.sweetalertMasterSuccess('Loan Application Send Back Successfully !!', '');
      }
    })
  }


  close() {
    this.router.navigate(['/loan/loan-approval']);

  }
}
