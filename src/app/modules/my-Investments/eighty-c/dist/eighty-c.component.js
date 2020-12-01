"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.EightyCComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
//sneha
var sweetalert2_1 = require("sweetalert2");
//
var EightyCComponent = /** @class */ (function () {
    // ---------------------------
    function EightyCComponent(formBuilder, Service, datePipe, 
    // private messageService: MessageService,
    http, fileService, numberFormat, modalService, document) {
        this.formBuilder = formBuilder;
        this.Service = Service;
        this.datePipe = datePipe;
        this.http = http;
        this.fileService = fileService;
        this.numberFormat = numberFormat;
        this.modalService = modalService;
        this.document = document;
        this.summaryGridData = [];
        this.masterGridData = [];
        this.paymentDetailGridData = [];
        this.declarationGridData = [];
        this.familyMemberGroup = [];
        this.frequencyOfPaymentList = [];
        this.institutionNameList = [];
        this.transactionDetail = [];
        this.documentDetailList = [];
        this.uploadGridData = [];
        this.transactionInstitutionNames = [];
        this.familyMemberName = [];
        this.tabIndex = 0;
        this.previousEmployeeList = [];
        this.displayUploadFile = false;
        this.uploadedFiles = [];
        this.loaded = 0;
        // this.minDate = new Date();
        this.form = this.formBuilder.group({
            institutionName: new forms_1.FormControl(null, forms_1.Validators.required),
            policyNo: new forms_1.FormControl(null, forms_1.Validators.required),
            policyholdername: new forms_1.FormControl(null, forms_1.Validators.required),
            relationship: new forms_1.FormControl({ value: null, disabled: true }),
            policyStartDate: new forms_1.FormControl(null, forms_1.Validators.required),
            policyEndDate: new forms_1.FormControl(null, forms_1.Validators.required),
            familyMemberInfoId: new forms_1.FormControl(null, forms_1.Validators.required),
            active: new forms_1.FormControl(true, forms_1.Validators.required),
            remark: new forms_1.FormControl(null),
            frequencyOfPayment: new forms_1.FormControl(null, forms_1.Validators.required),
            premiumAmount: new forms_1.FormControl(null, forms_1.Validators.required),
            annualAmount: new forms_1.FormControl({ value: null, disabled: true }, forms_1.Validators.required),
            fromDate: new forms_1.FormControl(null, forms_1.Validators.required),
            toDate: new forms_1.FormControl(null, forms_1.Validators.required),
            ecs: new forms_1.FormControl('0'),
            licMasterPaymentDetailsId: new forms_1.FormControl(0),
            licMasterId: new forms_1.FormControl(0)
        });
        // ----------------sneha-----------------
        this.frequencyOfPaymentList = [
            { label: 'Monthly', value: 'Monthly' },
            { label: 'Quarterly', value: 'Quarterly' },
            { label: 'Half-Yearly', value: 'Halfyearly' },
            { label: 'Yearly', value: 'Yearly' },
        ];
        this.grandTabStatus = false;
        this.isCheckAll = false;
        this.isDisabled = true;
        this.enableSelectAll = false;
        this.enableFileUpload = false;
        this.addNewRowId = 0;
        this.hideRemarkDiv = false;
        this.isClear = false;
        this.isCancel = false;
        ;
        this.receiptAmount = '0';
    }
    EightyCComponent.prototype.onWindowScroll = function () {
        if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
            this.windowScrolled = true;
        }
        else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
            this.windowScrolled = false;
        }
    };
    EightyCComponent.prototype.scrollToTop = function () {
        (function smoothscroll() {
            var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - (currentScroll / 8));
            }
        })();
    };
    EightyCComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.enableAddRow = 0;
        this.enableCheckboxFlag = 1;
        this.enableCheckboxFlag3 = false;
        this.declarationService = new DeclarationService();
        // Business Financial Year API Call
        this.Service.getBusinessFinancialYear().subscribe(function (res) {
            _this.financialYearStart = res.data.results[0].fromDate;
        });
        // Family Member List API call
        this.Service.getFamilyInfo().subscribe(function (res) {
            _this.familyMemberGroup = res.data.results;
            res.data.results.forEach(function (element) {
                var obj = {
                    label: element.familyMemberName,
                    value: element.familyMemberName
                };
                _this.familyMemberName.push(obj);
            });
        });
        // Summary get Call on Page Load
        this.Service.getEightyCSummary().subscribe(function (res) {
            //console.log(res.data);
            _this.summaryGridData = res.data.results[0].licMasterList;
            _this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
            _this.totalActualAmount = res.data.results[0].totalActualAmount;
            _this.futureNewPolicyDeclaredAmount = res.data.results[0].futureNewPolicyDeclaredAmount;
            _this.grandTotalDeclaredAmount = res.data.results[0].grandTotalDeclaredAmount;
            _this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
        });
        // Get API call for All previous employee Names
        this.Service.getpreviousEmployeName().subscribe(function (res) {
            console.log(res);
            if (!res.data.results[0]) {
                return;
            }
            res.data.results.forEach(function (element) {
                var obj = {
                    label: element.name,
                    value: element.previousEmployerId
                };
                _this.previousEmployeeList.push(obj);
            });
        });
        // Get All Institutes From Global Table
        this.Service.getAllInstitutesFromGlobal().subscribe(function (res) {
            //console.log(res);
            res.data.results.forEach(function (element) {
                var obj = {
                    label: element.insurerName,
                    value: element.insurerName
                };
                _this.institutionNameList.push(obj);
            });
        });
        // Get All Previous Employer
        this.Service.getAllPreviousEmployer().subscribe(function (res) {
            console.log(res.data.results);
            _this.employeeJoiningDate = res.data.results[0].joiningDate;
            console.log('employeeJoiningDate::', _this.employeeJoiningDate);
        });
    };
    // ---------------------Summary ----------------------
    // Summary get Call
    EightyCComponent.prototype.summaryPage = function () {
        var _this = this;
        this.Service.getEightyCSummary().subscribe(function (res) {
            _this.summaryGridData = res.data.results[0].licMasterList;
            _this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
            _this.totalActualAmount = res.data.results[0].totalActualAmount;
            _this.futureNewPolicyDeclaredAmount = res.data.results[0].futureNewPolicyDeclaredAmount;
            _this.grandTotalDeclaredAmount = res.data.results[0].grandTotalDeclaredAmount;
            _this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
            //console.log(res);
        });
    };
    // Post New Future Policy Data API call
    EightyCComponent.prototype.addFuturePolicy = function () {
        var _this = this;
        var data = {
            futureNewPolicyDeclaredAmount: this.futureNewPolicyDeclaredAmount
        };
        //console.log(data);
        this.Service.postEightyCSummaryFuturePolicy(data).subscribe(function (res) {
            //console.log(res);
            _this.summaryGridData = res.data.results[0].licMasterList;
            _this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
            _this.totalActualAmount = res.data.results[0].totalActualAmount;
            _this.futureNewPolicyDeclaredAmount = res.data.results[0].futureNewPolicyDeclaredAmount;
            _this.grandTotalDeclaredAmount = res.data.results[0].grandTotalDeclaredAmount;
            _this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
        });
    };
    EightyCComponent.prototype.jumpToMasterPage = function (n) {
        console.log(n);
        this.tabIndex = 1;
        this.editMaster(3);
    };
    EightyCComponent.prototype.jumpToDeclarationPage = function (data) {
        this.tabIndex = 2;
        this.selectedInstitution = data;
        this.selectedTransactionInstName(data);
    };
    // ------------------------------------Master----------------------------
    // Policy End Date Validations with Policy Start Date
    EightyCComponent.prototype.setPolicyEndDate = function () {
        this.policyMinDate = this.form.value.policyStartDate;
        var policyStart = this.datePipe.transform(this.form.get('policyStartDate').value, 'yyyy-MM-dd');
        var policyEnd = this.datePipe.transform(this.form.get('policyEndDate').value, 'yyyy-MM-dd');
        if (policyStart > policyEnd) {
            this.form.controls['policyEndDate'].reset();
        }
        this.form.patchValue({
            fromDate: this.form.value.policyStartDate
        });
        this.minFormDate = this.form.value.policyStartDate;
        this.setPaymentDetailToDate();
    };
    // Policy End Date Validations with Current Finanacial Year
    EightyCComponent.prototype.checkFinancialYearStartDateWithPolicyEnd = function () {
        var policyEnd = this.datePipe.transform(this.form.get('policyEndDate').value, 'yyyy-MM-dd');
        var financialYearStartDate = this.datePipe.transform(this.financialYearStart, 'yyyy-MM-dd');
        if (policyEnd < financialYearStartDate) {
            this.sweetalertWarning("Policy End Date should be greater than or equal to Current Financial Year : " + this.financialYearStart);
            this.form.controls['policyEndDate'].reset();
        }
        else {
            this.form.patchValue({
                toDate: this.form.value.policyEndDate
            });
            this.maxFromDate = this.form.value.policyEndDate;
        }
    };
    // Payment Detail To Date Validations with Payment Detail From Date
    EightyCComponent.prototype.setPaymentDetailToDate = function () {
        this.paymentDetailMinDate = this.form.value.fromDate;
        var from = this.datePipe.transform(this.form.get('fromDate').value, 'yyyy-MM-dd');
        var to = this.datePipe.transform(this.form.get('toDate').value, 'yyyy-MM-dd');
        if (from > to) {
            this.form.controls['toDate'].reset();
        }
    };
    //  Payment Detail To Date Validations with Current Finanacial Year
    EightyCComponent.prototype.checkFinancialYearStartDateWithPaymentDetailToDate = function () {
        var to = this.datePipe.transform(this.form.get('toDate').value, 'yyyy-MM-dd');
        var financialYearStartDate = this.datePipe.transform(this.financialYearStart, 'yyyy-MM-dd');
        if (to < financialYearStartDate) {
            this.sweetalertWarning("To Date should be greater than or equal to Current Financial Year : " + this.financialYearStart);
            this.form.controls['toDate'].reset();
        }
    };
    // Get Master Page Data API call
    EightyCComponent.prototype.masterPage = function () {
        var _this = this;
        this.Service.getEightyCMaster().subscribe(function (res) {
            console.log(res);
            _this.masterGridData = res.data.results;
            _this.masterGridData.forEach(function (element) {
                element.policyStartDate = new Date(element.policyStartDate);
                element.policyEndDate = new Date(element.policyEndDate);
                element.fromDate = new Date(element.fromDate);
                element.toDate = new Date(element.toDate);
            });
        });
    };
    // Post Master Page Data API call
    EightyCComponent.prototype.addMaster = function (formData, formDirective) {
        var _this = this;
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
        var from = this.datePipe.transform(this.form.get('fromDate').value, 'yyyy-MM-dd');
        var to = this.datePipe.transform(this.form.get('toDate').value, 'yyyy-MM-dd');
        var data = this.form.getRawValue();
        data.fromDate = from;
        data.toDate = to;
        data.premiumAmount = data.premiumAmount.toString().replace(',', "");
        console.log(data);
        this.Service.postEightyCMaster(data).subscribe(function (res) {
            console.log(res);
            if (res.data.results.length > 0) {
                _this.masterGridData = res.data.results;
                _this.masterGridData.forEach(function (element) {
                    element.policyStartDate = new Date(element.policyStartDate);
                    element.policyEndDate = new Date(element.policyEndDate);
                    element.fromDate = new Date(element.fromDate);
                    element.toDate = new Date(element.toDate);
                });
                _this.sweetalertMasterSuccess("Record saved Successfully.", "Go to Declaration & Actual Page to see Schedule.");
            }
            else {
                _this.sweetalertWarning(res.status.messsage);
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
    };
    // Calculate annual amount on basis of premium and frquency
    EightyCComponent.prototype.calculateAnnualAmount = function () {
        var installment = this.form.value.premiumAmount;
        installment = installment.toString().replace(',', "");
        //console.log(installment);
        if (!this.form.value.frequencyOfPayment) {
            installment = 0;
        }
        if (this.form.value.frequencyOfPayment === 'Monthly') {
            installment = installment * 12;
        }
        else if (this.form.value.frequencyOfPayment === 'Quarterly') {
            installment = installment * 4;
        }
        else if (this.form.value.frequencyOfPayment === 'Halfyearly') {
            installment = installment * 2;
        }
        else {
            installment = installment * 1;
        }
        var formatedPremiumAmount = this.numberFormat.transform(this.form.value.premiumAmount);
        //console.log(`formatedPremiumAmount::`,formatedPremiumAmount);
        this.form.get('premiumAmount').setValue(formatedPremiumAmount);
        this.form.get('annualAmount').setValue(installment);
    };
    // Family relationship shown on Policyholder selection
    EightyCComponent.prototype.OnSelectionfamilyMemberGroup = function () {
        var _this = this;
        var toSelect = this.familyMemberGroup.find(function (c) { return c.familyMemberName === _this.form.get('policyholdername').value; });
        this.form.get('familyMemberInfoId').setValue(toSelect.familyMemberInfoId);
        this.form.get('relationship').setValue(toSelect.relation);
    };
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
    EightyCComponent.prototype.deactivateRemark = function () {
        if (this.form.value.active === false) {
            // this.form.get('remark').enable();
            this.hideRemarkDiv = true;
            this.form.get('remark').setValidators([forms_1.Validators.required]);
        }
        else {
            this.form.get('remark').clearValidators();
            this.hideRemarkDiv = false;
            // this.form.get('remark').disable();
            this.form.get('remark').reset();
        }
    };
    // On Master Edit functionality
    EightyCComponent.prototype.editMaster = function (i) {
        this.scrollToTop();
        this.paymentDetailGridData = this.masterGridData[i].paymentDetails;
        this.form.patchValue(this.masterGridData[i]);
        //console.log(this.form.getRawValue());
        this.Index = i;
        this.showUpdateButton = true;
        var formatedPremiumAmount = this.numberFormat.transform(this.masterGridData[i].premiumAmount);
        //console.log(`formatedPremiumAmount::`,formatedPremiumAmount);
        this.form.get('premiumAmount').setValue(formatedPremiumAmount);
        this.isClear = true;
    };
    EightyCComponent.prototype.cancelEdit = function () {
        this.form.reset();
        this.form.get('active').setValue(true);
        this.form.get('ecs').setValue(0);
        this.showUpdateButton = false;
        this.paymentDetailGridData = [];
        this.isClear = false;
    };
    EightyCComponent.prototype.viewMaster = function (i) {
        this.scrollToTop();
        this.paymentDetailGridData = this.masterGridData[i].paymentDetails;
        this.form.patchValue(this.masterGridData[i]);
        //console.log(this.form.getRawValue());
        this.Index = i;
        this.showUpdateButton = true;
        var formatedPremiumAmount = this.numberFormat.transform(this.masterGridData[i].premiumAmount);
        //console.log(`formatedPremiumAmount::`,formatedPremiumAmount);
        this.form.get('premiumAmount').setValue(formatedPremiumAmount);
        this.isCancel = true;
    };
    EightyCComponent.prototype.cancelView = function () {
        this.form.reset();
        this.form.get('active').setValue(true);
        this.form.get('ecs').setValue(0);
        this.showUpdateButton = false;
        this.paymentDetailGridData = [];
        this.isCancel = false;
    };
    // ----------------------------------------------- Declaration --------------------------------------
    // On declaration page get API call for All Institutions added into Master
    EightyCComponent.prototype.declarationPage = function () {
        var _this = this;
        this.transactionInstitutionNames = [];
        var data = {
            label: 'All',
            value: 'All'
        };
        //console.log(data);
        this.transactionInstitutionNames.push(data);
        //console.log(this.transactionInstitutionNames);
        this.Service.getEightyCDeclarationInstitutions().subscribe(function (res) {
            res.data.results[0].forEach(function (element) {
                var obj = {
                    label: element,
                    value: element
                };
                _this.transactionInstitutionNames.push(obj);
            });
            //console.log(res);
        });
        this.resetAll();
        this.selectedTransactionInstName('All');
    };
    // On institution selection show all transactions list accordingly all policies
    EightyCComponent.prototype.selectedTransactionInstName = function (institutionName) {
        var _this = this;
        var data = institutionName;
        //console.log(data);
        this.Service.getTransactionInstName(data).subscribe(function (res) {
            console.log(res);
            _this.transactionDetail = res.data.results[0].licTransactionDetail;
            _this.documentDetailList = res.data.results[0].documentInformation;
            _this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
            _this.grandActualTotal = res.data.results[0].grandActualTotal;
            _this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
            _this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;
            _this.transactionDetail.forEach(function (element) {
                element.lictransactionList.forEach(function (innerElement) {
                    if (innerElement.dateOfPayment !== null) {
                        innerElement.dateOfPayment = new Date(innerElement.dateOfPayment);
                    }
                    if (_this.employeeJoiningDate < innerElement.dueDate) {
                        innerElement.active = false;
                    }
                    innerElement.declaredAmount = _this.numberFormat.transform(innerElement.declaredAmount);
                    //console.log(`formatedPremiumAmount::`,innerElement.declaredAmount);
                });
            });
        });
        if (institutionName == 'All') {
            this.grandTabStatus = true;
            this.isDisabled = true;
        }
        else {
            this.grandTabStatus = false;
            this.isDisabled = false;
        }
        this.resetAll();
    };
    // ON select to check input boxex
    EightyCComponent.prototype.onSelectUpload = function (data, event, i, j, item) {
        var checked = event.target.checked;
        if (checked) {
            this.uploadGridData.push(data.licTransactionId);
        }
        else {
            var index = this.uploadGridData.indexOf(data.licTransactionId);
            this.uploadGridData.splice(index, 0);
        }
        if (this.uploadGridData.length) {
            this.enableCheckboxFlag3 = true;
            this.enableCheckboxFlag2 = item.institutionName;
            this.enableFileUpload = true;
        }
        else {
            this.enableCheckboxFlag3 = false;
            this.enableCheckboxFlag2 = null;
        }
        console.log(this.uploadGridData);
        console.log(this.uploadGridData.length);
        console.log(item.lictransactionList.length);
        if (this.uploadGridData.length === item.lictransactionList.length) {
            this.isCheckAll = true;
            //this.enableSelectAll = true;
        }
        else {
            this.isCheckAll = false;
            //if(this.enableSelectAll)
        }
    };
    // To Check / Uncheck Single checkbox
    EightyCComponent.prototype.singleSelect = function () {
        //console.log('hi....');
    };
    // To Check / Uncheck All  Checkboxes
    EightyCComponent.prototype.checkUncheckAll = function (item) {
        var _this = this;
        //console.log(this.isCheckAll);
        if (this.isCheckAll) {
            //console.log('CHECK ALL IS FALSE ');
            this.isCheckAll = false;
            this.enableSelectAll = false;
            this.enableCheckboxFlag2 = null;
            this.uploadGridData = [];
        }
        else {
            // console.log('CHECK ALL IS TRUE ');
            this.isCheckAll = true;
            this.enableSelectAll = true;
            this.enableCheckboxFlag2 = item.institutionName;
            item.lictransactionList.forEach(function (element) {
                _this.uploadGridData.push(element.licTransactionId);
            });
            this.enableFileUpload = true;
        }
        //console.log('enableSelectAll...',  this.enableSelectAll);
        //console.log('uploadGridData...',  this.uploadGridData);
    };
    // ON change of declared Amount in line
    EightyCComponent.prototype.onDeclaredAmountChange = function (summary, i, j) {
        var _this = this;
        //console.log(event);
        //console.log(document.getElementById(event).nodeValue);
        this.declarationService = new DeclarationService(summary);
        //console.log(summary);
        this.transactionDetail[j].lictransactionList[i].declaredAmount = this.declarationService.declaredAmount;
        var formatedDeclaredAmount = this.numberFormat.transform(this.transactionDetail[j].lictransactionList[i].declaredAmount);
        //console.log(`formatedDeclaredAmount::`,formatedDeclaredAmount);
        this.transactionDetail[j].lictransactionList[i].declaredAmount = formatedDeclaredAmount;
        //console.log('declaredAmount::', this.transactionDetail[j].lictransactionList[i].declaredAmount);
        //console.log(this.transactionDetail[j].declarationTotal);
        //this.transactionDetail[j].declarationTotal.toString().replace(',', "")+=this.declarationService.declaredAmount;
        // this.declarationTotal = this.transactionDetail[j].declarationTotal;
        //this.declaredAmount = this.declarationService.declaredAmount;
        //this.transactionDetail[j].declarationTotal+=Number(this.declaredAmount);
        this.declarationTotal = 0;
        this.declaredAmount = 0;
        this.transactionDetail[j].lictransactionList.forEach(function (element) {
            console.log(element.declaredAmount.toString().replace(',', ""));
            _this.declarationTotal += Number(element.declaredAmount.toString().replace(',', ""));
            console.log(_this.declarationTotal);
            _this.declaredAmount += Number(element.actualAmount.toString().replace(',', ""));
        });
        this.transactionDetail[j].declarationTotal = this.declarationTotal;
        this.transactionDetail[j].actualAmount = this.declaredAmount;
        console.log(this.declarationTotal);
    };
    EightyCComponent.prototype.addRowInList = function (summary, i, j) {
        var _this = this;
        console.log('summary::', summary);
        this.declarationService = new DeclarationService(summary);
        console.log('declarationService::', this.declarationService);
        //this.transactionDetail[j].lictransactionList[summary]
        this.transactionDetail[j].lictransactionList.push(this.declarationService);
        // this.transactionDetail[j].lictransactionList[i+1].active=true;
        // this.transactionDetail[j].lictransactionList[i+1].actualAmount=this.declarationService.actualAmount;
        // this.transactionDetail[j].lictransactionList[i+1].amountRejected=this.declarationService.actualAmount;
        // this.transactionDetail[j].lictransactionList[i+1].amountApproved=this.declarationService.actualAmount;
        // this.transactionDetail[j].lictransactionList[i+1].dateOfPayment=this.declarationService.dateOfPayment;
        // this.transactionDetail[j].lictransactionList[i+1].declaredAmount=this.declarationService.declaredAmount;
        // this.transactionDetail[j].lictransactionList[i+1].dueDate=this.declarationService.dueDate;
        // this.transactionDetail[j].lictransactionList[i+1].licMasterPaymentDetailsId=this.transactionDetail[j].lictransactionList[i].licMasterPaymentDetailsId;
        // this.transactionDetail[j].lictransactionList[i+1].licTransactionId=0;
        //let formatedDeclaredAmount = this.numberFormat.transform(this.transactionDetail[j].lictransactionList[i].declaredAmount)
        //console.log(`formatedDeclaredAmount::`,formatedDeclaredAmount);
        //this.transactionDetail[j].lictransactionList[i].declaredAmount = formatedDeclaredAmount;
        console.log('addRow::', this.transactionDetail[j].lictransactionList);
        this.addRow2 = -1;
        this.addRow1 = false;
        this.declarationService = new DeclarationService();
        this.declarationTotal = 0;
        this.transactionDetail[j].lictransactionList.forEach(function (element) {
            console.log(element.declaredAmount.toString().replace(',', ""));
            _this.declarationTotal += Number(element.declaredAmount.toString().replace(',', ""));
            console.log(_this.declarationTotal);
        });
        this.transactionDetail[j].declarationTotal = this.declarationTotal;
        console.log(this.declarationTotal);
    };
    EightyCComponent.prototype.editDeclrationRow = function (summary, i, j) {
        this.declarationService = new DeclarationService(summary);
    };
    EightyCComponent.prototype.updateDeclrationRow = function (i, j) {
        this.transactionDetail[j].actualTotal += this.declarationService.actualAmount - this.transactionDetail[j].lictransactionList[i].actualAmount;
        this.transactionDetail[j].lictransactionList[i] = this.declarationService;
        this.declarationService = new DeclarationService();
    };
    EightyCComponent.prototype.SaveDeclrationRow = function (j) {
        if (!this.declarationService) {
            return;
        }
        this.transactionDetail[j].declarationTotal += this.declarationService.declaredAmount;
        this.transactionDetail[j].actualTotal += this.declarationService.actualAmount;
        this.grandActualTotal += this.declarationService.actualAmount;
        this.grandDeclarationTotal += this.declarationService.declaredAmount;
        this.transactionDetail[j].lictransactionList.push(this.declarationService);
        this.declarationService = new DeclarationService();
    };
    EightyCComponent.prototype.submitDeclaration = function () {
        var _this = this;
        // this.tabIndex = 0;
        console.log(this.transactionDetail);
        this.tabIndex = 0;
        this.transactionDetail.forEach(function (element) {
            element.lictransactionList.forEach(function (element) {
                element.dateOfPayment = _this.datePipe.transform(element.dateOfPayment, 'yyyy-MM-dd');
            });
        });
        var data = this.transactionDetail;
        this.Service.postEightyCDeclarationTransaction(data).subscribe(function (res) {
            console.log(res);
            _this.transactionDetail = res.data.results[0].licTransactionDetail;
            _this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
            _this.grandActualTotal = res.data.results[0].grandActualTotal;
            _this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
            _this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;
            _this.transactionDetail.forEach(function (element) {
                element.lictransactionList.forEach(function (element) {
                    element.dateOfPayment = new Date(element.dateOfPayment);
                });
            });
        });
        this.resetAll();
    };
    EightyCComponent.prototype.resetAll = function () {
        this.enableEditRow = this.enablePolicyTable = this.addRow2 = -1;
        this.uploadGridData = [];
        this.enableCheckboxFlag3 = false;
        this.enableCheckboxFlag2 = null;
        this.declarationService = new DeclarationService();
    };
    ///// --------------------------------rahul-------------
    EightyCComponent.prototype.UploadFilePopUp = function () {
        this.displayUploadFile = true;
    };
    EightyCComponent.prototype.onUpload = function (event) {
        console.log(event);
        if (event.target.files.length > 0) {
            var file = event.target.files[0];
            this.currentFileUpload = file;
        }
        console.log(this.currentFileUpload);
        // for(let file of event.files) {
        //     this.uploadedFiles.push(file);
        // }
        // this.SuccessMessage();
        //this.upload();
    };
    EightyCComponent.prototype.removeDocument = function () {
        this.currentFileUpload = null;
    };
    EightyCComponent.prototype.upload = function () {
        var _this = this;
        // this.currentFileUpload = this.selectedFiles.item(0);
        // const data = {
        //     licTransactionIDs: this.uploadGridData,
        //     receiptNumber: this.receiptNumber,
        //     receiptAmount: this.receiptAmount,
        //     receiptDate: this.receiptDate,
        // };
        //this.uploadGridData = [3,4]
        this.transactionDetail.forEach(function (element) {
            element.lictransactionList.forEach(function (innerElement) {
                innerElement.declaredAmount = innerElement.declaredAmount.toString().replace(',', "");
                innerElement.actualAmount = innerElement.actualAmount.toString().replace(',', "");
            });
        });
        this.receiptAmount = this.receiptAmount.toString().replace(',', "");
        var data = {
            licTransactionDetail: this.transactionDetail,
            licTransactionIDs: this.uploadGridData,
            receiptAmount: this.receiptAmount,
            documentRemark: this.documentRemark
        };
        console.log("data::", data);
        this.fileService.uploadSingleFile(this.currentFileUpload, data)
            // .pipe(tap(event => {
            //     if (event.type === HttpEventType.UploadProgress) {
            //         this.loaded = Math.round(100 * event.loaded / event.total);
            //     }
            // }))
            .subscribe(function (res) {
            console.log(res);
            if (res.data.results.length > 0) {
                _this.transactionDetail = res.data.results[0].licTransactionDetail;
                _this.documentDetailList = res.data.results[0].documentInformation;
                _this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
                _this.grandActualTotal = res.data.results[0].grandActualTotal;
                _this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
                _this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;
                _this.transactionDetail.forEach(function (element) {
                    element.lictransactionList.forEach(function (innerElement) {
                        if (innerElement.dateOfPayment !== null) {
                            innerElement.dateOfPayment = new Date(innerElement.dateOfPayment);
                        }
                        if (_this.employeeJoiningDate < innerElement.dueDate) {
                            innerElement.active = false;
                        }
                        innerElement.declaredAmount = _this.numberFormat.transform(innerElement.declaredAmount);
                        //console.log(`formatedPremiumAmount::`,innerElement.declaredAmount);
                    });
                });
                _this.sweetalertMasterSuccess("Transaction Saved Successfully.", "");
            }
            else {
                _this.sweetalertWarning(res.status.messsage);
            }
        });
        this.currentFileUpload = null;
        //this.receiptAmount = null;
        this.receiptAmount = '0.00';
    };
    EightyCComponent.prototype.changeReceiptAmountFormat = function () {
        var formatedReceiptAmount = this.numberFormat.transform(this.receiptAmount);
        console.log('formatedReceiptAmount::', formatedReceiptAmount);
        this.receiptAmount = formatedReceiptAmount;
        console.log('receiptAmount::', this.receiptAmount);
    };
    EightyCComponent.prototype.download = function () {
    };
    EightyCComponent.prototype.sweetalert7 = function (message) {
        sweetalert2_1["default"].fire({
            text: message
        });
    };
    EightyCComponent.prototype.sweetalertWarning = function (message) {
        sweetalert2_1["default"].fire({
            title: message,
            showCloseButton: true,
            showCancelButton: false,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            background: '#e68a00',
            icon: 'warning',
            timer: 15000,
            timerProgressBar: true
        });
    };
    EightyCComponent.prototype.sweetalertInfo = function (message) {
        sweetalert2_1["default"].fire({
            title: message,
            showCloseButton: true,
            showCancelButton: false,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            icon: 'info',
            timer: 15000,
            timerProgressBar: true
        });
    };
    EightyCComponent.prototype.sweetalertMasterSuccess = function (message, text) {
        sweetalert2_1["default"].fire({
            title: message,
            text: text,
            showCloseButton: true,
            showCancelButton: false,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            icon: 'success',
            timer: 15000,
            timerProgressBar: true
        });
    };
    EightyCComponent.prototype.sweetalertError = function (message) {
        sweetalert2_1["default"].fire({
            title: message,
            showCloseButton: true,
            showCancelButton: false,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            icon: 'error',
            timer: 15000,
            timerProgressBar: true
        });
    };
    EightyCComponent.prototype.UploadedDocumentModal = function (template1) {
        this.modalRef = this.modalService.show(template1, Object.assign({}, { "class": 'gray modal-md' }));
    };
    EightyCComponent.prototype.UploadModal = function (template) {
        this.modalRef = this.modalService.show(template, Object.assign({}, { "class": 'gray modal-md' }));
    };
    __decorate([
        core_1.HostListener("window:scroll", [])
    ], EightyCComponent.prototype, "onWindowScroll");
    EightyCComponent = __decorate([
        core_1.Component({
            selector: 'app-eighty-c',
            templateUrl: './eighty-c.component.html',
            styleUrls: ['./eighty-c.component.scss']
        }),
        __param(7, core_1.Inject(common_1.DOCUMENT))
    ], EightyCComponent);
    return EightyCComponent;
}());
exports.EightyCComponent = EightyCComponent;
var DeclarationService = /** @class */ (function () {
    function DeclarationService(obj) {
        this.licTransactionId = 0;
        Object.assign(this, obj);
    }
    return DeclarationService;
}());
