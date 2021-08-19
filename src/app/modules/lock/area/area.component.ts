import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import {
  trigger,
  transition,
  animate,
  style,
  state,
} from '@angular/animations';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LockService } from '../lock.service';

import { AlertServiceService } from '../../../core/services/alert-service.service';
import { element } from 'protractor';
import { ExcelserviceService } from '../../../core/services/excelservice.service';

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
export interface arealist {
  area;
  service;
  cmpnyname;
}

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss'],
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
// export class AreaComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
export class AreaComponent implements OnInit {
  public modalRef: BsModalRef;
  public cycleDefinationList: Array<any> = [];
  public cycleNameList: Array<any> = [];
  public companyNameList: Array<any> = [];
  public serviceNameList: Array<any> = [];
  public NameofCycleDefination: Array<any> = [];
  public periodNameList: Array<any> = [];
  public ServiceAreaList: Array<any> = [];
  public serviceNames: Array<any> = [];
  public companyNames: Array<any> = [];
  public areaSeriveList: Array<any> = [];
  public areaSummaryTableList: Array<any> = [];
  public allAreaCodes: Array<any> = [];
  public serviceNameLabel: Array<any> = [];
  public areaForm: any = FormGroup;
  public empForm: any = FormGroup;
  public areTableList : Array<any> = []
  public checkedSummaryList : Array<any> = []
  public checkedFinalLockList  :  Array<any> = [];
  public AreaCodes  :  Array<any> = [];
  public employeeList : Array<any> = [];

    disabled: boolean = true;
    customers: Customer[];
    users1: User1[];
    emplists: emplist[];
    arealists: arealist[];
    public HighlightRight: any;
    public selectedUser: Array<any> = [];
    public selectedUserInLock: Array<any> = [];

    HighlightRow: number;
//


cycleDefinationListEmp: Array<any> = [];
NameofCycleDefinationEmp: Array<any> = [];
cycleNameListEmp: Array<any> = [];
periodNameListEmp: Array<any> = [];
companyNameListEmp: Array<any> = [];
companyNamesEmp: Array<any> = [];
serviceNameListEmp: Array<any> = [];
employeeCodes: Array<any> = [];
employeeCodeList: Array<any> = [];
serviceNamesEmp: Array<any> = [];
ServiceAreaListEmp: Array<any> = [];
areaSeriveListEmp: Array<any> = [];
allAreaCodesEmp: Array<any> = [];
areTableListEmp: Array<any> = [];
selectedUserEmp: Array<any> = [];
excelDataLock: Array<any> = [];

