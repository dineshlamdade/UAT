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
  loanType: any = '';

  /**************************************************************************** */

  filters: any;
  pemi: any = {
    value: "1"
  }
  remi: any = {
    value: "1"
  }
  temi: any = {
    value: "1"
  }
  memi: any = {
    value: "1"
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
  minValue: number = 5;
  maxValue: number = 5.5;
  poptions: Options = {  //loan amount
    floor: 1,
    ceil: 6,
    //showTicks: true,
    tickStep: 0.1,
    // stepsArray:[{ value: 6,
    //   legend: "Small" }],
    translate: (value: any, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b style="color: #eb8471;">' + value * 100000 + '</b>';
        case LabelType.High:
          return value + '<b>L</b>';
        default:
          return value + '<b>L</b>';
      }
    }
  };
  roptions: Options = { // interest rate
    floor: 2,
    ceil: 12,
    // showTicks: true,
    tickStep: 0.1,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b style="color: #eb8471;">' + value + '%</b>';
        case LabelType.High:
          return value + '<b>%</b>';
        default:
          return value + '<b>%</b>';
      }
    }
  };
  toptions: Options = {  // year
    floor: 2,
    ceil: 15,
    // showTicks: true,
    // tickStep: 5,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b style="color: #eb8471;">'+ value + 'Yr</b>';
        case LabelType.High:
          return value + '<b>Yr</b>';
        default:
          return value + '<b>Yr</b>';
      }
    }
  };
  moptions: Options = { // month
    floor: 5,
    ceil: 40,
    // showTicks: true,
    tickStep: 1,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b style="color: #eb8471;">'+ value + 'Mo</b>';
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
  deviationAmount: any;
  deviationIntrest: any;
  deviationNoOfInstallment: any;
  calculatedDeviationAmt: number;
  allowedLoanAmount: number;
  allowedRateInterest: number;
  calculatedDeviationInt: number;
  calculatedDeviationIntallment: number;
  allowedRateInstallment: number;
  minimumLoanAmount: any;
  nodeStepLoanAmount: any;
  nodeStepInterest: number;
  loanRecoveyMethod: any;
  getByLoanMasterIdData: any;
  loanMasterId: any;
  loanTypeDropdownData: any;

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
console.log(this.pemi.value)
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

    // alert( this.query.interest)
    // console.log(this.doughnutChartData)
  }
  // .......................loan type ................................................................
  getAllLoanType() {
    this.loanservice.getAllLoanType().subscribe(res => {
      this.loanTypeData = res.data.results[0];


    })
  }

  getByLoanMasterId(loanMasterId) {
  this.loanservice.getByLoanMasterId(this.loanMasterId).subscribe(res =>{
    this.getByLoanMasterIdData = res.data.results;
    console.log("this.getByLoanMasterIdData ",JSON.stringify(this.getByLoanMasterIdData ))
  })
  }

  getLoanType(value) {
    let y;
    this.loanType = value;
    //this.tbupdate()
    if(this.loanType == ''){
      this.poptions = {  //loan amount
        floor: 1,
        ceil: 0,
        tickStep: 0.1,
        translate: (value: any, label: LabelType): string => {
          switch (label) {
            case LabelType.Low:
              return '<b style="color: #eb8471;">' + value * 100000 + '</b>';
            case LabelType.High:
              return value + '<b>L</b>';
            default:
              return value + '<b>L</b>';
          }
        }
      };

      this.roptions = { // interest rate
        floor: 0,
        ceil: 0,
        tickStep: 0.1,
        translate: (value: number, label: LabelType): string => {
          switch (label) {
            case LabelType.Low:
              return '<b style="color: #eb8471;">' + value + '%</b>';
            case LabelType.High:
              return value + '<b>%</b>';
            default:
              return value + '<b>%</b>';
          }
        }
      };

      this.toptions = {  // year
            floor: 1,
            ceil: 0,
            translate: (value: number, label: LabelType): string => {
              switch (label) {
                case LabelType.Low:
                  return '<b style="color: #eb8471;">'+ value + 'Yr</b>';
                case LabelType.High:
                  return value + '<b>Yr</b>';
                default:
                  return value + '<b>Yr</b>';
              }
            }
          };
          this.moptions = { // month
            floor: 5,
            ceil: 0,
            // showTicks: true,
            tickStep: 1,
            translate: (value: number, label: LabelType): string => {
              switch (label) {
                case LabelType.Low:
                  return '<b style="color: #eb8471;">'+ value + 'Mo</b>';
                case LabelType.High:
                  return value + '<b>Mo</b>';
                default:
                  return value + '<b>Mo</b>';
              }
            }
          };

    }else{

      let response : any;
      this.loanservice.getByLoanMasterId(this.loanType).subscribe(res =>{
        response = res.data.results;
        this.loanTypeDropdownData = response[0];
        console.log("response",JSON.stringify(this.loanTypeDropdownData))
          if (this.loanTypeDropdownData.loanMasterId == this.loanType) {
            this.noOfInstallment = this.loanTypeDropdownData.recoveryNoOfInstallments;
            this.flatIntrest = this.loanTypeDropdownData.intRate;
            // this.flatIntrest = 6
            // console.log("this.flatIntrest",this.flatIntrest)
            this.remi.value = parseInt(this.flatIntrest)

            this.loanRecoveyMethod = this.loanTypeDropdownData.recoveryMethod

            /*** Deviation Amount % calculation */
            this.deviationAmount = this.loanTypeDropdownData.deviationAmount
            this.calculatedDeviationAmt = 500000 * parseInt(this.deviationAmount) / 100
            this.allowedLoanAmount = 500000 + this.calculatedDeviationAmt

            this.minimumLoanAmount =  parseInt(this.loanTypeDropdownData.minLoanAmount)

            if(this.loanTypeDropdownData.principalAmountWithNode ==  true){
              this.nodeStepLoanAmount = this.loanTypeDropdownData.principalAmountNode
            }else{
              this.nodeStepLoanAmount = 0.1
            }

              this.poptions = {  //loan amount
                floor: this.minimumLoanAmount / 100000,
                ceil: this.allowedLoanAmount / 100000,
                tickStep: this.nodeStepLoanAmount,
                showTicks: true,
                translate: (value: any, label: LabelType): string => {
                  switch (label) {
                    case LabelType.Low:
                      return '<b style="color: #eb8471;">' + value * 100000 + '</b>';
                    case LabelType.High:
                      return value + '<b>L</b>';
                    default:
                      return value + '<b>L</b>';
                  }
                }
              };


              /*** Deviation Interest % calculation */
            this.deviationIntrest = this.loanTypeDropdownData.deviationInterest
            this.calculatedDeviationInt = 12 * parseInt(this.deviationIntrest) / 100
            this.allowedRateInterest = 12 + this.calculatedDeviationInt

            let showTicks: boolean = false;
           // alert(element.intrestNode)
            if(this.loanTypeDropdownData.intrestNode > 0){
              this.nodeStepInterest = this.loanTypeDropdownData.intrestNode
              showTicks = true
            }else{
              this.nodeStepInterest = 0.1
              showTicks = false
            }

            //
            this.roptions = { // interest rate
              floor: 1,
              ceil: this.allowedRateInterest,
              tickStep: this.nodeStepInterest,
              showTicks: showTicks,
              translate: (value: number, label: LabelType): string => {
                switch (label) {
                  case LabelType.Low:
                    return '<b style="color: #eb8471;">' + value + '%</b>';
                  case LabelType.High:
                    return value + '<b>%</b>';
                  default:
                    return value + '<b>%</b>';
                }
              }
            };

             /*** Deviation Installment calculation */
            this.deviationNoOfInstallment = this.loanTypeDropdownData.deviationNoOfInstallment
            this.calculatedDeviationIntallment = 48 * parseInt(this.deviationNoOfInstallment) / 100
            this.allowedRateInstallment = Math.floor(48 + this.calculatedDeviationIntallment)
            let year = Math.round(this.allowedRateInstallment) / 12;

            this.toptions = {  // year
              floor: 1,
              ceil: Math.round(year),
              translate: (value: number, label: LabelType): string => {
                switch (label) {
                  case LabelType.Low:
                    return '<b style="color: #eb8471;">'+ value + 'Yr</b>';
                  case LabelType.High:
                    return value + '<b>Yr</b>';
                  default:
                    return value + '<b>Yr</b>';
                }
              }
            };
            this.moptions = { // month
              floor: 1,
              ceil: this.allowedRateInstallment,
              // showTicks: true,
              tickStep: 1,
              translate: (value: number, label: LabelType): string => {
                switch (label) {
                  case LabelType.Low:
                    return '<b style="color: #eb8471;">'+ value + 'Mo</b>';
                  case LabelType.High:
                    return value + '<b>Mo</b>';
                  default:
                    return value + '<b>Mo</b>';
                }
              }
            };

            // this.yrToggel = false;
            this.query.interest = this.flatIntrest;
            this.query.tenureMo = parseInt(this.noOfInstallment);
            this.memi.value = parseInt(this.noOfInstallment)
            y = Math.floor(parseInt(this.noOfInstallment) / 12)
            this.query.tenureYr = y;
            this.temi.value = y

            console.log("query data: "+ JSON.stringify(this.query))
            this.update();
          }

      })


    }

  }

  applyLoan(){
    const data = {
      loanType: this.loanType,
      loanAmount: this.query.amount,
      interestRate: this.query.interest,
      noOfInstallment: this.query.tenureMo,
      installmentAmount: this.result.emi
    };
    this.applyLoanData = data;
    localStorage.setItem('loanApplyData',JSON.stringify(data))
    //console.log("evn: "+JSON.stringify(data))
    this.router.navigate(['/loan/add-new-loan'])

  }
}
