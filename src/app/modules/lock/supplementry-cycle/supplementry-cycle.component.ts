import { element } from 'protractor';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit,  ViewChild ,TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SortEvent } from 'primeng/api';
import { CKEditorModule } from 'ckeditor4-angular';
import { User2 } from '../cycle/cycle.component';
import { LockService } from '../lock.service';
import { AlertServiceService } from '../../../core/services/alert-service.service';
import { ExcelserviceService } from '../../../core/services/excelservice.service';
import { DatePipe } from '@angular/common';
import {
  trigger,
  transition,
  animate,
  style,
  state,
} from '@angular/animations';
export interface Customer {
  empcode;
  empName;
  designation;
  grade;
  establishment;
  department;
  area;
  companyname;
  service;

}
export interface User1 {

  area;
  service;
  cmpnyname;

}
export interface emplist {
  empno;
  area;
  service;
  cmpnyname;

}
export interface aswhen {
  companyname;
  service;
  type;
  cyclecreationdate;
  cyclename;
  fromdate;
  todate;

}
export interface sumarea {
  area;
  companyname;
  service;
  businessyear;
  cyclename;
  cycledefinition;
  fromdatearea;
  todatearea;
  lockdatearea;
  lockbyarea;

}
export interface sumbusiness {
  area;
  companyname;
  service;
  businessyear;

  fromdate;
  todate;
  lockdate;
  lockby;

}
export interface sumemp {
  empcode;
  empname;
  area;
  companyname;
  service;
  businessyear;
  cycledefinition;
  cyclename;
  fromdate;
  todate;
  lockdate;
  lockby;

}

export interface sumaswhn {

  companyname;
  service;
  businessyear;
  type;
  cyclename;
  remark;
  fromdate;
  todate;
  lockdate;
  lockby;

}
export interface arealist {

  area;
  service;
  cmpnyname;
}
interface group {
  name: string

}
interface City {
  name: string,
}

@Component({
  selector: 'app-supplementry-cycle',
  templateUrl: './supplementry-cycle.component.html',
  styleUrls: ['./supplementry-cycle.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(200%)' }),
        animate('700ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('0ms ease-in', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
    [
      trigger('stateAnimation', [
        transition(':enter', [
          style({ width: '2vh' }),
          animate('700ms ease-in', style({ width: '0vh' })),
        ]),
        transition(':leave', [
          style({ width: '0vh' }),
          animate('0ms ease-in', style({ width: '2vh' })),
        ]),
      ]),
    ],
  ],
  styles: [
    `
      .outofstock {
        background-color: #ddd !important;
        color: #000 !important;
        font-weight: 500;
      }
    `,
  ],
})
// export class SupplementryCycleComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }



// export class AreaComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

export class SupplementryCycleComponent implements OnInit {
  public modalRef: BsModalRef;

  public companyNameList: Array<any> = [];
  public pendingForLockList: Array<any> = [];
  public pendingLockList: Array<any> = [];

  public typeList : Array<any> = [];
  public cycleNameList : Array<any> = [];
  public compnaysList : Array<any> = [];
  public lockTableDataList : Array<any> = [];
  public selectedUserPending : Array<any> = [];

  public summaryList : Array<any> = [];
  public  summaryTableList: Array<any> = [];
  public cycleNames : Array <any> = [];
  public cycle : Array<any> = [];
  public checkedSummaryList : Array<any> = [];
  public allAreaCodes:  Array<any> = [];
  getLockTableDataList: any;
  HighlightRow: number;
  public selectedUser: Array<any> = [];
  public selectedUserAsAndWhen: Array<any> = [];
  public checkedFinalLockList: Array<any> = [];
  public finalpendingLockList: Array<any> = [];

  areTableList: any;
  excelData: any[];
    public excelDataAsAndWhen: Array<any> = [];

  header: any[];
  excelDataAreaLock: any[];


  customers: Customer[];
  groups: group[];
  aswhens: aswhen[];
  sumbusinesss:sumbusiness[];
  cities: City[];
  users1: User1[];
  sumareas: sumarea[];
  arealists: arealist[];
  sumemps:sumemp[];
  sumaswhns:sumaswhn[];
  emplists: emplist[];

  @ViewChild('username') username:ElementRef;
  radioModel = 'Middle';
  areaSection = true;
  employeeSection = false;
  users2: User2[];
  public form: any = FormGroup;
  excelDataPendingForLock: any[];



