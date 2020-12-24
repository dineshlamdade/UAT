import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
//import { NotificationsService } from '@src/app/core/services/notifications.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JobInformationService } from '../../../employee-master-services/job-information.service';
import { EducationSkillsInformationService } from '../../../employee-master-services/education-skills-information.service';
import { SharedInformationService } from '../../../employee-master-services/shared-service/shared-information.service';
import { BankInformationService } from './../../../employee-master-services/bank-information.service';
import { EventEmitterService } from './../../../employee-master-services/event-emitter/event-emitter.service';
import { MinumumWagesDetailsModel } from './../../../dto-models/minimum-wages.model';
import { PayrollAreaInformationService } from '../../../employee-master-services/payroll-area-information.service';

@Component({
  selector: 'app-minimum-wages-detail',
  templateUrl: './minimum-wages-detail.component.html',
  styleUrls: ['./minimum-wages-detail.component.scss']
})
export class MinimumWagesDetailComponent implements OnInit {

  minimumWagesForm: FormGroup;
  tomorrow = new Date();
  minumumWagesDetailsModel = new MinumumWagesDetailsModel('', '', null, null, '', '', null, '', '', null, '', '', null, '', '', null, '', '');
  projectList = 'HSBC Android,HSBC Onboarding,Paysquare HRMS,Paysqaure LMS'.split(',');
  stateList: Array<any> = [];
  zoneList: Array<any> = [];
  skillList: Array<any> = [];
  filteredSkillList: Array<any> = [];
  categoryList: Array<any> = [];
  workList: Array<any> = [];
  filteredWorkList: Array<any> = [];

  employeeMasterId: number;
  joiningDate: any;
  employeeMinimumWagesInfoId: any;
  confirmMsg: any;
  stateValidate: Boolean;
  zoneValidate: Boolean;
  skillValidate: Boolean;
  establishmentValidate: Boolean;
  workValidate: Boolean;
  payrollAreaList: Array<any> = [];
  filteredPayrollAreaList: Array<any> = [];
  payrollAreaCode: '';

  constructor(private EducationSkillsInformationService: EducationSkillsInformationService, public datepipe: DatePipe,
    private EventEmitterService: EventEmitterService, private JobInformationService: JobInformationService,
    private formBuilder: FormBuilder, private BankInformationService: BankInformationService, private PayrollAreaService: PayrollAreaInformationService, private CommonDataService: SharedInformationService) {
    this.tomorrow.setDate(this.tomorrow.getDate());

  }

  ngOnInit(): void {

    this.minimumWagesForm = this.formBuilder.group({
      stateControl: [''],
      stateStartDateControl: [{ value: null, disabled: true }],
      stateEndDateControl: [{ value: null, disabled: true }],
      zoneControl: [''],
      zoneStartDateControl: [{ value: null, disabled: true }],
      zoneEndDateControl: [{ value: null, disabled: true }],
      skillControl: [''],
      skillStartDateControl: [{ value: null, disabled: true }],
      skillEndDateControl: [{ value: null, disabled: true }],
      categoryOfEstablishmentControl: [''],
      establishmentStartDateControl: [{ value: null, disabled: true }],
      establishmentEndDateControl: [{ value: null, disabled: true }],
      workTypeControl: [''],
      workStartDateControl: [{ value: null, disabled: true }],
      workEndDateControl: [{ value: null, disabled: true }],

      payrollAreaCode: ['']
    });

    this.payrollAreaCode = null;
    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);

    const joiningDate = localStorage.getItem('joiningDate');
    this.joiningDate = new Date(joiningDate);

    //get assigned payroll area's list
    this.getPayrollAreaInformation();

    this.JobInformationService.getMinimumDropdown().subscribe(res => {

      this.zoneList = [];
      this.skillList = [];
      this.filteredSkillList = [];
      this.categoryList = [];
      this.workList = [];

      const location = res.data.results.filter((item) => {
        if (item.category == 'Class Of Employement') {
          this.workList.push(item.value);
          this.filteredWorkList.push(item.value);
        }
        if (item.category == 'Zone') {
          this.zoneList.push(item.value);
        }
        if (item.category == 'Class Of Industry') {
          this.categoryList.push(item.value);

        }
        if (item.category == 'Skill') {
          this.skillList.push(item.value);
          this.filteredSkillList.push(item.value);
        }
      });
    })

    this.BankInformationService.getStates().subscribe(res => {
      this.stateList = [];
      this.stateList = res.data.results;
    })

