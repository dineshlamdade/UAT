import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LandingPageService } from '../landing-page.service';
import { textAlign } from 'html2canvas/dist/types/css/property-descriptors/text-align';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from "ng2-charts";
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { SummaryService } from '../../80C/summary/summary.service';
import { Router } from '@angular/router';

/* export interface Customer {
  section;
  Subsection;
            srno;
            Perticulars   ;
            amount;
            rejected;
            approved;
            Approvedamount;
            PSID   ;
            subdate   ;
            lastactiondate
 } */

/*  export interface User1 {
        srno;
        section;
        subsection;
        nature;
        particulars;
        psid;
        amount;
        date;
    
  } */
/* 
  export interface Invest {
    srno;
    section;
    subsection;
    declared;
    entered;
    rejected;
    approved;
} */
@Component({
  selector: 'app-investment-landing-page',
  templateUrl: './investment-landing-page.component.html',
  styleUrls: ['./investment-landing-page.component.scss']
})
export class InvestmentLandingPageComponent implements OnInit {

  @Input()
  isshowtable: boolean = false;
  isshowtable2: boolean = false;
  ispending: boolean = false;
  issubmitted: boolean = false;
  issebdback: boolean = false;
  isACDP: boolean = false;
  isapprovedwithrejection: boolean = false;
  ismaxbene: boolean = false;
  isactivelabel: boolean = false;
  isrental: boolean = false;


  public modalRef: BsModalRef
  public basicOptions: any;
  public basicData: any;
  public basicData1: any;
  public Residentialdetails: FormGroup;
  public regimeForm: FormGroup;
  public residentialAndRegim: Array<any> = [];
  public lastModifiedDate: any;
  public requestData: any;
  public financialYear: string;
  doughnutChartOption: ChartOptions = {
    plugins: {
      labels: {
        render: 'percentage',
        fontColor: 'black',
        fontSize: 15,

      },
    },
  }

  public doughnutChartLabels: Label[] = ['Already Deducted Tax Liability', 'Balance Tax Liability '];
  public doughnutChartData = [30, 70];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartColors: Color[] = [
    {
      backgroundColor: ['#ff6361', '#ffa600'],
    },
  ];
  //basicData: any;
  data: any;
  investSummary: Array<any> = [];

  customers: Array<any> = [];//Customer[];
  //basicOptions: any;
  public pendingData: Array<any> = [];
  public submittedData: Array<any> = [];
  public sendbackData: Array<any> = [];
  public acdpData: Array<any> = [];
  public approvedData: Array<any> = [];
  public approvedRejData: Array<any> = [];
  public userData: any;
  public employeeMasterId: number;
  public employeeCodeName: string;
  public employeeResidentStatus: string;
  public regimeChoice: string;
  public masterModifiedDate: string;
  public actual: [];
  public declaration: any;


  constructor(private modalService: BsModalService,
    private service: LandingPageService,
    private formBuilder: FormBuilder,
    private alertService: AlertServiceService,
    private datePipe: DatePipe,
    private authService: AuthService,
    private summaryService: SummaryService,
    private router: Router
  ) {

  }


