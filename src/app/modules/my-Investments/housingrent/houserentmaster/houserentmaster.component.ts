import { DatePipe, DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  TemplateRef,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AccordionModule } from 'primeng/accordion'; // accordion and accordion tab
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import { NumberFormatPipe } from 'src/app/core/utility/pipes/NumberFormatPipe';
import { FileService } from '../../file.service';
import { MyInvestmentsService } from '../../my-Investments.service';
import { HousingloanService } from '../../housingloan/housingloan.service';
import { HouseRentService } from '../house-rent.service';

@Component({
  selector: 'app-houserentmaster',
  templateUrl: './houserentmaster.component.html',
  styleUrls: ['./houserentmaster.component.scss'],
})
export class HouserentmasterComponent implements OnInit {
  public houseRentform: FormGroup;

  public countriesList: Array<any> = [];
  public showOwner = false;
  public isloanTaken = true;
  public purposeOfLoanList: Array<any> = [];
  public usageTypeList: Array<any> = [];
  public lenderTypeList: Array<any> = [];
  public loanData: Array<any> = [];
  public landLordDetailTableList: any = [];
  public agreementDetailsTableList: Array<any> = [];
  public RentDetailTableList: Array<any> = [];
  public loanDetailGridData: Array<any> = [];
  public empoyeeAddressList: Array<any> = [];
  public employeeAddressType: Array<any> = [];
  public loanDetail: String;
  public rentTabDetail: String;
  public loanTaken = true;
  public stampDutyDateValid = false;

  public isDuplicatpan: Boolean;
  public isDuplicatShareOfTotalRent: Boolean;

  public modalRef: BsModalRef;
  public loansubmitted = false;
  public urlSafe: SafeResourceUrl;
  public summarynew: any = {};
  public summaryGridData: Array<any> = [];
  public summaryComputationGridDate: any;
  public masterGridData: Array<any> = [];

  public declarationGridData: Array<any> = [];
  public familyMemberGroup: Array<any> = [];
  public frequencyOfPaymentList: Array<any> = [];
  public institutionNameList: Array<any> = [];
  public transactionDetail: Array<any> = [];
  public documentDetailList: Array<any> = [];
  public uploadGridData: Array<any> = [];

  public editTransactionUpload: Array<any> = [];
  public transactionPolicyList: Array<any> = [];
  public transactionInstitutionListWithPolicies: Array<any> = [];
  public familyMemberName: Array<any> = [];
  public urlArray: Array<any> = [];
  public urlIndex: number;
  public glbalECS: number;

  public Index: number;
  public showUpdateButton: boolean;
  public tabIndex = 0;
  public radioSelected: string;
  public familyRelationSame: boolean;

  public documentRemark: any;
  public isECS = true;

  /*  public total: number; */

  /*   public houseRentalMasterDocument: File[] = [];
  public stampDutyRegistration: File[] = []; */
  public declarationOfLandlordDocument: File[] = [];
  public rentAgreementDocument: File[] = [];
  //public loanSanctionLetter: File[] = [];
  //public possessionLetter: File[] = [];
  public receiptNumber: number;
  public receiptAmount: string;
  public receiptDate: Date;
  public selectedInstitution: string;
  public policyDuplicate: string;
  public sumDeclared: any;
  public enableCheckboxFlag2: any;
  public greaterDateValidations: boolean;
  public policyMinDate: Date;
  public policyMaxDatePPF: Date;
  public paymentDetailMinDate: Date;
  public paymentDetailMaxDate: Date;
  /* public minFormDate: Date;
  public maxFromDate: Date; */
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
  /*   public financialYear: any;
  public financialYearStartDate: Date;
  public financialYearEndDate: Date; */
  public today = new Date();

  //Button Validation
  public landlordDetailsSubmitted = false;
  public rentDetailsSubmitted = false;
  public agreementDetailssubmitted = false;
  public houseDetailsRentsubmitted = false;

  public transactionStatustList: any;
  public globalInstitution: String = 'ALL';
  public globalPolicy: String = 'ALL';
  public globalTransactionStatus: String = 'ALL';

  public globalAddRowIndex: number;
  public globalAddRowIndex1: number;
  public globalSelectedAmount: string;
  public testVariable: Array<any> = [];
  public abc: any[];
  public rentAgreementDocumentDetail: Array<any> = [];
  public declarationOfLandlordDocumentDetail: Array<any> = [];

