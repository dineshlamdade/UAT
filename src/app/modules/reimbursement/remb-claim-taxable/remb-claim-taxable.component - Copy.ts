import { Component, EventEmitter, Input, OnInit, Output, ElementRef, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertServiceService } from '../../../core/services/alert-service.service';
import { RembClaimService } from './remb-claim.service';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { DatePipe, DOCUMENT } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
export interface User2 {
  srno;
  headtype;
  headcode;
  headdesc;
  openingval;
  chngamount;
  chngper;
  closingamt;
  unitofmeasure;
  remark;
}
@Component({
  selector: 'app-remb-claim-taxable',
  templateUrl: './remb-claim-taxable.component.html',
  styleUrls: ['./remb-claim-taxable.component.scss']
})
export class RembClaimTaxableComponent implements OnInit {
  employeeForm: FormGroup;
  columns: string[];
  radioModel = 'Middle';
  areaSection = true;
  employeeSection = false;
  users2: User2[];

  public modalRef: BsModalRef;

  dropdownSettings = {};
  dropdownList = [];
  selectedItems = [];
  public claimNontaxableForm: FormGroup;
  public submitted = false;
  public headMasterList: Array<any> = [];
  public headMasterList2: Array<any> = [];
  public headId: number = 13;
  public masterfilesArray: File[] = [];
  public documentRemark: any;
  public alltemplates: Array<any> = [];
  public reimEmpRegistrationId: number = 0;
  public today: any = new Date();
  public urlArray: Array<any> = [];
  public urlIndex: number;
  public urlSafe: SafeResourceUrl;
  public isView: boolean = false;
  public isEdit: boolean = false;
  public pdfSrc =
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
  public pdfSrc1 = 'https://www.gstatic.com/webp/gallery/1.jpg';
  public registerGridDataList: Array<any> = [];
  public declarationService: DeclarationService;
  public globalAddRowIndex: number;
  public shownewRow = false;
  public transactionDetail: Array<any> = [];
  private fieldArray: Array<any> = [];
  private newAttribute: any = {};
  constructor(
    public service: RembClaimService,
    public fb: FormBuilder,
    public router: Router,
    public alertService: AlertServiceService,
    private modalService: BsModalService,
    private datePipe: DatePipe,
    public sanitizer: DomSanitizer


  ) {
    this.columns = ["Name", "Address", "Salary", "IsActive", "Delete"];
  }



  users = [];
  dynamicArray: Array<DynamicGrid> = [];  
  newDynamic: any = {}; 
  ngOnInit(): void {
    this.claimNontaxableForm = this.fb.group({
      reimEmpClaimNonTaxId: new FormControl(''),
      reimbursementMasterGeneralSettingId: new FormControl(''),
      groupCompanyId: new FormControl(''),
      employeeMasterId: new FormControl(''),
      reimbursementEmployeeClaimNonTaxableDetailsRequestDTO: new FormGroup({
        reimEmpClaimNonTaxDetailId: new FormControl(''),
        reimEmpClaimNonTaxId: new FormControl(''),
        proofSubmissionId: new FormControl(''),
        billNo: new FormControl(''),
        billDate: new FormControl({}),
        blockYear: new FormControl(''),
        fieldDate1: new FormControl(''),
        fieldDate2: new FormControl(''),
        fieldDropdown1: new FormControl(''),
        fieldDropdown2: new FormControl(''),
        textField1: new FormControl(''),
        textField2: new FormControl(''),
        radioButton1: new FormControl(''),
        radioButton2: new FormControl(''),
        checkBox1: new FormControl(''),
        checkBox2: new FormControl(''),
        claimAmount: new FormControl(''),
        rejectedAmount: new FormControl(''),
        approvedAmount: new FormControl(''),
        remark: new FormControl(''),
        status: new FormControl(''),
        dateOfSubmission: new FormControl(''),
        active: new FormControl(''),
      }),
      active: new FormControl(''),
    })
 
    this.getHeadMasterFields(this.headId);
    this.newDynamic = {name: "", email: "",phone:""};  
    this.dynamicArray.push(this.newDynamic);  
  }



  submitClaimNonTaxMaster() {
    window.scrollTo(0, 0);
    
  }