  ngOnInit(): void {
    (this.Residentialdetails = this.formBuilder.group({
      financialYear: new FormControl({
        value: '2020-2021', disabled: true
      },
        Validators.required
      ),
      residentialStatus: new FormControl("Residential"),
    }));
    (this.regimeForm = this.formBuilder.group({
      financialYear: new FormControl({
        value: '2020-2021', disabled: true
      },
        Validators.required
      ),
      regime: new FormControl("Old"),
    }));
    debugger
    this.userData = this.authService.getprivileges();
    this.employeeMasterId = this.userData.UserDetails.employeeMasterId;
    this.employeeCodeName = this.employeeMasterId + ' - ' + this.userData.UserDetails.userName;
    this.getResidentialAndRegime();
    this.getAllStatusWiseData();
    this.getInvestmentSummary();
    this.getActualVsDeclaration();

    /*   this.investsum = [
        {srno:'1',
        section:'80-C',
        subsection:'Life Insurance Premium',
        declared:'0.00',
        entered:'0.00',
        rejected:'0.00',
        approved:'0.00'
      },
      
      ]; */
    /* this.users1 = [
      {srno:'1',
      section:'80-C',
      subsection:'Life Insurance Premium',
      nature:'Master',
      particulars:'Total AIG-243434',
      psid:'202157887',
      amount:'0.00',
      date:'12-Jul-2021'
    },
    {srno:'2',
    section:'80-C',
    subsection:'Life Insurance Premium',
    nature:'Transaction',
    particulars:'Total AIG-243434',
    psid:'202157887',
    amount:'0.00',
    date:'12-Aug-2021'
  },   

    ]; */
    /*     this.customers = [
          {srno: '1', section: '551', Subsection: 'abc',   Perticulars:'',amount:'0.00',Approvedamount:'100.00',rejected:'0.00',approved:'0.00', PSID:'111',subdate:'234234',lastactiondate:'ABC', },
          {srno: '2', section: '11', Subsection: 'ssss',   Perticulars:'',amount:'0.00',Approvedamount:'100.00',rejected:'0.00',approved:'0.00', PSID:'1111',subdate:'234234',lastactiondate:'ABC', },
          {srno: '3', section: '11', Subsection: 'dddddd',   Perticulars:'',amount:'0.00',Approvedamount:'100.00',rejected:'0.00',approved:'0.00', PSID:'2222',subdate:'234234',lastactiondate:'ABC', },
          {srno: '4', section: '555', Subsection: 'dddddd',   Perticulars:'',amount:'0.00',Approvedamount:'100.00',rejected:'0.00',approved:'0.00', PSID:'33',subdate:'234234',lastactiondate:'ABC', },
          {srno: '5', section: '11', Subsection: 'dddddd',   Perticulars:'',amount:'0.00',Approvedamount:'100.00',rejected:'0.00',approved:'0.00', PSID:'44',subdate:'234234',lastactiondate:'ABC', },
          {srno: '6', section: '1', Subsection: 'dddddd',   Perticulars:'',amount:'0.00',Approvedamount:'100.00',rejected:'0.00',approved:'0.00', PSID:'',subdate:'234234',lastactiondate:'ABC', },
         
        ]; */
    this.basicData = {


      labels: [
        'Annual Tax Liabilities', 'Taxable Income'],
      datas: [65, 59],
      minBarLength: '10px',
      size: {
        minBarLength: '10px'

      },

      datasets: [
        {
          label: 'New Regime',
          backgroundColor: '#42A5F5',
          font: '12px',
          barThickness: 22,
          barPercentage: 0.5,


          data: [65, 59, 80, 81, 56, 55, 40]
        },

        {
          label: 'Old Regime',
          backgroundColor: '#FFA726',
          barThickness: 22,
          barPercentage: 0.5,

          data: [28, 48, 40, 19, 86, 27, 90]
        },


      ],
    };

  }