  constructor(
    private ref: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private Service: MyInvestmentsService,
    private HousingLoanService: HousingloanService,
    private houseRentService: HouseRentService,
    private datePipe: DatePipe,
    private http: HttpClient,
    private fileService: FileService,
    private numberFormat: NumberFormatPipe,
    public dialog: MatDialog,
    private modalService: BsModalService,
    private alertService: AlertServiceService,
    @Inject(DOCUMENT) private document: Document,
    public sanitizer: DomSanitizer
  )
   {
    this.houseRentform = this.formBuilder.group({
      /*   ---------------------------Add houseRentalMaster Post----------------- */
      houseRentMaster: this.formBuilder.group({
        houseRentalMasterId: new FormControl(0),
        propertyName: new FormControl(null, Validators.required),
        copyFrom: new FormControl(null, Validators.required),
        address1: new FormControl(null, Validators.required),
        address2: new FormControl(null, Validators.required),
        address3: new FormControl(null, Validators.required),
        country: new FormControl(null, Validators.required),
        pinCode: new FormControl(null, Validators.required),
        state: new FormControl(null, Validators.required),
        city: new FormControl(null, Validators.required),
        village: new FormControl(null),
        metroCity: new FormControl(null, Validators.required),
        proofSubmissionId: new FormControl(''),
        transactionStatus: new FormControl(''),
        remark: new FormControl(''),
      }),

      landLordDetailList: this.formBuilder.group({
        houseRentalLandLordDetailId: new FormControl(0),
        houseRentalMasterId: new FormControl(''),
        name: new FormControl(null, Validators.required),
        address: new FormControl(null, Validators.required),
        landLordPan: new FormControl(null, Validators.required),
        /*    percentageShareOfRent: new FormControl(null, Validators.required), */
        percentageShareOfRent: new FormControl(null, [
          Validators.required,
          Validators.max(100),
          Validators.min(0),
        ]),
        // remark:new FormControl(null,Validators.required)
        remark: new FormControl(''),
      }),

      /* agreementDetailList:  new FormArray([]), */

      agreementDetailList: this.formBuilder.group({
        houseRentalAgreementDetailId: new FormControl(0),
        houseRentalMasterId: new FormControl(''),
        fromDate: new FormControl(null, Validators.required),
        toDate: new FormControl(null, Validators.required),
        remark: new FormControl(null, Validators.required),
      }),

      /*   rentDetailList: new FormArray([]) */
      rentDetailList: this.formBuilder.group({
        houseRentalRentDetailId: new FormControl(0),
        houseRentalMasterId: new FormControl(''),
        fromDate: new FormControl(null, Validators.required),
        toDate: new FormControl(null, Validators.required),
        rentAmount: new FormControl(null, Validators.required),
      }),
    });

    this.lenderTypeList = [
      { label: 'Financial Institutions', value: 'financial' },
      { label: 'Employer', value: 'employer' },
      { label: 'Others', value: 'others' },
    ];
    this.masterPage();
    this.addNewRowId = 0;
    this.hideRemarkDiv = false;
    this.hideRemoveRow = false;
    this.isClear = false;
    this.isCancel = false;
    this.receiptAmount = this.numberFormat.transform(0);
    this.globalAddRowIndex = 0;
    this.globalAddRowIndex1 = 0;
    this.globalSelectedAmount = this.numberFormat.transform(0);
  }

  public ngOnInit(): void {
    //S  this.addOwner(0);
    // this.houseRentform.get('country').setValue('India');
    // console.log('Purpose Of Loan' , this.houseRentform.get('housePropertyLoanDetailList').get('purposeOfLoan'))
    // console.log('dropdown',this.houseRentform.get('housePropertyLoanDetailList').get('purposeOfLoan').setValue('construction'))
    this.Service.getCountryList().subscribe((res) => {
      this.countriesList = res.data.results;
      console.log('Countries', this.countriesList);
    });
    /*  console.log('financialYear', this.financialYear); */
    this.Service.getEmployeeAddressList().subscribe((res) => {
      this.empoyeeAddressList =
        res.data.results[0].employeeAddressResponseDTOList;
      this.empoyeeAddressList.forEach((element) => {
        const obj = {
          label: element.addressType,
          value: element.addressType,
        };
        this.employeeAddressType.push(obj);
      });
      //console.log('Employee Adddress', this.empoyeeAddressList);
      // console.log(' Adddress typr', this.employeeAddressType);
    });
    /*  if (this.today.getMonth() + 1 <= 3) {
      this.financialYear =
        this.today.getFullYear() - 1 + '-' + this.today.getFullYear();
    } else {
      this.financialYear =
        this.today.getFullYear() + '-' + (this.today.getFullYear() + 1);
    } */

    /*   const splitYear = this.financialYear.split('-', 2);

    this.financialYearStartDate = new Date('01-Apr-' + splitYear[0]);
    this.financialYearEndDate = new Date('31-Mar-' + splitYear[1]); */
  }

  get f() {
    return this.houseRentform.controls;
  }
  get pfArray() {
    return this.f.pfFormArray as FormArray;
  }
  // get housePropertyLoanDetailList() { return this.f.housePropertyLoanDetailList as FormArray; }

  get landLordDetailForm() {
    return this.houseRentform.get('landLordDetailList')['controls'];
  }
  get masterForm() {
    return this.houseRentform.controls;
  }

  //MAster Top From
  get houseRentMaster() {
    return this.houseRentform.get('houseRentMaster')['controls'];
  }

  get agreementForm() {
    return this.houseRentform.controls;
  }

  get houseAgreementMasterForm() {
    return this.houseRentform.get('agreementDetailList')['controls'];
  }

  get landRentDetailForm() {
    return this.houseRentform.get('rentDetailList')['controls'];
  }

