import { DatePipe, DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import jspdf from 'jspdf';
import * as _html2canvas from 'html2canvas';
const html2canvas: any = _html2canvas;

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  Input,
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
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Console } from 'console';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { tr } from 'date-fns/locale';
import { element } from 'protractor';

@Component({
  selector: 'app-houserentmaster',
  templateUrl: './houserentmaster.component.html',
  styleUrls: ['./houserentmaster.component.scss'],
})
export class HouserentmasterComponent implements OnInit {
  public houseRentform: FormGroup;

  @Input() public houseRentalMasterIds: any;



  rentAgreementdocumentPassword = [];
  rentAgreementremarkList = [];
  LandlordPANdocumentPassword = [];
  LandlordPANremarkList = [];


  rentAgreementdocumentDataArray = [];
  LandlordPANdocumentDataArray = [];


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

  public rentMinDate: Date;
  public rentMaxDate: Date;
  public minDate:Date;
  public maxDate:Date;

  public rentFromMinDate: Date;

  public agreementMinDate: Date;

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
  public declarationOfLandlordDocument: File[] = [];
  public rentAgreementDocument: File[] = [];
  public receiptNumber: number;
  public receiptAmount: string;
  public receiptDate: Date;
  public selectedInstitution: string;
  public policyDuplicate: string;
  public sumDeclared: any;
  public enableCheckboxFlag2: any;
  public greaterDateValidations: boolean;
  public AgreementMinDate: Date;
  public policyMaxDatePPF: Date;
  public paymentDetailMinDate: Date;
  public paymentDetailMaxDate: Date;
  public AgreementtoDate: Date;
  public AgreementtoDate1: Date;
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
  public today = new Date();
  public toShowPanDeclr: boolean;
  public toShowTemp1: boolean;
  public toShowTemp2: boolean;

