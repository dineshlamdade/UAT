import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { PositionDetailsDTO, PositionDetailsModel } from './../job-information-models/position-details.model';
import { EventEmitterService } from './../../../employee-master-services/event-emitter/event-emitter.service';
import { JobInformationService } from '../job-information.service';
import { SharedInformationService } from '../../../employee-master-services/shared-service/shared-information.service';
import { PayrollAreaInformationService } from './../../payroll-area-information/payroll-area-information.service';
import { Router } from '@angular/router';
import { JobDetailsDTO, OrganizationDetailsModel } from '../job-information-models/organization-details.model';
import { position } from 'html2canvas/dist/types/css/property-descriptors/position';
import { setTime } from 'ngx-bootstrap/chronos/utils/date-setters';
import { isThisSecond } from 'date-fns';


@Component({
  selector: 'app-position-detail',
  templateUrl: './position-detail.component.html',
  styleUrls: ['./position-detail.component.scss']
})


export class PositionDetailComponent implements OnInit {

  PositionForm: FormGroup;
  tomorrow = new Date();

  positionDetailsModel = new PositionDetailsModel(null, null, null, null, null,null);
  organizationDetailsModel = new OrganizationDetailsModel('','',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
  employeeMasterId: number;
  joiningDate: any;
  employeePositionDetailId: any;
  confirmMsg: any;
  employeeTypeValidate: Boolean;
  employeeStatusValidate: Boolean;
  employeeTaxCategoryValidate: Boolean;
  designation1Validate: Boolean;
  designation2Validate: Boolean;
  position1Validate: Boolean;
  position2Validate: Boolean;
  position3Validate: Boolean;
  position4Validate: Boolean;
  position5Validate: Boolean;


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
  position1List:Array<any>=[];
  position2List:Array<any>=[];
  position3List:Array<any>=[];
  position4List:Array<any>=[];
  position5List:Array<any>=[];
  establishmentList:Array<any>=[];
  filteredEmployeeTaxCategoryList: Array<any> = [];
  filteredGradeList: Array<any> = [];
  filteredDesignation1List: Array<any> = [];
  filteredDesignation2List: Array<any> = [];
  filteredPosition1List: Array<any> = [];
  filteredPosition2List: Array<any> = [];
  filteredPosition3List: Array<any> = [];
  filteredPosition4List: Array<any> = [];
  filteredPosition5List: Array<any> = [];
  filteredPayrollAreaList: Array<any> = [];
  reportingToList: Array<any> = [];
  availablePayrollIds : Array<any>=[];
  copyFromFilteredList : Array<any>=[];
  filteredReportingToList: Array<any> = [];
filteredEstablishmentList:Array<any>=[];
  selectAction: any;
  description: any;
  JobMasterList:Array<any>=[];
  establishmentCode:any;
  gradeCode: any;
  designation1Code: any;
  designation2Code: any;
  designation1Desc: any;
  designation2Desc: any;
  position1Code: any;
  position1Desc: any;
  position2Code: any;
  position2Desc: any;
  position3Code: any;
  position3Desc: any;
  position4Code: any;
  position4Desc: any;
  position5Code: any;
  position5Desc: any;

  reportingToCode: any;
  reportingToDesc: any;
  copyFromCode:any;
  payrollAreaCode: any;
  companyName: any;
  companyId:any;
  payrollAreaId:any;
  establishmentMasterId:any;
  constructor(public datepipe: DatePipe,
    private EventEmitterService: EventEmitterService, private JobInformationService: JobInformationService,
    private formBuilder: FormBuilder, private PayrollAreaService: PayrollAreaInformationService, private CommonDataService: SharedInformationService, private router: Router) {
    this.tomorrow.setDate(this.tomorrow.getDate());

  }
  ngOnInit():
    void {

    this.PositionForm = this.formBuilder.group({
      establishmentControl:[''],
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

      position1Control: [''],
      position1FromDateControl: [{ value: null, disabled: true }],
      position1ToDateControl: [{ value: null, disabled: true }],

      position2Control: [''],
      position2FromDateControl: [{ value: null, disabled: true }],
      position2ToDateControl: [{ value: null, disabled: true }],

      position3Control: [''],
      position3FromDateControl: [{ value: null, disabled: true }],
      position3ToDateControl: [{ value: null, disabled: true }],

      position4Control: [''],
      position4FromDateControl: [{ value: null, disabled: true }],
      position4ToDateControl: [{ value: null, disabled: true }],

      position5Control: [''],
      position5FromDateControl: [{ value: null, disabled: true }],
      position5ToDateControl: [{ value: null, disabled: true }],

      reportingToControl: [''],
      reportingToDescriptionControl: [''],
      reportingFromDateControl: [{ value: null, disabled: false }],
      reportingToDateControl: [{ value: null, disabled: false }],

      copyFromControl:['']
    });

   

    this.payrollAreaCode = '';
    this.companyName = '';
    this.copyFromCode='';
    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);

    //get payroll area code from local storage
    const payrollAreaCode = localStorage.getItem('jobInformationPayrollAreaCode')
    this.payrollAreaCode = new String(payrollAreaCode);

    //get company name from local storage
    const companyName = localStorage.getItem('jobInformationCompanyName')
    if (companyName != null) {
      this.companyName = new String(companyName);
    }
    this.companyId=localStorage.getItem('companyId')
    const joiningDate = localStorage.getItem('joiningDate');
    this.joiningDate = new Date(joiningDate);

   
    //get payroll area's
    this.getPayrollAreaInformation();

   this.getJobList();

   this.JobInformationService.getAvailablePositionMappingId(this.employeeMasterId).subscribe(res=>{
    this.availablePayrollIds=res.data.results[0];
    this.availablePayrollIds.filter((item)=>{
    const k =this.filteredPayrollAreaList.find((c)=>c.payrollAreaId===item)
    this.copyFromFilteredList.push(k);
      })

  })

   // setTimeout(()=>{ this.getPositionForm()},3000);

  }
  async getJobList(){
    let jobList = new Promise((resolve,reject)=>{
  
      this.JobInformationService.getJobMasterDetails().subscribe(res=>{
       this.JobMasterList =res.data.results;
       resolve('data recieved');
      })
    }) 
    let jobResponse = await jobList
    
  this.getJobDetails();
  }
  //get organization details service calling
  async getJobDetails(){

    let promise = new Promise((resolve,reject)=>{

      this.JobInformationService.getPositionDD().subscribe(res => {
        this.positionDetailsModel.typeList= new PositionDetailsDTO('','','','','','','');
        this.positionDetailsModel.statusList= new  PositionDetailsDTO('','','','','','','');
        this.positionDetailsModel.taxCategoryList= new  PositionDetailsDTO('','','','','','','');
       
        // this.employeeTypeList = [];
        // this.employeeStatusList = [];
        // this.employeeTaxCategoryList = [];
  
  
        const location = res.data.results.filter((item) => {
          if (item.category == 'Employee Type') {
           // this.employeeTypeList.push(item);
           this.positionDetailsModel.typeList.category=item.category;
            this.filteredEmployeeTypeList.push(item)
          }
          if (item.category == 'Employee Status') {
          //  this.employeeStatusList.push(item);
          this.positionDetailsModel.statusList.category=item.category;
            this.filteredEmployeeStatusList.push(item)
          }
          if (item.category == 'Employee Tax Category') {
           // this.employeeTaxCategoryList.push(item);
           this.positionDetailsModel.taxCategoryList.category=item.category;
            this.filteredEmployeeTaxCategoryList.push(item)
          }
         
        });
      })
      
      this.JobInformationService.getEstaDetails().subscribe(res => {
        this.establishmentCode='';
        this.establishmentList = [];
        this.establishmentList = res.data.results;
        this.filteredEstablishmentList = res.data.results;
      //  this.organizationDetailsModel.establishmentMasterId=this.establishmentList[0].establishmentMasterId;
      })


    //get Reporting to DD values(All active emp list)
    this.JobInformationService.getAllEmployees(this.companyId).subscribe(res => {
      this.positionDetailsModel.reportingToList= new  PositionDetailsDTO('','','','','','','');
     // this.reportingToList = [];
                const location=res.data.results;
               this.positionDetailsModel.reportingToList.value=''
              this.filteredReportingToList = [];   
              this.filteredReportingToList=location;
                console.log(this.filteredReportingToList)
    })


    this.JobInformationService.getOtherMasterDetails(this.companyId).subscribe(res => {
 
      this.organizationDetailsModel.designation1List=new JobDetailsDTO('','','','','','','')
      this.organizationDetailsModel.designation2List=new JobDetailsDTO('','','','','','','')
      this.organizationDetailsModel.gradeList= new JobDetailsDTO('','','','','','','')
      this.organizationDetailsModel.position1List= new JobDetailsDTO('','','','','','','')
      this.organizationDetailsModel.position2List= new JobDetailsDTO('','','','','','','')
      this.organizationDetailsModel.position3List= new JobDetailsDTO('','','','','','','')
      this.organizationDetailsModel.position4List= new JobDetailsDTO('','','','','','','')
      this.organizationDetailsModel.position5List= new JobDetailsDTO('','','','','','','')
     
      this.organizationDetailsModel.departmentList=new JobDetailsDTO('','','','','','','')
      this.organizationDetailsModel.subLocationList =new JobDetailsDTO('','','','','','','')
      this.organizationDetailsModel.workLocationList =new JobDetailsDTO('','','','','','','')
      this.organizationDetailsModel.businessAreaList =new JobDetailsDTO('','','','','','','')
      this.organizationDetailsModel.subAreaList =new JobDetailsDTO('','','','','','','')
      this.organizationDetailsModel.strategicBusinessAreaList =new JobDetailsDTO('','','','','','','')
      this.organizationDetailsModel.divisionList =new JobDetailsDTO('','','','','','','')
      this.organizationDetailsModel.departmentList =new JobDetailsDTO('','','','','','','')
      this.organizationDetailsModel.subDepartmentList=new JobDetailsDTO('','','','','','','')
      this.organizationDetailsModel.subAreaList =new JobDetailsDTO('','','','','','','')
      this.organizationDetailsModel.costCenterList=new JobDetailsDTO('','','','','','','')
      this.organizationDetailsModel.subCostCenterList =new JobDetailsDTO('','','','','','','')
      this.organizationDetailsModel.profitCenterList =new JobDetailsDTO('','','','','','','')
      this.organizationDetailsModel.job1List= new JobDetailsDTO('','','','','','','')
      this.organizationDetailsModel.job2List= new JobDetailsDTO('','','','','','','')
      this.organizationDetailsModel.job3List= new JobDetailsDTO('','','','','','','')
      this.organizationDetailsModel.job4List= new JobDetailsDTO('','','','','','','')
      this.organizationDetailsModel.job5List= new JobDetailsDTO('','','','','','','')
  

      const location = res.data.results.filter((item) => {


        if (item.jobMasterType == 'Grade') {
          this.organizationDetailsModel.gradeList.jobMasterType=item.jobMasterType;
          if(this.gradeCode==null){const b=this.JobMasterList.find((c)=>c.jobMasterType === item.jobMasterType)
            this.gradeCode=b.description;     
            }
         // this.gradeList.push(item);
          this.filteredGradeList.push(item);
        }
        if (item.jobMasterType == 'Designation1') {
          this.organizationDetailsModel.designation1List.jobMasterType=item.jobMasterType;
          if(this.designation1Code==null){const b=this.JobMasterList.find((c)=>c.jobMasterType === item.jobMasterType)
            this.designation1Code=b.description;     
            }
          this.filteredDesignation1List.push(item);
        }
        if (item.jobMasterType == 'Designation2') {
          this.organizationDetailsModel.designation2List.jobMasterType=item.jobMasterType;
          if(this.designation2Code==null){const b=this.JobMasterList.find((c)=>c.jobMasterType === item.jobMasterType)
            this.designation2Code=b.description;     
            }
         // this.designation2List.push(item);
          this.filteredDesignation2List.push(item);
        }
        if (item.jobMasterType == 'Position1') {
          this.organizationDetailsModel.position1List.jobMasterType=item.jobMasterType;
          if(this.position1Code==null){const b=this.JobMasterList.find((c)=>c.jobMasterType === item.jobMasterType)
            this.position1Code=b.description;     
            }
         // this.designation2List.push(item);
          this.filteredPosition1List.push(item);
        }
        if (item.jobMasterType == 'Position2') {
          this.organizationDetailsModel.position2List.jobMasterType=item.jobMasterType;
          if(this.position2Code==null){const b=this.JobMasterList.find((c)=>c.jobMasterType === item.jobMasterType)
            this.position2Code=b.description;     
            }
          this.filteredPosition2List.push(item);
        }
        if (item.jobMasterType == 'Position3') {
          this.organizationDetailsModel.position3List.jobMasterType=item.jobMasterType;
          if(this.position3Code==null){const b=this.JobMasterList.find((c)=>c.jobMasterType === item.jobMasterType)
            this.position3Code=b.description;     
            }
          this.filteredPosition3List.push(item);
        }
        if (item.jobMasterType == 'Position4') {
          this.organizationDetailsModel.position4List.jobMasterType=item.jobMasterType;
          if(this.position4Code==null){const b=this.JobMasterList.find((c)=>c.jobMasterType === item.jobMasterType)
            this.position4Code=b.description;     
            }
          this.filteredPosition4List.push(item);
        }
        if (item.jobMasterType == 'Position5') {
          this.organizationDetailsModel.position5List.jobMasterType=item.jobMasterType;
          if(this.position5Code==null){const b=this.JobMasterList.find((c)=>c.jobMasterType === item.jobMasterType)
            this.position5Code=b.description;     
            }
          this.filteredPosition5List.push(item);
        }

      });
      resolve('data loaded')
    })  
   
  })
  let response= await promise;
  this.getPositionForm(this.payrollAreaCode,'normal') 
  }

