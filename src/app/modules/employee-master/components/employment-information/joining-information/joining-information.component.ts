import { Component, OnInit, OnDestroy, ViewEncapsulation, Input, Optional, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JoiningInformationModel } from './../../../dto-models/employment-forms-models/joining-information.model';
import { EmploymentInformationService } from './../../../employee-master-services/employment-information.service';
import { DatePipe } from '@angular/common';
import { EventEmitterService } from './../../../employee-master-services/event-emitter/event-emitter.service';
import { Subscription } from 'rxjs';
import { ConfirmationModalComponent } from './../../../shared modals/confirmation-modal/confirmation-modal.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-joining-information',
  templateUrl: './joining-information.component.html',
  styleUrls: ['./joining-information.component.scss']
})
export class JoiningInformationComponent implements OnInit {

  JoiningForm: FormGroup;
  probationPeriodDaysMonths: string;
  noticePeriodDaysMonths: string;
  JoiningInformationModel = new JoiningInformationModel('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '')
  monthsList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  employeeMasterId: number;
  companyListForJoining = 'Accenture,TCS,Amdocs,Cognizant,Infosys,WhiteHedge,CloudHedge,Zensar,Google,Straviso,Anar Solutions,Microsoft'.split(',');
  joiningInformationInitiateSubscription: Subscription;
  employementInfoId: any;
  probationMonthsDays: any = 'false';
  noticeMonthsDays: any = 'true';
  noticePeriodMonthModel: any;
  noticePeriodDaysModel: any;
  probationPeriodMonthModel: any;
  probationPeriodDaysModel: any;
  birthDateSubscription: Subscription;
  @Input() birthDate: any;
  confirmMsg: any;
  info: any;
  projectedRetirementDate: any;
  tomorrow = new Date();

  constructor(private formBuilder: FormBuilder,
    private EmploymentInformationService: EmploymentInformationService,
    public datepipe: DatePipe, private EventEmitterService: EventEmitterService,
    private matDialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,) {
    this.tomorrow.setDate(this.tomorrow.getDate());
    if (data) {
      this.confirmMsg = data.pageValue;
      this.info = data.info;
      this.projectedRetirementDate = data.projectedRetirementDate;
      this.employementInfoId = data.employementJoiningInfoId;
    }
  }

  ngOnInit(): void {
    if (!this.confirmMsg) {
      let dateOfBirth = new Date(this.birthDate);
      this.JoiningInformationModel.projectedRetirementDate = this.add_years(dateOfBirth, 58).toString();
    }
    this.JoiningForm = this.formBuilder.group({
      joiningDate: ['', Validators.required],
      originalHireDate: [''],
      joiningDateForGratuity: [''],
      companyName: [''],
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
      noticePeriod: ['']
    });

    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);
    this.getJoiningFormInformation();

    if (this.confirmMsg == 'viewJoining') {
      const temp1 = this.JoiningForm.get('joiningDate');
      temp1.disable();
      const temp2 = this.JoiningForm.get('originalHireDate');
      temp2.disable();
      const temp3 = this.JoiningForm.get('joiningDateForGratuity');
      temp3.disable();
      const temp4 = this.JoiningForm.get('companyName');
      temp4.disable();
      const temp5 = this.JoiningForm.get('probationPeriodMonth');
      temp5.disable();
      const temp6 = this.JoiningForm.get('probationPeriodDays');
      temp6.disable();
      const temp7 = this.JoiningForm.get('noticePeriodMonth');
      temp7.disable();
      const temp8 = this.JoiningForm.get('noticePeriodDays');
      temp8.disable();
      const temp9 = this.JoiningForm.get('expectedConfirmationDate');
      temp9.disable();
      const temp10 = this.JoiningForm.get('expectedRemark');
      temp10.disable();
      const temp11 = this.JoiningForm.get('confirmationDate');
      temp11.disable();
      const temp12 = this.JoiningForm.get('confirmationRemark');
      temp12.disable();
      const temp13 = this.JoiningForm.get('projectedRetirementDate');
      temp13.disable();
      const temp14 = this.JoiningForm.get('probationPeriod');
      temp14.disable();
      const temp15 = this.JoiningForm.get('noticePeriod');
      temp15.disable();
    }
  }
  // ngOnDestroy() {
  // }

