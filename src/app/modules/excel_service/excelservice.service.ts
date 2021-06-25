import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelserviceService {

  constructor() { }

  public exportAsExcelFile(json: any[], excelFileName: string, sheetname: string): void {

    const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    if (sheetname == 'Workflow-Master') {
      const myworkbook: XLSX.WorkBook = { Sheets: { 'Workflow-Master': myworksheet }, SheetNames: [sheetname] };
      const excelBuffer: any = XLSX.write(myworkbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, excelFileName);
    } else if (sheetname == 'Attendance') {
      const myworkbook: XLSX.WorkBook = { Sheets: { 'Attendance': myworksheet }, SheetNames: [sheetname] };
      const excelBuffer: any = XLSX.write(myworkbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, excelFileName);
    } else {
      const myworkbook: XLSX.WorkBook = { Sheets: { 'data': myworksheet }, SheetNames: ['data'] };
      const excelBuffer: any = XLSX.write(myworkbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, excelFileName);
    }
    // myworksheet['A1'].s = { fill: { fgColor: { rgb: "#d6c227" } } };

  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_exported' + EXCEL_EXTENSION);
  }
}
