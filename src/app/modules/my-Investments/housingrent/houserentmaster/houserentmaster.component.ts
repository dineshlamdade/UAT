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

@Component({
  selector: 'app-houserentmaster',
  templateUrl: './houserentmaster.component.html',
  styleUrls: ['./houserentmaster.component.scss'],
})
export class HouserentmasterComponent implements OnInit {
  public houseRentform: FormGroup;

  @Input() public houseRentalMasterIds: any;



  rentAgreementdocumentPassword= [];
  rentAgreementremarkList = [];
  LandlordPANdocumentPassword= [];
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

      agreementDetail: this.formBuilder.group({
        houseRentalAgreementDetailId: new FormControl(0),
        houseRentalMasterId: new FormControl(0),
        fromDate: new FormControl(null, Validators.required),
        toDate: new FormControl(null, Validators.required),
        remark: new FormControl(null, Validators.required),
      }),

      /*   rentDetailList: new FormArray([]) */

      rentDetail: this.formBuilder.group({
        houseRentalRentDetailId: new FormControl(0),
        houseRentalMasterId: new FormControl(0),
        fromDate: new FormControl(null, Validators.required),
        toDate: new FormControl(null, Validators.required),
        rentAmount: new FormControl(null, [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
        ]),
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

    console.log('houseAgreementMasterForm::', this.houseAgreementMasterForm);
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
    return this.houseRentform.get('agreementDetail')['controls'];
  }

  /*  get houseAgreementMasterForm() { return this.houseRentform.get('agreementDetailList') as FormArray; } */

  get landRentDetailForm() {
    return this.houseRentform.get('rentDetail')['controls'];
  }

  /*  get rentDetailList() { return this.houseRentform.get('rentDetailList') as FormArray; } */

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
      'houseRentalLandLordDetailId::',
      this.houseRentform.get('landLordDetailList').value
        .houseRentalLandLordDetailId
    );

