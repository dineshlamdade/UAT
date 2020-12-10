import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, RequiredValidator } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { OrganizationDetailsModel } from './../../../dto-models/organization-details.model';
import { EventEmitterService } from './../../../employee-master-services/event-emitter/event-emitter.service';
import { JobInformationService } from '../../../employee-master-services/job-information.service';
import { SharedInformationService } from '../../../employee-master-services/shared-service/shared-information.service';
import { PayrollAreaInformationService } from './../../../employee-master-services/payroll-area-information.service';

@Component({
  selector: 'app-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.scss']
})
export class OrganizationDetailComponent implements OnInit {

  OrganizationForm: FormGroup;
  tomorrow = new Date();
  organizationDetailsModel = new OrganizationDetailsModel(null, null,null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
  employeeMasterId: number;
  joiningDate: any;
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

  payrollAreaList: Array<any> = [];

  establishmentList: Array<any> = [];
  subLocationList: Array<any> = [];
  workLocationList: Array<any> = [];
  businessAreaList: Array<any> = [];
  subAreaList: Array<any> = [];
  strategicBusinessAreaList: Array<any> = [];
  divisionList: Array<any> = [];
  departmentList: Array<any> = [];
  subDepartmentList: Array<any> = [];
  costCenterList: Array<any> = [];
  subCostCenterList: Array<any> = [];
  profitCenterList: Array<any> = [];

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

  establishmentDescription: any;
  establishmentCode: any;
  subLocationDescription: any;
  subLocationCode: any;
  workLocationDescription: any;
  workLocationCode: any;
  businessAreaDescription: any;
  businessAreaCode: any;
  subAreaDescription: any;
  subAreaCode: any;
  strategicDescription: any;
  strategicCode: any;
  divisionDescription: any;
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

  payrollAreaCode:'';

  constructor(public datepipe: DatePipe,
    private EventEmitterService: EventEmitterService, private JobInformationService: JobInformationService,
    private formBuilder: FormBuilder,private PayrollAreaService: PayrollAreaInformationService,private CommonDataService: SharedInformationService) {
    this.tomorrow.setDate(this.tomorrow.getDate());

  }

  ngOnInit(): void {

    this.OrganizationForm = this.formBuilder.group({

      establishmentMasterIdControl: [''],
      establishmentFromDateControl: [{ value: null, disabled: true }],
      establishmentToDateControl: [{ value: null, disabled: true }],

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
      profitCentreToDateControl: [{ value: null, disabled: true }]

    });

    this.payrollAreaCode=null;
    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);

    const joiningDate = localStorage.getItem('joiningDate');
   this.joiningDate = new Date(joiningDate);

    //get payroll area's
    debugger
   this.getPayrollAreaInformation();
   
    this.JobInformationService.getEstaDetails().subscribe(res => {
      this.establishmentList = [];
      this.establishmentList = res.data.results;
      this.filteredEstablishmentList = res.data.results;
    })

  
    this.JobInformationService.getOtherMasterDetails().subscribe(res => {
      this.subLocationList = [];
      this.workLocationList = [];
      this.businessAreaList = [];
      this.subAreaList = [];
      this.strategicBusinessAreaList = [];
      this.divisionList = [];
      this.departmentList = [];
      this.subAreaList = [];
      this.costCenterList = [];
      this.subCostCenterList = [];
      this.profitCenterList = [];

      const location = res.data.results.filter((item) => {

        if (item.masterType == 'SubLocationMaster') {
          this.subLocationList.push(item);
          this.filteredSubLocationList.push(item);
        }
        if (item.masterType == 'WorkLocationMaster') {
          this.workLocationList.push(item);
          this.filteredWorkLocationList.push(item);
        }
        if (item.masterType == 'BusinessAreaMaster') {
          this.businessAreaList.push(item);
          this.filteredBusinessAreaList.push(item);
        }
        if (item.masterType == 'SubArea') {
          this.subAreaList.push(item);
          this.filteredSubAreaList.push(item);
        }
        if (item.masterType == 'StrategicBusinessUnit') {
          this.strategicBusinessAreaList.push(item);
          this.filteredStrategicBusinessAreaList.push(item);
        }
        if (item.masterType == 'DivisionMaster') {
          this.divisionList.push(item);
          this.filteredDivisionList.push(item);
        }
        if (item.masterType == 'DepartmentMaster') {
          this.departmentList.push(item);
          this.filteredDepartmentList.push(item);
        }
        if (item.masterType == 'SubDepartment') {
          this.subDepartmentList.push(item);
          this.filteredSubDepartmentList.push(item);
        }
        if (item.masterType == 'CostCentre') {
          this.costCenterList.push(item);
          this.filteredCostCenterList.push(item);
        }
        if (item.masterType == 'SubCostCenter') {
          this.subCostCenterList.push(item);
          this.filteredSubCostCenterList.push(item);
        }
        if (item.masterType == 'ProfitCentreMaster') {
          this.profitCenterList.push(item);
          this.filteredProfitCenterList.push(item);
        }
      });

    })

    this.getOrganizationForm()
  }
  getOrganizationForm() {
    
    debugger
    this.JobInformationService.getOrganizationDetails(this.employeeMasterId,this.payrollAreaCode).subscribe(res => {

      this.employeeOrganizationDetailId = res.data.results[0].employeeOrganizationDetailId;
      if (res.data.results[0]) {

        this.organizationDetailsModel = res.data.results[0];

        this.organizationDetailsModel.businessAreaFromDate = new Date(res.data.results[0].businessAreaFromDate);
        this.organizationDetailsModel.businessAreaToDate = new Date(res.data.results[0].businessAreaToDate);

        this.organizationDetailsModel.establishmentFromDate = new Date(res.data.results[0].establishmentFromDate);
        this.organizationDetailsModel.establishmentToDate = new Date(res.data.results[0].establishmentToDate);

        this.organizationDetailsModel.subLocationFromDate = new Date(res.data.results[0].subLocationFromDate);
        this.organizationDetailsModel.subLocationToDate = new Date(res.data.results[0].subLocationToDate);

        this.organizationDetailsModel.workLocationFromDate = new Date(res.data.results[0].workLocationFromDate);
        this.organizationDetailsModel.workLocationToDate = new Date(res.data.results[0].workLocationToDate);

        this.organizationDetailsModel.subAreaFromDate = new Date(res.data.results[0].subAreaFromDate);
        this.organizationDetailsModel.subAreaToDate = new Date(res.data.results[0].subAreaToDate);

        this.organizationDetailsModel.businessAreaFromDate = new Date(res.data.results[0].businessAreaFromDate);
        this.organizationDetailsModel.businessAreaToDate = new Date(res.data.results[0].businessAreaToDate);

        this.organizationDetailsModel.businessAreaFromDate = new Date(res.data.results[0].businessAreaFromDate);
        this.organizationDetailsModel.businessAreaToDate = new Date(res.data.results[0].businessAreaToDate);

        this.organizationDetailsModel.businessAreaFromDate = new Date(res.data.results[0].businessAreaFromDate);
        this.organizationDetailsModel.businessAreaToDate = new Date(res.data.results[0].businessAreaToDate);

        this.organizationDetailsModel.businessAreaFromDate = new Date(res.data.results[0].businessAreaFromDate);
        this.organizationDetailsModel.businessAreaToDate = new Date(res.data.results[0].businessAreaToDate);

        this.organizationDetailsModel.businessAreaFromDate = new Date(res.data.results[0].businessAreaFromDate);
        this.organizationDetailsModel.businessAreaToDate = new Date(res.data.results[0].businessAreaToDate);


        this.establishmentCode = res.data.results[0].establishmentCode;
        this.establishmentDescription = res.data.results[0].establishmentDescription;
        this.subLocationCode = res.data.results[0].subLocationCode;
        this.subLocationDescription = res.data.results[0].subLocationDescription;
        this.workLocationCode = res.data.results[0].workLocationCode;
        this.workLocationDescription = res.data.results[0].workLocationDescription;
        this.businessAreaCode = res.data.results[0].businessAreaMasterCode;
        this.businessAreaDescription = res.data.results[0].businessAreaMasterDescription;
        this.subAreaCode = res.data.results[0].subAreaCode;
        this.subAreaDescription = res.data.results[0].subAreaDescription;
        this.strategicCode = res.data.results[0].strategicBusinessCode;
        this.strategicDescription = res.data.results[0].strategicBusinessDescription;
        this.divisionCode = res.data.results[0].divisionMasterCode;
        this.divisionDescription = res.data.results[0].divisionMasterDescription;
        this.departmentCode = res.data.results[0].departmentCode;
        this.departmentDescription = res.data.results[0].departmentDescription;
        this.subDepCode = res.data.results[0].subDepartmentCode;
        this.subDepDescription = res.data.results[0].subDepartmentDescription;
        this.costCode = res.data.results[0].costCentreCode;
        this.costDescription = res.data.results[0].costCentreDescription;
        this.subCostCode = res.data.results[0].subCostCentreCode;
        this.subCostDescription = res.data.results[0].subCostCentreDescription;
        this.profitCentreCode = res.data.results[0].profitCentreMasterCode;
        this.profitDescription = res.data.results[0].profitCentreMasterDescription;
        if (this.organizationDetailsModel.establishmentMasterId != null) {
          const estFromDate = this.OrganizationForm.get('establishmentFromDateControl');
          estFromDate.enable();
          const estToDate = this.OrganizationForm.get('establishmentToDateControl');
          estToDate.enable();
        }
        if (this.organizationDetailsModel.subLocationMasterId != null) {
          const subLocFromDate = this.OrganizationForm.get('subLocationFromDateControl');
          subLocFromDate.enable();
          const subLocToDate = this.OrganizationForm.get('subLocationToDateControl');
          subLocToDate.enable();
        }
        if (this.organizationDetailsModel.workLocationMasterId != null) {
          const workLocFromDate = this.OrganizationForm.get('workLocationFromDateControl');
          workLocFromDate.enable();
          const workLocToDate = this.OrganizationForm.get('workLocationToDateControl');
          workLocToDate.enable();
        }
        if (this.organizationDetailsModel.businessAreaMasterId != null) {
          const baFromDate = this.OrganizationForm.get('businessAreaFromDateControl');
          baFromDate.enable();
          const baToDate = this.OrganizationForm.get('businessAreaToDateControl');
          baToDate.enable();
        }
        if (this.organizationDetailsModel.subAreaId != null) {
          const subAreaFromDate = this.OrganizationForm.get('subAreaFromDateControl');
          subAreaFromDate.enable();
          const subAreaToDate = this.OrganizationForm.get('subAreaToDateControl');
          subAreaToDate.enable();
        }
        if (this.organizationDetailsModel.strategicBusinessUnitId != null) {
          const sbuFromDate = this.OrganizationForm.get('strategicBusinessFromDateControl');
          sbuFromDate.enable();
          const sbuToDate = this.OrganizationForm.get('strategicBusinessToDateControl');
          sbuToDate.enable();
        }
        if (this.organizationDetailsModel.divisionMasterId != null) {
          const divisionFromDate = this.OrganizationForm.get('divisionFromDateControl');
          divisionFromDate.enable();
          const divisionToDate = this.OrganizationForm.get('divisionToDateControl');
          divisionToDate.enable();
        }
        if (this.organizationDetailsModel.departmentMasterId != null) {
          const departmentFromDate = this.OrganizationForm.get('departmentFromDateControl');
          departmentFromDate.enable();
          const departmentToDate = this.OrganizationForm.get('departmentToDateControl');
          departmentToDate.enable();
        }
        if (this.organizationDetailsModel.subDepartmentId != null) {
          const subdepFromDate = this.OrganizationForm.get('subDepartmentFromDateControl');
          subdepFromDate.enable();
          const subdepToDate = this.OrganizationForm.get('subDepartmentToDateControl');
          subdepToDate.enable();
        }
        if (this.organizationDetailsModel.costCentreId != null) {
          const costFromDate = this.OrganizationForm.get('costCentreFromDateControl');
          costFromDate.enable();
          const costToDate = this.OrganizationForm.get('costCentreToDateControl');
          costToDate.enable();;
        }
        if (this.organizationDetailsModel.subCostCentreId != null) {
          const subCostFromDate = this.OrganizationForm.get('subCostCentreFromDateControl');
          subCostFromDate.enable();
          const subCostToDate = this.OrganizationForm.get('subCostCentreToDateControl');
          subCostToDate.enable();
        }
        if (this.organizationDetailsModel.profitCentreMasterId != null) {
          const profitFromDate = this.OrganizationForm.get('profitCentreFromDateControl');
          profitFromDate.enable();
          const profitCostToDate = this.OrganizationForm.get('profitCentreToDateControl');
          profitCostToDate.enable();
        }
        
        localStorage.setItem('establishmentMasterId', res.data.results[0].establishmentMasterId);
    
      }


    }

    )
  }

