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

  constructor(public formBuilder : FormBuilder,public queryService :QueryService
    ,private alertService: AlertServiceService)
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
  })
}
nevigateToCommunication(summary)
{
localStorage.setItem('dashboardSummary',JSON.stringify(summary));
}

}
