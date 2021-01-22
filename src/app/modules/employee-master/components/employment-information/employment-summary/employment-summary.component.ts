import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmploymentInformationService } from './../../../employee-master-services/employment-information.service';
import { EventEmitterService } from './../../../employee-master-services/event-emitter/event-emitter.service';



@Component({
  selector: 'app-employment-summary',
  templateUrl: './employment-summary.component.html',
  styleUrls: ['./employment-summary.component.scss']
})
export class EmploymentSummaryComponent implements OnInit {
  employeeMasterId: any;
  EmploymentInformationSumarry: Array<any> = [];
  TransactionHistory: Array<any> = [];
  EmploymentInformationSumarryData: any[];
  TransactionHistoryData: any[];
  employementJoiningInfoId: any;
  employementReJoiningInfoId: any;
  summarySubscription: Subscription;
  employeeTransferId: any;
  employeeExitInfoId: any;

  ReJoiningTabBoolean: boolean = false;
  JoiningTabBoolean: boolean = true;

  constructor(private EmploymentInformationService: EmploymentInformationService, private router: Router,
    private EventEmitterService: EventEmitterService) {
    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);

    this.getSummaryEmploymentInfo();
    this.TransactionHistorySummary();
  }

  ngOnInit(): void {
    
    let employementJoiningInfoId = Number(localStorage.getItem('employementJoiningInfoId'));
    this.employementJoiningInfoId = employementJoiningInfoId;
    if (employementJoiningInfoId > 0) {
      this.employementJoiningInfoId = true;
    }
    if (employementJoiningInfoId == 0 || !employementJoiningInfoId) {
      this.employementJoiningInfoId = false;
    }

    let employementReJoiningInfoId = Number(localStorage.getItem('RejoiningEmployementInfoId'));
    if (employementReJoiningInfoId > 0) {
      this.employementReJoiningInfoId = true;
    } else {
      this.employementReJoiningInfoId = false;
    }

    // this.summarySubscription = this.EventEmitterService.setNavigateToEmploymentSummary().subscribe(res => {
    //   debugger
    //   const empId = localStorage.getItem('employeeMasterId')
    //   this.employeeMasterId = Number(empId);

    //   this.getSummaryEmploymentInfo();
    //   this.TransactionHistorySummary();
    // })
  }

  getSummaryEmploymentInfo() {

    this.EmploymentInformationService.getEmploymentInformationGridSummary(this.employeeMasterId).subscribe(res => {
      
      this.EmploymentInformationSumarry = res.data.results;

      // res.data.results.forEach(element => {
      //   let obj = {

      //     // 'Employement Info Id': res.data.results[0].employementInfoId,
      //     // 'EmployeeMaster Id': res.data.results[0].employeeMasterId,
      //     'CompanyName': element.companyName,
      //     'joiningDate': element.joiningDate,
      //     'rejoinee': element.rejoinee,
      //     'originalHireDate': element.originalHireDate,
      //     'employmentAge': element.employmentAge,

      //     'serviceAge': element.serviceAge,
      //     'serviceAgeShort': element.serviceAgeShort,
      //     'gratuityPeriod': element.gratuityPeriod,
      //     'originalDOJService': element.originalDOJService,
      //     'originalDOJServiceShort': element.originalDOJServiceShort,
      //     'gratuityPeriodShort': element.gratuityPeriodShort,
      //     'remainingMonthOrDays': element.remainingMonthOrDays,
      //     'remainingMonthOrDaysShort': element.remainingMonthOrDaysShort,

      //     'Confirmation Date': element.confirmationDate,
      //     'lastWorkingDate': element.lastWorkingDate,
      //     'employeeStatus': element.employeeStatus,
      //     // 'EmployeeExit Info Id': res.data.results[0].employeeExitInfoId,

      //   }
      //   this.EmploymentInformationSumarry.push(obj);
      // });
      // let obj = {

      //   // 'Employement Info Id': res.data.results[0].employementInfoId,
      //   // 'EmployeeMaster Id': res.data.results[0].employeeMasterId,
      //   'CompanyName': res.data.results[0].companyName,
      //   'joiningDate': res.data.results[0].joiningDate,
      //   'rejoinee': res.data.results[0].rejoinee,
      //   'originalHireDate': res.data.results[0].originalHireDate,
      //   'employmentAge': res.data.results[0].employmentAge,

      //   'serviceAge': res.data.results[0].serviceAge,
      //   'serviceAgeShort': res.data.results[0].serviceAgeShort,
      //   'gratuityPeriod': res.data.results[0].gratuityPeriod,
      //   'gratuityPeriodShort': res.data.results[0].gratuityPeriodShort,
      //   'remainingMonthOrDays': res.data.results[0].remainingMonthOrDays,
      //   'remainingMonthOrDaysShort': res.data.results[0].remainingMonthOrDaysShort,

      //   'Confirmation Date': res.data.results[0].confirmationDate,
      //   'lastWorkingDate': res.data.results[0].lastWorkingDate,
      //   'employeeStatus': res.data.results[0].employeeStatus,
      //   // 'EmployeeExit Info Id': res.data.results[0].employeeExitInfoId,

      // }
      // this.EmploymentInformationSumarry.push(obj);

      // if (this.EmploymentInformationSumarry['Employee Status'] == 1) {
      //   this.EmploymentInformationSumarry['Employee Status'] = 'Active';
      // } else {
      //   this.EmploymentInformationSumarry['Employee Status'] = 'InActive';
      // }
      // this.employeeExitInfoId = this.TransactionHistory[0].exitId;
      //this.EmploymentInformationSumarryData = this._getData();
    })
  }

  TransactionHistorySummary() {
    this.EmploymentInformationService.getTransactionHistory(this.employeeMasterId).subscribe(res => {
      debugger
      this.TransactionHistory = res.data.results[0];

      let joining = this.TransactionHistory.filter(data => {
        if (data.transaction == 'Joining') {
          return data;
        }
      })

      let Rejoining = this.TransactionHistory.filter(data => {
        if (data.transaction == 'Re-Joining') {
          return data;
        }
      })

      let temp = this.TransactionHistory.filter(data => {
        if (data.transaction == 'Transfer') {
          return data;
        }
      })
      let temp1 = this.TransactionHistory.filter(data => {
        if (data.transaction == 'Exit') {
          return data;
        }
      })

      if (joining.length > 0) {
        if (joining[0].transaction == 'Joining') {
          this.employementJoiningInfoId = joining[0].joiningId;
        }
      }
      if (Rejoining.length > 0) {
        if (Rejoining[0].transaction == 'Re-Joining') {
          this.employementReJoiningInfoId = Rejoining[0].rejoiningId;
        }
      }
      if (temp.length > 0) {
        if (temp[0].transaction == 'Transfer') {
          this.employeeTransferId = temp[0].transferId;
        }
      }
      if (temp1.length > 0) {
        if (temp1[0].transaction == 'Exit') {
          this.employeeExitInfoId = temp1[0].exitId;
          if (this.employeeExitInfoId) {
            this.JoiningTabBoolean = false;
          }
          this.rejoiningTabStatusCheck();
        }
      }
      this.pushToGrid();
    })
  }

  pushToGrid() {

    let data = [];

    for (var val of this.TransactionHistory) {
      data.push({
        // id: i,
        transactionDate: val.date,
        transactionType: val.transaction
      });
    }

    // this.TransactionHistoryData = data;
  }

  rejoiningTabStatusCheck() {
    this.EmploymentInformationService.getExitStatus(this.employeeMasterId).subscribe(res => {
    }, (error: any) => {
      this.ReJoiningTabBoolean = error.error['data']['results'][0];
    })
  }

  //edit transaction history- navigate to respective page
  EditPopup(element) {

    if (element.transaction == 'Re-Joining') {

      this.router.navigate(['/employee-master/employment-information/re-joining-information']);
      setTimeout(() => {
        this.EventEmitterService.getReJoiningData(element);
      }, 500)
    }
    if (element.transaction == 'Joining') {

      this.router.navigate(['/employee-master/employment-information/joining-information']);
      setTimeout(() => {
        this.EventEmitterService.getJoiningData(element);
      }, 500)
    }
    if (element.transaction == 'Transfer') {

      this.router.navigate(['/employee-master/employment-information/transfer-information']);
      setTimeout(() => {
        this.EventEmitterService.getTransferToData(element);
      }, 500)
    }
    if (element.transaction == 'Exit') {

      this.router.navigate(['/employee-master/employment-information/exit-information']);
      setTimeout(() => {
        this.EventEmitterService.getExitData(element);
      }, 500)
    }
    if (element.transaction == 'Rejoining Confirmaton' && element.rejoiningConfirmationId > 0) {

      this.router.navigate(['/employee-master/employment-information/re-joining-information']);
    }
    if (element.transaction == 'Confirmaton' && element.joiningConfirmationId > 0) {

      this.router.navigate(['/employee-master/employment-information/joining-information']);
    }
  }

  //edit transaction history- navigate to respective page
  viewPopup(element) {

    if (element.transaction == 'Re-Joining') {
      element.viewReJoining = true;
      this.router.navigate(['/employee-master/employment-information/re-joining-information']);

      setTimeout(() => {
        this.EventEmitterService.getReJoiningData(element);
      }, 500)
    }
    if (element.transaction == 'Joining') {
      element.viewJoining = true;
      // this.EmploymentInformationService.setViewFlag(true);
      this.router.navigate(['/employee-master/employment-information/joining-information']);
      setTimeout(() => {
        this.EventEmitterService.getJoiningData(element);
      }, 500)
    }
    if (element.transaction == 'Transfer') {
      element.viewTransfer = true;
      this.router.navigate(['/employee-master/employment-information/transfer-information']);
      setTimeout(() => {
        this.EventEmitterService.getTransferToData(element);
      }, 500)
    }
    if (element.transaction == 'Exit') {

      element.viewExit = true;
      this.router.navigate(['/employee-master/employment-information/exit-information']);
      setTimeout(() => {
        this.EventEmitterService.getExitData(element);
      }, 500)
    }
    if (element.transaction == 'Rejoining Confirmaton' && element.rejoiningConfirmationId > 0) {

      this.router.navigate(['/employee-master/employment-information/re-joining-information']);
    }
    if (element.transaction == 'Confirmaton' && element.joiningConfirmationId > 0) {

      this.router.navigate(['/employee-master/employment-information/joining-information']);
    }
  }
}
