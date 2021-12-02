import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, RequiredValidator } from '@angular/forms';
import { DatePipe, LocationStrategy } from '@angular/common';
import { empty, Subscription } from 'rxjs';
import { JobDetailsDTO, OrganizationDetailsModel } from './../job-information-models/organization-details.model';
import { EventEmitterService } from './../../../employee-master-services/event-emitter/event-emitter.service';
import { JobInformationService } from '../job-information.service';
import { SharedInformationService } from '../../../employee-master-services/shared-service/shared-information.service';
import { PayrollAreaInformationService } from './../../payroll-area-information/payroll-area-information.service';
import { Router } from '@angular/router';
import { element, promise } from 'protractor';
import { isEmpty } from 'rxjs/operators';
import { runInThisContext } from 'node:vm';
import { getTreeNoValidDataSourceError } from '@angular/cdk/tree';
import { LocalAddressInformation } from '../../contact-information/contact-information.model';
import { ThemeService } from 'ng2-charts';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.scss']
})
export class OrganizationDetailComponent implements OnInit {

  OrganizationForm: FormGroup;
  tomorrow = new Date();
  jobDetailsDTO = new JobDetailsDTO('','','','','','') ;
  organizationDetailsModel = new OrganizationDetailsModel('','',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null) ;

  employeeMasterId: number;
  joiningDate: any;
  payrollAreaFromDate:any;
  payrollAreaToDate:any;
  employeeOrganizationDetailId: any;
  confirmMsg: any;
  establishmentValidate: Boolean;
  subLocationValidate: Boolean;
  workLocationValidate: Boolean;
  businessAreaMasterValidate: Boolean;
  subAreaValidate: Boolean;
  strategicBusinessValidate: Boolean;
  divisionMasterValidate: Boolean;
  departmentValidate: Boolean;
  subDepartmentValidate: Boolean;
  costCentreValidate: Boolean;
  subCostCentreValidate: Boolean;
  profitCentreMasterValidate: Boolean;
  job1Validate:Boolean;
  job2Validate:Boolean;
  job3Validate:Boolean;
  job4Validate:Boolean;
  job5Validate:Boolean;

  payrollAreaList: Array<any> = [];

  establishmentList: Array<any> = [];
  subLocationList: Array<any> = [];
  workLocationList: Array<any> = [];
  businessAreaList: Array<any> = [];
  subAreaList: Array<any> = [];
  strategicBusinessAreaList: Array<any> = [];
  divisionList:Array<any>;
  departmentList: Array<any> = [];
  subDepartmentList: Array<any> = [];
  costCenterList: Array<any> = [];
  subCostCenterList: Array<any> = [];
  profitCenterList: Array<any> = [];
  job1List:Array<any>=[];
  job2List:Array<any>=[];
  job3List:Array<any>=[];
  job4List:Array<any>=[];
  job5List:Array<any>=[];

  filteredPayrollAreaList: Array<any> = [];
  filteredEstablishmentList: Array<any> = [];
  filteredSubLocationList: Array<any> = [];
  filteredWorkLocationList: Array<any> = [];
  filteredBusinessAreaList: Array<any> = [];
  filteredSubAreaList: Array<any> = [];
  filteredStrategicBusinessAreaList: Array<any> = [];
  filteredDivisionList: Array<any> = [];
  filteredDepartmentList: Array<any> = [];
  filteredSubDepartmentList: Array<any> = [];
  filteredCostCenterList: Array<any> = [];
  filteredSubCostCenterList: Array<any> = [];
  filteredProfitCenterList: Array<any> = [];

 filteredJob1List:Array<any>=[];
 filteredJob2List:Array<any>=[];
 filteredJob3List:Array<any>=[];
 filteredJob4List:Array<any>=[];
 filteredJob5List:Array<any>=[];
  establishmentDescription: any;
  establishmentCode: any;
  // subLocationDescription: any;
  subLocationCode: any;
  // workLocationDescription: any;
  workLocationCode: any;
  // businessAreaDescription: any;
  businessAreaCode: any;
  // subAreaDescription: any;
  subAreaCode: any;
  // strategicDescription: any;
  strategicCode: any;
  // divisionDescription: any;
  divisionCode: any;
  departmentDescription: any;
  departmentCode: any;
  subDepDescription: any;
  subDepCode: any;
  costDescription: any;
  costCode: any;
  subCostDescription: any;
  subCostCode: any;
  profitDescription: any;
  profitCentreCode: any;
  job1Code:any;
  job2Code:any;
  job3Code:any;
  job4Code:any;
  job5Code:any;
 
  // saveNextBoolean: boolean = false;
  payrollAreaCode: any;
  companyName: any;
  companyId:any;
  payrollAreaId:number;
 establishmentMasterId:any;  
 JobMasterList:any;
 availablePayrollIds:Array<any>=[];
 copyFromFilteredList:Array<any>=[];
 copyFromCode:any;

dto=new JobDetailsDTO('','','','','','');
  type: any;
  payCode: any;
  payrollType: any;
  modalRef: any;
  dataapi: any;
  historyData: any;

  constructor(public datepipe: DatePipe,
    private EventEmitterService: EventEmitterService, private JobInformationService: JobInformationService,
    private formBuilder: FormBuilder, private PayrollAreaService: PayrollAreaInformationService, private CommonDataService: SharedInformationService, private router: Router, private modalService: BsModalService) {
    this.tomorrow.setDate(this.tomorrow.getDate());
  }

  ngOnInit(): void {

    this.OrganizationForm = this.formBuilder.group({
      
      establishmentMasterIdControl: [''],
      establishmentFromDateControl: [{ value: null, disabled: true }],
      establishmentToDateControl: [{ value: null, disabled: true }],
      // establishmentControl:[''],
      subLocationMasterIdControl: [''],
      subLocationFromDateControl: [{ value: null, disabled: true }],
      subLocationToDateControl: [{ value: null, disabled: true }],

      workLocationMasterIdControl: [''],
      workLocationFromDateControl: [{ value: null, disabled: true }],
      workLocationToDateControl: [{ value: null, disabled: true }],


      businessAreaMasterIdControl: [''],
      businessAreaFromDateControl: [{ value: null, disabled: true }],
      businessAreaToDateControl: [{ value: null, disabled: true }],

      subAreaIdControl: [''],
      subAreaFromDateControl: [{ value: null, disabled: true }],
      subAreaToDateControl: [{ value: null, disabled: true }],

      strategicBusinessUnitIdControl: [''],
      strategicBusinessFromDateControl: [{ value: null, disabled: true }],
      strategicBusinessToDateControl: [{ value: null, disabled: true }],

      divisionMasterIdControl: [''],
      divisionFromDateControl: [{ value: null, disabled: true }],
      divisionToDateControl: [{ value: null, disabled: true }],

      departmentMasterIdControl: [''],
      departmentFromDateControl: [{ value: null, disabled: true }],
      departmentToDateControl: [{ value: null, disabled: true }],


      subDepartmentMasterIdControl: [''],
      subDepartmentFromDateControl: [{ value: null, disabled: true }],
      subDepartmentToDateControl: [{ value: null, disabled: true }],

      costCentreIdControl: [''],
      costCentreFromDateControl: [{ value: null, disabled: true }],
      costCentreToDateControl: [{ value: null, disabled: true }],

      subCostCentreIdControl: [''],
      subCostCentreFromDateControl: [{ value: null, disabled: true }],
      subCostCentreToDateControl: [{ value: null, disabled: true }],


      profitCentreMasterIdControl: [''],
      profitCentreFromDateControl: [{ value: null, disabled: true }],
      profitCentreToDateControl: [{ value: null, disabled: true }],

     

      job1IdControl: [''],
      job1FromDateControl: [{ value: null, disabled: true }],
      job1ToDateControl: [{ value: null, disabled: true }],

      job2IdControl: [''],
      job2FromDateControl: [{ value: null, disabled: true }],
      job2ToDateControl: [{ value: null, disabled: true }],

      job3IdControl: [''],
      job3FromDateControl: [{ value: null, disabled: true }],
      job3ToDateControl: [{ value: null, disabled: true }],

      job4IdControl: [''],
      job4FromDateControl: [{ value: null, disabled: true }],
      job4ToDateControl: [{ value: null, disabled: true }],


      job5IdControl: [''],
      job5FromDateControl: [{ value: null, disabled: true }],
      job5ToDateControl: [{ value: null, disabled: true }],

      // establishmentCode:[''],
      payrollAreaCode: [''],
      payrollIdControl:[''],
      copyFromControl:['']
    });

    this.payrollAreaCode = '';
    this.companyName = '';
    this.copyFromCode='';
    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);
this.payrollAreaId = Number(localStorage.getItem('payrollAreaId'));
    //get payroll area code from local storage
    const payrollAreaCode = localStorage.getItem('jobInformationPayrollAreaCode')
   // const payrollAreaCode = this.OrganizationForm.get('payrollIdControl').value
    this.payrollAreaCode = new String(payrollAreaCode);
    this.companyId=localStorage.getItem('companyId')
   

    


    
    //get company name from local storage
    const companyName = localStorage.getItem('jobInformationCompanyName')
    if (companyName != null) {
      this.companyName = new String(companyName);
    }
  
    const joiningDate = localStorage.getItem('joiningDate');
    this.joiningDate = new Date(joiningDate);

  
    //get assigned payroll area's list
    this.getPayrollAreaInformation();

     

