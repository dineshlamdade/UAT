import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { PositionDetailsModel } from './../../../dto-models/position-details.model';
import { EventEmitterService } from './../../../employee-master-services/event-emitter/event-emitter.service';
import { JobInformationService } from '../../../employee-master-services/job-information.service';
import { SharedInformationService } from '../../../employee-master-services/shared-service/shared-information.service';
import { PayrollAreaInformationService } from './../../../employee-master-services/payroll-area-information.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-position-detail',
  templateUrl: './position-detail.component.html',
  styleUrls: ['./position-detail.component.scss']
})
export class PositionDetailComponent implements OnInit {

  PositionForm: FormGroup;
  tomorrow = new Date();

  positionDetailsModel = new PositionDetailsModel(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
  employeeMasterId: number;
  joiningDate: any;
  employeePositionDetailId: any;
  confirmMsg: any;
  employeeTypeValidate: Boolean;
  employeeStatusValidate: Boolean;
  employeeTaxCategoryValidate: Boolean;
  designation1Validate: Boolean;
  designation2Validate: Boolean;
  reportingToValidate: Boolean;

  payrollAreaList: Array<any> = [];
  employeeTypeList: Array<any> = [];
  filteredEmployeeTypeList: Array<any> = [];
  employeeStatusList: Array<any> = [];
  filteredEmployeeStatusList: Array<any> = [];
  employeeTaxCategoryList: Array<any> = [];
  gradeList: Array<any> = [];
  designation1List: Array<any> = [];
  designation2List: Array<any> = [];
  filteredEmployeeTaxCategoryList: Array<any> = [];
  filteredGradeList: Array<any> = [];
  filteredDesignation1List: Array<any> = [];
  filteredDesignation2List: Array<any> = [];
  filteredPayrollAreaList: Array<any> = [];
  reportingToList: Array<any> = [];
  filteredReportingToList: Array<any> = [];

  selectAction: any;
  description: any;
  gradeCode: any;
  designation1Code: any;
  designation2Code: any;
  designation1Desc: any;
  designation2Desc: any;
  payrollAreaCode: any;

  constructor(public datepipe: DatePipe,
    private EventEmitterService: EventEmitterService, private JobInformationService: JobInformationService,
    private formBuilder: FormBuilder, private PayrollAreaService: PayrollAreaInformationService, private CommonDataService: SharedInformationService,private router: Router) {
    this.tomorrow.setDate(this.tomorrow.getDate());

  }
  ngOnInit():
    void {

    this.PositionForm = this.formBuilder.group({

      employeeTypeControl: [''],
      employeeTypeDescriptionControl: [''],
      employeeTypeFromDateControl: [{ value: null, disabled: true }],
      employeeTypeToDateControl: [{ value: null, disabled: true }],

      employeeStatusControl: [''],
      employeeStatusDescriptionControl: [''],
      employeeStatusFromDateControl: [{ value: null, disabled: true }],
      employeeStatusToDateControl: [{ value: null, disabled: true }],

      employeeTaxCategoryControl: [''],
      employeeTaxCategoryDescriptionControl: [''],
      employeeTaxCategoryFromDateControl: [{ value: null, disabled: true }],
      employeeTaxCategoryToDateControl: [{ value: null, disabled: true }],

      gradeMasterIdControl: [''],
      gradeFromDateControl: [{ value: null, disabled: true }],
      gradeToDateControl: [{ value: null, disabled: true }],

      designation1Control: [''],
      designation1FromDateControl: [{ value: null, disabled: true }],
      designation1ToDateControl: [{ value: null, disabled: true }],

      designation2Control: [''],
      designation2FromDateControl: [{ value: null, disabled: true }],
      designation2ToDateControl: [{ value: null, disabled: true }],

      reportingToControl: [''],
      reportingToDescriptionControl: [''],
      reportingFromDateControl: [{ value: null, disabled: false }],
      reportingToDateControl: [{ value: null, disabled: false }]
    });

    this.payrollAreaCode = '';
    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);

    //get payroll area code from local storage
    
    const payrollAreaCode = localStorage.getItem('jobInformationPayrollAreaCode')
    this.payrollAreaCode = new String(payrollAreaCode);

    const joiningDate = localStorage.getItem('joiningDate');
    this.joiningDate = new Date(joiningDate);

    //get payroll area's
    this.getPayrollAreaInformation();

    this.JobInformationService.getOtherMasterDetails().subscribe(res => {
      this.gradeList = [];
      this.designation1List = [];
      this.designation2List = [];

      const location = res.data.results.filter((item) => {

        if (item.masterType == 'GradeMaster') {
          this.gradeList.push(item);
          this.filteredGradeList.push(item);
        }
        if (item.masterType == 'Designation1Master') {
          this.designation1List.push(item);
          this.filteredDesignation1List.push(item);
        }
        if (item.masterType == 'Designation2Master') {
          this.designation2List.push(item);
          this.filteredDesignation2List.push(item);
        }

      });

    })

    this.JobInformationService.getPositionDD().subscribe(res => {
     
      this.employeeTypeList = [];
      this.employeeStatusList = [];
      this.employeeTaxCategoryList = [];


      const location = res.data.results.filter((item) => {
        if (item.category == 'Employee Type') {
          this.employeeTypeList.push(item);
          this.filteredEmployeeTypeList.push(item)
        }
        if (item.category == 'Employee Status') {
          console.log(' item' + item.category);
          this.employeeStatusList.push(item);
          console.log(' item1' + item.category);
          this.filteredEmployeeStatusList.push(item)
        }
        if (item.category == 'Employee Tax Category') {
          this.employeeTaxCategoryList.push(item);
          this.filteredEmployeeTaxCategoryList.push(item)
        }
      });
    })

    //get Reporting to DD values(All active emp list)
    this.JobInformationService.getAllEmployees().subscribe(res => {
     debugger
      this.reportingToList = [];
      this.filteredReportingToList = [];
      const location = res.data.results;

      location.filter((item) => {
          this.reportingToList.push(item.fullName);
          this.filteredReportingToList.push(item.fullName)
      });
    })

    this.getPositionForm()

  }