    this.getMinimumWagesForm()
  }

  //get Minimum wages details service calling
  getMinimumWagesForm() {

    this.JobInformationService.getMinimumWagesDetails(this.employeeMasterId, this.payrollAreaCode).subscribe(res => {

      this.employeeMinimumWagesInfoId = res.data.results[0].employeeMinimumWagesInfoId;
      if (res.data.results[0]) {

        this.minumumWagesDetailsModel = res.data.results[0];
        this.payrollAreaCode = res.data.results[0].payrollAreaCode;

        //changing String to date format
        // this.minumumWagesDetailsModel.skillStartDate = new Date(res.data.results[0].skillStartDate);
        // this.minumumWagesDetailsModel.skillEndDate = new Date(res.data.results[0].skillEndDate);

        // this.minumumWagesDetailsModel.workStartDate = new Date(res.data.results[0].workStartDate);
        // this.minumumWagesDetailsModel.workEndDate = new Date(res.data.results[0].workEndDate);

        //state
        if (this.minumumWagesDetailsModel.state != null) {
          const stateStartDate = this.minimumWagesForm.get('stateStartDateControl');
          stateStartDate.enable();
          const stateEndDate = this.minimumWagesForm.get('stateEndDateControl');
          stateEndDate.enable();
        }
        else {
          this.disableStateDates();
        }

        //zone
        if (this.minumumWagesDetailsModel.zone != null) {
          const zoneStartDate = this.minimumWagesForm.get('zoneStartDateControl');
          zoneStartDate.enable();
          const zoneEndDate = this.minimumWagesForm.get('zoneEndDateControl');
          zoneEndDate.enable();
        }
        else {
          this.disableZoneDates();
        }

        //skill
        if (this.minumumWagesDetailsModel.skill != null) {
          const skillStartDate = this.minimumWagesForm.get('skillStartDateControl');
          skillStartDate.enable();
          const skillEndDate = this.minimumWagesForm.get('skillEndDateControl');
          skillEndDate.enable();
        }
        else {
          this.disableSkillDates();
        }

        //category Of Establishment
        if (this.minumumWagesDetailsModel.categoryOfEstablishment != null) {
          const establishmentStartDate = this.minimumWagesForm.get('establishmentStartDateControl');
          establishmentStartDate.enable();
          const establishmentEndDate = this.minimumWagesForm.get('establishmentEndDateControl');
          establishmentEndDate.enable();
        }
        else {
          this.disableEstablishmentDates();
        }

        //work Type
        if (this.minumumWagesDetailsModel.workType != null) {
          const workStartDate = this.minimumWagesForm.get('workStartDateControl');
          workStartDate.enable();
          const workEndDate = this.minimumWagesForm.get('workEndDateControl');
          workEndDate.enable();
        }
        else {
          this.disableWorkDates();
        }

      }
    }, (error: any) => {

      this.resetMinimumWagesForm();

    })
    if (this.payrollAreaList.length == 1) {
      this.payrollAreaCode = this.payrollAreaList[0];
    }
    else {
      this.payrollAreaCode = this.payrollAreaCode;
    }
    this.minimumWagesForm.markAsUntouched();
  }

  minumumWagesDetailsSubmit(minumumWagesDetailsModel) {

    minumumWagesDetailsModel.employeeMasterId = this.employeeMasterId;
    minumumWagesDetailsModel.employeeMinimumWagesInfoId = this.employeeMinimumWagesInfoId;

    if (this.payrollAreaList.length == 1) {
      minumumWagesDetailsModel.payrollAreaCode = this.payrollAreaList[0];
    }
    else {
      minumumWagesDetailsModel.payrollAreaCode = this.payrollAreaCode;
    }

    minumumWagesDetailsModel.stateStartDate = this.datepipe.transform(minumumWagesDetailsModel.stateStartDate, "dd-MMM-yyyy");
    minumumWagesDetailsModel.stateEndDate = this.datepipe.transform(minumumWagesDetailsModel.stateEndDate, "dd-MMM-yyyy");
    minumumWagesDetailsModel.zoneStartDate = this.datepipe.transform(minumumWagesDetailsModel.zoneStartDate, "dd-MMM-yyyy");
    minumumWagesDetailsModel.zoneEndDate = this.datepipe.transform(minumumWagesDetailsModel.zoneEndDate, "dd-MMM-yyyy");
    minumumWagesDetailsModel.skillStartDate = this.datepipe.transform(minumumWagesDetailsModel.skillStartDate, "dd-MMM-yyyy");
    minumumWagesDetailsModel.skillEndDate = this.datepipe.transform(minumumWagesDetailsModel.skillEndDate, "dd-MMM-yyyy");
    minumumWagesDetailsModel.establishmentStartDate = this.datepipe.transform(minumumWagesDetailsModel.establishmentStartDate, "dd-MMM-yyyy");
    minumumWagesDetailsModel.establishmentEndDate = this.datepipe.transform(minumumWagesDetailsModel.establishmentEndDate, "dd-MMM-yyyy");
    minumumWagesDetailsModel.workStartDate = this.datepipe.transform(minumumWagesDetailsModel.workStartDate, "dd-MMM-yyyy");
    minumumWagesDetailsModel.workEndDate = this.datepipe.transform(minumumWagesDetailsModel.workEndDate, "dd-MMM-yyyy");


    this.JobInformationService.postMinimumWagesDetails(minumumWagesDetailsModel).subscribe(res => {

      this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
      this.minumumWagesDetailsModel = res.data.results[0];
      this.employeeMinimumWagesInfoId = this.minumumWagesDetailsModel.employeeMinimumWagesInfoId;

      this.getMinimumWagesForm();
      this.EventEmitterService.getJobInformationInitiate();
    }, (error: any) => {
      this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
    })
    this.minimumWagesForm.markAsUntouched();
  }

  validateStateDate() {

    if (this.minumumWagesDetailsModel.stateEndDate == '' || this.minumumWagesDetailsModel.stateEndDate == null) {
      this.minumumWagesDetailsModel.stateEndDate = '31-Dec-9999';
      const stateEndDate = this.minimumWagesForm.get('stateEndDateControl');
      stateEndDate.enable();
    }
  }

  validateZoneDate() {


    if (this.minumumWagesDetailsModel.zoneEndDate == '' || this.minumumWagesDetailsModel.zoneEndDate == null) {
      this.minumumWagesDetailsModel.zoneEndDate = '31-Dec-9999';
      const zoneEndDate = this.minimumWagesForm.get('zoneEndDateControl');
      zoneEndDate.enable();
    }

  }
  validateSkillDate() {


    if (this.minumumWagesDetailsModel.skillEndDate == '' || this.minumumWagesDetailsModel.skillEndDate == null) {
      this.minumumWagesDetailsModel.skillEndDate = '31-Dec-9999';
      const skillEndDate = this.minimumWagesForm.get('skillEndDateControl');
      skillEndDate.enable();
    }

  }
  validateEstablishmentDate() {


    if (this.minumumWagesDetailsModel.establishmentEndDate == '' || this.minumumWagesDetailsModel.establishmentEndDate == null) {
      this.minumumWagesDetailsModel.establishmentEndDate = '31-Dec-9999';
      const establishmentEndDate = this.minimumWagesForm.get('establishmentEndDateControl');
      establishmentEndDate.enable();
    }

  }
  validateWorkDate() {


    if (this.minumumWagesDetailsModel.workEndDate == '' || this.minumumWagesDetailsModel.workEndDate == null) {
      this.minumumWagesDetailsModel.workEndDate = '31-Dec-9999';
      const workEndDate = this.minimumWagesForm.get('workEndDateControl');
      workEndDate.enable();
    }

  }
  validateStateDates() {
    this.minimumWagesForm.controls['stateStartDateControl'].setValidators([Validators.required]);
    this.minimumWagesForm.controls['stateEndDateControl'].setValidators([Validators.required]);
  }
  enableStateDate() {

    const stateStartDate = this.minimumWagesForm.get('stateStartDateControl');
    stateStartDate.enable();
    const stateEndDate = this.minimumWagesForm.get('stateEndDateControl');
    stateEndDate.enable();
    if (this.minumumWagesDetailsModel.state == '' || this.minumumWagesDetailsModel.state == null) {
      this.minumumWagesDetailsModel.stateStartDate = null;
      this.minumumWagesDetailsModel.stateEndDate = null;
      this.disableStateDates();
    }
  }

  disableStateDates() {
    const stateStartDate = this.minimumWagesForm.get('stateStartDateControl');
    stateStartDate.disable();
    const stateEndDate = this.minimumWagesForm.get('stateEndDateControl');
    stateEndDate.disable();
  }
  validateZoneDates() {
    this.minimumWagesForm.controls['zoneStartDateControl'].setValidators([Validators.required]);
    this.minimumWagesForm.controls['zoneEndDateControl'].setValidators([Validators.required]);
  }
  enableZoneDate() {
    const zoneStartDate = this.minimumWagesForm.get('zoneStartDateControl');
    zoneStartDate.enable();
    const zoneEndDate = this.minimumWagesForm.get('zoneEndDateControl');
    zoneEndDate.enable();
    if (this.minumumWagesDetailsModel.zone == '' || this.minumumWagesDetailsModel.zone == null) {
      this.minumumWagesDetailsModel.zoneStartDate = null;
      this.minumumWagesDetailsModel.zoneEndDate = null;
      this.disableZoneDates();
    }

  }

  disableZoneDates() {
    const zoneStartDate = this.minimumWagesForm.get('zoneStartDateControl');
    zoneStartDate.disable();
    const zoneEndDate = this.minimumWagesForm.get('zoneEndDateControl');
    zoneEndDate.disable();
  }
  validateSkillDates() {
    this.minimumWagesForm.controls['skillStartDateControl'].setValidators([Validators.required]);
    this.minimumWagesForm.controls['skillEndDateControl'].setValidators([Validators.required]);
  }
  enableSkillDate() {
    const skillStartDate = this.minimumWagesForm.get('skillStartDateControl');
    skillStartDate.enable();
    const skillEndDate = this.minimumWagesForm.get('skillEndDateControl');
    skillEndDate.enable();
    if (this.minumumWagesDetailsModel.skill == '' || this.minumumWagesDetailsModel.skill == null) {
      this.minumumWagesDetailsModel.skillStartDate = null;
      this.minumumWagesDetailsModel.skillEndDate = null;
      this.disableSkillDates();
    }
  }

  disableSkillDates() {
    const skillStartDate = this.minimumWagesForm.get('skillStartDateControl');
    skillStartDate.disable();
    const skillEndDate = this.minimumWagesForm.get('skillEndDateControl');
    skillEndDate.disable();
  }

  validateEstablishmentDates() {
    this.minimumWagesForm.controls['establishmentStartDateControl'].setValidators([Validators.required]);
    this.minimumWagesForm.controls['establishmentEndDateControl'].setValidators([Validators.required]);
  }
  enableEstablishmentDate() {
    const establishmentStartDate = this.minimumWagesForm.get('establishmentStartDateControl');
    establishmentStartDate.enable();
    const establishmentEndDate = this.minimumWagesForm.get('establishmentEndDateControl');
    establishmentEndDate.enable();
    if (this.minumumWagesDetailsModel.categoryOfEstablishment == '' || this.minumumWagesDetailsModel.categoryOfEstablishment == null) {
      this.minumumWagesDetailsModel.establishmentStartDate = null;
      this.minumumWagesDetailsModel.establishmentEndDate = null;
      this.disableEstablishmentDates();
    }

  }

  disableEstablishmentDates() {
    const establishmentStartDate = this.minimumWagesForm.get('establishmentStartDateControl');
    establishmentStartDate.disable();
    const establishmentEndDate = this.minimumWagesForm.get('establishmentEndDateControl');
    establishmentEndDate.disable();

  }

  validateWorkDates() {
    this.minimumWagesForm.controls['workStartDateControl'].setValidators([Validators.required]);
    this.minimumWagesForm.controls['workEndDateControl'].setValidators([Validators.required]);
  }
  enableWorkDate() {
    const workStartDate = this.minimumWagesForm.get('workStartDateControl');
    workStartDate.enable();
    const workEndDate = this.minimumWagesForm.get('workEndDateControl');
    workEndDate.enable();
    if (this.minumumWagesDetailsModel.workType == '' || this.minumumWagesDetailsModel.workType == null) {
      this.minumumWagesDetailsModel.workStartDate = null;
      this.minumumWagesDetailsModel.workEndDate = null;
      this.disableWorkDates();
    }
  }

  disableWorkDates() {
    const workStartDate = this.minimumWagesForm.get('workStartDateControl');
    workStartDate.disable();
    const workEndDate = this.minimumWagesForm.get('workEndDateControl');
    workEndDate.disable();
  }

  //get payroll area assigned to that employee
  getPayrollAreaInformation() {

    this.PayrollAreaService.getPayrollAreaInformation(this.employeeMasterId).subscribe(res => {

      res.data.results[0].forEach(item => {
        this.payrollAreaList.push(item.payrollAreaCode);
        this.filteredPayrollAreaList.push(item.payrollAreaCode);

      });
    })

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
    this.payrollAreaCode = event;
    this. resetMinimumWagesForm();
    this.getMinimumWagesForm();
  }

  searchSkill(skill) {

    this.minumumWagesDetailsModel.skillStartDate = null;
    this.minumumWagesDetailsModel.skillEndDate = null;
    this.disableSkillDates();

    let filtered: any[] = [];
    let query = skill.query;
    for (let i = 0; i < this.skillList.length; i++) {
      let country = this.skillList[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredSkillList = filtered;
  }

  workSkill(work) {

    this.minumumWagesDetailsModel.workStartDate = null;
    this.minumumWagesDetailsModel.workEndDate = null;
    this.disableWorkDates();

    let filtered: any[] = [];
    let query = work.query;
    for (let i = 0; i < this.workList.length; i++) {
      let country = this.workList[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredWorkList = filtered;
  }

  
  resetMinimumWagesForm() {
    this.minimumWagesForm.reset();
    this.employeeMinimumWagesInfoId=0;

    //disable dates
    this.disableEstablishmentDates();
    this.disableSkillDates();
    this.disableStateDates();
    this.disableWorkDates();
    this.disableZoneDates();
  }
}