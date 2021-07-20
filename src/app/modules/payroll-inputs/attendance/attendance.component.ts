import { DatePipe } from '@angular/common';
import { Component, HostListener, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AttendanceService } from '../attendance.service';


export interface User1 {
  srno;
  date;
  days;
  payrollarea;
  WO;
  holiday;
  PL;
  LOP;
  Presentdays;
  payableday;
  pretainingcycle;
  processingcycle;
}

export interface summarydata {
  srno;
  empcode;
  empname;
  cycle;
  pertainingcycle;
  processingcycle;
  payrollarea;
  totaldays;
  weeklyoff;
  holiday;
  paidleave;
  leavewithoutpay;
  adjcycle;
  presentday;
  payableday;
}

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  users1: User1[];
  summarydata: summarydata[];
  mytime: string;
  display;
  public modalRef: BsModalRef;
  dropdownSettings = {};
  dropdownList = [];
  selectedItems = [];
  public windowScrolled: boolean;

  /** Sumarry data */
  attendanceData: any;
  fromDate: any;
  toDate: any;


  constructor(private modalService: BsModalService, private attendanceService: AttendanceService,
    private datepipe: DatePipe) { }

  ngOnInit(): void {

    this.getAttendanceSummaryData()

    this.selectedItems = [];
    // this.dropdownSettings = {
    //   singleSelection: false,
    //   idField: 'id',
    //   textField: 'label',
    //   selectAllText: 'Select All',
    //   unSelectAllText: 'UnSelect All',
    //   itemsShowLimit: 2,
    //   allowSearchFilter: true
    // };



    // this.dropdownList = [
    //   { id: 1, label: 'ABC' },
    //   { id: 2, label: 'PQR' },
    //   { id: 3, label: 'XYZ' },
    //   { id: 4, label: 'AAA' },
    //   { id: 5, label: 'BBB' }
    // ];


  }


  getAttendanceSummaryData() {
    this.attendanceService.getAttendanceSummaryData().subscribe(
      res => {
        this.attendanceData = res.data.results;
      }
    )
  }


  AttendanceSummaryDatewiseRecordsUI() {
    const formData = new FormData();

    let attendanceFromDate = this.datepipe.transform(this.fromDate, 'yyyy-MM-dd')
    let attendanceToDate = this.datepipe.transform(this.toDate, 'yyyy-MM-dd')
    formData.append('attendanceFromDate', attendanceFromDate)
    formData.append('attendanceToDate', attendanceToDate)

    this.attendanceService.AttendanceSummaryDatewiseRecordsUI(formData).subscribe(
      res => {
        this.attendanceData = res.data.results;
      }
    )
  }



  attendanceInputAPIRecordsUI() {

    const formData = new FormData();

    formData.append('CycleId', '9')
    formData.append('payrollAreaCode', 'PA-Staff')
    formData.append('employeeMasterId', '1')

    this.attendanceService.attendanceInputAPIRecordsUI(formData).subscribe(
      res => {

      }
    )
  }


  attendanceInputGetAPIFuturecycle() {
    const formData = new FormData();

    formData.append('employeeMasterId', '1')
    formData.append('CycleId', '8')
    formData.append('payrollAreaCode', 'PA-Staff')

    this.attendanceService.attendanceInputGetAPIFuturecycle(formData).subscribe(
      res => {

      }
    )
  }


  attendanceInputGetTotalAPIRecordsUI() {
    const formData = new FormData();

    formData.append('CycleId', '9')
    formData.append('employeeMasterId', '1')
    formData.append('payrollAreaCode', 'PA-Staff')

    this.attendanceService.attendanceInputGetTotalAPIRecordsUI(formData).subscribe(
      res => {

      }
    )

  }

  attendanceInputGetAPIPreviouscycle() {
    const formData = new FormData();

    formData.append('CycleId', '8')
    formData.append('payrollAreaCode', 'PA-Staff')
    formData.append('employeeMasterId', '1')

    this.attendanceService.attendanceInputGetAPIPreviouscycle(formData).subscribe(
      res => {

      }
    )
  }


  attendanceInputGetAPIFuturecycles() {
    const formData = new FormData();

    formData.append('CycleId', '6')
    formData.append('payrollAreaCode', 'PA-Staff')
    formData.append('employeeMasterId', '1')

    this.attendanceService.attendanceInputGetAPIFuturecycles(formData).subscribe(
      res => {

      }
    )
  }


  AttendanceInput() {
    let data = [
      {
        "attendanceInputId": 381,
        "employeeMasterId": 1,
        "processingCycle": 8,
        "pertainingCycle": 6,
        "payrollAreaId": 1,
        "payrollAreaCode": "PA-Staff",
        "date": "2020-04-04 00:00:00",
        "paidLeaves": 1,
        "weeklyOff": 0,
        "holiday": 0,
        "leaveWithoutPay": 1,
        "currentCycle": 8
      }
    ]

    this.attendanceService.AttendanceInput(data).subscribe(
      res => {

      }
    )

  }









  @HostListener('window:scroll', [])

  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    } else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop ||
      document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }

  scrollToTop() {
    (function smoothscroll() {
      let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();
  }


  largepopup(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }


}