  public policyMinDate: any;
  public total = 0;
  public amountpantotal = 12;

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
  btn: boolean;
  toShowAddBtn: boolean;
  public rentToDate: Date;
  public rentFromDate: Date;
  public agreeFromDate: Date;
  public agreeToDate: Date;
  public monthlyRent: any;
  summaryDetails: any;
  indexCount: any;
  selectedremarkIndex: any;
  documentRemarkList: any;
  remarkCount: any;
  editRemarkData: any;
  enteredRemark: string;
  iconCount: number;
  address1: any;
  address2: any;
  address3: any;
  state: any;
  city: any;
  isMetro: boolean;
  isNonMetro: boolean;
  familyList: any;
  declrName: Date;
  dateList: Array<any> = [];
  agreementDateList: Array<any> = [];
  setMaxDate: any;
  toRentDate: Date;
  fromRentDate: Date;

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
  ) {
    this.houseRentform = this.formBuilder.group({
      /*   ---------------------------Add houseRentalMaster Post----------------- */
      houseRentMaster: this.formBuilder.group({
        houseRentalMasterId: new FormControl(0),
        propertyName: new FormControl(null, Validators.required),
        copyFrom: new FormControl(null, Validators.nullValidator),
        address1: new FormControl(null, Validators.required),
        address2: new FormControl(null, Validators.required),
        address3: new FormControl(null, Validators.required),
        country: new FormControl(null, Validators.required),
        pinCode: new FormControl(null, Validators.required),
        state: new FormControl(null, Validators.required),
        city: new FormControl(null, Validators.required),
        village: new FormControl(null),
        metroCity: new FormControl(null, Validators.nullValidator),
        proofSubmissionId: new FormControl(''),
        transactionStatus: new FormControl(''),
        remark: new FormControl(''),
        bubbleRemarkCount: new FormControl(0),

      }),

      landLordDetailList: this.formBuilder.group({
        houseRentalLandLordDetailId: new FormControl(0),
        houseRentalMasterId: new FormControl(''),
        name: new FormControl(null, Validators.required),
        address: new FormControl(null, Validators.required),
        landLordPan: new FormControl('', Validators.nullValidator),
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
        houseRentalMasterId: new FormControl(0),
        fromDate: new FormControl(null, Validators.required),
        toDate: new FormControl(null, Validators.required),
        remark: new FormControl(null, Validators.nullValidator),
      }),

      /*   rentDetailList: new FormArray([]) */

      rentDetailList: this.formBuilder.group({
        houseRentalRentDetailId: new FormControl(0),
        houseRentalMasterId: new FormControl(0),
        fromDate: new FormControl(null, Validators.required),
        toDate: new FormControl(null, Validators.required),
        rentAmount: new FormControl(null, [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
        ]),
        financialYear: new FormControl(null),
        remark: new FormControl(null)
        /*       rentAmount: new FormControl(null, Validators.required), */
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
    this.btn = false;
    this.toShowPanDeclr = false;
    this.showUpdateButton = false;
    this.toShowAddBtn = true;
    this.isMetro = false;
    this.isNonMetro = false;
    console.log('houseAgreementMasterForm::', this.houseAgreementMasterForm);
    this.Service.getCountryList().subscribe((res) => {
      this.countriesList = res.data.results;
      this.houseRentform.get('houseRentMaster').get('country').setValue('India');
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
    });

    if (
      this.houseRentalMasterIds != undefined ||
      this.houseRentalMasterIds != null
    ) {
      const input = this.houseRentalMasterIds;
      this.editHouseRentMaster(input.houseRentalMasterId);
      console.log('editMaster policyNo', input.policyNo);
    }
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



  get houseAgreementMasterForm() {
    return this.houseRentform.get('agreementDetailList')['controls'];
  }

  /*  get houseAgreementMasterForm() { return this.houseRentform.get('agreementDetailList') as FormArray; } */

  get landRentDetailForm() {
    return this.houseRentform.get('rentDetailList')['controls'];
  }

  /*  get rentDetailList() { return this.houseRentform.get('rentDetailList') as FormArray; } */

  public addOwner(type) {
    console.log('event::', this.landLordDetailForm);
    this.landlordDetailsSubmitted = true;
    if (this.houseRentform.get('landLordDetailList').invalid) {
      console.log(this.houseRentform.get('landLordDetailList').invalid);
      return;
    }
    this.globalAddRowIndex -= 1;

    console.log(' in add this.globalAddRowIndex::', this.globalAddRowIndex);

    console.log(
      'houseRentalLandLordDetailId::',
      this.houseRentform.get('landLordDetailList').value
        .houseRentalLandLordDetailId
    );

    // this.landLordDetailTableList.forEach((element) => {
    //     if (
    //       element.landLordPan ===
    //         this.houseRentform.get('landLordDetailList').value.landLordPan &&
    //       (this.houseRentform.get('landLordDetailList').value
    //         .houseRentalLandLordDetailId === 0 ||
    //         this.houseRentform.get('landLordDetailList').value
    //           .houseRentalLandLordDetailId != null )
    //     ) {
    //       this.isDuplicatpan = true;
    //       this.alertService.sweetalertWarning(
    //         'This Pan Number Currently Present Please Check The Pan Number.'
    //       );
    //       console.log(this.isDuplicatpan);
    //     }
    // });

    //test
    this.landLordDetailTableList.forEach((element) => {
      console.log(element.landLordPan, this.houseRentform.get('landLordDetailList').value.landLordPan)
      console.log(element.houseRentalLandLordDetailId, this.houseRentform.get('landLordDetailList').value.houseRentalLandLordDetailId)
      if (this.houseRentform.get('landLordDetailList').value.landLordPan != null) {
        if (element.houseRentalLandLordDetailId != this.houseRentform.get('landLordDetailList').value.houseRentalLandLordDetailId) {
          if (element.landLordPan === this.houseRentform.get('landLordDetailList').value.landLordPan) {
            this.isDuplicatpan = true;
            this.alertService.sweetalertWarning(
              'This Pan Number Currently Present Please Check The Pan Number.'
            );
            //console.log(this.isDuplicatpan);
          }
        }
      }
      // alert(element.landLordPan)
      // if(element.landLordPan != '' || element.landLordPan != undefined ||element.landLordPan != null){

      // }

    });



    console.log('isDuplicatpan::', this.isDuplicatpan);
    if (this.isDuplicatpan) {
      this.isDuplicatpan = false;
      return;
    }

    /* ======Share Of Total Rent========= */
    if (type == 'add') {
      this.total = 0;
      this.total += this.houseRentform.get('landLordDetailList').value.percentageShareOfRent;
    } else {
      console.log("update")
      this.total = 0
      // console.log(JSON.stringify(this.houseRentform.value))
      let percentageShareOfRent
      this.landLordDetailTableList.forEach((element, index) => {
        // console.log("element update is: "+ JSON.stringify(element))
        if (element.houseRentalLandLordDetailId == this.houseRentform.get('landLordDetailList').value.houseRentalLandLordDetailId) {
          percentageShareOfRent = element.percentageShareOfRent
          element.percentageShareOfRent = 0
        }
        this.total = this.total + element.percentageShareOfRent
        // console.log("toallllllllllll: " + JSON.stringify(this.total) , percentageShareOfRent)
      })
      this.total = this.total + this.houseRentform.get('landLordDetailList').value.percentageShareOfRent

      //  this.houseRentform.get('landLordDetailList').value.percentageShareOfRent.set(percentageShareOfRent)
      // console.log("total isssssssssss: " + JSON.stringify(this.total))
    }


    this.landLordDetailTableList.forEach((element) => {


      /*  if(element.percentageShareOfRent === this.houseRentform.get('landLordDetailList').value.percentageShareOfRent) */
      if (
        this.houseRentform.get('landLordDetailList').value
          .houseRentalLandLordDetailId === 0 ||
        this.houseRentform.get('landLordDetailList').value
          .houseRentalLandLordDetailId === null
      ) {
        this.total = this.total + element.percentageShareOfRent;
        console.log('two::', this.total);
      }
    });
    // console.log(this.total + ' qwertyui ' + edittotal);
    if (this.total > 100) {
      this.alertService.sweetalertWarning(
        'This % Share Of Total Rent : Please Check Total Rent 100%.'
      );
      return;
    }
    if (
      (this.houseRentform.get('landLordDetailList').value
        .houseRentalLandLordDetailId === 0 ||
        this.houseRentform.get('landLordDetailList').value
          .houseRentalLandLordDetailId === null) &&
      !this.isDuplicatpan &&
      this.total <= 100 && (this.landLordDetailTableList.length < 2)
    ) {
      this.houseRentform.get(
        'landLordDetailList'
      ).value.houseRentalLandLordDetailId = this.globalAddRowIndex;

      this.landLordDetailTableList.push(
        this.houseRentform.get('landLordDetailList').value
      );
    } else {
      console.log(this.houseRentform.get('landLordDetailList').value);
      console.log(this.landLordDetailTableList);
      const index = this.landLordDetailTableList.findIndex(
        (land) =>
          land.houseRentalLandLordDetailId ===
          this.houseRentform.get('landLordDetailList').value
            .houseRentalLandLordDetailId
      );
      console.log(index);
      this.landLordDetailTableList[index].name =
        this.houseRentform.get('landLordDetailList').value.name;
      this.landLordDetailTableList[index].address =
        this.houseRentform.get('landLordDetailList').value.address;
      this.landLordDetailTableList[index].landLordPan =
        this.houseRentform.get('landLordDetailList').value.landLordPan;
      this.landLordDetailTableList[index].percentageShareOfRent =
        this.houseRentform.get(
          'landLordDetailList'
        ).value.percentageShareOfRent;
    }


    console.log("this.total: " + this.total)
    if (this.total !== 100) {
      this.alertService.sweetalertWarning(
        ' Please Fill Rent 100%.'
      );
    }
    /* this.landLordDetailTableList.houseRentalLandLordDetailId  = this.globalAddRowIndex;    */
    console.log('landLordDetailTableList', this.landLordDetailTableList);
    this.houseRentform.get('landLordDetailList').reset();
    this.landlordDetailsSubmitted = false;
    this.monthRentAmount();
    this.btn = false;
    this.showUpdateButton = false;
    this.toShowAddBtn = true;

    this.houseRentService.getFamilyInfo().subscribe((res) => {
      console.log(res);
      this.familyList = res.data.results;
      this.familyList.forEach((element) => {
        if (element.relation === "Self") {
          this.declrName = element.familyMemberName;
          console.log("familyMemberName ", this.declrName);
        }
      });
    })

  }



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


    for (let i = 0; i <= this.rentAgreementdocumentPassword.length; i++) {
      if (this.rentAgreementdocumentPassword[i] != undefined) {
        let remarksPasswordsDto = {};
        remarksPasswordsDto = {
          "documentType": "Back Statement/ Premium Reciept",
          "documentSubType": "",
          "remark": this.rentAgreementremarkList[i],
          "password": this.rentAgreementdocumentPassword[i]
        };
        this.rentAgreementdocumentDataArray.push(remarksPasswordsDto);
      }
    }
    for (let i = 0; i <= this.LandlordPANdocumentPassword.length; i++) {
      if (this.LandlordPANdocumentPassword[i] != undefined) {
        let remarksPasswordsDto = {};
        remarksPasswordsDto = {
          "documentType": "Back Statement/ Premium Reciept",
          "documentSubType": "",
          "remark": this.LandlordPANremarkList[i],
          "password": this.LandlordPANdocumentPassword[i]
        };
        this.LandlordPANdocumentDataArray.push(remarksPasswordsDto);
      }
    }

    console.log("rentDetailList:::::", this.houseRentform.get('rentDetailList').value);
    // let invalidSubmission = false;
    console.log('Houserentform', this.houseRentform);
    // if(!this.houseRentform.get('rentDetailList').invalid)
    // {
    // //  invalidSubmission = true;
    //   console.log("rentDetailList:::::----------",this.houseRentform.get('rentDetailList').value.rentAmount * 12);
    //   if(this.houseRentform.get('rentDetailList').value.rentAmount > 8333 && (this.declarationOfLandlordDocument.length === 0 ||
    //   this.declarationOfLandlordDocumentDetail.length === 0))
    //   {
    //     this.alertService.sweetalertWarning(
    //       'PAN NOT AVAILABLE. Upload Landloard PAN Deatils.'
    //     ); 
    //     return;
    //   }

    // }

    /*   if (this.total !== 100) {
        invalidSubmission = true;
        this.alertService.sweetalertWarning(
          ' Landlord Details % Share Of Total Rent Please Fill  100%.'
        ); 
        return;    
      }
       */
    if (this.houseRentform.get('houseRentMaster').invalid) {
      this.alertService.sweetalertWarning(
        'Please Enter House Details.'
      );
      return;
    }
    // if (this.landLordDetailTableList.length === 0) {
    //   if (this.houseRentform.invalid) {
    //     this.alertService.sweetalertWarning('Please enter House details.');
    //   }
    //   return;
    // }
    /*   if (this.houseRentform.get('houseRentMaster').invalid) {
      this.alertService.sweetalertWarning('Please Enter Rent taken details');
      return;
    } */

    if (this.landLordDetailTableList.length === 0) {
      //  console.log('landLordDetailTableList',this.landLordDetailTableList.length );
      this.alertService.sweetalertWarning(
        'Please Enter LandLord Details.'
      );
      return;
    }
    //Agreement details are not compulsary as per discussion with Rakesh Sir on 07/01/2022

    // if (
    //   this.houseRentform.get('agreementDetailList').invalid &&
    //   this.agreementDetailsTableList.length === 0
    // ) {
    //   this.agreementDetailssubmitted = true;
    //   this.alertService.sweetalertWarning(
    //     'Please Enter Agreement Details.'
    //   );

    //   console.log(this.houseRentform.get('agreementDetailList').invalid);
    //   return;
    // }
    
    if (
      this.houseRentform.get('rentDetailList').invalid &&
      this.RentDetailTableList.length === 0
    ) {
      this.alertService.sweetalertWarning(
        'Please Enter Rent Details'
      );

      console.log(this.houseRentform.get('rentDetailList').invalid);
      return;
    }
    //Agreement Date Validation
    // this.agreementDateList=[]
    // console.log("mastergridDate",this.masterGridData)
    // if(this.masterGridData.length!=0){
    //   this.masterGridData.forEach((element)=>{
    //     this.agreementDateList.push(element.agreementDetailList[0].toDate)
    //     this.agreementDateList.push(element.agreementDetailList[0].fromDate)
    //   })

    // }
    //Rent Date Validation
      this.dateList=[];
      console.log("masterGridData",this.masterGridData.length)
      if(this.masterGridData.length!=0){
      this.masterGridData.forEach((element)=>{
        this.dateList.push(element.rentDetailList[0].toDate)
        this.dateList.push(element.rentDetailList[0].fromDate)
      })
      console.log('dateList::', this.dateList);
      this.maxDate = Math.max.apply(null, this.dateList)
      this.minDate = Math.min.apply(null, this.dateList)
      console.log("maxDate",this.datePipe.transform(this.maxDate, "dd-MMM-yyyy"))
      console.log("minDate",this.datePipe.transform(this.minDate, "dd-MMM-yyyy"))
      this.fromRentDate = this.houseRentform.get('rentDetailList').value.fromDate;
    this.toRentDate=this.houseRentform.get('rentDetailList').value.toDate;
    console.log("FromRentDate",this.fromRentDate.getTime())
    console.log("toRentDate",this.toRentDate.getTime())
    console.log("minDate",new Date(this.minDate).getTime())
    console.log("maxDate",new Date(this.maxDate).getTime())
  
  
    if(this.fromRentDate.getTime() <= new Date(this.maxDate).getTime()){
      this.alertService.sweetalertWarning(
        'Date Already Exist Enter New Date'
      );
      return;
    }
  }
    //console.log("rentAgreementDocumentDetail", this.rentAgreementDocumentDetail)
    //console.log("this.houseAgreementMasterForm.fromDate.value",this.houseAgreementMasterForm.fromDate.value)
    if ((this.houseAgreementMasterForm.fromDate.value != null ||this.houseAgreementMasterForm.fromDate.value != undefined) && this.rentAgreementDocumentDetail.length >= 1  ) {
      this.alertService.sweetalertWarning(
        'Please Attach Rent Agreement'
      );
      return;
    }
    console.log(this.declarationOfLandlordDocument.length);
    console.log("iconCount",this.iconCount)
    if(this.iconCount >= 1 && this.declarationOfLandlordDocument.length == 0 && this.declarationOfLandlordDocumentDetail.length == 0 ){
      this.alertService.sweetalertWarning(
        'Please Attach Landlord Declaration Form'
      );
      return;
    }




    // console.log("rentDetailList:::::----------",this.houseRentform.get('rentDetailList').value.rentAmount);

    // if (
    //   ( this.rentAgreementDocument.length === 0) &&
    //   (this.rentAgreementDocumentDetail.length === 0 ) )
    //  {
    //   this.alertService.sweetalertWarning(
    //     'Please Upload All Mandatitory Documents.'
    //   );

    //   return;
    // } else {

    const data = this.houseRentform.getRawValue();

    /*   data.housePropertyLoanDetailList = this.loanDetailGridData; */
    data.landLordDetailList = this.landLordDetailTableList;
    data.rentAgreementRemarkPasswordList = this.rentAgreementdocumentDataArray,
      data.declarationOfLandlordRemarkPasswordList = this.LandlordPANdocumentDataArray,
      console.log(this.houseRentform.get('agreementDetailList').value);

    if (
      this.houseRentform.get('agreementDetailList').invalid ||
      this.agreementDetailsTableList.length !== 0
    ) {
      this.agreementDetailsTableList = [];
      let obj={
          fromDate: null,
          houseRentalAgreementDetailId: 0,
          houseRentalMasterId: 0,
          remark: null,
          toDate: null
        }
        this.agreementDetailsTableList.push(obj);
        data.agreementDetailList = this.agreementDetailsTableList;
      //data.agreementDetailList = this.houseRentform.get('agreementDetailList').value;
    } 
    else if (!this.houseRentform.get('agreementDetailList').invalid) {
      this.agreementDetailsTableList = [];
      // let obj={
      //   fromDate: null,
      //   houseRentalAgreementDetailId: 0,
      //   houseRentalMasterId: 0,
      //   remark: null,
      //   toDate: null
      // }
      this.agreementDetailsTableList.push(
        this.houseRentform.get('agreementDetailList').value
      );
      console.log(
        'agreementDetailsTableList::',
        this.agreementDetailsTableList
      );
      data.agreementDetailList = this.agreementDetailsTableList;
    }
    console.log(
      ':agreementDetailList:',
      this.houseRentform.get('agreementDetailList').value
        .houseRentalAgreementDetailId
    );

    console.log(
      'agreementDetailList value ::',
      this.houseRentform.get('agreementDetailList').value
        .houseRentalAgreementDetailId
    );
    console.log('agreementDetailsTableList', this.agreementDetailsTableList);
    this.houseRentform.get('agreementDetailList').reset();

    //data.rentDetailList = this.RentDetailTableList[0];
    /*  data.declarationOfLandlordDocument= this.declarationOfLandlordDocument; */
    /*    data.rentAgreementDocument= this.rentAgreementDocument; */

    data.landLordDetailList.forEach((element) => {
      if (element.houseRentalLandLordDetailId < 0) {
        element.houseRentalLandLordDetailId = 0;
      }
    });
    //
    this.RentDetailTableList = [];
    this.RentDetailTableList.push(
      this.houseRentform.get('rentDetailList').value
    );
    console.log(
      'RentDetailTableList::',
      this.RentDetailTableList
    );
    data.rentDetailList = this.RentDetailTableList;
    //
    console.log('Housing Rent Data::', data);
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
    this.agreementDetailsTableList = [];
    this.landLordDetailTableList = [];
    this.RentDetailTableList = [];
    this.declarationOfLandlordDocumentDetail = [];
    this.rentAgreementDocumentDetail = [];
    this.rentAgreementdocumentDataArray = [];
    this.LandlordPANdocumentDataArray = [];
    this.LandlordPANremarkList = [];
    this.LandlordPANdocumentPassword = [];
    this.rentAgreementremarkList = [];
    this.rentAgreementdocumentPassword = [];

    // }
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
    //this.checkMetroCity(toSelectAddress.postalCode);
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
  /* 
 .................... Rent Details validation.............................. */
  getAgreementRent2From() {
    console.log(
      ':this.houseAgreementMasterForm.toDate:',
      this.houseAgreementMasterForm.toDate.value
    );
    this.rentMaxDate = this.houseAgreementMasterForm.toDate.value;
    this.AgreementtoDate > this.houseAgreementMasterForm.toDate.value;
  }
  getAgreementFrom() {
    console.log(
      ':this.houseAgreementMasterForm.fromDate:',
      this.houseAgreementMasterForm.fromDate.value
    );
    this.rentMinDate = this.houseAgreementMasterForm.fromDate.value;
  }

  /* ....................rentTodate  validation.............................. */
  rentTodate() {
    this.rentFromMinDate = this.landRentDetailForm.fromDate.value;
    // console.log(this.masterGridData);
    // this.masterGridData.forEach((element)=>{
    //   this.dateList.push(element.rentDetailList[0].toDate)
    // })
    // console.log('dateList::', this.dateList);
    // this.maxDate = Math.max.apply(null, this.dateList)
    // console.log("maxDate",this.datePipe.transform(this.maxDate, "dd-MMM-yyyy"))
    // if(this.rentFromMinDate>this.maxDate){
    //   this.setMaxDate=this.rentFromMinDate;
    // }else{
    //   this.setMaxDate=this.maxDate;
    // }
    // console.log("setMaxDate",this.datePipe.transform(this.setMaxDate, "dd-MMM-yyyy"))
  }

  // Date Validation
//   setDateValidation(){
//     this.dateList=[];
//     console.log("masterGridData",this.masterGridData.length)
//     if(this.masterGridData.length!=0){
//     this.masterGridData.forEach((element)=>{
//       this.dateList.push(element.rentDetailList[0].toDate)
//       this.dateList.push(element.rentDetailList[0].fromDate)
//     })
//     console.log('dateList::', this.dateList);
//     this.maxDate = Math.max.apply(null, this.dateList)
//     this.minDate = Math.min.apply(null, this.dateList)
//     console.log("maxDate",this.datePipe.transform(this.maxDate, "dd-MMM-yyyy"))
//     console.log("minDate",this.datePipe.transform(this.minDate, "dd-MMM-yyyy"))
//     this.fromRentDate = this.houseRentform.get('rentDetailList').value.fromDate;
//   this.toRentDate=this.houseRentform.get('rentDetailList').value.toDate;
//   console.log("FromRentDate",this.fromRentDate.getTime())
//   console.log("toRentDate",this.toRentDate.getTime())
//   console.log("minDate",new Date(this.minDate).getTime())
//   console.log("maxDate",new Date(this.maxDate).getTime())


//   if(this.fromRentDate.getTime() <= new Date(this.maxDate).getTime()){
//     this.alertService.sweetalertWarning(
//       'Date Already Exist Enter New Date'
//     );
//   }
// }
// }
  /* ---------------------------editLandlordDetails---------RentDetailTableList-------------- */
  public editLandlordDetails(i: number) {
    /* this.landLordDetailForm.patchValue(this.landLordDetailTableList[i]); */
    console.log('landLordDetailTableList', this.landLordDetailTableList);
    console.log(i);
    this.showUpdateButton = true;
    this.toShowAddBtn = false;
    this.btn = true;
    this.houseRentform.get('landLordDetailList').patchValue({
      houseRentalLandLordDetailId:
        this.landLordDetailTableList[i].houseRentalLandLordDetailId,
      name: this.landLordDetailTableList[i].name,
      remark: this.landLordDetailTableList[i].remark,
      address: this.landLordDetailTableList[i].address,
      landLordPan: this.landLordDetailTableList[i].landLordPan,
      percentageShareOfRent:
        this.landLordDetailTableList[i].percentageShareOfRent,
    });
  }

  public editRentDetails(i:number,data){
    console.log(data)
    let fromdate = new Date(data.fromDate)
    let toDate = new Date(data.toDate)
    this.rentMaxDate = new Date('31/12/9999');

    console.log('toDate',toDate)
    console.log(fromdate)
    this.houseRentform.get('rentDetailList').patchValue({
      houseRentalRentDetailId:this.RentDetailTableList[i].houseRentalRentDetailId,
      fromDate:fromdate,
      toDate: toDate,
      rentAmount:this.RentDetailTableList[i].rentAmount,
    })

    this.monthRentAmount()
  }

  /* ---------------------------editAgreementDetails----------------------- */
  public editAgreementDetails(i: number) {
    // this.agreementDetailsTableList=[];
    console.log('agreementDetailsTableList', this.agreementDetailsTableList);
    this.houseRentform.get('agreementDetailList').patchValue({
      houseRentalAgreementDetailId:
        this.agreementDetailsTableList[i].houseRentalAgreementDetailId,
      houseRentalMasterId:
        this.agreementDetailsTableList[i].houseRentalMasterId,
      fromDate: new Date(this.agreementDetailsTableList[i].fromDate),
      toDate: new Date(this.agreementDetailsTableList[i].toDate),
      remark: this.agreementDetailsTableList[i].remark,
    });
  }
  /* ---------------------------------Summery edit----------Edit Master-------------------------------- */
  // On Master Edit functionality
  public editHouseRentMaster(houseRentalMasterId) {
    this.scrollToTop();
    console.log('houseRentalMasterId:::', houseRentalMasterId);

    this.houseRentService.getHousingRentMaster().subscribe((res) => {
      console.log('masterGridData::', res);

      this.masterGridData = res.data.results;
      this.masterGridData.forEach((element) => {
        if (element.possessionDate !== null) {
          element.possessionDate = new Date(element.possessionDate);
        }
      });
      const obj = this.findByPolicyNo(houseRentalMasterId, this.masterGridData);
      console.log('obj::...........', obj);
      console.log('masterGridData::...........', this.masterGridData);
      this.declarationOfLandlordDocument = [];
      this.rentAgreementDocument = [];
      this.agreementDetailsTableList = [];

      this.declarationOfLandlordDocumentDetail = [];
      this.rentAgreementDocumentDetail = [];
      /*  this.agreementDetailList=[]; */
      /*     if (this.masterGridData[i].frequency === 'As & When') { */
      console.log('landLordDetailTableList', obj.landLordDetailList);
      console.log('agreementDetailsTableList', obj.agreementDetailList);
      console.log('RentDetailTableList', obj.rentDetailList);
      console.log('houseRentMaster', obj.houseRentMaster);

      this.houseRentform.get('houseRentMaster').patchValue({
        houseRentalMasterId: obj.houseRentMaster.houseRentalMasterId,
        propertyName: obj.houseRentMaster.propertyName,
        copyFrom: obj.houseRentMaster.copyFrom,
        address1: obj.houseRentMaster.address1,
        address2: obj.houseRentMaster.address2,
        address3: obj.houseRentMaster.address3,
        country: obj.houseRentMaster.country,
        pinCode: obj.houseRentMaster.pinCode,
        state: obj.houseRentMaster.state,
        city: obj.houseRentMaster.city,
        village: obj.houseRentMaster.village,
        metroCity: obj.houseRentMaster.metroCity,
        proofSubmissionId: obj.houseRentMaster.proofSubmissionId,
        // this.form.get('proofSubmissionId').setValue(this.masterGridData[i].proofSubmissionId;
      });
      console.log('RentDetailTableList............', obj.rentDetailList);
      console.log('rentDetailList............', obj.rentDetailList);

      this.landLordDetailTableList = obj.landLordDetailList;

      /* ......Agreement Record........... */
      this.agreementDetailsTableList = obj.agreementDetailList;
      let fromDate
      let toDate
      if(this.agreementDetailsTableList[0].fromDate == ''|| this.agreementDetailsTableList[0].fromDate == null){
        fromDate =''
      }else{
        fromDate =new Date(
          this.agreementDetailsTableList[0].fromDate
        )
      }
      if(this.agreementDetailsTableList[0].toDate == ''|| this.agreementDetailsTableList[0].toDate == null){
        toDate =''
      }else{
        toDate =new Date(
          this.agreementDetailsTableList[0].toDate
        )
      }
      console.log("agreementDetailsTableList:------------:", this.agreementDetailsTableList)
      this.houseRentform.get('agreementDetailList').patchValue({
        houseRentalAgreementDetailId:
          this.agreementDetailsTableList[0]
            .houseRentalAgreementDetailId,
        houseRentalMasterId:
          this.agreementDetailsTableList[0]
            .houseRentalMasterId,
        fromDate:fromDate,
        toDate:toDate,
        remark:
          this.agreementDetailsTableList[0]
            .remark,
      });
      this.houseRentform.get('rentDetailList').reset();
      /*   ......Rent Record........... */
      this.RentDetailTableList = obj.rentDetailList;
      console.log("RentDetailTableList:----------*******--:", this.RentDetailTableList)

      this.houseRentform.get('rentDetailList').patchValue({
        houseRentalRentDetailId:
          this.RentDetailTableList[0]
            .houseRentalRentDetailId,
        houseRentalMasterId:
          this.RentDetailTableList[0]
            .houseRentalMasterId,
        // fromDate: new Date(
        //   this.RentDetailTableList[0].fromDate
        // ),
        // toDate: new Date(
        //   this.RentDetailTableList[0].toDate
        // ),
        // rentAmount:
        //   this.RentDetailTableList[0]
        //     .rentAmount,
      });

      console.log('documentInformationList', obj.documentInformationList);

      obj.documentInformationList.forEach((documentInformation) => {
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
          const data1 = { name: documentInformation.fileName };
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
      });
      this.Index = houseRentalMasterId;
      /*     this.proofSubmissionId = obj.proofSubmissionId; */
      this.isClear = true;
    });
  }

  // Find PolicyNo
  public findByPolicyNo(houseRentalMasterId, masterGridData) {
    return masterGridData.find(
      (x) => x.houseRentMaster.houseRentalMasterId === houseRentalMasterId
    );
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
  /*   Declaration of Landlord PAN 1*/
  openForm12BModal(template1: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template1,
      Object.assign({}, { class: 'gray modal-xl' })
    );
    this.rentFromDate = this.landRentDetailForm.fromDate.value;
    this.rentToDate = this.landRentDetailForm.toDate.value;
    this.agreeFromDate = this.houseAgreementMasterForm.fromDate.value;
    this.agreeToDate = this.houseAgreementMasterForm.toDate.value;
    this.monthlyRent = this.houseRentform.get('rentDetailList').value.rentAmount;
    console.log("rentFromDate", this.rentFromDate);
    console.log("rentToDate", this.rentToDate);
    console.log("agreeFromDate", this.agreeFromDate);
    console.log("agreeToDate", this.agreeToDate);

  }
  /*   Declaration of Landlord PAN 2 */
  openForm12BModal2(template2: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template2,
      Object.assign({}, { class: 'gray modal-xl' })
    );
    this.rentFromDate = this.houseRentform.get('rentDetailList').value.fromDate;
    this.rentToDate = this.houseRentform.get('rentDetailList').value.toDate;
    this.agreeFromDate = this.houseRentform.get('agreementDetailList').value.fromDate;
    this.agreeToDate = this.houseRentform.get('agreementDetailList').value.fromDate;
    this.monthlyRent = this.houseRentform.get('rentDetailList').value.rentAmount;
  }


  /* =================pdf======================== */
  download() {
    console.log('hi');

    let data = document.getElementById('htmlData');
    html2canvas(data).then((canvas) => {
      console.log(canvas);
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      var contentDataURL = canvas.toDataURL('image/png');
      // A4 size page of PDF
      var pdf = new jspdf('landscape', 'pt', 'a4');
      var width = pdf.internal.pageSize.getWidth()*2;
      var height = pdf.internal.pageSize.getHeight();
      var position = 0;
      console.log("width",width)
      console.log("height",height)
      pdf.addImage(contentDataURL, 'JPEG', 20, 20, width, height);
      // Generated PDF
      //pdf.save('FORM12B.pdf');
      pdf.html(data).then(() => pdf.save('FORM12B.pdf'));
    });
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

  resetView() {
    this.houseRentform.reset();
    this.houseRentform.reset();
    this.houseRentform.reset();
    this.landLordDetailTableList = [];
    this.agreementDetailsTableList = [];
    this.RentDetailTableList = [];
    this.declarationOfLandlordDocumentDetail = [];
    this.rentAgreementDocumentDetail = [];
    this.houseRentform.get('houseRentMaster').get('country').setValue('India');

  }
  monthRentAmount() {

    console.log("before: " + JSON.stringify(this.RentDetailTableList))

    let amt = this.houseRentform.get('rentDetailList').value.rentAmount;

    //this.RentDetailTableList.push(this.houseRentform.get('rentDetailList').value)

    console.log("after: " + JSON.stringify(this.RentDetailTableList))

    // this.houseRentform.controls['rentDetailList'].reset()

    // this.houseRentform.controls['rentDetailList'].setValue(this.RentDetailTableList)




    // console.log("landLordDetailTableList",this.landLordDetailTableList)
    // console.log("amt is: "+ amt)
    // console.log("agreementDetailsTableList",this.agreementDetailsTableList)
    // console.log("RentDetailTableList",this.RentDetailTableList)
    this.address1 = this.houseRentform.get('houseRentMaster').value.address1;
    this.address2 = this.houseRentform.get('houseRentMaster').value.address2;
    this.address3 = this.houseRentform.get('houseRentMaster').value.address3;
    this.state = this.houseRentform.get('houseRentMaster').value.state;
    this.city = this.houseRentform.get('houseRentMaster').value.city;
    //console.log(this.address1,this.address2,this.address3,this.state,this.city)


    this.iconCount = 0;
    if (amt > 8333) {
      this.landLordDetailTableList.forEach((element, index) => {
        if (element.landLordPan == null || element.landLordPan == '') {
          console.log("here")
          this.iconCount = this.iconCount + 1;
        } else {
          console.log("here1")
          // if(this.iconCount == 0){
          //   this.iconCount = 0
          // }else{
          //   this.iconCount = this.iconCount - 1;
          // }
        }
      });
    }

    console.log("count: " + this.iconCount)

    if (this.iconCount == 1) {
      if (this.landLordDetailTableList[0].landLordPan == null || this.landLordDetailTableList[0].landLordPan == "") {
        this.toShowTemp1 = true;
        this.toShowTemp2 = false;
        this.toShowPanDeclr = true;
      }
      else if (this.landLordDetailTableList[1].landLordPan == null || this.landLordDetailTableList[1].landLordPan == "") {
        this.toShowTemp1 = false;
        this.toShowTemp2 = true;
        this.toShowPanDeclr = true;
      }
    } else if (this.iconCount == 2) {
      this.toShowTemp1 = true;
      this.toShowTemp2 = true;
      this.toShowPanDeclr = true;
    } else {
      this.toShowTemp1 = false;
      this.toShowTemp2 = false;
      this.toShowPanDeclr = false;
      this.iconCount = this.iconCount - 1;
    }

  }

  public docRemarkModal(
    documentViewerTemplate: TemplateRef<any>,
    index: any,
    masterId,
    summary, count
  ) {


    this.summaryDetails = summary;
    console.log("summary", this.summaryDetails)
    this.indexCount = count;
    this.selectedremarkIndex = count;
    this.houseRentService.gethouseRentMasterRemarkList(
      masterId,
    ).subscribe((res) => {
      console.log('docremark', res);


      this.documentRemarkList = res.data.results[0];
      this.remarkCount = res.data.results[0].length;
    });
    console.log('documentDetail::', this.documentRemarkList);
    // this.documentRemarkList = this.selectedRemarkList;
    console.log('this.documentRemarkList', this.documentRemarkList);
    this.modalRef = this.modalService.show(
      documentViewerTemplate,
      Object.assign({}, { class: 'gray modal-s' })
    );
  }

  onSaveRemarkDetails(summary, index) {
    this.enteredRemark = '';
    const data = {
      "transactionId": 0,
      "masterId": this.summaryDetails.agreementDetailList[0].houseRentalMasterId,
      "employeeMasterId": this.summaryDetails.agreementDetailList[0].houseRentalMasterId,
      "section": "House",
      "subSection": "Rental",
      "remark": this.editRemarkData,
      "proofSubmissionId": '',
      "role": "Employee",
      "remarkType": "Master"

    };
    this.houseRentService.postHouseRentMasterRemark(data)
      .subscribe((res) => {
        if (res.status.code == "200") {
          console.log(this.masterGridData);
          this.masterGridData[this.selectedremarkIndex].bubbleRemarkCount = res.data.results[0].bubbleRemarkCount;

          this.alertService.sweetalertMasterSuccess(
            'Remark Saved Successfully.',
            '',

          );
          this.masterPage();
          this.enteredRemark = '';
          this.modalRef.hide();

        } else {
          this.alertService.sweetalertWarning("Something Went Wrong");
        }
      });

  }
  onResetRemarkDetails() {
    this.enteredRemark = '';
  }

  //----------- On change Transactional Line Item Remark --------------------------
  public onChangeDocumentRemark(transactionDetail, transIndex, event) {

    console.log('event.target.value::', event.target.value);
    this.editRemarkData = event.target.value;

    console.log('this.transactionDetail', this.transactionDetail);
    // const index = this.editTransactionUpload[0].groupTransactionList.indexOf(transactionDetail);
    // console.log('index::', index);

    this.transactionDetail[0].agreementDetailList[transIndex].remark = event?.target?.value;


  }
  checkMetroCity(data) {
    console.log(data);
    console.log(typeof (data));
    if (data != '') {
      this.houseRentService.toCheckMetroCity(data).subscribe((res) => {
        console.log(res);
        const radiobutton = res.data.results[0][0].isMetro;
        if (radiobutton === 'Non-Metro') {
          this.isMetro = false;
          this.isNonMetro = true;
        }
        else {
          this.isMetro = true;
          this.isNonMetro = false;
        }
      });
    }
  }

}
