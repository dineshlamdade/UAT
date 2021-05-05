import { DatePipe } from '@angular/common';
import { Component, HostListener, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AttendanceService } from '../attendance.service';
import { ExcelserviceService } from '../../excel_service/excelservice.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';


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
  leaveWithoutPay;
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
  fromDate: any = null;
  toDate: any = null;

  masterSelected: boolean;
  checklist: any;
  checkedList: any;
  selectedEmpData: any = [];
  selectedAllFlag: boolean = false;
  excelData: any[];
  payRollAreaId: number;
  payrollAreaDetailsData: any;
  startDate: any;
  attendanceInputGetTotalAPIRecordsUIData: any;
  attendanceInputAPIRecordsUIData: any = [];
  index: number;
  empData: any;
  attendanceInputGetAPIFuturecyclesData: any = [];
  attendanceInputGetAPIPreviouscycleData: any = [];
  getAllActiveBussinessYearData: any;
  businessCycleDefinitionData: any;
  frequencyArray: any[];
  employeeFinDetailsData: any;
  attendanceForm: any;
  effectiveToDate: any;
  effectiveFromDate: any;
  attendanceSaveData: any = [];
  days: string[];
  payrollareaCode: any;
  selectedPayrollKey: string = 'leaveWithoutPay';
  leaveWithoutPay: number = 1;
  presentDay_0: number = 0;
  currentCycle: any = null;
  payrollAssignedData: any;


  constructor(private modalService: BsModalService, private attendanceService: AttendanceService,
    private datepipe: DatePipe, private excelservice: ExcelserviceService, private toster: ToastrService) {
    this.masterSelected = false;

    this.checkedList = [];
      this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


    this.attendanceForm = new FormGroup({
      businessYear: new FormControl(""),
      cycle: new FormControl(""),
      frequency: new FormControl(""),
      effectiveFromDate: new FormControl(""),
      effectiveToDate: new FormControl(""),
      payrollArea: new FormControl(""),

      // currentCycle: new FormControl(""),


    });
  }

  ngOnInit() {

    this.getAttendanceSummaryData();

  }