  constructor(private modalService: BsModalService,
    private alertService: AlertServiceService,
    private excelservice: ExcelserviceService,
    private formBuilder : FormBuilder,
    private lockService : LockService,
    private datePipe: DatePipe
    ) {

  this.typeList = [
    { label: 'Supplementry Cycle', value: 'Supplementry' },
     { label: 'As & When Cycle', value: 'As & When' },];
  }





  ngOnInit(): void {
    this.asAndWhenForm();
    this.rowData();
    // this.getCycleName();
  //  this.getCyclesToLocktable();
   this.getCompnay();
   this.getLockTable();
   this.pendingForLockAsWhen();

  }

  rowData(){

    this.customers = [
      { empcode: '1', empName: ' ', designation: ' ', grade: ' ', establishment: ' ', department: ' ', area: ' ', companyname: ' ', service: ' ' },
      { empcode: '11', empName: 'ssss', designation: ' ', grade: ' ', establishment: ' ', department: ' ', area: ' ', companyname: ' ', service: ' ' },
      { empcode: '111', empName: 'dddddd', designation: ' ', grade: ' ', establishment: ' ', department: ' ', area: ' ', companyname: ' ', service: ' ' },
      { empcode: '555', empName: 'dddddd', designation: ' ', grade: ' ', establishment: ' ', department: ' ', area: ' ', companyname: ' ', service: ' ' },
      { empcode: '222', empName: 'dddddd', designation: ' ', grade: ' ', establishment: ' ', department: ' ', area: ' ', companyname: ' ', service: ' ' },
      { empcode: '1', empName: 'dddddd', designation: ' ', grade: ' ', establishment: ' ', department: ' ', area: ' ', companyname: ' ', service: ' ' },
      { empcode: '1', empName: 'dddddd', designation: ' ', grade: ' ', establishment: ' ', department: ' ', area: ' ', companyname: ' ', service: ' ' },
      { empcode: '1', empName: 'dddddd', designation: ' ', grade: ' ', establishment: ' ', department: ' ', area: ' ', companyname: ' ', service: ' ' },
      { empcode: '1', empName: 'dddddd', designation: '', grade: ' ', establishment: ' ', department: ' ', area: ' ', companyname: ' ', service: ' ' },
      { empcode: '888', empName: 'dddddd', designation: '', grade: ' ', establishment: ' ', department: ' ', area: ' ', companyname: ' ', service: ' ' },
      { empcode: '1', empName: 'dddddd', designation: '', grade: ' ', establishment: ' ', department: ' ', area: ' ', companyname: ' ', service: ' ' },
      { empcode: '1', empName: 'dddddd', designation: '', grade: ' ', establishment: ' ', department: ' ', area: ' ', companyname: ' ', service: ' ' },
      { empcode: '66', empName: 'dddddd', designation: '', grade: ' ', establishment: '123', department: ' ', area: ' ', companyname: ' ', service: '' },

    ];
    console.log("customers",this.customers);
    this.users1 = [
      { area: 'area', service: 'aaa', cmpnyname: 'aaaa', },
      { area: 'area', service: 'aaa', cmpnyname: 'aaaa', },
      { area: 'area', service: 'aaa', cmpnyname: 'aaaa', },
    ];
    console.log("users1",this.users1);
    this.emplists = [
      { empno: '1', area: 'area', service: 'aaa', cmpnyname: 'aaaa', },
      { empno: '1', area: 'area', service: 'aaa', cmpnyname: 'aaaa', },
      { empno: '1', area: 'area', service: 'aaa', cmpnyname: 'aaaa', },
    ];
    this.arealists = [
      { area: 'area', service: 'aaa', cmpnyname: 'aaaa', },
      { area: 'area', service: 'aaa', cmpnyname: 'aaaa', },
      { area: 'area', service: 'aaa', cmpnyname: 'aaaa', },


    ];
    this.sumareas = [{
      area: '', companyname: '', service: '', businessyear: '', cyclename: '', cycledefinition: 'a',fromdatearea: 't', todatearea: '11', lockdatearea: 'aa', lockbyarea: 'SS'}
    ];
    this.sumbusinesss = [{
      area: '', companyname: '', service: '', businessyear: '', fromdate: '', todate: '', lockdate: '', lockby: '' }
    ];
    this.sumemps = [{
    empcode:'111',empname:'Rihan',  area: '', companyname: '', service: '', businessyear: '',cyclename: '', cycledefinition: '', fromdate: '', todate: '', lockdate: '', lockby: '', }
    ];

    this.sumaswhns = [{
      companyname: '', service: '',businessyear:'',type:'', cyclename: '', remark: 'a',fromdate: 't', todate: '11', lockdate: 'aa', lockby: 'SS'}
    ];



    this.aswhens = [
      {
        companyname: 'Paysquare',
        service: 'IT',
        type: 'As & When Cycle',
        cyclecreationdate: '22-jan-2021',
        cyclename: 'Weekly',
        fromdate: '23-jan-2021',
        todate: '29-jan-2021',

      },
      {
        companyname: 'Paysquare',
        service: 'IT',
        type: 'Supplementry Cycle',
        cyclecreationdate: '22-jan-2021',
        cyclename: 'Weekly',
        fromdate: '23-jan-2021',
        todate: '29-jan-2021',

      },
      {
        companyname: 'Paysquare',
        service: 'IT',
        type: 'Supplementry Cycle',
        cyclecreationdate: '22-jan-2021',
        cyclename: 'Weekly',
        fromdate: '23-jan-2021',
        todate: '29-jan-2021',

      },
      {
        companyname: 'Paysquare',
        service: 'IT',
        type: 'Supplementry Cycle',
        cyclecreationdate: '22-jan-2021',
        cyclename: 'Weekly',
        fromdate: '23-jan-2021',
        todate: '29-jan-2021',

      },
      {
        companyname: 'Paysquare',
        service: 'IT',
        type: 'Supplementry Cycle',
        cyclename: 'Weekly',
        cyclecreationdate: '22-jan-2021',

        fromdate: '23-jan-2021',
        todate: '29-jan-2021',

      },
      {
        companyname: 'Paysquare',
        service: 'IT',
        type: 'Supplementry Cycle',
        cyclename: 'Weekly',
        cyclecreationdate: '22-jan-2021',

        fromdate: '23-jan-2021',
        todate: '29-jan-2021',

      },
    ];
    this.groups = [
      { name: '101' },
      { name: '102' },
      { name: '103' },

    ];
    this.cities = [
      { name: 'Set 1' },
      { name: 'Set 2' },
      { name: 'Set 3' },

    ];


  }

