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
  public familyMemberName: Array<any> = [];
  public urlArray: Array<any> = [];
  public urlIndex: number;
  public glbalECS: number;
  public previousEmployerDetailsform: FormGroup;
  public Index: number;
  public showUpdateButton: boolean;
  public tabIndex = 0;
  public radioSelected: string;
  public familyRelationSame: boolean;

  public documentRemark: any;
  public isECS = true;

  public then: any;

  public masterfilesArray: File[] = [];
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
  public fullyTaxableHeadsIncome: Number;
  public headsWithExemptionIncome: Number;
  public valueOfPerquisites: Number;
  public taxableIncome: Number;
  public professionalTax: Number;
  public standardDeduction: Number;
  public benefitGivenUnder80C: Number;
  public taxDeductedAtSource: Number;

  public transactionStatustList: any;
  public globalInstitution: String = 'ALL';
  public globalPolicy: String = 'ALL';
  public globalTransactionStatus: String = 'ALL';

  public globalAddRowIndex: number;
  public globalSelectedAmount: string;

  public masterSummaryGridData: Array<any> = [];

  imgFile: any = '';
  imageFile: any;
 


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
      previousEmployerId: new FormControl(0),
      name: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      pan: new FormControl(null, Validators.required),
      tan: new FormControl(null, Validators.required),
      dateOfJoining: new FormControl(null, Validators.required),
      dateOfLeaving: new FormControl(null, Validators.required),
      typeOfRegime: new FormControl(null, Validators.required),
      fullyTaxableHeadsIncome: new FormControl(null, Validators.required),
      headsWithExemptionIncome: new FormControl(null, Validators.required),
      valueOfPerquisites: new FormControl(null, Validators.required),
      taxableIncome: new FormControl(
        { value: 0, disabled: true },
        Validators.required
      ),
      professionalTax: new FormControl(null, Validators.required),
      standardDeduction: new FormControl(null, Validators.required),
      benefitGivenUnder80C: new FormControl(null, Validators.required),
      taxDeductedAtSource: new FormControl(null, Validators.required),
    });

    /*     this.masterPage(); */
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
    this.previousDate.setDate(this.today.getDate() - 1);

    this.getpreviousEmployerDetailSummary();
  }

  // ------------------------------------Master----------------------------

  //------------------- convenience getter for easy access to previousEmployerDetailsform fields -----------------
  get previousEmployerDetailsMaster() {
    return this.previousEmployerDetailsform.controls;
  }

  //---------------- Get Master Page Data API call -----------------------
  /* masterPage() {
    this.Service.getEightyCMaster().subscribe((res) => {
      console.log('masterSummaryGridData::', res);
      this.masterSummaryGridData = res.data.results;
      this.masterSummaryGridData.forEach((element) => {
        element.policyStartDate = new Date(element.policyStartDate);
        element.policyEndDate = new Date(element.policyEndDate);
        element.fromDate = new Date(element.fromDate);
        element.toDate = new Date(element.toDate);
      });
    });
  } */

  //-------------- Post Master Page Data API call -------------------
  public addMaster(formData: any, formDirective: FormGroupDirective): void {
    console.log('addMaster::', formData);
    this.previousEmployerDetailssubmitted = true;

    if (this.previousEmployerDetailsform.invalid) {
      return;
    }
    const data = this.previousEmployerDetailsform.getRawValue();
    this.previousEmployerService
      .submitPreviousEmployerDetailData(this.masterfilesArray, data)
      .subscribe((res) => {
        console.log('Response', res);

        if (res) {
          if (res.data.results.length > 0) {
            this.masterSummaryGridData = res.data.results;
            this.masterSummaryGridData.forEach((element) => {
              element.dateOfJoining = new Date(element.dateOfJoining);
              element.dateOfLeaving = new Date(element.dateOfLeaving);
              /*  element.fromDate = new Date(element.fromDate);
                element.toDate = new Date(element.toDate); */
            });
            this.alertService.sweetalertMasterSuccess(
              'Record saved Successfully.',
              'Go to "Transaction" Page to see Schedule.'
            );
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
    //console.log('this.filesArray::', this.masterfilesArray);
    //console.log('this.filesArray.size::', this.masterfilesArray.length);
  }

  /*   calculateAnnual Amount Calculate Total*/
  calculateTotal() {
    let taxableHeadsIncome = this.previousEmployerDetailsform.value
      .fullyTaxableHeadsIncome;
    let exemptionIncome = this.previousEmployerDetailsform.value
      .headsWithExemptionIncome;
    let perquisites = this.previousEmployerDetailsform.value.valueOfPerquisites;
    let taxableIncomeTotal = taxableHeadsIncome + exemptionIncome + perquisites;
    console.log('::', taxableIncomeTotal);
    this.previousEmployerDetailsform.value.taxableIncome = taxableIncomeTotal;
    this.previousEmployerDetailsform
      .get('taxableIncome')
      .setValue(taxableIncomeTotal);
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
    //this.scrollToTop();
    /*     this.paymentDetailGridData = this.masterSummaryGridData[i].paymentDetails; */

    /*  this.masterSummaryGridData[i].dateOfJoining = this.datePipe.transform(
       this.masterSummaryGridData[i].dateOfJoining,
       'dd-mmm-yyyy'
     );  */

    let abc;
    abc = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
    console.log('abc::', abc);

    console.log("dateOfJoining::", this.masterSummaryGridData[i].dateOfJoining)

    /* this.masterSummaryGridData[i].dateOfLeaving = this.datePipe.transform(
      this.masterSummaryGridData[i].dateOfLeaving,
      'dd-mmm-yyyy'
    );  */

    this.previousEmployerDetailsform.patchValue(this.masterSummaryGridData[i]);
    console.log(this.previousEmployerDetailsform.getRawValue());
    this.Index = i;
    this.showUpdateButton = true;
    this.previousEmployerDetailsform
      .get('proofSubmissionId')
      .setValue(this.masterSummaryGridData[i].proofSubmissionId);
    this.isClear = true;
    this.masterfilesArray = this.masterSummaryGridData[i].documentInformationList;
  }
  //------------------- On Master View functionality -----------------------
  viewMaster(i: number) {
    //this.scrollToTop();
    /*    this.paymentDetailGridData = this.masterSummaryGridData[i].paymentDetails; */
    this.previousEmployerDetailsform.patchValue(this.masterSummaryGridData[i]);
    // console.log(this.previousEmployerDetailsform.getRawValue());
    this.Index = i;
    this.showUpdateButton = true;
    // console.log(`formatedPremiumAmount::`,formatedPremiumAmount);
    this.isCancel = true;
  }
  //------------ On Edit Cancel ----------------
  cancelEdit() {
    this.previousEmployerDetailsform.reset();
    /*    this.previousEmployerDetailsform.get('active').setValue(true);
       this.showUpdateButton = false;
       this.isCancel = false; */
  }
  /* =================pdf======================== */
  download() {
    console.log('hi');

    let data = document.getElementById('htmlData');
    html2canvas(data).then(canvas => {
      console.log(canvas)
      // Few necessary setting options
      const imgWidth = 193;
     const pageHeight = 0;
      const imgHeight = canvas.height * imgWidth / canvas.width;
     // const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      // A4 size page of PDF
      const pdf = new jspdf('p', 'mm', 'a4');
      const position = -120;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      // Generated PDF
      pdf.save('FORM.12B.pdf');
    });
  }
  //------------ On Form 12B Cancel Edit Cancel ----------------
  cancelFormEdit() { }

  /*   Summary Master */
  getpreviousEmployerDetailSummary() {
    this.previousEmployerService
      .getpreviousEmployerDetailSummary()
      .subscribe((res) => {
        console.log('res::', res);
        console.log('masterSummaryGridData::', res);
        this.masterSummaryGridData = res.data.results;
      });
  }
  /* ==== */
  UploadModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }
  openForm12BModal(template1: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template1,
      Object.assign({}, { class: 'gray modal-xl' })
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