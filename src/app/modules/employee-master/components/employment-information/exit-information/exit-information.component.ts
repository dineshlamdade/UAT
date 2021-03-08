import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit, Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ExitInformationModel } from './../employment-forms-models/exit-information.model';
import { EmploymentInformationService } from './../employment-information.service'
import { EventEmitterService } from './../../../employee-master-services/event-emitter/event-emitter.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SharedInformationService } from '../../../employee-master-services/shared-service/shared-information.service';




@Component({
  selector: 'app-exit-information',
  templateUrl: './exit-information.component.html',
  styleUrls: ['./exit-information.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExitInformationComponent implements OnInit {
  ExitForm: FormGroup;
  ExitInformation = new ExitInformationModel('', '', '', '', '', '', '', '');
  employeeMasterId: number;
  employeeExitInfoId: any;
  reasonForLeavingList = 'Personal reason,Family reason,Persue new skills,Health issue'.split(',');
  birthDate: any;
  viewExit: boolean = false;
  editExit: boolean = false;
  exitSubscription: Subscription;
  JoiningDate: any;
  @Input() data: any;
  public today = new Date();



  constructor(private formBuilder: FormBuilder, public datepipe: DatePipe,
    private EmploymentInformationService: EmploymentInformationService,
    private EventEmitterService: EventEmitterService,
    private router: Router, private CommonDataService: SharedInformationService) { }

  ngOnInit(): void {
    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);

    const JoiningDate = localStorage.getItem('joiningDate');
    this.JoiningDate = new Date(JoiningDate)

    this.ExitForm = this.formBuilder.group({
      resignationDate: [''],
      expectedLeavingDate: [''],
      lastWorkingDate: [''],
      reasonForLeaving: [''],
      Exitremark: [''],
      projectedRetirementDate: ['']
    });

    const birthDate = localStorage.getItem('birthDate')
    this.birthDate = new Date(birthDate);

    this.ExitInformation.retirementDate = this.add_years(this.birthDate, 58).toString();

    this.ExitInformation.retirementDate = this.datepipe.transform(this.ExitInformation.retirementDate, "dd-MMM-yyyy");

    this.EmploymentInformationService.getNumber().subscribe(number => {

      this.employeeExitInfoId = number.text;
      this.getExitInformationData(this.employeeExitInfoId);
    })
    //  this.getExitInformationData(this.employeeExitInfoId);

    this.exitSubscription = this.EventEmitterService.setExitData().subscribe(res => {

      if (res) {
        this.employeeExitInfoId = res.exitId
        this.editExit = res.editExit;
        this.viewExit = res.viewExit;
        this.getExitInformationData(this.employeeExitInfoId);


        if (this.viewExit == true) {
          const resignationDate = this.ExitForm.get('resignationDate');
          resignationDate.disable();
          const expectedLeavingDate = this.ExitForm.get('expectedLeavingDate');
          expectedLeavingDate.disable();
          const lastWorkingDate = this.ExitForm.get('lastWorkingDate');
          lastWorkingDate.disable();

          const reasonForLeaving = this.ExitForm.get('reasonForLeaving');
          reasonForLeaving.disable();
          const Exitremark = this.ExitForm.get('Exitremark');
          Exitremark.disable();
          const projectedRetirementDate = this.ExitForm.get('projectedRetirementDate');
          projectedRetirementDate.disable();
        }
      }
    })
  }

  add_years(dt, n) {
    return new Date(dt.setFullYear(dt.getFullYear() + n));
  }


  ExitFormSubmit(ExitInformation) {
    // if (ExitInformation.employmentStatusBoolean) {
    //   this.employmentStatusBoolean = ExitInformation.employmentStatusBoolean
    // }


    ExitInformation.resignationDate = this.datepipe.transform(ExitInformation.resignationDate, "dd-MMM-yyyy");
    ExitInformation.expectedLeavingDate = this.datepipe.transform(ExitInformation.expectedLeavingDate, "dd-MMM-yyyy");
    ExitInformation.lastWorkingDate = this.datepipe.transform(ExitInformation.lastWorkingDate, "dd-MMM-yyyy");
    ExitInformation.retirementDate = this.datepipe.transform(ExitInformation.retirementDate, "dd-MMM-yyyy");
    ExitInformation.employeeMasterId = this.employeeMasterId;
    // if (this.employeeExitInfoId) {
    // this.EmploymentInformationService.putExitForm(ExitInformation, this.employeeExitInfoId).subscribe(res => {
    //   this.notifyService.showSuccess(res.status.messsage, "Success..!!");
    //   // this.ExitInformation = res.data.results[0];

    //   this.employeeExitInfoId = res.data.results[0].employeeExitInfoId;
    //   // localStorage.setItem('employeeExitInfoId', this.employeeExitInfoId);

    //   if (res.data.results[0]) {
    //     if (res.data.results[0].employeeStatus == 1) {
    //       this.employmentStatusBoolean = 'Active';
    //     } else {
    //       this.employmentStatusBoolean = 'InActive';
    //     }
    //   }
    //   this.selectJoining = '';
    //   this.selectReJoining = '';
    //   this.selectTransferTo = '';
    //   this.selectExit = '';
    //   this.getSummaryEmploymentInfo();
    //   this.TransactionHistorySummary();
    //   this.ExitForm.reset();
    //   this.employmentStatusBoolean = 'Active';
    //   this.dialog.closeAll();
    // })
    // } else {
    if (this.employeeExitInfoId) {
      this.putExitSubmit(ExitInformation);
    } else {
      this.EmploymentInformationService.postExitForm(ExitInformation).subscribe(res => {
        // this.notifyService.showSuccess(res.status.messsage, "Success..!!");
        // this.ExitInformation = res.data.results[0];

        this.employeeExitInfoId = res.data.results[0].employeeExitInfoId;
        localStorage.setItem('employeeExitInfoId', this.employeeExitInfoId);
        this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
        this.ExitForm.reset();
        this.EventEmitterService.getEmpSummaryInitiate();
        this.router.navigate(['/employee-master/employment-information/employment-summary']);
        // this.EventEmitterService.getRejoineeStatusCode(true);
      }, (error: any) => {
        this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
      })
    }
    // }
  }

  putExitSubmit(ExitInformation) {
    // if (ExitInformation.employmentStatusBoolean) {
    //   this.employmentStatusBoolean = ExitInformation.employmentStatusBoolean
    // }

    ExitInformation.resignationDate = this.datepipe.transform(ExitInformation.resignationDate, "dd-MMM-yyyy");
    ExitInformation.expectedLeavingDate = this.datepipe.transform(ExitInformation.expectedLeavingDate, "dd-MMM-yyyy");
    ExitInformation.lastWorkingDate = this.datepipe.transform(ExitInformation.lastWorkingDate, "dd-MMM-yyyy");
    ExitInformation.retirementDate = this.datepipe.transform(ExitInformation.retirementDate, "dd-MMM-yyyy");
    ExitInformation.employeeMasterId = this.employeeMasterId;

    this.EmploymentInformationService.putExitForm(ExitInformation, ExitInformation.employeeExitInfoId).subscribe(res => {
      // this.notifyService.showSuccess(res.status.messsage, "Success..!!");
      // this.ExitInformation = res.data.results[0];

      this.employeeExitInfoId = res.data.results[0].employeeExitInfoId;
      // localStorage.setItem('employeeExitInfoId', this.employeeExitInfoId);
      this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
      this.ExitForm.reset();
      this.EventEmitterService.getEmpSummaryInitiate();
      // this.EventEmitterService.getRejoineeStatusCode(true);
      this.router.navigate(['/employee-master/employment-information/employment-summary']);
    }, (error: any) => {
      this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
    })
  }

  getExitInformationData(employeeExitInfoId) {

    this.EmploymentInformationService.getExitInformation(employeeExitInfoId).subscribe(res => {


      if (res.data.results[0]) {
        this.ExitInformation = res.data.results[0];

        if (res.data.results[0].retirementDate) {

          this.ExitInformation.retirementDate = res.data.results[0].retirementDate;
        }
        else {
          this.ExitInformation.retirementDate = this.add_years(this.birthDate, 58);
          // this.ExitForm.get('projectedRetirementDate').setValue(this.ExitInformation.projectedRetirementDate);
        }
      }

    }, (error: any) => {
      this.ExitInformation.retirementDate = this.add_years(this.birthDate, 58);
    })
    this.ExitForm.markAsUntouched();
  }

  resetForm() {
    this.ExitForm.reset();
  }
  cancel() {
    this.EventEmitterService.getEmpSummaryInitiate();
  }

  calculateExpectedLeavingDateFromMonths(resignationDate) {
    
    if (resignationDate) {
      let noticePeriodDaysModel = Number(localStorage.getItem('noticePeriodDaysModel'));
      let noticePeriodMonthModel = Number(localStorage.getItem('noticePeriodMonthModel'));

      if (noticePeriodDaysModel) {
        let noticePeriodDaysModel = Number(localStorage.getItem('noticePeriodDaysModel'));
        resignationDate.setDate(resignationDate.getDate() + noticePeriodDaysModel);  // for Days

        this.ExitInformation.expectedLeavingDate = resignationDate;
      }

      if (noticePeriodMonthModel) {
        let expectedLeavingDate: any;

        resignationDate.setMonth(resignationDate.getMonth() + noticePeriodMonthModel); // for Months
        expectedLeavingDate = resignationDate.toISOString().slice(0, 10);
        expectedLeavingDate = this.datepipe.transform(expectedLeavingDate, 'dd-MMM-yyyy');
        this.ExitInformation.expectedLeavingDate = expectedLeavingDate;
      }
    }
  }
}