  //Get Compnay API
  getCompnay(){
    this.lockService.getCompnays().subscribe((res) =>{
      this.companyNameList = res.data.results;
      console.log("companyNameList",this.companyNameList)
      res.data.results.forEach(element => {
        const obj ={
          label : element.companyName,
          value : element.companyCode,
        }
        this.compnaysList.push(obj);
      });

    })
  }

  //Get API
  getLockTable(){
    this.lockService.getAsAndWhenType().subscribe((res) =>{
      this.getLockTableDataList = res.data.results[0];
      console.log("getLockTableDataList", this.getLockTableDataList);
      res.data.results[0].forEach(element => {
        const obj ={
          companyName : element.companyName,
          serviceName : element.serviceName,
          type : element.type,
          cycle : element.cycle,
          createDateTime : new Date(element.createDateTime),
          fromDate : new Date(element.fromDate),
          toDate : new Date(element.toDate),
          businessCycleId : element.businessCycleId
        }

        this.lockTableDataList.push(obj);
      });
    });
  }

     onChangeDefinationEmp(evt: any) {
      this.form.patchValue({
        startDate: '',
        endDate: '',
        periodName: '',
      });
      this.cycleNames = [];
      if (evt == '') {
        this.cycleNames = [];
      } else {
        this.cycleNames = [];
        this.lockService.getCycleName(evt).subscribe(
          (res) => {
            this.cycleNameList = res.data.results[0];
        console.log("cycleNameList And from , to Date ", this.cycleNameList);
        this.cycleNameList.forEach(element => {
          const obj ={
            label : element.periodName,
            value : element.id,
          }
          this.cycleNames.push(obj);
        });
          },
          (error: any) => {
            this.alertService.sweetalertError(
              error['error']['status']['message']
            );
          }
        );
      }
    }



        //Get Type
        // getCyclesToLocktable(){
        //   this.lockService.getCyclesToLocktable().subscribe((res) =>{
        //     this.summaryTableList = res.data.results[0];
        //     console.log("summaryTableList", this.summaryTableList);
        //     res.data.results[0].forEach(element => {
        //       const obj ={
        //         companyName: element.companyName,
        //         payrollAreaCode: element.payrollAreaCode,
        //         serviceName: element.serviceName,
        //       }
        //       this.summaryList.push(obj);
        //     });
        //   });
        // }