    this.landLordDetailTableList.forEach((element) => {
      if (
        element.landLordPan ===
          this.houseRentform.get('landLordDetailList').value.landLordPan &&
        (this.houseRentform.get('landLordDetailList').value
          .houseRentalLandLordDetailId === 0 ||
          this.houseRentform.get('landLordDetailList').value
            .houseRentalLandLordDetailId === null)
      ) {
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
    this.total = 0;
   this.total +=  this.houseRentform.get('landLordDetailList').value.percentageShareOfRent;
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
    console.log(this.total);
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
      this.total <= 100
    ) {
      this.houseRentform.get(
        'landLordDetailList'
      ).value.houseRentalLandLordDetailId = this.globalAddRowIndex;

      this.landLordDetailTableList.push(
        this.houseRentform.get('landLordDetailList').value
      );
    } else 
    {
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
     
    if (this.total !== 100) {
      this.alertService.sweetalertWarning(
        ' Please Fill Rent 100%.'
      );     
    } 
    /* this.landLordDetailTableList.houseRentalLandLordDetailId  = this.globalAddRowIndex;    */
    console.log('landLordDetailTableList', this.landLordDetailTableList);
    this.houseRentform.get('landLordDetailList').reset();
    this.landlordDetailsSubmitted = false;
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
      if(this.rentAgreementdocumentPassword[i] != undefined){
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
      if(this.LandlordPANdocumentPassword[i] != undefined){
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

    console.log("rentDetail:::::",this.houseRentform.get('rentDetail').value);
   // let invalidSubmission = false;
    console.log('Houserentform', this.houseRentform);
    if(!this.houseRentform.get('rentDetail').invalid)
    {
    //  invalidSubmission = true;
      console.log("rentDetail:::::----------",this.houseRentform.get('rentDetail').value.rentAmount * 12);
      if(this.houseRentform.get('rentDetail').value.rentAmount * 12 > 100000 && (this.declarationOfLandlordDocument.length === 0 ||
      this.declarationOfLandlordDocumentDetail.length === 0))
      {
        this.alertService.sweetalertWarning(
          'PAN NOT AVAILABLE. Upload Landloard PAN Deatils.'
        ); 
        return;
      }
     
    }

  /*   if (this.total !== 100) {
      invalidSubmission = true;
      this.alertService.sweetalertWarning(
        ' Landlord Details % Share Of Total Rent Please Fill  100%.'
      ); 
      return;    
    }
     */

    if (this.landLordDetailTableList.length === 0) {
    //  invalidSubmission = true;
      if (this.houseRentform.invalid) {
        this.alertService.sweetalertWarning('Please enter House  taken details.');
      }
      return;
    }
    /*   if (this.houseRentform.get('houseRentMaster').invalid) {
      this.alertService.sweetalertWarning('Please Enter Rent taken details');
      return;
    } */

    if (this.landLordDetailTableList.length === 0) {
    //  console.log('landLordDetailTableList',this.landLordDetailTableList.length );
      this.alertService.sweetalertWarning(
        'Please Enter LandLord Detail Table Field.'
      );
      return;
    }

    if (
      this.houseRentform.get('agreementDetail').invalid &&
      this.agreementDetailsTableList.length === 0
    ) {
      this.agreementDetailssubmitted = true;
      this.alertService.sweetalertWarning(
        'Please Enter  Agreement DetailList Table Field.'
      );

      console.log(this.houseRentform.get('agreementDetail').invalid);
      return;
    }
  
    
    
    
     // console.log("rentDetail:::::----------",this.houseRentform.get('rentDetail').value.rentAmount);

    if (
      ( this.rentAgreementDocument.length === 0) &&
      (this.rentAgreementDocumentDetail.length === 0 ) )
     {
      this.alertService.sweetalertWarning(
        'Please Upload All Mandatitory Documents.'
      );
    
      return;
    } else {
      const data = this.houseRentform.getRawValue();

      /*   data.housePropertyLoanDetailList = this.loanDetailGridData; */
      data.landLordDetailList = this.landLordDetailTableList;
      data.rentAgreementRemarkPasswordList = this.rentAgreementdocumentDataArray,
      data.declarationOfLandlordRemarkPasswordList = this.LandlordPANdocumentDataArray,
      console.log(this.houseRentform.get('agreementDetail').value);

      if (
        this.houseRentform.get('agreementDetail').invalid &&
        this.agreementDetailsTableList.length !== 0
      ) {
        data.agreementDetail =   this.houseRentform.get('agreementDetail').value;
      } else if (!this.houseRentform.get('agreementDetail').invalid) {
        this.agreementDetailsTableList = [];
        this.agreementDetailsTableList.push(
          this.houseRentform.get('agreementDetail').value
        );
        console.log(
          'agreementDetailsTableList::',
          this.agreementDetailsTableList
        );
        data.agreementDetail = this.houseRentform.get('agreementDetail').value;
      }
      console.log(
        ':agreementDetailList:',
        this.houseRentform.get('agreementDetail').value
          .houseRentalAgreementDetailId
      );

      console.log(
        'agreementDetailList value ::',
        this.houseRentform.get('agreementDetail').value
          .houseRentalAgreementDetailId
      );
      console.log('agreementDetailsTableList', this.agreementDetailsTableList);
      this.houseRentform.get('agreementDetail').reset();

      //data.rentDetail = this.RentDetailTableList[0];
      /*  data.declarationOfLandlordDocument= this.declarationOfLandlordDocument; */
      /*    data.rentAgreementDocument= this.rentAgreementDocument; */

      data.landLordDetailList.forEach((element) => {
        if (element.houseRentalLandLordDetailId < 0) {
          element.houseRentalLandLordDetailId = 0;
        }
      });
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
    console.log('fromDate.value::', this.rentFromMinDate);
  }
  /* ---------------------------editLandlordDetails---------RentDetailTableList-------------- */
  public editLandlordDetails(i: number) {
    /* this.landLordDetailForm.patchValue(this.landLordDetailTableList[i]); */
    console.log('landLordDetailTableList', this.landLordDetailTableList);
    console.log(i);
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
 
  /* ---------------------------editAgreementDetails----------------------- */
  public editAgreementDetails(i: number) {
    // this.agreementDetailsTableList=[];
    console.log('agreementDetailsTableList', this.agreementDetailsTableList);
    this.houseRentform.get('agreementDetail').patchValue({
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
      console.log("agreementDetailsTableList:------------:",this.agreementDetailsTableList)
      this.houseRentform.get('agreementDetail').patchValue({
        houseRentalAgreementDetailId:
          this.agreementDetailsTableList[0]
            .houseRentalAgreementDetailId,
        houseRentalMasterId:
          this.agreementDetailsTableList[0]
            .houseRentalMasterId,
        fromDate: new Date(
          this.agreementDetailsTableList[0].fromDate
        ),
        toDate: new Date(
          this.agreementDetailsTableList[0].toDate
        ),
        remark:
          this.agreementDetailsTableList[0]
            .remark,
      });

  /*   ......Rent Record........... */
      this.RentDetailTableList = obj.rentDetailList;
      console.log("RentDetailTableList:----------*******--:",this.RentDetailTableList)
        
      this.houseRentform.get('rentDetail').patchValue({
        houseRentalRentDetailId:
          this.RentDetailTableList[0]
            .houseRentalRentDetailId,
        houseRentalMasterId:
          this.RentDetailTableList[0]
            .houseRentalMasterId,
        fromDate: new Date(
          this.RentDetailTableList[0].fromDate
        ),
        toDate: new Date(
          this.RentDetailTableList[0].toDate
        ),
        rentAmount:
          this.RentDetailTableList[0]
            .rentAmount,
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
  /*   Declaration of Landlord PAN */
  openForm12BModal(template1: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template1,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }

  /* =================pdf======================== */
  download() {
    console.log('hi');

    let data = document.getElementById('htmlData');
    html2canvas(data).then((canvas) => {
      console.log(canvas);
      // Few necessary setting options
      const imgWidth = 193;
      const pageHeight = 0;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      // const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      // A4 size page of PDF
      const pdf = new jspdf('p', 'mm', 'a4');
      const position = -120;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      // Generated PDF
      pdf.save('FORM.12B.pdf');
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
  }
}
