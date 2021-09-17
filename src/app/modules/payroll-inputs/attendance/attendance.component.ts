import { DatePipe } from '@angular/common';
import { Component, HostListener, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AttendanceService } from '../attendance.service';
import { ExcelserviceService } from '../../excel_service/excelservice.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';
import { exit } from 'node:process';
import { PayrollInputsService } from '../payroll-inputs.service';


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
  index: number = 0;
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
  months: string[];
  payrollareaCode: any;
  selectedPayrollKey: string = 'leaveWithoutPay';
  leaveWithoutPay: number = 1;
  presentDay_0: any = 0;
  currentCycle: any = null;
  payrollAssignedData: any;
  tabIndex: any = 0;
  PayrollAreaByPayrollAreaCodeData: any;
  defaultAttendace: any;
  is30daysPayroll: any;
  payrollAreaId_Payroll: any;
  currentWeeklyOff: any = 0.00;
  showEmpSelectionFlag: boolean = false;
  employeeData: any;
  selectedEmployeeMasterId: number;
  selectedPayrollAreaCode: any;
  selectedProcessingCycle: any;
  tempAttendancePresentData: any;
  tempAttendancePreviousData: any;
  tempAttendanceFutureData: any;

  tabsIndex = 1
  businessCycleData: any;
  businessFrequencyName: any;
  businessCycleIDData: any;
  AllCycleRecordsData: any = [];
  selectedProcessingCyclename: any;
  payrollListData: any;
  attendanceInputGetHistoryfuturecyclesData: any;
  header: any[];
  

  constructor(private modalService: BsModalService, private attendanceService: AttendanceService,
    private payrollservice: PayrollInputsService,
    private datepipe: DatePipe, private excelservice: ExcelserviceService, private toster: ToastrService) {
    this.masterSelected = false;

    this.checkedList = [];
    this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

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
    this.header = []
    this.header =["Emp. Code","Emp. Name","Payroll Area", "Cycle", "Total Days", "Weekly Off", "Holiday", "Paid Leave", "Leave Without Pay", "Before-DOJ/After-DOL", "Adjustment Days", "Present Days", "Future Days", "Payable Days"]
    //this.excelData = this.attendanceData
    this.attendanceData.forEach(element => {


			let obj = {
				"Emp. Code": element.empcode,
				"Emp. Name": element.empName,
        "Payroll Area": element.payrollAreacode,
				"Cycle": element.cycleName,
				"Total Days": element.totalDaysInCycle,
				"Weekly Off": element.weeklyOff,
				"Holiday": element.holiday,
        "Paid Leave":element.paidLeave,
        "Leave Without Pay":element.leaveWithoutPay,
        "Before-DOJ/After-DOL":element.beforeDOJOrAfterDOL,
        "Adjustment Days":element.adjustment,
        "Present Days":element.presentDays,
        "Future Days":element.futureDays,
        "Payable Days":element.paidDays


			}
			this.excelData.push(obj)
		});
   // console.log(this.excelData)
    this.excelservice.exportAsExcelFile(this.excelData, 'Attandence','Attendance',this.header);
  }

  AttendanceSummaryDatewiseRecordsUI() {
    const formData = new FormData();

    let attendanceFromDate = this.datepipe.transform(this.fromDate, 'yyyy-MM-dd')
    let attendanceToDate = this.datepipe.transform(this.toDate, 'yyyy-MM-dd')
    if (attendanceToDate == null) {
      formData.append('attendanceToDate', '9999-12-31' + ' 00:00:00')
    } else {
      formData.append('attendanceToDate', attendanceToDate + ' 00:00:00')
    }
    formData.append('attendanceFromDate', attendanceFromDate + ' 00:00:00')


    this.attendanceService.AttendanceSummaryDatewiseRecordsUI(formData).subscribe(
      res => {
        this.attendanceData = res.data.results;
      }
    )
  }


  /** Attendance page  */

  attendanceInputAPIRecordsUI() {

    const formData = new FormData();

    if (this.selectedEmpData.length > 0) {

      formData.append('CycleId', this.selectedEmpData[this.index].processingCycle)
      formData.append('employeeMasterId', this.selectedEmpData[this.index].employeeMasterId)
      formData.append('payrollAreaCode', this.selectedEmpData[this.index].payrollAreacode)

      this.attendanceService.attendanceInputAPIRecordsUI(formData).subscribe(
        res => {
          this.attendanceInputAPIRecordsUIData = res.data.results;
          this.empData = res.data.results[0].employeeMaster;
          this.tempAttendancePresentData = res.data.results
          //console.log(JSON.stringify(this.tempAttendancePresentData))
          localStorage.setItem('tempAttendancePresentData', JSON.stringify(this.tempAttendancePresentData))

        }
      )
    }

  }


  attendanceInputGetTotalAPIRecordsUI(index) {
    // console.log("DATA is: " + JSON.stringify(this.selectedEmpData[index]))
    const formData = new FormData();

    if (this.selectedEmpData.length > 0) {
      formData.append('CycleId', this.selectedEmpData[this.index].processingCycle)
      formData.append('employeeMasterId', this.selectedEmpData[index].employeeMasterId)
      formData.append('payrollAreaCode', this.selectedEmpData[index].payrollAreacode)

      this.payrollareaCode = this.selectedEmpData[index].payrollAreacode

      this.attendanceService.attendanceInputGetTotalAPIRecordsUI(formData).subscribe(
        res => {
          this.attendanceInputGetTotalAPIRecordsUIData = res.data.results[0];
          //console.log("4567: ", this.attendanceInputGetTotalAPIRecordsUIData);
        }
      )
    }


  }



  attendanceInputGetAPIPreviouscycle(index) {
    const formData = new FormData();

    formData.append('CycleId', this.selectedEmpData[this.index].processingCycle)
    formData.append('employeeMasterId', this.selectedEmpData[index].employeeMasterId)
    formData.append('payrollAreaCode', this.selectedEmpData[index].payrollAreacode)


    this.attendanceService.attendanceInputGetAPIPreviouscycle(formData).subscribe(
      res => {
        this.attendanceInputGetAPIPreviouscycleData = res.data.results;
        this.tempAttendancePreviousData = this.attendanceInputGetAPIPreviouscycleData
        localStorage.setItem('tempAttendancePreviousData', JSON.stringify(this.tempAttendancePreviousData))

      }
    )
  }


  attendanceInputGetAPIFuturecycle(index) {
    const formData = new FormData();

    formData.append('CycleId', this.selectedEmpData[this.index].processingCycle)
    formData.append('employeeMasterId', this.selectedEmpData[index].employeeMasterId)
    formData.append('payrollAreaCode', this.selectedEmpData[index].payrollAreacode)


    this.attendanceService.attendanceInputGetAPIFuturecycle(formData).subscribe(
      res => {
        this.attendanceInputGetAPIFuturecyclesData = res.data.results;
        this.tempAttendanceFutureData = this.attendanceInputGetAPIFuturecyclesData
        localStorage.setItem('tempAttendanceFutureData', JSON.stringify(this.tempAttendanceFutureData))
      }
    )
  }

  getSelectedPayrollArea() {
    if (this.defaultAttendace == '0') {
      this.leaveWithoutPay = 0
    } else {
      this.presentDay_0 = 0
    }

    //alert(this.selectedPayrollKey)
  }

  // ****************************Current Cycle Functions Starts******************************************

  /** Set Leave data for Holiday leave - Current Cycle */
  getCurrentHoliday(holidayvalue, presentcycle, rowIndex) {
    this.attendanceInputAPIRecordsUIData[rowIndex].holiday = 0
    let tempAttendancePresentData = JSON.parse(localStorage.getItem('tempAttendancePresentData'))
    if (holidayvalue != '') {
      let holiday: any;
      if (this.selectedEmpData[this.index].cycleName != this.selectedEmpData[this.index].currentcycleName) {
        // if(parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].holiday) < parseFloat(holidayvalue)){
        holiday = parseFloat(holidayvalue) - parseFloat(tempAttendancePresentData[rowIndex].holiday)
        // }else{
        //   holiday = parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].holiday) - parseFloat(holidayvalue)
        // }
      } else {
        holiday = holidayvalue
      }
      if (this.attendanceSaveData.length > 0) {
        this.attendanceSaveData.forEach((element, index) => {
          // alert( presentcycle.attendanceInputId)
          if (element.attendanceInputId == presentcycle.attendanceInputId) {
            let ind = index;
            let totalLeaves
            if (this.defaultAttendace == '1') {
              totalLeaves = parseFloat(element.paidLeaves) + parseFloat(element.weeklyOff) + parseFloat(element.leaveWithoutPay) + parseFloat(holiday)
              this.leaveWithoutPay = this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay
            } else {
              totalLeaves = parseFloat(element.paidLeaves) + parseFloat(element.weeklyOff) + parseFloat(element.presentDay_0) + parseFloat(holiday)
              this.leaveWithoutPay = 0
            }
            console.log("holiday ele: " + totalLeaves)
            if (totalLeaves <= 1) {

              this.attendanceSaveData.splice(ind, 1, {
                "attendanceInputId": presentcycle.attendanceInputId,
                "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
                "payrollAreaCode": this.payrollareaCode,
                "date": presentcycle.date + ' 00:00:00',
                "paidLeaves": element.paidLeaves,
                "weeklyOff": element.weeklyOff,
                "holiday": parseFloat(holiday),
                "leaveWithoutPay": element.leaveWithoutPay,
                "presentDay_0": element.presentDay_0,
                "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)

              })
              this.attendanceInputAPIRecordsUIData[rowIndex].holiday = holiday
            } else {
              this.toster.warning("", "You can not exceed the leave count more then one")
              //holiday = 0.00
              this.attendanceInputAPIRecordsUIData[rowIndex].holiday = '0.00'
            }
          }
          else {
            // alert('here')
            let length = this.attendanceSaveData.length - 1
            if (this.attendanceSaveData[length].attendanceInputId == presentcycle.attendanceInputId) { return; }
            else {

              this.attendanceSaveData.push({
                "attendanceInputId": presentcycle.attendanceInputId,
                "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
                "payrollAreaCode": this.payrollareaCode,
                "date": presentcycle.date + ' 00:00:00',
                "paidLeaves": 0,
                "weeklyOff": 0,
                "holiday": parseFloat(holiday),
                "leaveWithoutPay": 0,
                "presentDay_0": presentcycle.presentDay_0,
                "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
              })
            }
            this.attendanceInputAPIRecordsUIData[rowIndex].holiday = holiday
          }
        });
      }
      else {
        let totalLeaves;
        if (this.defaultAttendace == '1') {
          totalLeaves = parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].paidLeaves) + parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].weeklyOff) + parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay) + parseFloat(holiday)
          this.leaveWithoutPay = this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay
        } else {
          totalLeaves = parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].paidLeaves) + parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].weeklyOff) + parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].presentDay_0) + parseFloat(holiday)
          this.leaveWithoutPay = 0
        }
        console.log("holiday else: " + totalLeaves)
        if (totalLeaves <= 1) {
          this.attendanceSaveData.push({
            "attendanceInputId": presentcycle.attendanceInputId,
            "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
            "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
            "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
            // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
            "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
            "payrollAreaCode": this.payrollareaCode,
            "date": presentcycle.date + ' 00:00:00',
            "paidLeaves": this.attendanceInputAPIRecordsUIData[rowIndex].paidLeaves,
            "weeklyOff": this.attendanceInputAPIRecordsUIData[rowIndex].weeklyOff,
            "holiday": parseFloat(holiday),
            "leaveWithoutPay": this.leaveWithoutPay,
            "presentDay_0": this.attendanceInputAPIRecordsUIData[rowIndex].presentDay_0,
            "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
          })
          this.attendanceInputAPIRecordsUIData[rowIndex].holiday = holiday
        } else {
          this.toster.warning("", "You can not exceed the leave count more then one")
          //holiday = 0.0
          this.attendanceInputAPIRecordsUIData[rowIndex].holiday = '0.00'

        }
      }
      this.getPresentCycleHolidayTotal()

      console.log("this.holiday: " + JSON.stringify(this.attendanceSaveData))
    }

  }

  /** Set Leave data for Weekly leave - Current Cycle */
  getCurrentWeeklyOff(weeklyOffvalue, presentcycle, rowIndex) {
    this.attendanceInputAPIRecordsUIData[rowIndex].weeklyOff = 0
    let tempAttendancePresentData = JSON.parse(localStorage.getItem('tempAttendancePresentData'))
    if (weeklyOffvalue != '') {
      let weeklyOff: any;
      if (this.selectedEmpData[this.index].cycleName != this.selectedEmpData[this.index].currentcycleName) {
        //  if(parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].weeklyOff) < parseFloat(weeklyOffvalue)){

        weeklyOff = parseFloat(weeklyOffvalue) - parseFloat(tempAttendancePresentData[rowIndex].weeklyOff)
        
        // }else{
        //   weeklyOff = parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].weeklyOff) - parseFloat(weeklyOffvalue)
        // }
      } else {
        
        weeklyOff = weeklyOffvalue
      }
      // debugger
      if (this.attendanceSaveData.length > 0) {
        this.attendanceSaveData.forEach((element, index) => {
          if (element.attendanceInputId == presentcycle.attendanceInputId) {
            let ind = index;
            let totalLeaves;
            if (this.defaultAttendace == '1') {
              totalLeaves = parseFloat(element.paidLeaves) + parseFloat(element.holiday) + parseFloat(element.leaveWithoutPay) + parseFloat(weeklyOff)
              this.leaveWithoutPay = this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay
            } else {
              totalLeaves = parseFloat(element.paidLeaves) + parseFloat(element.holiday) + parseFloat(element.presentDay_0) + parseFloat(weeklyOff)
              this.leaveWithoutPay = 0
            }

            console.log(totalLeaves)

            if (totalLeaves <= 1) {

              this.attendanceSaveData.splice(ind, 1, {
                "attendanceInputId": presentcycle.attendanceInputId,
                "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
                "payrollAreaCode": this.payrollareaCode,
                "date": presentcycle.date + ' 00:00:00',
                "paidLeaves": parseFloat(element.paidLeaves),
                "weeklyOff": parseFloat(weeklyOff),
                "holiday": parseFloat(element.holiday),
                "leaveWithoutPay": parseFloat(element.leaveWithoutPay),
                "presentDay_0": parseFloat(element.presentDay_0),
                "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
              })
              this.attendanceInputAPIRecordsUIData[rowIndex].weeklyOff = weeklyOff

              return
            } else {
              this.toster.warning("", "You can not exceed the leave count more then one")
              weeklyOff = 0.00
              this.attendanceInputAPIRecordsUIData[rowIndex].weeklyOff = '0.00'
              //this.currentWeeklyOff[rowIndex] = 0.00
            }
          }
          else {
            let length = this.attendanceSaveData.length - 1
            if (this.attendanceSaveData[length].attendanceInputId == presentcycle.attendanceInputId) { return; }
            else {
              this.attendanceSaveData.push({
                "attendanceInputId": presentcycle.attendanceInputId,
                "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
                "payrollAreaCode": this.payrollareaCode,
                "date": presentcycle.date + ' 00:00:00',
                "paidLeaves": 0,
                "weeklyOff": parseFloat(weeklyOff),
                "holiday": 0,
                "leaveWithoutPay": 0,
                "presentDay_0": presentcycle.presentDay_0,
                "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
              })
            }

            this.attendanceInputAPIRecordsUIData[rowIndex].weeklyOff = weeklyOff
            return;
          }


        });
      } else {
        let totalLeaves;
        if (this.defaultAttendace == '1') {
          totalLeaves = parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].paidLeaves) + parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].holiday) + parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay) + parseFloat(weeklyOff)
          this.leaveWithoutPay = this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay
        } else {
          totalLeaves = parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].paidLeaves) + parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].holiday) + parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].presentDay_0) + parseFloat(weeklyOff)
          this.leaveWithoutPay = 0
        }
        // console.log("total wweklyoff: " +totalLeaves)
        if (totalLeaves <= 1) {
          // alert(weeklyOff)
          this.attendanceSaveData.push({
            "attendanceInputId": presentcycle.attendanceInputId,
            "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
            "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
            "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
            // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
            "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
            "payrollAreaCode": this.payrollareaCode,
            "date": presentcycle.date + ' 00:00:00',
            "paidLeaves": this.attendanceInputAPIRecordsUIData[rowIndex].paidLeaves,
            "weeklyOff": parseFloat(weeklyOff),
            "holiday": this.attendanceInputAPIRecordsUIData[rowIndex].holiday,
            "leaveWithoutPay": this.leaveWithoutPay,
            "presentDay_0": this.attendanceInputAPIRecordsUIData[rowIndex].presentDay_0,
            "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
          })
          this.attendanceInputAPIRecordsUIData[rowIndex].weeklyOff = weeklyOff
        } else {
          this.toster.warning("", "You can not exceed the leave count more then one")
          //weeklyOff = 0.00
          this.attendanceInputAPIRecordsUIData[rowIndex].weeklyOff = '0.00'
          //this.currentWeeklyOff[rowIndex] = 0.00

        }
      }
      console.log("this.weeklyOff: " + JSON.stringify(this.attendanceSaveData))
      this.getPresentCycleWeeklyOffTotal()
    }
  }

  /** Set Leave data for Paid leave - Current Cycle */
  getCurrentPaidLeaves(paidLeavesvalue, presentcycle, rowIndex) {
    this.attendanceInputAPIRecordsUIData[rowIndex].paidLeaves = 0
    let tempAttendancePresentData = JSON.parse(localStorage.getItem('tempAttendancePresentData'))
    if (paidLeavesvalue != '') {
      let paidLeaves: any;
      if (this.selectedEmpData[this.index].cycleName != this.selectedEmpData[this.index].currentcycleName) {
        //  if(parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].paidLeaves) < parseFloat(paidLeavesvalue)){
        paidLeaves = parseFloat(paidLeavesvalue) - parseFloat(tempAttendancePresentData[rowIndex].paidLeaves)
        // }else{
        //   paidLeaves = parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].paidLeaves) - parseFloat(paidLeavesvalue)
        // }
      } else {
        paidLeaves = paidLeavesvalue
      }
      if (this.attendanceSaveData.length > 0) {
        this.attendanceSaveData.forEach((element, index) => {
          if (element.attendanceInputId == presentcycle.attendanceInputId) {
            let ind = index;
            let totalLeaves;
            if (this.defaultAttendace == '1') {
              totalLeaves = parseFloat(element.holiday) + parseFloat(element.weeklyOff) + parseFloat(element.leaveWithoutPay) + parseFloat(paidLeaves)
              this.leaveWithoutPay = this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay
            } else {
              totalLeaves = parseFloat(element.holiday) + parseFloat(element.weeklyOff) + parseFloat(element.presentDay_0) + parseFloat(paidLeaves)
              this.leaveWithoutPay = 0
            }

            console.log("total ele: " + totalLeaves)
            if (totalLeaves <= 1) {
              this.attendanceSaveData.splice(ind, 1, {
                "attendanceInputId": presentcycle.attendanceInputId,
                "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
                "payrollAreaCode": this.payrollareaCode,
                "date": presentcycle.date + ' 00:00:00',
                "paidLeaves": parseFloat(paidLeaves),
                "weeklyOff": parseFloat(element.weeklyOff),
                "holiday": parseFloat(element.holiday),
                "leaveWithoutPay": parseFloat(element.leaveWithoutPay),
                "presentDay_0": element.presentDay_0,
                "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
              })
              this.attendanceInputAPIRecordsUIData[rowIndex].paidLeaves = paidLeaves
            } else {
              this.toster.warning("", "You can not exceed the leave count more then one")
              //paidLeaves = 0.0
              this.attendanceInputAPIRecordsUIData[rowIndex].paidLeaves = '0.00'
            }
          }
          else {
            let length = this.attendanceSaveData.length - 1
            if (this.attendanceSaveData[length].attendanceInputId == presentcycle.attendanceInputId) { return; }
            else {
              this.attendanceSaveData.push({
                "attendanceInputId": presentcycle.attendanceInputId,
                "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
                "payrollAreaCode": this.payrollareaCode,
                "date": presentcycle.date + ' 00:00:00',
                "paidLeaves": parseFloat(paidLeaves),
                "weeklyOff": 0,
                "holiday": 0,
                "leaveWithoutPay": 0,
                "presentDay_0": presentcycle.presentDay_0,
                "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
              })
            }
            this.attendanceInputAPIRecordsUIData[rowIndex].paidLeaves = paidLeaves
          }
        });
      } else {
        let totalLeaves;
        if (this.defaultAttendace == '1') {
          totalLeaves = parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].weeklyOff) + parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].holiday) + parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay) + parseFloat(paidLeaves)
          this.leaveWithoutPay = this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay
        } else {
          totalLeaves = parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].weeklyOff) + parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].holiday) + parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].presentDay_0) + parseFloat(paidLeaves)
          this.leaveWithoutPay = 0
        }

        console.log("total total paid: " + totalLeaves)
        if (totalLeaves <= 1) {
          this.attendanceSaveData.push({
            "attendanceInputId": presentcycle.attendanceInputId,
            "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
            "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
            "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
            // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
            "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
            "payrollAreaCode": this.payrollareaCode,
            "date": presentcycle.date + ' 00:00:00',
            "paidLeaves": parseFloat(paidLeaves),
            "weeklyOff": this.attendanceInputAPIRecordsUIData[rowIndex].weeklyOff,
            "holiday": this.attendanceInputAPIRecordsUIData[rowIndex].holiday,
            "leaveWithoutPay": this.leaveWithoutPay,
            "presentDay_0": this.attendanceInputAPIRecordsUIData[rowIndex].presentDay_0,
            "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
          })
          this.attendanceInputAPIRecordsUIData[rowIndex].paidLeaves = paidLeaves
        } else {
          this.toster.warning("", "You can not exceed the leave count more then one")
          // paidLeaves = 0.0
          this.attendanceInputAPIRecordsUIData[rowIndex].paidLeaves = '0.00'

        }
      }

      console.log("this.paidLeaves: " + JSON.stringify(this.attendanceSaveData))
      this.getPresentCycleLeaveTotal();
    }
  }


  /** Set Leave data for Paid leave - Current Cycle */
  getCurrentLeaveWithoutPay(leaveWithoutPayvalue, presentcycle, rowIndex) {
    this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay = 0
    //alert(this.tempAttendancePresentData[rowIndex].leaveWithoutPay)
    let tempAttendancePresentData = JSON.parse(localStorage.getItem('tempAttendancePresentData'))
    if (leaveWithoutPayvalue != '') {
      let leaveWithoutPay: any;
      if (this.selectedEmpData[this.index].cycleName != this.selectedEmpData[this.index].currentcycleName) {

        // if(parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay) < parseFloat(leaveWithoutPayvalue)){

        leaveWithoutPay = parseFloat(leaveWithoutPayvalue) - parseFloat(tempAttendancePresentData[rowIndex].leaveWithoutPay)

        // }else{
        //   leaveWithoutPay = parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay) - parseFloat(leaveWithoutPayvalue)
        // }
      } else {

        leaveWithoutPay = leaveWithoutPayvalue
      }
      if (this.attendanceSaveData.length > 0) {
        this.attendanceSaveData.forEach((element, index) => {
          if (element.attendanceInputId == presentcycle.attendanceInputId) {
            let ind = index;
            let totalLeaves = parseFloat(element.weeklyOff) + parseFloat(element.holiday) + parseFloat(element.paidLeaves) + parseFloat(leaveWithoutPay)
            if (totalLeaves <= 1) {
              this.attendanceSaveData.splice(ind, 1, {
                "attendanceInputId": presentcycle.attendanceInputId,
                "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
                "payrollAreaCode": this.payrollareaCode,
                "date": presentcycle.date + ' 00:00:00',
                "paidLeaves": parseFloat(element.paidLeaves),
                "weeklyOff": parseFloat(element.weeklyOff),
                "holiday": parseFloat(element.holiday),
                "leaveWithoutPay": parseFloat(leaveWithoutPay),
                "presentDay_0": element.presentDay_0,
                "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
              })
              this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay = leaveWithoutPay
            } else {
              this.toster.warning("", "You can not exceed the leave count more then one")
              //leaveWithoutPay = 0.0
              this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay = '0.00'
            }
          }
          else {
            let length = this.attendanceSaveData.length - 1
            if (this.attendanceSaveData[length].attendanceInputId == presentcycle.attendanceInputId) { return; }
            else {
              this.attendanceSaveData.push({
                "attendanceInputId": presentcycle.attendanceInputId,
                "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
                "payrollAreaCode": this.payrollareaCode,
                "date": presentcycle.date + ' 00:00:00',
                "paidLeaves": 0,
                "weeklyOff": 0,
                "holiday": 0,
                "leaveWithoutPay": parseFloat(leaveWithoutPay),
                "presentDay_0": presentcycle.presentDay_0,
                "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
              })
            }
            this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay = leaveWithoutPay
          }
        });
      } else {
        let totalLeaves = parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].weeklyOff) + parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].holiday) + parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].paidLeaves) + parseFloat(leaveWithoutPay)
        //  console.log("total wweklyoff: " + totalLeaves)
        if (totalLeaves <= 1) {
          this.attendanceSaveData.push({
            "attendanceInputId": presentcycle.attendanceInputId,
            "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
            "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
            "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
            // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
            "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
            "payrollAreaCode": this.payrollareaCode,
            "date": presentcycle.date + ' 00:00:00',
            "paidLeaves": this.attendanceInputAPIRecordsUIData[rowIndex].paidLeaves,
            "weeklyOff": this.attendanceInputAPIRecordsUIData[rowIndex].weeklyOff,
            "holiday": this.attendanceInputAPIRecordsUIData[rowIndex].holiday,
            "leaveWithoutPay": parseFloat(leaveWithoutPay),
            "presentDay_0": this.attendanceInputAPIRecordsUIData[rowIndex].presentDay_0,
            "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
          })
          this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay = leaveWithoutPay
        } else {
          this.toster.warning("", "You can not exceed the leave count more then one")
          // leaveWithoutPay = 0.0
          this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay = '0.00'

        }
      }

      console.log("this.leaveWithoutPay: " + JSON.stringify(this.attendanceSaveData))
      this.getPresentCycleLeaveWithoutPayTotal();
    }
  }


  calculatePresentDay(presentCycle, rowIndex, cycle) {
    let presentDay
    if (this.selectedEmpData[this.index]) {
      // if (this.selectedEmpData[this.index].cycleName == this.selectedEmpData[this.index].currentcycleName) {
      if (this.defaultAttendace == '1') {
        if (cycle == 'present') {
          // presentCycle.pertainingCycle == presentCycle.processingCycle
          if (this.selectedEmpData[this.index].cycleName == this.selectedEmpData[this.index].currentcycleName) {
            presentDay = 1 - (parseFloat(presentCycle.weeklyOff) + parseFloat(presentCycle.holiday) + parseFloat(presentCycle.paidLeaves) + parseFloat(presentCycle.leaveWithoutPay) + parseFloat(presentCycle.leaveWithoutPay_0) + parseFloat(presentCycle.adjustment))
          } else {
            presentDay = 0 - (parseFloat(presentCycle.weeklyOff) + parseFloat(presentCycle.holiday) + parseFloat(presentCycle.paidLeaves) + parseFloat(presentCycle.leaveWithoutPay) + parseFloat(presentCycle.leaveWithoutPay_0) + parseFloat(presentCycle.adjustment))
          }
        }
        else if (cycle == 'future') {
          if (this.selectedEmpData[this.index].cycleName == this.selectedEmpData[this.index].currentcycleName) {
            presentDay = 1 - (parseFloat(presentCycle.weeklyOff) + parseFloat(presentCycle.holiday) + parseFloat(presentCycle.paidLeaves) + parseFloat(presentCycle.leaveWithoutPay) + parseFloat(presentCycle.leaveWithoutPay_0) + parseFloat(presentCycle.adjustment))
          } else {
            presentDay = 0 - (parseFloat(presentCycle.weeklyOff) + parseFloat(presentCycle.holiday) + parseFloat(presentCycle.paidLeaves) + parseFloat(presentCycle.leaveWithoutPay) + parseFloat(presentCycle.leaveWithoutPay_0) + parseFloat(presentCycle.adjustment))
          }
        } else if (cycle == 'previous') {
          if (this.selectedEmpData[this.index].cycleName == this.selectedEmpData[this.index].currentcycleName) {
            presentDay = 1 - (parseFloat(presentCycle.weeklyOff) + parseFloat(presentCycle.holiday) + parseFloat(presentCycle.paidLeaves) + parseFloat(presentCycle.leaveWithoutPay) + parseFloat(presentCycle.leaveWithoutPay_0) + parseFloat(presentCycle.adjustment))
          } else {
            presentDay = 0 - (parseFloat(presentCycle.weeklyOff) + parseFloat(presentCycle.holiday) + parseFloat(presentCycle.paidLeaves) + parseFloat(presentCycle.leaveWithoutPay) + parseFloat(presentCycle.leaveWithoutPay_0) + parseFloat(presentCycle.adjustment))
          }
        }


      } else {
        presentDay = presentCycle.presentDay_0
      }

      // } else {
      //   if(this.defaultAttendace == '1'){
      //     if(this.attendanceInputAPIRecordsUIData.pertainingCycle == this.attendanceInputAPIRecordsUIData.processingCycle){
      //       //alert("defaultAttendace == '1'")
      //       presentDay = 1 - (parseFloat(presentCycle.weeklyOff) + parseFloat(presentCycle.holiday) + parseFloat(presentCycle.paidLeaves) + parseFloat(presentCycle.leaveWithoutPay) + parseFloat(presentCycle.leaveWithoutPay_0) + parseFloat(presentCycle.adjustment))
      //     }else{
      //       presentDay = 0 - (parseFloat(presentCycle.weeklyOff) + parseFloat(presentCycle.holiday) + parseFloat(presentCycle.paidLeaves) + parseFloat(presentCycle.leaveWithoutPay) + parseFloat(presentCycle.leaveWithoutPay_0) + parseFloat(presentCycle.adjustment))
      //     }
      //   }else{
      //     presentDay = presentCycle.presentDay_0
      //   }
      //   //presentDay = presentCycle.presentDay
      // }
      if (cycle == 'present') {
        this.attendanceInputAPIRecordsUIData[rowIndex].presentDay = presentDay.toFixed(2);
        this.getPresentCyclePresentDayTotal()
      }
      if (cycle == 'future') {
        this.attendanceInputGetAPIFuturecyclesData[rowIndex].presentDay = presentDay.toFixed(2);
        this.getFutureCyclePresentDayTotal()
      }
      if (cycle == 'previous') {
        this.attendanceInputGetAPIPreviouscycleData[rowIndex].presentDay = presentDay.toFixed(2);
        this.getPreviousCyclePresentDayTotal()
      }
      return presentDay.toFixed(2);
    }
  }

  calculatePayableDays(presentCycle, rowIndex, cycle) {
    let payableDay;

    if (this.selectedEmpData[this.index]) {
      if (this.defaultAttendace == '1') {
        if (cycle == 'present') {
          //presentCycle.pertainingCycle == presentCycle.processingCycle
          if (this.selectedEmpData[this.index].cycleName == this.selectedEmpData[this.index].currentcycleName) {
            payableDay = 1 - (parseFloat(presentCycle.leaveWithoutPay) + parseFloat(presentCycle.leaveWithoutPay_0) + parseFloat(presentCycle.adjustment));
          } else {
            payableDay = 0 - (parseFloat(presentCycle.leaveWithoutPay) + parseFloat(presentCycle.leaveWithoutPay_0) + parseFloat(presentCycle.adjustment));
          }
        }
        else if (cycle == 'future') {
          if (this.selectedEmpData[this.index].cycleName == this.selectedEmpData[this.index].currentcycleName) {
            payableDay = 1 - (parseFloat(presentCycle.leaveWithoutPay) + parseFloat(presentCycle.leaveWithoutPay_0) + parseFloat(presentCycle.adjustment));
          } else {
            payableDay = 0 - (parseFloat(presentCycle.leaveWithoutPay) + parseFloat(presentCycle.leaveWithoutPay_0) + parseFloat(presentCycle.adjustment));
          }
        } else if (cycle == 'previous') {
          if (this.selectedEmpData[this.index].cycleName == this.selectedEmpData[this.index].currentcycleName) {
            payableDay = 1 - (parseFloat(presentCycle.leaveWithoutPay) + parseFloat(presentCycle.leaveWithoutPay_0) + parseFloat(presentCycle.adjustment));
          } else {
            payableDay = 0 - (parseFloat(presentCycle.leaveWithoutPay) + parseFloat(presentCycle.leaveWithoutPay_0) + parseFloat(presentCycle.adjustment));
          }
        }
      } else {
        if (cycle == 'present') {
          if (this.selectedEmpData[this.index].cycleName == this.selectedEmpData[this.index].currentcycleName) {
            payableDay = 1 - (parseFloat(presentCycle.leaveWithoutPay) + parseFloat(presentCycle.leaveWithoutPay_0) + parseFloat(presentCycle.adjustment));
          } else {
            payableDay = 0 - (parseFloat(presentCycle.leaveWithoutPay) + parseFloat(presentCycle.leaveWithoutPay_0) + parseFloat(presentCycle.adjustment));
          }
        }
        else if (cycle == 'future') {
          if (this.selectedEmpData[this.index].cycleName == this.selectedEmpData[this.index].currentcycleName) {
            payableDay = 1 - (parseFloat(presentCycle.leaveWithoutPay) + parseFloat(presentCycle.leaveWithoutPay_0) + parseFloat(presentCycle.adjustment));
          } else {
            payableDay = presentCycle.paidDays
            //payableDay = 1 - (parseFloat(presentCycle.leaveWithoutPay) + parseFloat(presentCycle.leaveWithoutPay_0) + parseFloat(presentCycle.adjustment));
          }
        } else if (cycle == 'previous') {
          if (this.selectedEmpData[this.index].cycleName == this.selectedEmpData[this.index].currentcycleName) {
            payableDay = 1 - (parseFloat(presentCycle.leaveWithoutPay) + parseFloat(presentCycle.leaveWithoutPay_0) + parseFloat(presentCycle.adjustment));
          } else {
            payableDay = 1 - (parseFloat(presentCycle.leaveWithoutPay) + parseFloat(presentCycle.leaveWithoutPay_0) + parseFloat(presentCycle.adjustment));
            // payableDay = 0 - (parseFloat(presentCycle.presentDay_0)  + parseFloat(presentCycle.adjustment));
          }
        }
        //payableDay = presentCycle.paidDays
      }

      if (cycle == 'present') {
        this.attendanceInputAPIRecordsUIData[rowIndex].paidDays = payableDay;
        this.getPresentCyclePaybleDaysTotal()
      }
      if (cycle == 'future') {
        this.attendanceInputGetAPIFuturecyclesData[rowIndex].paidDays = payableDay;
        this.getFutureCyclePaybleDaysTotal()
      }
      if (cycle == 'previous') {
        this.attendanceInputGetAPIPreviouscycleData[rowIndex].paidDays = payableDay;
        this.getPreviousCyclePaybleDaysTotal()
      }
      return payableDay.toFixed(2);
    }


  }


  calculateLOP(presentCycle, rowIndex, cycle) {
    let LOP
    // if (this.selectedEmpData[this.index]) {
    //   if (this.selectedEmpData[this.index].cycleName == this.selectedEmpData[this.index].currentcycleName) {
    //     if(this.defaultAttendace == 0){

    //      // LOP = 1 - (parseFloat(presentCycle.weeklyOff) + parseFloat(presentCycle.holiday) + parseFloat(presentCycle.paidLeaves) + parseFloat(presentCycle.presentDay_0) + parseFloat(presentCycle.adjustment))
    //      LOP = presentCycle.leaveWithoutPay_0
    //     }else{

    //       //LOP = 1 - (parseFloat(presentCycle.weeklyOff) + parseFloat(presentCycle.holiday) + parseFloat(presentCycle.paidLeaves) + parseFloat(presentCycle.presentDay_0) + parseFloat(presentCycle.adjustment))
    //       LOP = presentCycle.leaveWithoutPay
    //     }

    //   } else {

    //     if(this.defaultAttendace == 1){
    //       LOP = presentCycle.leaveWithoutPay


    //     }else{
    //       LOP = 0 - (parseFloat(presentCycle.weeklyOff) + parseFloat(presentCycle.holiday) + parseFloat(presentCycle.paidLeaves) + parseFloat(presentCycle.presentDay_0) + parseFloat(presentCycle.adjustment))
    //       //LOP = presentCycle.leaveWithoutPay
    //     }
    //     //payableDay = presentCycle.paidDays
    //   }
    //   if (cycle == 'present') {
    //     this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay_0 = LOP;
    //     this.getPresentCycleLeaveWithoutPayTotal()
    //   }
    //   if (cycle == 'future') {
    //     this.attendanceInputGetAPIFuturecyclesData[rowIndex].leaveWithoutPay_0 = LOP.toFixed(2);
    //     this.getFutureCycleLeaveWithoutPayTotal()
    //   }
    //   if (cycle == 'previous') {
    //     this.attendanceInputGetAPIPreviouscycleData[rowIndex].leaveWithoutPay_0 = LOP.toFixed(2);
    //     this.getPreviousCycleLeaveWithoutPayTotal()
    //   }

    //   return LOP.toFixed(2);
    // }


    if (this.selectedEmpData[this.index]) {
      if (this.defaultAttendace == '0') {
        if (cycle == 'present') {
          if (presentCycle.pertainingCycle == presentCycle.processingCycle) {
            LOP = 1 - (parseFloat(presentCycle.weeklyOff) + parseFloat(presentCycle.holiday) + parseFloat(presentCycle.paidLeaves) + parseFloat(presentCycle.presentDay_0) + parseFloat(presentCycle.adjustment))
          } else {
            LOP = presentCycle.leaveWithoutPay_0
            //LOP = 0 - (parseFloat(presentCycle.weeklyOff) + parseFloat(presentCycle.holiday) + parseFloat(presentCycle.paidLeaves) + parseFloat(presentCycle.presentDay_0) + parseFloat(presentCycle.adjustment))
          }
        }
        else if (cycle == 'future') {
          if (presentCycle.pertainingCycle == presentCycle.processingCycle) {
            LOP = 1 - (parseFloat(presentCycle.weeklyOff) + parseFloat(presentCycle.holiday) + parseFloat(presentCycle.paidLeaves) + parseFloat(presentCycle.presentDay_0) + parseFloat(presentCycle.adjustment))
          } else {
            LOP = 0 - (parseFloat(presentCycle.weeklyOff) + parseFloat(presentCycle.holiday) + parseFloat(presentCycle.paidLeaves) + parseFloat(presentCycle.presentDay_0) + parseFloat(presentCycle.adjustment))
          }
        } else if (cycle == 'previous') {
          if (presentCycle.pertainingCycle == presentCycle.processingCycle) {
            LOP = 1 - (parseFloat(presentCycle.weeklyOff) + parseFloat(presentCycle.holiday) + parseFloat(presentCycle.paidLeaves) + parseFloat(presentCycle.presentDay_0) + parseFloat(presentCycle.adjustment))
          } else {
            LOP = 1 - (parseFloat(presentCycle.weeklyOff) + parseFloat(presentCycle.holiday) + parseFloat(presentCycle.paidLeaves) + parseFloat(presentCycle.presentDay_0) + parseFloat(presentCycle.adjustment))
          }
        }
      } else {
        LOP = presentCycle.leaveWithoutPay
      }

      if (cycle == 'present') {
        this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay_0 = LOP;
        this.getPresentCycleLeaveWithoutPayTotal()
      }
      if (cycle == 'future') {
        this.attendanceInputGetAPIFuturecyclesData[rowIndex].leaveWithoutPay_0 = LOP.toFixed(2);
        this.getFutureCycleLeaveWithoutPayTotal()
      }
      if (cycle == 'previous') {
        this.attendanceInputGetAPIPreviouscycleData[rowIndex].leaveWithoutPay_0 = LOP.toFixed(2);
        this.getPreviousCycleLeaveWithoutPayTotal()
      }

      return LOP.toFixed(2);
    }

  }

  getCurrentPresentDay(Presentdayvalue, presentcycle, rowIndex) {
    this.attendanceInputAPIRecordsUIData[rowIndex].presentDay_0 = 0
    if (Presentdayvalue != '') {
      let presentday: any;
      if (this.selectedEmpData[this.index].cycleName != this.selectedEmpData[this.index].currentcycleName) {
        // if(parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay) < parseFloat(leaveWithoutPayvalue)){
        this.presentDay_0 = parseFloat(Presentdayvalue) - parseFloat(this.tempAttendancePresentData[rowIndex].presentDay_0)
        // }else{
        //   leaveWithoutPay = parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay) - parseFloat(leaveWithoutPayvalue)
        // }
      } else {
        this.presentDay_0 = Presentdayvalue
      }
      // this.presentDay_0 = presentday;
      if (this.attendanceSaveData.length > 0) {
        this.attendanceSaveData.forEach((element, index) => {
          if (element.attendanceInputId == presentcycle.attendanceInputId) {
            let ind = index;
            let totalLeaves = parseFloat(element.weeklyOff) + parseFloat(element.holiday) + parseFloat(element.paidLeaves) + parseFloat(this.presentDay_0)
            console.log("total leaves in presnt: " + totalLeaves)
            if (totalLeaves <= 1) {
              this.attendanceSaveData.splice(ind, 1, {
                "attendanceInputId": presentcycle.attendanceInputId,
                "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
                "payrollAreaCode": this.payrollareaCode,
                "date": presentcycle.date + ' 00:00:00',
                "paidLeaves": parseFloat(element.paidLeaves),
                "weeklyOff": parseFloat(element.weeklyOff),
                "holiday": parseFloat(element.holiday),
                "leaveWithoutPay": parseFloat(element.leaveWithoutPay),
                "presentDay_0": parseFloat(this.presentDay_0),
                "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
              })
              this.attendanceInputAPIRecordsUIData[rowIndex].presentDay_0 = parseFloat(this.presentDay_0)
            } else {
              this.toster.warning("", "You can not exceed the leave count more then one")
              //presentday = 0.0
              this.attendanceInputAPIRecordsUIData[rowIndex].presentDay_0 = "0.00"
            }
          }
          else {
            let length = this.attendanceSaveData.length - 1
            if (this.attendanceSaveData[length].attendanceInputId == presentcycle.attendanceInputId) { return; }
            else {
              this.attendanceSaveData.push({
                "attendanceInputId": presentcycle.attendanceInputId,
                "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
                "payrollAreaCode": this.payrollareaCode,
                "date": presentcycle.date + ' 00:00:00',
                "paidLeaves": 0,
                "weeklyOff": 0,
                "holiday": 0,
                "leaveWithoutPay": parseFloat(element.leaveWithoutPay),
                "presentDay_0": parseFloat(this.presentDay_0),
                "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
              })
            }
            this.attendanceInputAPIRecordsUIData[rowIndex].presentDay_0 = parseFloat(this.presentDay_0)
          }
        });
      } else {
        let totalLeaves = parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].weeklyOff) + parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].holiday) + parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].paidLeaves) + parseFloat(this.presentDay_0)
        console.log("total presentDay: " + totalLeaves)
        if (totalLeaves <= 1) {
          this.attendanceSaveData.push({
            "attendanceInputId": presentcycle.attendanceInputId,
            "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
            "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
            "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
            // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
            "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
            "payrollAreaCode": this.payrollareaCode,
            "date": presentcycle.date + ' 00:00:00',
            "paidLeaves": this.attendanceInputAPIRecordsUIData[rowIndex].paidLeaves,
            "weeklyOff": this.attendanceInputAPIRecordsUIData[rowIndex].weeklyOff,
            "holiday": this.attendanceInputAPIRecordsUIData[rowIndex].holiday,
            "leaveWithoutPay": 0,
            "presentDay_0": parseFloat(this.presentDay_0),
            "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
          })
          this.attendanceInputAPIRecordsUIData[rowIndex].presentDay_0 = parseFloat(this.presentDay_0)
        } else {
          this.toster.warning("", "You can not exceed the leave count more then one")
          //this.presentDay_0 = 0.0
          this.attendanceInputAPIRecordsUIData[rowIndex].presentDay_0 = "0.00"

        }
      }

      console.log("this.leaveWithoutPay: " + JSON.stringify(this.attendanceSaveData))
      this.getPresentCycleLeaveWithoutPayTotal();
    }
  }

  /** Calculate current cycle weekly off  */
  getPresentCycleWeeklyOffTotal() {
    let total = 0.0
    this.attendanceInputAPIRecordsUIData.forEach(element => {
      total = total + parseFloat(element.weeklyOff)

    });
    return total.toFixed(2);
  }

  /** Calculate current cycle weekly off  */
  getPresentCycleHolidayTotal() {
    let total = 0.0
    this.attendanceInputAPIRecordsUIData.forEach(element => {
      total = total + parseFloat(element.holiday)

    });
    return total.toFixed(2);
  }

  /** Calculate current cycle weekly off  */
  getPresentCycleLeaveTotal() {
    let total = 0.0
    this.attendanceInputAPIRecordsUIData.forEach(element => {
      total = total + parseFloat(element.paidLeaves)

    });
    return total.toFixed(2);
  }

  /** Calculate current cycle weekly off  */
  getPresentCycleLeaveWithoutPayTotal() {
    let total = 0.0
    if (this.defaultAttendace == '1') {
      this.attendanceInputAPIRecordsUIData.forEach(element => {
        total = total + parseFloat(element.leaveWithoutPay)
      });
    } else {
      this.attendanceInputAPIRecordsUIData.forEach(element => {
        total = total + parseFloat(element.leaveWithoutPay_0)
      });
    }
    return total.toFixed(2);
  }

  getPresentCyclePresentDayTotal() {
    let total = 0.0
    if (this.defaultAttendace == '0') {
      this.attendanceInputAPIRecordsUIData.forEach(element => {
        total = total + parseFloat(element.presentDay_0)

      });
    } else {
      this.attendanceInputAPIRecordsUIData.forEach(element => {
        total = total + parseFloat(element.presentDay)

      });
    }
    return total.toFixed(2);
  }

  getPresentCycleAdjTotal() {
    let total = 0.0
    this.attendanceInputAPIRecordsUIData.forEach(element => {
      total = total + parseFloat(element.adjustment)

    });
    return total.toFixed(2);
  }

  getPresentCyclePaybleDaysTotal() {
    let total: any = 0.0
    this.attendanceInputAPIRecordsUIData.forEach(element => {
      total = total + parseFloat(element.paidDays)
    });
    return total.toFixed(2);
  }

  // ****************************Current Cycle Functions Ends******************************************

  // **********************************Future cycle history function starts****************************
  attendanceInputGetHistoryfuturecycle(data) {
    console.log("data is: " + JSON.stringify(data))
    const formData = new FormData();


    formData.append('employeeMasterId', this.selectedEmpData[this.index].employeeMasterId)
    formData.append('processingCycle', data.processingCycle)
    formData.append('pertainingCycle', data.pertainingCycle)
    formData.append('payrollAreaCode', data.payrollAreaCode)
    formData.append('attendanceToDate', data.date + ' 00:00:00')


    this.attendanceService.attendanceInputGetHistoryfuturecycle(formData).subscribe(
      res => {
        this.attendanceInputGetHistoryfuturecyclesData = res.data.results;
      }
    )
  }

  // ****************************Future Cycle Functions Starts******************************************

  /** Set Leave data for Holiday leave - Future Cycle */
  getFutureHoliday(holidayvalue, futureCycle, rowIndex) {
    //this.attendanceInputGetHistoryfuturecycle(futureCycle)
    const formData = new FormData()

    formData.append('employeeMasterId', this.selectedEmpData[this.index].employeeMasterId)
    formData.append('processingCycle', futureCycle.processingCycle)
    formData.append('pertainingCycle', futureCycle.pertainingCycle)
    formData.append('payrollAreaCode', futureCycle.payrollAreaCode)
    formData.append('attendanceToDate', futureCycle.date + ' 00:00:00')


    this.attendanceService.attendanceInputGetHistoryfuturecycle(formData).subscribe(
      res => {
        this.attendanceInputGetHistoryfuturecyclesData = res.data.results;

        if (holidayvalue != '') {
          this.attendanceInputGetAPIFuturecyclesData[rowIndex].holiday = 0
          let tempAttendanceFutureData = JSON.parse(localStorage.getItem('tempAttendanceFutureData'))
          let holiday: any;
          if (this.selectedEmpData[this.index].cycleName != this.selectedEmpData[this.index].currentcycleName) {
            // if(parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].holiday) < parseFloat(holidayvalue)){
              if(this.attendanceInputGetHistoryfuturecyclesData != null || this.attendanceInputGetHistoryfuturecyclesData != ''){
                holiday = parseFloat(holidayvalue) - parseFloat(this.attendanceInputGetHistoryfuturecyclesData[0].holiday)
              }else{
                holiday = parseFloat(holidayvalue) - parseFloat(tempAttendanceFutureData[rowIndex].holiday)
              }

            holiday = holiday.toFixed(2)
            // }else{
            //   holiday = parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].holiday) - parseFloat(holidayvalue)
            // }
          } else {
            holiday = holidayvalue
          }
          if (this.attendanceSaveData.length > 0) {
            this.attendanceSaveData.forEach((element, index) => {
              // alert( presentcycle.attendanceInputId)
              if (element.attendanceInputId == futureCycle.attendanceInputId) {
                let ind = index;
                let totalLeaves
                if (this.defaultAttendace == '1') {
                  totalLeaves = parseFloat(element.paidLeaves) + parseFloat(element.weeklyOff) + parseFloat(element.leaveWithoutPay) + parseFloat(holiday)
                  this.leaveWithoutPay = this.attendanceInputGetAPIFuturecyclesData[rowIndex].leaveWithoutPay
                } else {
                  totalLeaves = parseFloat(element.paidLeaves) + parseFloat(element.weeklyOff) + parseFloat(element.presentDay_0) + parseFloat(holiday)
                  this.leaveWithoutPay = 0
                }
                console.log("holiday ele: " + totalLeaves)
                if (totalLeaves <= 1) {

                  this.attendanceSaveData.splice(ind, 1, {
                    "attendanceInputId": futureCycle.attendanceInputId,
                    "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                    "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                    "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                    // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                    "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
                    "payrollAreaCode": this.payrollareaCode,
                    "date": futureCycle.date + ' 00:00:00',
                    "paidLeaves": element.paidLeaves,
                    "weeklyOff": element.weeklyOff,
                    "holiday": parseFloat(holiday),
                    "leaveWithoutPay": element.leaveWithoutPay,
                    "presentDay_0": element.presentDay_0,
                    "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)

                  })
                  this.attendanceInputGetAPIFuturecyclesData[rowIndex].holiday = holiday
                } else {
                  this.toster.warning("", "You can not exceed the leave count more then one")
                  holiday = 0.00
                  this.attendanceInputGetAPIFuturecyclesData[rowIndex].holiday = '0.00'
                }
              }
              else {
                // alert('here')
                let length = this.attendanceSaveData.length - 1
                if (this.attendanceSaveData[length].attendanceInputId == futureCycle.attendanceInputId) { return; }
                else {

                  this.attendanceSaveData.push({
                    "attendanceInputId": futureCycle.attendanceInputId,
                    "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                    "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                    "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                    // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                    "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
                    "payrollAreaCode": this.payrollareaCode,
                    "date": futureCycle.date + ' 00:00:00',
                    "paidLeaves": 0,
                    "weeklyOff": 0,
                    "holiday": parseFloat(holiday),
                    "leaveWithoutPay": 0,
                    "presentDay_0": futureCycle.presentDay_0,
                    "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
                  })
                }
                this.attendanceInputGetAPIFuturecyclesData[rowIndex].holiday = holiday
              }
            });
          }
          else {
            let totalLeaves;
            if (this.defaultAttendace == '1') {
              totalLeaves = parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].paidLeaves) + parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].weeklyOff) + parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].leaveWithoutPay) + parseFloat(holiday)
              this.leaveWithoutPay = this.attendanceInputGetAPIFuturecyclesData[rowIndex].leaveWithoutPay
            } else {
              totalLeaves = parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].paidLeaves) + parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].weeklyOff) + parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].presentDay_0) + parseFloat(holiday)
              this.leaveWithoutPay = 0
            }
            console.log("holiday else: " + totalLeaves)
            if (totalLeaves <= 1) {
              this.attendanceSaveData.push({
                "attendanceInputId": futureCycle.attendanceInputId,
                "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
                "payrollAreaCode": this.payrollareaCode,
                "date": futureCycle.date + ' 00:00:00',
                "paidLeaves": this.attendanceInputGetAPIFuturecyclesData[rowIndex].paidLeaves,
                "weeklyOff": this.attendanceInputGetAPIFuturecyclesData[rowIndex].weeklyOff,
                "holiday": parseFloat(holiday),
                "leaveWithoutPay": this.leaveWithoutPay,
                "presentDay_0": this.attendanceInputGetAPIFuturecyclesData[rowIndex].presentDay_0,
                "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
              })
              this.attendanceInputGetAPIFuturecyclesData[rowIndex].holiday = holiday
            } else {
              this.toster.warning("", "You can not exceed the leave count more then one")
              holiday = 0.0
              this.attendanceInputGetAPIFuturecyclesData[rowIndex].holiday = '0.00'

            }
          }
          this.getFutureCycleHolidayTotal()

          console.log("this.holiday: " + JSON.stringify(this.attendanceSaveData))
        }

      })

  }


  /** Set Leave data for Weekly leave - Future Cycle */
  getFutureWeeklyOff(weeklyOffvalue, futureCycle, rowIndex) {
    const formData = new FormData()

    formData.append('employeeMasterId', this.selectedEmpData[this.index].employeeMasterId)
    formData.append('processingCycle', futureCycle.processingCycle)
    formData.append('pertainingCycle', futureCycle.pertainingCycle)
    formData.append('payrollAreaCode', futureCycle.payrollAreaCode)
    formData.append('attendanceToDate', futureCycle.date + ' 00:00:00')


    this.attendanceService.attendanceInputGetHistoryfuturecycle(formData).subscribe(
      res => {
        this.attendanceInputGetHistoryfuturecyclesData = res.data.results;
        if (weeklyOffvalue != '') {
          this.attendanceInputGetAPIFuturecyclesData[rowIndex].weeklyOff = 0
          let tempAttendanceFutureData = JSON.parse(localStorage.getItem('tempAttendanceFutureData'))
          let weeklyOff: any;
          // alert(tempAttendanceFutureData[rowIndex].weeklyOff)
          if (this.selectedEmpData[this.index].cycleName != this.selectedEmpData[this.index].currentcycleName) {
            // if(parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].weeklyOff) < parseFloat(weeklyOffvalue)){
            if(this.attendanceInputGetHistoryfuturecyclesData != null || this.attendanceInputGetHistoryfuturecyclesData != ''){
              weeklyOff = parseFloat(weeklyOffvalue) - parseFloat(this.attendanceInputGetHistoryfuturecyclesData[0].weeklyOff)
            }else{
              weeklyOff = parseFloat(weeklyOffvalue) - parseFloat(tempAttendanceFutureData[rowIndex].weeklyOff)
            }
            weeklyOff = weeklyOff.toFixed(2)
            // }else{
            //   weeklyOff = parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].weeklyOff) - parseFloat(weeklyOffvalue)
            // }
          } else {
            weeklyOff = weeklyOffvalue
          }
          //alert(weeklyOff)
          if (this.attendanceSaveData.length > 0) {
            this.attendanceSaveData.forEach((element, index) => {
              if (element.attendanceInputId == futureCycle.attendanceInputId) {
                let ind = index;
                let totalLeaves;
                if (this.defaultAttendace == '1') {
                  totalLeaves = parseFloat(element.paidLeaves) + parseFloat(element.holiday) + parseFloat(element.leaveWithoutPay) + parseFloat(weeklyOff)
                  this.leaveWithoutPay = this.attendanceInputGetAPIFuturecyclesData[rowIndex].leaveWithoutPay
                } else {
                  totalLeaves = parseFloat(element.paidLeaves) + parseFloat(element.holiday) + parseFloat(element.presentDay_0) + parseFloat(weeklyOff)
                  this.leaveWithoutPay = 0
                }
                console.log("weeklyoff future total: " + totalLeaves)
                //let totalLeaves = element.paidLeaves + element.holiday + element.leaveWithoutPay + parseFloat(weeklyOff)
                if (totalLeaves <= 1) {
                  this.attendanceSaveData.splice(ind, 1, {
                    "attendanceInputId": futureCycle.attendanceInputId,
                    "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                    "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                    "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                    // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                    "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
                    "payrollAreaCode": this.payrollareaCode,
                    "date": futureCycle.date + ' 00:00:00',
                    "paidLeaves": parseFloat(element.paidLeaves),
                    "weeklyOff": parseFloat(weeklyOff),
                    "holiday": parseFloat(element.holiday),
                    "leaveWithoutPay": parseFloat(element.leaveWithoutPay),
                    "presentDay_0": this.presentDay_0,
                    "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
                  })
                  this.attendanceInputGetAPIFuturecyclesData[rowIndex].weeklyOff = weeklyOff
                } else {
                  this.toster.warning("", "You can not exceed the leave count more then one")
                  weeklyOff = 0.0
                  this.attendanceInputGetAPIFuturecyclesData[rowIndex].weeklyOff = '0.00'
                }
              }
              else {
                let length = this.attendanceSaveData.length - 1
                if (this.attendanceSaveData[length].attendanceInputId == futureCycle.attendanceInputId) { return; }
                else {
                  this.attendanceSaveData.push({
                    "attendanceInputId": futureCycle.attendanceInputId,
                    "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                    "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                    "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                    // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                    "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
                    "payrollAreaCode": this.payrollareaCode,
                    "date": futureCycle.date + ' 00:00:00',
                    "paidLeaves": 0,
                    "weeklyOff": parseFloat(weeklyOff),
                    "holiday": 0,
                    "leaveWithoutPay": 0,
                    "presentDay_0": this.presentDay_0,
                    "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
                  })
                }
                this.attendanceInputGetAPIFuturecyclesData[rowIndex].weeklyOff = weeklyOff
              }
            });
          } else {
            let totalLeaves;
            if (this.defaultAttendace == '1') {
              totalLeaves = parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].paidLeaves) + parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].holiday) + parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].leaveWithoutPay) + parseFloat(weeklyOff)
              this.leaveWithoutPay = this.attendanceInputGetAPIFuturecyclesData[rowIndex].leaveWithoutPay
            } else {
              totalLeaves = parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].paidLeaves) + parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].holiday) + parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].presentDay_0) + parseFloat(weeklyOff)
              this.leaveWithoutPay = 0
            }
            console.log("weeklyoff future total1: " + totalLeaves)
            // let totalLeaves = this.attendanceInputGetAPIFuturecyclesData[rowIndex].paidLeaves + this.attendanceInputGetAPIFuturecyclesData[rowIndex].holiday + this.attendanceInputGetAPIFuturecyclesData[rowIndex].leaveWithoutPay + parseFloat(weeklyOff)
            console.log("total wweklyoff: " + totalLeaves)
            if (totalLeaves <= 1) {
              this.attendanceSaveData.push({
                "attendanceInputId": futureCycle.attendanceInputId,
                "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
                "payrollAreaCode": this.payrollareaCode,
                "date": futureCycle.date + ' 00:00:00',
                "paidLeaves": this.attendanceInputGetAPIFuturecyclesData[rowIndex].paidLeaves,
                "weeklyOff": parseFloat(weeklyOff),
                "holiday": this.attendanceInputGetAPIFuturecyclesData[rowIndex].holiday,
                "leaveWithoutPay": this.leaveWithoutPay,
                "presentDay_0": this.presentDay_0,
                "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
              })
              this.attendanceInputGetAPIFuturecyclesData[rowIndex].weeklyOff = weeklyOff
            } else {
              this.toster.warning("", "You can not exceed the leave count more then one")
              weeklyOff = 0.0
              this.attendanceInputGetAPIFuturecyclesData[rowIndex].weeklyOff = '0.00'

            }
          }

          console.log("this.weeklyOff: " + JSON.stringify(this.attendanceSaveData))
          this.getFutureCycleWeeklyOffTotal();
        }
      })
  }

  /** Set Leave data for Paid leave - Future Cycle */
  getFuturePaidLeaves(paidLeavesvalue, futureCycle, rowIndex) {
    const formData = new FormData()

    formData.append('employeeMasterId', this.selectedEmpData[this.index].employeeMasterId)
    formData.append('processingCycle', futureCycle.processingCycle)
    formData.append('pertainingCycle', futureCycle.pertainingCycle)
    formData.append('payrollAreaCode', futureCycle.payrollAreaCode)
    formData.append('attendanceToDate', futureCycle.date + ' 00:00:00')


    this.attendanceService.attendanceInputGetHistoryfuturecycle(formData).subscribe(
      res => {
        this.attendanceInputGetHistoryfuturecyclesData = res.data.results;
        if (paidLeavesvalue != '') {
          this.attendanceInputGetAPIFuturecyclesData[rowIndex].paidLeaves = 0
          let tempAttendanceFutureData = JSON.parse(localStorage.getItem('tempAttendanceFutureData'))
          let paidLeaves: any;
          if (this.selectedEmpData[this.index].cycleName != this.selectedEmpData[this.index].currentcycleName) {
            // if(parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].paidLeaves) < parseFloat(paidLeavesvalue)){
              if(this.attendanceInputGetHistoryfuturecyclesData != null || this.attendanceInputGetHistoryfuturecyclesData != ''){
                paidLeaves = parseFloat(paidLeavesvalue) - parseFloat(this.attendanceInputGetHistoryfuturecyclesData[0].paidLeaves)

              }else{
                paidLeaves = parseFloat(paidLeavesvalue) - parseFloat(tempAttendanceFutureData[rowIndex].paidLeaves)
              }
            paidLeaves = paidLeaves.toFixed(2)
            // }else{
            //   paidLeaves = parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].paidLeaves) - parseFloat(paidLeavesvalue)
            // }
          } else {
            paidLeaves = paidLeavesvalue
          }
          if (this.attendanceSaveData.length > 0) {
            this.attendanceSaveData.forEach((element, index) => {
              if (element.attendanceInputId == futureCycle.attendanceInputId) {
                let ind = index;
                let totalLeaves;
                if (this.defaultAttendace == '1') {
                  totalLeaves = parseFloat(element.holiday) + parseFloat(element.weeklyOff) + parseFloat(element.leaveWithoutPay) + parseFloat(paidLeaves)
                  this.leaveWithoutPay = this.attendanceInputGetAPIFuturecyclesData[rowIndex].leaveWithoutPay

                } else {
                  totalLeaves = parseFloat(element.holiday) + parseFloat(element.weeklyOff) + parseFloat(element.presentDay_0) + parseFloat(paidLeaves)
                  this.leaveWithoutPay = 0
                }
                // let totalLeaves = element.weeklyOff + element.holiday + element.leaveWithoutPay + parseFloat(paidLeaves)
                if (totalLeaves <= 1) {
                  this.attendanceSaveData.splice(ind, 1, {
                    "attendanceInputId": futureCycle.attendanceInputId,
                    "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                    "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                    "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                    // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                    "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
                    "payrollAreaCode": this.payrollareaCode,
                    "date": futureCycle.date + ' 00:00:00',
                    "paidLeaves": parseFloat(paidLeaves),
                    "weeklyOff": parseFloat(element.weeklyOff),
                    "holiday": parseFloat(element.holiday),
                    "leaveWithoutPay": parseFloat(element.leaveWithoutPay),
                    "presentDay_0": this.presentDay_0,
                    "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
                  })
                  this.attendanceInputGetAPIFuturecyclesData[rowIndex].paidLeaves = paidLeaves
                } else {
                  this.toster.warning("", "You can not exceed the leave count more then one")
                  paidLeaves = 0.0
                  this.attendanceInputGetAPIFuturecyclesData[rowIndex].paidLeaves = '0.00'
                }
              }
              else {
                let length = this.attendanceSaveData.length - 1
                if (this.attendanceSaveData[length].attendanceInputId == futureCycle.attendanceInputId) { return; }
                else {
                  this.attendanceSaveData.push({
                    "attendanceInputId": futureCycle.attendanceInputId,
                    "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                    "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                    "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                    // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                    "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
                    "payrollAreaCode": this.payrollareaCode,
                    "date": futureCycle.date + ' 00:00:00',
                    "paidLeaves": parseFloat(paidLeaves),
                    "weeklyOff": 0,
                    "holiday": 0,
                    "leaveWithoutPay": 0,
                    "presentDay_0": this.presentDay_0,
                    "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
                  })
                }
                this.attendanceInputGetAPIFuturecyclesData[rowIndex].paidLeaves = paidLeaves
              }
            });
          } else {

            let totalLeaves;
            if (this.defaultAttendace == '1') {
              totalLeaves = parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].weeklyOff) + parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].holiday) + parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].leaveWithoutPay) + parseFloat(paidLeaves)
              this.leaveWithoutPay = this.attendanceInputGetAPIFuturecyclesData[rowIndex].leaveWithoutPay
            } else {
              totalLeaves = parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].weeklyOff) + parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].holiday) + parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].presentDay_0) + parseFloat(paidLeaves)
              this.leaveWithoutPay = 0
            }
            // let totalLeaves = this.attendanceInputGetAPIFuturecyclesData[rowIndex].weeklyOff + this.attendanceInputGetAPIFuturecyclesData[rowIndex].holiday + this.attendanceInputGetAPIFuturecyclesData[rowIndex].leaveWithoutPay + parseFloat(paidLeaves)
            console.log("total wweklyoff: " + totalLeaves)
            if (totalLeaves <= 1) {
              this.attendanceSaveData.push({
                "attendanceInputId": futureCycle.attendanceInputId,
                "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
                "payrollAreaCode": this.payrollareaCode,
                "date": futureCycle.date + ' 00:00:00',
                "paidLeaves": parseFloat(paidLeaves),
                "weeklyOff": this.attendanceInputGetAPIFuturecyclesData[rowIndex].weeklyOff,
                "holiday": this.attendanceInputGetAPIFuturecyclesData[rowIndex].holiday,
                "leaveWithoutPay": this.leaveWithoutPay,
                "presentDay_0": this.presentDay_0,
                "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
              })
              this.attendanceInputGetAPIFuturecyclesData[rowIndex].paidLeaves = paidLeaves
            } else {
              this.toster.warning("", "You can not exceed the leave count more then one")
              paidLeaves = 0.0
              this.attendanceInputGetAPIFuturecyclesData[rowIndex].paidLeaves = '0.00'

            }
          }

          console.log("this.paidLeaves: " + JSON.stringify(this.attendanceSaveData))
          this.getFutureCycleLeaveTotal();
        }
      })
  }


  /** Set Leave data for Paid leave - Future Cycle */
  getFutureLeaveWithoutPay(leaveWithoutPayvalue, futureCycle, rowIndex) {
    const formData = new FormData()

    formData.append('employeeMasterId', this.selectedEmpData[this.index].employeeMasterId)
    formData.append('processingCycle', futureCycle.processingCycle)
    formData.append('pertainingCycle', futureCycle.pertainingCycle)
    formData.append('payrollAreaCode', futureCycle.payrollAreaCode)
    formData.append('attendanceToDate', futureCycle.date + ' 00:00:00')


    this.attendanceService.attendanceInputGetHistoryfuturecycle(formData).subscribe(
      res => {
        this.attendanceInputGetHistoryfuturecyclesData = res.data.results;
        if (leaveWithoutPayvalue != '') {
          this.attendanceInputGetAPIFuturecyclesData[rowIndex].leaveWithoutPay = 0
          let tempAttendanceFutureData = JSON.parse(localStorage.getItem('tempAttendanceFutureData'))
          let leaveWithoutPay: any;
          if (this.selectedEmpData[this.index].cycleName != this.selectedEmpData[this.index].currentcycleName) {
            //if(parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].leaveWithoutPay) < parseFloat(leaveWithoutPayvalue)){
              if(this.attendanceInputGetHistoryfuturecyclesData != null || this.attendanceInputGetHistoryfuturecyclesData != ''){
                leaveWithoutPay = parseFloat(leaveWithoutPayvalue) - parseFloat(this.attendanceInputGetHistoryfuturecyclesData[0].leaveWithoutPay)

              }else{
                 leaveWithoutPay = parseFloat(leaveWithoutPayvalue) - parseFloat(tempAttendanceFutureData[rowIndex].leaveWithoutPay)
              }
            leaveWithoutPay = leaveWithoutPay.toFixed(2)
            //}else{
            //  leaveWithoutPay = parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].leaveWithoutPay) - parseFloat(leaveWithoutPayvalue)
            //}
          } else {
            leaveWithoutPay = leaveWithoutPayvalue
          }

          if (this.attendanceSaveData.length > 0) {
            this.attendanceSaveData.forEach((element, index) => {
              if (element.attendanceInputId == futureCycle.attendanceInputId) {
                let ind = index;
                let totalLeaves = parseFloat(element.weeklyOff) + parseFloat(element.holiday) + parseFloat(element.paidLeaves) + parseFloat(leaveWithoutPay)
                if (totalLeaves <= 1) {
                  this.attendanceSaveData.splice(ind, 1, {
                    "attendanceInputId": futureCycle.attendanceInputId,
                    "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                    "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                    "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                    // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                    "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
                    "payrollAreaCode": this.payrollareaCode,
                    "date": futureCycle.date + ' 00:00:00',
                    "paidLeaves": parseFloat(element.paidLeaves),
                    "weeklyOff": parseFloat(element.weeklyOff),
                    "holiday": parseFloat(element.holiday),
                    "leaveWithoutPay": parseFloat(leaveWithoutPay),
                    "presentDay_0": this.presentDay_0,
                    "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
                  })
                  this.attendanceInputGetAPIFuturecyclesData[rowIndex].leaveWithoutPay = leaveWithoutPay
                } else {
                  this.toster.warning("", "You can not exceed the leave count more then one")
                  leaveWithoutPay = 0.0
                  this.attendanceInputGetAPIFuturecyclesData[rowIndex].leaveWithoutPay = '0.00'
                }
              }
              else {
                let length = this.attendanceSaveData.length - 1
                if (this.attendanceSaveData[length].attendanceInputId == futureCycle.attendanceInputId) { return; }
                else {
                  this.attendanceSaveData.push({
                    "attendanceInputId": futureCycle.attendanceInputId,
                    "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                    "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                    "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                    // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                    "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
                    "payrollAreaCode": this.payrollareaCode,
                    "date": futureCycle.date + ' 00:00:00',
                    "paidLeaves": 0,
                    "weeklyOff": 0,
                    "holiday": 0,
                    "leaveWithoutPay": parseFloat(leaveWithoutPay),
                    "presentDay_0": this.presentDay_0,
                    "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
                  })
                }
                this.attendanceInputGetAPIFuturecyclesData[rowIndex].leaveWithoutPay = leaveWithoutPay
              }
            });
          } else {
            let totalLeaves = parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].weeklyOff) + parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].holiday) + parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].paidLeaves) + parseFloat(leaveWithoutPay)
            console.log("total wweklyoff: " + totalLeaves)
            if (totalLeaves <= 1) {
              this.attendanceSaveData.push({
                "attendanceInputId": futureCycle.attendanceInputId,
                "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
                "payrollAreaCode": this.payrollareaCode,
                "date": futureCycle.date + ' 00:00:00',
                "paidLeaves": this.attendanceInputGetAPIFuturecyclesData[rowIndex].paidLeaves,
                "weeklyOff": this.attendanceInputGetAPIFuturecyclesData[rowIndex].weeklyOff,
                "holiday": this.attendanceInputGetAPIFuturecyclesData[rowIndex].holiday,
                "leaveWithoutPay": parseFloat(leaveWithoutPay),
                "presentDay_0": this.presentDay_0,
                "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
              })
              this.attendanceInputGetAPIFuturecyclesData[rowIndex].leaveWithoutPay = leaveWithoutPay
            } else {
              this.toster.warning("", "You can not exceed the leave count more then one")
              leaveWithoutPay = 0.0
              this.attendanceInputGetAPIFuturecyclesData[rowIndex].leaveWithoutPay = '0.00'

            }
          }

          console.log("this.leaveWithoutPay: " + JSON.stringify(this.attendanceSaveData))
          this.getFutureCycleLeaveWithoutPayTotal();
        }
      })
  }


  getFuturePresentDay(Presentdayvalue, presentcycle, rowIndex) {
    const formData = new FormData()

    formData.append('employeeMasterId', this.selectedEmpData[this.index].employeeMasterId)
    formData.append('processingCycle', presentcycle.processingCycle)
    formData.append('pertainingCycle', presentcycle.pertainingCycle)
    formData.append('payrollAreaCode', presentcycle.payrollAreaCode)
    formData.append('attendanceToDate', presentcycle.date + ' 00:00:00')


    this.attendanceService.attendanceInputGetHistoryfuturecycle(formData).subscribe(
      res => {
        this.attendanceInputGetHistoryfuturecyclesData = res.data.results;

        if (Presentdayvalue != '') {
          this.attendanceInputGetAPIFuturecyclesData[rowIndex].presentDay_0 = 0
          let tempAttendanceFutureData = JSON.parse(localStorage.getItem('tempAttendanceFutureData'))
          let presentday: any;
          if (this.selectedEmpData[this.index].cycleName != this.selectedEmpData[this.index].currentcycleName) {
            // if(parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay) < parseFloat(leaveWithoutPayvalue)){
              if(this.attendanceInputGetHistoryfuturecyclesData != null || this.attendanceInputGetHistoryfuturecyclesData != ''){
                presentday = parseFloat(Presentdayvalue) - parseFloat(this.attendanceInputGetHistoryfuturecyclesData[0].presentDay_0)
              }else{
                presentday = parseFloat(Presentdayvalue) - parseFloat(tempAttendanceFutureData[rowIndex].presentDay_0)
              }
            presentday = presentday.toFixed(2)
            // }else{
            //   leaveWithoutPay = parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay) - parseFloat(leaveWithoutPayvalue)
            // }
          } else {
            presentday = Presentdayvalue
          }
          this.presentDay_0 = presentday;

          if (this.attendanceSaveData.length > 0) {
            this.attendanceSaveData.forEach((element, index) => {
              if (element.attendanceInputId == presentcycle.attendanceInputId) {
                let ind = index;
                let totalLeaves = parseFloat(element.weeklyOff) + parseFloat(element.holiday) + parseFloat(element.paidLeaves) + parseFloat(this.presentDay_0)
                if (totalLeaves <= 1) {
                  this.attendanceSaveData.splice(ind, 1, {
                    "attendanceInputId": presentcycle.attendanceInputId,
                    "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                    "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                    "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                    // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                    "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
                    "payrollAreaCode": this.payrollareaCode,
                    "date": presentcycle.date + ' 00:00:00',
                    "paidLeaves": parseFloat(element.paidLeaves),
                    "weeklyOff": parseFloat(element.weeklyOff),
                    "holiday": parseFloat(element.holiday),
                    "leaveWithoutPay": parseFloat(element.leaveWithoutPay),
                    "presentDay_0": parseFloat(this.presentDay_0),
                    "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
                  })
                  this.attendanceInputGetAPIFuturecyclesData[rowIndex].presentDay_0 = parseFloat(this.presentDay_0)
                } else {
                  this.toster.warning("", "You can not exceed the leave count more then one")
                  presentday = 0.0
                  this.attendanceInputGetAPIFuturecyclesData[rowIndex].presentDay_0 = '0.00'
                }
              }
              else {
                let length = this.attendanceSaveData.length - 1
                if (this.attendanceSaveData[length].attendanceInputId == presentcycle.attendanceInputId) { return; }
                else {
                  this.attendanceSaveData.push({
                    "attendanceInputId": presentcycle.attendanceInputId,
                    "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                    "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                    "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                    // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                    "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
                    "payrollAreaCode": this.payrollareaCode,
                    "date": presentcycle.date + ' 00:00:00',
                    "paidLeaves": 0,
                    "weeklyOff": 0,
                    "holiday": 0,
                    "leaveWithoutPay": parseFloat(element.leaveWithoutPay),
                    "presentDay_0": parseFloat(this.presentDay_0),
                    "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
                  })
                }
                this.attendanceInputGetAPIFuturecyclesData[rowIndex].presentDay_0 = parseFloat(this.presentDay_0)
              }
            });
          } else {
            let totalLeaves = parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].weeklyOff) + parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].holiday) + parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].paidLeaves) + parseFloat(this.presentDay_0)
            console.log("total wweklyoff: " + totalLeaves)
            if (totalLeaves <= 1) {
              this.attendanceSaveData.push({
                "attendanceInputId": presentcycle.attendanceInputId,
                "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
                "payrollAreaCode": this.payrollareaCode,
                "date": presentcycle.date + ' 00:00:00',
                "paidLeaves": this.attendanceInputGetAPIFuturecyclesData[rowIndex].paidLeaves,
                "weeklyOff": this.attendanceInputGetAPIFuturecyclesData[rowIndex].weeklyOff,
                "holiday": this.attendanceInputGetAPIFuturecyclesData[rowIndex].holiday,
                "leaveWithoutPay": 0,
                "presentDay_0": parseFloat(this.presentDay_0),
                "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
              })
              this.attendanceInputGetAPIFuturecyclesData[rowIndex].presentDay_0 = parseFloat(this.presentDay_0)
            } else {
              this.toster.warning("", "You can not exceed the leave count more then one")
              this.presentDay_0 = 0.0
              this.attendanceInputGetAPIFuturecyclesData[rowIndex].presentDay_0 = '0.00'

            }
          }

          // console.log("this.leaveWithoutPay: " + JSON.stringify(this.attendanceSaveData))
          this.getFutureCyclePresentDayTotal();

        }
      })
  }


  getFutureCycleWeeklyOffTotal() {
    let total = 0.0
    this.attendanceInputGetAPIFuturecyclesData.forEach(element => {
      total = total + parseFloat(element.weeklyOff)

    });
    return total.toFixed(2);
  }


  getFutureCycleHolidayTotal() {
    let total = 0.0
    this.attendanceInputGetAPIFuturecyclesData.forEach(element => {
      total = total + parseFloat(element.holiday)

    });
    return total.toFixed(2);
  }


  getFutureCycleLeaveTotal() {
    let total = 0.0
    this.attendanceInputGetAPIFuturecyclesData.forEach(element => {
      total = total + parseFloat(element.paidLeaves)

    });
    return total.toFixed(2);
  }


  getFutureCycleLeaveWithoutPayTotal() {
    let total = 0.0
    if (this.defaultAttendace == '1') {
      this.attendanceInputGetAPIFuturecyclesData.forEach(element => {

        total = total + parseFloat(element.leaveWithoutPay)

      });
    } else {
      this.attendanceInputGetAPIFuturecyclesData.forEach(element => {

        total = total + parseFloat(element.leaveWithoutPay_0)

      });
    }
    return total.toFixed(2);
  }

  getFutureCyclePresentDayTotal() {
    let total = 0.0
    if (this.defaultAttendace == '0') {
      this.attendanceInputGetAPIFuturecyclesData.forEach(element => {
        total = total + parseFloat(element.presentDay_0)

      });
    } else {
      this.attendanceInputGetAPIFuturecyclesData.forEach(element => {
        total = total + parseFloat(element.presentDay)

      });
    }
    return total.toFixed(2);
  }

  getFutureCycleAdjTotal() {
    let total = 0.0
    this.attendanceInputGetAPIFuturecyclesData.forEach(element => {
      total = total + parseFloat(element.adjustment)

    });
    return total.toFixed(2);
  }

  getFutureCyclePaybleDaysTotal() {
    let total = 0.0
    this.attendanceInputGetAPIFuturecyclesData.forEach(element => {
      total = total + parseFloat(element.paidDays)

    });
    return total.toFixed(2);
  }



  // **********************************Future Cycle Functions Ends***********************************************


  // **********************************Previous Cycle Functions Starts***********************************************

  /** Set Leave data for Holiday leave - Previous Cycle */
  getPreviousHoliday(holidayvalue, previousCycle, rowIndex) {
    if (holidayvalue != '') {
      this.attendanceInputGetAPIPreviouscycleData[rowIndex].holiday = 0
      let tempAttendancePresentData = JSON.parse(localStorage.getItem('tempAttendancePresentData'))
      let holiday: any;
      if (this.selectedEmpData[this.index].cycleName != this.selectedEmpData[this.index].currentcycleName) {
        // if(parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].holiday) < parseFloat(holidayvalue)){
        holiday = parseFloat(holidayvalue) - parseFloat(tempAttendancePresentData[rowIndex].holiday)
        holiday = holiday.toFixed(2)
        // }else{
        //   holiday = parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].holiday) - parseFloat(holidayvalue)
        // }
      } else {
        holiday = holidayvalue
      }
      if (this.attendanceSaveData.length > 0) {
        this.attendanceSaveData.forEach((element, index) => {
          // alert( presentcycle.attendanceInputId)
          if (element.attendanceInputId == previousCycle.attendanceInputId) {
            let ind = index;
            let totalLeaves
            if (this.defaultAttendace == '1') {
              totalLeaves = parseFloat(element.paidLeaves) + parseFloat(element.weeklyOff) + parseFloat(element.leaveWithoutPay) + parseFloat(holiday)
              this.leaveWithoutPay = this.attendanceInputGetAPIPreviouscycleData[rowIndex].leaveWithoutPay
            } else {
              totalLeaves = parseFloat(element.paidLeaves) + parseFloat(element.weeklyOff) + parseFloat(element.presentDay_0) + parseFloat(holiday)
              this.leaveWithoutPay = 0
            }
            // let totalLeaves = element.paidLeaves + element.weeklyOff + element.leaveWithoutPay + parseFloat(holiday)
            if (totalLeaves <= 1) {
              this.attendanceSaveData.splice(ind, 1, {
                "attendanceInputId": previousCycle.attendanceInputId,
                "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
                "payrollAreaCode": this.payrollareaCode,
                "date": previousCycle.date + ' 00:00:00',
                "paidLeaves": element.paidLeaves,
                "weeklyOff": element.weeklyOff,
                "holiday": parseFloat(holiday),
                "leaveWithoutPay": element.leaveWithoutPay,
                "presentDay_0": this.presentDay_0,
                "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)

              })
              this.attendanceInputGetAPIPreviouscycleData[rowIndex].holiday = holiday
            } else {
              this.toster.warning("", "You can not exceed the leave count more then one")
              holiday = 0.0
              this.attendanceInputGetAPIPreviouscycleData[rowIndex].holiday = '0.00'
            }
          }
          else {
            // alert('here')
            let length = this.attendanceSaveData.length - 1
            if (this.attendanceSaveData[length].attendanceInputId == previousCycle.attendanceInputId) { return; }
            else {
              this.attendanceSaveData.push({
                "attendanceInputId": previousCycle.attendanceInputId,
                "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
                "payrollAreaCode": this.payrollareaCode,
                "date": previousCycle.date + ' 00:00:00',
                "paidLeaves": element.paidLeaves,
                "weeklyOff": element.weeklyOff,
                "holiday": parseFloat(holiday),
                "leaveWithoutPay": element.leaveWithoutPay,
                "presentDay_0": this.presentDay_0,
                "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
              })
            }
            this.attendanceInputGetAPIPreviouscycleData[rowIndex].holiday = holiday
          }
        });
      } else {

        let totalLeaves;
        if (this.defaultAttendace == '1') {
          totalLeaves = parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].paidLeaves) + parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].weeklyOff) + parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].leaveWithoutPay) + parseFloat(holiday)
          this.leaveWithoutPay = this.attendanceInputGetAPIPreviouscycleData[rowIndex].leaveWithoutPay
        } else {
          totalLeaves = parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].paidLeaves) + parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].weeklyOff) + parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].presentDay_0) + parseFloat(holiday)
          this.leaveWithoutPay = 0
        }
        // let totalLeaves = this.attendanceInputGetAPIPreviouscycleData[rowIndex].paidLeaves + this.attendanceInputGetAPIPreviouscycleData[rowIndex].weeklyOff + this.attendanceInputGetAPIPreviouscycleData[rowIndex].leaveWithoutPay + parseFloat(holiday)
        console.log("total: " + totalLeaves)
        if (totalLeaves <= 1) {
          this.attendanceSaveData.push({
            "attendanceInputId": previousCycle.attendanceInputId,
            "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
            "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
            "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
            // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
            "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
            "payrollAreaCode": this.payrollareaCode,
            "date": previousCycle.date + ' 00:00:00',
            "paidLeaves": this.attendanceInputGetAPIPreviouscycleData[rowIndex].paidLeaves,
            "weeklyOff": this.attendanceInputGetAPIPreviouscycleData[rowIndex].weeklyOff,
            "holiday": parseFloat(holiday),
            "leaveWithoutPay": this.leaveWithoutPay,
            "presentDay_0": this.presentDay_0,
            "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
          })
          this.attendanceInputGetAPIPreviouscycleData[rowIndex].holiday = holiday
        } else {
          this.toster.warning("", "You can not exceed the leave count more then one")
          holiday = 0.0
          this.attendanceInputGetAPIPreviouscycleData[rowIndex].holiday = '0.00'

        }
      }


      console.log("this.holiday: " + JSON.stringify(this.attendanceSaveData))
      this.getPreviousCycleHolidayTotal();
    }
  }

  /** Set Leave data for Weekly leave - Previous Cycle */
  getPreviousWeeklyOff(weeklyOffvalue, previousCycle, rowIndex) {
    if (weeklyOffvalue != '') {
      this.attendanceInputGetAPIPreviouscycleData[rowIndex].weeklyOff = 0
      let tempAttendancePresentData = JSON.parse(localStorage.getItem('tempAttendancePresentData'))
      let weeklyOff: any;
      if (this.selectedEmpData[this.index].cycleName != this.selectedEmpData[this.index].currentcycleName) {
        //     if(parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].weeklyOff) < parseFloat(weeklyOffvalue)){
        weeklyOff = parseFloat(weeklyOffvalue) - parseFloat(tempAttendancePresentData[rowIndex].weeklyOff)
        weeklyOff = weeklyOff.toFixed(2)
        //   }
        // else{
        //   weeklyOff = parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].weeklyOff) - parseFloat(weeklyOffvalue)
        // }
      } else {
        weeklyOff = weeklyOffvalue
      }
      if (this.attendanceSaveData.length > 0) {
        this.attendanceSaveData.forEach((element, index) => {
          if (element.attendanceInputId == previousCycle.attendanceInputId) {
            let ind = index;
            let totalLeaves;
            if (this.defaultAttendace == '1') {
              totalLeaves = parseFloat(element.paidLeaves) + parseFloat(element.holiday) + parseFloat(element.leaveWithoutPay) + parseFloat(weeklyOff)
              this.leaveWithoutPay = this.attendanceInputGetAPIPreviouscycleData[rowIndex].leaveWithoutPay

            } else {
              totalLeaves = parseFloat(element.paidLeaves) + parseFloat(element.holiday) + parseFloat(element.presentDay_0) + parseFloat(weeklyOff)
              this.leaveWithoutPay = 0
            }
            console.log("previous weekly:  " + totalLeaves)
            //let totalLeaves = element.paidLeaves + element.holiday + element.leaveWithoutPay + parseFloat(weeklyOff)
            if (totalLeaves <= 1) {
              this.attendanceSaveData.splice(ind, 1, {
                "attendanceInputId": previousCycle.attendanceInputId,
                "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
                "payrollAreaCode": this.payrollareaCode,
                "date": previousCycle.date + ' 00:00:00',
                "paidLeaves": parseFloat(element.paidLeaves),
                "weeklyOff": parseFloat(weeklyOff),
                "holiday": parseFloat(element.holiday),
                "leaveWithoutPay": parseFloat(element.leaveWithoutPay),
                "presentDay_0": this.presentDay_0,
                "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
              })
              this.attendanceInputGetAPIPreviouscycleData[rowIndex].weeklyOff = weeklyOff
            } else {
              this.toster.warning("", "You can not exceed the leave count more then one")
              weeklyOff = 0.0
              this.attendanceInputGetAPIPreviouscycleData[rowIndex].weeklyOff = '0.00'
            }
          }
          else {
            let length = this.attendanceSaveData.length - 1
            if (this.attendanceSaveData[length].attendanceInputId == previousCycle.attendanceInputId) { return; }
            else {
              this.attendanceSaveData.push({
                "attendanceInputId": previousCycle.attendanceInputId,
                "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
                "payrollAreaCode": this.payrollareaCode,
                "date": previousCycle.date + ' 00:00:00',
                "paidLeaves": parseFloat(element.paidLeaves),
                "weeklyOff": parseFloat(weeklyOff),
                "holiday": parseFloat(element.holiday),
                "leaveWithoutPay": parseFloat(element.leaveWithoutPay),
                "presentDay_0": this.presentDay_0,
                "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
              })
            }
            this.attendanceInputGetAPIPreviouscycleData[rowIndex].weeklyOff = weeklyOff
          }
        });
      } else {
        let totalLeaves;
        if (this.defaultAttendace == '1') {
          totalLeaves = parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].paidLeaves) + parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].holiday) + parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].leaveWithoutPay) + parseFloat(weeklyOff)
          this.leaveWithoutPay = this.attendanceInputGetAPIPreviouscycleData[rowIndex].leaveWithoutPay
        } else {
          totalLeaves = parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].paidLeaves) + parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].holiday) + parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].presentDay_0) + parseFloat(weeklyOff)
          this.leaveWithoutPay = 0
        }
        //let totalLeaves = this.attendanceInputGetAPIPreviouscycleData[rowIndex].paidLeaves + this.attendanceInputGetAPIPreviouscycleData[rowIndex].holiday + this.attendanceInputGetAPIPreviouscycleData[rowIndex].leaveWithoutPay + parseFloat(weeklyOff)
        console.log("total wweklyoff: " + totalLeaves)
        if (totalLeaves <= 1) {
          this.attendanceSaveData.push({
            "attendanceInputId": previousCycle.attendanceInputId,
            "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
            "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
            "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
            // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
            "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
            "payrollAreaCode": this.payrollareaCode,
            "date": previousCycle.date + ' 00:00:00',
            "paidLeaves": this.attendanceInputGetAPIPreviouscycleData[rowIndex].paidLeaves,
            "weeklyOff": parseFloat(weeklyOff),
            "holiday": this.attendanceInputGetAPIPreviouscycleData[rowIndex].holiday,
            "leaveWithoutPay": this.leaveWithoutPay,
            "presentDay_0": this.presentDay_0,
            "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
          })
          this.attendanceInputGetAPIPreviouscycleData[rowIndex].weeklyOff = weeklyOff
        } else {
          this.toster.warning("", "You can not exceed the leave count more then one")
          weeklyOff = 0.0
          this.attendanceInputGetAPIPreviouscycleData[rowIndex].weeklyOff = '0.00'

        }
      }

      console.log("this.weeklyOff: " + JSON.stringify(this.attendanceSaveData))
      this.getPreviousCycleWeeklyOffTotal();
    }
  }

  /** Set Leave data for Paid leave - Previous Cycle */
  getPreviousPaidLeaves(paidLeavesvalue, previousCycle, rowIndex) {
    if (paidLeavesvalue != '') {
      this.attendanceInputGetAPIPreviouscycleData[rowIndex].paidLeaves = 0
      let tempAttendancePresentData = JSON.parse(localStorage.getItem('tempAttendancePresentData'))
      let paidLeaves: any;
      if (this.selectedEmpData[this.index].cycleName != this.selectedEmpData[this.index].currentcycleName) {
        // if(parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].paidLeaves) < parseFloat(paidLeavesvalue)){
        paidLeaves = parseFloat(paidLeavesvalue) - parseFloat(tempAttendancePresentData[rowIndex].paidLeaves)
        paidLeaves.toFixed(2)
        // }else{
        //   paidLeaves = parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].paidLeaves) - parseFloat(paidLeavesvalue)
        // }
      } else {
        paidLeaves = paidLeavesvalue
      }
      if (this.attendanceSaveData.length > 0) {
        this.attendanceSaveData.forEach((element, index) => {
          if (element.attendanceInputId == previousCycle.attendanceInputId) {
            let ind = index;
            let totalLeaves;
            if (this.defaultAttendace == '1') {
              totalLeaves = parseFloat(element.holiday) + parseFloat(element.weeklyOff) + parseFloat(element.leaveWithoutPay) + parseFloat(paidLeaves)
              this.leaveWithoutPay = this.attendanceInputGetAPIPreviouscycleData[rowIndex].leaveWithoutPay
            } else {
              totalLeaves = parseFloat(element.holiday) + parseFloat(element.weeklyOff) + parseFloat(element.presentDay_0) + parseFloat(paidLeaves)
              this.leaveWithoutPay = 0
            }
            //let totalLeaves = element.weeklyOff + element.holiday + element.leaveWithoutPay + parseFloat(paidLeaves)
            if (totalLeaves <= 1) {
              this.attendanceSaveData.splice(ind, 1, {
                "attendanceInputId": previousCycle.attendanceInputId,
                "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
                "payrollAreaCode": this.payrollareaCode,
                "date": previousCycle.date + ' 00:00:00',
                "paidLeaves": parseFloat(paidLeaves),
                "weeklyOff": parseFloat(element.weeklyOff),
                "holiday": parseFloat(element.holiday),
                "leaveWithoutPay": parseFloat(element.leaveWithoutPay),
                "presentDay_0": this.presentDay_0,
                "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
              })
              this.attendanceInputGetAPIPreviouscycleData[rowIndex].paidLeaves = paidLeaves
            } else {
              this.toster.warning("", "You can not exceed the leave count more then one")
              paidLeaves = 0.0
              this.attendanceInputGetAPIPreviouscycleData[rowIndex].paidLeaves = '0.00'
            }
          }
          else {
            let length = this.attendanceSaveData.length - 1
            if (this.attendanceSaveData[length].attendanceInputId == previousCycle.attendanceInputId) { return; }
            else {
              this.attendanceSaveData.push({
                "attendanceInputId": previousCycle.attendanceInputId,
                "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
                "payrollAreaCode": this.payrollareaCode,
                "date": previousCycle.date + ' 00:00:00',
                "paidLeaves": parseFloat(paidLeaves),
                "weeklyOff": parseFloat(element.weeklyOff),
                "holiday": parseFloat(element.holiday),
                "leaveWithoutPay": parseFloat(element.leaveWithoutPay),
                "presentDay_0": this.presentDay_0,
                "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
              })
            }
            this.attendanceInputGetAPIPreviouscycleData[rowIndex].paidLeaves = paidLeaves
          }
        });
      } else {
        let totalLeaves;
        if (this.defaultAttendace == '1') {
          totalLeaves = parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].weeklyOff) + parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].holiday) + parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].leaveWithoutPay) + parseFloat(paidLeaves)
          this.leaveWithoutPay = this.attendanceInputGetAPIPreviouscycleData[rowIndex].leaveWithoutPay
        } else {
          totalLeaves = parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].weeklyOff) + parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].holiday) + parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].presentDay_0) + parseFloat(paidLeaves)
          this.leaveWithoutPay = 0
        }
        //let totalLeaves = this.attendanceInputGetAPIPreviouscycleData[rowIndex].weeklyOff + this.attendanceInputGetAPIPreviouscycleData[rowIndex].holiday + this.attendanceInputGetAPIPreviouscycleData[rowIndex].leaveWithoutPay + parseFloat(paidLeaves)
        console.log("total wweklyoff: " + totalLeaves)
        if (totalLeaves <= 1) {
          this.attendanceSaveData.push({
            "attendanceInputId": previousCycle.attendanceInputId,
            "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
            "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
            "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
            // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
            "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
            "payrollAreaCode": this.payrollareaCode,
            "date": previousCycle.date + ' 00:00:00',
            "paidLeaves": parseFloat(paidLeaves),
            "weeklyOff": this.attendanceInputGetAPIPreviouscycleData[rowIndex].weeklyOff,
            "holiday": this.attendanceInputGetAPIPreviouscycleData[rowIndex].holiday,
            "leaveWithoutPay": this.leaveWithoutPay,
            "presentDay_0": this.presentDay_0,
            "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
          })
          this.attendanceInputGetAPIPreviouscycleData[rowIndex].paidLeaves = paidLeaves
        } else {
          this.toster.warning("", "You can not exceed the leave count more then one")
          paidLeaves = 0.0
          this.attendanceInputGetAPIPreviouscycleData[rowIndex].paidLeaves = '0.00'

        }
      }

      console.log("this.paidLeaves: " + JSON.stringify(this.attendanceSaveData))
      this.getPreviousCycleLeaveTotal();
    }
  }


  /** Set Leave data for Paid leave - Previous Cycle */
  getPreviousLeaveWithoutPay(leaveWithoutPayvalue, previousCycle, rowIndex) {
    if (leaveWithoutPayvalue != '') {
      this.attendanceInputGetAPIPreviouscycleData[rowIndex].leaveWithoutPay = 0
      let tempAttendancePresentData = JSON.parse(localStorage.getItem('tempAttendancePresentData'))
      let leaveWithoutPay: any;
      if (this.selectedEmpData[this.index].cycleName != this.selectedEmpData[this.index].currentcycleName) {
        // if(parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].leaveWithoutPay) < parseFloat(leaveWithoutPayvalue)){
        leaveWithoutPay = parseFloat(leaveWithoutPayvalue) - parseFloat(tempAttendancePresentData[rowIndex].leaveWithoutPay)
        leaveWithoutPay = leaveWithoutPay.toFixed(2)
        // }else{
        //   leaveWithoutPay = parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].leaveWithoutPay) - parseFloat(leaveWithoutPayvalue)
        // }
      } else {
        leaveWithoutPay = leaveWithoutPayvalue
      }

      if (this.attendanceSaveData.length > 0) {
        this.attendanceSaveData.forEach((element, index) => {
          if (element.attendanceInputId == previousCycle.attendanceInputId) {
            let ind = index;
            let totalLeaves = parseFloat(element.weeklyOff) + parseFloat(element.holiday) + parseFloat(element.paidLeaves) + parseFloat(leaveWithoutPay)
            if (totalLeaves <= 1) {
              this.attendanceSaveData.splice(ind, 1, {
                "attendanceInputId": previousCycle.attendanceInputId,
                "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
                "payrollAreaCode": this.payrollareaCode,
                "date": previousCycle.date + ' 00:00:00',
                "paidLeaves": parseFloat(element.paidLeaves),
                "weeklyOff": parseFloat(element.weeklyOff),
                "holiday": parseFloat(element.holiday),
                "leaveWithoutPay": parseFloat(leaveWithoutPay),
                "presentDay_0": this.presentDay_0,
                "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
              })
              this.attendanceInputGetAPIPreviouscycleData[rowIndex].leaveWithoutPay = leaveWithoutPay
            } else {
              this.toster.warning("", "You can not exceed the leave count more then one")
              leaveWithoutPay = 0.0
              this.attendanceInputGetAPIPreviouscycleData[rowIndex].leaveWithoutPay = '0.00'
            }
          }
          else {
            let length = this.attendanceSaveData.length - 1
            if (this.attendanceSaveData[length].attendanceInputId == previousCycle.attendanceInputId) { return; }
            else {
              this.attendanceSaveData.push({
                "attendanceInputId": previousCycle.attendanceInputId,
                "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
                "payrollAreaCode": this.payrollareaCode,
                "date": previousCycle.date + ' 00:00:00',
                "paidLeaves": parseFloat(element.paidLeaves),
                "weeklyOff": parseFloat(element.weeklyOff),
                "holiday": parseFloat(element.holiday),
                "leaveWithoutPay": parseFloat(leaveWithoutPay),
                "presentDay_0": this.presentDay_0,
                "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
              })
            }
            this.attendanceInputGetAPIPreviouscycleData[rowIndex].leaveWithoutPay = leaveWithoutPay
          }
        });
      } else {
        let totalLeaves = parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].weeklyOff) + parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].holiday) + parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].paidLeaves) + parseFloat(leaveWithoutPay)
        console.log("total wweklyoff: " + totalLeaves)
        if (totalLeaves <= 1) {
          this.attendanceSaveData.push({
            "attendanceInputId": previousCycle.attendanceInputId,
            "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
            "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
            "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
            // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
            "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
            "payrollAreaCode": this.payrollareaCode,
            "date": previousCycle.date + ' 00:00:00',
            "paidLeaves": this.attendanceInputGetAPIPreviouscycleData[rowIndex].paidLeaves,
            "weeklyOff": this.attendanceInputGetAPIPreviouscycleData[rowIndex].weeklyOff,
            "holiday": this.attendanceInputGetAPIPreviouscycleData[rowIndex].holiday,
            "leaveWithoutPay": parseFloat(leaveWithoutPay),
            "presentDay_0": this.presentDay_0,
            "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
          })
          this.attendanceInputGetAPIPreviouscycleData[rowIndex].leaveWithoutPay = leaveWithoutPay
        } else {
          this.toster.warning("", "You can not exceed the leave count more then one")
          leaveWithoutPay = 0.0
          this.attendanceInputGetAPIPreviouscycleData[rowIndex].leaveWithoutPay = '0.00'

        }
      }

      console.log("this.leaveWithoutPay: " + JSON.stringify(this.attendanceSaveData))
      this.getPreviousCycleLeaveWithoutPayTotal();
    }
  }




  getPreviousPresentDay(Presentdayvalue, presentcycle, rowIndex) {
    if (Presentdayvalue != '') {
      this.attendanceInputGetAPIPreviouscycleData[rowIndex].presentDay_0 = 0
      let tempAttendancePresentData = JSON.parse(localStorage.getItem('tempAttendancePresentData'))
      let presentday: any;
      if (this.selectedEmpData[this.index].cycleName != this.selectedEmpData[this.index].currentcycleName) {
        // if(parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay) < parseFloat(leaveWithoutPayvalue)){
        presentday = parseFloat(Presentdayvalue) - parseFloat(tempAttendancePresentData[rowIndex].presentDay_0)
        presentday = presentday.toFixed(2)
        // }else{
        //   leaveWithoutPay = parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay) - parseFloat(leaveWithoutPayvalue)
        // }
      } else {
        presentday = Presentdayvalue
      }
      this.presentDay_0 = presentday;

      if (this.attendanceSaveData.length > 0) {
        this.attendanceSaveData.forEach((element, index) => {
          if (element.attendanceInputId == presentcycle.attendanceInputId) {
            let ind = index;
            let totalLeaves = parseFloat(element.weeklyOff) + parseFloat(element.holiday) + parseFloat(element.paidLeaves) + parseFloat(this.presentDay_0)
            if (totalLeaves <= 1) {
              this.attendanceSaveData.splice(ind, 1, {
                "attendanceInputId": presentcycle.attendanceInputId,
                "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
                "payrollAreaCode": this.payrollareaCode,
                "date": presentcycle.date + ' 00:00:00',
                "paidLeaves": parseFloat(element.paidLeaves),
                "weeklyOff": parseFloat(element.weeklyOff),
                "holiday": parseFloat(element.holiday),
                "leaveWithoutPay": parseFloat(element.leaveWithoutPay),
                "presentDay_0": parseFloat(this.presentDay_0),
                "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
              })
              this.attendanceInputGetAPIPreviouscycleData[rowIndex].presentDay_0 = parseFloat(this.presentDay_0)
            } else {
              this.toster.warning("", "You can not exceed the leave count more then one")
              presentday = 0.0
              this.attendanceInputGetAPIPreviouscycleData[rowIndex].presentDay_0 = '0.00'
            }
          }
          else {
            let length = this.attendanceSaveData.length - 1
            if (this.attendanceSaveData[length].attendanceInputId == presentcycle.attendanceInputId) { return; }
            else {
              this.attendanceSaveData.push({
                "attendanceInputId": presentcycle.attendanceInputId,
                "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
                "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
                "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
                // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
                "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
                "payrollAreaCode": this.payrollareaCode,
                "date": presentcycle.date + ' 00:00:00',
                "paidLeaves": 0,
                "weeklyOff": 0,
                "holiday": 0,
                "leaveWithoutPay": parseFloat(element.leaveWithoutPay),
                "presentDay_0": parseFloat(this.presentDay_0),
                "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
              })
            }
            this.attendanceInputGetAPIPreviouscycleData[rowIndex].presentDay_0 = this.presentDay_0
          }
        });
      } else {
        let totalLeaves = parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].weeklyOff) + parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].holiday) + parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].paidLeaves) + parseFloat(this.presentDay_0)
        console.log("total wweklyoff: " + totalLeaves)
        if (totalLeaves <= 1) {
          this.attendanceSaveData.push({
            "attendanceInputId": presentcycle.attendanceInputId,
            "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
            "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
            "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
            // "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
            "payrollAreaId": parseInt(this.payrollAreaId_Payroll),
            "payrollAreaCode": this.payrollareaCode,
            "date": presentcycle.date + ' 00:00:00',
            "paidLeaves": this.attendanceInputGetAPIPreviouscycleData[rowIndex].paidLeaves,
            "weeklyOff": this.attendanceInputGetAPIPreviouscycleData[rowIndex].weeklyOff,
            "holiday": this.attendanceInputGetAPIPreviouscycleData[rowIndex].holiday,
            "leaveWithoutPay": 0,
            "presentDay_0": parseFloat(this.presentDay_0),
            "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
          })
          this.attendanceInputGetAPIPreviouscycleData[rowIndex].presentDay_0 = parseFloat(this.presentDay_0)
        } else {
          this.toster.warning("", "You can not exceed the leave count more then one")
          this.presentDay_0 = 0.0
          this.attendanceInputGetAPIPreviouscycleData[rowIndex].presentDay_0 = '0.00'

        }
      }

      // console.log("this.leaveWithoutPay: " + JSON.stringify(this.attendanceSaveData))
      this.getPreviousCyclePresentDayTotal();
    }
  }



  getPreviousCycleWeeklyOffTotal() {
    let total = 0.0
    this.attendanceInputGetAPIPreviouscycleData.forEach(element => {
      total = total + parseFloat(element.weeklyOff)

    });
    return total.toFixed(2);
  }


  getPreviousCycleHolidayTotal() {
    let total = 0.0
    this.attendanceInputGetAPIPreviouscycleData.forEach(element => {
      total = total + parseFloat(element.holiday)

    });
    return total.toFixed(2);
  }

  /** Calculate current cycle weekly off  */
  getPreviousCycleLeaveTotal() {
    let total = 0.0
    this.attendanceInputGetAPIPreviouscycleData.forEach(element => {
      total = total + parseFloat(element.paidLeaves)

    });
    return total.toFixed(2);
  }

  /** Calculate current cycle weekly off  */
  getPreviousCycleLeaveWithoutPayTotal() {
    let total = 0.0
    if (this.defaultAttendace == '1') {
      this.attendanceInputGetAPIPreviouscycleData.forEach(element => {
        total = total + parseFloat(element.leaveWithoutPay)

      });
    } else {
      this.attendanceInputGetAPIPreviouscycleData.forEach(element => {
        total = total + parseFloat(element.leaveWithoutPay_0)

      });
    }
    return total.toFixed(2);
  }

  getPreviousCyclePresentDayTotal() {
    let total = 0.0
    if (this.defaultAttendace == '0') {
      this.attendanceInputGetAPIPreviouscycleData.forEach(element => {
        total = total + parseFloat(element.presentDay_0)

      });
    } else {
      this.attendanceInputGetAPIPreviouscycleData.forEach(element => {
        total = total + parseFloat(element.presentDay)

      });
    }
    return total.toFixed(2);
  }

  getPreviousCycleAdjTotal() {
    let total = 0.0
    this.attendanceInputGetAPIPreviouscycleData.forEach(element => {
      total = total + parseFloat(element.adjustment)

    });
    return total.toFixed(2);
  }

  getPreviousCyclePaybleDaysTotal() {
    let total = 0.0
    this.attendanceInputGetAPIPreviouscycleData.forEach(element => {
      total = total + parseFloat(element.paidDays)

    });
    return total.toFixed(2);
  }

  // **********************************Previous Cycle Functions Ends***********************************************



  /** Save Button Click */
  AttendanceInput() {
    console.log("Save Button Click: " + JSON.stringify(this.attendanceSaveData))
    this.attendanceService.AttendanceInput(this.attendanceSaveData).subscribe(
      res => {
        this.toster.success("", "Attendance data saved successfully")
        this.attendanceInputAPIRecordsUI();
        this.attendanceInputGetTotalAPIRecordsUI(this.index);
        this.attendanceInputGetAPIFuturecycle(this.index);
        this.attendanceInputGetAPIPreviouscycle(this.index);
        this.employeeFinDetails();
        this.attendanceSaveData = [];
      }
    )
  }

  /** Save and Next Button Click */
  attendanceForNextEmp() {
    console.log("Save and next Button Click: " + JSON.stringify(this.attendanceSaveData))
    this.attendanceService.AttendanceInput(this.attendanceSaveData).subscribe(
      res => {
        // this.toster.success("", "Attendance data saved successfully")
        if (this.selectedEmpData.length > 1) {
          this.index = this.index + 1;
          this.attendanceInputGetTotalAPIRecordsUI(this.index)
          this.employeeFinDetails()
          this.attendanceInputAPIRecordsUI()

        } else {
          this.attendanceInputAPIRecordsUI()
          this.employeeFinDetails()
        }
      }
    )

  }

  attendanceForPreviousEmp() {
    console.log("Save and next Button Click: " + JSON.stringify(this.attendanceSaveData))
    this.attendanceService.AttendanceInput(this.attendanceSaveData).subscribe(
      res => {
        this.toster.success("", "Attendance data saved successfully")
        if (this.selectedEmpData.length > 1) {
          this.index = this.index - 1;
          this.attendanceInputGetTotalAPIRecordsUI(this.index)
          this.attendanceInputAPIRecordsUI();
          this.employeeFinDetails();
        } else {
          this.attendanceInputAPIRecordsUI()
        }
      }
    )

  }


  payrollAreaDetails() {
   // alert(this.payRollAreaId)
    // this.PayrollAreaByPayrollAreaCode();
    // console.log("payrollareadetails",this.payRollAreaId);
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
    this.tabIndex = 1
    this.showEmpSelectionFlag = false;
    if (this.selectedEmpData.length > 0) {
      
      // this.payrollAreaDetails();
      this.index = 0;
      this.currentCycle = parseInt(this.selectedEmpData[this.index].pertainingCycle);
      this.attendanceInputGetTotalAPIRecordsUI(this.index);
      this.attendanceInputAPIRecordsUI();
      this.attendanceInputAPIAllCycleRecords(this.index);
      // this.getAllActiveBussinessYear();
      // this.businessCycleDefinition();
      this.employeeFinDetails();
      this.payrollAssigned(this.selectedEmpData[this.index].employeeMasterId);
      this.PayrollAreaByPayrollAreaCode();
      this.getCycleById();
    } else {
      this.toster.warning("", "Please select atleast one employee")
    }

    this.attendanceInputGetAPIFuturecycle(this.index);
    this.attendanceInputGetAPIPreviouscycle(this.index);

  }

  summeryTab() {
    this.fromDate = null;
    this.toDate = null;
    this.tabIndex = 0;
    this.selectedEmpData = [];
    this.selectedEmployeeMasterId = null
    this.selectedPayrollAreaCode = ''
    this.showEmpSelectionFlag = false
    this.getAttendanceSummaryData();
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

  allCycleTab() {
    this.attendanceInputAPIAllCycleRecords(this.index);
  }

  /** Business year list */
  // getAllActiveBussinessYear() {
  //   this.attendanceService.getAllActiveBussinessYear().subscribe(
  //     res => {
  //       this.getAllActiveBussinessYearData = res.data.results;
  //     }
  //   )
  // }

  /** Business Cycle List */
  // businessCycleDefinition() {
  //   this.attendanceService.businessCycleDefinition().subscribe(
  //     res => {
  //       this.businessCycleDefinitionData = res.data.results;

  //     }
  //   )
  // }

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
    this.attendanceService.employeeFinDetails(this.selectedEmpData[this.index].employeeMasterId).subscribe(
      //this.attendanceService.employeeFinDetails(44).subscribe(
      res => {
        this.employeeFinDetailsData = res.data.results[0][0];
        console.log("employeeFinDetailsData:", this.employeeFinDetailsData);
      }
    )
  }

  payrollAssigned(employeeMasterId) {

    this.attendanceService.payrollAssigned(employeeMasterId).subscribe(
      res => {
        this.payrollAssignedData = res.data.results[0][0];
        this.payrollListData = res.data.results[0];
        //console.log("attendanceData:", this.attendanceData);
      }
    )
  }



  /** Display Day name from selected date */
  getDays(date) {
    let day = '';
    var d = new Date(date);
    day = this.days[d.getDay()];
    return day;

  }

  getMonths(date) {
    let month = '';
    var d = new Date(date);
    month = this.months[d.getMonth()];
    return month;

  }


  changeTabIndex(index) {
    // if (this.selectedEmpData.length > 0) {
    this.tabIndex = index;
    this.showEmpSelectionFlag = true;
    this.getAllEmployeeDetails();
    this.attendanceInputAPIRecordsUIData = [];
    this.attendanceInputGetAPIFuturecyclesData = []
    this.attendanceInputGetAPIPreviouscycleData = []
    this.AllCycleRecordsData = []
    this.cycleDefinitionGetAll();
    // }
  }

  /** Get all  Employee data */
  getAllEmployeeDetails(): void {
    this.payrollservice.getAllEmployeeDetails().subscribe((res) => {
      this.employeeData = res.data.results[0];
      console.log(this.employeeData)
      this.index = 0;
    });
  }

  /** Get Selected Employee master Id */
  getSelectedEmployeeCode(value) {
    this.selectedEmployeeMasterId = parseInt(value)
    this.payrollAssigned(this.selectedEmployeeMasterId)
  }

  /**Get Selected Employy Payroll Area */
  getSelectedPayrollAreaByEmp(value) {
    this.selectedPayrollAreaCode = value
  }

  /**Get selected Employee Cycle */
  getSelectedCycleByEmp(value) {
    let cycle = value.split(',')
    this.selectedProcessingCycle = cycle[0];
    this.selectedProcessingCyclename = cycle[1];
  }

  PayrollAreaByPayrollAreaCode() {
    // alert(this.index)
    // console.log(JSON.stringify(this.selectedEmpData))
    const formData = new FormData();


    formData.append('payrollArea', this.selectedEmpData[this.index].payrollAreacode)


    this.attendanceService.PayrollAreaByPayrollAreaCode(formData).subscribe(
      res => {
        this.PayrollAreaByPayrollAreaCodeData = res.data.results;
        this.payRollAreaId = this.PayrollAreaByPayrollAreaCodeData[0].payrollAreaId;
       console.log("payroolid from api",this.payRollAreaId);
       this.payrollAreaDetails()
        this.defaultAttendace = this.PayrollAreaByPayrollAreaCodeData[0].defaultAttendace;
        this.is30daysPayroll = this.PayrollAreaByPayrollAreaCodeData[0].is30daysPayroll;
        this.payrollAreaId_Payroll = this.PayrollAreaByPayrollAreaCodeData[0].payrollAreaId;
        this.getSelectedPayrollArea();
        
      }
    )
  }


  getEmpAttendance() {
    this.selectedEmpData = []
    // this.selectedEmpData[this.index].processingCycle = value
    //alert(this.selectedPayrollAreaCode)
    this.selectedEmpData.push({
      'employeeMasterId': this.selectedEmployeeMasterId,
      'payrollAreacode': this.selectedPayrollAreaCode,
      'processingCycle': this.selectedProcessingCycle
    })
    this.selectedEmpData[this.index].cycleName = this.selectedProcessingCyclename;
    this.selectedEmpData[this.index].currentcycleName = this.selectedProcessingCyclename;
    //this.payrollAreaDetails();
    this.currentCycle = parseInt(this.selectedEmpData[this.index].pertainingCycle);
    this.attendanceInputGetTotalAPIRecordsUI(this.index);
    this.attendanceInputAPIRecordsUI();
    this.employeeFinDetails();
    this.payrollAssigned(this.selectedEmpData[this.index].employeeMasterId);
    this.PayrollAreaByPayrollAreaCode();
    this.attendanceInputAPIAllCycleRecords(this.index);
    this.getCycleById();

  }


  presentClick() {
    this.tabsIndex = 1
  }

  futureClick() {
    this.tabsIndex = 2
  }

  PreviousClick() {
    this.tabsIndex = 3
  }

  allCycleClick() {
    this.tabsIndex = 4
  }

  getCycleById() {
    this.attendanceService.getCycleById(this.selectedEmpData[this.index].processingCycle).subscribe(
      res => {
        this.businessCycleData = res.data.results[0];
        this.businessFrequencyName = this.businessCycleData.businessCycleDefinition.frequency;

      }
    )
  }

  cycleDefinitionGetAll() {
    this.attendanceService.cycleDefinitionGetAll().subscribe(
      res => {
        this.businessCycleIDData = res.data.results;


      }
    )
  }


  attendanceInputAPIAllCycleRecords(index) {
    const formData = new FormData();


    formData.append('CycleId', this.selectedEmpData[this.index].processingCycle)
    formData.append('payrollAreaCode', this.selectedEmpData[index].payrollAreacode)
    formData.append('employeeMasterId', this.selectedEmpData[index].employeeMasterId)



    this.attendanceService.attendanceInputAPIAllCycleRecords(formData).subscribe(
      res => {
        this.AllCycleRecordsData = res.data.results;

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