  public addOwner() {
    console.log('event::', this.landLordDetailForm);
    this.landlordDetailsSubmitted = true;
    if (this.houseRentform.get('landLordDetailList').invalid) {
      console.log(this.houseRentform.get('landLordDetailList').invalid);
      return;
    }
    this.globalAddRowIndex -= 1;
    console.log(' in add this.globalAddRowIndex::', this.globalAddRowIndex);

    console.log(
      'houseRentalLandLordDetailId::', this.houseRentform.get('landLordDetailList').value.houseRentalLandLordDetailId
    );

    this.landLordDetailTableList.forEach((element) => {
      if (
        element.landLordPan === this.houseRentform.get('landLordDetailList').value.landLordPan && 
        ( this.houseRentform.get('landLordDetailList').value.houseRentalLandLordDetailId === 0 ||
        this.houseRentform.get('landLordDetailList').value.houseRentalLandLordDetailId === null )
      ) 
      {
        this.isDuplicatpan = true;
        this.alertService.sweetalertWarning(
          'This Pan Number Currently Present Please Check The Pan Number.'
        );
        console.log(this.isDuplicatpan);
      }
    });
    console.log('isDuplicatpan::', this.isDuplicatpan);
    if (this.isDuplicatpan) {
      this.isDuplicatpan = false;
      return;
    }
    
      /* ======Share Of Total Rent========= */
      let total = 0;
      total += this.houseRentform.get('landLordDetailList').value
        .percentageShareOfRent;
      this.landLordDetailTableList.forEach((element) => {
        /*  if(element.percentageShareOfRent === this.houseRentform.get('landLordDetailList').value.percentageShareOfRent) */
        if 
        (
          
          ( this.houseRentform.get('landLordDetailList').value.houseRentalLandLordDetailId === 0 ||
          this.houseRentform.get('landLordDetailList').value.houseRentalLandLordDetailId === null )
        )
        {
          total = total + element.percentageShareOfRent;
          console.log('two::', total);
        }
      
      });
      console.log(total);
      if (total > 100) {
        this.alertService.sweetalertWarning(
          'This % Share Of Total Rent : Please Check Total Rent 100%.'
        );
        return;
      }


    if (
      (this.houseRentform.get('landLordDetailList').value.houseRentalLandLordDetailId === 0 ||
      this.houseRentform.get('landLordDetailList').value.houseRentalLandLordDetailId === null)
      &&
      !this.isDuplicatpan && total <= 100 
    ) 
    {
      this.houseRentform.get(
        'landLordDetailList'
      ).value.houseRentalLandLordDetailId = this.globalAddRowIndex;
      this.landLordDetailTableList.push(
        this.houseRentform.get('landLordDetailList').value
      );
    } 
    else
     {
     /*  this.landLordDetailTableList.forEach((element) => {

        if (
          element.landLordPan === this.houseRentform.get('landLordDetailList').value.landLordPan
          )
         {
          this.isDuplicatpan = false;
          this.alertService.sweetalertWarning(
            'This Pan Number Currently Present Please Check The Pan Number.'
          );
          console.log(this.isDuplicatpan);
        }
      });
      console.log('isDuplicatpan::', this.isDuplicatpan);
      if (this.isDuplicatpan)
       {
        this.isDuplicatpan = true;
        return;
      }

      /* ======Share Of Total Rent========= */
 /*      let total = 0;
      total += this.houseRentform.get('landLordDetailList').value
        .percentageShareOfRent;
      this.landLordDetailTableList.forEach((element) => {
     
        total = total + element.percentageShareOfRent;
        console.log('two::', total);
      });
      console.log(total);
      if (total > 100) {
        this.isDuplicatpan = false;
        this.alertService.sweetalertWarning(
          'This % Share Of Total Rent : Please Check Total Rent 100%.'
        );
        return;
      }  */
      console.log(this.houseRentform.get('landLordDetailList').value);
      console.log(this.landLordDetailTableList);
      const index = this.landLordDetailTableList.findIndex(
        (land) =>
          land.houseRentalLandLordDetailId ===
          this.houseRentform.get('landLordDetailList').value
            .houseRentalLandLordDetailId
      );
      console.log(index);
      this.landLordDetailTableList[index].name = this.houseRentform.get(
        'landLordDetailList'
      ).value.name;
      this.landLordDetailTableList[index].address = this.houseRentform.get(
        'landLordDetailList'
      ).value.address;
      this.landLordDetailTableList[index].landLordPan = this.houseRentform.get(
        'landLordDetailList'
      ).value.landLordPan;
      this.landLordDetailTableList[
        index
      ].percentageShareOfRent = this.houseRentform.get(
        'landLordDetailList'
      ).value.percentageShareOfRent;
    }
    /* this.landLordDetailTableList.houseRentalLandLordDetailId  = this.globalAddRowIndex;    */
    console.log('landLordDetailTableList', this.landLordDetailTableList);
    this.houseRentform.get('landLordDetailList').reset();
    this.landlordDetailsSubmitted = false;
  }
  /* public addLoanDetails(formDirective : FormGroupDirective) {
  this.loansubmitted =true;
  console.log('this.loansubmitted', this.loanForm)
  if (this.form.get('housePropertyLoanDetailList').invalid) {
    console.log(this.form.get('housePropertyLoanDetailList').invalid)
     return;
   }
  this.loanDetailGridData.push(this.form.get('housePropertyLoanDetailList').value);
  this.form.get('housePropertyLoanDetailList').reset();
 this.loansubmitted =false;
} */