  addFieldValue() {
    this.fieldArray.push(this.newAttribute)
    this.newAttribute = {};
}

deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
}

  addRowInList(
    summarynew: {
      reimEmpClaimNonTaxDetailId: number;
      reimEmpClaimNonTaxId: number;
      proofSubmissionId: number;
      billNo: Date;
      billDate: Date;
      blockYear: Date;
      claimAmount: number;
      rejectedAmount: number;
      approvedAmount: number;
      remark: string;
      status: string;
    },
    j: number,
  ) {
    // console.log('summary::',  summarynew);
    // if (this.initialArrayIndex[j] > i) {
    //   this.hideRemoveRow = false;
    // } else {
    //   this.hideRemoveRow  = true;
    // }
    this.declarationService = new DeclarationService(summarynew);
    // console.log('declarationService::', this.declarationService);
    this.globalAddRowIndex -= 1;
    console.log(' in add this.globalAddRowIndex::', this.globalAddRowIndex);
    this.shownewRow = true;
    this.declarationService.reimEmpClaimNonTaxId = this.globalAddRowIndex;
    this.declarationService.billNo = null;
    this.declarationService.billDate = null;
    this.declarationService.blockYear = null;
    this.declarationService.claimAmount = null;
    this.declarationService.rejectedAmount = 0;
    this.declarationService.approvedAmount = 0;
    this.declarationService.remark = "sss";
    this.declarationService.status = "dddd";
    // this.declarationService.licMasterPaymentDetailsId = this.transactionDetail[
    //   j
    // ].lictransactionList[0].licMasterPaymentDetailsId;
    // this.transactionDetail[j].lictransactionList.push(this.declarationService);
    // console.log('addRow::', this.transactionDetail[j].lictransactionList);
  }



  // Get all field list

  getHeadMasterFields(headId) {
    this.service.getHeadMasterFields(headId).subscribe((res) => {
      this.headMasterList = res.data.results;
      console.log("myhead", res);
      this.headMasterList = res.data.results[0].registrationTemplateDetailsResponseDTO[0].dropDownValues;
      this.headMasterList2 = res.data.results[0].registrationTemplateDetailsResponseDTO[1].dropDownValues;
    })
  }





  // Get all changes 
  communicationChange(event) {
    console.log("Communication Event mgmt", event);
    // console.log(index, changeValue, fieldName);
    // let indexData = this.registerGridDataList.findIndex(getIndex => getIndex.fieldName == fieldName);
    // this.registerGridDataList.[].reimEmpClaimNonTaxId = event;
    console.log("Display change", this.registerGridDataList);

  }
  telephoneChange(event) {
    console.log("telephone Event mgmt", event);
  }

  claimChange(event) {
    console.log("Communication Event mgmt", event);
  }
  proofChange(event) {
    console.log("telephone Event mgmt", event);

  }
  remarkChange(event) {
    console.log("Communication Event mgmt", event);
  }


  // onChangeFromDate() {
  //   const yearDate = this.datePipe.transform(this.computationForm.get('billLastFinYearClaimedInNextFinYear').value, 'MM-dd');
  //   console.log("form", yearDate);
  //   this.today = new Date(yearDate);
  //   console.log("yearDate", this.today);
  //   this.computationForm.controls['billLastFinYearClaimedInNextFinYear'].setValue(yearDate);
  // }

  onChangeBillDate(event) {
    console.log("change date", event);
    const yearDate = this.datePipe.transform(event, 'MM,dd,yyyy,h,m,s');
    console.log("onChangeBillDate", yearDate);
  }
  onChangeFromDate(event) {
    console.log("change date", event);
    const yearDate = this.datePipe.transform(event, 'MM,dd,yyyy,h,m,s');
    console.log("onChangeBillDate", yearDate);
  }

  onChangeToDate(event) {
    console.log("change date", event);
    const yearDate = this.datePipe.transform(event, 'MM,dd,yyyy,h,m,s');
    console.log("onChangeBillDate", yearDate);
  }



    // document upload modal box

    UploadModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(
        template,
        Object.assign({}, { class: 'gray modal-md' })
      );
    }
  
  
  
    onMasterUpload(event: { target: { files: string | any[] } }) {
      //console.log('event::', event);
      if (event.target.files.length > 0) {
        for (const file of event.target.files) {
          this.masterfilesArray.push(file);
        }
      }
      console.log('this.masterfilesArray::', this.masterfilesArray);
    }
  
    removeSelectedLicMasterDocument(index: number) {
      this.masterfilesArray.splice(index, 1);
      //console.log('this.filesArray::', this.masterfilesArray);
      //console.log('this.filesArray.size::', this.masterfilesArray.length);
    }
  
  
  
    //---------- For Doc Viewer -----------------------
    nextDocViewer() {
  
      this.urlIndex = this.urlIndex + 1;
      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.urlArray[this.urlIndex].blobURI,
      );
      // this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      //   this.urlArray[this.urlIndex]
      // );
    }
  
    previousDocViewer() {
  
      this.urlIndex = this.urlIndex - 1;
      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.urlArray[this.urlIndex].blobURI,
      );
      // this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      //   this.urlArray[this.urlIndex]
      // );
    }
  
    docViewer(template3: TemplateRef<any>, index: any) {
      console.log("---in doc viewer--");
      this.urlIndex = index;
  
      console.log("urlArray::", this.urlArray);
      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.urlArray[this.urlIndex].blobURI,
      );
      //this.urlSafe = "https://paysquare-images.s3.ap-south-1.amazonaws.com/download.jpg";
      //this.urlSafe
      console.log("urlSafe::", this.urlSafe);
      this.modalRef = this.modalService.show(
        template3,
        Object.assign({}, { class: 'gray modal-xl' }),
      );
    }
 
    addRow() {    
      this.newDynamic = {name: "", email: "",phone:""};  
        this.dynamicArray.push(this.newDynamic);  
        alert('New row added successfully');  
        console.log(this.dynamicArray);  
        return true;  
    }  

    deleteRow(index) {  
        if(this.dynamicArray.length ==1) {  
          alert("Can't delete the row when there is only one row Warning");  
            return false;  
        } else {  
            this.dynamicArray.splice(index, 1);  
            alert("Row deleted successfully Delete row");  
            return true;  
        }  
    }
  

}







class DeclarationService {
  public reimEmpClaimNonTaxDetailId: number;;
  public reimEmpClaimNonTaxId: number;
  public proofSubmissionId: number;
  public billNo: number;
  public billDate: Date;
  public blockYear: Date;
  public fieldDate1: Date;
  public fieldDate2: Date;
  public fieldDropdown1: string;
  public fieldDropdown2: string;
  public textField1: string;
  public textField2: string;
  public radioButton1: string;
  public radioButton2: string;
  public checkBox1: string;
  public checkBox2: string;
  public claimAmount : string;
  public rejectedAmount: number;
  public approvedAmount: number;
  public remark: string;
  public status:string;
  public dateOfSubmission: Date;
  public active:boolean;
  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}

export class DynamicGrid{     
  name:string;  
  email:string;  
  phone:string;  
}