  getPositionForm(payroll:any,copyFrom:any) {

    this.JobInformationService.getPositionDetails(this.employeeMasterId,payroll).subscribe(res => {
     
      //this.employeePositionDetailId = res.data.results[0].employeePositionDetailId;
        this.positionDetailsModel.payrollAreaId=res.data.results[0].payrollAreaId;

      if (res.data.results[0]) {
     
        const posData=res.data.results[0];
      //  this.positionDetailsModel = res.data.results[0];
      if(copyFrom=='copyFrom'){
        //copy from functionality load daata with other payroll 
        const currentList = this.filteredPayrollAreaList.find((d)=>d.payrollAreaCode===this.payrollAreaCode);
      this.positionDetailsModel.payrollAreaId= currentList.payrollAreaId
      
     if(posData.typeList!=null)  posData.typeList.employeePositionMappingId='';
     if(posData.statusList!=null)  posData.statusList.employeePositionMappingId='';
     if(posData.taxCategoryList!=null)  posData.taxCategoryList.employeePositionMappingId='';
     if(posData.reportingToList!=null)  posData.reportingToList.employeePositionMappingId='';

      }
if(posData.typeList!=null){
  this.positionDetailsModel.typeList=posData.typeList;
  this.positionDetailsModel.typeList.fromDate = new Date(this.positionDetailsModel.typeList.fromDate)
  this.positionDetailsModel.typeList.toDate= new Date(this.positionDetailsModel.typeList.toDate)
}
if(posData.statusList!=null){
  this.positionDetailsModel.statusList=posData.statusList;
  this.positionDetailsModel.statusList.fromDate = new Date(this.positionDetailsModel.statusList.fromDate)
  this.positionDetailsModel.statusList.toDate= new Date(this.positionDetailsModel.statusList.toDate)
}
if(posData.taxCategoryList!=null){
  this.positionDetailsModel.taxCategoryList=posData.taxCategoryListList;
  this.positionDetailsModel.taxCategoryList.fromDate = new Date(this.positionDetailsModel.taxCategoryList.fromDate)
  this.positionDetailsModel.taxCategoryList.toDate= new Date(this.positionDetailsModel.taxCategoryList.toDate)
}
if(posData.reportingToList!=null){
  this.positionDetailsModel.reportingToList=posData.reportingTOList;
  this.positionDetailsModel.reportingToList.fromDate = new Date(this.positionDetailsModel.reportingToList.fromDate)
  this.positionDetailsModel.reportingToList.toDate= new Date(this.positionDetailsModel.reportingToList.toDate)
}
        

        //emmployee type
        if (this.positionDetailsModel.typeList.description != "") {
          const employeeTypeFromDate = this.PositionForm.get('employeeTypeFromDateControl');
          employeeTypeFromDate.enable();
          const employeeTypeToDate = this.PositionForm.get('employeeTypeToDateControl');
          employeeTypeToDate.enable();

          this.validatEmployeeTypeDate();
        }
        else {
          this.disableEmployeeTypeDates();
        }

        //employee status
        if (this.positionDetailsModel.statusList.description != "") {
          const employeeStatusFromDate = this.PositionForm.get('employeeStatusFromDateControl');
          employeeStatusFromDate.enable();
          const employeeStatusToDate = this.PositionForm.get('employeeStatusToDateControl');
          employeeStatusToDate.enable();

          this.validatEmployeeStatusDate();
        }
        else {
          this.disableEmployeeStatusDates();
        }

        //employee tax category
        if (this.positionDetailsModel.taxCategoryList.description != "") {
          const employeeTaxCategoryFromDate = this.PositionForm.get('employeeTaxCategoryFromDateControl');
          employeeTaxCategoryFromDate.enable();
          const employeeTaxCategoryToDate = this.PositionForm.get('employeeTaxCategoryToDateControl');
          employeeTaxCategoryToDate.enable();

          this.validatEmployeeTaxCategoryDate();
        }
        else {
          this.disableEmployeeTaxDates();
        }
            }     
          
       
      },
      (error: any) => {

      this.resetPositionForm();
    })

    this.JobInformationService.getOrganizationDetails(this.employeeMasterId,payroll).subscribe(res=>{
    //   if(res.data.results[0].establishmentMasterId!=''){
    //     this.organizationDetailsModel.establishmentMasterId=res.data.results[0].establishmentMasterId;
    //     this.filterEstablishmentAreaArea(this.organizationDetailsModel.establishmentMasterId);
    //  }
     
      const orgData= res.data.results[0];
      if(copyFrom=='copyFrom'){
        //copy from functionality load daata with other payroll 
        const c = this.payrollAreaList.find((b)=>b.payrollAreaCode===this.payrollAreaCode);
      this.organizationDetailsModel.payrollAreaId= c.payrollAreaId
 
     if(orgData.gradeList!=null)         orgData.gradeList.employeeJobMappingId='';
     if(orgData.designation1List!=null)  orgData.designation1List.employeeJobMappingId='';
     if(orgData.designation2List!=null)  orgData.designation2List.employeeJobMappingId='';
     if(orgData.position1List!=null)     orgData.position1List.employeeJobMappingId='';
     if(orgData.position2List!=null)     orgData.position2List.employeeJobMappingId='';
     if(orgData.position3List!=null)     orgData.position3List.employeeJobMappingId='';
     if(orgData.position4List!=null)     orgData.position4List.employeeJobMappingId='';
     if(orgData.position5List!=null)     orgData.position5List.employeeJobMappingId='';
     
     //do not post data with orgnization form 

     orgData.departmentList=null;
     orgData.suborgDataList=null;
     orgData.workorgDataList=null;
     orgData.businessAreaList=null;
     orgData.subAreaList=null;
     orgData.strategicBusinessAreaList=null;
     orgData.divisionList=null;
     orgData.departmentList=null;
     orgData.subDepartmentList=null;
     orgData.subAreaList=null;
     orgData.costCenterList=null;
     orgData.subCostCenterList=null;
     orgData.profitCenterList=null;
     orgData.job1List=null;
     orgData.job2List=null;
     orgData.job3List=null;
     orgData.job4List=null;
     orgData.job5List=null;


      }
      if(orgData.gradeList!=null){
        this.organizationDetailsModel.gradeList=orgData.gradeList;
        this.organizationDetailsModel.gradeList.fromDate=new Date(this.organizationDetailsModel.gradeList.fromDate)
        this.organizationDetailsModel.gradeList.toDate= new Date(this.organizationDetailsModel.gradeList.toDate)
      }
      if(orgData.designation1List!=null){
        this.organizationDetailsModel.designation1List=orgData.designation1List;
        this.organizationDetailsModel.designation1List.fromDate= new Date(this.organizationDetailsModel.designation1List.fromDate)
        this.organizationDetailsModel.designation1List.toDate= new Date(this.organizationDetailsModel.designation1List.toDate)
      }
      if(orgData.designation2List!=null){
        this.organizationDetailsModel.designation2List=orgData.designation2List;
        this.organizationDetailsModel.designation2List.fromDate= new Date(this.organizationDetailsModel.designation2List.fromDate)
        this.organizationDetailsModel.designation2List.toDate= new Date(this.organizationDetailsModel.designation2List.toDate)
      }
      if(orgData.position1List!=null){
        this.organizationDetailsModel.position1List=orgData.position1List;
        this.organizationDetailsModel.position1List.fromDate= new Date(this.organizationDetailsModel.position1List.fromDate)
        this.organizationDetailsModel.position1List.toDate= new Date(this.organizationDetailsModel.position1List.toDate)
      }
      if(orgData.position2List!=null){
        this.organizationDetailsModel.position2List=orgData.position2List;
        this.organizationDetailsModel.position2List.fromDate= new Date(this.organizationDetailsModel.position2List.fromDate)
        this.organizationDetailsModel.position2List.toDate= new Date(this.organizationDetailsModel.position2List.toDate)
      }
      if(orgData.position3List!=null){
        this.organizationDetailsModel.position3List=orgData.position3List;
        this.organizationDetailsModel.position3List.fromDate= new Date(this.organizationDetailsModel.position3List.fromDate)
        this.organizationDetailsModel.position3List.toDate= new Date(this.organizationDetailsModel.position3List.toDate)
      }
      if(orgData.position4List!=null){
        this.organizationDetailsModel.position4List=orgData.position4List;
        this.organizationDetailsModel.position4List.fromDate= new Date(this.organizationDetailsModel.position4List.fromDate)
        this.organizationDetailsModel.position4List.toDate= new Date(this.organizationDetailsModel.position4List.toDate)
      }
      if(orgData.position5List!=null){
        this.organizationDetailsModel.position5List=orgData.position5List;
        this.organizationDetailsModel.position5List.fromDate= new Date(this.organizationDetailsModel.position5List.fromDate)
        this.organizationDetailsModel.position5List.toDate= new Date(this.organizationDetailsModel.position5List.toDate)
      }

        //grade
        if (this.organizationDetailsModel.gradeList.description != "") {
          const gradeFromDate = this.PositionForm.get('gradeFromDateControl');
          gradeFromDate.enable();
          const gradeToDate = this.PositionForm.get('gradeToDateControl');
          gradeToDate.enable();

          this.validatGradeDate();
        }
        else {
          this.disableGradeDates();
        }

        //designation 1
        if (this.organizationDetailsModel.designation1List.description != "") {
          const designation1FromDate = this.PositionForm.get('designation1FromDateControl');
          designation1FromDate.enable();
          const designation1ToDate = this.PositionForm.get('designation1ToDateControl');
          designation1ToDate.enable();

          this.validatDesignation1Date();
        }
        else {
          this.disableDesignation1Dates();
        }

        //designation 2
        if (this.organizationDetailsModel.designation2List.description != "") {
          const designation2FromDate = this.PositionForm.get('designation2FromDateControl');
          designation2FromDate.enable();
          const designation2ToDate = this.PositionForm.get('designation2ToDateControl');
          designation2ToDate.enable();

          this.validatDesignation2Date();
        }
        else {
          this.disableDesignation2Dates();
        }

        //reporting to
        if (this.positionDetailsModel.reportingToList.description != "") {
          const reportingFromDate = this.PositionForm.get('reportingFromDateControl');
          reportingFromDate.enable();
          const reportingToDate = this.PositionForm.get('reportingToDateControl');
          reportingToDate.enable();

          this.validatReportingDate();
        }
        else {
          this.disableReportingDates();
        }

 //position 1
 if (this.organizationDetailsModel.position1List.description != "") {
  const position1FromDate = this.PositionForm.get('position1FromDateControl');
  position1FromDate.enable();
  const position1ToDate = this.PositionForm.get('position1ToDateControl');
  position1ToDate.enable();

  this.validatPosition1Date();
}
else {
  this.disablePosition1Dates();
}
//position 2
if (this.organizationDetailsModel.position2List.description != "") {
  const position2FromDate = this.PositionForm.get('position2FromDateControl');
  position2FromDate.enable();
  const position2ToDate = this.PositionForm.get('position2ToDateControl');
  position2ToDate.enable();

  this.validatPosition2Date();
}
else {
  this.disablePosition2Dates();
}

//position 3
if (this.organizationDetailsModel.position3List.description != "") {
  const position3FromDate = this.PositionForm.get('position3FromDateControl');
  position3FromDate.enable();
  const position3ToDate = this.PositionForm.get('position3ToDateControl');
  position3ToDate.enable();

  this.validatPosition3Date();
}
else {
  this.disablePosition3Dates();
}
//position 4
if (this.organizationDetailsModel.position4List.description != "") {
  const position4FromDate = this.PositionForm.get('position4FromDateControl');
  position4FromDate.enable();
  const position4ToDate = this.PositionForm.get('position4ToDateControl');
  position4ToDate.enable();

  this.validatPosition4Date();
}
else {
  this.disablePosition4Dates();
}

//position 5
if (this.organizationDetailsModel.position5List.description != "") {
  const position5FromDate = this.PositionForm.get('position5FromDateControl');
  position5FromDate.enable();
  const position5ToDate = this.PositionForm.get('position5ToDateControl');
  position5ToDate.enable();

  this.validatPosition5Date();
}
else {
  this.disablePosition5Dates();
 }
 

},
 (error: any) => {})
 


   
    if (this.payrollAreaList.length == 1) {
      //this.payrollAreaCode = this.payrollAreaList[0];

      this.payrollAreaCode = this.payrollAreaList[0].payrollAreaCode;
      localStorage.setItem('jobInformationPayrollAreaCode', this.payrollAreaCode);
    }
    else {
      //get payroll area code from local storage
      const payrollAreaCode = localStorage.getItem('jobInformationPayrollAreaCode')
      this.payrollAreaCode = new String(payrollAreaCode);

      //get company from local storage
      const companyName = localStorage.getItem('jobInformationCompanyName')
      if (companyName != null) {
        this.companyName = new String(companyName);
      }
    }
    this.PositionForm.markAsUntouched();
  }