  public rentDetails() {
      let abc: any;
      abc = this.houseRentform.get('rentDetailList').value.fromDate
     
      let month = this.houseRentform.get('rentDetailList').value.fromDate.getMonth()
      abc.setMonth(parseInt(month) + 1);
      
      
      abc = this.datePipe.transform
        (abc, "DD-MMM-YYYY")
      this.houseRentform.get(['rentDetailList','toDate']).setValue(abc);
  }

  public addOwnerRent() {
    console.log('event::', this.landRentDetailForm);
    this.rentDetailsSubmitted = true;

  if (this.houseRentform.get('rentDetailList').invalid) {
    console.log(this.houseRentform.get('rentDetailList').invalid);
    return;
  }

    this.globalAddRowIndex1 -= 1;
    console.log(' in add this.globalAddRowIndex1::', this.globalAddRowIndex1);

    console.log(
      this.houseRentform.get('rentDetailList').value.houseRentalRentDetailId
    );
    if (
      this.houseRentform.get('rentDetailList').value.houseRentalRentDetailId === 0 ||
      this.houseRentform.get('rentDetailList').value.houseRentalRentDetailId === null
    ) {
      this.houseRentform.get(
        'rentDetailList'
      ).value.houseRentalRentDetailId = this.globalAddRowIndex1;
      console.log(this.houseRentform.getRawValue());
      this.RentDetailTableList.push(
        this.houseRentform.get('rentDetailList').value
      );
    }
     else {
      console.log(this.houseRentform.get('rentDetailList').value);
      console.log(this.RentDetailTableList);
      const index = this.RentDetailTableList.findIndex(
        (land) =>
          land.houseRentalRentDetailId ===
          this.houseRentform.get('rentDetailList').value.houseRentalRentDetailId
      );
      console.log(index);
      this.RentDetailTableList[index].fromDate = this.houseRentform.get(
        'rentDetailList' ).value.fromDate;

      this.RentDetailTableList[index].toDate = this.houseRentform.get(
        'rentDetailList').value.toDate;

      this.RentDetailTableList[index].rentAmount = this.houseRentform.get(
        'rentDetailList'
      ).value.rentAmount;
    }
    /* this.RentDetailTableList.houseRentalRentDetailId  = this.globalAddRowIndex1;    */
    console.log('RentDetailTableList', this.RentDetailTableList);
    this.houseRentform.get('rentDetailList').reset();
    this.landlordDetailsSubmitted = false;
  }
  /* =============================Rent============================= */
  /*   public addOwnerRent(formDirective: FormGroupDirective) {
    console.log('event::', this.landRentDetailForm);
    this.rentDetailsSubmitted = true;
    if (this.houseRentform.get('rentDetailList').invalid) {
      console.log(this.houseRentform.get('rentDetailList').invalid);
      return;
    }
    this.RentDetailTableList.push(
      this.houseRentform.get('rentDetailList').value
    );
    console.log('RentDetailTableList', this.RentDetailTableList);
    this.houseRentform.get('rentDetailList').reset();
    this.rentDetailsSubmitted = false;
  } */
  /*============================================================== */
  /*  public addUsageType(i: number) {
    console.log('addowner Index' , i);
    this.landLordDetailList.push(this.formBuilder.group({
      housePropertyUsageTypeId : [0],
      name: [''],
      address: [''],
      landLordPan : [''],
      percentageShareOfRent : ['']
    }));
    console.log('addowner Index' , this.landLordDetailList.value);

  } */

  /*   public removeUsageType(i: number) {
    if (i > 0) {
      this.housePropertyUsageTypeList.removeAt(i);

    } else {

      this.showOwner = false;
      console.log('else', this.showOwner);

    }
  }
  public removeOwner(i: number) {
    if (i > 0) {
      (this.houseRentform.get('housePropertyOwnerDetailList') as FormArray).removeAt(i);

    } else {
      this.showOwner = false;
      console.log('else', this.showOwner);

    }
  } */
  public addLoanDetails(formDirective: FormGroupDirective) {
    this.loansubmitted = true;
    // console.log('this.loansubmitted', this.loanForm)
    if (this.houseRentform.get('housePropertyLoanDetailList').invalid) {
      console.log(
        this.houseRentform.get('housePropertyLoanDetailList').invalid
      );
      return;
    }

    this.loanDetailGridData.push(
      this.houseRentform.get('housePropertyLoanDetailList').value
    );
    this.loanDetailGridData = this.loanDetailGridData.slice();

    this.houseRentform.get('housePropertyLoanDetailList').reset();

    this.houseRentform.get('housePropertyLoanDetailList').markAsPristine();
    this.loansubmitted = false;
  }

  public trackloanDetail(index: number, loanDetail: any) {
    return loanDetail.lenderName;
  }

