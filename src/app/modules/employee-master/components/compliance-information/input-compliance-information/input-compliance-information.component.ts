import { Component, OnInit, ViewEncapsulation, ViewChild, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { EventEmitterService } from './../../../employee-master-services/event-emitter/event-emitter.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InputDetailsModel } from './input.model';
import { complianceInformationService } from './../compliance-information.service';
import { PreviousEmploymentInformationService } from './../../previous-employment-information/previous-employment-information.service';
import { SharedInformationService } from '../../../employee-master-services/shared-service/shared-information.service';


@Component({
  selector: 'app-input-compliance-information',
  templateUrl: './input-compliance-information.component.html',
  styleUrls: ['./input-compliance-information.component.scss']
})
export class InputComplianceInformationComponent implements OnInit {

  InputInfoForm: FormGroup;
  InputDetailsModel = new InputDetailsModel();
  isFirstEmployment: any = '';
  isContributedInPast: any = 'no';
  isContributedBefore1Sep2014: any = 'no';
  isPartOfEPS: any = 'no';
  isEPFApplicable: any = 'no';
  isEPSContributionTill60: any = 'no';
  reasonForNilPFList = 'Male,Female,Trans'.split(',');
  percentOrAmountModel: any = 'percentOfNetPay';
  currency: any;
  currencyArray: Array<any> = [];
  employeeMasterId: number;
  previousEmploymentPFEPSId: number;
  employeePFEPSDetailId: number;
  establishmentMasterId: number;
  companyId: any;
  joiningDate: any;
  employeeAge: any;
  grossPFSalary: any;
  saPresent: any;
  saContributionRate: any;
  ageGreaterThanFiftyYeras: any;
  employeeContributionList: Array<any> = [];
  totalEmployeeContributionList: Array<any> = [];
  employerContributionList: Array<any> = [];
  totalEmployerContributionList: Array<any> = [];
  selectedValue: any;
  optionToChooseNill = false;
  employeeCompanyContributionDiff;
  contributionMethodChoice = false;
  temp: any;

  constructor(private formBuilder: FormBuilder, public datepipe: DatePipe,
    private EventEmitterService: EventEmitterService,
    private PreviousEmpInformationService: PreviousEmploymentInformationService,
    private complianceInformationService: complianceInformationService,
    private CommonDataService: SharedInformationService,
    public dialog: MatDialog,
    private matDialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.InputInfoForm = this.formBuilder.group({
      //previous
      isFirstEmploymentControl: ['', Validators.required],
      isContributedInPastControl: [{ value: 'no', disabled: true }],
      previousPFNumberControl: [{ value: null, disabled: true }],
      //,Validators.pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/)
      isContributedBefore1Sep2014Control: [{ value: 'no', disabled: true }],
      isPartOfEPSControl: [{ value: 'no', disabled: true }],
      schemeCertificateNumberControl: [{ value: null, disabled: true }],
      authorityIssueControl: [{ value: null, disabled: true }],
      //present
      isEPFApplicableControl: [{ value: null, disabled: true }],
      isEPSApplicableControl: [{ value: null, disabled: true }],
      reasonForNilPFControl: [''],
      employeeContributionMethodControl: [{ value: null, disabled: true }],
      employerContributionMethodControl: [{ value: null, disabled: true }],
      contributionFromDateControl: [{ value: null, disabled: true }],
      contributionToDateControl: [{ value: null, disabled: true }],
      VoluntaryPFtoggle: [{ value: 'percentOfNetPay', disabled: true }],
      voluntaryPFPercentControl: [{ value: null, disabled: true },[Validators.min(0),Validators.max(100)]],
      voluntaryPFAmountControl: [{ value: null, disabled: true }],
      voluntaryFromDateControl: [{ value: null, disabled: true }],
      voluntaryToDateControl: [{ value: null, disabled: true }],
      isEPSContributionTill60Control: [{ value: 'no', disabled: true }],
      //Super Annuation
      saContributionRateControl: [{ value: null, disabled: true },[Validators.min(0),Validators.max(100)]],
      saContributionFromDateControl: [{ value: null, disabled: true }],
      saContributionToDateControl: [{ value: null, disabled: true }],
    });


    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);

    const joiningDate = localStorage.getItem('joiningDate');
    this.joiningDate = new Date(joiningDate);

    const establishmentMasterId = localStorage.getItem('establishmentMasterId')
    this.establishmentMasterId = Number(establishmentMasterId);

    const companyId = localStorage.getItem('companyId')
    this.companyId = Number(companyId);

    this.complianceInformationService.getEmployeeAge(this.employeeMasterId).subscribe(res => {
      if (res.data.results[0]) {
        this.employeeAge = res.data.results[0].split(" ");
        this.employeeAge = this.employeeAge[0];
      }
    })

    //getting employees gross salary from EMP master API
    this.complianceInformationService.getEmployeePFGrossSalary(this.employeeMasterId).subscribe(res => {
      if (res.data.results[0]) {
        this.grossPFSalary = res.data.results[0];
      }
    })

    //checking Super Annuation master is present or not for employee, If present then show SA tab in UI
    this.complianceInformationService.getComplianceAssignmentDetails(this.employeeMasterId, 'SA').subscribe(res => {
      if (res.data.results[0]) {
        this.saPresent = true;
         //If SA applicable to employee then find sa max percentage from company setting
       this.getSAComplainceDetails(res.data.results[0].complianceMasterId);
      }
      else {
        this.saPresent = false;
      }
    })

    //checking PF master is present or not for employee, If present then get compliance master id to get setting details from compliance master
    this.complianceInformationService.getComplianceAssignmentDetails(this.employeeMasterId, 'PF').subscribe(res => {
      if (res.data.results[0]) {
        this.saPresent = true;
        //calling compliance master for PF
        this.getPFComplainceDetails(res.data.results[0].complianceMasterId);
      }
      else {
        this.saPresent = false;
      }
    })

    //get Input form from API

    setTimeout(() => {
      this.getInputForm()
    }, 500)
  
  }//ngOnInit end 

  //other master API for SA compliance
  getSAComplainceDetails(complianceMasterId) {

    this.complianceInformationService.getComplianceDetails(complianceMasterId).subscribe(res => {

      if (res.data.results[0]) {
        this.saPresent = true;
        //set SA contribution percentage limit
        this.saContributionRate = res.data.results[0].complianceDetail.saMaxPercentage;
      }
      else {
        this.saPresent = false;
      }
    })
  }

  //other master API for PF compliance
  getPFComplainceDetails(complianceMasterId) {

    //PF master details GET needs to call only if epf==yes
    this.complianceInformationService.getComplianceDetails(complianceMasterId).subscribe(res => {

      if (res.data.results[0]) {
        if (res.data.results[0].complianceDetail.pfNilOptionChoice == "NO") {
          this.optionToChooseNill = false;
        }
        if (res.data.results[0].complianceDetail.pfNilOptionChoice == "YES") {
          this.optionToChooseNill = true;
        }

        if (res.data.results[0].complianceDetail.employeeCompanyContributionDiff == "NO") {
          this.employeeCompanyContributionDiff = false;
        }
        if (res.data.results[0].complianceDetail.employeeCompanyContributionDiff == "YES") {
          this.employeeCompanyContributionDiff = true;
        }

        if (res.data.results[0].complianceDetail.contributionMethodChoice == "NO") {
          
          this.contributionMethodChoice = false;
          //set default contribution method values 
          this.employeeContributionList.length = 0;
          this.employerContributionList.length = 0;
          this.totalEmployeeContributionList.length = 0;
          this.totalEmployerContributionList.length = 0;

          this.employeeContributionList.push(res.data.results[0].complianceDetail.employeeContribution);
          this.totalEmployeeContributionList.push(res.data.results[0].complianceDetail.employeeContribution);
          this.employerContributionList.push(res.data.results[0].complianceDetail.companyContribution);
          this.totalEmployerContributionList.push(res.data.results[0].complianceDetail.companyContribution);

          //set default values
          this.InputDetailsModel.presentEPFEPSRequestDTO.employeeContributionMethod = res.data.results[0].complianceDetail.employeeContribution;
          this.InputInfoForm.get('employeeContributionMethodControl').setValue(res.data.results[0].complianceDetail.employeeContribution);
          this.InputDetailsModel.presentEPFEPSRequestDTO.employerContributionMethod = res.data.results[0].complianceDetail.companyContribution;
          this.InputInfoForm.get('employerContributionMethodControl').setValue(res.data.results[0].complianceDetail.companyContribution);
      
          //disabled contribution dropdown
   
          //setting from date and to date mandatory if contribution method has only 1 value
            const employerContributionMethod = this.InputInfoForm.get('employerContributionMethodControl');
            employerContributionMethod.disable();
            const employeeContributionMethod = this.InputInfoForm.get('employeeContributionMethodControl');
            employeeContributionMethod.disable();
  
            const contributionFromDate = this.InputInfoForm.get('contributionFromDateControl');
            contributionFromDate.enable();
            const contributionToDate = this.InputInfoForm.get('contributionToDateControl');
            contributionToDate.enable();

            //make madatory contribution dates
           this.validatContributionDate();
        }
        if (res.data.results[0].complianceDetail.contributionMethodChoice == "YES") {
          this.contributionMethodChoice = true;
          this.employeeContributionList.length = 0;
          this.employerContributionList.length = 0;
          this.totalEmployeeContributionList.length = 0;
          this.totalEmployerContributionList.length = 0;

          this.temp = res.data.results[0].complianceDetail.employeeContribution.split(',');
          this.employeeContributionList.push(this.temp[0]);
          this.employeeContributionList.push(this.temp[1]);
          this.totalEmployeeContributionList.push(this.temp[0]);
          this.totalEmployeeContributionList.push(this.temp[1]);

          this.temp = res.data.results[0].complianceDetail.companyContribution.split(',');
          this.employerContributionList.push(this.temp[0]);
          this.employerContributionList.push(this.temp[1]);
          this.totalEmployerContributionList.push(this.temp[0]);
          this.totalEmployerContributionList.push(this.temp[1]);

          // this.totalEmployeeContributionList.push(res.data.results[0].complianceInfo.employeeContribution);
          // this.employerContributionList.push(res.data.results[0].complianceInfo.companyContribution);
          // this.totalEmployerContributionList.push(res.data.results[0].complianceInfo.companyContribution);
        }
      }
    })
  }

  //get API for Emp master- Input from
  getInputForm() {

    this.complianceInformationService.getInputDetails(this.employeeMasterId).subscribe(res => {

      if (res.data.results[0]) {
        
        this.previousEmploymentPFEPSId = res.data.results[0].previousEPFEPSResponseDTO.previousEmploymentPFEPSId;
        this.employeePFEPSDetailId = res.data.results[0].presentEPFEPSResponseDTO.employeePFEPSDetailId;
        this.InputDetailsModel.previousEPFEPSRequestDTO = res.data.results[0].previousEPFEPSResponseDTO;
        this.InputDetailsModel.presentEPFEPSRequestDTO = res.data.results[0].presentEPFEPSResponseDTO;
        this.InputDetailsModel.superAnnuationRequestDTO = res.data.results[0].superAnnuationResponseDTO;

        const saContributionRateControl = this.InputInfoForm.get('saContributionRateControl');
        saContributionRateControl.enable();

         //dates conversion
         this.InputDetailsModel.presentEPFEPSRequestDTO.contributionFromDate = new Date(res.data.results[0].presentEPFEPSResponseDTO.contributionFromDate);
         this.InputDetailsModel.presentEPFEPSRequestDTO.contributionToDate = new Date(res.data.results[0].presentEPFEPSResponseDTO.contributionToDate);
         this.InputDetailsModel.presentEPFEPSRequestDTO.voluntaryFromDate = new Date(res.data.results[0].presentEPFEPSResponseDTO.voluntaryFromDate);
         this.InputDetailsModel.presentEPFEPSRequestDTO.voluntaryToDate = new Date(res.data.results[0].presentEPFEPSResponseDTO.voluntaryToDate);
         this.InputDetailsModel.superAnnuationRequestDTO.saContributionFromDate = new Date(res.data.results[0].superAnnuationResponseDTO.saContributionFromDate);
         this.InputDetailsModel.superAnnuationRequestDTO.saContributionToDate = new Date(res.data.results[0].superAnnuationResponseDTO.saContributionToDate);
     

        if(this.InputDetailsModel.presentEPFEPSRequestDTO.isEPFApplicable==0){
          this.InputDetailsModel.presentEPFEPSRequestDTO.employeeContributionMethod=null;
          this.InputInfoForm.get('employeeContributionMethodControl').setValue(null);
          this.InputDetailsModel.presentEPFEPSRequestDTO.employerContributionMethod = null;
          this.InputInfoForm.get('employerContributionMethodControl').setValue(null);

          //clear validation
          this.InputInfoForm.get('contributionFromDateControl').clearValidators();
          this.InputInfoForm.controls.contributionFromDateControl.updateValueAndValidity();

          this.InputInfoForm.get('contributionToDateControl').clearValidators();
          this.InputInfoForm.controls.contributionToDateControl.updateValueAndValidity();

          //disabled dates
          const contributionFromDateControl = this.InputInfoForm.get('contributionFromDateControl');
          contributionFromDateControl.disable();
          const contributionToDateControl = this.InputInfoForm.get('contributionToDateControl');
          contributionToDateControl.disable();
        }
        if (this.InputDetailsModel.presentEPFEPSRequestDTO.employeeContributionMethod != null) {
          const employerContributionMethod = this.InputInfoForm.get('employerContributionMethodControl');
          employerContributionMethod.enable();
          const employeeContributionMethod = this.InputInfoForm.get('employeeContributionMethodControl');
          employeeContributionMethod.enable();

          const contributionFromDate = this.InputInfoForm.get('contributionFromDateControl');
          contributionFromDate.enable();
          const contributionToDate = this.InputInfoForm.get('contributionToDateControl');
          contributionToDate.enable();
        }
        if (this.InputDetailsModel.presentEPFEPSRequestDTO.voluntaryPFPercent != null &&
          this.InputDetailsModel.presentEPFEPSRequestDTO.voluntaryPFPercent != 0.00) {

          this.InputInfoForm.get('VoluntaryPFtoggle').setValue('percentOfNetPay');
          this.percentOrAmountModel = "percentOfNetPay";
          const VoluntaryPFtoggle = this.InputInfoForm.get('VoluntaryPFtoggle');
          VoluntaryPFtoggle.enable();
          const voluntaryPFPercent = this.InputInfoForm.get('voluntaryPFPercentControl');
          voluntaryPFPercent.enable();
          const voluntaryPFAmount = this.InputInfoForm.get('voluntaryPFAmountControl');
          voluntaryPFAmount.enable();

          const voluntaryFromDate = this.InputInfoForm.get('voluntaryFromDateControl');
          voluntaryFromDate.enable();
          const voluntaryToDate = this.InputInfoForm.get('voluntaryToDateControl');
          voluntaryToDate.enable();
        }
        if (this.InputDetailsModel.presentEPFEPSRequestDTO.voluntaryPFAmount != null &&
          this.InputDetailsModel.presentEPFEPSRequestDTO.voluntaryPFAmount != 0) {
          this.InputInfoForm.get('VoluntaryPFtoggle').setValue('amount');
          this.percentOrAmountModel = "amount";
          const VoluntaryPFtoggle = this.InputInfoForm.get('VoluntaryPFtoggle');
          VoluntaryPFtoggle.enable();
          const voluntaryPFPercent = this.InputInfoForm.get('voluntaryPFPercentControl');
          voluntaryPFPercent.enable();
          const voluntaryPFAmount = this.InputInfoForm.get('voluntaryPFAmountControl');
          voluntaryPFAmount.enable();

          const voluntaryFromDate = this.InputInfoForm.get('voluntaryFromDateControl');
          voluntaryFromDate.enable();
          const voluntaryToDate = this.InputInfoForm.get('voluntaryToDateControl');
          voluntaryToDate.enable();
        }

        if (this.InputDetailsModel.superAnnuationRequestDTO.saContributionRate != null &&
           this.InputDetailsModel.superAnnuationRequestDTO.saContributionRate != 0.00) {
            const saContributionRateControl = this.InputInfoForm.get('saContributionRateControl');
            saContributionRateControl.enable();

          const saContributionFromDate = this.InputInfoForm.get('saContributionFromDateControl');
          saContributionFromDate.enable();
          const saContributionToDate = this.InputInfoForm.get('saContributionToDateControl');
          saContributionToDate.enable();
        }
        if (this.InputDetailsModel.previousEPFEPSRequestDTO.previousPFNumber != null) {
          const previousPFNumber = this.InputInfoForm.get('previousPFNumberControl');
          previousPFNumber.enable();
        }
        if (this.InputDetailsModel.previousEPFEPSRequestDTO.schemeCertificateNumber != null) {
          const schemeCertificateNumber = this.InputInfoForm.get('schemeCertificateNumberControl');
          schemeCertificateNumber.enable();
        }
        if (this.InputDetailsModel.previousEPFEPSRequestDTO.authorityIssuer != null) {
          const authorityIssuer = this.InputInfoForm.get('authorityIssueControl');
          authorityIssuer.enable();
        }
        //get all boolean flags
        this.getAllBooleanFlags(this.InputDetailsModel);

        //set boolean flags to default value
        if (this.InputDetailsModel.previousEPFEPSRequestDTO.isFirstEmployment == "no") {
          this.isFirstEmployment = 'no';
          const isContributedInPast = this.InputInfoForm.get('isContributedInPastControl');
          isContributedInPast.enable();
        }
        if (this.InputDetailsModel.previousEPFEPSRequestDTO.isContributedInPast == "yes") {
          this.isContributedInPast = 'yes';
          const isContributedBefore1Sep2014 = this.InputInfoForm.get('isContributedBefore1Sep2014Control');
          isContributedBefore1Sep2014.enable();

          const isPartOfEPS = this.InputInfoForm.get('isPartOfEPSControl');
          isPartOfEPS.enable();
        }
        if (this.InputDetailsModel.previousEPFEPSRequestDTO.isContributedBefore1Sep2014 == "yes") {
          this.isPartOfEPS = 'yes';
          const isPartOfEPS = this.InputInfoForm.get('isPartOfEPSControl');
          isPartOfEPS.disable();
        }
      }
    })
  }

  getAllBooleanFlags(InputDetailsModel) {

    if (InputDetailsModel.previousEPFEPSRequestDTO.isFirstEmployment == 1) {
      InputDetailsModel.previousEPFEPSRequestDTO.isFirstEmployment = 'yes';
      this.isFirstEmployment = 'yes';
    }
    if (InputDetailsModel.previousEPFEPSRequestDTO.isFirstEmployment == 0) {
      InputDetailsModel.previousEPFEPSRequestDTO.isFirstEmployment = 'no';
      this.isFirstEmployment = 'no';
    }

    if (InputDetailsModel.previousEPFEPSRequestDTO.isContributedInPast == 1) {
      InputDetailsModel.previousEPFEPSRequestDTO.isContributedInPast = 'yes';
      this.isContributedInPast = 'yes';
    }
    if (InputDetailsModel.previousEPFEPSRequestDTO.isContributedInPast == 0) {
      InputDetailsModel.previousEPFEPSRequestDTO.isContributedInPast = 'no';
      this.isContributedInPast = 'no';
    }

    if (InputDetailsModel.previousEPFEPSRequestDTO.isContributedBefore1Sep2014 == 1) {
      InputDetailsModel.previousEPFEPSRequestDTO.isContributedBefore1Sep2014 = 'yes';
      this.isContributedBefore1Sep2014 = 'yes';
    }
    if (InputDetailsModel.previousEPFEPSRequestDTO.isContributedBefore1Sep2014 == 0) {
      InputDetailsModel.previousEPFEPSRequestDTO.isContributedBefore1Sep2014 = 'no';
      this.isContributedBefore1Sep2014 = 'no';
    }

    if (InputDetailsModel.previousEPFEPSRequestDTO.isPartOfEPS == 1) {
      InputDetailsModel.previousEPFEPSRequestDTO.isPartOfEPS = 'yes';
      this.isPartOfEPS = 'yes';
    }
    if (InputDetailsModel.previousEPFEPSRequestDTO.isPartOfEPS == 0) {
      InputDetailsModel.previousEPFEPSRequestDTO.isPartOfEPS = 'no';
      this.isFirstEmployment = 'no';
    }

    if (InputDetailsModel.presentEPFEPSRequestDTO.isEPFApplicable == 1) {
      InputDetailsModel.presentEPFEPSRequestDTO.isEPFApplicable = 'yes';
      this.isEPFApplicable = 'yes';
      const VoluntaryPFtoggle = this.InputInfoForm.get('VoluntaryPFtoggle');
      VoluntaryPFtoggle.enable();
      const voluntaryPFPercent = this.InputInfoForm.get('voluntaryPFPercentControl');
      voluntaryPFPercent.enable();
      const voluntaryPFAmount = this.InputInfoForm.get('voluntaryPFAmountControl');
      voluntaryPFAmount.enable();
    }
    if (InputDetailsModel.presentEPFEPSRequestDTO.isEPFApplicable == 0) {
      InputDetailsModel.presentEPFEPSRequestDTO.isEPFApplicable = 'no';
      this.isEPFApplicable = 'no';
    }

    if (InputDetailsModel.presentEPFEPSRequestDTO.isEPSApplicable == 1) {
      InputDetailsModel.presentEPFEPSRequestDTO.isEPSApplicable = 'Yes';
    }
    if (InputDetailsModel.presentEPFEPSRequestDTO.isEPSApplicable == 0) {
      InputDetailsModel.presentEPFEPSRequestDTO.isEPSApplicable = 'No';
    }

    if (InputDetailsModel.presentEPFEPSRequestDTO.isEPSContributionTill60 == 1) {
      InputDetailsModel.presentEPFEPSRequestDTO.isEPSContributionTill60 = 'yes';
      this.isEPSContributionTill60 = 'yes';
    }
    if (InputDetailsModel.presentEPFEPSRequestDTO.isEPSContributionTill60 == 0) {
      InputDetailsModel.presentEPFEPSRequestDTO.isEPSContributionTill60 = 'no';
      this.isEPSContributionTill60 = 'no';
    }
  }

  setAllBooleanFlags(InputDetailsModel) {

    if (InputDetailsModel.previousEPFEPSRequestDTO.isFirstEmployment == 'yes') {
      InputDetailsModel.previousEPFEPSRequestDTO.isFirstEmployment = 1;
    }
    if (InputDetailsModel.previousEPFEPSRequestDTO.isFirstEmployment == 'no') {
      InputDetailsModel.previousEPFEPSRequestDTO.isFirstEmployment = 0;
    }

    if (InputDetailsModel.previousEPFEPSRequestDTO.isContributedInPast == 'yes') {
      InputDetailsModel.previousEPFEPSRequestDTO.isContributedInPast = 1;
    }
    if (InputDetailsModel.previousEPFEPSRequestDTO.isContributedInPast == 'no') {
      InputDetailsModel.previousEPFEPSRequestDTO.isContributedInPast = 0;
    }

    if (InputDetailsModel.previousEPFEPSRequestDTO.isContributedBefore1Sep2014 == 'yes') {
      InputDetailsModel.previousEPFEPSRequestDTO.isContributedBefore1Sep2014 = 1;
    }
    if (InputDetailsModel.previousEPFEPSRequestDTO.isContributedBefore1Sep2014 == 'no') {
      InputDetailsModel.previousEPFEPSRequestDTO.isContributedBefore1Sep2014 = 0;
    }

    if (InputDetailsModel.previousEPFEPSRequestDTO.isPartOfEPS == 'yes') {
      InputDetailsModel.previousEPFEPSRequestDTO.isPartOfEPS = 1;
    }
    if (InputDetailsModel.previousEPFEPSRequestDTO.isPartOfEPS == 'no') {
      InputDetailsModel.previousEPFEPSRequestDTO.isPartOfEPS = 0;
    }

    if (InputDetailsModel.presentEPFEPSRequestDTO.isEPFApplicable == 'yes') {
      InputDetailsModel.presentEPFEPSRequestDTO.isEPFApplicable = 1;
    }
    if (InputDetailsModel.presentEPFEPSRequestDTO.isEPFApplicable == 'no') {
      InputDetailsModel.presentEPFEPSRequestDTO.isEPFApplicable = 0;
    }

    if (InputDetailsModel.presentEPFEPSRequestDTO.isEPSApplicable == 'Yes') {
      InputDetailsModel.presentEPFEPSRequestDTO.isEPSApplicable = 1;
    }
    if (InputDetailsModel.presentEPFEPSRequestDTO.isEPSApplicable == 'No') {
      InputDetailsModel.presentEPFEPSRequestDTO.isEPSApplicable = 0;
    }

    if (InputDetailsModel.presentEPFEPSRequestDTO.isEPSContributionTill60 == 'yes') {
      InputDetailsModel.presentEPFEPSRequestDTO.isEPSContributionTill60 = 1;
    }
    if (InputDetailsModel.presentEPFEPSRequestDTO.isEPSContributionTill60 == 'no') {
      InputDetailsModel.presentEPFEPSRequestDTO.isEPSContributionTill60 = 0;
    }
  }
  InputFormSubmit(InputDetailsModel) {

    InputDetailsModel.presentEPFEPSRequestDTO.employeeMasterId = this.employeeMasterId;
    InputDetailsModel.previousEPFEPSRequestDTO.previousEmploymentPFEPSId = this.previousEmploymentPFEPSId;
    InputDetailsModel.presentEPFEPSRequestDTO.employeePFEPSDetailId = this.employeePFEPSDetailId;

    //deleting extra fields
    delete InputDetailsModel.presentEPFEPSResponseDTO;
    delete InputDetailsModel.previousEPFEPSResponseDTO;
    delete InputDetailsModel.superAnnuationResponseDTO;

    InputDetailsModel.presentEPFEPSRequestDTO.contributionFromDate = this.datepipe.transform(InputDetailsModel.presentEPFEPSRequestDTO.contributionFromDate, "dd-MMM-yyyy");
    InputDetailsModel.presentEPFEPSRequestDTO.contributionToDate = this.datepipe.transform(InputDetailsModel.presentEPFEPSRequestDTO.contributionToDate, "dd-MMM-yyyy");
    InputDetailsModel.presentEPFEPSRequestDTO.voluntaryFromDate = this.datepipe.transform(InputDetailsModel.presentEPFEPSRequestDTO.voluntaryFromDate, "dd-MMM-yyyy");
    InputDetailsModel.presentEPFEPSRequestDTO.voluntaryToDate = this.datepipe.transform(InputDetailsModel.presentEPFEPSRequestDTO.voluntaryToDate, "dd-MMM-yyyy");
    InputDetailsModel.superAnnuationRequestDTO.saContributionFromDate = this.datepipe.transform(InputDetailsModel.superAnnuationRequestDTO.saContributionFromDate, "dd-MMM-yyyy");
    InputDetailsModel.superAnnuationRequestDTO.saContributionToDate = this.datepipe.transform(InputDetailsModel.superAnnuationRequestDTO.saContributionToDate, "dd-MMM-yyyy");

    //set boolean flag
    this.setAllBooleanFlags(InputDetailsModel);

    this.complianceInformationService.postInputDetails(InputDetailsModel).subscribe(res => {
      //this.notifyService.showSuccess(res.status.messsage, "Success..!!");
      this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
      this.InputDetailsModel = res.data.results[0];

      this.getInputForm();
      //this.EventEmitterService.getJobInformationInitiate();
    })
    this.InputInfoForm.markAsUntouched();
  }

  validatContributionDate() {
    this.InputInfoForm.controls['contributionFromDateControl'].setValidators([Validators.required]);
    this.InputInfoForm.controls.contributionFromDateControl.updateValueAndValidity();
    this.InputInfoForm.controls['contributionToDateControl'].setValidators([Validators.required]);
    this.InputInfoForm.controls.contributionToDateControl.updateValueAndValidity();
    this.InputInfoForm.controls['employerContributionMethodControl'].setValidators([Validators.required]);
    this.InputInfoForm.controls.employerContributionMethodControl.updateValueAndValidity();
  }

  enableContributionDate() {
    
    const contributionFromDate = this.InputInfoForm.get('contributionFromDateControl');
    contributionFromDate.enable();
    const contributionToDate = this.InputInfoForm.get('contributionToDateControl');
    contributionToDate.enable();
    const employerContributionMethod = this.InputInfoForm.get('employerContributionMethodControl');
    employerContributionMethod.enable();

    if (this.InputDetailsModel.presentEPFEPSRequestDTO.employeeContributionMethod == '' || this.InputDetailsModel.presentEPFEPSRequestDTO.employeeContributionMethod == null) {
      this.InputDetailsModel.presentEPFEPSRequestDTO.contributionFromDate = null;
      this.InputDetailsModel.presentEPFEPSRequestDTO.contributionToDate = null;
      this.InputDetailsModel.presentEPFEPSRequestDTO.employerContributionMethod = null;

      const contributionToDate = this.InputInfoForm.get('contributionToDateControl');
      contributionToDate.disable();
      const contributionFromDate = this.InputInfoForm.get('contributionFromDateControl');
      contributionFromDate.disable();
      const employerContributionMethod = this.InputInfoForm.get('employerContributionMethodControl');
      employerContributionMethod.disable();
    }

    //set employer contribution list
    if (this.contributionMethodChoice == true) {
      if (this.employeeCompanyContributionDiff == true) {

        //check PF gross salary
        // if (this.grossPFSalary < 15000) {
        //   //employer contribution will the same
        //   this.InputDetailsModel.presentEPFEPSRequestDTO.employerContributionMethod = this.InputDetailsModel.presentEPFEPSRequestDTO.employeeContributionMethod;
        //   const employerContributionMethod = this.InputInfoForm.get('employerContributionMethodControl');
        //   employerContributionMethod.disable();
        // }
      //  else {
        
          if (this.InputDetailsModel.presentEPFEPSRequestDTO.employeeContributionMethod == "RESTRICTED") {
            //set employer contribution to RESTRICTED
            this.InputDetailsModel.presentEPFEPSRequestDTO.employerContributionMethod = this.InputDetailsModel.presentEPFEPSRequestDTO.employeeContributionMethod;
            this.InputInfoForm.get('employeeContributionMethodControl').setValue('RESTRICTED');
            const employerContributionMethod = this.InputInfoForm.get('employerContributionMethodControl');
            employerContributionMethod.disable();
          }
          if (this.InputDetailsModel.presentEPFEPSRequestDTO.employeeContributionMethod == "FULL") {
            //employer contribution would be Full or RESTRICTED
            this.employerContributionList = this.employerContributionList;
            this.totalEmployerContributionList = this.totalEmployerContributionList;
            this.InputInfoForm.controls['employerContributionMethodControl'].setValidators([Validators.required]);
            this.InputInfoForm.controls.employerContributionMethodControl.updateValueAndValidity();
          }
       // }
      }
      if (this.employeeCompanyContributionDiff == false) {
        //employer contribution will the same
        this.InputDetailsModel.presentEPFEPSRequestDTO.employerContributionMethod = this.InputDetailsModel.presentEPFEPSRequestDTO.employeeContributionMethod;
        const employerContributionMethod = this.InputInfoForm.get('employerContributionMethodControl');
        this.InputInfoForm.controls.employerContributionMethodControl.updateValueAndValidity();
        employerContributionMethod.disable();
      }
    }
    if (this.contributionMethodChoice == false) {
      this.InputDetailsModel.presentEPFEPSRequestDTO.employeeContributionMethod = this.employeeContributionList[0];
      this.InputInfoForm.get('employeeContributionMethodControl').setValue(this.employeeContributionList[0]);
      const employeeContributionMethod = this.InputInfoForm.get('employeeContributionMethodControl');
      employeeContributionMethod.disable();

      this.InputDetailsModel.presentEPFEPSRequestDTO.employerContributionMethod = this.employerContributionList[0];
      this.InputInfoForm.get('employerContributionMethodControl').setValue(this.employerContributionList[0]);
      const employerContributionMethod = this.InputInfoForm.get('employerContributionMethodControl');
      employerContributionMethod.disable();
    
      //enabled contribution dates
      const contributionToDate = this.InputInfoForm.get('contributionToDateControl');
      contributionToDate.enable();
      const contributionFromDateControl = this.InputInfoForm.get('contributionFromDateControl');
      contributionFromDateControl.enable();

      //make madatory contribution dates
      this.validatContributionDate();
    }
  }

  checkContributionToDate(){
    
    if (this.InputDetailsModel.presentEPFEPSRequestDTO.employeeContributionMethod != null &&
      this.InputDetailsModel.presentEPFEPSRequestDTO.employeeContributionMethod != '') {
        this.InputInfoForm.controls['contributionFromDateControl'].setValidators([Validators.required]);
        this.InputInfoForm.controls.contributionFromDateControl.updateValueAndValidity();

        this.InputInfoForm.controls['contributionToDateControl'].setValidators([Validators.required]);
        this.InputInfoForm.controls.contributionToDateControl.updateValueAndValidity();
      }

    if (this.InputDetailsModel.superAnnuationRequestDTO.saContributionRate != null &&
      this.InputDetailsModel.superAnnuationRequestDTO.saContributionRate != 0) {
        this.InputInfoForm.controls['saContributionFromDateControl'].setValidators([Validators.required]);
        this.InputInfoForm.controls.saContributionFromDateControl.updateValueAndValidity();

        this.InputInfoForm.controls['saContributionToDateControl'].setValidators([Validators.required]);
        this.InputInfoForm.controls.saContributionToDateControl.updateValueAndValidity();
      }
  }

  validateContributionToDate() {
    if (this.InputDetailsModel.presentEPFEPSRequestDTO.contributionToDate == '' || this.InputDetailsModel.presentEPFEPSRequestDTO.contributionToDate == null) {
      this.InputDetailsModel.presentEPFEPSRequestDTO.contributionToDate = '31-Dec-9999';
      const contributionToDate = this.InputInfoForm.get('contributionToDateControl');
      contributionToDate.enable();
    }

    if (this.InputDetailsModel.presentEPFEPSRequestDTO.employeeContributionMethod != null &&
      this.InputDetailsModel.presentEPFEPSRequestDTO.employeeContributionMethod != '') {
        this.InputInfoForm.controls['contributionFromDateControl'].setValidators([Validators.required]);
        this.InputInfoForm.controls.contributionFromDateControl.updateValueAndValidity();
      }
  }

  searchEmployeeContribution(employee) {
    this.InputDetailsModel.presentEPFEPSRequestDTO.contributionFromDate = null;
    this.InputDetailsModel.presentEPFEPSRequestDTO.contributionToDate = null;
    this.InputDetailsModel.presentEPFEPSRequestDTO.employerContributionMethod = null;
    const contributionToDate = this.InputInfoForm.get('contributionToDateControl');
    contributionToDate.disable();
    const contributionFromDate = this.InputInfoForm.get('contributionFromDateControl');
    contributionFromDate.disable();
    const employerContributionMethod = this.InputInfoForm.get('employerContributionMethodControl');
    employerContributionMethod.disable();

    employee = employee.toLowerCase();
    const ifsc = this.totalEmployeeContributionList.filter((item) => {
      return JSON.stringify(item).toLowerCase().includes(employee);
    });
    this.employeeContributionList = ifsc;
  }

  searchEmployerContribution(employee) {
    employee = employee.toLowerCase();
    const ifsc = this.totalEmployerContributionList.filter((item) => {
      return JSON.stringify(item).toLowerCase().includes(employee);
    });
    this.employerContributionList = ifsc;
  }

  validatSAContributionDate() {
    this.InputInfoForm.controls['saContributionFromDateControl'].setValidators([Validators.required]);
    this.InputInfoForm.controls.saContributionFromDateControl.updateValueAndValidity();
    this.InputInfoForm.controls['saContributionToDateControl'].setValidators([Validators.required]);
    this.InputInfoForm.controls.saContributionToDateControl.updateValueAndValidity();
  }

  enableSAContributionDate() {
    const saContributionFromDate = this.InputInfoForm.get('saContributionFromDateControl');
    saContributionFromDate.enable();
    const saContributionToDate = this.InputInfoForm.get('saContributionToDateControl');
    saContributionToDate.enable();
    if (this.InputDetailsModel.superAnnuationRequestDTO.saContributionRate == '' || this.InputDetailsModel.superAnnuationRequestDTO.saContributionRate == null) {
      this.InputDetailsModel.superAnnuationRequestDTO.saContributionFromDate = null;
      this.InputDetailsModel.superAnnuationRequestDTO.saContributionToDate = null;
      const saContributionToDate = this.InputInfoForm.get('saContributionToDateControl');
      saContributionToDate.disable();
      const saContributionFromDate = this.InputInfoForm.get('saContributionFromDateControl');
      saContributionFromDate.disable();
    }
  }

  checkSAContributionToDate(){
    
    if (this.InputDetailsModel.superAnnuationRequestDTO.saContributionRate != null &&
      this.InputDetailsModel.superAnnuationRequestDTO.saContributionRate != 0) {
        this.InputInfoForm.controls['saContributionFromDateControl'].setValidators([Validators.required]);
        this.InputInfoForm.controls.saContributionFromDateControl.updateValueAndValidity();

        this.InputInfoForm.controls['saContributionToDateControl'].setValidators([Validators.required]);
        this.InputInfoForm.controls.saContributionToDateControl.updateValueAndValidity();
      }
  }

  validateSAContributionToDate() {
    
    if (this.InputDetailsModel.superAnnuationRequestDTO.saContributionToDate == '' || this.InputDetailsModel.superAnnuationRequestDTO.saContributionToDate == null) {
      this.InputDetailsModel.superAnnuationRequestDTO.saContributionToDate = '31-Dec-9999';
      const saContributionToDate = this.InputInfoForm.get('saContributionToDateControl');
      saContributionToDate.enable();
    }
    
    if (this.InputDetailsModel.superAnnuationRequestDTO.saContributionRate != null &&
      this.InputDetailsModel.superAnnuationRequestDTO.saContributionRate != 0) {
        this.InputInfoForm.controls['saContributionFromDateControl'].setValidators([Validators.required]);
        this.InputInfoForm.controls.saContributionFromDateControl.updateValueAndValidity();
      }
  }

  validatVoluntaryDate() {
    this.InputInfoForm.controls['voluntaryFromDateControl'].setValidators([Validators.required]);
    this.InputInfoForm.controls.voluntaryFromDateControl.updateValueAndValidity();
    this.InputInfoForm.controls['voluntaryToDateControl'].setValidators([Validators.required]);
    this.InputInfoForm.controls.voluntaryToDateControl.updateValueAndValidity();
  }

  enableVoluntaryPercentDate() {
    const voluntaryFromDate = this.InputInfoForm.get('voluntaryFromDateControl');
    voluntaryFromDate.enable();
    const voluntaryToDate = this.InputInfoForm.get('voluntaryToDateControl');
    voluntaryToDate.enable();
    if (this.InputDetailsModel.presentEPFEPSRequestDTO.voluntaryPFPercent == '' || this.InputDetailsModel.presentEPFEPSRequestDTO.voluntaryPFPercent == null) {
      this.InputDetailsModel.presentEPFEPSRequestDTO.voluntaryFromDate = null;
      this.InputDetailsModel.presentEPFEPSRequestDTO.voluntaryToDate = null;
      const voluntaryToDate = this.InputInfoForm.get('voluntaryToDateControl');
      voluntaryToDate.disable();
      const voluntaryFromDate = this.InputInfoForm.get('voluntaryFromDateControl');
      voluntaryFromDate.disable();
    }
  }

  enableVoluntaryAmountDate() {
    const voluntaryFromDate = this.InputInfoForm.get('voluntaryFromDateControl');
    voluntaryFromDate.enable();
    const voluntaryToDate = this.InputInfoForm.get('voluntaryToDateControl');
    voluntaryToDate.enable();
    if (this.InputDetailsModel.presentEPFEPSRequestDTO.voluntaryPFAmount == '' || this.InputDetailsModel.presentEPFEPSRequestDTO.voluntaryPFAmount == null) {
      this.InputDetailsModel.presentEPFEPSRequestDTO.voluntaryFromDate = null;
      this.InputDetailsModel.presentEPFEPSRequestDTO.voluntaryToDate = null;
      const voluntaryToDate = this.InputInfoForm.get('voluntaryToDateControl');
      voluntaryToDate.disable();
      const voluntaryFromDate = this.InputInfoForm.get('voluntaryFromDateControl');
      voluntaryFromDate.disable();
    }
  }

  checkVoluntaryToDate(){
    if (this.InputDetailsModel.presentEPFEPSRequestDTO.voluntaryPFPercent != null &&
      this.InputDetailsModel.presentEPFEPSRequestDTO.voluntaryPFPercent != '') {
        this.InputInfoForm.controls['voluntaryFromDateControl'].setValidators([Validators.required]);
        this.InputInfoForm.controls.voluntaryFromDateControl.updateValueAndValidity();

        this.InputInfoForm.controls['voluntaryToDateControl'].setValidators([Validators.required]);
        this.InputInfoForm.controls.voluntaryToDateControl.updateValueAndValidity();
      }

      if (this.InputDetailsModel.presentEPFEPSRequestDTO.voluntaryPFAmount != null &&
        this.InputDetailsModel.presentEPFEPSRequestDTO.voluntaryPFAmount != '') {
          this.InputInfoForm.controls['voluntaryFromDateControl'].setValidators([Validators.required]);
          this.InputInfoForm.controls.voluntaryFromDateControl.updateValueAndValidity();

          this.InputInfoForm.controls['voluntaryToDateControl'].setValidators([Validators.required]);
          this.InputInfoForm.controls.voluntaryToDateControl.updateValueAndValidity();
        }
  }
  validateVoluntaryToDate() {
    if (this.InputDetailsModel.presentEPFEPSRequestDTO.voluntaryToDate == '' || this.InputDetailsModel.presentEPFEPSRequestDTO.voluntaryToDate == null) {
      this.InputDetailsModel.presentEPFEPSRequestDTO.voluntaryToDate = '31-Dec-9999';
      const voluntaryToDate = this.InputInfoForm.get('voluntaryToDateControl');
      voluntaryToDate.enable();
    }

    if (this.InputDetailsModel.presentEPFEPSRequestDTO.voluntaryPFPercent != null &&
      this.InputDetailsModel.presentEPFEPSRequestDTO.voluntaryPFPercent != '') {
        this.InputInfoForm.controls['voluntaryFromDateControl'].setValidators([Validators.required]);
        this.InputInfoForm.controls.voluntaryFromDateControl.updateValueAndValidity();

        this.InputInfoForm.controls['voluntaryToDateControl'].setValidators([Validators.required]);
        this.InputInfoForm.controls.voluntaryToDateControl.updateValueAndValidity();
      }

      if (this.InputDetailsModel.presentEPFEPSRequestDTO.voluntaryPFAmount != null &&
        this.InputDetailsModel.presentEPFEPSRequestDTO.voluntaryPFAmount != '') {
          this.InputInfoForm.controls['voluntaryFromDateControl'].setValidators([Validators.required]);
          this.InputInfoForm.controls.voluntaryFromDateControl.updateValueAndValidity();

          this.InputInfoForm.controls['voluntaryToDateControl'].setValidators([Validators.required]);
          this.InputInfoForm.controls.voluntaryToDateControl.updateValueAndValidity();
        }
  }

  enablePresentTabData() {

    //set contribution method mandatory
    this.InputInfoForm.controls['employeeContributionMethodControl'].setValidators([Validators.required]);
    this.InputInfoForm.controls.employeeContributionMethodControl.updateValueAndValidity();
    const employeeContributionMethod = this.InputInfoForm.get('employeeContributionMethodControl');
    employeeContributionMethod.enable();
    this.enableContributionDate();

    // const employerContributionMethod = this.InputInfoForm.get('employerContributionMethodControl');
    // employerContributionMethod.enable();

    const VoluntaryPFtoggle = this.InputInfoForm.get('VoluntaryPFtoggle');
    VoluntaryPFtoggle.enable();

    const voluntaryPFPercent = this.InputInfoForm.get('voluntaryPFPercentControl');
    voluntaryPFPercent.enable();

    const voluntaryPFAmount = this.InputInfoForm.get('voluntaryPFAmountControl');
    voluntaryPFAmount.enable();
  }

  disablePresentTabData() {
    
    this.InputDetailsModel.presentEPFEPSRequestDTO.employeeContributionMethod = null;
    const employeeContributionMethod = this.InputInfoForm.get('employeeContributionMethodControl');
    employeeContributionMethod.disable();

    this.InputDetailsModel.presentEPFEPSRequestDTO.employerContributionMethod = null;
    const employerContributionMethod = this.InputInfoForm.get('employerContributionMethodControl');
    employerContributionMethod.disable();

    const VoluntaryPFtoggle = this.InputInfoForm.get('VoluntaryPFtoggle');
    VoluntaryPFtoggle.disable();

    this.InputDetailsModel.presentEPFEPSRequestDTO.voluntaryPFPercent = null;
    const voluntaryPFPercent = this.InputInfoForm.get('voluntaryPFPercentControl');
    voluntaryPFPercent.disable();

    this.InputDetailsModel.presentEPFEPSRequestDTO.voluntaryPFAmount = null;
    const voluntaryPFAmount = this.InputInfoForm.get('voluntaryPFAmountControl');
    voluntaryPFAmount.disable();

    this.InputDetailsModel.presentEPFEPSRequestDTO.voluntaryFromDate = null;
    const voluntaryFromDate = this.InputInfoForm.get('voluntaryFromDateControl');
    voluntaryFromDate.disable();

    this.InputDetailsModel.presentEPFEPSRequestDTO.voluntaryToDate = null;
    const voluntaryToDate = this.InputInfoForm.get('voluntaryToDateControl');
    voluntaryToDate.disable();

    this.InputDetailsModel.presentEPFEPSRequestDTO.contributionFromDate = null;
    const contributionToDate = this.InputInfoForm.get('contributionToDateControl');
    contributionToDate.disable();

    this.InputInfoForm.get('contributionToDateControl').clearValidators();
    this.InputInfoForm.controls.contributionToDateControl.updateValueAndValidity();

    this.InputDetailsModel.presentEPFEPSRequestDTO.contributionToDate = null;
    const contributionFromDate = this.InputInfoForm.get('contributionFromDateControl');
    contributionFromDate.disable();

    this.InputInfoForm.get('contributionFromDateControl').clearValidators();
    this.InputInfoForm.controls.contributionFromDateControl.updateValueAndValidity();

    this.isEPSContributionTill60 = 'no';
    this.InputInfoForm.get('isEPSContributionTill60Control').setValue('no');  
    const isEPSContributionTill60 = this.InputInfoForm.get('isEPSContributionTill60Control');
    isEPSContributionTill60.disable();
  }

  checkFlowIfAgeGreaterThan58() {

    if (this.employeeAge < 58) {
      //EPS applicable
      this.InputDetailsModel.presentEPFEPSRequestDTO.isEPSApplicable = "Yes";
     // this.InputInfoForm.get('isEPSApplicableControl').setValue('yes'); 

      //option selection available for contribution towards 60 years
      const isEPSContributionTill60 = this.InputInfoForm.get('isEPSContributionTill60Control');
      isEPSContributionTill60.enable();
    }
    if (this.employeeAge > 58 && this.employeeAge < 60) {
      //need to check cycle lock(If entry is available then user is not able to choose the option )
      if (this.InputDetailsModel.presentEPFEPSRequestDTO.isEPSContributionTill60 == "") {
        const isEPSContributionTill60 = this.InputInfoForm.get('isEPSContributionTill60Control');
        isEPSContributionTill60.enable();
        this.isEPSContributionTill60 = '';
        this.InputInfoForm.controls['isEPSContributionTill60'].setValidators([Validators.required]);
        this.InputInfoForm.controls.isEPSContributionTill60.updateValueAndValidity();

        this.InputDetailsModel.presentEPFEPSRequestDTO.isEPSApplicable = "No";
      }
      if (this.InputDetailsModel.presentEPFEPSRequestDTO.isEPSContributionTill60 == "yes") {
        if (this.employeeAge > 60) {
          this.InputDetailsModel.presentEPFEPSRequestDTO.isEPSApplicable = "No";
          //this.InputInfoForm.get('isEPSApplicableControl').setValue('no');  
        }
        else {
          this.InputDetailsModel.presentEPFEPSRequestDTO.isEPSApplicable = "Yes";
         // this.InputInfoForm.get('isEPSApplicableControl').setValue('yes');  
        }
      }
      if (this.InputDetailsModel.presentEPFEPSRequestDTO.isEPSContributionTill60 == "no") {
        
        this.InputDetailsModel.presentEPFEPSRequestDTO.isEPSApplicable = "No";
        //this.InputInfoForm.get('isEPSApplicableControl').setValue('no');  
      }
    }
    if (this.employeeAge >= 60) {
      this.InputDetailsModel.presentEPFEPSRequestDTO.isEPSApplicable = "No";
     // this.InputInfoForm.get('isEPSApplicableControl').setValue('no');  
    }
  }

  setEPSApplicableValue() {

    //check contribution before sep 2014
    if (this.InputDetailsModel.previousEPFEPSRequestDTO.isContributedBefore1Sep2014 == "yes") {
      this.checkFlowIfAgeGreaterThan58();
    }
    if (this.InputDetailsModel.previousEPFEPSRequestDTO.isContributedBefore1Sep2014 == "no") {
      //check part of EPS
      if (this.InputDetailsModel.previousEPFEPSRequestDTO.isPartOfEPS == "yes") {
        this.checkFlowIfAgeGreaterThan58();
      }
      if (this.InputDetailsModel.previousEPFEPSRequestDTO.isPartOfEPS == "no") {
        //check PF gross salary
        if (this.grossPFSalary < 15000) {
          this.checkFlowIfAgeGreaterThan58();
        }
        else {
          this.InputDetailsModel.presentEPFEPSRequestDTO.isEPSApplicable = "No";
         // this.InputInfoForm.get('isEPSApplicableControl').setValue('no');  
        }
      }
    }
    this.enablePresentTabData();
  }

  //Toggle button validation
  firstEmploymentToggle(event) {
       //enable sa Contribution percentage
       const saContribution = this.InputInfoForm.get('saContributionRateControl');
       saContribution.enable();

    if (event.currentTarget.defaultValue == "yes") {
      this.isFirstEmployment = "yes";
      this.InputDetailsModel.previousEPFEPSRequestDTO.isFirstEmployment = "yes";

      this.InputDetailsModel.previousEPFEPSRequestDTO.isContributedInPast = 'no';
      this.isContributedInPast = 'no';
      this.InputInfoForm.get('isContributedInPastControl').setValue('no');   
      const isContributedInPast = this.InputInfoForm.get('isContributedInPastControl');
      isContributedInPast.disable();

      this.InputDetailsModel.previousEPFEPSRequestDTO.previousPFNumber = null;
      const previousPFNumber = this.InputInfoForm.get('previousPFNumberControl');
      previousPFNumber.disable();

      this.InputDetailsModel.previousEPFEPSRequestDTO.isContributedBefore1Sep2014 = 'no';
      this.isContributedBefore1Sep2014 = 'no';
      this.InputInfoForm.get('isContributedBefore1Sep2014Control').setValue('no');   
      const isContributedBefore1Sep2014 = this.InputInfoForm.get('isContributedBefore1Sep2014Control');
      isContributedBefore1Sep2014.disable();

      this.InputDetailsModel.previousEPFEPSRequestDTO.isPartOfEPS = 'no';
      this.isPartOfEPS = 'no';
      this.InputInfoForm.get('isPartOfEPSControl').setValue('no');   
      const isPartOfEPS = this.InputInfoForm.get('isPartOfEPSControl');
      isPartOfEPS.disable();

      if (this.optionToChooseNill == false) {
        const isEPFApplicable = this.InputInfoForm.get('isEPFApplicableControl');
        isEPFApplicable.disable();
        this.isEPFApplicable = "yes";
        this.InputInfoForm.get('isEPFApplicableControl').setValue('yes');  
        this.InputDetailsModel.presentEPFEPSRequestDTO.isEPFApplicable = "yes";
     
  
        // this.enablePresentTabData();
        this.setEPSApplicableValue();
      }
      if (this.optionToChooseNill == true) {
        //check PF gross salary
        if (this.grossPFSalary < 15000) {

          const isEPFApplicable = this.InputInfoForm.get('isEPFApplicableControl');
          isEPFApplicable.disable();
          this.isEPFApplicable = "yes";
          this.InputInfoForm.get('isEPFApplicableControl').setValue('yes');  
          this.InputDetailsModel.presentEPFEPSRequestDTO.isEPFApplicable = "yes";

          // this.enablePresentTabData();
          this.setEPSApplicableValue();
        }
        else {
          const isEPFApplicable = this.InputInfoForm.get('isEPFApplicableControl');
          isEPFApplicable.enable();
          this.isEPFApplicable = '';
         // this.InputInfoForm.get('isEPFApplicableControl').setValue('');  
          this.InputDetailsModel.presentEPFEPSRequestDTO.isEPFApplicable = null;
          this.InputInfoForm.controls['isEPFApplicableControl'].setValidators([Validators.required]);
          this.InputInfoForm.controls.isEPFApplicableControl.updateValueAndValidity();
          //this.disablePresentTabData();
        }
      }
      this.disableCertificatesNumber();
    } else {
      this.isFirstEmployment = "no";
      this.InputDetailsModel.previousEPFEPSRequestDTO.isFirstEmployment = "no";

      const isContributedInPast = this.InputInfoForm.get('isContributedInPastControl');
      isContributedInPast.enable();
      this.InputDetailsModel.previousEPFEPSRequestDTO.isContributedInPast = 'no';
      this.InputInfoForm.get('isContributedInPastControl').setValue('no');  
      this.isContributedInPast = 'no';

      this.InputDetailsModel.previousEPFEPSRequestDTO.isContributedBefore1Sep2014 = 'no';
      this.isContributedBefore1Sep2014 = 'no';
      this.InputInfoForm.get('isContributedBefore1Sep2014Control').setValue('no');  
      const isContributedBefore1Sep2014 = this.InputInfoForm.get('isContributedBefore1Sep2014Control');
      isContributedBefore1Sep2014.disable();

      this.InputDetailsModel.previousEPFEPSRequestDTO.isPartOfEPS = 'no';
      this.isPartOfEPS = 'no';
      this.InputInfoForm.get('isPartOfEPSControl').setValue('no');  
      const isPartOfEPS = this.InputInfoForm.get('isPartOfEPSControl');
      isPartOfEPS.disable();

      if (this.optionToChooseNill == false) {
        const isEPFApplicable = this.InputInfoForm.get('isEPFApplicableControl');
        isEPFApplicable.disable();
        this.isEPFApplicable = "yes";
        this.InputDetailsModel.presentEPFEPSRequestDTO.isEPFApplicable = "yes";
        this.InputInfoForm.get('isEPFApplicableControl').setValue('yes');  
   

        this.setEPSApplicableValue();
      }
      if (this.optionToChooseNill == true) {
        //check PF gross salary
        if (this.grossPFSalary < 15000) {
          const isEPFApplicable = this.InputInfoForm.get('isEPFApplicableControl');
          this.isEPFApplicable = "yes";
          this.InputDetailsModel.presentEPFEPSRequestDTO.isEPFApplicable = "yes";
          this.InputInfoForm.get('isEPFApplicableControl').setValue('yes');  
          isEPFApplicable.disable();
          this.setEPSApplicableValue();
        }
        else {
          const isEPFApplicable = this.InputInfoForm.get('isEPFApplicableControl');
          isEPFApplicable.enable();
          this.InputDetailsModel.presentEPFEPSRequestDTO.isEPFApplicable = null;
          this.isEPFApplicable = '';
          this.InputInfoForm.controls['isEPFApplicableControl'].setValidators([Validators.required]);
          this.InputInfoForm.controls.isEPFApplicableControl.updateValueAndValidity();
          //this.disablePresentTabData();
        }
      }
    }
  }

  haveYouContributedInPastToggle(event) {

    if (event.currentTarget.defaultValue == "yes") {
      this.isContributedInPast = "yes";
      this.InputDetailsModel.previousEPFEPSRequestDTO.isContributedInPast = "yes";

      //PF number will be mandatory
      this.InputInfoForm.controls['previousPFNumberControl'].setValidators([Validators.required]);
      this.InputInfoForm.controls.previousPFNumberControl.updateValueAndValidity();
      const previousPFNumber = this.InputInfoForm.get('previousPFNumberControl');
      previousPFNumber.enable();

      const isContributedBefore1Sep2014 = this.InputInfoForm.get('isContributedBefore1Sep2014Control');
      this.InputDetailsModel.previousEPFEPSRequestDTO.isContributedBefore1Sep2014 = "no"
      this.InputInfoForm.get('isContributedBefore1Sep2014Control').setValue('no');  
      this.isContributedBefore1Sep2014 = 'no';
      isContributedBefore1Sep2014.enable();

      if (this.InputDetailsModel.previousEPFEPSRequestDTO.isContributedBefore1Sep2014 == "no" || this.isContributedBefore1Sep2014 == "no") {
        const isPartOfEPS = this.InputInfoForm.get('isPartOfEPSControl');
        this.InputInfoForm.get('isPartOfEPSControl').setValue('no');  
        isPartOfEPS.enable();
        this.InputDetailsModel.previousEPFEPSRequestDTO.isPartOfEPS = "no";
        this.isPartOfEPS = 'no';
      }

      const isEPFApplicable = this.InputInfoForm.get('isEPFApplicableControl');
      this.isEPFApplicable = "yes";
      this.InputDetailsModel.presentEPFEPSRequestDTO.isEPFApplicable = "yes";
      this.InputInfoForm.get('isEPFApplicableControl').setValue('yes');  
      isEPFApplicable.disable();
      this.setEPSApplicableValue();


      this.enableCertificatesNumber();
    } else {
      this.isContributedInPast = "no";
      this.InputDetailsModel.previousEPFEPSRequestDTO.isContributedInPast = "no";

      this.InputDetailsModel.previousEPFEPSRequestDTO.previousPFNumber = null;
      const previousPFNumber = this.InputInfoForm.get('previousPFNumberControl');
      previousPFNumber.disable();

      this.InputDetailsModel.previousEPFEPSRequestDTO.isContributedBefore1Sep2014 = 'no';
      this.isContributedBefore1Sep2014 = 'no';
      this.InputInfoForm.get('isContributedBefore1Sep2014Control').setValue('no');  
      const isContributedBefore1Sep2014 = this.InputInfoForm.get('isContributedBefore1Sep2014Control');
      isContributedBefore1Sep2014.disable();

      this.InputDetailsModel.previousEPFEPSRequestDTO.isPartOfEPS = 'no';
      this.isPartOfEPS = 'no';
      this.InputInfoForm.get('isPartOfEPSControl').setValue('no');  
      const isPartOfEPS = this.InputInfoForm.get('isPartOfEPSControl');
      isPartOfEPS.disable();

      if (this.optionToChooseNill == false) {
        const isEPFApplicable = this.InputInfoForm.get('isEPFApplicableControl');
        this.isEPFApplicable = "yes";
        this.InputInfoForm.get('isEPFApplicableControl').setValue('yes');  
        isEPFApplicable.disable();
        this.setEPSApplicableValue();
      }
      if (this.optionToChooseNill == true) {
        //check PF gross salary
        if (this.grossPFSalary < 15000) {
          const isEPFApplicable = this.InputInfoForm.get('isEPFApplicableControl');
          this.isEPFApplicable = "yes";
          this.InputDetailsModel.presentEPFEPSRequestDTO.isEPFApplicable = "yes";
          this.InputInfoForm.get('isEPFApplicableControl').setValue('yes');  
          isEPFApplicable.disable();
          //this.enablePresentTabData();
          this.setEPSApplicableValue();
        }
        else {
          const isEPFApplicable = this.InputInfoForm.get('isEPFApplicableControl');
          isEPFApplicable.enable();
          this.isEPFApplicable = '';
          this.InputDetailsModel.presentEPFEPSRequestDTO.isEPFApplicable = null;
          this.InputInfoForm.controls['isEPFApplicableControl'].setValidators([Validators.required]);
          this.InputInfoForm.controls.isEPFApplicableControl.updateValueAndValidity();
          //this.disablePresentTabData();
        }
      }

      this.disableCertificatesNumber();
    }
  }

  haveYouContributedbefor1SepToggle(event) {

    if (event.currentTarget.defaultValue == "yes") {
      this.isContributedBefore1Sep2014 = "yes";
      this.InputDetailsModel.previousEPFEPSRequestDTO.isContributedBefore1Sep2014 = "yes";

      const isPartOfEPS = this.InputInfoForm.get('isPartOfEPSControl');
      isPartOfEPS.disable();
      this.isPartOfEPS = "yes";
      //this.InputDetailsModel.presentEPFEPSRequestDTO.isEPFApplicable = "yes";
      this.InputInfoForm.get('isPartOfEPSControl').setValue('yes');  

      this.setEPSApplicableValue();
    } else {
      this.isContributedBefore1Sep2014 = "no";
      this.InputDetailsModel.previousEPFEPSRequestDTO.isContributedBefore1Sep2014 = "no";

      const isPartOfEPS = this.InputInfoForm.get('isPartOfEPSControl');
      isPartOfEPS.enable();
      this.InputDetailsModel.previousEPFEPSRequestDTO.isPartOfEPS = 'no';
      this.InputInfoForm.get('isPartOfEPSControl').setValue('no');  
      this.isPartOfEPS = 'no';
    }
  }

  partOfEPSToggle(event) {

    if (event.currentTarget.defaultValue == "yes") {
      this.isPartOfEPS = "yes";
      this.InputDetailsModel.previousEPFEPSRequestDTO.isPartOfEPS = "yes";

      this.setEPSApplicableValue();
    } else {
      this.isPartOfEPS = "no";
      this.InputDetailsModel.previousEPFEPSRequestDTO.isPartOfEPS = "no";
      this.InputInfoForm.get('isPartOfEPSControl').setValue('no');  
      //check if gross salary
      this.setEPSApplicableValue();
    }
  }

  epfApplicableToggle(event) {

    if (event.currentTarget.defaultValue == "yes") {
      this.isEPFApplicable = "yes";
      this.InputDetailsModel.presentEPFEPSRequestDTO.isEPFApplicable = "yes";

      if (this.employeeAge < 58) {
        this.InputDetailsModel.presentEPFEPSRequestDTO.isEPSApplicable = "Yes";
       // this.InputInfoForm.get('isEPSApplicableControl').setValue('yes');  
        const isEPSApplicable = this.InputInfoForm.get('isEPSApplicableControl');
        isEPSApplicable.disable();
      }

      //flow to set EPS value
      this.setEPSApplicableValue();
    } else {
      this.isEPFApplicable = "no";
      this.InputDetailsModel.presentEPFEPSRequestDTO.isEPFApplicable = "no";

      this.InputDetailsModel.presentEPFEPSRequestDTO.isEPSApplicable = "No";
      const isEPSApplicable = this.InputInfoForm.get('isEPSApplicableControl');
      //this.InputInfoForm.get('isEPSApplicableControl').setValue('no');  
      isEPSApplicable.disable();

      this.disablePresentTabData();
    }
  }

  contributionTowardsEPSToggle(event) {

    if (event.currentTarget.defaultValue == "yes") {
      this.isEPSContributionTill60 = "yes";
      this.InputDetailsModel.presentEPFEPSRequestDTO.isEPSContributionTill60 = "yes";
      this.setEPSApplicableValue();

    } else {
      this.isEPSContributionTill60 = "no";
      this.InputDetailsModel.presentEPFEPSRequestDTO.isEPSContributionTill60 = "no";

      //set eps not applicable
      this.InputDetailsModel.presentEPFEPSRequestDTO.isEPSApplicable = "No";
     // this.InputInfoForm.get('isEPSApplicableControl').setValue('no');  
      const isEPSApplicable = this.InputInfoForm.get('isEPSApplicableControl');
      isEPSApplicable.disable();
    }
  }

  disabledVoluntaryDate() {
    this.InputDetailsModel.presentEPFEPSRequestDTO.voluntaryFromDate = null;
    const voluntaryFromDate = this.InputInfoForm.get('voluntaryFromDateControl');
    voluntaryFromDate.disable();

    this.InputDetailsModel.presentEPFEPSRequestDTO.voluntaryToDate = null;
    const voluntaryToDate = this.InputInfoForm.get('voluntaryToDateControl');
    voluntaryToDate.disable();
  }

  disabledsaContributionDate() {
    this.InputDetailsModel.superAnnuationRequestDTO.saContributionFromDate = null;
    const saContributionFromDate = this.InputInfoForm.get('saContributionFromDateControl');
    saContributionFromDate.disable();

    this.InputDetailsModel.superAnnuationRequestDTO.saContributionToDate = null;
    const saContributionToDate = this.InputInfoForm.get('saContributionToDateControl');
    saContributionToDate.disable();
  }

  percentOrAmount(event) {

    if (event.currentTarget.defaultValue == "percentOfNetPay") {
      this.percentOrAmountModel = "percentOfNetPay";
      this.InputDetailsModel.presentEPFEPSRequestDTO.voluntaryPFAmount = '';
      this.InputInfoForm.get('voluntaryPFAmountControl').setValue('');
      //disabled from date to date
      this.disabledVoluntaryDate();
    } else {
      this.percentOrAmountModel = "amount";
      this.InputDetailsModel.presentEPFEPSRequestDTO.voluntaryPFPercent = '';
      this.InputInfoForm.get('voluntaryPFPercentControl').setValue('');
      //disabled from date to date
      this.disabledVoluntaryDate();
    }
  }

  enableCertificatesNumber() {

    if (this.employeeAge >= 50) {
      const schemeCertificateNumber = this.InputInfoForm.get('schemeCertificateNumberControl');
      schemeCertificateNumber.enable();

      const authorityIssue = this.InputInfoForm.get('authorityIssueControl');
      authorityIssue.enable();
    }
    else {
      this.InputDetailsModel.previousEPFEPSRequestDTO.schemeCertificateNumber = null;
      const schemeCertificateNumber = this.InputInfoForm.get('schemeCertificateNumberControl');
      schemeCertificateNumber.disable();

      this.InputDetailsModel.previousEPFEPSRequestDTO.authorityIssuer = null;
      const authorityIssue = this.InputInfoForm.get('authorityIssueControl');
      authorityIssue.disable();
    }
  }

  disableCertificatesNumber() {
    this.InputDetailsModel.previousEPFEPSRequestDTO.schemeCertificateNumber = null;
    const schemeCertificateNumber = this.InputInfoForm.get('schemeCertificateNumberControl');
    schemeCertificateNumber.disable();

    this.InputDetailsModel.previousEPFEPSRequestDTO.authorityIssuer = null;
    const authorityIssue = this.InputInfoForm.get('authorityIssueControl');
    authorityIssue.disable();
  }


  clearPercentageValue(){
    const voluntaryPFPercent = this.InputInfoForm.get('voluntaryPFPercentControl').value;
    if(voluntaryPFPercent<0 || voluntaryPFPercent>100){
      this.InputInfoForm.get('voluntaryPFPercentControl').setValue('');   

        //this.sweetalertError('Severity Level should be up to 100%');
        this.CommonDataService.sweetalertError('Voluntary Provident Fund should be up to 100%');

      //clear dates validation
      this.InputInfoForm.get('voluntaryFromDateControl').clearValidators();
      this.InputInfoForm.controls.voluntaryFromDateControl.updateValueAndValidity();

      this.InputInfoForm.get('voluntaryToDateControl').clearValidators();
      this.InputInfoForm.controls.voluntaryToDateControl.updateValueAndValidity();

      this.disabledVoluntaryDate();
    }    
  }


  clearSAContributionRateValue(){
    const saContributionRateControl = this.InputInfoForm.get('saContributionRateControl').value;
    if(saContributionRateControl<0 || saContributionRateControl>this.saContributionRate){
      this.InputInfoForm.get('saContributionRateControl').setValue('');   

      this.CommonDataService.sweetalertError('Contribution rate should be up to 100%');

      //clear dates validation
      this.InputInfoForm.get('saContributionFromDateControl').clearValidators();
      this.InputInfoForm.controls.saContributionFromDateControl.updateValueAndValidity();

      this.InputInfoForm.get('saContributionToDateControl').clearValidators();
      this.InputInfoForm.controls.saContributionToDateControl.updateValueAndValidity();

      this.disabledsaContributionDate();
    } 
  }
}
