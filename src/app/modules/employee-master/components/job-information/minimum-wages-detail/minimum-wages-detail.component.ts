import { Component, OnInit, TemplateRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JobInformationService } from '../job-information.service';
import { EducationSkillsInformationService } from '../../education-skills-information/education-skills-information.service';
import { SharedInformationService } from '../../../employee-master-services/shared-service/shared-information.service';
import { BankInformationService } from './../../bank-information/bank-information.service';
import { EventEmitterService } from './../../../employee-master-services/event-emitter/event-emitter.service';
import { MinumumWagesDetailsModel } from './../job-information-models/minimum-wages.model';
import { PayrollAreaInformationService } from '../../payroll-area-information/payroll-area-information.service';
import { Router } from '@angular/router';
import { JobDetailsDTO, OrganizationDetailsModel } from '../job-information-models/organization-details.model';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-minimum-wages-detail',
  templateUrl: './minimum-wages-detail.component.html',
  styleUrls: ['./minimum-wages-detail.component.scss']
})
export class MinimumWagesDetailComponent implements OnInit {

  minimumWagesForm: FormGroup;
  tomorrow = new Date();

  jobDetailsDTO = new JobDetailsDTO('','','','','','') ;
  organizationDetailsModel = new OrganizationDetailsModel('','',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null) ;

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
  payrollAreaCode: any;
  companyName: any;
  payrollType: any;
  payrollAreaId: any;
  minimumWagesData: any;
  availablePayrollIds:Array<any>=[];
  copyFromFilteredList:Array<any>=[];
  payrollAreaFromDate: Date;
  payrollAreaToDate: Date;
  companyId: any;
  payCode: any;
  modalRef: any;
  dataapi: any;
  historyData: any;