  public getPermanentAddressFromPIN() {
   /*  console.log(this.houseRentform.get('pinCode').value); */
    if (
      this.houseRentform.get('houseRentMaster').get('pinCode').value.length < 6
    ) {
      this.houseRentform.get('houseRentMaster').get('state').setValue('');
      this.houseRentform.get('houseRentMaster').get('city').setValue('');
      this.houseRentform.get('houseRentMaster').get('village').setValue('');
    }
    if (
      this.houseRentform.get('houseRentMaster').get('pinCode').value.length ===
        6 &&
      this.houseRentform.get('houseRentMaster').get('country').value === 'India'
    ) {
      this.Service.getAddressFromPIN(
        this.houseRentform.get('houseRentMaster').get('pinCode').value
      ).subscribe(
        (res) => {
          console.log(res);
          this.houseRentform
            .get('houseRentMaster')
            .get('state')
            .setValue(res.data.results[0].state);
          this.houseRentform
            .get('houseRentMaster')
            .get('city')
            .setValue(res.data.results[0].city);
          this.houseRentform
            .get('houseRentMaster')
            .get('village')
            .setValue(res.data.results[0].officeName);
        },
        (error: any) => {
          this.alertService.sweetalertError(error.error.status.messsage);
        }
      );
    }
  }

  public checkRegistrationDateValid() {
    const stampDutyPaymentDate_ = this.houseRentform.get(
      'stampDutyRegistrationDate'
    ).value;
    console.log('stampDutyPaymentDate_', stampDutyPaymentDate_);
    if (stampDutyPaymentDate_ !== null) {
      this.stampDutyDateValid = false;
    }
  }

  // Get Master Page Data API call
  public masterPage() {
    this.houseRentService.getHousingRentMaster().subscribe((res) => {
      console.log('masterGridData::', res);
      this.masterGridData = res.data.results;
      this.masterGridData.forEach((element) => {
        if (element.possessionDate !== null) {
          element.possessionDate = new Date(element.possessionDate);
        }
      });
    });
  }
  /* =============================================Add Master=========================================================== */
  // Post Master Page Data API call
  public addMaster(formData: any, formDirective: FormGroupDirective): void {
    this.houseDetailsRentsubmitted = true;

    console.log('Houserentform', this.houseRentform);

    if ( this.houseRentform.get('houseRentMaster').invalid )
       {
        
        return;
     }

     console.log("this.landLordDetailTableList.length:",this.landLordDetailTableList.length)
  if (this.landLordDetailTableList.length ===0)
       {
        console.log('landLordDetailTableList', this.landLordDetailTableList.length);
        this.alertService.sweetalertWarning(
          'Please Enter LandLord Detail Table Filed'
        );
      return;
    } 

    if (this.houseRentform.get('agreementDetailList').invalid) {
      this.agreementDetailssubmitted=true;
      console.log(this.houseRentform.get('agreementDetailList').invalid);
      return;
    }


    if (this.RentDetailTableList.length ===0)
       {
        this.alertService.sweetalertWarning(
          'Please Enter  Rent Details Table Filed'
        );
      return;
    }
    
    
    /*  const from = this.datePipe.transform(
      this.landRentDetailForm.get('fromDate').value,
      'yyyy-MM-dd'
    );
    const to = this.datePipe.transform(
      this.landRentDetailForm.get('toDate').value,
      'yyyy-MM-dd'
    );
    const data = this.landRentDetailForm.getRawValue();
 */
    console.log(
      'declarationOfLandlordDocument',
      this.declarationOfLandlordDocument.length
    );
    console.log('rentAgreementDocument', this.rentAgreementDocument.length);
    console.log(
      'rentAgreementDocumentDetail',
      this.rentAgreementDocumentDetail.length
    );
    console.log(
      'declarationOfLandlordDocumentDetail',
      this.declarationOfLandlordDocumentDetail.length
    );
    if (
      (this.declarationOfLandlordDocument.length === 0 ||
        this.rentAgreementDocument.length === 0) &&
      (this.rentAgreementDocumentDetail.length === 0 ||
        this.declarationOfLandlordDocumentDetail.length === 0)
    ) {
      this.alertService.sweetalertWarning(
        'Please Upload All Mandatitory Documents'
      );
      return;
    } else {
      const data = this.houseRentform.getRawValue();
      /*   data.housePropertyLoanDetailList = this.loanDetailGridData; */
      data.landLordDetailList = this.landLordDetailTableList;
      console.log(this.houseRentform.get('agreementDetailList').value);
      
      if (this.houseRentform.get('agreementDetailList').invalid) {
        console.log(this.houseRentform.get('agreementDetailList').invalid);
      } else {
        this.agreementDetailsTableList.push(
          this.houseRentform.get('agreementDetailList').value
        );
      }
      console.log('agreementDetailsTableList', this.agreementDetailsTableList);
      this.houseRentform.get('agreementDetailList').reset();
      data.agreementDetailList = this.agreementDetailsTableList;
      data.rentDetailList = this.RentDetailTableList;
      /*  data.declarationOfLandlordDocument= this.declarationOfLandlordDocument; */
      /*    data.rentAgreementDocument= this.rentAgreementDocument; */

      data.landLordDetailList.forEach((element) => {
        if (element.houseRentalLandLordDetailId < 0) {
          element.houseRentalLandLordDetailId = 0;
        }
      });

      data.rentDetailList.forEach((element) => {
        if (element.houseRentalRentDetailId < 0) {
          element.houseRentalRentDetailId = 0;
        }
      });

      console.log('Housing Loan Data::', data);

      this.houseRentService
        .submitHousingRentMasterData(
          this.declarationOfLandlordDocument,
          this.rentAgreementDocument,
          data
        )
        .subscribe((res) => {
          console.log(res);
          if (res.data.results.length > 0) {
            this.masterGridData = res.data.results;
            this.masterGridData.forEach((element) => {
              element.policyStartDate = new Date(element.policyStartDate);
              element.policyEndDate = new Date(element.policyEndDate);
              element.fromDate = new Date(element.fromDate);
              element.toDate = new Date(element.toDate);
              this.alertService.sweetalertMasterSuccess(
                'Record saved Successfully.',
                'Go to "Declaration & Actual" Page to see Schedule.'
              );
            });
          }
        });
      this.Index = -1;
      formDirective.resetForm();
      this.houseRentform.reset();

      this.showUpdateButton = false;
      this.loanDetailGridData = [];
      this.declarationOfLandlordDocument = [];
      this.houseDetailsRentsubmitted = false;
      this.rentAgreementDocument = [];
      this.houseDetailsRentsubmitted = false;
    }
  }

