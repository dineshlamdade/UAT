import { Component, OnInit } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
import { ToastrService } from 'ngx-toastr';
import { LoanMasterService } from '../loan-master.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  generalLoanForm: FormGroup;
  Instances: any = [];
  loanValue: any;
  monthValue: any;
  minimumNetPayValueFlag: string = 'No';
  disbursementRequiredFlag:string = 'No';
  partDisbursementPermissibleFlag :string ='Yes';
  loandata: any = '';
  editloandata: any = '';
  tabIndex: number = 1;
  url: string;
  deviationAmount: string = '';
  deviationInterest: string = '';
  deviationNoOfInstallment: string = '';
  PricipalNode: any = '';
  TenureNode: any = '';
  InterestNode: any = '';
  intrestWithNodeFlag: string = '';
  noOfInstallWithNodeFlag: string = '';
  principalWithNodeFlag: string = '';
  loanType: any;
  public headTemplateList5 = [];
  public approvalWorkFlowSDMList = [];
  public approvalDerivedNameList = [];

  deductionHeadData: any;
  earningHeadData: any;
  documentName: any;
  docType: any = '';
  docMandatory: boolean=true;
  filesArray: any = [];
  documentRemark: any = '';
  public modalRef: BsModalRef;
  public urlArray: Array<any> = [];
  public urlIndex: number;
  public urlSafe: SafeResourceUrl;
  documentList: any = [];
  ListOfDocuments: any;
  listDoc: any = [];
  getAllApprovalSDMData :any=[];
  sdmValues: any;
  derivedObjectFieldName: any;
  getsalaryDefinationData: any;
  getAllPerquisiteData: any;
  loanMasterDocumentId: any =0;
  approvalWorkFlowSDM: any;
  allJobsList: Array<any> = [];


  constructor(public formBuilder: FormBuilder, public loanMasterService: LoanMasterService, public toster: ToastrService,
    private router: Router, public sanitizer: DomSanitizer, private datePipe: DatePipe, private modalService: BsModalService)
    {

    this.generalLoanForm = new FormGroup({
      loanCode: new FormControl(""),
      loanDescription: new FormControl(""),
      minimumNetPayLoan: new FormControl(false),
      loanApplicationTemplate: new FormControl([null]),
      approvalWorkFlowId: new FormControl(""),
      approvalWorkFlowSDM: new FormControl(""),
      approvalDerivedName: new FormControl(""),
      minLoanAmount: new FormControl("",[Validators.required,Validators.pattern(/^[1-9]\d*$/)]),
      assignmentsIntHeadId: new FormControl(""),
      assignmentsPriHeadId: new FormControl(""),
      assignmentsLoanPayment: new FormControl(""),
      taxSettingPerquisiteHead: new FormControl(""),
      taxSettingPerquisiteLoanCategory: new FormControl(""),
      taxSettingPerquisiteSubCategory: new FormControl(""),
      noOfGuarantor: new FormControl(null),
      document: new FormControl(""),
      disbursementRequired:new FormControl(false),
      partDisbursementPermissible:new FormControl(true),
    })

    this.getDeductionHead();
    this.getEarningHead();

    if (localStorage.getItem('viewData') != null) {
      this.loandata = JSON.parse(localStorage.getItem('viewData'))
      this.generalLoanForm.patchValue(this.loandata)

      this.filesArray = []
      this.loandata.document.forEach(element => {
        this.filesArray.push(
          {
            "documentName": element.documentName,
            "documentRemark": element.documentRemark,
            "docMandatory":element.docMandatory,
            "docType":element.docType
          }
        )
      });

      this.generalLoanForm.controls['document'].setValue(this.filesArray)
      if (this.loandata.minimumNetPayLoan == true) {
        this.minimumNetPayValueFlag = 'Yes'
        this.generalLoanForm.controls['minimumNetPayLoan'].setValue(true);
      } else {
        this.minimumNetPayValueFlag = 'No'
        this.generalLoanForm.controls['minimumNetPayLoan'].setValue(false);
      }


      if(this.loandata.disbursementRequired == true){
        this.disbursementRequiredFlag ='Yes'
        this.generalLoanForm.controls['disbursementRequired'].setValue(true);
      }else{
        this.disbursementRequiredFlag ='No'
        this.generalLoanForm.controls['disbursementRequired'].setValue(false);
      }

      if(this.loandata.partDisbursementPermissible == true){
        this.partDisbursementPermissibleFlag ='Yes'
        this.generalLoanForm.controls['partDisbursementPermissible'].setValue(true);
      }else{
        this.partDisbursementPermissibleFlag ='No'
        this.generalLoanForm.controls['partDisbursementPermissible'].setValue(false);
      }

      this.getAllDerivedSDM(this.loandata.approvalWorkFlowSDM) // get sdm derived  name
      this.generalLoanForm.controls['approvalDerivedName'].setValue(this.loandata.approvalDerivedName)
      this.getDeductionHead()
      this.generalLoanForm.controls['assignmentsIntHeadId'].setValue(this.loandata.assignmentsIntHeadId)
      this.generalLoanForm.controls['assignmentsPriHeadId'].setValue(this.loandata.assignmentsPriHeadId)
      this.generalLoanForm.controls['assignmentsLoanPayment'].setValue(this.loandata.assignmentsLoanPayment)
      this.generalLoanForm.controls['taxSettingPerquisiteHead'].setValue(this.loandata.taxSettingPerquisiteHead)
      this.generalLoanForm.disable()
    }

    if (localStorage.getItem('editData') != null) {
      this.editloandata = JSON.parse(localStorage.getItem('editData'))
      this.generalLoanForm.patchValue(this.editloandata)
      console.log("this.editloandata",this.editloandata)
      this.filesArray = []
      this.editloandata.document.forEach(element => {
        this.filesArray.push(
          {
            "documentName": element.documentName,
            "documentRemark": element.documentRemark,
            "docMandatory":element.docMandatory,
            "docType":element.docType
          }
        )
      });
      this.generalLoanForm.controls['document'].setValue(this.filesArray)

      if (this.editloandata.minimumNetPayLoan == true) {
        this.minimumNetPayValueFlag = 'Yes'
        this.generalLoanForm.controls['minimumNetPayLoan'].setValue(true);
      } else {
        this.minimumNetPayValueFlag = 'No'
        this.generalLoanForm.controls['minimumNetPayLoan'].setValue(false);
      }

      if(this.editloandata.disbursementRequired == true){
        this.disbursementRequiredFlag ='Yes'
        this.generalLoanForm.controls['disbursementRequired'].setValue(true);
      }else{
        this.disbursementRequiredFlag ='No'
        this.generalLoanForm.controls['disbursementRequired'].setValue(false);
      }

      if(this.editloandata.partDisbursementPermissible == true){
        this.partDisbursementPermissibleFlag ='Yes'
        this.generalLoanForm.controls['partDisbursementPermissible'].setValue(true);
      }else{
        this.partDisbursementPermissibleFlag ='No'
        this.generalLoanForm.controls['partDisbursementPermissible'].setValue(false);
      }

      this.generalLoanForm.enable()

      this.getAllDerivedSDM(this.editloandata.approvalWorkFlowSDM) // get sdm derived  name
      this.generalLoanForm.controls['approvalDerivedName'].setValue(this.editloandata.approvalDerivedName)
      this.getDeductionHead()
      this.generalLoanForm.controls['assignmentsIntHeadId'].setValue(this.editloandata.assignmentsIntHeadId)
      this.generalLoanForm.controls['assignmentsPriHeadId'].setValue(this.editloandata.assignmentsPriHeadId)
      this.generalLoanForm.controls['assignmentsLoanPayment'].setValue(this.editloandata.assignmentsLoanPayment)
      this.generalLoanForm.controls['taxSettingPerquisiteHead'].setValue(this.editloandata.taxSettingPerquisiteHead)

    }

  }

  ngOnInit(): void {
    this.getAllWorkflowMasters();
    this.getAllApprovalSDM();
    this.getAllPerquisite();


    this.url = window.location.pathname
    if (this.url == "/loan-master/general") {
      this.tabIndex = 1
      this.changeTabIndex(1)
    }

    if (localStorage.getItem('generalForm') != null) {
      this.getDeductionHead();
    this.getEarningHead();

      let generalFormValue = JSON.parse(localStorage.getItem('generalForm'))
      this.generalLoanForm.patchValue(generalFormValue)
      this.filesArray = []
      generalFormValue.document.forEach(element => {
        this.filesArray.push(
          {
            "documentName": element.documentName,
            "documentRemark": element.documentRemark,
            "docMandatory":element.docMandatory,
            "docType":element.docType,
            "loanMasterDocumentId":element.loanMasterDocumentId,
          }
        )
      });

      this.generalLoanForm.controls['document'].setValue(this.filesArray)

      if (generalFormValue.minimumNetPayLoan == true) {
        this.minimumNetPayValueFlag = 'Yes'
      } else {
        this.minimumNetPayValueFlag = 'No'
      }

      if (generalFormValue.minimumNetPayLoan == true) {
        this.minimumNetPayValueFlag = 'Yes'
        this.generalLoanForm.controls['minimumNetPayLoan'].setValue(true);
      } else {
        this.minimumNetPayValueFlag = 'No'
        this.generalLoanForm.controls['minimumNetPayLoan'].setValue(false);
      }

      if(generalFormValue.disbursementRequired == true){
        this.disbursementRequiredFlag ='Yes'
        this.generalLoanForm.controls['disbursementRequired'].setValue(true);
      }else{
        this.disbursementRequiredFlag ='No'
        this.generalLoanForm.controls['disbursementRequired'].setValue(false);
      }

      if(generalFormValue.partDisbursementPermissible == true){
        this.partDisbursementPermissibleFlag ='Yes'
        this.generalLoanForm.controls['partDisbursementPermissible'].setValue(true);
      }else{
        this.partDisbursementPermissibleFlag ='No'
        this.generalLoanForm.controls['partDisbursementPermissible'].setValue(false);
      }

      this.generalLoanForm.enable()

      this.getAllDerivedSDM(generalFormValue.approvalWorkFlowSDM) // get sdm derived  name
      this.generalLoanForm.controls['approvalDerivedName'].setValue(generalFormValue.approvalDerivedName)
      this.getDeductionHead()
      this.generalLoanForm.controls['assignmentsIntHeadId'].setValue(generalFormValue.assignmentsIntHeadId)
      this.generalLoanForm.controls['assignmentsPriHeadId'].setValue(generalFormValue.assignmentsPriHeadId)
      this.generalLoanForm.controls['assignmentsLoanPayment'].setValue(generalFormValue.assignmentsLoanPayment)
      this.generalLoanForm.controls['taxSettingPerquisiteHead'].setValue(generalFormValue.taxSettingPerquisiteHead)

    }
  }



  getAllWorkflowMasters() {
    this.loanMasterService.getAllWorkflowMasters().subscribe(
      res => {
        this.headTemplateList5 = res.data.results;
      })
  }


  /**Set minimum net pay boolean vaue */
  minimumNetPay(value) {
    if (value == 'Yes') {
      this.generalLoanForm.controls['minimumNetPayLoan'].setValue(true)
    } else {
      this.generalLoanForm.controls['minimumNetPayLoan'].setValue(false)
    }
  }

  disbursementRequestRequired(value){
    if(value == 'Yes')
    {
      this.generalLoanForm.controls['disbursementRequired'].setValue(true)
    } else {
      this.generalLoanForm.controls['disbursementRequired'].setValue(false)
    }
  }
  partDisbursementPermissibleReq(value)
  {
    if(value == 'Yes')
    {
      this.generalLoanForm.controls['partDisbursementPermissible'].setValue(true)
    } else {
      this.generalLoanForm.controls['partDisbursementPermissible'].setValue(false)
    }
  }
  // getdeviationAmount(value) {
  //   if (value == 'Yes') {
  //     this.generalLoanForm.controls['deviationAmount'].setValue(1)
  //   } else {
  //     this.generalLoanForm.controls['deviationAmount'].setValue(0)
  //   }
  // }

  // getdeviationIntrest(value) {
  //   if (value == 'Yes') {
  //     this.generalLoanForm.controls['deviationInterest'].setValue(1)
  //   } else {
  //     this.generalLoanForm.controls['deviationInterest'].setValue(0)
  //   }
  // }

  // getdeviationNoOfInstallment(value) {
  //   if (value == 'Yes') {
  //     this.generalLoanForm.controls['deviationNoOfInstallment'].setValue(1)
  //   } else {
  //     this.generalLoanForm.controls['deviationNoOfInstallment'].setValue(0)
  //   }
  // }

  /** Submit general form */
  submitGenralForm() {
    if (this.loandata == '') {
      this.generalLoanForm.controls['minLoanAmount'].setValue(parseInt(this.generalLoanForm.controls['minLoanAmount'].value))
      this.generalLoanForm.controls['approvalWorkFlowId'].setValue(parseInt(this.generalLoanForm.controls['approvalWorkFlowId'].value))
      // this.generalLoanForm.controls['loanApplicationTemplate'].setValue([null])
      this.generalLoanForm.controls['approvalDerivedName'].setValue(parseInt(this.generalLoanForm.controls['approvalDerivedName'].value))
      this.generalLoanForm.controls['noOfGuarantor'].setValue(parseInt(this.generalLoanForm.controls['noOfGuarantor'].value))
      this.generalLoanForm.controls['document'].setValue(this.filesArray)
      this.generalLoanForm.controls['assignmentsIntHeadId'].setValue(parseInt(this.generalLoanForm.controls['assignmentsIntHeadId'].value))
      this.generalLoanForm.controls['assignmentsPriHeadId'].setValue(parseInt(this.generalLoanForm.controls['assignmentsPriHeadId'].value))

      let loanApplicationValue = [this.generalLoanForm.controls['loanApplicationTemplate'].value]
      this.generalLoanForm.controls['loanApplicationTemplate'].setValue(loanApplicationValue)

      localStorage.setItem('generalForm', JSON.stringify(this.generalLoanForm.value))
    }
    this.router.navigate(['/loan-master/payment'])
  }

  /** Reset form */
  resetGeneralForm() {
    this.generalLoanForm.reset()
    localStorage.removeItem('generalForm')
    localStorage.removeItem('generalNext')
  }

  changeTabIndex(index: number) {
    this.tabIndex = index;
    if (this.tabIndex == 1) {
      this.router.navigate(['/loan-master/general'])
    }
    if (this.tabIndex == 2) {
      this.router.navigate(['/loan-master/recovery'])
    }
    if (this.tabIndex == 3) {
      this.router.navigate(['/loan-master/payment'])
    }
  }

  getDeductionHead() {
    this.loanMasterService.getDeductionHead().subscribe(
      res => {
        this.deductionHeadData = res
        // console.log
        // res.data.results.forEach((element) => {

        //   const obj = {
        //     label: element.standardName,
        //     value: element.headMasterId,
        //   };
        //   this.allJobsList.push(obj);

        // });

      }
    )
  }

  getEarningHead() {
    this.loanMasterService.getEarningHead().subscribe(
      res => {
        this.earningHeadData = res
      }
    )
  }

  documentSubmit() {
    // debugger
    this.filesArray.push(
      {
        "documentName": this.documentName,
        "documentRemark": this.documentRemark,
        "docType": this.docType,
        "docMandatory": this.docMandatory,
        "loanMasterDocumentId":this.loanMasterDocumentId,
      });

    this.documentName = null;
    this.documentRemark = null;
    this.docType = null;
    this.docMandatory = null;
    // console.log(this.filesArray);
  }

  removeDocument(index) {
    this.filesArray.splice(index, 1)
    this.documentName = null;
    this.documentRemark = null;
    this.docType = null;
    this.docMandatory = null;
  }