  //get organization details service calling
  getPositionForm() {

    this.JobInformationService.getPositionDetails(this.employeeMasterId, this.payrollAreaCode).subscribe(res => {

      this.employeePositionDetailId = res.data.results[0].employeePositionDetailId;
      if (res.data.results[0]) {
        this.positionDetailsModel = res.data.results[0];

        this.description = res.data.results[0].gradeDescription;
        this.gradeCode = res.data.results[0].gradeCode;
        this.designation1Desc = res.data.results[0].designation1Description;
        this.designation1Code = res.data.results[0].designation1Code;
        this.designation2Desc = res.data.results[0].designation2Description;
        this.designation2Code = res.data.results[0].designation2Code;

        //emmployee type
        if (this.positionDetailsModel.employeeType != null) {
          const employeeTypeFromDate = this.PositionForm.get('employeeTypeFromDateControl');
          employeeTypeFromDate.enable();
          const employeeTypeToDate = this.PositionForm.get('employeeTypeToDateControl');
          employeeTypeToDate.enable();

        }
        else {
          this.disableEmployeeTypeDates();
        }

        //employee status
        if (this.positionDetailsModel.employeeStatus != null) {
          const employeeStatusFromDate = this.PositionForm.get('employeeStatusFromDateControl');
          employeeStatusFromDate.enable();
          const employeeStatusToDate = this.PositionForm.get('employeeStatusToDateControl');
          employeeStatusToDate.enable();

        }
        else {
          this.disableEmployeeStatusDates();
        }

        //employee tax category
        if (this.positionDetailsModel.employeeTaxCategory != null) {
          const employeeTaxCategoryFromDate = this.PositionForm.get('employeeTaxCategoryFromDateControl');
          employeeTaxCategoryFromDate.enable();
          const employeeTaxCategoryToDate = this.PositionForm.get('employeeTaxCategoryToDateControl');
          employeeTaxCategoryToDate.enable();
        }
        else {
          this.disableEmployeeTaxDates();
        }

        //grade
        if (this.positionDetailsModel.gradeMasterId != null) {
          const gradeFromDate = this.PositionForm.get('gradeFromDateControl');
          gradeFromDate.enable();
          const gradeToDate = this.PositionForm.get('gradeToDateControl');
          gradeToDate.enable();
        }
        else {
          this.disableGradeDates();
        }

        //designation 1
        if (this.positionDetailsModel.designation1MasterId != null) {
          const designation1FromDate = this.PositionForm.get('designation1FromDateControl');
          designation1FromDate.enable();
          const designation1ToDate = this.PositionForm.get('designation1ToDateControl');
          designation1ToDate.enable();
        }
        else {
          this.disableDesignation1Dates();
        }

        //designation 2
        if (this.positionDetailsModel.designation2MasterId != null) {
          const designation2FromDate = this.PositionForm.get('designation2FromDateControl');
          designation2FromDate.enable();
          const designation2ToDate = this.PositionForm.get('designation2ToDateControl');
          designation2ToDate.enable();
        }
        else {
          this.disableDesignation2Dates();
        }

        //reporting to
        if (this.positionDetailsModel.reportingTo != null) {
          const reportingFromDate = this.PositionForm.get('reportingFromDateControl');
          reportingFromDate.enable();
          const reportingToDate = this.PositionForm.get('reportingToDateControl');
          reportingToDate.enable();
        }
        else {
          this.disableReportingDates();
        }
      }
    }, (error: any) => {

      this.resetPositionForm();
    })
    if (this.payrollAreaList.length == 1) {
      this.payrollAreaCode = this.payrollAreaList[0];
    }
    else {
     //get payroll area code from local storage
     const payrollAreaCode = localStorage.getItem('jobInformationPayrollAreaCode')
     this.payrollAreaCode = new String(payrollAreaCode);
    }
    this.PositionForm.markAsUntouched();
  }