  public onMasterUpload(
    event: { target: { files: string | any[] } },
    docType: string
  ) {
    console.log('event::', event);
    console.log('docType::', docType);

    if (event.target.files.length > 0) {
      for (const file of event.target.files) {
        switch (docType) {
          case 'rentAgreementDocument':
            const data = {
              name: file.name,
            };
            this.rentAgreementDocumentDetail.push(data);
            this.rentAgreementDocument.push(file);
            break;
          case 'declarationOfLandlordDocument':
            const data1 = {
              name: file.name,
            };
            this.declarationOfLandlordDocumentDetail.push(data1);
            this.declarationOfLandlordDocument.push(file);
            break;
        }
      }
    }
    console.log(
      ' this.declarationOfLandlordDocument::',
      this.declarationOfLandlordDocument
    );
  }
  // Remove HousingLoanMaster Document houseRentalMasterDocument
  public removeSelectedHouseRentDocument(index: number, docType: string) {
    switch (docType) {
      case 'rentAgreementDocument':
        this.rentAgreementDocumentDetail.splice(index, 1);
        break;
      case 'declarationOfLandlordDocument':
        this.declarationOfLandlordDocumentDetail.splice(index, 1);
        break;
    }
  }

  // Family relationship shown on Policyholder selection
  public OnSelectionfamilyMemberGroup() {
    const toSelect = this.familyMemberGroup.find(
      (c) =>
        c.familyMemberName === this.houseRentform.get('accountHolderName').value
    );
    this.houseRentform
      .get('familyMemberInfoId')
      .setValue(toSelect.familyMemberInfoId);
    this.houseRentform.get('relationship').setValue(toSelect.relation);
  }

  public onSelectAddressType(event: any) {
    console.log('this.houseRentMaster', event.target.value);
    const toSelectAddress = this.empoyeeAddressList.find(
      (c) => c.addressType === event.target.value
    );
    console.log('toSelectAddress', toSelectAddress);
    this.houseRentform
      .get('houseRentMaster')
      .get('address1')
      .setValue(toSelectAddress.address1);
    this.houseRentform
      .get('houseRentMaster')
      .get('address2')
      .setValue(toSelectAddress.address2);
    this.houseRentform
      .get('houseRentMaster')
      .get('address3')
      .setValue(toSelectAddress.address3);
    this.houseRentform
      .get('houseRentMaster')
      .get('country')
      .setValue(toSelectAddress.country);
    this.houseRentform
      .get('houseRentMaster')
      .get('pinCode')
      .setValue(toSelectAddress.postalCode);
    this.houseRentform
      .get('houseRentMaster')
      .get('state')
      .setValue(toSelectAddress.state);
    this.houseRentform
      .get('houseRentMaster')
      .get('city')
      .setValue(toSelectAddress.city);
    this.houseRentform
      .get('houseRentMaster')
      .get('village')
      .setValue(toSelectAddress.village);
    this.houseRentform
      .get('houseRentMaster')
      .get('metroCity')
      .setValue(toSelectAddress.metroCity);
  }

  // on checkPaymentDate
  public checkPaymentDate() {
    const stampDutyPaymentDate = this.houseRentform.get(
      'stampDutyRegistrationDate'
    ).value;
    console.log('stampDutyPaymentDate', stampDutyPaymentDate);

    if (stampDutyPaymentDate === null) {
      this.stampDutyDateValid = true;

      console.log(
        'stampDutyRegistrationDate',
        this.houseRentform.controls[
          'stampDutyRegistrationDate'
        ].updateValueAndValidity()
      );
      this.alertService.sweetalertWarning(
        'Please Enter stampDutyRegistrationDate First to enter Amount : '
      );
    }
  }
  /* ---------------------------editLandlordDetails----------------------- */
  public editLandlordDetails(i: number) {
    /* this.landLordDetailForm.patchValue(this.landLordDetailTableList[i]); */
    console.log('landLordDetailTableList', this.landLordDetailTableList);
    console.log(i);
    this.houseRentform.get('landLordDetailList').patchValue({
      houseRentalLandLordDetailId: this.landLordDetailTableList[i]
        .houseRentalLandLordDetailId,
      name: this.landLordDetailTableList[i].name,
      remark: this.landLordDetailTableList[i].remark,
      address: this.landLordDetailTableList[i].address,
      landLordPan: this.landLordDetailTableList[i].landLordPan,
      percentageShareOfRent: this.landLordDetailTableList[i]
        .percentageShareOfRent,
    });
  }
  /* ---------------------------editRentDetails----------------------- */
  /* public editRentDetails(i: number) {
    console.log('RentDetailTableList', this.RentDetailTableList);
      this.houseRentform.get('rentDetailList').patchValue({
      fromDate: new Date(this.RentDetailTableList[i].fromDate),
      toDate: new Date(this.RentDetailTableList[i].toDate), */
  /*    toDate: this.RentDetailTableList[i].toDate,
      element.fromDate = new Date(element.fromDate);
      element.toDate = new Date(element.toDate); */
  /*     rentAmount: this.RentDetailTableList[i].rentAmount,
    });
  } */

