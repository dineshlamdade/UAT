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
  joiningDate: any;


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
  }

  getSummaryEmploymentInfo() {

    this.EmploymentInformationService.getEmploymentInformationGridSummary(this.employeeMasterId).subscribe(res => {
      
      this.EmploymentInformationSumarry = res.data.results;
      this.joiningDate = res.data.results[0].joiningDate;
      if (res.data.results[0].joiningDate) {
        localStorage.setItem('joiningDate', res.data.results[0].joiningDate);
      }
      if (res.data.results[0].rejoiningDate) {
        localStorage.setItem('rejoiningDate', res.data.results[0].rejoiningDate);
      }

      if (res.data.results[0].employementInfoId) {
        localStorage.setItem('employementJoiningInfoId', res.data.results[0].employementInfoId);
      }
    })
  }

  TransactionHistorySummary() {
    this.EmploymentInformationService.getTransactionHistory(this.employeeMasterId).subscribe(res => {

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
      element.editReJoining = true;
      setTimeout(() => {
        this.EventEmitterService.getreJoiningInitiate(element);
      }, 500)
      this.router.navigate(['/employee-master/employment-information/re-joining-information']);
      setTimeout(() => {
        this.EventEmitterService.getReJoiningData(element);
      }, 500)
    }
    if (element.transaction == 'Joining') {
      element.editJoining = true;
      setTimeout(() => {
        this.EventEmitterService.getJoiningInitiate(element);
      }, 500)
      this.router.navigate(['/employee-master/employment-information/joining-information']);
      setTimeout(() => {
        this.EventEmitterService.getJoiningData(element);
      }, 500)
    }
    if (element.transaction == 'Transfer') {
      element.editTransfer = true;
      setTimeout(() => {
        this.EventEmitterService.getTransferInitiate(element);
      }, 500)
      this.router.navigate(['/employee-master/employment-information/transfer-information']);
      setTimeout(() => {
        this.EventEmitterService.getTransferToData(element);
      }, 500)

    }
    if (element.transaction == 'Exit') {
      element.editExit = true;
      setTimeout(() => {
        this.EventEmitterService.getExitInitiate(element);
      }, 500)
      this.router.navigate(['/employee-master/employment-information/exit-information']);
      setTimeout(() => {
        this.EventEmitterService.getExitData(element);
      }, 500)
    }
    if (element.transaction == 'Rejoining Confirmaton' && element.rejoiningConfirmationId > 0) {
      element.editReJoining = true;

      setTimeout(() => {
        this.EventEmitterService.getreJoiningInitiate(element);
      }, 500)
      this.router.navigate(['/employee-master/employment-information/re-joining-information']);
      setTimeout(() => {
        this.EventEmitterService.getReJoiningData(element);
      }, 500)
    }
    if (element.transaction == 'Confirmaton' && element.joiningConfirmationId > 0) {
      element.editJoining = true;

      setTimeout(() => {
        this.EventEmitterService.getJoiningInitiate(element);
      }, 500)
      this.router.navigate(['/employee-master/employment-information/joining-information']);
      setTimeout(() => {
        this.EventEmitterService.getJoiningData(element);
      }, 500)
    }
  }

  //edit transaction history- navigate to respective page
  viewPopup(element) {

    if (element.transaction == 'Re-Joining') {
      element.viewReJoining = true;
      setTimeout(() => {
        this.EventEmitterService.getreJoiningInitiate(element);
      }, 500)
      this.router.navigate(['/employee-master/employment-information/re-joining-information']);
      setTimeout(() => {
        this.EventEmitterService.getReJoiningData(element);
      }, 500)
    }
    if (element.transaction == 'Joining') {
      element.viewJoining = true;
      setTimeout(() => {
        this.EventEmitterService.getJoiningInitiate(element);
      }, 500)
      this.router.navigate(['/employee-master/employment-information/joining-information']);
      setTimeout(() => {
        this.EventEmitterService.getJoiningData(element);
      }, 500)
    }
    if (element.transaction == 'Transfer') {
      element.viewTransfer = true;
      setTimeout(() => {
        this.EventEmitterService.getTransferInitiate(element);
      }, 500)
      this.router.navigate(['/employee-master/employment-information/transfer-information']);
      setTimeout(() => {
        this.EventEmitterService.getTransferToData(element);
      }, 500)
    }
    if (element.transaction == 'Exit') {

      element.viewExit = true;
      setTimeout(() => {
        this.EventEmitterService.getExitInitiate(element);
      }, 500)
      this.router.navigate(['/employee-master/employment-information/exit-information']);
      setTimeout(() => {
        this.EventEmitterService.getExitData(element);
      }, 500)
    }
    if (element.transaction == 'Rejoining Confirmaton' && element.rejoiningConfirmationId > 0) {

      element.viewReJoining = true;
      setTimeout(() => {
        this.EventEmitterService.getreJoiningInitiate(element);
      }, 500)
      this.router.navigate(['/employee-master/employment-information/re-joining-information']);
      setTimeout(() => {
        this.EventEmitterService.getReJoiningData(element);
      }, 500)
    }
    if (element.transaction == 'Confirmaton' && element.joiningConfirmationId > 0) {

      element.viewJoining = true;
      setTimeout(() => {
        this.EventEmitterService.getJoiningInitiate(element);
      }, 500)
      this.router.navigate(['/employee-master/employment-information/joining-information']);
      setTimeout(() => {
        this.EventEmitterService.getJoiningData(element);
      }, 500)
    }
  }
}