// .............................................Pooja......................................
  docChange(value){
    if(value == 'Yes'){
      this.docMandatory = true;
    }else
    {
      this.docMandatory = false;
    }
      }


  getAllApprovalSDM() // get Approval SDM
      {
        this.loanMasterService.getAllApprovalSDM().subscribe(
        res => {
          this.getAllApprovalSDMData = res.data.results[0];
          this.getAllApprovalSDMData.forEach((element,index) => {
            if(element == null){
              let ind = index;
              this.getAllApprovalSDMData.splice(ind,1)
            }
          });
          // console.log(" this.getAllApprovalSDMData", this.getAllApprovalSDMData)

        }
        )
      }

  getAllDerivedSDM(id) // get sdm derived  name
   {
    this.loanMasterService.getAllDerivedSDM(id).subscribe(
      res => {
        this.approvalDerivedNameList = res.data.results[0];
      })
  }
  getAllPerquisite()
  {
    this.loanMasterService.getAllPerquisite().subscribe(
      res => {
        this.getAllPerquisiteData = res;
      }
    )
  }

// .........................................Upload loan temp.............................................
public UploadModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(
    template,
    Object.assign({}, { class: 'gray modal-md' })
  );
}

public onMasterUpload(
  event: { target: { files: string | any[] } },
  docType: string
) {
  // console.log('event::', event);
  // console.log('docType::', docType);

  if (event.target.files.length > 0) {
    for (const file of event.target.files) {
          const data = {
            name: file.name,

          };
          // console.log("Filename",data)
  this.generalLoanForm.controls['loanApplicationTemplate'].setValue(file.name);

          this.urlArray.push(data);
          this.listDoc.push(file);
    }

  }
}

public removeSelectedLicMasterDocument(index: number, docType: string) {
      this.listDoc.splice(index, 1);
}


public docViewer(template1: TemplateRef<any>, i: any) {
  this.ListOfDocuments = document;
  this.urlIndex = i;
  // console.log(JSON.stringify(this.listDoc));
  //document.documents.forEach(element => {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.listDoc[this.urlIndex].queryBlobURI
    );

  //});

  // console.log('urlSafe::', this.urlSafe);
  this.modalRef = this.modalService.show(
    template1,
    Object.assign({}, { class: 'gray modal-xl' })
  );
}
// Previous Doc Viewer
public previousDocViewer() { //not yet used
  this.urlIndex = this.urlIndex - 1;
  this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
    this.ListOfDocuments[this.urlIndex].queryBlobURI
  );
}

// Next Doc Viewer
public nextDocViewer() { //not yet used
this.urlIndex = this.urlIndex + 1;
this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
 this.ListOfDocuments[this.urlIndex].queryBlobURI
);
}


}
