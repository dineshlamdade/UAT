
import { DatePipe, DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {AccordionModule} from 'primeng/accordion';     // accordion and accordion tab
import {MenuItem} from 'primeng/api';
import { Observable } from 'rxjs';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import { NumberFormatPipe } from 'src/app/core/utility/pipes/NumberFormatPipe';
import { FileService } from '../../file.service';
import { MyInvestmentsService } from '../../my-Investments.service';
import { HousingloanService } from '../../housingloan/housingloan.service';

@Component({
  selector: 'app-houserentmaster',
  templateUrl: './houserentmaster.component.html',
  styleUrls: ['./houserentmaster.component.scss']
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
  public loanDetailGridData: Array<any> = [];
  public  empoyeeAddressList: Array<any> = [];
  public employeeAddressType: Array<any> = [];
  public loanDetail: String ;
  public loanTaken =  true;
  public stampDutyDateValid = false;

  public modalRef: BsModalRef;
  public submitted = false;
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
  public testVariable: Array<any> = [];
  public abc: any[];
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
    public sanitizer: DomSanitizer)

    {
      this.houseRentform = this.formBuilder.group({
        houseRentalMasterId:  new FormControl(0),
        propertyName: new FormControl(null, Validators.required),
        possessionDate: new FormControl(null, Validators.required),
        copyFrom: new FormControl(null, Validators.required),
        address1: new FormControl(null, Validators.required),
        address2: new FormControl(null, Validators.required),
        address3: new FormControl(null, Validators.required),
        country : new FormControl(null, Validators.required),
        pinCode: new FormControl(null, Validators.required),
        state: new FormControl(null, Validators.required),
        city: new FormControl(null, Validators.required),
        village: new FormControl(null),
        metroCity : new FormControl(null, Validators.required),
        landLordDetailList :
         this.formBuilder.group({
          houseRentalLandLordDetailId : new FormControl(0),
          houseRentalMasterId : new FormControl(0),
          name: new FormControl(null, Validators.required ),
          address: new FormControl(null, Validators.required),
          landLordPan: new FormControl(null, Validators.required),
          percentageShareOfRent: new FormControl(null, [Validators.max(100) , Validators.required]),
          remark :null,

        }),
        agreementDetailList :
        this.formBuilder.group({
          houseRentalAgreementDetailId : new FormControl(0),
         houseRentalMasterId : new FormControl(0),
         fromDate: new FormControl(null, Validators.required ),
         toDate: new FormControl(null, Validators.required),
         remark: null,


       }),
       rentDetailList :
       this.formBuilder.group({
        houseRentalRentDetailId : new FormControl(0),
        houseRentalMasterId : new FormControl(0),
        fromDate: new FormControl(null, Validators.required ),
        toDate: new FormControl(null, Validators.required),
        rentAmount: new FormControl(null, Validators.required),

      }),

      });





      this.lenderTypeList = [

        {label: 'Financial Institutions', value: 'financial'},

        {label: 'Employer' , value: 'employer'},
        {label: 'Others' , value: 'others'},

      ];
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
   this.addOwner(0);
   this.houseRentform.get('country').setValue('India');
   // console.log('Purpose Of Loan' , this.houseRentform.get('housePropertyLoanDetailList').get('purposeOfLoan'))
    // console.log('dropdown',this.houseRentform.get('housePropertyLoanDetailList').get('purposeOfLoan').setValue('construction'))

    // Business Financial Year API Call
    // this.Service.getBusinessFinancialYear().subscribe((res) => {
    //   this.financialYearStart = res.data.results[0].fromDate;
    // });

   this.Service.getCountryList().subscribe((res) => {
      this.countriesList = res.data.results;

      console.log('Countries', this.countriesList);
    });

   this.Service.getEmployeeAddressList().subscribe((res) => {
      this.empoyeeAddressList = res.data.results[0].employeeAddressResponseDTOList;

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

   if ((this.today.getMonth() + 1) <= 3) {
      this.financialYear = (this.today.getFullYear() - 1) + '-' + this.today.getFullYear();
    } else {
      this.financialYear = this.today.getFullYear() + '-' + (this.today.getFullYear() + 1);
    }

   const splitYear = this.financialYear .split('-', 2);

   this.financialYearStartDate = new Date('01-Apr-' + splitYear[0]);
   this.financialYearEndDate = new Date('31-Mar-' + splitYear[1]);

  }

  get f() { return this.houseRentform.controls; }
  get pfArray() { return this.f.pfFormArray as FormArray; }
  // get housePropertyLoanDetailList() { return this.f.housePropertyLoanDetailList as FormArray; }
  get housePropertyUsageTypeList() { return this.houseRentform.get('housePropertyUsageTypeList') as FormArray; }

  public addOwner(i: number) {
    const OwnerArray = new FormGroup({
      housePropertyOwnerDetailId : new FormControl(0),
      ownerName : new FormControl(''),
      firstTimeHomeBuyer: new FormControl(''),

    });
    // tslint:disable-next-line:no-angle-bracket-type-assertion
    (<FormArray> this.houseRentform.get('housePropertyOwnerDetailList')).push(OwnerArray);
    console.log('pgFprmArray' , (this.houseRentform.get('housePropertyOwnerDetailList') as FormArray));

}

  public addUsageType(i: number) {
    console.log('addowner Index' , i);
    this.housePropertyUsageTypeList.push(this.formBuilder.group({
      housePropertyUsageTypeId : [0],
      usageType: [''],
      fromDate: [''],
      toDate : [''],
    }));

    console.log('addowner Index' , this.housePropertyUsageTypeList.value);

  }

  public removeUsageType(i: number) {
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
  }

  public addLoanDetails() {
    this.loansubmitted =true;
    console.log('this.loansubmitted', this.loanForm)
    if (this.houseRentform.get ('housePropertyLoanDetailList').invalid) {
      console.log(this.houseRentform.get ('housePropertyLoanDetailList').invalid)
       return;
     }

    this.loanDetailGridData.push(this.houseRentform.get('housePropertyLoanDetailList').value);
    this.loanDetailGridData = this.loanDetailGridData.slice();


    this.houseRentform.get('housePropertyLoanDetailList').reset();

    this.houseRentform.get('housePropertyLoanDetailList').markAsPristine();


  }

  public trackloanDetail(index: number, loanDetail: any) {
    return loanDetail.lenderName;

  }

  public getPermanentAddressFromPIN() {
    console.log(this.houseRentform.get('pinCode').value);
    if (this.houseRentform.get('pinCode').value.length < 6) {
      this.houseRentform.get('state').setValue('');
      this.houseRentform.get('city').setValue('');
      this.houseRentform.get('village').setValue('');

    }
    if (this.houseRentform.get('pinCode').value.length === 6 &&  this.houseRentform.get('country').value === 'India') {
      this.Service.getAddressFromPIN(this.houseRentform.get('pinCode').value).subscribe((res) => {
        console.log(res);
        this.houseRentform.get('state').setValue( res.data.results[0].state);
        this.houseRentform.get('city').setValue(res.data.results[0].city);
        this.houseRentform.get('village').setValue(res.data.results[0].officeName);

      }, (error: any) => {
        this.alertService.sweetalertError(error.error.status.messsage);

      });
    }
  }

  public checkRegistrationDateValid() {
    const stampDutyPaymentDate_ = this.houseRentform.get('stampDutyRegistrationDate').value;
    console.log('stampDutyPaymentDate_', stampDutyPaymentDate_);
    if (stampDutyPaymentDate_ !== null)
    {
      this.stampDutyDateValid = false;

    }



  }

  // ------------------------------------Master----------------------------

    // convenience getter for easy access to houseRentform fields
    get masterForm() { return this.houseRentform.controls; }
    get loanForm() { return this.houseRentform.get('housePropertyLoanDetailList')['controls'];};

    // Policy End Date Validations with Policy Start Date
      // setPolicyEndDate() {
      //   console.log('PPF START DATE', this.houseRentform.value.policyStartDate);
      //   this.policyMinDate = this.houseRentform.value.policyStartDate;
      //   const policyStart = this.datePipe.transform(this.houseRentform.get('policyStartDate').value, 'yyyy-MM-dd');
      //   const policyEnd = this.datePipe.transform(this.houseRentform.get('policyEndDate').value, 'yyyy-MM-dd');
      //   this.minFormDate = this.policyMinDate;

      //   console.log('PPF MIN DATE', this.houseRentform.value.policyStartDate);
      //   if (policyStart > policyEnd) {
      //       this.houseRentform.controls.policyEndDate.reset();
      //   }
      //   this.houseRentform.patchValue({
      //       fromDate: this.policyMinDate,
      //   });

      //   this.setPaymentDetailToDate();
      //   //this.setAccountMaxDatePPF(this.policyMinDate);
      // }

    // Policy End Date Validations with Current Finanacial Year
      public checkFinancialYearStartDateWithPolicyEnd() {
        const policyEnd = this.datePipe.transform(this.houseRentform.get('policyEndDate').value, 'yyyy-MM-dd');
        const financialYearStartDate = this.datePipe.transform(this.financialYearStart, 'yyyy-MM-dd');
        const policyStart = this.datePipe.transform(this.houseRentform.get('policyStartDate').value, 'yyyy-MM-dd');

        console.log(policyStart);
        if (policyEnd < financialYearStartDate) {
          this.alertService.sweetalertWarning('Policy End Date should be greater than or equal to Current Financial Year : '
          + this.financialYearStart);
          this.houseRentform.controls.policyEndDate.reset();
        } else {
          this.houseRentform.patchValue({
            toDate: this.houseRentform.value.policyEndDate,
          });
          this.maxFromDate = this.houseRentform.value.policyEndDate;
        }

        if (policyEnd < policyStart) {
          this.alertService.sweetalertWarning('Policy End Date should be greater than Policy Start Date : ');
          this.houseRentform.controls.policyEndDate.reset();
        } else {
          this.houseRentform.patchValue({
            toDate: this.houseRentform.value.policyEndDate,
          });
          this.maxFromDate = this.houseRentform.value.policyEndDate;
        }
      }

    // Payment Detail To Date Validations with Payment Detail From Date
      public setPaymentDetailToDate() {
        this.paymentDetailMinDate = this.houseRentform.value.fromDate;
        const from = this.datePipe.transform(this.houseRentform.get('fromDate').value, 'yyyy-MM-dd');
        const to = this.datePipe.transform(this.houseRentform.get('toDate').value, 'yyyy-MM-dd');
        if (from > to) {
          this.houseRentform.controls.toDate.reset();
        }
      }

      public setAccountMaxDatePPF(policyMinDate: Date) {
        console.log('PPFMinDATE' ,  policyMinDate );
        const maxppfAccountDate = policyMinDate;
        if (maxppfAccountDate !== null || maxppfAccountDate === undefined ) {
        this.policyMaxDatePPF = new Date (maxppfAccountDate.setFullYear(maxppfAccountDate.getFullYear() + 21));
        }

        console.log('PPFMAXDATE' ,   this.policyMaxDatePPF );
      }

    // Payment Detail To Date Validations with Current Finanacial Year
      public checkFinancialYearStartDateWithPaymentDetailToDate() {
        const to = this.datePipe.transform(this.houseRentform.get('toDate').value, 'yyyy-MM-dd');
        const financialYearStartDate = this.datePipe.transform(this.financialYearStart, 'yyyy-MM-dd');
        if (to < financialYearStartDate) {
          this.alertService.sweetalertWarning('To Date should be greater than or equal to Current Financial Year : ' +
          this.financialYearStart);
          this.houseRentform.controls.toDate.reset();
        }
      }

    // Get Master Page Data API call
      public masterPage() {
        this.HousingLoanService.getHousingLoanMaster().subscribe((res) => {
          console.log('masterGridData::', res);
          this.masterGridData = res.data.results;
          this.masterGridData.forEach((element) => {
            if (element.possessionDate !== null) {
            element.possessionDate = new Date(element.possessionDate);
            }
          });
        });
      }

    // Post Master Page Data API call
      public addMaster(formData: any, formDirective: FormGroupDirective): void {

        this.submitted = true;

        // if (this.houseRentform.invalid) {
        //   return;
        // }

        if (this.propertyIndex.length === 0 || this.stampDutyRegistration.length === 0 ||
          this.loanSanctionLetter.length === 0 || this.possessionLetter.length === 0 ) {
          this.alertService.sweetalertWarning('Please Upload All Mandatitory Documents');
          return;
        } else {
          const data = this.houseRentform.getRawValue();
          data.housePropertyLoanDetailList = this.loanDetailGridData;
          console.log('Housing Loan Data::', data);
          this.HousingLoanService.submitHousingLoanMasterData(this.propertyIndex, this.stampDutyRegistration,
            this.loanSanctionLetter, this.possessionLetter , data)
            .subscribe((res) => {
              console.log(res);
              if (res.data.results.length > 0) {
                  this.masterGridData = res.data.results;
                  this.masterGridData.forEach((element) => {
                    element.policyStartDate = new Date(element.policyStartDate);
                    element.policyEndDate = new Date(element.policyEndDate);
                    element.fromDate = new Date(element.fromDate);
                    element.toDate = new Date(element.toDate);
                    this.alertService.sweetalertMasterSuccess('Record saved Successfully.',
                    'Go to "Declaration & Actual" Page to see Schedule.');

                  });

                }
            });

          this.Index = -1;
          formDirective.resetForm();
          this.houseRentform.reset();

          this.showUpdateButton = false;
          this.loanDetailGridData = [];
          this.propertyIndex = [];
          this.submitted = false;
        }

      }

      public onMasterUpload(event: { target: { files: string | any[]; }; } , docType: string) {
        console.log('event::', event);
        console.log('docType::', docType);

        if (event.target.files.length > 0) {

            for (const file of event.target.files) {
              switch (docType) {
                case 'propertyIndex':
                  this.propertyIndex.push(file);
                  break;
                case 'stampDutyRegistration':
                  this.stampDutyRegistration.push(file);
                  break;
                case 'loanSanctionLetter':
                  this.loanSanctionLetter.push(file);
                  break;
                case 'possessionLetter':
                  this.possessionLetter.push(file);
                  break;

            }
        }
        // console.log('this.propertyIndex::', this.propertyIndex);
      }
    }
    // Remove HousingLoanMaster Document
    public removeSelectedLicMasterDocument(index: number , docType: string) {

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
          const toSelect = this.familyMemberGroup.find((c) => c.familyMemberName === this.houseRentform.get('accountHolderName').value);
          this.houseRentform.get('familyMemberInfoId').setValue(toSelect.familyMemberInfoId);
          this.houseRentform.get('relationship').setValue(toSelect.relation);
        }

        public onSelectAddressType() {
          const toSelectAddress = this.empoyeeAddressList.find((c) => c.addressType === this.houseRentform.get('copyFrom').value);
          console.log('toSelectAddress', toSelectAddress);
          this.houseRentform.get('address1').setValue(toSelectAddress.address1);
          this.houseRentform.get('address2').setValue(toSelectAddress.address2);
          this.houseRentform.get('address3').setValue(toSelectAddress.address3);
          this.houseRentform.get('country').setValue(toSelectAddress.country);
          this.houseRentform.get('pinCode').setValue(toSelectAddress.postalCode);
          this.houseRentform.get('state').setValue(toSelectAddress.state);
          this.houseRentform.get('city').setValue(toSelectAddress.city);
          this.houseRentform.get('townOrVillage').setValue(toSelectAddress.village);
        }

      // on checkPaymentDate
      public checkPaymentDate() {
        const stampDutyPaymentDate = this.houseRentform.get('stampDutyRegistrationDate').value;
        console.log('stampDutyPaymentDate', stampDutyPaymentDate);

        if (stampDutyPaymentDate === null) {

          this.stampDutyDateValid = true;

          console.log('stampDutyRegistrationDate' ,
          this.houseRentform.controls['stampDutyRegistrationDate'].updateValueAndValidity());
          this.alertService.sweetalertWarning(
            'Please Enter stampDutyRegistrationDate First to enter Amount : ',
	        );

        }

      }

      // On Master Edit functionality
        public editMaster(i: number) {
          // this.scrollToTop();
          console.log('inedit as and when', this.masterGridData[i].frequency);
          if (this.masterGridData[i].frequency === 'As & When') {

            this.houseRentform.patchValue({
              institution: this.masterGridData[i].institution,
              accountNumber: this.masterGridData[i].accountNumber,
              accountHolderName: this.masterGridData[i].accountHolderName,
              relationship: this.masterGridData[i].relationship,
              policyStartDate: this.masterGridData[i].policyStartDate,
              fromDate: this.masterGridData[i].fromDate,
              familyMemberInfoId: this.masterGridData[i].familyMemberInfoId,
              frequencyOfPayment: this.masterGridData[i].frequencyOfPayment,
              // premiumAmount: this.masterGridData[i].institution,
              // annualAmount: this.masterGridData[i].institution,

              // toDate: new FormControl(null),
              // ecs: new FormControl(0),

          });

          } else {
          this.loanDetailGridData = this.masterGridData[i].paymentDetails;
          this.houseRentform.patchValue(this.masterGridData[i]);
          // console.log(this.houseRentform.getRawValue());
          this.Index = i;
          this.showUpdateButton = true;
          const formatedPremiumAmount = this.numberFormat.transform(this.masterGridData[i].premiumAmount);
          // console.log(`formatedPremiumAmount::`,formatedPremiumAmount);
          this.houseRentform.get('premiumAmount').setValue(formatedPremiumAmount);
          this.isClear = true;
        }
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
          const formatedPremiumAmount = this.numberFormat.transform(this.masterGridData[i].premiumAmount);
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
        public UploadModal(template: TemplateRef<any> ) {
          this.modalRef = this.modalService.show(
            template,
            Object.assign({}, { class: 'gray modal-md' }),
        );

      }

}
