import { HousingloanComponent } from './../housingloan.component';
import { DatePipe, DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
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
import { isThisISOWeek } from 'date-fns';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AccordionModule } from 'primeng/accordion'; // accordion and accordion tab
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import { NumberFormatPipe } from 'src/app/core/utility/pipes/NumberFormatPipe';
import { FileService } from '../../file.service';
import { MyInvestmentsService } from '../../my-Investments.service';
import { HousingloanService } from '../housingloan.service';
import { truncateSync } from 'node:fs';
import { ThisReceiver } from '@angular/compiler';
import { element } from 'protractor';


@Component({
  selector: 'app-housingloanmaster',
  templateUrl: './housingloanmaster.component.html',
  styleUrls: ['./housingloanmaster.component.scss'],
})
export class HousingloanmasterComponent implements OnInit {
  @Input() public housePropertyMasterIds: any;
  documentPassword= [];
  remarkList = [];
  stampDutydocumentPassword= [];
  stampDutyremarkList = [];
  loandocumentPassword= [];
  loanremarkList = [];
  possessiondocumentPassword= [];
  possessionremarkList = [];

  documentDataArray = [];
  stampDutydocumentDataArray = [];
  loandocumentDataArray = [];
  possessiondocumentDataArray = [];

  public countriesList: Array<any> = [];
  public showOwner = false;
  public isloanTaken = true;
  public purposeOfLoanList: Array<any> = [];
  public usageTypeList: Array<any> = [];
  public lenderTypeList: Array<any> = [];
  public loanData: Array<any> = [];
  public loanDetailGridData: Array<any> = [];
  public empoyeeAddressList: Array<any> = [];
  public employeeAddressType: Array<any> = [];
  public loanDetail: String;
  public loanTaken = true;
  public stampDutyDateValid = false;

  public modalRef: BsModalRef;
  public submitted = false;
  public loansubmitted = false;
  public urlSafe: SafeResourceUrl;
  public summarynew: any = {};
  public summaryGridData: Array<any> = [];
  public summaryComputationGridDate: any;
  public masterGridData: Array<any> = [];
  public houseLoanUsageTypeList: Array<any> = [];
  public houseLoanOwnerTypeList: Array<any> = [];
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
  public stampDutyUrlArray: Array<any> = [];
  public loanSanctionUrlArray: Array<any> = [];
  public possessionUrlArray: Array<any> = [];

  public urlIndex: number;
  public glbalECS: number;
  public housingLoanForm: FormGroup;
  public housePropertyLoanDetailList: FormGroup;
  public HPUsageDetailForm: FormGroup;
  public HPOwnerDetailForm: FormGroup;
  public Index: number;
  public showUpdateButton: boolean;
  public tabIndex = 0;
  public radioSelected: string;
  public familyRelationSame: boolean;

  public documentRemark: any;
  public isECS = true;

  public propertyIndex: File[] = [];
  public stampDutyRegistration: File[] = [];
  public loanSanctionLetter: File[] = [];
  public possessionLetter: File[] = [];
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
  public minFormDate: Date;
  public maxFromDate: Date;
  public editMaxloanDate: Date;
  public financialYearStart: Date;
  public employeeJoiningDate: Date;
  public windowScrolled: boolean;
  public addNewRowId: number;
  public declarationTotal: number;
  public declaredAmount: number;
  public actualTotal: number;
  public actualAmount: number;
  public globalAddRowIndex1: number;
  public hideRemarkDiv: boolean;
  public hideRemoveRow: boolean;
  public isClear: boolean;
  public isCancel: boolean;
  public financialYear: any;
  public financialYearStartDate: Date;
  public financialYearEndDate: Date;
  public today = new Date();
  public visibilityFlagFamily : boolean  = false;
  //public isSaveLoan : boolean  = true;
  public isUpdateLoan : boolean  = false;
  public isSaveShowInOwner : boolean  = true;
  public isUpdateShowInOwner : boolean  = false;
  public relationFlag : boolean = true;
  public visibilityFlag : boolean  = true;
  public visibilityFlagStamp : boolean = true;
  public visibilityFlagProperty  : boolean = true;
  public transactionStatustList: any;
  public globalInstitution: String = 'ALL';
  public globalPolicy: String = 'ALL';
  public globalTransactionStatus: String = 'ALL';
  // public startDateModel: any = { date: null };
  // [(ngModel)]="startDateModel"
  public houseLoanDetailSubmitted = false;
  public houseLoanOwnerDetailSubmitted = false;
  public globalAddRowIndex: number;
  public globalSelectedAmount: string;
  public testVariable: Array<any> = [];
  public isShowUsageInSave : boolean = true;
  public isShowUsageInUpdate : boolean = false;

  public proofSubmissionId;

  public familyMemberList: any;

  public dropdownSettings: any;
  public ServicesList = [];
  // public dropdownList = [];
  public selectedItems = [];
  public selectedEstablishmentMasterId = [];

  public isRadioButtonDisabled:boolean = true;
  public isTransferValid: boolean = false;
  public isActionForTransfer: boolean = false;
  public isVisibleTable: boolean = false;
  public abc: any[];
  myDate: string;
  selectedLoanTypeIndex: any = -1;
  summaryDetails: any;
  documentRemarkList: any;
  public remarkCount : any;
  editRemarkData: any;
  enteredRemark: any;
  isLoanAddNew:boolean = true;
  isLoanTransfer:boolean = false;
  indexCount: any;
  employeeOwner: boolean = true;
  documentArray: any[] = [];
  viewDocumentName: any;
  viewDocumentType: any;
  public urlArraySummary: any;

  // dropdownSettings: { singleSelection: boolean; idField: string; textField: string; itemsShowLimit: number; allowSearchFilter: boolean; };
  // ServicesList: any;
  constructor(
    private ref: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private Service: MyInvestmentsService,
    private HousingLoanService: HousingloanService,
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
    this.housingLoanFormControl();

    (this.housePropertyLoanDetailList = this.formBuilder.group({
      housePropertyLoanDetailId: new FormControl(0),
      purposeOfLoan: new FormControl(null, Validators.required),
      lenderName: new FormControl(null, Validators.required),
      lenderType: new FormControl(null, Validators.required),
      lenderPANOrAadhar: new FormControl(null,Validators.required),
      loanAccountNumber: new FormControl(null, Validators.required),
      loanAmount: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      preEMIInterestPaid: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),

      loanSanctionedDate: new FormControl(null, Validators.required),
      loanEndDate: new FormControl(null, Validators.required),
      percentageClaimedByEmployee: new FormControl(null, [
        Validators.required,
        Validators.max(100),
        Validators.min(0),
      ]),
      accountStatus: new FormControl(true),
      //loanTransfer: new FormControl(false),

    })),
      (this.HPUsageDetailForm = this.formBuilder.group({
        housePropertyUsageTypeId: new FormControl(0),
        usageType: new FormControl(null, Validators.required),
        fromDate: new FormControl(null, Validators.required),
        toDate: new FormControl(new Date("31-Dec-9999"), Validators.required),
      })),
      (this.HPOwnerDetailForm = this.formBuilder.group({
        housePropertyOwnerDetailId: new FormControl(0),
        familyMemberInfoId: new FormControl(0),
        ownerName: new FormControl(null, Validators.required),
        otherOwnerName: new FormControl(null),
        firstTimeHomeBuyer: new FormControl('true', Validators.required),
        relationship: new FormControl({ value:'', disabled: true }),
      })),
      // this.HPUsageDetailForm.push(this.formBuilder.group({
      //   housePropertyUsageTypeId : [0],
      //   usageType: [''],
      //   fromDate: [''],
      //   toDate : [''],
      // }));

      (this.frequencyOfPaymentList = [
        { label: 'Monthly', value: 'Monthly' },
        { label: 'Quarterly', value: 'Quarterly' },
        { label: 'Half-Yearly', value: 'Halfyearly' },
        { label: 'Yearly', value: 'Yearly' },
        { label: 'As & When', value: 'As & When' },
      ]);

    this.usageTypeList = [
      { label: 'Self – Occupied', value: 'selfOccupied' },
      { label: 'Let Out', value: 'letOut' },
      { label: 'Deemed Let Out', value: 'deemedLetOut' },
    ];

    this.purposeOfLoanList = [
      {
        label: 'Acquisition or Construction',
        value: 'Acquisition or construction',
      },
      {
        label: 'Repair or Renewal or Reconstruction Of The House',
        value: 'Repair or renewal or reconstruction of the house',
      },
    ];

