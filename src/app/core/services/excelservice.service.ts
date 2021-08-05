import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
//import * as Excel from 'exceljs';
//import { Workbook } from 'exceljs';
import * as fs from 'file-saver';


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelserviceService {

  constructor() { }

  public exportAsExcelFile(json: any[], excelFileName: string): void {

    const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const myworkbook: XLSX.WorkBook = { Sheets: { 'data': myworksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(myworkbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);

        //Excel Title, Header, Data
        // const data = json;
        // //Create workbook and worksheet
        // let workbook = new Excel.Workbook();
        // let worksheet = workbook.addWorksheet(excelFileName);
        // //Add Header Row
        // let headerRow = worksheet.addRow(header);
        // // Cell Style : Fill and Border
        // headerRow.eachCell((cell, number) => {
        //   cell.fill = {
        //     type: 'pattern',
        //     pattern: 'solid',
        //     fgColor: { argb: 'FFFFFF00' },
        //     bgColor: { argb: 'FF0000FF' }
        //   }
        //   cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        // })
        // // Add Data and Conditional Formatting
        // data.forEach((element) => {
        //   let eachRow = [];
        //   header.forEach((headers) => {
        //     eachRow.push(element[headers])
        //   })
        //   if (element.isDeleted === "Y") {
        //     let deletedRow = worksheet.addRow(eachRow);
        //     deletedRow.eachCell((cell, number) => {
        //       cell.font = { name: 'Calibri', family: 4, size: 11, bold: false, strike: true };
        //     })
        //   } else {
        //     worksheet.addRow(eachRow);
        //   }
        // })
        // worksheet.getColumn(3).width = 15;
        // worksheet.getColumn(4).width = 20;
        // worksheet.getColumn(5).width = 30;
        // worksheet.getColumn(6).width = 30;
        // worksheet.getColumn(7).width = 10;
        // worksheet.addRow([]);
        // //Generate Excel File with given name
        // workbook.xlsx.writeBuffer().then((data) => {
        //   let blob = new Blob([data], { type: EXCEL_TYPE });
        //   fs.saveAs(blob, excelFileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
        // })
    
    
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_exported'+ EXCEL_EXTENSION);
  }
}