  positionFormSubmit(positionDetailsModel) {

    if (this.designation1Desc == null) {
      positionDetailsModel.designation1MasterId = null;
    }
    if (this.designation2Desc == null) {
      positionDetailsModel.designation2MasterId = null;
    }
    if (this.description == null) {
      positionDetailsModel.gradeMasterId = null;
    }
    if (positionDetailsModel.employeeTaxCategory == '') {
      positionDetailsModel.employeeTaxCategory = null;
    }
    if (positionDetailsModel.employeeStatus == '') {
      positionDetailsModel.employeeStatus = null;
    }
    if (positionDetailsModel.employeeType == '') {
      positionDetailsModel.employeeType = null;
    }

    positionDetailsModel.employeeMasterId = this.employeeMasterId;
    positionDetailsModel.employeePositionDetailId = this.employeePositionDetailId;
    if (this.payrollAreaList.length == 1) {
      positionDetailsModel.payrollAreaCode = this.payrollAreaList[0];
    }
    else {
     //get payroll area code from local storage
     const payrollAreaCode = localStorage.getItem('jobInformationPayrollAreaCode')
     this.payrollAreaCode = new String(payrollAreaCode);
     positionDetailsModel.payrollAreaCode=new String(payrollAreaCode);
    }

    positionDetailsModel.employeeTypeFromDate = this.datepipe.transform(positionDetailsModel.employeeTypeFromDate, "dd-MMM-yyyy");
    positionDetailsModel.employeeTypeToDate = this.datepipe.transform(positionDetailsModel.employeeTypeToDate, "dd-MMM-yyyy");
    positionDetailsModel.employeeStatusFromDate = this.datepipe.transform(positionDetailsModel.employeeStatusFromDate, "dd-MMM-yyyy");
    positionDetailsModel.employeeStatusToDate = this.datepipe.transform(positionDetailsModel.employeeStatusToDate, "dd-MMM-yyyy");
    positionDetailsModel.employeeTaxCategoryFromDate = this.datepipe.transform(positionDetailsModel.employeeTaxCategoryFromDate, "dd-MMM-yyyy");
    positionDetailsModel.employeeTaxCategoryToDate = this.datepipe.transform(positionDetailsModel.employeeTaxCategoryToDate, "dd-MMM-yyyy");
    positionDetailsModel.gradeFromDate = this.datepipe.transform(positionDetailsModel.gradeFromDate, "dd-MMM-yyyy");
    positionDetailsModel.gradeToDate = this.datepipe.transform(positionDetailsModel.gradeToDate, "dd-MMM-yyyy");
    positionDetailsModel.designation1FromDate = this.datepipe.transform(positionDetailsModel.designation1FromDate, "dd-MMM-yyyy");
    positionDetailsModel.designation1ToDate = this.datepipe.transform(positionDetailsModel.designation1ToDate, "dd-MMM-yyyy");
    positionDetailsModel.designation2FromDate = this.datepipe.transform(positionDetailsModel.designation2FromDate, "dd-MMM-yyyy");
    positionDetailsModel.designation2ToDate = this.datepipe.transform(positionDetailsModel.designation2ToDate, "dd-MMM-yyyy");
    positionDetailsModel.reportingFromDate = this.datepipe.transform(positionDetailsModel.reportingFromDate, "dd-MMM-yyyy");
    positionDetailsModel.reportingToDate = this.datepipe.transform(positionDetailsModel.reportingToDate, "dd-MMM-yyyy");

    //deleting extra fields

    //gradeCode
    delete positionDetailsModel.gradeCode;
    delete positionDetailsModel.gradeDescription;

    //designation1Description
    delete positionDetailsModel.designation1Code;
    delete positionDetailsModel.designation1Description;

    //designation2Description
    delete positionDetailsModel.designation2Code;
    delete positionDetailsModel.designation2Description;

    this.JobInformationService.postPositionDetails(positionDetailsModel).subscribe(res => {

      this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
      this.positionDetailsModel = res.data.results[0];
      this.employeePositionDetailId = this.positionDetailsModel.employeePositionDetailId;

      // this.getPositionForm()
     //redirecting page to summary page
     this.router.navigate(['/employee-master/job-information/job-summary']);
    }, (error: any) => {
      this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
    })
    this.PositionForm.markAsUntouched();
  }

