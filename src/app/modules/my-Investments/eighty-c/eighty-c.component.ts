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
import {ConfirmDialogComponent} from './declarationEditUpload';
import { startOfYear } from 'date-fns';

@Component({
    selector: 'app-eighty-c',
    templateUrl: './eighty-c.component.html',
    styleUrls: ['./eighty-c.component.scss']
})

export class EightyCComponent implements OnInit {

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
  transactionPolicyList: Array<any> = [];
  familyMemberName: Array<any> = [];

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
  initialArrayIndex : number;
  ////// ---------service
  declarationService: DeclarationService;
  displayUploadFile = false;
  uploadedFiles: any[] = [];
  // msgs2: Message[];

  dueDate : Date;
  dateOfPayment : Date;
  date3: Date;
  loaded = 0;
  selectedFiles: FileList;
  currentFileUpload: File;
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
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any)
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
      this.transactionStatustList = [
        {label: 'All', value: 'All'},
        {label: 'Pending', value: 'Pending'},
        {label: 'Submitted', value: 'Submitted'},
        {label: 'Approved', value: 'Approved'},
        {label: 'Send back', value: 'Send back'},
      ];

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
  }


  modalRef: BsModalRef;

  @HostListener("window:scroll", [])
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

  addUpload(summary,i): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '90%',
      height: '40em',
      data: 'asasas',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.documentDetailList = result;
    });
  }

  ngOnInit(): void {

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
                  console.log(res);
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
              this.employeeJoiningDate = res.data.results[0].joiningDate;
              console.log('employeeJoiningDate::',this.employeeJoiningDate);
          });

          if ((this.today.getMonth() + 1) <= 3) {
            this.financialYear = (this.today.getFullYear() - 1) + "-" + this.today.getFullYear();
          } else {
            this.financialYear = this.today.getFullYear() + "-" + (this.today.getFullYear() + 1);
          }

          let splitYear = this.financialYear .split("-", 2);

          this.financialYearStartDate = new Date("01-Apr-" + splitYear[0]);
          this.financialYearEndDate = new Date("31-Mar-" + splitYear[1]);

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
            }

            // Policy End Date Validations with Current Finanacial Year
            checkFinancialYearStartDateWithPolicyEnd() {
                const policyEnd = this.datePipe.transform(this.form.get('policyEndDate').value, 'yyyy-MM-dd');
                const financialYearStartDate = this.datePipe.transform(this.financialYearStart, 'yyyy-MM-dd');
                if(policyEnd < financialYearStartDate) {
                    this.sweetalertWarning('Policy End Date should be greater than or equal to Current Financial Year : ' +
                    this.financialYearStart);
                    this.form.controls['policyEndDate'].reset();
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

            //  Payment Detail To Date Validations with Current Finanacial Year
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

                //const fromDate = this.form.value.fromDate;
                //const toDate = this.form.value.toDate;

                // if ((fromDate > toDate) && (toDate !== null)) {
                //     this.greaterDateValidations = true;
                //     return;
                // } else {
                //     this.greaterDateValidations = false;
                // }

                const from = this.datePipe.transform(this.form.get('fromDate').value, 'yyyy-MM-dd');
                const to = this.datePipe.transform(this.form.get('toDate').value, 'yyyy-MM-dd');
                const data = this.form.getRawValue();

                data.fromDate = from;
                data.toDate = to;
                data.premiumAmount = data.premiumAmount.toString().replace(',', "");
                console.log(data);

                this.Service.postEightyCMaster(data).subscribe(res => {
                    console.log(res);
                    if(res.data.results.length > 0) {
                        this.masterGridData = res.data.results;
                        this.masterGridData.forEach(element => {
                            element.policyStartDate = new Date(element.policyStartDate);
                            element.policyEndDate = new Date(element.policyEndDate);
                            element.fromDate = new Date(element.fromDate);
                            element.toDate = new Date(element.toDate);
                        });
                        this.sweetalertMasterSuccess("Record saved Successfully.", "Go to Declaration & Actual Page to see Schedule.");
                    } else {
                        this.sweetalertWarning(res.status.messsage);
                    }
                });

                this.Index = -1;
                //console.log(this.form.getRawValue());
                formDirective.resetForm();
                this.form.reset();
                this.form.get('active').setValue(true);
                this.form.get('ecs').setValue(0);
                this.showUpdateButton = false;
                this.paymentDetailGridData = [];
            }

            // Calculate annual amount on basis of premium and frquency
            calculateAnnualAmount() {
                let installment = this.form.value.premiumAmount;
                installment = installment.toString().replace(',', "");
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

            // dateValidations() {
            //   const startDate = this.form.value.startDate;
            //   const endDate = this.form.value.endDate;
            //   if ((startDate > endDate) && (endDate !== null)) {
            //     this.greaterDateValidations = true;
            //     return;
            //     } else {
            //     this.greaterDateValidations = false;
            //     }
            // }

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
              alert("hiiii");
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

            cancelEdit() {
                this.form.reset();
                this.form.get('active').setValue(true);
                this.form.get('ecs').setValue(0);
                this.showUpdateButton = false;
                this.paymentDetailGridData = [];
                this.isClear=false;
            }

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
            cancelView() {
                this.form.reset();
                this.form.get('active').setValue(true);
                this.form.get('ecs').setValue(0);
                this.showUpdateButton = false;
                this.paymentDetailGridData = [];
                this.isCancel = false;
            }

        // ----------------------------------------------- Declaration --------------------------------------

            // On declaration page get API call for All Institutions added into Master
            declarationPage() {

                this.transactionInstitutionNames=[];
                const data = {
                    label: 'All',
                    value: 'All',
                };
                //console.log(data);
                this.transactionInstitutionNames.push(data);
                //console.log(this.transactionInstitutionNames);
                // this.Service.getEightyCDeclarationInstitutions().subscribe(res => {
                //     res.data.results[0].forEach(element => {
                //         const obj = {
                //             label: element,
                //             value: element,
                //         };
                //         this.transactionInstitutionNames.push(obj);
                //     });
                //     //console.log(res);
                // });
                this.Service.getEightyCDeclarationInstitutionListWithPolicyNo().subscribe(res => {
                  res.data.results.forEach(element => {
                      const obj = {
                          label: element.institution,
                          value: element.institution,
                      };
                      this.transactionInstitutionNames.push(obj);
                  });
                  //console.log(res);
              });
                this.resetAll();
                this.selectedTransactionInstName('All');
            }

            // On institution selection show all transactions list accordingly all policies
            selectedTransactionInstName(institutionName:any) {
                const data = institutionName;
                //console.log(data);
                this.Service.getTransactionInstName(data).subscribe(res => {
                    console.log(res);
                    this.transactionDetail = res.data.results[0].licTransactionDetail;
                    this.documentDetailList = res.data.results[0].documentInformation;
                    this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
                    this.grandActualTotal = res.data.results[0].grandActualTotal;
                    this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
                    this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;
                    this.initialArrayIndex = res.data.results[0].licTransactionDetail[0].lictransactionList.length;
                    this.transactionDetail.forEach((element) => {
                        element.lictransactionList.forEach(innerElement => {
                            if(innerElement.dateOfPayment !== null) {
                                innerElement.dateOfPayment = new Date(innerElement.dateOfPayment);
                            }
                            if(this.employeeJoiningDate < innerElement.dueDate) {
                                innerElement.active = false;
                            }
                            innerElement.declaredAmount = this.numberFormat.transform(innerElement.declaredAmount);
                            innerElement.actualAmount =  this.numberFormat.transform(innerElement.actualAmount);
                            //console.log(`formatedPremiumAmo unt::`,innerElement.declaredAmount);
                        });
                    })
                });
                if(institutionName == 'All') {
                    this.grandTabStatus = true;
                    this.isDisabled = true;
                } else{
                    this.grandTabStatus = false;
                    this.isDisabled = false;
                }
                this.resetAll();
            }

            // ON select to check input boxex
            onSelectUpload(data: any, event: { target: { checked: any; }; }, i: number, j: number, item) {
                const checked = event.target.checked;
                if (checked) {
                    this.uploadGridData.push(data.licTransactionId);
                } else {
                    const index = this.uploadGridData.indexOf(data.licTransactionId);
                    this.uploadGridData.splice(index, 1);
                }
                if (this.uploadGridData.length) {
                    this.enableCheckboxFlag3 = true;
                    this.enableCheckboxFlag2 = item.institutionName;
                    this.enableFileUpload = true;
                } else {
                    this.enableCheckboxFlag3 = false;
                    this.enableCheckboxFlag2 = null;
                }
                console.log(this.uploadGridData);
                console.log(this.uploadGridData.length);
                console.log(item.lictransactionList.length);

                if (this.uploadGridData.length===item.lictransactionList.length) {
                    this.isCheckAll = true;

                    //this.enableSelectAll = true;
                } else {
                    this.isCheckAll = false;
                   //if(this.enableSelectAll)
                }
            }



            // To Check / Uncheck All  Checkboxes
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

            // ON change of declared Amount in line
            onDeclaredAmountChange(summary: { previousEmployerName: any; declaredAmount: number;
               dateOfPayment: Date; actualAmount: any;  dueDate: Date}, i:number, j:number) {
                //console.log(event);
                //console.log(document.getElementById(event).nodeValue);
                this.declarationService = new DeclarationService(summary);
                console.log("Ondeclaration Amount change" + summary.declaredAmount);

                this.transactionDetail[j].lictransactionList[i].declaredAmount =  this.declarationService.declaredAmount;
                let formatedDeclaredAmount = this.numberFormat.transform(this.transactionDetail[j].lictransactionList[i].declaredAmount);
                //console.log(`formatedDeclaredAmount::`,formatedDeclaredAmount);
                this.transactionDetail[j].lictransactionList[i].declaredAmount = formatedDeclaredAmount;

                this.declarationTotal=0;
                this.declaredAmount=0;
                this.transactionDetail[j].lictransactionList.forEach(element => {
                    console.log(element.declaredAmount.toString().replace(',', ""));
                    this.declarationTotal+=Number(element.declaredAmount.toString().replace(',', ""));
                    console.log(this.declarationTotal);
                    //this.declaredAmount+=Number(element.actualAmount.toString().replace(',', ""));
                });
                this.transactionDetail[j].declarationTotal = this.declarationTotal;
                //this.transactionDetail[j].actualAmount = this.declaredAmount;
                console.log( "DeclarATION total==>>" + this.transactionDetail[j].declarationTotal);
            }

            onDueDateChange(summary: { previousEmployerName: any; declaredAmount: number;
              dateOfPayment: Date; actualAmount: number;  dueDate: any}, i:number, j:number )
            {
              this.transactionDetail[j].lictransactionList[i].dueDate = summary.dueDate;
              console.log("onDueDateChange" +summary.dueDate);

            }


            onActualAmountChange(summary: { previousEmployerName: any; declaredAmount: number;
              dateOfPayment: Date; actualAmount: number;  dueDate: Date}, i: number, j: number)
            {
              this.declarationService = new DeclarationService(summary);
              console.log("Actual Amount change" , summary);

              this.transactionDetail[j].lictransactionList[i].actualAmount =  this.declarationService.actualAmount;
              let formatedActualAmount = this.numberFormat.transform(this.transactionDetail[j].lictransactionList[i].actualAmount);
              console.log(`formatedActualAmount::`,formatedActualAmount);
              this.transactionDetail[j].lictransactionList[i].actualAmount = formatedActualAmount;
              if (this.transactionDetail[j].lictransactionList[i].actualAmount !== Number(0)
              || this.transactionDetail[j].lictransactionList[i].actualAmount !== null  ) {
                    this.isDisabled = false;
                } else {
                  this.isDisabled = true;
                }
              this.actualTotal = 0;
              this.actualAmount = 0;
              this.transactionDetail[j].lictransactionList.forEach(element => {
                  console.log(element.actualAmount.toString().replace(',', ""));
                  this.actualTotal += Number(element.actualAmount.toString().replace(',', ""));
                  console.log(this.actualTotal);
                  this.actualAmount += Number(element.actualAmount.toString().replace(',', ""));
              });
              this.transactionDetail[j].actualTotal = this.actualTotal;
              this.transactionDetail[j].actualAmount = this.actualAmount;
              console.log(this.actualTotal);
            }

            addRowInList( summarynew: { previousEmployerName: any; declaredAmount: any;
              dateOfPayment: Date; actualAmount: any;  dueDate: Date}, j: number , i: number) {
                console.log('summary::',  summarynew);
                this.declarationService = new DeclarationService(summarynew);
                console.log('declarationService::', this.declarationService);
                this.shownewRow = true;
                this.declarationService.declaredAmount = null;
                this.declarationService.dueDate = null;
                this.declarationService.actualAmount = null;
                this.declarationService.dateOfPayment = null;
                this.transactionDetail[j].lictransactionList.push(this.declarationService );
                console.log('addRow::', this.transactionDetail[j].lictransactionList);
                // this.addRow2 = -1;
                // this.addRow1 = false;
                // this.declarationService = new DeclarationService();
                // this.declarationTotal = 0;
                // this.transactionDetail[j].lictransactionList.forEach( element => {
                //     console.log(element.declaredAmount.toString().replace(',', ""));
                //     this.declarationTotal += Number(element.declaredAmount.toString().replace(',', ""));
                //     console.log(this.declarationTotal);
                // });
                // this.transactionDetail[j].declarationTotal = this.declarationTotal;
                // console.log(this.declarationTotal);
            }

  deleteRow(j: number) {
    // tslint:disable-next-line: triple-equals
    const rowCount = this.transactionDetail[j].lictransactionList.length - 1 ;
    console.log('rowcount::', rowCount);
    console.log('initialArrayIndex::', this.initialArrayIndex);
    if (this.transactionDetail[j].lictransactionList.length == 1) {
        return false;
    } else if ( this.initialArrayIndex <= rowCount  ){
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
                console.log(event);
                if (event.target.files.length > 0) {
                    const file = event.target.files[0];
                    this.currentFileUpload = file;
                }
                console.log(this.currentFileUpload);
                // for(let file of event.files) {
                //     this.uploadedFiles.push(file);

                // }
                // this.SuccessMessage();
                //this.upload();
            }
            removeDocument(){
                this.currentFileUpload = null;
            }
            upload() {
                // this.currentFileUpload = this.selectedFiles.item(0);
                // const data = {
                //     licTransactionIDs: this.uploadGridData,
                //     receiptNumber: this.receiptNumber,
                //     receiptAmount: this.receiptAmount,
                //     receiptDate: this.receiptDate,
                // };
                //this.uploadGridData = [3,4]
                this.transactionDetail.forEach(element=>{
                    element.lictransactionList.forEach(innerElement => {
                        innerElement.declaredAmount = innerElement.declaredAmount.toString().replace(',', "");
                        innerElement.actualAmount = innerElement.actualAmount.toString().replace(',', "");
                        });
                });
                this.receiptAmount = this.receiptAmount.toString().replace(',', "")
                const data = {
                    licTransactionDetail: this.transactionDetail,
                    licTransactionIDs: this.uploadGridData,
                    receiptAmount: this.receiptAmount,
                    documentRemark: this.documentRemark
                };

                console.log("data::",data);
                this.fileService.uploadSingleFile(this.currentFileUpload, data)
                    // .pipe(tap(event => {
                    //     if (event.type === HttpEventType.UploadProgress) {
                    //         this.loaded = Math.round(100 * event.loaded / event.total);
                    //     }
                    // }))
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
                            this.sweetalertMasterSuccess("Transaction Saved Successfully.", "");
                        } else {
                            this.sweetalertWarning(res.status.messsage);
                        }
                    });
                this.currentFileUpload = null;
                    //this.receiptAmount = null;
                this.receiptAmount='0.00';
            }

            changeReceiptAmountFormat() {
                let formatedReceiptAmount = this.numberFormat.transform(this.receiptAmount)
                console.log('formatedReceiptAmount::',formatedReceiptAmount);
                this.receiptAmount=formatedReceiptAmount;
                console.log('receiptAmount::',this.receiptAmount);
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

            declarationEditUpload(summary,i): void {
              const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                width: '90%',
                height: '40em',
                data: 'asasas',
              });

              dialogRef.afterClosed().subscribe(result => {
                console.log('The dialog was closed');
                this.documentDetailList = result;
              });
            }

            // private processData() {
            //   const statesSeen = {};
            //   const countiesSeen = {};

            //   this.declarationGridData = this.declarationGridData.sort((a, b) => {
            //     const stateComp = a.state.localeCompare(b.state);
            //     return stateComp ? stateComp : a.county.localeCompare(b.county);
            //   }).map(x => {
            //     const stateSpan = statesSeen[x.state] ? 0 :
            //       this.declarationGridData.filter(y => y.state === x.state).length;

            //     statesSeen[x.state] = true;

            //     const countySpan = countiesSeen[x.state] && countiesSeen[x.state][x.county] ? 0 :
            //       this.declarationGridData.filter(y => y.state === x.state && y.county === x.county).length;

            //     countiesSeen[x.state] = countiesSeen[x.state] || {};
            //     countiesSeen[x.state][x.county] = true;

            //     return { ...x, stateSpan, countySpan };
            //   });
            // }

}

class DeclarationService {
        previousEmployerName: string;
        declaredAmount: number;
        dateOfPayment: Date;
        dueDate: Date;
        actualAmount: number;
        licTransactionId = 0;
        constructor(obj?: any) {
                Object.assign(this, obj);
        }
}



