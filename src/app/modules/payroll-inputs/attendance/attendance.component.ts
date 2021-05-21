import { DatePipe } from '@angular/common';
import { Component, HostListener, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AttendanceService } from '../attendance.service';
import { ExcelserviceService } from '../../excel_service/excelservice.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';
import { exit } from 'node:process';


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


  constructor(private modalService: BsModalService, private attendanceService: AttendanceService,
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

      formData.append('CycleId', this.selectedEmpData[this.index].processingCycle)
      formData.append('employeeMasterId', this.selectedEmpData[this.index].employeeMasterId)
      formData.append('payrollAreaCode', this.selectedEmpData[this.index].payrollAreacode)
  
      this.attendanceService.attendanceInputAPIRecordsUI(formData).subscribe(
        res => {
          this.attendanceInputAPIRecordsUIData = res.data.results;
          this.empData = res.data.results[0].employeeMaster;
          //console.log("attendanceInputAPIRecordsUIData:", this.attendanceInputAPIRecordsUIData);

          // this.attendanceInputAPIRecordsUIData.forEach(element => {
          //     this.attendanceSaveData.push({
          //       "attendanceInputId": element.attendanceInputId,
          //       "employeeMasterId": this.selectedEmpData[this.index].employeeMasterId,
          //       "processingCycle": parseInt(this.selectedEmpData[this.index].processingCycle),
          //       "pertainingCycle": parseInt(this.selectedEmpData[this.index].pertainingCycle),
          //       "payrollAreaId": parseInt(this.attendanceForm.controls['payrollArea'].value),
          //       "payrollAreaCode": this.payrollareaCode,
          //       "date": element.date + ' 00:00:00',
          //       "paidLeaves": element.paidLeaves,
          //       "weeklyOff": element.weeklyOff,
          //       "holiday": element.holiday,
          //       "leaveWithoutPay" : this.leaveWithoutPay,
          //       "presentDay_0":this.presentDay_0,
          //       "currentCycle": parseInt(this.currentCycle)
          //     })
          // });
        }
      )
    }

  }


  attendanceInputGetTotalAPIRecordsUI(index) {
    // console.log("DATA is: " + JSON.stringify(this.selectedEmpData[index]))
    const formData = new FormData();

    if(this.selectedEmpData.length > 0){
      formData.append('CycleId', this.selectedEmpData[this.index].processingCycle)
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

    formData.append('CycleId', this.selectedEmpData[this.index].processingCycle)
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

    formData.append('CycleId', this.selectedEmpData[this.index].processingCycle)
    formData.append('employeeMasterId', this.selectedEmpData[index].employeeMasterId)
    formData.append('payrollAreaCode', this.selectedEmpData[index].payrollAreacode)


    this.attendanceService.attendanceInputGetAPIFuturecycle(formData).subscribe(
      res => {
        this.attendanceInputGetAPIFuturecyclesData = res.data.results;
      }
    )
  }

  getSelectedPayrollArea(){
    if(this.defaultAttendace == '0'){
     this.leaveWithoutPay = 0
    }else{
      this.leaveWithoutPay = 1
      this.presentDay_0 = 0
    }

    //alert(this.selectedPayrollKey)
  }

// ****************************Current Cycle Functions Starts******************************************  

  /** Set Leave data for Holiday leave - Current Cycle */
  getCurrentHoliday(holidayvalue, presentcycle,rowIndex) {
    if(holidayvalue != ''){
    let holiday : any;
    if(this.selectedEmpData[this.index].cycleName != this.selectedEmpData[this.index].currentcycleName){
     // if(parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].holiday) < parseFloat(holidayvalue)){
        holiday = parseFloat(holidayvalue) - parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].holiday)  
     // }else{
     //   holiday = parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].holiday) - parseFloat(holidayvalue)
     // }
    }else{
      holiday = holidayvalue
    }
      if (this.attendanceSaveData.length > 0) {
        this.attendanceSaveData.forEach((element, index) => {
          // alert( presentcycle.attendanceInputId)
          if (element.attendanceInputId == presentcycle.attendanceInputId) {
            let ind = index;
            let totalLeaves
            if(this.defaultAttendace == '1'){
            totalLeaves = parseFloat(element.paidLeaves) + parseFloat(element.weeklyOff) + parseFloat(element.leaveWithoutPay) + parseFloat(holiday)
            }else{
              totalLeaves = parseFloat(element.paidLeaves) + parseFloat(element.weeklyOff) + parseFloat(element.presentDay_0) + parseFloat(holiday)
            }
            console.log("holiday ele: "+ totalLeaves)
            if(totalLeaves <= 1){

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
                "leaveWithoutPay" : element.leaveWithoutPay,
                "presentDay_0":element.presentDay_0,
                "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
    
              })
              this.attendanceInputAPIRecordsUIData[rowIndex].holiday = holiday
            }else{
              this.toster.warning("","You can not exceed the leave count more then one")
              //holiday = 0.00
              this.attendanceInputAPIRecordsUIData[rowIndex].holiday = '0.00'
            } 
          }
          else {
            // alert('here')
            let length = this.attendanceSaveData.length - 1
          if(this.attendanceSaveData[length].attendanceInputId == presentcycle.attendanceInputId){ return;}
          else{
           
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
              "leaveWithoutPay" : 0,
              "presentDay_0":presentcycle.presentDay_0,
              "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
            })
          }
            this.attendanceInputAPIRecordsUIData[rowIndex].holiday = holiday
          }
        });
      } 
      else {
        let totalLeaves;
        if(this.defaultAttendace == '1'){
          totalLeaves = parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].paidLeaves) + parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].weeklyOff) + parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay) + parseFloat(holiday)
        }else{
          totalLeaves = parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].paidLeaves) + parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].weeklyOff) + parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].presentDay_0) + parseFloat(holiday)
        }
        console.log("holiday else: "+ totalLeaves)
        if(totalLeaves <= 1){
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
            "leaveWithoutPay" : this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay,
            "presentDay_0":this.attendanceInputAPIRecordsUIData[rowIndex].presentDay_0,
            "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
          })
          this.attendanceInputAPIRecordsUIData[rowIndex].holiday = holiday
        }else{
          this.toster.warning("","You can not exceed the leave count more then one")
          holiday = 0.0
          this.attendanceInputAPIRecordsUIData[rowIndex].holiday = '0.00'
         
        }
      }
     this.getPresentCycleHolidayTotal()

    console.log("this.holiday: " + JSON.stringify(this.attendanceSaveData))
    }

  }

  /** Set Leave data for Weekly leave - Current Cycle */
  getCurrentWeeklyOff(weeklyOffvalue, presentcycle,rowIndex) {
   if(weeklyOffvalue != ''){
    let weeklyOff : any;
    if(this.selectedEmpData[this.index].cycleName != this.selectedEmpData[this.index].currentcycleName){
    //  if(parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].weeklyOff) < parseFloat(weeklyOffvalue)){
        weeklyOff = parseFloat(weeklyOffvalue) - parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].weeklyOff)  
     // }else{
     //   weeklyOff = parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].weeklyOff) - parseFloat(weeklyOffvalue)
     // }
    }else{
      weeklyOff = weeklyOffvalue
    }
    // debugger
    if (this.attendanceSaveData.length > 0) {
      this.attendanceSaveData.forEach((element, index) => {
        if (element.attendanceInputId == presentcycle.attendanceInputId) {
          let ind = index;
          let totalLeaves;
          if(this.defaultAttendace == '1'){
            totalLeaves = parseFloat(element.paidLeaves) + parseFloat(element.holiday) + parseFloat(element.leaveWithoutPay) + parseFloat(weeklyOff)
            
            }else{
              totalLeaves = parseFloat(element.paidLeaves) + parseFloat(element.holiday) + parseFloat(element.presentDay_0) + parseFloat(weeklyOff)
            }

            
           
          if(totalLeaves <= 1){
        
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
            "leaveWithoutPay" : parseFloat(element.leaveWithoutPay),
            "presentDay_0":parseFloat(element.presentDay_0),
            "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
          })
          this.attendanceInputAPIRecordsUIData[rowIndex].weeklyOff = weeklyOff
          
          return
        }else{
          this.toster.warning("","You can not exceed the leave count more then one")
          //weeklyOff = 0.00
          this.attendanceInputAPIRecordsUIData[rowIndex].weeklyOff = '0.00'
          //this.currentWeeklyOff[rowIndex] = 0.00
        } 
        }
        else {
          let length = this.attendanceSaveData.length - 1
          if(this.attendanceSaveData[length].attendanceInputId == presentcycle.attendanceInputId){ return;}
          else{
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
              "leaveWithoutPay" : 0,
              "presentDay_0":presentcycle.presentDay_0,
              "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
            })
          }
         
            this.attendanceInputAPIRecordsUIData[rowIndex].weeklyOff = weeklyOff
            return;
          }  
         
        
      });
    } else {
      let totalLeaves;
      if(this.defaultAttendace == '1'){
        totalLeaves = parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].paidLeaves) + parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].holiday) + parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay) + parseFloat(weeklyOff)
      }else{
        totalLeaves = parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].paidLeaves) + parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].holiday) + parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].presentDay_0) + parseFloat(weeklyOff)
      } 
      // console.log("total wweklyoff: " +totalLeaves)
      if(totalLeaves <= 1){
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
          "leaveWithoutPay" : this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay,
          "presentDay_0":this.attendanceInputAPIRecordsUIData[rowIndex].presentDay_0,
          "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
        })
        this.attendanceInputAPIRecordsUIData[rowIndex].weeklyOff = weeklyOff
      }else{
        this.toster.warning("","You can not exceed the leave count more then one")
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
  getCurrentPaidLeaves(paidLeavesvalue, presentcycle,rowIndex){
    if(paidLeavesvalue != ''){
    let paidLeaves : any;
    if(this.selectedEmpData[this.index].cycleName != this.selectedEmpData[this.index].currentcycleName){
    //  if(parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].paidLeaves) < parseFloat(paidLeavesvalue)){
        paidLeaves = parseFloat(paidLeavesvalue) - parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].paidLeaves)  
     // }else{
     //   paidLeaves = parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].paidLeaves) - parseFloat(paidLeavesvalue)
     // }
    }else{
      paidLeaves = paidLeavesvalue
    }
    if (this.attendanceSaveData.length > 0) {
      this.attendanceSaveData.forEach((element, index) => {
        if (element.attendanceInputId == presentcycle.attendanceInputId) {
          let ind = index;
          let totalLeaves;
          if(this.defaultAttendace == '1'){
            totalLeaves = parseFloat(element.holiday) + parseFloat(element.weeklyOff) + parseFloat(element.leaveWithoutPay) + parseFloat(paidLeaves)
            }else{
              totalLeaves = parseFloat(element.holiday) + parseFloat(element.weeklyOff) + parseFloat(element.presentDay_0) + parseFloat(paidLeaves)
            }
         
            console.log("total ele: "+ totalLeaves)
          if(totalLeaves <= 1){
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
            "leaveWithoutPay" : parseFloat(element.leaveWithoutPay),
            "presentDay_0":element.presentDay_0,
            "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
          })
          this.attendanceInputAPIRecordsUIData[rowIndex].paidLeaves = paidLeaves
        }else{
          this.toster.warning("","You can not exceed the leave count more then one")
          //paidLeaves = 0.0
          this.attendanceInputAPIRecordsUIData[rowIndex].paidLeaves = '0.00'
        } 
        }
        else {
          let length = this.attendanceSaveData.length - 1
          if(this.attendanceSaveData[length].attendanceInputId == presentcycle.attendanceInputId){ return;}
          else{
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
            "leaveWithoutPay" : 0,
            "presentDay_0":presentcycle.presentDay_0,
            "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
          })
        }
          this.attendanceInputAPIRecordsUIData[rowIndex].paidLeaves = paidLeaves
        }
      });
    } else {
      let totalLeaves;
      if(this.defaultAttendace == '1'){
        totalLeaves = parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].weeklyOff) + parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].holiday) + parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay) + parseFloat(paidLeaves)
      }else{
        totalLeaves = parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].weeklyOff) + parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].holiday) + parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].presentDay_0) + parseFloat(paidLeaves)
      }
       
      console.log("total total paid: " +totalLeaves)
      if(totalLeaves <= 1){
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
          "leaveWithoutPay" : this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay,
          "presentDay_0":this.attendanceInputAPIRecordsUIData[rowIndex].presentDay_0,
          "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
        })
        this.attendanceInputAPIRecordsUIData[rowIndex].paidLeaves = paidLeaves
      }else{
        this.toster.warning("","You can not exceed the leave count more then one")
       // paidLeaves = 0.0
        this.attendanceInputAPIRecordsUIData[rowIndex].paidLeaves = '0.00'
       
      }
    }

   console.log("this.paidLeaves: " + JSON.stringify(this.attendanceSaveData))
   this.getPresentCycleLeaveTotal();
  }
  }


  /** Set Leave data for Paid leave - Current Cycle */
  getCurrentLeaveWithoutPay(leaveWithoutPayvalue, presentcycle,rowIndex){
    if(leaveWithoutPayvalue != ''){
      let leaveWithoutPay :any;
      if(this.selectedEmpData[this.index].cycleName != this.selectedEmpData[this.index].currentcycleName){
       // if(parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay) < parseFloat(leaveWithoutPayvalue)){
          leaveWithoutPay = parseFloat(leaveWithoutPayvalue) - parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay)  
       // }else{
       //   leaveWithoutPay = parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay) - parseFloat(leaveWithoutPayvalue)
       // }
      }else{
        leaveWithoutPay = leaveWithoutPayvalue
      }
      if (this.attendanceSaveData.length > 0) {
        this.attendanceSaveData.forEach((element, index) => {
          if (element.attendanceInputId == presentcycle.attendanceInputId) {
            let ind = index;
            let totalLeaves = parseFloat(element.weeklyOff) + parseFloat(element.holiday) + parseFloat(element.paidLeaves) + parseFloat(leaveWithoutPay)
            if(totalLeaves <= 1){
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
              "leaveWithoutPay" : parseFloat(leaveWithoutPay),
              "presentDay_0":element.presentDay_0,
              "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
            })
            this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay = leaveWithoutPay
          }else{
            this.toster.warning("","You can not exceed the leave count more then one")
            //leaveWithoutPay = 0.0
            this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay = '0.00'
          } 
          }
          else {
            let length = this.attendanceSaveData.length - 1
          if(this.attendanceSaveData[length].attendanceInputId == presentcycle.attendanceInputId){ return;}
          else{ 
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
              "holiday":0,
              "leaveWithoutPay" : parseFloat(leaveWithoutPay),
              "presentDay_0":presentcycle.presentDay_0,
              "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
            })
          }
            this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay = leaveWithoutPay
          }
        });
      } else {
        let totalLeaves = parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].weeklyOff) + parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].holiday) + parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].paidLeaves) + parseFloat(leaveWithoutPay)
        console.log("total wweklyoff: " +totalLeaves)
        if(totalLeaves <= 1){
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
            "leaveWithoutPay" : parseFloat(leaveWithoutPay),
            "presentDay_0":this.attendanceInputAPIRecordsUIData[rowIndex].presentDay_0,
            "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
          })
          this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay = leaveWithoutPay
        }else{
          this.toster.warning("","You can not exceed the leave count more then one")
         // leaveWithoutPay = 0.0
          this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay = '0.00'
         
        }
      }
  
     console.log("this.leaveWithoutPay: " + JSON.stringify(this.attendanceSaveData))
     this.getPresentCycleLeaveWithoutPayTotal();
    }
  }

  
  calculatePresentDay(presentCycle){
    let presentDay
    if(this.selectedEmpData[this.index].cycleName == this.selectedEmpData[this.index].currentcycleName){
       presentDay = 1- (parseFloat(presentCycle.weeklyOff) + parseFloat(presentCycle.holiday) + parseFloat(presentCycle.paidLeaves) + parseFloat(presentCycle.leaveWithoutPay) + parseFloat(presentCycle.adjustment))
    }else{
      presentDay = 0- (parseFloat(presentCycle.weeklyOff) + parseFloat(presentCycle.holiday) + parseFloat(presentCycle.paidLeaves) + parseFloat(presentCycle.leaveWithoutPay) + parseFloat(presentCycle.adjustment))
      //presentDay = presentCycle.presentDay
    }
  
  return presentDay;
  }

  calculatePayableDays(presentCycle){
    let payableDay
    if(this.selectedEmpData[this.index].cycleName == this.selectedEmpData[this.index].currentcycleName){
      payableDay = 1- (parseFloat(presentCycle.leaveWithoutPay) + parseFloat(presentCycle.adjustment))
    }else{
      payableDay = 0 - (parseFloat(presentCycle.leaveWithoutPay) + parseFloat(presentCycle.adjustment))
      //payableDay = presentCycle.paidDays
    }
  
    return payableDay;
  }

  
  calculateLOP(presentCycle){
    let LOP
    if(this.selectedEmpData[this.index].cycleName == this.selectedEmpData[this.index].currentcycleName){
      LOP = 1- (parseFloat(presentCycle.weeklyOff) + parseFloat(presentCycle.holiday) + parseFloat(presentCycle.paidLeaves) + parseFloat(presentCycle.presentDay_0) + parseFloat(presentCycle.adjustment))
    }else{
      LOP = 0- (parseFloat(presentCycle.weeklyOff) + parseFloat(presentCycle.holiday) + parseFloat(presentCycle.paidLeaves) + parseFloat(presentCycle.presentDay_0) + parseFloat(presentCycle.adjustment))
      //payableDay = presentCycle.paidDays
    }
  
    return LOP;
  }

  getCurrentPresentDay(Presentdayvalue, presentcycle,rowIndex){
    if(Presentdayvalue != ''){
    let presentday :any;
    if(this.selectedEmpData[this.index].cycleName != this.selectedEmpData[this.index].currentcycleName){
     // if(parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay) < parseFloat(leaveWithoutPayvalue)){
      this.presentDay_0 = parseFloat(Presentdayvalue) - parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].presentDay_0)  
     // }else{
     //   leaveWithoutPay = parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay) - parseFloat(leaveWithoutPayvalue)
     // }
    }else{
      this.presentDay_0 = Presentdayvalue                 
    }
    // this.presentDay_0 = presentday;
    if (this.attendanceSaveData.length > 0) {
      this.attendanceSaveData.forEach((element, index) => {
        if (element.attendanceInputId == presentcycle.attendanceInputId) {
          let ind = index;
          let totalLeaves = parseFloat(element.weeklyOff) + parseFloat(element.holiday) + parseFloat(element.paidLeaves) +  parseFloat(this.presentDay_0)
          console.log("total leaves in presnt: "+ totalLeaves)
          if(totalLeaves <= 1){
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
            "leaveWithoutPay" : parseFloat(element.leaveWithoutPay),
            "presentDay_0":parseFloat(this.presentDay_0),
            "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
          })
          this.attendanceInputAPIRecordsUIData[rowIndex].presentDay_0 = parseFloat(this.presentDay_0)
        }else{
          this.toster.warning("","You can not exceed the leave count more then one")
          //presentday = 0.0
          this.attendanceInputAPIRecordsUIData[rowIndex].presentDay_0 = "0.00"
        } 
        }
        else {
          let length = this.attendanceSaveData.length - 1
        if(this.attendanceSaveData[length].attendanceInputId == presentcycle.attendanceInputId){ return;}
        else{ 
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
            "holiday":0,
            "leaveWithoutPay" : parseFloat(element.leaveWithoutPay),
            "presentDay_0":parseFloat(this.presentDay_0),
            "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
          })
        }
          this.attendanceInputAPIRecordsUIData[rowIndex].presentDay_0 = parseFloat(this.presentDay_0)
        }
      });
    } else {
      let totalLeaves = parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].weeklyOff) + parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].holiday) + parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].paidLeaves) +  parseFloat(this.presentDay_0)
      console.log("total presentDay: " +totalLeaves)
      if(totalLeaves <= 1){
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
          "leaveWithoutPay" : this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay,
          "presentDay_0":parseFloat(this.presentDay_0),
          "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
        })
        this.attendanceInputAPIRecordsUIData[rowIndex].presentDay_0 = parseFloat(this.presentDay_0)
      }else{
        this.toster.warning("","You can not exceed the leave count more then one")
        //this.presentDay_0 = 0.0
        this.attendanceInputAPIRecordsUIData[rowIndex].presentDay_0 = "0.00"
       
      }
    }

   console.log("this.leaveWithoutPay: " + JSON.stringify(this.attendanceSaveData))
   this.getPresentCycleLeaveWithoutPayTotal();
  }
}

  /** Calculate current cycle weekly off  */
  getPresentCycleWeeklyOffTotal(){
    let total = 0.0
    this.attendanceInputAPIRecordsUIData.forEach(element => {
      total = total + parseFloat(element.weeklyOff)
     
    });
    return total.toFixed(2);
  }

  /** Calculate current cycle weekly off  */
  getPresentCycleHolidayTotal(){
    let total = 0.0
    this.attendanceInputAPIRecordsUIData.forEach(element => {
      total = total + parseFloat(element.holiday)
     
    });
    return total.toFixed(2);
  }

  /** Calculate current cycle weekly off  */
  getPresentCycleLeaveTotal(){
    let total = 0.0
    this.attendanceInputAPIRecordsUIData.forEach(element => {
      total = total + parseFloat(element.paidLeaves)
     
    });
    return total.toFixed(2);
  }

  /** Calculate current cycle weekly off  */
  getPresentCycleLeaveWithoutPayTotal(){
    let total = 0.0
    if(this.defaultAttendace == '1'){
      this.attendanceInputAPIRecordsUIData.forEach(element => {
        total = total + parseFloat(element.leaveWithoutPay)   
      });
    }else{
      this.attendanceInputAPIRecordsUIData.forEach(element => {
        total = total + parseFloat(element.leaveWithoutPay_0)   
      });
    }
    return total.toFixed(2);
  }

  getPresentCyclePresentDayTotal(){
    let total = 0.0
    if(this.defaultAttendace == '0'){
    this.attendanceInputAPIRecordsUIData.forEach(element => {
      total = total + parseFloat(element.presentDay_0)
     
    });
  }else{
    this.attendanceInputAPIRecordsUIData.forEach(element => {
      total = total + parseFloat(element.presentDay)
     
    });
  }
    return total.toFixed(2);
  }

  getPresentCycleAdjTotal(){
    let total = 0.0
    this.attendanceInputAPIRecordsUIData.forEach(element => {
      total = total + parseFloat(element.adjustment)
     
    });
    return total.toFixed(2);
  }

  getPresentCyclePaybleDaysTotal(){
    let total : any = 0.0
    this.attendanceInputAPIRecordsUIData.forEach(element => {
      total = total + parseFloat(element.paidDays)
    });
    return total.toFixed(2);
  }

