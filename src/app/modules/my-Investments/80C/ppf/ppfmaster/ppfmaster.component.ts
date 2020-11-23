import { DatePipe, DOCUMENT } from '@angular/common';
import {HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import { Component, HostListener, Inject, OnInit, Optional, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog} from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertServiceService } from '../../../../../core/services/alert-service.service';
import { NumberFormatPipe } from '../../../../../core/utility/pipes/NumberFormatPipe';
import {FileService} from '../../../file.service';
import { MyInvestmentsService } from '../../../my-Investments.service';


@Component({
  selector: 'app-ppfmaster',
  templateUrl: './ppfmaster.component.html',
  styleUrls: ['./ppfmaster.component.scss']
})
export class PPFMasterComponent implements OnInit {
  public modalRef: BsModalRef;
  public submitted = false;
  public pdfSrc = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
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

  constructor(
    private formBuilder: FormBuilder,
    private Service: MyInvestmentsService,
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
        institution: new FormControl(null, Validators.required),
        accountNumber: new FormControl(null, Validators.required),
        accountHolderName: new FormControl(null, Validators.required),
        relationship: new FormControl({value: null, disabled: true}, Validators.required),
        policyStartDate: new FormControl(null, Validators.required),
        policyEndDate: new FormControl(null),
        familyMemberInfoId: new FormControl(null, Validators.required),
        active: new FormControl(true, Validators.required),
        remark: new FormControl(null),
        frequencyOfPayment: new FormControl(null),
        premiumAmount: new FormControl(null),
        annualAmount: new FormControl({value: null, disabled: true}),
        fromDate: new FormControl(null),
        toDate: new FormControl(null),
        ecs: new FormControl(0),
        masterPaymentDetailId: new FormControl(0),
        investmentGroup1MasterId: new FormControl(0),
        depositType: new FormControl('recurring'),
      });

      this.frequencyOfPaymentList = [
        {label: 'Monthly', value: 'Monthly'},
        {label: 'Quarterly', value: 'Quarterly'},
        {label: 'Half-Yearly', value: 'Halfyearly'},
        {label: 'Yearly', value: 'Yearly'},
        {label: 'As & When', value: 'As & When'},
      ];