/** Summary page  */

  isSelected(event, summarydata) {
    if (event.checked) {
      this.selectedEmpData.push(summarydata)
    } else {
      if (this.selectedEmpData.length > 0) {
        this.selectedEmpData.forEach((element, index) => {
          if (element.employeeMasterId == summarydata.employeeMasterId) {
            let ind = index;
            this.selectedEmpData.splice(ind, 1);
          }
        });
      } else {
        this.selectedEmpData = []
      }
    }
    console.log("selectedEmpData:", this.selectedEmpData)
  }

  selectAll(event) {
    this.selectedEmpData = [];
    if (event.checked) {
      this.selectedAllFlag = true;
      this.attendanceData.forEach(element => {
        this.selectedEmpData.push(element)
      });
    } else {
      this.selectedAllFlag = false;
      this.selectedEmpData = []
    }
    console.log("selectedALLLLLLEmpData:", this.selectedEmpData)
  }


  getAttendanceSummaryData() {
    this.attendanceService.getAttendanceSummaryData().subscribe(
      res => {
        this.attendanceData = res.data.results;
        console.log("attendanceData:", this.attendanceData);
      }
    )
  }

  exportAsXLSX(): void {
    this.excelData = [];
    this.excelData = this.attendanceData
    this.excelservice.exportAsExcelFile(this.excelData, 'Attandence');
  }

  AttendanceSummaryDatewiseRecordsUI() {
    const formData = new FormData();

    let attendanceFromDate = this.datepipe.transform(this.fromDate, 'yyyy-MM-dd')
    let attendanceToDate = this.datepipe.transform(this.toDate, 'yyyy-MM-dd')
    formData.append('attendanceFromDate', attendanceFromDate + ' 00:00:00')
    formData.append('attendanceToDate', attendanceToDate + ' 00:00:00')

    this.attendanceService.AttendanceSummaryDatewiseRecordsUI(formData).subscribe(
      res => {
        this.attendanceData = res.data.results;
      }
    )
  }


  /** Attendance page  */

  attendanceInputAPIRecordsUI() {

    const formData = new FormData();

    if(this.selectedEmpData.length > 0){

      formData.append('CycleId', this.currentCycle)
      formData.append('employeeMasterId', this.selectedEmpData[this.index].employeeMasterId)
      formData.append('payrollAreaCode', this.selectedEmpData[this.index].payrollAreacode)
  
      this.attendanceService.attendanceInputAPIRecordsUI(formData).subscribe(
        res => {
          this.attendanceInputAPIRecordsUIData = res.data.results;
          this.empData = res.data.results[0].employeeMaster;
          console.log("attendanceInputAPIRecordsUIData:", this.attendanceInputAPIRecordsUIData);
        }
      )
    }

  }


  attendanceInputGetTotalAPIRecordsUI(index) {
    // console.log("DATA is: " + JSON.stringify(this.selectedEmpData[index]))
    const formData = new FormData();

    if(this.selectedEmpData.length > 0){
      formData.append('CycleId', this.currentCycle)
      formData.append('employeeMasterId', this.selectedEmpData[index].employeeMasterId)
      formData.append('payrollAreaCode', this.selectedEmpData[index].payrollAreacode)
  
      this.payrollareaCode =this.selectedEmpData[index].payrollAreacode

      this.attendanceService.attendanceInputGetTotalAPIRecordsUI(formData).subscribe(
        res => {
          this.attendanceInputGetTotalAPIRecordsUIData = res.data.results[0];
          console.log("4567: ", this.attendanceInputGetTotalAPIRecordsUIData);
        }
      )
    }
    

  }

  

  attendanceInputGetAPIPreviouscycle(index) {
    const formData = new FormData();

    formData.append('CycleId', this.currentCycle)
    formData.append('employeeMasterId', this.selectedEmpData[index].employeeMasterId)
    formData.append('payrollAreaCode', this.selectedEmpData[index].payrollAreacode)


    this.attendanceService.attendanceInputGetAPIPreviouscycle(formData).subscribe(
      res => {
        this.attendanceInputGetAPIPreviouscycleData = res.data.results;
      }
    )
  }


  attendanceInputGetAPIFuturecycle(index) {
    const formData = new FormData();

    formData.append('CycleId', this.currentCycle)
    formData.append('employeeMasterId', this.selectedEmpData[index].employeeMasterId)
    formData.append('payrollAreaCode', this.selectedEmpData[index].payrollAreacode)


    this.attendanceService.attendanceInputGetAPIFuturecycle(formData).subscribe(
      res => {
        this.attendanceInputGetAPIFuturecyclesData = res.data.results;
      }
    )
  }

  getSelectedPayrollArea(value){
    if(value == '0'){
      this.leaveWithoutPay = 0
      this.presentDay_0 = 1
    }else{
      this.leaveWithoutPay = 0
      this.presentDay_0 = 1
    }

    //alert(this.selectedPayrollKey)
  }


  /** Set Leave data for Holiday leave - Current Cycle */
  getCurrentHoliday(holiday, presentcycle) {
    if (this.attendanceSaveData.length > 0) {
      this.attendanceSaveData.forEach((element, index) => {
        // alert( presentcycle.attendanceInputId)
        if (element.attendanceInputId == presentcycle.attendanceInputId) {
          let ind = index;
          this.attendanceSaveData.splice(ind, 1, {

            "attendanceInputId": presentcycle.attendanceInputId,
            "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
            "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
            "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
            "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
            "payrollAreaCode": this.payrollareaCode,
            "date": presentcycle.date + ' 00:00:00',
            "paidLeaves": element.paidLeaves,
            "weeklyOff": element.weeklyOff,
            "holiday": parseFloat(holiday),
            "leaveWithoutPay" : this.leaveWithoutPay,
            "presentDay_0":this.presentDay_0,
            "currentCycle": parseInt(this.currentCycle)

          })
        }
        else {
          // alert('here')
          // if (element.attendanceInputId == presentcycle.attendanceInputId) {
          //   let ind = index;
          //   this.attendanceSaveData.splice(ind, 1)
          // }  
          this.attendanceSaveData.push({
            "attendanceInputId": presentcycle.attendanceInputId,
            "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
            "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
            "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
            "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
            "payrollAreaCode": this.payrollareaCode,
            "date": presentcycle.date + ' 00:00:00',
            "paidLeaves": element.paidLeaves,
            "weeklyOff": element.weeklyOff,
            "holiday": parseFloat(holiday),
            "leaveWithoutPay" : this.leaveWithoutPay,
            "presentDay_0":this.presentDay_0,
            "currentCycle": parseInt(this.currentCycle)
          })
        }
      });
    } else {
      // alert("else1")
      this.attendanceSaveData.push({
        "attendanceInputId": presentcycle.attendanceInputId,
        "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
        "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
        "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
        "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
        "payrollAreaCode": this.payrollareaCode,
        "date": presentcycle.date + ' 00:00:00',
        "paidLeaves": 0.0,
        "weeklyOff": 0.0,
        "holiday": parseFloat(holiday),
        "leaveWithoutPay" :this.leaveWithoutPay,
        "presentDay_0":this.presentDay_0,
        "currentCycle": parseInt(this.currentCycle)
      })
    }

    console.log("this.holiday: " + JSON.stringify(this.attendanceSaveData))

  }

  /** Set Leave data for Weekly leave - Current Cycle */
  getCurrentWeeklyOff(weeklyOff, presentcycle) {
    if (this.attendanceSaveData.length > 0) {
      this.attendanceSaveData.forEach((element, index) => {
        if (element.attendanceInputId == presentcycle.attendanceInputId) {
          let ind = index;
          this.attendanceSaveData.splice(ind, 1, {
            "attendanceInputId": presentcycle.attendanceInputId,
            "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
            "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
            "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
            "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
            "payrollAreaCode": this.payrollareaCode,
            "date": presentcycle.date + ' 00:00:00',
            "paidLeaves": parseFloat(element.paidLeaves),
            "weeklyOff": parseFloat(weeklyOff),
            "holiday": parseFloat(element.holiday),
            "leaveWithoutPay" : this.leaveWithoutPay,
            "presentDay_0":this.presentDay_0,
            "currentCycle": parseInt(this.currentCycle)
          })
        }
        else {
          // if (element.attendanceInputId == presentcycle.attendanceInputId) {
          //   let ind = index;
          //   this.attendanceSaveData.splice(ind, 1)
          // }  
          this.attendanceSaveData.push({
            "attendanceInputId": presentcycle.attendanceInputId,
            "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
            "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
            "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
            "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
            "payrollAreaCode": this.payrollareaCode,
            "date": presentcycle.date + ' 00:00:00',
            "paidLeaves": parseFloat(element.paidLeaves),
            "weeklyOff": parseFloat(weeklyOff),
            "holiday": parseFloat(element.holiday),
            "leaveWithoutPay" : this.leaveWithoutPay,
            "presentDay_0":this.presentDay_0,
            "currentCycle": parseInt(this.currentCycle)
          })
        }
      });
    } else {
      this.attendanceSaveData.push({
        "attendanceInputId": presentcycle.attendanceInputId,
        "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
        "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
        "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
        "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
        "payrollAreaCode": this.payrollareaCode,
        "date": presentcycle.date + ' 00:00:00',
        "paidLeaves": 0.0,
        "weeklyOff": parseFloat(weeklyOff),
        "holiday": 0.0,
        "leaveWithoutPay" : this.leaveWithoutPay,
        "presentDay_0":this.presentDay_0,
        "currentCycle": parseInt(this.currentCycle)
      })
    }

   console.log("this.weeklyOff: " + JSON.stringify(this.attendanceSaveData))
  }

  /** Set Leave data for Paid leave - Current Cycle */
  getCurrentPaidLeaves(paidLeaves, presentcycle){
    if (this.attendanceSaveData.length > 0) {
      this.attendanceSaveData.forEach((element, index) => {
        if (element.attendanceInputId == presentcycle.attendanceInputId) {
          let ind = index;
          this.attendanceSaveData.splice(ind, 1, {
            "attendanceInputId": presentcycle.attendanceInputId,
            "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
            "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
            "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
            "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
            "payrollAreaCode": this.payrollareaCode,
            "date": presentcycle.date + ' 00:00:00',
            "paidLeaves": parseFloat(paidLeaves),
            "weeklyOff": parseFloat(element.weeklyOff),
            "holiday": parseFloat(element.holiday),
            "leaveWithoutPay" : this.leaveWithoutPay,
            "presentDay_0":this.presentDay_0,
            "currentCycle": parseInt(this.currentCycle)
          })
        }
        else {
          // if (element.attendanceInputId == presentcycle.attendanceInputId) {
          //   let ind = index;
          //   this.attendanceSaveData.splice(ind, 1)
          // }  
          this.attendanceSaveData.push({
            "attendanceInputId": presentcycle.attendanceInputId,
            "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
            "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
            "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
            "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
            "payrollAreaCode": this.payrollareaCode,
            "date": presentcycle.date + ' 00:00:00',
            "paidLeaves": parseFloat(paidLeaves),
            "weeklyOff": parseFloat(element.weeklyOff),
            "holiday": parseFloat(element.holiday),
            "leaveWithoutPay" : this.leaveWithoutPay,
            "presentDay_0":this.presentDay_0,
            "currentCycle": parseInt(this.currentCycle)
          })
        }
      });
    } else {
      this.attendanceSaveData.push({
        "attendanceInputId": presentcycle.attendanceInputId,
        "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
        "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
        "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
        "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
        "payrollAreaCode": this.payrollareaCode,
        "date": presentcycle.date + ' 00:00:00',
        "paidLeaves": parseFloat(paidLeaves),
        "weeklyOff": 0.0,
        "holiday": 0.0,
        "leaveWithoutPay" : this.leaveWithoutPay,
        "presentDay_0":this.presentDay_0,
        "currentCycle": parseInt(this.currentCycle)
      })
    }

   console.log("this.paidLeaves: " + JSON.stringify(this.attendanceSaveData))
  }


    /** Set Leave data for Paid leave - Current Cycle */
    getCurrentLeaveWithoutPay(leaveWithoutPay, presentcycle){
      if (this.attendanceSaveData.length > 0) {
        this.attendanceSaveData.forEach((element, index) => {
          if (element.attendanceInputId == presentcycle.attendanceInputId) {
            let ind = index;
            this.attendanceSaveData.splice(ind, 1, {
              "attendanceInputId": presentcycle.attendanceInputId,
              "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
              "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
              "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
              "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
              "payrollAreaCode": this.payrollareaCode,
              "date": presentcycle.date + ' 00:00:00',
              "paidLeaves": parseFloat(element.paidLeaves),
              "weeklyOff": parseFloat(element.weeklyOff),
              "holiday": parseFloat(element.holiday),
              "leaveWithoutPay" : leaveWithoutPay,
              "presentDay_0":this.presentDay_0,
              "currentCycle": parseInt(this.currentCycle)
            })
          }
          else {
            // if (element.attendanceInputId == presentcycle.attendanceInputId) {
            //   let ind = index;
            //   this.attendanceSaveData.splice(ind, 1)
            // }  
            this.attendanceSaveData.push({
              "attendanceInputId": presentcycle.attendanceInputId,
              "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
              "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
              "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
              "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
              "payrollAreaCode": this.payrollareaCode,
              "date": presentcycle.date + ' 00:00:00',
              "paidLeaves": parseFloat(element.paidLeaves),
              "weeklyOff": parseFloat(element.weeklyOff),
              "holiday": parseFloat(element.holiday),
              "leaveWithoutPay" : leaveWithoutPay,
              "presentDay_0":this.presentDay_0,
              "currentCycle": parseInt(this.currentCycle)
            })
          }
        });
      } else {
        this.attendanceSaveData.push({
          "attendanceInputId": presentcycle.attendanceInputId,
          "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
          "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
          "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
          "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
          "payrollAreaCode": this.payrollareaCode,
          "date": presentcycle.date + ' 00:00:00',
          "paidLeaves": 0.0,
          "weeklyOff": 0.0,
          "holiday": 0.0,
          "leaveWithoutPay" : leaveWithoutPay,
          "presentDay_0":this.presentDay_0,
          "currentCycle": parseInt(this.currentCycle)
        })
      }
  
     console.log("this.leaveWithoutPay: " + JSON.stringify(this.attendanceSaveData))
    }



  
      /** Set Leave data for Holiday leave - Future Cycle */
      getFutureHoliday(holiday, futureCycle) {
    if (this.attendanceSaveData.length > 0) {
      this.attendanceSaveData.forEach((element, index) => {
        // alert( presentcycle.attendanceInputId)
        if (element.attendanceInputId == futureCycle.attendanceInputId) {
          let ind = index;
          this.attendanceSaveData.splice(ind, 1, {

            "attendanceInputId": futureCycle.attendanceInputId,
            "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
            "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
            "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
            "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
            "payrollAreaCode": this.payrollareaCode,
            "date": futureCycle.date + ' 00:00:00',
            "paidLeaves": element.paidLeaves,
            "weeklyOff": element.weeklyOff,
            "holiday": parseFloat(holiday),
            "leaveWithoutPay" : this.leaveWithoutPay,
            "presentDay_0":this.presentDay_0,
            "currentCycle": parseInt(this.currentCycle)

          })
        }
        else {
          // alert('here')
          // if (element.attendanceInputId == presentcycle.attendanceInputId) {
          //   let ind = index;
          //   this.attendanceSaveData.splice(ind, 1)
          // }  
          this.attendanceSaveData.push({
            "attendanceInputId": futureCycle.attendanceInputId,
            "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
            "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
            "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
            "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
            "payrollAreaCode": this.payrollareaCode,
            "date": futureCycle.date + ' 00:00:00',
            "paidLeaves": element.paidLeaves,
            "weeklyOff": element.weeklyOff,
            "holiday": parseFloat(holiday),
            "leaveWithoutPay" : this.leaveWithoutPay,
            "presentDay_0":this.presentDay_0,
            "currentCycle": parseInt(this.currentCycle)
          })
        }
      });
    } else {
      // alert("else1")
      this.attendanceSaveData.push({
        "attendanceInputId": futureCycle.attendanceInputId,
        "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
        "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
        "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
        "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
        "payrollAreaCode": this.payrollareaCode,
        "date": futureCycle.date + ' 00:00:00',
        "paidLeaves": 0.0,
        "weeklyOff": 0.0,
        "holiday": parseFloat(holiday),
        "leaveWithoutPay" :this.leaveWithoutPay,
        "presentDay_0":this.presentDay_0,
        "currentCycle": parseInt(this.currentCycle)
      })
    }

    console.log("this.holiday: " + JSON.stringify(this.attendanceSaveData))

  }

  /** Set Leave data for Weekly leave - Future Cycle */
  getFutureWeeklyOff(weeklyOff, futureCycle) {
    if (this.attendanceSaveData.length > 0) {
      this.attendanceSaveData.forEach((element, index) => {
        if (element.attendanceInputId == futureCycle.attendanceInputId) {
          let ind = index;
          this.attendanceSaveData.splice(ind, 1, {
            "attendanceInputId": futureCycle.attendanceInputId,
            "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
            "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
            "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
            "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
            "payrollAreaCode": this.payrollareaCode,
            "date": futureCycle.date + ' 00:00:00',
            "paidLeaves": parseFloat(element.paidLeaves),
            "weeklyOff": parseFloat(weeklyOff),
            "holiday": parseFloat(element.holiday),
            "leaveWithoutPay" : this.leaveWithoutPay,
            "presentDay_0":this.presentDay_0,
            "currentCycle": parseInt(this.currentCycle)
          })
        }
        else {
          // if (element.attendanceInputId == presentcycle.attendanceInputId) {
          //   let ind = index;
          //   this.attendanceSaveData.splice(ind, 1)
          // }  
          this.attendanceSaveData.push({
            "attendanceInputId": futureCycle.attendanceInputId,
            "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
            "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
            "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
            "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
            "payrollAreaCode": this.payrollareaCode,
            "date": futureCycle.date + ' 00:00:00',
            "paidLeaves": parseFloat(element.paidLeaves),
            "weeklyOff": parseFloat(weeklyOff),
            "holiday": parseFloat(element.holiday),
            "leaveWithoutPay" : this.leaveWithoutPay,
            "presentDay_0":this.presentDay_0,
            "currentCycle": parseInt(this.currentCycle)
          })
        }
      });
    } else {
      this.attendanceSaveData.push({
        "attendanceInputId": futureCycle.attendanceInputId,
        "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
        "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
        "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
        "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
        "payrollAreaCode": this.payrollareaCode,
        "date": futureCycle.date + ' 00:00:00',
        "paidLeaves": 0.0,
        "weeklyOff": parseFloat(weeklyOff),
        "holiday": 0.0,
        "leaveWithoutPay" : this.leaveWithoutPay,
        "presentDay_0":this.presentDay_0,
        "currentCycle": parseInt(this.currentCycle)
      })
    }

   console.log("this.weeklyOff: " + JSON.stringify(this.attendanceSaveData))
  }

  /** Set Leave data for Paid leave - Future Cycle */
  getFuturePaidLeaves(paidLeaves, futureCycle){
    if (this.attendanceSaveData.length > 0) {
      this.attendanceSaveData.forEach((element, index) => {
        if (element.attendanceInputId == futureCycle.attendanceInputId) {
          let ind = index;
          this.attendanceSaveData.splice(ind, 1, {
            "attendanceInputId": futureCycle.attendanceInputId,
            "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
            "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
            "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
            "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
            "payrollAreaCode": this.payrollareaCode,
            "date": futureCycle.date + ' 00:00:00',
            "paidLeaves": parseFloat(paidLeaves),
            "weeklyOff": parseFloat(element.weeklyOff),
            "holiday": parseFloat(element.holiday),
            "leaveWithoutPay" : this.leaveWithoutPay,
            "presentDay_0":this.presentDay_0,
            "currentCycle": parseInt(this.currentCycle)
          })
        }
        else {
          // if (element.attendanceInputId == presentcycle.attendanceInputId) {
          //   let ind = index;
          //   this.attendanceSaveData.splice(ind, 1)
          // }  
          this.attendanceSaveData.push({
            "attendanceInputId": futureCycle.attendanceInputId,
            "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
            "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
            "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
            "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
            "payrollAreaCode": this.payrollareaCode,
            "date": futureCycle.date + ' 00:00:00',
            "paidLeaves": parseFloat(paidLeaves),
            "weeklyOff": parseFloat(element.weeklyOff),
            "holiday": parseFloat(element.holiday),
            "leaveWithoutPay" : this.leaveWithoutPay,
            "presentDay_0":this.presentDay_0,
            "currentCycle": parseInt(this.currentCycle)
          })
        }
      });
    } else {
      this.attendanceSaveData.push({
        "attendanceInputId": futureCycle.attendanceInputId,
        "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
        "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
        "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
        "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
        "payrollAreaCode": this.payrollareaCode,
        "date": futureCycle.date + ' 00:00:00',
        "paidLeaves": parseFloat(paidLeaves),
        "weeklyOff": 0.0,
        "holiday": 0.0,
        "leaveWithoutPay" : this.leaveWithoutPay,
        "presentDay_0":this.presentDay_0,
        "currentCycle": parseInt(this.currentCycle)
      })
    }

   console.log("this.paidLeaves: " + JSON.stringify(this.attendanceSaveData))
  }


    /** Set Leave data for Paid leave - Future Cycle */
    getFutureLeaveWithoutPay(leaveWithoutPay, futureCycle){
      if (this.attendanceSaveData.length > 0) {
        this.attendanceSaveData.forEach((element, index) => {
          if (element.attendanceInputId == futureCycle.attendanceInputId) {
            let ind = index;
            this.attendanceSaveData.splice(ind, 1, {
              "attendanceInputId": futureCycle.attendanceInputId,
              "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
              "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
              "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
              "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
              "payrollAreaCode": this.payrollareaCode,
              "date": futureCycle.date + ' 00:00:00',
              "paidLeaves": parseFloat(element.paidLeaves),
              "weeklyOff": parseFloat(element.weeklyOff),
              "holiday": parseFloat(element.holiday),
              "leaveWithoutPay" : leaveWithoutPay,
              "presentDay_0":this.presentDay_0,
              "currentCycle": parseInt(this.currentCycle)
            })
          }
          else {
            // if (element.attendanceInputId == presentcycle.attendanceInputId) {
            //   let ind = index;
            //   this.attendanceSaveData.splice(ind, 1)
            // }  
            this.attendanceSaveData.push({
              "attendanceInputId": futureCycle.attendanceInputId,
              "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
              "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
              "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
              "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
              "payrollAreaCode": this.payrollareaCode,
              "date": futureCycle.date + ' 00:00:00',
              "paidLeaves": parseFloat(element.paidLeaves),
              "weeklyOff": parseFloat(element.weeklyOff),
              "holiday": parseFloat(element.holiday),
              "leaveWithoutPay" : leaveWithoutPay,
              "presentDay_0":this.presentDay_0,
              "currentCycle": parseInt(this.currentCycle)
            })
          }
        });
      } else {
        this.attendanceSaveData.push({
          "attendanceInputId": futureCycle.attendanceInputId,
          "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
          "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
          "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
          "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
          "payrollAreaCode": this.payrollareaCode,
          "date": futureCycle.date + ' 00:00:00',
          "paidLeaves": 0.0,
          "weeklyOff": 0.0,
          "holiday": 0.0,
          "leaveWithoutPay" : leaveWithoutPay,
          "presentDay_0":this.presentDay_0,
          "currentCycle": parseInt(this.currentCycle)
        })
      }
  
     console.log("this.leaveWithoutPay: " + JSON.stringify(this.attendanceSaveData))
    }