  public editRentDetails(i: number) {
    /* this.landLordDetailForm.patchValue(this.landLordDetailTableList[i]); */
    console.log('RentDetailTableList', this.RentDetailTableList);
    console.log(i);
/* 
    this.RentDetailTableList[i].fromDate = this.datePipe.transform(
      this.RentDetailTableList[i].fromDate,
      'yyyy-MM-dd'
    );

    this.RentDetailTableList[i].toDate = this.datePipe.transform(
      this.RentDetailTableList[i].toDate,
      'yyyy-MM-dd'
    ); */
    this.houseRentform.get('rentDetailList').patchValue({
      houseRentalRentDetailId: this.RentDetailTableList[i]
        .houseRentalRentDetailId,
      fromDate: new Date(this.RentDetailTableList[i].fromDate),
      toDate: new Date(this.RentDetailTableList[i].toDate),
      rentAmount: this.RentDetailTableList[i].rentAmount,
      /*    rentAmount: new Date(this.RentDetailTableList[i].rentAmount) */
      /*  name: this.landLordDetailTableList[i].name,
      remark: this.landLordDetailTableList[i].remark,
      address: this.landLordDetailTableList[i].address,
      landLordPan: this.landLordDetailTableList[i].landLordPan,
      percentageShareOfRent: this.landLordDetailTableList[i].percentageShareOfRent, */
    });
  }
  /* ---------------------------editAgreementDetails----------------------- */
  public editAgreementDetails(i: number) {
    // this.agreementDetailsTableList=[];
    console.log('agreementDetailsTableList', this.agreementDetailsTableList);
    this.houseRentform.get('agreementDetailList').patchValue({
      fromDate: new Date(this.agreementDetailsTableList[i].fromDate),
      toDate: new Date(this.agreementDetailsTableList[i].toDate),
      remark: this.agreementDetailsTableList[i].remark,
    });
  }
  /* ---------------------------------Summery edit------------------------------------------ */
  // On Master Edit functionality
  public editHouseRentMaster(i: number) {
    
    this.declarationOfLandlordDocument = [];
    this.rentAgreementDocument = [];
    this.agreementDetailsTableList = [];
    this.declarationOfLandlordDocumentDetail = [];
    this.rentAgreementDocumentDetail = [];
    /*  this.agreementDetailList=[]; */
    /*     if (this.masterGridData[i].frequency === 'As & When') { */
    console.log(
      'landLordDetailTableList',
      this.masterGridData[i].landLordDetailList
    );
    console.log(
      'agreementDetailsTableList',
      this.masterGridData[i].agreementDetailList
    );
    console.log('RentDetailTableList', this.masterGridData[i].rentDetailList);
    console.log('houseRentMaster', this.masterGridData[i].houseRentMaster);

          
    this.houseRentform.get('houseRentMaster').patchValue({
      houseRentalMasterId: this.masterGridData[i].houseRentMaster
        .houseRentalMasterId,
      propertyName: this.masterGridData[i].houseRentMaster.propertyName,
      copyFrom: this.masterGridData[i].houseRentMaster.copyFrom,
      address1: this.masterGridData[i].houseRentMaster.address1,
      address2: this.masterGridData[i].houseRentMaster.address2,
      address3: this.masterGridData[i].houseRentMaster.address3,
      country: this.masterGridData[i].houseRentMaster.country,
      pinCode: this.masterGridData[i].houseRentMaster.pinCode,
      state: this.masterGridData[i].houseRentMaster.state,
      city: this.masterGridData[i].houseRentMaster.city,
      village: this.masterGridData[i].houseRentMaster.village,
      metroCity: this.masterGridData[i].houseRentMaster.metroCity,
      proofSubmissionId: this.masterGridData[i].houseRentMaster
        .proofSubmissionId,
      // this.form.get('proofSubmissionId').setValue(this.masterGridData[i].proofSubmissionId;
    });

    this.agreementDetailsTableList = this.masterGridData[i].agreementDetailList;

    this.landLordDetailTableList = this.masterGridData[i].landLordDetailList;

    this.RentDetailTableList = this.masterGridData[i].rentDetailList;

/* -----------------------validation----------------------- */
/*     this.houseDetailsRentsubmitted = true;

    console.log('Houserentform', this.houseRentform);

    if ( this.houseRentform.get('houseRentMaster').invalid )
       {
        
        return;
     }
   
     console.log("this.landLordDetailTableList.length:",this.landLordDetailTableList.length)
  if (this.landLordDetailTableList.length ===0)
       {
        console.log('landLordDetailTableList', this.landLordDetailTableList.length);
        this.alertService.sweetalertWarning(
          'Please Enter LandLord Detail Table Filed'
        );
      return;
    } 

    if (this.houseRentform.get('agreementDetailList').invalid) {
      this.agreementDetailssubmitted=true;
      console.log(this.houseRentform.get('agreementDetailList').invalid);
      return;
    }


    if (this.RentDetailTableList.length ===0)
       {
        this.alertService.sweetalertWarning(
          'Please Enter  Rent Details Table Filed'
        );
      return;
    } */
    


    console.log(
      'documentInformationList',
      this.masterGridData[i].documentInformationList
    );
    this.masterGridData[i].documentInformationList.forEach(
      (documentInformation) => {
        console.log(
          'this.documentInformation',
          documentInformation.documentSubType
        );

        if (documentInformation.documentSubType === 'RENTAGREEMENT') {
          const data = {
            name: documentInformation.fileName,
          };

          this.rentAgreementDocumentDetail.push(data);

          console.log(
            'this.rentAgreementDocumentDetail',
            'rentAgreementDocumentDetail'
          );
          console.log('this.documentInformation', documentInformation);
          //this.rentAgreementDocument.name=documentInformation.documentSubType
          // this.rentAgreementDocument.push(documentInformation);
        } else if (
          documentInformation.documentSubType === 'DECLARATIONOFLANDLORDPAN'
        ) {
          const data1 = {
            name: documentInformation.fileName,
          };

          this.declarationOfLandlordDocumentDetail.push(data1);
        }
        console.log(
          'this.declarationOfLandlordDocumentDetail',
          this.declarationOfLandlordDocumentDetail
        );
        console.log(
          'this.documentInformation',
          this.declarationOfLandlordDocument
        );
      }
    );

    /*  this.declarationOfLandlordDocument=this.masterGridData[i].documentInformation.documentSubType */

    /*   this.masterGridData.forEach((element) => {
    element.policyStartDate = new Date(element.policyStartDate);
    element.policyEndDate = new Date(element.policyEndDate);
    element.fromDate = new Date(element.fromDate);
    element.toDate = new Date(element.toDate);
  }); */
  }

