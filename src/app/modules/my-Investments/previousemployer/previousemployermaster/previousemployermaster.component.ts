import { DatePipe, DOCUMENT } from '@angular/common';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';


import jspdf from 'jspdf';
import * as _html2canvas from "html2canvas";
const html2canvas: any = _html2canvas;


import {
  Component,
  HostListener,
  Inject,
  OnInit,
  Optional,
  TemplateRef,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Output,
  EventEmitter
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import { NumberFormatPipe } from 'src/app/core/utility/pipes/NumberFormatPipe';
import { startOfYear } from 'date-fns';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FileService } from '../../file.service';
import { MyInvestmentsService } from '../../my-Investments.service';
import { PreviousEmployerService } from '../../previousemployer/previousemployer.service';
import { from } from 'rxjs';


@Component({
  selector: 'app-previousemployermaster',
  templateUrl: './previousemployermaster.component.html',
  styleUrls: ['./previousemployermaster.component.scss'],
})
export class PreviousemployermasterComponent implements OnInit {
  public previousEmployerDetailssubmitted = false;

  public rentAgreementDocument: File[] = [];
  
  public modalRef: BsModalRef;
  public submitted = false;
  public pdfSrc =
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
  public pdfSrc1 = 'https://www.gstatic.com/webp/gallery/1.jpg';
  /*  public name = 'Set iframe source'; */
  public urlSafe: SafeResourceUrl;
  public summarynew: any = {};
  public summaryGridData: Array<any> = [];
  public summaryComputationGridDate: any;
  public masterGridData: Array<any> = [];
  /*  public paymentDetailGridData: Array<any> = []; */
  public declarationGridData: Array<any> = [];
  public familyMemberGroup: Array<any> = [];
  public frequencyOfPaymentList: Array<any> = [];
  public institutionNameList: Array<any> = [];
  public transactionDetail: Array<any> = [];
  public documentDetailList: Array<any> = [];
  public uploadGridData: Array<any> = [];
  public transactionInstitutionNames: Array<any> = [];
  public editTransactionUpload: Array<any> = [];
  public transactionPolicyList: Array<any> = [];
  public transactionInstitutionListWithPolicies: Array<any> = [];
  public PreviousEmpListGroup: Array<any> = [];

  public previousEmployerName: Array<any> = [];

  public urlArray: Array<any> = [];
  public urlIndex: number;
  public glbalECS: number;
  public previousEmployerDetailsform: FormGroup;
  public Index: number;
  public showUpdateButton: boolean;
  public tabIndex = 0;
  public radioSelected: string;
  public familyRelationSame: boolean;
  documentArray: any[] =[];

  
  public isECS = true;

  public then: any;

  public documentRemark: any;
  public documentPassword = [];
  public remarkList = [];

  public masterfilesArray: File[] = [];
  public PremiumFileArray: File[] = [];

  public receiptNumber: number;
  public receiptAmount: string;
  public receiptDate: Date;
  public selectedInstitution: string;
  public policyDuplicate: string;
  public sumDeclared: any;
  public enableCheckboxFlag2: any;
  public greaterDateValidations: boolean;
  public policyMinDate: Date;
  public paymentDetailMinDate: Date;
  public paymentDetailMaxDate: Date;
  public minFormDate: Date;
  public maxFromDate: Date;
  public financialYearStart: Date;
  public employeeJoiningDate: Date;
  public windowScrolled: boolean;
  public addNewRowId: number;
  public declarationTotal: number;
  public declaredAmount: number;
  public actualTotal: number;
  public actualAmount: number;
  public hideRemarkDiv: boolean;
  public hideRemoveRow: boolean;
  public isClear: boolean;
  public isCancel: boolean;
  public financialYear: any;
  public financialYearStartDate: Date;
  public financialYearEndDate: Date;
  public today = new Date();

  public previousDate: Date;

  public name: string;
  public address: string;
  public pan: any;
  public tan: any;
  public dateOfJoining: Date;
  public dateOfLeaving: Date;
  public typeOfRegime: string;
  remark:any;

  public transactionStatustList: any;
  public globalInstitution: String = 'ALL';
  public globalPolicy: String = 'ALL';
  public globalTransactionStatus: String = 'ALL';

  public globalAddRowIndex: number;
  public globalSelectedAmount: string;

  public masterSummaryGridData: Array<any> = [];

  imgFile: any = '';
  imageFile: any;

  public previousEmployList: Array<any> = [];
  summaryDetails: any;
  indexCount: any;
  documentRemarkList: any;
  remarkCount: any;
  editRemarkData: any;


