import { DatePipe,DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit, Optional, TemplateRef,ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MyInvestmentsService } from './../my-Investments.service';

import {HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {FileService} from '../file.service';

import { isNgTemplate } from '@angular/compiler';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { from } from 'rxjs';
//sneha
import Swal from 'sweetalert2';
import { NumberFormatPipe } from '../../../core/utility/pipes/NumberFormatPipe';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { startOfYear } from 'date-fns';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-eighty-c',
    templateUrl: './eighty-c.component.html',
    styleUrls: ['./eighty-c.component.scss']
})

export class EightyCComponent implements OnInit {

  pdfSrc = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
  pdfSrc1 = 'https://www.gstatic.com/webp/gallery/1.jpg';
  name = 'Set iframe source';
  urlSafe: SafeResourceUrl;
  public summarynew: any = {};
  summaryGridData: Array<any> = [];
  summaryComputationGridDate: any;
  masterGridData: Array<any> = [];
  paymentDetailGridData: Array<any> = [];
  declarationGridData: Array<any> = [];
  familyMemberGroup: Array<any> = [];
  frequencyOfPaymentList: Array<any> = [];
  institutionNameList: Array<any> = [];
  transactionDetail: Array<any> = [];
  documentDetailList: Array<any> = [];
  uploadGridData: Array<any> = [];
  transactionInstitutionNames: Array<any> = [];
  editTransactionUpload : Array<any> = [];
  transactionPolicyList: Array<any> = [];
  transactionInstitutionListWithPolicies: Array<any> = [];
  familyMemberName: Array<any> = [];
  urlArray: Array<any> = [];
  urlIndex: number;
  glbalECS: number;
  form: FormGroup;
  Index: number;
  showUpdateButton: boolean;
  tabIndex = 0;
  radioSelected: string;
  familyRelationSame: boolean;
  enableEditRow: number;
  enableAddRow: number;
  enablePolicyTable: number;
  enableCheckbox: number;
  enableCheckboxFlag: number;
  enableCheckboxFlag3: boolean;
  addRow1: boolean;
  addRow2: number;
  previousEmployeeList: Array<any> = [];
  totalDeclaredAmount: any;
  totalActualAmount: any;
  futureNewPolicyDeclaredAmount: number;
  grandTotalDeclaredAmount: number;
  grandTotalActualAmount: number;
  grandDeclarationTotal: number;
  grandActualTotal: number;
  grandRejectedTotal: number;
  grandApprovedTotal: number;
  grandTabStatus: boolean;
  isCheckAll: boolean;
  isDisabled: boolean;
  enableSelectAll: boolean;
  enableFileUpload: boolean;
  documentRemark:any;
  isECS = true;
  hideCopytoActualDate  = false;
  shownewRow = false;
  initialArray =  true;
  initialArrayIndex : number[]=[];
  ////// ---------service
  declarationService: DeclarationService;
  displayUploadFile = false;
  uploadedFiles: any[] = [];
  viewDocumentDetail: boolean = true;
  masterUploadFlag: boolean = true;
  // msgs2: Message[];

  dueDate : Date;
  dateOfPayment : Date;
  date3: Date;
  loaded = 0;
  selectedFiles: FileList;
  currentFileUpload: File;
  filesArray: File[]=[];
  masterfilesArray: File[]=[];
  receiptNumber: number;
  receiptAmount: string;
  receiptDate: Date;
  selectedInstitution: string;
  policyDuplicate: string;
  sumDeclared: any;
  enableCheckboxFlag2: any;
  greaterDateValidations: boolean;
  policyMinDate: Date;
  paymentDetailMinDate: Date;
  paymentDetailMaxDate: Date;
  minFormDate:Date;
  maxFromDate:Date;
  financialYearStart: Date;
  employeeJoiningDate: Date;
  windowScrolled: boolean;
  addNewRowId:number;
  declarationTotal:number;
  declaredAmount:number;
  actualTotal:number
  actualAmount:number
  hideRemarkDiv:boolean;
  isClear:boolean;
  isCancel:boolean;
  financialYear : any;
  financialYearStartDate: Date;
  financialYearEndDate:Date;
  today = new Date();

  transactionStatustList:any;
  globalInstitution:String='ALL';
  globalPolicy:String='ALL';
  globalTransactionStatus:String='ALL'

  globalAddRowIndex:number;
  globalSelectedAmount:string;

  constructor(
    private formBuilder: FormBuilder,
    private Service: MyInvestmentsService,
    private datePipe: DatePipe,
    // private messageService: MessageService,
    private http: HttpClient,
    private fileService: FileService,
    private numberFormat: NumberFormatPipe,
    public dialog: MatDialog,
    private modalService: BsModalService,
    @Inject(DOCUMENT) private document: Document,
    public sanitizer: DomSanitizer)
  {
      // this.minDate = new Date();
      this.form = this.formBuilder.group({
        institutionName: new FormControl(null, Validators.required),
        policyNo: new FormControl(null, Validators.required),
        policyholdername: new FormControl(null, Validators.required),
        relationship: new FormControl({value: null, disabled: true}),
        policyStartDate: new FormControl(null, Validators.required),
        policyEndDate: new FormControl(null, Validators.required),
        familyMemberInfoId: new FormControl(null, Validators.required),
        active: new FormControl(true, Validators.required),
        remark: new FormControl(null),
        frequencyOfPayment: new FormControl(null, Validators.required),
        premiumAmount: new FormControl(null, Validators.required),
        annualAmount: new FormControl({value: null, disabled: true}, Validators.required),
        fromDate: new FormControl(null, Validators.required),
        toDate: new FormControl(null, Validators.required),
        ecs: new FormControl('0'),
        licMasterPaymentDetailsId: new FormControl(0),
        licMasterId: new FormControl(0),
      });

      // ----------------sneha-----------------
      this.frequencyOfPaymentList = [
        {label: 'Monthly', value: 'Monthly'},
        {label: 'Quarterly', value: 'Quarterly'},
        {label: 'Half-Yearly', value: 'Halfyearly'},
        {label: 'Yearly', value: 'Yearly'},
      ];

      // ---------------- Transaction status List -----------------
      this.refreshTransactionStatustList();

      this.grandTabStatus=false;
      this.isCheckAll=false;
      this.isDisabled=true;
      this.enableSelectAll=false;
      this.enableFileUpload=false;
      this.addNewRowId=0;
      this.hideRemarkDiv = false;
      this.isClear= false;
      this.isCancel= false;;
      this.receiptAmount='0';
      this.globalAddRowIndex = 0;
      this.globalSelectedAmount='0';
  }