  validateEmployeeTypeToDate() {
    if (this.positionDetailsModel.employeeTypeToDate == '' || this.positionDetailsModel.employeeTypeToDate == null) {
      this.positionDetailsModel.employeeTypeToDate = '31-Dec-9999';
      const employeeTypeToDate = this.PositionForm.get('employeeTypeToDateControl');
      employeeTypeToDate.enable();
    }
  }
  validatEmployeeTypeDate() {
    
    this.PositionForm.controls['employeeTypeFromDateControl'].setValidators([Validators.required]);
    this.PositionForm.controls['employeeTypeToDateControl'].setValidators([Validators.required]);
  }
  enableEmployeeTypeDate() {
    const employeeTypeFromDate = this.PositionForm.get('employeeTypeFromDateControl');
    employeeTypeFromDate.enable();
    const employeeTypeToDate = this.PositionForm.get('employeeTypeToDateControl');
    employeeTypeToDate.enable();
    if (this.positionDetailsModel.employeeType == '' || this.positionDetailsModel.employeeType == null) {
      this.positionDetailsModel.employeeTypeFromDate = null;
      this.positionDetailsModel.employeeTypeToDate = null;
      this.disableEmployeeTypeDates();
    }
  }

  disableEmployeeTypeDates() {
    const employeeTypeToDate = this.PositionForm.get('employeeTypeToDateControl');
    employeeTypeToDate.disable();
    const employeeTypeFromDate = this.PositionForm.get('employeeTypeFromDateControl');
    employeeTypeFromDate.disable();
  }