  /* --------------------------------Summery view------------------------------------------ */
  // On Master Edit functionality
  public viewHouseRentMaster(i: number) {
    /*     if (this.masterGridData[i].frequency === 'As & When') { */
    console.log(
      'landLordDetailTableList',
      this.masterGridData[i].landLordDetailList
    );
    console.log(
      'agreementDetailsTableList',
      this.masterGridData[i].agreementDetailList
    );
    console.log(
      'RentDetailTableList',
      this.masterGridData[i].RentDetailTableList
    );
    console.log('houseRentMaster', this.masterGridData[i].houseRentMaster);

    this.houseRentform.get('houseRentMaster').patchValue({
      propertyName: this.masterGridData[i].houseRentMaster.propertyName,
      copyFrom: this.masterGridData[i].houseRentMaster.copyFrom,
      address1: this.masterGridData[i].houseRentMaster.address1,
      address2: this.masterGridData[i].houseRentMaster.address2,
      address3: this.masterGridData[i].houseRentMaster.address3,
      country: this.masterGridData[i].houseRentMaster.country,
      pinCode: this.masterGridData[i].houseRentMaster.pinCode,
      state: this.masterGridData[i].houseRentMaster.state,
      city: this.masterGridData[i].houseRentMaster.city,
      village: this.masterGridData[i].houseRentMaster.village,
      metroCity: this.masterGridData[i].houseRentMaster.metroCity,
    });
    this.agreementDetailsTableList = this.masterGridData[i].agreementDetailList;

    this.landLordDetailTableList = this.masterGridData[i].landLordDetailList;

    this.RentDetailTableList = this.masterGridData[i].rentDetailList;
  }

  // On Edit Cancel
  public cancelEdit() {
    this.houseRentform.reset();
    this.houseRentform.get('active').setValue(true);
    this.houseRentform.get('ecs').setValue(0);
    this.showUpdateButton = false;
    this.loanDetailGridData = [];
    this.isClear = false;
  }

  // On Master Edit functionality
  public viewMaster(i: number) {
    // this.scrollToTop();
    this.loanDetailGridData = this.masterGridData[i].paymentDetails;
    this.houseRentform.patchValue(this.masterGridData[i]);
    // console.log(this.houseRentform.getRawValue());
    this.Index = i;
    this.showUpdateButton = true;
    const formatedPremiumAmount = this.numberFormat.transform(
      this.masterGridData[i].premiumAmount
    );
    // console.log(`formatedPremiumAmount::`,formatedPremiumAmount);
    this.houseRentform.get('premiumAmount').setValue(formatedPremiumAmount);
    this.isCancel = true;
  }

  // On View Cancel
  public cancelView() {
    this.houseRentform.reset();
    this.houseRentform.get('active').setValue(true);
    this.houseRentform.get('ecs').setValue(0);
    this.showUpdateButton = false;
    this.loanDetailGridData = [];
    this.isCancel = false;
  }
  public UploadModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  resetForm() {
    this.houseRentform.reset();
    this.houseRentform.reset();
    this.houseRentform.reset();

    // landLordDetailList
    // agreementDetailList
    // rentDetailList
  }
}
