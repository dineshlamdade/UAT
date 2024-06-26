import { Component, OnInit, ViewChild } from '@angular/core';
import { TemplateRef} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
 import { ChartComponent } from "ng-apexcharts";
 import {
 ApexNonAxisChartSeries,
 ApexResponsive,
  ApexChart,
  ApexFill,
  ApexDataLabels,
  ApexLegend
 } from "ng-apexcharts";
import { FormBuilder, FormGroup } from '@angular/forms';
import { QueryService } from '../query.service';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import jspdf from 'jspdf';
import * as _html2canvas from "html2canvas";
import { Router } from '@angular/router';
import { ExcelserviceService } from '../../excel_service/excelservice.service';

const html2canvas: any = _html2canvas;

export interface user2 {
  srno;
  Query_Number;
  Submissiondate;
  Employee_Code;
  Employee_Name;
  Comapny_name;
  Module_name;
  Query_Type;
  SubQuery_Type;
  Priority;
  Lastupdate_Date;
  Status;
}

 export type ChartOptions = {
  series: ApexNonAxisChartSeries;
   chart: ApexChart;
  responsive: ApexResponsive[];
   labels: any;
   fill: ApexFill;
   legend: ApexLegend;
   dataLabels: ApexDataLabels;
 };
@Component({
  selector: 'app-query-dashboard',
  templateUrl: './query-dashboard.component.html',
  styleUrls: ['./query-dashboard.component.scss']
})
export class QueryDashboardComponent implements OnInit {
  display;
  public chartOptions: Partial<ChartOptions>;
  public modalRef: BsModalRef;
  data: any;
  // modalService: any;
  queryDashboardForm:FormGroup;
  getAllQueryGenerationData: any;
  excelData: any[];
  summaryLength: any[];
  summarydescription: any;
  summarysubject: any;
  summarysubquerydescription: any;
  queryGenerationEmpId: any;
  queryTypeMasterId: any;
  header: any[];
  summaryqueryGenerationEmpId: any;

  constructor(public formBuilder : FormBuilder,public queryService :QueryService
    ,private alertService: AlertServiceService,private router: Router,
    private modalService: BsModalService,private excelservice: ExcelserviceService)
   {

    localStorage.removeItem('dashboardSummary');

    this.data = {
        labels: ['Urgent','High','Medium','Low'],
        datasets: [
            {
                data: [300, 50, 50,50],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    '#'
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                ]
            }]
        };


        this.chartOptions = {
          series: [20, 50, 30],
          chart: {
           width: 230,
            type: "donut"
          },
          dataLabels: {
            enabled: true
          },
          fill: {
            type: "fill",
            colors: ["#2C83B6", "#9367B4", "#E8769F"],
          },
          legend: {
            formatter: function (val, opts) {
              return val + " - " + opts.w.globals.series[opts.seriesIndex];
            }
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  enabled: false
                }
              }
            }
          ]
        };
}
smallpopup(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(
    template,
    Object.assign({}, { class: 'gray modal-md' })
  );
}

  smallpopup1(queryDescription: TemplateRef<any>,summary ) {
    this.summarydescription = summary.queryDescription;
    this.summarysubject = summary.subject;
     this.modalRef = this.modalService.show(queryDescription,
       Object.assign({}, { class: 'gray modal-md' })
     );
   }

   smallpopup4(deleteTemp: TemplateRef<any> ,summary) {
     this.modalRef = this.modalService.show(deleteTemp,
       Object.assign({}, { class: 'gray modal-md' })
     );
     this.summaryqueryGenerationEmpId = summary.queryGenerationEmpId;
     console.log("this.summaryqueryGenerationEmpId",this.summaryqueryGenerationEmpId);

   }
  ngOnInit(): void {
this.getAllQueryListSummary();

  }
  isShowDiv = true;

  toggleDisplayDiv() {
    this.isShowDiv = !this.isShowDiv;
  }
  queryDashboardFormSubmit()
  {

  }
  getAllQueryListSummary() //summary table
{
   this.queryService.getAllQueryList().subscribe(res =>
  {
    this.getAllQueryGenerationData = res.data.results;
    this.summaryLength = this.getAllQueryGenerationData.length;
  })
}
nevigateToCommunication(summary)
{
localStorage.setItem('dashboardSummary',JSON.stringify(summary));
}

editQuery(summary){
  localStorage.setItem('dashboardSummary',JSON.stringify(summary));
  this.router.navigate(['/admin-query-generation'])
}
viewQuery(summary){

  localStorage.setItem('viewdashboardSummary',JSON.stringify(summary));
  this.router.navigate(['/admin-query-generation']);

}


getDeleteById(queryGenerationEmpId) // delete the record from summary
{

        this.queryService.getDeleteById(this.summaryqueryGenerationEmpId).subscribe(res =>
          {
            this.alertService.sweetalertMasterSuccess('Query Deleted Successfully', '' );
            this.getAllQueryListSummary();
          }
          // ,error => {
          //   if(error.error.status.code == '4001'){
          //     this.alertService.sweetalertWarning( 'Query With Closed Status cant be deleted' );

          //   }
          // }
          );
}

 // .......................................Excel and PDF Code.................................................

exportAsXLSX(): void {
  this.excelData = [];
  this.header = []
  this.header =["Query No.","Sumbit Date","Emp. Code","Emp. Name","Company Name", "Module Name", "Query Type",
   "Sub-Query Type", "Subject", "Priority", "Last Updated", "Status",]
  // this.excelData = this.getAllQueryGenerationData;
  this.getAllQueryGenerationData.forEach(element => {
    let obj = {
      "Query No.":element.queryNumber,
      "Sumbit Date":element.submissionDate,
      "Emp. Code": element.employeeCode,
      "Emp. Name": element.empName,
      "Company Name": element.companyName,
      "Module Name": element.applicationModuleName,
      "Query Type": element.queryDescription,
      "Sub-Query Type": element.subqueryDescription,
      "Subject": element.subject,
      "Priority":element.priority,
      "Last Updated":element.escalationDate,
      "Status":element.status,
    }
    this.excelData.push(obj)
  });
 // console.log(this.excelData)
  // this.excelservice.exportAsExcelFile(this.excelData, 'Attandence','Attendance',this.header);
  this.excelservice.exportAsExcelFile(this.excelData, 'Query Summary','Query Summary',this.header);

}
// ..................PDF Download.........................................................................
downloadPdf(){
  let data = document.getElementById('contentToConvert');  // Id of the table
  html2canvas(data).then(canvas => {
  const imgWidth = 208;
  const pageHeight = 295;
  const imgHeight = canvas.height * imgWidth / canvas.width;
  const heightLeft = imgHeight;

  const contentDataURL = canvas.toDataURL('image/png')
  const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
  const position = 0;
  pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
  pdf.save('Query-Summary.pdf'); // Generated PDF
});
}
}