this.masterPage();
      this.addNewRowId = 0;
      this.hideRemarkDiv = false;
      this.hideRemoveRow = false;
      this.isClear = false;
      this.isCancel = false; ;
      this.receiptAmount = this.numberFormat.transform(0);
      this.globalAddRowIndex = 0;
      this.globalSelectedAmount = this.numberFormat.transform(0);
  }

  public ngOnInit(): void {

    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);

    // Business Financial Year API Call
    this.Service.getBusinessFinancialYear().subscribe((res) => {
      this.financialYearStart = res.data.results[0].fromDate;
    });

    // Family Member List API call
    this.Service.getFamilyInfo().subscribe((res) => {
      console.log('getFamilyInfo',res),
      this.familyMemberGroup = res.data.results.filter(e => e.relation.includes( 'Daughter') || e.relation.includes( 'Self') ||
      e.relation.includes( 'Son') || e.relation.includes( 'Wife')  );
      console.log('getFamilyInfo', this.familyMemberGroup);
      this.familyMemberGroup.forEach((element) => {
        const obj = {
          label: element.familyMemberName,
          value: element.familyMemberName,
        };
        this.familyMemberName.push(obj);
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

    if ((this.today.getMonth() + 1) <= 3) {
      this.financialYear = (this.today.getFullYear() - 1) + '-' + this.today.getFullYear();
    } else {
      this.financialYear = this.today.getFullYear() + '-' + (this.today.getFullYear() + 1);
    }

    const splitYear = this.financialYear .split('-', 2);

    this.financialYearStartDate = new Date('01-Apr-' + splitYear[0]);
    this.financialYearEndDate = new Date('31-Mar-' + splitYear[1]);

  }

  // ------------------------------------Master----------------------------

    // convenience getter for easy access to form fields
    get masterForm() { return this.form.controls; }

    // Policy End Date Validations with Policy Start Date
      setPolicyEndDate() {
        console.log('PPF START DATE', this.form.value.policyStartDate);
        this.policyMinDate = this.form.value.policyStartDate;
        const policyStart = this.datePipe.transform(this.form.get('policyStartDate').value, 'yyyy-MM-dd');
        const policyEnd = this.datePipe.transform(this.form.get('policyEndDate').value, 'yyyy-MM-dd');
        this.minFormDate = this.policyMinDate;

        console.log('PPF MIN DATE', this.form.value.policyStartDate);
        if (policyStart > policyEnd) {
            this.form.controls.policyEndDate.reset();
        }
        this.form.patchValue({
            fromDate: this.policyMinDate,
        });

        this.setPaymentDetailToDate();
        //this.setAccountMaxDatePPF(this.policyMinDate);
      }

    // Policy End Date Validations with Current Finanacial Year
      checkFinancialYearStartDateWithPolicyEnd() {
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
      setPaymentDetailToDate() {
        this.paymentDetailMinDate = this.form.value.fromDate;
        const from = this.datePipe.transform(this.form.get('fromDate').value, 'yyyy-MM-dd');
        const to = this.datePipe.transform(this.form.get('toDate').value, 'yyyy-MM-dd');
        if (from > to) {
          this.form.controls.toDate.reset();
        }
      }

      setAccountMaxDatePPF(policyMinDate : Date) {
        console.log('PPFMinDATE' ,  policyMinDate );
        const maxppfAccountDate = policyMinDate;
        if (maxppfAccountDate !== null || maxppfAccountDate === undefined ) {
        this.policyMaxDatePPF = new Date (maxppfAccountDate.setFullYear(maxppfAccountDate.getFullYear() + 21));
        }


        console.log('PPFMAXDATE' ,   this.policyMaxDatePPF );
      }

    // Payment Detail To Date Validations with Current Finanacial Year
      checkFinancialYearStartDateWithPaymentDetailToDate() {
        const to = this.datePipe.transform(this.form.get('toDate').value, 'yyyy-MM-dd');
        const financialYearStartDate = this.datePipe.transform(this.financialYearStart, 'yyyy-MM-dd');
        if (to < financialYearStartDate) {
          this.alertService.sweetalertWarning('To Date should be greater than or equal to Current Financial Year : ' +
          this.financialYearStart);
          this.form.controls.toDate.reset();
        }
      }

    // Get Master Page Data API call
      masterPage() {
        this.Service.getPPFMaster().subscribe((res) => {
          console.log('masterGridData::', res);
          this.masterGridData = res.data.results;
          this.masterGridData.forEach((element) => {
            if (element.policyStartDate !== null) {
            element.policyStartDate = new Date(element.policyStartDate);
            }
            if (element.policyEndDate !== null) {
            element.policyEndDate = new Date(element.policyEndDate);
            }
            if (element.fromDate !== null) {
            element.fromDate = new Date(element.fromDate);
            }
            if (element.toDate !== null) {
            element.toDate = new Date(element.toDate);
            }
          });
        });
      }

    // Post Master Page Data API call
      public addMaster(formData: any, formDirective: FormGroupDirective): void {

        this.submitted = true;

        if (this.form.invalid) {
          return;
        }

        if (this.masterfilesArray.length === 0) {
          this.alertService.sweetalertWarning('LIC Document needed to Create Master.');
          return;
        }

         else {
          const data = this.form.getRawValue();
          if (this.form.value.frequencyOfPayment !== 'As & When'){
          const from = this.datePipe.transform(this.form.get('fromDate').value, 'yyyy-MM-dd');
          const to = this.datePipe.transform(this.form.get('toDate').value, 'yyyy-MM-dd');


          data.fromDate = from;
          data.toDate = to;
          data.premiumAmount = data.premiumAmount.toString().replace(',', '');
          }

          console.log('LICdata::', data);


          this.Service.submitPPFMasterData(this.masterfilesArray, data)
            .subscribe((res) => {
              console.log(res);
              if (res) {
                if (res.data.results.length > 0) {
                  this.masterGridData = res.data.results;
                  this.masterGridData.forEach((element) => {
                    element.policyStartDate = new Date(element.policyStartDate);
                    element.policyEndDate = new Date(element.policyEndDate);
                    element.fromDate = new Date(element.fromDate);
                    element.toDate = new Date(element.toDate);

                  });
                  if (data.frequencyOfPayment !== 'As & When'){

                  this.alertService.sweetalertMasterSuccess('Record saved Successfully.',
                  'Go to "Declaration & Actual" Page to see Schedule.');
                  } else if (data.frequencyOfPayment === 'As & When') {
                    this.alertService.sweetalertMasterSuccess('Record saved Successfully.',
                    'Go to "Declaration & Actual"ss Page to update the Actuals.');
                  }
                } else {
                  this.alertService.sweetalertWarning(res.status.messsage);
                }
              } else {
                this.alertService.sweetalertError('Something went wrong. Please try again.');
              }
            });

          this.Index = -1;
          formDirective.resetForm();
          this.form.reset();
          this.form.get('active').setValue(true);
          this.form.get('ecs').setValue(0);
          this.showUpdateButton = false;
          this.paymentDetailGridData = [];
          this.masterfilesArray = [];
          this.submitted = false;
        }

      }

      onMasterUpload(event: { target: { files: string | any[]; }; }) {
        //console.log('event::', event);
        if (event.target.files.length > 0) {
            for (const file of event.target.files) {
              this.masterfilesArray.push(file);
            }
        }
        //console.log('this.masterfilesArray::', this.masterfilesArray);
      }

    // Remove LicMaster Document
    removeSelectedLicMasterDocument(index: number) {
      this.masterfilesArray.splice(index, 1);
      console.log('this.filesArray::', this.masterfilesArray);
      console.log('this.filesArray.size::', this.masterfilesArray.length);
    }

      // Calculate annual amount on basis of premium and frquency
        calculateAnnualAmount() {
              console.log (this.form.value.frequencyOfPayment);
              if (this.form.value.frequencyOfPayment === 'As & When'){
            console.log('in as and when')
            //this.form.get(this.form.value.premiumAmoun).setValue(null);

            this.form.get('premiumAmount').setValue(0);
            this.form.get('annualAmount').setValue(0) ;
            this.form.get('fromDate').reset() ;
            this.form.get('toDate').reset() ;
            this.form.get('ecs').setValue('0') ;

          }
          else{
          let installment = this.form.value.premiumAmount;
          installment = installment.toString().replace(',', '');
          // console.log(installment);

          if (!this.form.value.frequencyOfPayment) {
              installment = 0;
          }
          if (this.form.value.frequencyOfPayment === 'Monthly') {
              installment = installment * 12;
          } else if (this.form.value.frequencyOfPayment === 'Quarterly') {
              installment = installment * 4;
          } else if (this.form.value.frequencyOfPayment === 'Halfyearly') {
              installment = installment * 2;
          }
          else {
              installment = installment * 1;
          }
          const formatedPremiumAmount = this.numberFormat.transform(this.form.value.premiumAmount);
          // console.log(`formatedPremiumAmount::`,formatedPremiumAmount);
          this.form.get('premiumAmount').setValue(formatedPremiumAmount);
          this.form.get('annualAmount').setValue(installment);
        }
      }

      // Family relationship shown on Policyholder selection
        OnSelectionfamilyMemberGroup() {
          const toSelect = this.familyMemberGroup.find((c) => c.familyMemberName === this.form.get('accountHolderName').value);
          this.form.get('familyMemberInfoId').setValue(toSelect.familyMemberInfoId);
          this.form.get('relationship').setValue(toSelect.relation);
        }

      // Deactivate the Remark
        deactivateRemark() {
          if (this.form.value.active === false) {
            // this.form.get('remark').enable();
            this.hideRemarkDiv = true;
            this.form.get('remark').setValidators([Validators.required]);
          } else {
              this.form.get('remark').clearValidators();
              this.hideRemarkDiv = false;
            // this.form.get('remark').disable();
              this.form.get('remark').reset();
          }
        }

      // On Master Edit functionality
        editMaster(i: number) {
          //this.scrollToTop();
          console.log('inedit as and when', this.masterGridData[i].frequency);
          if (this.masterGridData[i].frequency === 'As & When') {

            this.form.patchValue({
              institution: this.masterGridData[i].institution,
              accountNumber: this.masterGridData[i].accountNumber,
              accountHolderName: this.masterGridData[i].accountHolderName,
              relationship: this.masterGridData[i].relationship,
              policyStartDate:this.masterGridData[i].policyStartDate,
              fromDate: this.masterGridData[i].fromDate,
              familyMemberInfoId: this.masterGridData[i].familyMemberInfoId,
              frequencyOfPayment: this.masterGridData[i].frequencyOfPayment,
              //premiumAmount: this.masterGridData[i].institution,
              //annualAmount: this.masterGridData[i].institution,

              //toDate: new FormControl(null),
              //ecs: new FormControl(0),



          });

          }
          else{
          this.paymentDetailGridData = this.masterGridData[i].paymentDetails;
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
        cancelEdit() {
          this.form.reset();
          this.form.get('active').setValue(true);
          this.form.get('ecs').setValue(0);
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
          const formatedPremiumAmount = this.numberFormat.transform(this.masterGridData[i].premiumAmount);
          // console.log(`formatedPremiumAmount::`,formatedPremiumAmount);
          this.form.get('premiumAmount').setValue(formatedPremiumAmount);
          this.isCancel = true;
        }

      // On View Cancel
        cancelView() {
          this.form.reset();
          this.form.get('active').setValue(true);
          this.form.get('ecs').setValue(0);
          this.showUpdateButton = false;
          this.paymentDetailGridData = [];
          this.isCancel = false;
        }
        UploadModal(template: TemplateRef<any>) {
          this.modalRef = this.modalService.show(
              template,
              Object.assign({}, { class: 'gray modal-md' }),
          );
      }

}