  validateEmployeeStatusToDate() {
    if (this.positionDetailsModel.employeeStatusToDate == '' || this.positionDetailsModel.employeeStatusToDate == null) {
      this.positionDetailsModel.employeeStatusToDate = '31-Dec-9999';
      const employeeStatusToDate = this.PositionForm.get('employeeStatusToDateControl');
      employeeStatusToDate.enable();
    }
  }
  validatEmployeeStatusDate() {
    this.PositionForm.controls['employeeStatusFromDateControl'].setValidators([Validators.required]);
    this.PositionForm.controls['employeeStatusToDateControl'].setValidators([Validators.required]);
  }
  enableEmployeeStatusDate() {
    const employeeStatusFromDate = this.PositionForm.get('employeeStatusFromDateControl');
    employeeStatusFromDate.enable();
    const employeeStatusToDate = this.PositionForm.get('employeeStatusToDateControl');
    employeeStatusToDate.enable();
    if (this.positionDetailsModel.employeeStatus == '' || this.positionDetailsModel.employeeStatus == null) {
      this.positionDetailsModel.employeeStatusFromDate = null;
      this.positionDetailsModel.employeeStatusToDate = null;
      this.disableEmployeeStatusDates();
    }
  }

  disableEmployeeStatusDates() {
    const employeeStatusToDate = this.PositionForm.get('employeeStatusToDateControl');
    employeeStatusToDate.disable();
    const employeeStatusFromDate = this.PositionForm.get('employeeStatusFromDateControl');
    employeeStatusFromDate.disable();
  }
  validateEmployeeTaxCategoryToDate() {
    if (this.positionDetailsModel.employeeTaxCategoryToDate == '' || this.positionDetailsModel.employeeTaxCategoryToDate == null) {
      this.positionDetailsModel.employeeTaxCategoryToDate = '31-Dec-9999';
      const employeeTaxCategoryToDate = this.PositionForm.get('employeeTaxCategoryToDateControl');
      employeeTaxCategoryToDate.enable();
    }
  }
  validatEmployeeTaxCategoryDate() {
    this.PositionForm.controls['employeeTaxCategoryFromDateControl'].setValidators([Validators.required]);
    this.PositionForm.controls['employeeTaxCategoryToDateControl'].setValidators([Validators.required]);
  }
  enableEmployeeTaxCategoryDate() {
    const employeeTaxCategoryFromDate = this.PositionForm.get('employeeTaxCategoryFromDateControl');
    employeeTaxCategoryFromDate.enable();
    const employeeTaxCategoryToDate = this.PositionForm.get('employeeTaxCategoryToDateControl');
    employeeTaxCategoryToDate.enable();
    if (this.positionDetailsModel.employeeTaxCategory == '' || this.positionDetailsModel.employeeTaxCategory == null) {
      this.positionDetailsModel.employeeTaxCategoryFromDate = null;
      this.positionDetailsModel.employeeTaxCategoryToDate = null;
      this.disableEmployeeTaxDates();
    }
  }

  disableEmployeeTaxDates() {
    const employeeTaxCategoryToDate = this.PositionForm.get('employeeTaxCategoryToDateControl');
    employeeTaxCategoryToDate.disable();
    const employeeTaxCategoryFromDate = this.PositionForm.get('employeeTaxCategoryFromDateControl');
    employeeTaxCategoryFromDate.disable();
  }

  validateGradeToDate() {
    if (this.positionDetailsModel.gradeToDate == '' || this.positionDetailsModel.gradeToDate == null) {
      this.positionDetailsModel.gradeToDate = '31-Dec-9999';
      const gradeToDate = this.PositionForm.get('gradeToDateControl');
      gradeToDate.enable();
    }
  }
  validatGradeDate() {
    this.PositionForm.controls['gradeFromDateControl'].setValidators([Validators.required]);
    this.PositionForm.controls['gradeToDateControl'].setValidators([Validators.required]);
  }
  enableGradeDate() {
    const gradeFromDate = this.PositionForm.get('gradeFromDateControl');
    gradeFromDate.enable();
    const gradeToDate = this.PositionForm.get('gradeToDateControl');
    gradeToDate.enable();
    if (this.gradeCode == '' || this.gradeCode == null) {
      this.positionDetailsModel.gradeFromDate = null;
      this.positionDetailsModel.gradeToDate = null;
      this.disableGradeDates();
    }
  }

  disableGradeDates() {
    const gradeToDate = this.PositionForm.get('gradeToDateControl');
    gradeToDate.disable();
    const gradeFromDate = this.PositionForm.get('gradeFromDateControl');
    gradeFromDate.disable();
  }
  validateDesignation1ToDate() {
    if (this.positionDetailsModel.designation1ToDate == '' || this.positionDetailsModel.designation1ToDate == null) {
      this.positionDetailsModel.designation1ToDate = '31-Dec-9999';
      const designation1ToDate = this.PositionForm.get('designation1ToDateControl');
      designation1ToDate.enable();
    }
  }