  OrganizationFormSubmit(organizationDetailsModel) {

    if (this.establishmentDescription == null) {
      organizationDetailsModel.establishmentMasterId = null;
    }
    if (this.subLocationDescription == null) {
      organizationDetailsModel.subLocationMasterId = null;
    }
    if (this.workLocationDescription == null) {
      organizationDetailsModel.workLocationMasterId = null;
    }
    if (this.businessAreaDescription == null) {
      organizationDetailsModel.businessAreaMasterId = null;
    }
    if (this.subAreaDescription == null) {
      organizationDetailsModel.subAreaId = null;
    }
    if (this.strategicDescription == null) {
      organizationDetailsModel.strategicBusinessUnitId = null;
    }
    if (this.divisionDescription == null) {
      organizationDetailsModel.divisionMasterId = null;
    }
    if (this.departmentDescription == null) {
      organizationDetailsModel.departmentMasterId = null;
    }
    if (this.subDepDescription == null) {
      organizationDetailsModel.subDepartmentId = null;
    }
    if (this.costDescription == null) {
      organizationDetailsModel.costCentreId = null;
    }
    if (this.subCostDescription == null) {
      organizationDetailsModel.subCostCentreId = null;
    }
    if (this.profitDescription == null) {
      organizationDetailsModel.profitCentreMasterId = null;
    }

    organizationDetailsModel.employeeMasterId = this.employeeMasterId;
    organizationDetailsModel.employeeOrganizationDetailId = this.employeeOrganizationDetailId;
    organizationDetailsModel.payrollAreaCode=this.payrollAreaCode;

    organizationDetailsModel.establishmentFromDate = this.datepipe.transform(organizationDetailsModel.establishmentFromDate, "dd-MMM-yyyy");
    organizationDetailsModel.establishmentToDate = this.datepipe.transform(organizationDetailsModel.establishmentToDate, "dd-MMM-yyyy");
    organizationDetailsModel.subLocationFromDate = this.datepipe.transform(organizationDetailsModel.subLocationFromDate, "dd-MMM-yyyy");
    organizationDetailsModel.subLocationToDate = this.datepipe.transform(organizationDetailsModel.subLocationToDate, "dd-MMM-yyyy");
    organizationDetailsModel.workLocationFromDate = this.datepipe.transform(organizationDetailsModel.workLocationFromDate, "dd-MMM-yyyy");
    organizationDetailsModel.workLocationToDate = this.datepipe.transform(organizationDetailsModel.workLocationToDate, "dd-MMM-yyyy");
    organizationDetailsModel.businessAreaFromDate = this.datepipe.transform(organizationDetailsModel.businessAreaFromDate, "dd-MMM-yyyy");
    organizationDetailsModel.businessAreaToDate = this.datepipe.transform(organizationDetailsModel.businessAreaToDate, "dd-MMM-yyyy");
    organizationDetailsModel.subAreaFromDate = this.datepipe.transform(organizationDetailsModel.subAreaFromDate, "dd-MMM-yyyy");
    organizationDetailsModel.subAreaToDate = this.datepipe.transform(organizationDetailsModel.subAreaToDate, "dd-MMM-yyyy");
    organizationDetailsModel.strategicBusinessFromDate = this.datepipe.transform(organizationDetailsModel.strategicBusinessFromDate, "dd-MMM-yyyy");
    organizationDetailsModel.strategicBusinessToDate = this.datepipe.transform(organizationDetailsModel.strategicBusinessToDate, "dd-MMM-yyyy");
    organizationDetailsModel.divisionFromDate = this.datepipe.transform(organizationDetailsModel.divisionFromDate, "dd-MMM-yyyy");
    organizationDetailsModel.divisionToDate = this.datepipe.transform(organizationDetailsModel.divisionToDate, "dd-MMM-yyyy");
    organizationDetailsModel.departmentFromDate = this.datepipe.transform(organizationDetailsModel.departmentFromDate, "dd-MMM-yyyy");
    organizationDetailsModel.departmentToDate = this.datepipe.transform(organizationDetailsModel.departmentToDate, "dd-MMM-yyyy");
    organizationDetailsModel.subDepartmentFromDate = this.datepipe.transform(organizationDetailsModel.subDepartmentFromDate, "dd-MMM-yyyy");
    organizationDetailsModel.subDepartmentToDate = this.datepipe.transform(organizationDetailsModel.subDepartmentToDate, "dd-MMM-yyyy");
    organizationDetailsModel.costCentreFromDate = this.datepipe.transform(organizationDetailsModel.costCentreFromDate, "dd-MMM-yyyy");
    organizationDetailsModel.costCentreToDate = this.datepipe.transform(organizationDetailsModel.costCentreToDate, "dd-MMM-yyyy");
    organizationDetailsModel.subCostCentreFromDate = this.datepipe.transform(organizationDetailsModel.subCostCentreFromDate, "dd-MMM-yyyy");
    organizationDetailsModel.subCostCentreToDate = this.datepipe.transform(organizationDetailsModel.subCostCentreToDate, "dd-MMM-yyyy");
    organizationDetailsModel.profitCentreFromDate = this.datepipe.transform(organizationDetailsModel.profitCentreFromDate, "dd-MMM-yyyy");
    organizationDetailsModel.profitCentreToDate = this.datepipe.transform(organizationDetailsModel.profitCentreToDate, "dd-MMM-yyyy");


  
    //deleting extra fields

    delete organizationDetailsModel.establishmentCode;
    delete organizationDetailsModel.establishmentDescription;
    delete organizationDetailsModel.subLocationCode;
    delete organizationDetailsModel.subLocationDescription;
    delete organizationDetailsModel.workLocationCode;
    delete organizationDetailsModel.workLocationDescription;
    delete organizationDetailsModel.businessAreaMasterCode;
    delete organizationDetailsModel.businessAreaMasterDescription;
    delete organizationDetailsModel.subAreaCode;
    delete organizationDetailsModel.subAreaDescription;
    delete organizationDetailsModel.strategicBusinessCode;
    delete organizationDetailsModel.strategicBusinessDescription;
    delete organizationDetailsModel.divisionMasterCode;
    delete organizationDetailsModel.divisionMasterDescription;
    delete organizationDetailsModel.departmentCode;
    delete organizationDetailsModel.departmentDescription;
    delete organizationDetailsModel.subDepartmentCode;
    delete organizationDetailsModel.subDepartmentDescription;
    delete organizationDetailsModel.costCentreCode;
    delete organizationDetailsModel.costCentreDescription;
    delete organizationDetailsModel.subCostCentreCode;
    delete organizationDetailsModel.subCostCentreDescription;
    delete organizationDetailsModel.profitCentreMasterDescription;
    delete organizationDetailsModel.profitCentreMasterCode;


    this.JobInformationService.postOrganizationDetails(organizationDetailsModel).subscribe(res => {
      
     // this.notifyService.showSuccess(res.status.messsage, "Success..!!");
      this.organizationDetailsModel = res.data.results[0];
      this.employeeOrganizationDetailId = this.organizationDetailsModel.employeeOrganizationDetailId;
      
      localStorage.setItem('establishmentMasterId', res.data.results[0].establishmentMasterId);
  
      this.getOrganizationForm();
      this.EventEmitterService.getJobInformationInitiate();
    })
    this.OrganizationForm.markAsUntouched();
  }