  joiningFormSubmit(JoiningInformationModel) {

    JoiningInformationModel.employeeMasterId = this.employeeMasterId;
    if (this.probationMonthsDays == 'false') {
      JoiningInformationModel.isProbationInMonth = 1;
      JoiningInformationModel.isProbationInDays = 0;
      JoiningInformationModel.probationPeriodMonth = this.JoiningForm.value.probationPeriodMonth;
      JoiningInformationModel.probationPeriodDays = '';
    } else {
      JoiningInformationModel.isProbationInDays = 1;
      JoiningInformationModel.isProbationInMonth = 0;
      JoiningInformationModel.probationPeriodDays = this.JoiningForm.value.probationPeriodDays;
      JoiningInformationModel.probationPeriodMonth = '';
    }

    if (this.noticeMonthsDays == 'false') {
      JoiningInformationModel.isNoticePeriodInMonth = 1;
      JoiningInformationModel.isNoticePeriodInDays = 0;
      JoiningInformationModel.noticePeriodMonth = this.JoiningForm.value.noticePeriodMonth;
      JoiningInformationModel.noticePeriodDays = '';
    } else {
      JoiningInformationModel.isNoticePeriodInDays = 1;
      JoiningInformationModel.isNoticePeriodInMonth = 0;
      JoiningInformationModel.noticePeriodDays = this.JoiningForm.value.noticePeriodDays;
      JoiningInformationModel.noticePeriodMonth = '';
    }

    JoiningInformationModel.joiningDate = this.datepipe.transform(JoiningInformationModel.joiningDate, "dd-MMM-yyyy");
    JoiningInformationModel.originalHireDate = this.datepipe.transform(JoiningInformationModel.originalHireDate, "dd-MMM-yyyy");
    JoiningInformationModel.joiningDateForGratuity = this.datepipe.transform(JoiningInformationModel.joiningDateForGratuity, "dd-MMM-yyyy");
    JoiningInformationModel.expectedConfirmationDate = this.datepipe.transform(JoiningInformationModel.expectedConfirmationDate, "dd-MMM-yyyy");
    JoiningInformationModel.confirmationDate = this.datepipe.transform(JoiningInformationModel.confirmationDate, "dd-MMM-yyyy");
    JoiningInformationModel.projectedRetirementDate = this.datepipe.transform(JoiningInformationModel.projectedRetirementDate, "dd-MMM-yyyy");


    if (this.employementInfoId && this.employementInfoId > 0) {
      this.EmploymentInformationService.updateJoiningInformation(JoiningInformationModel).subscribe(res => {

        // this.notifyService.showSuccess(res.status.messsage, "Success..!!");
        this.JoiningInformationModel = res.data.results[0];
        this.employementInfoId = this.JoiningInformationModel.employementInfoId;
        this.EventEmitterService.getcloseCurrentForm();
        if (this.confirmMsg) {
          this.onNoClick();
        }
        this.employementInfoId = res.data.results[0].employementInfoId;
        localStorage.setItem('employementJoiningInfoId', this.employementInfoId)
      })
    } else {
      this.EmploymentInformationService.postJoiningInformation(JoiningInformationModel).subscribe(res => {

        // this.notifyService.showSuccess(res.status.messsage, "Success..!!");
        this.JoiningInformationModel = res.data.results[0];
        this.employementInfoId = this.JoiningInformationModel.employementInfoId;
        this.EventEmitterService.getcloseCurrentForm();
        if (this.confirmMsg) {
          this.onNoClick();
        }
        this.employementInfoId = res.data.results[0].employementInfoId;
        localStorage.setItem('employementJoiningInfoId', this.employementInfoId)
      })
    }
  }

