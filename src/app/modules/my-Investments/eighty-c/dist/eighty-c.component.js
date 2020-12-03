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
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var EightyCComponent = /** @class */ (function () {
    function EightyCComponent(formBuilder, Service, datePipe, http, fileService, numberFormat, dialog, modalService, alertService, document, sanitizer) {
        this.formBuilder = formBuilder;
        this.Service = Service;
        this.datePipe = datePipe;
        this.http = http;
        this.fileService = fileService;
        this.numberFormat = numberFormat;
        this.dialog = dialog;
        this.modalService = modalService;
        this.alertService = alertService;
        this.document = document;
        this.sanitizer = sanitizer;
        this.submitted = false;
        this.pdfSrc = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
        this.pdfSrc1 = 'https://www.gstatic.com/webp/gallery/1.jpg';
        this.name = 'Set iframe source';
        this.summarynew = {};
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
        this.editTransactionUpload = [];
        this.transactionPolicyList = [];
        this.transactionInstitutionListWithPolicies = [];
        this.familyMemberName = [];
        this.urlArray = [];
        this.tabIndex = 0;
        this.previousEmployeeList = [];
        this.proofSubmissionFileList = [];
        this.proofSubmissionPolicyNoList = [];
        this.isECS = true;
        this.hideCopytoActualDate = false;
        this.shownewRow = false;
        this.initialArray = true;
        this.initialArrayIndex = [];
        this.displayUploadFile = false;
        this.uploadedFiles = [];
        this.viewDocumentDetail = true;
        this.masterUploadFlag = true;
        this.loaded = 0;
        this.filesArray = [];
        this.masterfilesArray = [];
        this.today = new Date();
        this.globalInstitution = 'ALL';
        this.globalPolicy = 'ALL';
        this.globalTransactionStatus = 'ALL';
        // this.minDate = new Date();
        this.form = this.formBuilder.group({
            institutionName: new forms_1.FormControl(null, forms_1.Validators.required),
            policyNo: new forms_1.FormControl(null, forms_1.Validators.required),
            policyholdername: new forms_1.FormControl(null, forms_1.Validators.required),
            relationship: new forms_1.FormControl({ value: null, disabled: true }, forms_1.Validators.required),
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
        // ---------------- Transaction status List -----------------
        this.refreshTransactionStatustList();
        this.grandTabStatus = false;
        this.isCheckAll = false;
        this.isDisabled = true;
        this.enableSelectAll = false;
        this.enableFileUpload = false;
        this.addNewRowId = 0;
        this.hideRemarkDiv = false;
        this.hideRemoveRow = false;
        this.isClear = false;
        this.isCancel = false;
        ;
        this.receiptAmount = this.numberFormat.transform(0);
        this.globalAddRowIndex = 0;
        this.globalSelectedAmount = this.numberFormat.transform(0);
    }
    EightyCComponent.prototype.onWindowScroll = function () {
        if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
            this.windowScrolled = true;
        }
        else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop ||
            document.body.scrollTop < 10) {
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
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);
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
        this.deactivateRemark();
        this.deactiveCopytoActualDate();
        // Summary get Call on Page Load
        this.Service.getEightyCSummary().subscribe(function (res) {
            // console.log("DATA" +res.data);
            _this.summaryGridData = res.data.results[0].licMasterList;
            _this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
            _this.totalActualAmount = res.data.results[0].totalActualAmount;
            _this.futureNewPolicyDeclaredAmount = _this.numberFormat.transform(res.data.results[0].futureNewPolicyDeclaredAmount);
            _this.grandTotalDeclaredAmount = res.data.results[0].grandTotalDeclaredAmount;
            _this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
        });
        // Get API call for All previous employee Names
        this.Service.getpreviousEmployeName().subscribe(function (res) {
            console.log('previousEmployeeList::', res);
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
            // console.log(res);
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
            if (res.data.results.length > 0) {
                _this.employeeJoiningDate = res.data.results[0].joiningDate;
                // console.log('employeeJoiningDate::',this.employeeJoiningDate);
            }
        });
        if ((this.today.getMonth() + 1) <= 3) {
            this.financialYear = (this.today.getFullYear() - 1) + '-' + this.today.getFullYear();
        }
        else {
            this.financialYear = this.today.getFullYear() + '-' + (this.today.getFullYear() + 1);
        }
        var splitYear = this.financialYear.split('-', 2);
        this.financialYearStartDate = new Date('01-Apr-' + splitYear[0]);
        this.financialYearEndDate = new Date('31-Mar-' + splitYear[1]);
    };
    EightyCComponent.prototype.updatePreviousEmpId = function (event, i, j) {
        console.log('select box value::', event.target.value);
        this.transactionDetail[j].lictransactionList[i].previousEmployerId = event.target.value;
        console.log('previous emp id::', this.transactionDetail[j].lictransactionList[i].previousEmployerId);
    };
    // ---------------------Summary ----------------------
    // Summary get Call
    EightyCComponent.prototype.summaryPage = function () {
        var _this = this;
        this.Service.getEightyCSummary().subscribe(function (res) {
            _this.summaryGridData = res.data.results[0].licMasterList;
            _this.totalDeclaredAmount =
                res.data.results[0].totalDeclaredAmount;
            _this.totalActualAmount = res.data.results[0].totalActualAmount;
            _this.futureNewPolicyDeclaredAmount = _this.numberFormat.transform(res.data.results[0].futureNewPolicyDeclaredAmount);
            _this.grandTotalDeclaredAmount = res.data.results[0].grandTotalDeclaredAmount;
            _this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
            // console.log(res);
        });
    };
    // Post New Future Policy Data API call
    EightyCComponent.prototype.addFuturePolicy = function () {
        var _this = this;
        this.futureNewPolicyDeclaredAmount = this.futureNewPolicyDeclaredAmount.toString().replace(',', '');
        var data = {
            futureNewPolicyDeclaredAmount: this.futureNewPolicyDeclaredAmount
        };
        console.log(data);
        this.Service.postEightyCSummaryFuturePolicy(data).subscribe(function (res) {
            console.log(res);
            _this.summaryGridData = res.data.results[0].licMasterList;
            _this.totalDeclaredAmount = res.data.results[0].totalDeclaredAmount;
            _this.totalActualAmount = res.data.results[0].totalActualAmount;
            _this.futureNewPolicyDeclaredAmount = _this.numberFormat.transform(res.data.results[0].futureNewPolicyDeclaredAmount);
            _this.grandTotalDeclaredAmount = res.data.results[0].grandTotalDeclaredAmount;
            _this.grandTotalActualAmount = res.data.results[0].grandTotalActualAmount;
        });
    };
    // On Change Future New Policy Declared Amount with formate
    EightyCComponent.prototype.onChangeFutureNewPolicyDeclaredAmount = function () {
        this.futureNewPolicyDeclaredAmount = this.numberFormat.transform(this.futureNewPolicyDeclaredAmount);
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
    Object.defineProperty(EightyCComponent.prototype, "masterForm", {
        // ------------------------------------Master----------------------------
        // convenience getter for easy access to form fields
        get: function () { return this.form.controls; },
        enumerable: false,
        configurable: true
    });
    // Policy End Date Validations with Policy Start Date
    EightyCComponent.prototype.setPolicyEndDate = function () {
        this.policyMinDate = this.form.value.policyStartDate;
        var policyStart = this.datePipe.transform(this.form.get('policyStartDate').value, 'yyyy-MM-dd');
        var policyEnd = this.datePipe.transform(this.form.get('policyEndDate').value, 'yyyy-MM-dd');
        this.minFormDate = this.policyMinDate;
        if (policyStart > policyEnd) {
            this.form.controls.policyEndDate.reset();
        }
        this.form.patchValue({
            fromDate: this.policyMinDate
        });
        this.setPaymentDetailToDate();
    };
    // Policy End Date Validations with Current Finanacial Year
    EightyCComponent.prototype.checkFinancialYearStartDateWithPolicyEnd = function () {
        var policyEnd = this.datePipe.transform(this.form.get('policyEndDate').value, 'yyyy-MM-dd');
        var financialYearStartDate = this.datePipe.transform(this.financialYearStart, 'yyyy-MM-dd');
        if (policyEnd < financialYearStartDate) {
            this.alertService.sweetalertWarning('Policy End Date should be greater than or equal to Current Financial Year : '
                + this.financialYearStart);
            this.form.controls.policyEndDate.reset();
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
            this.form.controls.toDate.reset();
        }
    };
    // Payment Detail To Date Validations with Current Finanacial Year
    EightyCComponent.prototype.checkFinancialYearStartDateWithPaymentDetailToDate = function () {
        var to = this.datePipe.transform(this.form.get('toDate').value, 'yyyy-MM-dd');
        var financialYearStartDate = this.datePipe.transform(this.financialYearStart, 'yyyy-MM-dd');
        if (to < financialYearStartDate) {
            this.alertService.sweetalertWarning('To Date should be greater than or equal to Current Financial Year : ' +
                this.financialYearStart);
            this.form.controls.toDate.reset();
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
        this.submitted = true;
        if (this.form.invalid) {
            return;
        }
        if (this.masterfilesArray.length === 0) {
            this.alertService.sweetalertWarning('LIC Document needed to Create Master.');
            return;
        }
        else {
            var from = this.datePipe.transform(this.form.get('fromDate').value, 'yyyy-MM-dd');
            var to = this.datePipe.transform(this.form.get('toDate').value, 'yyyy-MM-dd');
            var data = this.form.getRawValue();
            data.fromDate = from;
            data.toDate = to;
            data.premiumAmount = data.premiumAmount.toString().replace(',', '');
            console.log('LICdata::', data);
            this.fileService.uploadMultipleMasterFiles(this.masterfilesArray, data)
                .subscribe(function (res) {
                console.log(res);
                if (res) {
                    if (res.data.results.length > 0) {
                        _this.masterGridData = res.data.results;
                        _this.masterGridData.forEach(function (element) {
                            element.policyStartDate = new Date(element.policyStartDate);
                            element.policyEndDate = new Date(element.policyEndDate);
                            element.fromDate = new Date(element.fromDate);
                            element.toDate = new Date(element.toDate);
                        });
                        _this.alertService.sweetalertMasterSuccess('Record saved Successfully.', 'Go to "Declaration & Actual" Page to see Schedule.');
                    }
                    else {
                        _this.alertService.sweetalertWarning(res.status.messsage);
                    }
                }
                else {
                    _this.alertService.sweetalertError('Something went wrong. Please try again.');
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
            this.documentRemark = null;
            this.submitted = false;
        }
    };
    // Calculate annual amount on basis of premium and frquency
    EightyCComponent.prototype.calculateAnnualAmount = function () {
        var installment = this.form.value.premiumAmount;
        installment = installment.toString().replace(',', '');
        // console.log(installment);
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
        // console.log(`formatedPremiumAmount::`,formatedPremiumAmount);
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
    // Deactivate the Remark
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
    EightyCComponent.prototype.deactiveCopytoActualDate = function () {
        if (this.isECS === false) {
            this.hideCopytoActualDate = true;
        }
        else {
            this.hideCopytoActualDate = false;
        }
    };
    EightyCComponent.prototype.copytoActualDate = function (dueDate, j, i, item) {
        dueDate = new Date(dueDate);
        // item.lictransactionList.dateOfPayment = dueDate;
        this.transactionDetail[0].lictransactionList[i].dateOfPayment = dueDate;
        this.declarationService.dateOfPayment = this.transactionDetail[0].lictransactionList[i].dateOfPayment;
        // this.dateOfPayment = dueDate;
        alert('hiiii');
        console.log('Date OF PAyment' + this.declarationService.dateOfPayment);
    };
    // On Master Edit functionality
    EightyCComponent.prototype.editMaster = function (i) {
        this.scrollToTop();
        this.paymentDetailGridData = this.masterGridData[i].paymentDetails;
        this.form.patchValue(this.masterGridData[i]);
        // console.log(this.form.getRawValue());
        this.Index = i;
        this.showUpdateButton = true;
        var formatedPremiumAmount = this.numberFormat.transform(this.masterGridData[i].premiumAmount);
        // console.log(`formatedPremiumAmount::`,formatedPremiumAmount);
        this.form.get('premiumAmount').setValue(formatedPremiumAmount);
        this.isClear = true;
    };
    // On Edit Cancel
    EightyCComponent.prototype.cancelEdit = function () {
        this.form.reset();
        this.form.get('active').setValue(true);
        this.form.get('ecs').setValue(0);
        this.showUpdateButton = false;
        this.paymentDetailGridData = [];
        this.isClear = false;
    };
    // On Master Edit functionality
    EightyCComponent.prototype.viewMaster = function (i) {
        this.scrollToTop();
        this.paymentDetailGridData = this.masterGridData[i].paymentDetails;
        this.form.patchValue(this.masterGridData[i]);
        // console.log(this.form.getRawValue());
        this.Index = i;
        this.showUpdateButton = true;
        var formatedPremiumAmount = this.numberFormat.transform(this.masterGridData[i].premiumAmount);
        // console.log(`formatedPremiumAmount::`,formatedPremiumAmount);
        this.form.get('premiumAmount').setValue(formatedPremiumAmount);
        this.isCancel = true;
    };
    // On View Cancel
    EightyCComponent.prototype.cancelView = function () {
        this.form.reset();
        this.form.get('active').setValue(true);
        this.form.get('ecs').setValue(0);
        this.showUpdateButton = false;
        this.paymentDetailGridData = [];
        this.isCancel = false;
    };
    // ----------------------------------------------- Declaration --------------------------------------
    // -----------on Page referesh transactionStatustList------------
    EightyCComponent.prototype.refreshTransactionStatustList = function () {
        this.transactionStatustList = [
            { label: 'All', value: 'All' },
            { label: 'Pending', value: 'Pending' },
            { label: 'Submitted', value: 'Submitted' },
            { label: 'Approved', value: 'Approved' },
            { label: 'Send back', value: 'Send back' },
        ];
    };
    // ------- On declaration page get API call for All Institutions added into Master-------
    EightyCComponent.prototype.declarationPage = function () {
        var _this = this;
        this.transactionInstitutionNames = [];
        this.transactionPolicyList = [];
        this.transactionStatustList = [];
        var data = {
            label: 'All',
            value: 'All'
        };
        this.transactionInstitutionNames.push(data);
        this.transactionPolicyList.push(data);
        this.refreshTransactionStatustList();
        this.Service.getEightyCDeclarationInstitutionListWithPolicyNo().subscribe(function (res) {
            _this.transactionInstitutionListWithPolicies = res.data.results;
            res.data.results.forEach(function (element) {
                var obj = {
                    label: element.institution,
                    value: element.institution
                };
                _this.transactionInstitutionNames.push(obj);
                element.policies.forEach(function (policy) {
                    var policyObj = {
                        label: policy,
                        value: policy
                    };
                    _this.transactionPolicyList.push(policyObj);
                });
            });
        });
        this.resetAll();
        this.selectedTransactionInstName('All');
    };
    // --------- On institution selection show all transactions list accordingly all policies--------
    EightyCComponent.prototype.selectedTransactionInstName = function (institutionName) {
        var _this = this;
        this.globalInstitution = institutionName;
        this.getTransactionFilterData(this.globalInstitution, null, null);
        this.globalSelectedAmount = this.numberFormat.transform(0);
        var data = {
            label: 'All',
            value: 'All'
        };
        this.transactionPolicyList = [];
        this.transactionPolicyList.push(data);
        this.transactionInstitutionListWithPolicies.forEach(function (element) {
            if (institutionName === element.institution) {
                element.policies.forEach(function (policy) {
                    var policyObj = {
                        label: policy,
                        value: policy
                    };
                    _this.transactionPolicyList.push(policyObj);
                });
            }
            else if (institutionName === 'All') {
                element.policies.forEach(function (policy) {
                    var policyObj = {
                        label: policy,
                        value: policy
                    };
                    _this.transactionPolicyList.push(policyObj);
                });
            }
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
    // -------- On Policy selection show all transactions list accordingly all policies---------
    EightyCComponent.prototype.selectedPolicy = function (policy) {
        this.globalPolicy = policy;
        this.getTransactionFilterData(this.globalInstitution, this.globalPolicy, null);
    };
    // ------- On Transaction Status selection show all transactions list accordingly all policies------
    EightyCComponent.prototype.selectedTransactionStatus = function (transactionStatus) {
        this.getTransactionFilterData(this.globalInstitution, this.globalPolicy, transactionStatus);
    };
    // -------- ON select to check input boxex--------
    EightyCComponent.prototype.onSelectCheckBox = function (data, event, i, j) {
        var _this = this;
        var checked = event.target.checked;
        var formatedGlobalSelectedValue = Number(this.globalSelectedAmount == '0' ? this.globalSelectedAmount
            : this.globalSelectedAmount.toString().replace(',', ''));
        var formatedActualAmount = 0;
        var formatedSelectedAmount;
        console.log('in IS ECS::', this.transactionDetail[j].lictransactionList[i].isECS);
        if (checked) {
            if (this.transactionDetail[j].lictransactionList[i].isECS === 1) {
                this.transactionDetail[j].lictransactionList[i].actualAmount = data.declaredAmount;
                this.transactionDetail[j].lictransactionList[i].dateOfPayment = new Date(data.dueDate);
                console.log('in IS actualAmount::', this.transactionDetail[j].lictransactionList[i].actualAmount);
                console.log('in IS dateOfPayment::', this.transactionDetail[j].lictransactionList[i].dateOfPayment);
            }
            else {
                this.transactionDetail[j].lictransactionList[i].actualAmount = data.declaredAmount;
            }
            formatedActualAmount = Number(this.transactionDetail[j].lictransactionList[i].actualAmount.toString().replace(',', ''));
            formatedSelectedAmount = this.numberFormat.transform(formatedGlobalSelectedValue + formatedActualAmount);
            console.log('in if formatedSelectedAmount::', formatedSelectedAmount);
            this.uploadGridData.push(data.licTransactionId);
            // this.dateOfPaymentGlobal =new Date (data.dueDate) ;
            // this.actualAmountGlobal = Number(data.declaredAmount);
        }
        else {
            formatedActualAmount = Number(this.transactionDetail[j].lictransactionList[i].actualAmount.toString().replace(',', ''));
            this.transactionDetail[j].lictransactionList[i].actualAmount = this.numberFormat.transform(0);
            this.transactionDetail[j].lictransactionList[i].dateOfPayment = null;
            formatedSelectedAmount = this.numberFormat.transform(formatedGlobalSelectedValue - formatedActualAmount);
            // console.log('in else formatedSelectedAmount::', formatedSelectedAmount);
            var index = this.uploadGridData.indexOf(data.licTransactionId);
            this.uploadGridData.splice(index, 1);
        }
        this.globalSelectedAmount = formatedSelectedAmount;
        console.log('this.globalSelectedAmount::', this.globalSelectedAmount);
        this.actualTotal = 0;
        this.transactionDetail[j].lictransactionList.forEach(function (element) {
            // console.log(element.actualAmount.toString().replace(',', ""));
            _this.actualTotal += Number(element.actualAmount.toString().replace(',', ''));
        });
        this.transactionDetail[j].actualTotal = this.actualTotal;
        if (this.uploadGridData.length) {
            this.enableFileUpload = true;
        }
        console.log(this.uploadGridData);
        console.log(this.uploadGridData.length);
    };
    // ------------ To Check / Uncheck All  Checkboxes-------------
    EightyCComponent.prototype.checkUncheckAll = function (item) {
        var _this = this;
        // console.log(this.isCheckAll);
        if (this.isCheckAll) {
            // console.log('CHECK ALL IS FALSE ');
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
        // console.log('enableSelectAll...',  this.enableSelectAll);
        // console.log('uploadGridData...',  this.uploadGridData);
    };
    // --------------- ON change of declared Amount in line-------------
    EightyCComponent.prototype.onDeclaredAmountChange = function (summary, i, j) {
        var _this = this;
        this.declarationService = new DeclarationService(summary);
        // console.log("Ondeclaration Amount change" + summary.declaredAmount);
        this.transactionDetail[j].lictransactionList[i].declaredAmount = this.declarationService.declaredAmount;
        var formatedDeclaredAmount = this.numberFormat.transform(this.transactionDetail[j].lictransactionList[i].declaredAmount);
        // console.log(`formatedDeclaredAmount::`,formatedDeclaredAmount);
        this.transactionDetail[j].lictransactionList[i].declaredAmount = formatedDeclaredAmount;
        this.declarationTotal = 0;
        // this.declaredAmount=0;
        this.transactionDetail[j].lictransactionList.forEach(function (element) {
            // console.log(element.declaredAmount.toString().replace(',', ""));
            _this.declarationTotal += Number(element.declaredAmount.toString().replace(',', ''));
            // console.log(this.declarationTotal);
            // this.declaredAmount+=Number(element.actualAmount.toString().replace(',', ""));
        });
        this.transactionDetail[j].declarationTotal = this.declarationTotal;
        // console.log( "DeclarATION total==>>" + this.transactionDetail[j].declarationTotal);
    };
    // ------------ ON change of DueDate in line----------
    EightyCComponent.prototype.onDueDateChange = function (summary, i, j) {
        this.transactionDetail[j].lictransactionList[i].dueDate = summary.dueDate;
    };
    // ------------Actual Amount change-----------
    EightyCComponent.prototype.onActualAmountChange = function (summary, i, j) {
        var _this = this;
        this.declarationService = new DeclarationService(summary);
        // console.log("Actual Amount change::" , summary);
        this.transactionDetail[j].lictransactionList[i].actualAmount = this.declarationService.actualAmount;
        // console.log("Actual Amount changed::" , this.transactionDetail[j].lictransactionList[i].actualAmount);
        var formatedActualAmount = this.numberFormat.transform(this.transactionDetail[j].lictransactionList[i].actualAmount);
        // console.log(`formatedActualAmount::`,formatedActualAmount);
        this.transactionDetail[j].lictransactionList[i].actualAmount = formatedActualAmount;
        if (this.transactionDetail[j].lictransactionList[i].actualAmount !== Number(0)
            || this.transactionDetail[j].lictransactionList[i].actualAmount !== null) {
            // console.log(`in if::`,this.transactionDetail[j].lictransactionList[i].actualAmount);
            this.isDisabled = false;
        }
        else {
            // console.log(`in else::`,this.transactionDetail[j].lictransactionList[i].actualAmount);
            this.isDisabled = true;
        }
        this.actualTotal = 0;
        this.actualAmount = 0;
        this.transactionDetail[j].lictransactionList.forEach(function (element) {
            // console.log(element.actualAmount.toString().replace(',', ""));
            _this.actualTotal += Number(element.actualAmount.toString().replace(',', ''));
            // console.log(this.actualTotal);
            // this.actualAmount += Number(element.actualAmount.toString().replace(',', ""));
        });
        this.transactionDetail[j].actualTotal = this.actualTotal;
        // this.transactionDetail[j].actualAmount = this.actualAmount;
        // console.log(this.transactionDetail[j]);
        // console.log(this.actualTotal);
    };
    // --------Add New ROw Function---------
    // addRowInList( summarynew: { previousEmployerName: any; declaredAmount: any;
    //   dateOfPayment: Date; actualAmount: any;  dueDate: Date}, j: number, i: number) {
    EightyCComponent.prototype.addRowInList = function (summarynew, j, i) {
        // console.log('summary::',  summarynew);
        if (this.initialArrayIndex[j] > i) {
            this.hideRemoveRow = false;
        }
        else {
            this.hideRemoveRow = true;
        }
        this.declarationService = new DeclarationService(summarynew);
        // console.log('declarationService::', this.declarationService);
        this.globalAddRowIndex -= 1;
        console.log(' in add this.globalAddRowIndex::', this.globalAddRowIndex);
        this.shownewRow = true;
        this.declarationService.licTransactionId = this.globalAddRowIndex;
        this.declarationService.declaredAmount = null;
        this.declarationService.dueDate = null;
        this.declarationService.actualAmount = null;
        this.declarationService.dateOfPayment = null;
        this.declarationService.isECS = 0;
        this.declarationService.transactionStatus = 'Pending';
        this.declarationService.licMasterPaymentDetailsId = this.transactionDetail[j].lictransactionList[0].licMasterPaymentDetailsId;
        this.transactionDetail[j].lictransactionList.push(this.declarationService);
        console.log('addRow::', this.transactionDetail[j].lictransactionList);
    };
    // -------- Delete Row--------------
    EightyCComponent.prototype.deleteRow = function (j, i) {
        var rowCount = this.transactionDetail[j].lictransactionList.length - 1;
        // console.log('rowcount::', rowCount);
        // console.log('initialArrayIndex::', this.initialArrayIndex);
        if (this.transactionDetail[j].lictransactionList.length == 1) {
            return false;
        }
        else if (this.initialArrayIndex[j] <= rowCount) {
            this.transactionDetail[j].lictransactionList.splice(rowCount, 1);
            return true;
        }
    };
    EightyCComponent.prototype.editDeclrationRow = function (summary, i, j) {
        this.declarationService = new DeclarationService(summary);
    };
    EightyCComponent.prototype.updateDeclrationRow = function (i, j) {
        // tslint:disable-next-line: max-line-length
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
    // Reset All
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
        console.log('event::', event);
        if (event.target.files.length > 0) {
            for (var _i = 0, _a = event.target.files; _i < _a.length; _i++) {
                var file = _a[_i];
                this.filesArray.push(file);
            }
        }
        console.log(this.filesArray);
    };
    EightyCComponent.prototype.onMasterUpload = function (event) {
        console.log('event::', event);
        if (event.target.files.length > 0) {
            for (var _i = 0, _a = event.target.files; _i < _a.length; _i++) {
                var file = _a[_i];
                this.masterfilesArray.push(file);
            }
        }
        console.log(this.masterfilesArray);
    };
    EightyCComponent.prototype.removeDocument = function () {
        this.currentFileUpload = null;
    };
    // Remove Selected LicTransaction Document
    EightyCComponent.prototype.removeSelectedLicTransactionDocument = function (index) {
        this.filesArray.splice(index, 1);
        console.log('this.filesArray::', this.filesArray);
        console.log('this.filesArray.size::', this.filesArray.length);
    };
    // Remove LicMaster Document
    EightyCComponent.prototype.removeSelectedLicMasterDocument = function (index) {
        this.masterfilesArray.splice(index, 1);
        console.log('this.filesArray::', this.masterfilesArray);
        console.log('this.filesArray.size::', this.masterfilesArray.length);
    };
    EightyCComponent.prototype.upload = function () {
        var _this = this;
        // this.currentFileUpload = this.selectedFiles.item(0);
        // const data = {
        //     licTransactionIDs: this.uploadGridData,
        //     receiptNumber: this.receiptNumber,
        //     globalSelectedAmount: this.receiptAmount,
        //     receiptDate: this.receiptDate,
        // };
        // this.uploadGridData = [3,4]
        if (this.filesArray.length === 0) {
            this.alertService.sweetalertError('Please attach Premium Receipt / Premium Statement');
            return;
        }
        console.log('this.transactionDetail::', this.transactionDetail);
        this.transactionDetail.forEach(function (element) {
            element.lictransactionList.forEach(function (innerElement) {
                if (innerElement.declaredAmount !== null) {
                    innerElement.declaredAmount = innerElement.declaredAmount.toString().replace(',', '');
                }
                else {
                    innerElement.declaredAmount = 0.00;
                }
                if (innerElement.actualAmount !== null) {
                    innerElement.actualAmount = innerElement.actualAmount.toString().replace(',', '');
                }
                else {
                    innerElement.actualAmount = 0.00;
                }
                var dateOfPaymnet = _this.datePipe.transform(innerElement.dateOfPayment, 'yyyy-MM-dd');
                var dueDate = _this.datePipe.transform(innerElement.dueDate, 'yyyy-MM-dd');
                innerElement.dateOfPayment = dateOfPaymnet;
                innerElement.dueDate = dueDate;
            });
        });
        this.receiptAmount = this.receiptAmount.toString().replace(',', '');
        var data = {
            licTransactionDetail: this.transactionDetail,
            licTransactionIDs: this.uploadGridData,
            receiptAmount: this.receiptAmount,
            documentRemark: this.documentRemark
        };
        console.log('data::', data);
        // this.fileService.uploadSingleFile(this.currentFileUpload, data)
        // .pipe(tap(event => {
        //     if (event.type === HttpEventType.UploadProgress) {
        //         this.loaded = Math.round(100 * event.loaded / event.total);
        //     }
        // }))
        this.fileService.uploadMultipleFiles(this.filesArray, data)
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
                        // console.log(`formatedPremiumAmount::`,innerElement.declaredAmount);
                    });
                });
                _this.alertService.sweetalertMasterSuccess('Transaction Saved Successfully.', '');
            }
            else {
                _this.alertService.sweetalertWarning(res.status.messsage);
            }
        });
        this.receiptAmount = '0.00';
        this.filesArray = [];
        this.globalSelectedAmount = '0.00';
    };
    EightyCComponent.prototype.changeReceiptAmountFormat = function () {
        // let formatedReceiptAmount = this.numberFormat.transform(this.receiptAmount)
        // console.log('formatedReceiptAmount::', formatedReceiptAmount);
        // this.receiptAmount = formatedReceiptAmount;
        this.receiptAmount = this.numberFormat.transform(this.receiptAmount);
        if (this.receiptAmount < this.globalSelectedAmount) {
            this.alertService.sweetalertWarning('Receipt Amount should be greater than Selected line Actual Amount.');
        }
        else if (this.receiptAmount > this.globalSelectedAmount) {
            this.alertService.sweetalertInfo('Receipt Amount is greater than Selected line Actual Amount.');
        }
        console.log('receiptAmount::', this.receiptAmount);
    };
    EightyCComponent.prototype.UploadModal = function (template) {
        this.modalRef = this.modalService.show(template, Object.assign({}, { "class": 'gray modal-md' }));
    };
    EightyCComponent.prototype.UploadedDocumentModal = function (template1) {
        this.modalRef = this.modalService.show(template1, Object.assign({}, { "class": 'gray modal-md' }));
    };
    EightyCComponent.prototype.UploadedDocumentModal1 = function (template1, documentIndex) {
        this.modalRef = this.modalService.show(template1, Object.assign({}, { "class": 'gray modal-md' }));
        this.proofSubmissionFileList = this.documentDetailList[documentIndex].documentDetailList;
    };
    EightyCComponent.prototype.declarationEditUpload = function (template2, proofSubmissionId) {
        var _this = this;
        console.log(proofSubmissionId);
        this.modalRef = this.modalService.show(template2, Object.assign({}, { "class": 'gray modal-xl' }));
        this.Service.getTransactionByProofSubmissionId(proofSubmissionId).subscribe(function (res) {
            console.log('edit Data:: ', res);
            _this.urlArray = res.data.results[0].documentInformation[0].documentDetailList;
            _this.editTransactionUpload = res.data.results[0].licTransactionDetail;
            console.log(_this.urlArray);
            _this.urlArray.forEach(function (element) {
                // element.blobURI = 'data:' + element.documentType + ';base64,' + element.blobURI;
                element.blobURI = 'data:image/image;base64,' + element.blobURI;
                // new Blob([element.blobURI], { type: 'application/octet-stream' });
            });
            console.log('converted:: ', _this.urlArray);
        });
    };
    EightyCComponent.prototype.nextDocViewer = function () {
        this.urlIndex = this.urlIndex + 1;
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlArray[this.urlIndex].blobURI);
    };
    EightyCComponent.prototype.previousDocViewer = function () {
        this.urlIndex = this.urlIndex - 1;
        //this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlArray[this.urlIndex].blobURI);
    };
    EightyCComponent.prototype.docViewer = function (template3) {
        //   this.Service.getBlobSASUrl().subscribe((res) => {
        //    console.log('ResultsURL' , res);
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl('https://view.officeapps.live.com/op/embed.aspx?src='
            + 'https://devstoragefile1.blob.core.windows.net/paysquarecontainer/Abbott/Abbott1/Employees/Investment/2020-2021/3/FlexGrid.pdf'
            + '&embedded=true');
        //});
        console.log(this.urlSafe);
        this.modalRef = this.modalService.show(template3, Object.assign({}, { "class": 'gray modal-xl' }));
    };
    // Common Function for filter to call API
    EightyCComponent.prototype.getTransactionFilterData = function (institution, policyNo, transactionStatus) {
        var _this = this;
        // this.Service.getTransactionInstName(data).subscribe(res => {
        this.Service.getTransactionFilterData(institution, policyNo, transactionStatus).subscribe(function (res) {
            console.log(res);
            _this.transactionDetail = res.data.results[0].licTransactionDetail;
            _this.documentDetailList = res.data.results[0].documentInformation;
            _this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
            _this.grandActualTotal = res.data.results[0].grandActualTotal;
            _this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
            _this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;
            // this.initialArrayIndex = res.data.results[0].licTransactionDetail[0].lictransactionList.length;
            _this.initialArrayIndex = [];
            _this.transactionDetail.forEach(function (element) {
                _this.initialArrayIndex.push(element.lictransactionList.length);
                element.lictransactionList.forEach(function (innerElement) {
                    if (innerElement.dateOfPayment !== null) {
                        innerElement.dateOfPayment = new Date(innerElement.dateOfPayment);
                    }
                    // if(this.employeeJoiningDate < innerElement.dueDate) {
                    //   innerElement.active = false;
                    // }
                    if (innerElement.isECS === 0) {
                        _this.glbalECS == 0;
                    }
                    else if (innerElement.isECS === 1) {
                        _this.glbalECS == 1;
                    }
                    else {
                        _this.glbalECS == 0;
                    }
                    innerElement.declaredAmount = _this.numberFormat.transform(innerElement.declaredAmount);
                    innerElement.actualAmount = _this.numberFormat.transform(innerElement.actualAmount);
                });
            });
        });
    };
    // tslint:disable-next-line: typedef
    EightyCComponent.prototype.uploadUpdateTransaction = function () {
        var _this = this;
        this.editTransactionUpload.forEach(function (element) {
            _this.uploadGridData.push(element.licTransactionId);
        });
        var data = {
            licTransactionDetail: this.editTransactionUpload,
            licTransactionIDs: this.uploadGridData,
            documentRemark: this.documentRemark
        };
        console.log('data::', data);
        this.fileService.uploadMultipleFiles(this.filesArray, data)
            .subscribe(function (res) {
            console.log(res);
            if (res.data.results.length > 0) {
                _this.alertService.sweetalertMasterSuccess('Transaction Saved Successfully.', '');
            }
            else {
                _this.alertService.sweetalertWarning(res.status.messsage);
            }
        });
        this.currentFileUpload = null;
    };
    EightyCComponent.prototype.downloadTransaction = function (proofSubmissionId) {
        var _this = this;
        console.log(proofSubmissionId);
        this.Service.getTransactionByProofSubmissionId(proofSubmissionId).subscribe(function (res) {
            console.log('edit Data:: ', res);
            _this.urlArray = res.data.results[0].documentInformation[0].documentDetailList;
            _this.urlArray.forEach(function (element) {
                element.blobURI = _this.sanitizer.bypassSecurityTrustResourceUrl(element.blobURI);
            });
            console.log(_this.urlArray);
        });
    };
    EightyCComponent.prototype.setDateOfPayment = function (summary, i, j) {
        this.transactionDetail[j].lictransactionList[i].dateOfPayment = summary.dateOfPayment;
        console.log(this.transactionDetail[j].lictransactionList[i].dateOfPayment);
    };
    __decorate([
        core_1.HostListener('window:scroll', [])
    ], EightyCComponent.prototype, "onWindowScroll");
    EightyCComponent = __decorate([
        core_1.Component({
            selector: 'app-eighty-c',
            templateUrl: './eighty-c.component.html',
            styleUrls: ['./eighty-c.component.scss']
        }),
        __param(9, core_1.Inject(common_1.DOCUMENT))
    ], EightyCComponent);
    return EightyCComponent;
}());
exports.EightyCComponent = EightyCComponent;
var DeclarationService = /** @class */ (function () {
    function DeclarationService(obj) {
        this.licTransactionId = 0;
        this.previousEmployerId = 0;
        Object.assign(this, obj);
    }
    return DeclarationService;
}());
