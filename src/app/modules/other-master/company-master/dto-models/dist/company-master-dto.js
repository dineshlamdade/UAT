"use strict";
exports.__esModule = true;
exports.EmployeeMasterRequestDTO = exports.companyMasterRequestDTOs = exports.requestDTOString = void 0;
var requestDTOString = /** @class */ (function () {
    function requestDTOString() {
        this.companyMasterRequestDTOs = [];
    }
    return requestDTOString;
}());
exports.requestDTOString = requestDTOString;
var companyMasterRequestDTOs = /** @class */ (function () {
    function companyMasterRequestDTOs() {
        this.employeeMasterRequestDTO = new EmployeeMasterRequestDTO('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
        this.companyMasterRequestDTOs = [];
    }
    return companyMasterRequestDTOs;
}());
exports.companyMasterRequestDTOs = companyMasterRequestDTOs;
var EmployeeMasterRequestDTO = /** @class */ (function () {
    function EmployeeMasterRequestDTO(globalCompanyMasterId, code, companyName, shortName, formerName, companyGroupName, address1, address2, address3, country, pinCode, state, city, village, phoneNumber, isdCode, emailId, website, isContractor, typeOfEstablishment, language, currency, industryType, scale, coClassification, startDate, endDate, reason, companyActive, remark, logo1, logo2, logo3) {
        this.globalCompanyMasterId = globalCompanyMasterId;
        this.code = code;
        this.companyName = companyName;
        this.shortName = shortName;
        this.formerName = formerName;
        this.companyGroupName = companyGroupName;
        this.address1 = address1;
        this.address2 = address2;
        this.address3 = address3;
        this.country = country;
        this.pinCode = pinCode;
        this.state = state;
        this.city = city;
        this.village = village;
        this.phoneNumber = phoneNumber;
        this.isdCode = isdCode;
        this.emailId = emailId;
        this.website = website;
        this.isContractor = isContractor;
        this.typeOfEstablishment = typeOfEstablishment;
        this.language = language;
        this.currency = currency;
        this.industryType = industryType;
        this.scale = scale;
        this.coClassification = coClassification;
        this.startDate = startDate;
        this.endDate = endDate;
        this.reason = reason;
        this.companyActive = companyActive;
        this.remark = remark;
        this.logo1 = logo1;
        this.logo2 = logo2;
        this.logo3 = logo3;
    }
    return EmployeeMasterRequestDTO;
}());
exports.EmployeeMasterRequestDTO = EmployeeMasterRequestDTO;
