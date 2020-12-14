import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AnyMxRecord } from 'dns';
import { combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import Swal from 'sweetalert2';
import { ComplianceHeadService } from '../compliance-head/compliance-head.service';
import { EstablishmentMasterService } from '../establishment-master/establishment-master.service';
import { StatuatoryComplianceService } from '../statutory-compliance/statuatory-compliance.service';
import { ComplianceMasterService } from './compliance-master.service';

@Component({
  selector: 'app-compliance-master',
  templateUrl: './compliance-master.component.html',
  styleUrls: ['./compliance-master.component.scss'],
})
export class ComplianceMasterComponent implements OnInit {
  public form: any = FormGroup;
  public SelectedemployeeContribtionMultiSelect = [];
  public selectedCompanyContribtionMultiSelect = [];
  public selectedEstablishmentMasterId = [];
  public isView = false;
  public isActivateButton: number;
  public isGlobalView = false;

  public complianceApplicationForm: any = FormGroup;

  public isPf = false;
  public isPfNew = false;
  public isEpsNew = false;
  public isEps = false;
  public isEsi = false;
  public isPt = false; // Professional Tax
  public isLw = false; // Labour Welfare
  public isTaxDeductedAtSource = false;
  public isGratuity = false;
  public isSa = false;  // Super Annuation
  public ServicesList = [];
  public isEditableEstablismentMasterId = false;

  public defaultEmployeeContributionList = [];
  public companyContributionList = [];
  public allOtherMappingDetailsList = [];
  public savedEstablishmentList = [];
  public isRestrictedDisableMultiSelect = false;
  public editedRecordIndex = 0;
  public summaryHtmlDataListComplianceApplicability = [];
  public masterGridDataListComplianceAppicability = [];
  public summaryHtmlDataList: Array<any> = [];
  public institutionMasterList = [];
  public issuedByList = ['Registrar of Companies', 'Commissioner of Charities'];
  public primaryBusinessActivityList = ['Payroll', 'PayRoll', 'IT', 'HR1', '22'];
  public officePremisesOwnershipList = ['Owned', 'RENT', 'Lease'];
  public showButtonSaveAndReset = true;
  public masterGridDataList: Array<any> = [];
  public getComplianceHeadDetailsObject: any;
  public getComplianceInstituionMasterDetails: any;
  public tempObjForCompanyRegistration: any;
  public companyMasterId = 0;
  public isSaveAndReset = true;
  public countries = [];
  public establishmentMasterId = 0;
  public regionMasterDetails = [];
  public cityList = [];
  public selectedRegionMasterCode: number;
  public institutionMasterObject = [];
  public institutionNameList = [];
  public pfStatusList = ['Exempt', 'Unexempt'];
  public isDefaultContribution = true;
  public ContributionMethodChoiceList = ['FULL', 'RESTRICTED', 'EXPACT'];
  public companyIdList = [{ id: 1, itemName: 'WhiteHedge' }];
  // ------------ required below varivables

  public complianceHeadDetailsObject: any;
  public complianceHeadId_Country_aplicabilityLevel_complianceHeadName_Object: any[] = [];
  public complianceHeadNameList = [];
  public establishmentDetailsMasterList = [];
  public establishmentDetailsmasterGridDataList = [];
  public establishmentCodeAndId = [];
  public getAllOtherMasterDetailsResponse = [];
  public dropdownSettings: any;
  public dropdownList = [];
  public dropdownList1 = [{ id: 0, itemName: 'FULL' }, { id: 1, itemName: 'RESTRICTED' }, { id: 2, itemName: 'EXPACT' }];
  public dropdownList2 = [];
  public complianceHeadTempObj: any;
  public states: Array<any> = [];
  public dropdownSettingsForPF: any;
  public dropdownSettingsAllOtherMasterMappingDetails: any;
  public getAllOtherMastersMappingDetailsResponse: any;
  public tempGetAllOtherMastersMappingDetails = [];
  public getFilteredRecordOfAllOtherMastersMappingDetailsList: any;
  public isEditMode = false;
  public getComplianceInstitutionMasterGridListObject: any;
  public selectedObjectForUpdate: any;
  public pfForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private complianceHeadService: ComplianceHeadService,
              private statuatoryComplianceService: StatuatoryComplianceService,
              private establishmentMasterService: EstablishmentMasterService, private datePipe: DatePipe,
              private complianceMasterService: ComplianceMasterService,
              private alertService: AlertServiceService) {
    this.form = this.formBuilder.group({
      pfFormArray: new FormArray([]),
      'epsArray': new FormArray([]),
      esiArray: new FormArray([]),
      ptArray: new FormArray([]),
      lwfArray: new FormArray([]),
      tdsArray: new FormArray([]),
      gratuityArray: new FormArray([]),
      saArray: new FormArray([]),

      complianceName: new FormControl(''),
      statutoryInstituteName: new FormControl(''),
      accountNumber: new FormControl(''),
      registrationNumber: new FormControl(''),
      complianceHeadName: new FormControl({ value: null, disabled: true }),
      shortName: new FormControl({ value: null, disabled: true }),
      groupCompanyId: new FormControl(''),

      establishmentCode: new FormControl(''),
      issueDate: new FormControl(''),
      coverageDate: new FormControl(''),
      userNameForWebsite: new FormControl(''),

      establishmentMasterId: new FormControl(''),
      city: new FormControl({ value: null, disabled: true }),

      esic1: new FormControl(''),
      esic1FromDate: new FormControl(''),
      esic1ToDate: new FormControl(''),

      eps1: new FormControl(''),
      eps1FromDate: new FormControl(''),
      eps1ToDate: new FormControl(''),

      gratuityDividingFactor: new FormControl(''),
      gratuityFromDate: new FormControl(''),
      gratuityToDate: new FormControl(''),

      saMaxPercentage: new FormControl(''),
      saFromDate: new FormControl(''),
      saToDate: new FormControl(''),

      ptState: new FormControl(''),
      ptCity: new FormControl(''),

      lwfState: new FormControl(''),

      tan: new FormControl(''),
      tdsCircle: new FormControl(''),
      deductorStatus: new FormControl(''),

      pfStatus: new FormControl(''),

      pfNilOptionChoice: new FormControl('0'),
      employeeCompanyContributionDiff: new FormControl('0'),
      edliExemption: new FormControl('0'),
      contributionMethodChoice: new FormControl('0'),

      companyContribution: new FormControl({ value: null, disabled: true }),
      employeeContribution: new FormControl(''),
      companyContribtionMultiSelect: new FormControl(''),
      employeeContribtionMultiSelect: new FormControl(''),

      companyFromDate: new FormControl(''),
      companyToDate: new FormControl('31-Dec-9999'),
      employeeFromDate: new FormControl(''),
      employeeToDate: new FormControl('31-Dec-9999'),

    });
    this.complianceApplicationForm = this.formBuilder.group({
      complianceName: new FormControl('', Validators.required),
      jobMasterType: new FormControl('', Validators.required),
      allOtherMasterMappingDetails: new FormControl('', Validators.required),
    });
    this.form.get('employeeCompanyContributionDiff').disable();

  }

  public ngOnInit(): void {

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'establishmentMasterId',
      textField: 'establishmentCode',

      itemsShowLimit: 2,
      allowSearchFilter: true,
    };
    this.dropdownSettingsForPF = {
      singleSelection: false,
      idField: 'id',
      textField: 'itemName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true,
    };
    this.dropdownSettingsAllOtherMasterMappingDetails = {
      singleSelection: false,
      idField: 'masterMappingId',
      textField: 'masterCode',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true,
    };

    this.complianceHeadService.getComplianceHeadDetails().subscribe((res) => {
      console.log(res.data.results);
      this.complianceHeadDetailsObject = res.data.results;

      res.data.results.forEach((element) => {
        this.complianceHeadNameList.push(element.complianceHeadName);
        this.complianceHeadId_Country_aplicabilityLevel_complianceHeadName_Object.push({ complianceHeadId: element.complianceHeadId, country: element.country, aplicabilityLevel: element.aplicabilityLevel, complianceHeadName: element.complianceHeadName });
      });
    });

    this.statuatoryComplianceService.getLocationInformationOrCountryList().subscribe((res) => {
      this.countries = res.data.results;
    });

    this.complianceMasterService.getStates().subscribe((res) => {
      this.states = res.data.results;

    });
    this.complianceMasterService.getAllOtherMastersMappingDetails().subscribe((res) => {
      this.getAllOtherMastersMappingDetailsResponse = res.data.results;
    });

    // get Region dropdown data
    this.establishmentMasterService.getRegionMasterDetails().subscribe((res) => {
      this.regionMasterDetails = res.data.results;
    });

    this.complianceMasterService.getAllOtherMasterDetails().subscribe((res) => {

      res.data.results.forEach((element) => {
        const ele = this.getAllOtherMasterDetailsResponse.findIndex((x) => x.itemName == element.masterType);

        // for checking if itemName is already exist, below code is used for uniqueness dropdown list of job master field/ job master types...
        if (ele < 0) {
          this.getAllOtherMasterDetailsResponse.push({ id: element.masterId, itemName: element.masterType });
        }
      });
    });
    this.getInstitutionMaster();
    this.getEstablishmentMasterDetailsAndRefreshHtmlTable();
    this.refreshHtmlTableDataOfComplianceApplicability();

  } // end of ngOnInit
  // refreshHtmlTableData() {
  //   this.summaryHtmlDataList = [];
  //   this.masterGridDataList = [];
  //   this.complianceMasterService.getComplianceMasterDetails().subscribe(res => {
  //     // below line is commented because if you soft delete the record it incluedes in it, it is problematic when we edit the record, it gives wrong editedRecordIndex
  //     //this.masterGridDataList = res.data.results;
  //     console.log(res.data.results);

  //     let srNo = 1;
  //     res.data.results.forEach(element => {
  //       // if (element.isActive == 0) {
  //         // soft deleted record

  //       // } else {
  //         this.masterGridDataList.push(element);
  //         var filteredEvents = this.institutionMasterList.filter(function (event) {
  //           return event.institutionName == element.statutoryInstituteName;
  //         });
  //         let establishmentNames: string;

  //         for (let i = 0; i < element.complianceDetail.length; i++) {
  //           if (i == 0) {
  //             let index = this.dropdownList.findIndex(o => o.establishmentMasterId == element.complianceDetail[i].establishmentMasterId);
  //             establishmentNames = this.dropdownList[index].establishmentCode;
  //           } else {
  //             establishmentNames += ', ';
  //             let index = this.dropdownList.findIndex(o => o.establishmentMasterId == element.complianceDetail[i].establishmentMasterId);
  //             establishmentNames += this.dropdownList[index].establishmentCode;
  //           }
  //         }
  //         let tempObjEstablishmentAddress = this.establishmentDetailsMasterList.find(o => o.establishmentMasterId == element.complianceDetail[0].establishmentMasterId);

  //         const obj = {
  //           SrNo: srNo++,
  //           complianceName: element.complianceName,
  //           statutoryInstituteName: element.statutoryInstituteName,
  //           complianceHeadShortName: element.complianceHeadShortName,
  //           accountNumber: element.accountNumber,
  //           establishmentCode: tempObjEstablishmentAddress.establishmentCode,
  //           registrationNumber: element.registrationNumber,
  //           complianceMasterId: element.complianceMasterId,
  //           tempObjEstablishmentAddress: tempObjEstablishmentAddress,
  //           groupCompanyId: element.groupCompanyId,
  //           issueDate: element.issueDate,
  //           coverageDate: element.coverageDate,
  //           userNameForWebsite: element.userNameForWebsite,
  //           filter: filteredEvents[0],
  //           establishmentNames: establishmentNames,
  //           isActive: element.isActive,
  //         };
  //         this.summaryHtmlDataList.push(obj);
  //     });
  //   });
  //   // console.log(this.summaryHtmlDataList);
  //   this.commonValidation();
  // }
  save() {
    console.log(this.ServicesList);

    const complianceDetails = [];
    let pfNilOptionChoiceOption = 'NO';
    let edliExemptionOption = 'NO';
    let contributionMethodChoiceOption = 'NO';
    let employeeCompanyContributionDiffOption = 'NO';

    const data = this.form.getRawValue();

    delete data.jobMaster;
    delete data.establishmentCode;
    delete data.groupCompanyId;
    data.groupCompanyId = 1;

    // for radio button
    if (data.pfNilOptionChoice == 1) {
      pfNilOptionChoiceOption = 'YES';
    }
    if (data.edliExemption == 1) {
      edliExemptionOption = 'YES';
    }
    if (data.contributionMethodChoice == 1) {
      contributionMethodChoiceOption = 'YES';
    }
    if (data.employeeCompanyContributionDiff == 1) {
      employeeCompanyContributionDiffOption = 'YES';
    }
    if (data.employeeCompanyContributionDiff == undefined) {
      employeeCompanyContributionDiffOption = 'NO';
    }

    data.pfNilOptionChoice = pfNilOptionChoiceOption;
    data.edliExemption = edliExemptionOption;
    data.contributionMethodChoice = contributionMethodChoiceOption;
    data.employeeCompanyContributionDiff = employeeCompanyContributionDiffOption;

    data.issueDate = this.datePipe.transform(this.form.get('issueDate').value, 'dd-MMM-yyyy');
    data.companyFromDate = this.datePipe.transform(this.form.get('companyFromDate').value, 'dd-MMM-yyyy');
    data.companyToDate = this.datePipe.transform(this.form.get('companyToDate').value, 'dd-MMM-yyyy');
    data.employeeFromDate = this.datePipe.transform(this.form.get('employeeFromDate').value, 'dd-MMM-yyyy');
    data.esic1FromDate = this.datePipe.transform(this.form.get('esic1FromDate').value, 'dd-MMM-yyyy');
    data.esic1ToDate = this.datePipe.transform(this.form.get('esic1ToDate').value, 'dd-MMM-yyyy');
    data.employeeToDate = this.datePipe.transform(this.form.get('employeeToDate').value, 'dd-MMM-yyyy');
    data.coverageDate = this.datePipe.transform(this.form.get('coverageDate').value, 'dd-MMM-yyyy');
    data.gratuityFromDate = this.datePipe.transform(this.form.get('gratuityFromDate').value, 'dd-MMM-yyyy');
    data.gratuityToDate = this.datePipe.transform(this.form.get('gratuityToDate').value, 'dd-MMM-yyyy');
    data.saFromDate = this.datePipe.transform(this.form.get('saFromDate').value, 'dd-MMM-yyyy');
    data.saToDate = this.datePipe.transform(this.form.get('saToDate').value, 'dd-MMM-yyyy');
    data.eps1FromDate = this.datePipe.transform(this.form.get('eps1FromDate').value, 'dd-MMM-yyyy');
    data.eps1ToDate = this.datePipe.transform(this.form.get('eps1ToDate').value, 'dd-MMM-yyyy');
    console.log(data);

    let selectedStringCompanyContributionList;
    let selectedStringEmployeeContributionList;
    for (let i = 0; i < this.companyContributionList.length; i++) {
      if (i == 0) {
        selectedStringCompanyContributionList = this.companyContributionList[i].itemName;
      } else {
        selectedStringCompanyContributionList += ',';
        selectedStringCompanyContributionList += this.companyContributionList[i].itemName;
      }
    }

    for (let i = 0; i < this.defaultEmployeeContributionList.length; i++) {
      if (i == 0) {
        selectedStringEmployeeContributionList = this.defaultEmployeeContributionList[i].itemName;
      } else {
        selectedStringEmployeeContributionList += ',';
        selectedStringEmployeeContributionList += this.defaultEmployeeContributionList[i].itemName;
      }
    }

    if (data.shortName === 'PF') {

      if (data.contributionMethodChoice == 'YES') {
        for (let i = 0; i < this.ServicesList.length; i++) {
          complianceDetails.push({
            establishmentMasterId: this.ServicesList[i].establishmentMasterId,
            pfStatus: data.pfStatus,
            pfNilOptionChoice: data.pfNilOptionChoice,
            employeeCompanyContributionDiff: data.employeeCompanyContributionDiff,
            edliExemption: data.edliExemption,
            contributionMethodChoice: 'YES',
            companyContribution: selectedStringCompanyContributionList,
            companyFromDate: data.companyFromDate,
            companyToDate: data.companyToDate,
            employeeContribution: selectedStringEmployeeContributionList,
            employeeFromDate: data.employeeFromDate,
            employeeToDate: data.employeeToDate,
          });
        }

      } else if (data.contributionMethodChoice == 'NO') {

        for (let i = 0; i < this.ServicesList.length; i++) {
          complianceDetails.push({
            establishmentMasterId: this.ServicesList[i].establishmentMasterId,
            pfStatus: data.pfStatus,
            pfNilOptionChoice: data.pfNilOptionChoice,
            employeeCompanyContributionDiff: data.employeeCompanyContributionDiff,
            edliExemption: data.edliExemption,
            contributionMethodChoice: 'NO',

            companyContribution: data.companyContribution,
            companyFromDate: data.companyFromDate,
            companyToDate: data.companyToDate,

            employeeContribution: data.employeeContribution,
            employeeFromDate: data.employeeFromDate,
            employeeToDate: data.employeeToDate,
          });
        }
      } else {
        console.log('errrrorrrorr');
      }
    }

    if (data.shortName === 'EPS') {
      for (let i = 0; i < this.ServicesList.length; i++) {
        complianceDetails.push({
          establishmentMasterId: this.ServicesList[i].establishmentMasterId,
          eps1: data.eps1,
          eps1FromDate: data.eps1FromDate,
          eps1ToDate: data.eps1ToDate,
        });
      }
    }
    if (data.shortName === 'PT') {
      for (let i = 0; i < this.ServicesList.length; i++) {
        complianceDetails.push({
          establishmentMasterId: this.ServicesList[i].establishmentMasterId,
          ptState: data.ptState,
          ptCity: data.ptCity,

        });
      }
    }
    if (data.shortName === 'TDS') {
      for (let i = 0; i < this.ServicesList.length; i++) {
        complianceDetails.push({
          establishmentMasterId: this.ServicesList[i].establishmentMasterId,
          tan: data.tan,
          tdsCircle: data.tdsCircle,
          deductorStatus: data.deductorStatus,
        });
      }

    }
    if (data.shortName === 'ESIC') {
      for (let i = 0; i < this.ServicesList.length; i++) {
        complianceDetails.push({
          establishmentMasterId: this.ServicesList[i].establishmentMasterId,
          esic1: data.esic1,
          esic1FromDate: data.esic1FromDate,
          esic1ToDate: data.esic1ToDate,
        });
      }
    }
    if (data.shortName === 'LWF') {

      for (let i = 0; i < this.ServicesList.length; i++) {
        complianceDetails.push({
          establishmentMasterId: this.ServicesList[i].establishmentMasterId,
          lwfState: data.lwfState,
        });
      }
    }
    if (data.shortName === 'Gratuity') {
      for (let i = 0; i < this.ServicesList.length; i++) {
        complianceDetails.push({
          establishmentMasterId: this.ServicesList[i].establishmentMasterId,
          gratuityDividingFactor: data.gratuityDividingFactor,
          gratuityFromDate: data.gratuityFromDate,
          gratuityToDate: data.gratuityToDate,
        });
      }
    }
    if (data.shortName === 'SA') {

      for (let i = 0; i < this.ServicesList.length; i++) {
        complianceDetails.push({
          establishmentMasterId: this.ServicesList[i].establishmentMasterId,
          saMaxPercentage: data.saMaxPercentage,
          saFromDate: data.saFromDate,
          saToDate: data.saToDate,
        });
      }
    }
    if (data.shortName === 'S&E') {
      console.log('Not Avail');
    }
    if (data.shortName === 'Factories') {
      console.log('Not Avail');
    }
    if (data.shortName === 'BOCW') {
      console.log('Not Avail');
    }
    if (data.shortName === 'CLRA') {
      console.log('Not Avail');
    }
    if (data.shortName === 'EE') {
      console.log('Not Avail');   // Employment Exchanges
    }
    if (data.shortName === 'PWD') {
      console.log('Not Avail');  // Public works department
    }
    if (data.shortName === 'TAN') {
      console.log('Not Avail in master');  // Public works department
    }
    const tempObj = this.institutionMasterList.find((o) => o.complianceHeadId == data.statutoryInstituteName);
    console.log(tempObj);
    const saveData = {
      complianceName: data.complianceName,
      statutoryInstituteName: tempObj.institutionName,
      complianceHeadShortName: data.shortName,
      accountNumber: data.accountNumber,
      groupCompanyId: data.groupCompanyId,
      registrationNumber: data.registrationNumber,
      issueDate: data.issueDate,
      coverageDate: data.coverageDate,
      userNameForWebsite: data.userNameForWebsite,
      complianceDetails,
    };
    console.log(saveData);

    this.complianceMasterService.postComplianceMaster(saveData).subscribe((res) => {
      console.log(res);
      if (res.data.results.length > 0) {
        console.log(res);
        this.alertService.sweetalertMasterSuccess('Compliance Master Details Saved Successfully.', '');

        this.form.setControl('pfFormArray', new FormArray([]));
        this.form.setControl('epsArray', new FormArray([]));
        this.form.setControl('esiArray', new FormArray([]));
        this.form.setControl('ptArray', new FormArray([]));
        this.form.setControl('lwfArray', new FormArray([]));
        this.form.setControl('tdsArray', new FormArray([]));
        this.form.setControl('gratuityArray', new FormArray([]));
        this.form.setControl('epsArray', new FormArray([]));
        this.form.reset();
        this.isSaveAndReset = true;
        this.showButtonSaveAndReset = true;
        this.setPfDefaultValueAfterReset();
        this.isPf = false;
        this.isPfNew = false;
        this.isEps = false;
        this.isEsi = false;
        this.isPt = false;
        this.isLw = false;
        this.isTaxDeductedAtSource = false;
        this.isGratuity = false;
        this.isSa = false;  // Super Annuation

        this.getEstablishmentMasterDetailsAndRefreshHtmlTable();
      } else {
        this.alertService.sweetalertWarning(res.status.messsage);
      }

    }, (error: any) => {
      this.alertService.sweetalertError(error['error']['status']['messsage']);
    });
  }
  saveComplianceApplication() {
    const applicabilityDetails = [];
    const data = this.complianceApplicationForm.getRawValue();
    console.log(data); if (data.jobMasterType === 'RegionMaster') {

      for (let i = 0; i < data.allOtherMasterMappingDetails.length; i++) {
        applicabilityDetails.push({ regionMasterId: data.allOtherMasterMappingDetails[i].masterMappingId });
      }
    } else if (data.jobMasterType == 'SubLocationMaster') {

      for (let i = 0; i < data.allOtherMasterMappingDetails.length; i++) {
        applicabilityDetails.push({ subLocationMasterId: data.allOtherMasterMappingDetails[i].masterMappingId });
      }
    } else if (data.jobMasterType == 'BusinessAreaMaster') { } else if (data.jobMasterType == 'SubArea') { } else if (data.jobMasterType == 'CostCentre') { } else if (data.jobMasterType == 'SubCostCenter') { } else if (data.jobMasterType == 'DivisionMaster') { } else if (data.jobMasterType == 'DepartmentMaster') { } else if (data.jobMasterType == 'SubDepartment') { } else if (data.jobMasterType == 'GradeMaster') { } else if (data.jobMasterType == 'PlantMaster') { } else if (data.jobMasterType == 'ProjectMaster') { } else if (data.jobMasterType == 'ProfitCentreMaster') { } else if (data.jobMasterType == 'StrategicBusinessUnit') { } else if (data.jobMasterType == 'WorkLocationMaster') { }
    const saveData = {
      complianceMasterId: data.complianceName,
      jobMasterType: data.jobMasterType,
      applicabilityDetails,    };
    console.log(JSON.stringify(saveData));

    this.complianceMasterService.postComplianceApplicability(saveData).subscribe((res) => {
      console.log(res);
      if (res.data.results.length > 0) {
        this.alertService.sweetalertMasterSuccess('Compliance Applicability Details Saved Successfully.', '');
        this.complianceApplicationForm.reset();
      } else {
        this.alertService.sweetalertWarning(res.status.messsage);
      }
    }, (error: any) => {
      this.alertService.sweetalertError(error['error']['status']['messsage']);
    });
  }

  editMaster(i: number, establishmentMasterId: number, complianceHeadShortName: string, establishmentNames: string, isView: boolean) {
    this.form.enable();
    this.isGlobalView = false;
    this.isView = isView;
    this.editedRecordIndex = i;
    this.isEditableEstablismentMasterId = true;
    this.isDefaultContribution = false;
    this.savedEstablishmentList = [];
    this.ServicesList = [];

    if (this.pfArray.controls.length !== 0) {
      for (let i = 0; i < this.pfArray.length; i++) {
        this.pfArray.removeAt(i);
      }
    }
    if (this.epsArray.controls.length !== 0) {
      for (let i = 0; i < this.epsArray.length; i++) {
        this.epsArray.removeAt(i);
      }
    }
    if (this.esiArray.controls.length !== 0) {
      for (let i = 0; i < this.esiArray.length; i++) {
        this.esiArray.removeAt(i);
      }
    }
    if (this.ptArray.controls.length !== 0) {
      for (let i = 0; i < this.ptArray.length; i++) {
        this.ptArray.removeAt(i);
      }
    }
    if (this.lwfArray.controls.length !== 0) {
      for (let i = 0; i < this.lwfArray.length; i++) {
        this.lwfArray.removeAt(i);
      }
    }
    if (this.tdsArray.controls.length !== 0) {
      for (let i = 0; i < this.tdsArray.length; i++) {
        this.tdsArray.removeAt(i);
      }
    }
    if (this.gratuityArray.controls.length !== 0) {
      for (let i = 0; i < this.gratuityArray.length; i++) {
        this.gratuityArray.removeAt(i);
      }
    }
    if (this.saArray.controls.length !== 0) {
      for (let i = 0; i < this.saArray.length; i++) {
        this.saArray.removeAt(i);
      }
    }
    let establishmentNamesArray = establishmentNames.split(',');
    console.log(establishmentNamesArray);
    const establishmentNamesArrayMultiselect = [];

    for (let i = 0; i < establishmentNamesArray.length; i++) {

      const a = this.dropdownList.findIndex((o) => o.establishmentCode == establishmentNamesArray[i].trim());
      establishmentNamesArrayMultiselect.push(this.dropdownList[a]);

      this.ServicesList.push({ establishmentMasterId: this.dropdownList[a].establishmentMasterId, establishmentCode: this.dropdownList[a].establishmentCode });
      this.savedEstablishmentList.push({ establishmentMasterId: this.dropdownList[a].establishmentMasterId, establishmentCode: this.dropdownList[a].establishmentCode });
    }
    this.selectedObjectForUpdate = this.summaryHtmlDataList[i];
    this.isEditMode = true;
    this.isDefaultContribution = true;

    this.isPf = false;
    this.isPfNew = false;
    this.isEps = false;
    this.isEsi = false;
    this.isPt = false;
    this.isLw = false;
    this.isTaxDeductedAtSource = false;
    this.isGratuity = false;
    this.isSa = false;  // Super Annuation

    if (complianceHeadShortName === 'PF') {
      // this.isPf = true;
      this.addPfFormControl(this.editedRecordIndex, this.ServicesList[0], false);
    }
    if (complianceHeadShortName === 'EPS') {
      // this.isEps = true;
      this.addEpsFormControl(this.editedRecordIndex, this.ServicesList[0], false);
    }
    if (complianceHeadShortName === 'PT') {
     // this.isPt = true;
      this.addPtFormControl(this.editedRecordIndex, this.ServicesList[0], false);
    }
    if (complianceHeadShortName === 'TDS') {
     // this.isTaxDeductedAtSource = true;
      this.addTdsFormControl(this.editedRecordIndex, this.ServicesList[0], false);
    }
    if (complianceHeadShortName === 'ESIC') {
     // this.isEsi = true;
      this.addEsiFormControl(this.editedRecordIndex, this.ServicesList[0], false);
    }
    if (complianceHeadShortName === 'LWF') {
     // this.isLw = true;
      this.addLWFFormControl(this.editedRecordIndex, this.ServicesList[0], false);
    }
    if (complianceHeadShortName === 'S&E') {
      console.log('Not Avail');
    }
    if (complianceHeadShortName === 'Factories') {
      console.log('Not Avail');
    }
    if (complianceHeadShortName === 'SA') {
      this.isSa = true;
    }
    if (complianceHeadShortName === 'Gratuity') {
      this.isGratuity = true;
    }
    if (complianceHeadShortName === 'BOCW') {
      console.log('Not Avail');
    }
    if (complianceHeadShortName === 'CLRA') {
      console.log('Not Avail');
    }
    if (complianceHeadShortName === 'EE') {
      console.log('Not Avail');   // Employment Exchanges
    }
    if (complianceHeadShortName === 'PWD') {
      console.log('Not Avail');  // Public works department
    }
    this.isSaveAndReset = false;
    this.showButtonSaveAndReset = true;
    this.establishmentMasterId = establishmentMasterId;
    this.form.patchValue({
      complianceName: this.masterGridDataList[i].complianceName,
      complianceHeadShortName: this.masterGridDataList[i].complianceHeadShortName,
      statutoryInstituteName: this.masterGridDataList[i].statutoryInstituteName,
      complianceHeadName: this.summaryHtmlDataList[i].filter.complianceDetailObject.complianceHeadName,
      shortName: complianceHeadShortName,

      accountNumber: this.masterGridDataList[i].accountNumber,
      groupCompanyId: this.masterGridDataList[i].groupCompanyId,
      establishmentMasterId: establishmentNamesArray,
      registrationNumber: this.masterGridDataList[i].registrationNumber,
      establishmentCode: this.masterGridDataList[i].establishmentCode,
      issueDate: this.masterGridDataList[i].issueDate,
      coverageDate: this.masterGridDataList[i].coverageDate,
      userNameForWebsite: this.masterGridDataList[i].userNameForWebsite,

      eps1: this.masterGridDataList[i].complianceDetail[0].eps1,
      eps1FromDate: this.masterGridDataList[i].complianceDetail[0].eps1FromDate,
      eps1ToDate: this.masterGridDataList[i].complianceDetail[0].eps1ToDate,

      esic1: this.masterGridDataList[i].complianceDetail[0].esic1,
      esic1FromDate: this.masterGridDataList[i].complianceDetail[0].esic1FromDate,
      esic1ToDate: this.masterGridDataList[i].complianceDetail[0].esic1ToDate,

      gratuityDividingFactor: this.masterGridDataList[i].complianceDetail[0].gratuityDividingFactor,
      gratuityFromDate: this.masterGridDataList[i].complianceDetail[0].gratuityFromDate,
      gratuityToDate: this.masterGridDataList[i].complianceDetail[0].gratuityToDate,

      saFromDate: this.masterGridDataList[i].complianceDetail[0].saFromDate,
      saMaxPercentage: this.masterGridDataList[i].complianceDetail[0].saMaxPercentage,
      saToDate: this.masterGridDataList[i].complianceDetail[0].saToDate,

      lwfState: this.masterGridDataList[i].complianceDetail[0].lwfState,

      ptCity: this.masterGridDataList[i].complianceDetail[0].ptCity,
      ptState: this.masterGridDataList[i].complianceDetail[0].ptState,

      tan: this.masterGridDataList[i].complianceDetail[0].tan,
      tdsCircle: this.masterGridDataList[i].complianceDetail[0].tdsCircle,
      deductorStatus: this.masterGridDataList[i].complianceDetail[0].deductorStatus,
    });
    this.form.get('complianceHeadName').disable();
    this.form.get('shortName').disable();
    this.form.get('establishmentMasterId').disable();
    this.form.get('statutoryInstituteName').disable();
  }

  viewMaster(i: number, establishmentMasterId: number, complianceHeadShortName: string, establishmentNames: string, active: number) {
    this.isActivateButton = active;

  //  debugger
    console.log(active);
    this.isView = true;
    this.isEditMode = false;

    this.ServicesList = [];
    this.establishmentMasterId = 0;

    this.isSaveAndReset = false;
    this.showButtonSaveAndReset = false;
    this.showButtonSaveAndReset = false;
    this.form.setControl('pfFormArray', new FormArray([]));
    this.form.setControl('epsArray', new FormArray([]));
    this.form.setControl('esiArray', new FormArray([]));
    this.form.setControl('ptArray', new FormArray([]));
    this.form.setControl('lwfArray', new FormArray([]));
    this.form.setControl('tdsArray', new FormArray([]));
    this.form.setControl('gratuityArray', new FormArray([]));
    this.form.setControl('epsArray', new FormArray([]));

    this.form.reset();
    this.editMaster(i, establishmentMasterId, complianceHeadShortName, establishmentNames, true);

    this.form.disable();
    this.form.get('pfFormArray').controls
      .forEach((control) => {
        control.controls.establishmentName.enable();
      });
    this.isGlobalView = true;
    this.isView = true;
  }

  cancelView() {
    this.isGlobalView = false;
    this.form.setControl('pfFormArray', new FormArray([]));
    this.form.setControl('epsArray', new FormArray([]));
    this.form.setControl('esiArray', new FormArray([]));
    this.form.setControl('ptArray', new FormArray([]));
    this.form.setControl('lwfArray', new FormArray([]));
    this.form.setControl('tdsArray', new FormArray([]));
    this.form.setControl('gratuityArray', new FormArray([]));
    this.form.setControl('epsArray', new FormArray([]));
    this.isEditableEstablismentMasterId = false;
    this.isEditMode = false;
    this.isDefaultContribution = true;
    this.isPf = false;
    this.isEps = false;
    this.isEsi = false;
    this.isPt = false;
    this.isLw = false;
    this.isPfNew = false;
    this.isTaxDeductedAtSource = false;
    this.isGratuity = false;
    this.isSa = false;  // Super Annuation
    this.establishmentMasterId = 0;
    this.isSaveAndReset = true;
    this.showButtonSaveAndReset = true;
    this.form.enable();
    this.form.reset();
    this.setPfDefaultValueAfterReset();
    this.showButtonSaveAndReset = true;
  }

  onSelectEstablishmentCode(evt: any) {

    const tempObjEstablishmentAddress = this.establishmentDetailsMasterList.find((o) => o.establishmentMasterId == this.form.get('establishmentMasterId').value.trim());
    console.log(tempObjEstablishmentAddress);
  }
  onSelectTypeOfEstablishment(evt: any) { }
  onBsValueChangeDateOfSetup(evt: any) { }

  onSelectOfficePremisesOwnership(evt: any) { }
  onBsValueChangeDateOfGstIssueDate() { }
  onBsValueChangeLinIssueDate() { }
  onBsValueChangeStpiIssueDate() { }
  onSelectPfStatus(evt: any) { }
  onSelectRegionMasterId(evt: any) {
    console.log(this.regionMasterDetails);
    const tempObj = this.regionMasterDetails.find((o) => o.masterCode == this.form.get('regionMasterId').value.trim());
    console.log(tempObj);
  }

  selectionChangedProvidentFundNilOption(event: any, i: number) {
    this.dropdownList1 = [];
    this.defaultEmployeeContributionList = [];
    this.companyContributionList = [];
    if (i == -1) {

      if (event.target.defaultValue == '0') {
        this.ContributionMethodChoiceList = ['FULL', 'RESTRICTED', 'EXPACT'];
        this.dropdownList1 = [{ id: 0, itemName: 'FULL' }, { id: 1, itemName: 'RESTRICTED' }, { id: 2, itemName: 'EXPACT' }];
      } else {
        this.dropdownList1 = [{ id: 0, itemName: 'FULL' }, { id: 1, itemName: 'RESTRICTED' }, { id: 2, itemName: 'EXPACT' }, { id: 3, itemName: 'NIL' }];
        this.ContributionMethodChoiceList = ['FULL', 'RESTRICTED', 'EXPACT', 'NIL'];
      }

    } else {
      if (this.form.get('pfFormArray').value[0].pfNilOptionChoice == 0) {
        this.ContributionMethodChoiceList = ['FULL', 'RESTRICTED', 'EXPACT'];
        this.dropdownList1 = [{ id: 0, itemName: 'FULL' }, { id: 1, itemName: 'RESTRICTED' }, { id: 2, itemName: 'EXPACT' }];

      } else {
        this.dropdownList1 = [{ id: 0, itemName: 'FULL' }, { id: 1, itemName: 'RESTRICTED' }, { id: 2, itemName: 'EXPACT' }, { id: 3, itemName: 'NIL' }];
        this.ContributionMethodChoiceList = ['FULL', 'RESTRICTED', 'EXPACT', 'NIL'];
      }
    }
  }
  selectionChangedContributionMethodIsDifferntOption(event: any, i: number) {
    let employeeContributionMultiSelectArray: any;
    this.SelectedemployeeContribtionMultiSelect = [];
    this.selectedCompanyContribtionMultiSelect = [];
    if (i == -1) {
      if (event.target.defaultValue == 0) {
        this.isDefaultContribution = false;
        this.SelectedemployeeContribtionMultiSelect = [];
        this.selectedCompanyContribtionMultiSelect = [];
        this.companyContributionList = [];
        this.defaultEmployeeContributionList = [];

      } else {
        this.isDefaultContribution = false;
        this.SelectedemployeeContribtionMultiSelect = [];
        this.selectedCompanyContribtionMultiSelect = [];
        this.companyContributionList = [];
        this.defaultEmployeeContributionList = [];
        this.isRestrictedDisableMultiSelect = false;
      }

    } else {
      if (event.target.defaultValue == 0) {
        this.isDefaultContribution = false;
        this.SelectedemployeeContribtionMultiSelect = [];
        this.selectedCompanyContribtionMultiSelect = [];
        this.companyContributionList = [];
        this.defaultEmployeeContributionList = [];

        this.isRestrictedDisableMultiSelect = true;

      } else {
        this.isDefaultContribution = false;
        this.SelectedemployeeContribtionMultiSelect = [];
        this.selectedCompanyContribtionMultiSelect = [];
        this.companyContributionList = [];
        this.defaultEmployeeContributionList = [];
        this.isRestrictedDisableMultiSelect = false;
      }
    }
  }
  onChangeContributionMethodChoice(event: any, i: number) {

    if (i == -1) {

      if (event.target.defaultValue == 0) {
        this.form.patchValue({
          employeeCompanyContributionDiff: '0',
        });
        this.isDefaultContribution = true;
        this.form.get('employeeCompanyContributionDiff').disable();
        if (this.form.get('employeeCompanyContributionDiff').value == 1) {

        }
      } else {
        this.isDefaultContribution = false;
        this.SelectedemployeeContribtionMultiSelect = [];
        this.selectedCompanyContribtionMultiSelect = [];

        this.isRestrictedDisableMultiSelect = false;

        this.form.get('employeeCompanyContributionDiff').enable();
      }
    } else {
      console.log('in i !==-1');
      if (event.target.defaultValue == 0) {
        this.pfArray.patchValue([{
          employeeCompanyContributionDiff: '0',

        }]);

        this.form.get('pfFormArray').controls
          .forEach((control) => {
            control.controls.employeeCompanyContributionDiff.disable();
          });

        this.form.get('pfFormArray').controls
          .forEach((control) => {
            control.controls.companyContribution.disable();
          });
        this.isDefaultContribution = true;

      } else {
        this.isDefaultContribution = false;
        this.form.get('pfFormArray').controls
          .forEach((control) => {
            control.controls.employeeCompanyContributionDiff.enable();
          });
      }
    }
  }

  getInstitutionMaster() {
    this.institutionMasterList = [];
    this.getComplianceInstitutionMasterGridListObject = {};
    this.complianceHeadDetailsObject = {};

    combineLatest([this.complianceHeadService.getComplianceHeadDetails(), this.statuatoryComplianceService.getCompliaceInstitutionMasterDetails(),  this.complianceMasterService.getComplianceMasterDetails()]).subscribe((res: any) => {
     console.log(res[0]);
     console.log(res[1]);
     this.getComplianceHeadDetailsObject = res[0];
     this.getComplianceInstituionMasterDetails = res[1];
     this.complianceHeadDetailsObject = res[0].data.results;
     this.getComplianceInstitutionMasterGridListObject = res[1].data.results;

     res[1].data.results.forEach((element) => {
      const tempObjForgroupNameScaleStartDate = this.complianceHeadId_Country_aplicabilityLevel_complianceHeadName_Object.find((o) => o.complianceHeadId == element.complianceHeadId);
      this.complianceHeadNameList.push(element.complianceHeadName);
      this.institutionMasterObject.push({ complianceHeadId: element.complianceHeadId, country: element.country, aplicabilityLevel: element.aplicabilityLevel, complianceHeadName: element.complianceHeadName });
      let i = 1;
      this.institutionNameList.push({ label: element.institutionName, value: element.complianceHeadId });
      const tempComplianceHeadObject = this.complianceHeadDetailsObject.find((o) => o.complianceHeadId == element.complianceHeadId);

      const obj = {
        SrNo: i++,
        institutionName: element.institutionName,
        complianceHeadId: element.complianceHeadId,
        country: element.country,
        applicabilityLevel: element.applicabilityLevel,
        address1: element.address1,
        address2: element.address2,
        address3: element.address3,
        state: element.state,
        city: element.city,
        village: element.village,
        pinCode: element.pinCode,
        typeOfOffice: element.typeOfOffice,
        telephoneNumber: element.telephoneNumber,
        emailId: element.emailId,
        complianceHeadName: tempObjForgroupNameScaleStartDate.complianceHeadName,
        country1: tempObjForgroupNameScaleStartDate.country,
        complianceInstitutionMasterId: element.complianceInstitutionMasterId,
        tempObjForgroupNameScaleStartDate,
        complianceDetailObject: tempComplianceHeadObject,
      };
      this.institutionMasterList.push(obj);
    });

     this.summaryHtmlDataList = [];
     this.masterGridDataList = [];

     let srNo = 1;
     res[2].data.results.forEach((element) => {
        // if (element.isActive == 0) {
          // soft deleted record

        // } else {
          this.masterGridDataList.push(element);
          let filteredEvents = this.institutionMasterList.filter(function(event) {
            return event.institutionName == element.statutoryInstituteName;
          });
          let establishmentNames: string;

          for (let i = 0; i < element.complianceDetail.length; i++) {
            if (i == 0) {
              const index = this.dropdownList.findIndex((o) => o.establishmentMasterId == element.complianceDetail[i].establishmentMasterId);
              establishmentNames = this.dropdownList[index].establishmentCode;
            } else {
              establishmentNames += ', ';
              const index = this.dropdownList.findIndex((o) => o.establishmentMasterId == element.complianceDetail[i].establishmentMasterId);
              establishmentNames += this.dropdownList[index].establishmentCode;
            }
          }
          const tempObjEstablishmentAddress = this.establishmentDetailsMasterList.find((o) => o.establishmentMasterId == element.complianceDetail[0].establishmentMasterId);

          const obj = {
            SrNo: srNo++,
            complianceName: element.complianceName,
            statutoryInstituteName: element.statutoryInstituteName,
            complianceHeadShortName: element.complianceHeadShortName,
            accountNumber: element.accountNumber,
            establishmentCode: tempObjEstablishmentAddress.establishmentCode,
            registrationNumber: element.registrationNumber,
            complianceMasterId: element.complianceMasterId,
            tempObjEstablishmentAddress,
            groupCompanyId: element.groupCompanyId,
            issueDate: element.issueDate,
            coverageDate: element.coverageDate,
            userNameForWebsite: element.userNameForWebsite,
            filter: filteredEvents[0],
            establishmentNames,
            isActive: element.isActive,
          };
          this.summaryHtmlDataList.push(obj);
      });
    });
    // console.log(this.summaryHtmlDataList);
    this.commonValidation();

    // this.complianceHeadService.getComplianceHeadDetails().subscribe(res => {
    //   this.complianceHeadDetailsObject = res.data.results;
    //   res.data.results.forEach(element => {
    //     this.complianceHeadNameList.push(element.complianceHeadName);
    //     this.institutionMasterObject.push({ complianceHeadId: element.complianceHeadId, country: element.country, aplicabilityLevel: element.aplicabilityLevel, complianceHeadName: element.complianceHeadName });
    //   });
    // }, (error: any) => {
    //   this.sweetalertError(error["error"]["status"]["messsage"]);
    // }, () => {
    //   this.statuatoryComplianceService.getCompliaceInstitutionMasterDetails().subscribe(res => {
    //     this.getComplianceInstitutionMasterGridListObject = res.data.results;
    //     let i = 1;
    //     res.data.results.forEach(element => {

    //       let tempObjForgroupNameScaleStartDate = this.complianceHeadId_Country_aplicabilityLevel_complianceHeadName_Object.find(o => o.complianceHeadId == element.complianceHeadId);
    //       this.institutionNameList.push({ label: element.institutionName, value: element.complianceHeadId });
    //       let tempComplianceHeadObject = this.complianceHeadDetailsObject.find(o => o.complianceHeadId == element.complianceHeadId);

    //       const obj = {
    //         SrNo: i++,
    //         institutionName: element.institutionName,
    //         complianceHeadId: element.complianceHeadId,
    //         country: element.country,
    //         applicabilityLevel: element.applicabilityLevel,
    //         address1: element.address1,
    //         address2: element.address2,
    //         address3: element.address3,
    //         state: element.state,
    //         city: element.city,
    //         village: element.village,
    //         pinCode: element.pinCode,
    //         typeOfOffice: element.typeOfOffice,
    //         telephoneNumber: element.telephoneNumber,
    //         emailId: element.emailId,
    //         complianceHeadName: tempObjForgroupNameScaleStartDate.complianceHeadName,
    //         country1: tempObjForgroupNameScaleStartDate.country,
    //         complianceInstitutionMasterId: element.complianceInstitutionMasterId,
    //         tempObjForgroupNameScaleStartDate: tempObjForgroupNameScaleStartDate,
    //         complianceDetailObject: tempComplianceHeadObject,
    //       };
    //       this.institutionMasterList.push(obj);
    //     });
    //   });
    // });
  }
  onSelectStatuatoryInstitutionMaster(value: any, label: any) {
    this.clearEpsValidation();
    this.clearPfValidation();
    this.clearEsiValidation();
    this.clearPtValidation();
    this.clearlwfValidation();
    this.clearTdsValidation();
    this.clearGratuityValidation();
    this.clearSaValidation();

    this.isPf = false;
    this.isEps = false;
    this.isEsi = false;
    this.isPt = false;
    this.isLw = false;
    this.isTaxDeductedAtSource = false;
    this.isGratuity = false;
    this.isSa = false;  // Super Annuation
    this.isPfNew = false;
    this.isEpsNew = false;

    // blank if user has already selected establishment multi checkbox
    this.ServicesList = [];
    this.selectedEstablishmentMasterId = [];

    const tempObj = this.institutionMasterList.find((o) => o.complianceHeadId == value);
    console.log(tempObj);
    this.complianceHeadTempObj = this.complianceHeadDetailsObject.find((o) => o.complianceHeadId == tempObj.complianceHeadId);
    console.log(this.complianceHeadTempObj);

    this.form.patchValue({
      complianceHeadName: this.complianceHeadTempObj.complianceHeadName,
      shortName: this.complianceHeadTempObj.shortName,
    });

    if (this.complianceHeadTempObj.shortName === 'PF') {
      this.isPfNew = true;
      this.pfValidation();
    }
    if (this.complianceHeadTempObj.shortName === 'EPS') {
      this.isEpsNew = true;
      this.epsValidation();
    }
    if (this.complianceHeadTempObj.shortName === 'PT') {
      this.isPt = true;
      this.ptValidation();
    }
    if (this.complianceHeadTempObj.shortName === 'TDS') {
      this.isTaxDeductedAtSource = true;
      this.tdsValidation();
    }
    if (this.complianceHeadTempObj.shortName === 'ESIC') {
      this.isEsi = true;
      this.esiValidation();
    }
    if (this.complianceHeadTempObj.shortName === 'LWF') {
      this.isLw = true;
      this.lwfValidation();
    }
    if (this.complianceHeadTempObj.shortName === 'S&E') {
      console.log('Not Avail');
    }
    if (this.complianceHeadTempObj.shortName === 'Factories') {
      console.log('Not Avail');
    }
    if (this.complianceHeadTempObj.shortName === 'SA') {
      this.isSa = true;
      this.saValidation();
    }
    if (this.complianceHeadTempObj.shortName === 'Gratuity') {
      this.isGratuity = true;
      this.gratuityValidation();
    }
    if (this.complianceHeadTempObj.shortName === 'BOCW') {
      console.log('Not Avail');
    }
    if (this.complianceHeadTempObj.shortName === 'CLRA') {
      console.log('Not Avail');
    }
    if (this.complianceHeadTempObj.shortName === 'EE') {
      console.log('Not Avail');   // Employment Exchanges
    }
    if (this.complianceHeadTempObj.shortName === 'PWD') {
      console.log('Not Avail');  // Public works department
    }

  }
  getEstablishmentMasterDetailsAndRefreshHtmlTable() {
    this.dropdownList = [];
    this.establishmentDetailsMasterList = [];
    this.establishmentDetailsmasterGridDataList = [];
    this.establishmentCodeAndId = [];
    this.establishmentMasterService.getEstablishmentMasterDetails().subscribe((res) => {
      this.establishmentDetailsmasterGridDataList = res.data.results;
      this.dropdownList = res.data.results;
      let i = 1;

      res.data.results.forEach((element) => {
        this.establishmentCodeAndId.push({ label: element.establishmentCode, value: element.establishmentMasterId });
        const obj = {
          SrNo: i++,
          establishmentMasterId: element.establishmentMasterId,
          establishmentCode: element.establishmentCode,
          description: element.description,
          regionMasterId: element.regionMasterId,
          typeOfEstablishment: element.typeOfEstablishment,
          primaryBusinessActivity: element.primaryBusinessActivity,
          address1: element.address1,
          address2: element.address2,
          address3: element.address3,
          pinCode: element.pinCode,
          country: element.country,
          state: element.state,
          city: element.city,
          village: element.village,
          dateOfSetup: element.dateOfSetup,
          officePremisesOwnership: element.officePremisesOwnership,
          linNumber: element.linNumber,
          linIssueDate: element.linIssueDate,
          gstNumber: element.gstNumber,
          gstIssueDate: element.gstIssueDate,
          stpi: element.stpi,
          stpiIssueDate: element.stpiIssueDate,
        };
        this.establishmentDetailsMasterList.push(obj);
      });
    }, (error: any) => {
      this.alertService.sweetalertError(error['error']['status']['messsage']);

    }, () => {
     // this.refreshHtmlTableData();
    });
  }
  selectionChallenged(event) {
    console.log(event.target.defaultValue);
  }
  onItemSelect(item: any) {
    this.ServicesList.push({ establishmentMasterId: item.establishmentMasterId, establishmentCode: item.establishmentCode });
    console.log(item.establishmentCode);
  }
  onItemDeSelect(item: any) {
    let index = this.ServicesList.findIndex((o) => o.establishmentCode == item.establishmentCode);
    this.ServicesList.splice(index, 1);
    console.log(this.ServicesList);
  }

  onSelectAll(items: any) {
    this.ServicesList = [];
    this.ServicesList = items;
  }
  onDeselectAll(items: any) {
    this.ServicesList = [];
  }
  onDeselectAllDefaultEmpContribution(items: any, i: number) {
    debugger;
    if (i == -1) {
      this.defaultEmployeeContributionList = [];

      if (this.form.get('employeeCompanyContributionDiff').value == 0) {
        this.companyContributionList = [];
        this.form.patchValue({
          companyContribtionMultiSelect: this.companyContributionList,
        });
      }
      if (this.form.get('employeeCompanyContributionDiff').value == 0 && this.form.get('contributionMethodChoice').value == 1) {
        this.defaultEmployeeContributionList = [];
      }
    } else {
      if (this.form.get('pfFormArray').value[0].employeeCompanyContributionDiff == 0 && this.form.get('pfFormArray').value[0].contributionMethodChoice == 1) {
        this.defaultEmployeeContributionList = [];
      }
      if (this.form.get('pfFormArray').value[0].employeeCompanyContributionDiff == 0) {
        this.companyContributionList = [];
        this.pfArray.patchValue([{
          companyContribtionMultiSelect: this.companyContributionList,
        }]);
      } else {
        this.defaultEmployeeContributionList = [];
      }
    }
  }
  onItemSelectlDefaultEmpContribution(items: any, i: number) {
    if (i == -1) {
      this.defaultEmployeeContributionList.push({ id: items.id, itemName: items.itemName });

      if (this.form.get('employeeCompanyContributionDiff').value == 0) {
        this.companyContributionList.push({ id: items.id, itemName: items.itemName });
        this.form.patchValue({
          companyContribtionMultiSelect: this.companyContributionList,
        });
      }
    } else {
      if (this.form.get('pfFormArray').value[0].employeeCompanyContributionDiff == 0) {
        this.defaultEmployeeContributionList.push({ id: items.id, itemName: items.itemName });
        this.companyContributionList.push({ id: items.id, itemName: items.itemName });
        this.pfArray.patchValue([{
          companyContribtionMultiSelect: this.companyContributionList,
        }]);
      } else {
        this.defaultEmployeeContributionList.push({ id: items.id, itemName: items.itemName });
      }
    }
  }
  onSelectAllDefaultEmpContribution(items: any, i: number) {
    if (i == -1) {
      this.defaultEmployeeContributionList = [];
      this.defaultEmployeeContributionList = items;
      if (this.form.get('employeeCompanyContributionDiff').value == 0) {
        this.companyContributionList = [];
        this.companyContributionList = items;

        this.form.patchValue({
          companyContribtionMultiSelect: this.companyContributionList,
        });
      } else {
        this.defaultEmployeeContributionList = [];
        this.defaultEmployeeContributionList = items;
      }

    } else {
      if (this.form.get('pfFormArray').value[0].employeeCompanyContributionDiff == 0) {
        this.companyContributionList = [];
        this.companyContributionList = items;
        this.defaultEmployeeContributionList = [];
        this.defaultEmployeeContributionList = items;

        this.pfArray.patchValue([{
          companyContribtionMultiSelect: this.companyContributionList,
        }]);

      } else {
        this.defaultEmployeeContributionList = [];
        this.defaultEmployeeContributionList = items;
      }
    }
  }
  onItemDeSelectDefaultEmpContribution(items: any, i: number) {
    if (i === -1) {

      const index = this.defaultEmployeeContributionList.findIndex((o) => o.id == items.id);
      this.defaultEmployeeContributionList.splice(index, 1);

      if (this.form.get('employeeCompanyContributionDiff').value == 0) {
        console.log(this.companyContributionList);
        const i1 = this.companyContributionList.findIndex((o) => o.id == items.id);
        this.companyContributionList.splice(i1, 1);

        this.form.patchValue({
          companyContribtionMultiSelect: this.companyContributionList,
        });
      }
    } else {
      const index = this.defaultEmployeeContributionList.findIndex((o) => o.id == items.id);
      this.defaultEmployeeContributionList.splice(index, 1);

      if (this.form.get('pfFormArray').value[0].employeeCompanyContributionDiff == 0) {
        const i1 = this.companyContributionList.findIndex((o) => o.id == items.id);
        this.companyContributionList.splice(i1, 1);

        this.pfArray.patchValue([{
          companyContribtionMultiSelect: this.companyContributionList,
        }]);
      }
    }
  }

  onItemSelectlCompanyContribution(items: any) {
    this.companyContributionList.push({ id: items.id, itemName: items.itemName });
    if (this.form.get('employeeCompanyContributionDiff').value == 0) {
      this.selectedCompanyContribtionMultiSelect.push({ id: items.id, itemName: items.itemName });
    }
  }
  onDeselectAllCompanyContribution(items: any) {
    this.companyContributionList = [];
  }
  onSelectAllCompanyContribution(items: any) {
    this.companyContributionList = [];
    this.companyContributionList = items;
  }
  onItemDeSelectCompanyContribution(items: any) {
    let index = this.companyContributionList.indexOf(items.id);
    this.companyContributionList.splice(index, 1);
  }
  onItemSelectMappingDetails(items: any) {
    this.allOtherMappingDetailsList.push({ masterMappingId: items.masterMappingId, masterCode: items.masterCode });
  }
  onDeselectAllMappingDetails(items: any) {
    this.allOtherMappingDetailsList = [];
  }
  onSelectAllMappingDetails(items: any) {
    this.allOtherMappingDetailsList = [];
    this.allOtherMappingDetailsList = items;
  }
  onItemDeSelectMappingDetails(items: any) {
    let index = this.allOtherMappingDetailsList.indexOf(items.masterCode);
    this.allOtherMappingDetailsList.splice(index, 1);
  }

  onSelectJobMasterType(evt: any) {
    this.complianceApplicationForm.patchValue({
      allOtherMasterMappingDetails: '',
    });
    this.getFilteredRecordOfAllOtherMastersMappingDetailsList = [];
    this.tempGetAllOtherMastersMappingDetails = [];
    if (evt == 'CostCentre') {
      evt = 'CostCentre' + 'Mapping';
      let filteredEvents = this.getAllOtherMastersMappingDetailsResponse.filter(function(event) {
        return event.masterMappingType == evt && event.isActive == 1 && event.groupCompanyId == 1;
      });
      this.getFilteredRecordOfAllOtherMastersMappingDetailsList = filteredEvents;
    }
    if (evt == 'DivisionMaster') {
      evt = 'DivisionMaster' + 'Mapping';
      let filteredEvents = this.getAllOtherMastersMappingDetailsResponse.filter(function(event) {
        return event.masterMappingType == evt && event.isActive == 1 && event.groupCompanyId == 1;
      });
      this.getFilteredRecordOfAllOtherMastersMappingDetailsList = filteredEvents;
    }
    if (evt == 'DepartmentMaster') {
      evt = 'DepartmentMaster' + 'Mapping';

      let filteredEvents = this.getAllOtherMastersMappingDetailsResponse.filter(function(event) {
        return event.masterMappingType == evt && event.isActive == 1 && event.groupCompanyId == 1;
      });
      this.getFilteredRecordOfAllOtherMastersMappingDetailsList = filteredEvents;
    }
    if (evt == 'SubDepartment') {
      evt = 'SubDepartment' + 'Mapping';

      let filteredEvents = this.getAllOtherMastersMappingDetailsResponse.filter(function(event) {
        return event.masterMappingType == evt && event.isActive == 1 && event.groupCompanyId == 1;
      });
      this.getFilteredRecordOfAllOtherMastersMappingDetailsList = filteredEvents;
    }
    if (evt == 'GLCodeMaster') {
      evt = 'GLCodeMaster' + 'Mapping';
      let filteredEvents = this.getAllOtherMastersMappingDetailsResponse.filter(function(event) {
        return event.masterMappingType == evt && event.isActive == 1 && event.groupCompanyId == 1;
      });
      this.getFilteredRecordOfAllOtherMastersMappingDetailsList = filteredEvents;
    }
    if (evt == 'GradeMaster') {
      evt = 'GradeMaster' + 'Mapping';
      let filteredEvents = this.getAllOtherMastersMappingDetailsResponse.filter(function(event) {
        return event.masterMappingType == evt && event.isActive == 1 && event.groupCompanyId == 1;
      });
      this.getFilteredRecordOfAllOtherMastersMappingDetailsList = filteredEvents;
    }
    if (evt == 'StrategicBusinessUnit') {
      evt = 'StrategicBusinessUnit' + 'Mapping';
      let filteredEvents = this.getAllOtherMastersMappingDetailsResponse.filter(function(event) {
        return event.masterMappingType == evt && event.isActive == 1 && event.groupCompanyId == 1;
      });
      this.getFilteredRecordOfAllOtherMastersMappingDetailsList = filteredEvents;
    }
    if (evt == 'WorkLocationMaster') {
      evt = 'WorkLocationMaster' + 'Mapping';
      let filteredEvents = this.getAllOtherMastersMappingDetailsResponse.filter(function(event) {
        return event.masterMappingType == evt && event.isActive == 1 && event.groupCompanyId == 1;
      });
      this.getFilteredRecordOfAllOtherMastersMappingDetailsList = filteredEvents;
    }
    if (evt == 'SubCostCenter') {
      evt = 'SubCostCentre' + 'Mapping';
      let filteredEvents = this.getAllOtherMastersMappingDetailsResponse.filter(function(event) {
        return event.masterMappingType == evt && event.isActive == 1 && event.groupCompanyId == 1;
      });
      this.getFilteredRecordOfAllOtherMastersMappingDetailsList = filteredEvents;
    }
    if (evt == 'SubArea') {
      evt = 'SubArea' + 'Mapping';
      let filteredEvents = this.getAllOtherMastersMappingDetailsResponse.filter(function(event) {
        return event.masterMappingType == evt && event.isActive == 1 && event.groupCompanyId == 1;
      });
      this.getFilteredRecordOfAllOtherMastersMappingDetailsList = filteredEvents;
    }
    if (evt == 'BusinessAreaMaster') {
      evt = 'BusinessAreaMaster' + 'Mapping';
      let filteredEvents = this.getAllOtherMastersMappingDetailsResponse.filter(function(event) {
        return event.masterMappingType == evt && event.isActive == 1 && event.groupCompanyId == 1;
      });
      this.getFilteredRecordOfAllOtherMastersMappingDetailsList = filteredEvents;
    }
    if (evt == 'PlantMaster') {
      evt = 'PlantMaster' + 'Mapping';
      let filteredEvents = this.getAllOtherMastersMappingDetailsResponse.filter(function(event) {
        return event.masterMappingType == evt && event.isActive == 1 && event.groupCompanyId == 1;
      });
      this.getFilteredRecordOfAllOtherMastersMappingDetailsList = filteredEvents;
    }
    if (evt == 'ProjectMaster') {
      evt = 'ProjectMaster' + 'Mapping';
      let filteredEvents = this.getAllOtherMastersMappingDetailsResponse.filter(function(event) {
        return event.masterMappingType == evt && event.isActive == 1 && event.groupCompanyId == 1;
      });
      this.getFilteredRecordOfAllOtherMastersMappingDetailsList = filteredEvents;

    }
    if (evt === 'ProfitCentreMaster') {
       evt = 'ProfitCentreMaster' + 'Mapping';
       let filteredEvents = this.getAllOtherMastersMappingDetailsResponse.filter(function(event) {
        return event.masterMappingType == evt && event.isActive == 1 && event.groupCompanyId == 1;
      });
       this.getFilteredRecordOfAllOtherMastersMappingDetailsList = filteredEvents;

    }
    if (evt === 'RegionMaster') {
      evt = evt + 'Mapping';
      let filteredEvents = this.getAllOtherMastersMappingDetailsResponse.filter(function(event) {
        return event.masterMappingType == evt && event.isActive == 1 && event.groupCompanyId == 1;
      });
      this.getFilteredRecordOfAllOtherMastersMappingDetailsList = filteredEvents;
    }
    if (evt === 'SubLocationMaster') {
      evt = 'SubLocationMapping';
      var filteredEvents = this.getAllOtherMastersMappingDetailsResponse.filter(function(event) {
        return event.masterMappingType == evt && event.isActive == 1 && event.groupCompanyId == 1;
      });
      this.getFilteredRecordOfAllOtherMastersMappingDetailsList = filteredEvents;
    }

  }
  commonValidation() {
    this.form.get('complianceName').setValidators([Validators.required]);
    this.form.get('statutoryInstituteName').setValidators([Validators.required]);
    this.form.get('accountNumber').setValidators([Validators.required]);
    this.form.get('registrationNumber').setValidators([Validators.required]);
    this.form.get('issueDate').setValidators([Validators.required]);
    this.form.get('coverageDate').setValidators([Validators.required]);

    this.form.controls.complianceName.updateValueAndValidity();
    this.form.controls.statutoryInstituteName.updateValueAndValidity();
    this.form.controls.accountNumber.updateValueAndValidity();
    this.form.controls.registrationNumber.updateValueAndValidity();
    this.form.controls.issueDate.updateValueAndValidity();
    this.form.controls.coverageDate.updateValueAndValidity();
  }
  tdsValidation() {

    this.form.get('tan').setValidators([Validators.required]);
    this.form.controls.tan.updateValueAndValidity();

    this.form.get('tdsCircle').setValidators([Validators.required]);
    this.form.controls.tdsCircle.updateValueAndValidity();

    this.form.get('deductorStatus').setValidators([Validators.required]);
    this.form.controls.deductorStatus.updateValueAndValidity();

  }
  clearTdsValidation() {

    this.form.get('tan').clearValidators();
    this.form.controls.tan.updateValueAndValidity();

    this.form.get('tdsCircle').clearValidators();
    this.form.controls.tdsCircle.updateValueAndValidity();

    this.form.get('deductorStatus').clearValidators();
    this.form.controls.deductorStatus.updateValueAndValidity();

  }
  pfValidation() {

    this.form.get('pfStatus').setValidators([Validators.required]);
    this.form.controls.pfStatus.updateValueAndValidity();

    this.form.get('employeeToDate').setValidators([Validators.required]);
    this.form.controls.employeeToDate.updateValueAndValidity();

    this.form.get('employeeFromDate').setValidators([Validators.required]);
    this.form.controls.employeeFromDate.updateValueAndValidity();

    this.form.get('companyToDate').setValidators([Validators.required]);
    this.form.controls.companyToDate.updateValueAndValidity();

    this.form.get('companyFromDate').setValidators([Validators.required]);
    this.form.controls.companyFromDate.updateValueAndValidity();
  }

  epsValidation() {

    this.form.get('eps1').setValidators([Validators.required]);
    this.form.controls.eps1.updateValueAndValidity();

    this.form.get('eps1FromDate').setValidators([Validators.required]);
    this.form.controls.eps1FromDate.updateValueAndValidity();

    this.form.get('eps1ToDate').setValidators([Validators.required]);
    this.form.controls.eps1ToDate.updateValueAndValidity();
  }
  esiValidation() {

    this.form.get('esic1').setValidators([Validators.required]);
    this.form.controls.esic1.updateValueAndValidity();

    this.form.get('esic1FromDate').setValidators([Validators.required]);
    this.form.controls.esic1FromDate.updateValueAndValidity();

    this.form.get('esic1ToDate').setValidators([Validators.required]);
    this.form.controls.esic1ToDate.updateValueAndValidity();
}
  clearEsiValidation() {

    this.form.get('esic1').clearValidators();
    this.form.controls.esic1.updateValueAndValidity();

    this.form.get('esic1FromDate').clearValidators();
    this.form.controls.esic1FromDate.updateValueAndValidity();

    this.form.get('esic1ToDate').clearValidators();
    this.form.controls.esic1ToDate.updateValueAndValidity();

  }
  ptValidation() {
    this.form.get('ptState').setValidators([Validators.required]);
    this.form.controls.ptState.updateValueAndValidity();

    this.form.get('ptCity').setValidators([Validators.required]);
    this.form.controls.ptCity.updateValueAndValidity();
  }
  gratuityValidation() {

    this.form.get('gratuityDividingFactor').setValidators([Validators.required]);
    this.form.controls.gratuityDividingFactor.updateValueAndValidity();

    this.form.get('gratuityFromDate').setValidators([Validators.required]);
    this.form.controls.gratuityFromDate.updateValueAndValidity();

    this.form.get('gratuityToDate').setValidators([Validators.required]);
    this.form.controls.gratuityToDate.updateValueAndValidity();
  }
  clearGratuityValidation() {

    this.form.get('gratuityDividingFactor').clearValidators();
    this.form.controls.gratuityDividingFactor.updateValueAndValidity();

    this.form.get('gratuityToDate').clearValidators();
    this.form.controls.gratuityToDate.updateValueAndValidity();

    this.form.get('gratuityFromDate').clearValidators();
    this.form.controls.gratuityFromDate.updateValueAndValidity();
  }
  saValidation() {

    this.form.get('saMaxPercentage').setValidators([Validators.required]);
    this.form.controls.saMaxPercentage.updateValueAndValidity();

    this.form.get('saFromDate').setValidators([Validators.required]);
    this.form.controls.saFromDate.updateValueAndValidity();

    this.form.get('saToDate').setValidators([Validators.required]);
    this.form.controls.saToDate.updateValueAndValidity();

}
  clearSaValidation() {

    this.form.get('saMaxPercentage').clearValidators();
    this.form.controls.saMaxPercentage.updateValueAndValidity();

    this.form.get('saFromDate').clearValidators();
    this.form.controls.saFromDate.updateValueAndValidity();

    this.form.get('saToDate').clearValidators();
    this.form.controls.saToDate.updateValueAndValidity();
  }

  lwfValidation() {

    this.form.get('lwfState').setValidators([Validators.required]);
    this.form.controls.lwfState.updateValueAndValidity();
  }

  clearlwfValidation() {
    this.form.get('lwfState').clearValidators();
    this.form.controls.lwfState.updateValueAndValidity();
  }

  clearPtValidation() {
    this.form.get('ptState').clearValidators();
    this.form.controls.ptState.updateValueAndValidity();

    this.form.get('ptCity').clearValidators();
    this.form.controls.ptCity.updateValueAndValidity();

  }
  // esiValidation(){
  //   this.f.esiArray.get('esic1').setValidators([Validators.required]),
  //   this.f.esiArray.get('esic1FromDate').setValidators([Validators.required]),
  //   this.esiArray.get('esic1ToDate').setValidators([Validators.required]),

  //   this.f.esiArray.get('esic1').updateValueAndValidity();
  //   this.f.esiArray.get('esic1FromDate').updateValueAndValidity();
  //   this.f.esiArray.get('esic1ToDate').updateValueAndValidity();
  // }
  clearEpsValidation() {

    this.form.get('eps1').clearValidators();
    this.form.controls.eps1.updateValueAndValidity();

    this.form.get('eps1FromDate').clearValidators();
    this.form.controls.eps1FromDate.updateValueAndValidity();

    this.form.get('eps1ToDate').clearValidators();
    this.form.controls.eps1ToDate.updateValueAndValidity();
  }

  clearPfValidation() {

    this.form.get('pfStatus').clearValidators();
    this.form.controls.pfStatus.updateValueAndValidity();

    this.form.get('employeeFromDate').clearValidators();
    this.form.controls.employeeFromDate.updateValueAndValidity();

    this.form.get('employeeToDate').clearValidators();
    this.form.controls.employeeToDate.updateValueAndValidity();

    this.form.get('companyFromDate').clearValidators();
    this.form.controls.companyFromDate.updateValueAndValidity();

    this.form.get('companyToDate').clearValidators();
    this.form.controls.companyToDate.updateValueAndValidity();
  }

  refreshHtmlTableDataOfComplianceApplicability() {

    this.summaryHtmlDataListComplianceApplicability = [];
    this.masterGridDataListComplianceAppicability = [];
    this.complianceMasterService.getComplianceApplicabilityDetails().subscribe((res) => {
      this.masterGridDataListComplianceAppicability = res.data.results;

      let i = 1;
      res.data.results.forEach((element) => {
        const obj = {
          SrNo: i++,
          jobMasterType: element.jobMasterType,
        };
        this.summaryHtmlDataListComplianceApplicability.push(obj);
      });
    });
    console.log(this.summaryHtmlDataListComplianceApplicability);
  }
  viewMasterComplianceApplicability(editRowIndex: number) { }

  addEpsFormControl(editRowIndex: number, dropdownList: any, isView: boolean) {
    this.isView = isView;
    const indexOfComplianceDetail = this.masterGridDataList[editRowIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == dropdownList.establishmentMasterId);

    const formGroup = new FormGroup({
      establishmentName: new FormControl(dropdownList.establishmentMasterId),
      'eps1': new FormControl(this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetail].eps1, Validators.required),
      eps1FromDate: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetail].eps1FromDate, Validators.required),
      eps1ToDate: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetail].eps1ToDate, Validators.required),
      complianceDetail: new FormControl(indexOfComplianceDetail),
      establishmentId: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetail].establishmentMasterId),
    });
    ( this.form.get('epsArray') as FormArray).push(formGroup);
    console.log( this.form.get('epsArray') as FormArray);
    // this.epsValidation();
    }

  addTdsFormControl(editRowIndex: number, dropdownList: any, isView: boolean) {
    this.isView = isView;
    const indexOfComplianceDetail = this.masterGridDataList[editRowIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == dropdownList.establishmentMasterId);

    const formGroup = new FormGroup({
      establishmentName: new FormControl(dropdownList.establishmentMasterId),
      'complianceDetail': new FormControl(indexOfComplianceDetail),
      establishmentId: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetail].establishmentMasterId),
      tan: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetail].tan, Validators.required),
      tdsCircle: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetail].tdsCircle, Validators.required),
      deductorStatus: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetail].deductorStatus, Validators.required),
    });
    (this.form.get('tdsArray') as FormArray).push(formGroup);
    console.log( this.form.get('tdsArray') as FormArray);
  }
  addPtFormControl(editRowIndex: number, dropdownList: any, isView: boolean) {
    this.isView = isView;
    const indexOfComplianceDetail = this.masterGridDataList[editRowIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == dropdownList.establishmentMasterId);
    const formGroup = new FormGroup({
      establishmentName: new FormControl(dropdownList.establishmentMasterId),
      ptState: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetail].ptState, Validators.required),
      ptCity: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetail].ptCity, Validators.required),
      complianceDetail: new FormControl(indexOfComplianceDetail),
      establishmentId: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetail].establishmentMasterId),
    });
    ( this.form.get('ptArray') as FormArray).push(formGroup);
    console.log( this.form.get('ptArray') as FormArray);
  }
  addEsiFormControl(editRowIndex: number, dropdownList: any, isView: boolean) {
    this.isView = isView;
    const indexOfComplianceDetail = this.masterGridDataList[editRowIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == dropdownList.establishmentMasterId);

    const formGroup = new FormGroup({
      establishmentName: new FormControl(dropdownList.establishmentMasterId),
      'complianceDetail': new FormControl(indexOfComplianceDetail),
      establishmentId: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetail].establishmentMasterId),
      esic1: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetail].esic1, Validators.required),
      esic1FromDate: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetail].esic1FromDate,  Validators.required),
      esic1ToDate: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetail].esic1ToDate,  Validators.required),
    });
    ( this.form.get('esiArray') as FormArray).push(formGroup);
    console.log( this.form.get('esiArray') as FormArray);

  }
  addLWFFormControl(editRowIndex: number, dropdownList: any, isView: boolean) {
    this.isView = isView;
    const indexOfComplianceDetail = this.masterGridDataList[editRowIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == dropdownList.establishmentMasterId);

    const formGroup = new FormGroup({
      establishmentName: new FormControl(dropdownList.establishmentMasterId),
      'complianceDetail': new FormControl(indexOfComplianceDetail),
      establishmentId: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetail].establishmentMasterId),
      lwfState: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetail].lwfState),
    });
    ( this.form.get('lwfArray') as FormArray).push(formGroup);
    console.log( this.form.get('lwfArray') as FormArray);
  }
  addGratuityFormControl(editRowIndex: number, dropdownList: any, isView: boolean) {
    this.isView = isView;
    const indexOfComplianceDetail = this.masterGridDataList[editRowIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == dropdownList.establishmentMasterId);

    const formGroup = new FormGroup({
      establishmentName: new FormControl(dropdownList.establishmentMasterId),
      'complianceDetail': new FormControl(indexOfComplianceDetail),
      establishmentId: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetail].establishmentMasterId),
      gratuityDividingFactor: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetail].gratuityDividingFactor, Validators.required),
      gratuityFromDate: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetail].gratuityFromDate, Validators.required),
      gratuityToDate: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetail].gratuityToDate, Validators.required),
    });
    ( this.form.get('gratuityArray') as FormArray).push(formGroup);
    console.log( this.form.get('gratuityArray') as FormArray);
  }
  addSaFormControl(editRowIndex: number, dropdownList: any, isView: boolean) {
    this.isView = isView;
    const indexOfComplianceDetail = this.masterGridDataList[editRowIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == dropdownList.establishmentMasterId);

    const formGroup = new FormGroup({
      establishmentName: new FormControl(dropdownList.establishmentMasterId),
      'complianceDetail': new FormControl(indexOfComplianceDetail),
      establishmentId: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetail].establishmentMasterId),
      saMaxPercentage: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetail].saMaxPercentage, Validators.required),
      saFromDate: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetail].saFromDate, Validators.required),
      saToDate: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetail].saToDate, Validators.required),
    });
    ( this.form.get('saArray') as FormArray).push(formGroup);
    console.log( this.form.get('saArray') as FormArray);
  }
  addPfFormControl(editRowIndex: number, dropdownList: any, isView: boolean) {
    console.log(editRowIndex);
    this.isView = isView;
    this.SelectedemployeeContribtionMultiSelect = [];
    this.selectedCompanyContribtionMultiSelect = [];
    console.log(editRowIndex);
    console.log(this.editedRecordIndex);

    const indexOfComplianceDetails = this.masterGridDataList[editRowIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == dropdownList.establishmentMasterId);
    console.log('--');
    console.log(indexOfComplianceDetails);
    console.log('--');
    console.log(dropdownList.establishmentMasterId);
    this.companyContributionList = [];
    this.defaultEmployeeContributionList = [];
    console.log(dropdownList);
    let pfNilOptionChoice = '0';
    let edliExemption = '0';
    let contributionMethodChoice = '0';
    let employeeCompanyContributionDiff = '0';
    const complianceContributionMultiselectArray = [];
    const employeeContributionMultiSelectArray = [];
    let employeeContribution;
    let companyContribution;

    let companyContributionArray1: any;
    let employeeContributionArray1: any;

    if (this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetails].employeeCompanyContributionDiff == 'YES') {
      employeeCompanyContributionDiff = '1';
    } else {

      this.form.get('pfFormArray').controls
        .forEach((control) => {
          control.controls.companyContribution.disable();
        });
    }
    if (this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetails].edliExemption == 'YES') {
      edliExemption = '1';
    }
    if (this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetails].pfNilOptionChoice == 'YES') {
      this.dropdownList1 = [];
      this.dropdownList1 = [{ id: 0, itemName: 'FULL' }, { id: 1, itemName: 'RESTRICTED' }, { id: 2, itemName: 'EXPACT' }, { id: 3, itemName: 'NIL' }];
      this.ContributionMethodChoiceList = ['FULL', 'RESTRICTED', 'EXPACT', 'NIL']; this.ContributionMethodChoiceList = ['FULL', 'RESTRICTED', 'EXPACT'];

      pfNilOptionChoice = '1';
    } else {
      this.dropdownList1 = [];
      this.ContributionMethodChoiceList = ['FULL', 'RESTRICTED', 'EXPACT'];
      this.dropdownList1 = [{ id: 0, itemName: 'FULL' }, { id: 1, itemName: 'RESTRICTED' }, { id: 2, itemName: 'EXPACT' }];
    }
    if (this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetails].contributionMethodChoice == 'YES') {
      contributionMethodChoice = '1';
      this.isDefaultContribution = false;

      let companyContributionNameArray = this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetails].companyContribution;
      let employeeContributionNameArray = this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetails].employeeContribution;
      if (companyContributionNameArray != null || companyContributionNameArray != undefined) {
        companyContributionArray1 = companyContributionNameArray.split(',');
        if (companyContributionArray1.length > 0) {
          for (let i = 0; i < companyContributionArray1.length; i++) {
            const a = this.dropdownList1.findIndex((o) => o.itemName == companyContributionArray1[i].trim());
            console.log(a);
            if (a != -1) {
              complianceContributionMultiselectArray.push(this.dropdownList1[a]);
              this.companyContributionList.push(this.dropdownList1[a]);
              this.selectedCompanyContribtionMultiSelect.push({ id: this.dropdownList1[a].id, itemName: this.dropdownList1[a].itemName });
            }
          }
        }
      }
      if (employeeContributionNameArray != null || employeeContributionNameArray != undefined) {
        employeeContributionArray1 = employeeContributionNameArray.split(',');
        for (let i = 0; i < employeeContributionArray1.length; i++) {
          const a = this.dropdownList1.findIndex((o) => o.itemName == employeeContributionArray1[i].trim());
          console.log(a);
          employeeContributionMultiSelectArray.push(this.dropdownList1[a]);
          this.defaultEmployeeContributionList.push(this.dropdownList1[a]);
          this.SelectedemployeeContribtionMultiSelect.push(this.dropdownList1[a]);
        }
      }
    } else {
      // single select
      this.isDefaultContribution = true;
    }
    if (this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetails].contributionMethodChoice == 'YES') {
      console.log('in if');

      this.pfArray.push(this.formBuilder.group({
        establishmentName: new FormControl(dropdownList.establishmentMasterId),
        pfStatus: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetails].pfStatus, Validators.required),

        pfNilOptionChoice: new FormControl(pfNilOptionChoice),
        employeeCompanyContributionDiff: new FormControl(employeeCompanyContributionDiff),
        edliExemption: new FormControl(edliExemption),
        contributionMethodChoice: new FormControl(contributionMethodChoice),

        companyContribution: new FormControl(''),
        employeeContribution: new FormControl(''),

        companyContribtionMultiSelect: new FormControl(complianceContributionMultiselectArray),
        employeeContribtionMultiSelect: new FormControl(employeeContributionMultiSelectArray),

        companyFromDate: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetails].companyFromDate, Validators.required),
        companyToDate: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetails].companyToDate, Validators.required),

        employeeFromDate: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetails].employeeFromDate, Validators.required),
        employeeToDate: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetails].employeeToDate, Validators.required),
      }));
    } else {
      console.log('in else');
      this.pfArray.push(this.formBuilder.group({
        establishmentName: new FormControl(dropdownList.establishmentMasterId),

        pfStatus: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetails].pfStatus, Validators.required),

        pfNilOptionChoice: new FormControl(pfNilOptionChoice),
        contributionMethodChoice: new FormControl(contributionMethodChoice),
        employeeCompanyContributionDiff: new FormControl(employeeCompanyContributionDiff),
        edliExemption: new FormControl(edliExemption),

        companyContribtionMultiSelect: new FormControl(''),
        employeeContribtionMultiSelect: new FormControl(''),

        employeeContribution: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetails].employeeContribution),
        companyContribution: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetails].companyContribution),

        companyFromDate: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetails].companyFromDate, Validators.required),
        companyToDate: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetails].companyToDate, Validators.required),

        employeeFromDate: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetails].employeeFromDate, Validators.required),
        employeeToDate: new FormControl(this.masterGridDataList[editRowIndex].complianceDetail[indexOfComplianceDetails].employeeToDate, Validators.required),
      }));

      if (contributionMethodChoice == '0') {
        this.form.get('pfFormArray').controls
          .forEach((control) => {
            control.controls.employeeCompanyContributionDiff.disable();
          });
      }
      this.form.get('pfFormArray').controls
        .forEach((control) => {
          control.controls.companyContribution.disable();
        });
      console.log(this.pfArray);
    }
    if (contributionMethodChoice == '0') {
      this.isRestrictedDisableMultiSelect = true;
    }
    if (employeeCompanyContributionDiff == '0' && contributionMethodChoice == '1') {
      this.isRestrictedDisableMultiSelect = true;
    }
  }
  UpdatePf(i: number) {

    let saveData: any;
    let selectedStringCompanyContributionList;
    let selectedStringEmployeeContributionList;

    // for radio form control
    let pfNilOptionChoiceOption = 'NO';
    let edliExemptionOption = 'NO';
    let contributionMethodChoiceOption = 'NO';
    let employeeCompanyContributionDiffOption = 'NO';

    // for radio button

    if (this.form.get('pfFormArray').value[0].pfNilOptionChoice == 1) {
      pfNilOptionChoiceOption = 'YES';
      this.form.get('pfFormArray').value[0].pfNilOptionChoice = 'YES';
    }
    if (this.form.get('pfFormArray').value[0].edliExemption == 1) {
      edliExemptionOption = 'YES';
      this.form.get('pfFormArray').value[0].edliExemption = 'YES';
    }
    if (this.form.get('pfFormArray').value[0].edliExemption == 0) {
      edliExemptionOption = 'NO';
      this.form.get('pfFormArray').value[0].edliExemption = 'NO';
    }
    if (this.form.get('pfFormArray').value[0].contributionMethodChoice == 1) {
      contributionMethodChoiceOption = 'YES';
      this.form.get('pfFormArray').value[0].contributionMethodChoice = 'YES';
    }
    if (this.form.get('pfFormArray').value[0].contributionMethodChoice == 0) {
      contributionMethodChoiceOption = 'NO';
      this.form.get('pfFormArray').value[0].contributionMethodChoice = 'NO';
    }
    if (this.form.get('pfFormArray').value[0].employeeCompanyContributionDiff == 1) {
      employeeCompanyContributionDiffOption = 'YES';
      this.form.get('pfFormArray').value[0].employeeCompanyContributionDiff = 'YES';
    }
    if (this.form.get('pfFormArray').value[0].employeeCompanyContributionDiff == undefined) {
      employeeCompanyContributionDiffOption = 'NO';
    }

    for (let i = 0; i < this.companyContributionList.length; i++) {
      if (i == 0) {
        selectedStringCompanyContributionList = this.companyContributionList[i].itemName;
      } else {
        selectedStringCompanyContributionList += ',';
        selectedStringCompanyContributionList += this.companyContributionList[i].itemName;
      }
    }

    for (let i = 0; i < this.defaultEmployeeContributionList.length; i++) {
      if (i == 0) {
        selectedStringEmployeeContributionList = this.defaultEmployeeContributionList[i].itemName;
      } else {
        selectedStringEmployeeContributionList += ',';
        selectedStringEmployeeContributionList += this.defaultEmployeeContributionList[i].itemName;
      }
    }
    const complianceDetailIndexToChange = this.masterGridDataList[this.editedRecordIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == this.form.get('pfFormArray').value[i].establishmentName);

    if (this.form.get('pfFormArray').value[0].contributionMethodChoice == 'NO') {
      console.log('in if');
      saveData = {
        complianceDetailId: this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange].complianceDetailId,
        complianceMasterId: this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange].complianceMasterId,
        establishmentMasterId: this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange].establishmentMasterId,
        pfStatus: this.form.get('pfFormArray').value[i].pfStatus,

        pfNilOptionChoice: pfNilOptionChoiceOption,
        employeeCompanyContributionDiff: employeeCompanyContributionDiffOption,
        edliExemption: edliExemptionOption,
        contributionMethodChoice: contributionMethodChoiceOption,

        companyContribution: this.form.get('pfFormArray').value[i].employeeContribution,
        employeeContribution: this.form.get('pfFormArray').value[i].employeeContribution,

        companyFromDate: this.datePipe.transform(this.form.get('pfFormArray').value[i].companyFromDate, 'dd-MMM-yyyy'),
        companyToDate: this.datePipe.transform(this.form.get('pfFormArray').value[i].companyToDate, 'dd-MMM-yyyy'),

        employeeFromDate: this.datePipe.transform(this.form.get('pfFormArray').value[i].employeeFromDate, 'dd-MMM-yyyy'),
        employeeToDate: this.datePipe.transform(this.form.get('pfFormArray').value[i].employeeToDate, 'dd-MMM-yyyy'),
      };
    } else if (this.form.get('pfFormArray').value[0].contributionMethodChoice == 'YES') {
      console.log('in else if');

      saveData = {
        complianceDetailId: this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange].complianceDetailId,
        complianceMasterId: this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange].complianceMasterId,
        establishmentMasterId: this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange].establishmentMasterId,

        pfStatus: this.form.get('pfFormArray').value[i].pfStatus,

        pfNilOptionChoice: pfNilOptionChoiceOption,
        employeeCompanyContributionDiff: employeeCompanyContributionDiffOption,
        edliExemption: edliExemptionOption,
        contributionMethodChoice: contributionMethodChoiceOption,

        companyFromDate: this.datePipe.transform(this.form.get('pfFormArray').value[i].companyFromDate, 'dd-MMM-yyyy'),
        companyToDate: this.datePipe.transform(this.form.get('pfFormArray').value[i].companyToDate, 'dd-MMM-yyyy'),
        employeeFromDate: this.datePipe.transform(this.form.get('pfFormArray').value[i].employeeFromDate, 'dd-MMM-yyyy'),
        employeeToDate: this.datePipe.transform(this.form.get('pfFormArray').value[i].employeeToDate, 'dd-MMM-yyyy'),

        employeeContribution: selectedStringEmployeeContributionList,
        companyContribution: selectedStringCompanyContributionList,
      };
      if (contributionMethodChoiceOption == 'NO') {
        saveData.companyContribution = selectedStringEmployeeContributionList;
      }
    } else {
      console.log('errrrorrrorr');
    }
    console.log(JSON.stringify(saveData));
    this.complianceMasterService.putComplianceMasterUpdateDetails(saveData).subscribe((res) => {
      console.log(res);
      this.alertService.sweetalertMasterSuccess('PF Compliance Details Updated Successfully.', '');

    }, (error: any) => {
      this.alertService.sweetalertError(error['error']['status']['messsage']);

    }, () => {
      // this.getEstablishmentMasterDetailsAndRefreshHtmlTable();
      // this.isEditMode = false;
      // this.showButtonSaveAndReset = true;
      // this.isSaveAndReset = true;
      // if (this.form.get('pfFormArray').length > 0) {
      //   (<FormArray>this.form.get('pfFormArray').removeAt(0));
      // }
      // if (this.form.get('epsArray').length > 0) {
      //   (<FormArray>this.form.get('epsArray').removeAt(0));
      // }
      // this.form.setControl('pfFormArray', new FormArray([]));
      // this.form.setControl('epsArray', new FormArray([]));
      // this.form.setControl('esiArray', new FormArray([]));
      // this.form.setControl('ptArray', new FormArray([]));
      // this.form.setControl('lwfArray', new FormArray([]));
      // this.form.setControl('tdsArray', new FormArray([]));
      // this.form.setControl('gratuityArray', new FormArray([]));
      // this.form.setControl('epsArray', new FormArray([]));
      // this.form.reset();
      this.resetAlllArrayAndFormField();
    });
  }

  UpdateEps(i: number) {
    console.log(this.form.get('epsArray').value[i].establishmentName);

    const complianceDetailIndexToChange = this.masterGridDataList[this.editedRecordIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == this.form.get('epsArray').value[i].establishmentName);
    console.log(complianceDetailIndexToChange);
    console.log( this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange]);

    const complianceDetails = {
      complianceDetailId: this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange].complianceDetailId,
      complianceMasterId: this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange].complianceMasterId,
      establishmentMasterId: this.form.get('epsArray').value[i].establishmentName,

      eps1: this.form.get('epsArray').value[0].eps1,
      eps1FromDate: this.datePipe.transform(this.form.get('epsArray').value[0].eps1FromDate, 'dd-MMM-yyyy'),
      eps1ToDate: this.datePipe.transform(this.form.get('epsArray').value[0].eps1ToDate, 'dd-MMM-yyyy'),
    };
    console.log(JSON.stringify(complianceDetails));

    this.complianceMasterService.putComplianceMasterUpdateDetails(complianceDetails).subscribe((res) => {
      console.log(res);
      this.alertService.sweetalertMasterSuccess('Compliance Details Updated Successfully.', '');
      this.isEditMode = false;
    }, (error: any) => {
      this.alertService.sweetalertError(error['error']['status']['messsage']);

    }, () => {
      // this.getEstablishmentMasterDetailsAndRefreshHtmlTable();
      this.resetAlllArrayAndFormField();
    });
  }
  UpdateEsi(i: number) {
    const complianceDetailIndexToChange = this.masterGridDataList[this.editedRecordIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == this.form.get('esiArray').value[i].establishmentName);

    const complianceDetails = {
      complianceDetailId: this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange].complianceDetailId,
      complianceMasterId: this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange].complianceMasterId,
      establishmentMasterId: this.form.get('esiArray').value[i].establishmentName,
      esic1: this.form.get('esiArray').value[0].esic1,
      esic1FromDate: this.datePipe.transform(this.form.get('esiArray').value[0].esic1FromDate, 'dd-MMM-yyyy'),
      esic1ToDate: this.datePipe.transform(this.form.get('esiArray').value[0].esic1ToDate, 'dd-MMM-yyyy'),
    };
    console.log(JSON.stringify(complianceDetails));

    this.complianceMasterService.putComplianceMasterUpdateDetails(complianceDetails).subscribe((res) => {
      console.log(res);
      this.alertService.sweetalertMasterSuccess('Compliance Details Updated Successfully.', '');
      this.isEditMode = false;
    }, (error: any) => {
      this.alertService.sweetalertError(error['error']['status']['messsage']);

    }, () => {
      this.resetAlllArrayAndFormField();
    });

  }
  UpdatePt(i: number) {
    const complianceDetailIndexToChange = this.masterGridDataList[this.editedRecordIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == this.form.get('ptArray').value[i].establishmentName);
    console.log(complianceDetailIndexToChange);
    console.log( this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange]);

    const complianceDetails = {
      complianceDetailId: this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange].complianceDetailId,
      complianceMasterId: this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange].complianceMasterId,
      establishmentMasterId: this.form.get('ptArray').value[i].establishmentName,
      ptCity: this.form.get('ptArray').value[0].ptCity,
      ptState: this.form.get('ptArray').value[0].ptState,
    };
    console.log(JSON.stringify(complianceDetails));

    this.complianceMasterService.putComplianceMasterUpdateDetails(complianceDetails).subscribe((res) => {
      console.log(res);
      this.alertService.sweetalertMasterSuccess('Compliance Details Updated Successfully.', '');
      this.isEditMode = false;
    }, (error: any) => {
      this.alertService.sweetalertError(error['error']['status']['messsage']);

    }, () => {
      this.resetAlllArrayAndFormField();
    });
  }
  UpdateLwf(i: number) {
    const complianceDetailIndexToChange = this.masterGridDataList[this.editedRecordIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == this.form.get('lwfArray').value[i].establishmentName);
    console.log(complianceDetailIndexToChange);
    console.log( this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange]);

    const complianceDetails = {
      complianceDetailId: this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange].complianceDetailId,
      complianceMasterId: this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange].complianceMasterId,
      establishmentMasterId: this.form.get('lwfArray').value[i].establishmentName,
      lwfState: this.form.get('lwfArray').value[0].lwfState,

    };
    console.log(JSON.stringify(complianceDetails));

    this.complianceMasterService.putComplianceMasterUpdateDetails(complianceDetails).subscribe((res) => {
      console.log(res);
      this.alertService.sweetalertMasterSuccess('Compliance Details Updated Successfully.', '');
      this.isEditMode = false;
    }, (error: any) => {
      this.alertService.sweetalertError(error['error']['status']['messsage']);

    }, () => {
      this.resetAlllArrayAndFormField();
    });

  }
  UpdateTds(i: number) {
    const complianceDetailIndexToChange = this.masterGridDataList[this.editedRecordIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == this.form.get('tdsArray').value[i].establishmentName);
    console.log(complianceDetailIndexToChange);
    console.log( this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange]);

    const complianceDetails = {
      complianceDetailId: this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange].complianceDetailId,
      complianceMasterId: this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange].complianceMasterId,
      establishmentMasterId: this.form.get('tdsArray').value[i].establishmentName,

      tan:  this.form.get('tdsArray').value[0].tan,
      tdsCircle: this.form.get('tdsArray').value[0].tdsCircle,
      deductorStatus: this.form.get('tdsArray').value[0].deductorStatus,
    };
    console.log(JSON.stringify(complianceDetails));

    this.complianceMasterService.putComplianceMasterUpdateDetails(complianceDetails).subscribe((res) => {
      console.log(res);
      this.alertService.sweetalertMasterSuccess('Compliance Details Updated Successfully.', '');
      this.isEditMode = false;
    }, (error: any) => {
      this.alertService.sweetalertError(error['error']['status']['messsage']);

    }, () => {
      this.resetAlllArrayAndFormField();
    });

  }
  UpdateGratuity(i: number) {
    const complianceDetailIndexToChange = this.masterGridDataList[this.editedRecordIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == this.form.get('gratuityArray').value[i].establishmentName);
    console.log(complianceDetailIndexToChange);
    console.log( this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange]);

    const complianceDetails = {
      complianceDetailId: this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange].complianceDetailId,
      complianceMasterId: this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange].complianceMasterId,
      establishmentMasterId: this.form.get('gratuityArray').value[i].establishmentName,

      gratuityDividingFactor: this.form.get('gratuityArray').value[0].gratuityDividingFactor,
      gratuityFromDate:  this.form.get('gratuityArray').value[0].gratuityFromDate,
      gratuityToDate:  this.form.get('gratuityArray').value[0].gratuityToDate,
    };
    console.log(JSON.stringify(complianceDetails));

    this.complianceMasterService.putComplianceMasterUpdateDetails(complianceDetails).subscribe((res) => {
      console.log(res);
      this.alertService.sweetalertMasterSuccess('Compliance Details Updated Successfully.', '');
      this.isEditMode = false;
    }, (error: any) => {
      this.alertService.sweetalertError(error['error']['status']['messsage']);

    }, () => {
      this.resetAlllArrayAndFormField();
    });
  }

  UpdateSa(i: number) {
    const complianceDetailIndexToChange = this.masterGridDataList[this.editedRecordIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == this.form.get('saArray').value[i].establishmentName);
    console.log(complianceDetailIndexToChange);
    console.log( this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange]);
    const complianceDetails = {
      complianceDetailId: this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange].complianceDetailId,
      complianceMasterId: this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange].complianceMasterId,
      establishmentMasterId: this.form.get('saArray').value[i].establishmentName,

      saFromDate: this.datePipe.transform(this.form.get('saArray').value[0].saFromDate, 'dd-MMM-yyyy'),
      saMaxPercentage: this.form.get('saArray').value[0].saMaxPercentage,
      saToDate: this.datePipe.transform(this.form.get('saArray').value[0].saToDate, 'dd-MMM-yyyy'),
    };
    console.log(JSON.stringify(complianceDetails));

    this.complianceMasterService.putComplianceMasterUpdateDetails(complianceDetails).subscribe((res) => {
      console.log(res);
      this.alertService.sweetalertMasterSuccess('Compliance Details Updated Successfully.', '');
      this.isEditMode = false;
    }, (error: any) => {
      this.alertService.sweetalertError(error['error']['status']['messsage']);

    }, () => {
      this.resetAlllArrayAndFormField();
    });

  }
  UpdateComplianceMaster() {
    if (this.isView) {
      const tempObj = this.institutionMasterList.find((o) => o.complianceHeadId == this.masterGridDataList[this.editedRecordIndex].statutoryInstituteName);
      const saveData = ({
        complianceMasterId: this.masterGridDataList[this.editedRecordIndex].complianceMasterId,
        complianceName: this.masterGridDataList[this.editedRecordIndex].complianceName,
        statutoryInstituteName: this.summaryHtmlDataList[this.editedRecordIndex].statutoryInstituteName,

        complianceHeadShortName: this.masterGridDataList[this.editedRecordIndex].shortName,
        accountNumber: this.masterGridDataList[this.editedRecordIndex].accountNumber,
        groupCompanyId: this.masterGridDataList[this.editedRecordIndex].groupCompanyId,
        registrationNumber: this.masterGridDataList[this.editedRecordIndex].registrationNumber,
        issueDate: this.masterGridDataList[this.editedRecordIndex].issueDate,
        coverageDate: this.masterGridDataList[this.editedRecordIndex].coverageDate,
        userNameForWebsite: this.masterGridDataList[this.editedRecordIndex].userNameForWebsite,
      });
      console.log(JSON.stringify(saveData));
      this.complianceMasterService.putComplianceMaster(saveData).subscribe((res) => {
        console.log(res);
        this.alertService.sweetalertMasterSuccess('Compliance Master Updated Successfully.', '');

      }, (error: any) => {
        this.alertService.sweetalertError(error['error']['status']['messsage']);

      }, () => {
        this.getEstablishmentMasterDetailsAndRefreshHtmlTable();
        this.form.reset();
        this.isEditMode = false;
        this.showButtonSaveAndReset = true;
        this.isSaveAndReset = true;
        this.form.setControl('pfFormArray', new FormArray([]));
        this.form.setControl('epsArray', new FormArray([]));
        this.form.setControl('esiArray', new FormArray([]));
        this.form.setControl('ptArray', new FormArray([]));
        this.form.setControl('lwfArray', new FormArray([]));
        this.form.setControl('tdsArray', new FormArray([]));
        this.form.setControl('gratuityArray', new FormArray([]));
        this.form.setControl('epsArray', new FormArray([]));
      });

    } else {

    const data = this.form.getRawValue();
    const tempObj = this.institutionMasterList.find((o) => o.complianceHeadId == data.statutoryInstituteName);
    const saveData = ({
      complianceMasterId: this.masterGridDataList[this.editedRecordIndex].complianceMasterId,
      complianceName: data.complianceName,
      statutoryInstituteName: this.summaryHtmlDataList[this.editedRecordIndex].statutoryInstituteName,

      complianceHeadShortName: data.shortName,
      accountNumber: data.accountNumber,
      groupCompanyId: data.groupCompanyId,
      registrationNumber: data.registrationNumber,
      issueDate: data.issueDate,
      coverageDate: data.coverageDate,
      userNameForWebsite: data.userNameForWebsite,
    });
    console.log(JSON.stringify(saveData));
    this.complianceMasterService.putComplianceMaster(saveData).subscribe((res) => {
      console.log(res);
      this.alertService.sweetalertMasterSuccess('Compliance Master Updated Successfully.', '');

    }, (error: any) => {
      this.alertService.sweetalertError(error['error']['status']['messsage']);

    }, () => {
      this.getEstablishmentMasterDetailsAndRefreshHtmlTable();
      this.form.reset();
      this.isEditMode = false;
      this.showButtonSaveAndReset = true;
      this.isSaveAndReset = true;
      this.form.setControl('pfFormArray', new FormArray([]));
      this.form.setControl('epsArray', new FormArray([]));
      this.form.setControl('esiArray', new FormArray([]));
      this.form.setControl('ptArray', new FormArray([]));
      this.form.setControl('lwfArray', new FormArray([]));
      this.form.setControl('tdsArray', new FormArray([]));
      this.form.setControl('gratuityArray', new FormArray([]));
      this.form.setControl('epsArray', new FormArray([]));
    });
  }
  }
  DeletePf(i: number) {
    if (this.savedEstablishmentList.length == 1) {
      this.DeleteComplianceMaster();

    } else {
      console.log(i);
      const complianceDetailIndexToChange = this.masterGridDataList[this.editedRecordIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == this.form.get('pfFormArray').value[i].establishmentName);

      this.complianceMasterService.deleteComplianceMasterDetail(this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange].complianceDetailId).subscribe((res) => {
        console.log(res);
        this.alertService.sweetalertMasterSuccess('PF Compliance Details Deleted Successfully.', '');

      }, (error: any) => {
        this.alertService.sweetalertError(error['error']['status']['messsage']);

      }, () => {
        // this.getEstablishmentMasterDetailsAndRefreshHtmlTable();
        // this.form.reset();
        // this.isEditMode = false;
        // this.showButtonSaveAndReset = true;
        // this.isSaveAndReset = true;
        // this.form.setControl('pfFormArray', new FormArray([]));
        // this.form.setControl('epsArray', new FormArray([]));
        // this.form.setControl('esiArray', new FormArray([]));
        // this.form.setControl('ptArray', new FormArray([]));
        // this.form.setControl('lwfArray', new FormArray([]));
        // this.form.setControl('tdsArray', new FormArray([]));
        // this.form.setControl('gratuityArray', new FormArray([]));
        // this.form.setControl('epsArray', new FormArray([]));
        this.resetAlllArrayAndFormField();
      });
    }
  }

  DeleteEps(i: number) {
    const complianceDetailIndexToChange = this.masterGridDataList[this.editedRecordIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == this.form.get('epsArray').value[i].establishmentName);
    this.complianceMasterService.deleteComplianceMasterDetail(this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange].complianceDetailId).subscribe((res) => {
      this.alertService.sweetalertMasterSuccess('Compliance Details Deleted Successfully.', '');
    }, (error: any) => {
      this.alertService.sweetalertError(error['error']['status']['messsage']);
    }, () => {
      this.resetAlllArrayAndFormField();
    });
  }
  DeleteEsi(i: number) {
    const complianceDetailIndexToChange = this.masterGridDataList[this.editedRecordIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == this.form.get('esiArray').value[i].establishmentName);
    this.complianceMasterService.deleteComplianceMasterDetail(this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange].complianceDetailId).subscribe((res) => {
      this.alertService.sweetalertMasterSuccess('Compliance Details Deleted Successfully.', '');
    }, (error: any) => {
      this.alertService.sweetalertError(error['error']['status']['messsage']);
    }, () => {
      this.resetAlllArrayAndFormField();
    });

  }
  DeletePt(i: number) {
    const complianceDetailIndexToChange = this.masterGridDataList[this.editedRecordIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == this.form.get('ptArray').value[i].establishmentName);
    this.complianceMasterService.deleteComplianceMasterDetail(this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange].complianceDetailId).subscribe((res) => {
      this.alertService.sweetalertMasterSuccess('Compliance Details Deleted Successfully.', '');
    }, (error: any) => {
      this.alertService.sweetalertError(error['error']['status']['messsage']);
    }, () => {
      this.resetAlllArrayAndFormField();
    });

  }
  DeleteLwf(i: number) {
    const complianceDetailIndexToChange = this.masterGridDataList[this.editedRecordIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == this.form.get('lwfArray').value[i].establishmentName);
    this.complianceMasterService.deleteComplianceMasterDetail(this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange].complianceDetailId).subscribe((res) => {
      this.alertService.sweetalertMasterSuccess('Compliance Details Deleted Successfully.', '');
    }, (error: any) => {
      this.alertService.sweetalertError(error['error']['status']['messsage']);
    }, () => {
      this.resetAlllArrayAndFormField();
    });

  }
  DeleteTds(i: number) {
    const complianceDetailIndexToChange = this.masterGridDataList[this.editedRecordIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == this.form.get('tdsArray').value[i].establishmentName);
    this.complianceMasterService.deleteComplianceMasterDetail(this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange].complianceDetailId).subscribe((res) => {
      this.alertService.sweetalertMasterSuccess('Compliance Details Deleted Successfully.', '');
    }, (error: any) => {
      this.alertService.sweetalertError(error['error']['status']['messsage']);
    }, () => {
      this.resetAlllArrayAndFormField();
    });

  }
  DeleteGratuity(i: number) {
    const complianceDetailIndexToChange = this.masterGridDataList[this.editedRecordIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == this.form.get('gratuityArray').value[i].establishmentName);

    this.complianceMasterService.deleteComplianceMasterDetail(this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange].complianceDetailId).subscribe((res) => {
      this.alertService.sweetalertMasterSuccess('Compliance Details Deleted Successfully.', '');
    }, (error: any) => {
      this.alertService.sweetalertError(error['error']['status']['messsage']);
    }, () => {
      this.resetAlllArrayAndFormField();
    });

  }
  DeleteSa(i: number) {
    const complianceDetailIndexToChange = this.masterGridDataList[this.editedRecordIndex].complianceDetail.findIndex((o) => o.establishmentMasterId == this.form.get('saArray').value[i].establishmentName);
    this.complianceMasterService.deleteComplianceMasterDetail(this.masterGridDataList[this.editedRecordIndex].complianceDetail[complianceDetailIndexToChange].complianceDetailId).subscribe((res) => {
      this.alertService.sweetalertMasterSuccess('Compliance Details Deleted Successfully.', '');
    }, (error: any) => {
      this.alertService.sweetalertError(error['error']['status']['messsage']);
    }, () => {
      this.resetAlllArrayAndFormField();
    });

  }
  DeleteComplianceMaster() {
    this.complianceMasterService.deleteComplianceMaster(this.masterGridDataList[this.editedRecordIndex].complianceMasterId).subscribe((res) => {
      console.log(res);
      this.alertService.sweetalertMasterSuccess('Compliance Master  Deleted Successfully.', '');
    }, (error: any) => {
      this.alertService.sweetalertError(error['error']['status']['messsage']);
    }, () => {
      this.resetAlllArrayAndFormField();
    });
  }

  get pfArray() { return this.f.pfFormArray as FormArray; }
  get epsArray() { return this.f.epsArray as FormArray; }
  get esiArray() { return this.f.esiArray as FormArray; }
  get ptArray() { return this.f.ptArray as FormArray; }
  get lwfArray() { return this.f.lwfArray as FormArray; }
  get tdsArray() { return this.f.tdsArray as FormArray; }
  get gratuityArray() { return this.f.gratuityArray as FormArray; }
  get saArray() { return this.f.saArray as FormArray; }
  get f() { return this.form.controls; }

  onSelectEstablishmentName(establishmentMasterId: any, i: number) {

    if (this.pfArray.controls.length !== 0) {
      for (let i = 0; i < this.pfArray.length; i++) {
        this.pfArray.removeAt(i);
      }
    }
    if (this.epsArray.controls.length !== 0) {
      for (let i = 0; i < this.epsArray.length; i++) {
        this.epsArray.removeAt(i);
      }
    }
    if (this.esiArray.controls.length !== 0) {
      for (let i = 0; i < this.esiArray.length; i++) {
        this.esiArray.removeAt(i);
      }
    }
    if (this.ptArray.controls.length !== 0) {
      for (let i = 0; i < this.ptArray.length; i++) {
        this.ptArray.removeAt(i);
      }
    }
    if (this.lwfArray.controls.length !== 0) {
      for (let i = 0; i < this.pfArray.length; i++) {
        this.lwfArray.removeAt(i);
      }
    }
    if (this.tdsArray.controls.length !== 0) {
      for (let i = 0; i < this.tdsArray.length; i++) {
        this.tdsArray.removeAt(i);
      }
    }
    if (this.gratuityArray.controls.length !== 0) {
      for (let i = 0; i < this.gratuityArray.length; i++) {
        this.gratuityArray.removeAt(i);
      }
    }
    if (this.saArray.controls.length !== 0) {
      for (let i = 0; i < this.saArray.length; i++) {
        this.saArray.removeAt(i);
      }
    }
    const data = this.form.getRawValue();
    console.log(establishmentMasterId);
    const index = this.dropdownList.findIndex((o) => o.establishmentMasterId == establishmentMasterId);
    if (data.shortName == 'PF') {
      ( this.form.get('pfFormArray').removeAt(0) as FormArray);
      this.addPfFormControl(this.editedRecordIndex, this.dropdownList[index], false);
    }
    if (data.shortName == 'EPS') {
      ( this.form.get('epsArray').removeAt(0) as FormArray);
      this.addEpsFormControl(this.editedRecordIndex, this.dropdownList[index], false);
    }
    if (data.shortName == 'PT') {
      ( this.form.get('ptArray').removeAt(0) as FormArray);
      this.addPtFormControl(this.editedRecordIndex, this.dropdownList[index], false);
    }
    if (data.shortName == 'TDS') {
      ( this.form.get('tdsArray').removeAt(0) as FormArray);
      this.addTdsFormControl(this.editedRecordIndex, this.dropdownList[index], false);
    }
    if (data.shortName == 'ESIC') {
      ( this.form.get('esiArray').removeAt(0) as FormArray);
      this.addEsiFormControl(this.editedRecordIndex, this.dropdownList[index], false);
    }
    if (data.shortName == 'ESI') {
      ( this.form.get('esiArray').removeAt(0) as FormArray);
      this.addEsiFormControl(this.editedRecordIndex, this.dropdownList[index], false);
    }
    if (data.shortName == 'LWF') {
      ( this.form.get('lwfArray').removeAt(0) as FormArray);
      this.addLWFFormControl(this.editedRecordIndex, this.dropdownList[index], false);
    }
    if (data.shortName == 'Gratuity') {
      ( this.form.get('gratuityArray').removeAt(0) as FormArray);
      this.addGratuityFormControl(this.editedRecordIndex, this.dropdownList[index], false);
    }
    if (data.shortName == 'SA') {
      ( this.form.get('saArray').removeAt(0) as FormArray);
      this.addSaFormControl(this.editedRecordIndex, this.dropdownList[index], false);
    }
  }
  onChangeContributionMethodIsDiffernt(event: any, i: number) {
    if (i == -1) {  } else { }
    if (event.target.defaultValue == 0) {
      this.pfArray.patchValue([{
        employeeCompanyContributionDiff: '0',
      }]);
    } else {}
  }
  onChangeContributionMethodChoicePfArray(event: any, i: number) {
    console.log('onChangeContributionMethodChoicePfArray');
    if (event.target.defaultValue == 0) {
      this.form.get('pfFormArray').controls
        .forEach((control) => {
          control.controls.employeeCompanyContributionDiff.disable();
        });
      this.pfArray.patchValue([{
        employeeCompanyContributionDiff: '0',
      }]);

      this.isDefaultContribution = true;
    } else {
      this.isDefaultContribution = true;
      this.form.get('pfFormArray').controls
        .forEach((control) => {
          control.controls.employeeCompanyContributionDiff.enable();
        });
      this.pfArray.patchValue([{
        employeeCompanyContributionDiff: '0',
      }]);
    }
  }
  onChaneEmployeeContribution(evt: any, i: number) {
    console.log(evt.target.value);
    if (i == -1) {
      this.form.patchValue({
        companyContribution: evt.target.value,
      });
    } else {
      this.pfArray.patchValue([{
        companyContribution: evt.target.value,
      }]);
      this.form.get('pfFormArray').controls
        .forEach((control) => {
          control.controls.companyContribution.disable();
        });
    }
  }
  onChangeEmpFromDate(evt: any, i: number) {
    console.log('onChaneEmpFromDate');
    if (i == -1) {

      if (this.form.get('employeeCompanyContributionDiff').value == 0) {
        this.form.patchValue({
          companyFromDate: this.form.get('employeeFromDate').value,
        });
      }
    } else {
      if (this.form.get('pfFormArray').value[0].employeeCompanyContributionDiff == 0) {
        this.pfArray.patchValue([{
          companyFromDate: this.form.get('pfFormArray').value[0].employeeFromDate,
        }]);
      }
    }
  }
  onChangeEmplContributionDiff(evt: any, i: number) {
    if (i == -1) {} else {}
  }
  setPfDefaultValueAfterReset() {
    this.form.patchValue({
      pfNilOptionChoice: '0',
      employeeCompanyContributionDiff: '0',
      edliExemption: '0',
      contributionMethodChoice: '0',
      companyToDate: '31-Dec-9999',
      employeeToDate: '31-Dec-9999',
    });
    this.form.get('complianceHeadName').disable();
    this.form.get('shortName').disable();
    this.form.get('companyContribution').disable();
  }
  selectionChangedEdliExemptionOption(evt: any) {
    if (evt.target.defaultValue == 0) {
      //  this.edliExemptionOption = 'YES';
    } else {
      //  this.edliExemptionOption = 'NO';
    }
  }
  resetAlllArrayAndFormField() {
    if (this.pfArray.controls.length !== 0) {
      for (let i = 0; i < this.pfArray.length; i++) {
        this.pfArray.removeAt(i);
      }
    }
    if (this.epsArray.controls.length !== 0) {
      for (let i = 0; i < this.epsArray.length; i++) {
        this.epsArray.removeAt(i);
      }
    }
    if (this.esiArray.controls.length !== 0) {
      for (let i = 0; i < this.esiArray.length; i++) {
        this.esiArray.removeAt(i);
      }
    }
    if (this.ptArray.controls.length !== 0) {
      for (let i = 0; i < this.ptArray.length; i++) {
        this.ptArray.removeAt(i);
      }
    }
    if (this.lwfArray.controls.length !== 0) {
      for (let i = 0; i < this.lwfArray.length; i++) {
        this.lwfArray.removeAt(i);
      }
    }
    if (this.tdsArray.controls.length !== 0) {
      for (let i = 0; i < this.tdsArray.length; i++) {
        this.tdsArray.removeAt(i);
      }
    }
    if (this.gratuityArray.controls.length !== 0) {
      for (let i = 0; i < this.gratuityArray.length; i++) {
        this.gratuityArray.removeAt(i);
      }
    }
    if (this.saArray.controls.length !== 0) {
      for (let i = 0; i < this.saArray.length; i++) {
        this.saArray.removeAt(i);
      }
    }
    this.form.setControl('pfFormArray', new FormArray([]));
    this.form.setControl('epsArray', new FormArray([]));
    this.form.setControl('esiArray', new FormArray([]));
    this.form.setControl('ptArray', new FormArray([]));
    this.form.setControl('lwfArray', new FormArray([]));
    this.form.setControl('tdsArray', new FormArray([]));
    this.form.setControl('gratuityArray', new FormArray([]));
    this.form.setControl('epsArray', new FormArray([]));
    this.form.reset();
    this.getEstablishmentMasterDetailsAndRefreshHtmlTable();
    this.isView = false;
    this.isEditMode = false;
    this.showButtonSaveAndReset = true;
    this.isSaveAndReset = true;
    this.isEditableEstablismentMasterId = false;
    this.commonValidation();
    this.form.get('statutoryInstituteName').enable();
  }
  cancelAllValidation() {

  }
  activateComplianceMaster() {
    console.log(this.editedRecordIndex);
    const complianceDetails = [];

    const saveData = {
        complianceMasterId: this.masterGridDataList[this.editedRecordIndex].complianceMasterId,
        complianceName: this.masterGridDataList[this.editedRecordIndex].complianceName,
        statutoryInstituteName: this.masterGridDataList[this.editedRecordIndex].institutionName,
        complianceHeadShortName: this.masterGridDataList[this.editedRecordIndex].shortName,
        accountNumber: this.masterGridDataList[this.editedRecordIndex].accountNumber,
        groupCompanyId: this.masterGridDataList[this.editedRecordIndex].groupCompanyId,
        registrationNumber: this.masterGridDataList[this.editedRecordIndex].registrationNumber,
        issueDate: this.masterGridDataList[this.editedRecordIndex].issueDate,
        coverageDate: this.masterGridDataList[this.editedRecordIndex].coverageDate,
        userNameForWebsite: this.masterGridDataList[this.editedRecordIndex].userNameForWebsite,
      };
    console.log(JSON.stringify(saveData));

    this.complianceMasterService.putComplianceMaster(saveData).subscribe((res) => {
        console.log(res);
        if (res.data.results.length > 0) {
          console.log(res);
          this.alertService.sweetalertMasterSuccess('Compliance Master Activated Successfully.', '');
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }

      }, (error: any) => {
        this.alertService.sweetalertError(error['error']['status']['messsage']);
      });

    for (let i = 0; i < this.masterGridDataList[i].complianceDetail.length; i++) {
      complianceDetails.push({

        complianceDetailId : this.masterGridDataList[this.editedRecordIndex].complianceDetail[i].complianceDetailId,
        complianceMasterId :  this.masterGridDataList[this.editedRecordIndex].complianceDetail[i].complianceMasterId,
        establishmentMasterId :  this.masterGridDataList[this.editedRecordIndex].complianceDetail[i].establishmentMasterId,
        eps1 :  this.masterGridDataList[this.editedRecordIndex].complianceDetail[i].eps1,
        eps1FromDate :  this.masterGridDataList[this.editedRecordIndex].complianceDetail[i].eps1FromDate,
        eps1ToDate :  this.masterGridDataList[this.editedRecordIndex].complianceDetail[i].eps1ToDate,
        gratuityDividingFactor :  this.masterGridDataList[this.editedRecordIndex].complianceDetail[i].gratuityDividingFactor,
        gratuityFromDate :  this.masterGridDataList[this.editedRecordIndex].complianceDetail[i].gratuityFromDate,
        gratuityToDate :  this.masterGridDataList[this.editedRecordIndex].complianceDetail[i].gratuityToDate,
        saMaxPercentage :  this.masterGridDataList[this.editedRecordIndex].complianceDetail[i].saMaxPercentage,
        saFromDate :  this.masterGridDataList[this.editedRecordIndex].complianceDetail[i].saFromDate,
        saToDate :  this.masterGridDataList[this.editedRecordIndex].complianceDetail[i].saToDate,
        esic1 :   this.masterGridDataList[this.editedRecordIndex].complianceDetail[i].esic1,
        esic1FromDate :  this.masterGridDataList[this.editedRecordIndex].complianceDetail[i].esic1FromDate,
        esic1ToDate :  this.masterGridDataList[this.editedRecordIndex].complianceDetail[i].esic1ToDate ,
        pfStatus :  this.masterGridDataList[this.editedRecordIndex].complianceDetail[i].pfStatus,
        edliExemption :  this.masterGridDataList[this.editedRecordIndex].complianceDetail[i].edliExemption,
        pfNilOptionChoice :  this.masterGridDataList[this.editedRecordIndex].complianceDetail[i].pfNilOptionChoice,
        employeeCompanyContributionDiff :  this.masterGridDataList[this.editedRecordIndex].complianceDetail[i].employeeCompanyContributionDiff,
        contributionMethodChoice :  this.masterGridDataList[this.editedRecordIndex].complianceDetail[i].contributionMethodChoice,
        companyContribution :  this.masterGridDataList[this.editedRecordIndex].complianceDetail[i].companyContribution,
        companyFromDate :  this.masterGridDataList[this.editedRecordIndex].complianceDetail[i].companyFromDate,
        companyToDate :  this.masterGridDataList[this.editedRecordIndex].complianceDetail[i].companyToDate,
        employeeContribution :  this.masterGridDataList[this.editedRecordIndex].complianceDetail[i].employeeContribution,
        employeeFromDate :  this.masterGridDataList[this.editedRecordIndex].complianceDetail[i].employeeFromDate,
        employeeToDate :  this.masterGridDataList[this.editedRecordIndex].complianceDetail[i].employeeToDate,
        ptState :  this.masterGridDataList[this.editedRecordIndex].complianceDetail[i].ptState,
        ptCity :  this.masterGridDataList[this.editedRecordIndex].complianceDetail[i].ptCity,
        lwfState :  this.masterGridDataList[this.editedRecordIndex].complianceDetail[i].lwfState,
       tan:  this.masterGridDataList[this.editedRecordIndex].complianceDetail[i].tan,
       tdsCircle:  this.masterGridDataList[this.editedRecordIndex].complianceDetail[i].tdsCircle,
       deductorStatus:  this.masterGridDataList[this.editedRecordIndex].complianceDetail[i].deductorStatus,

      });
    }
    console.log(JSON.stringify(complianceDetails));
    for (let j = 0; j < complianceDetails.length; j++) {
      this.complianceMasterService.putComplianceMasterUpdateDetails(complianceDetails[j]).subscribe((res) => {
        console.log(res);
        this.alertService.sweetalertMasterSuccess('Compliance Master & Details Activated Successfully.', '');
        this.isEditMode = false;
      }, (error: any) => {
        this.alertService.sweetalertError(error['error']['status']['messsage']);

      }, () => {
        this.resetAlllArrayAndFormField();
      });

    }
  }
  onSelectPtState(evt: any) {
    console.log(evt);
    this.cityList = [];
    this.complianceMasterService.getListOfCityFromTheState(evt).subscribe((res) => {
      this.cityList = res.data.results;
    });
  }
  onSelectPtCity(evt: any) {}
}