  loadChart() {


    /*    this.basicOptions = {
         legend: {
           display: true,
           labels: {
             fontColor: "Red",
             fontSize: 25
           }
         },
   
         title: {
           display: true,
           text: "% Total Percentage",
           position: "center"
         },
         scales: {
           yAxes: [
             {
               display: true,
               scaleLabel: {
                 show: false,
               },
               ticks: {
                 beginAtZero: true,
                 max: 100,
                 min: 0
               }
             }
           ],
           xAxes: [
             {
               ticks: {
                 display: false,
                 beginAtZero: 0
               }
             }
           ]
         }
       }; */

    this.basicOptions = {
      indexAxis: 'y',
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057',
            max: 100,
            min: 0,
            beginAtZero: true,
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          ticks: {
            color: '#495057',
            max: 100,
            min: 0
          },
          grid: {
            color: '#ebedef'
          }
        }
      }
    };

    /*  this.basicData = {
       labels: ["2015", "2016"],
       datasets: [
         {
           label: "New Regime",
           backgroundColor: "#007bff",
           data: [65, 59, 80, 81, 56, 55, 40]
         },
         {
           label: "Old Regime",
           backgroundColor: "#ffc107",
           data: [28, 48, 40, 19, 86, 27, 90]
         }
       ]
     }; */
    this.basicData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'New Regime',
          backgroundColor: '#42A5F5',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'Old Regime',
          backgroundColor: '#FFA726',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };
  }

  showPopUp(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template
      , Object.assign({}, { class: "gray modal-lg" })
    )
  }

  getResidentialAndRegime() {
    debugger
    this.service.getResidentialAndRegime(this.employeeMasterId).subscribe((res) => {

      this.residentialAndRegim = res.data.results;
      this.Residentialdetails.get('residentialStatus').patchValue(this.residentialAndRegim[0].residentialStatus);
      this.Residentialdetails.get('financialYear').patchValue(this.residentialAndRegim[0].financialYear);
      this.regimeForm.get('financialYear').patchValue(this.residentialAndRegim[0].financialYear);
      this.regimeForm.get('regime').patchValue(this.residentialAndRegim[0].regime);
      this.lastModifiedDate = this.residentialAndRegim[0].lastModifiedDateTime;
      this.residentialAndRegim[0].fromDate = this.datePipe.transform(this.residentialAndRegim[0].fromDate, 'yyyy-MM-dd');
      this.residentialAndRegim[0].toDate = this.datePipe.transform(this.residentialAndRegim[0].toDate, 'yyyy-MM-dd');
      this.financialYear = this.residentialAndRegim[0].financialYear;
      this.employeeResidentStatus = this.residentialAndRegim[0].residentialStatus;
      this.regimeChoice = this.residentialAndRegim[0].regime;


      /*   "results": [
          {
              "employeeResidentialRegimeDetailId": 4, --
              "employeeMasterId": 2295,
              "declarationActualFlag": "Declaration", --
              "residentialStatus": "Residential", --
              "regime": "New", --
              "financialYear": "2021-2022", --
              "fromDate": 1617235200000, --
              "toDate": 1648684800000, --
              "createdBy": "MeghrajM",
              "createDateTime": 1639033275240,
              "lastModifiedBy": "MeghrajM",
              "lastModifiedDateTime": 1639033664327,
              "active": true
          }
      ] */

    });
    /* 
    this.service.getResidentialAndRegime('2295').subscribe((res) => {

    }); */
  }

  saveOnResidentialStatus(param: string) {
    debugger

    if (this.residentialAndRegim.length == 0) {
      this.residentialAndRegim = [{
        "employeeResidentialAndRegimeDetailId": 0,
        "financialYear": "2021-2022",
        "residentialStatus": "Residential",
        "regime": this.regimeForm.get('regime').value,
        "declarationActualFlag": "Declaration",
        "fromDate": "2021-04-01",
        "toDate": "2022-03-31"
      }]
      //return this.alertService.sweetalertError('Data not Found');
    }
    if (param == "Residential") {
      this.requestData = {
        "employeeResidentialAndRegimeDetailId": this.residentialAndRegim[0].employeeResidentialRegimeDetailId,
        "financialYear": this.Residentialdetails.get('financialYear').value,
        "residentialStatus": this.Residentialdetails.get('residentialStatus').value,
        "regime": this.residentialAndRegim[0].regime,
        "declarationActualFlag": this.residentialAndRegim[0].declarationActualFlag,
        "fromDate": this.residentialAndRegim[0].fromDate,
        "toDate": this.residentialAndRegim[0].toDate
      }
    }
    else if (param == "Regime") {
      this.requestData = {
        "employeeResidentialAndRegimeDetailId": this.residentialAndRegim[0].employeeResidentialRegimeDetailId,
        "financialYear": this.regimeForm.get('financialYear').value,
        "residentialStatus": this.residentialAndRegim[0].residentialStatus,
        "regime": this.regimeForm.get('regime').value,
        "declarationActualFlag": this.residentialAndRegim[0].declarationActualFlag,
        "fromDate": this.residentialAndRegim[0].fromDate,
        "toDate": this.residentialAndRegim[0].toDate
      }
    }
    this.service.saveResidentialAndRegime(this.requestData).subscribe((res) => {
      if (res.data.results.length >= 0) {

        this.alertService.sweetalertMasterSuccess(
          'Record saved successfully.', ''
        );

        this.residentialAndRegim = res.data.results;
        this.Residentialdetails.get('residentialStatus').patchValue(this.residentialAndRegim[0].residentialStatus);
        this.Residentialdetails.get('financialYear').patchValue(this.residentialAndRegim[0].financialYear);
        this.regimeForm.get('financialYear').patchValue(this.residentialAndRegim[0].financialYear);
        this.regimeForm.get('regime').patchValue(this.residentialAndRegim[0].regime);
        this.lastModifiedDate = this.residentialAndRegim[0].lastModifiedDateTime;
        this.residentialAndRegim[0].fromDate = this.datePipe.transform(this.residentialAndRegim[0].fromDate, 'yyyy-MM-dd');
        this.residentialAndRegim[0].toDate = this.datePipe.transform(this.residentialAndRegim[0].toDate, 'yyyy-MM-dd');
        this.financialYear = this.residentialAndRegim[0].financialYear;
        this.employeeResidentStatus = this.residentialAndRegim[0].residentialStatus;
        this.regimeChoice = this.residentialAndRegim[0].regime;
      }
    });
    this.modalRef.hide();
  }

  showtable() {
    console.log('hi');
    this.isshowtable = true;
    this.isapprovedwithrejection = false;
    this.isACDP = false;
    this.issebdback = false;
    this.issubmitted = false;
    this.ispending = false;
    this.getStatusWiseData('Approved');

  }

  getAllStatusWiseData() {
    const data = ['Pending', 'Submitted', 'Approved', 'SendBack', 'acdp', 'ApprovedWithRejection'] // 'sendback',, 'acdb', 'ApprovedWithRejection'
    debugger
    data.forEach(res => {
      this.getStatusWiseData(res);
    }
    )
  }

  getStatusWiseData(param: string) {
    const data = {
      financialYear: '2021-2022',//this.financialYear,
      status: param
    }
    this.service.statusWiseInvestmentData(data).subscribe((res) => {
      if (res.data.results.length > 0) {
        switch (param) {
          case 'Pending':
            this.pendingData = res.data.results;
            break;
          case 'Submitted':
            this.submittedData = res.data.results;
            break;
          case 'SendBack':
            this.sendbackData = res.data.results;
            break;
          case 'acdp':
            this.acdpData = res.data.results;
            break;
          case 'Approved':
            this.approvedData = res.data.results;
            break;
          case 'ApprovedWithRejection':
            this.approvedRejData = res.data.results;
            break;
        }
      }
      else {
        this.pendingData = [];
      }
    })
  }

  getInvestmentSummary() {
    const data = {
      "financialYear": '2021-2022'
    }
    this.service.investmentSummaryData(data).subscribe((res) => {
      if (res.data.results.length > 0) {
        this.investSummary = res.data.results;
      }
    })
  }

  approvedwithrejection() {
    console.log('hi');
    this.isshowtable = false;
    this.isapprovedwithrejection = true;
    this.isACDP = false;
    this.issebdback = false;
    this.issubmitted = false;
    this.ispending = false;
    /* this.pendingData = []; */

  }

  ACDP() {
    console.log('hi');
    this.isshowtable = false;
    this.isapprovedwithrejection = false;
    this.isACDP = true;
    this.issebdback = false;
    this.issubmitted = false;
    this.ispending = false;
    /*  this.pendingData = []; */

  }

  sendback() {
    console.log('hi');
    this.isshowtable = false;
    this.isapprovedwithrejection = false;
    this.isACDP = false;
    this.issebdback = true;
    this.issubmitted = false;
    this.ispending = false;
    /* this.pendingData = [];
    this.getStatusWiseData('sendback'); */
  }

  submitted() {
    console.log('hi');
    this.isshowtable = false;
    this.isapprovedwithrejection = false;
    this.isACDP = false;
    this.issebdback = false;
    this.issubmitted = true;
    this.ispending = false;
    /* this.getStatusWiseData('Submitted');
    this.pendingData = []; */

  }

  pending() {
    debugger
    console.log('hi');
    this.isshowtable = false;
    this.isapprovedwithrejection = false;
    this.isACDP = false;
    this.issebdback = false;
    this.issubmitted = false;
    this.ispending = true;
    this.isactivelabel = true;
    //this.pendingData = [];
    //this.getStatusWiseData('Pending');
  }

  showtable2() {
    this.isshowtable2 = true;
  }

  maxbene() {
    this.ismaxbene = true;
  }

  rental() {
    this.isrental = true;
  }

  regimepopup(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  Historypopup(template1: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template1,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  houserentalex(template2: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template2,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  houserentalex3(template7: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template7,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  houserentalex2(template3: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template3,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }

  Statusresident(template4: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template4,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  Hraexemption(template5: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template5,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  Taxsimulator(template6: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template6,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  Taxsummary(template8: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template8,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }
  redirectToSpecific(data) {
    debugger
    this.summaryService.get80CSummary().subscribe((res) => {
      debugger

      const summary = res.data.results[0].summary80CDetails;

      let filtered1 = summary.find(item => item.section === data.section);

      let f = summary.filter(summary => summary.section.includes(data.subSection));
      this.router.navigate([f[0].routerlink]);
      let filtered = summary.filter(summary => summary.includes(data.section));
    });
  }
  getActualVsDeclaration() {
    debugger
    this.service.getInvestmentActualVsDeclared().subscribe((res) => {
      res.data.results[0].summary80cDetailList.forEach(element => {
        console.log(element.actualTotal);
      });


      this.basicData1 = {


        labels: [
          'Annual Tax Liabilities', 'Taxable Income'],
        datas: [65, 59],
        minBarLength: '10px',
        size: {
          minBarLength: '10px'

        },

        datasets: [
          {
            label: 'Actual',
            backgroundColor: '#42A5F5',
            font: '12px',
            barThickness: 22,
            barPercentage: 0.5,


            data: [65, 59, 80, 81, 56, 55, 40]
          },

          {
            label: 'Declaration',
            backgroundColor: '#FFA726',
            barThickness: 22,
            barPercentage: 0.5,

            data: [28, 48, 40, 19, 86, 27, 90]
          },


        ],
      };
    })
  }
  exportExcel() {

  }
}