    this.lenderTypeList = [
      { label: 'Financial Institution', value: 'financial' },

      { label: 'Employer', value: 'employer' },
      { label: 'Others', value: 'others' },
    ];
    this.masterPage();
    this.addNewRowId = 0;
    this.hideRemarkDiv = false;
    this.hideRemoveRow = false;
    this.globalAddRowIndex1 = 0;
    this.isClear = false;
    this.isCancel = false;
    this.receiptAmount = this.numberFormat.transform(0);
    this.globalAddRowIndex = 0;
    this.globalSelectedAmount = this.numberFormat.transform(0);
  }

  public ngOnInit(): void {

    //this.visibilityFlag = true;
    console.log("visibilityFlag", this.visibilityFlag);
    //  this.addOwner(0);
    // this.startDateModel = '31-dec-9999';
    this.housingLoanForm.get('country').setValue('India');
    //if(this.houseLoanF.housePropertyMasterId.value != 0)
    //this.isLoanTransfer = false;
    // Business Financial Year API Call
    // this.Service.getBusinessFinancialYear().subscribe((res) => {
    //   this.financialYearStart = res.data.results[0].fromDate;
    // });
    // this.dropdownSettings = {
    //   singleSelection: false,
    //   idField: 'familyMemberInfoId',
    //   textField: 'name',
    //   itemsShowLimit: 2,
    //   allowSearchFilter: true,
    // };


    this.Service.getCountryList().subscribe((res) => {
      this.countriesList = res.data.results.filter(e => e == "India");
    });

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
      console.log('Employee Adddress', this.empoyeeAddressList);

      console.log(' Adddress typr', this.employeeAddressType);
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

    if (this.housePropertyMasterIds != undefined || this.housePropertyMasterIds != null) {
      const input = this.housePropertyMasterIds;
      // console.log("edit", input)
      // this.editMaster(input);
      // console.log('editMaster policyNo', input);
      this.editMaster(input.housePropertyMasterId);
      console.log('editMaster policyNo', input.policyNo);
    }

    // -------------- Family Member List API call ---------------------------
    this.Service.getFamilyInfo().subscribe((res) => {
      this.familyMemberGroup = res.data.results;
      console.log('familyMemberName::', res);
      res.data.results.forEach((element) => {
        const obj = {
          label: element.familyMemberName,
          value: element.familyMemberName,
        };
        this.familyMemberName.push(obj);
      });
    });   

    // // Family Member List API call
    // this.Service.getFamilyInfo().subscribe((res) => {
    //   let familyMember = [];
    //   this.familyMemberList = res.data.results;
    //    res.data.results.forEach((element) => {
    //     const obj = {
    //       familyMemberInfoId: element.familyMemberInfoId,
    //       familyMemberName: element.name,
    //       relation: element.relationship,
    //     };
    //       if (element.relation !== 'Brother' || element.relation !== 'Sister') {
    //         let familyNameWithRelation =
    //           element.familyMemberName + '(' + element.relation + ')';
    //         familyMember.push({
    //           familyMemberInfoId: element.familyMemberInfoId,
    //           name: familyNameWithRelation,
    //         });
    //         // console.log('family List', this.dropdownList);
    //       }
    //       const data = {
    //         label: 'All',
    //         value: 'All',
    //       };

    //       this.dropdownList = [];
    //       this.dropdownList.push(data);
    //     });

    //     const data = {
    //       label: 'All',
    //       value: 'All',
    //     };

    //     this.dropdownList = [];
    //     this.dropdownList.push(data);

    //     this.dropdownList = familyMember;
    //     console.log('dropdownList::', this.dropdownList);
    //   });

  }

  get houseLoanF() {
    return this.housingLoanForm.controls;
  }

  get housePropertyLoanList() {
    return this.housePropertyLoanDetailList.controls;
  }

  get HPUsageDetailF() {
    return this.HPUsageDetailForm.controls;
  }

  get HPOwnerDetailF() {
    return this.HPOwnerDetailForm.controls;
  }

  onCheckboxSelect(checkboxValue) {
    this.loanTaken = true;
    if (checkboxValue == 'false') {
      this.loanTaken = false;
    }
  }

  // get pfArray() {
  //   return this.f.pfFormArray as FormArray;
  // }
  // get housePropertyLoanDetailList() { return this.f.housePropertyLoanDetailList as FormArray; }
  // get HPUsageDetailForm() { return this.housingLoanForm.get('HPUsageDetailForm') as FormArray; }

  get housePropertyOwnerForm() {
    return this.housingLoanForm.get('HPOwnerDetailForm')['controls'];
  }

  get housePropertyUsageForm() {
    return this.housingLoanForm.get('HPUsageDetailForm')['controls'];
  }

  //Form Intialisatin

  housingLoanFormControl() {
    this.housingLoanForm = this.formBuilder.group({
      housePropertyMasterId: new FormControl(0),
      propertyName: new FormControl(null, Validators.required),
      possessionDate: new FormControl(null, Validators.required),
      copyFrom: new FormControl(null, Validators.required),
      address1: new FormControl(null, Validators.required),
      address2: new FormControl(null, Validators.required),
      address3: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      pinCode: new FormControl(null, Validators.required),
      state: new FormControl(
        { value: null, disabled: true },
        Validators.required
      ),
      city: new FormControl({
        value: null, disabled: true
      }),
      town: new FormControl(null),
      village: new FormControl(null),
      // stampDutyRegistrationDate: new FormControl(null),
      // stampDutyRegistrationAmount: new FormControl(null),
      // propertyRegistrationValue: new FormControl(null),

      stampDutyRegistrationDate: new FormControl(null, Validators.required),
      stampDutyRegistrationAmount: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      propertyRegistrationValue: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      proofSubmissionId: new FormControl(''),
      remark: new FormControl(null),
    });
  }
  public cancelOwnerType() {
    this.HPOwnerDetailForm.reset();
    this.isSaveShowInOwner = true,
      this.isUpdateShowInOwner = false
  }

  public addOwnerType(action) {
    this.isSaveShowInOwner = true,
      this.isUpdateShowInOwner = false,
      // houseLoanOwnerDetailSubmitted
      this.houseLoanOwnerDetailSubmitted = true;
    // housePropertyLoanDetailList  HPUsageDetailForm HPOwnerDetailForm
    if (this.HPOwnerDetailForm.invalid) {
      // console.log("HPOwnerDetailForm",this.HPOwnerDetailForm);
      return;
    }
    if(this.HPOwnerDetailForm.value.ownerName == "other")
     this.HPOwnerDetailForm.get('ownerName').patchValue(this.HPOwnerDetailForm.value.otherOwnerName);

    this.globalAddRowIndex1 -= 1;
    // this.alertService.sweetalertWarning('Please enter PAN details');

    // console.log("houseLoanOwnerTypeList",this.houseLoanOwnerTypeList);
    // console.log("HPOwnerDetailForm", this.HPOwnerDetailForm.value.ownerName);
    /* if(this.houseLoanOwnerTypeList.find(
      (owner) => owner.ownerName === this.HPOwnerDetailForm.value.ownerName))
      {
      this.alertService.sweetalertWarning('Owner name is already exists.');
      return;
    }

    if(  this.masterGridData.find((element) => {
      return element.housePropertyOwerDetailList.find((item) => {

        return item.ownerName === this.HPOwnerDetailForm.value.ownerName;
      });
    })) {
      this.alertService.sweetalertWarning('Owner name is already exists.');
      return;
    } */


    // this.houseLoanOwnerTypeList.find(
    //   (owner) =>
    //   owner.ownerName === this.HPOwnerDetailForm.value.ownerName
    // )
    console.log("this.HPOwnerDetailForm.value", this.HPOwnerDetailForm)

    if(action == "Update"){
      const index = this.houseLoanOwnerTypeList.findIndex(
        (land) =>
          land.housePropertyOwnerDetailId ===
          this.HPOwnerDetailForm.value.housePropertyOwnerDetailId
      );
      this.houseLoanOwnerTypeList[index] = this.HPOwnerDetailForm.getRawValue();
    }
    else {
    if (
      this.HPOwnerDetailForm.value.housePropertyOwnerDetailId === 0 ||
      this.HPOwnerDetailForm.value.housePropertyOwnerDetailId === null
    ) {
      this.HPOwnerDetailForm.value.housePropertyOwnerDetailId = this.globalAddRowIndex1;
      //  console.log("this.HPOwnerDetailForm.value", this.HPOwnerDetailForm.value)
      this.houseLoanOwnerTypeList.push(this.HPOwnerDetailForm.getRawValue());
      // console.log("houseLoanOwnerTypeList", this.houseLoanOwnerTypeList)

    } else {
      
      this.houseLoanOwnerTypeList = []
      console.log("this.HPOwnerDetailForm.value: "+ JSON.stringify(this.HPOwnerDetailForm.value))

      this.houseLoanOwnerTypeList.push(this.HPOwnerDetailForm.getRawValue());

      // this.houseLoanOwnerTypeList[index].rentAmount = this.housingLoanForm.get(
      //   'HPOwnerDetailForm'
      // ).value.rentAmount;


    }
    if(this.houseLoanOwnerTypeList.length == 1 && this.isloanTaken){
      this.housePropertyLoanDetailList.get('percentageClaimedByEmployee').patchValue(100);
      this.housePropertyLoanDetailList.get('percentageClaimedByEmployee').disable();
      this.housePropertyLoanDetailList.get('percentageClaimedByEmployee').updateValueAndValidity();
    }
    else {
      this.housePropertyLoanDetailList.get('percentageClaimedByEmployee').reset();
      this.housePropertyLoanDetailList.get('percentageClaimedByEmployee').enable();
      this.housePropertyLoanDetailList.get('percentageClaimedByEmployee').updateValueAndValidity();
    }
  }
    /* this.houseLoanOwnerTypeList.housePropertyOwnerDetailId  = this.globalAddRowIndex1;    */
    console.log('houseLoanOwnerTypeList', this.houseLoanOwnerTypeList);
    //  this.HPOwnerDetailForm.get('houseLoanOwnerTypeList').reset();
    this.HPOwnerDetailForm.reset();
    this.houseLoanOwnerDetailSubmitted = false;
    this.HPOwnerDetailForm.patchValue({
      firstTimeHomeBuyer:'true',
    });
    //this.HPOwnerDetailForm.reset();

  }

  public cancelUsageType() {
    this.HPUsageDetailForm.reset();
    this.isShowUsageInSave = true;
    this.isShowUsageInUpdate = false;
  }

  public addUsageType(action) {
    /*    console.log('event::', this
    .HPUsageDetailForm); */
    
    this.houseLoanDetailSubmitted = true;
    if (this.HPUsageDetailForm.invalid) {
      return;
    }
    this.isShowUsageInSave = true;
    this.isShowUsageInUpdate = false;
    
    
    this.globalAddRowIndex1 -= 1;
    if( action == "Add" && this.houseLoanUsageTypeList.find(
      (usage) =>
        usage.usageType == this.HPUsageDetailForm.value.usageType
    )){
      this.alertService.sweetalertWarning('Usage Type is already exists');
      return;
    }

    //   if( this.houseLoanUsageTypeList.find(
    //     (usagelet) =>
    //     usagelet.usageType.letOut === this.HPUsageDetailForm.value.usageType.letOut
    //   )){
    //   this.alertService.sweetalertWarning('Usage Type is already exists');
    //   return;
    // }


    // { label: 'Self – Occupied', value: 'selfOccupied' },
    // { label: 'Let Out', value: 'letOut' },
    // { label: 'Deemed Let Out', value: 'deemedLetOut' },


    if (
      this.HPUsageDetailForm.value.housePropertyUsageTypeId === 0 ||
      this.HPUsageDetailForm.value.housePropertyUsageTypeId === null
    ) {
      this.HPUsageDetailForm.value.housePropertyUsageTypeId = this.globalAddRowIndex1;
      this.houseLoanUsageTypeList.push(this.HPUsageDetailForm.value);
    } else {
      const index = this.houseLoanUsageTypeList.findIndex(
        (land) =>
          land.housePropertyUsageTypeId ===
          this.HPUsageDetailForm.value.housePropertyUsageTypeId
      );
      this.houseLoanUsageTypeList = []
      console.log("this.HPUsageDetailForm.value: "+ JSON.stringify(this.HPUsageDetailForm.value))

      this.houseLoanUsageTypeList.push(this.HPUsageDetailForm.value);
      // this.houseLoanUsageTypeList[index].fromDate = this.housingLoanForm.get(
      //   'HPUsageDetailForm'
      // ).value.fromDate;

      this.houseLoanUsageTypeList[
        index
      ].fromDate = this.HPUsageDetailForm.value.fromDate;

      // this.houseLoanUsageTypeList[index].toDate = this.housingLoanForm.get(
      //   'HPUsageDetailForm'
      // ).value.toDate;

      this.houseLoanUsageTypeList[
        index
      ].toDate = this.HPUsageDetailForm.value.toDate;

      // this.houseLoanUsageTypeList[index].rentAmount = this.housingLoanForm.get(
      //   'HPUsageDetailForm'
      // ).value.rentAmount;

      this.houseLoanUsageTypeList[
        index
      ].rentAmount = this.HPUsageDetailForm.value.rentAmount;
    }
    /* this.houseLoanUsageTypeList.housePropertyUsageTypeId  = this.globalAddRowIndex1;    */
    this.HPUsageDetailForm.reset();
    this.houseLoanDetailSubmitted = false;
  }

  // public removeUsageType(i: number) {
  //   if (i > 0) {
  //     this.HPUsageDetailForm.removeAt(i);

  //   } else {

  //     this.showOwner = false;
  //     console.log('else', this.showOwner);

  //   }
  // }

  public removeOwner(i: number) {
    if (i > 0) {
      (this.housingLoanForm.get('HPOwnerDetailForm') as FormArray).removeAt(i);
    } else {
      this.showOwner = false;
    }
  }

  public cancelLoanDetails() {
    this.housePropertyLoanDetailList.reset();
    //this.isSaveLoan = true;
    this.isUpdateLoan = false;
    this.isActionForTransfer = false;
    this.selectedLoanTypeIndex = -1;
    if(this.loanDetailGridData.length != 0){
      this.isLoanAddNew = false;
      if(this.houseLoanF.housePropertyMasterId.value != 0)
      this.isLoanTransfer = true;
    }else{ 
      this.isLoanAddNew = true;
      if(this.houseLoanF.housePropertyMasterId.value != 0)
      this.isLoanTransfer = false;
    }
    this.editMaxloanDate = new Date(2100,12,31);
    if(this.houseLoanOwnerTypeList.length == 1 && this.isloanTaken){
      this.housePropertyLoanDetailList.get('percentageClaimedByEmployee').patchValue(100);
      this.housePropertyLoanDetailList.get('percentageClaimedByEmployee').disable();
      this.housePropertyLoanDetailList.get('percentageClaimedByEmployee').updateValueAndValidity();
    }
    else {
      //this.housePropertyLoanDetailList.get('percentageClaimedByEmployee').reset();
      this.housePropertyLoanDetailList.get('percentageClaimedByEmployee').enable();
      this.housePropertyLoanDetailList.get('percentageClaimedByEmployee').updateValueAndValidity();
    }
  }

  public addLoanDetails(formDirective: FormGroupDirective) {
    this.loansubmitted = true;
    //this.isSaveLoan = true;
    this.isUpdateLoan = false;
    this.isActionForTransfer = false;
    
    // if(this.housePropertyLoanDetailList.value.lenderType == 'others'){
    //  this.alertService.sweetalertWarning('Please enter PAN details');
    //  return;
    // }


    if(this.housePropertyLoanDetailList.value.lenderType == 'others'){
      if(this.housePropertyLoanDetailList.value.lenderPANOrAadhar == undefined || this.housePropertyLoanDetailList.value.lenderPANOrAadhar == null ){
        this.alertService.sweetalertWarning('Please enter PAN details.');
        return;
      }
    }
    console.log('this.loansubmitted', this.housePropertyLoanDetailList);
    if (this.housePropertyLoanDetailList.invalid) {
      return;
    }

    console.log(this.housePropertyLoanDetailList.getRawValue())
    console.log(this.selectedLoanTypeIndex)

    if (this.selectedLoanTypeIndex > -1) {
      //this.housePropertyLoanDetailList.get('loanTransfer').patchValue(true);
      this.housePropertyLoanDetailList.get('accountStatus').patchValue(true);
      this.loanDetailGridData[this.selectedLoanTypeIndex] = this.housePropertyLoanDetailList.getRawValue();
      console.log(this.loanDetailGridData)
      this.housePropertyLoanDetailList.reset();
      this.loansubmitted = false;
    }
    else {
      this.loanDetailGridData = [];
      //this.housePropertyLoanDetailList.get('loanTransfer').patchValue(true);
      this.housePropertyLoanDetailList.get('accountStatus').patchValue(true);
      this.loanDetailGridData.push(this.housePropertyLoanDetailList.getRawValue());
      this.housePropertyLoanDetailList.reset();
      this.loansubmitted = false;
    }

    this.loanDetailGridData.sort((a, b) => {
      return <any>new Date(b.loanEndDate) - <any>new Date(a.loanEndDate);
    });

    if(this.loanDetailGridData.length != 0){
      this.isLoanAddNew = false;
      if(this.houseLoanF.housePropertyMasterId.value != 0)
      this.isLoanTransfer = true;
    }else{ 
      this.isLoanAddNew = true;
      if(this.houseLoanF.housePropertyMasterId.value != 0)
      this.isLoanTransfer = false;
    }
    this.editMaxloanDate =  new Date(2100,12,31);
    console.log("max fromdate :: ", this.editMaxloanDate);
    //this.housePropertyLoanDetailList.get('percentageClaimedByEmployee').enable();
    if(this.houseLoanOwnerTypeList.length == 1 && this.isloanTaken){
      this.housePropertyLoanDetailList.get('percentageClaimedByEmployee').patchValue(100);
      this.housePropertyLoanDetailList.get('percentageClaimedByEmployee').disable();
      this.housePropertyLoanDetailList.get('percentageClaimedByEmployee').updateValueAndValidity();
    }
    else {
      //this.housePropertyLoanDetailList.get('percentageClaimedByEmployee').reset();
      this.housePropertyLoanDetailList.get('percentageClaimedByEmployee').enable();
      this.housePropertyLoanDetailList.get('percentageClaimedByEmployee').updateValueAndValidity();
    }
  }

  public trackloanDetail(index: number, loanDetail: any) {
    return loanDetail.lenderName;
  }

  public getPermanentAddressFromPIN() {
    console.log(this.housingLoanForm.get('pinCode').value);
    if (this.housingLoanForm.get('pinCode').value.length < 6) {
      this.housingLoanForm.get('state').setValue('');
      this.housingLoanForm.get('city').setValue('');
      this.housingLoanForm.get('town').setValue('');
      this.housingLoanForm.get('village').setValue('');
    }
    if (
      this.housingLoanForm.get('pinCode').value.length === 6 &&
      this.housingLoanForm.get('country').value === 'India'
    ) {
      this.Service.getAddressFromPIN(
        this.housingLoanForm.get('pinCode').value
      ).subscribe(
        (res) => {
          console.log(res);
          this.housingLoanForm.get('state').setValue(res.data.results[0].state);
          this.housingLoanForm.get('city').setValue(res.data.results[0].city);
          this.housingLoanForm.get('town').setValue(res.data.results[0].town);
          this.housingLoanForm.get('village').setValue(res.data.results[0].village);
        },
        (error: any) => {
          this.alertService.sweetalertError(error.error.status.messsage);
        }
      );
    }
  }

  public checkRegistrationDateValid() {
    const stampDutyPaymentDate_ = this.housingLoanForm.get(
      'stampDutyRegistrationDate'
    ).value;
    console.log('stampDutyPaymentDate_', stampDutyPaymentDate_);
    if (stampDutyPaymentDate_ !== null) {
      this.stampDutyDateValid = false;
    }
    let userDate = this.datePipe.transform(
      this.housingLoanForm.controls.stampDutyRegistrationDate.value,
      'yyyy-MM-dd'
    );
    console.log("userDate", userDate);
    // let possessionDateSet = '2016-03-31';
    let stampDutyRegAprSixteenStartDate = '2016-04-01';
    let stampDutyRegAprSixteenEndDate = '2017-03-31';
    let stampDutyRegAprTwentyStartDate = '2020-04-01';
    let stampDutyRegMarTwentyEndEndDate = '2022-03-31';
    let stampDutyRegMarCurrentFinancialDate = '2021-04-01';

    console.log("visibilityFlagProperty", this.visibilityFlagProperty);

    if ((userDate >= stampDutyRegAprSixteenStartDate && userDate <= stampDutyRegAprSixteenEndDate) || (userDate >= stampDutyRegAprTwentyStartDate && userDate <= stampDutyRegMarTwentyEndEndDate)) {
      this.visibilityFlagProperty = true;
      // this.visibilityFlagStamp = true;
    }
    else{
      this.visibilityFlagProperty = false;
    }
    if (userDate >= stampDutyRegMarCurrentFinancialDate && userDate <= stampDutyRegMarTwentyEndEndDate)  {
      this.visibilityFlagStamp = true;
    }
    else{
      this.visibilityFlagStamp = false;
    }
    //  if (userDate < stampDutyRegAprSixteenStartDate && userDate > stampDutyRegAprSixteenEndDate) {
    //   this.visibilityFlagProperty = true;
    //   }
    //  if (userDate >= stampDutyRegAprTwentyStartDate && userDate <= stampDutyRegMarTwentyEndEndDate){
    //   this.visibilityFlagProperty = false;
    //   this.visibilityFlagStamp = false;
    //  }
    //   if (userDate < stampDutyRegAprTwentyStartDate && userDate > stampDutyRegMarTwentyEndEndDate){
    //     this.visibilityFlagProperty = true;
    //     this.visibilityFlagStamp = false;
    //   }
    if(this.visibilityFlag)
    {
      this.housingLoanForm.get('stampDutyRegistrationAmount').clearValidators();
      this.housingLoanForm.get('stampDutyRegistrationAmount').updateValueAndValidity();
    }
    else{
      this.housingLoanForm.get('stampDutyRegistrationAmount').setValidators([Validators.required,Validators.pattern('^[0-9]*$')])
      this.housingLoanForm.get('stampDutyRegistrationAmount').updateValueAndValidity();
    }
    console.log("visibilityFlagProperty", this.visibilityFlagProperty);
  }

  // ------------------------------------Master----------------------------

  // Policy End Date Validations with Policy Start Date
  // setPolicyEndDate() {
  //   console.log('PPF START DATE', this.housingLoanForm.value.policyStartDate);
  //   this.policyMinDate = this.housingLoanForm.value.policyStartDate;
  //   const policyStart = this.datePipe.transform(this.housingLoanForm.get('policyStartDate').value, 'yyyy-MM-dd');
  //   const policyEnd = this.datePipe.transform(this.housingLoanForm.get('policyEndDate').value, 'yyyy-MM-dd');
  //   this.minFormDate = this.policyMinDate;

  //   console.log('PPF MIN DATE', this.housingLoanForm.value.policyStartDate);
  //   if (policyStart > policyEnd) {
  //       this.housingLoanForm.controls.policyEndDate.reset();
  //   }
  //   this.housingLoanForm.patchValue({
  //       fromDate: this.policyMinDate,
  //   });

  //   this.setPaymentDetailToDate();
  //   //this.setAccountMaxDatePPF(this.policyMinDate);
  // }

  // Policy End Date Validations with Current Finanacial Year
  public checkFinancialYearStartDateWithPolicyEnd() {
    const policyEnd = this.datePipe.transform(
      this.housingLoanForm.get('policyEndDate').value,
      'yyyy-MM-dd'
    );
    const financialYearStartDate = this.datePipe.transform(
      this.financialYearStart,
      'yyyy-MM-dd'
    );
    const policyStart = this.datePipe.transform(
      this.housingLoanForm.get('policyStartDate').value,
      'yyyy-MM-dd'
    );

    console.log(policyStart);
    if (policyEnd < financialYearStartDate) {
      this.alertService.sweetalertWarning(
        'Policy End Date should be greater than or equal to Current Financial Year : ' +
        this.financialYearStart
      );
      this.housingLoanForm.controls.policyEndDate.reset();
    } else {
      this.housingLoanForm.patchValue({
        toDate: this.housingLoanForm.value.policyEndDate,
      });
      this.maxFromDate = this.housingLoanForm.value.policyEndDate;
    }

    if (policyEnd < policyStart) {
      this.alertService.sweetalertWarning(
        'Policy End Date should be greater than Policy Start Date : '
      );
      this.housingLoanForm.controls.policyEndDate.reset();
    } else {
      this.housingLoanForm.patchValue({
        toDate: this.housingLoanForm.value.policyEndDate,
      });
      this.maxFromDate = this.housingLoanForm.value.policyEndDate;
    }
  }

  // Payment Detail To Date Validations with Payment Detail From Date
  public setPaymentDetailToDate() {
    this.paymentDetailMinDate = this.housePropertyLoanDetailList.value.loanSanctionedDate;
    const from = this.datePipe.transform(
      this.housePropertyLoanDetailList.get('loanSanctionedDate').value,
      'yyyy-MM-dd'
    );
    const to = this.datePipe.transform(
      this.housePropertyLoanDetailList.get('loanEndDate').value,
      'yyyy-MM-dd'
    );
    // if (from > to) {
    //   this.housePropertyLoanDetailList.controls.loanEndDate.reset();
    // }
  }

  //-------------- Payment Detail To Date Validations with Current Finanacial Year ----------------
  checkFinancialYearStartDateWithPaymentDetailToDate() {
    const to = this.datePipe.transform(
      this.housePropertyLoanDetailList.get('loanEndDate').value,
      'yyyy-MM-dd'
    );
    // const financialYearStartDate = this.datePipe.transform(
    //   this.financialYearStart,
    //   'yyyy-MM-dd'
    // );
    // if (to < financialYearStartDate) {
    //   //this.alertService.sweetalertWarning("To Date can't be earlier that start of the Current Financial Year");
    //   this.alertService.sweetalertWarning(
    //     "Policy End Date can't be earlier that start of the Current Financial Year"
    //   );

    // }
    // this.housePropertyLoanDetailList.controls.loanEndDate.reset();
  }

  public setAccountMaxDatePPF(policyMinDate: Date) {
    console.log('PPFMinDATE', policyMinDate);
    const maxppfAccountDate = policyMinDate;
    if (maxppfAccountDate !== null || maxppfAccountDate === undefined) {
      this.policyMaxDatePPF = new Date(
        maxppfAccountDate.setFullYear(maxppfAccountDate.getFullYear() + 21)
      );
    }

    console.log('PPFMAXDATE', this.policyMaxDatePPF);
  }

  // // Payment Detail To Date Validations with Current Finanacial Year
  // public checkFinancialYearStartDateWithPaymentDetailToDate() {
  //   const to = this.datePipe.transform(
  //     this.housingLoanForm.get('toDate').value,
  //     'yyyy-MM-dd'
  //   );
  //   const financialYearStartDate = this.datePipe.transform(
  //     this.financialYearStart,
  //     'yyyy-MM-dd'
  //   );
  //   if (to < financialYearStartDate) {
  //     this.alertService.sweetalertWarning(
  //       'To Date should be greater than or equal to Current Financial Year : ' +
  //         this.financialYearStart
  //     );
  //     this.housingLoanForm.controls.toDate.reset();
  //   }
  // }

  // Get Master Page Data API call
  public masterPage() {
    this.HousingLoanService.getHousingLoanMaster().subscribe((res) => {
      console.log('masterGridData::', res);
      this.masterGridData = res.data.results;
      this.masterGridData.forEach((element) => {
        element.possessionDate = new Date(element.possessionDate);
        element.stampDutyRegistrationDate = new Date(
          element.stampDutyRegistrationDate
        );
        element.fromDate = new Date(element.fromDate);
        element.toDate = new Date(element.toDate);
        element.loanSanctionedDate = new Date(element.loanSanctionedDate);
        element.loanEndDate = new Date(element.loanEndDate);
        element.housePropertyOwerDetailList.forEach(element => {
          if(element.firstTimeHomeBuyer)
          {
            this.HPOwnerDetailForm.get('firstTimeHomeBuyer').disable();
            this.HPOwnerDetailForm.get('firstTimeHomeBuyer').updateValueAndValidity();
          }
        });
      });
    });
  }

  // Post Master Page Data API call
  public addMaster(formData: any, formDirective: FormGroupDirective): void {
    this.submitted = true;
    this.houseLoanOwnerTypeList.length;
    this.houseLoanUsageTypeList.length;
    this.loanDetailGridData.length;

    for (let i = 0; i <= this.documentPassword.length; i++) {
      if(this.documentPassword[i] != undefined){
        let remarksPasswordsDto = {};
        remarksPasswordsDto = {
          "documentType": "Back Statement/ Premium Reciept",
          "documentSubType": "",
          "remark": this.remarkList[i],
          "password": this.documentPassword[i]
        };
        this.documentDataArray.push(remarksPasswordsDto);
      }
    }
    if(this.visibilityFlagStamp == true) {
    for (let i = 0; i <= this.stampDutydocumentPassword.length; i++) {
      if(this.stampDutydocumentPassword[i] != undefined){
        let remarksPasswordsDto = {};
        remarksPasswordsDto = {
          "documentType": "Back Statement/ Premium Reciept",
          "documentSubType": "",
          "remark": this.stampDutyremarkList[i],
          "password": this.stampDutydocumentPassword[i]
        };
        this.stampDutydocumentDataArray.push(remarksPasswordsDto);
      }
    }
  }
    for (let i = 0; i <= this.loandocumentPassword.length; i++) {
      if(this.loandocumentPassword[i] != undefined){
        let remarksPasswordsDto = {};
        remarksPasswordsDto = {
          "documentType": "Back Statement/ Premium Reciept",
          "documentSubType": "",
          "remark": this.loanremarkList[i],
          "password": this.loandocumentPassword[i]
        };
        this.loandocumentDataArray.push(remarksPasswordsDto);
      }
    }
    for (let i = 0; i <= this.possessiondocumentPassword.length; i++) {
      if(this.possessiondocumentPassword[i] != undefined){
        let remarksPasswordsDto = {};
        remarksPasswordsDto = {
          "documentType": "Back Statement/ Premium Reciept",
          "documentSubType": "",
          "remark": this.possessionremarkList[i],
          "password": this.possessiondocumentPassword[i]
        };
        this.possessiondocumentDataArray.push(remarksPasswordsDto);
      }
    }

    // housingLoanForm housePropertyLoanDetailList HPUsageDetailForm HPOwnerDetailForm
    // houseLoanF  housePropertyLoanList HPUsageDetailF HPOwnerDetailF
    let invalidSubmission = false;    

    if (this.houseLoanOwnerTypeList.length == 0) {
      if (this.HPOwnerDetailForm.invalid) {
        invalidSubmission = true;
        this.alertService.sweetalertWarning('Please enter house owner details.');
        return;
      }
    }

    if (this.houseLoanUsageTypeList.length == 0) {
      if (this.HPUsageDetailForm.invalid) {
        invalidSubmission = true;
        this.alertService.sweetalertWarning(
          'Please enter house loan usage details.'
        );
        return;
      }
    }

    if(this.loanTaken == true){ 
    if (this.loanDetailGridData.length == 0) {
      invalidSubmission = true;
      if (this.housePropertyLoanDetailList.invalid) {
        this.alertService.sweetalertWarning('Please enter loan taken details.');
        return;
      }
    }
  }

    if (this.housingLoanForm.invalid) {
      invalidSubmission = true;
      this.alertService.sweetalertWarning('Please enter property details.');
      return;
    }

    // return the control if any on of the form is invalid
    if (invalidSubmission) {
      return;
    }
    this.houseLoanOwnerTypeList.forEach((element)=>{
      if(element.relationship == "Self")
      {
        this.employeeOwner = false;
      }
    });
    if(this.employeeOwner && this.housingLoanForm.get('housePropertyMasterId').value == 0){
      this.alertService.sweetalertWarning("Please Include yourself as owner.");
      return;
    }
    if(
      (this.propertyIndex.length === 0 || 
        this.visibilityFlagStamp? this.stampDutyRegistration.length === 0 : false ) &&
      (this.loanSanctionLetter.length === 0 ||
        this.possessionLetter.length === 0) &&
      (this.urlArray.length === 0 ||
        this.stampDutyUrlArray.length === 0) &&
      (this.loanSanctionUrlArray.length === 0 ||
        this.possessionUrlArray.length === 0)
    )
    {
      this.alertService.sweetalertWarning(
        'Please upload all mandatory documents.'
      );
      console.log('urlArray.length', this.urlArray.length);
      return;
    } else {
      this.houseLoanOwnerTypeList.forEach((element) => {
        delete element.otherOwnerName;
      })
      //delete this.houseLoanOwnerTypeList[0].otherOwnerName;
      // const data = this.housingLoanForm.getRawValue();
      const data = {
        // property detail propertied goes here
        housePropertyMasterId: this.houseLoanF.housePropertyMasterId.value,
        propertyName: this.houseLoanF.propertyName.value,
        possessionDate: this.houseLoanF.possessionDate.value,
        copyFrom: this.houseLoanF.copyFrom.value,
        address1: this.houseLoanF.address1.value,
        address2: this.houseLoanF.address2.value,
        address3: this.houseLoanF.address3.value,
        country: this.houseLoanF.country.value,
        pinCode: this.houseLoanF.pinCode.value,
        state: this.houseLoanF.state.value,
        city: this.houseLoanF.city.value,
        town: this.houseLoanF.town.value,
        village: this.houseLoanF.village.value,
        stampDutyRegistrationDate: this.houseLoanF.stampDutyRegistrationDate
          .value,
        stampDutyRegistrationAmount: this.houseLoanF.stampDutyRegistrationAmount
          .value,
        propertyRegistrationValue: this.houseLoanF.propertyRegistrationValue
          .value,
        loanTaken: this.loanTaken,
        housePropertyUsageTypeList: this.houseLoanUsageTypeList,
        housePropertyOwnerDetailList: this.houseLoanOwnerTypeList,
        housePropertyLoanDetailList: this.loanDetailGridData,
        propertyIndexRemarkPasswordList: this.documentDataArray,
        stampDutyRegistrationRemarkPasswordList: this.stampDutydocumentDataArray,
        loanSanctionLetterRemarkPasswordList: this.loandocumentDataArray,
        possessionLetterRemarkPasswordList: this.possessiondocumentDataArray,
        remark: this.houseLoanF.remark.value,
      };

      // data.housePropertyLoanDetailList = this.loanDetailGridData;
      console.log('Housing Loan Data::', data);
      this.HousingLoanService.submitHousingLoanMasterData(
        this.propertyIndex,
        this.stampDutyRegistration,
        this.loanSanctionLetter,
        this.possessionLetter,
        data
      ).subscribe((res) => {
        console.log(res);
        if (res.data.results.length > 0) {
          this.masterGridData = res.data.results;
          this.masterGridData.forEach((element) => {
            element.policyStartDate = new Date(element.policyStartDate);
            element.policyEndDate = new Date(element.policyEndDate);
            element.fromDate = new Date(element.fromDate);
            element.toDate = new Date(element.toDate);
            this.alertService.sweetalertMasterSuccess(
              'Record saved successfully.',
              'Go to "Declaration & Actual" page to see Schedule.'
            );
          });
        }
      });
      if(this.isLoanTransfer)
      {
        this.isLoanTransfer = false;
      }
      this.Index = -1;
      formDirective.resetForm();
      this.housingLoanForm.reset();
      this.HPOwnerDetailForm.reset();
      this.HPUsageDetailForm.reset();
      this.housePropertyLoanDetailList.reset();
      this.housePropertyLoanDetailList.get('percentageClaimedByEmployee').enable();
      this.showUpdateButton = false;
      this.isLoanAddNew = true;
      this.loanDetailGridData = [];
      this.houseLoanOwnerTypeList = [];
      this.propertyIndex = [];
      this.urlArray = [];
      this.stampDutyUrlArray = [];
      this.loanSanctionUrlArray = [];
      this.possessionUrlArray = [];
      this.stampDutyRegistration = [];
      this.loanSanctionLetter = [];
      this.possessionLetter = [];
      this.submitted = false;
      this.houseLoanUsageTypeList = [];
      this.loanDetailGridData = [];
      this.isVisibleTable = false;
    }
  }

  public onMasterUpload(
    event: { target: { files: string | any[] } },
    docType: string
  ) {
    console.log('event::', event);
    console.log('docType::', docType);

    // if (event.target.files.length > 0) {
    //   for (const file of event.target.files) {
    //     switch (docType) {
    //       case 'propertyIndex':
    //         this.propertyIndex.push(file);
    //         break;
    //       case 'stampDutyRegistration':
    //         this.stampDutyRegistration.push(file);
    //         break;
    //       case 'loanSanctionLetter':
    //         this.loanSanctionLetter.push(file);
    //         break;
    //       case 'possessionLetter':
    //         this.possessionLetter.push(file);
    //         break;
    //     }
    //   }
    // }


    if (event.target.files.length > 0) {
      for (const file of event.target.files) {
        switch (docType) {
          case 'propertyIndex':
            const data = {
              name: file.name,
            };
            this.urlArray.push(data);
            this.propertyIndex.push(file);
            break;
          case 'stampDutyRegistration':
            const data1 = {
              name: file.name,
            };
            this.stampDutyUrlArray.push(data1);
            this.stampDutyRegistration.push(file);
            break;
          case 'loanSanctionLetter':
            const data2 = {
              name: file.name,
            };
            this.loanSanctionUrlArray.push(data2);
            this.loanSanctionLetter.push(file);
            break;
          case 'possessionLetter':
            const data4 = {
              name: file.name,
            };
            this.possessionUrlArray.push(data4);
            this.possessionLetter.push(file);
            break;
        }
      }
    }
  }
  // Remove HousingLoanMaster Document
  public removeSelectedLicMasterDocument(index: number, docType: string) {
    switch (docType) {
      case 'propertyIndex':
        this.propertyIndex.splice(index, 1);
        break;
      case 'stampDutyRegistration':
        this.stampDutyRegistration.splice(index, 1);
        break;
      case 'loanSanctionLetter':
        this.loanSanctionLetter.splice(index, 1);
        break;
      case 'possessionLetter':
        this.possessionLetter.splice(index, 1);
        break;
    }
  }




  // Family relationship shown on Policyholder selection
  public OnSelectionfamilyMemberGroup() {
    this.visibilityFlagFamily = false;
    this.relationFlag = true;
    // if(this.HPOwnerDetailForm.value.ownerName != undefined || this.HPOwnerDetailForm.value.ownerName != null || this.HPOwnerDetailForm.value.ownerName != "other"){
    if(this.HPOwnerDetailForm.value.ownerName != "other"){
      this.visibilityFlagFamily = false;
      if (this.HPOwnerDetailForm.get('ownerName').value == null) {
        this.HPOwnerDetailForm.get('relationship').setValue(null);
      }
      const toSelect = this.familyMemberGroup.find(
        (c) => c.familyMemberName === this.HPOwnerDetailForm.get('ownerName').value
      );
      this.HPOwnerDetailForm.get('familyMemberInfoId').setValue(toSelect.familyMemberInfoId);
      this.HPOwnerDetailForm.get('relationship').setValue(toSelect.relation);

    }
    if (this.HPOwnerDetailForm.value.ownerName == "other" || this.HPOwnerDetailForm.value.familyMemberInfoId < 0) {
      this.HPOwnerDetailForm.get('familyMemberInfoId').patchValue(-1);
      this.HPOwnerDetailForm.get('relationship').patchValue("other");
      //this.HPOwnerDetailForm.value.relationship = "other";
      //this.HPOwnerDetailForm.value.familyMemberInfoId = -1;
      this.relationFlag = false;
      this.visibilityFlagFamily = true;

    }

    /* if (this.HPOwnerDetailForm.value.familyMemberInfoId !== "other") { */
      if (this.HPOwnerDetailForm.value.ownerName !== "other") {
/*       this.HPOwnerDetailForm.get('ownerName').clearValidators();
      this.HPOwnerDetailForm.get('ownerName').updateValueAndValidity(); */
      this.HPOwnerDetailForm.get('otherOwnerName').clearValidators();
      this.HPOwnerDetailForm.get('otherOwnerName').updateValueAndValidity();
    } else {
      
      this.HPOwnerDetailForm.get('otherOwnerName').setValidators([Validators.required]);
      this.HPOwnerDetailForm.get('otherOwnerName').updateValueAndValidity();
    }

  }

  // // Family relationship shown on Policyholder selection
  // OnSelectionfamilyMemberGroup() {
  //   if (this.HPOwnerDetailForm.get('familyMemberInfoId').value == null) {
  //     this.HPOwnerDetailForm.get('relationship').setValue(null);
  //   }
  //   const toSelect = this.familyMemberGroup.find(
  //     (c) => c.familyMemberName === this.HPOwnerDetailForm.get('familyMemberInfoId').value
  //   );
  //   // this.HPOwnerDetailForm.get('familyMemberInfoId').setValue(toSelect.familyMemberInfoId);
  //   this.HPOwnerDetailForm.get('relationship').setValue(toSelect.relation);
  // }



  // OnSelectionfamilyMemberGroup() {
  //   if (this.form.get('policyholdername').value == null) {
  //     this.form.get('relationship').setValue(null);
  //   }
  //   const toSelect = this.familyMemberGroup.find(
  //     (c) => c.familyMemberName === this.form.get('policyholdername').value
  //   );
  //   this.form.get('familyMemberInfoId').setValue(toSelect.familyMemberInfoId);
  //   this.form.get('relationship').setValue(toSelect.relation);
  // }


  public onSelectAddressType() {
    const toSelectAddress = this.empoyeeAddressList.find(
      (c) => c.addressType === this.housingLoanForm.get('copyFrom').value
    );
    console.log('toSelectAddress', toSelectAddress);
    this.housingLoanForm.get('address1').setValue(toSelectAddress.address1);
    this.housingLoanForm.get('address2').setValue(toSelectAddress.address2);
    this.housingLoanForm.get('address3').setValue(toSelectAddress.address3);
    this.housingLoanForm.get('country').setValue(toSelectAddress.country);
    this.housingLoanForm.get('pinCode').setValue(toSelectAddress.postalCode);
    this.housingLoanForm.get('state').setValue(toSelectAddress.state);
    this.housingLoanForm.get('city').setValue(toSelectAddress.city);
    this.housingLoanForm.get('town').setValue(toSelectAddress.town);
    this.housingLoanForm.get('village').setValue(toSelectAddress.village);
  }

  // on checkPaymentDate
  public checkPaymentDate() {
    const stampDutyPaymentDate = this.housingLoanForm.get(
      'stampDutyRegistrationDate'
    ).value;
    console.log('stampDutyPaymentDate', stampDutyPaymentDate);

    if (stampDutyPaymentDate === null) {
      this.stampDutyDateValid = true;

      console.log(
        'stampDutyRegistrationDate',
        this.housingLoanForm.controls[
          'stampDutyRegistrationDate'
        ].updateValueAndValidity()
      );
      this.alertService.sweetalertWarning(
        'Please enter stamp duty registration date first to enter amount.'
      );
    }
  }

  // On Master Edit functionality
  public editMaster(housePropertyMasterId) {
    this.scrollToTop();
    this.HousingLoanService.getHousingLoanMaster().subscribe((res) => {
      console.log('masterGridData::', res);
      this.masterGridData = res.data.results;
      this.masterGridData.forEach((element) => {
        element.possessionDate = new Date(element.possessionDate);
        element.stampDutyRegistrationDate = new Date(
          element.stampDutyRegistrationDate
        );
        element.fromDate = new Date(element.fromDate);
        element.toDate = new Date(element.toDate);
        element.loanSanctionedDate = new Date(element.loanSanctionedDate);
        element.loanEndDate = new Date(element.loanEndDate);
      });

      const obj = this.findByPolicyNo(housePropertyMasterId, this.masterGridData);
      this.loanDetailGridData = [];
      this.houseLoanUsageTypeList = [];
      this.houseLoanOwnerTypeList = [];
      this.loanDetailGridData = obj.paymentDetails;
      this.housingLoanForm.patchValue(obj);
      (this.loanDetailGridData = obj.housePropertyLoanDetailList),
        (this.houseLoanUsageTypeList = obj.housePropertyUsageTypeList),
        (this.houseLoanUsageTypeList = obj.housePropertyUsageTypeList),
        (this.houseLoanOwnerTypeList = obj.housePropertyOwerDetailList),
        (this.Index = housePropertyMasterId);
      this.showUpdateButton = true;
      this.urlArray = obj.propertyIndex;
      this.stampDutyUrlArray = obj.stampDutyRegistration;
      this.loanSanctionUrlArray = obj.loanSanctionLetter;
      this.possessionUrlArray = obj.possessionLetter;

      this.proofSubmissionId = obj.proofSubmissionId;
      this.isClear = true;
      this.documentArray = [];
      /* if(obj.propertyIndex.length != 0 || obj.loanSanctionLetter.length != 0 
        || obj.possessionLetter.length != 0){ */
          obj.propertyIndex.forEach(element => {
            this.documentArray.push(element);
          });
          obj.loanSanctionLetter.forEach(element => {
            this.documentArray.push(element);
          });
          obj.possessionLetter.forEach(element => {
            this.documentArray.push(element);
          });
        
    
      /* if(obj.stampDutyRegistration.length != 0){ */
        obj.stampDutyRegistration.forEach(element => {
          this.documentArray.push(element);
        });
/*       }
 */     
       this.isVisibleTable = true;
      if(this.loanDetailGridData.length != 0){
        this.isLoanAddNew = false;
        if(this.houseLoanF.housePropertyMasterId.value != 0)
        this.isLoanTransfer = true;
      } else{ 
        this.isLoanAddNew = true;
        if(this.houseLoanF.housePropertyMasterId.value != 0)
        this.isLoanTransfer = false;
      }
      if( this.isUpdateLoan == true)
      {
        this.isUpdateLoan = false;
      }
      // }
      if(this.houseLoanOwnerTypeList.length == 1 && this.isloanTaken){
        this.housePropertyLoanDetailList.get('percentageClaimedByEmployee').patchValue(100);
        this.housePropertyLoanDetailList.get('percentageClaimedByEmployee').disable();
        this.housePropertyLoanDetailList.get('percentageClaimedByEmployee').updateValueAndValidity();
      }
      else {
        //this.housePropertyLoanDetailList.get('percentageClaimedByEmployee').reset();
        this.housePropertyLoanDetailList.get('percentageClaimedByEmployee').enable();
        this.housePropertyLoanDetailList.get('percentageClaimedByEmployee').updateValueAndValidity();
      }
      this.HPOwnerDetailForm.get('firstTimeHomeBuyer').enable();
      this.HPOwnerDetailForm.get('firstTimeHomeBuyer').updateValueAndValidity();
    });
  }

  // Find PolicyNo
  public findByPolicyNo(housePropertyMasterId, masterGridData) {
    return masterGridData.find((x) => x.housePropertyMasterId === housePropertyMasterId);
  }


  // // On Master Edit functionality
  // public editMaster(i: number) {
  //   this.scrollToTop();

  //   this.loanDetailGridData = [];
  //   this.houseLoanUsageTypeList = [];
  //   this.houseLoanOwnerTypeList = [];
  //   this.loanDetailGridData = this.masterGridData[i].paymentDetails;
  //   this.housingLoanForm.patchValue(this.masterGridData[i]);
  //   (this.loanDetailGridData = this.masterGridData[i].housePropertyLoanDetailList),
  //     (this.houseLoanUsageTypeList = this.masterGridData[i].housePropertyUsageTypeList),
  //     (this.houseLoanUsageTypeList = this.masterGridData[i].housePropertyUsageTypeList),
  //     (this.houseLoanOwnerTypeList = this.masterGridData[i].housePropertyOwerDetailList),
  //     (this.Index = i);
  //   this.showUpdateButton = true;
  //   this.urlArray = this.masterGridData[i].propertyIndex;
  //   this.stampDutyUrlArray = this.masterGridData[i].stampDutyRegistration;
  //   this.loanSanctionUrlArray = this.masterGridData[i].loanSanctionLetter;
  //   this.possessionUrlArray = this.masterGridData[i].possessionLetter;

  //   this.proofSubmissionId = this.masterGridData[i].proofSubmissionId;
  //   this.isClear = true;
  //   // }
  // }

  scrollToTop() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();
  }




  //Edit Loan Detail Table
  editLoanDetails(loanDetails, index) {
    //this.isSaveLoan = false;
    this.isLoanAddNew = false;
    if(this.houseLoanF.housePropertyMasterId.value != 0)
    this.isLoanTransfer = false;
    this.isUpdateLoan = true;
    this.selectedLoanTypeIndex = index
    // this.housePropertyLoanDetailList.patchValue(this.loanDetailGridData[i]);
    //editdate
    //this.editMaxloanDate = this.today;
    this.housePropertyLoanDetailList.patchValue({
      housePropertyLoanDetailId: loanDetails.housePropertyLoanDetailId,
      purposeOfLoan: loanDetails.purposeOfLoan,
      lenderName: loanDetails.lenderName,
      lenderType: loanDetails.lenderType,
      lenderPANOrAadhar: loanDetails.lenderPANOrAadhar,
      loanAccountNumber: loanDetails.loanAccountNumber,
      loanAmount: loanDetails.loanAmount,
      preEMIInterestPaid: loanDetails.preEMIInterestPaid,
      loanSanctionedDate: new Date(loanDetails.loanSanctionedDate),
      loanEndDate: new Date(loanDetails.loanEndDate),
      percentageClaimedByEmployee: loanDetails.percentageClaimedByEmployee,
    });
    this.isActionForTransfer = true;
  }

  public editLoanUsageDetails(loanDetail) {
    this.isShowUsageInSave = false;
    this.isShowUsageInUpdate = true;
    // this.agreementDetailsTableList=[];
    console.log('HPUsageDetailForm', this.HPUsageDetailForm);
    this.HPUsageDetailForm.patchValue({
      housePropertyUsageTypeId: loanDetail.housePropertyUsageTypeId,
      usageType: loanDetail.usageType,
      toDate: new Date(loanDetail.toDate),
      fromDate: new Date(loanDetail.fromDate),
    });
    this.isActionForTransfer = true;
  }

  // //edit houseLoanUsageTypeList Changes by Komal
  editLoanOwnerDetail(evt) {
    this.isSaveShowInOwner = false,
      this.isUpdateShowInOwner = true;
      let ownerName;// = evt.ownerName;
      let otherOwnerName;// = evt.relationship;
      if(evt.relationship == 'other')
      {
        otherOwnerName = evt.ownerName;
        ownerName = evt.relationship;
        this.relationFlag = false;
        this.visibilityFlagFamily = true;
      }
      else{
        ownerName = evt.ownerName;
        //ownerName = evt.relationship;
        this.relationFlag = true;
      this.visibilityFlagFamily = false;
      }

    this.HPOwnerDetailForm.patchValue({
      familyMemberInfoId: evt.familyMemberInfoId,
      housePropertyOwnerDetailId: evt.housePropertyOwnerDetailId,
      // firstTimeHomeBuyer: evt.firstTimeHomeBuyer,
      firstTimeHomeBuyer: evt.firstTimeHomeBuyer,
      otherOwnerName: otherOwnerName,
      ownerName: ownerName,
      relationship: evt.relationship
    })
    //this.HPOwnerDetailForm.updateValueAndValidity();
    /* this.houseLoanOwnerTypeList[evt] */
    //this.HPOwnerDetailForm.patchValue(this.houseLoanOwnerTypeList);
  }

  // //edit houseLoanUsageTypeList
  // public editLoanUsageDetails(i: number) {
  //   this.housingLoanForm.get('HPUsageDetailForm').patchValue({
  //     // houseRentalRentDetailId: this.houseLoanUsageTypeList[i].houseRentalRentDetailId,
  //     housePropertyUsageTypeId: this.houseLoanUsageTypeList[i]
  //       .housePropertyUsageTypeId,
  //     usageType: this.houseLoanUsageTypeList[i].usageType,
  //     fromDate: new Date(this.houseLoanUsageTypeList[i].fromDate),
  //     toDate: new Date(this.houseLoanUsageTypeList[i].toDate),
  //   });
  // }

  // //edit houseLoanUsageTypeList
  // public editLoanOwnerDetail(i: number) {
  //   this.housingLoanForm.get('HPOwnerDetailForm').patchValue({
  //     housePropertyOwnerDetailId: this.houseLoanOwnerTypeList[i]
  //       .housePropertyOwnerDetailId,
  //     ownerName: this.houseLoanOwnerTypeList[i].ownerName,
  //     firstTimeHomeBuyer: new Date(
  //       this.houseLoanOwnerTypeList[i].firstTimeHomeBuyer
  //     ),
  //   });
  // }

  // On Edit Cancel
  public cancelEdit() {
    this.housingLoanForm.reset();
    this.housingLoanForm.get('active').setValue(true);
    this.housingLoanForm.get('ecs').setValue(0);
    this.showUpdateButton = false;
    this.loanDetailGridData = [];
    this.houseLoanUsageTypeList = [];
    this.houseLoanOwnerTypeList = [];
    this.isClear = false;
  }

  // On Master Edit functionality
  public viewMaster(i: number) {
    // this.scrollToTop();
    this.loanDetailGridData = this.masterGridData[i].paymentDetails;
    this.houseLoanUsageTypeList = this.masterGridData[i].HPUsageDetailForm;
    this.houseLoanOwnerTypeList = this.masterGridData[i].HPOwnerDetailForm;
    this.housingLoanForm.patchValue(this.masterGridData[i]);
    // console.log(this.housingLoanForm.getRawValue());
    this.Index = i;
    this.showUpdateButton = true;
    const formatedPremiumAmount = this.numberFormat.transform(
      this.masterGridData[i].premiumAmount
    );
    // console.log(`formatedPremiumAmount::`,formatedPremiumAmount);
    this.housingLoanForm.get('premiumAmount').setValue(formatedPremiumAmount);
    this.isCancel = true;
  }

  //Reset form
  resetView() {
    this.HPOwnerDetailForm.reset();
    this.houseLoanOwnerTypeList = [];
    this.HPUsageDetailForm.reset();
    this.houseLoanUsageTypeList = [];
    this.loanDetailGridData = [];
    // this.houseLoanOwnerTypeList = [];
    this.houseLoanUsageTypeList = [];
    this.housingLoanForm.reset();
    this.housePropertyLoanDetailList.get('percentageClaimedByEmployee').enable();
    this.housePropertyLoanDetailList.reset();
    this.loanDetailGridData = [];
    this.propertyIndex = [];
    this.urlArray = [];
    this.stampDutyUrlArray = [];
    this.loanSanctionUrlArray = [];
    this.possessionUrlArray = [];
    this.stampDutyRegistration = [];
    this.loanSanctionLetter = [];
    this.possessionLetter = [];
    this.isVisibleTable = false;
  }
  // On View Cancel
  public cancelView() {
    this.housingLoanForm.reset();
    this.housingLoanForm.get('active').setValue(true);
    this.housingLoanForm.get('ecs').setValue(0);
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

  panAndAadhar() {}

  //  // ---------- For Doc Viewer  -----------------------
  //  public nextDocViewer() {
  //   this.urlIndex = this.urlIndex + 1;
  //   this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
  //     this.urlArray[this.urlIndex].blobURI
  //   );

  //   this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
  //     this.stampDutyUrlArray[this.urlIndex].blobURI
  //   );
  //   this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
  //     this.loanSanctionUrlArray[this.urlIndex].blobURI
  //   );

  //   this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
  //     this.possessionUrlArray[this.urlIndex].blobURI
  //   );

  // }

  // ---------- Next Doc Viewer  -----------------------
  public nextDocViewerPropertyIndex() {
    this.urlIndex = this.urlIndex + 1;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.urlArray[this.urlIndex].blobURI
    );
  }

  // ---------- Next Doc Viewer  -----------------------
  public nextDocViewerStampDuty() {
    this.urlIndex = this.urlIndex + 1;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.stampDutyUrlArray[this.urlIndex].blobURI
    );
  }
  // ---------- Next Doc Viewer  -----------------------
  public nextDocViewerLoanSanction() {
    this.urlIndex = this.urlIndex + 1;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.loanSanctionUrlArray[this.urlIndex].blobURI
    );
  }

  // ---------- Next Doc Viewer  -----------------------
  public nextDocViewerLoanPossession() {
    this.urlIndex = this.urlIndex + 1;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.possessionUrlArray[this.urlIndex].blobURI
    );
  }

  // Previous Doc Viewer
  public previousDocViewerPropertyIndex() {
    this.urlIndex = this.urlIndex - 1;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.urlArray[this.urlIndex].blobURI
    );
  }

  // Previous Doc Viewer StampDuty&Registration Charges
  public previousDocViewerStampDuty() {
    this.urlIndex = this.urlIndex - 1;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.stampDutyUrlArray[this.urlIndex].blobURI
    );
  }

  // Previous Doc Viewer LoanSanctionLetter
  public previousDocViewerLoanSanction() {
    this.urlIndex = this.urlIndex - 1;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.loanSanctionUrlArray[this.urlIndex].blobURI
    );
  }

  // Previous Doc Viewer PossessionLetter
  public previousDocViewerPossession() {
    this.urlIndex = this.urlIndex - 1;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.possessionUrlArray[this.urlIndex].blobURI
    );
  }

  //Document View   Property(Index 2)  StampDuty&Registration Charges  LoanSanctionLetter	PossessionLetter
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

  public docViewer2(template2: TemplateRef<any>, index: any) {
    console.log('---in doc viewer--');
    this.urlIndex = index;

    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.stampDutyUrlArray[this.urlIndex].blobURI
    );
    console.log('urlSafe::', this.urlSafe);
    this.modalRef = this.modalService.show(
      template2,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }

  public docViewer3(template3: TemplateRef<any>, index: any) {
    console.log('---in doc viewer--');
    this.urlIndex = index;

    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.loanSanctionUrlArray[this.urlIndex].blobURI
    );
    console.log('urlSafe::', this.urlSafe);
    this.modalRef = this.modalService.show(
      template3,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }

  public docViewer4(template4: TemplateRef<any>, index: any) {
    console.log('---in doc viewer--');
    this.urlIndex = index;

    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.possessionUrlArray[this.urlIndex].blobURI
    );
    console.log('urlSafe::', this.urlSafe);
    this.modalRef = this.modalService.show(
      template4,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }

  onItemSelect(item: any) {
    console.log(item);
    this.ServicesList.push({
      familyMemberInfoId: item.familyMemberInfoId,
      establishmentCode: item.establishmentCode,
    });
    console.log(item.establishmentCode);
  }

  onItemDeSelect(item: any) {
    let index = this.ServicesList.findIndex(
      (o) => o.establishmentCode == item.establishmentCode
    );
    this.ServicesList.splice(index, 1);
    console.log(this.ServicesList);
  }

  onSelectAll(items: any) {
    console.log(items);
    this.ServicesList = [];
    this.ServicesList = items;
  }
  onDeselectAll(items: any) {
    this.ServicesList = [];
  }

  // OnPossessionDateChange(){
  //   if(this.housingLoanForm.controls.possessionDate = new Date()){}
  //   visibilityFlag = false;
  // }


  // setPolicyEndDate() {
  //   // this.policyMinDate = this.housingLoanForm.value.possessionDate;
  //   Constants.housingLoanDates.stampDutyRegAprSixteenEndDate

  //   const possessionDate = this.datePipe.transform(
  //     this.housingLoanForm.controls.possessionDate.get('2016-03-31').value,
  //     'yyyy-MM-dd'
  //   );
  //   // const policyEnd = this.datePipe.transform(
  //   //   this.form.get('policyEndDate').value,
  //   //   'yyyy-MM-dd'
  //   // );
  //   this.minFormDate = this.policyMinDate;
  //   if (possessionDate > today) {
  //     this.form.controls.policyEndDate.reset();
  //   }
  //   this.form.patchValue({
  //     fromDate: this.policyMinDate,
  //   });

  //   this.setPaymentDetailToDate();
  // }



  OnPossessionDateChange() {
    let userDate = this.datePipe.transform(
      this.housingLoanForm.controls.possessionDate.value,
      'yyyy-MM-dd'
    );
    let possessionDateSet = '2016-03-31';


    // if date is before 31st March 2016 then hide the 3 fields
    this.visibilityFlag = true;
    this.visibilityFlagProperty = true;
    this.visibilityFlagStamp = true;
    if (userDate <= possessionDateSet) {
      this.visibilityFlag = false;
      this.visibilityFlagProperty = false;
      this.visibilityFlagStamp = false;

      this.housingLoanForm.get('stampDutyRegistrationDate').clearValidators();
      this.housingLoanForm.get('stampDutyRegistrationDate').updateValueAndValidity();

      this.housingLoanForm.get('stampDutyRegistrationAmount').clearValidators();
      this.housingLoanForm.get('stampDutyRegistrationAmount').updateValueAndValidity();

      this.housingLoanForm.get('propertyRegistrationValue').clearValidators();
      this.housingLoanForm.get('propertyRegistrationValue').updateValueAndValidity();

    }else {
      this.housingLoanForm.get('stampDutyRegistrationDate').setValidators([Validators.required]);
      this.housingLoanForm.get('stampDutyRegistrationDate').updateValueAndValidity();

      this.housingLoanForm.get('stampDutyRegistrationAmount').setValidators([Validators.required]);
      this.housingLoanForm.get('stampDutyRegistrationAmount').updateValueAndValidity();

      this.housingLoanForm.get('propertyRegistrationValue').setValidators([Validators.required]);
      this.housingLoanForm.get('propertyRegistrationValue').updateValueAndValidity();
    }

  }


  //  onStampDutyDateChange(){
  //   let userDate = this.datePipe.transform(
  //     this.housingLoanForm.controls.possessionDate.value,
  //     'yyyy-MM-dd'
  //   );
  //   // let possessionDateSet = '2016-03-31';
  //   let stampDutyRegAprSixteenStartDate = '2016-04-01';
  //   let stampDutyRegAprSixteenEndDate = '2017-03-31';
  //   let stampDutyRegAprTwentyStartDate = '2020-04-01';
  //   let stampDutyRegMarTwentyEndEndDate = '2022-03-31';

  //   if (userDate >= stampDutyRegAprSixteenStartDate && userDate <= stampDutyRegAprSixteenEndDate) {
  //     this.visibilityFlagProperty = true;
  //     // error message;
  //       // return false;
  //   } else if(userDate >= stampDutyRegAprTwentyStartDate && userDate <= stampDutyRegMarTwentyEndEndDate) {
  //     this.visibilityFlagProperty = true;
  //     this.visibilityFlag = true;
  //     this.visibilityFlagStamp = false;
  //     // error message;
  //       // return false;
  //   } else {

  //   }
  //  }
  public loanTransfer(formDirective: FormGroupDirective) {
    this.loansubmitted = true;
    this.isTransferValid = false;
    if(this.housePropertyLoanDetailList.invalid){
      return;
    }

    /* if(this.loanDetailGridData.length> 0)
    {
      this.isTransferValid = true;
    } */
    
    if (this.housePropertyLoanDetailList.value.lenderType == 'others') {
      if (this.housePropertyLoanDetailList.value.lenderPANOrAadhar == undefined || this.housePropertyLoanDetailList.value.lenderPANOrAadhar == null) {
        this.alertService.sweetalertWarning('Please enter PAN details.');
        return
      }
    }

    //const loanSDate = this.datePipe.transform(this.housePropertyLoanDetailList.value.loanSanctionedDate, 'yyyy-MM-dd');
    const loanEDate = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');

    this.loanDetailGridData.forEach((element) => {
      if(element.accountStatus == true &&  this.datePipe.transform(element.loanEndDate, 'yyyy-MM-dd') >= loanEDate)
      {
        this.isTransferValid = true;
      }
      /* if (this.datePipe.transform(element.loanSanctionedDate, 'yyyy-MM-dd') >= loanSDate &&
        this.datePipe.transform(element.loanSanctionedDate, 'yyyy-MM-dd') <= loanEDate) {
        this.isTransferValid = true;
      }
      if (this.datePipe.transform(element.loanEndDate, 'yyyy-MM-dd') >= loanSDate &&
        this.datePipe.transform(element.loanEndDate, 'yyyy-MM-dd') <= loanEDate) {
        this.isTransferValid = true;
      } */
    });
    
    /* if (this.isActionForTransfer = true && loanEDate >= this.datePipe.transform(Date.now(), 'yyyy-MM-dd')) {
      this.alertService.sweetalertWarning('Please update previous loan end date');
      return
    } */
    console.log("valid status -- ");
    console.log(this.isTransferValid);
    console.log(this.loanDetailGridData);
    if (this.isTransferValid) {
      this.alertService.sweetalertWarning('Please update previous loan end date');
      return
    }
   
      //this.housePropertyLoanDetailList.get('loanTransfer').patchValue(true);
      this.housePropertyLoanDetailList.get('accountStatus').patchValue(true);

      const index = this.loanDetailGridData.findIndex(
        (land) =>
          land.accountStatus === true
      );
      if(index >-1)
      {
        //this.loanDetailGridData[index].loanTransfer = false;
        this.loanDetailGridData[index].accountStatus = false;
      }
      

      this.loanDetailGridData.push(this.housePropertyLoanDetailList.getRawValue());
      //this.housePropertyLoanDetailList.reset();
      this.loansubmitted = true;
      //this.isSaveLoan = true;
      if(this.loanDetailGridData.length != 0){
        this.isLoanAddNew = false;
        if(this.houseLoanF.housePropertyMasterId.value != 0)
        this.isLoanTransfer = true;
      }else{ 
        this.isLoanAddNew = true;
        if(this.houseLoanF.housePropertyMasterId.value != 0)
        this.isLoanTransfer = false;
      }
      this.isUpdateLoan = false;
      this.isActionForTransfer = false;

      this.loanDetailGridData.sort((a, b) => {
        return <any>new Date(b.loanEndDate) - <any>new Date(a.loanEndDate);
      });
      this.maxFromDate = new Date(2100,12,31);
    
  }
  public remarkModal(
    templateViewer: TemplateRef<any>,    
    masterId,
    summary, count
  ) {
    this.enteredRemark = null;
    this.summaryDetails = summary;
    this.indexCount = count;
    this.Service.getHouseLoanMasterRemarkList(
      masterId,
    ).subscribe((res) => {
    this.documentRemarkList  = res.data.results[0];
    this.remarkCount = res.data.results[0].length;
    });
  
    this.modalRef = this.modalService.show(
      templateViewer,
      Object.assign({}, { class: 'gray modal-s' })
    );
  }

  public onChangeDocumentRemark(transIndex, event) { 
    this.editRemarkData =  event.target.value;
    if(this.transactionDetail.length != 0)
   this.transactionDetail[0].housePropertyTransactionList[transIndex].remark =  event.target.value;
  
  }
  
  onSaveRemarkDetails(transIndex){
   
    const data ={
      "transactionId": 0,
      "masterId":this.summaryDetails.housePropertyMasterId,
      "employeeMasterId":this.summaryDetails.employeeMasterId?this.summaryDetails.employeeMasterId:0,
      "section":"House",
      "subSection":"Loan",
      "remark":this.editRemarkData,
      "proofSubmissionId":this.summaryDetails.proofSubmissionId,
      "role":"Employee",
      "remarkType":"Master"

    };
    this.Service
    .postLicMasterRemark(data)
    .subscribe((res) => {
      if(res.data.results.length) {
        this.alertService.sweetalertMasterSuccess(
          'Remark Saved Successfully.',
          '',
        );
        this.masterGridData[transIndex].bubbleRemarkCount = res.data.results[0].bubbleRemarkCount;
        //this.transactionDetail[0].housePropertyTransactionList[transIndex].bubbleRemarkCount =  res.data.results[0].bubbleRemarkCount;
        this.modalRef.hide();
      } else{
        this.alertService.sweetalertWarning("Something Went Wrong");
      } 
    });
}
onResetRemarkDetails(){
  this.enteredRemark = null;
}
/* get documentArray(){
  if(this.propertyIndex.length != 0 || this.loanSanctionLetter.length != 0 
    || this.possessionLetter.length != 0){
      this.documentArrayList.push(this.propertyIndex);
      this.documentArrayList.push(this.loanSanctionLetter);
      this.documentArrayList.push(this.possessionLetter);  
    }

  if(this.stampDutyRegistration.length != 0){
    this.documentArrayList.push(this.stampDutyRegistration);
  }
return this.documentArrayList;
} */
public docViewerSummary(template3: TemplateRef<any>, index: any, data: any) {
  console.log('---in doc viewer--');
  this.urlIndex = index;
  // this.urlIndex = 0;
  this.viewDocumentName = data.documentName;
  this.viewDocumentType = data.documentType
  this.urlArraySummary = data;
  
console.log('urlIndex::' , this.urlIndex);
  console.log('urlArray::', this.urlArray);
  this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
    this.urlArraySummary.blobURI
  );
  console.log('urlSafe::', this.urlSafe);
  this.modalRef = this.modalService.show(
    template3,
    Object.assign({}, { class: 'gray modal-xl' })
  );
}
}