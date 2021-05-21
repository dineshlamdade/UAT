import { DatePipe, DOCUMENT } from '@angular/common';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import {
  Component,
  HostListener,
  Inject,
  Input,
  OnInit,
  Optional,
  TemplateRef,
  ViewChild,
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
import { startOfYear } from 'date-fns';
import { EventEmitter } from 'events';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertServiceService } from '../../../../../core/services/alert-service.service';
import { NumberFormatPipe } from '../../../../../core/utility/pipes/NumberFormatPipe';
import { FileService } from '../../../file.service';
import { MyInvestmentsService } from '../../../my-Investments.service';
import { ElectricVehicleService } from '../electric-vehicle.service';


@Component({
  selector: 'app-electric-vehicle-master',
  templateUrl: './electric-vehicle-master.component.html',
  styleUrls: ['./electric-vehicle-master.component.scss']
})
export class ElectricVehicleMasterComponent implements OnInit {

  @Input() public vehicleNo: any;
  public modalRef: BsModalRef;
  public submitted = false;
  public pdfSrc =
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
  public pdfSrc1 = 'https://www.gstatic.com/webp/gallery/1.jpg';
  public name = 'Set iframe source';
  public urlSafe: SafeResourceUrl;
  public summarynew: any = {};
  public summaryGridData: Array<any> = [];
  public summaryComputationGridDate: any;
  public masterGridData: Array<any> = [];
  public paymentDetailGridData: Array<any> = [];
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
  public form: FormGroup;
  public Index: number;
  public showUpdateButton: boolean;
  public tabIndex = 0;
  public radioSelected: string;
  public familyRelationSame: boolean;

  public documentRemark: any;
  public isECS = true;

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

  public transactionStatustList: any;
  public globalInstitution: String = 'ALL';
  public globalPolicy: String = 'ALL';
  public globalTransactionStatus: String = 'ALL';

  public globalAddRowIndex: number;
  public globalSelectedAmount: string;