// *********************************************************************************

      /** Set Leave data for Holiday leave - Previous Cycle */
      getPreviousHoliday(holiday, previousCycle) {
        if (this.attendanceSaveData.length > 0) {
          this.attendanceSaveData.forEach((element, index) => {
            // alert( presentcycle.attendanceInputId)
            if (element.attendanceInputId == previousCycle.attendanceInputId) {
              let ind = index;
              this.attendanceSaveData.splice(ind, 1, {
    
                "attendanceInputId": previousCycle.attendanceInputId,
                "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                "payrollAreaCode": this.payrollareaCode,
                "date": previousCycle.date + ' 00:00:00',
                "paidLeaves": element.paidLeaves,
                "weeklyOff": element.weeklyOff,
                "holiday": parseFloat(holiday),
                "leaveWithoutPay" : this.leaveWithoutPay,
                "presentDay_0":this.presentDay_0,
                "currentCycle": parseInt(this.currentCycle)
    
              })
            }
            else {
              // alert('here')
              // if (element.attendanceInputId == presentcycle.attendanceInputId) {
              //   let ind = index;
              //   this.attendanceSaveData.splice(ind, 1)
              // }  
              this.attendanceSaveData.push({
                "attendanceInputId": previousCycle.attendanceInputId,
                "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                "payrollAreaCode": this.payrollareaCode,
                "date": previousCycle.date + ' 00:00:00',
                "paidLeaves": element.paidLeaves,
                "weeklyOff": element.weeklyOff,
                "holiday": parseFloat(holiday),
                "leaveWithoutPay" : this.leaveWithoutPay,
                "presentDay_0":this.presentDay_0,
                "currentCycle": parseInt(this.currentCycle)
              })
            }
          });
        } else {
          // alert("else1")
          this.attendanceSaveData.push({
            "attendanceInputId": previousCycle.attendanceInputId,
            "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
            "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
            "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
            "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
            "payrollAreaCode": this.payrollareaCode,
            "date": previousCycle.date + ' 00:00:00',
            "paidLeaves": 0.0,
            "weeklyOff": 0.0,
            "holiday": parseFloat(holiday),
            "leaveWithoutPay" :this.leaveWithoutPay,
            "presentDay_0":this.presentDay_0,
            "currentCycle": parseInt(this.currentCycle)
          })
        }
    
        console.log("this.holiday: " + JSON.stringify(this.attendanceSaveData))
    
      }
    
      /** Set Leave data for Weekly leave - Previous Cycle */
      getPreviousWeeklyOff(weeklyOff, previousCycle) {
        if (this.attendanceSaveData.length > 0) {
          this.attendanceSaveData.forEach((element, index) => {
            if (element.attendanceInputId == previousCycle.attendanceInputId) {
              let ind = index;
              this.attendanceSaveData.splice(ind, 1, {
                "attendanceInputId": previousCycle.attendanceInputId,
                "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                "payrollAreaCode": this.payrollareaCode,
                "date": previousCycle.date + ' 00:00:00',
                "paidLeaves": parseFloat(element.paidLeaves),
                "weeklyOff": parseFloat(weeklyOff),
                "holiday": parseFloat(element.holiday),
                "leaveWithoutPay" : this.leaveWithoutPay,
                "presentDay_0":this.presentDay_0,
                "currentCycle": parseInt(this.currentCycle)
              })
            }
            else {
              // if (element.attendanceInputId == presentcycle.attendanceInputId) {
              //   let ind = index;
              //   this.attendanceSaveData.splice(ind, 1)
              // }  
              this.attendanceSaveData.push({
                "attendanceInputId": previousCycle.attendanceInputId,
                "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                "payrollAreaCode": this.payrollareaCode,
                "date": previousCycle.date + ' 00:00:00',
                "paidLeaves": parseFloat(element.paidLeaves),
                "weeklyOff": parseFloat(weeklyOff),
                "holiday": parseFloat(element.holiday),
                "leaveWithoutPay" : this.leaveWithoutPay,
                "presentDay_0":this.presentDay_0,
                "currentCycle": parseInt(this.currentCycle)
              })
            }
          });
        } else {
          this.attendanceSaveData.push({
            "attendanceInputId": previousCycle.attendanceInputId,
            "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
            "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
            "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
            "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
            "payrollAreaCode": this.payrollareaCode,
            "date": previousCycle.date + ' 00:00:00',
            "paidLeaves": 0.0,
            "weeklyOff": parseFloat(weeklyOff),
            "holiday": 0.0,
            "leaveWithoutPay" : this.leaveWithoutPay,
            "presentDay_0":this.presentDay_0,
            "currentCycle": parseInt(this.currentCycle)
          })
        }
    
       console.log("this.weeklyOff: " + JSON.stringify(this.attendanceSaveData))
      }
    
      /** Set Leave data for Paid leave - Previous Cycle */
      getPreviousPaidLeaves(paidLeaves, previousCycle){
        if (this.attendanceSaveData.length > 0) {
          this.attendanceSaveData.forEach((element, index) => {
            if (element.attendanceInputId == previousCycle.attendanceInputId) {
              let ind = index;
              this.attendanceSaveData.splice(ind, 1, {
                "attendanceInputId": previousCycle.attendanceInputId,
                "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                "payrollAreaCode": this.payrollareaCode,
                "date": previousCycle.date + ' 00:00:00',
                "paidLeaves": parseFloat(paidLeaves),
                "weeklyOff": parseFloat(element.weeklyOff),
                "holiday": parseFloat(element.holiday),
                "leaveWithoutPay" : this.leaveWithoutPay,
                "presentDay_0":this.presentDay_0,
                "currentCycle": parseInt(this.currentCycle)
              })
            }
            else {
              // if (element.attendanceInputId == presentcycle.attendanceInputId) {
              //   let ind = index;
              //   this.attendanceSaveData.splice(ind, 1)
              // }  
              this.attendanceSaveData.push({
                "attendanceInputId": previousCycle.attendanceInputId,
                "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                "payrollAreaCode": this.payrollareaCode,
                "date": previousCycle.date + ' 00:00:00',
                "paidLeaves": parseFloat(paidLeaves),
                "weeklyOff": parseFloat(element.weeklyOff),
                "holiday": parseFloat(element.holiday),
                "leaveWithoutPay" : this.leaveWithoutPay,
                "presentDay_0":this.presentDay_0,
                "currentCycle": parseInt(this.currentCycle)
              })
            }
          });
        } else {
          this.attendanceSaveData.push({
            "attendanceInputId": previousCycle.attendanceInputId,
            "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
            "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
            "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
            "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
            "payrollAreaCode": this.payrollareaCode,
            "date": previousCycle.date + ' 00:00:00',
            "paidLeaves": parseFloat(paidLeaves),
            "weeklyOff": 0.0,
            "holiday": 0.0,
            "leaveWithoutPay" : this.leaveWithoutPay,
            "presentDay_0":this.presentDay_0,
            "currentCycle": parseInt(this.currentCycle)
          })
        }
    
       console.log("this.paidLeaves: " + JSON.stringify(this.attendanceSaveData))
      }
    
    
        /** Set Leave data for Paid leave - Previous Cycle */
        getPreviousLeaveWithoutPay(leaveWithoutPay, previousCycle){
          if (this.attendanceSaveData.length > 0) {
            this.attendanceSaveData.forEach((element, index) => {
              if (element.attendanceInputId == previousCycle.attendanceInputId) {
                let ind = index;
                this.attendanceSaveData.splice(ind, 1, {
                  "attendanceInputId": previousCycle.attendanceInputId,
                  "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                  "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                  "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                  "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                  "payrollAreaCode": this.payrollareaCode,
                  "date": previousCycle.date + ' 00:00:00',
                  "paidLeaves": parseFloat(element.paidLeaves),
                  "weeklyOff": parseFloat(element.weeklyOff),
                  "holiday": parseFloat(element.holiday),
                  "leaveWithoutPay" : leaveWithoutPay,
                  "presentDay_0":this.presentDay_0,
                  "currentCycle": parseInt(this.currentCycle)
                })
              }
              else {
                // if (element.attendanceInputId == presentcycle.attendanceInputId) {
                //   let ind = index;
                //   this.attendanceSaveData.splice(ind, 1)
                // }  
                this.attendanceSaveData.push({
                  "attendanceInputId": previousCycle.attendanceInputId,
                  "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                  "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                  "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                  "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                  "payrollAreaCode": this.payrollareaCode,
                  "date": previousCycle.date + ' 00:00:00',
                  "paidLeaves": parseFloat(element.paidLeaves),
                  "weeklyOff": parseFloat(element.weeklyOff),
                  "holiday": parseFloat(element.holiday),
                  "leaveWithoutPay" : leaveWithoutPay,
                  "presentDay_0":this.presentDay_0,
                  "currentCycle": parseInt(this.currentCycle)
                })
              }
            });
          } else {
            this.attendanceSaveData.push({
              "attendanceInputId": previousCycle.attendanceInputId,
              "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
              "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
              "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
              "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
              "payrollAreaCode": this.payrollareaCode,
              "date": previousCycle.date + ' 00:00:00',
              "paidLeaves": 0.0,
              "weeklyOff": 0.0,
              "holiday": 0.0,
              "leaveWithoutPay" : leaveWithoutPay,
              "presentDay_0":this.presentDay_0,
              "currentCycle": parseInt(this.currentCycle)
            })
          }
      
         console.log("this.leaveWithoutPay: " + JSON.stringify(this.attendanceSaveData))
        }



  /** Save Button Click */
  AttendanceInput() {
    console.log("Save Button Click: " + JSON.stringify(this.attendanceSaveData))
    this.attendanceService.AttendanceInput(this.attendanceSaveData).subscribe(
      res => {
        this.toster.success("", "Attendance data saved successfully")
        this.attendanceInputAPIRecordsUI()
      }
    )
  }

 /** Save and Next Button Click */
  attendanceForNextEmp() {
    console.log("Save and next Button Click: " + JSON.stringify(this.attendanceSaveData))
    this.attendanceService.AttendanceInput(this.attendanceSaveData).subscribe(
      res => {
        this.toster.success("", "Attendance data saved successfully")
        if(this.selectedEmpData.length > 1){
          this.index = this.index + 1;
          this.attendanceInputGetTotalAPIRecordsUI(this.index)
          this.attendanceInputAPIRecordsUI()
        }else{
          this.attendanceInputAPIRecordsUI()
        }
      }
    )
    
  }


  payrollAreaDetails() {
    this.payRollAreaId = 18;
    this.attendanceService.payrollAreaDetails(this.payRollAreaId).subscribe(
      res => {
        this.payrollAreaDetailsData = res.data.results;
        this.effectiveFromDate = this.payrollAreaDetailsData[0].effectiveFromDate;
        this.effectiveToDate = this.payrollAreaDetailsData[0].effectiveToDate;
        //console.log("startDate:",this.startDate);
      }
    )
  }

  

  /** Tabs Navigation */
  attendaceTabClick() {
    this.payrollAreaDetails();
    this.index = 0;
    this.currentCycle = parseInt(this.selectedEmpData[this.index].pertainingCycle); 
    this.attendanceInputGetTotalAPIRecordsUI(this.index);
    this.attendanceInputAPIRecordsUI();
    this.getAllActiveBussinessYear();
    this.businessCycleDefinition();
    this.employeeFinDetails();
    this.payrollAssigned();
    
  }

  summeryTab() {
    this.fromDate = null;
  }

  presentCycleTab() {
    this.attendanceInputAPIRecordsUI();
  }

  futureCycleTab() {
    this.attendanceInputGetAPIFuturecycle(this.index);
  }

  previousCycleTab() {
    this.attendanceInputGetAPIPreviouscycle(this.index);
  }

  /** Business year list */
  getAllActiveBussinessYear() {
    this.attendanceService.getAllActiveBussinessYear().subscribe(
      res => {
        this.getAllActiveBussinessYearData = res.data.results;
      }
    )
  }

  /** Business Cycle List */
  businessCycleDefinition() {
    this.attendanceService.businessCycleDefinition().subscribe(
      res => {
        this.businessCycleDefinitionData = res.data.results;
        //this.getFrequencyByCycle(this.currentCycle)
      }
    )
  }

  /** Display Frequency By Selected Cycle */
  getFrequencyByCycle(cycleId) {
    this.frequencyArray = [];
    this.currentCycle = cycleId;
    this.attendanceInputAPIRecordsUI();
    this.businessCycleDefinitionData.forEach(element => {
      if (element.id == cycleId) {
        this.frequencyArray = element.frequency;
      }
    });
  }

  /** Display employee info by employeeMasterId */
  employeeFinDetails() {
    // this.attendanceService.employeeFinDetails(this.selectedEmpData[this.index].employeeMasterId).subscribe(
    this.attendanceService.employeeFinDetails(44).subscribe(
      res => {
        this.employeeFinDetailsData = res.data.results[0][0];
        console.log("employeeFinDetailsData:", this.employeeFinDetailsData);
      }
    )
  }

  payrollAssigned() {

    this.attendanceService.payrollAssigned(this.selectedEmpData[this.index].employeeMasterId).subscribe(
      res => {
        this.payrollAssignedData = res.data.results[0][0];
        //console.log("attendanceData:", this.attendanceData);
      }
    )
  }



  /** Display Day name from selected date */
  getDays(date){
    let day = '';
    var d = new Date(date);
    day = this.days[d.getDay()];
    return day;

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
