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
import { HousingloanService } from '../housingloan.service';
@Component({
  selector: 'app-housingloanmaster',
  templateUrl: './housingloanmaster.component.html',
  styleUrls: ['./housingloanmaster.component.scss'],

})
export class HousingloanmasterComponent implements OnInit {

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
  public form: FormGroup;
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
    public sanitizer: DomSanitizer) {
      this.form = this.formBuilder.group({
        housePropertyMasterId:  new FormControl(0),
        propertyName: new FormControl(null, Validators.required),
        possessionDate: new FormControl(null, Validators.required),
        copyFrom: new FormControl(null, Validators.required),
        address1: new FormControl(null, Validators.required),
        address2: new FormControl(null, Validators.required),
        address3: new FormControl(null, Validators.required),
        country : new FormControl(null, Validators.required),
        pinCode: new FormControl(null, Validators.required),
        // state: new FormControl(null, Validators.required),
        state: new FormControl({value: null, disabled : true}, Validators.required),
        city: new FormControl(null, Validators.required),
        townOrVillage: new FormControl(null),
        stampDutyRegistrationDate: new FormControl(null, Validators.required),
        stampDutyRegistrationAmount: new FormControl(null, [Validators.required , Validators.pattern('^[0-9]*$')]),
        propertyRegistrationValue: new FormControl(null, [Validators.required , Validators.pattern('^[0-9]*$')]),

        loanTaken : new FormControl(null, Validators.required),
        housePropertyOwnerDetailList: new FormArray([]),
        housePropertyUsageTypeList:  new FormArray([]),
        housePropertyLoanDetailList :
         this.formBuilder.group({
          housePropertyLoanDetailId : new FormControl(0),
          purposeOfLoan: new FormControl(null, Validators.required ),
          lenderName: new FormControl(null, Validators.required),
          lenderType: new FormControl(null, Validators.required),
          lenderPANOrAadhar: new FormControl(null, Validators.required),
          loanAccountNumber: new FormControl(null, Validators.required),
          loanAmount: new FormControl(null, [Validators.required , Validators.pattern('^[0-9]*$')]),
          preEMIInterestPaid: new FormControl(null, [Validators.required , Validators.pattern('^[0-9]*$')]),
          loanSanctionedDate: new FormControl(null, Validators.required),
          loanEndDate: new FormControl(null, Validators.required),
          percentageClaimedByEmployee: new FormControl(null, [Validators.required , Validators.max(100), Validators.min(0)]),
        }),

      });

      this.housePropertyUsageTypeList.push(this.formBuilder.group({
        housePropertyUsageTypeId : [0],
        usageType: [''],
        fromDate: [''],
        toDate : [''],
      }));

      this.frequencyOfPaymentList = [
        {label: 'Monthly', value: 'Monthly'},
        {label: 'Quarterly', value: 'Quarterly'},
        {label: 'Half-Yearly', value: 'Halfyearly'},
        {label: 'Yearly', value: 'Yearly'},
        {label: 'As & When', value: 'As & When'},
      ];

      this.usageTypeList = [
        {label: 'Self – Occupied', value: 'selfOccupied'},
        {label: 'Let Out', value: 'letOut'},
        {label: 'Deemed Let Out', value: 'deemedLetOut'},
      ];

      this.purposeOfLoanList = [
        {label: 'Acquisition or construction', value: 'Acquisition or construction'},
        {label: 'Repair or renewal or reconstruction of the house', value: 'Repair or renewal or reconstruction of the house'},
      ];

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
   this.form.get('country').setValue('India');
   // console.log('Purpose Of Loan' , this.form.get('housePropertyLoanDetailList').get('purposeOfLoan'))
    // console.log('dropdown',this.form.get('housePropertyLoanDetailList').get('purposeOfLoan').setValue('construction'))

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

  get f() { return this.form.controls; }
  get pfArray() { return this.f.pfFormArray as FormArray; }
  // get housePropertyLoanDetailList() { return this.f.housePropertyLoanDetailList as FormArray; }
  get housePropertyUsageTypeList() { return this.form.get('housePropertyUsageTypeList') as FormArray; }

  public addOwner(i: number) {
    const OwnerArray = new FormGroup({
      housePropertyOwnerDetailId : new FormControl(0),
      ownerName : new FormControl(''),
      firstTimeHomeBuyer: new FormControl(''),

    });
    // tslint:disable-next-line:no-angle-bracket-type-assertion
    (<FormArray> this.form.get('housePropertyOwnerDetailList')).push(OwnerArray);
    console.log('pgFprmArray' , (this.form.get('housePropertyOwnerDetailList') as FormArray));

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
      (this.form.get('housePropertyOwnerDetailList') as FormArray).removeAt(i);

    } else {

      this.showOwner = false;
      console.log('else', this.showOwner);

    }
  }

  public addLoanDetails(formDirective : FormGroupDirective) {
    this.loansubmitted =true;
    console.log('this.loansubmitted', this.loanForm)
    if (this.form.get('housePropertyLoanDetailList').invalid) {
      console.log(this.form.get('housePropertyLoanDetailList').invalid)
       return;
     }
    this.loanDetailGridData.push(this.form.get('housePropertyLoanDetailList').value);
    this.form.get('housePropertyLoanDetailList').reset();
   this.loansubmitted =false;

  }

  public trackloanDetail(index: number, loanDetail: any) {
    return loanDetail.lenderName;

  }

  public getPermanentAddressFromPIN() {
    console.log(this.form.get('pinCode').value);
    if (this.form.get('pinCode').value.length < 6) {
      this.form.get('state').setValue('');
      this.form.get('city').setValue('');
      this.form.get('townOrVillage').setValue('');

    }
    if (this.form.get('pinCode').value.length === 6 &&  this.form.get('country').value === 'India') {
      this.Service.getAddressFromPIN(this.form.get('pinCode').value).subscribe((res) => {
        console.log(res);
        this.form.get('state').setValue( res.data.results[0].state);
        this.form.get('city').setValue(res.data.results[0].city);
        this.form.get('townOrVillage').setValue(res.data.results[0].officeName);

      }, (error: any) => {
        this.alertService.sweetalertError(error.error.status.messsage);

      });
    }
  }

  public checkRegistrationDateValid() {
    const stampDutyPaymentDate_ = this.form.get('stampDutyRegistrationDate').value;
    console.log('stampDutyPaymentDate_', stampDutyPaymentDate_);
    if (stampDutyPaymentDate_ !== null)
    {
      this.stampDutyDateValid = false;

    }



  }

  // ------------------------------------Master----------------------------

    // convenience getter for easy access to form fields
    get masterForm() { return this.form.controls; }
    get loanForm() { return this.form.get('housePropertyLoanDetailList')['controls'];};

    // Policy End Date Validations with Policy Start Date
      // setPolicyEndDate() {
      //   console.log('PPF START DATE', this.form.value.policyStartDate);
      //   this.policyMinDate = this.form.value.policyStartDate;
      //   const policyStart = this.datePipe.transform(this.form.get('policyStartDate').value, 'yyyy-MM-dd');
      //   const policyEnd = this.datePipe.transform(this.form.get('policyEndDate').value, 'yyyy-MM-dd');
      //   this.minFormDate = this.policyMinDate;

      //   console.log('PPF MIN DATE', this.form.value.policyStartDate);
      //   if (policyStart > policyEnd) {
      //       this.form.controls.policyEndDate.reset();
      //   }
      //   this.form.patchValue({
      //       fromDate: this.policyMinDate,
      //   });

      //   this.setPaymentDetailToDate();
      //   //this.setAccountMaxDatePPF(this.policyMinDate);
      // }

    // Policy End Date Validations with Current Finanacial Year
      public checkFinancialYearStartDateWithPolicyEnd() {
        const policyEnd = this.datePipe.transform(this.form.get('policyEndDate').value, 'yyyy-MM-dd');
        const financialYearStartDate = this.datePipe.transform(this.financialYearStart, 'yyyy-MM-dd');
        const policyStart = this.datePipe.transform(this.form.get('policyStartDate').value, 'yyyy-MM-dd');

        console.log(policyStart);
        if (policyEnd < financialYearStartDate) {
          this.alertService.sweetalertWarning('Policy End Date should be greater than or equal to Current Financial Year : '
          + this.financialYearStart);
          this.form.controls.policyEndDate.reset();
        } else {
          this.form.patchValue({
            toDate: this.form.value.policyEndDate,
          });
          this.maxFromDate = this.form.value.policyEndDate;
        }

        if (policyEnd < policyStart) {
          this.alertService.sweetalertWarning('Policy End Date should be greater than Policy Start Date : ');
          this.form.controls.policyEndDate.reset();
        } else {
          this.form.patchValue({
            toDate: this.form.value.policyEndDate,
          });
          this.maxFromDate = this.form.value.policyEndDate;
        }
      }

    // Payment Detail To Date Validations with Payment Detail From Date
      public setPaymentDetailToDate() {
        this.paymentDetailMinDate = this.form.value.fromDate;
        const from = this.datePipe.transform(this.form.get('fromDate').value, 'yyyy-MM-dd');
        const to = this.datePipe.transform(this.form.get('toDate').value, 'yyyy-MM-dd');
        if (from > to) {
          this.form.controls.toDate.reset();
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
        const to = this.datePipe.transform(this.form.get('toDate').value, 'yyyy-MM-dd');
        const financialYearStartDate = this.datePipe.transform(this.financialYearStart, 'yyyy-MM-dd');
        if (to < financialYearStartDate) {
          this.alertService.sweetalertWarning('To Date should be greater than or equal to Current Financial Year : ' +
          this.financialYearStart);
          this.form.controls.toDate.reset();
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

        // if (this.form.invalid) {
        //   return;
        // }

        if (this.propertyIndex.length === 0 || this.stampDutyRegistration.length === 0 ||
          this.loanSanctionLetter.length === 0 || this.possessionLetter.length === 0 ) {
          this.alertService.sweetalertWarning('Please Upload All Mandatitory Documents');
          return;
        } else {
          const data = this.form.getRawValue();
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
          this.form.reset();

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
          const toSelect = this.familyMemberGroup.find((c) => c.familyMemberName === this.form.get('accountHolderName').value);
          this.form.get('familyMemberInfoId').setValue(toSelect.familyMemberInfoId);
          this.form.get('relationship').setValue(toSelect.relation);
        }

        public onSelectAddressType() {
          const toSelectAddress = this.empoyeeAddressList.find((c) => c.addressType === this.form.get('copyFrom').value);
          console.log('toSelectAddress', toSelectAddress);
          this.form.get('address1').setValue(toSelectAddress.address1);
          this.form.get('address2').setValue(toSelectAddress.address2);
          this.form.get('address3').setValue(toSelectAddress.address3);
          this.form.get('country').setValue(toSelectAddress.country);
          this.form.get('pinCode').setValue(toSelectAddress.postalCode);
          this.form.get('state').setValue(toSelectAddress.state);
          this.form.get('city').setValue(toSelectAddress.city);
          this.form.get('townOrVillage').setValue(toSelectAddress.village);
        }

      // on checkPaymentDate
      public checkPaymentDate() {
        const stampDutyPaymentDate = this.form.get('stampDutyRegistrationDate').value;
        console.log('stampDutyPaymentDate', stampDutyPaymentDate);

        if (stampDutyPaymentDate === null) {

          this.stampDutyDateValid = true;

          console.log('stampDutyRegistrationDate' ,
          this.form.controls['stampDutyRegistrationDate'].updateValueAndValidity());
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

            this.form.patchValue({
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
          this.form.patchValue(this.masterGridData[i]);
          // console.log(this.form.getRawValue());
          this.Index = i;
          this.showUpdateButton = true;
          const formatedPremiumAmount = this.numberFormat.transform(this.masterGridData[i].premiumAmount);
          // console.log(`formatedPremiumAmount::`,formatedPremiumAmount);
          this.form.get('premiumAmount').setValue(formatedPremiumAmount);
          this.isClear = true;
        }
      }

      // On Edit Cancel
        public cancelEdit() {
          this.form.reset();
          this.form.get('active').setValue(true);
          this.form.get('ecs').setValue(0);
          this.showUpdateButton = false;
          this.loanDetailGridData = [];
          this.isClear = false;
        }

      // On Master Edit functionality
        public viewMaster(i: number) {
          // this.scrollToTop();
          this.loanDetailGridData = this.masterGridData[i].paymentDetails;
          this.form.patchValue(this.masterGridData[i]);
          // console.log(this.form.getRawValue());
          this.Index = i;
          this.showUpdateButton = true;
          const formatedPremiumAmount = this.numberFormat.transform(this.masterGridData[i].premiumAmount);
          // console.log(`formatedPremiumAmount::`,formatedPremiumAmount);
          this.form.get('premiumAmount').setValue(formatedPremiumAmount);
          this.isCancel = true;
        }

      // On View Cancel
        public cancelView() {
          this.form.reset();
          this.form.get('active').setValue(true);
          this.form.get('ecs').setValue(0);
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