  getJoiningFormInformation() {

    this.EmploymentInformationService.getJoiningInformation(this.employeeMasterId).subscribe(res => {

      this.employementInfoId = res.data.results[0].employementInfoId;
      localStorage.setItem('employementJoiningInfoId', this.employementInfoId)
      if (res.data.results[0]) {
        this.JoiningInformationModel = res.data.results[0];
        if (res.data.results.length > 0) {
          if (this.JoiningInformationModel.isNoticePeriodInMonth == 1) {
            this.noticeMonthsDays = 'false';
            this.noticePeriodMonthModel = res.data.results[0].noticePeriodMonth;
          } else {
            this.noticeMonthsDays = 'true';
            this.noticePeriodDaysModel = res.data.results[0].noticePeriodDays;
          }
          if (this.JoiningInformationModel.isProbationInMonth == 1) {
            this.probationMonthsDays = 'false';
            this.probationPeriodMonthModel = res.data.results[0].probationPeriodMonth;
          } else {
            this.probationMonthsDays = 'true';
            this.probationPeriodDaysModel = res.data.results[0].probationPeriodDays;
          }
        }
      }

      if (!this.JoiningInformationModel.projectedRetirementDate) {

        let dateOfBirth = new Date(this.birthDate);
        this.JoiningInformationModel.projectedRetirementDate = this.add_years(dateOfBirth, 58).toString();
      }
      if (this.confirmMsg) {
        this.JoiningInformationModel.projectedRetirementDate = this.projectedRetirementDate;
      }
    })
  }

  probationPeriod(event) {
    if (event.value == "true") {
      this.probationMonthsDays = "true";
      this.probationPeriodDaysModel = '';
    } else {
      this.probationMonthsDays = "false";
      this.probationPeriodMonthModel = '';
    }
  }
  noticePeriod(event) {
    if (event.value == "true") {
      this.noticeMonthsDays = "true";
      this.noticePeriodMonthModel = '';
    } else {
      this.noticeMonthsDays = "false";
      this.noticePeriodDaysModel = '';
    }
  }

  assignJoiningDateTo(joiningDate) {
    localStorage.setItem('joiningDate', joiningDate);
    this.JoiningInformationModel.originalHireDate = joiningDate;
    this.JoiningInformationModel.joiningDateForGratuity = joiningDate;
  }
  resetForm() {
    this.JoiningForm.reset();
  }
  add_years(dt, n) {
    return new Date(dt.setFullYear(dt.getFullYear() + n));
  }
  calculateExpectedConfirmationDateFromMonths(probationPeriodMonthModel, rejoiningDate) {

    localStorage.setItem('rejoiningDate', rejoiningDate);
    let localrejoiningDate = localStorage.getItem('rejoiningDate');
    let expectedConfirmationDate = new Date(localrejoiningDate);
    let assignDate;
    expectedConfirmationDate.setMonth(expectedConfirmationDate.getMonth() + probationPeriodMonthModel); // for Months
    assignDate = expectedConfirmationDate.toISOString().slice(0, 10);
    assignDate = this.datepipe.transform(expectedConfirmationDate, 'dd-MMM-yyyy');
    this.JoiningInformationModel.expectedConfirmationDate = assignDate;
  }
  calculateExpectedConfirmationDateFromDays(probationPeriodDaysModel, localrejoiningDate) {

    localStorage.setItem('localrejoiningDate', localrejoiningDate);
    let locallocalrejoiningDate = localStorage.getItem('localrejoiningDate');
    let expectedConfirmationDate = new Date(localrejoiningDate);

    var probationDays = Number(probationPeriodDaysModel);
    expectedConfirmationDate.setDate(expectedConfirmationDate.getDate() + probationDays);  // for Days

    this.JoiningInformationModel.expectedConfirmationDate = expectedConfirmationDate;
  }
  setNoticePeriodMonthModel(noticePeriodMonthModel) {
    localStorage.setItem('noticePeriodMonthModel', noticePeriodMonthModel);
  }
  setNoticePeriodDaysModel(noticePeriodDaysModel) {
    localStorage.setItem('noticePeriodDaysModel', noticePeriodDaysModel);
  }
  confirmationPopup() {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '664px', height: '241px',
      data: { pageValue: 'JoiningForm', info: 'Do you really want to extend the probation period?' }
    });
  }

  disableExpectedConfirmationDate() {
    if (this.JoiningInformationModel.confirmationDate) {
      const projectedRetirementDate = this.JoiningForm.get('expectedConfirmationDate')
      projectedRetirementDate.disable();
    }
  }
  onNoClick(): void {
    this.matDialog.closeAll();
  }
}
