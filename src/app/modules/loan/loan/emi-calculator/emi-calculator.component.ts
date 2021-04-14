import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { ChartType } from "chart.js";
import { Color, Label } from "ng2-charts";
import { LoanService } from '../../loan.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emi-calculator',
  templateUrl: './emi-calculator.component.html',
  styleUrls: ['./emi-calculator.component.scss']
})
export class EmiCalculatorComponent {

  @ViewChild("myCanvas", { static: true }) canvas: ElementRef;

  @Input() applyLoanData: any;

  // Doughnut
  public doughnutChartLabels: Label[] = ['Principal Amount', 'Total Interest'];
  // public doughnutChartData: MultiDataSet = [
  //     [300000, 141225]
  // ];
  public doughnutChartData = [500000, 96000];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartColors: Color[] = [
    {
      backgroundColor: ["#3AC8DC", "#F3A55B"],
      borderColor: ["#5B6BC0", "#FB6589"]
    }
  ];
  loanType: any;

  /**************************************************************************** */

  filters: any;
  pemi: any = {
    value: "5"
  }
  remi: any = {
    value: "6"
  }
  temi: any = {
    value: "6"
  }
  memi: any = {
    value: "240"
  }

  query: any = {
    amount: "",
    interest: "",
    tenureYr: "",
    tenureMo: ""
  }

  result = {
    emi: "",
    interest: "",
    total: ""
  }
  yrToggel: boolean;
  poptions: Options = {
    floor: 1,
    ceil: 6,
    showTicks: true,
    tickStep: 1,
    translate: (value: any, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + '<b>L</b>';
        case LabelType.High:
          return value + '<b>L</b>';
        default:
          return value + '<b>L</b>';
      }
    }
  };
  roptions: Options = {
    floor: 5,
    ceil: 15,
    showTicks: true,
    tickStep: 1,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + '<b>%</b>';
        case LabelType.High:
          return value + '<b>%</b>';
        default:
          return value + '<b>%</b>';
      }
    }
  };
  toptions: Options = {
    floor: 1,
    ceil: 15,
    // showTicks: true,
    // tickStep: 5,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + '<b>Yr</b>';
        case LabelType.High:
          return value + '<b>Yr</b>';
        default:
          return value + '<b>Yr</b>';
      }
    }
  };
  moptions: Options = {
    floor: 5,
    ceil: 40,
    showTicks: true,
    tickStep: 10,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + '<b>Mo</b>';
        case LabelType.High:
          return value + '<b>Mo</b>';
        default:
          return value + '<b>Mo</b>';
      }
    }
  };
  loanTypeData: any;
  noOfInstallment: any;
  flatIntrest: any;
  loanApplyData: { loanType: any; loanAmount: any; interestRate: any; noOfInstallment: any; installmentAmount: string; };

  constructor(public loanservice: LoanService,private router: Router) {
    this.yrToggel = true;
  }

  ngOnInit() {
    this.getAllLoanType();
  }


  ngAfterViewInit() {
    this.update();
  }

  tbupdate(id: any) {
    if (id == 0) {
      this.pemi.value = (Number(this.query.amount) / 100000).toString();
    }
    else if (id == 1) {
      this.remi.value = this.query.interest;
    }
    else if (id == 2) {
      this.temi.value = this.query.tenureYr;
    }
    else if (id == 3) {
      this.memi.value = this.query.tenureMo;
    }
    this.update();
  }

  update() {

    var loanAmount = Number(this.pemi.value) * 100000;
    var numberOfMonths = (this.yrToggel) ? (Number(this.temi.value) * 12) : Number(this.memi.value);
    var rateOfInterest = Number(this.remi.value);
    var monthlyInterestRatio = (rateOfInterest / 100) / 12;

    this.query.amount = loanAmount.toString();
    this.query.interest = rateOfInterest.toString();
    if (this.yrToggel) {
      this.query.tenureYr = this.temi.value.toString();
    }
    else {
      this.query.tenureMo = this.memi.value.toString();
    }

    var top = Math.pow((1 + monthlyInterestRatio), numberOfMonths);
    var bottom = top - 1;
    var sp = top / bottom;
    var emi = ((loanAmount * monthlyInterestRatio) * sp);
    var full = numberOfMonths * emi;
    var interest = full - loanAmount;
    var int_pge = (interest / full) * 100;

    this.result.emi = emi.toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    var loanAmount_str = loanAmount.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.result.total = full.toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.result.interest = interest.toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    this.doughnutChartData = [
      this.query.amount, interest.toFixed(0)
    ];
    console.log(this.doughnutChartData)
  }
  // .......................loan type ................................................................
  getAllLoanType() {
    this.loanservice.getAllLoanType().subscribe(res => {
      this.loanTypeData = res.data.results[0];

    })
  }
  getLoanType(value) {
    let y;
    this.loanType = value;
    this.loanTypeData.forEach(element => {
      if (element.loanCode == this.loanType) {
        this.noOfInstallment = element.recoveryNoOfInstallments;
        this.flatIntrest = element.intRate;
        this.remi.value = parseInt(this.flatIntrest)
        // this.yrToggel = false;
        this.query.interest = this.flatIntrest;
        this.query.tenureMo = parseInt(this.noOfInstallment);
        this.memi.value = parseInt(this.noOfInstallment)
        y = Math.floor(parseInt(this.noOfInstallment) / 12)
        this.query.tenureYr = y;
        this.temi.value = y
        this.update();
      }
    })
  }
  applyLoan(){
    const data = {
      loanType: this.loanType,
      loanAmount: this.query.amount,
      interestRate: this.query.interest,
      noOfInstallment: this.remi.value,
      installmentAmount: this.result.emi
    };
    this.applyLoanData = data;
    localStorage.setItem('loanApplyData',JSON.stringify(data))
    console.log("evn: "+JSON.stringify(data))
    this.router.navigate(['/loan/add-new-loan'])
    // [routerLink]="['/loan/add-new-loan']"
  }
}
