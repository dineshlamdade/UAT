import { Component, OnInit, OnDestroy, ViewEncapsulation, Input, Optional, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReJoiningInformationModel } from './../../../dto-models/employment-forms-models/re-Joining-information.model';
import { EmploymentInformationService } from './../../../employee-master-services/employment-information.service';
import { DatePipe } from '@angular/common';
import { EventEmitterService } from './../../../employee-master-services/event-emitter/event-emitter.service';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { JoiningInformationComponent } from '../joining-information/joining-information.component';
import { SharedInformationService } from '../../../employee-master-services/shared-service/shared-information.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-re-joining-information',
  templateUrl: './re-joining-information.component.html',
  styleUrls: ['./re-joining-information.component.scss']
})
export class ReJoiningInformationComponent implements OnInit {

  ReJoiningForm: FormGroup;
  probationDaysMonths: any;
  noticeDaysMonths: any;
  ReJoiningInformationModel = new ReJoiningInformationModel('','', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
  monthsList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  employeeMasterId: number;
 // companyListForJoining = 'Accenture,TCS,Amdocs,Cognizant,Infosys,WhiteHedge,CloudHedge,Zensar,Google,Straviso,Anar Solutions,Microsoft'.split(',');
  RejoiningInformationInitiateSubscription: Subscription;
  RejoiningDataSubscription: Subscription;
  employementInfoId: any;
  probationMonthsDays: any = 'false';
  noticeMonthsDays: any =  'true';
  noticePeriodMonthModel: any;
  noticePeriodDaysModel: any;
  probationPeriodMonthModel: any;
  probationPeriodDaysModel: any;
  continuationServiceBoolean: any = 'No';
  employeeCode: any;
  data: any[];
  PreviousStintInfoData: Array<any> = [];
  @Input() birthDate: any;
  confirmMsg: any;
  info: any;
  // projectedRetirementDate: any;
  tomorrow = new Date();
  companyListForJoining: Array<any> = [];
  viewReJoining: boolean = false;
  public today = new Date();

  constructor(private formBuilder: FormBuilder,
    private EmploymentInformationService: EmploymentInformationService,
    public datepipe: DatePipe, private EventEmitterService: EventEmitterService,
    private matDialog: MatDialog, private router: Router,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public dialog: MatDialog,
    private CommonDataService: SharedInformationService) {
      this.tomorrow.setDate(this.tomorrow.getDate());

     }

  ngOnInit(): void {
    
    // if(!this.confirmMsg){
    //   let dateOfBirth = new Date(this.birthDate);
    //   this.ReJoiningInformationModel.projectedRetirementDate = this.add_years(dateOfBirth, 58).toString();
    //   this.ReJoiningInformationModel.rejoiningDate = '';
    // }
    this.ReJoiningForm = this.formBuilder.group({
      rejoiningDate: ['', Validators.required],
      originalHireDate: [''],
      joiningDateForGratuity: [''],
      companyName: ['', Validators.required],
      probationPeriodMonth: [''],
      probationPeriodDays: [''],
      noticePeriodMonth: [''],
      noticePeriodDays: [''],
      expectedConfirmationDate: [''],
      expectedRemark: [''],
      confirmationDate: [''],
      confirmationRemark: [''],
      projectedRetirementDate: [''],
      probationPeriod: [''],
      noticePeriod: [''],
      ContinuationService: ['No']
    });

    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);
    debugger
    if(!this.employeeMasterId || this.employeeMasterId == 0){
      this.router.navigate(['/employee-master/personal-information']);
    }
    // const empInfoId = localStorage.getItem('RejoiningEmployementInfoId')
    // this.employementInfoId = Number(empInfoId);
    this.probationPeriodMonthModel = '';
    this.noticePeriodMonthModel = '';
    //get group companies infomartion
    this.EmploymentInformationService.getCompanyInformation().subscribe(res => {
      let list=res.data.results;
      list.forEach(element => {
        this.companyListForJoining.push(element.companyName);
      });
      if(this.companyListForJoining.length == 1){
        this.ReJoiningInformationModel.companyName = this.companyListForJoining[0];
      }
    })

    this.EmploymentInformationService.getPreviousStintInfo(this.employeeMasterId).subscribe(res => {
      debugger
      this.PreviousStintInfoData = res.data.results[0];
    })
    
    this.RejoiningDataSubscription = this.EventEmitterService.setReJoiningData().subscribe(res => {
      
      if (res) {
        this.getReJoiningFormInformation();
        if(res.viewReJoining == true){
          this.viewReJoining = res.viewReJoining;
          const temp1 = this.ReJoiningForm.get('rejoiningDate');
          temp1.disable();
          const temp2 = this.ReJoiningForm.get('originalHireDate');
          temp2.disable();
          const temp3 = this.ReJoiningForm.get('joiningDateForGratuity');
          temp3.disable();
          const temp4 = this.ReJoiningForm.get('companyName');
          temp4.disable();
          const temp5 = this.ReJoiningForm.get('probationPeriodMonth');
          temp5.disable();
          const temp6 = this.ReJoiningForm.get('probationPeriodDays');
          temp6.disable();
          const temp7 = this.ReJoiningForm.get('noticePeriodMonth');
          temp7.disable();
          const temp8 = this.ReJoiningForm.get('noticePeriodDays');
          temp8.disable();
          const temp9 = this.ReJoiningForm.get('expectedConfirmationDate');
          temp9.disable();
          const temp10 = this.ReJoiningForm.get('expectedRemark');
          temp10.disable();
          const temp11 = this.ReJoiningForm.get('confirmationDate');
          temp11.disable();
          const temp12 = this.ReJoiningForm.get('confirmationRemark');
          temp12.disable();
          // const temp13 = this.ReJoiningForm.get('projectedRetirementDate');
          // temp13.disable();
          const temp14 = this.ReJoiningForm.get('probationPeriod');
          temp14.disable();
          const temp15 = this.ReJoiningForm.get('noticePeriod');
          temp15.disable();
          const temp16 = this.ReJoiningForm.get('ContinuationService');
          temp16.disable();
        }
      }
    })
    //checking demo
    // this.getReJoiningFormInformation();
  
  }