  constructor(private EducationSkillsInformationService: EducationSkillsInformationService, public datepipe: DatePipe,
    private EventEmitterService: EventEmitterService, private JobInformationService: JobInformationService,
    private formBuilder: FormBuilder, private BankInformationService: BankInformationService, private PayrollAreaService: PayrollAreaInformationService, private CommonDataService: SharedInformationService, private modalService: BsModalService
    , private router: Router) {
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

      payrollAreaCode: [''],
      payrollIdControl:[''],
      copyFromControl:['']
    });

    this.payrollAreaCode = '';
    this.companyName = '';

    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);
    this.payrollAreaId = Number(localStorage.getItem('payrollAreaId'));
    //get payroll area code from local storage
    const payrollAreaCode = localStorage.getItem('jobInformationPayrollAreaCode')
    this.payrollAreaCode = new String(payrollAreaCode);

    //get company name from local storage
    const companyName = localStorage.getItem('jobInformationCompanyName')
    if (companyName != null) {
      this.companyName = new String(companyName);
    }

    const joiningDate = localStorage.getItem('joiningDate');
    this.joiningDate = new Date(joiningDate);

    //get assigned payroll area's list
    this.getPayrollAreaInformation();
    this.getWagsInfo();
  }
    async getWagsInfo(){
    let promise = new Promise((resolve,reject)=>{
    this.JobInformationService.getMinimumDropdown().subscribe(res => {
      console.log('get minimum wages',res.data.results)
      this.minimumWagesData = res.data.results;
 //     this.zoneList = [];
      this.skillList = [];
      this.filteredSkillList = [];
 //     this.categoryList = [];
      this.workList = [];

      this.organizationDetailsModel.workList= new JobDetailsDTO('','','','','','')
      this.organizationDetailsModel.skillList= new JobDetailsDTO('','','','','','')

      for(let i=0;i<this.minimumWagesData.length;i++){
       
 
      
        if (this.minimumWagesData[i].category == 'Class Of Employement') {
          // this.workList.push(item.value);
          // this.filteredWorkList.push(item.value);
          this.filteredWorkList.push({jobMasterType:this.minimumWagesData[i].category,
            description:this.minimumWagesData[i].description,
            masterCode:this.minimumWagesData[i].value,
          jobMasterMappingId : this.minimumWagesData[i].minimumWagesDropDownId
           })
        } 

       else if (this.minimumWagesData[i].category == 'Skill') {
          // this.workList.push(item.value);
          // this.filteredWorkList.push(item.value);
          this.filteredSkillList.push({jobMasterType:this.minimumWagesData[i].category,
            description:this.minimumWagesData[i].description,
            masterCode:this.minimumWagesData[i].value,
          jobMasterMappingId : this.minimumWagesData[i].minimumWagesDropDownId
           })
          
        }   
        
        
    //     if (item.category == 'Zone') {
    //       this.zoneList.push(item.value);
    //     }
    //     if (item.category == 'Class Of Industry') {
    //       this.categoryList.push(item.value);

    //     }
    //     if (item.category == 'Skill') {
    //       this.skillList.push(item.value);
    //       this.filteredSkillList.push(item.value);
    //     }
        
    //   });
  
  
      }
    
        resolve('load completion')
      });
     
    });
  
    // this.BankInformationService.getStates().subscribe(res => {
    //   this.stateList = [];

    //   this.stateList = res.data.results;
    // })
    let response = await promise;
    this.getMinimumWagesForm(this.payrollAreaCode,'normal');
    }

  //get Minimum wages details service calling
  getMinimumWagesForm(payroll:any,copyFrom:any) {

    let payrollId:any;
if(copyFrom=='copyFrom'){
  payrollId=Number(this.payCode);
}else{
  payrollId=Number(this.payrollAreaId);
}
    this.JobInformationService.getOrganizationDetails(this.employeeMasterId, payrollId).subscribe(res => {

      const location=res.data.results[0];
   
      this.organizationDetailsModel.payrollAreaId=location.payrollAreaId;

       this.organizationDetailsModel.employeeMasterId=location.employeeMasterId;



        
        if(copyFrom=='copyFrom'){
          // Assign this payroll Area Id to current payrollArea Id 
          let c = this.payrollAreaList.find((b)=>b.payrollAreaId==this.payrollAreaId);
        this.organizationDetailsModel.payrollAreaId= c.payrollAreaId
 
        // below coding is for checking current data is present or not 
        // and updating the new data 
       if(location){ 
         
         if(location.skillList!=null && this.organizationDetailsModel.skillList.jobMasterMappingId!=''){
                 location.skillList=this.organizationDetailsModel.skillList  
         }else if(location.skillList!=null && this.organizationDetailsModel.skillList.jobMasterMappingId==''){
          location.skillList.fromDate = this.payrollAreaFromDate;
          location.skillList.toDate = this.payrollAreaToDate;
         }
         
         if(location.workList!=null && this.organizationDetailsModel.workList.jobMasterMappingId!=''){
        location.workList=this.organizationDetailsModel.workList  
         }else if(location.workList!=null && this.organizationDetailsModel.workList.jobMasterMappingId==''){
         location.workList.fromDate = this.payrollAreaFromDate;
         location.workList.toDate = this.payrollAreaToDate;
         }
         
        }
      }
      

         if (location) {
          if(location.skillList!=null){  
           // if(this.organizationDetailsModel.divisionList==null) 
           let skillId = this.filteredSkillList.find(x=>x.jobMasterMappingId==location.skillList.jobMasterMappingId);
           if(skillId!=null){
            this.organizationDetailsModel.skillList=location.skillList;
            this.organizationDetailsModel.skillList.fromDate= new Date(this.organizationDetailsModel.skillList.fromDate);
            this.organizationDetailsModel.skillList.toDate = new Date(this.organizationDetailsModel.skillList.toDate);
          }else {this.organizationDetailsModel.skillList=new JobDetailsDTO('','','','','','')
        }
          }
          if(location.workList!=null){  
            let workId = this.filteredWorkList.find(x=>x.jobMasterMappingId==location.skillList.jobMasterMappingId);
            if(workId!=null){
             this.organizationDetailsModel.workList=location.workList;
             this.organizationDetailsModel.workList.fromDate= new Date(this.organizationDetailsModel.workList.fromDate);
             this.organizationDetailsModel.workList.toDate = new Date(this.organizationDetailsModel.workList.toDate);
           }else{this.organizationDetailsModel.workList=new JobDetailsDTO('','','','','','')}

          }
        //skill
        if (this.organizationDetailsModel.skillList.masterCode != "" ) {
          const skillStartDate = this.minimumWagesForm.get('skillStartDateControl');
          skillStartDate.enable();
          const skillEndDate = this.minimumWagesForm.get('skillEndDateControl');
          skillEndDate.enable();

          this.validateSkillDates();
        }
        else {
          this.disableSkillDates();
        }

        

        //work Type
        if (this.organizationDetailsModel.workList.masterCode != "" ) {
          const workStartDate = this.minimumWagesForm.get('workStartDateControl');
          workStartDate.enable();
          const workEndDate = this.minimumWagesForm.get('workEndDateControl');
          workEndDate.enable();

          this.validateWorkDates();
        }
        else {
          this.disableWorkDates();
        }
      }
    }, (error: any) => {

      this.resetMinimumWagesForm();

    })
    // if (this.payrollAreaList.length == 1) {
    //   //this.payrollAreaCode = this.payrollAreaList[0];
    //   this.payrollAreaCode = this.payrollAreaList[0].payrollAreaCode;
    //   localStorage.setItem('jobInformationPayrollAreaCode', this.payrollAreaCode);
    // }
    // else {
    //   //get payroll area code from local storage
    //   const payrollAreaCode = localStorage.getItem('jobInformationPayrollAreaCode')
    //   this.payrollAreaCode = new String(payrollAreaCode);

    //   //get company from local storage
    //   const companyName = localStorage.getItem('jobInformationCompanyName')
    //   if (companyName != null) {
    //     this.companyName = new String(companyName);
    //   }
    // }
    this.minimumWagesForm.markAsUntouched();
  }

  minumumWagesDetailsSubmit(organizationDetailsModel) {

    organizationDetailsModel.employeeMasterId = this.employeeMasterId;
    if (this.payrollAreaList.length == 1) {
       organizationDetailsModel.payrollAreaId=this.payrollAreaList[0].payrollAreaId;
      this.payrollAreaCode = this.payrollAreaList[0].payrollAreaCode;
      localStorage.setItem('jobInformationPayrollAreaCode', this.payrollAreaCode);
    }
    else {

      //get payroll area code from local storage
      const payrollAreaCode = localStorage.getItem('jobInformationPayrollAreaCode')
      const payroll= this.filterPayrollArea(payrollAreaCode);
     organizationDetailsModel.payrollAreaId= localStorage.getItem('payrollAreaId');
      this.payrollAreaCode = new String(payrollAreaCode);

      //get company from local storage
      const companyName = localStorage.getItem('jobInformationCompanyName')
      if (companyName != null) {
        this.companyName = new String(companyName);
      }
    }

    if(this.organizationDetailsModel.skillList!=null){
      organizationDetailsModel.skillList.fromDate = this.datepipe.transform(organizationDetailsModel.skillList.fromDate, "dd-MMM-yyyy");
      organizationDetailsModel.skillList.toDate = this.datepipe.transform(organizationDetailsModel.skillList.toDate, "dd-MMM-yyyy");
      }


    if(this.organizationDetailsModel.workList!=null){
    organizationDetailsModel.workList.fromDate = this.datepipe.transform(organizationDetailsModel.workList.fromDate, "dd-MMM-yyyy");
    organizationDetailsModel.workList.toDate = this.datepipe.transform(organizationDetailsModel.workList.toDate, "dd-MMM-yyyy");
    }
    this.JobInformationService.postOrganizationDetails(organizationDetailsModel).subscribe(res => {

      this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
     // this.organizationDetailsModel = res.data.results[0];
   //   this.employeeMinimumWagesInfoId = this.minumumWagesDetailsModel.employeeMinimumWagesInfoId;
      this.EventEmitterService.getJobSummaryInitiate('minimumWages');

      //this.getMinimumWagesForm();
      //redirecting page to summary page
      this.router.navigate(['/employee-master/job-information/job-summary']);
    }, (error: any) => {
      this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
    })
    this.minimumWagesForm.markAsUntouched();
  }

  // validateStateDate() {

  //   if (this.minumumWagesDetailsModel.stateEndDate == '' || this.minumumWagesDetailsModel.stateEndDate == null) {
  //     this.minumumWagesDetailsModel.stateEndDate = '31-Dec-9999';
  //     const stateEndDate = this.minimumWagesForm.get('stateEndDateControl');
  //     stateEndDate.enable();
  //   }
  // }

  // validateZoneDate() {

  //   if (this.minumumWagesDetailsModel.zoneEndDate == '' || this.minumumWagesDetailsModel.zoneEndDate == null) {
  //     this.minumumWagesDetailsModel.zoneEndDate = '31-Dec-9999';
  //     const zoneEndDate = this.minimumWagesForm.get('zoneEndDateControl');
  //     zoneEndDate.enable();
  //   }

  // }

  validateSkillDate(event) {
    if(event){
    if (this.organizationDetailsModel.skillList.masterCode != '' || this.organizationDetailsModel.skillList.masterCode != null) {
      this.organizationDetailsModel.skillList.toDate = this.payrollAreaToDate;
      const skillToDate = this.minimumWagesForm.get('skillEndDateControl');
      skillToDate.enable();
    }
  }
  }
  // validateEstablishmentDate() {

  //   if (this.minumumWagesDetailsModel.establishmentEndDate == '' || this.minumumWagesDetailsModel.establishmentEndDate == null) {
  //     this.minumumWagesDetailsModel.establishmentEndDate = '31-Dec-9999';
  //     const establishmentEndDate = this.minimumWagesForm.get('establishmentEndDateControl');
  //     establishmentEndDate.enable();
  //   }

  // }

  validateWorkDate(event) {
    if(event){
    if (this.organizationDetailsModel.workList.masterCode != '' || this.organizationDetailsModel.workList.masterCode != null) {
      this.organizationDetailsModel.workList.toDate = this.payrollAreaToDate;
      const workToDate = this.minimumWagesForm.get('workEndDateControl');
      workToDate.enable();
    }
  }
  }
  // validateStateDates() {
  //   this.minimumWagesForm.controls['stateStartDateControl'].setValidators([Validators.required]);
  //   this.minimumWagesForm.controls.stateStartDateControl.updateValueAndValidity();
  //   this.minimumWagesForm.controls['stateEndDateControl'].setValidators([Validators.required]);
  //   this.minimumWagesForm.controls.stateEndDateControl.updateValueAndValidity();
  // }
  // enableStateDate() {

  //   const stateStartDate = this.minimumWagesForm.get('stateStartDateControl');
  //   stateStartDate.enable();
  //   const stateEndDate = this.minimumWagesForm.get('stateEndDateControl');
  //   stateEndDate.enable();
  //   if (this.minumumWagesDetailsModel.state == '' || this.minumumWagesDetailsModel.state == null) {
  //     this.minumumWagesDetailsModel.stateStartDate = null;
  //     this.minumumWagesDetailsModel.stateEndDate = null;
  //     this.disableStateDates();
  //   }
  // }

  // disableStateDates() {
  //   this.minimumWagesForm.get('stateStartDateControl').setValue(null);
  //   const stateStartDate = this.minimumWagesForm.get('stateStartDateControl');
  //   stateStartDate.disable();
  //   this.minimumWagesForm.get('stateEndDateControl').setValue(null);
  //   const stateEndDate = this.minimumWagesForm.get('stateEndDateControl');
  //   stateEndDate.disable();
  // }
  // validateZoneDates() {
  //   this.minimumWagesForm.controls['zoneStartDateControl'].setValidators([Validators.required]);
  //   this.minimumWagesForm.controls.zoneStartDateControl.updateValueAndValidity();
  //   this.minimumWagesForm.controls['zoneEndDateControl'].setValidators([Validators.required]);
  //   this.minimumWagesForm.controls.zoneEndDateControl.updateValueAndValidity();
  // }
  // enableZoneDate() {
  //   const zoneStartDate = this.minimumWagesForm.get('zoneStartDateControl');
  //   zoneStartDate.enable();
  //   const zoneEndDate = this.minimumWagesForm.get('zoneEndDateControl');
  //   zoneEndDate.enable();
  //   if (this.minumumWagesDetailsModel.zone == '' || this.minumumWagesDetailsModel.zone == null) {
  //     this.minumumWagesDetailsModel.zoneStartDate = null;
  //     this.minumumWagesDetailsModel.zoneEndDate = null;
  //     this.disableZoneDates();
  //   }
  // }

  // disableZoneDates() {
  //   this.minimumWagesForm.get('zoneStartDateControl').setValue(null);
  //   const zoneStartDate = this.minimumWagesForm.get('zoneStartDateControl');
  //   zoneStartDate.disable();
  //   this.minimumWagesForm.get('zoneEndDateControl').setValue(null);
  //   const zoneEndDate = this.minimumWagesForm.get('zoneEndDateControl');
  //   zoneEndDate.disable();
  // }

  validateSkillDates() {
    if(this.organizationDetailsModel.skillList.fromDate=='' || this.organizationDetailsModel.skillList.fromDate==null){
      this.organizationDetailsModel.skillList.fromDate = this.payrollAreaFromDate
      this.organizationDetailsModel.skillList.toDate = this.payrollAreaToDate
    }
    this.minimumWagesForm.controls['skillStartDateControl'].setValidators([Validators.required]);
    this.minimumWagesForm.controls.skillStartDateControl.updateValueAndValidity();
    this.minimumWagesForm.controls['skillEndDateControl'].setValidators([Validators.required]);
    this.minimumWagesForm.controls.skillEndDateControl.updateValueAndValidity();
  }
  enableSkillDate()  {
    
      const skillStartDate = this.minimumWagesForm.get('skillStartDateControl');
      skillStartDate.enable();
      const skillEndDate = this.minimumWagesForm.get('skillEndDateControl');
      skillEndDate.enable();
      
      if (this.organizationDetailsModel.skillList.masterCode == '' || this.organizationDetailsModel.skillList.masterCode == null) {
        this.organizationDetailsModel.skillList.fromDate = null;
        this.organizationDetailsModel.skillList.toDate = null;
        this.disableSkillDates(); 
     
      }else{
        this.validateSkillDates();
      }
  }




  disableSkillDates() {
   // this.minimumWagesForm.get('skillStartDateControl').setValue(null);
    const skillStartDate = this.minimumWagesForm.get('skillStartDateControl');
    skillStartDate.disable();
   // this.minimumWagesForm.get('skillEndDateControl').setValue(null);
    const skillEndDate = this.minimumWagesForm.get('skillEndDateControl');
    skillEndDate.disable();
  }

  // validateEstablishmentDates() {
  //   this.minimumWagesForm.controls['establishmentStartDateControl'].setValidators([Validators.required]);
  //   this.minimumWagesForm.controls.establishmentStartDateControl.updateValueAndValidity();
  //   this.minimumWagesForm.controls['establishmentEndDateControl'].setValidators([Validators.required]);
  //   this.minimumWagesForm.controls.establishmentEndDateControl.updateValueAndValidity();
  // }
  // enableEstablishmentDate() {
  //   const establishmentStartDate = this.minimumWagesForm.get('establishmentStartDateControl');
  //   establishmentStartDate.enable();
  //   const establishmentEndDate = this.minimumWagesForm.get('establishmentEndDateControl');
  //   establishmentEndDate.enable();
  //   if (this.minumumWagesDetailsModel.categoryOfEstablishment == '' || this.minumumWagesDetailsModel.categoryOfEstablishment == null) {
  //     this.minumumWagesDetailsModel.establishmentStartDate = null;
  //     this.minumumWagesDetailsModel.establishmentEndDate = null;
  //     this.disableEstablishmentDates();
  //   }
  // }

  // disableEstablishmentDates() {
  //   this.minimumWagesForm.get('establishmentStartDateControl').setValue(null);
  //   const establishmentStartDate = this.minimumWagesForm.get('establishmentStartDateControl');
  //   establishmentStartDate.disable();
  //   this.minimumWagesForm.get('establishmentEndDateControl').setValue(null);
  //   const establishmentEndDate = this.minimumWagesForm.get('establishmentEndDateControl');
  //   establishmentEndDate.disable();
  // }

  validateWorkDates() {
    if(this.organizationDetailsModel.workList.fromDate=='' || this.organizationDetailsModel.workList.fromDate==null){
      this.organizationDetailsModel.workList.fromDate = this.payrollAreaFromDate
      this.organizationDetailsModel.workList.toDate = this.payrollAreaToDate
    }
    this.minimumWagesForm.controls['workStartDateControl'].setValidators([Validators.required]);
    this.minimumWagesForm.controls.workStartDateControl.updateValueAndValidity();
    this.minimumWagesForm.controls['workEndDateControl'].setValidators([Validators.required]);
    this.minimumWagesForm.controls.workEndDateControl.updateValueAndValidity();
  }
  enableWorkDate() {
    
      const workStartDate = this.minimumWagesForm.get('workStartDateControl');
      workStartDate.enable();
      const workEndDate = this.minimumWagesForm.get('workEndDateControl');
      workEndDate.enable();
      if (this.organizationDetailsModel.workList.masterCode == '' || this.organizationDetailsModel.workList.masterCode == null) {
        this.organizationDetailsModel.workList.fromDate = null;
        this.organizationDetailsModel.workList.toDate = null;
        this.disableWorkDates();
      
    }else{
      this.validateWorkDates();
    }
  }

  disableWorkDates() {
    this.minimumWagesForm.get('workStartDateControl').setValue(null);
    const workStartDate = this.minimumWagesForm.get('workStartDateControl');
    workStartDate.disable();
    this.minimumWagesForm.get('workEndDateControl').setValue(null);
    const workEndDate = this.minimumWagesForm.get('workEndDateControl');
    workEndDate.disable();
  }

  workObject() {

    const toSelect = this.filteredWorkList.find(
      (c) => c.masterCode === this.minimumWagesForm.get('workTypeControl').value
    );
    this.organizationDetailsModel.workList.jobMasterMappingId = toSelect.jobMasterMappingId;
    this.minimumWagesForm.get('workTypeControl').setValue(toSelect.masterCode);
    this.enableWorkDate()
  }

  skillObject() {

    const toSelect = this.filteredSkillList.find(
      (c) => c.masterCode === this.minimumWagesForm.get('skillControl').value
    );
    this.organizationDetailsModel.skillList.jobMasterMappingId = toSelect.jobMasterMappingId;
    this.minimumWagesForm.get('skillControl').setValue(toSelect.masterCode);
    this.enableSkillDate()
  }
  //get payroll area assigned to that employee
  getPayrollAreaInformation(){
  
    this.PayrollAreaService.getPayrollData(this.employeeMasterId).subscribe(res => {
  
      res.data.results[0].forEach(item => {
        this.payrollAreaList.push(item);
        this.filteredPayrollAreaList.push(item);
      });
      if (this.payrollAreaList.length == 1) {
        //set default payroll area
        this.payrollAreaCode = this.payrollAreaList[0].payrollAreaCode;
        localStorage.setItem('jobInformationPayrollAreaCode', this.payrollAreaCode);
       this.payrollAreaFromDate=new Date(this.payrollAreaList[0].payrollAreaFromDate) > this.joiningDate ? new Date(this.payrollAreaList[0].payrollAreaFromDate):this.joiningDate;
       this.payrollAreaToDate= new Date(this.payrollAreaList[0].payrollAreaToDate);
        //set default company
        let result = res.data.results[0];
        this.companyName = result[0].companyname;
        this.payrollType=result[0].type;
        this.companyId=result[0].companyId;
        localStorage.setItem('jobInformationCompanyName', this.companyName);
      }
      else {
        //get payroll area code from local storage
        const payrollAreaCode = localStorage.getItem('jobInformationPayrollAreaCode')
        this.payrollAreaCode = new String(payrollAreaCode);
        const toSelect = this.filteredPayrollAreaList.find(
          (c) => c.payrollAreaCode == this.payrollAreaCode
        );
        this.payrollAreaId = toSelect.payrollAreaId;
        this.payrollAreaFromDate=new Date(toSelect.payrollAreaFromDate) > this.joiningDate ? new Date(toSelect.payrollAreaFromDate):this.joiningDate;new Date(toSelect.payrollAreaFromDate);
        this.payrollAreaToDate=new Date (toSelect.payrollAreaToDate)
        this.payrollType = toSelect.type
        //get company from local storage
        const companyName = localStorage.getItem('jobInformationCompanyName')
        if (companyName != null) {
          this.companyName = new String(companyName);
        }
      }

      this.JobInformationService.getAvailableJobMappingId(this.employeeMasterId).subscribe(res=>{
        this.availablePayrollIds=res.data.results[0];
        this.availablePayrollIds.filter((item)=>{
        const k =this.filteredPayrollAreaList.find((c)=>c.payrollAreaId===item)
        this.copyFromFilteredList.push(k);   }) 
        this.copyFromFilteredList = this.copyFromFilteredList.filter(x=>x.payrollAreaId!=this.payrollAreaId)
      })
  
    })
    
  }

  filterPayrollArea(event) {
    localStorage.setItem('jobInformationPayrollAreaCode', event);
   
    this.payrollAreaCode = event;

    const toSelect = this.filteredPayrollAreaList.find(
      (c) => c.payrollAreaId === Number(this.payrollAreaId)
    );
    // this.companyName = toSelect.payrollAreaId.companyId.companyName;
    this.companyName = toSelect.companyname;
    this.payrollType = toSelect.type;
    localStorage.setItem('payrollAreaId',toSelect.payrollAreaId);
  
  }

  //set PayrollArea
  selectPayrollArea(event) {

    localStorage.setItem('jobInformationPayrollAreaCode', event);
   this.payrollAreaCode = event;
   console.log('payrollAreaCode',event);
   const toSelect = this.filteredPayrollAreaList.find(
     (c) => c.payrollAreaId === Number(this.payrollAreaId)
   );
   this.companyName = toSelect.companyname;
   localStorage.setItem('payrollAreaId',toSelect.payrollAreaId);
   this.payrollAreaFromDate=new Date(toSelect.payrollAreaFromDate);
   this.payrollAreaToDate=new Date(toSelect.payrollAreaToDate)
   this.companyId= toSelect.companyId;
   this.payrollType = toSelect.type;
   localStorage.setItem('companyId', this.companyId);
   this.resetList();
   this.resetDTO();
   this.resetOrganizationForm();
   this.getWagsInfo();


  this.JobInformationService.getAvailableJobMappingId(this.employeeMasterId).subscribe(res=>{
       this.availablePayrollIds=res.data.results[0];
       this.availablePayrollIds.filter((item)=>{
       const k =this.filteredPayrollAreaList.find((c)=>c.payrollAreaId===item)
       this.copyFromFilteredList.push(k);   }) 
       this.copyFromFilteredList = this.copyFromFilteredList.filter(x=>x.payrollAreaId!=this.payrollAreaId)
     })
  // this.getJobDetails();
 }
 resetList(){
  
  this.filteredSkillList=[];
  this.filteredWorkList=[];
 }

 resetDTO(){
  this.organizationDetailsModel = new OrganizationDetailsModel('','',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null) ;
  this.organizationDetailsModel.workList=new JobDetailsDTO('','','','','','')
  this.organizationDetailsModel.skillList=new JobDetailsDTO('','','','','','')
  
}

  searchSkill(skill) {
    this.organizationDetailsModel.skillList.fromDate = null;
    this.organizationDetailsModel.skillList.toDate = null;
    this.organizationDetailsModel.skillList.description = null;
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

  searchWork(work) {
    this.organizationDetailsModel.workList.fromDate = null;
    this.organizationDetailsModel.workList.toDate = null;
    this.organizationDetailsModel.workList.description = null;
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

  resetOrganizationForm() {
  
    this.minimumWagesForm.markAsPristine()
  
        this.disableSkillDates();
        this.disableWorkDates();
  }

  selectCopyFrom(){
    this.payCode= this.minimumWagesForm.get('copyFromControl').value;
  this.getMinimumWagesForm(this.payCode,'copyFrom');
  }



  resetMinimumWagesForm() {
    this.minimumWagesForm.reset();
  //  this.employeeMinimumWagesInfoId = 0;

    //disable dates
  //  this.disableEstablishmentDates();
    this.disableSkillDates();
   // this.disableStateDates();
    this.disableWorkDates();
   // this.disableZoneDates();
  }

  ViewModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
        template,
        Object.assign({}, { class: 'gray modal-lg' }),
    );
  
  console.log(this.dataapi);
  var el = (document.getElementById('somerow')) as HTMLTableRowElement;
  var k=(document.getElementById('particulars1')) as HTMLTableRowElement;
  const table = document.querySelector('#somerow');
  const rows = table;
  console.log(k);
  // console.log(table)    
  }

  showHistory(data){

    const summaryType=1;
    const jobId=data.jobId;
    const jobDetail = data.jobDetail;
    this.JobInformationService.getSummaryDetails(this.payrollAreaId,this.employeeMasterId,summaryType,jobId,jobDetail).subscribe(res => {

      if (res.data.results[0]) { 
       this.historyData = res.data.results[0];
      }
    }, (error: any) => {     

    })
    // this.historyData[0] = this.summaryGridData.find(x=>x.value==data)
  }
 
}