   // console.log('agoder')
    //start here to load the data
    this.getJobList();
    // if(this.filteredPayrollAreaList.length>0){
    //   this.copyFromFilteredList = this.copyFromFilteredList.find(x=>x.payrollAreaId!=this.payrollAreaId)
    //   }
  } 
  async getJobList(){
  let jobList = new Promise((resolve,reject)=>{

    this.JobInformationService.getJobMasterDetails().subscribe(res=>{
     this.JobMasterList =res.data.results;
     resolve('data recieved');
    })
  }) 
  let jobResponse = await jobList
  //call only once all jobList got fetched
    this.getJobDetails();
}
  async getJobDetails(){
   
//this.getOrganizationForm()
//}
  

// async getData(){
    let promise = new Promise((resolve,reject)=>{

      this.JobInformationService.getEstaDetails().subscribe(res => {
      this.organizationDetailsModel.establishmentList=new JobDetailsDTO('','','','','','')
      this.establishmentList = [];
      this.establishmentList = res.data.results;
      this.filteredEstablishmentList = res.data.results;
 
    })

    this.JobInformationService.getOtherMasterDetails(this.companyId).subscribe(res => {
      
      this.filteredSubLocationList=[];
      this.filteredWorkLocationList=[];
      this.filteredBusinessAreaList=[];
      this.filteredSubAreaList=[];
      this.filteredStrategicBusinessAreaList=[];
      this.filteredDivisionList=[];
      this.filteredDepartmentList=[];
      this.filteredSubDepartmentList=[];
      this.filteredCostCenterList=[];
      this.filteredSubCostCenterList=[];
      this.filteredProfitCenterList=[];
    
 
    
      this.filteredJob1List=[];
      this.filteredJob2List=[];
      this.filteredJob3List=[];
      this.filteredJob4List=[];
      this.filteredJob5List=[];

      
      this.organizationDetailsModel.departmentList=new JobDetailsDTO('','','','','','')
      this.organizationDetailsModel.subLocationList =new JobDetailsDTO('','','','','','')
      this.organizationDetailsModel.workLocationList =new JobDetailsDTO('','','','','','')
      this.organizationDetailsModel.businessAreaList =new JobDetailsDTO('','','','','','')
      this.organizationDetailsModel.subAreaList =new JobDetailsDTO('','','','','','')
      this.organizationDetailsModel.strategicBusinessAreaList =new JobDetailsDTO('','','','','','')
      this.organizationDetailsModel.divisionList =new JobDetailsDTO('','','','','','')
      this.organizationDetailsModel.departmentList =new JobDetailsDTO('','','','','','')
      this.organizationDetailsModel.subDepartmentList=new JobDetailsDTO('','','','','','')
      this.organizationDetailsModel.subAreaList =new JobDetailsDTO('','','','','','')
      this.organizationDetailsModel.costCenterList=new JobDetailsDTO('','','','','','')
      this.organizationDetailsModel.subCostCenterList =new JobDetailsDTO('','','','','','')
      this.organizationDetailsModel.profitCenterList =new JobDetailsDTO('','','','','','')
      
      this.organizationDetailsModel.job1List= new JobDetailsDTO('','','','','','')
      this.organizationDetailsModel.job2List= new JobDetailsDTO('','','','','','')
      this.organizationDetailsModel.job3List= new JobDetailsDTO('','','','','','')
      this.organizationDetailsModel.job4List= new JobDetailsDTO('','','','','','')
      this.organizationDetailsModel.job5List= new JobDetailsDTO('','','','','','')
      // this.organizationDetailsModel.designation1List=new JobDetailsDTO('','','','','','','')
      // this.organizationDetailsModel.designation2List=new JobDetailsDTO('','','','','','','')
      // this.organizationDetailsModel.gradeList= new JobDetailsDTO('','','','','','','')
      // this.organizationDetailsModel.position1List= new JobDetailsDTO('','','','','','','')
      // this.organizationDetailsModel.position2List= new JobDetailsDTO('','','','','','','')
      // this.organizationDetailsModel.position3List= new JobDetailsDTO('','','','','','','')
      // this.organizationDetailsModel.position4List= new JobDetailsDTO('','','','','','','')
      // this.organizationDetailsModel.position5List= new JobDetailsDTO('','','','','','','')
   

     

   
     // console.log(res.data.results);
      const location = res.data.results.filter((item) => {

        if (item.jobMasterType == 'SubLocation') {
           this.organizationDetailsModel.subLocationList.jobMasterType=item.jobMasterType;
           if(this.subLocationCode==null){const b=this.JobMasterList.find((c)=>c.jobMasterType === item.jobMasterType)
           this.subLocationCode=b.description;     
           }
          this.filteredSubLocationList.push(item);
        }
        if (item.jobMasterType == 'WorkLocation') {
           this.organizationDetailsModel.workLocationList.jobMasterType=item.jobMasterType;
          this.filteredWorkLocationList.push(item);
          if(this.workLocationCode==null){const b=this.JobMasterList.find((c)=>c.jobMasterType === item.jobMasterType)
         this.workLocationCode=b.description; }
          }
        if (item.jobMasterType == 'BusinessArea') {
          this.organizationDetailsModel.businessAreaList.jobMasterType=item.jobMasterType;
          this.filteredBusinessAreaList.push(item);
          if(this.businessAreaCode==null){const b=this.JobMasterList.find((c)=>c.jobMasterType === item.jobMasterType)
             this.businessAreaCode=b.description; }      
        }
        if (item.jobMasterType == 'SubArea') {
           this.organizationDetailsModel.subAreaList.jobMasterType=item.jobMasterType;
          this.filteredSubAreaList.push(item);
          if(this.subAreaCode==null){const b=this.JobMasterList.find((c)=>c.jobMasterType === item.jobMasterType)
            this.subAreaCode=b.description;}  
        }
        if (item.jobMasterType == 'StrategicBusinessUnit') {
          this.filteredStrategicBusinessAreaList.push(item);
           this.organizationDetailsModel.strategicBusinessAreaList.jobMasterType=item.jobMasterType;
           if(this.strategicCode==null){const b=this.JobMasterList.find((c)=>c.jobMasterType === item.jobMasterType)
            this.strategicCode=b.description; }
        }
        if (item.jobMasterType == 'Division') {
           this.organizationDetailsModel.divisionList.jobMasterType=item.jobMasterType;
           if(this.divisionCode==null){const b=this.JobMasterList.find((c)=>c.jobMasterType === item.jobMasterType)
            this.divisionCode=b.description; }
          this.filteredDivisionList.push(item);
        }
        if (item.jobMasterType == 'Department') {
           this.organizationDetailsModel.departmentList.jobMasterType=item.jobMasterType;
           if(this.departmentCode==null){const b=this.JobMasterList.find((c)=>c.jobMasterType === item.jobMasterType)
            this.departmentCode=b.description; }
          this.filteredDepartmentList.push(item);
        }
        if (item.jobMasterType == 'SubDepartment') {
           this.organizationDetailsModel.subDepartmentList.jobMasterType=item.jobMasterType;
           if(this.subDepCode==null){const b=this.JobMasterList.find((c)=>c.jobMasterType === item.jobMasterType)
            this.subDepCode=b.description;}
          this.filteredSubDepartmentList.push(item);

        }
        if (item.jobMasterType == 'CostCentre') {
           this.organizationDetailsModel.costCenterList.jobMasterType=item.jobMasterType;
           if(this.costCode==null){const b=this.JobMasterList.find((c)=>c.jobMasterType === item.jobMasterType)
            this.costCode=b.description;}
          this.filteredCostCenterList.push(item);
        }
        
        if (item.jobMasterType == 'SubCostCenter') {

           this.organizationDetailsModel.subCostCenterList.jobMasterType=item.jobMasterType;

          this.filteredSubCostCenterList.push(item);
          if(this.subCostCode==null){const b=this.JobMasterList.find((c)=>c.jobMasterType === item.jobMasterType)
            this.subCostCode=b.description;}

        }
        if (item.jobMasterType == 'ProfitCentre') {

           this.organizationDetailsModel.profitCenterList.jobMasterType=item.jobMasterType;

          this.filteredProfitCenterList.push(item);
          if(this.profitCentreCode==null){const b=this.JobMasterList.find((c)=>c.jobMasterType === item.jobMasterType)
            this.profitCentreCode=b.description;}
        }

       

        if (item.jobMasterType == 'Job1') {
          this.organizationDetailsModel.job1List.jobMasterType=item.jobMasterType;        
         this.filteredJob1List.push(item);   
         if(this.job1Code==null){const b=this.JobMasterList.find((c)=>c.jobMasterType === item.jobMasterType)
          this.job1Code=b.description;    }
          }
       if (item.jobMasterType == 'Job2') {
        this.organizationDetailsModel.job2List.jobMasterType=item.jobMasterType;        
       this.filteredJob2List.push(item);  
       if(this.job2Code==null){const b=this.JobMasterList.find((c)=>c.jobMasterType === item.jobMasterType)
        this.job2Code=b.description;     }
          }
       if (item.jobMasterType == 'Job3') {
         this.organizationDetailsModel.job3List.jobMasterType=item.jobMasterType;        
         this.filteredJob3List.push(item);
         if(this.job3Code==null){const b=this.JobMasterList.find((c)=>c.jobMasterType === item.jobMasterType)
          this.job3Code=b.description;      }  
            }
         if (item.jobMasterType == 'Job4') {
          this.organizationDetailsModel.job4List.jobMasterType=item.jobMasterType;        
          this.filteredJob4List.push(item);      

         if(this.job4Code==null){const b=this.JobMasterList.find((c)=>c.jobMasterType === item.jobMasterType)
          this.job4Code=b.description;    }
          }
         if (item.jobMasterType == 'Job5') {
          this.organizationDetailsModel.job5List.jobMasterType=item.jobMasterType;        
           this.filteredJob5List.push(item);  
           if(this.job5Code==null){const b=this.JobMasterList.find((c)=>c.jobMasterType === item.jobMasterType)
            this.job5Code=b.description;    }    
          }
      });
   
     resolve('load completion')
     // console.log('resolved here')
    })
   })
   let response = await promise;
   console.log('then started')
   //call only when filtered list are full filled for dynamic loading
   this.getOrganizationForm(this.payrollAreaCode,'normal')
   
  }
 // get organization details service calling
   getOrganizationForm(payroll:any,copyFrom:any) {
   
 //   console.log(response);
 //   console.log('shevat')
//  let payroll;
//  if(event){
//   payroll= event;
//  }else
// {
//   payroll =this.payrollAreaCode
// }

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
         let c = this.payrollAreaList.find(
           (b)=>
           b.payrollAreaId==this.payrollAreaId);
       this.organizationDetailsModel.payrollAreaId= c.payrollAreaId

       // below coding is for checking current data is present or not 
       // and updating the new data 
      if(res.data.results[0].length>0){
        if(location.sublocationList!=null && this.organizationDetailsModel.subLocationList.jobMasterMappingId!=''){
      //  if(location.sublocationList!=null){  location.sublocationList.employeeJobMappingId='';}else{
          location.sublocationList=this.organizationDetailsModel.subLocationList 

        }else if(location.sublocationList!=null && this.organizationDetailsModel.subLocationList.jobMasterMappingId==''){
  
         location.subLocationList.fromDate = this.payrollAreaFromDate;
         location.subLocationList.toDate = this.payrollAreaToDate;
        }}
      ///  }else{location.sublocationList=null}
      
      if(this.filteredWorkLocationList.length>0 ){
        if(location.worklocationList!=null && this.organizationDetailsModel.workLocationList.jobMasterMappingId!=''){
    //  if(location.worklocationList!=null){  location.worklocationList.employeeJobMappingId='';
    //  }else{
        location.workLocationList=this.organizationDetailsModel.workLocationList;
     //   location.workLocationList.fromDate = this.payrollAreaFromDate;
     //   location.workLocationList.toDate = this.payrollAreaToDate;
      }
      else if(location.worklocationList!=null && this.organizationDetailsModel.workLocationList.jobMasterMappingId==''){
        location.worklocationList.fromDate = this.payrollAreaFromDate;
        location.worklocationList.toDate = this.payrollAreaToDate;
      }}
  //  }else{location.worklocationList=null}

     if(this.filteredBusinessAreaList.length>0){
       if(location.businessAreaList!=null && this.organizationDetailsModel.businessAreaList.jobMasterMappingId!='') {
     // if(location.businessAreaList!=null){ location.businessAreaList.jobMasterMappingId='';
     // }else{
        
        location.businessAreaList=this.organizationDetailsModel.businessAreaList; 
     
      }else if(location.businessAreaList!=null && this.organizationDetailsModel.businessAreaList.jobMasterMappingId==''){
        location.businessAreaList.fromDate = this.payrollAreaFromDate;
        location.businessAreaList.toDate = this.payrollAreaToDate;
      }}
      //  location.businessAreaList.fromDate = this.payrollAreaFromDate;
   // }else{location.businessAreaList=null}

     if(this.filteredSubAreaList.length>0){
       if( location.subAreaList!=null && this.organizationDetailsModel.subAreaList.jobMasterMappingId!=''){
    //  if(location.subAreaList!=null){  location.subAreaList.employeeJobMappingId='';
    //  }else{
        location.subAreaList=this.organizationDetailsModel.subAreaList;}
        else if(location.subAreaList!=null && this.organizationDetailsModel.subAreaList.jobMasterMappingId==''){
          location.subAreaList.fromDate = this.payrollAreaFromDate;
          location.subAreaList.toDate = this.payrollAreaToDate;
        }}
  //  }else{location.subAreaList=null}

     if(this.filteredStrategicBusinessAreaList.length>0){
       if( location.strategicBusinessAreaList!=null && this.organizationDetailsModel.strategicBusinessAreaList.jobMasterMappingId!='' ){
   //   if(location.strategicBusinessAreaList!=null) { location.strategicBusinessAreaList.employeeJobMappingId='';
   //    }else{
         location.strategicBusinessAreaList=this.organizationDetailsModel.strategicBusinessAreaList;       }
         else if(location.strategicBusinessAreaList!=null && this.organizationDetailsModel.strategicBusinessAreaList.jobMasterMappingId==''){
          location.strategicBusinessAreaList.fromDate = this.payrollAreaFromDate;
          location.strategicBusinessAreaList.toDate = this.payrollAreaToDate;
        }}
    //  }else{location.strategicBusinessAreaList=null}

      if(this.filteredDivisionList.length>0 ){
        if(location.divisionList!=null && this.organizationDetailsModel.divisionList.jobMasterMappingId!=''){
 //     if(location.divisionList!=null){ location.divisionList.employeeJobMappingId='';
 //     }else{
        location.divisionList=this.organizationDetailsModel.divisionList; }
        else if(location.divisionList!=null && this.organizationDetailsModel.divisionList.jobMasterMappingId==''){
          location.divisionList.fromDate = this.payrollAreaFromDate;
          location.divisionList.toDate = this.payrollAreaToDate;
        }}
//    }else{location.divisionList=null}

      if(this.filteredDepartmentList.length>0 ) {
        if( location.departmentList!=null && this.organizationDetailsModel.departmentList.jobMasterMappingId!='' ){
   //   if(location.departmentList!=null) {location.departmentList.employeeJobMappingId='';
    //  }else{
        location.departmentList=this.organizationDetailsModel.departmentList;      }
        else if(location.departmentList!=null && this.organizationDetailsModel.departmentList.jobMasterMappingId==''){
          location.departmentList.fromDate = this.payrollAreaFromDate;
          location.departmentList.toDate = this.payrollAreaToDate;
        }}
  //  }
      if(this.filteredSubDepartmentList.length>0 ){
        if(location.subDepartmentList!=null  && this.organizationDetailsModel.subDepartmentList.jobMasterMappingId!=''){
    //  if(location.subDepartmentList!=null) {location.subDepartmentList.employeeJobMappingId='';
    //  }else{
      location.subDepartmentList=this.organizationDetailsModel.subDepartmentList;      }
      else if(location.subDepartmentList!=null && this.organizationDetailsModel.subDepartmentList.jobMasterMappingId==''){
        location.subDepartmentList.fromDate = this.payrollAreaFromDate;
        location.subDepartmentList.toDate = this.payrollAreaToDate;
      }}
//    }else{location.subDepartmentList=null}

      if(this.filteredSubAreaList.length>0 ){
        if(location.subAreaList!=null  && this.organizationDetailsModel.subAreaList.jobMasterMappingId!=''){
     // if(location.subAreaList!=null)  {location.subAreaList.employeeJobMappingId='';
    //  }else{
      location.subAreaList=this.organizationDetailsModel.subAreaList;}
      else if(location.subAreaList!=null && this.organizationDetailsModel.subAreaList.jobMasterMappingId==''){
        location.subAreaList.fromDate = this.payrollAreaFromDate;
        location.subAreaList.toDate = this.payrollAreaToDate;
      }}
 //   }else{location.subAreaList=null}

      if(this.filteredCostCenterList.length>0){
        if(location.costCenterList!=null && this.organizationDetailsModel.costCenterList.jobMasterMappingId!='' ){
    //  if(location.costCenterList!=null) { location.costCenterList.employeeJobMappingId='';
 //     }else{
   location.costCenterList=this.organizationDetailsModel.costCenterList;}
   else if(location.costCenterList!=null && this.organizationDetailsModel.costCenterList.jobMasterMappingId==''){
    location.costCenterList.fromDate = this.payrollAreaFromDate;
    location.costCenterList.toDate = this.payrollAreaToDate;
  }}
  //  }else{location.costCenterList=null}

      if(this.filteredSubCostCenterList.length>0 ){
        if(location.subCostCenterList && this.organizationDetailsModel.subCostCenterList.jobMasterMappingId!=''){
   //   if(location.subCostCenterList!=null) { location.subCostCenterList.employeeJobMappingId='';
    //  }else{
       location.subCostCenterList=this.organizationDetailsModel.subCostCenterList;}
       else if(location.subCostCenterList!=null && this.organizationDetailsModel.subCostCenterList.jobMasterMappingId==''){
        location.subCostCenterList.fromDate = this.payrollAreaFromDate;
        location.subCostCenterList.toDate = this.payrollAreaToDate;
      }}
  //  }else{location.subCostCenterList=null}

      if(this.filteredProfitCenterList.length>0){
        if(location.profitCenterList!=null && this.organizationDetailsModel.profitCenterList.jobMasterMappingId!=''){
   //   if(location.profitCenterList!=null){ location.profitCenterList.employeeJobMappingId='';
    //  }else{
      location.profitCenterList=this.organizationDetailsModel.profitCenterList;}
      else if(location.profitCenterList!=null && this.organizationDetailsModel.profitCenterList.jobMasterMappingId==''){
        location.profitCenterList.fromDate = this.payrollAreaFromDate;
        location.profitCenterList.toDate = this.payrollAreaToDate;
      }}
   // }else{location.profitCenterList=null}

      if(this.filteredJob1List.length>0){
        if(location.job1List!=null && this.organizationDetailsModel.job1List.jobMasterMappingId!=''){
   //   if(location.job1List!=null) { location.job1List.employeeJobMappingId='';
   //   }else{
      location.job1List=this.organizationDetailsModel.job1List;}
      else if(location.job1List!=null && this.organizationDetailsModel.job1List.jobMasterMappingId==''){
        location.job1List.fromDate = this.payrollAreaFromDate;
        location.job1List.toDate = this.payrollAreaToDate;
      }}
   // }else{location.job1List=null}

      if(this.filteredJob2List.length>0){
      if( location.job2List!=null && this.organizationDetailsModel.job2List.jobMasterMappingId!='') {
    //  if(location.job2List!=null){  location.job2List.employeeJobMappingId='';
   //   }else{
       location.job2List=this.organizationDetailsModel.job2List;}
       else if(location.job2List!=null && this.organizationDetailsModel.job2List.jobMasterMappingId==''){
        location.job2List.fromDate = this.payrollAreaFromDate;
        location.job2List.toDate = this.payrollAreaToDate;
      }}
   // }else{location.job2List=null}

      if(this.filteredJob3List.length>0){
        if(location.job3List!=null && this.organizationDetailsModel.job3List.jobMasterMappingId!=''){
   //   if(location.job3List!=null) { location.job3List.employeeJobMappingId='';
 //     }else{  
   location.job3List=this.organizationDetailsModel.job3List;}
   else if(location.job3List!=null && this.organizationDetailsModel.job3List.jobMasterMappingId==''){
    location.job3List.fromDate = this.payrollAreaFromDate;
    location.job3List.toDate = this.payrollAreaToDate;
  }}
 //   }else{location.job3List=null}

      if(this.filteredJob4List.length>0 ){
      if(location.job4List!=null && this.organizationDetailsModel.job4List.jobMasterMappingId!=''){
   //   if(location.job4List!=null) { location.job4List.employeeJobMappingId='';
   //   }else{ 
     location.job4List=this.organizationDetailsModel.job4List;}
     else if(location.job4List!=null && this.organizationDetailsModel.job4List.jobMasterMappingId==''){
      location.job4List.fromDate = this.payrollAreaFromDate;
      location.job4List.toDate = this.payrollAreaToDate;
    }}
   /// }else{location.job4List=null}

       if(this.filteredJob5List.length>0 ){
        if(location.job5List!=null && this.organizationDetailsModel.job5List.jobMasterMappingId!=''){
      // if(location.job5List!=null) { location.job5List.employeeJobMappingId='';   
     //  }else{
        location.job5List=this.organizationDetailsModel.job5List;}
        else if(location.job5List!=null && this.organizationDetailsModel.job5List.jobMasterMappingId==''){
          location.job5List.fromDate = this.payrollAreaFromDate;
          location.job5List.toDate = this.payrollAreaToDate;
        }}
     // }else{location.job5List=null}

       if(this.filteredEstablishmentList.length>0){
       if( location.establishmentList!=null && this.organizationDetailsModel.establishmentList.jobMasterMappingId!='') {
     //  if(location.establishmentList!=null) { location.establishmentList.employeeJobMappingId='';
    //    } else{ 
      location.establishmentList=this.organizationDetailsModel.establishmentList;}
      else if(location.establishmentList!=null && this.organizationDetailsModel.establishmentList.jobMasterMappingId==''){
        location.establishmentList.fromDate = this.payrollAreaFromDate;
        location.establishmentList.toDate = this.payrollAreaToDate;
      }}
    //  }else{location.establishmentList=null}

     

      location.designation1List=null;
        location.designation2List=null;
        location.gradeList=null;
        location.position1List=null;
        location.position2List=null;
        location.position3List=null;
        location.position4List=null;
        location.position5List=null;
        location.typeList=null;
        location.statusList=null;
        location.taxCategoryList=null;

       }
      
      if (location) {
        if(location.divisionList!=null) {  
          let divId = this.filteredDivisionList.find(x=>x.jobMasterMappingId==location.divisionList.jobMasterMappingId);
          if(divId!=null){
          this.organizationDetailsModel.divisionList=location.divisionList;
          this.organizationDetailsModel.divisionList.fromDate= new Date(this.organizationDetailsModel.divisionList.fromDate);
          this.organizationDetailsModel.divisionList.toDate = new Date(this.organizationDetailsModel.divisionList.toDate);
        }else{this.organizationDetailsModel.divisionList=new JobDetailsDTO('','','','','','')}}
         if(location.subLocationList!=null){          
          let subLocationId = this.filteredSubLocationList.find(x=>x.jobMasterMappingId==location.subLocationList.jobMasterMappingId);
          if(subLocationId!=null){
        this.organizationDetailsModel.subLocationList=location.subLocationList;
        this.organizationDetailsModel.subLocationList.fromDate= new Date(this.organizationDetailsModel.subLocationList.fromDate);
        this.organizationDetailsModel.subLocationList.toDate= new Date(this.organizationDetailsModel.subLocationList.toDate);
        }else{this.organizationDetailsModel.subLocationList=new JobDetailsDTO('','','','','','')}}

        if(location.workLocationList!=null){   
          let workLocationId = this.filteredWorkLocationList.find(x=>x.jobMasterMappingId==location.workLocationList.jobMasterMappingId);
          if(workLocationId!=null){       
          this.organizationDetailsModel.workLocationList=location.workLocationList;
          this.organizationDetailsModel.workLocationList.fromDate=new Date(this.organizationDetailsModel.workLocationList.fromDate);
          this.organizationDetailsModel.workLocationList.toDate=new Date(this.organizationDetailsModel.workLocationList.toDate)
        }else{this.organizationDetailsModel.workLocationList=new JobDetailsDTO('','','','','','')}}
       if(location.businessAreaList!=null){   
        let businessAreaId = this.filteredBusinessAreaList.find(x=>x.jobMasterMappingId==location.businessAreaList.jobMasterMappingId);
          if(businessAreaId!=null){             
          this.organizationDetailsModel.businessAreaList=location.businessAreaList;
          this.organizationDetailsModel.businessAreaList.fromDate=new Date(this.organizationDetailsModel.businessAreaList.fromDate);
          this.organizationDetailsModel.businessAreaList.toDate=new Date(this.organizationDetailsModel.businessAreaList.toDate);
        }else{this.organizationDetailsModel.businessAreaList=new JobDetailsDTO('','','','','','')}}
        if(location.subAreaList!=null){  
          let subAreaId = this.filteredSubAreaList.find(x=>x.jobMasterMappingId==location.subAreaList.jobMasterMappingId);
          if(subAreaId!=null){         
          this.organizationDetailsModel.subAreaList=location.subAreaList;
          this.organizationDetailsModel.subAreaList.fromDate=new Date(this.organizationDetailsModel.subAreaList.fromDate);
          this.organizationDetailsModel.subAreaList.toDate=new Date(this.organizationDetailsModel.subAreaList.toDate);
        }else{this.organizationDetailsModel.subAreaList=new JobDetailsDTO('','','','','','')}}
        if(location.strategicBusinessAreaList!=null){   
          let strategicbusinessAreaId = this.filteredStrategicBusinessAreaList.find(x=>x.jobMasterMappingId==location.strategicBusinessAreaList.jobMasterMappingId);
          if(strategicbusinessAreaId!=null){          
          this.organizationDetailsModel.strategicBusinessAreaList=location.strategicBusinessAreaList;
          this.organizationDetailsModel.strategicBusinessAreaList.fromDate= new Date(this.organizationDetailsModel.strategicBusinessAreaList.fromDate);
          this.organizationDetailsModel.strategicBusinessAreaList.toDate= new Date(this.organizationDetailsModel.strategicBusinessAreaList.toDate);
        }else{this.organizationDetailsModel.strategicBusinessAreaList=new JobDetailsDTO('','','','','','')}}
       
        if(location.departmentList!=null){  
          let departmentId = this.filteredDepartmentList.find(x=>x.jobMasterMappingId==location.departmentList.jobMasterMappingId);
          if(departmentId!=null){        
          this.organizationDetailsModel.departmentList=location.departmentList;
          this.organizationDetailsModel.departmentList.fromDate= new Date(this.organizationDetailsModel.departmentList.fromDate)
          this.organizationDetailsModel.departmentList.toDate= new Date(this.organizationDetailsModel.departmentList.toDate)
        }else{this.organizationDetailsModel.departmentList=new JobDetailsDTO('','','','','','')}}
        if(location.subDepartmentList!=null){
          let subDepartmentId = this.filteredSubDepartmentList.find(x=>x.jobMasterMappingId==location.subDepartmentList.jobMasterMappingId);
          if(subDepartmentId!=null){              
          this.organizationDetailsModel.subDepartmentList=location.subDepartmentList;
          this.organizationDetailsModel.subDepartmentList.fromDate= new Date(this.organizationDetailsModel.subDepartmentList.fromDate)
          this.organizationDetailsModel.subDepartmentList.toDate= new Date(this.organizationDetailsModel.subDepartmentList.toDate)
        }else{this.organizationDetailsModel.subDepartmentList=new JobDetailsDTO('','','','','','')}}
        if(location.costCenterList!=null){          
          let costCenterId = this.filteredSubDepartmentList.find(x=>x.jobMasterMappingId==location.costCenterList.jobMasterMappingId);
          if(costCenterId!=null){ 
          this.organizationDetailsModel.costCenterList=location.costCenterList;
          this.organizationDetailsModel.costCenterList.fromDate= new Date(this.organizationDetailsModel.costCenterList.fromDate)
          this.organizationDetailsModel.costCenterList.toDate= new Date(this.organizationDetailsModel.costCenterList.toDate)
        }else{this.organizationDetailsModel.costCenterList=new JobDetailsDTO('','','','','','')}}
        if(location.subCostCenterList!=null){       
          let subCostCenterId = this.filteredSubCostCenterList.find(x=>x.jobMasterMappingId==location.subCostCenterList.jobMasterMappingId);
          if(subCostCenterId!=null){ 
          this.organizationDetailsModel.subCostCenterList=location.subCostCenterList;
          this.organizationDetailsModel.subCostCenterList.fromDate= new Date(this.organizationDetailsModel.subCostCenterList.fromDate)
          this.organizationDetailsModel.subCostCenterList.toDate= new Date(this.organizationDetailsModel.subCostCenterList.toDate)
        }else{this.organizationDetailsModel.subCostCenterList=new JobDetailsDTO('','','','','','')}}
        if(location.profitCenterList!=null){    
          let profitCenterId = this.filteredProfitCenterList.find(x=>x.jobMasterMappingId==location.profitCenterList.jobMasterMappingId);
          if(profitCenterId!=null){    
          this.organizationDetailsModel.profitCenterList=location.profitCenterList;
          this.organizationDetailsModel.profitCenterList.fromDate= new Date(this.organizationDetailsModel.profitCenterList.fromDate)
          this.organizationDetailsModel.profitCenterList.toDate= new Date(this.organizationDetailsModel.profitCenterList.toDate)
        }else{this.organizationDetailsModel.profitCenterList=new JobDetailsDTO('','','','','','')}}
        if(location.establishmentList!=null){
         
          this.organizationDetailsModel.establishmentList=location.establishmentList;
          this.organizationDetailsModel.establishmentList.fromDate=new Date(this.organizationDetailsModel.establishmentList.fromDate)
          this.organizationDetailsModel.establishmentList.toDate=new Date(this.organizationDetailsModel.establishmentList.toDate)
        }
        if(location.job1List!=null){         
          let job1Id = this.filteredJob1List.find(x=>x.jobMasterMappingId==location.job1List.jobMasterMappingId);
          if(job1Id!=null){ 
          this.organizationDetailsModel.job1List=location.job1List;
          this.organizationDetailsModel.job1List.fromDate= new Date(this.organizationDetailsModel.job1List.fromDate)
          this.organizationDetailsModel.job1List.toDate= new Date(this.organizationDetailsModel.job1List.toDate)
        }else{this.organizationDetailsModel.job1List=new JobDetailsDTO('','','','','','')}}
        if(location.job2List!=null){    
          let job2Id = this.filteredJob2List.find(x=>x.jobMasterMappingId==location.job2List.jobMasterMappingId);
          if(job2Id!=null){       
          this.organizationDetailsModel.job2List=location.job2List;
          this.organizationDetailsModel.job2List.fromDate= new Date(this.organizationDetailsModel.job2List.fromDate)
          this.organizationDetailsModel.job2List.toDate= new Date(this.organizationDetailsModel.job2List.toDate)
        }else{this.organizationDetailsModel.job2List=new JobDetailsDTO('','','','','','')}}
        if(location.job3List!=null){          
          let job3Id = this.filteredJob3List.find(x=>x.jobMasterMappingId==location.job3List.jobMasterMappingId);
          if(job3Id!=null){      
          this.organizationDetailsModel.job3List=location.job3List;
          this.organizationDetailsModel.job3List.fromDate= new Date(this.organizationDetailsModel.job3List.fromDate)
          this.organizationDetailsModel.job3List.toDate= new Date(this.organizationDetailsModel.job3List.toDate)
        }else{this.organizationDetailsModel.job3List=new JobDetailsDTO('','','','','','')}}
        if(location.job4List!=null){      
          let job4Id = this.filteredJob4List.find(x=>x.jobMasterMappingId==location.job4List.jobMasterMappingId);
          if(job4Id!=null){    
          this.organizationDetailsModel.job4List=location.job4List;
          this.job4Code=this.organizationDetailsModel.job4List.masterCode;
          this.organizationDetailsModel.job4List.fromDate= new Date(this.organizationDetailsModel.job4List.fromDate)
          this.organizationDetailsModel.job4List.toDate= new Date(this.organizationDetailsModel.job4List.toDate)
        }else{this.organizationDetailsModel.job4List=new JobDetailsDTO('','','','','','')}}
        if(location.job5List!=null){  
          let job5Id = this.filteredJob5List.find(x=>x.jobMasterMappingId==location.job5List.jobMasterMappingId);
          if(job5Id!=null){        
          this.organizationDetailsModel.job5List=location.job5List;
          this.organizationDetailsModel.job5List.fromDate= new Date(this.organizationDetailsModel.job5List.fromDate)
          this.organizationDetailsModel.job5List.toDate= new Date(this.organizationDetailsModel.job5List.toDate)
        }else{this.organizationDetailsModel.job4List=new JobDetailsDTO('','','','','','')}}
        

       
        //dates conversion

              //  establishment
        if (this.organizationDetailsModel.establishmentList.description != "") {
          const estFromDate = this.OrganizationForm.get('establishmentFromDateControl');
          estFromDate.enable();
          const estToDate = this.OrganizationForm.get('establishmentToDateControl');
          estToDate.enable();

          this.ValidateEstDatesSave();
        }
        else {
          this.disableEstablishmentDates();
        }

        //sub location
        if (this.organizationDetailsModel.subLocationList.description!= "") {
          const subLocFromDate = this.OrganizationForm.get('subLocationFromDateControl');
          subLocFromDate.enable();
          const subLocToDate = this.OrganizationForm.get('subLocationToDateControl');
          subLocToDate.enable();

          this.validateSBUDatesSave();
        }
        else {
          this.disableSubLocationDates();
        }

        //work location
        if (this.organizationDetailsModel.workLocationList.description!= "") {
          const workLocFromDate = this.OrganizationForm.get('workLocationFromDateControl');
          workLocFromDate.enable();
          const workLocToDate = this.OrganizationForm.get('workLocationToDateControl');
          workLocToDate.enable();

          this.validateWorkLocSave();
        }
        else {
          this.disableWorkLocationDates();
        }

        //business area
        if (this.organizationDetailsModel.businessAreaList.description!= "") {
          const baFromDate = this.OrganizationForm.get('businessAreaFromDateControl');
          baFromDate.enable();
          const baToDate = this.OrganizationForm.get('businessAreaToDateControl');
          baToDate.enable();

          this.validateBusiDatesSave();
        }
        else {
          this.disableBusinessAreaDates();
        }

        //sub area
        if (this.organizationDetailsModel.subAreaList.description!= "") {
          const subAreaFromDate = this.OrganizationForm.get('subAreaFromDateControl');
          subAreaFromDate.enable();
          const subAreaToDate = this.OrganizationForm.get('subAreaToDateControl');
          subAreaToDate.enable();

          this.validateSubAreaDatesSave();
        }
        else {
          this.disableSubAreaDates();
        }

        //strategic business
        if (this.organizationDetailsModel.strategicBusinessAreaList.description!= "") {
          const sbuFromDate = this.OrganizationForm.get('strategicBusinessFromDateControl');
          sbuFromDate.enable();
          const sbuToDate = this.OrganizationForm.get('strategicBusinessToDateControl');
          sbuToDate.enable();

          this.validateBusiDatesSave();
        }
        else {
          this.disableStrategicDates();
        }

        //division
        if (this.organizationDetailsModel.divisionList.description!= "") {
          const divisionFromDate = this.OrganizationForm.get('divisionFromDateControl');
          divisionFromDate.enable();
          const divisionToDate = this.OrganizationForm.get('divisionToDateControl');
          divisionToDate.enable();

          this.validateDivisionDatesSave();
        }
        else {
          this.disableDivisionDates();
        }

        //department
        if (this.organizationDetailsModel.departmentList.description != "") {
          const departmentFromDate = this.OrganizationForm.get('departmentFromDateControl');
          departmentFromDate.enable();
          const departmentToDate = this.OrganizationForm.get('departmentToDateControl');
          departmentToDate.enable();

          this.validateDepartmentDatesSave();
        }
        else {
          this.disableDepartmentDates();
        }

        //sub department
        if (this.organizationDetailsModel.subDepartmentList.description!= "") {
          const subdepFromDate = this.OrganizationForm.get('subDepartmentFromDateControl');
          subdepFromDate.enable();
          const subdepToDate = this.OrganizationForm.get('subDepartmentToDateControl');
          subdepToDate.enable();

          this.validateSubDepDatesSave();
        }
        else {
          this.disableSubDepartmentDates();
        }

        //cost center
        if (this.organizationDetailsModel.costCenterList.description != "") {
          const costFromDate = this.OrganizationForm.get('costCentreFromDateControl');
          costFromDate.enable();
          const costToDate = this.OrganizationForm.get('costCentreToDateControl');
          costToDate.enable();

          this.validateCostDatesSave();
        }
        else {
          this.disableCostDates();
        }

        //sub cost center
        if (this.organizationDetailsModel.subCostCenterList.description != "") {
          const subCostFromDate = this.OrganizationForm.get('subCostCentreFromDateControl');
          subCostFromDate.enable();
          const subCostToDate = this.OrganizationForm.get('subCostCentreToDateControl');
          subCostToDate.enable();

          this.validateSubCostDatesSave();
        }
        else {
          this.disableSubCostDates();
        }

        //profit center
        if (this.organizationDetailsModel.profitCenterList.description!= "") {
          const profitFromDate = this.OrganizationForm.get('profitCentreFromDateControl');
          profitFromDate.enable();
          const profitCostToDate = this.OrganizationForm.get('profitCentreToDateControl');
          profitCostToDate.enable();

          this.validateProfitDatesSave();
        }
        else {
          this.disableProfitDates();
        }

       
        //job1
        if (this.organizationDetailsModel.job1List.description!= "") {
          const job1FromDate = this.OrganizationForm.get('job1FromDateControl');
          job1FromDate.enable();
          const job1ToDate = this.OrganizationForm.get('job1ToDateControl');
          job1ToDate.enable();

          this.validateJob1DatesSave();
        }
        else {
          this.disableJob1Dates();
        }
        
         //job2
        if (this.organizationDetailsModel.job2List.description!= "") {
          const job2FromDate = this.OrganizationForm.get('job2FromDateControl');
          job2FromDate.enable();
          const job2ToDate = this.OrganizationForm.get('job2ToDateControl');
          job2ToDate.enable();

          this.validateJob2DatesSave();
        }
        else {
          this.disableJob2Dates();
        }

        //job3
        if (this.organizationDetailsModel.job3List.description!= "") {
          const job3FromDate = this.OrganizationForm.get('job3FromDateControl');
          job3FromDate.enable();
          const job3ToDate = this.OrganizationForm.get('job3ToDateControl');
          job3ToDate.enable();

          this.validateJob3DatesSave();
        }
        else {
          this.disableJob3Dates();
        }

        //job4
        if (this.organizationDetailsModel.job4List.description!= "") {
          const job4FromDate = this.OrganizationForm.get('job4FromDateControl');
          job4FromDate.enable();
          const job4ToDate = this.OrganizationForm.get('job4ToDateControl');
          job4ToDate.enable();

          this.validateJob4DatesSave();
        }
        else {
          this.disableJob4Dates();
        }

        //job5
        if (this.organizationDetailsModel.job5List.description!= "") {
          const job5FromDate = this.OrganizationForm.get('job5FromDateControl');
          job5FromDate.enable();
          const job5ToDate = this.OrganizationForm.get('job5ToDateControl');
          job5ToDate.enable();

          this.validateJob5DatesSave();
        }
        else {
          this.disableJob5Dates();
        }
     
          
     }

},
  (error: any) => {

    this.resetOrganizationForm();
  })
     

      
    // if(copyFrom!='copyFrom'){
  
    // if (this.payrollAreaList.length == 1) {
    //   this.payrollAreaCode = this.payrollAreaList[0].payrollAreaCode;
    //   localStorage.setItem('jobInformationPayrollAreaCode', this.payrollAreaCode);
    //   // this.payrollAreaCode = this.payrollAreaList[0];
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
    // }
    this.OrganizationForm.markAsUntouched();
}

  // organizationSaveNextSubmit(organizationDetailsModel){
  //   this.saveNextBoolean = true;

  //   this.OrganizationFormSubmit(organizationDetailsModel);


  OrganizationFormSubmit(organizationDetailsModel) {
    // console.log('orgnizationDaeValue',this.OrganizationForm.get('establishmentToDateControl').value);
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
    if(this.organizationDetailsModel.subLocationList!=null){
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
    if(organizationDetailsModel.establishmentList!=null){
      organizationDetailsModel.establishmentList.fromDate = this.datepipe.transform(organizationDetailsModel.establishmentList.fromDate, "dd-MMM-yyyy");
        organizationDetailsModel.establishmentList.toDate = this.datepipe.transform(organizationDetailsModel.establishmentList.toDate, "dd-MMM-yyyy");
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
    if(organizationDetailsModel.designation1List!=null){
      organizationDetailsModel.designation1List.fromDate = this.datepipe.transform(organizationDetailsModel.designation1List.fromDate, "dd-MMM-yyyy");
      organizationDetailsModel.designation1List.toDate = this.datepipe.transform(organizationDetailsModel.designation1List.toDate, "dd-MMM-yyyy");
      }
    if(organizationDetailsModel.designation2List!=null){
        organizationDetailsModel.designation2List.fromDate = this.datepipe.transform(organizationDetailsModel.designation2List.fromDate, "dd-MMM-yyyy");
        organizationDetailsModel.designation2List.toDate = this.datepipe.transform(organizationDetailsModel.designation2List.toDate, "dd-MMM-yyyy");
        }
        
    if(organizationDetailsModel.gradeList!=null){
          organizationDetailsModel.gradeList.fromDate = this.datepipe.transform(organizationDetailsModel.gradeList.fromDate, "dd-MMM-yyyy");
          organizationDetailsModel.gradeList.toDate = this.datepipe.transform(organizationDetailsModel.gradeList.toDate, "dd-MMM-yyyy");
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
                    }
    if(organizationDetailsModel.job1List!=null){
                      organizationDetailsModel.job1List.fromDate = this.datepipe.transform(organizationDetailsModel.job1List.fromDate, "dd-MMM-yyyy");
                      organizationDetailsModel.job1List.toDate = this.datepipe.transform(organizationDetailsModel.job1List.toDate, "dd-MMM-yyyy");
                      }
    if(organizationDetailsModel.job2List!=null){
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
    
    this.JobInformationService.postOrganizationDetails(organizationDetailsModel).subscribe(res => {

      this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
      this.organizationDetailsModel = res.data.results[0];
      this.EventEmitterService.getJobSummaryInitiate('organization');
      //redirecting page to summary page
      this.router.navigate(['/employee-master/job-information/job-summary']);
    }, (error: any) => {
      this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
    })
    this.OrganizationForm.markAsUntouched();
  }

 
  validateSubLocToDate(event) {
    if(event){
    if (this.organizationDetailsModel.subLocationList.toDate == '' || this.organizationDetailsModel.subLocationList.toDate == null) {
      this.organizationDetailsModel.subLocationList.toDate = this.payrollAreaToDate;
      const subToDate = this.OrganizationForm.get('subLocationToDateControl');
      subToDate.enable();
    }
  }
}
  validateEstablishmentToDate(event){
    if(event){
    if (this.organizationDetailsModel.establishmentList.toDate == '' || this.organizationDetailsModel.establishmentList.toDate == null) {
      this.organizationDetailsModel.establishmentList.toDate = this.payrollAreaToDate;
      const subToDate = this.OrganizationForm.get('establishmentToDateControl');
      subToDate.enable();
    }
    }
  }



  validatSubLocSave() {
    if(this.organizationDetailsModel.subLocationList.fromDate==''){
      this.organizationDetailsModel.subLocationList.fromDate = this.payrollAreaFromDate
      this.organizationDetailsModel.subLocationList.toDate = this.payrollAreaToDate
    }
   
    this.OrganizationForm.controls['subLocationFromDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls.subLocationFromDateControl.updateValueAndValidity();
    this.OrganizationForm.controls['subLocationToDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls.subLocationToDateControl.updateValueAndValidity();
  }
  enableSubLocDate() {
    const subLocFromDate = this.OrganizationForm.get('subLocationFromDateControl');
    subLocFromDate.enable();
    const subLocToDate = this.OrganizationForm.get('subLocationToDateControl');
    subLocToDate.enable();
    if (this.organizationDetailsModel.subLocationList.masterCode == '' || this.organizationDetailsModel.subLocationList.masterCode == null) {
      this.organizationDetailsModel.subLocationList.fromDate = null;
      this.organizationDetailsModel.subLocationList.toDate = null;
      this.disableSubLocationDates();
    }
  }
  validateWorkLocToDate(event) {
    if(event){
    if (this.organizationDetailsModel.workLocationList.description != '' || this.organizationDetailsModel.workLocationList.description != null) {
      this.organizationDetailsModel.workLocationList.toDate = this.payrollAreaToDate;
      const workToDate = this.OrganizationForm.get('workLocationToDateControl');
      workToDate.enable();
    }
  }
  }
  validateWorkLocSave() {
    if(this.organizationDetailsModel.workLocationList.fromDate==''){
      this.organizationDetailsModel.workLocationList.fromDate = this.payrollAreaFromDate
      this.organizationDetailsModel.workLocationList.toDate = this.payrollAreaToDate
    }
    this.OrganizationForm.controls['workLocationFromDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls.workLocationFromDateControl.updateValueAndValidity();
    this.OrganizationForm.controls['workLocationToDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls.workLocationToDateControl.updateValueAndValidity();

  }
  enableWorkLocDate() {
    const workLocFromDate = this.OrganizationForm.get('workLocationFromDateControl');
    workLocFromDate.enable();
    const workLocToDate = this.OrganizationForm.get('workLocationToDateControl');
    workLocToDate.enable();
    if (this.organizationDetailsModel.workLocationList.masterCode == '' || this.organizationDetailsModel.workLocationList.masterCode == null) {
      this.organizationDetailsModel.workLocationList.fromDate = null;
      this.organizationDetailsModel.workLocationList.toDate = null;
      this.disableWorkLocationDates();
    }
  }
  validateBusinessAreaToDate(event) {
    if(event){
    if (this.organizationDetailsModel.businessAreaList.description != '' || this.organizationDetailsModel.businessAreaList.description != null) {
      this.organizationDetailsModel.businessAreaList.toDate = this.payrollAreaToDate;
      const baToDate = this.OrganizationForm.get('businessAreaToDateControl');
      baToDate.enable();
    }
  }
  }
  validateBusiDatesSave() {
    if(this.organizationDetailsModel.businessAreaList.fromDate==''){
      this.organizationDetailsModel.businessAreaList.fromDate = this.payrollAreaFromDate
      this.organizationDetailsModel.businessAreaList.toDate = this.payrollAreaToDate
    }

    this.OrganizationForm.controls['businessAreaFromDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls.businessAreaFromDateControl.updateValueAndValidity();
    this.OrganizationForm.controls['businessAreaToDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls.businessAreaToDateControl.updateValueAndValidity();

  }
  enableBusinessAreaDate() {
    const baFromDate = this.OrganizationForm.get('businessAreaFromDateControl');
    baFromDate.enable();
    const baToDate = this.OrganizationForm.get('businessAreaToDateControl');
    baToDate.enable();
    if (this.organizationDetailsModel.businessAreaList.masterCode == '' || this.organizationDetailsModel.businessAreaList.masterCode == null) {
      this.organizationDetailsModel.businessAreaList.fromDate = null;
      this.organizationDetailsModel.businessAreaList.toDate = null;
      this.disableBusinessAreaDates();
    }
  }

  enableEstDate(){
    const eFromDate = this.OrganizationForm.get('establishmentFromDateControl');
    eFromDate.enable();
    const eToDate = this.OrganizationForm.get('establishmentToDateControl');
    eToDate.enable();
    if (this.organizationDetailsModel.establishmentList.masterCode == '' || this.organizationDetailsModel.establishmentList.masterCode == null) {
      this.organizationDetailsModel.establishmentList.fromDate = null;
      this.organizationDetailsModel.establishmentList.toDate = null;
      this.disableEstDates();
    }
  }

 
 
  validateSubAreaToDate(event) {
    if(event){
    if (this.organizationDetailsModel.subAreaList.toDate == '' || this.organizationDetailsModel.subAreaList.toDate == null) {
      this.organizationDetailsModel.subAreaList.toDate = this.payrollAreaToDate;
      const subAreaToDate = this.OrganizationForm.get('subAreaToDateControl');
      subAreaToDate.enable();
    }
  }
  }
  validateSubAreaDatesSave() {
    if(this.organizationDetailsModel.subAreaList.fromDate==''){
      this.organizationDetailsModel.subAreaList.fromDate = this.payrollAreaFromDate
      this.organizationDetailsModel.subAreaList.toDate = this.payrollAreaToDate
    }
    this.OrganizationForm.controls['subAreaFromDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls.subAreaFromDateControl.updateValueAndValidity();
    this.OrganizationForm.controls['subAreaToDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls.subAreaToDateControl.updateValueAndValidity();

  }
  enableSubAreaDate() {
    const subAreaFromDate = this.OrganizationForm.get('subAreaFromDateControl');
    subAreaFromDate.enable();
    const subAreaToDate = this.OrganizationForm.get('subAreaToDateControl');
    subAreaToDate.enable();
    if (this.organizationDetailsModel.subAreaList.masterCode == '' || this.organizationDetailsModel.subAreaList.masterCode == null) {
      this.organizationDetailsModel.subAreaList.fromDate = null;
      this.organizationDetailsModel.subAreaList.toDate = null;
      this.disableSubAreaDates();
    }
  }
  validateStrategicToDate(event) {
    if(event){
    if (this.organizationDetailsModel.strategicBusinessAreaList.toDate == '' || this.organizationDetailsModel.strategicBusinessAreaList.toDate == null) {
      this.organizationDetailsModel.strategicBusinessAreaList.toDate = this.payrollAreaToDate;
      const sbuToDate = this.OrganizationForm.get('strategicBusinessToDateControl');
      sbuToDate.enable();
    }
      }
     }
     ValidateEstDatesSave(){
      if(this.organizationDetailsModel.establishmentList.fromDate==''){
        this.organizationDetailsModel.establishmentList.fromDate = this.payrollAreaFromDate
        this.organizationDetailsModel.establishmentList.toDate = this.payrollAreaToDate
      }
      this.OrganizationForm.controls['establishmentFromDateControl'].setValidators([Validators.required]);
      this.OrganizationForm.controls.establishmentFromDateControl.updateValueAndValidity();
      this.OrganizationForm.controls['establishmentToDateControl'].setValidators([Validators.required]);
      this.OrganizationForm.controls.establishmentToDateControl.updateValueAndValidity();
  
     }
  validateSBUDatesSave() {
    // if(this.organizationDetailsModel.strategicBusinessAreaList.fromDate==''){
    //   this.organizationDetailsModel.strategicBusinessAreaList.fromDate = this.payrollAreaFromDate
    //   this.organizationDetailsModel.strategicBusinessAreaList.toDate = this.payrollAreaToDate
    // }
    this.OrganizationForm.controls['strategicBusinessFromDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls.strategicBusinessFromDateControl.updateValueAndValidity();
    this.OrganizationForm.controls['strategicBusinessToDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls.strategicBusinessToDateControl.updateValueAndValidity();

  }
  enableStategicAreaDate() {
    const sbuFromDate = this.OrganizationForm.get('strategicBusinessFromDateControl');
    sbuFromDate.enable();
    const sbuToDate = this.OrganizationForm.get('strategicBusinessToDateControl');
    sbuToDate.enable();
    if (this.organizationDetailsModel.strategicBusinessAreaList.masterCode == '' || this.organizationDetailsModel.strategicBusinessAreaList.masterCode == null) {
      this.organizationDetailsModel.strategicBusinessAreaList.fromDate = null;
      this.organizationDetailsModel.strategicBusinessAreaList.toDate = null;
      this.disableStrategicDates();
    }
  }
  validateDivisionToDate(event) {
    if(event){
    if (this.organizationDetailsModel.divisionList.description != '' || this.organizationDetailsModel.divisionList.description != null) {
      this.organizationDetailsModel.divisionList.toDate = this.payrollAreaToDate;
      const divisionToDate = this.OrganizationForm.get('divisionToDateControl');
      divisionToDate.enable();
    }
  }
  }
  validateDivisionDatesSave() {
    if(this.organizationDetailsModel.divisionList.fromDate==''){
      this.organizationDetailsModel.divisionList.fromDate = this.payrollAreaFromDate
      this.organizationDetailsModel.divisionList.toDate = this.payrollAreaToDate
    }
    this.OrganizationForm.controls['divisionFromDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls.divisionFromDateControl.updateValueAndValidity();
    this.OrganizationForm.controls['divisionToDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls.divisionToDateControl.updateValueAndValidity();

  }
  enableDivisionDate() {
    const divisionFromDate = this.OrganizationForm.get('divisionFromDateControl');
    divisionFromDate.enable();
    const divisionToDate = this.OrganizationForm.get('divisionToDateControl');
    divisionToDate.enable();
    if (this.organizationDetailsModel.divisionList.masterCode == '' || this.organizationDetailsModel.divisionList.masterCode == null) {
      this.organizationDetailsModel.divisionList.fromDate = null;
      this.organizationDetailsModel.divisionList.toDate = null;
      this.disableDivisionDates();
    }
  }
  validateDepartmentToDate(event) {
    if(event){
    if (this.organizationDetailsModel.departmentList.toDate == '' || this.organizationDetailsModel.departmentList.toDate == null) {
      this.organizationDetailsModel.departmentList.toDate = this.payrollAreaToDate;
      const sbuToDate = this.OrganizationForm.get('departmentToDateControl');
      sbuToDate.enable();
    }
  }
  }
  validateDepartmentDatesSave() {
    if(this.organizationDetailsModel.departmentList.fromDate==''){
      this.organizationDetailsModel.departmentList.fromDate = this.payrollAreaFromDate
      this.organizationDetailsModel.departmentList.toDate = this.payrollAreaToDate
    }
    this.OrganizationForm.controls['departmentFromDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls.departmentFromDateControl.updateValueAndValidity();
    this.OrganizationForm.controls['departmentToDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls.departmentToDateControl.updateValueAndValidity();

  }
  enableDepartmentDate() {
    const departmentFromDate = this.OrganizationForm.get('departmentFromDateControl');
    departmentFromDate.enable();
    const departmentToDate = this.OrganizationForm.get('departmentToDateControl');
    departmentToDate.enable();
    if (this.organizationDetailsModel.departmentList.masterCode == '' || this.organizationDetailsModel.departmentList.masterCode == null) {
      this.organizationDetailsModel.departmentList.fromDate = null;
      this.organizationDetailsModel.departmentList.toDate = null;
      this.disableDepartmentDates();
    }
  }
  validateSubDepartmentToDate(event) {
    if(event){
    if (this.organizationDetailsModel.subDepartmentList.toDate == '' || this.organizationDetailsModel.subDepartmentList.toDate == null) {
      this.organizationDetailsModel.subDepartmentList.toDate =this.payrollAreaToDate;
      const subDepToDate = this.OrganizationForm.get('subDepartmentToDateControl');
      subDepToDate.enable();
    }
  }
  }
  validateSubDepDatesSave() {
    if(this.organizationDetailsModel.subDepartmentList.fromDate==''){
      this.organizationDetailsModel.subDepartmentList.fromDate = this.payrollAreaFromDate
      this.organizationDetailsModel.subDepartmentList.toDate = this.payrollAreaToDate
    }
    this.OrganizationForm.controls['subDepartmentFromDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls.subDepartmentFromDateControl.updateValueAndValidity();
    this.OrganizationForm.controls['subDepartmentToDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls.subDepartmentToDateControl.updateValueAndValidity();

  }
  enableSubDepartmentDate() {
    const subdepFromDate = this.OrganizationForm.get('subDepartmentFromDateControl');
    subdepFromDate.enable();
    const subdepToDate = this.OrganizationForm.get('subDepartmentToDateControl');
    subdepToDate.enable();
    if (this.organizationDetailsModel.subDepartmentList.masterCode == '' || this.organizationDetailsModel.subDepartmentList.masterCode == null) {
      this.organizationDetailsModel.subDepartmentList.fromDate = null;
      this.organizationDetailsModel.subDepartmentList.toDate = null;
      this.disableSubDepartmentDates();
    }
  }
  validateCostToDate(event) {
    if(event){
    if (this.organizationDetailsModel.costCenterList.toDate == '' || this.organizationDetailsModel.costCenterList.toDate == null) {
      this.organizationDetailsModel.costCenterList.toDate = this.payrollAreaToDate;
      const costToDate = this.OrganizationForm.get('costCentreToDateControl');
      costToDate.enable();
    }
  }
  }
  validateCostDatesSave() {
    if(this.organizationDetailsModel.costCenterList.fromDate==''){
      this.organizationDetailsModel.costCenterList.fromDate = this.payrollAreaFromDate
      this.organizationDetailsModel.costCenterList.toDate = this.payrollAreaToDate
    }

    this.OrganizationForm.controls['costCentreFromDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls.costCentreFromDateControl.updateValueAndValidity();
    this.OrganizationForm.controls['costCentreToDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls.costCentreToDateControl.updateValueAndValidity();

  }
  enableCostDate() {
    const costFromDate = this.OrganizationForm.get('costCentreFromDateControl');
    costFromDate.enable();
    const costToDate = this.OrganizationForm.get('costCentreToDateControl');
    costToDate.enable();
    if (this.organizationDetailsModel.costCenterList.masterCode == '' || this.organizationDetailsModel.costCenterList.masterCode == null) {
      this.organizationDetailsModel.costCenterList.fromDate = null;
      this.organizationDetailsModel.costCenterList.toDate = null;
      this.disableCostDates();
    }
  }
  validateSubCostToDate() {
    if (this.organizationDetailsModel.subCostCenterList.toDate == '' || this.organizationDetailsModel.subCostCenterList.toDate == null) {
      this.organizationDetailsModel.subCostCenterList.toDate = this.payrollAreaToDate;
      const subCostToDate = this.OrganizationForm.get('subCostCentreToDateControl');
      subCostToDate.enable();
    }
  }
  validateSubCostDatesSave() {
    if(this.organizationDetailsModel.subCostCenterList.fromDate==''){
      this.organizationDetailsModel.subCostCenterList.fromDate = this.payrollAreaFromDate
      this.organizationDetailsModel.subCostCenterList.toDate = this.payrollAreaToDate
    }
    this.OrganizationForm.controls['subCostCentreFromDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls.subCostCentreFromDateControl.updateValueAndValidity();
    this.OrganizationForm.controls['subCostCentreToDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls.subCostCentreToDateControl.updateValueAndValidity();

  }
  enableSubCostDate() {

    const subCostFromDate = this.OrganizationForm.get('subCostCentreFromDateControl');
    subCostFromDate.enable();
    const subCostToDate = this.OrganizationForm.get('subCostCentreToDateControl');
    subCostToDate.enable();
    if (this.organizationDetailsModel.subCostCenterList.masterCode == '' || this.organizationDetailsModel.subCostCenterList.masterCode == null) {
      this.organizationDetailsModel.subCostCenterList.fromDate = null;
      this.organizationDetailsModel.subCostCenterList.toDate = null;
      this.disableSubCostDates();
    
  }
  }
  validateProfitToDate() {
    if (this.organizationDetailsModel.profitCenterList.toDate == '' || this.organizationDetailsModel.profitCenterList.toDate == null) {
      this.organizationDetailsModel.profitCenterList.toDate = this.payrollAreaToDate;
      const subCostToDate = this.OrganizationForm.get('profitCentreToDateControl');
      subCostToDate.enable();
    }
  }
  validateProfitDatesSave() {
    if(this.organizationDetailsModel.profitCenterList.fromDate==''){
      this.organizationDetailsModel.profitCenterList.fromDate = this.payrollAreaFromDate
      this.organizationDetailsModel.profitCenterList.toDate = this.payrollAreaToDate
    }
    this.OrganizationForm.controls['profitCentreFromDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls.profitCentreFromDateControl.updateValueAndValidity();
    this.OrganizationForm.controls['profitCentreToDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls.profitCentreToDateControl.updateValueAndValidity();

  }

 

  enableProfitDate() {
    const profitFromDate = this.OrganizationForm.get('profitCentreFromDateControl');
    profitFromDate.enable();
    const profitCostToDate = this.OrganizationForm.get('profitCentreToDateControl');
    profitCostToDate.enable();
    if (this.organizationDetailsModel.profitCenterList.masterCode == '' || this.organizationDetailsModel.profitCenterList.masterCode == null) {
      this.organizationDetailsModel.profitCenterList.fromDate = null;
      this.organizationDetailsModel.profitCenterList.toDate = null;
      this.disableProfitDates();
    }
  }
 
  subLocationObject(sublocation) {

    const toSelect = this.filteredSubLocationList.find(
      (c) => c.masterCode === this.OrganizationForm.get('subLocationMasterIdControl').value
    );
    this.organizationDetailsModel.subLocationList.description = toSelect.masterDescription;
    this.organizationDetailsModel.subLocationList.jobMasterMappingId = toSelect.jobMasterMappingId;
    this.OrganizationForm.get('subLocationMasterIdControl').setValue(toSelect.masterCode);
    this.enableSubLocDate()
  }
  workLocationObject(worklocation) {


    const toSelect = this.filteredWorkLocationList.find(
      (c) => c.masterCode === this.OrganizationForm.get('workLocationMasterIdControl').value
    );
    this.organizationDetailsModel.workLocationList.description = toSelect.masterDescription;
    this.organizationDetailsModel.workLocationList.jobMasterMappingId = toSelect.jobMasterMappingId;
    this.OrganizationForm.get('workLocationMasterIdControl').setValue(toSelect.masterCode);

    this.enableWorkLocDate()
  }
  businessAreaObject(businessarea) {

    const toSelect = this.filteredBusinessAreaList.find(
      (c) => c.masterCode === this.OrganizationForm.get('businessAreaMasterIdControl').value
    );
    this.organizationDetailsModel.businessAreaList.description = toSelect.masterDescription;
    this.organizationDetailsModel.businessAreaList.jobMasterMappingId = toSelect.jobMasterMappingId;
    this.OrganizationForm.get('businessAreaMasterIdControl').setValue(toSelect.masterCode);

    this.enableBusinessAreaDate()

  }

  establishmentObject(est){
    const toSelect = this.filteredEstablishmentList.find(
      (c) => c.establishmentCode === this.OrganizationForm.get('establishmentMasterIdControl').value
    );
    this.organizationDetailsModel.establishmentList.description = toSelect.description;
    this.organizationDetailsModel.establishmentList.jobMasterMappingId = toSelect.establishmentMasterId;
    this.OrganizationForm.get('establishmentMasterIdControl').setValue(toSelect.establishmentCode);

    this.enableEstDate()
  }
  subAreaObject(subarea) {


    const toSelect = this.filteredSubAreaList.find(
      (c) => c.masterCode === this.OrganizationForm.get('subAreaIdControl').value
    );
    this.organizationDetailsModel.subAreaList.description = toSelect.masterDescription;
    this.organizationDetailsModel.subAreaList.jobMasterMappingId = toSelect.jobMasterMappingId;
    this.OrganizationForm.get('subAreaIdControl').setValue(toSelect.masterCode);

    this.enableSubAreaDate();
  }
  strategicObject(strategic) {

    const toSelect = this.filteredStrategicBusinessAreaList.find(
      (c) => c.masterCode === this.OrganizationForm.get('strategicBusinessUnitIdControl').value
    );
    this.organizationDetailsModel.strategicBusinessAreaList.description = toSelect.masterDescription;
    this.organizationDetailsModel.strategicBusinessAreaList.jobMasterMappingId = toSelect.jobMasterMappingId;
    this.OrganizationForm.get('strategicBusinessUnitIdControl').setValue(toSelect.masterCode);
    this.enableStategicAreaDate();
  }
  divisionObject(division) {


    const toSelect = this.filteredDivisionList.find(
      (c) => c.masterCode === this.OrganizationForm.get('divisionMasterIdControl').value
    );
    this.organizationDetailsModel.divisionList.description = toSelect.masterDescription;
    this.organizationDetailsModel.divisionList.jobMasterMappingId = toSelect.jobMasterMappingId;
    this.OrganizationForm.get('divisionMasterIdControl').setValue(toSelect.masterCode);

    this.enableDivisionDate();
  }
  departmentObject(department) {

    const toSelect = this.filteredDepartmentList.find(
      (c) => c.masterCode === this.OrganizationForm.get('departmentMasterIdControl').value
    );
    this.organizationDetailsModel.departmentList.description = toSelect.masterDescription;
    this.organizationDetailsModel.departmentList.jobMasterMappingId = toSelect.jobMasterMappingId;
    this.OrganizationForm.get('departmentMasterIdControl').setValue(toSelect.masterCode);

    this.enableDepartmentDate();
  }
  sunDepartmentObject(subdepartment) {


    const toSelect = this.filteredSubDepartmentList.find(
      (c) => c.masterCode === this.OrganizationForm.get('subDepartmentMasterIdControl').value
    );
    this.organizationDetailsModel.subDepartmentList.description = toSelect.masterDescription;
    this.organizationDetailsModel.subDepartmentList.jobMasterMappingId = toSelect.jobMasterMappingId;
    this.OrganizationForm.get('subDepartmentMasterIdControl').setValue(toSelect.masterCode);

    this.enableSubDepartmentDate();
  }
  costObject(cost) {
    const toSelect = this.filteredCostCenterList.find(
      (c) => c.masterCode === this.OrganizationForm.get('costCentreIdControl').value
    );
    this.organizationDetailsModel.costCenterList.description = toSelect.masterDescription;
    this.organizationDetailsModel.costCenterList.jobMasterMappingId = toSelect.jobMasterMappingId;
    this.OrganizationForm.get('costCentreIdControl').setValue(toSelect.masterCode);

    this.enableCostDate();
  }
  subCostObject(subcost) {

    const toSelect = this.filteredSubCostCenterList.find(
      (c) => c.masterCode === this.OrganizationForm.get('subCostCentreIdControl').value
    );
    this.organizationDetailsModel.subCostCenterList.description = toSelect.masterDescription;
    this.organizationDetailsModel.subCostCenterList.jobMasterMappingId = toSelect.jobMasterMappingId;
    this.OrganizationForm.get('subCostCentreIdControl').setValue(toSelect.masterCode);

    this.enableSubCostDate();
  }
  profitObject(profit) {
    const toSelect = this.filteredProfitCenterList.find(
      (c) => c.masterCode === this.OrganizationForm.get('profitCentreMasterIdControl').value
    );
    this.organizationDetailsModel.profitCenterList.description = toSelect.masterDescription;
    this.organizationDetailsModel.profitCenterList.jobMasterMappingId = toSelect.jobMasterMappingId;
    this.OrganizationForm.get('profitCentreMasterIdControl').setValue(toSelect.masterCode);

    this.enableProfitDate();
  }

  disableEstablishmentDates() {
    const establishmentFromDate = this.OrganizationForm.get('establishmentFromDateControl');
    establishmentFromDate.disable();
    const establishmentToDate = this.OrganizationForm.get('establishmentToDateControl');
    establishmentToDate.disable();
  }
 
  disableSubLocationDates() {
    const subLocationFromDate = this.OrganizationForm.get('subLocationFromDateControl');
    subLocationFromDate.disable();
    const subLocationToDate = this.OrganizationForm.get('subLocationToDateControl');
    subLocationToDate.disable();
  }
  SearchSubLocation(subLocationCode) {
    this.organizationDetailsModel.subLocationList.description = null;
    this.organizationDetailsModel.subLocationList.fromDate = null;
    this.organizationDetailsModel.subLocationList.toDate = null;

    this.disableSubLocationDates();

    let filtered: any[] = [];
    let query = subLocationCode.query;
    for (let i = 0; i < this.subLocationList.length; i++) {
      let country = this.subLocationList[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredSubLocationList = filtered;
  }

  disableWorkLocationDates() {
    const workLocationFromDate = this.OrganizationForm.get('workLocationFromDateControl');
    workLocationFromDate.disable();
    const workLocationToDate = this.OrganizationForm.get('workLocationToDateControl');
    workLocationToDate.disable();
  }
  SearchWorkLocation(workLocationCode) {
    this.organizationDetailsModel.workLocationList.description = null;
    this.organizationDetailsModel.workLocationList.fromDate = null;
    this.organizationDetailsModel.workLocationList.toDate = null;

    this.disableWorkLocationDates();

    let filtered: any[] = [];
    let query = workLocationCode.query;
    for (let i = 0; i < this.workLocationList.length; i++) {
      let country = this.workLocationList[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredWorkLocationList = filtered;

  }

  disableBusinessAreaDates() {
    const businessAreaFromDate = this.OrganizationForm.get('businessAreaFromDateControl');
    businessAreaFromDate.disable();
    const businessAreaToDate = this.OrganizationForm.get('businessAreaToDateControl');
    businessAreaToDate.disable();
  }

  disableEstDates(){
    const businessAreaFromDate = this.OrganizationForm.get('businessAreaFromDateControl');
    businessAreaFromDate.disable();
    const businessAreaToDate = this.OrganizationForm.get('businessAreaToDateControl');
    businessAreaToDate.disable();
  }
  SearchBusinessArea(businessAreaCode) {
    this.organizationDetailsModel.businessAreaList.description = null;
    this.organizationDetailsModel.businessAreaList.fromDate = null;
    this.organizationDetailsModel.businessAreaList.toDate = null;

    this.disableBusinessAreaDates();

    let filtered: any[] = [];
    let query = businessAreaCode.query;
    for (let i = 0; i < this.businessAreaList.length; i++) {
      let country = this.businessAreaList[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredBusinessAreaList = filtered;
  }

  disableSubAreaDates() {
    const subAreaFromDate = this.OrganizationForm.get('subAreaFromDateControl');
    subAreaFromDate.disable();
    const subAreaToDate = this.OrganizationForm.get('subAreaToDateControl');
    subAreaToDate.disable();
  }
  SearchSubArea(subAreaCode) {
    this.organizationDetailsModel.subAreaList.description = null;
    this.organizationDetailsModel.subAreaList.fromDate = null;
    this.organizationDetailsModel.subAreaList.toDate = null;

    this.disableSubAreaDates();

    let filtered: any[] = [];
    let query = subAreaCode.query;
    for (let i = 0; i < this.subAreaList.length; i++) {
      let country = this.subAreaList[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredSubAreaList = filtered;
  }

  disableStrategicDates() {
    const strategicBusinessFromDate = this.OrganizationForm.get('strategicBusinessFromDateControl');
    strategicBusinessFromDate.disable();
    const strategicBusinessToDate = this.OrganizationForm.get('strategicBusinessToDateControl');
    strategicBusinessToDate.disable();
  }
  SearchStrategic(strategicBusinessCode) {
    this.organizationDetailsModel.strategicBusinessAreaList.description = null;
    this.organizationDetailsModel.strategicBusinessAreaList.fromDate = null;
    this.organizationDetailsModel.strategicBusinessAreaList.toDate = null;


    this.disableStrategicDates();

    let filtered: any[] = [];
    let query = strategicBusinessCode.query;
    for (let i = 0; i < this.strategicBusinessAreaList.length; i++) {
      let country = this.strategicBusinessAreaList[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredStrategicBusinessAreaList = filtered;
  }

  disableDivisionDates() {
    const divisionFromDate = this.OrganizationForm.get('divisionFromDateControl');
    divisionFromDate.disable();
    const divisionToDate = this.OrganizationForm.get('divisionToDateControl');
    divisionToDate.disable();
  }
  SearchDivision(divisionCode) {
    this.organizationDetailsModel.divisionList.description = null;
    this.organizationDetailsModel.divisionList.fromDate = null;
    this.organizationDetailsModel.divisionList.toDate = null;

    this.disableDivisionDates();

    let filtered: any[] = [];
    let query = divisionCode.query;
    for (let i = 0; i < this.divisionList.length; i++) {
      let country = this.divisionList[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredDivisionList = filtered;
  }

  disableDepartmentDates() {
    const departmentFromDate = this.OrganizationForm.get('departmentFromDateControl');
    departmentFromDate.disable();
    const departmentToDate = this.OrganizationForm.get('departmentToDateControl');
    departmentToDate.disable();
  }
  SearchDepartment(departmentCode) {
    this.departmentDescription = null;
    this.organizationDetailsModel.departmentList.fromDate = null;
    this.organizationDetailsModel.departmentList.toDate = null;

    this.disableDepartmentDates();

    let filtered: any[] = [];
    let query = departmentCode.query;
    for (let i = 0; i < this.departmentList.length; i++) {
      let country = this.departmentList[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredDepartmentList = filtered;
  }

  disableSubDepartmentDates() {
    const subDepartmentFromDate = this.OrganizationForm.get('subDepartmentFromDateControl');
    subDepartmentFromDate.disable();
    const subDepartmentToDate = this.OrganizationForm.get('subDepartmentToDateControl');
    subDepartmentToDate.disable();
  }
  SearchSubDepartment(subDepartmentCode) {
    this.subDepDescription = null;
    this.organizationDetailsModel.subDepartmentList.fromDate = null;
    this.organizationDetailsModel.subDepartmentList.toDate = null;

    this.disableSubDepartmentDates();

    let filtered: any[] = [];
    let query = subDepartmentCode.query;
    for (let i = 0; i < this.subDepartmentList.length; i++) {
      let country = this.subDepartmentList[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredSubDepartmentList = filtered;
  }
  disableCostDates() {
    const costCentreFromDate = this.OrganizationForm.get('costCentreFromDateControl');
    costCentreFromDate.disable();
    const costCentreToDate = this.OrganizationForm.get('costCentreToDateControl');
    costCentreToDate.disable();
  }
  SearchCost(costCentreCode) {
    this.costDescription = null;
    this.organizationDetailsModel.costCenterList.fromDate = null;
    this.organizationDetailsModel.costCenterList.toDate = null;

    this.disableCostDates();

    let filtered: any[] = [];
    let query = costCentreCode.query;
    for (let i = 0; i < this.costCenterList.length; i++) {
      let country = this.costCenterList[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredCostCenterList = filtered;
  }
  disableSubCostDates() {
    const subCostCentreFromDate = this.OrganizationForm.get('subCostCentreFromDateControl');
    subCostCentreFromDate.disable();
    const subCostCentreToDate = this.OrganizationForm.get('subCostCentreToDateControl');
    subCostCentreToDate.disable();
  }
  SearchSubCost(subCostCentreCode) {

    this.subCostDescription = null;
    this.organizationDetailsModel.subCostCenterList.fromDate = null;
    this.organizationDetailsModel.subCostCenterList.toDate = null;

    this.disableSubCostDates();

    let filtered: any[] = [];
    let query = subCostCentreCode.query;
    for (let i = 0; i < this.subCostCenterList.length; i++) {
      let country = this.subCostCenterList[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredSubCostCenterList = filtered;
  }
  

  disableProfitDates() {
    const profitCentreFromDate = this.OrganizationForm.get('profitCentreFromDateControl');
    profitCentreFromDate.disable();
    const profitCentreToDate = this.OrganizationForm.get('profitCentreToDateControl');
    profitCentreToDate.disable();
  }
  SearchProfit(profitCentreCode) {

    this.profitDescription = null;
    this.organizationDetailsModel.profitCenterList.fromDate = null;
    this.organizationDetailsModel.profitCenterList.toDate = null;

    this.disableProfitDates();

    let filtered: any[] = [];
    let query = profitCentreCode.query;
    for (let i = 0; i < this.profitCenterList.length; i++) {
      let country = this.profitCenterList[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredProfitCenterList = filtered;
  }

  

  SearchJob1(event){
    this.organizationDetailsModel.job1List.description = null;
    this.organizationDetailsModel.job1List.fromDate = null;
    this.organizationDetailsModel.job1List.toDate = null;

    this.disableJob1Dates();

    let filtered: any[] = [];
    let query = this.job1Code.query;
    for (let i = 0; i < this.job1List.length; i++) {
      let country = this.job1List[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredJob1List = filtered;
  }
  disableJob1Dates(){
    const job1FromDate = this.OrganizationForm.get('job1FromDateControl');
    job1FromDate.disable();
    const job1ToDate = this.OrganizationForm.get('job1ToDateControl');
    job1ToDate.disable();
  } 

   validateJob1DatesSave()   {
    if(this.organizationDetailsModel.job1List.fromDate==''){
      this.organizationDetailsModel.job1List.fromDate = this.payrollAreaFromDate
      this.organizationDetailsModel.job1List.toDate = this.payrollAreaToDate
    }
    this.OrganizationForm.controls['job1FromDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls.job1FromDateControl.updateValueAndValidity();
    this.OrganizationForm.controls['job1ToDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls.job1ToDateControl.updateValueAndValidity();

   }
  job1Object(job){
    const toSelect = this.filteredJob1List.find(
      (c) => c.masterCode === this.OrganizationForm.get('job1IdControl').value
    );
    this.organizationDetailsModel.job1List.description = toSelect.masterDescription;
    this.organizationDetailsModel.job1List.jobMasterMappingId = toSelect.jobMasterMappingId;
    this.OrganizationForm.get('job1IdControl').setValue(toSelect.masterCode);

    this.enableJob1Date();
  }
  validateJob1ToDate(event){
    if(event){
    if (this.organizationDetailsModel.job1List.toDate == '' || this.organizationDetailsModel.job1List.toDate == null) {
      this.organizationDetailsModel.job1List.toDate = this.payrollAreaToDate;
      const job1ToDate = this.OrganizationForm.get('job1ToDateControl');
      job1ToDate.enable();
    }
    }
  }
  enableJob1Date() {
    const job1FromDate = this.OrganizationForm.get('job1FromDateControl');
    job1FromDate.enable();
    const job1ToDate = this.OrganizationForm.get('job1ToDateControl');
    job1ToDate.enable();
    if (this.organizationDetailsModel.job1List.masterCode == '' || this.organizationDetailsModel.job1List.masterCode == null) {
      this.organizationDetailsModel.job1List.fromDate = null;
      this.organizationDetailsModel.job1List.toDate = null;
      this.disableJob1Dates();
    }
  }

  SearchJob2(event){
    this.organizationDetailsModel.job2List.description = null;
    this.organizationDetailsModel.job2List.fromDate = null;
    this.organizationDetailsModel.job2List.toDate = null;

    this.disableJob2Dates();

    let filtered: any[] = [];
    let query = this.job2Code.query;
    for (let i = 0; i < this.job2List.length; i++) {
      let country = this.job2List[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredJob2List = filtered;
  }
  disableJob2Dates(){
    const job2FromDate = this.OrganizationForm.get('job2FromDateControl');
    job2FromDate.disable();
    const job2ToDate = this.OrganizationForm.get('job2ToDateControl');
    job2ToDate.disable();
  } 

   validateJob2DatesSave()   {

    if(this.organizationDetailsModel.job2List.fromDate==''){
      this.organizationDetailsModel.job2List.fromDate = this.payrollAreaFromDate
      this.organizationDetailsModel.job2List.toDate = this.payrollAreaToDate
    }
    this.OrganizationForm.controls['job2FromDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls.job2FromDateControl.updateValueAndValidity();
    this.OrganizationForm.controls['job2ToDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls.job2ToDateControl.updateValueAndValidity();

   }
  job2Object(job){
    const toSelect = this.filteredJob2List.find(
      (c) => c.masterCode === this.OrganizationForm.get('job2IdControl').value
    );
    this.organizationDetailsModel.job2List.description = toSelect.masterDescription;
    this.organizationDetailsModel.job2List.jobMasterMappingId = toSelect.jobMasterMappingId;
    this.OrganizationForm.get('job2IdControl').setValue(toSelect.masterCode);

    this.enableJob2Date();
  }
  validateJob2ToDate(event){
    if(event){
    if (this.organizationDetailsModel.job2List.toDate == '' || this.organizationDetailsModel.job2List.toDate == null) {
      this.organizationDetailsModel.job2List.toDate = this.payrollAreaToDate;
      const job2ToDate = this.OrganizationForm.get('job2ToDateControl');
      job2ToDate.enable();
    }
    }
  }
  enableJob2Date() {
    const job2FromDate = this.OrganizationForm.get('job2FromDateControl');
    job2FromDate.enable();
    const job2ToDate = this.OrganizationForm.get('job2ToDateControl');
    job2ToDate.enable();
    if (this.organizationDetailsModel.job2List.masterCode == '' || this.organizationDetailsModel.job2List.masterCode == null) {
      this.organizationDetailsModel.job2List.fromDate = null;
      this.organizationDetailsModel.job2List.toDate = null;
      this.disableJob2Dates();
    }
  }

  SearchJob3(event){
    this.organizationDetailsModel.job3List.description = null;
    this.organizationDetailsModel.job3List.fromDate = null;
    this.organizationDetailsModel.job3List.toDate = null;

    this.disableJob3Dates();

    let filtered: any[] = [];
    let query = this.job3Code.query;
    for (let i = 0; i < this.job3List.length; i++) {
      let country = this.job3List[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredJob3List = filtered;
  }
  disableJob3Dates(){
    const job3FromDate = this.OrganizationForm.get('job3FromDateControl');
    job3FromDate.disable();
    const job3ToDate = this.OrganizationForm.get('job3ToDateControl');
    job3ToDate.disable();
  } 

   validateJob3DatesSave()   {
    if(this.organizationDetailsModel.job3List.fromDate==''){
      this.organizationDetailsModel.job3List.fromDate = this.payrollAreaFromDate
      this.organizationDetailsModel.job3List.toDate = this.payrollAreaToDate
    }
    this.OrganizationForm.controls['job3FromDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls.job3FromDateControl.updateValueAndValidity();
    this.OrganizationForm.controls['job3ToDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls.job3ToDateControl.updateValueAndValidity();

   }
  job3Object(job){
    const toSelect = this.filteredJob3List.find(
      (c) => c.masterCode === this.OrganizationForm.get('job3IdControl').value
    );
    this.organizationDetailsModel.job3List.description = toSelect.masterDescription;
    this.organizationDetailsModel.job3List.jobMasterMappingId = toSelect.jobMasterMappingId;
    this.OrganizationForm.get('job3IdControl').setValue(toSelect.masterCode);

    this.enableJob3Date();
  }
  validateJob3ToDate(event){
    if(event){
    if (this.organizationDetailsModel.job3List.toDate == '' || this.organizationDetailsModel.job3List.toDate == null) {
      this.organizationDetailsModel.job3List.toDate = this.payrollAreaToDate;
      const job3ToDate = this.OrganizationForm.get('job3ToDateControl');
      job3ToDate.enable();
    }
    }
  }
  enableJob3Date() {
    const job3FromDate = this.OrganizationForm.get('job3FromDateControl');
    job3FromDate.enable();
    const job3ToDate = this.OrganizationForm.get('job3ToDateControl');
    job3ToDate.enable();
    if (this.organizationDetailsModel.job3List.masterCode == '' || this.organizationDetailsModel.job3List.masterCode == null) {
      this.organizationDetailsModel.job3List.fromDate = null;
      this.organizationDetailsModel.job3List.toDate = null;
      this.disableJob3Dates();
    }
  }

  SearchJob4(event){
    this.organizationDetailsModel.job4List.description = null;
    this.organizationDetailsModel.job4List.fromDate = null;
    this.organizationDetailsModel.job4List.toDate = null;

    this.disableJob4Dates();

    let filtered: any[] = [];
    let query = this.job4Code.query;
    for (let i = 0; i < this.job4List.length; i++) {
      let country = this.job4List[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredJob4List = filtered;
  }
  disableJob4Dates(){
    const job4FromDate = this.OrganizationForm.get('job4FromDateControl');
    job4FromDate.disable();
    const job4ToDate = this.OrganizationForm.get('job4ToDateControl');
    job4ToDate.disable();
  } 

   validateJob4DatesSave()   {
    if(this.organizationDetailsModel.job4List.fromDate==''){
      this.organizationDetailsModel.job4List.fromDate = this.payrollAreaFromDate
      this.organizationDetailsModel.job4List.toDate = this.payrollAreaToDate
    }
    this.OrganizationForm.controls['job4FromDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls.job4FromDateControl.updateValueAndValidity();
    this.OrganizationForm.controls['job4ToDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls.job4ToDateControl.updateValueAndValidity();

   }
  job4Object(job){
    const toSelect = this.filteredJob4List.find(
      (c) => c.masterCode === this.OrganizationForm.get('job4IdControl').value
    );
    this.organizationDetailsModel.job4List.description = toSelect.masterDescription;
    this.organizationDetailsModel.job4List.jobMasterMappingId = toSelect.jobMasterMappingId;
    this.OrganizationForm.get('job4IdControl').setValue(toSelect.masterCode);

    this.enableJob4Date();
  }
  validateJob4ToDate(event){
    if(event){
    if (this.organizationDetailsModel.job4List.toDate == '' || this.organizationDetailsModel.job4List.toDate == null) {
      this.organizationDetailsModel.job4List.toDate = this.payrollAreaToDate;
      const job4ToDate = this.OrganizationForm.get('job4ToDateControl');
      job4ToDate.enable();
    }
  }
  }
  enableJob4Date() {
    const job4FromDate = this.OrganizationForm.get('job4FromDateControl');
    job4FromDate.enable();
    const job4ToDate = this.OrganizationForm.get('job4ToDateControl');
    job4ToDate.enable();
    if (this.organizationDetailsModel.job4List.masterCode == '' || this.organizationDetailsModel.job4List.masterCode == null) {
      this.organizationDetailsModel.job4List.fromDate = null;
      this.organizationDetailsModel.job4List.toDate = null;
      this.disableJob4Dates();
    }
  }

  SearchJob5(event){
    this.organizationDetailsModel.job5List.description = null;
    this.organizationDetailsModel.job5List.fromDate = null;
    this.organizationDetailsModel.job5List.toDate = null;

    this.disableJob5Dates();

    let filtered: any[] = [];
    let query = this.job5Code.query;
    for (let i = 0; i < this.job5List.length; i++) {
      let country = this.job5List[i];
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredJob5List = filtered;
  }
  disableJob5Dates(){
    const job5FromDate = this.OrganizationForm.get('job5FromDateControl');
    job5FromDate.disable();
    const job5ToDate = this.OrganizationForm.get('job5ToDateControl');
    job5ToDate.disable();
  } 

   validateJob5DatesSave()   {
    if(this.organizationDetailsModel.job5List.fromDate==''){
      this.organizationDetailsModel.job5List.fromDate = this.payrollAreaFromDate
      this.organizationDetailsModel.job5List.toDate = this.payrollAreaToDate
    }
    this.OrganizationForm.controls['job5FromDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls.job5FromDateControl.updateValueAndValidity();
    this.OrganizationForm.controls['job5ToDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls.job5ToDateControl.updateValueAndValidity();

   }
  job5Object(job){
    const toSelect = this.filteredJob5List.find(
      (c) => c.masterCode === this.OrganizationForm.get('job5IdControl').value
    );
    this.organizationDetailsModel.job5List.description = toSelect.masterDescription;
    this.organizationDetailsModel.job5List.jobMasterMappingId = toSelect.jobMasterMappingId;
    this.OrganizationForm.get('job5IdControl').setValue(toSelect.masterCode);

    this.enableJob5Date();
  }
  validateJob5ToDate(event){
    if(event){
    if (this.organizationDetailsModel.job5List.toDate == '' || this.organizationDetailsModel.job5List.toDate == null) {
      this.organizationDetailsModel.job5List.toDate = this.payrollAreaToDate;
      const job5ToDate = this.OrganizationForm.get('job5ToDateControl');
      job5ToDate.enable();
    }
    }
  }
  enableJob5Date() {
    const job5FromDate = this.OrganizationForm.get('job5FromDateControl');
    job5FromDate.enable();
    const job5ToDate = this.OrganizationForm.get('job5ToDateControl');
    job5ToDate.enable();
    if (this.organizationDetailsModel.job5List.masterCode == '' || this.organizationDetailsModel.job5List.masterCode == null) {
      this.organizationDetailsModel.job5List.fromDate = null;
      this.organizationDetailsModel.job5List.toDate = null;
      this.disableJob5Dates();
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
    this.resetList()
    this.resetDTO()
    this.resetOrganizationForm();
    this.getJobList();

   this.JobInformationService.getAvailableJobMappingId(this.employeeMasterId).subscribe(res=>{
        this.availablePayrollIds=res.data.results[0];
        this.availablePayrollIds.filter((item)=>{
        const k =this.filteredPayrollAreaList.find((c)=>c.payrollAreaId===item)
        this.copyFromFilteredList.push(k);   }) 
        this.copyFromFilteredList = this.copyFromFilteredList.filter(x=>x.payrollAreaId!=this.payrollAreaId)
      })
   // this.getJobDetails();
  }
  filterEstablishmentAreaArea(event){
    const toSelect = this.filteredEstablishmentList.find(
      (c) => c.establishmentMasterId === event
    );
    
    this.establishmentCode=toSelect.establishmentCode;
    this.OrganizationForm.get('establishmentControl').setValue(toSelect.establishmentCode);
  }
  selectEstablishmentArea(event){
    const toSelect = this.filteredEstablishmentList.find(
      (c) => c.establishmentCode === event
    );
    this.establishmentMasterId=toSelect.establishmentMasterId;
    this.establishmentCode=toSelect.establishmentCode;
    
  }
 
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
       this.payrollAreaFromDate= new Date(this.payrollAreaList[0].payrollAreaFromDate) > this.joiningDate ? new Date(this.payrollAreaList[0].payrollAreaFromDate):this.joiningDate;
       this.payrollAreaToDate= new Date(this.payrollAreaList[0].payrollAreaToDate);

      // toSelect.effectiveFromDate > joiningDate ? toSelect.effectiveFromDate : joiningDate;
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
          (c) => c.payrollAreaId === Number(this.payrollAreaId)
        );
        this.payrollAreaFromDate=  new Date(toSelect.payrollAreaFromDate) > this.joiningDate ? new Date(toSelect.payrollAreaFromDate):this.joiningDate;new Date(toSelect.payrollAreaFromDate);
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
resetList(){
  
  this.filteredSubLocationList=[];
  this.filteredWorkLocationList=[];
  this.filteredBusinessAreaList=[];
  this.filteredSubAreaList=[];
  this.filteredStrategicBusinessAreaList=[];
  this.filteredDivisionList=[];
  this.filteredDepartmentList=[];
  this.filteredSubDepartmentList=[];
  this.filteredCostCenterList=[];
  this.filteredSubCostCenterList=[];
  this.filteredProfitCenterList=[];
  this.filteredEstablishmentList=[];

  this.filteredJob1List=[];
  this.filteredJob2List=[];
  this.filteredJob3List=[];
  this.filteredJob4List=[];
  this.filteredJob5List=[];
}
resetDTO(){
  this.organizationDetailsModel = new OrganizationDetailsModel('','',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null) ;
  this.organizationDetailsModel.departmentList=new JobDetailsDTO('','','','','','')
  this.organizationDetailsModel.establishmentList=new JobDetailsDTO('','','','','','')
  this.organizationDetailsModel.subLocationList =new JobDetailsDTO('','','','','','')
  this.organizationDetailsModel.workLocationList =new JobDetailsDTO('','','','','','')
  this.organizationDetailsModel.businessAreaList =new JobDetailsDTO('','','','','','')
  this.organizationDetailsModel.subAreaList =new JobDetailsDTO('','','','','','')
  this.organizationDetailsModel.strategicBusinessAreaList =new JobDetailsDTO('','','','','','')
  this.organizationDetailsModel.divisionList =new JobDetailsDTO('','','','','','')
  this.organizationDetailsModel.departmentList =new JobDetailsDTO('','','','','','')
  this.organizationDetailsModel.subDepartmentList=new JobDetailsDTO('','','','','','')
  this.organizationDetailsModel.subAreaList =new JobDetailsDTO('','','','','','')
  this.organizationDetailsModel.costCenterList=new JobDetailsDTO('','','','','','')
  this.organizationDetailsModel.subCostCenterList =new JobDetailsDTO('','','','','','')
  this.organizationDetailsModel.profitCenterList =new JobDetailsDTO('','','','','','')
  this.organizationDetailsModel.job1List= new JobDetailsDTO('','','','','','')
  this.organizationDetailsModel.job2List= new JobDetailsDTO('','','','','','')
  this.organizationDetailsModel.job3List= new JobDetailsDTO('','','','','','')
  this.organizationDetailsModel.job4List= new JobDetailsDTO('','','','','','')
  this.organizationDetailsModel.job5List= new JobDetailsDTO('','','','','','')

}
  resetOrganizationForm() {
//this.OrganizationForm.reset();
this.OrganizationForm.markAsPristine()
    //set fields to null for -form clearing
   // this.employeeOrganizationDetailId = 0;
   //this.OrganizationForm.controls['establishmentFromDateControl'].setValidators([Validators.nullValidator]);
   
   // this.establishmentDescription = null;
    // this.organizationDetailsModel.subLocationList.description = null;
    // this.workLocationDescription = null;
    // this.businessAreaDescription = null;
    // this.subAreaDescription = null;
    // this.strategicDescription = null;
    // this.organizationDetailsModel.divisionList.description = null;
    // this.departmentDescription = null;
    // this.subDepDescription = null;
    // this.costDescription = null;
    // this.subCostDescription = null;
    // this.profitDescription = null;
   


  //  disable dates
    this.disableBusinessAreaDates();
    this.disableCostDates();
    this.disableDepartmentDates();
    this.disableDivisionDates();
    this.disableEstablishmentDates();
    this.disableStrategicDates();
    this.disableSubAreaDates();
    this.disableSubCostDates();
    this.disableSubDepartmentDates();
    this.disableSubLocationDates();
    this.disableWorkLocationDates();
    this.disableProfitDates();
    this.disableJob1Dates();
    this.disableJob2Dates();
    this.disableJob3Dates();
    this.disableJob4Dates();
    this.disableJob5Dates();
  }

  selectCopyFrom(){
    this.payCode= this.OrganizationForm.get('copyFromControl').value;
  this.getOrganizationForm(this.payCode,'copyFrom');
  }

  checkEst(){
    if(this.organizationDetailsModel.establishmentList!=null)
    if(this.organizationDetailsModel.establishmentList.toDate!='')
    return true;
    return false;
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
    this.JobInformationService.getSummaryDetails(Number(this.payrollAreaId),this.employeeMasterId,summaryType,jobId,jobDetail).subscribe(res => {

      if (res.data.results[0]) { 
       
       this.historyData = res.data.results[0];

      }
    }, (error: any) => {

     

    })
    // this.historyData[0] = this.summaryGridData.find(x=>x.value==data)
  }
  
  }

 