  nextTo(jobTab) {
    this.EventEmitterService.getNextJobTab(jobTab)
  }
  validateEstablishmentToDate() {
    debugger
    if (this.organizationDetailsModel.establishmentToDate == '' || this.organizationDetailsModel.establishmentToDate == null) {
      this.organizationDetailsModel.establishmentToDate = '31-Dec-9999';
      const estaToDate = this.OrganizationForm.get('establishmentToDateControl');
      estaToDate.enable();
    }
  }
  validatEstSave() {

    this.OrganizationForm.controls['establishmentFromDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls['establishmentToDateControl'].setValidators([Validators.required]);

  }
  enableEstablishmentDate() {
    const estFromDate = this.OrganizationForm.get('establishmentFromDateControl');
    estFromDate.enable();
    const estToDate = this.OrganizationForm.get('establishmentToDateControl');
    estToDate.enable();
    if (this.establishmentCode == '' || this.establishmentCode == null) {
      this.organizationDetailsModel.establishmentFromDate = null;
      this.organizationDetailsModel.establishmentToDate = null;
      const estToDate = this.OrganizationForm.get('establishmentToDateControl');
      estToDate.disable();
      const estFromDate = this.OrganizationForm.get('establishmentFromDateControl');
      estFromDate.disable();
    }

  }
  validateSubLocToDate() {
    if (this.organizationDetailsModel.subLocationToDate == '' || this.organizationDetailsModel.subLocationToDate == null) {
      this.organizationDetailsModel.subLocationToDate = '31-Dec-9999';
      const subToDate = this.OrganizationForm.get('subLocationToDateControl');
      subToDate.enable();
    }
  }
  validatSubLocSave() {
    this.OrganizationForm.controls['subLocationFromDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls['subLocationToDateControl'].setValidators([Validators.required]);
    }
  enableSubLocDate() {
    const subLocFromDate = this.OrganizationForm.get('subLocationFromDateControl');
    subLocFromDate.enable();
    const subLocToDate = this.OrganizationForm.get('subLocationToDateControl');
    subLocToDate.enable();
    if (this.subLocationCode == '' || this.subLocationCode == null) {
      this.organizationDetailsModel.subLocationFromDate = null;
      this.organizationDetailsModel.subLocationToDate = null;
      const subToDate = this.OrganizationForm.get('subLocationToDateControl');
      subToDate.disable();
      const subFromDate = this.OrganizationForm.get('subLocationFromDateControl');
      subFromDate.disable();
    }
  }
  validateWorkLocToDate() {
    if (this.organizationDetailsModel.workLocationToDate == '' || this.organizationDetailsModel.workLocationToDate == null) {
      this.organizationDetailsModel.workLocationToDate = '31-Dec-9999';
      const workToDate = this.OrganizationForm.get('workLocationToDateControl');
      workToDate.enable();
    }
  }
  validateWorkLocSave() {
    this.OrganizationForm.controls['workLocationFromDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls['workLocationToDateControl'].setValidators([Validators.required]);
    
  }
  enableWorkLocDate() {
    const workLocFromDate = this.OrganizationForm.get('workLocationFromDateControl');
    workLocFromDate.enable();
    const workLocToDate = this.OrganizationForm.get('workLocationToDateControl');
    workLocToDate.enable();
    if (this.workLocationCode == '' || this.workLocationCode == null) {
      this.organizationDetailsModel.workLocationFromDate = null;
      this.organizationDetailsModel.workLocationToDate = null;
      const workToDate = this.OrganizationForm.get('workLocationToDateControl');
      workToDate.disable();
      const workFromDate = this.OrganizationForm.get('workLocationFromDateControl');
      workFromDate.disable();
    }
  }
  validateBusinessAreaToDate() {
    if (this.organizationDetailsModel.businessAreaToDate == '' || this.organizationDetailsModel.businessAreaToDate == null) {
      this.organizationDetailsModel.businessAreaToDate = '31-Dec-9999';
      const baToDate = this.OrganizationForm.get('businessAreaToDateControl');
      baToDate.enable();
    }
  }
  validateBusiDatesSave()
  {
    this.OrganizationForm.controls['businessAreaFromDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls['businessAreaToDateControl'].setValidators([Validators.required]);
    
  }
  enableBusinessAreaDate() {
    const baFromDate = this.OrganizationForm.get('businessAreaFromDateControl');
    baFromDate.enable();
    const baToDate = this.OrganizationForm.get('businessAreaToDateControl');
    baToDate.enable();
    if (this.businessAreaCode == '' || this.businessAreaCode == null) {
      this.organizationDetailsModel.businessAreaFromDate = null;
      this.organizationDetailsModel.businessAreaToDate = null;
      const bareaToDate = this.OrganizationForm.get('businessAreaToDateControl');
      bareaToDate.disable();
      const bareaFromDate = this.OrganizationForm.get('businessAreaFromDateControl');
      bareaFromDate.disable();
    }
  }
  validateSubAreaToDate() {
    if (this.organizationDetailsModel.subAreaToDate == '' || this.organizationDetailsModel.subAreaToDate == null) {
      this.organizationDetailsModel.subAreaToDate = '31-Dec-9999';
      const subAreaToDate = this.OrganizationForm.get('subAreaToDateControl');
      subAreaToDate.enable();
    }
  }
  validateSubAreaDatesSave()
  {
    this.OrganizationForm.controls['subAreaFromDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls['subAreaToDateControl'].setValidators([Validators.required]);
    
  }
  enableSubAreaDate() {
    const subAreaFromDate = this.OrganizationForm.get('subAreaFromDateControl');
    subAreaFromDate.enable();
    const subAreaToDate = this.OrganizationForm.get('subAreaToDateControl');
    subAreaToDate.enable();
    if (this.subAreaCode == '' || this.subAreaCode == null) {
      this.organizationDetailsModel.subAreaFromDate = null;
      this.organizationDetailsModel.subAreaToDate = null;
      const subaToDate = this.OrganizationForm.get('subAreaToDateControl');
      subaToDate.disable();
      const subaFromDate = this.OrganizationForm.get('subAreaFromDateControl');
      subaFromDate.disable();
    }
  }
  validateStrategicToDate() {
    if (this.organizationDetailsModel.strategicBusinessToDate == '' || this.organizationDetailsModel.strategicBusinessToDate == null) {
      this.organizationDetailsModel.strategicBusinessToDate = '31-Dec-9999';
      const sbuToDate = this.OrganizationForm.get('strategicBusinessToDateControl');
      sbuToDate.enable();
    }
  }
  validateSBUDatesSave()
  {
    this.OrganizationForm.controls['strategicBusinessFromDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls['strategicBusinessToDateControl'].setValidators([Validators.required]);
    
  }
  enableStategicAreaDate() {
    const sbuFromDate = this.OrganizationForm.get('strategicBusinessFromDateControl');
    sbuFromDate.enable();
    const sbuToDate = this.OrganizationForm.get('strategicBusinessToDateControl');
    sbuToDate.enable();
    if (this.strategicCode == '' || this.strategicCode == null) {
      this.organizationDetailsModel.strategicBusinessFromDate = null;
      this.organizationDetailsModel.strategicBusinessToDate = null;
      const sbuToDate = this.OrganizationForm.get('strategicBusinessToDateControl');
      sbuToDate.disable();
      const sbuFromDate = this.OrganizationForm.get('strategicBusinessFromDateControl');
      sbuFromDate.disable();
    }
  }
  validateDivisionToDate() {
    if (this.organizationDetailsModel.divisionToDate == '' || this.organizationDetailsModel.divisionToDate == null) {
      this.organizationDetailsModel.divisionToDate = '31-Dec-9999';
      const divisionToDate = this.OrganizationForm.get('divisionToDateControl');
      divisionToDate.enable();
    }
  }
  validateDivisionDatesSave()
  {
    this.OrganizationForm.controls['divisionFromDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls['divisionToDateControl'].setValidators([Validators.required]);
    
  }
  enableDivisionDate() {
    const divisionFromDate = this.OrganizationForm.get('divisionFromDateControl');
    divisionFromDate.enable();
    const divisionToDate = this.OrganizationForm.get('divisionToDateControl');
    divisionToDate.enable();
    if (this.divisionCode == '' || this.divisionCode == null) {
      this.organizationDetailsModel.divisionFromDate = null;
      this.organizationDetailsModel.divisionToDate = null;
      const divisionToDate = this.OrganizationForm.get('divisionToDateControl');
      divisionToDate.disable();
      const divisionFromDate = this.OrganizationForm.get('divisionFromDateControl');
      divisionFromDate.disable();
    }
  }
  validateDepartmentToDate() {
    if (this.organizationDetailsModel.departmentToDate == '' || this.organizationDetailsModel.departmentToDate == null) {
      this.organizationDetailsModel.departmentToDate = '31-Dec-9999';
      const sbuToDate = this.OrganizationForm.get('departmentToDateControl');
      sbuToDate.enable();
    }
  }
  validateDepartmentDatesSave()
  {
    this.OrganizationForm.controls['departmentFromDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls['departmentToDateControl'].setValidators([Validators.required]);
    
  }
  enableDepartmentDate() {
    const departmentFromDate = this.OrganizationForm.get('departmentFromDateControl');
    departmentFromDate.enable();
    const departmentToDate = this.OrganizationForm.get('departmentToDateControl');
    departmentToDate.enable();
    if (this.departmentCode == '' || this.departmentCode == null) {
      this.organizationDetailsModel.departmentFromDate = null;
      this.organizationDetailsModel.departmentToDate = null;
      const depToDate = this.OrganizationForm.get('departmentToDateControl');
      depToDate.disable();
      const depFromDate = this.OrganizationForm.get('departmentFromDateControl');
      depFromDate.disable();
    }
  }
  validateSubDepartmentToDate() {
    if (this.organizationDetailsModel.subDepartmentToDate == '' || this.organizationDetailsModel.subDepartmentToDate == null) {
      this.organizationDetailsModel.subDepartmentToDate = '31-Dec-9999';
      const subDepToDate = this.OrganizationForm.get('subDepartmentToDateControl');
      subDepToDate.enable();
    }
  }
  validateSubDepDatesSave()
  {
    this.OrganizationForm.controls['subDepartmentFromDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls['subDepartmentToDateControl'].setValidators([Validators.required]);
    
  }
  enableSubDepartmentDate() {
    const subdepFromDate = this.OrganizationForm.get('subDepartmentFromDateControl');
    subdepFromDate.enable();
    const subdepToDate = this.OrganizationForm.get('subDepartmentToDateControl');
    subdepToDate.enable();
    if (this.subDepCode == '' || this.subDepCode == null) {
      this.organizationDetailsModel.subDepartmentFromDate = null;
      this.organizationDetailsModel.subDepartmentToDate = null;
      const subDepaToDate = this.OrganizationForm.get('subDepartmentToDateControl');
      subDepaToDate.disable();
      const subdepaFromDate = this.OrganizationForm.get('subDepartmentFromDateControl');
      subdepaFromDate.disable();
    }
  }
  validateCostToDate() {
    if (this.organizationDetailsModel.costCentreToDate == '' || this.organizationDetailsModel.costCentreToDate == null) {
      this.organizationDetailsModel.costCentreToDate = '31-Dec-9999';
      const costToDate = this.OrganizationForm.get('costCentreToDateControl');
      costToDate.enable();
    }
  }
  validateCostDatesSave()
  {
    this.OrganizationForm.controls['costCentreFromDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls['costCentreToDateControl'].setValidators([Validators.required]);
    
  }
  enableCostDate() {
    const costFromDate = this.OrganizationForm.get('costCentreFromDateControl');
    costFromDate.enable();
    const costToDate = this.OrganizationForm.get('costCentreToDateControl');
    costToDate.enable();
    if (this.costCode == '' || this.costCode == null) {
      this.organizationDetailsModel.costCentreFromDate = null;
      this.organizationDetailsModel.costCentreToDate = null;
      const costToDate = this.OrganizationForm.get('costCentreToDateControl');
      costToDate.disable();
      const costFromDate = this.OrganizationForm.get('costCentreFromDateControl');
      costFromDate.disable();
    }
  }
  validateSubCostToDate() {
    if (this.organizationDetailsModel.subCostCentreToDate == '' || this.organizationDetailsModel.subCostCentreToDate == null) {
      this.organizationDetailsModel.subCostCentreToDate = '31-Dec-9999';
      const subCostToDate = this.OrganizationForm.get('subCostCentreToDateControl');
      subCostToDate.enable();
    }
  }
  validateSubCostDatesSave()
  {
    this.OrganizationForm.controls['subCostCentreFromDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls['subCostCentreToDateControl'].setValidators([Validators.required]);
    
  }
  enableSubCostDate() {
    const subCostFromDate = this.OrganizationForm.get('subCostCentreFromDateControl');
    subCostFromDate.enable();
    const subCostToDate = this.OrganizationForm.get('subCostCentreToDateControl');
    subCostToDate.enable();
    if (this.subCostCode == '' || this.subCostCode == null) {
      this.organizationDetailsModel.subCostCentreFromDate = null;
      this.organizationDetailsModel.subCostCentreToDate = null;
      const subCostToDate = this.OrganizationForm.get('subCostCentreToDateControl');
      subCostToDate.disable();
      const subCostFromDate = this.OrganizationForm.get('subCostCentreFromDateControl');
      subCostFromDate.disable();
    }
  }
  validateProfitToDate() {
    if (this.organizationDetailsModel.profitCentreToDate == '' || this.organizationDetailsModel.profitCentreToDate == null) {
      this.organizationDetailsModel.profitCentreToDate = '31-Dec-9999';
      const subCostToDate = this.OrganizationForm.get('profitCentreToDateControl');
      subCostToDate.enable();
    }
  }
  validateProfitDatesSave()
  {
    this.OrganizationForm.controls['profitCentreFromDateControl'].setValidators([Validators.required]);
    this.OrganizationForm.controls['profitCentreToDateControl'].setValidators([Validators.required]);
    
  }
  enableProfitDate() {
    const profitFromDate = this.OrganizationForm.get('profitCentreFromDateControl');
    profitFromDate.enable();
    const profitCostToDate = this.OrganizationForm.get('profitCentreToDateControl');
    profitCostToDate.enable();
    if (this.profitCentreCode == '' || this.profitCentreCode == null) {
      this.organizationDetailsModel.profitCentreFromDate = null;
      this.organizationDetailsModel.profitCentreToDate = null;
      const profitCostToDate = this.OrganizationForm.get('profitCentreToDateControl');
      profitCostToDate.disable();
      const profitFromDate = this.OrganizationForm.get('profitCentreFromDateControl');
      profitFromDate.disable();
    }
  }
  establishmentObject(establishment) {
    debugger
    this.establishmentDescription = establishment.description;
    this.organizationDetailsModel.establishmentMasterId = establishment.establishmentMasterId;
    this.enableEstablishmentDate()
  }
  subLocationObject(sublocation) {

    this.subLocationDescription = sublocation.masterDescription;
    this.organizationDetailsModel.subLocationMasterId = sublocation.masterId;
    this.enableSubLocDate()
  }
  workLocationObject(worklocation) {

    this.workLocationDescription = worklocation.masterDescription;
    this.organizationDetailsModel.workLocationMasterId = worklocation.masterId;
    this.enableWorkLocDate()
  }
  businessAreaObject(businessarea) {

    this.businessAreaDescription = businessarea.masterDescription;
    this.organizationDetailsModel.businessAreaMasterId = businessarea.masterId;
    this.enableBusinessAreaDate()

  }
  subAreaObject(subarea) {

    this.subAreaDescription = subarea.masterDescription;
    this.organizationDetailsModel.subAreaId = subarea.masterId;
    this.enableSubAreaDate();
  }
  strategicObject(strategic) {

    this.strategicDescription = strategic.masterDescription;
    this.organizationDetailsModel.strategicBusinessUnitId = strategic.masterId;
    this.enableStategicAreaDate();
  }
  divisionObject(division) {

    this.divisionDescription = division.masterDescription;
    this.organizationDetailsModel.divisionMasterId = division.masterId;
    this.enableDivisionDate();
  }
  departmentObject(department) {

    this.departmentDescription = department.masterDescription;
    this.organizationDetailsModel.departmentMasterId = department.masterId;
    this.enableDepartmentDate();
  }
  sunDepartmentObject(subdepartment) {

    this.subDepDescription = subdepartment.masterDescription;
    this.organizationDetailsModel.subDepartmentId = subdepartment.masterId;
    this.enableSubDepartmentDate();
  }
  costObject(cost) {

    this.costDescription = cost.masterDescription;
    this.organizationDetailsModel.costCentreId = cost.masterId;
    this.enableCostDate();
  }
  subCostObject(subcost) {

    this.subCostDescription = subcost.masterDescription;
    this.organizationDetailsModel.subCostCentreId = subcost.masterId;
    this.enableSubCostDate();
  }
  profitObject(profit) {

    this.profitDescription = profit.masterDescription;
    this.organizationDetailsModel.profitCentreMasterId = profit.masterId;
    this.enableProfitDate();
  }
  SearchEstablishment(establishmentCode) {
    debugger
    this.establishmentDescription = null;
    this.organizationDetailsModel.establishmentFromDate = null;
    this.organizationDetailsModel.establishmentToDate = null;
    const establishmentFromDate = this.OrganizationForm.get('establishmentFromDateControl');
    establishmentFromDate.disable();
    const establishmentToDate = this.OrganizationForm.get('establishmentToDateControl');
    establishmentToDate.disable();

    // establishmentCode = establishmentCode.toLowerCase();
    // const ifsc = this.filteredEstablishmentList.filter((item) => {
    //   return JSON.stringify(item).toLowerCase().includes(establishmentCode);
    // });
    // this.establishmentList = ifsc;


    let filtered: any[] = [];
    let query = establishmentCode.query;
    for (let i = 0; i < this.establishmentList.length; i++) {
      let country = this.establishmentList[i];
      if (country.establishmentCode.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredEstablishmentList = filtered;
  }
  SearchSubLocation(subLocationCode) {


    this.subLocationDescription = null;
    this.organizationDetailsModel.subLocationFromDate = null;
    this.organizationDetailsModel.subLocationToDate = null;
    const subLocationFromDate = this.OrganizationForm.get('subLocationFromDateControl');
    subLocationFromDate.disable();
    const subLocationToDate = this.OrganizationForm.get('subLocationToDateControl');
    subLocationToDate.disable();

    // subLocationCode = subLocationCode.toLowerCase();
    // const ifsc = this.filteredSubLocationList.filter((item) => {
    //   return JSON.stringify(item).toLowerCase().includes(subLocationCode);
    // });
    // this.subLocationList = ifsc;

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
  SearchWorkLocation(workLocationCode) {

    this.workLocationDescription = null;
    this.organizationDetailsModel.workLocationFromDate = null;
    this.organizationDetailsModel.workLocationToDate = null;
    const workLocationFromDate = this.OrganizationForm.get('workLocationFromDateControl');
    workLocationFromDate.disable();
    const workLocationToDate = this.OrganizationForm.get('workLocationToDateControl');
    workLocationToDate.disable();

    // workLocationCode = workLocationCode.toLowerCase();
    // const ifsc = this.filteredWorkLocationList.filter((item) => {
    //   return JSON.stringify(item).toLowerCase().includes(workLocationCode);
    // });
    // this.workLocationList = ifsc;

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
  SearchBusinessArea(businessAreaCode) {


    this.businessAreaDescription = null;
    this.organizationDetailsModel.businessAreaFromDate = null;
    this.organizationDetailsModel.businessAreaToDate = null;
    const businessAreaFromDate = this.OrganizationForm.get('businessAreaFromDateControl');
    businessAreaFromDate.disable();
    const businessAreaToDate = this.OrganizationForm.get('businessAreaToDateControl');
    businessAreaToDate.disable();


    // businessAreaCode = businessAreaCode.toLowerCase();
    // const ifsc = this.filteredBusinessAreaList.filter((item) => {
    //   return JSON.stringify(item).toLowerCase().includes(businessAreaCode);
    // });
    // this.businessAreaList = ifsc;

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
  SearchSubArea(subAreaCode) {


    this.subAreaDescription = null;
    this.organizationDetailsModel.subAreaFromDate = null;
    this.organizationDetailsModel.subAreaToDate = null;
    const subAreaFromDate = this.OrganizationForm.get('subAreaFromDateControl');
    subAreaFromDate.disable();
    const subAreaToDate = this.OrganizationForm.get('subAreaToDateControl');
    subAreaToDate.disable();


    // subAreaCode = subAreaCode.toLowerCase();
    // const ifsc = this.filteredSubAreaList.filter((item) => {
    //   return JSON.stringify(item).toLowerCase().includes(subAreaCode);
    // });
    // this.subAreaList = ifsc;

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
  SearchStrategic(strategicBusinessCode) {


    this.strategicDescription = null;
    this.organizationDetailsModel.strategicBusinessFromDate = null;
    this.organizationDetailsModel.strategicBusinessToDate = null;
    const strategicBusinessFromDate = this.OrganizationForm.get('strategicBusinessFromDateControl');
    strategicBusinessFromDate.disable();
    const strategicBusinessToDate = this.OrganizationForm.get('strategicBusinessToDateControl');
    strategicBusinessToDate.disable();


    // strategicBusinessCode = strategicBusinessCode.toLowerCase();
    // const ifsc = this.filteredStrategicBusinessAreaList.filter((item) => {
    //   return JSON.stringify(item).toLowerCase().includes(strategicBusinessCode);
    // });
    // this.strategicBusinessAreaList = ifsc;

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
  SearchDivision(divisionCode) {


    this.divisionDescription = null;
    this.organizationDetailsModel.divisionFromDate = null;
    this.organizationDetailsModel.divisionToDate = null;
    const divisionFromDate = this.OrganizationForm.get('divisionFromDateControl');
    divisionFromDate.disable();
    const divisionToDate = this.OrganizationForm.get('divisionToDateControl');
    divisionToDate.disable();


    // divisionCode = divisionCode.toLowerCase();
    // const ifsc = this.filteredDivisionList.filter((item) => {
    //   return JSON.stringify(item).toLowerCase().includes(divisionCode);
    // });
    // this.divisionList = ifsc;

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
  SearchDepartment(departmentCode) {


    this.departmentDescription = null;
    this.organizationDetailsModel.departmentFromDate = null;
    this.organizationDetailsModel.departmentToDate = null;
    const departmentFromDate = this.OrganizationForm.get('departmentFromDateControl');
    departmentFromDate.disable();
    const departmentToDate = this.OrganizationForm.get('departmentToDateControl');
    departmentToDate.disable();


    // departmentCode = departmentCode.toLowerCase();
    // const ifsc = this.filteredDepartmentList.filter((item) => {
    //   return JSON.stringify(item).toLowerCase().includes(departmentCode);
    // });
    // this.departmentList = ifsc;

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
  SearchSubDepartment(subDepartmentCode) {


    this.subDepDescription = null;
    this.organizationDetailsModel.subDepartmentFromDate = null;
    this.organizationDetailsModel.subDepartmentToDate = null;
    const subDepartmentFromDate = this.OrganizationForm.get('subDepartmentFromDateControl');
    subDepartmentFromDate.disable();
    const subDepartmentToDate = this.OrganizationForm.get('subDepartmentToDateControl');
    subDepartmentToDate.disable();


    // subDepartmentCode = subDepartmentCode.toLowerCase();
    // const ifsc = this.filteredSubDepartmentList.filter((item) => {
    //   return JSON.stringify(item).toLowerCase().includes(subDepartmentCode);
    // });
    // this.subDepartmentList = ifsc;

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
  SearchCost(costCentreCode) {

    this.costDescription = null;
    this.organizationDetailsModel.costCentreFromDate = null;
    this.organizationDetailsModel.costCentreToDate = null;
    const costCentreFromDate = this.OrganizationForm.get('costCentreFromDateControl');
    costCentreFromDate.disable();
    const costCentreToDate = this.OrganizationForm.get('costCentreToDateControl');
    costCentreToDate.disable();


    // costCentreCode = costCentreCode.toLowerCase();
    // const ifsc = this.filteredCostCenterList.filter((item) => {
    //   return JSON.stringify(item).toLowerCase().includes(costCentreCode);
    // });
    // this.costCenterList = ifsc;

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
  SearchSubCost(subCostCentreCode) {

    this.subCostDescription = null;
    this.organizationDetailsModel.subCostCentreFromDate = null;
    this.organizationDetailsModel.subCostCentreToDate = null;
    const subCostCentreFromDate = this.OrganizationForm.get('subCostCentreFromDateControl');
    subCostCentreFromDate.disable();
    const subCostCentreToDate = this.OrganizationForm.get('subCostCentreToDateControl');
    subCostCentreToDate.disable();


    // subCostCentreCode = subCostCentreCode.toLowerCase();
    // const ifsc = this.filteredSubCostCenterList.filter((item) => {
    //   return JSON.stringify(item).toLowerCase().includes(subCostCentreCode);
    // });
    // this.subCostCenterList = ifsc;

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
  SearchProfit(profitCentreCode) {

    this.profitDescription = null;
    this.organizationDetailsModel.profitCentreFromDate = null;
    this.organizationDetailsModel.profitCentreToDate = null;
    const profitCentreFromDate = this.OrganizationForm.get('profitCentreFromDateControl');
    profitCentreFromDate.disable();
    const profitCentreToDate = this.OrganizationForm.get('profitCentreToDateControl');
    profitCentreToDate.disable();

    // profitCentreCode = profitCentreCode.toLowerCase();
    // const ifsc = this.filteredProfitCenterList.filter((item) => {
    //   return JSON.stringify(item).toLowerCase().includes(profitCentreCode);
    // });
    // this.profitCenterList = ifsc;

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

  //get payroll area aasigned to that employee
  getPayrollAreaInformation() {
debugger
    this.PayrollAreaService.getPayrollAreaInformation(this.employeeMasterId).subscribe(res => {
      debugger
      res.data.results[0].forEach(item =>{
        this.payrollAreaList.push(item.payrollAreaCode);
        this.filteredPayrollAreaList.push(item.payrollAreaCode);

     });
    })
    console.log("payroll: ",this.payrollAreaList);

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
  selectPayrollArea(event){
    debugger
    this.payrollAreaCode=event;
    console.log("this.payrollAreaCode: ",this.payrollAreaCode);

    this.getOrganizationForm();
  }
}