  modalRef: BsModalRef;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    } else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop ||
    document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }

  scrollToTop() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
              window.requestAnimationFrame(smoothscroll);
              window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();
  }

  ngOnInit(): void {

    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);
    this.enableAddRow = 0;
    this.enableCheckboxFlag = 1;
    this.enableCheckboxFlag3 = false;
    this.declarationService = new DeclarationService();

    // Business Financial Year API Call
    this.Service.getBusinessFinancialYear().subscribe(res => {
      this.financialYearStart = res.data.results[0].fromDate;
    });

    // Family Member List API call
    this.Service.getFamilyInfo().subscribe(res => {
      this.familyMemberGroup = res.data.results;
      res.data.results.forEach(element => {
        const obj = {
          label: element.familyMemberName,
          value: element.familyMemberName,
        };
        this.familyMemberName.push(obj);
      });
    });

    this.deactivateRemark();
    this.deactiveCopytoActualDate();

    // Summary get Call on Page Load
    this.Service.getEightyCSummary().subscribe(res => {
      //console.log("DATA" +res.data);
      this.summaryGridData = res.data.results[0].licMasterList;
      this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
      this.totalActualAmount = res.data.results[0].totalActualAmount;
      this.futureNewPolicyDeclaredAmount = res.data.results[0].futureNewPolicyDeclaredAmount;
      this.grandTotalDeclaredAmount = res.data.results[0].grandTotalDeclaredAmount;
      this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
    });

    // Get API call for All previous employee Names
    this.Service.getpreviousEmployeName().subscribe(res => {
      console.log('previousEmployeeList::', res);
      if (!res.data.results[0]) {
        return ;
      }
      res.data.results.forEach(element => {
        const obj = {
            label: element.name,
            value: element.previousEmployerId
        };
        this.previousEmployeeList.push(obj);
      });
    });


    // Get All Institutes From Global Table
    this.Service.getAllInstitutesFromGlobal().subscribe(res => {
      //console.log(res);
      res.data.results.forEach(element => {
        const obj = {
          label: element.insurerName,
          value: element.insurerName,
        };
        this.institutionNameList.push(obj);
      });
    });

    // Get All Previous Employer
    this.Service.getAllPreviousEmployer().subscribe(res => {
      console.log(res.data.results);
      if(res.data.results.length > 0) {
        this.employeeJoiningDate = res.data.results[0].joiningDate;
        //console.log('employeeJoiningDate::',this.employeeJoiningDate);
      }
    });

    if ((this.today.getMonth() + 1) <= 3) {
      this.financialYear = (this.today.getFullYear() - 1) + '-' + this.today.getFullYear();
    } else {
      this.financialYear = this.today.getFullYear() + '-' + (this.today.getFullYear() + 1);
    }

    let splitYear = this.financialYear .split('-', 2);

    this.financialYearStartDate = new Date('01-Apr-' + splitYear[0]);
    this.financialYearEndDate = new Date('31-Mar-' + splitYear[1]);

  }

  updatePreviousEmpId(event:any, i:number, j:number) {
    console.log('select box value::', event.target.value);
    this.transactionDetail[j].lictransactionList[i].previousEmployerId = event.target.value;
    console.log('previous emp id::', this.transactionDetail[j].lictransactionList[i].previousEmployerId);
  }

  // ---------------------Summary ----------------------

            // Summary get Call
            summaryPage() {
            this.Service.getEightyCSummary().subscribe(res => {
                this.summaryGridData = res.data.results[0].licMasterList;
                this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
                this.totalActualAmount = res.data.results[0].totalActualAmount;
                this.futureNewPolicyDeclaredAmount = res.data.results[0].futureNewPolicyDeclaredAmount;
                this.grandTotalDeclaredAmount = res.data.results[0].grandTotalDeclaredAmount;
                this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
                //console.log(res);
            });
            }

            // Post New Future Policy Data API call
            addFuturePolicy(): void {
                const data = {
                    futureNewPolicyDeclaredAmount : this.futureNewPolicyDeclaredAmount
                }
                //console.log(data);
                this.Service.postEightyCSummaryFuturePolicy(data).subscribe(res => {
                    //console.log(res);
                    this.summaryGridData = res.data.results[0].licMasterList;
                    this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
                    this.totalActualAmount = res.data.results[0].totalActualAmount;
                    this.futureNewPolicyDeclaredAmount = res.data.results[0].futureNewPolicyDeclaredAmount;
                    this.grandTotalDeclaredAmount = res.data.results[0].grandTotalDeclaredAmount;
                    this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
                });
            }

            jumpToMasterPage(n :number) {
                console.log(n);
                this.tabIndex = 1;
                this.editMaster(3);
            }

            jumpToDeclarationPage(data) {
                this.tabIndex = 2;
                this.selectedInstitution = data;
                this.selectedTransactionInstName(data);
            }

  // ------------------------------------Master----------------------------

    // Policy End Date Validations with Policy Start Date
      setPolicyEndDate() {
        this.policyMinDate = this.form.value.policyStartDate;
        const policyStart = this.datePipe.transform(this.form.get('policyStartDate').value, 'yyyy-MM-dd');
        const policyEnd = this.datePipe.transform(this.form.get('policyEndDate').value, 'yyyy-MM-dd');
        if(policyStart > policyEnd) {
            this.form.controls['policyEndDate'].reset()
        }
        this.form.patchValue({
            fromDate:this.policyMinDate
        });
        this.minFormDate = this.form.value.policyStartDate;
        this.setPaymentDetailToDate();
      }

    // Policy End Date Validations with Current Finanacial Year
      checkFinancialYearStartDateWithPolicyEnd() {
        const policyEnd = this.datePipe.transform(this.form.get('policyEndDate').value, 'yyyy-MM-dd');
        const financialYearStartDate = this.datePipe.transform(this.financialYearStart, 'yyyy-MM-dd');
        if(policyEnd < financialYearStartDate) {
          this.sweetalertWarning('Policy End Date should be greater than or equal to Current Financial Year : '+this.financialYearStart);
          this.form.controls['policyEndDate'].reset();
        } else {
          this.form.patchValue({
            toDate:this.form.value.policyEndDate
          });
          this.maxFromDate = this.form.value.policyEndDate;
        }
      }

    // Payment Detail To Date Validations with Payment Detail From Date
      setPaymentDetailToDate() {
        this.paymentDetailMinDate = this.form.value.fromDate;
        const from = this.datePipe.transform(this.form.get('fromDate').value, 'yyyy-MM-dd');
        const to = this.datePipe.transform(this.form.get('toDate').value, 'yyyy-MM-dd');
        if(from > to) {
          this.form.controls['toDate'].reset();
        }
      }

    // Payment Detail To Date Validations with Current Finanacial Year
      checkFinancialYearStartDateWithPaymentDetailToDate() {
        const to = this.datePipe.transform(this.form.get('toDate').value, 'yyyy-MM-dd');
        const financialYearStartDate = this.datePipe.transform(this.financialYearStart, 'yyyy-MM-dd');
        if(to < financialYearStartDate) {
          this.sweetalertWarning('To Date should be greater than or equal to Current Financial Year : ' +
          this.financialYearStart);
          this.form.controls['toDate'].reset();
        }
      }

    // Get Master Page Data API call
      masterPage() {
        this.Service.getEightyCMaster().subscribe(res => {
          console.log(res);
          this.masterGridData = res.data.results;
          this.masterGridData.forEach(element => {
            element.policyStartDate = new Date(element.policyStartDate);
            element.policyEndDate = new Date(element.policyEndDate);
            element.fromDate = new Date(element.fromDate);
            element.toDate = new Date(element.toDate);
          });
        });
      }

    // Post Master Page Data API call
      addMaster(formData: any, formDirective: FormGroupDirective): void {

        if (this.form.invalid) {
          return;
        }

        const from = this.datePipe.transform(this.form.get('fromDate').value, 'yyyy-MM-dd');
        const to = this.datePipe.transform(this.form.get('toDate').value, 'yyyy-MM-dd');
        const data = this.form.getRawValue();

        data.fromDate = from;
        data.toDate = to;
        data.premiumAmount = data.premiumAmount.toString().replace(',', '');

        console.log('LICdata::', data);

        this.fileService.uploadMultipleMasterFiles(this.masterfilesArray, data)
          .subscribe(res => {
            console.log(res);
            if(res.data.results.length > 0) {
              this.masterGridData = res.data.results;
              this.masterGridData.forEach(element => {
                element.policyStartDate = new Date(element.policyStartDate);
                element.policyEndDate = new Date(element.policyEndDate);
                element.fromDate = new Date(element.fromDate);
                element.toDate = new Date(element.toDate);
              });
              this.sweetalertMasterSuccess('Record saved Successfully.', 'Go to Declaration & Actual Page to see Schedule.');
            } else {
              this.sweetalertWarning(res.status.messsage);
            }

          });

        // this.Service.postEightyCMaster(data).subscribe(res => {
        //     console.log(res);
        //     if(res.data.results.length > 0) {
        //         this.masterGridData = res.data.results;
        //         this.masterGridData.forEach(element => {
        //             element.policyStartDate = new Date(element.policyStartDate);
        //             element.policyEndDate = new Date(element.policyEndDate);
        //             element.fromDate = new Date(element.fromDate);
        //             element.toDate = new Date(element.toDate);
        //         });
        //         this.sweetalertMasterSuccess('Record saved Successfully.', 'Go to Declaration & Actual Page to see Schedule.');
        //     } else {
        //         this.sweetalertWarning(res.status.messsage);
        //     }
        // });

        this.Index = -1;
        formDirective.resetForm();
        this.form.reset();
        this.form.get('active').setValue(true);
        this.form.get('ecs').setValue(0);
        this.showUpdateButton = false;
        this.paymentDetailGridData = [];
        this.masterfilesArray = [];
        this.documentRemark = null;
      }

      // Calculate annual amount on basis of premium and frquency
        calculateAnnualAmount() {
          let installment = this.form.value.premiumAmount;
          installment = installment.toString().replace(',', '');
          //console.log(installment);
          if (!this.form.value.frequencyOfPayment) {
              installment = 0;
          }
          if (this.form.value.frequencyOfPayment === 'Monthly') {
              installment = installment * 12;
          } else if (this.form.value.frequencyOfPayment === 'Quarterly') {
              installment = installment * 4;
          } else if (this.form.value.frequencyOfPayment === 'Halfyearly') {
              installment = installment * 2;
          } else {
              installment = installment * 1;
          }
          let formatedPremiumAmount = this.numberFormat.transform(this.form.value.premiumAmount)
          //console.log(`formatedPremiumAmount::`,formatedPremiumAmount);
          this.form.get('premiumAmount').setValue(formatedPremiumAmount);
          this.form.get('annualAmount').setValue(installment);
        }

      // Family relationship shown on Policyholder selection
        OnSelectionfamilyMemberGroup() {
          const toSelect = this.familyMemberGroup.find(c => c.familyMemberName === this.form.get('policyholdername').value);
          this.form.get('familyMemberInfoId').setValue(toSelect.familyMemberInfoId);
          this.form.get('relationship').setValue(toSelect.relation);
        }

      // Deactivate the Remark
        deactivateRemark() {
          if (this.form.value.active === false) {
            // this.form.get('remark').enable();
            this.hideRemarkDiv=true;
            this.form.get('remark').setValidators([Validators.required]);
          } else {
              this.form.get('remark').clearValidators();
              this.hideRemarkDiv = false;
            // this.form.get('remark').disable();
              this.form.get('remark').reset();
          }
        }

      deactiveCopytoActualDate() {
        if (this.isECS === false) {
          this.hideCopytoActualDate = true;
        } else {
          this.hideCopytoActualDate = false;
        }
      }

      copytoActualDate(dueDate: Date , j: number ,i: number , item: any) {
        dueDate = new Date(dueDate);
        //item.lictransactionList.dateOfPayment = dueDate;
        this.transactionDetail[0].lictransactionList[i].dateOfPayment = dueDate;
        this.declarationService.dateOfPayment = this.transactionDetail[0].lictransactionList[i].dateOfPayment ;
        //this.dateOfPayment = dueDate;
        alert('hiiii');
        console.log('Date OF PAyment' +   this.declarationService.dateOfPayment );
      }

      // On Master Edit functionality
        editMaster(i: number) {
          this.scrollToTop();
          this.paymentDetailGridData = this.masterGridData[i].paymentDetails;
          this.form.patchValue(this.masterGridData[i]);
          //console.log(this.form.getRawValue());
          this.Index = i;
          this.showUpdateButton = true;
          let formatedPremiumAmount = this.numberFormat.transform(this.masterGridData[i].premiumAmount);
          //console.log(`formatedPremiumAmount::`,formatedPremiumAmount);
          this.form.get('premiumAmount').setValue(formatedPremiumAmount);
          this.isClear=true;
        }

      // On Edit Cancel
        cancelEdit() {
          this.form.reset();
          this.form.get('active').setValue(true);
          this.form.get('ecs').setValue(0);
          this.showUpdateButton = false;
          this.paymentDetailGridData = [];
          this.isClear=false;
        }

      // On Master Edit functionality
        viewMaster(i: number) {
          this.scrollToTop();
          this.paymentDetailGridData = this.masterGridData[i].paymentDetails;
          this.form.patchValue(this.masterGridData[i]);
          //console.log(this.form.getRawValue());
          this.Index = i;
          this.showUpdateButton = true;
          let formatedPremiumAmount = this.numberFormat.transform(this.masterGridData[i].premiumAmount)
          //console.log(`formatedPremiumAmount::`,formatedPremiumAmount);
          this.form.get('premiumAmount').setValue(formatedPremiumAmount);
          this.isCancel=true;
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

  // ----------------------------------------------- Declaration --------------------------------------

    //-----------on Page referesh transactionStatustList------------
      refreshTransactionStatustList() {
        this.transactionStatustList = [
          {label: 'All', value: 'All'},
          {label: 'Pending', value: 'Pending'},
          {label: 'Submitted', value: 'Submitted'},
          {label: 'Approved', value: 'Approved'},
          {label: 'Send back', value: 'Send back'},
        ];
      }

    //------- On declaration page get API call for All Institutions added into Master-------
      declarationPage() {

        this.transactionInstitutionNames = [];
        this.transactionPolicyList = [];
        this.transactionStatustList = [];

        const data = {
            label: 'All',
            value: 'All',
        };

        this.transactionInstitutionNames.push(data);
        this.transactionPolicyList.push(data);
        this.refreshTransactionStatustList();

        this.Service.getEightyCDeclarationInstitutionListWithPolicyNo().subscribe(res => {

          this.transactionInstitutionListWithPolicies=res.data.results;

          res.data.results.forEach(element => {
            const obj = {
              label: element.institution,
              value: element.institution,
            };
            this.transactionInstitutionNames.push(obj);

            element.policies.forEach(policy => {
              const policyObj = {
                label: policy,
                value: policy,
              };
              this.transactionPolicyList.push(policyObj);
            });
          });
        });

        this.resetAll();
        this.selectedTransactionInstName('All');
      }

    //--------- On institution selection show all transactions list accordingly all policies--------
      selectedTransactionInstName(institutionName:any) {

        this.globalInstitution=institutionName;
        this.getTransactionFilterData(this.globalInstitution, null, null);

        const data = {
          label: 'All',
          value: 'All',
        };

        this.transactionPolicyList=[];
        this.transactionPolicyList.push(data);

        this.transactionInstitutionListWithPolicies.forEach(element => {

          if (institutionName===element.institution) {
            element.policies.forEach(policy => {
              const policyObj = {
                label: policy,
                value: policy
              };
              this.transactionPolicyList.push(policyObj);
            });
          } else if (institutionName==='All') {
            element.policies.forEach(policy => {
              const policyObj = {
                label: policy,
                value: policy
              };
              this.transactionPolicyList.push(policyObj);
            });
          }
        });

        if(institutionName == 'All') {
          this.grandTabStatus = true;
          this.isDisabled = true;
        } else {
          this.grandTabStatus = false;
          this.isDisabled = false;
        }

        this.resetAll();
      }

    //-------- On Policy selection show all transactions list accordingly all policies---------
      selectedPolicy(policy:any) {
        this.globalPolicy = policy;
        this.getTransactionFilterData(this.globalInstitution, this.globalPolicy, null);
      }

    //------- On Transaction Status selection show all transactions list accordingly all policies------
      selectedTransactionStatus(transactionStatus:any) {
        this.getTransactionFilterData(this.globalInstitution, this.globalPolicy, transactionStatus);
      }

    //-------- ON select to check input boxex--------
      onSelectCheckBox(data: any, event: { target: { checked: any; }; }, item:any) {
        const checked = event.target.checked;

        let formatedGlobalSelectedValue = Number(this.globalSelectedAmount=='0' ? this.globalSelectedAmount
                                                                                : this.globalSelectedAmount.toString().replace(',', ''));
        //console.log('formatedGlobalSelectedValue::', formatedGlobalSelectedValue);

        let formatedActualAmount = Number(data.actualAmount.toString().replace(',', ''));
        //console.log('formatedActualAmount::', formatedActualAmount);

        let formatedSelectedAmount: string;

        if (checked) {
          formatedSelectedAmount = this.numberFormat.transform(formatedGlobalSelectedValue + formatedActualAmount);
          //console.log('in if formatedSelectedAmount::', formatedSelectedAmount);
          this.uploadGridData.push(data.licTransactionId);
        } else {
          formatedSelectedAmount = this.numberFormat.transform(formatedGlobalSelectedValue - formatedActualAmount);
          //console.log('in else formatedSelectedAmount::', formatedSelectedAmount);
          const index = this.uploadGridData.indexOf(data.licTransactionId);
          this.uploadGridData.splice(index, 1);
        }

        this.globalSelectedAmount = formatedSelectedAmount;
        //console.log('this.globalSelectedAmount::', this.globalSelectedAmount);

        if (this.uploadGridData.length) {
            this.enableFileUpload = true;
        }
        console.log(this.uploadGridData);
        console.log(this.uploadGridData.length);
        console.log(item.lictransactionList.length);

        // if (this.uploadGridData.length===item.lictransactionList.length) {
        //   this.isCheckAll = true;
        //   //this.enableSelectAll = true;
        // } else {
        //   this.isCheckAll = false;
        //   //if(this.enableSelectAll)
        // }
      }

    //------------ To Check / Uncheck All  Checkboxes-------------
      checkUncheckAll(item: any) {
        //console.log(this.isCheckAll);
        if(this.isCheckAll) {
          //console.log('CHECK ALL IS FALSE ');
          this.isCheckAll = false;
          this.enableSelectAll = false;
          this.enableCheckboxFlag2 = null;
          this.uploadGridData = [];
        } else {
          // console.log('CHECK ALL IS TRUE ');
          this.isCheckAll = true;
          this.enableSelectAll = true;
          this.enableCheckboxFlag2 = item.institutionName;
          item.lictransactionList.forEach(element => {
              this.uploadGridData.push(element.licTransactionId);
          });
          this.enableFileUpload = true;
        }
        //console.log('enableSelectAll...',  this.enableSelectAll);
        //console.log('uploadGridData...',  this.uploadGridData);
      }

    //--------------- ON change of declared Amount in line-------------
      onDeclaredAmountChange(summary: { previousEmployerName: any; declaredAmount: number;
        dateOfPayment: Date; actualAmount: any;  dueDate: Date}, i:number, j:number) {

        this.declarationService = new DeclarationService(summary);
        //console.log("Ondeclaration Amount change" + summary.declaredAmount);

        this.transactionDetail[j].lictransactionList[i].declaredAmount =  this.declarationService.declaredAmount;
        let formatedDeclaredAmount = this.numberFormat.transform(this.transactionDetail[j].lictransactionList[i].declaredAmount);
        //console.log(`formatedDeclaredAmount::`,formatedDeclaredAmount);
        this.transactionDetail[j].lictransactionList[i].declaredAmount = formatedDeclaredAmount;

        this.declarationTotal=0;
        //this.declaredAmount=0;

        this.transactionDetail[j].lictransactionList.forEach(element => {
          //console.log(element.declaredAmount.toString().replace(',', ""));
          this.declarationTotal+=Number(element.declaredAmount.toString().replace(',', ''));
          //console.log(this.declarationTotal);
          //this.declaredAmount+=Number(element.actualAmount.toString().replace(',', ""));
        });

        this.transactionDetail[j].declarationTotal = this.declarationTotal;
        //console.log( "DeclarATION total==>>" + this.transactionDetail[j].declarationTotal);
      }

    //------------ ON change of DueDate in line----------
      onDueDateChange(summary: { previousEmployerName: any; declaredAmount: number;
        dateOfPayment: Date; actualAmount: number;  dueDate: any}, i:number, j:number )
      {
        this.transactionDetail[j].lictransactionList[i].dueDate = summary.dueDate;
      }

    //------------Actual Amount change-----------
      onActualAmountChange(summary: { previousEmployerName: any; declaredAmount: number;
        dateOfPayment: Date; actualAmount: number;  dueDate: Date}, i:number, j: number)
      {
        this.declarationService = new DeclarationService(summary);
        //console.log("Actual Amount change::" , summary);

        this.transactionDetail[j].lictransactionList[i].actualAmount =  this.declarationService.actualAmount;
        //console.log("Actual Amount changed::" , this.transactionDetail[j].lictransactionList[i].actualAmount);
        let formatedActualAmount = this.numberFormat.transform(this.transactionDetail[j].lictransactionList[i].actualAmount);
        //console.log(`formatedActualAmount::`,formatedActualAmount);
        this.transactionDetail[j].lictransactionList[i].actualAmount = formatedActualAmount;

        if (this.transactionDetail[j].lictransactionList[i].actualAmount !== Number(0)
          || this.transactionDetail[j].lictransactionList[i].actualAmount !== null  ) {
            //console.log(`in if::`,this.transactionDetail[j].lictransactionList[i].actualAmount);
            this.isDisabled = false;
        } else {
            //console.log(`in else::`,this.transactionDetail[j].lictransactionList[i].actualAmount);
            this.isDisabled = true;
        }

        this.actualTotal = 0;
        this.actualAmount = 0;
        this.transactionDetail[j].lictransactionList.forEach(element => {
          //console.log(element.actualAmount.toString().replace(',', ""));
          this.actualTotal += Number(element.actualAmount.toString().replace(',', ''));
          //console.log(this.actualTotal);
          //this.actualAmount += Number(element.actualAmount.toString().replace(',', ""));
        });

        this.transactionDetail[j].actualTotal = this.actualTotal;
        //this.transactionDetail[j].actualAmount = this.actualAmount;
        //console.log(this.transactionDetail[j]);
        //console.log(this.actualTotal);
      }

    //--------Add New ROw Function---------
      // addRowInList( summarynew: { previousEmployerName: any; declaredAmount: any;
      //   dateOfPayment: Date; actualAmount: any;  dueDate: Date}, j: number, i: number) {
      addRowInList( summarynew: { licTransactionId:number; licMasterPaymentDetailsId:number;
        previousEmployerId:number; dueDate: Date; declaredAmount: any;
        dateOfPayment: Date; actualAmount: any; isECS:number }, j: number) {
        //console.log('summary::',  summarynew);
        this.declarationService = new DeclarationService(summarynew);
        //console.log('declarationService::', this.declarationService);
        this.globalAddRowIndex -= 1;
        console.log(' in add this.globalAddRowIndex::',  this.globalAddRowIndex);
        this.shownewRow = true;
        this.declarationService.licTransactionId = this.globalAddRowIndex;
        this.declarationService.declaredAmount = null;
        this.declarationService.dueDate = null;
        this.declarationService.actualAmount = null;
        this.declarationService.dateOfPayment = null;
        this.declarationService.isECS = 0;
        this.declarationService.licMasterPaymentDetailsId = this.transactionDetail[j].lictransactionList[0].licMasterPaymentDetailsId;
        this.transactionDetail[j].lictransactionList.push(this.declarationService);
        console.log('addRow::', this.transactionDetail[j].lictransactionList);
      }

    //-------- Delete Row--------------
      deleteRow(j: number) {
      const rowCount = this.transactionDetail[j].lictransactionList.length - 1 ;
      //console.log('rowcount::', rowCount);
      //console.log('initialArrayIndex::', this.initialArrayIndex);
      if (this.transactionDetail[j].lictransactionList.length == 1) {
        return false;
      } else if ( this.initialArrayIndex[j] <= rowCount  ){
        this.transactionDetail[j].lictransactionList.splice(rowCount, 1);
        return true;
      }
    }

    editDeclrationRow(summary: { previousEmployerName: any; declaredAmount: any;
      dateOfPayment: any; dueDate: any; actualAmount: any; }, i:any, j: any) {
        this.declarationService = new DeclarationService(summary);
    }

    updateDeclrationRow(i: string | number, j: string | number) {
      // tslint:disable-next-line: max-line-length
      this.transactionDetail[j].actualTotal += this.declarationService.actualAmount - this.transactionDetail[j].lictransactionList[i].actualAmount;
      this.transactionDetail[j].lictransactionList[i] =  this.declarationService;
      this.declarationService = new DeclarationService();
    }

    SaveDeclrationRow(j) {
      if (!this.declarationService) {
          return;
      }
      this.transactionDetail[j].declarationTotal += this.declarationService.declaredAmount;
      this.transactionDetail[j].actualTotal +=  this.declarationService.actualAmount;
      this.grandActualTotal += this.declarationService.actualAmount;
      this.grandDeclarationTotal += this.declarationService.declaredAmount;
      this.transactionDetail[j].lictransactionList.push(this.declarationService);
      this.declarationService = new DeclarationService();
    }

    submitDeclaration() {
    // this.tabIndex = 0;
        console.log(this.transactionDetail);
        this.tabIndex = 0;
        this.transactionDetail.forEach(element => {
        element.lictransactionList.forEach(element => {
            element.dateOfPayment = this.datePipe.transform(element.dateOfPayment, 'yyyy-MM-dd');
        });
        });
        const data = this.transactionDetail;
        this.Service.postEightyCDeclarationTransaction(data).subscribe(res => {
        console.log(res);
        this.transactionDetail = res.data.results[0].licTransactionDetail;
        this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
        this.grandActualTotal = res.data.results[0].grandActualTotal;
        this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
        this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;
        this.transactionDetail.forEach(element => {
            element.lictransactionList.forEach(element => {
            element.dateOfPayment = new Date(element.dateOfPayment);
            });
        });
        });
        this.resetAll();
    }



    // Reset All
      resetAll() {
        this.enableEditRow = this.enablePolicyTable = this.addRow2 = -1;
        this.uploadGridData = [];
        this.enableCheckboxFlag3 = false;
        this.enableCheckboxFlag2 = null;
        this.declarationService = new DeclarationService();
      }

  ///// --------------------------------rahul-------------

    UploadFilePopUp() {
        this.displayUploadFile = true;
    }

    onUpload(event) {
        console.log('event::', event);
        if (event.target.files.length > 0) {
            for(let file of event.target.files) {
              this.filesArray.push(file);
            }
        }
        console.log(this.filesArray);
    }

    onMasterUpload(event) {
      console.log('event::', event);
      if (event.target.files.length > 0) {
          for(let file of event.target.files) {
            this.masterfilesArray.push(file);
          }
      }
      console.log(this.masterfilesArray);
    }

    removeDocument() {
      this.currentFileUpload = null;
    }

    // Remove Selected LicTransaction Document
    removeSelectedLicTransactionDocument(index:number) {
      this.filesArray.splice(index, 1);
      console.log('this.filesArray::', this.filesArray);
      console.log('this.filesArray.size::', this.filesArray.length);
    }

    // Remove LicMaster Document
    removeSelectedLicMasterDocument(index:number) {
      this.masterfilesArray.splice(index, 1);
      console.log('this.filesArray::', this.masterfilesArray);
      console.log('this.filesArray.size::', this.masterfilesArray.length);
    }

    upload() {
      // this.currentFileUpload = this.selectedFiles.item(0);
      // const data = {
      //     licTransactionIDs: this.uploadGridData,
      //     receiptNumber: this.receiptNumber,
      //     globalSelectedAmount: this.receiptAmount,
      //     receiptDate: this.receiptDate,
      // };
      //this.uploadGridData = [3,4]

      console.log('this.transactionDetail::', this.transactionDetail);

      this.transactionDetail.forEach(element=>{
        element.lictransactionList.forEach(innerElement => {
          if(innerElement.declaredAmount !== null){
            innerElement.declaredAmount = innerElement.declaredAmount.toString().replace(',', '');
          } else {
            innerElement.declaredAmount = 0.00;
          }
          if(innerElement.actualAmount !== null){
            innerElement.actualAmount = innerElement.actualAmount.toString().replace(',', '');
          } else {
            innerElement.actualAmount = 0.00;
          }

          const dateOfPaymnet = this.datePipe.transform(innerElement.dateOfPayment, 'yyyy-MM-dd');
          const dueDate = this.datePipe.transform(innerElement.dueDate, 'yyyy-MM-dd');

          innerElement.dateOfPayment = dateOfPaymnet;
          innerElement.dueDate = dueDate;

        });
      });

      this.receiptAmount = this.receiptAmount.toString().replace(',', '')
        const data = {
            licTransactionDetail: this.transactionDetail,
            licTransactionIDs: this.uploadGridData,
            receiptAmount: this.receiptAmount,
            documentRemark: this.documentRemark
        };
        console.log('data::', data);

        //this.fileService.uploadSingleFile(this.currentFileUpload, data)
            // .pipe(tap(event => {
            //     if (event.type === HttpEventType.UploadProgress) {
            //         this.loaded = Math.round(100 * event.loaded / event.total);
            //     }
            // }))
        this.fileService.uploadMultipleFiles(this.filesArray, data)
            .subscribe(res => {
                console.log(res);
                if(res.data.results.length > 0) {
                    this.transactionDetail = res.data.results[0].licTransactionDetail;
                    this.documentDetailList = res.data.results[0].documentInformation;
                    this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
                    this.grandActualTotal = res.data.results[0].grandActualTotal;
                    this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
                    this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;
                    this.transactionDetail.forEach(element => {
                            element.lictransactionList.forEach(innerElement => {
                            if(innerElement.dateOfPayment !== null) {
                                  innerElement.dateOfPayment = new Date(innerElement.dateOfPayment);
                            }
                            if(this.employeeJoiningDate < innerElement.dueDate) {
                                innerElement.active = false;
                            }
                            innerElement.declaredAmount = this.numberFormat.transform(innerElement.declaredAmount)
                            //console.log(`formatedPremiumAmount::`,innerElement.declaredAmount);
                        });
                    });
                    this.sweetalertMasterSuccess('Transaction Saved Successfully.', '');
                } else {
                    this.sweetalertWarning(res.status.messsage);
                }
            });
        this.receiptAmount='0.00';
        this.filesArray=[];
        this.globalSelectedAmount='0.00';
    }

    changeReceiptAmountFormat() {
      //let formatedReceiptAmount = this.numberFormat.transform(this.receiptAmount)
      //console.log('formatedReceiptAmount::', formatedReceiptAmount);
      //this.receiptAmount = formatedReceiptAmount;
      this.receiptAmount = this.numberFormat.transform(this.receiptAmount);
      if(this.receiptAmount < this.globalSelectedAmount) {
        this.sweetalertWarning('Receipt Amount should be greater than Selected line Actual Amount.');
      } else if(this.receiptAmount > this.globalSelectedAmount) {
        this.sweetalertInfo('Receipt Amount is greater than Selected line Actual Amount.');
      }
      console.log('receiptAmount::', this.receiptAmount);
    }

    download() {

    }

    sweetalert7(message:any) {
        Swal.fire({
        text: message,
        })
    }

    sweetalertWarning(message:any) {
        Swal.fire({
            title: message,
            showCloseButton: true,
            showCancelButton: false,
            toast:true,
            position:'top-end',
            showConfirmButton:false,
            background:'#e68a00',
            icon:'warning',
            timer: 15000,
            timerProgressBar: true,
        })
    }

    sweetalertInfo(message:any) {
        Swal.fire({
            title: message,
            showCloseButton: true,
            showCancelButton: false,
            toast:true,
            position:'top-end',
            showConfirmButton:false,
            icon:'info',
            timer: 15000,
            timerProgressBar: true,
        })
    }

    sweetalertMasterSuccess(message:any, text:any) {
        Swal.fire({
            title: message,
            text: text,
            showCloseButton: true,
            showCancelButton: false,
            toast:true,
            position:'top-end',
            showConfirmButton:false,
            icon:'success',
            timer: 15000,
            timerProgressBar: true,
        })
    }

    sweetalertError(message:any) {
        Swal.fire({
            title: message,
            showCloseButton: true,
            showCancelButton: false,
            toast:true,
            position:'top-end',
            showConfirmButton:false,
            icon:'error',
            timer: 15000,
            timerProgressBar: true,
        })
    }

    UploadModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(
            template,
            Object.assign({}, { class: 'gray modal-md' })
        );
    }

    UploadedDocumentModal(template1: TemplateRef<any>) {
      this.modalRef = this.modalService.show(
          template1,
          Object.assign({}, { class: 'gray modal-md' })
      );
    }

    declarationEditUpload(template2: TemplateRef<any>, proofSubmissionId) {
      console.log(proofSubmissionId)
      this.modalRef = this.modalService.show(
          template2,
          Object.assign({}, { class: 'gray modal-xl' })
      );

      this.Service.getTransactionByProofSubmissionId(proofSubmissionId).subscribe(res => {
        console.log('edit Data:: ', res);
       this.urlArray = res.data.results[0].documentInformation[0].documentDetailList
        this.editTransactionUpload = res.data.results[0].licTransactionDetail
        console.log(this.urlArray)
        this.urlArray.forEach(element => {
         // element.blobURI = 'data:' + element.documentType + ';base64,' + element.blobURI;
         element.blobURI = 'data:image/image;base64,' + element.blobURI;


         // new Blob([element.blobURI], { type: 'application/octet-stream' });

        });
        console.log('converted:: ',this.urlArray)

      });
  }

  nextDocViewer() {
    this.urlIndex= this.urlIndex+1;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlArray[this.urlIndex].blobURI);
  }

  previousDocViewer() {
    this.urlIndex = this.urlIndex-1;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlArray[this.urlIndex].blobURI);
  }

  docViewer(template3: TemplateRef<any>) {
    this.urlIndex= 0;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlArray[this.urlIndex].blobURI);
    console.log(this.urlSafe)
    this.modalRef = this.modalService.show(
        template3,
        Object.assign({}, { class: 'gray modal-xl' })
    );

  }

  // Common Function for filter to call API
    getTransactionFilterData(institution:String, policyNo:String, transactionStatus:String) {
      //this.Service.getTransactionInstName(data).subscribe(res => {
      this.Service.getTransactionFilterData(institution, policyNo, transactionStatus).subscribe(res => {
        console.log(res);
        this.transactionDetail = res.data.results[0].licTransactionDetail;
        this.documentDetailList = res.data.results[0].documentInformation;
        this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
        this.grandActualTotal = res.data.results[0].grandActualTotal;
        this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
        this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;
        //this.initialArrayIndex = res.data.results[0].licTransactionDetail[0].lictransactionList.length;

        this.initialArrayIndex=[];

        this.transactionDetail.forEach((element) => {

          this.initialArrayIndex.push(element.lictransactionList.length);

          element.lictransactionList.forEach(innerElement => {

            if(innerElement.dateOfPayment !== null) {
              innerElement.dateOfPayment = new Date(innerElement.dateOfPayment);
            }

            // if(this.employeeJoiningDate < innerElement.dueDate) {
            //   innerElement.active = false;
            // }
            if (innerElement.isECS === 0) {
              this.glbalECS == 0;
            } else if (innerElement.isECS === 1) {
              this.glbalECS == 1;
            }
            else{
              this.glbalECS == 0;
            }
            innerElement.declaredAmount = this.numberFormat.transform(innerElement.declaredAmount);
            innerElement.actualAmount =  this.numberFormat.transform(innerElement.actualAmount);
          });
        })
      });
    }

    // tslint:disable-next-line: typedef
    uploadUpdateTransaction() {
      this.editTransactionUpload.forEach(element => {
        this.uploadGridData.push(element.licTransactionId);
    });
        const data = {
            licTransactionDetail: this.editTransactionUpload,
            licTransactionIDs: this.uploadGridData,
            documentRemark: this.documentRemark
        };
        console.log("data::", data);
        this.fileService.uploadMultipleFiles(this.filesArray, data)
            .subscribe(res => {
                console.log(res);
                if(res.data.results.length > 0) {

                    this.sweetalertMasterSuccess("Transaction Saved Successfully.", "");
                } else {
                    this.sweetalertWarning(res.status.messsage);
                }
            });
        this.currentFileUpload = null;
    }

    downloadTransaction(proofSubmissionId) {
      console.log(proofSubmissionId)
      this.Service.getTransactionByProofSubmissionId(proofSubmissionId).subscribe(res => {
        console.log('edit Data:: ', res);
       this.urlArray = res.data.results[0].documentInformation[0].documentDetailList
       this.urlArray.forEach(element => {
        element.blobURI = this.sanitizer.bypassSecurityTrustResourceUrl(element.blobURI);
      });
        console.log(this.urlArray)
      });
    }


    setDateOfPayment(summary: { previousEmployerName: any; declaredAmount: number;
      dateOfPayment: Date; actualAmount: number;  dueDate: any}, i:number, j:number ) {

      this.transactionDetail[j].lictransactionList[i].dateOfPayment = summary.dateOfPayment;
      console.log(this.transactionDetail[j].lictransactionList[i].dateOfPayment);

    }

}

class DeclarationService {
  licTransactionId = 0;
  licMasterPaymentDetailsId:number;
  previousEmployerId = 0;
  dueDate: Date;
  declaredAmount: number;
  dateOfPayment: Date;
  actualAmount: number;
  isECS: 0;
  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