  RejoiningFormSubmit(ReJoiningInformationModel) {
    debugger
    let Rejoining: any;
    Rejoining = this.ReJoiningInformationModel;
    ReJoiningInformationModel.employeeMasterId = this.employeeMasterId;
    if (this.probationMonthsDays == 'false') {
      ReJoiningInformationModel.isProbationInMonth = 1;
      ReJoiningInformationModel.isProbationInDays = 0;
      ReJoiningInformationModel.probationPeriodMonth = this.ReJoiningForm.value.probationPeriodMonth;
      ReJoiningInformationModel.probationPeriodDays = '';
    } else {
      ReJoiningInformationModel.isProbationInDays = 1;
      ReJoiningInformationModel.isProbationInMonth = 0;
      ReJoiningInformationModel.probationPeriodDays = this.ReJoiningForm.value.probationPeriodDays;
      ReJoiningInformationModel.probationPeriodMonth = '';
    }

    if (this.noticeMonthsDays == 'false') {
      ReJoiningInformationModel.isNoticePeriodInMonth = 1;
      ReJoiningInformationModel.isNoticePeriodInDays = 0;
      ReJoiningInformationModel.noticePeriodMonth = this.ReJoiningForm.value.noticePeriodMonth;
      ReJoiningInformationModel.noticePeriodDays = '';
    } else {
      ReJoiningInformationModel.isNoticePeriodInDays = 1;
      ReJoiningInformationModel.isNoticePeriodInMonth = 0;
      ReJoiningInformationModel.noticePeriodDays = this.ReJoiningForm.value.noticePeriodDays;
      ReJoiningInformationModel.noticePeriodMonth = '';
    }
    ReJoiningInformationModel.rejoiningDate = this.datepipe.transform(ReJoiningInformationModel.rejoiningDate, "dd-MMM-yyyy");
    ReJoiningInformationModel.originalHireDate = this.datepipe.transform(ReJoiningInformationModel.originalHireDate, "dd-MMM-yyyy");
    ReJoiningInformationModel.joiningDateForGratuity = this.datepipe.transform(ReJoiningInformationModel.joiningDateForGratuity, "dd-MMM-yyyy");
    ReJoiningInformationModel.expectedConfirmationDate = this.datepipe.transform(ReJoiningInformationModel.expectedConfirmationDate, "dd-MMM-yyyy");
    ReJoiningInformationModel.confirmationDate = this.datepipe.transform(ReJoiningInformationModel.confirmationDate, "dd-MMM-yyyy");  
    // ReJoiningInformationModel.projectedRetirementDate = this.datepipe.transform(ReJoiningInformationModel.projectedRetirementDate, "dd-MMM-yyyy");

    
    if (this.employementInfoId && this.employementInfoId > 1) {
      ReJoiningInformationModel.employementInfoId =  this.employementInfoId;
      this.EmploymentInformationService.updateReJoiningInformation(ReJoiningInformationModel).subscribe(res => {

        // this.notifyService.showSuccess(res.status.messsage, "Success..!!");
        this.ReJoiningInformationModel = res.data.results[0];
        localStorage.setItem('RejoiningEmployementInfoId', this.ReJoiningInformationModel.employementInfoId);
        this.EventEmitterService.getcloseCurrentForm();
        this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
        if(this.confirmMsg){
          this.onNoClick();
        }
        localStorage.removeItem('rejoinee');
        this.router.navigate(['/employee-master/employment-information/employment-summary']);
      }, (error: any) => {
        this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
      })
    } else {
      this.EmploymentInformationService.postReJoiningInformation(ReJoiningInformationModel).subscribe(res => {

        // this.notifyService.showSuccess(res.status.messsage, "Success..!!");
        this.ReJoiningInformationModel = res.data.results[0];
        this.employementInfoId = this.ReJoiningInformationModel.employementInfoId;
        localStorage.setItem('RejoiningEmployementInfoId', this.ReJoiningInformationModel.employementInfoId);
        this.EventEmitterService.getcloseCurrentForm();
        this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
        if(this.confirmMsg){
          this.onNoClick();
        }
        localStorage.removeItem('rejoinee');
        this.router.navigate(['/employee-master/employment-information/employment-summary']);
      }, (error: any) => {
        this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
      })
    }
  }