// ****************************Current Cycle Functions Ends******************************************  


// ****************************Future Cycle Functions Starts******************************************
  
   /** Set Leave data for Holiday leave - Future Cycle */
   getFutureHoliday(holidayvalue, futureCycle,rowIndex) {
     if(holidayvalue != ''){
    let holiday : any;
    if(this.selectedEmpData[this.index].cycleName != this.selectedEmpData[this.index].currentcycleName){
     // if(parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].holiday) < parseFloat(holidayvalue)){
        holiday = parseFloat(holidayvalue) - parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].holiday)  
      //}else{
      //  holiday = parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].holiday) - parseFloat(holidayvalue)
     // }
    }else{
      holiday = holidayvalue
    }
      if (this.attendanceSaveData.length > 0) {
        this.attendanceSaveData.forEach((element, index) => {
          // alert( presentcycle.attendanceInputId)
          if (element.attendanceInputId == futureCycle.attendanceInputId) {
            let ind = index;
            let totalLeaves
            if(this.defaultAttendace == '1'){
            totalLeaves = parseFloat(element.paidLeaves) + parseFloat(element.weeklyOff) + parseFloat(element.leaveWithoutPay) + parseFloat(holiday)
            }else{
              totalLeaves = parseFloat(element.paidLeaves) + parseFloat(element.weeklyOff) + parseFloat(element.presentDay_0) + parseFloat(holiday)
            }
            // let totalLeaves = element.paidLeaves + element.weeklyOff + element.leaveWithoutPay + parseFloat(holiday)
            if(totalLeaves <= 1){
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
                "leaveWithoutPay" : element.leaveWithoutPay,
                "presentDay_0":this.presentDay_0,
                "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
    
              })
              this.attendanceInputGetAPIFuturecyclesData[rowIndex].holiday = holiday
            }else{
              this.toster.warning("","You can not exceed the leave count more then one")
              holiday = 0.00
              this.attendanceInputGetAPIFuturecyclesData[rowIndex].holiday = '0.00'
            } 
          }
          else {
            // alert('here')
            let length = this.attendanceSaveData.length - 1
          if(this.attendanceSaveData[length].attendanceInputId == futureCycle.attendanceInputId){ return;}
          else{
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
              "leaveWithoutPay" : 0,
              "presentDay_0":this.presentDay_0,
              "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
            })
          }
            this.attendanceInputGetAPIFuturecyclesData[rowIndex].holiday = holiday
          }
        });
      } else {
        let totalLeaves;
        if(this.defaultAttendace == '1'){
          totalLeaves = parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].paidLeaves) + parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].weeklyOff) + parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].leaveWithoutPay) + parseFloat(holiday)
        }else{
          totalLeaves = parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].paidLeaves) + parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].weeklyOff) + parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].presentDay_0) + parseFloat(holiday)
        }
        //let totalLeaves = this.attendanceInputGetAPIFuturecyclesData[rowIndex].paidLeaves + this.attendanceInputGetAPIFuturecyclesData[rowIndex].weeklyOff + this.attendanceInputGetAPIFuturecyclesData[rowIndex].leaveWithoutPay + parseFloat(holiday)
        console.log("total: " +totalLeaves)
        if(totalLeaves <= 1){
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
            "leaveWithoutPay" : this.attendanceInputGetAPIFuturecyclesData[rowIndex].leaveWithoutPay,
            "presentDay_0":this.presentDay_0,
            "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
          })
          this.attendanceInputGetAPIFuturecyclesData[rowIndex].holiday = holiday
        }else{
          this.toster.warning("","You can not exceed the leave count more then one")
          holiday = 0.00
          this.attendanceInputGetAPIFuturecyclesData[rowIndex].holiday = '0.00'
         
        }
      }
    

    console.log("this.holiday: " + JSON.stringify(this.attendanceSaveData))
      this.getFutureCycleHolidayTotal();
    }
  }

  /** Set Leave data for Weekly leave - Future Cycle */
  getFutureWeeklyOff(weeklyOffvalue, futureCycle,rowIndex) {
    if(weeklyOffvalue != ''){
    let weeklyOff : any;
    if(this.selectedEmpData[this.index].cycleName != this.selectedEmpData[this.index].currentcycleName){
     // if(parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].weeklyOff) < parseFloat(weeklyOffvalue)){
        weeklyOff = parseFloat(weeklyOffvalue) - parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].weeklyOff)  
     // }else{
     //   weeklyOff = parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].weeklyOff) - parseFloat(weeklyOffvalue)
     // }
    }else{
      weeklyOff = weeklyOffvalue
    }
    if (this.attendanceSaveData.length > 0) {
      this.attendanceSaveData.forEach((element, index) => {
        if (element.attendanceInputId == futureCycle.attendanceInputId) {
          let ind = index;
          let totalLeaves;
          if(this.defaultAttendace == '1'){
            totalLeaves = parseFloat(element.paidLeaves) + parseFloat(element.holiday) + parseFloat(element.leaveWithoutPay) + parseFloat(weeklyOff)
            }else{
              totalLeaves = parseFloat(element.paidLeaves) + parseFloat(element.holiday) + parseFloat(element.presentDay_0) + parseFloat(weeklyOff)
            }
          //let totalLeaves = element.paidLeaves + element.holiday + element.leaveWithoutPay + parseFloat(weeklyOff)
          if(totalLeaves <= 1){
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
            "leaveWithoutPay" : parseFloat(element.leaveWithoutPay),
            "presentDay_0":this.presentDay_0,
            "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
          })
          this.attendanceInputGetAPIFuturecyclesData[rowIndex].weeklyOff = weeklyOff
        }else{
          this.toster.warning("","You can not exceed the leave count more then one")
          weeklyOff = 0.0
          this.attendanceInputGetAPIFuturecyclesData[rowIndex].weeklyOff = '0.00'
        } 
        }
        else {
          let length = this.attendanceSaveData.length - 1
          if(this.attendanceSaveData[length].attendanceInputId == futureCycle.attendanceInputId){ return;}
          else{
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
            "leaveWithoutPay" : 0,
            "presentDay_0":this.presentDay_0,
            "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
          })
        }
          this.attendanceInputGetAPIFuturecyclesData[rowIndex].weeklyOff = weeklyOff
        }
      });
    } else {
      let totalLeaves;
      if(this.defaultAttendace == '1'){
        totalLeaves = parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].paidLeaves) + parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].holiday) + parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].leaveWithoutPay) + parseFloat(weeklyOff)
      }else{
        totalLeaves = parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].paidLeaves) + parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].holiday) + parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].presentDay_0) + parseFloat(weeklyOff)
      }
     // let totalLeaves = this.attendanceInputGetAPIFuturecyclesData[rowIndex].paidLeaves + this.attendanceInputGetAPIFuturecyclesData[rowIndex].holiday + this.attendanceInputGetAPIFuturecyclesData[rowIndex].leaveWithoutPay + parseFloat(weeklyOff)
      console.log("total wweklyoff: " +totalLeaves)
      if(totalLeaves <= 1){
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
          "leaveWithoutPay" : this.attendanceInputGetAPIFuturecyclesData[rowIndex].leaveWithoutPay,
          "presentDay_0":this.presentDay_0,
          "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
        })
        this.attendanceInputGetAPIFuturecyclesData[rowIndex].weeklyOff = weeklyOff
      }else{
        this.toster.warning("","You can not exceed the leave count more then one")
        weeklyOff = 0.0
        this.attendanceInputGetAPIFuturecyclesData[rowIndex].weeklyOff = '0.00'
       
      }
    }

   console.log("this.weeklyOff: " + JSON.stringify(this.attendanceSaveData))
   this.getFutureCycleWeeklyOffTotal();
  }
  }

  /** Set Leave data for Paid leave - Future Cycle */
  getFuturePaidLeaves(paidLeavesvalue, futureCycle,rowIndex){
    if(paidLeavesvalue != ''){
    let paidLeaves : any;
    if(this.selectedEmpData[this.index].cycleName != this.selectedEmpData[this.index].currentcycleName){
     // if(parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].paidLeaves) < parseFloat(paidLeavesvalue)){
        paidLeaves = parseFloat(paidLeavesvalue) - parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].paidLeaves)  
     // }else{
     //   paidLeaves = parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].paidLeaves) - parseFloat(paidLeavesvalue)
     // }
    }else{
      paidLeaves = paidLeavesvalue
    }
    if (this.attendanceSaveData.length > 0) {
      this.attendanceSaveData.forEach((element, index) => {
        if (element.attendanceInputId == futureCycle.attendanceInputId) {
          let ind = index;
          let totalLeaves;
          if(this.defaultAttendace == '1'){
            totalLeaves = parseFloat(element.holiday) + parseFloat(element.weeklyOff) + parseFloat(element.leaveWithoutPay) + parseFloat(paidLeaves)
            }else{
              totalLeaves = parseFloat(element.holiday) + parseFloat(element.weeklyOff) + parseFloat(element.presentDay_0) + parseFloat(paidLeaves)
            }
         // let totalLeaves = element.weeklyOff + element.holiday + element.leaveWithoutPay + parseFloat(paidLeaves)
          if(totalLeaves <= 1){
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
            "leaveWithoutPay" : parseFloat(element.leaveWithoutPay),
            "presentDay_0":this.presentDay_0,
            "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
          })
          this.attendanceInputGetAPIFuturecyclesData[rowIndex].paidLeaves = paidLeaves
        }else{
          this.toster.warning("","You can not exceed the leave count more then one")
          paidLeaves = 0.0
          this.attendanceInputGetAPIFuturecyclesData[rowIndex].paidLeaves = '0.00'
        } 
        }
        else {
          let length = this.attendanceSaveData.length - 1
          if(this.attendanceSaveData[length].attendanceInputId == futureCycle.attendanceInputId){ return;}
          else{
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
            "leaveWithoutPay" : 0,
            "presentDay_0":this.presentDay_0,
            "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
          })
        }
          this.attendanceInputGetAPIFuturecyclesData[rowIndex].paidLeaves = paidLeaves
        }
      });
    } else {

      let totalLeaves;
      if(this.defaultAttendace == '1'){
        totalLeaves = parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].weeklyOff) + parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].holiday) + parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].leaveWithoutPay) + parseFloat(paidLeaves)
      }else{
        totalLeaves = parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].weeklyOff) + parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].holiday) + parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].presentDay_0) + parseFloat(paidLeaves)
      }
     // let totalLeaves = this.attendanceInputGetAPIFuturecyclesData[rowIndex].weeklyOff + this.attendanceInputGetAPIFuturecyclesData[rowIndex].holiday + this.attendanceInputGetAPIFuturecyclesData[rowIndex].leaveWithoutPay + parseFloat(paidLeaves)
      console.log("total wweklyoff: " +totalLeaves)
      if(totalLeaves <= 1){
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
          "leaveWithoutPay" : this.attendanceInputGetAPIFuturecyclesData[rowIndex].leaveWithoutPay,
          "presentDay_0":this.presentDay_0,
          "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
        })
        this.attendanceInputGetAPIFuturecyclesData[rowIndex].paidLeaves = paidLeaves
      }else{
        this.toster.warning("","You can not exceed the leave count more then one")
        paidLeaves = 0.0
        this.attendanceInputGetAPIFuturecyclesData[rowIndex].paidLeaves = '0.00'
       
      }
    }

   console.log("this.paidLeaves: " + JSON.stringify(this.attendanceSaveData))
   this.getFutureCycleLeaveTotal();
  }
  }


  /** Set Leave data for Paid leave - Future Cycle */
  getFutureLeaveWithoutPay(leaveWithoutPayvalue, futureCycle,rowIndex){
    if(leaveWithoutPayvalue != ''){
    let leaveWithoutPay :any;
    if(this.selectedEmpData[this.index].cycleName != this.selectedEmpData[this.index].currentcycleName){
      //if(parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].leaveWithoutPay) < parseFloat(leaveWithoutPayvalue)){
        leaveWithoutPay = parseFloat(leaveWithoutPayvalue) - parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].leaveWithoutPay)  
      //}else{
      //  leaveWithoutPay = parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].leaveWithoutPay) - parseFloat(leaveWithoutPayvalue)
      //}
    }else{
      leaveWithoutPay = leaveWithoutPayvalue
    }

      if (this.attendanceSaveData.length > 0) {
        this.attendanceSaveData.forEach((element, index) => {
          if (element.attendanceInputId == futureCycle.attendanceInputId) {
            let ind = index;
            let totalLeaves = parseFloat(element.weeklyOff) + parseFloat(element.holiday) + parseFloat(element.paidLeaves) + parseFloat(leaveWithoutPay)
            if(totalLeaves <= 1){
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
              "leaveWithoutPay" : parseFloat(leaveWithoutPay),
              "presentDay_0":this.presentDay_0,
              "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
            })
            this.attendanceInputGetAPIFuturecyclesData[rowIndex].leaveWithoutPay = leaveWithoutPay
          }else{
            this.toster.warning("","You can not exceed the leave count more then one")
            leaveWithoutPay = 0.0
            this.attendanceInputGetAPIFuturecyclesData[rowIndex].leaveWithoutPay = '0.00'
          } 
          }
          else {
            let length = this.attendanceSaveData.length - 1
            if(this.attendanceSaveData[length].attendanceInputId == futureCycle.attendanceInputId){ return;}
            else{
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
              "leaveWithoutPay" : parseFloat(leaveWithoutPay),
              "presentDay_0":this.presentDay_0,
              "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
            })
          }
            this.attendanceInputGetAPIFuturecyclesData[rowIndex].leaveWithoutPay = leaveWithoutPay
          }
        });
      } else {
        let totalLeaves = parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].weeklyOff) + parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].holiday) + parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].paidLeaves) + parseFloat(leaveWithoutPay)
        console.log("total wweklyoff: " +totalLeaves)
        if(totalLeaves <= 1){
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
            "leaveWithoutPay" : parseFloat(leaveWithoutPay),
            "presentDay_0":this.presentDay_0,
            "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
          })
          this.attendanceInputGetAPIFuturecyclesData[rowIndex].leaveWithoutPay = leaveWithoutPay
        }else{
          this.toster.warning("","You can not exceed the leave count more then one")
          leaveWithoutPay = 0.0
          this.attendanceInputGetAPIFuturecyclesData[rowIndex].leaveWithoutPay = '0.00'
         
        }
      }
  
     console.log("this.leaveWithoutPay: " + JSON.stringify(this.attendanceSaveData))
     this.getFutureCycleLeaveWithoutPayTotal();
    }
  }


  getFuturePresentDay(Presentdayvalue, presentcycle,rowIndex){
    if(Presentdayvalue != ''){
    let presentday :any;
    if(this.selectedEmpData[this.index].cycleName != this.selectedEmpData[this.index].currentcycleName){
     // if(parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay) < parseFloat(leaveWithoutPayvalue)){
        presentday = parseFloat(Presentdayvalue) - parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].presentDay_0)  
     // }else{
     //   leaveWithoutPay = parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay) - parseFloat(leaveWithoutPayvalue)
     // }
    }else{
      presentday = Presentdayvalue                 
    }
    this.presentDay_0 = presentday;

    if (this.attendanceSaveData.length > 0) {
      this.attendanceSaveData.forEach((element, index) => {
        if (element.attendanceInputId == presentcycle.attendanceInputId) {
          let ind = index;
          let totalLeaves = parseFloat(element.weeklyOff) + parseFloat(element.holiday) + parseFloat(element.paidLeaves) + parseFloat(this.presentDay_0)
          if(totalLeaves <= 1){
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
            "leaveWithoutPay" : parseFloat(element.leaveWithoutPay),
            "presentDay_0":parseFloat(this.presentDay_0),
            "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
          })
          this.attendanceInputGetAPIFuturecyclesData[rowIndex].presentDay_0 = parseFloat(this.presentDay_0)
        }else{
          this.toster.warning("","You can not exceed the leave count more then one")
          presentday = 0.0
          this.attendanceInputGetAPIFuturecyclesData[rowIndex].presentDay_0 = '0.00'
        } 
        }
        else {
          let length = this.attendanceSaveData.length - 1
        if(this.attendanceSaveData[length].attendanceInputId == presentcycle.attendanceInputId){ return;}
        else{ 
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
            "holiday":0,
            "leaveWithoutPay" : parseFloat(element.leaveWithoutPay),
            "presentDay_0":parseFloat(this.presentDay_0),
            "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
          })
        }
          this.attendanceInputGetAPIFuturecyclesData[rowIndex].presentDay_0 = parseFloat(this.presentDay_0)
        }
      });
    } else {
      let totalLeaves = parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].weeklyOff) + parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].holiday) + parseFloat(this.attendanceInputGetAPIFuturecyclesData[rowIndex].paidLeaves) +  parseFloat(this.presentDay_0)
      console.log("total wweklyoff: " +totalLeaves)
      if(totalLeaves <= 1){
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
          "leaveWithoutPay" : this.attendanceInputGetAPIFuturecyclesData[rowIndex].leaveWithoutPay,
          "presentDay_0":parseFloat(this.presentDay_0),
          "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
        })
        this.attendanceInputGetAPIFuturecyclesData[rowIndex].presentDay_0 = parseFloat(this.presentDay_0)
      }else{
        this.toster.warning("","You can not exceed the leave count more then one")
        this.presentDay_0 = 0.0
        this.attendanceInputGetAPIFuturecyclesData[rowIndex].presentDay_0 = '0.00'
       
      }
    }

  // console.log("this.leaveWithoutPay: " + JSON.stringify(this.attendanceSaveData))
   this.getFutureCyclePresentDayTotal();
  }
}




 
    getFutureCycleWeeklyOffTotal(){
      let total = 0.0
      this.attendanceInputGetAPIFuturecyclesData.forEach(element => {
        total = total + parseFloat(element.weeklyOff)
       
      });
      return total.toFixed(2);
    }
  

    getFutureCycleHolidayTotal(){
      let total = 0.0
      this.attendanceInputGetAPIFuturecyclesData.forEach(element => {
        total = total + parseFloat(element.holiday)
       
      });
      return total.toFixed(2);
    }
  
    
    getFutureCycleLeaveTotal(){
      let total = 0.0
      this.attendanceInputGetAPIFuturecyclesData.forEach(element => {
        total = total + parseFloat(element.paidLeaves)
       
      });
      return total.toFixed(2);
    }
  
   
    getFutureCycleLeaveWithoutPayTotal(){
      let total = 0.0
      if(this.defaultAttendace == '1'){
      this.attendanceInputGetAPIFuturecyclesData.forEach(element => {
      
        total = total + parseFloat(element.leaveWithoutPay)
       
      });
    }else{
      this.attendanceInputGetAPIFuturecyclesData.forEach(element => {
      
        total = total + parseFloat(element.leaveWithoutPay_0)
       
      });
    }
      return total.toFixed(2);
    }

    getFutureCyclePresentDayTotal(){
      let total = 0.0
      if(this.defaultAttendace == '0'){
      this.attendanceInputGetAPIFuturecyclesData.forEach(element => {
        total = total + parseFloat(element.presentDay_0)
       
      });
    }else{
      this.attendanceInputGetAPIFuturecyclesData.forEach(element => {
        total = total + parseFloat(element.presentDay)
       
      });
    }
      return total.toFixed(2);
    }
  
    getFutureCycleAdjTotal(){
      let total = 0.0
      this.attendanceInputGetAPIFuturecyclesData.forEach(element => {
        total = total + parseFloat(element.adjustment)
       
      });
      return total.toFixed(2);
    }
  
    getFutureCyclePaybleDaysTotal(){
      let total = 0.0
      this.attendanceInputGetAPIFuturecyclesData.forEach(element => {
        total = total + parseFloat(element.paidDays)
       
      });
      return total.toFixed(2);
    }

    