  validatDesignation1Date() {
    this.PositionForm.controls['designation1FromDateControl'].setValidators([Validators.required]);
    this.PositionForm.controls['designation1ToDateControl'].setValidators([Validators.required]);
  }
  enableDesignation1Date() {
    const designation1FromDate = this.PositionForm.get('designation1FromDateControl');
    designation1FromDate.enable();
    const designation1ToDate = this.PositionForm.get('designation1ToDateControl');
    designation1ToDate.enable();
    if (this.designation1Code == '' || this.designation1Code == null) {
      this.positionDetailsModel.designation1FromDate = null;
      this.positionDetailsModel.designation1ToDate = null;
      this.disableDesignation1Dates();
    }
  }

  disableDesignation1Dates() {
    const designation1ToDate = this.PositionForm.get('designation1ToDateControl');
    designation1ToDate.disable();
    const designation1FromDate = this.PositionForm.get('designation1FromDateControl');
    designation1FromDate.disable();
  }
  validateDesignation2ToDate() {
    if (this.positionDetailsModel.designation2ToDate == '' || this.positionDetailsModel.designation2ToDate == null) {
      this.positionDetailsModel.designation2ToDate = '31-Dec-9999';
      const designation2ToDate = this.PositionForm.get('designation2ToDateControl');
      designation2ToDate.enable();
    }
  }
  validatDesignation2Date() {
    this.PositionForm.controls['designation2FromDateControl'].setValidators([Validators.required]);
    this.PositionForm.controls['designation2ToDateControl'].setValidators([Validators.required]);
  }
  enableDesignation2Date() {
    const designation2FromDate = this.PositionForm.get('designation2FromDateControl');
    designation2FromDate.enable();
    const designation2ToDate = this.PositionForm.get('designation2ToDateControl');
    designation2ToDate.enable();
    if (this.designation2Code == '' || this.designation2Code == null) {
      this.positionDetailsModel.designation2FromDate = null;
      this.positionDetailsModel.designation2ToDate = null;
      this.disableDesignation2Dates();
    }
  }

  disableDesignation2Dates() {
    const designation2ToDate = this.PositionForm.get('designation2ToDateControl');
    designation2ToDate.disable();
    const designation2FromDate = this.PositionForm.get('designation2FromDateControl');
    designation2FromDate.disable();
  }
  validateReportingToDate() {
    if (this.positionDetailsModel.reportingToDate == '' || this.positionDetailsModel.reportingToDate == null) {
      this.positionDetailsModel.reportingToDate = '31-Dec-9999';
      const reportingToDate = this.PositionForm.get('reportingToDateControl');
      reportingToDate.enable();
    }
  }
  validatReportingDate() {
    this.PositionForm.controls['reportingFromDateControl'].setValidators([Validators.required]);
    this.PositionForm.controls['reportingToDateControl'].setValidators([Validators.required]);
  }
  enableReportingDate() {
    const reportingFromDate = this.PositionForm.get('reportingFromDateControl');
    reportingFromDate.enable();
    const reportingToDate = this.PositionForm.get('reportingToDateControl');
    reportingToDate.enable();
    if (this.positionDetailsModel.reportingTo == '' || this.positionDetailsModel.reportingTo == null) {
      this.positionDetailsModel.reportingFromDate = null;
      this.positionDetailsModel.reportingToDate = null;
      this.disableReportingDates();
    }
  }