  constructor(
    private formBuilder: FormBuilder,
    private Service: MyInvestmentsService,
    private datePipe: DatePipe,
    private http: HttpClient,
    private previousEmployerService: PreviousEmployerService,
    private numberFormat: NumberFormatPipe,
    public dialog: MatDialog,
    private modalService: BsModalService,
    private alertService: AlertServiceService,
    @Inject(DOCUMENT) private document: Document,
    public sanitizer: DomSanitizer
  ) {
    this.previousEmployerDetailsform = this.formBuilder.group({     
      previousEmployerMasterDetailId:new FormControl(0), 
      employeePreviousEmploymentId: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      pan: new FormControl(null, Validators.required),
      tan: new FormControl(null, Validators.required),
      dateOfJoining: new FormControl(null, Validators.required),
      dateOfLeaving: new FormControl(null, Validators.required),
      typeOfRegime: new FormControl(null, Validators.required),
      remark: new FormControl(null, Validators.required),
      proofSubmissionId : new FormControl(""),
      documentPassword: new FormControl([]),
      remarkList: new FormControl([]),
     
    });

    this.masterPage();
    this.addNewRowId = 0;
    this.hideRemarkDiv = false;
    this.hideRemoveRow = false;
    this.isClear = false;
    this.isCancel = false;
    this.receiptAmount = this.numberFormat.transform(0);
    this.globalAddRowIndex = 0;
    this.globalSelectedAmount = this.numberFormat.transform(0);
  }

  public ngOnInit(): void {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);

    this.previousDate = this.today;
   /*  this.previousDate.setDate(this.today.getDate() - 1); */

    /* this.getPreviousEmployList(); */


    // -------------- PreviousEmployList 2199 EM List API call ---------------------------
  