  excelData: any[];
  header: any[];
  excelDataAreaLock: any[];
  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertServiceService,
    private modalService: BsModalService,
    private lockService: LockService,
    private excelservice: ExcelserviceService,
  ) {
    this.reactiveAreaForm();
    this.reactiveEmpForm();
  }

  ngOnInit(): void {
    this.getAreaTableSummaryList();
    this.getAllCycleDefination();
    this.getAllCompanyName();
    // this.getAllCycleName();
    this.getAllServiceName();

    this.getAreaTableSummaryListEmp();
    this.getAllCycleDefinationEmp();
    this.getAllCompanyNameEmp();
    // this.getAllCycleName();
    this.getAllServiceNameEmp();

    this.customers = [
      {
        empcode: '1',
        empName: ' ',
        designation: ' ',
        grade: ' ',
        establishment: ' ',
        department: ' ',
        area: ' ',
        companyname: ' ',
        service: ' ',
      },
      {
        empcode: '11',
        empName: 'ssss',
        designation: ' ',
        grade: ' ',
        establishment: ' ',
        department: ' ',
        area: ' ',
        companyname: ' ',
        service: ' ',
      },
      {
        empcode: '111',
        empName: 'dddddd',
        designation: ' ',
        grade: ' ',
        establishment: ' ',
        department: ' ',
        area: ' ',
        companyname: ' ',
        service: ' ',
      },
      {
        empcode: '555',
        empName: 'dddddd',
        designation: ' ',
        grade: ' ',
        establishment: ' ',
        department: ' ',
        area: ' ',
        companyname: ' ',
        service: ' ',
      },
      {
        empcode: '222',
        empName: 'dddddd',
        designation: ' ',
        grade: ' ',
        establishment: ' ',
        department: ' ',
        area: ' ',
        companyname: ' ',
        service: ' ',
      },
      {
        empcode: '1',
        empName: 'dddddd',
        designation: ' ',
        grade: ' ',
        establishment: ' ',
        department: ' ',
        area: ' ',
        companyname: ' ',
        service: ' ',
      },
      {
        empcode: '1',
        empName: 'dddddd',
        designation: ' ',
        grade: ' ',
        establishment: ' ',
        department: ' ',
        area: ' ',
        companyname: ' ',
        service: ' ',
      },
      {
        empcode: '1',
        empName: 'dddddd',
        designation: ' ',
        grade: ' ',
        establishment: ' ',
        department: ' ',
        area: ' ',
        companyname: ' ',
        service: ' ',
      },
      {
        empcode: '1',
        empName: 'dddddd',
        designation: '',
        grade: ' ',
        establishment: ' ',
        department: ' ',
        area: ' ',
        companyname: ' ',
        service: ' ',
      },
      {
        empcode: '888',
        empName: 'dddddd',
        designation: '',
        grade: ' ',
        establishment: ' ',
        department: ' ',
        area: ' ',
        companyname: ' ',
        service: ' ',
      },
      {
        empcode: '1',
        empName: 'dddddd',
        designation: '',
        grade: ' ',
        establishment: ' ',
        department: ' ',
        area: ' ',
        companyname: ' ',
        service: ' ',
      },
      {
        empcode: '1',
        empName: 'dddddd',
        designation: '',
        grade: ' ',
        establishment: ' ',
        department: ' ',
        area: ' ',
        companyname: ' ',
        service: ' ',
      },
      {
        empcode: '66',
        empName: 'dddddd',
        designation: '',
        grade: ' ',
        establishment: '123',
        department: ' ',
        area: ' ',
        companyname: ' ',
        service: '',
      },
    ];

    console.log('customers', this.customers);

    this.users1 = [
      { area: 'area', service: 'aaa', cmpnyname: 'aaaa' },
      { area: 'area', service: 'aaa', cmpnyname: 'aaaa' },
      { area: 'area', service: 'aaa', cmpnyname: 'aaaa' },
    ];
    this.emplists = [
      { empno: '1', area: 'area', service: 'aaa', cmpnyname: 'aaaa' },
      { empno: '1', area: 'area', service: 'aaa', cmpnyname: 'aaaa' },
      { empno: '1', area: 'area', service: 'aaa', cmpnyname: 'aaaa' },
    ];
    this.arealists = [
      { area: 'area', service: 'aaa', cmpnyname: 'aaaa' },
      { area: 'area', service: 'aaa', cmpnyname: 'aaaa' },
      { area: 'area', service: 'aaa', cmpnyname: 'aaaa' },
    ];
  }

  smallpopup(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }
  lockTemp(template2: TemplateRef<any>) {
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

  ///Area Tab code
  reactiveAreaForm() {
    this.areaForm = this.formBuilder.group({
      cycleLockPayrollAreaId: new FormControl(0),
      areaMasterId: new FormControl(0),
      id: new FormControl(0),
      name: new FormControl('', Validators.required),
      businessCycleDefinitionId: new FormControl(null),
      periodName: new FormControl('', Validators.required),
      fromDate: new FormControl(''),
      toDate: new FormControl(''),
      // companyName : new FormControl ('', Validators.required),
      companyName: new FormControl(''),
      serviceName: new FormControl('', Validators.required),
      groupCompanyId: new FormControl(''),
      serviceMasterId: new FormControl(''),
      areaMasterCode: new FormControl('', Validators.required),
    });
  }

  //Cycle Defination Service
  getAllCycleDefination() {
    this.lockService.getAllCycleData().subscribe((res) => {
      this.cycleDefinationList = res;
      console.log('cycleDefinationList', this.cycleDefinationList);

      res.data.results[0].forEach((element) => {
        const obj = {
          label: element.name,
          value: element.id,
        };
        this.NameofCycleDefination.push(obj);
      });
    });
  }

  //All Cycle Name API
  // getAllCycleName(){
  //   this.lockService.getAllCycleNamesA().subscribe((res) =>{
  //     console.log("res.data.results[0]", res);
  //     this.cycleNameList = res.data.results[0];
  //     console.log("cycleNameList", this.cycleNameList);
  //   });
  // }

  //  Get defication on change

  onChangeDefination(evt: any) {
    this.areaForm.patchValue({
      fromDate: '',
      toDate: '',
    });
    if (evt == '') {
      this.periodNameList = [];
    } else {
      this.periodNameList = [];
      this.lockService.getAllCycleNames(evt).subscribe(
        (res) => {
          this.cycleNameList = res.data.results[0];
          console.log('cycleNameList', this.cycleNameList);
          res.data.results[0].forEach((element) => {
            const obj = {
              label: element.periodName,
              value: element.businessCycleDefinitionId,
            };
            this.periodNameList.push(obj);
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
  //Get Cycle Name
  onSelectCycleName(evt: any) {
    if (evt != '') {
      this.cycleNameList.forEach((element) => {
        if (element.periodName == evt) {
          this.areaForm.patchValue({
            fromDate: new Date(element.fromDate),
            toDate: new Date(element.toDate),
          });
        }
      });
    } else {
      this.areaForm.patchValue({
        fromDate: '',
        toDate: '',
      });
    }
  }

  //Company Name and GroupCompanyId API
  getAllCompanyName() {
    this.lockService.getAllCompanysName().subscribe((res) => {
      this.companyNameList = res.data.results[0];
      console.log('companyNameList', this.companyNameList);
      res.data.results.forEach((element) => {
        const obj = {
          label: element.companyName,
          value: element.groupCompanyId,
        };
        this.companyNames.push(obj);
      });
    });
  }

  //Service Master Name API
  getAllServiceName() {
    this.lockService.getAllServicesName().subscribe((res) => {
      this.serviceNameList = res.data.results[0];
      console.log('serviceNameList', this.serviceNameList);
      res.data.results[0].forEach((element) => {
        const obj = {
          label: element.serviceName,
          value: element.serviceMasterId,
        };
        this.serviceNames.push(obj);
      });
    });
  }

  //On Seelct service name get The Area  List
  // onSelectServiceName(evt: any) {
  //   if (evt == '') {
  //     this.ServiceAreaList = [];
  //   } else {
  //     this.ServiceAreaList = [];
  //     this.lockService.getAreawServicesName(evt).subscribe(
  //       (res) => {
  //         this.areaSeriveList = res.data.results[0];
  //         console.log('areaSeriveList', this.areaSeriveList);
  //         res.data.results[0].forEach((element) => {
  //           const obj = {
  //             //   label: element.areaMasterCode,
  //             //   value: element.payrollAreaId,
  //             name: element.payrollArea.payrollAreaCode,
  //             code: element.payrollArea.payrollAreaId,

  //             // label: element.payrollAreaCode,
  //             // value: element.payrollAreaId,

  //           };
  //           this.ServiceAreaList.push(obj);
  //         });
  //       },
  //       (error: any) => {
  //         this.alertService.sweetalertError(
  //           error['error']['status']['message']
  //         );
  //       }
  //     );
  //   }
  // }

  onSelectServiceName(evt: any) {
   if(evt == '1'){
    if (evt == '') {
      this.ServiceAreaList = [];
    } else {
      this.ServiceAreaList = [];
      this.lockService.getAreawServicesName(evt).subscribe(
        (res) => {
          this.areaSeriveList = res.data.results[0];
          console.log('areaSeriveList', this.areaSeriveList);
          res.data.results[0].forEach((element) => {
            const obj = {

              name: element.payrollAreaCode,
              code: element.payrollAreaId,

            };
            this.ServiceAreaList.push(obj);
          });
        },
        (error: any) => {
          this.alertService.sweetalertError(
            error['error']['status']['message']
          );
        }
      );
    }
   }else {
    if (evt == '') {
      this.ServiceAreaList = [];
    } else {
      this.ServiceAreaList = [];
      this.lockService.getAreawServicesName(evt).subscribe(
        (res) => {
          this.areaSeriveList = res.data.results[0];
          console.log('areaSeriveList', this.areaSeriveList);
          res.data.results[0].forEach((element) => {
            const obj = {
              //   label: element.areaMasterCode,
              //   value: element.payrollAreaId,
              name: element.payrollArea.payrollAreaCode,
              code: element.payrollArea.payrollAreaId,

            };
            this.ServiceAreaList.push(obj);
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
  }




  // Save Area Form
  saveArea() {
    this.allAreaCodes = [];
    const selectedPayrollAreaCodes = this.areaForm.get('areaMasterCode').value;
    if (selectedPayrollAreaCodes.length > 0) {
      selectedPayrollAreaCodes.forEach((element) => {
        this.allAreaCodes.push(element.name);
      });
    } else {
      this.alertService.sweetalertWarning('Please select Group code');
      return false;
    }

    const data = [{
      areaMasterId: this.getAreaMasterID(),
      businessCycleId: this.getBusinessID(),
      cycle: this.areaForm.get('periodName').value,
      serviceName: this.getServiceName(this.areaForm.get('serviceName').value),
      payrollAreaCodeList: this.allAreaCodes,
      isChecked: false
    }];



    this.lockService.postAreaForm(data).subscribe((res: any) => {
       if(res){
        if(res.data.results.length >= 1) {
          this.getAreaTableSummaryList()
          this.alertService.sweetalertMasterSuccess( res.status.message, '' );
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      }else {
        this.alertService.sweetalertError(
          'Something went wrong. Please try again.'
        );
      }
    });
    this.areaForm.reset();
    this.areaForm.patchValue({
      companyName : '',
      serviceName : '',
      periodName : '',
      name : '',
    })
  }

  getServiceName(serviceCode: any) {
    const toSelect = this.serviceNameList.find(
      (element) => element.serviceMasterId == serviceCode
    );
    return toSelect.serviceName;
    console.log('toSelect', toSelect);
  }

  //Get AArea Master ID
  getAreaMasterID() {
    if (this.areaSeriveList.length > 0) {
      return this.areaSeriveList[0].areaMaster.areaMasterId;
    } else {
      return 0;
    }
  }


//Get Business Cycle ID
  getBusinessID() {
    if (this.cycleNameList.length > 0) {
      return this.cycleNameList[0].id;
    } else {
      return 0;
    }
  }

    //Area Table List
  getAreaTableSummaryList(){
    this.lockService.getAllAreaTableList().subscribe((res) => {
      if(res.data.results.length > 0){
        this.areTableList = res.data.results[0];
        console.log("areTableList",this.areTableList)
      }
    });
  }

  //OnCheck check box in area summary table
  onCheckArea(checkValue, element){
    if(checkValue){
      const data = {
        companyName : element.companyName,
        payrollAreaCode : element.payrollAreaCode,
        serviceName : element.serviceName,
        cycleLockPayrollAreaTempId : element.cycleLockPayrollAreaTempId,
      };
      this.checkedSummaryList.push(data);
      console.log("checkedSummaryList", this.checkedSummaryList)
    }
    else {
      const index = this.checkedSummaryList.indexOf((item) => (item.cycleLockPayrollAreaTempId == element.cycleLockPayrollAreaTempId));
      this.checkedSummaryList.splice(index, 1);
      console.log("checkedSummaryList", this.checkedSummaryList)
    }
  }


  // onCheckJobMaster(checkValue, element): void {
  //   if (checkValue) {
  //     const data = {
  //       jobMasterValueId: element.jobMasterValueId,
  //       groupCompanyId: parseInt(this.formAssignment.controls.companyName.value),
  //       fromDate: this.datePipe.transform(element.fromDate, "dd-MMM-yyyy"),
  //       toDate: this.datePipe.transform(element.toDate, "dd-MMM-yyyy")
  //     };
  //     this.mappedJobMastersToCompany.push(data);
  //     // this.employeeList.filter((employee)=>employee.jobMasterValueId==element.jobMasterValueId).forEach((excelEmploee)=>{
  //     //   this.excelEmployeeList.push(excelEmploee);
  //     // });
  //   } else {
  //     const index = this.mappedJobMastersToCompany.indexOf((p) => (p.jobMasterValueId = element.jobMasterValueId));
  //     this.mappedJobMastersToCompany.splice(index, 1);
  //     // this.excelEmployeeList.splice(index, 1);
  //   }
  // }

  // updateFromDate(eventDate, jobMasterId) {
  //   this.companyAssignTableListDummy.forEach(element => {
  //     if (element.jobMasterValueId == jobMasterId) {
  //       element.fromDate = this.datePipe.transform(eventDate, 'dd-MMM-yyyy' );

  //     }
  //   });
  // }



  //Reset the  form
  resetAreaForm(){
    this.areaForm.reset();
    this.areaForm.patchValue({
      companyName : '',
      serviceName : '',
      periodName : '',
      name : '',
    })
    }



  //Row select in table
   //Select Row in left table of PHG
   RowSelected(u: any, ind: number) {
    this.HighlightRow = ind;

    let temp = this.areTableList;
    this.areTableList = new Array();
    let index = this.selectedUser.findIndex(
      (o) => o.cycleLockPayrollAreaTempId == u.cycleLockPayrollAreaTempId
    );
    let isContain = this.selectedUser.some(
      (o) => o.cycleLockPayrollAreaTempId == u.cycleLockPayrollAreaTempId
    );
    if (isContain == true) {
      this.selectedUser.splice(index, 1);
    } else {
      this.selectedUser.push(u);
    }

    this.areTableList = temp;

    this.areTableList.forEach((element, i) => {
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

  doubleClickOnLeftTable(evt: any) {}


    //Row select in table
   //Select Row in left table of PHG
   RowSelectedInLock(u: any, ind: number) {
    this.HighlightRow = ind;

    let temp = this.checkedSummaryList;
    this.checkedSummaryList = new Array();
    let index = this.selectedUserInLock.findIndex(
      (o) => o.cycleLockPayrollAreaTempId == u.cycleLockPayrollAreaTempId
    );
    let isContain = this.selectedUserInLock.some(
      (o) => o.cycleLockPayrollAreaTempId == u.cycleLockPayrollAreaTempId
    );
    if (isContain == true) {
      this.selectedUserInLock.splice(index, 1);
    } else {
      this.selectedUserInLock.push(u);
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


   //OnCheck check box in area summary table On Check Area after click on  Lock button
   onCheckAreaInLock(checkValue, element){
    if(checkValue){
      this.checkedFinalLockList.push(element.cycleLockPayrollAreaTempId);
    }else {
       const index = this.checkedFinalLockList.indexOf((p) => (p.cycleLockPayrollAreaTempId = element.jobMasterValueId));
      this.checkedFinalLockList.splice(index, 1);
    }

  }

  //Reset Lock
  resetLock(){
    this.checkedSummaryList = [];
    this.checkedFinalLockList = [];
    this.modalRef.hide()

  }

  // Update Lock
  saveLockProceed(){
    const data = { cycleLockPayrollAreaTempIds : this.checkedFinalLockList }

    this.lockService.postAreaInLock(data).subscribe((res) =>{
      if(res){
        if(res.data.results.length >= 1) {
          this.alertService.sweetalertMasterSuccess( res.status.message, '' );
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      }else {
        this.alertService.sweetalertError(
          'Something went wrong. Please try again.'
        );
      }
      this.alertService.sweetalertMasterSuccess( '', 'Records added Successfully' );
      this.modalRef.hide()
      this.checkedSummaryList = [];
      this.getAreaTableSummaryListEmp ();
    });
  }


getReturnCycleTempID(cycleLockPayrollAreaTempId: any) {
  const toSelect = this.checkedFinalLockList.find(
    (element) => element.cycleLockPayrollAreaTempId == cycleLockPayrollAreaTempId
  );
  return toSelect.cycleLockPayrollAreaTempId;
  console.log('toSelect', toSelect);
}

// getReturnCycleTempID() {
//   if (this.checkedFinalLockList.length > 0) {
//     return this.checkedFinalLockList[0].cycleLockPayrollAreaTempId;
//   } else {
//     return 0;
//   }
// }

//// Emp tab ////////

reactiveEmpForm(){
  this.empForm = this.formBuilder.group({
    cycleLockPayrollAreaId: new FormControl(0),
    areaMasterId: new FormControl(0),
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    businessCycleDefinitionId: new FormControl(null),
    periodName: new FormControl('', Validators.required),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    // companyName : new FormControl ('', Validators.required),
    companyName: new FormControl(''),
    serviceName: new FormControl('', Validators.required),
    groupCompanyId: new FormControl(''),
    serviceMasterId: new FormControl(''),
    employeeCode: new FormControl(''),
    areaMasterCode: new FormControl('', Validators.required),

  });
}

//Cycle Defination Service
getAllCycleDefinationEmp() {
  this.lockService.getAllCycleData().subscribe((res) => {
    this.cycleDefinationListEmp = res;
    console.log('cycleDefinationListEmp', this.cycleDefinationListEmp);

    res.data.results[0].forEach((element) => {
      const obj = {
        label: element.name,
        value: element.id,
      };
      this.NameofCycleDefinationEmp.push(obj);
    });
  });
}

//All Cycle Name API
// getAllCycleName(){
//   this.lockService.getAllCycleNamesA().subscribe((res) =>{
//     console.log("res.data.results[0]", res);
//     this.cycleNameList = res.data.results[0];
//     console.log("cycleNameList", this.cycleNameList);
//   });
// }

//  Get defication on change

onChangeDefinationEmp(evt: any) {
  this.empForm.patchValue({
    fromDate: '',
    toDate: '',
  });
  if (evt == '') {
    this.periodNameListEmp = [];
  } else {
    this.periodNameListEmp = [];
    this.lockService.getCycleNameInEmp(evt).subscribe(
      (res) => {
        this.cycleNameListEmp = res.data.results[0];
        console.log('PeriodName In EMP ', this.cycleNameListEmp);
        res.data.results[0].forEach((element) => {
          const obj = {
            label: element.periodName,
            value: element.businessCycleDefinitionId,
          };
          this.periodNameListEmp.push(obj);
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



//Get Cycle Name
onSelectCycleNameEmp(evt: any) {
  if (evt != '') {
    this.cycleNameListEmp.forEach((element) => {
      if (element.periodName == evt) {
        this.empForm.patchValue({
          fromDate: new Date(element.fromDate),
          toDate: new Date(element.toDate),
        });
      }
    });
  } else {
    this.empForm.patchValue({
      fromDate: '',
      toDate: '',
    });
  }
}

//Company Name and GroupCompanyId API
getAllCompanyNameEmp() {
  this.lockService.getAllCompanysName().subscribe((res) => {
    this.companyNameListEmp = res.data.results[0];
    console.log('companyNameListEmp', this.companyNameListEmp);
    res.data.results.forEach((element) => {
      const obj = {
        label: element.companyName,
        value: element.groupCompanyId,
      };
      this.companyNamesEmp.push(obj);
    });
  });
}

//Service Master Name API
getAllServiceNameEmp() {
  this.lockService.getAllServicesName().subscribe((res) => {
    this.serviceNameListEmp = res.data.results[0];
    console.log('serviceNameListEmp', this.serviceNameListEmp);
    res.data.results[0].forEach((element) => {
      const obj = {
        label: element.serviceName,
        value: element.serviceMasterId,
      };
      this.serviceNamesEmp.push(obj);
    });
  });
}


//Get EMP code in Employee Section

// getEmployeeCode() {
//   this.lockService.getEmpCode().subscribe((res) => {
//     this.employeeCodeList = res.data.results[0];
//     console.log('employeeCodeList', this.employeeCodeList);
//     res.data.results[0].forEach((element) => {
//       const obj = {
//         // label: element.serviceName,
//         // value: element.serviceMasterId,
//         name: element.employeeCode,
//         code: element.employeeCode,
//       };
//       this.employeeCodes.push(obj);
//     });
//   });
// }


//On get the emp code on select area
onSelectAreaInEmp(evt: any) {
  // this.empForm.patchValue({
  //   areaMasterCode: '',
  // });

  if (evt == '') {
    this.employeeCodes = [];
  } else {
    this.employeeCodes = [];
    this.lockService.getEmpCode(evt).subscribe((res) => {
        this.employeeCodeList = res.data.results[0];
        console.log('employeeCodeList', this.employeeCodeList);
        res.data.results[0].forEach((element) => {
          const obj = {
              // label: element.payrollAreaCode,
              // value: element.payrollAreaId,
            name: element.employeeCode,
            code: element.employeeMasterId,
          };
          this.employeeCodes.push(obj);
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

//On Seelct service name get The Area  List
// onSelectServiceNameEmp(evt: any) {
//   if (evt == '') {
//     this.ServiceAreaListEmp = [];
//   } else {
//     this.ServiceAreaListEmp = [];
//     this.lockService.getAreawServicesName(evt).subscribe(
//       (res) => {
//         this.areaSeriveListEmp = res.data.results[0];
//         console.log('areaSeriveList', this.areaSeriveListEmp);
//         res.data.results[0].forEach((element) => {
//           const obj = {
//               label: element.payrollArea.payrollAreaCode,
//               value: element.payrollArea.payrollAreaId,
//             // name: element.payrollArea.payrollAreaCode,
//             // code: element.payrollArea.payrollAreaId,
//           };
//           this.ServiceAreaListEmp.push(obj);
//         });
//       },
//       (error: any) => {
//         this.alertService.sweetalertError(
//           error['error']['status']['message']
//         );
//       }
//     );
//   }
// }


onSelectServiceNameEmp(evt: any) {
  if(evt == '1'){
   if (evt == '') {
     this.ServiceAreaListEmp = [];
   } else {
     this.ServiceAreaListEmp = [];
     this.lockService.getAreawServicesName(evt).subscribe(
       (res) => {
         this.areaSeriveListEmp = res.data.results[0];
         console.log('areaSeriveList', this.areaSeriveListEmp);
         res.data.results[0].forEach((element) => {
           const obj = {

            label: element.payrollAreaCode,
            value: element.payrollAreaId,

           };
           this.ServiceAreaListEmp.push(obj);
         });
       },
       (error: any) => {
         this.alertService.sweetalertError(
           error['error']['status']['message']
         );
       }
     );
   }
  }else {
   if (evt == '') {
     this.ServiceAreaListEmp = [];
   } else {
     this.ServiceAreaListEmp = [];
     this.lockService.getAreawServicesName(evt).subscribe(
       (res) => {
         this.areaSeriveList = res.data.results[0];
         console.log('areaSeriveList', this.areaSeriveList);
         res.data.results[0].forEach((element) => {
           const obj = {
             //   label: element.areaMasterCode,
             //   value: element.payrollAreaId,
             label: element.payrollArea.payrollAreaCode,
             value: element.payrollArea.payrollAreaId,
           };
           this.ServiceAreaListEmp.push(obj);
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
 }


// Save EMP Form
saveEmp() {
  this.allAreaCodesEmp = [];
  const selectedPayrollAreaCodes = this.empForm.get('employeeCode').value;
  if (selectedPayrollAreaCodes.length > 0) {
    selectedPayrollAreaCodes.forEach((element) => {
      this.allAreaCodesEmp.push(element.code);
    });
  } else {
    this.alertService.sweetalertWarning('Please select Employee Code');
    return false;
  }

  // const selectedAreaCodes = this.empForm.get('employeeCode').value;
  // if (selectedAreaCodes.length > 0) {
  //   selectedAreaCodes.forEach((element) => {
  //     this.AreaCodes.push(element.value);
  //   });
  // } else {
  //   this.alertService.sweetalertWarning('Please select Employee Code');
  //   return false;
  // }


  const data = [{
    areaMasterId: this.getAreaMasterIDEmp(),
    businessCycleId: this.getBusinessIDEmp(),
    cycle: this.empForm.get('periodName').value,
    serviceName: this.getServiceNameEmp(this.empForm.get('serviceName').value),
    payrollAreaCode:  this.getAreaCodesInEmp(this.empForm.get('areaMasterCode').value),
    employeeMasterIdList:  this.allAreaCodesEmp

  }];


  this.lockService.postEmpForm(data).subscribe((res: any) => {
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
 });
 this.empForm.reset();
 this.empForm.patchValue({
  companyName : '',
  serviceName : '',
  periodName : '',
  name : '',
  employeeCode : '',
  areaMasterCode : '',
})
}


  // Sort and Excel
//Job Master Excel
exportApprovalSummaryAsExcel(): void {
  this.excelData = [];
  this.header = []
  this.header =["companyName", "payrollAreaCode", "serviceName"];
  this.excelData = [];
  if(this.areTableList.length>0){
   // this.employeeList = this.employeeList.filter((emp)=>this.psidList.some((p)=>p.psid=emp.proofSubmissionId));
   //this.employeeList =  this.areTableList;
   this.areTableList.forEach((element) => {
    let obj = {
      companyName: element.companyName,
      payrollAreaCode: element.payrollAreaCode,
      serviceName: element.serviceName,
    };
    this.excelData.push(obj);
  });
    console.log('this.excelData::', this.excelData);
  }
  this.excelservice.exportAsExcelFile(this.excelData, 'Area-to-Lock', 'Area-to-Lock' ,this.header);
  console.log('this.excelData::', this.excelData);
}


exportToExcelAreaLock(): void {
  this.excelDataAreaLock = [];
  this.header = []
  this.header =["companyName", "payrollAreaCode", "serviceName"];
  this.excelDataAreaLock = [];
  if(this.checkedSummaryList.length>0){
   // this.employeeList = this.employeeList.filter((emp)=>this.psidList.some((p)=>p.psid=emp.proofSubmissionId));
   //this.employeeList =  this.areTableList;
   this.checkedSummaryList.forEach((element) => {
    let obj = {
      companyName: element.companyName,
      payrollAreaCode: element.payrollAreaCode,
      serviceName: element.serviceName,
    };
    this.excelDataLock.push(obj);
  });
    console.log('this.excelDataLock::', this.excelDataLock);
  }
  this.excelservice.exportAsExcelFile(this.excelDataLock, 'Area-Lock', 'Area-Lock' ,this.header);
  console.log('this.excelDataLock::', this.excelDataLock);
}


getServiceNameEmp(serviceCode: any) {
  const toSelect = this.serviceNameListEmp.find(
    (element) => element.serviceMasterId == serviceCode
  );
  return toSelect.serviceName;
  console.log('toSelect', toSelect);
}



getAreaCodesInEmp(payrollAreaCode: any) {
  const toSelect = this.areaSeriveListEmp.find(
    (element) => element.payrollArea.payrollAreaId == payrollAreaCode
  );
  return toSelect.payrollArea.payrollAreaCode;
  console.log('toSelect', toSelect);
}



//Get AArea Master ID
getAreaMasterIDEmp() {
  if (this.areaSeriveListEmp.length > 0) {
    return this.areaSeriveListEmp[0].areaMaster.areaMasterId;
  } else {
    return 0;
  }
}


//Get Business Cycle ID
getBusinessIDEmp() {
  if (this.cycleNameListEmp.length > 0) {
    return this.cycleNameListEmp[0].id;
  } else {
    return 0;
  }
}

  //Area Table List
getAreaTableSummaryListEmp(){
  this.lockService.getAllAreaTableList().subscribe((res) => {
    if(res.data.results.length > 0){
      this.areTableListEmp = res.data.results[0];
      console.log("areTableListEmp",this.areTableListEmp)
    }
  });
}

//OnCheck check box in area summary table
onCheckAreaEmp(checkValue, element){
  if(checkValue){
    const data = {
      companyName : element.companyName,
      payrollAreaCode : element.payrollAreaCode,
      serviceName : element.serviceName,
      cycleLockPayrollAreaTempId : element.cycleLockPayrollAreaTempId,
    }
    console.log(element)
  }
}

//Reset the  form
resetAreaFormEmp(){
  this.empForm.reset();
  this.empForm.patchValue({
    companyName : '',
    serviceName : '',
    periodName : '',
    name : '',
  })
  }

//Row select in table
 //Select Row in left table of PHG
 RowSelectedEmp(u: any, ind: number) {
  this.HighlightRow = ind;

  let temp = this.areTableListEmp;
  this.areTableListEmp = new Array();
  let index = this.selectedUserEmp.findIndex(
    (o) => o.cycleLockPayrollAreaTempId == u.cycleLockPayrollAreaTempId
  );
  let isContain = this.selectedUserEmp.some(
    (o) => o.cycleLockPayrollAreaTempId == u.cycleLockPayrollAreaTempId
  );
  if (isContain == true) {
    this.selectedUserEmp.splice(index, 1);
  } else {
    this.selectedUserEmp.push(u);
  }

  this.areTableListEmp = temp;

  this.areTableListEmp.forEach((element, i) => {
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

doubleClickOnLeftTableEmp(evt: any) {}

  //Reset the  form
  resetEmpForm(){
    this.empForm.reset();
    this.empForm.patchValue({
      companyName : '',
      serviceName : '',
      periodName : '',
      name : '',
      employeeCode : '',
    })
    }

}