  disableReportingDates() {
    const reportingToDate = this.PositionForm.get('reportingToDateControl');
    reportingToDate.disable();
    const reportingFromDate = this.PositionForm.get('reportingFromDateControl');
    reportingFromDate.disable();
  }
  gradeObject(grade) {

    const toSelect = this.filteredGradeList.find(
      (c) => c.masterCode === this.PositionForm.get('gradeMasterIdControl').value
    );
    this.description = toSelect.masterDescription;
    this.positionDetailsModel.gradeMasterId = toSelect.masterId;
    this.PositionForm.get('gradeMasterIdControl').setValue(toSelect.masterCode);
    this.enableGradeDate()
  }
  designation1Object(designation1) {
    const toSelect = this.filteredDesignation1List.find(
      (c) => c.masterCode === this.PositionForm.get('designation1Control').value
    );
    this.designation1Desc = toSelect.masterDescription;
    this.positionDetailsModel.designation1MasterId = toSelect.masterId;
    this.PositionForm.get('designation1Control').setValue(toSelect.masterCode);
    this.enableDesignation1Date()
  }

  designation2Object(designation2) {
    const toSelect = this.filteredDesignation2List.find(
      (c) => c.masterCode === this.PositionForm.get('designation2Control').value
    );
    this.designation2Desc = toSelect.masterDescription;
    this.positionDetailsModel.designation2MasterId = toSelect.masterId;
    this.PositionForm.get('designation2Control').setValue(toSelect.masterCode);
    this.enableDesignation2Date()
  }

  employeeTypeObject(employee) {
    const toSelect = this.filteredEmployeeTypeList.find(
      (c) => c.value === this.PositionForm.get('employeeTypeControl').value
    );
    this.positionDetailsModel.employeeTypeDescription = toSelect.description;
    this.PositionForm.get('employeeTypeDescriptionControl').setValue(toSelect.description);
    this.positionDetailsModel.employeeType = toSelect.value;
    this.enableEmployeeTypeDate()
  }

  employeeStatusObject(employee) {
    const toSelect = this.filteredEmployeeStatusList.find(
      (c) => c.value === this.PositionForm.get('employeeStatusControl').value
    );
    this.positionDetailsModel.employeeStatusDescription = toSelect.description;
    this.PositionForm.get('employeeStatusDescriptionControl').setValue(toSelect.description);
    this.positionDetailsModel.employeeStatus = toSelect.value;
    this.enableEmployeeStatusDate()
  }
  employeeTaxCategoryObject(employee) {
    const toSelect = this.filteredEmployeeTaxCategoryList.find(
      (c) => c.value === this.PositionForm.get('employeeTaxCategoryControl').value
    );
    this.positionDetailsModel.employeeTaxCategoryDescription = toSelect.description;
    this.PositionForm.get('employeeTaxCategoryDescriptionControl').setValue(toSelect.description);
    this.positionDetailsModel.employeeTaxCategory = toSelect.value;
    this.enableEmployeeTaxCategoryDate()
  }

  reportingToObject(employee) {
    debugger
    const toSelect = this.filteredReportingToList.find(
      (c) => c === this.PositionForm.get('reportingToControl')
    );
   // this.positionDetailsModel.employeeTaxCategoryDescription = toSelect.description;
   // this.PositionForm.get('employeeTaxCategoryDescriptionControl').setValue(toSelect.description);
    this.positionDetailsModel.reportingTo = toSelect;
    this.enableReportingDate()
  }

  searchEmpType(employeeType) {

    this.positionDetailsModel.employeeTypeDescription = null;
    this.positionDetailsModel.employeeTypeFromDate = null;
    this.positionDetailsModel.employeeTypeToDate = null;
    this.disableEmployeeTypeDates();
    
    employeeType = employeeType.toLowerCase();
    const ifsc = this.filteredEmployeeTypeList.filter((item) => {
      return JSON.stringify(item).toLowerCase().includes(employeeType);
    });
    this.employeeTypeList = ifsc;
  }

  searchEmployeeStatus(employeeStatus) {

    this.positionDetailsModel.employeeStatusDescription = null;
    this.positionDetailsModel.employeeStatusFromDate = null;
    this.positionDetailsModel.employeeStatusToDate = null;
    const employeeStatusToDate = this.PositionForm.get('employeeStatusToDateControl');

    this.disableEmployeeStatusDates();
    
    employeeStatus = employeeStatus.toLowerCase();
    const ifsc = this.filteredEmployeeStatusList.filter((item) => {
      return JSON.stringify(item).toLowerCase().includes(employeeStatus);
    });
    this.employeeStatusList = ifsc;
  }

