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
import { ExcelService } from '../../uploadexcel/uploadexcelhome/excel.service';
import * as _html2canvas from "html2canvas";
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
  modalService: any;
  queryDashboardForm:FormGroup;
  getAllQueryGenerationData: any;
  excelData: any[];
  summaryLength: any[];

  constructor(public formBuilder : FormBuilder,public queryService :QueryService
    ,private excelservice: ExcelService,private alertService: AlertServiceService
    )
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
 // .......................................Excel and PDF Code.................................................
 exportAsXLSX():void {
  this.excelData = [];
  this.excelData = this.getAllQueryGenerationData;
  this.excelservice.exportAsExcelFile(this.excelData, 'Query Summary');
}

download(){
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