// **********************************Future Cycle Functions Ends***********************************************


// **********************************Previous Cycle Functions Starts***********************************************

   /** Set Leave data for Holiday leave - Previous Cycle */
  getPreviousHoliday(holidayvalue, previousCycle,rowIndex) {
    if(holidayvalue != ''){
    let holiday : any;
    if(this.selectedEmpData[this.index].cycleName != this.selectedEmpData[this.index].currentcycleName){
      // if(parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].holiday) < parseFloat(holidayvalue)){
        holiday = parseFloat(holidayvalue) - parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].holiday)  
      // }else{
      //   holiday = parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].holiday) - parseFloat(holidayvalue)
      // }
    }else{
      holiday = holidayvalue
    }
      if (this.attendanceSaveData.length > 0) {
        this.attendanceSaveData.forEach((element, index) => {
          // alert( presentcycle.attendanceInputId)
          if (element.attendanceInputId == previousCycle.attendanceInputId) {
            let ind = index;
            let totalLeaves
            if(this.defaultAttendace == '1'){
            totalLeaves = parseFloat(element.paidLeaves) + parseFloat(element.weeklyOff) + parseFloat(element.leaveWithoutPay) + parseFloat(holiday)
            }else{
              totalLeaves = parseFloat(element.paidLeaves) + parseFloat(element.weeklyOff) + parseFloat(element.presentDay_0) + parseFloat(holiday)
            }
           // let totalLeaves = element.paidLeaves + element.weeklyOff + element.leaveWithoutPay + parseFloat(holiday)
            if(totalLeaves <= 1){
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
                "leaveWithoutPay" : element.leaveWithoutPay,
                "presentDay_0":this.presentDay_0,
                "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
    
              })
              this.attendanceInputGetAPIPreviouscycleData[rowIndex].holiday = holiday
            }else{
              this.toster.warning("","You can not exceed the leave count more then one")
              holiday = 0.0
              this.attendanceInputGetAPIPreviouscycleData[rowIndex].holiday = '0.00'
            } 
          }
          else {
            // alert('here')
            let length = this.attendanceSaveData.length - 1
            if(this.attendanceSaveData[length].attendanceInputId == previousCycle.attendanceInputId){ return;}
            else{
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
              "leaveWithoutPay" : element.leaveWithoutPay,
              "presentDay_0":this.presentDay_0,
              "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
            })
          }
            this.attendanceInputGetAPIPreviouscycleData[rowIndex].holiday = holiday
          }
        });
      } else {

        let totalLeaves;
        if(this.defaultAttendace == '1'){
          totalLeaves = parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].paidLeaves) + parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].weeklyOff) + parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].leaveWithoutPay) + parseFloat(holiday)
        }else{
          totalLeaves = parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].paidLeaves) + parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].weeklyOff) + parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].presentDay_0) + parseFloat(holiday)
        }
       // let totalLeaves = this.attendanceInputGetAPIPreviouscycleData[rowIndex].paidLeaves + this.attendanceInputGetAPIPreviouscycleData[rowIndex].weeklyOff + this.attendanceInputGetAPIPreviouscycleData[rowIndex].leaveWithoutPay + parseFloat(holiday)
        console.log("total: " +totalLeaves)
        if(totalLeaves <= 1){
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
            "leaveWithoutPay" : this.attendanceInputGetAPIPreviouscycleData[rowIndex].leaveWithoutPay,
            "presentDay_0":this.presentDay_0,
            "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
          })
          this.attendanceInputGetAPIPreviouscycleData[rowIndex].holiday = holiday
        }else{
          this.toster.warning("","You can not exceed the leave count more then one")
          holiday = 0.0
          this.attendanceInputGetAPIPreviouscycleData[rowIndex].holiday = '0.00'
         
        }
      }
    

    console.log("this.holiday: " + JSON.stringify(this.attendanceSaveData))
    this.getPreviousCycleHolidayTotal();
    }
  }

  /** Set Leave data for Weekly leave - Previous Cycle */
  getPreviousWeeklyOff(weeklyOffvalue, previousCycle,rowIndex) {
    if(weeklyOffvalue != ''){
    let weeklyOff : any;
    if(this.selectedEmpData[this.index].cycleName != this.selectedEmpData[this.index].currentcycleName){
 //     if(parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].weeklyOff) < parseFloat(weeklyOffvalue)){
        weeklyOff = parseFloat(weeklyOffvalue) - parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].weeklyOff)  
   //   }
      // else{
      //   weeklyOff = parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].weeklyOff) - parseFloat(weeklyOffvalue)
      // }
    }else{
      weeklyOff = weeklyOffvalue
    }
    if (this.attendanceSaveData.length > 0) {
      this.attendanceSaveData.forEach((element, index) => {
        if (element.attendanceInputId == previousCycle.attendanceInputId) {
          let ind = index;
          let totalLeaves;
          if(this.defaultAttendace == '1'){
            totalLeaves = parseFloat(element.paidLeaves) + parseFloat(element.holiday) + parseFloat(element.leaveWithoutPay) + parseFloat(weeklyOff)
            }else{
              totalLeaves = parseFloat(element.paidLeaves) + parseFloat(element.holiday) + parseFloat(element.presentDay_0) + parseFloat(weeklyOff)
            }
          //let totalLeaves = element.paidLeaves + element.holiday + element.leaveWithoutPay + parseFloat(weeklyOff)
          if(totalLeaves <= 1){
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
            "leaveWithoutPay" : parseFloat(element.leaveWithoutPay),
            "presentDay_0":this.presentDay_0,
            "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
          })
          this.attendanceInputGetAPIPreviouscycleData[rowIndex].weeklyOff = weeklyOff
        }else{
          this.toster.warning("","You can not exceed the leave count more then one")
          weeklyOff = 0.0
          this.attendanceInputGetAPIPreviouscycleData[rowIndex].weeklyOff = '0.00'
        } 
        }
        else {
          let length = this.attendanceSaveData.length - 1
            if(this.attendanceSaveData[length].attendanceInputId == previousCycle.attendanceInputId){ return;}
            else{
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
            "leaveWithoutPay" : parseFloat(element.leaveWithoutPay),
            "presentDay_0":this.presentDay_0,
            "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
          })
        }
          this.attendanceInputGetAPIPreviouscycleData[rowIndex].weeklyOff = weeklyOff
        }
      });
    } else {
      let totalLeaves;
      if(this.defaultAttendace == '1'){
        totalLeaves = parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].paidLeaves) + parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].holiday) + parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].leaveWithoutPay) + parseFloat(weeklyOff)
      }else{
        totalLeaves = parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].paidLeaves) + parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].holiday) + parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].presentDay_0) + parseFloat(weeklyOff)
      }
      //let totalLeaves = this.attendanceInputGetAPIPreviouscycleData[rowIndex].paidLeaves + this.attendanceInputGetAPIPreviouscycleData[rowIndex].holiday + this.attendanceInputGetAPIPreviouscycleData[rowIndex].leaveWithoutPay + parseFloat(weeklyOff)
      console.log("total wweklyoff: " +totalLeaves)
      if(totalLeaves <= 1){
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
          "leaveWithoutPay" : this.attendanceInputGetAPIPreviouscycleData[rowIndex].leaveWithoutPay,
          "presentDay_0":this.presentDay_0,
          "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
        })
        this.attendanceInputGetAPIPreviouscycleData[rowIndex].weeklyOff = weeklyOff
      }else{
        this.toster.warning("","You can not exceed the leave count more then one")
        weeklyOff = 0.0
        this.attendanceInputGetAPIPreviouscycleData[rowIndex].weeklyOff = '0.00'
       
      }
    }

   console.log("this.weeklyOff: " + JSON.stringify(this.attendanceSaveData))
   this.getPreviousCycleWeeklyOffTotal();
  }
  }

  /** Set Leave data for Paid leave - Previous Cycle */
  getPreviousPaidLeaves(paidLeavesvalue, previousCycle,rowIndex){
    if(paidLeavesvalue != ''){
    let paidLeaves : any;
    if(this.selectedEmpData[this.index].cycleName != this.selectedEmpData[this.index].currentcycleName){
     // if(parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].paidLeaves) < parseFloat(paidLeavesvalue)){
        paidLeaves = parseFloat(paidLeavesvalue) - parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].paidLeaves)  
     // }else{
     //   paidLeaves = parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].paidLeaves) - parseFloat(paidLeavesvalue)
     // }
    }else{
      paidLeaves = paidLeavesvalue
    }
    if (this.attendanceSaveData.length > 0) {
      this.attendanceSaveData.forEach((element, index) => {
        if (element.attendanceInputId == previousCycle.attendanceInputId) {
          let ind = index;
          let totalLeaves;
          if(this.defaultAttendace == '1'){
            totalLeaves = parseFloat(element.holiday) + parseFloat(element.weeklyOff) + parseFloat(element.leaveWithoutPay) + parseFloat(paidLeaves)
            }else{
              totalLeaves = parseFloat(element.holiday) + parseFloat(element.weeklyOff) + parseFloat(element.presentDay_0) + parseFloat(paidLeaves)
            }
          //let totalLeaves = element.weeklyOff + element.holiday + element.leaveWithoutPay + parseFloat(paidLeaves)
          if(totalLeaves <= 1){
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
            "leaveWithoutPay" : parseFloat(element.leaveWithoutPay),
            "presentDay_0":this.presentDay_0,
            "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
          })
          this.attendanceInputGetAPIPreviouscycleData[rowIndex].paidLeaves = paidLeaves
        }else{
          this.toster.warning("","You can not exceed the leave count more then one")
          paidLeaves = 0.0
          this.attendanceInputGetAPIPreviouscycleData[rowIndex].paidLeaves = '0.00'
        } 
        }
        else {
          let length = this.attendanceSaveData.length - 1
            if(this.attendanceSaveData[length].attendanceInputId == previousCycle.attendanceInputId){ return;}
            else{
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
            "leaveWithoutPay" : parseFloat(element.leaveWithoutPay),
            "presentDay_0":this.presentDay_0,
            "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
          })
        }
          this.attendanceInputGetAPIPreviouscycleData[rowIndex].paidLeaves = paidLeaves
        }
      });
    } else {
      let totalLeaves;
      if(this.defaultAttendace == '1'){
        totalLeaves = parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].weeklyOff) + parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].holiday) + parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].leaveWithoutPay) + parseFloat(paidLeaves)
      }else{
        totalLeaves = parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].weeklyOff) + parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].holiday) + parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].presentDay_0) + parseFloat(paidLeaves)
      }
      //let totalLeaves = this.attendanceInputGetAPIPreviouscycleData[rowIndex].weeklyOff + this.attendanceInputGetAPIPreviouscycleData[rowIndex].holiday + this.attendanceInputGetAPIPreviouscycleData[rowIndex].leaveWithoutPay + parseFloat(paidLeaves)
      console.log("total wweklyoff: " +totalLeaves)
      if(totalLeaves <= 1){
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
          "leaveWithoutPay" : this.attendanceInputGetAPIPreviouscycleData[rowIndex].leaveWithoutPay,
          "presentDay_0":this.presentDay_0,
          "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
        })
        this.attendanceInputGetAPIPreviouscycleData[rowIndex].paidLeaves = paidLeaves
      }else{
        this.toster.warning("","You can not exceed the leave count more then one")
        paidLeaves = 0.0
        this.attendanceInputGetAPIPreviouscycleData[rowIndex].paidLeaves = '0.00'
       
      }
    }

   console.log("this.paidLeaves: " + JSON.stringify(this.attendanceSaveData))
   this.getPreviousCycleLeaveTotal();
  }
  }


  /** Set Leave data for Paid leave - Previous Cycle */
  getPreviousLeaveWithoutPay(leaveWithoutPayvalue, previousCycle,rowIndex){
    if(leaveWithoutPayvalue != ''){
    let leaveWithoutPay :any;
    if(this.selectedEmpData[this.index].cycleName != this.selectedEmpData[this.index].currentcycleName){
     // if(parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].leaveWithoutPay) < parseFloat(leaveWithoutPayvalue)){
        leaveWithoutPay = parseFloat(leaveWithoutPayvalue) - parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].leaveWithoutPay)  
     // }else{
     //   leaveWithoutPay = parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].leaveWithoutPay) - parseFloat(leaveWithoutPayvalue)
     // }
    }else{
      leaveWithoutPay = leaveWithoutPayvalue
    }

      if (this.attendanceSaveData.length > 0) {
        this.attendanceSaveData.forEach((element, index) => {
          if (element.attendanceInputId == previousCycle.attendanceInputId) {
            let ind = index;
            let totalLeaves = parseFloat(element.weeklyOff) + parseFloat(element.holiday) + parseFloat(element.paidLeaves) + parseFloat(leaveWithoutPay)
            if(totalLeaves <= 1){
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
              "leaveWithoutPay" : parseFloat(leaveWithoutPay),
              "presentDay_0":this.presentDay_0,
              "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
            })
            this.attendanceInputGetAPIPreviouscycleData[rowIndex].leaveWithoutPay = leaveWithoutPay
          }else{
            this.toster.warning("","You can not exceed the leave count more then one")
            leaveWithoutPay = 0.0
            this.attendanceInputGetAPIPreviouscycleData[rowIndex].leaveWithoutPay = '0.00'
          } 
          }
          else {
            let length = this.attendanceSaveData.length - 1
            if(this.attendanceSaveData[length].attendanceInputId == previousCycle.attendanceInputId){ return;}
            else{
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
              "leaveWithoutPay" : parseFloat(leaveWithoutPay),
              "presentDay_0":this.presentDay_0,
              "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
            })
          }
            this.attendanceInputGetAPIPreviouscycleData[rowIndex].leaveWithoutPay = leaveWithoutPay
          }
        });
      } else {
        let totalLeaves = parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].weeklyOff) + parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].holiday) + parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].paidLeaves) + parseFloat(leaveWithoutPay)
        console.log("total wweklyoff: " +totalLeaves)
        if(totalLeaves <= 1){
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
            "leaveWithoutPay" : parseFloat(leaveWithoutPay),
            "presentDay_0":this.presentDay_0,
            "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
          })
          this.attendanceInputGetAPIPreviouscycleData[rowIndex].leaveWithoutPay = leaveWithoutPay
        }else{
          this.toster.warning("","You can not exceed the leave count more then one")
          leaveWithoutPay = 0.0
          this.attendanceInputGetAPIPreviouscycleData[rowIndex].leaveWithoutPay = '0.00'
         
        }
      }
  
     console.log("this.leaveWithoutPay: " + JSON.stringify(this.attendanceSaveData))
     this.getPreviousCycleLeaveWithoutPayTotal();
    }
  }


 

  getPreviousPresentDay(Presentdayvalue, presentcycle,rowIndex){
    if(Presentdayvalue != ''){

    let presentday :any;
    if(this.selectedEmpData[this.index].cycleName != this.selectedEmpData[this.index].currentcycleName){
     // if(parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay) < parseFloat(leaveWithoutPayvalue)){
        presentday = parseFloat(Presentdayvalue) - parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].presentDay_0)  
     // }else{
     //   leaveWithoutPay = parseFloat(this.attendanceInputAPIRecordsUIData[rowIndex].leaveWithoutPay) - parseFloat(leaveWithoutPayvalue)
     // }
    }else{
      presentday = Presentdayvalue                 
    }
    this.presentDay_0 = presentday;

    if (this.attendanceSaveData.length > 0) {
      this.attendanceSaveData.forEach((element, index) => {
        if (element.attendanceInputId == presentcycle.attendanceInputId) {
          let ind = index;
          let totalLeaves = parseFloat(element.weeklyOff) + parseFloat(element.holiday) + parseFloat(element.paidLeaves) +  parseFloat(this.presentDay_0)
          if(totalLeaves <= 1){
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
            "leaveWithoutPay" : parseFloat(element.leaveWithoutPay),
            "presentDay_0":parseFloat(this.presentDay_0),
            "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
          })
          this.attendanceInputGetAPIPreviouscycleData[rowIndex].presentDay_0 = parseFloat(this.presentDay_0)
        }else{
          this.toster.warning("","You can not exceed the leave count more then one")
          presentday = 0.0
          this.attendanceInputGetAPIPreviouscycleData[rowIndex].presentDay_0 = '0.00'
        } 
        }
        else {
          let length = this.attendanceSaveData.length - 1
        if(this.attendanceSaveData[length].attendanceInputId == presentcycle.attendanceInputId){ return;}
        else{ 
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
            "holiday":0,
            "leaveWithoutPay" : parseFloat(element.leaveWithoutPay),
            "presentDay_0":parseFloat(this.presentDay_0),
            "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
          })
        }
          this.attendanceInputGetAPIPreviouscycleData[rowIndex].presentDay_0 = this.presentDay_0
        }
      });
    } else {
      let totalLeaves = parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].weeklyOff) + parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].holiday) + parseFloat(this.attendanceInputGetAPIPreviouscycleData[rowIndex].paidLeaves) +  parseFloat(this.presentDay_0)
      console.log("total wweklyoff: " +totalLeaves)
      if(totalLeaves <= 1){
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
          "leaveWithoutPay" : this.attendanceInputGetAPIPreviouscycleData[rowIndex].leaveWithoutPay,
          "presentDay_0":parseFloat(this.presentDay_0),
          "currentCycle": parseInt(this.selectedEmpData[this.index].cycle)
        })
        this.attendanceInputGetAPIPreviouscycleData[rowIndex].presentDay_0 = parseFloat(this.presentDay_0)
      }else{
        this.toster.warning("","You can not exceed the leave count more then one")
        this.presentDay_0 = 0.0
        this.attendanceInputGetAPIPreviouscycleData[rowIndex].presentDay_0 = '0.00'
       
      }
    }

  // console.log("this.leaveWithoutPay: " + JSON.stringify(this.attendanceSaveData))
   this.getPreviousCyclePresentDayTotal();
  }
}



  getPreviousCycleWeeklyOffTotal(){
    let total = 0.0
    this.attendanceInputGetAPIPreviouscycleData.forEach(element => {
      total = total + parseFloat(element.weeklyOff)
     
    });
    return total.toFixed(2);
  }


  getPreviousCycleHolidayTotal(){
    let total = 0.0
    this.attendanceInputGetAPIPreviouscycleData.forEach(element => {
      total = total + parseFloat(element.holiday)
     
    });
    return total.toFixed(2);
  }

  /** Calculate current cycle weekly off  */
  getPreviousCycleLeaveTotal(){
    let total = 0.0
    this.attendanceInputGetAPIPreviouscycleData.forEach(element => {
      total = total + parseFloat(element.paidLeaves)
     
    });
    return total.toFixed(2);
  }

  /** Calculate current cycle weekly off  */
  getPreviousCycleLeaveWithoutPayTotal(){
    let total = 0.0
    if(this.defaultAttendace == '1'){
    this.attendanceInputGetAPIPreviouscycleData.forEach(element => {
      total = total + parseFloat(element.leaveWithoutPay)
     
    });
  }else{
    this.attendanceInputGetAPIPreviouscycleData.forEach(element => {
      total = total + parseFloat(element.leaveWithoutPay_0)
     
    });
  }
    return total.toFixed(2);
  } 
  
  getPreviousCyclePresentDayTotal(){
    let total = 0.0
    if(this.defaultAttendace == '0'){
    this.attendanceInputGetAPIPreviouscycleData.forEach(element => {
      total = total + parseFloat(element.presentDay_0)
     
    });
  }else{
    this.attendanceInputGetAPIPreviouscycleData.forEach(element => {
      total = total + parseFloat(element.presentDay)
     
    });
  }
    return total.toFixed(2);
  }

  getPreviousCycleAdjTotal(){
    let total = 0.0
    this.attendanceInputGetAPIPreviouscycleData.forEach(element => {
      total = total + parseFloat(element.adjustment)
     
    });
    return total.toFixed(2);
  }

  getPreviousCyclePaybleDaysTotal(){
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
        if(this.selectedEmpData.length > 1){
          this.index = this.index + 1;
          this.attendanceInputGetTotalAPIRecordsUI(this.index)
          this.employeeFinDetails()
          this.attendanceInputAPIRecordsUI()
         
        }else{
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
        if(this.selectedEmpData.length > 1){
          this.index = this.index - 1;
          this.attendanceInputGetTotalAPIRecordsUI(this.index)
          this.attendanceInputAPIRecordsUI();
          this.employeeFinDetails();
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
    if(this.selectedEmpData.length > 0){
    this.payrollAreaDetails();
    this.index = 0;
    this.currentCycle = parseInt(this.selectedEmpData[this.index].pertainingCycle); 
    this.attendanceInputGetTotalAPIRecordsUI(this.index);
    this.attendanceInputAPIRecordsUI();
    // this.getAllActiveBussinessYear();
    // this.businessCycleDefinition();
    this.employeeFinDetails();
    this.payrollAssigned();
    this.PayrollAreaByPayrollAreaCode()
    }else{
      this.toster.warning("","Please select atleast one employee")
    }

    this.attendanceInputGetAPIFuturecycle(this.index);
    this.attendanceInputGetAPIPreviouscycle(this.index);
    
  }

  summeryTab() {
    this.fromDate = null;
    this.toDate = null;
    this.tabIndex = 0;
    this.selectedEmpData = []
    
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

  getMonths(date){
    let month = '';
    var d = new Date(date);
    month = this.months[d.getMonth()];
    return month;

  }


  changeTabIndex(index){
    if(this.selectedEmpData.length > 0){
    this.tabIndex = index;
    }
  }

  PayrollAreaByPayrollAreaCode(){
    const formData = new FormData();

   
    formData.append('payrollArea', this.selectedEmpData[this.index].payrollAreacode)


    this.attendanceService.PayrollAreaByPayrollAreaCode(formData).subscribe(
      res => {
        this.PayrollAreaByPayrollAreaCodeData = res.data.results;
        this.defaultAttendace = this.PayrollAreaByPayrollAreaCodeData[0].defaultAttendace;
        this.is30daysPayroll = this.PayrollAreaByPayrollAreaCodeData[0].is30daysPayroll;
        this.payrollAreaId_Payroll = this.PayrollAreaByPayrollAreaCodeData[0].payrollAreaId;
        this.getSelectedPayrollArea();
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