  getReJoiningFormInformation() {
    //for testing
    // this.employementInfoId=4;
    const employementInfoId = localStorage.getItem('RejoiningEmployementInfoId')
    this.employementInfoId = Number(employementInfoId);
    this.EmploymentInformationService.getReJoiningInformation(this.employementInfoId).subscribe(res => {
      debugger
      if (res.data.results.length > 0) {
        this.ReJoiningInformationModel = res.data.results[0];
        debugger
        localStorage.setItem('RejoiningEmployementInfoId', this.ReJoiningInformationModel.employementInfoId)
        if (this.ReJoiningInformationModel.isNoticePeriodInMonth == 1) {
          this.noticeMonthsDays = 'false';
          this.ReJoiningForm.get('noticePeriod').setValue('false');
          this.noticePeriodMonthModel = res.data.results[0].noticePeriodMonth;
        } else {
          this.noticeMonthsDays = 'true';
          this.ReJoiningForm.get('noticePeriod').setValue('true');
          this.noticePeriodDaysModel = res.data.results[0].noticePeriodDays;
        }
        if (this.ReJoiningInformationModel.isProbationInMonth == 1) {
          this.probationMonthsDays = 'false';
          this.ReJoiningForm.get('probationPeriod').setValue('false');
          this.probationPeriodMonthModel = res.data.results[0].probationPeriodMonth;
        } else {
          this.probationMonthsDays = 'true';
          this.ReJoiningForm.get('probationPeriod').setValue('true');
          this.probationPeriodDaysModel = res.data.results[0].probationPeriodDays;
        }
        debugger
        if(res.data.results[0].isContinuationOfService==1){
          this.ReJoiningForm.get('ContinuationService').setValue('Yes');
        }
        else{
          this.ReJoiningForm.get('ContinuationService').setValue('No');
        }
        
      }
      
      // if(!this.ReJoiningInformationModel.projectedRetirementDate){
      //   let dateOfBirth = new Date(this.birthDate);
      //   this.ReJoiningInformationModel.projectedRetirementDate = this.add_years(dateOfBirth, 58).toString();
      // }
      // if(this.confirmMsg){
      //   this.ReJoiningInformationModel.projectedRetirementDate = this.projectedRetirementDate;
      // }
    })
    this.ReJoiningForm.markAsUntouched();
  }