 //on Change Cycle Name get the From date and to Date
 onSelectCycleName(evt: any) {
  if (evt != '') {
    this.cycleNameList.forEach((element) => {
      if (element.id == evt) {
        this.form.patchValue({
          startDate: new Date(element.fromDate),
          endDate: new Date(element.toDate),
        });
      }
    });
  } else {
    this.form.patchValue({
      startDate: '',
      endDate: '',
    });
  }
}

  //Reactive Form
  asAndWhenForm(){
   this.form = this.formBuilder.group({
    companyName : new FormControl('',Validators.required),
    type : new FormControl('',Validators.required),
    periodName : new FormControl('', Validators.required),
    startDate : new FormControl(''),
    endDate : new FormControl('')
   });
  }

//Save Supplementry
  save(){
    // this.allAreaCodes = [];
    // const selectedPayrollAreaCodes = this.form.get('periodName').value;
    // if (selectedPayrollAreaCodes.length > 0) {
    //   selectedPayrollAreaCodes.forEach((element) => {
    //     this.allAreaCodes.push(element.value);
    //   });
    // } else {
    //   this.alertService.sweetalertWarning('Please select Group code');
    //   return false;
    // }


    const data = [{
      // cycleLockPayrollAreaTempIds :this.allAreaCodes,
      cycleLockPayrollAreaTempIds : parseInt(this.form.get('periodName').value),
    }]

    this.lockService.postAsAndWhen(data).subscribe((res) => {
      if(res){
        if(res.data.results.length >= 1) {
         //  this.getAreaTableSummaryList()
          this.alertService.sweetalertMasterSuccess( res.status.message, '' );
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      }else {
        this.alertService.sweetalertError(
          'Something went wrong. Please try again.'
        );
      }
  })
  this.form.reset();
  this.form.patchValue({
    companyName : '',
    type : '',
    periodName : '',
    startDate : '',
    endDate : '',
  });
  }

  //Reset  the form

  resetForm(){
    this.form.reset();
    this.form.patchValue({
      companyName : '',
      type : '',
      periodName : '',
      startDate : '',
      endDate : '',
    });
  }

//Check box  Select in the summary table
  onCheckArea(checkValue, element,rowIndex){
    this.RowSelected(element,rowIndex);
    if(checkValue){
      const data = {
        companyName : element.companyName,
        serviceName : element.serviceName,
        type : element.type,
        cycle : element.cycle,
        createDateTime : new Date(element.createDateTime),
        fromDate : new Date(element.fromDate),
        toDate : new Date(element.toDate),
        businessCycleId : element.businessCycleId,
      };
      this.checkedSummaryList.push(data);
      console.log("checkedSummaryList", this.checkedSummaryList)
    }
    else {
      const index = this.checkedSummaryList.indexOf((item) => (item.businessCycleId == element.businessCycleId));
      this.checkedSummaryList.splice(index, 1);
      console.log("checkedSummaryList", this.checkedSummaryList)
    }


  }

  doubleClickOnLeftTable(evt: any) {}


  //Row select in table
   RowSelected(u: any, ind: number) {
    this.HighlightRow = ind;
    let temp = this.lockTableDataList;
    this.lockTableDataList = new Array();
    let index = this.selectedUser.findIndex(
      (o) => o.businessCycleId == u.businessCycleId
    );
    let isContain = this.selectedUser.some(
      (o) => o.businessCycleId == u.businessCycleId
    );
    if (isContain == true) {
      this.selectedUser.splice(index, 1);
    } else {
      this.selectedUser.push(u);
    }
    this.lockTableDataList = temp;
    this.lockTableDataList.forEach((element, i) => {
      if (i == this.HighlightRow) {
        element.isHighlightright = false;
        if (isContain == true) {
          element.isHighlight = false;
        } else {
          if (i == this.HighlightRow) {
            element.isHighlight = true;
          }
        }
      }
    });
  }

 //Row select in table As and When
 RowSelectedInLock(u: any, ind: number) {
  this.HighlightRow = ind;
  let temp = this.checkedSummaryList;
  this.checkedSummaryList = new Array();
  let index = this.selectedUserAsAndWhen.findIndex(
    (o) => o.businessCycleId == u.businessCycleId
  );
  let isContain = this.selectedUserAsAndWhen.some(
    (o) => o.businessCycleId == u.businessCycleId
  );
  if (isContain == true) {
    this.selectedUserAsAndWhen.splice(index, 1);
  } else {
    this.selectedUserAsAndWhen.push(u);
  }
  this.checkedSummaryList = temp;
  this.checkedSummaryList.forEach((element, i) => {
    if (i == this.HighlightRow) {
      element.isHighlightright = false;
      if (isContain == true) {
        element.isHighlight = false;
      } else {
        if (i == this.HighlightRow) {
          element.isHighlight = true;
        }
      }
    }
  });
}

//Penidng for lock selected row
 RowSelectedPendingforLock(u: any, ind: number) {
  this.HighlightRow = ind;
  let temp = this.pendingLockList;
  this.pendingLockList = new Array();
  let index = this.selectedUserPending.findIndex(
    (o) => o.businessCycleId == u.businessCycleId
  );
  let isContain = this.selectedUserPending.some(
    (o) => o.businessCycleId == u.businessCycleId
  );
  if (isContain == true) {
    this.selectedUserPending.splice(index, 1);
  } else {
    this.selectedUserPending.push(u);
  }
  this.pendingLockList = temp;
  this.pendingLockList.forEach((element, i) => {
    if (i == this.HighlightRow) {
      element.isHighlightright = false;
      if (isContain == true) {
        element.isHighlightPending = false;
      } else {
        if (i == this.HighlightRow) {
          element.isHighlightPending = true;
        }
      }
    }
  });
}

  //Cycle lock 1 table Excel
exportApprovalSummaryAsExcel(): void {
  this.excelData = [];
  this.header = []
  this.header =["companyName", "serviceName", "type","cycle", "createDateTime", "fromDate", "toDate"];
  this.excelData = [];
  if(this.lockTableDataList.length>0){
   // this.employeeList = this.employeeList.filter((emp)=>this.psidList.some((p)=>p.psid=emp.proofSubmissionId));
   //this.employeeList =  this.areTableList;
   this.lockTableDataList.forEach((element) => {
    let obj = {
      companyName : element.companyName,
      serviceName : element.serviceName,
      type : element.type,
      cycle : element.cycle,
      createDateTime : new Date(element.createDateTime),
      fromDate : new Date(element.fromDate),
      toDate : new Date(element.toDate),
      businessCycleId : element.businessCycleId
    };
    this.excelData.push(obj);
  });
    console.log('this.excelData::', this.excelData);
  }
  this.excelservice.exportAsExcelFile(this.excelData, 'Cycles to Lock', 'Cycles to Lock' ,this.header);
  console.log('this.excelData::', this.excelData);
}

//Excel pending for lock
AsWhenExportApprovalSummaryAsExcel(): void {
  this.excelDataAsAndWhen = [];
  this.header = []
  this.header =["companyName", "serviceName", "type","cycle", "createDateTime", "fromDate", "toDate"];
  this.excelDataAsAndWhen = [];
  if(this.checkedSummaryList.length>0){
   // this.employeeList = this.employeeList.filter((emp)=>this.psidList.some((p)=>p.psid=emp.proofSubmissionId));
   //this.employeeList =  this.areTableList;
   this.checkedSummaryList.forEach((element) => {
    let obj = {
      companyName : element.companyName,
      serviceName : element.serviceName,
      type : element.type,
      cycle : element.cycle,
      createDateTime : new Date(element.createDateTime),
      fromDate : new Date(element.fromDate),
      toDate : new Date(element.toDate),
      businessCycleId : element.businessCycleId
    };
    this.excelDataAsAndWhen.push(obj);
  });
    console.log('this.excelDataAsAndWhen::', this.excelDataAsAndWhen);
  }
  this.excelservice.exportAsExcelFile(this.excelDataAsAndWhen, 'As & When /Supplementry Cycle Lock', 'As & When /Supplementry Cycle Lock' ,this.header);
  console.log('this.excelDataAsAndWhen::', this.excelDataAsAndWhen);
}

exportApprovalPendingForLock(): void {
  this.excelDataPendingForLock = [];
  this.header = []
  this.header =["companyName", "serviceName", "type","cycle", "createDateTime", "fromDate", "toDate"];
  this.excelDataPendingForLock = [];
  if(this.pendingLockList.length>0){
   // this.employeeList = this.employeeList.filter((emp)=>this.psidList.some((p)=>p.psid=emp.proofSubmissionId));
   //this.employeeList =  this.areTableList;
   this.pendingLockList.forEach((element) => {
    let obj = {
      companyName : element.companyName,
      serviceName : element.serviceName,
      type : element.type,
      cycle : element.cycle,
      createDateTime : new Date(element.createDateTime),
      fromDate : new Date(element.fromDate),
      toDate : new Date(element.toDate),
      businessCycleId : element.businessCycleId
    };
    this.excelDataPendingForLock.push(obj);
  });
    console.log('this.excelDataPendingForLock::', this.excelDataPendingForLock);
  }
  this.excelservice.exportAsExcelFile(this.excelDataPendingForLock, 'Pending for lock', 'Pending for lock' ,this.header);
  console.log('this.excelDataPendingForLock::', this.excelDataPendingForLock);
}

// lockCycle(template2: TemplateRef<any>) {
//   this.modalRef = this.modalService.show(
//     template2,
//     Object.assign({}, { class: 'gray modal-lg' })
//   );
// }

lockCycle(template2: TemplateRef<any>) {
  // this.checkedSummaryList = [];
  // this.checkedFinalLockList = [];
  // this.modalRef.hide()
if(this.checkedSummaryList.length > 0){
this.modalRef = this.modalService.show(
  template2,
  Object.assign({}, { class: 'gray modal-lg' })
);
}

}

//On Check Cycle lock poup Check box
 //OnCheck check box in area summary table On Check Area after click on  Lock button
 onCheckAreaInLock(checkValue, element,rowIndex){
   this.RowSelectedInLock(element,rowIndex);
  if(checkValue){
    this.checkedFinalLockList.push(element.businessCycleId);
  }else {
     const index = this.checkedFinalLockList.indexOf((p) => (p.businessCycleId = element.businessCycleId));
    this.checkedFinalLockList.splice(index, 1);
  }

}

//Pending for lock
inPendingForLock(checkValue, element, rowIndex){
  this.RowSelectedPendingforLock(element, rowIndex);
 if(checkValue){
   this.finalpendingLockList.push(element.businessCycleId);
 }else {
    const index = this.finalpendingLockList.indexOf((p) => (p.businessCycleId = element.businessCycleId));
   this.finalpendingLockList.splice(index, 1);
 }

}


//Reset Cycle table
resetLock(){
  this.checkedSummaryList = [];
  this.checkedFinalLockList = [];
  this.selectedUserAsAndWhen = [];
 this.modalRef.hide()
}


//Reset Cycle table
resetPendingForLock(){
  this.pendingLockList = [];
  this.finalpendingLockList = [];
  this.selectedUserPending = [];
 this.modalRef.hide()
}

//Pending for lock
pendingForLockAsWhen(){
  this.lockService.pendingForLockAsWhen().subscribe((res) =>{
    this.pendingForLockList = res.data.results[0];
    console.log("pendingForLockList",this.pendingForLockList)
    res.data.results[0].forEach(element => {
      const obj ={
        cycleLockAsAndWhenAndSuppTempId : element.cycleLockAsAndWhenAndSuppTempId,
        businessCycleId : element.businessCycleId,
        payrollAreaCode : element.payrollAreaCode,
        payrollAreaId : element.payrollAreaId,
        areaMasterId : element.areaMasterId,
        cycle : element.cycle,
        type : element.type,
        serviceName : element.serviceName,
        companyName : element.companyName,
        createDateTime : element.createDateTime,
        fromDate : element.fromDate,
        toDate : element.toDate,
        isActive : element.isActive,
        isChecked : element.isChecked,
      }
      this.pendingLockList.push(obj);
    });

  })
}

//Lock Poup
// lock(lockTemp: TemplateRef<any>) {
//   if(this.checkedSummaryList.length > 0){
//    this.modalRef = this.modalService.show(
//      lockTemp,
//      Object.assign({}, { class: 'gray modal-lg' })
//    );
//   }

//    }


  smallpopup(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }

  Areapendingforlockpopup(Areapendingforlock: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      Areapendingforlock,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  Emplist(emplist: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      emplist,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  Arealistpop(arealist: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      arealist,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }


  Aswhen2(aswhen2: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      aswhen2,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  BusinessLockpop(BusinessLock: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      BusinessLock,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  BusinessPendingForLockPopup(BusinessPendingForLock: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      BusinessPendingForLock,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null)
        result = -1;
      else if (value1 != null && value2 == null)
        result = 1;
      else if (value1 == null && value2 == null)
        result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return (event.order * result);
    });
  }

  areaSelect() {
    this.areaSection = true;
    this.employeeSection = false;
     }
     employeeSelect() {
       this.areaSection = false;
       this.employeeSection = true;
     }



}

