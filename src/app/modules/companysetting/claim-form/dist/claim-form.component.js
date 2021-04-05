"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClaimFormComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ClaimFormComponent = /** @class */ (function () {
    function ClaimFormComponent(claimService, fb, modalService, alertService) {
        this.claimService = claimService;
        this.fb = fb;
        this.modalService = modalService;
        this.alertService = alertService;
        this.claimGridDataList = [];
        this.selectedListElement = [];
        this.dropdownListData = [];
        this.submitted = false;
        this.loading = false;
        this.templateUserIdList = [];
        this.isView = false;
        this.isEdit = false;
        this.claimTempId = 0;
    }
    ClaimFormComponent.prototype.ngOnInit = function () {
        this.claimForm = this.fb.group({
            claimTempId: new forms_1.FormControl(''),
            claimTemplateName: new forms_1.FormControl('', forms_1.Validators.required),
            description: new forms_1.FormControl('', forms_1.Validators.required),
            groupCompanyId: new forms_1.FormControl(''),
            active: new forms_1.FormControl(true),
            remark: new forms_1.FormControl({ value: '', disabled: true }),
            claimTemplateDetailsRequestDTO: new forms_1.FormGroup({
                claimTempStandardFieldMasterId: new forms_1.FormControl(''),
                fieldName: new forms_1.FormControl(''),
                displayName: new forms_1.FormControl(''),
                enable: new forms_1.FormControl(''),
                mandatory: new forms_1.FormControl(''),
                dropDownValues: new forms_1.FormControl({}),
                sequence: new forms_1.FormControl(''),
                active: new forms_1.FormControl(),
                nature: new forms_1.FormControl('')
            })
        });
        this.getAllFields();
        this.getClaimTemplatesList();
        // this.isView=false;
    };
    Object.defineProperty(ClaimFormComponent.prototype, "f", {
        get: function () { return this.claimForm.controls; },
        enumerable: false,
        configurable: true
    });
    //................. Submit claim form.................
    ClaimFormComponent.prototype.submitClaimMaster = function () {
        var _this = this;
        window.scrollTo(0, 0);
        if (this.claimTempId > 0) {
            this.submitted = true;
            if (this.claimForm.invalid) {
                return;
            }
            if (this.selectedListElement.length === 0) {
                this.alertService.sweetalertWarning('Please select any field list');
                return;
            }
            else {
                console.log(this.claimForm.value);
                var postData = this.claimForm.getRawValue();
                this.selectedListElement.forEach(function (element) {
                    if (element.dropDownValues === null) {
                        element.dropDownValues = [];
                    }
                });
                postData.claimTemplateDetailsRequestDTO = this.selectedListElement;
                console.log("postData", postData);
                this.claimService.editClaimData(postData).subscribe(function (res) {
                    console.log("Claim value", res);
                    // this.templateUserIdList.push(res.data.results[0]);
                    _this.alertService.sweetalertMasterSuccess("Register form updated successfully", "");
                    console.log("templateUserId", _this.templateUserIdList);
                });
            }
            this.resetForm();
        }
        else {
            this.submitted = true;
            if (this.claimForm.invalid) {
                return;
            }
            console.log(this.claimForm.value);
            var postData = this.claimForm.getRawValue();
            postData.claimTemplateDetailsRequestDTO = this.selectedListElement;
            console.log("postData", postData);
            this.claimService.postClaimData(postData).subscribe(function (res) {
                console.log("Claim value", res);
                _this.templateUserIdList.push(res.data.results[0]);
                _this.alertService.sweetalertMasterSuccess("Register form submitted successfully", "");
                console.log("templateUserId", _this.templateUserIdList);
            });
            this.resetForm();
        }
    };
    // ....................Active remark disabled....................
    ClaimFormComponent.prototype.activeRemark = function (event) {
        if (event == false) {
            this.claimForm.controls.remark.enable();
        }
        else {
            this.claimForm.controls.remark.disable();
        }
    };
    //....................... Get all fields list for selected checkbox list...................
    ClaimFormComponent.prototype.getAllFields = function () {
        var _this = this;
        this.claimService.getClaimFields().subscribe(function (res) {
            console.log(res);
            // const nature = { nature: "List" }
            // const returnClaimData = Object.assign(res.data.results[0], nature);
            _this.claimGridDataList = res.data.results;
            console.log(" this.claimGridDataList", _this.claimGridDataList);
        });
    };
    //....................... View and Edit post list for selected checkbox list...................
    ClaimFormComponent.prototype.getClaimTemplateViewById = function (claimTempId) {
        var _this = this;
        window.scrollTo(0, 0);
        this.claimService.getClaimTemplateViewById(claimTempId).subscribe(function (res) {
            console.log(res);
            var claimTemplateList = res.data.results[0];
            console.log(claimTemplateList);
            _this.claimForm.patchValue(claimTemplateList);
            _this.claimForm.disable();
            //  this.claimGridDataList = [];
            _this.claimGridDataList = res.data.results[0].claimTemplateDetailsResponseDTO;
            // this.selectedListElement = res.data.results[0].claimTemplateDetailsResponseDTO;
            _this.isView = true;
            console.log("this.selectedListElement", _this.selectedListElement);
        });
    };
    ClaimFormComponent.prototype.getClaimTemplateEditById = function (claimTempId) {
        var _this = this;
        this.claimTempId = claimTempId;
        window.scrollTo(0, 0);
        this.claimService.getClaimTemplateViewById(claimTempId).subscribe(function (response) {
            console.log(response);
            var claimTemplateList = response.data.results[0];
            console.log(claimTemplateList);
            _this.claimForm.patchValue(claimTemplateList);
            // this.claimGridDataList = res.data.results[0].claimTemplateDetailsResponseDTO;
            _this.selectedListElement = response.data.results[0].claimTemplateDetailsResponseDTO;
            _this.isEdit = true;
            console.log("this.selectedListElement", _this.selectedListElement);
            var _loop_1 = function (i) {
                var myobj = {
                    regTempStandardFieldId: response.data.results[0].claimTemplateDetailsResponseDTO[i].claimTempStandardFieldMasterId,
                    fieldName: response.data.results[0].claimTemplateDetailsResponseDTO[i].fieldName,
                    displayName: response.data.results[0].claimTemplateDetailsResponseDTO[i].displayName,
                    enable: response.data.results[0].claimTemplateDetailsResponseDTO[i].enable,
                    dropDownValues: response.data.results[0].claimTemplateDetailsResponseDTO[i].dropDownValues,
                    // claimForm: response.data.results[0].claimTemplateDetailsResponseDTO[i].claimForm,
                    sequence: response.data.results[0].claimTemplateDetailsResponseDTO[i].sequence,
                    mandatory: response.data.results[0].claimTemplateDetailsResponseDTO[i].mandatory,
                    nature: response.data.results[0].claimTemplateDetailsResponseDTO[i].nature,
                    remark: response.data.results[0].claimTemplateDetailsResponseDTO[i].remark,
                    // isActive: response.data.results[0].claimTemplateDetailsResponseDTO[i].isActive,
                    isActive: 1
                };
                var s = _this.claimGridDataList.findIndex(function (o) { return o.fieldName == response.data.results[0].claimTemplateDetailsResponseDTO[i].fieldName; });
                _this.claimGridDataList[s] = myobj;
            };
            for (var i = 0; i < response.data.results[0].claimTemplateDetailsResponseDTO.length; i++) {
                _loop_1(i);
            }
        });
    };
    //.........................Get all claim template list .................
    ClaimFormComponent.prototype.getClaimTemplatesList = function () {
        var _this = this;
        this.claimService.getClaimTemplateList().subscribe(function (res) {
            console.log(res);
            _this.templateUserIdList = res.data.results;
            console.log("191", _this.templateUserIdList);
        });
    };
    // ...........................Select table list data ......................
    ClaimFormComponent.prototype.checkedListData = function (index, isChecked, fieldName) {
        // console.log(index, isChecked, claimId);
        console.log(this.claimGridDataList[index]);
        this.claimGridDataList[index].enable = isChecked;
        if (isChecked == true) {
            var listData = this.claimGridDataList[index];
            listData.mandatory = false;
            listData.dropDownValues = [];
            this.selectedListElement.push(listData);
            console.log("myvalue", this.selectedListElement);
        }
        else {
            var indexValue = this.selectedListElement.indexOf(fieldName);
            this.selectedListElement.splice(indexValue, 1);
        }
        console.log("selected value", this.selectedListElement);
    };
    // .................... Change Event Pass Value............
    ClaimFormComponent.prototype.mindatoryChangeEvt = function (index, changeValue, fieldName) {
        console.log(index, changeValue, fieldName);
        if (changeValue == "") {
            var falseValue = "false";
            var indexData = this.selectedListElement.findIndex(function (getIndex) { return getIndex.fieldName == fieldName; });
            this.selectedListElement[indexData].mandatory = JSON.parse(falseValue.toLowerCase());
            console.log("mindatory index2", this.selectedListElement);
        }
        else {
            var indexData = this.selectedListElement.findIndex(function (getIndex) { return getIndex.fieldName == fieldName; });
            this.selectedListElement[indexData].mandatory = JSON.parse(changeValue.toLowerCase());
            console.log("mindatory index", this.selectedListElement);
        }
    };
    ClaimFormComponent.prototype.displayChangeEvt = function (index, changeValue, fieldName) {
        console.log(index, changeValue, fieldName);
        var indexData = this.selectedListElement.findIndex(function (getIndex) { return getIndex.fieldName == fieldName; });
        this.selectedListElement[indexData].displayName = changeValue;
        console.log("Display change", this.selectedListElement);
    };
    // ................Dropdown List Values.................
    ClaimFormComponent.prototype.getDropdownListvalue = function (dropList, dropdownListid) {
        this.dropdownListData.push(dropList);
        console.log("dropdownListData", this.dropdownListData);
        this.dropListModel = '';
        var indexField = this.selectedListElement.findIndex(function (getIndex) { return getIndex.fieldName == dropdownListid; });
        this.selectedListElement[indexField].dropDownValues = this.dropdownListData;
    };
    ClaimFormComponent.prototype.getDropdownListRemove = function (index, dropdownListid) {
        this.dropdownListData.splice(index, 1);
        console.log(this.dropdownListData);
        var indexField = this.selectedListElement.findIndex(function (getIndex) { return getIndex == dropdownListid; });
        this.selectedListElement[indexField].dropDownValues = this.dropdownListData;
    };
    ClaimFormComponent.prototype.resetForm = function () {
        window.scrollTo(0, 0);
        this.selectedListElement = [];
        this.claimForm.reset({
            active: new forms_1.FormControl(true)
        });
        this.getAllFields();
        this.isView = false;
        this.isEdit = false;
        this.claimForm.enable();
        this.claimForm.controls.remark.disable();
    };
    // ....................Popup box section...................
    ClaimFormComponent.prototype.modalDropdownList = function (template, srno, fieldName) {
        this.modalRef = this.modalService.show(template, Object.assign({}, { "class": 'gray modal-md' }));
        this.dropdownListid = fieldName;
        console.log(this.dropdownListid);
    };
    ClaimFormComponent = __decorate([
        core_1.Component({
            selector: 'app-claim-form',
            templateUrl: './claim-form.component.html',
            styleUrls: ['./claim-form.component.scss']
        })
    ], ClaimFormComponent);
    return ClaimFormComponent;
}());
exports.ClaimFormComponent = ClaimFormComponent;