  this.previousEmployerService.getPreviousEmpList().subscribe((res) => {
    console.log('previousEmployerName::...', res);

    this.PreviousEmpListGroup = res.data.results[0];

    res.data.results[0].forEach((element) => {
      const obj = {
        label: element.previousEmployerName,
        value: element.previousEmployerName,
      };
      this.previousEmployList.push(obj);
    });
  });

  }

  // Get Master Page Data API call
  public masterPage() {
    this.previousEmployerService.getPreviousEmployerMaster().subscribe((res) => {
      console.log('masterGridData::', res);
      this.masterGridData = res.data.results;
      this.masterGridData.forEach((element) => {
        if (element.possessionDate !== null) {
          element.possessionDate = new Date(element.possessionDate);
          element.documentInformationList.forEach(element => {
            // if(element!=null)
            this.documentArray.push({
              'dateofsubmission':element.creatonTime,
              'documentType':element.documentType,
              'documentName': element.fileName,
              'documentPassword':element.documentPassword,
              'documentRemark':element.documentRemark,
              'status' : element.status,
              'lastModifiedBy' : element.lastModifiedBy,
              'lastModifiedTime' : element.lastModifiedTime,
    
            })
          });
          this.documentArray.push({
            'dateofsubmission':element.creatonTime,
            'documentType':element.documentType,
            'documentName': element.fileName,
            'documentPassword':element.documentPassword,
            'documentRemark':element.documentRemark,
            'status' : element.status,
            'lastModifiedBy' : element.lastModifiedBy,
            'lastModifiedTime' : element.lastModifiedTime,
  
          })
        }
        });
      });
    }

    public docRemarkModal(
      documentViewerTemplate: TemplateRef<any>,
      index: any,
      masterId,
      summary, count
    ) {
  
  
       this.summaryDetails = summary;
      this.indexCount = count;
      this.previousEmployerService.getpreviousEmpRemarkList(
        masterId,
      ).subscribe((res) => {
        console.log('docremark', res);
        
      
      this.documentRemarkList  = res.data.results[0];
      this.remarkCount = res.data.results[0].length;
      });
      // console.log('documentDetail::', documentRemarkList);
      // this.documentRemarkList = this.selectedRemarkList;
      console.log('this.documentRemarkList', this.documentRemarkList);
      this.modalRef = this.modalService.show(
        documentViewerTemplate,
        Object.assign({}, { class: 'gray modal-s' })
      );
    }


     //----------- On change Transactional Line Item Remark --------------------------
   public onChangeDocumentRemark(transactionDetail, transIndex, event) {
    
    console.log('event.target.value::', event.target.value);
    this.editRemarkData =  event.target.value;
    
   console.log('this.transactionDetail', this.transactionDetail);
    // const index = this.editTransactionUpload[0].groupTransactionList.indexOf(transactionDetail);
    // console.log('index::', index);
 
    this.transactionDetail[0].lictransactionList[transIndex].remark =  event.target.value;
   
 
  }
  // ------------------------------------Master----------------------------
  //------------------- convenience getter for easy access to previousEmployerDetailsform fields -----------------
  get previousEmployerDetailsMaster() {
    return this.previousEmployerDetailsform.controls;
  }
  //-------------- Post Master Page Data API call -------------------
  public addMaster(formData: any, formDirective: FormGroupDirective): void {
    this.masterPage();
    console.log('addMaster::', formData);
    this.previousEmployerDetailssubmitted = true;

    if (this.previousEmployerDetailsform.invalid) {
      return;
    }
    const data = this.previousEmployerDetailsform.getRawValue();

    data.dateOfJoining = new Date(data.dateOfJoining);
    data.dateOfLeaving = new Date(data.dateOfLeaving);
    data.documentPassword = this.documentPassword;
    data.remarkList = this.remarkList;
    
    data.remark = this.remark;

    console.log("data::::", data)
    // this.previousEmployerService
    //   .submitPreviousEmployerDetailData(this.masterfilesArray ,this.PremiumFileArray, data)
    //   .subscribe((res) => {
    //     console.log(' ', res);
    this.previousEmployerService.submitPreviousEmployerDetailData(this.masterfilesArray,this.PremiumFileArray,data)
    .subscribe((res)=>{
      console.log(res);

        if (res) {
          if (res.data.results.length > 0) {
            this.masterSummaryGridData = res.data.results;
            this.masterSummaryGridData.forEach((element) => {
              element.dateOfJoining = new Date(element.dateOfJoining);
              element.dateOfLeaving = new Date(element.dateOfLeaving);
              /*  element.fromDate = new Date(element.fromDate);
                element.toDate = new Date(element.toDate); */
            });

            // Remark and password Functionality

            if (res.data.results.length > 0) {
              this.masterGridData = res.data.results;
          
              this.masterGridData.forEach((element, index) => {
                this.documentArray.push({
                
                  'dateofsubmission':new Date(),
                    'documentType':element.documentInformationList[0].documentType,
                    'documentName': element.documentInformationList[0].fileName,
                    'documentPassword':element.documentInformationList[0].documentPassword,
                    'documentRemark':element.documentInformationList[0].documentRemark,
                    'status' : element.documentInformationList[0].status,
                    'approverName' : element.documentInformationList[0].lastModifiedBy,
                    'Time' : element.documentInformationList[0].lastModifiedTime,

                    // 'documentStatus' : this.premiumFileStatus,
            
                });

                if(element.documentInformationList[1]) {
                this.documentArray.push({
                
                  'dateofsubmission':new Date(),
                    'documentType':element.documentInformationList[1].documentType,
                    'documentName': element.documentInformationList[1].fileName,
                    'documentPassword':element.documentInformationList[1].documentPassword,
                    'documentRemark':element.documentInformationList[1].documentRemark,
                    'status' : element.documentInformationList[1].status,
                    'lastModifiedBy' : element.documentInformationList[1].lastModifiedBy,
                    'lastModifiedTime' : element.documentInformationList[1].lastModifiedTime,

                    // 'documentStatus' : this.premiumFileStatus,
            
                });
              }
              });
            }

            this.alertService.sweetalertMasterSuccess(
              'Record saved Successfully.',
              'Go to "Transaction" Page to see Schedule.'
            );
            this.masterPage();

          } else {
            this.alertService.sweetalertWarning(res.status.messsage);
          }
        } else {
          this.alertService.sweetalertError(
            'Something went wrong. Please try again.'
          );
        }
      });

    this.Index = -1;
    formDirective.resetForm();
    this.previousEmployerDetailsform.reset();
    /* this.previousEmployerDetailsform.get('active').setValue(true); */
    this.showUpdateButton = false;
    /*     this.paymentDetailGridData = []; */
    this.masterfilesArray = [];
    this.submitted = false;
    
  }
  onSaveRemarkDetails(summary, index){
    
    const data ={
      "transactionId": 0,
      "masterId":this.summaryDetails.previousEmployerMasterDetailId,
      "employeeMasterId":this.summaryDetails.employeeMasterId,
      "section":"Previous",
      "subSection":"Employer",
      "remark":this.editRemarkData,
      "proofSubmissionId":this.summaryDetails.proofSubmissionId,
      "role":"Employee",
      "remarkType":"Master"

    };
    this.previousEmployerService
    .postLicMasterRemark(data)
    .subscribe((res) => {
      if(res.data.results.length) {
        this.alertService.sweetalertMasterSuccess(
          'Remark Saved Successfully.',
          '',
     
        );
        this.modalRef.hide();

      } else{
        this.alertService.sweetalertWarning("Something Went Wrong");
      }
    });
    this.masterPage();
  }



  
 /* ....... Previous Employer Name........ */  
    OnSelectionPreviousEmployment() {     
    //  debugger 
      if (this.previousEmployerDetailsform.get('name').value == null) {
        this.previousEmployerDetailsform.get('dateOfJoining').setValue(null);
        this.previousEmployerDetailsform.get('dateOfLeaving').setValue(null);
      }
      const toSelect = this.PreviousEmpListGroup.find(
        (c) => c.previousEmployerName === this.previousEmployerDetailsform.get('name').value
      );
      this.previousEmployerDetailsform.get('employeePreviousEmploymentId').setValue(toSelect.employeePreviousEmploymentId);
      this.previousEmployerDetailsform.get('dateOfJoining').setValue(toSelect.dateOfJoining);
      this.previousEmployerDetailsform.get('dateOfLeaving').setValue(toSelect.dateOfRelieving);
    }
     

  onMasterUpload(event: { target: { files: string | any[] } }) {
    console.log('event::', event);
    if (event.target.files.length > 0) {
      for (const file of event.target.files) {
        this.masterfilesArray.push(file);
        console.log('masterfilesArray::', this.masterfilesArray);
      }
    }
    console.log('this.masterfilesArray::', this.masterfilesArray);
  }

  //----------------- Remove LicMaster Document -----------------------------
  removeSelectedRentAgreementDocumentDetailDocument(index: number) {
    this.masterfilesArray.splice(index, 1);
    console.log('this.filesArray::', this.masterfilesArray);
    console.log('this.filesArray.size::', this.masterfilesArray.length);
  }

  //------------------Date of Joining  Validations with Current Finanacial Year -------------------
  checkFinancialYearStartDateWithPaymentDetailToDate() {
    const Leaving = this.datePipe.transform(
      this.previousEmployerDetailsform.get('dateOfLeaving').value,
      'yyyy-MM-dd'
    );
    const financialYearStartDate = this.datePipe.transform(
      this.previousDate,
      'yyyy-MM-dd'
    );
    if (Leaving > financialYearStartDate) {
      //this.alertService.sweetalertWarning("To Date can't be earlier that start of the Current Financial Year");
      this.alertService.sweetalertWarning(
        "Date of Joining can't be earlier that start of the Current Financial Year"
      );
      this.previousEmployerDetailsform.controls.dateOfLeaving.reset();
    }
  }

  //------------------- Date of Leaving Validations with Payment Detail ----------------
  setPaymentDetailToDate() {
    this.paymentDetailMinDate = this.previousEmployerDetailsform.value.dateOfJoining;
    const from = this.datePipe.transform(
      this.previousEmployerDetailsform.get('dateOfJoining').value,
      'yyyy-MM-dd'
    );
    const to = this.datePipe.transform(
      this.previousEmployerDetailsform.get('dateOfLeaving').value,
      'yyyy-MM-dd'
    );
    if (from > to) {
      this.previousEmployerDetailsform.controls.dateOfLeaving.reset();
    }
  }

  //* * ---- */
  //------------- On Master Edit functionality --------------------
  editMaster(i: number) {
    this.scrollToTop();
    let abc;
    abc = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
    console.log('abc::', abc);

    //console.log("dateOfJoining::", this.masterSummaryGridData[i].dateOfJoining)

    
    this.previousEmployerDetailsform.patchValue(this.masterGridData[i]);
    console.log(":::::",this.previousEmployerDetailsform.getRawValue());
    this.Index = i;
    this.showUpdateButton = true;
    this.previousEmployerDetailsform.get('proofSubmissionId')
      .setValue(this.masterGridData[i].proofSubmissionId);
    this.isClear = true;
    this.masterfilesArray = this.masterGridData[i].documentInformationList;
  }
 

    // scrollToTop Fuctionality
    public scrollToTop() {
      (function smoothscroll() {
        var currentScroll =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo(0, currentScroll - currentScroll / 8);
        }
      })();
    }
  //------------ On Edit Cancel ----------------
  cancelEdit() {
    this.previousEmployerDetailsform.reset();
    /*    this.previousEmployerDetailsform.get('active').setValue(true);
       this.showUpdateButton = false;
       this.isCancel = false; */
  }

  /* ==== */
  UploadModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  openFormSign(template2: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template2,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  onImageChange(e) {
    const reader = new FileReader();
    
    if(e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.imgFile = reader.result as string;
        
   
      };
    }
  }


  getImageFile(imagefile : any){
      this.imageFile = imagefile;
  }
}