  probationPeriod(event) {
    const probationPeriod = this.ReJoiningForm.get('probationPeriod');
    if (probationPeriod.value == "true") {
      this.probationMonthsDays = "true";
      this.probationPeriodDaysModel = '';
    } else {
      this.probationMonthsDays = "false";
      this.probationPeriodMonthModel = '';
    }
  }
  noticePeriod(event) {
    const noticePeriod = this.ReJoiningForm.get('noticePeriod');
    if (noticePeriod.value == "true") {
      this.noticeMonthsDays = "true";
      this.noticePeriodMonthModel = '';
    } else {
      this.noticeMonthsDays = "false";
      this.noticePeriodDaysModel = '';
    }
  }
  assignReJoiningDateTo(ReJoiningDate) {
    localStorage.setItem('rejoiningDate', ReJoiningDate);
    this.ReJoiningInformationModel.originalHireDate = ReJoiningDate;
    this.ReJoiningInformationModel.joiningDateForGratuity = ReJoiningDate;
  }
  selectionContinuationService(event) {
    this.continuationServiceBoolean = event.value;
    
    if(this.PreviousStintInfoData.length>0){
      if (this.continuationServiceBoolean == 'Yes') {
        this.ReJoiningInformationModel.originalHireDate = this.PreviousStintInfoData[0].originalHireDate;
        this.ReJoiningInformationModel.joiningDateForGratuity = this.PreviousStintInfoData[0].originalHireDate;
      } else {
        this.ReJoiningInformationModel.originalHireDate = this.ReJoiningInformationModel.rejoiningDate;
        this.ReJoiningInformationModel.joiningDateForGratuity = this.ReJoiningInformationModel.rejoiningDate;
      }
    }
  }
  resetForm() {
    this.ReJoiningForm.reset();
  }
  // searchEmployeeCode(value) {
  //   setTimeout(() => {
  //     this.EmploymentInformationService.getPreviousStintInfoBySearch(value).subscribe(res => {
  //       this.PreviousStintInfoData = res.data.results[0];
        
  //       if (this.continuationServiceBoolean == 'Yes' && this.PreviousStintInfoData.length>0) {
  //         this.ReJoiningInformationModel.originalHireDate = res.data.results[0][0].originalHireDate;
  //         this.ReJoiningInformationModel.joiningDateForGratuity = res.data.results[0][0].originalHireDate;
  //       }
  //       this.pushToGrid();
  //     })
  //   }, 1000)
  // }

  pushToGrid() {

    let data = [];

    for (var val of this.PreviousStintInfoData) {
      data.push({
        employeeCode: val.employeeCode,
        company: val.company,
        joiningDate: val.joiningDate,
        lastWorkingDate: val.lastWorkingDate,
        reasonForLeaving: val.reasonForLeaving,
      });
    }
    this.data = data;
  }
  add_years(dt, n) {
    return new Date(dt.setFullYear(dt.getFullYear() + n));
  }

  calculateExpectedConfirmationDateFromMonths(probationPeriodMonthModel, rejoiningDate) {
    
    probationPeriodMonthModel = parseInt(probationPeriodMonthModel);
    localStorage.setItem('rejoiningDate', rejoiningDate);
    let localrejoiningDate = localStorage.getItem('rejoiningDate');
    let expectedConfirmationDate = new Date(localrejoiningDate);
    let assignDate;
    expectedConfirmationDate.setMonth(expectedConfirmationDate.getMonth() + probationPeriodMonthModel); // for Months
    assignDate = expectedConfirmationDate.toISOString().slice(0, 10);
    assignDate = this.datepipe.transform(expectedConfirmationDate, 'dd-MMM-yyyy');
    this.ReJoiningInformationModel.expectedConfirmationDate = assignDate;
  }
  calculateExpectedConfirmationDateFromDays(probationPeriodDaysModel, rejoiningDate) {
    
    probationPeriodDaysModel = parseInt(probationPeriodDaysModel);
    localStorage.setItem('rejoiningDate', rejoiningDate);
    let localrejoiningDate = localStorage.getItem('rejoiningDate');
    let expectedConfirmationDate = new Date(localrejoiningDate);

    var probationDays = Number(probationPeriodDaysModel);
    expectedConfirmationDate.setDate(expectedConfirmationDate.getDate() + probationDays);  // for Days

    this.ReJoiningInformationModel.expectedConfirmationDate = expectedConfirmationDate;
  }

  disableExpectedConfirmationDate(){
    // if(this.ReJoiningInformationModel.confirmationDate){
    //   const projectedRetirementDate = this.ReJoiningForm.get('expectedConfirmationDate')
    //   projectedRetirementDate.disable();
    // }
  }
  onNoClick(): void {
    this.matDialog.closeAll();
  }
}