  searchEmployeeTaxCategory(employeeTaxCategory) {

    this.positionDetailsModel.employeeTaxCategoryDescription = null;
    this.positionDetailsModel.employeeTaxCategoryFromDate = null;
    this.positionDetailsModel.employeeTaxCategoryToDate = null;

    this.disableEmployeeTaxDates();

    employeeTaxCategory = employeeTaxCategory.toLowerCase();
    const ifsc = this.filteredEmployeeTaxCategoryList.filter((item) => {
      return JSON.stringify(item).toLowerCase().includes(employeeTaxCategory);
    });
    this.employeeTaxCategoryList = ifsc;
  }



  SearchGrade(gradeCode) {

    this.description = null;
    this.positionDetailsModel.gradeFromDate = null;
    this.positionDetailsModel.gradeToDate = null;

    this.disableGradeDates();

    gradeCode = gradeCode.toLowerCase();
    const ifsc = this.filteredGradeList.filter((item) => {
      return JSON.stringify(item).toLowerCase().includes(gradeCode);
    });
    this.gradeList = ifsc;
  }

  searchDesignation1(designation1) {

    this.designation1Desc = null;
    this.positionDetailsModel.designation1FromDate = null;
    this.positionDetailsModel.designation1ToDate = null;

    this.disableDesignation1Dates();
    designation1 = designation1.toLowerCase();
    const desi1 = this.filteredDesignation1List.filter((item) => {
      return JSON.stringify(item).toLowerCase().includes(designation1);
    });
    this.designation1List = desi1;
  }

  searchDesignation2(designation2) {

    this.designation2Desc = null;
    this.positionDetailsModel.designation2FromDate = null;
    this.positionDetailsModel.designation2ToDate = null;

    this.disableDesignation2Dates();

    designation2 = designation2.toLowerCase();
    const desi2 = this.filteredDesignation2List.filter((item) => {
      return JSON.stringify(item).toLowerCase().includes(designation2);
    });
    this.designation2List = desi2;
  }

  searchReportingTo(reportingTo) {
    this.positionDetailsModel.reportingTo = null;
    this.positionDetailsModel.reportingFromDate = null;
    this.positionDetailsModel.reportingToDate = null;

    this.disableReportingDates();

    reportingTo = reportingTo.toLowerCase();
    const ifsc = this.filteredReportingToList.filter((item) => {
      return JSON.stringify(item).toLowerCase().includes(reportingTo);
    });
    this.reportingToList = ifsc;
  }

  //get payroll area aasigned to that employee
  getPayrollAreaInformation() {
    
    this.PayrollAreaService.getPayrollAreaInformation(this.employeeMasterId).subscribe(res => {

      res.data.results[0].forEach(item => {
        this.payrollAreaList.push(item.payrollAreaCode);
        this.filteredPayrollAreaList.push(item.payrollAreaCode);

      });
    })
    if (this.payrollAreaList.length == 1) {
      this.payrollAreaCode = this.payrollAreaList[0];
    }
    else {
      //get payroll area code from local storage
      const payrollAreaCode = localStorage.getItem('jobInformationPayrollAreaCode')
      this.payrollAreaCode = new String(payrollAreaCode);
    }

  }

  filterpayrollArea(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.payrollAreaList.length; i++) {
      let country = this.payrollAreaList[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredPayrollAreaList = filtered;
  }

  //set PayrollArea
  selectPayrollArea(event) {
    localStorage.setItem('jobInformationPayrollAreaCode', event);
    this.payrollAreaCode = event;
    this.resetPositionForm();
    this.getPositionForm();
  }

  resetPositionForm() {
    this.PositionForm.reset();

    //set fields to null for -form clearing
    this.employeePositionDetailId = 0;
    this.gradeCode = null;
    this.designation1Desc = null;
    this.designation2Desc = null;

    //disbale dates
    this.disableDesignation1Dates();
    this.disableDesignation2Dates();
    this.disableEmployeeStatusDates();
    this.disableEmployeeTaxDates();
    this.disableEmployeeTypeDates();
    this.disableGradeDates();
    this.disableReportingDates();
  }
}