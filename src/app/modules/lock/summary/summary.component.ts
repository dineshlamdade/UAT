import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { LockService } from '../lock.service';
import { ExcelserviceService } from '../../../core/services/excelservice.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  public areaDataList : Array<any> = [];
  public areaTableList : Array<any> = [];
  public empTableList : Array<any> = [];
  public empDataList : Array<any> = [];
  public asAndWhenTable : Array<any> = [];
  public asAndWhenTableList : Array<any> = [];
  public excelData : Array<any> = [];
  public header : Array<any> = [];
  // public asAndWhenTableList : Array<any> = [];

  constructor(private lockService : LockService, private excelservice: ExcelserviceService,) { }

  ngOnInit(): void {
    this.getAreaSummary();
   this.getEmployeeSummary();
   this.getAsAndWhenTableList();
  //  this.getAsAndWhenSummary();
  }

  getAreaSummary(){
    this.lockService.getAreaSummary().subscribe((res) =>{
      this.areaDataList = res.data.results;
      res.data.results.forEach(element => {
        const obj = {
          cycleLockPayrollAreaId : element.cycleLockPayrollAreaId,
          businessCycleId : element.businessCycleId,
          areaMasterId : element.areaMasterId,
          cycle :  element.cycle,
          serviceName :  element.serviceName,
          payrollAreaCode :  element.payrollAreaCode,
          createdBy :  element.createdBy,
          createDateTime : new Date(element.createDateTime),
          lastModifiedBy : element.lastModifiedBy,
          lastModifiedDateTime : new Date(element.lastModifiedDateTime),
          isActive : element.true,
          payrollAreaCodeList : [],
          cycleLockPayrollAreaTempIds : [],
          businessCycleIds : [],
          companyName :  element.companyName,
          businessYear :  element.businessYear,
          cycleDefinationName :  element.cycleDefinationName,
          fromDate : new Date(element.fromDate),
          toDate : new Date(element.toDate)
        };
        this.areaTableList.push(obj);
      });
    });
  }


  getEmployeeSummary(){
    this.lockService.getEmployeeSummary().subscribe((res) =>{
      this.empDataList = res.data.results;
      res.data.results.forEach(element => {
        const obj = {
        cycleLockEmployeeId: element.cycleLockEmployeeId,
        employeeMasterId : element.employeeMasterId,
        businessCycleId: element.businessCycleId,
        payrollAreaCode: element.payrollAreaCode,
        areaMasterId: element.areaMasterId,
        cycle: element.cycle,
        cycleDefinationName : element.cycleDefinationName,
        serviceName: element.serviceName,
        companyName: element.companyName,
        createdBy: element.createdBy,
        createDateTime: element.createDateTime,
        fromDate: new Date(element.fromDate),
        toDate: new Date(element.toDate),
        lastModifiedBy: element.lastModifiedBy,
        lastModifiedDateTime: new Date(element.lastModifiedDateTime),
        businessYear: element.businessYear,
        employeeCode: element.employeeCode,
        fullName: element.fullName,

        };
        this.empTableList.push(obj);
      });
    });
  }

  getAsAndWhenTableList(){
    this.lockService.getAsAndWhenSummary().subscribe((res) =>{
      this.asAndWhenTable = res.data.results;
      res.data.results.forEach(element => {
        const obj = {
          cycleLockAsAndWhenAndSuppTempId: element.cycleLockAsAndWhenAndSuppTempId,
          businessCycleId: element.businessCycleId,
          payrollAreaCode: element.payrollAreaCode,
          payrollAreaId: element.payrollAreaId,
          areaMasterId: element.areaMasterId,
          cycle: element.cycle,
          type: element.type,
          serviceName: element.serviceName,
          companyName: element.companyName,
          createdBy: element.createdBy,
          createDateTime: element.createDateTime,
          fromDate: new Date(element.fromDate),
          toDate: new Date(element.toDate),
          lastModifiedBy: element.lastModifiedBy,
          lastModifiedDateTime: new Date(element.lastModifiedDateTime),
          businessYear: element.businessYear,
        };
        this.asAndWhenTableList.push(obj);
      });
    });
  }

  //Export to Excel From Area table
   exportApprovalSummaryAsExcel(): void {
    this.excelData = [];
    this.header = [];
    this.header = [
      'payrollAreaCode',
      'companyName',
      'serviceName',
      'businessYear',
      'cycle',
      'cycleDefinationName',
      'fromDate',
      'toDate',
      'createDateTime',
      'createdBy'
    ];
    this.excelData = [];
    if (this.areaTableList.length > 0) {
      this.areaTableList.forEach((element) => {
        let obj = {
          payrollAreaCode :  element.payrollAreaCode,
          companyName :  element.companyName,
          serviceName :  element.serviceName,
          businessYear :  element.businessYear,
          cycle :  element.cycle,
          cycleDefinationName :  element.cycleDefinationName,
          fromDate : new Date(element.fromDate),
          toDate : new Date(element.toDate),
          createDateTime : new Date(element.createDateTime),
          createdBy :  element.createdBy,
          lastModifiedBy : element.lastModifiedBy,
          lastModifiedDateTime : new Date(element.lastModifiedDateTime),
          isActive : element.true,
          cycleLockPayrollAreaId : element.cycleLockPayrollAreaId,
          businessCycleId : element.businessCycleId,
          areaMasterId : element.areaMasterId,

        };
        this.excelData.push(obj);
      });
      console.log('this.excelData::', this.excelData);
    }
    this.excelservice.exportAsExcelFile(
      this.excelData,
      'Area Summary',
      'Area Summary',
      this.header
    );
    console.log('this.excelData::', this.excelData);
  }

 //Export to Excel From Area table
 exportExcelEmployee(): void {
  this.excelData = [];
  this.header = [];
  this.header = [
    'employeeCode',
    'fullName',
    'payrollAreaCode',
    'companyName',
    'serviceName',
    'businessYear',
    'cycle',
    'cycleDefinationName',
    'fromDate',
    'toDate',
    'createDateTime',
    'createdBy'
  ];
  this.excelData = [];
  if (this.empTableList.length > 0) {
    this.empTableList.forEach((element) => {
      let obj = {
        cycleLockEmployeeId: element.cycleLockEmployeeId,
        employeeMasterId : element.employeeMasterId,
        businessCycleId: element.businessCycleId,
        payrollAreaCode: element.payrollAreaCode,
        areaMasterId: element.areaMasterId,
        cycle: element.cycle,
        cycleDefinationName : element.cycleDefinationName,
        serviceName: element.serviceName,
        companyName: element.companyName,
        createdBy: element.createdBy,
        createDateTime: element.createDateTime,
        fromDate: new Date(element.fromDate),
        toDate: new Date(element.toDate),
        lastModifiedBy: element.lastModifiedBy,
        lastModifiedDateTime: new Date(element.lastModifiedDateTime),
        businessYear: element.businessYear,
        employeeCode: element.employeeCode,
        fullName: element.fullName,
      };
      this.excelData.push(obj);
    });
    console.log('this.excelData::', this.excelData);
  }
  this.excelservice.exportAsExcelFile(
    this.excelData,
    'Employee Summary',
    'Employee Summary',
    this.header
  );
  console.log('this.excelData::', this.excelData);
}


 //Export to Excel From Area table
 exportExcelAsAndWhen(): void {
  this.excelData = [];
  this.header = [];
  this.header = [
    'companyName',
    'businessYear',
    'type',
    'cycle',
    'fromDate',
    'toDate',
    'createDateTime',
    'createdBy'
  ];
  this.excelData = [];
  if (this.asAndWhenTableList.length > 0) {
    this.asAndWhenTableList.forEach((element) => {
      let obj = {
        cycleLockAsAndWhenAndSuppTempId: element.cycleLockAsAndWhenAndSuppTempId,
        businessCycleId: element.businessCycleId,
        payrollAreaCode: element.payrollAreaCode,
        payrollAreaId: element.payrollAreaId,
        areaMasterId: element.areaMasterId,
        cycle: element.cycle,
        type: element.type,
        companyName: element.companyName,
        createdBy: element.createdBy,
        createDateTime: element.createDateTime,
        fromDate: new Date(element.fromDate),
        toDate: new Date(element.toDate),
        lastModifiedBy: element.lastModifiedBy,
        lastModifiedDateTime: new Date(element.lastModifiedDateTime),
        businessYear: element.businessYear,
      };
      this.excelData.push(obj);
    });
    console.log('this.excelData::', this.excelData);
  }
  this.excelservice.exportAsExcelFile(
    this.excelData,
    'As and When Summary',
    'As and When Summary',
    this.header
  );
  console.log('this.excelData::', this.excelData);
}



}