  public proofSubmissionId ;
  public vehicleNumbers: any;
  public validVehicleNumbers: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private Service: MyInvestmentsService,
    private electricVehicleService: ElectricVehicleService,
    private datePipe: DatePipe,
    private http: HttpClient,
    private fileService: FileService,
    private numberFormat: NumberFormatPipe,
    public dialog: MatDialog,
    private modalService: BsModalService,
    private alertService: AlertServiceService,
    @Inject(DOCUMENT) private document: Document,
    public sanitizer: DomSanitizer
  ) {
    this.form = this.formBuilder.group({
      vehicleModel: new FormControl(null, Validators.required),
      vehicleNumber: new FormControl(null, Validators.required),
      lenderName: new FormControl(null, Validators.required),
      accountHolderName: new FormControl(null, Validators.required),
      loanAccountNumber: new FormControl(null, Validators.required),
      loanStartDate: new FormControl(null, Validators.required),
      loanEndDate: new FormControl(null, Validators.required),
      electricVehicleLoanMasterId: new FormControl(null),
      proofSubmissionId : new FormControl(''),
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

    // Business Financial Year API Call
    this.Service.getBusinessFinancialYear().subscribe((res) => {
      this.financialYearStart = res.data.results[0].loanStartDate;
    });


    // Get All Institutes From Global Table
    this.Service.getAllInstitutesFromGlobal().subscribe((res) => {
      // console.log(res);
      res.data.results.forEach((element: { insurerName: any }) => {
        const obj = {
          label: element.insurerName,
          value: element.insurerName,
        };
        this.institutionNameList.push(obj);
      });
    });

    // Get All Previous Employer
    this.Service.getAllPreviousEmployer().subscribe((res) => {
      console.log(res.data.results);
      if (res.data.results.length > 0) {
        this.employeeJoiningDate = res.data.results[0].joiningDate;
        // console.log('employeeJoiningDate::',this.employeeJoiningDate);
      }
    });

    if (this.today.getMonth() + 1 <= 3) {
      this.financialYear =
        this.today.getFullYear() - 1 + '-' + this.today.getFullYear();
    } else {
      this.financialYear =
        this.today.getFullYear() + '-' + (this.today.getFullYear() + 1);
    }

    const splitYear = this.financialYear.split('-', 2);

    this.financialYearStartDate = new Date('01-Apr-' + splitYear[0]);
    this.financialYearEndDate = new Date('31-Mar-' + splitYear[1]);

    if (this.vehicleNo != undefined || this.vehicleNo != null) {
      const input = this.vehicleNo;
      // console.log("edit", input)
      // this.editMaster(input);
      // console.log('editMaster policyNo', input);
      this.editMaster(input.vehicleNumber);
      console.log('editMaster vehicleNumber', input.vehicleNumber);
    }
  }

  // convenience getter for easy access to form fields
  get masterForm() {
    return this.form.controls;
  }

  // Policy End Date Validations with Policy Start Date
  setPolicyEndDate() {
    this.policyMinDate = this.form.value.policyStartDate;
    const policyStart = this.datePipe.transform(
      this.form.get('policyStartDate').value,
      'yyyy-MM-dd'
    );
    const policyEnd = this.datePipe.transform(
      this.form.get('policyEndDate').value,
      'yyyy-MM-dd'
    );
    this.minFormDate = this.policyMinDate;
    if (policyStart > policyEnd) {
      this.form.controls.policyEndDate.reset();
    }
    this.form.patchValue({
      loanStartDate: this.policyMinDate,
    });

    this.setPaymentDetailToDate();
  }

  // Policy End Date Validations with Current Finanacial Year
  checkFinancialYearStartDateWithPolicyEnd() {
    const policyEnd = this.datePipe.transform(
      this.form.get('policyEndDate').value,
      'yyyy-MM-dd'
    );
    const financialYearStartDate = this.datePipe.transform(
      this.financialYearStart,
      'yyyy-MM-dd'
    );
    if (policyEnd < financialYearStartDate) {
      this.alertService.sweetalertWarning(
        'Policy End Date should be greater than or equal to Current Financial Year : ' +
          this.financialYearStart
      );
      this.form.controls.policyEndDate.reset();
    } else {
      this.form.patchValue({
        loanEndDate: this.form.value.policyEndDate,
      });
      this.maxFromDate = this.form.value.policyEndDate;
    }
  }

  // Payment Detail To Date Validations with Payment Detail From Date
  setPaymentDetailToDate() {
    this.paymentDetailMinDate = this.form.value.loanStartDate;
    const from = this.datePipe.transform(
      this.form.get('loanStartDate').value,
      'yyyy-MM-dd'
    );
    const to = this.datePipe.transform(
      this.form.get('loanEndDate').value,
      'yyyy-MM-dd'
    );
    if (from > to) {
      this.form.controls.loanEndDate.reset();
    }
  }

  // Payment Detail To Date Validations with Current Finanacial Year
  checkFinancialYearStartDateWithPaymentDetailToDate() {
    const to = this.datePipe.transform(
      this.form.get('loanEndDate').value,
      'yyyy-MM-dd'
    );
    const financialYearStartDate = this.datePipe.transform(
      this.financialYearStart,
      'yyyy-MM-dd'
    );
    if (to < financialYearStartDate) {
      this.alertService.sweetalertWarning(
        'To Date should be greater than or equal to Current Financial Year : ' +
          this.financialYearStart
      );
      this.form.controls.loanEndDate.reset();
    }
  }

  // Get Master Page Data API call
  masterPage() {
    this.electricVehicleService.getElectricVehicleMaster().subscribe((res) => {
      console.log('masterGridData::', res);
      this.masterGridData = res.data.results;
      this.vehicleNumbers = res.data;
      this.masterGridData.forEach((element) => {
        element.policyStartDate = new Date(element.policyStartDate);
        element.policyEndDate = new Date(element.policyEndDate);
        element.loanStartDate = new Date(element.loanStartDate);
        element.loanEndDate = new Date(element.loanEndDate);
      });
    });
  }

  // Post Master Page Data API call
  public addMaster(formData: any, formDirective: FormGroupDirective): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    if (this.masterfilesArray.length === 0 && this.urlArray.length === 0  ) {
      this.alertService.sweetalertWarning(
        'Electric vehicle  Document needed to Create Master.'
      );
      return;
    } else {
      const from = this.datePipe.transform(
        this.form.get('loanStartDate').value,
        'yyyy-MM-dd'
      );
      const to = this.datePipe.transform(
        this.form.get('loanEndDate').value,
        'yyyy-MM-dd'
      );
      console.log('proofSubmissionId::', this.proofSubmissionId);
      const data = this.form.getRawValue();
            data.proofSubmissionId = this.proofSubmissionId;

      data.loanStartDate = from;
      data.loanEndDate = to;
      // data.premiumAmount = data.premiumAmount.toString().replace(/,/g, '');

      console.log('electric Vehicle ::', data);
      if (data.vehicleNumber) {
        
        this.vehicleNumbers.results.forEach(results => {
          if (results.vehicleNumber == data.vehicleNumber) {
            this.validVehicleNumbers = true;
          }
        });
        if (this.validVehicleNumbers) {
          this.validVehicleNumbers = false;
          this.alertService.sweetalertError(
            'Vehicle number is already present.'
          );
          return;
        }
      }
      if (this.validVehicleNumbers) {
        this.validVehicleNumbers = false;
        this.alertService.sweetalertError(
          'Viechel number is already present.'
        );
        return;
      }

      this.electricVehicleService
        .uploadMultipleElectricVehicleasterFiles(this.masterfilesArray, data)
        .subscribe((res) => {
          console.log(res);
          if (res) {
            if (res.data.results.length > 0) {
              this.masterGridData = res.data.results;
              this.masterGridData.forEach((element) => {
                // element.policyStartDate = new Date(element.policyStartDate);
                // element.policyEndDate = new Date(element.policyEndDate);
                element.loanStartDate = new Date(element.loanStartDate);
                element.loanEndDate = new Date(element.loanEndDate);
              });
              this.alertService.sweetalertMasterSuccess(
                'Record saved Successfully.',
                'Go to "Declaration & Actual" Page to see Schedule.'
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
        this.form.reset();
        this.showUpdateButton = false;
        this.paymentDetailGridData = [];
        this.masterfilesArray = [];
        this.urlArray = [];
        this.submitted = false;

    }
  }

  onMasterUpload(event: { target: { files: string | any[] } }) {
    console.log('event::', event);
    if (event.target.files.length > 0) {
      for (const file of event.target.files) {
        this.masterfilesArray.push(file);
      }
    }
    // console.log('this.masterfilesArray::', this.masterfilesArray);
  }

  // Remove LicMaster Document
  removeSelectedPensionPlanMasterDocument(index: number) {
    this.masterfilesArray.splice(index, 1);
    console.log('this.filesArray::', this.masterfilesArray);
    console.log('this.filesArray.size::', this.masterfilesArray.length);
  }


  // Family relationship shown on Policyholder selection
  OnSelectionfamilyMemberGroup() {
    const toSelect = this.familyMemberGroup.find(
      (c) => c.familyMemberName === this.form.get('accountHolderName').value
    );
    this.form.get('familyMemberInfoId').setValue(toSelect.familyMemberInfoId);
    this.form.get('relationship').setValue(toSelect.relation);
  }



   //------------- On Master Edit functionality --------------------
   editMaster(vehicleNumber) {
    this.scrollToTop();
    this.electricVehicleService.getElectricVehicleMaster().subscribe((res) => {
      console.log('masterGridData::', res);
      this.masterGridData = res.data.results;
      this.masterGridData.forEach((element) => {
        element.policyStartDate = new Date(element.policyStartDate);
        element.policyEndDate = new Date(element.policyEndDate);
        element.loanStartDate = new Date(element.loanStartDate);
        element.loanEndDate = new Date(element.loanEndDate);
      });
      console.log(vehicleNumber)
      const obj =  this.findByvehicleNumber(vehicleNumber,this.masterGridData);

      // Object.assign({}, { class: 'gray modal-md' }),
      console.log("Edit Master",obj);
      if (obj!= 'undefined'){

      this.paymentDetailGridData = obj.paymentDetails;
      this.form.patchValue(obj);
      this.Index = obj.vehicleNumber;
      this.showUpdateButton = true;
      this.isClear = true;
      this.urlArray = obj.rcBook;
      this.proofSubmissionId = obj.proofSubmissionId;

      }
    });

  }

  findByvehicleNumber(vehicleNumber,masterGridData){
    return masterGridData.find(x => x.vehicleNumber === vehicleNumber)
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

  // On Edit Cancel
  cancelEdit() {
    this.form.reset();
    // this.form.get('active').setValue(true);
    // this.form.get('ecs').setValue(0);
    this.showUpdateButton = false;
    this.paymentDetailGridData = [];
    this.isClear = false;
  }

  // On Master Edit functionality
  viewMaster(i: number) {
    //this.scrollToTop();
    this.paymentDetailGridData = this.masterGridData[i].paymentDetails;
    this.form.patchValue(this.masterGridData[i]);
    // console.log(this.form.getRawValue());
    this.Index = i;
    this.showUpdateButton = true;
    const formatedPremiumAmount = this.numberFormat.transform(
      this.masterGridData[i].premiumAmount
    );
    // console.log(`formatedPremiumAmount::`,formatedPremiumAmount);
    this.form.get('premiumAmount').setValue(formatedPremiumAmount);
    this.isCancel = true;
  }

  //---------- On View Cancel -------------------
  resetView() {
    this.form.reset();
    this.showUpdateButton = false;
    this.paymentDetailGridData = [];
    this.masterfilesArray = [];
    this.urlArray = [];
    this.isCancel = false;
  }
  // On View Cancel
  cancelView() {
    this.form.reset();
    // this.form.get('active').setValue(true);
    // this.form.get('ecs').setValue(0);
    this.showUpdateButton = false;
    this.paymentDetailGridData = [];
    this.isCancel = false;
  }
  UploadModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  getInstituteDetails(loanAccountNumber) {
    const electricVehicle = this.masterGridData.find(
      (element) => element.loanAccountNumber === loanAccountNumber.number
    );
    this.form.patchValue(electricVehicle);
  }

 //----------------- Remove  Document -------------
  removeSelectedLicMasterDocument(index: number) {
  this.masterfilesArray.splice(index, 1);
}
// ---------- For Doc Viewer -----------------------
public nextDocViewer() {
  this.urlIndex = this.urlIndex + 1;
  this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
    this.urlArray[this.urlIndex].blobURI
  );
}

public previousDocViewer() {
  this.urlIndex = this.urlIndex - 1;
  this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
    this.urlArray[this.urlIndex].blobURI
  );
}

public docViewer(template3: TemplateRef<any>, index: any) {
  console.log('---in doc viewer--');
  this.urlIndex = index;

  console.log('urlArray::', this.urlArray);
  this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
    this.urlArray[this.urlIndex].blobURI
  );
  console.log('urlSafe::', this.urlSafe);
  this.modalRef = this.modalService.show(
    template3,
    Object.assign({}, { class: 'gray modal-xl' })
  );
}

}


