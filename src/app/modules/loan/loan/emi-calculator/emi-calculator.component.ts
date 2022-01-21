import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { ChartType } from "chart.js";
import { Color, Label } from "ng2-charts";
import { LoanService } from '../../loan.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { NonRecurringAmtService } from 'src/app/modules/payroll-inputs/non-recurring-amt.service';

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
  yrToggel: boolean = false;
  minValue: number = 5;
  maxValue: number = 5.5;
  poptions: Options = {
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
          return '<b>' + value * 100000 + ' </b>';
        default:
          return '<b>' + value * 100000 + ' </b>';
      }
    }
  };
  roptions: Options = {
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
  toptions: Options = {
    floor: 2,
    ceil: 15,
    // showTicks: true,
    // tickStep: 5,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b style="color: #eb8471;">' + value + 'Yr</b>';
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
    // showTicks: true,
    tickStep: 1,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b style="color: #eb8471;">' + value + ' Months</b>';
        case LabelType.High:
          return value + ' <b>Months</b>';
        default:
          return value + ' <b>Months</b>';
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
  userData: any;
  employeeMasterId: any;
  payrollListData: any;
  payrollMasterId: any = '';
  SDMLoanData: any;
  maxAmountLoan: any;
  tempLoanMasterScheduleId: any;
  scheduleData: any;
  loanTypeName: any;
  installmentAmount: any;
  getscheduleData: any;
  totalInterestAmount: any = 0;
  payrollArea: any;

  constructor(public loanservice: LoanService, private router: Router, private authService: AuthService,
    private nonRecService: NonRecurringAmtService) {
    this.yrToggel = false;

    this.userData = this.authService.getprivileges()
    this.employeeMasterId = this.userData.UserDetails.employeeMasterId;
  }

  ngOnInit() {
    this.getAllLoanType();

    this.nonRecService.getEmployeeWisePayrollList(this.employeeMasterId).subscribe(
      res => {
        this.payrollListData = res.data.results[0];
      }
    )
  }

  getSelectedPayroll(payroll) {

    let val = payroll.split(',');
    this.payrollMasterId = val[0]
    this.payrollArea = val[1]
    
    let y;
    if (this.loanType == '') {
      this.poptions = {  //loan amount
        floor: 1,
        ceil: 0,
        tickStep: 0.1,
        translate: (value: any, label: LabelType): string => {
          switch (label) {
            case LabelType.Low:
              return '<b style="color: #eb8471;font-size:15px;">' + value * 100000 + '</b>';
            case LabelType.High:
              return '<b style="font-size:15px;">' + value * 100000 + ' </b>';
            default:
              return '<b style="font-size:15px;">' + value * 100000 + ' </b>';
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
              return '<b style="color: #eb8471;font-size:15px;">' + value + '%</b>';
            case LabelType.High:
              return value + '<b style="font-size:15px;">%</b>';
            default:
              return value + '<b style="font-size:15px;">%</b>';
          }
        }
      };

      this.toptions = {  // year
        floor: 1,
        ceil: 0,
        translate: (value: number, label: LabelType): string => {
          switch (label) {
            case LabelType.Low:
              return '<b style="color: #eb8471;font-size:15px;">' + value + 'Yr</b>';
            case LabelType.High:
              return value + '<b style="font-size:15px;">Yr</b>';
            default:
              return value + '<b style="font-size:15px;">Yr</b>';
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
              return '<b style="color: #eb8471;font-size:15px;">' + value + ' Months</b>';
            case LabelType.High:
              return value + ' <b style="font-size:15px;">Months</b>';
            default:
              return value + ' <b style="font-size:15px;">Months</b>';
          }
        }
      };

    } else {

      let response: any;
      this.loanservice.getByLoanMasterId(this.loanType).subscribe(res => {
        response = res.data.results;
        this.loanTypeDropdownData = response[0];
        // console.log("response", JSON.stringify(this.loanTypeDropdownData))

        this.loanservice.getLoanDataByEmployee(this.employeeMasterId, this.payrollMasterId, this.loanType).subscribe(res => {
          this.SDMLoanData = res.data.results[0]

          // console.log(this.SDMLoanData)

          this.noOfInstallment = this.SDMLoanData.recoveryNoOfInstallments;
          this.flatIntrest = this.SDMLoanData.intRate;
          this.maxAmountLoan = this.SDMLoanData.maxAmountLoan;

          this.noOfInstallment = 36;
          this.flatIntrest = 10;
          this.maxAmountLoan = 300000;

          console.log(this.noOfInstallment)

          this.remi.value = parseInt(this.flatIntrest)

          this.loanRecoveyMethod = this.loanTypeDropdownData.recoveryMethod

          /*** Deviation Amount % calculation */
          this.deviationAmount = this.loanTypeDropdownData.deviationAmount
          this.calculatedDeviationAmt = this.maxAmountLoan * parseInt(this.deviationAmount) / 100
          this.allowedLoanAmount = this.maxAmountLoan + this.calculatedDeviationAmt

          this.minimumLoanAmount = parseInt(this.loanTypeDropdownData.minLoanAmount)

          if (this.loanTypeDropdownData.principalAmountWithNode == true) {
            this.nodeStepLoanAmount = (this.loanTypeDropdownData.amountNodeValue / 100000)
          } else {
            this.nodeStepLoanAmount = 0.1
          }

          console.log("this.nodeStepLoanAmount: " + this.nodeStepLoanAmount)

          this.poptions = {  //loan amount
            floor: this.minimumLoanAmount / 100000,
            ceil: this.allowedLoanAmount / 100000,
            tickStep: this.nodeStepLoanAmount,
            showTicks: true,
            translate: (value: any, label: LabelType): string => {
              switch (label) {
                case LabelType.Low:
                  return '<b style="color: #eb8471;font-size:15px;">' + value * 100000 + '</b>';
                case LabelType.High:
                  // + '<b>Lac</b>'
                  return '<b style="font-size:15px;">' + value * 100000 + ' </b>';
                default:
                  return '<b style="font-size:15px;">' + value * 100000 + ' </b>';
              }
            }
          };


          console.log("this.poptions: " + JSON.stringify(this.poptions))


          /*** Deviation Interest % calculation */
          this.deviationIntrest = this.loanTypeDropdownData.deviationInterest
          this.calculatedDeviationInt = this.flatIntrest * parseInt(this.deviationIntrest) / 100
          // this.allowedRateInterest = this.flatIntrest + this.calculatedDeviationInt
          this.allowedRateInterest = this.flatIntrest - this.calculatedDeviationInt
          // console.log(this.allowedRateInterest)

          let showTicks: boolean = false;
          // alert(element.intrestNode)
          if (this.loanTypeDropdownData.intrestNode > 0) {
            this.nodeStepInterest = this.loanTypeDropdownData.intrestNode
            showTicks = true
          } else {
            this.nodeStepInterest = 0.1
            showTicks = false
          }

          //
          this.roptions = { // interest rate
            floor: this.allowedRateInterest,
            ceil: this.flatIntrest,
            tickStep: this.nodeStepInterest,
            showTicks: true,
            translate: (value: number, label: LabelType): string => {
              switch (label) {
                case LabelType.Low:
                  return '<b style="color: #eb8471;font-size:15px;">' + value + '%</b>';
                case LabelType.High:
                  return value + '<b style="font-size:15px;">%</b>';
                default:
                  return value + '<b style="font-size:15px;">%</b>';
              }
            }
          };

          console.log("this.roptions: " + JSON.stringify(this.roptions))

          /*** Deviation Installment calculation */
          this.deviationNoOfInstallment = this.loanTypeDropdownData.deviationNoOfInstallment
          this.calculatedDeviationIntallment = this.noOfInstallment * parseInt(this.deviationNoOfInstallment) / 100
          this.allowedRateInstallment = Math.floor(this.noOfInstallment + this.calculatedDeviationIntallment)
          let year = Math.round(this.allowedRateInstallment) / 12;

          this.toptions = {  // year
            floor: 1,
            ceil: Math.round(year),
            translate: (value: number, label: LabelType): string => {
              switch (label) {
                case LabelType.Low:
                  return '<b style="color: #eb8471; font-size:15px;">' + value + 'Yr</b>';
                case LabelType.High:
                  return value + '<b style="font-size:15px;">Yr</b>';
                default:
                  return value + '<b style="font-size:15px;">Yr</b>';
              }
            }
          };

          // console.log("this.toptions: " + JSON.stringify(this.toptions))

          this.moptions = { // month
            floor: 1,
            ceil: this.allowedRateInstallment,
            // showTicks: true,
            tickStep: 1,
            translate: (value: number, label: LabelType): string => {
              switch (label) {
                case LabelType.Low:
                  return '<b style="color: #eb8471; font-size:15px;">' + value + ' Months</b>';
                case LabelType.High:
                  return value + ' <b style="font-size:15px;">Months</b>';
                default:
                  return value + ' <b style="font-size:15px;">Months</b>';
              }
            }
          };

          console.log("this.moptions: " + JSON.stringify(this.moptions))

          this.yrToggel = false

          this.query.interest = this.flatIntrest;
          this.query.tenureMo = parseInt(this.noOfInstallment);
          this.memi.value = parseInt(this.noOfInstallment)
          y = Math.floor(parseInt(this.noOfInstallment) / 12)
          this.query.tenureYr = y;
          this.temi.value = y

          console.log("query data: " + JSON.stringify(this.query))
          this.update();
          // }




        })
      })


    }


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
    // console.log("amount: " + this.pemi.value)
    // console.log("yearly installment: " + this.temi.value)
    // console.log("months installment: " + this.memi.value)
    // console.log("rate of int: " + this.remi.value)

    var loanAmount = Number(this.pemi.value) * 100000;
    var numberOfMonths = (this.yrToggel) ? (Number(this.temi.value) * 12) : Number(this.memi.value);
    var rateOfInterest = Number(this.remi.value);
    var monthlyInterestRatio = (rateOfInterest / 100) / 12;

    this.query.amount = loanAmount.toString();
    this.query.interest = rateOfInterest.toString();


    // console.log(loanAmount)
    // console.log(numberOfMonths)
    // console.log(rateOfInterest)
    // console.log(monthlyInterestRatio)

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


    // console.log(top + "top")
    // console.log("sp" + sp)
    // console.log("emi" + emi)
    // console.log("full" + full)
    // console.log("inter: "+ interest)




    this.result.emi = emi.toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    var loanAmount_str = loanAmount.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.result.total = full.toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.result.interest = interest.toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    let x = this.query.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // console.log("X value is: "+ x)

    this.doughnutChartData = [
      this.query.amount, interest.toFixed(0)
    ];

    console.log("this.result is: " + JSON.stringify(this.result))

    if (this.loanRecoveyMethod == 'Reducing Balance' || this.loanRecoveyMethod == 'Principal First & then Interest') {
      this.installmentAmount = this.query.amount / this.noOfInstallment;
      // this.installmentAmount = Math.round(this.installmentAmount);

      this.installmentAmount = this.installmentAmount.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
    }
    if (this.loanRecoveyMethod == 'EMI' || this.loanRecoveyMethod == 'Emi' ) {

      let t = this.noOfInstallment / 12;
			let time = t * 12;

			let rateOfIntrest1 = 0.0;
			rateOfIntrest1 = this.query.interest / (12 * 100);
			let emi = (this.query.amount * rateOfIntrest1 * Math.pow(1 + rateOfIntrest1, time))
					/ (Math.pow(1 + rateOfIntrest1, time) - 1);

          this.installmentAmount = emi
      //this.installmentAmount = this.query.amount / this.noOfInstallment;
      this.installmentAmount = this.installmentAmount.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
    }

    let rateOfInt = this.query.interest;
    let noofinsll = parseInt(this.noOfInstallment);
    let intallamt = this.installmentAmount;
    let loanamt = this.query.amount;
    let loancd = this.loanTypeName;

    let data =
    {

      "flatIntrest": this.flatIntrest,
      "loanAmount": loanamt,
      "loanCode": loancd,
      "rateOfIntrest": rateOfInt,
      "noOfInstallment": noofinsll,
      "installmentAmount": intallamt
    }


    if(this.noOfInstallment != null){
      this.tempLoanMasterScheduleId = null;
      console.log("loanScheduleData", data)
      this.loanservice.allScheduleData(data).subscribe(res => {
        this.scheduleData = res.data.results[0];
        this.tempLoanMasterScheduleId = res.data.results[0].tempLoanMasterScheduleId;
        this.loanservice.getallScheduleData(this.tempLoanMasterScheduleId).subscribe(res => {
          this.getscheduleData = res.data.results[0];
          this.getscheduleData.forEach(element => {
            this.totalInterestAmount = this.totalInterestAmount + element.interestCharged
          });
        })
      })
  
      // this.totalInterestAmount = this.totalInterestAmount.toFixed()
    }

    
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
    this.loanservice.getByLoanMasterId(this.loanMasterId).subscribe(res => {
      this.getByLoanMasterIdData = res.data.results;
      console.log("this.getByLoanMasterIdData ", JSON.stringify(this.getByLoanMasterIdData))
    })
  }

  getLoanType(value) {

    let val = value.split(',')
    this.loanType = val[0];
    this.loanTypeName = val[1];
    //this.tbupdate()  
  }

  applyLoan() {
    const data = {
      loanType: this.loanType,
      loanAmount: this.query.amount,
      interestRate: this.query.interest,
      noOfInstallment: this.query.tenureMo,
      installmentAmount: this.result.emi,
      payrollArea: this.payrollArea
    };
    this.applyLoanData = data;
    localStorage.setItem('SDMLoanData', JSON.stringify(this.SDMLoanData))
    localStorage.setItem('loanApplyData', JSON.stringify(data))
    //console.log("evn: "+JSON.stringify(data))
    this.router.navigate(['/loan/add-new-loan'])

  }
}