  positionFormSubmit(positionDetailsModel,organizationDetailsModel) {

    if (this.designation1Desc == null) {
      positionDetailsModel.designation1MasterId = null;
    }
    if (this.designation2Desc == null) {
      positionDetailsModel.designation2MasterId = null;
    }
    if (this.description == null) {
      positionDetailsModel.gradeMasterId = null;
    }
    if (this.reportingToDesc == null) {
      positionDetailsModel.reportingTo = null;
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
    // if (positionDetailsModel.reportingTo == '') {
    //   positionDetailsModel.reportingTo = null;
    // }
    organizationDetailsModel.employeeMasterId=this.employeeMasterId;
  
    positionDetailsModel.employeeMasterId = this.employeeMasterId;
   // positionDetailsModel.employeePositionDetailId = this.employeePositionDetailId;
    if (this.payrollAreaList.length == 1) {
      // positionDetailsModel.payrollAreaCode = this.payrollAreaList[0];
      this.payrollAreaCode = this.payrollAreaList[0].payrollAreaCode;
      organizationDetailsModel.payrollAreaId=this.payrollAreaList[0].payrollAreaId;
      positionDetailsModel.payrollAreaId=this.payrollAreaList[0].payrollAreaId;
      localStorage.setItem('jobInformationPayrollAreaCode', this.payrollAreaCode);
    }
    else {
      //get payroll area code from local storage
      const payrollAreaCode = localStorage.getItem('jobInformationPayrollAreaCode')
      this.payrollAreaCode = new String(payrollAreaCode);
      const payroll= this.filterPayrollArea(payrollAreaCode);
      organizationDetailsModel.payrollAreaId= localStorage.getItem('payrollAreaId');
      positionDetailsModel.payrollAreaId= localStorage.getItem('payrollAreaId');
      positionDetailsModel.payrollAreaCode = new String(payrollAreaCode);
    }

    positionDetailsModel.payrollAreaCode = new String(this.payrollAreaCode);

    if(organizationDetailsModel.gradeList!=null){
      organizationDetailsModel.gradeList.fromDate = this.datepipe.transform(organizationDetailsModel.gradeList.fromDate, "dd-MMM-yyyy");
      organizationDetailsModel.gradeList.toDate = this.datepipe.transform(organizationDetailsModel.gradeList.toDate, "dd-MMM-yyyy");
      }
      if(organizationDetailsModel.designation1List!=null){
        organizationDetailsModel.designation1List.fromDate = this.datepipe.transform(organizationDetailsModel.designation1List.fromDate, "dd-MMM-yyyy");
        organizationDetailsModel.designation1List.toDate = this.datepipe.transform(organizationDetailsModel.designation1List.toDate, "dd-MMM-yyyy");
        }
        if(organizationDetailsModel.designation2List!=null){
          organizationDetailsModel.designation2List.fromDate = this.datepipe.transform(organizationDetailsModel.designation2List.fromDate, "dd-MMM-yyyy");
          organizationDetailsModel.designation2List.toDate = this.datepipe.transform(organizationDetailsModel.designation2List.toDate, "dd-MMM-yyyy");
          }
          if(organizationDetailsModel.position1List!=null){
            organizationDetailsModel.position1List.fromDate = this.datepipe.transform(organizationDetailsModel.position1List.fromDate, "dd-MMM-yyyy");
            organizationDetailsModel.position1List.toDate = this.datepipe.transform(organizationDetailsModel.position1List.toDate, "dd-MMM-yyyy");
            }
            if(organizationDetailsModel.position2List!=null){
              organizationDetailsModel.position2List.fromDate = this.datepipe.transform(organizationDetailsModel.position2List.fromDate, "dd-MMM-yyyy");
              organizationDetailsModel.position2List.toDate = this.datepipe.transform(organizationDetailsModel.position2List.toDate, "dd-MMM-yyyy");
              }
              if(organizationDetailsModel.position3List!=null){
                organizationDetailsModel.position3List.fromDate = this.datepipe.transform(organizationDetailsModel.position3List.fromDate, "dd-MMM-yyyy");
                organizationDetailsModel.position3List.toDate = this.datepipe.transform(organizationDetailsModel.position3List.toDate, "dd-MMM-yyyy");
                }
                if(organizationDetailsModel.position4List!=null){
                  organizationDetailsModel.position4List.fromDate = this.datepipe.transform(organizationDetailsModel.position4List.fromDate, "dd-MMM-yyyy");
                  organizationDetailsModel.position4List.toDate = this.datepipe.transform(organizationDetailsModel.position4List.toDate, "dd-MMM-yyyy");
                  }
                  if(organizationDetailsModel.position5List!=null){
                    organizationDetailsModel.position5List.fromDate = this.datepipe.transform(organizationDetailsModel.position5List.fromDate, "dd-MMM-yyyy");
                    organizationDetailsModel.position5List.toDate = this.datepipe.transform(organizationDetailsModel.position5List.toDate, "dd-MMM-yyyy");
                    }if(organizationDetailsModel.job1List!=null){
                      organizationDetailsModel.job1List.fromDate = this.datepipe.transform(organizationDetailsModel.job1List.fromDate, "dd-MMM-yyyy");
                      organizationDetailsModel.job1List.toDate = this.datepipe.transform(organizationDetailsModel.job1List.toDate, "dd-MMM-yyyy");
                      }if(organizationDetailsModel.job2List!=null){
                        organizationDetailsModel.job2List.fromDate = this.datepipe.transform(organizationDetailsModel.job2List.fromDate, "dd-MMM-yyyy");
                        organizationDetailsModel.job2List.toDate = this.datepipe.transform(organizationDetailsModel.job2List.toDate, "dd-MMM-yyyy");
                        }
                        if(organizationDetailsModel.job3List!=null){
                          organizationDetailsModel.job3List.fromDate = this.datepipe.transform(organizationDetailsModel.job3List.fromDate, "dd-MMM-yyyy");
                          organizationDetailsModel.job3List.toDate = this.datepipe.transform(organizationDetailsModel.job3List.toDate, "dd-MMM-yyyy");
                          }
                          if(organizationDetailsModel.job4List!=null){
                            organizationDetailsModel.job4List.fromDate = this.datepipe.transform(organizationDetailsModel.job4List.fromDate, "dd-MMM-yyyy");
                            organizationDetailsModel.job4List.toDate = this.datepipe.transform(organizationDetailsModel.job4List.toDate, "dd-MMM-yyyy");
                            }
                            if(organizationDetailsModel.job5List!=null){
                              organizationDetailsModel.job5List.fromDate = this.datepipe.transform(organizationDetailsModel.job5List.fromDate, "dd-MMM-yyyy");
                              organizationDetailsModel.job5List.toDate = this.datepipe.transform(organizationDetailsModel.job5List.toDate, "dd-MMM-yyyy");
                              }

if(positionDetailsModel.typeList!=null){
  positionDetailsModel.typeList.fromDate= this.datepipe.transform(positionDetailsModel.typeList.fromDate, "dd-MMM-yyyy")
  positionDetailsModel.typeList.toDate=this.datepipe.transform(this.positionDetailsModel.typeList.toDate, "dd-MMM-yyyy");
}
if(positionDetailsModel.statusList!=null){
  positionDetailsModel.statusList.fromDate= this.datepipe.transform(positionDetailsModel.statusList.fromDate, "dd-MMM-yyyy")
  positionDetailsModel.statusList.toDate=this.datepipe.transform(positionDetailsModel.statusList.toDate, "dd-MMM-yyyy")
}
if(positionDetailsModel.taxCategoryList!=null){
  positionDetailsModel.taxCategoryList.fromDate= this.datepipe.transform(positionDetailsModel.taxCategoryList.fromDate, "dd-MMM-yyyy")
 positionDetailsModel.taxCategoryList.fromDate= this.datepipe.transform(positionDetailsModel.taxCategoryList.toDate, "dd-MMM-yyyy")
}
if(positionDetailsModel.reportingToList!=null){
  positionDetailsModel.reportingToList.fromDate= this.datepipe.transform(positionDetailsModel.reportingToList.fromDate, "dd-MMM-yyyy")
  positionDetailsModel.reportingToList.toDate=this.datepipe.transform(positionDetailsModel.reportingToList.toDate, "dd-MMM-yyyy")
}

if(organizationDetailsModel.subLocationList!=null){
  organizationDetailsModel.subLocationList.fromDate = this.datepipe.transform(organizationDetailsModel.subLocationList.fromDate, "dd-MMM-yyyy");
  organizationDetailsModel.subLocationList.toDate = this.datepipe.transform(organizationDetailsModel.subLocationList.toDate, "dd-MMM-yyyy");
  }
  if(organizationDetailsModel.workLocationList!=null){
  organizationDetailsModel.workLocationList.fromDate = this.datepipe.transform(organizationDetailsModel.workLocationList.fromDate, "dd-MMM-yyyy");
  organizationDetailsModel.workLocationList.toDate = this.datepipe.transform(organizationDetailsModel.workLocationList.toDate, "dd-MMM-yyyy");
  }
  if(organizationDetailsModel.businessAreaList!=null){
  organizationDetailsModel.businessAreaList.fromDate = this.datepipe.transform(organizationDetailsModel.businessAreaList.fromDate, "dd-MMM-yyyy");
  organizationDetailsModel.businessAreaList.toDate = this.datepipe.transform(organizationDetailsModel.businessAreaList.toDate, "dd-MMM-yyyy");
  }
  if(organizationDetailsModel.subAreaList!=null){
  organizationDetailsModel.subAreaList.fromDate = this.datepipe.transform(organizationDetailsModel.subAreaFromDate, "dd-MMM-yyyy");
  organizationDetailsModel.subAreaList.toDate = this.datepipe.transform(organizationDetailsModel.subAreaList.toDate, "dd-MMM-yyyy");
  }
  if(organizationDetailsModel.strategicBusinessAreaList!=null){
  organizationDetailsModel.strategicBusinessAreaList.fromDate = this.datepipe.transform(organizationDetailsModel.strategicBusinessAreaList.fromDate, "dd-MMM-yyyy");
    organizationDetailsModel.strategicBusinessAreaList.toDate = this.datepipe.transform(organizationDetailsModel.strategicBusinessAreaList.toDate, "dd-MMM-yyyy");
  }
  if(organizationDetailsModel.divisionList!=null){
  organizationDetailsModel.divisionList.fromDate = this.datepipe.transform(organizationDetailsModel.divisionList.fromDate, "dd-MMM-yyyy");
  organizationDetailsModel.divisionList.toDate = this.datepipe.transform(organizationDetailsModel.divisionList.toDate, "dd-MMM-yyyy");
  }
  if(organizationDetailsModel.departmentList!=null){
  organizationDetailsModel.departmentList.fromDate = this.datepipe.transform(organizationDetailsModel.departmentList.fromDate, "dd-MMM-yyyy");
  organizationDetailsModel.departmentList.toDate = this.datepipe.transform(organizationDetailsModel.departmentList.toDate, "dd-MMM-yyyy");
  }if(organizationDetailsModel.subDepartmentList!=null){
  organizationDetailsModel.subDepartmentList.fromDate = this.datepipe.transform(organizationDetailsModel.subDepartmentList.fromDate, "dd-MMM-yyyy");
  organizationDetailsModel.subDepartmentList.toDate = this.datepipe.transform(organizationDetailsModel.subDepartmentToDate, "dd-MMM-yyyy");
  }if(organizationDetailsModel.costCenterList!=null){
  organizationDetailsModel.costCenterList.fromDate = this.datepipe.transform(organizationDetailsModel.costCenterList.fromDate, "dd-MMM-yyyy");
  organizationDetailsModel.costCenterList.toDate = this.datepipe.transform(organizationDetailsModel.costCenterList.toDate, "dd-MMM-yyyy");
  }if(organizationDetailsModel.subCostCenterList!=null){
  organizationDetailsModel.subCostCenterList.fromDate = this.datepipe.transform(organizationDetailsModel.subCostCenterList.fromDate, "dd-MMM-yyyy");
  organizationDetailsModel.subCostCenterList.toDate = this.datepipe.transform(organizationDetailsModel.subCostCenterList.toDate, "dd-MMM-yyyy");
  }if(organizationDetailsModel.profitCenterList!=null){
  organizationDetailsModel.profitCenterList.fromDate = this.datepipe.transform(organizationDetailsModel.profitCenterList.fromDate, "dd-MMM-yyyy");
  organizationDetailsModel.profitCenterList.toDate = this.datepipe.transform(organizationDetailsModel.profitCenterList.toDate, "dd-MMM-yyyy");
  }
   

    //gradeCode
    delete positionDetailsModel.gradeMasterId;
    delete positionDetailsModel.gradeCode;
    delete positionDetailsModel.gradeFromDate;
    delete positionDetailsModel.gradeDescription;

    //designation1Description
    delete positionDetailsModel.designation1Code;
    delete positionDetailsModel.designation1MasterId;
    delete positionDetailsModel.designation1Description;

    //designation2Description
    delete positionDetailsModel.designation2Code;
    delete positionDetailsModel.designation2MasterId;
    delete positionDetailsModel.designation2Description;

    //reporting to
    delete positionDetailsModel.reportingTo;
    delete positionDetailsModel.reportingValue;
    delete positionDetailsModel.payrollAreaCode;


    this.JobInformationService.postOrganizationDetails(organizationDetailsModel).subscribe(res=>{
       this.organizationDetailsModel=res.data.results[0];

    })
    this.JobInformationService.postPositionDetails(positionDetailsModel).subscribe(res => {

      this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
      this.positionDetailsModel = res.data.results[0];
   //   this.employeePositionDetailId = this.positionDetailsModel.employeePositionDetailId;
      this.EventEmitterService.getJobSummaryInitiate('position');

      // this.getPositionForm()
      //redirecting page to summary page
      this.router.navigate(['/employee-master/job-information/job-summary']);
    }, (error: any) => {
      this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
    })
    this.PositionForm.markAsUntouched();
  }
 

  validateEmployeeTypeToDate(event) {
    if(event){
    if (this.positionDetailsModel.typeList.description != '' || this.positionDetailsModel.typeList.description != null) {
      this.positionDetailsModel.typeList.toDate = '31-Dec-9999';
      const employeeTypeToDate = this.PositionForm.get('employeeTypeToDateControl');
      employeeTypeToDate.enable();
    }
    }
  }
  validatEmployeeTypeDate() {

    this.PositionForm.controls['employeeTypeFromDateControl'].setValidators([Validators.required]);
    this.PositionForm.controls.employeeTypeFromDateControl.updateValueAndValidity();
    this.PositionForm.controls['employeeTypeToDateControl'].setValidators([Validators.required]);
    this.PositionForm.controls.employeeTypeToDateControl.updateValueAndValidity();
  }
  enableEmployeeTypeDate() {
    const employeeTypeFromDate = this.PositionForm.get('employeeTypeFromDateControl');
    employeeTypeFromDate.enable();
    const employeeTypeToDate = this.PositionForm.get('employeeTypeToDateControl');
    employeeTypeToDate.enable();
    if (this.positionDetailsModel.typeList.description == '' || this.positionDetailsModel.typeList.description == null) {
      this.positionDetailsModel.typeList.fromDate = null;
    this.positionDetailsModel.typeList.toDate = null;
      this.disableEmployeeTypeDates();
    }
  }

  disableEmployeeTypeDates() {
    const employeeTypeToDate = this.PositionForm.get('employeeTypeToDateControl');
    employeeTypeToDate.disable();
    const employeeTypeFromDate = this.PositionForm.get('employeeTypeFromDateControl');
    employeeTypeFromDate.disable();
  }

  validateEmployeeStatusToDate(event) {
    if(event){
    if (this.positionDetailsModel.statusList.description != '' || this.positionDetailsModel.statusList.description != null) {
      this.positionDetailsModel.statusList.toDate = '31-Dec-9999';
      const employeeStatusToDate = this.PositionForm.get('employeeStatusToDateControl');
      employeeStatusToDate.enable();
    }
  }
  }
  validatEmployeeStatusDate() {
    this.PositionForm.controls['employeeStatusFromDateControl'].setValidators([Validators.required]);
    this.PositionForm.controls.employeeStatusFromDateControl.updateValueAndValidity();
    this.PositionForm.controls['employeeStatusToDateControl'].setValidators([Validators.required]);
    this.PositionForm.controls.employeeStatusToDateControl.updateValueAndValidity();
  }
  enableEmployeeStatusDate() {
    const employeeStatusFromDate = this.PositionForm.get('employeeStatusFromDateControl');
    employeeStatusFromDate.enable();
    const employeeStatusToDate = this.PositionForm.get('employeeStatusToDateControl');
    employeeStatusToDate.enable();
    if (this.positionDetailsModel.statusList.description == '' || this.positionDetailsModel.statusList.description == null) {
      this.positionDetailsModel.statusList.fromDate = null;
      this.positionDetailsModel.statusList.toDate = null;
      this.disableEmployeeStatusDates();
    }
  }

  disableEmployeeStatusDates() {
    const employeeStatusToDate = this.PositionForm.get('employeeStatusToDateControl');
    employeeStatusToDate.disable();
    const employeeStatusFromDate = this.PositionForm.get('employeeStatusFromDateControl');
    employeeStatusFromDate.disable();
  }
  validateEmployeeTaxCategoryToDate(event) {
    if(event){
    if (this.positionDetailsModel.taxCategoryList.description != '' || this.positionDetailsModel.taxCategoryList.description != null) {
      this.positionDetailsModel.taxCategoryList.toDate = '31-Dec-9999';
      const employeeTaxCategoryToDate = this.PositionForm.get('employeeTaxCategoryToDateControl');
      employeeTaxCategoryToDate.enable();
    }
  }
  }
  validatEmployeeTaxCategoryDate() {
    this.PositionForm.controls['employeeTaxCategoryFromDateControl'].setValidators([Validators.required]);
    this.PositionForm.controls.employeeTaxCategoryFromDateControl.updateValueAndValidity();
    this.PositionForm.controls['employeeTaxCategoryToDateControl'].setValidators([Validators.required]);
    this.PositionForm.controls.employeeTaxCategoryToDateControl.updateValueAndValidity();
  }
  enableEmployeeTaxCategoryDate() {
    const employeeTaxCategoryFromDate = this.PositionForm.get('employeeTaxCategoryFromDateControl');
    employeeTaxCategoryFromDate.enable();
    const employeeTaxCategoryToDate = this.PositionForm.get('employeeTaxCategoryToDateControl');
    employeeTaxCategoryToDate.enable();
    if (this.positionDetailsModel.taxCategoryList.description == '' || this.positionDetailsModel.taxCategoryList.description == null) {
      this.positionDetailsModel.taxCategoryList.fromDate = null;
      this.positionDetailsModel.taxCategoryList.toDate = null;
      this.disableEmployeeTaxDates();
    }
  }

  disableEmployeeTaxDates() {
    const employeeTaxCategoryToDate = this.PositionForm.get('employeeTaxCategoryToDateControl');
    employeeTaxCategoryToDate.disable();
    const employeeTaxCategoryFromDate = this.PositionForm.get('employeeTaxCategoryFromDateControl');
    employeeTaxCategoryFromDate.disable();
  }

  validateGradeToDate(event) {
    if(event){
    if (this.organizationDetailsModel.gradeList.description != '' || this.organizationDetailsModel.gradeList.description != null) {
      this.organizationDetailsModel.gradeList.toDate = '31-Dec-9999';
      const gradeToDate = this.PositionForm.get('gradeToDateControl');
      gradeToDate.enable();
    }}
  }
  validatGradeDate() {
    this.PositionForm.controls['gradeFromDateControl'].setValidators([Validators.required]);
    this.PositionForm.controls.gradeFromDateControl.updateValueAndValidity();
    this.PositionForm.controls['gradeToDateControl'].setValidators([Validators.required]);
    this.PositionForm.controls.gradeToDateControl.updateValueAndValidity();
  }
  enableGradeDate() {
    const gradeFromDate = this.PositionForm.get('gradeFromDateControl');
    gradeFromDate.enable();
    const gradeToDate = this.PositionForm.get('gradeToDateControl');
    gradeToDate.enable();
    if (this.organizationDetailsModel.gradeList.description == '' || this.organizationDetailsModel.gradeList.description == null) {
      this.organizationDetailsModel.gradeList.fromDate = null;
      this.organizationDetailsModel.gradeList.toDate = null;
      this.disableGradeDates();
    }
  }

  disableGradeDates() {
    const gradeToDate = this.PositionForm.get('gradeToDateControl');
    gradeToDate.disable();
    const gradeFromDate = this.PositionForm.get('gradeFromDateControl');
    gradeFromDate.disable();
  }
  validateDesignation1ToDate(event) {
    if(event){
    if (this.organizationDetailsModel.designation1List.description != '' || this.organizationDetailsModel.designation1List.description != null) {
      this.organizationDetailsModel.designation1List.toDate = '31-Dec-9999';
      const designation1ToDate = this.PositionForm.get('designation1ToDateControl');
      designation1ToDate.enable();
    }}
  }

  validatDesignation1Date() {
    this.PositionForm.controls['designation1FromDateControl'].setValidators([Validators.required]);
    this.PositionForm.controls.designation1FromDateControl.updateValueAndValidity();
    this.PositionForm.controls['designation1ToDateControl'].setValidators([Validators.required]);
    this.PositionForm.controls.designation1ToDateControl.updateValueAndValidity();
  }
  enableDesignation1Date() {
    const designation1FromDate = this.PositionForm.get('designation1FromDateControl');
    designation1FromDate.enable();
    const designation1ToDate = this.PositionForm.get('designation1ToDateControl');
    designation1ToDate.enable();
    if (this.organizationDetailsModel.designation1List.description == '' || this.organizationDetailsModel.designation1List.description == null) {
      this.organizationDetailsModel.designation1List.fromDate = null;
      this.organizationDetailsModel.designation1List.toDate = null;
      this.disableDesignation1Dates();
    }
  }

  disableDesignation1Dates() {
    const designation1ToDate = this.PositionForm.get('designation1ToDateControl');
    designation1ToDate.disable();
    const designation1FromDate = this.PositionForm.get('designation1FromDateControl');
    designation1FromDate.disable();
  }
  validateDesignation2ToDate(event) {
    if(event){
    if (this.organizationDetailsModel.designation2List.description != '' || this.organizationDetailsModel.designation2List.description!=null) {
      this.organizationDetailsModel.designation2List.toDate = '31-Dec-9999';
      const designation2ToDate = this.PositionForm.get('designation2ToDateControl');
      designation2ToDate.enable();
    }}
  }
  validatDesignation2Date() {
    this.PositionForm.controls['designation2FromDateControl'].setValidators([Validators.required]);
    this.PositionForm.controls.designation2FromDateControl.updateValueAndValidity();
    this.PositionForm.controls['designation2ToDateControl'].setValidators([Validators.required]);
    this.PositionForm.controls.designation2ToDateControl.updateValueAndValidity();
  }
  enableDesignation2Date() {
    const designation2FromDate = this.PositionForm.get('designation2FromDateControl');
    designation2FromDate.enable();
    const designation2ToDate = this.PositionForm.get('designation2ToDateControl');
    designation2ToDate.enable();
    if (this.organizationDetailsModel.designation2List.description == '' || this.organizationDetailsModel.designation2List.description == null) {
      this.organizationDetailsModel.designation2List.fromDate = null;
      this.organizationDetailsModel.designation2List.toDate = null;
      this.disableDesignation2Dates();
    }
  }

  disableDesignation2Dates() {
    const designation2ToDate = this.PositionForm.get('designation2ToDateControl');
    designation2ToDate.disable();
    const designation2FromDate = this.PositionForm.get('designation2FromDateControl');
    designation2FromDate.disable();
  }


  validatePosition1ToDate(event) {
    if(event){
    if (this.organizationDetailsModel.position1List.description != '' || this.organizationDetailsModel.position1List.description != null) {
      this.organizationDetailsModel.position1List.toDate = '31-Dec-9999';
      const position1ToDate = this.PositionForm.get('position1ToDateControl');
      position1ToDate.enable();
    }}
  }
  validatPosition1Date() {
    this.PositionForm.controls['position1FromDateControl'].setValidators([Validators.required]);
    this.PositionForm.controls.position1FromDateControl.updateValueAndValidity();
    this.PositionForm.controls['position1ToDateControl'].setValidators([Validators.required]);
    this.PositionForm.controls.position1ToDateControl.updateValueAndValidity();
  }
  enablePosition1Date() {
    const position1FromDate = this.PositionForm.get('position1FromDateControl');
    position1FromDate.enable();
    const position1ToDate = this.PositionForm.get('position1ToDateControl');
    position1ToDate.enable();
    if (this.organizationDetailsModel.position1List.description=='' || this.organizationDetailsModel.position1List.description == null) {
      this.organizationDetailsModel.position1List.fromDate = null;
      this.organizationDetailsModel.position1List.toDate = null;
      this.disablePosition1Dates();
    }
  }

  disablePosition1Dates() {
    const position1ToDate = this.PositionForm.get('position1ToDateControl');
    position1ToDate.disable();
    const position1FromDate = this.PositionForm.get('position1FromDateControl');
    position1FromDate.disable();
  }


  validatePosition2ToDate(event) {
    if(event){
    if (this.organizationDetailsModel.position2List.description != '' || this.organizationDetailsModel.position2List.description != null) {
      this.organizationDetailsModel.position2List.toDate = '31-Dec-9999';
      const position2ToDate = this.PositionForm.get('position2ToDateControl');
      position2ToDate.enable();
    }
    }
  }
  validatPosition2Date() {
    this.PositionForm.controls['position2FromDateControl'].setValidators([Validators.required]);
    this.PositionForm.controls.position2FromDateControl.updateValueAndValidity();
    this.PositionForm.controls['position2ToDateControl'].setValidators([Validators.required]);
    this.PositionForm.controls.position2ToDateControl.updateValueAndValidity();
  }
  enablePosition2Date() {
    const position2FromDate = this.PositionForm.get('position2FromDateControl');
    position2FromDate.enable();
    const position2ToDate = this.PositionForm.get('position2ToDateControl');
    position2ToDate.enable();
    if (this.organizationDetailsModel.position2List.description =='' || this.organizationDetailsModel.position2List.description == null) {
      this.organizationDetailsModel.position2List.fromDate = null;
      this.organizationDetailsModel.position2List.toDate = null;
      this.disablePosition2Dates();
    }
  }

  disablePosition2Dates() {
    const position2ToDate = this.PositionForm.get('position2ToDateControl');
    position2ToDate.disable();
    const position2FromDate = this.PositionForm.get('position2FromDateControl');
    position2FromDate.disable();
  }

  
  validatePosition3ToDate(event) {
    if(event){
    if (this.organizationDetailsModel.position3List.description != '' || this.organizationDetailsModel.position3List.description != null) {
      this.organizationDetailsModel.position3List.toDate = '31-Dec-9999';
      const position3ToDate = this.PositionForm.get('position3ToDateControl');
      position3ToDate.enable();
    }}
  }
  validatPosition3Date() {
    this.PositionForm.controls['position3FromDateControl'].setValidators([Validators.required]);
    this.PositionForm.controls.position3FromDateControl.updateValueAndValidity();
    this.PositionForm.controls['position3ToDateControl'].setValidators([Validators.required]);
    this.PositionForm.controls.position3ToDateControl.updateValueAndValidity();
  }
  enablePosition3Date() {
    const position3FromDate = this.PositionForm.get('position3FromDateControl');
    position3FromDate.enable();
    const position3ToDate = this.PositionForm.get('position3ToDateControl');
    position3ToDate.enable();
    if (this.organizationDetailsModel.position3List.description == '' || this.organizationDetailsModel.position3List.description == null) {
      this.organizationDetailsModel.position3List.fromDate = null;
      this.organizationDetailsModel.position3List.toDate = null;
      this.disablePosition3Dates();
    }
  }

  disablePosition3Dates() {
    const position3ToDate = this.PositionForm.get('position3ToDateControl');
    position3ToDate.disable();
    const position3FromDate = this.PositionForm.get('position3FromDateControl');
    position3FromDate.disable();
  }


  
  validatePosition4ToDate(event) {
    if(event){
    if (this.organizationDetailsModel.position4List.description != '' || this.organizationDetailsModel.position4List.description != null) {
      this.organizationDetailsModel.position4List.toDate = '31-Dec-9999';
      const position4ToDate = this.PositionForm.get('position4ToDateControl');
      position4ToDate.enable();
    }}
  }
  validatPosition4Date() {
    this.PositionForm.controls['position4FromDateControl'].setValidators([Validators.required]);
    this.PositionForm.controls.position4FromDateControl.updateValueAndValidity();
    this.PositionForm.controls['position4ToDateControl'].setValidators([Validators.required]);
    this.PositionForm.controls.position4ToDateControl.updateValueAndValidity();
  }
  enablePosition4Date() {
    const position4FromDate = this.PositionForm.get('position4FromDateControl');
    position4FromDate.enable();
    const position4ToDate = this.PositionForm.get('position4ToDateControl');
    position4ToDate.enable();
    if (this.organizationDetailsModel.position4List.description== '' || this.organizationDetailsModel.position4List.description == null) {
      this.organizationDetailsModel.position4List.fromDate = null;
      this.organizationDetailsModel.position4List.toDate = null;
      this.disablePosition4Dates();
    }
  }

  disablePosition4Dates() {
    const position4ToDate = this.PositionForm.get('position4ToDateControl');
    position4ToDate.disable();
    const position4FromDate = this.PositionForm.get('position4FromDateControl');
    position4FromDate.disable();
  }

  
  validatePosition5ToDate(event) {
    if(event){
    if (this.organizationDetailsModel.position5List.description != '' || this.organizationDetailsModel.position5List.description != null) {
      this.organizationDetailsModel.position5List.toDate = '31-Dec-9999';
      const position5ToDate = this.PositionForm.get('position5ToDateControl');
      position5ToDate.enable();
    }}
  }
  validatPosition5Date() {
    this.PositionForm.controls['position5FromDateControl'].setValidators([Validators.required]);
    this.PositionForm.controls.position5FromDateControl.updateValueAndValidity();
    this.PositionForm.controls['position5ToDateControl'].setValidators([Validators.required]);
    this.PositionForm.controls.position5ToDateControl.updateValueAndValidity();
  }
  enablePosition5Date() {
    const position5FromDate = this.PositionForm.get('position5FromDateControl');
    position5FromDate.enable();
    const position5ToDate = this.PositionForm.get('position5ToDateControl');
    position5ToDate.enable();
    if (this.organizationDetailsModel.position5List.description == '' || this.organizationDetailsModel.position5List.description == null) {
      this.organizationDetailsModel.position5List.fromDate = null;
      this.organizationDetailsModel.position5List.toDate = null;
      this.disablePosition5Dates();
    }
  }

  disablePosition5Dates() {
    const position5ToDate = this.PositionForm.get('position5ToDateControl');
    position5ToDate.disable();
    const position5FromDate = this.PositionForm.get('position5FromDateControl');
    position5FromDate.disable();
  }


  validateReportingToDate(event) {
    if(event){
    if (this.positionDetailsModel.reportingToList.description != '' || this.positionDetailsModel.reportingToList.description != null) {
      this.positionDetailsModel.reportingToList.toDate = '31-Dec-9999';
      const reportingToDate = this.PositionForm.get('reportingToDateControl');
      reportingToDate.enable();
    }
    }
  }
  validatReportingDate() {
    this.PositionForm.controls['reportingFromDateControl'].setValidators([Validators.required]);
    this.PositionForm.controls.reportingFromDateControl.updateValueAndValidity();
    this.PositionForm.controls['reportingToDateControl'].setValidators([Validators.required]);
    this.PositionForm.controls.reportingToDateControl.updateValueAndValidity();
  }
  enableReportingDate() {
    const reportingFromDate = this.PositionForm.get('reportingFromDateControl');
    reportingFromDate.enable();
    const reportingToDate = this.PositionForm.get('reportingToDateControl');
    reportingToDate.enable();
    if (this.positionDetailsModel.reportingToList.description == '' || this.positionDetailsModel.reportingToList.description == null) {
      this.positionDetailsModel.reportingToList.fromDate = null;
      this.positionDetailsModel.reportingToList.toDate = null;
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
    this.organizationDetailsModel.gradeList.description = toSelect.masterDescription;
    this.organizationDetailsModel.gradeList.jobMasterMappingId = toSelect.jobMasterMappingId;
    this.PositionForm.get('gradeMasterIdControl').setValue(toSelect.masterCode);
    this.enableGradeDate()
  }
  designation1Object(designation1) {
    const toSelect = this.filteredDesignation1List.find(
      (c) => c.masterCode === this.PositionForm.get('designation1Control').value
    );
    this.organizationDetailsModel.designation1List.description = toSelect.masterDescription;
    this.organizationDetailsModel.designation1List.jobMasterMappingId = toSelect.jobMasterMappingId;
    this.PositionForm.get('designation1Control').setValue(toSelect.masterCode);
    this.enableDesignation1Date()
  }

  designation2Object(designation2) {
    const toSelect = this.filteredDesignation2List.find(
      (c) => c.masterCode === this.PositionForm.get('designation2Control').value
    );
    this.organizationDetailsModel.designation2List.description = toSelect.masterDescription;
    this.organizationDetailsModel.designation2List.jobMasterMappingId = toSelect.jobMasterMappingId;
    this.PositionForm.get('designation2Control').setValue(toSelect.masterCode);
    this.enableDesignation2Date()
  }
//check this
  employeeTypeObject(employee) {
    const toSelect = this.filteredEmployeeTypeList.find(
      (c) => c.value === this.PositionForm.get('employeeTypeControl').value
    );
    this.positionDetailsModel.typeList.description = toSelect.description;
    this.PositionForm.get('employeeTypeDescriptionControl').setValue(toSelect.description);
    this.positionDetailsModel.typeList.value = toSelect.value;
    this.positionDetailsModel.typeList.category=toSelect.category;
    this.positionDetailsModel.typeList.positionDetailDDId=toSelect.positionDetailDDId;
    this.enableEmployeeTypeDate()
  }

  employeeStatusObject(employee) {
    const toSelect = this.filteredEmployeeStatusList.find(
      (c) => c.value === this.PositionForm.get('employeeStatusControl').value
    );
    this.positionDetailsModel.statusList.description = toSelect.description;
    this.PositionForm.get('employeeStatusDescriptionControl').setValue(toSelect.description);
    this.positionDetailsModel.statusList.value = toSelect.value;
    this.positionDetailsModel.statusList.category=toSelect.category;
    this.positionDetailsModel.statusList.positionDetailDDId=toSelect.positionDetailDDId;
    this.enableEmployeeStatusDate()
  }
  employeeTaxCategoryObject(employee) {
    const toSelect = this.filteredEmployeeTaxCategoryList.find(
      (c) => c.value === this.PositionForm.get('employeeTaxCategoryControl').value
    );
    this.positionDetailsModel.taxCategoryList.description = toSelect.description;
    this.PositionForm.get('employeeTaxCategoryDescriptionControl').setValue(toSelect.description);
    this.positionDetailsModel.taxCategoryList.value = toSelect.value;
    this.positionDetailsModel.taxCategoryList.category=toSelect.category;
    this.positionDetailsModel.taxCategoryList.positionDetailDDId=toSelect.positionDetailDDId;
    this.enableEmployeeTaxCategoryDate()
  }

  reportingToObject(employee) {

    //   const toSelect = this.filteredReportingToList.find(
    //     (c) => c === this.PositionForm.get('reportingToControl')
    //   );
    //  // this.positionDetailsModel.employeeTaxCategoryDescription = toSelect.description;
    //  // this.PositionForm.get('employeeTaxCategoryDescriptionControl').setValue(toSelect.description);
    //   this.positionDetailsModel.reportingTo = toSelect;
    //   this.enableReportingDate()

    //new

    const toSelect = this.filteredReportingToList[0].find(
      (c) => c.codeName === this.PositionForm.get('reportingToControl').value
    );
    this.positionDetailsModel.reportingToList.description = toSelect.fullName;
    this.positionDetailsModel.reportingToList.positionDetailDDId = toSelect.employeeMasterId;
   this.positionDetailsModel.reportingToList.value=toSelect.nameCode;
       this.positionDetailsModel.reportingToList.category='reportingTO';

    //this.PositionForm.get('reportingToDescriptionControl').setValue(toSelect.displayName);
    // this.positionDetailsModel.reportingTo = toSelect.employeeMasterId;
    this.PositionForm.get('reportingToControl').setValue(toSelect.codeName);
    this.enableReportingDate();

  }


  position1Object(position1) {
    const toSelect = this.filteredPosition1List.find(
      (c) => c.masterCode === this.PositionForm.get('position1Control').value
    );
    this.organizationDetailsModel.position1List.description = toSelect.masterDescription;
    this.organizationDetailsModel.position1List.jobMasterMappingId = toSelect.jobMasterMappingId;
    this.PositionForm.get('position1Control').setValue(toSelect.masterCode);
    this.enablePosition1Date()
  }

  position2Object(position2) {
    const toSelect = this.filteredPosition2List.find(
      (c) => c.masterCode === this.PositionForm.get('position2Control').value
    );
    this.organizationDetailsModel.position2List.description = toSelect.masterDescription;
    this.organizationDetailsModel.position2List.jobMasterMappingId = toSelect.jobMasterMappingId;
    this.PositionForm.get('position2Control').setValue(toSelect.masterCode);
    this.enablePosition2Date()
  }

  position3Object(position3) {
    const toSelect = this.filteredPosition3List.find(
      (c) => c.masterCode === this.PositionForm.get('position3Control').value
    );
    this.organizationDetailsModel.position3List.description = toSelect.masterDescription;
    this.organizationDetailsModel.position3List.jobMasterMappingId = toSelect.jobMasterMappingId;
    this.PositionForm.get('position3Control').setValue(toSelect.masterCode);
    this.enablePosition3Date()
  }

  position4Object(position4) {
    const toSelect = this.filteredPosition4List.find(
      (c) => c.masterCode === this.PositionForm.get('position4Control').value
    );
    this.organizationDetailsModel.position4List.description = toSelect.masterDescription;
    this.organizationDetailsModel.position4List.jobMasterMappingId = toSelect.jobMasterMappingId;
    this.PositionForm.get('position4Control').setValue(toSelect.masterCode);
    this.enablePosition4Date()
  }

  position5Object(position5) {
    const toSelect = this.filteredPosition5List.find(
      (c) => c.masterCode === this.PositionForm.get('position5Control').value
    );
    this.organizationDetailsModel.position5List.description = toSelect.masterDescription;
    this.organizationDetailsModel.position5List.jobMasterMappingId = toSelect.jobMasterMappingId;
    this.PositionForm.get('position5Control').setValue(toSelect.masterCode);
    this.enablePosition5Date()
  }

  searchEmpType(employeeType) {

    this.positionDetailsModel.typeList.description = null;
    this.positionDetailsModel.typeList.fromDate = null;
    this.positionDetailsModel.typeList.toDate = null;
    this.disableEmployeeTypeDates();

    employeeType = employeeType.toLowerCase();
    const ifsc = this.filteredEmployeeTypeList.filter((item) => {
      return JSON.stringify(item).toLowerCase().includes(employeeType);
    });
    this.employeeTypeList = ifsc;
  }

  searchEmployeeStatus(employeeStatus) {

    this.positionDetailsModel.statusList.description = null;
    this.positionDetailsModel.statusList.fromDate = null;
    this.positionDetailsModel.statusList.toDate = null;
    const employeeStatusToDate = this.PositionForm.get('employeeStatusToDateControl');

    this.disableEmployeeStatusDates();

    employeeStatus = employeeStatus.toLowerCase();
    const ifsc = this.filteredEmployeeStatusList.filter((item) => {
      return JSON.stringify(item).toLowerCase().includes(employeeStatus);
    });
    this.employeeStatusList = ifsc;
  }

  searchEmployeeTaxCategory(employeeTaxCategory) {

    this.positionDetailsModel.taxCategoryList.description = null;
    this.positionDetailsModel.taxCategoryList.fromDate = null;
    this.positionDetailsModel.taxCategoryList.toDate = null;

    this.disableEmployeeTaxDates();

    employeeTaxCategory = employeeTaxCategory.toLowerCase();
    const ifsc = this.filteredEmployeeTaxCategoryList.filter((item) => {
      return JSON.stringify(item).toLowerCase().includes(employeeTaxCategory);
    });
    this.employeeTaxCategoryList = ifsc;
  }



  SearchGrade(gradeCode) {

    this.description = null;
    this.organizationDetailsModel.gradeList.fromDate = null;
    this.organizationDetailsModel.gradeList.toDate = null;

    this.disableGradeDates();

    gradeCode = gradeCode.toLowerCase();
    const ifsc = this.filteredGradeList.filter((item) => {
      return JSON.stringify(item).toLowerCase().includes(gradeCode);
    });
    this.gradeList = ifsc;
  }

  searchDesignation1(designation1) {

    this.designation1Desc = null;
    this.organizationDetailsModel.designation1List.fromDate = null;
    this.organizationDetailsModel.designation1List.toDate = null;

    this.disableDesignation1Dates();
    designation1 = designation1.toLowerCase();
    const desi1 = this.filteredDesignation1List.filter((item) => {
      return JSON.stringify(item).toLowerCase().includes(designation1);
    });
    this.designation1List = desi1;
  }

  searchDesignation2(designation2) {

    this.designation2Desc = null;
    this.organizationDetailsModel.designation2List.fromDate = null;
    this.organizationDetailsModel.designation2List.toDate = null;

    this.disableDesignation2Dates();

    designation2 = designation2.toLowerCase();
    const desi2 = this.filteredDesignation2List.filter((item) => {
      return JSON.stringify(item).toLowerCase().includes(designation2);
    });
    this.designation2List = desi2;
  }

  searchReportingTo(reportingTo) {
    this.positionDetailsModel.reportingToList.positionDetailDDId = null;
    this.positionDetailsModel.reportingToList.fromDate = null;
    this.positionDetailsModel.reportingToList.toDate = null;

    this.disableReportingDates();

    reportingTo = reportingTo.toLowerCase();
    const ifsc = this.filteredReportingToList.filter((item) => {
      return JSON.stringify(item).toLowerCase().includes(reportingTo);
    });
    this.reportingToList = ifsc;
  }

  searchPosition1(position1) {

    this.position1Desc = null;
    this.organizationDetailsModel.position1List.fromDate = null;
    this.organizationDetailsModel.position1List.toDate = null;

    this.disablePosition1Dates();

    position1 = position1.toLowerCase();
    const pos1 = this.filteredPosition1List.filter((item) => {
      return JSON.stringify(item).toLowerCase().includes(position1);
    });
    this.position1List = pos1;
  }

  searchPosition2(position2) {

    this.position2Desc = null;
    this.organizationDetailsModel.position2List.fromDate = null;
    this.organizationDetailsModel.position2List.toDate = null;

    this.disablePosition2Dates();

    position2 = position2.toLowerCase();
    const pos2 = this.filteredPosition2List.filter((item) => {
      return JSON.stringify(item).toLowerCase().includes(position2);
    });
    this.position2List = pos2;
  }

  searchPosition3(position3) {

    this.position3Desc = null;
    this.organizationDetailsModel.position3List.fromDate = null;
    this.organizationDetailsModel.position3List.toDate = null;

    this.disablePosition3Dates();

    position3 = position3.toLowerCase();
    const pos3 = this.filteredPosition3List.filter((item) => {
      return JSON.stringify(item).toLowerCase().includes(position3);
    });
    this.position3List = pos3;
  }


  searchPosition4(position4) {

    this.position4Desc = null;
    this.organizationDetailsModel.position4List.fromDate = null;
    this.organizationDetailsModel.position4List.toDate = null;

    this.disablePosition4Dates();

    position4 = position4.toLowerCase();
    const pos4 = this.filteredPosition4List.filter((item) => {
      return JSON.stringify(item).toLowerCase().includes(position4);
    });
    this.position4List = pos4;
  }

  searchPosition5(position5) {

    this.position5Desc = null;
    this.organizationDetailsModel.position5List.fromDate = null;
    this.organizationDetailsModel.position5List.toDate = null;

    this.disablePosition5Dates();

    position5 = position5.toLowerCase();
    const pos5 = this.filteredPosition5List.filter((item) => {
      return JSON.stringify(item).toLowerCase().includes(position5);
    });
    this.position5List = pos5;
  }


  //get payroll area aasigned to that employee
  getPayrollAreaInformation() {

    this.PayrollAreaService.getPayrollData(this.employeeMasterId).subscribe(res => {

      res.data.results[0].forEach(item => {
        // this.payrollAreaList.push(item.payrollAreaCode);
        // this.filteredPayrollAreaList.push(item.payrollAreaCode);

        this.payrollAreaList.push(item);
        this.filteredPayrollAreaList.push(item);

      });
      if (this.payrollAreaList.length == 1) {
        // this.payrollAreaCode = this.payrollAreaList[0];
        // localStorage.setItem('jobInformationPayrollAreaCode',  this.payrollAreaCode);

        //set default payroll area
        this.payrollAreaCode = this.payrollAreaList[0].payrollAreaCode;
        localStorage.setItem('jobInformationPayrollAreaCode', this.payrollAreaCode);

        //set default company
        let result = res.data.results[0];
        //this.companyName = result[0].payrollAreaId.companyId.companyName;
        this.companyName = result[0].companyname;
        this.positionDetailsModel.payrollAreaId=result[0].payrollAreaId;
        this.organizationDetailsModel.payrollAreaId=result[0].payrollAreaId;
        this.companyId= result[0].companyId;
        localStorage.setItem('jobInformationCompanyName', this.companyName);
      }
      else {
        //get payroll area code from local storage
        const payrollAreaCode = localStorage.getItem('jobInformationPayrollAreaCode')
        this.payrollAreaCode = new String(payrollAreaCode);
        
        //get company from local storage
        const companyName = localStorage.getItem('jobInformationCompanyName')
        if (companyName != null) {
          this.companyName = new String(companyName);
        }
      }
    })


  }

  filterEstablishmentAreaArea(event){
    const toSelect = this.filteredEstablishmentList.find(
      (c) => c.establishmentMasterId === event
    );
    
    this.establishmentCode=toSelect.establishmentCode;
    this.PositionForm.get('establishmentControl').setValue(toSelect.establishmentCode);
    localStorage.setItem('establishmentMasterId',toSelect.establishmentMasterId)
  }
  selectEstablishmentArea(event){
   
    const toSelect = this.filteredEstablishmentList.find(
      (c) => c.establishmentMasterId === event
    );
    this.establishmentCode=toSelect.establishmentCode;
    this.establishmentCode=toSelect.establishmentCode;
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
  filterPayrollArea(event) {
    localStorage.setItem('jobInformationPayrollAreaCode', event);
   
    this.payrollAreaCode = event;

    const toSelect = this.filteredPayrollAreaList.find(
      (c) => c.payrollAreaCode === this.payrollAreaCode
    );
    // this.companyName = toSelect.payrollAreaId.companyId.companyName;
    this.companyName = toSelect.companyname;
    this.companyId=toSelect.companyId;
    localStorage.setItem('payrollAreaId',toSelect.payrollAreaId);
  
  }
  //set PayrollArea
  selectPayrollArea(event) {
    localStorage.setItem('jobInformationPayrollAreaCode', event);
    this.payrollAreaCode = event;

    const toSelect = this.filteredPayrollAreaList.find(
      (c) => c.payrollAreaCode === this.payrollAreaCode
    );
    // this.companyName = toSelect.payrollAreaId.companyId.companyName;
    this.companyName = toSelect.companyname;
    this.companyId=toSelect.companyId;
    this.payrollAreaId= toSelect.payrollAreaId;
    localStorage.setItem('jobInformationCompanyName', this.companyName);
    this.resetList()
    this.resetDTO()
    this.resetPositionForm();
    this.getJobDetails();

  }
  resetList(){
  
   
    this.filteredGradeList=[];
    this.filteredDesignation1List=[];
    this.filteredDesignation2List=[];
  
    this.filteredPosition1List=[];
    this.filteredPosition2List=[];
    this.filteredPosition3List=[];
    this.filteredPosition4List=[];
    this.filteredPosition5List=[];
  }
  resetDTO(){
    this.organizationDetailsModel = new OrganizationDetailsModel('','',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null) ;
   
    this.organizationDetailsModel.gradeList=new JobDetailsDTO('','','','','','','')
    this.organizationDetailsModel.designation1List =new JobDetailsDTO('','','','','','','')
    this.organizationDetailsModel.designation2List =new JobDetailsDTO('','','','','','','')
    this.organizationDetailsModel.position1List= new JobDetailsDTO('','','','','','','')
    this.organizationDetailsModel.position2List= new JobDetailsDTO('','','','','','','')
    this.organizationDetailsModel.position3List= new JobDetailsDTO('','','','','','','')
    this.organizationDetailsModel.position4List= new JobDetailsDTO('','','','','','','')
    this.organizationDetailsModel.position5List= new JobDetailsDTO('','','','','','','')
  
  }
  resetPositionForm() {
    //this.PositionForm.reset();

    //set fields to null for -form clearing
    // this.employeePositionDetailId = 0;
    // this.gradeCode = null;
    // this.description = null;

    // this.designation2Code = null;
    // this.designation1Desc = null;
    // this.designation2Desc = null;
    // this.reportingToCode = null;
    // this.reportingToDesc = null;

    //disbale dates
    this.disableDesignation1Dates();
    this.disableDesignation2Dates();
    this.disableEmployeeStatusDates();
    this.disableEmployeeTaxDates();
    this.disableEmployeeTypeDates();
    this.disableGradeDates();
    this.disableReportingDates();
    this.disablePosition1Dates();
    this.disablePosition2Dates();
    this.disablePosition3Dates();
    this.disablePosition4Dates();
    this.disablePosition5Dates();
  }
  selectCopyFrom(){
    const payCode= this.PositionForm.get('copyFromControl').value;
  this.getPositionForm(payCode,'copyFrom');
  }
}