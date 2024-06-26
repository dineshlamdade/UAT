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
import { DatePipe } from '@angular/common';
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
  public cycleNameList: any;
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
  public areTableList: Array<any> = [];
  public getEmpTableList: Array<any> = [];
  public getEmpList: Array<any> = [];
  public checkedSummaryList: Array<any> = []
  public getEmpCheckedList: Array<any> = []
  public checkedFinalLockList: Array<any> = [];
  public checkedFinalPendingList: Array<any> = [];
  public AreaCodes: Array<any> = [];
  public employeeList: Array<any> = [];
  public selectedAreaIds = [];
  public selectedAreaIdsEmp = [];
  public checkedSummaryListEmp: Array<any> = [];
  public selectedUserInLockEmp: Array<any> = [];
  public checkedFinalLockListEmp: Array<any> = [];

  disabled: boolean = true;
  customers: Customer[];
  users1: User1[];
  emplists: emplist[];
  arealists: arealist[];
  public HighlightRight: any;
  public selectedUser: Array<any> = [];
  public selectedUserInLock: Array<any> = [];
  public cycleNamePending: any;
  HighlightRow: number;
  //
  public selectedArea = null;
  public allAreaCodesEmp: Array<any> = [];
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


  areTableListEmp: Array<any> = [];
  selectedUserEmp: Array<any> = [];
  excelDataLock: Array<any> = [];

  selectedUserPending: Array<any> = [];
  pendingAreTableList: Array<any> = [];
  checkedSummaryListPending: Array<any> = [];
  getSetEmployeeList: Array<any> = [];
  getSetAreaList: Array<any> = [];
  areaSetList: Array<any> = [];
  empSetList: Array<any> = [];




  excelData: any[];
  excelDataEmp: any[];
  excelDataEmpLock: any[];
  header: any[];
  excelDataAreaLock: any[];
  pendingAreaList: any;
  public pendingForm: any = FormGroup;
  public lockEmpForm: any = FormGroup;
  public lockForm: any = FormGroup;
  isChecked: boolean = false
  CompanyGroupId: any;
  businessCycleId: any;
  businessCycleDefinationId: any;
  checkedAll: boolean = false;
  checkedLockAll: boolean = false;
  payrollareaSetlist: any = [];
  areas: any[] = [];
  displayedColumns: string[];
  areasdata: any = [];
  areadataSource: any;
  companyDisableFlag: boolean = true;
  pendingCycleLList: any;
  pendingCycleList: any;
  pendingCycleListById: any;
  cycleDefinationFlag: boolean = false;
  allPayrollAreaList: any;
  checkedallflag: boolean = false;
  payrollAreaListFlag: boolean = false;
  empListFlag: boolean = false;
  employees: any = [];
  selectedEmpPA: any;
  empallChecked: boolean = false;
  checkedEmpLockAll: boolean = false;
  employeeListFlag: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertServiceService,
    private modalService: BsModalService,
    private lockService: LockService,
    private excelservice: ExcelserviceService,
    private datePipe: DatePipe,
  ) {
    this.reactiveAreaForm();
    this.reactiveEmpForm();
    this.pendingReactiveForm();
    this.empLockReactiveForm();
    this.lockReactiveForm();
  }

  ngOnInit(): void {
    // this.getAreaTableSummaryList();
    this.getAllCycleDefination();
    this.getAllCompanyName();
    // this.getAllCycleName();
    this.getAllServiceName();

    this.getAreaTableSummaryListEmp();
    this.getAllCycleDefinationEmp();
    this.getAllCompanyNameEmp();
    // this.getAllCycleName();
    this.getAllServiceNameEmp();
    this.pendingForLockAsWhen();
    this.getAreaSetData();
    this.getEmpSet();
    this.areaForm.controls['companyName'].disable();
    this.areaForm.controls['areaMasterCode'].disable();
    this.areaForm.controls['areaSet'].disable();
    this.areaForm.controls['areaList'].disable();
  }

  smallpopup(templateEmp: TemplateRef<any>) {
    // this.modalRef = this.modalService.show(
    //   template,
    //   Object.assign({}, { class: 'gray modal-xl' })
    // );

    if (this.checkedSummaryListEmp.length > 0) {
      this.modalRef = this.modalService.show(
        templateEmp,
        Object.assign({}, { class: 'gray modal-xl' })
      );
    }
  }

  getAreaSetData() {
    this.lockService.getAreaSetData().subscribe((res) => {
      this.getSetAreaList = res.data.results;
     // console.log("getSetAreaList", this.getSetAreaList);
      res.data.results[0].forEach((element) => {
        const obj = {
          name: element.areaSetName,
          code: element.areaSetMasterId,
        };
        this.areaSetList.push(obj);
      });
    })
  }

  getEmpSet() {
    this.lockService.getEmpSet().subscribe((res) => {
      this.getSetEmployeeList = res.data.results;
      // console.log("getSetEmployeeList", this.getSetEmployeeList);
      res.data.results[0].forEach((element) => {
        const obj = {
          name: element.employeeSetName,
          code: element.employeeSetMasterId,
        };
        this.empSetList.push(obj);
      });
    })
  }

  lockTemp(template2: TemplateRef<any>) {
    // this.checkedSummaryList = [];
    // this.checkedFinalLockList = [];
    // this.modalRef.hide()
    //  alert("lockTemp: "+ JSON.stringify(this.checkedSummaryList))
    this.selectedUserInLock = []
    if (this.checkedSummaryList.length > 0) {
      this.modalRef = this.modalService.show(
        template2,
        Object.assign({}, { class: 'gray modal-lg' })
      );
    }

    this.checkedSummaryList.forEach((element) => {
      this.selectedUserInLock.push(element)
      element.checked = true
      const data1 = {
        cycleLockPayrollAreaId: element.cycleLockPayrollAreaId,
        // areaMasterId: element.areaMasterId,
        areaMasterId: 1,
        businessCycleId: element.businessCycleId,
        cycle: element.cycle,
        serviceName: element.serviceName,
        payrollAreaCode: element.payrollAreaCode,
        isActive: 1,
      }

      // console.log("data1" + data1);

      this.checkedFinalLockList.push(data1)
      this.checkedLockAll = true;
    });

  }

  Areapendingforlockpopup(Areapendingforlock: TemplateRef<any>) {
    this.selectedUserPending = [];
    this.checkedFinalPendingList = [];
    // alert(this.cycleDefinationFlag)
    if (this.cycleDefinationFlag == true) {
      this.getAllPendingCycleLockByBusineesCycDefId()
    } else {
      this.getAllPendingCycleLock();
    }
    // this.getAllPendingCycleLock();
    this.modalRef = this.modalService.show(
      Areapendingforlock,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  Emplistpop(emplist: TemplateRef<any>) {
    if(this.employeeListFlag){
      this.modalRef = this.modalService.show(
        emplist,
        Object.assign({}, { class: 'gray modal-xl' })
      );
    }    
  }

  Arealistpop(arealist: TemplateRef<any>) {
    if (this.payrollAreaListFlag) {
      this.modalRef = this.modalService.show(
        arealist,
        Object.assign({}, { class: 'gray modal-lg' })
      );
    }

  }


  //area list radio button//
  areaListPasteData(event: ClipboardEvent) {
    let clipboardData = event.clipboardData;
    let pastedText = clipboardData.getData('text');
    let row_data = pastedText.split('\n');

    this.displayedColumns = ["payrollAreaCode"]
    this.areas = [];
    for (let i = 0; i < row_data.length; i++) {
      let data = row_data[i].replace('\r', '');

      console.log("paste data: " + data)
      // if (data != '') {
      //   const area = this.ServiceAreaList.find(a => a.label == data)
      //   let obj = area?.value;

      this.areas.push(data)
      // }
    }

    let lastIndex = this.areas.length - 1

    this.areas.splice(lastIndex, 1)
    this.areaForm.get('areaMasterCode').setValue(this.areas);

    // console.log("paste araea is: " + JSON.stringify(this.areas));

    // Create table dataSource
    // row_data.forEach(row_data => {
    //   let row = {};
    //   this.displayedColumns.forEach((a, index) => {
    //     row[a] = row_data.split('\t')[index]
    //   });
    // console.log(row)
    //   this.areasdata.push(row);
    // })
    // this.areadataSource = this.areasdata;
    // this.areadataSource.splice(this.areadataSource.length - 1, 1)

    console.log("Before: " + JSON.stringify(this.areadataSource));

    // this.employeeCodeList.forEach(element => {
    //   this.areadataSource.forEach(emp => {
    //     let empcode = emp.employeeCode.split('\r')
    //     if (element.employeeCode + ',' == empcode) {
    //       emp.employeeMasterId = element.employeeMasterId
    //       emp.fullName = element.fullName
    //     }
    //   });
    // });
    console.log("After: " + JSON.stringify(this.areadataSource));
  }

  //area list radio button//
  empListPasteData(event: ClipboardEvent) {
    let clipboardData = event.clipboardData;
    let pastedText = clipboardData.getData('text');
    let row_data = pastedText.split('\n');

    this.displayedColumns = ["employeeCode"]
    this.employees = [];
    for (let i = 0; i < row_data.length; i++) {
      let data = row_data[i].replace('\r', '');

      console.log("paste data: " + data)
      // if (data != '') {
      //   const area = this.ServiceAreaList.find(a => a.label == data)
      //   let obj = area?.value;

      this.employees.push(data)
      // }
    }

    let lastIndex = this.employees.length - 1

    this.employees.splice(lastIndex, 1)
    this.empForm.get('employeeCode').setValue(this.employees);

    // console.log("paste employees is: " + JSON.stringify(this.employees));

    // Create table dataSource
    // row_data.forEach(row_data => {
    //   let row = {};
    //   this.displayedColumns.forEach((a, index) => {
    //     row[a] = row_data.split('\t')[index]
    //   });
    // console.log(row)
    //   this.areasdata.push(row);
    // })
    // this.areadataSource = this.areasdata;
    // this.areadataSource.splice(this.areadataSource.length - 1, 1)

    console.log("Before: " + JSON.stringify(this.areadataSource));

    // this.employeeCodeList.forEach(element => {
    //   this.areadataSource.forEach(emp => {
    //     let empcode = emp.employeeCode.split('\r')
    //     if (element.employeeCode + ',' == empcode) {
    //       emp.employeeMasterId = element.employeeMasterId
    //       emp.fullName = element.fullName
    //     }
    //   });
    // });
    console.log("After: " + JSON.stringify(this.areadataSource));
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
      serviceName: new FormControl(''),
      groupCompanyId: new FormControl(''),
      serviceMasterId: new FormControl(''),
      // areaMasterCode: new FormControl('', Validators.required),
      areaMasterCode: new FormControl({ value: "", disabled: false },),
      areaSet: new FormControl({ value: "", disabled: false },),
      areaList: new FormControl({ value: "", disabled: false },),
    });
    // console.log(this.areaForm)
  }

  selectAllAreaLock(event, data, index) {
    this.selectedUserInLock = []
    if (event.checked) {
      this.checkedSummaryList.forEach((element) => {
        this.selectedUserInLock.push(element)

        const data1 = {
          cycleLockPayrollAreaId: element.cycleLockPayrollAreaId,
          // areaMasterId: element.areaMasterId,
          areaMasterId: 1,
          businessCycleId: element.businessCycleId,
          cycle: element.cycle,
          serviceName: element.serviceName,
          payrollAreaCode: element.payrollAreaCode,
          isActive: 1,
        }

        // console.log("data1" + data1);

        this.checkedFinalLockList.push(data1)
        this.checkedLockAll = true;
      });

    } else {
      this.checkedLockAll = false;
      this.checkedFinalLockList = []
      // this.checkedSummaryList.forEach((element) => {
      //   const index = this.checkedSummaryList.indexOf(
      //     (p) => (p.payrollAreaCode == element.payrollAreaCode));
      //   this.checkedSummaryList[index].checkedLockAll = false;
      // });
    }
  }


  selectAll(event) {
    //   console.log(event)
    this.selectedUser = [];
    this.checkedSummaryList = [];
    this.checkedAll = false
    if (event.checked) {
      this.checkedAll = true;
      this.areTableList.forEach((element) => {
        element.checkedLockAll = false
        element.checked = true
        this.selectedUser.push(element.payrollAreaCode);
        this.checkedSummaryList.push(element);
      });

      // console.log(JSON.stringify(this.checkedSummaryList))
    } else {
      this.checkedAll = false;
      this.areTableList.forEach((element) => {
        element.checkedLockAll = false
        element.checked = false
        this.checkedSummaryList = []
        this.selectedUser = []

        // const index = this.checkedSummaryList.indexOf(
        //   (p) => (p.payrollAreaCode == element.payrollAreaCode));
        // this.checkedSummaryList.splice(index, 1);
        // // this.areTableList[index].checkedAll = false;

        // const index1 = this.areTableList.indexOf(
        //   (p) => (p.payrollAreaCode == element)
        // );
        // this.selectedUser.splice(index1, 1);
      });
    }
  }





  onSelectArea(evt) {
    // console.log(evt);
    if (evt.value.length >= 1) {
      this.areaForm.get('areaList').disable();
      this.areaForm.get('areaSet').disable();
    }
    else {
      this.areaForm.get('areaList').enable();
      this.areaForm.get('areaSet').enable();
    }
    console.log("ServiceAreaList", this.ServiceAreaList.length);
    // console.log(this.areaForm.get('areaMasterCode').value)

  }


  onSelectAreaSet(evt) {
    console.log(evt);
    this.payrollareaSetlist = []
    if (evt != '') {
      this.areaForm.get('areaList').disable();
      this.areaForm.get('areaMasterCode').disable();
    }
    else {
      this.areaForm.get('areaList').enable();
      this.areaForm.get('areaMasterCode').enable();
    }

    console.log(this.areaForm.get('areaSet').value)
    // evt.value.forEach(element => {
    this.payrollareaSetlist.push(parseInt(evt))
    // });

    // console.log(this.payrollareaSetlist)

  }

  onSelectAreaList(evt) {
    if (evt.checked) {
      this.payrollAreaListFlag = true;
      this.areaForm.get('areaMasterCode').disable();
      this.areaForm.get('areaSet').disable();
    }
    else {
      this.payrollAreaListFlag = false;
      this.areaForm.get('areaMasterCode').enable();
      this.areaForm.get('areaSet').enable();
    }
  }


  pendingReactiveForm() {
    this.pendingForm = this.formBuilder.group({
      pendingCycleName: new FormControl(''),
      fromDate: new FormControl(''),
      toDate: new FormControl(''),
    })
  }

  empLockReactiveForm() {
    this.lockEmpForm = this.formBuilder.group({
      empCycleName: new FormControl(''),
      fromDate: new FormControl(''),
      toDate: new FormControl(''),
    })
  }


  lockReactiveForm() {
    this.lockForm = this.formBuilder.group({
      lockCycleName: new FormControl(''),
      fromDate: new FormControl(''),
      toDate: new FormControl(''),
    })
  }

  //Cycle Defination Service
  getAllCycleDefination() {
    this.lockService.getAllCycleData().subscribe((res) => {
      this.cycleDefinationList = res;
      // console.log('cycleDefinationList', this.cycleDefinationList);

      res.data.results[0].forEach((element) => {
        const obj = {
          label: element.name,
          value: element.id,
        };
        this.NameofCycleDefination.push(obj);
      });
    });

    if (this.NameofCycleDefination.length == 1) {
      this.areaForm.controls['name'].setValue(this.NameofCycleDefination[0].value)
      this.onChangeDefination(this.NameofCycleDefination[0].value)
    }
  }

  //  Get defication on change
  onChangeDefination(evt: any) {
    if (evt != '') {
      this.businessCycleDefinationId = evt
      this.cycleDefinationFlag = true
    } else {
      this.cycleDefinationFlag = false
    }
    this.cycleNameList = []
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
          res.data.results[0].forEach((element) => {
            this.periodNameList.push(element);
          });

          // this.periodNameList = [
          //   {
          //     'periodName' : 'periodName'
          //   }
          // ]

          if (this.periodNameList.length == 1) {
            this.areaForm.controls['periodName'].setValue(this.periodNameList[0].periodName)
            this.onSelectCycleName(this.periodNameList[0].periodName)
          }
        },
        (error: any) => {
          this.alertService.sweetalertError(
            error['error']['status']['message']
          );
        }
      );
    }
  }


  //  Get defication employee on change
  onChangeDefinationEmp(evt: any) {
    this.empForm.controls['periodName'].setValue('')
    this.businessCycleDefinationId = evt
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
          res.data.results[0].forEach((element) => {
            const obj = {
              label: element.periodName,
              value: element.businessCycleDefinitionId,
            };
            this.periodNameListEmp.push(obj);
          });

          if (this.periodNameListEmp.length == 1) {
            this.empForm.controls['periodName'].setValue(this.periodNameListEmp[0].label)
            this.onSelectCycleNameEmp(this.periodNameListEmp[0].label)
          }
        },
        (error: any) => {
          this.alertService.sweetalertError(
            error['error']['status']['message']
          );
        }
      );
    }
  }


  getAllareaByBusDefId() {
    this.ServiceAreaList = []
    this.ServiceAreaListEmp = []
    this.lockService.getAllareaByBusDefId(this.businessCycleDefinationId, this.businessCycleId).subscribe(res => {
      // this.ServiceAreaList = res.data.results;

      res.data.results[0].forEach((element) => {
        const obj = {

          name: element.payrollAreaCode,
          code: element.payrollAreaId,

        };
        this.ServiceAreaList.push(obj);
        this.ServiceAreaListEmp.push(obj)
      });


    })
  }

  //Get Cycle Name
  onSelectCycleName(evt: any) {
    if (evt != '') {
      this.areaForm.controls['companyName'].enable();
      this.areaForm.controls['areaMasterCode'].enable();
      this.areaForm.controls['areaSet'].enable();
      this.areaForm.controls['areaList'].enable();
      this.periodNameList.forEach(ele => {
        if (ele.periodName === evt) {
          this.businessCycleId = ele.id;
          this.businessCycleDefinationId = ele.businessCycleDefinitionId
          this.getAllPendingCycleLockByBusineesCycDefId();
          this.getAllareaByBusDefId();

        }
      })
      this.lockService.pendingLockEmptyArea(evt).subscribe((res) => {
        this.pendingAreTableList = res.data.results[0];
      });
      this.cycleNameList.forEach((element) => {
        if (element.periodName === evt) {
          this.areaForm.patchValue({
            fromDate: new Date(element.fromDate),
            toDate: new Date(element.toDate),
            cycleNamePending: element.periodName,
          });
          this.pendingForm.patchValue({
            pendingCycleName: evt,
            fromDate: new Date(element.fromDate),
            toDate: new Date(element.toDate),
          });
          this.lockForm.patchValue({
            lockCycleName: evt,
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
      this.pendingForm.patchValue({
        pendingCycleName: '',
        fromDate: '',
        toDate: '',
      });
      this.lockForm.patchValue({
        lockCycleName: '',
        fromDate: '',
        toDate: '',
      });

    }
  }


  //Get Cycle Name Employee
  onSelectCycleNameEmp(evt: any) {
    if (evt != '') {
      this.cycleNameListEmp.forEach((element) => {
        // console.log(JSON.stringify(element))
        if (element.periodName == evt) {
          this.businessCycleId = element.id
          this.getAllareaByBusDefId();
          this.empForm.patchValue({
            fromDate: new Date(element.fromDate),
            toDate: new Date(element.toDate),
          });
          this.lockEmpForm.patchValue({
            empCycleName: evt,
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
      this.lockEmpForm.patchValue({
        fromDate: '',
        toDate: '',
      });
    }

    this.empForm.controls['employeeCode'].disable()
    this.empForm.controls['employeeSet'].disable()
    this.empListFlag = false
  }

  //Company Name and GroupCompanyId API
  getAllCompanyName() {
    this.lockService.getAllCompanysName().subscribe((res) => {
      this.companyNameList = res.data.results;
      // console.log('companyNameList', this.companyNameList);
      res.data.results.forEach((element) => {
        const obj = {
          label: element.companyName,
          value: element.groupCompanyId,
        };
        this.companyNames.push(obj);
      });
    });
  }

  getAllPendingCycleLock() {
    this.lockService.GETAllPendingCycles().subscribe((res) => {
      this.pendingCycleList = res.data.results[0];
      this.pendingCycleList.forEach(element => {
        element.checked = false;
      });
    });
  }

  getAllPendingCycleLockByBusineesCycDefId() {
    this.lockService.GETAllLockStatusDataByCycleDefId(this.businessCycleDefinationId).subscribe((res) => {
      this.pendingCycleListById = res.data.results[0];
      this.pendingCycleList = this.pendingCycleListById
    });
  }


  getCompanyGroupId(value) {
    this.CompanyGroupId = value
    // alert(value);
  }

  //Service Master Name API
  getAllServiceName() {
    this.lockService.getAllServicesName().subscribe((res) => {
      this.serviceNameList = res.data.results[0];
      // console.log('serviceNameList', this.serviceNameList);
      res.data.results[0].forEach((element) => {
        const obj = {
          label: element.serviceName,
          value: element.serviceMasterId,
        };
        this.serviceNames.push(obj);
      });
    });
  }


  onSelectServiceName(evt: any) {

    // console.log(evt)
    this.CompanyGroupId = evt
    this.ServiceAreaList = []
    this.ServiceAreaListEmp = []
    console.log('intital', this.ServiceAreaList)
    // if (evt == '1') {
    // if (evt == '') {
    //   this.ServiceAreaList = [];
    // } 
    // else {
    //   this.ServiceAreaList = [];

    this.lockService.getAreawServicesName(this.CompanyGroupId, this.businessCycleId, this.businessCycleDefinationId).subscribe(
      (res) => {
        this.areaSeriveList = res.data.results[0];
        console.log('areaSeriveList', this.areaSeriveList);
        res.data.results[0].forEach((element) => {
          const obj = {

            name: element.payrollAreaCode,
            code: element.payrollAreaId,

          };
          this.ServiceAreaList.push(obj);
          this.ServiceAreaListEmp.push(obj)
        });
      },
      (error: any) => {
        this.alertService.sweetalertError(
          error['error']['status']['message']
        );
      }
    );
    //}
    // }
    //  else {
    // if (evt == '') {
    //   this.ServiceAreaList = [];
    // } 
    // else {
    //   this.ServiceAreaList = [];
    this.lockService.getAreawServicesName(evt, this.businessCycleId, this.businessCycleDefinationId).subscribe(
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
    //}
    // }
  }


  // Save Area Form On Go
  saveArea() {
    this.allAreaCodes = [];
    const selectedPayrollAreaCodes = this.areaForm.get('areaMasterCode').value;
    console.log("selected payrollare: " + selectedPayrollAreaCodes)
    if (this.areas.length == 0) {
      if (selectedPayrollAreaCodes.length > 0) {
        selectedPayrollAreaCodes.forEach((element) => {
          this.allAreaCodes.push(element.name);
        });
      } else {
        // this.alertService.sweetalertWarning('Please select Group code');
        // return false;
      }
    } else {
      this.allAreaCodes = selectedPayrollAreaCodes
    }


    if (this.areaForm.get('areaMasterCode').value != '') {
      const data = {
        areaMasterId: this.getAreaMasterID(),
        businessCycleId: this.getBusinessID(),
        cycle: this.areaForm.get('periodName').value,
        // serviceName: '',
        companyName: this.getCompanyName(this.areaForm.get('companyName').value),
        payrollAreaCodeList: this.allAreaCodes,
        payrollAreaListFlag: this.payrollAreaListFlag
        // isChecked: false
      };

      this.lockService.postAreaForm(data).subscribe((res: any) => {
        if (res) {
          if (res.data.results.length >= 1) {
            this.areTableList = res.data.results,
              this.checkedAll = true
            this.isChecked = true;
            this.areTableList.forEach((element) => {
              element.checkedLockAll = false
              element.checked = true
              this.selectedUser.push(element.payrollAreaCode);
              this.checkedSummaryList.push(element);
            });
            this.alertService.sweetalertMasterSuccess(res.status.message, '');
          } else {
            this.alertService.sweetalertWarning(res.status.messsage);
          }
        } else {
          this.alertService.sweetalertError(
            'Something went wrong. Please try again.'
          );
        }
      });
    } else if (this.areaForm.get('areaSet').value != '') {
      const data = {
        areaMasterId: this.getAreaMasterID(),
        companyName: this.getCompanyName(this.areaForm.get('companyName').value),
        cycleLockPayrollAreaId: 0,
        businessCycleId: this.getBusinessID(),
        payrollareaSetlist: this.payrollareaSetlist
      };

      this.lockService.postAreaForm1(data).subscribe((res: any) => {
        if (res) {
          if (res.data.results.length >= 1) {
            this.areTableList = res.data.results,
              this.isChecked = false;
            this.alertService.sweetalertMasterSuccess(res.status.message, '');
          } else {
            this.alertService.sweetalertWarning(res.status.messsage);
          }
        } else {
          this.alertService.sweetalertError(
            'Something went wrong. Please try again.'
          );
        }
      });
    } else {

      const data = {
        areaMasterId: this.getAreaMasterID(),
        businessCycleId: this.getBusinessID(),
        cycle: this.areaForm.get('periodName').value,
        // serviceName: '',
        companyName: this.getCompanyName(this.areaForm.get('companyName').value),
        payrollAreaCodeList: this.areas,
        // isChecked: false
      };

      this.lockService.postAreaForm(data).subscribe((res: any) => {
        if (res) {
          if (res.data.results.length >= 1) {
            this.areTableList = res.data.results,
              this.isChecked = false;
            this.alertService.sweetalertMasterSuccess(res.status.message, '');
          } else {
            this.alertService.sweetalertWarning(res.status.messsage);
          }
        } else {
          this.alertService.sweetalertError(
            'Something went wrong. Please try again.'
          );
        }
      });


    }

  }

  getServiceName(serviceCode: any) {
    const toSelect = this.serviceNameList.find(
      (element) => element.serviceMasterId == serviceCode
    );
    return toSelect.serviceName;
  }


  getCompanyName(companycode: any) {
    const toSelect = this.companyNameList.find(
      (element) => element.groupCompanyId == companycode
    );
    // console.log("toSelect: " + toSelect)
    if (toSelect != undefined) {
      return toSelect.companyName;
    }
    return null;
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
    // if (this.cycleNameList.length > 0) {
    //   return this.cycleNameList[0].id;
    // } else {
    //   return 0;
    // }

    return this.businessCycleId;
  }


  //OnCheck check box in area summary table
  onCheckArea(event, element, rowIndex) {

    if (event.checked) {
      // this.isChecked = true;
      // this.selectedUser.push(element.payrollAreaCode);

      this.selectedAreaIds.push(element.payrollAreaCode);
      this.selectedUserInLock.push(element.payrollAreaCode);
      element.checked = true
      this.areTableList[rowIndex].checked = true
      const data = {
        companyName: element.companyName,
        payrollAreaCode: element.payrollAreaCode,
        serviceName: element.serviceName,
        cycleLockPayrollAreaTempId: element.cycleLockPayrollAreaTempId,
        cycle: element.cycle,
        fromDate: new Date(element.fromDate),
        toDate: new Date(element.toDate),
        canPost: true,
      };
      this.checkedSummaryList.push(data);
    }
    else {
      this.checkedAll = false
      element.checked = false
      this.areTableList[rowIndex].checked = false
      this.checkedSummaryList.forEach((ele,index) =>{
        if(ele.payrollAreaCode == element.payrollAreaCode){
          let ind = index
          this.checkedSummaryList.splice(ind, 1);
          this.selectedUserInLock.splice(ind, 1);
        }
      })
      // const index = this.checkedSummaryList.indexOf((item) => (item.payrollAreaCode == element.payrollAreaCode));
      // this.checkedSummaryList.splice(index, 1);
      // this.selectedUserInLock.splice(index, 1);
      const index1 = this.checkedFinalLockList.indexOf((p) => (p.payrollAreaCode == element.payrollAreaCode));
      this.checkedFinalLockList.splice(index1, 1);

      const index11 = this.areTableList.indexOf((p) => (p.payrollAreaCode == element.payrollAreaCode));
      this.selectedUser.splice(index11, 1);

    }
  }



  //Reset the  form
  resetAreaForm() {
    this.areaForm.controls['companyName'].disable();
    this.areaForm.controls['areaMasterCode'].disable();
    this.areaForm.controls['areaSet'].disable();
    this.areaForm.controls['areaList'].disable();
    this.pendingAreTableList = [];
    this.areaSetList = []
    this.ServiceAreaList = []
    this.areas = []
    this.areaForm.get('areaMasterCode').setValue([])
    this.areaForm.reset();
    this.pendingForm.reset();
    this.areaForm.controls['areaMasterCode'].setValue([]);
    this.areaForm.controls['areaSet'].setValue([]);
    this.checkedAll = false;
    this.checkedLockAll = false;
    this.lockForm.patchValue({
      lockCycleName: '',
      fromDate: '',
      toDate: '',
    });

    this.areTableList = []
    this.ServiceAreaList = []
    this.lockService.getAreaSetData().subscribe((res) => {
      this.getSetAreaList = res.data.results;
      console.log("getSetAreaList", this.getSetAreaList);
      res.data.results[0].forEach((element) => {
        const obj = {
          name: element.areaSetName,
          code: element.areaSetMasterId,
        };
        this.areaSetList.push(obj);
      });
    })

    this.areaForm.get('areaList').enable();
    this.areaForm.get('areaSet').enable();
    this.areaForm.get('areaMasterCode').enable();
  }



  //Row select in table
  //Select Row in left table of PHG
  RowSelected(u: any, ind: number) {
    this.HighlightRow = ind;
    // console.log("ind", ind);
    // console.log("u", u);
    let temp = this.areTableList;
    this.areTableList = new Array();
    let index = this.selectedUser.findIndex(
      (o) => o.payrollAreaCode == u.payrollAreaCode
    );
    // console.log("selectedUser", this.selectedUser);

    let isContain = this.selectedUser.some(
      (o) => o.payrollAreaCode == u.payrollAreaCode
    );
    // console.log("selectedUser isContain", isContain);

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

  doubleClickOnLeftTable(evt: any) { }


  //Row select in table
  //Select Row in left table of PHG
  RowSelectedInLock(u: any, ind: number) {
    this.HighlightRow = ind;
    // console.log("HighlightRow", this.HighlightRow)
    let temp = this.checkedSummaryList;
    this.checkedSummaryList = new Array();
    let index = this.selectedUserInLock.findIndex(
      (o) => o.payrollAreaCode == u.payrollAreaCode
    );
    let isContain = this.selectedUserInLock.some(
      (o) => o.payrollAreaCode == u.payrollAreaCode
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

  //click on Check All In Pending for lock add and remove element from array
  allCheckUncheck(checkValue) {
    this.selectedUserPending = []
    if (checkValue.checked) {
      this.checkedallflag = true;
      this.pendingCycleList.forEach((element) => {
        this.selectedUserPending.push(element.processingCycleId);
        this.checkedFinalPendingList.push(element.processingCycleId);
      });
      // console.log(this.selectedUserPending)
    } else {
      this.checkedallflag = false;
      this.pendingAreTableList.forEach((element) => {
        const index = this.checkedFinalPendingList.indexOf(
          (p) => (p.processingCycleId == element.processingCycleId));
        this.checkedFinalPendingList.splice(index, 1);

        const index1 = this.pendingAreTableList.indexOf(
          (p) => (p.processingCycleId == element)
        );
        this.selectedUserPending.splice(index1, 1);
      });
    }
  }

  allCheckInCycleLockTable(checkValue) {
    // alert(checkValue)
    this.selectedUser = [];
    this.checkedSummaryList = [];
    if (checkValue) {
      this.areTableList.forEach((element) => {
        this.selectedUser.push(element.payrollAreaCode);
        this.checkedSummaryList.push(element);
      });

      // console.log(JSON.stringify(this.checkedSummaryList))
    } else {
      this.areTableList.forEach((element) => {
        const index = this.checkedSummaryList.indexOf(
          (p) => (p.payrollAreaCode == element.payrollAreaCode));
        this.checkedSummaryList.splice(index, 1);

        const index1 = this.areTableList.indexOf(
          (p) => (p.payrollAreaCode == element)
        );
        this.selectedUser.splice(index1, 1);
      });
    }
  }


  // //click on Check All In Pending for lock add and remove element from array
  allCheckInCycleLockTableEmp(event, element) {
    this.checkedSummaryListEmp = []
    if (event.checked) {
      this.empallChecked = true;
      this.getEmpTableList.forEach((element) => {
        element.isChecked = true
        this.selectedUserEmp.push(element.employeeMasterId);
        const data = {
          // serviceName: element.serviceName,
          cycleLockEmployeeId: element.cycleLockEmployeeId,
          employeeMasterId: element.employeeMasterId,
          payrollAreaCode: element.payrollAreaCode,
          businessCycleId: element.businessCycleId,
          cycle: element.cycle,
          areaMasterId: element.areaMasterId,
          employeeCode: element.employeeCode,
          fullName: element.fullName,
          companyName: element.companyName,
          canPost: true,
        };
        this.checkedSummaryListEmp.push(data);
      });
    } else {
      this.empallChecked = false;
      this.getEmpTableList.forEach((element) => {
        element.isChecked = false
        this.checkedSummaryListEmp = []
        this.selectedUser = []
      });
    }
  }


  //OnCheck check box in area summary table On Check Area after click on  Lock button
  onCheckAreaInLock(checkValue, element, rowIndex) {
    // this.RowSelectedInLockEmp(element,rowIndex);
    console.log("rowIndex", rowIndex);
    console.log("checkValue Number", checkValue);
    if (checkValue.checked) {
      this.selectedUserInLock.push(element);
      const data = {
        cycleLockPayrollAreaId: 0,
        areaMasterId: 1,
        businessCycleId: this.getBusinessID(),
        cycle: this.areaForm.get('periodName').value,
        // serviceName: element.serviceName,
        payrollAreaCode: element.payrollAreaCode,
        isActive: 1,
      }
      this.checkedFinalLockList.push(data);
      this.checkedSummaryList[rowIndex].checked = true
      // console.log("checkedFinalLockList", this.checkedFinalLockList)
    } else {
      // element.canPost = false;
      this.checkedSummaryList[rowIndex].checked = false
      const index = this.checkedFinalLockList.indexOf((p) => (p.payrollAreaCode == element.payrollAreaCode));
      this.checkedFinalLockList.splice(rowIndex, 1);


      const index1 = this.checkedSummaryList.indexOf((p) => (p.payrollAreaCode == element.payrollAreaCode));
      this.selectedUserInLock.splice(index1, 1);
    }
  }

  // payrollAreaListAlert() {
  //   this.alertService.sweetalertMasterSuccess('Payroll Area List Added Successfully', '');
  // }




  //Checked Pending for lock popup
  onCheckedPendigLock(checkValue, element, index) {
    if (checkValue.checked) {
      this.selectedUserPending.push(element.processingCycleId);
      this.checkedFinalPendingList.push(element.processingCycleId);
      this.pendingCycleList[index].checked = true
    } else {
      this.pendingCycleList[index].checked = false
      const index1 = this.checkedFinalPendingList.indexOf((p) => (p.processingCycleId == element.processingCycleId));
      this.checkedFinalPendingList.splice(index1, 1);
      const index2 = this.pendingAreTableList.indexOf((a) => (a.processingCycleId == element));
      this.selectedUserPending.splice(index2, 1);

    }

  }

  //Reset Lock
  resetLock() {
    // this.lockForm.patchValue({
    //   lockCycleName: '',
    //   fromDate: '',
    //   toDate: '',
    // })
    // this.checkedSummaryList = [];
    // this.checkedFinalLockList = [];
    // this.checkedAll = false;
    this.checkedLockAll = false;
    this.checkedFinalLockList = []
    this.checkedSummaryList.forEach(ele => {
      ele.checked = false
    })

    // this.modalRef.hide()

  }

  saveLockProceed() {
    if (this.checkedFinalLockList.length == 0) {
      return;
    }
    // const data = { cycleLockPayrollAreaTempIds : this.checkedFinalLockList }
    const data = this.checkedFinalLockList;
    this.checkedAll = false
    this.lockService.postAreaInLock(data).subscribe((res) => {
      this.alertService.sweetalertMasterSuccess(res.status.message, '');
      this.checkedFinalLockList = [];
    },
      (error: any) => {
        this.alertService.sweetalertError(error["error"]["status"]["message"]);
      });

    this.modalRef.hide();
    this.selectedUser = [];
    this.checkedSummaryList = [];
    this.areTableList = [];
    // this.getAreaTableSummaryList();
    this.areaForm.reset();
    this.areaForm.patchValue({
      companyName: '',
      serviceName: '',
      periodName: '',
      name: '',
    });
    this.pendingForm.patchValue({
      pendingCycleName: '',
      fromDate: '',
      toDate: '',
    });
    this.lockForm.patchValue({
      lockCycleName: '',
      fromDate: '',
      toDate: '',
    });
  }




  //Save Pending For lock
  pendingLockProceed() {
    const data = { businessCycleIds: this.checkedFinalPendingList }
    this.lockService.postPendingAreaLock(data).subscribe((res) => {
      if (res) {
        if (res.data.results) {
          this.alertService.sweetalertMasterSuccess(res.status.message, '');
          this.checkedFinalPendingList.forEach(element => {
            const index = this.pendingAreTableList.indexOf(
              (p) => (p.processingCycleId == element)
            );
            this.pendingAreTableList.splice(index, 1);
            // this.selectedUserPending.splice(index, 1);
          });
          this.checkedFinalPendingList = [];
          this.selectedUserPending = [];
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      } else {
        this.alertService.sweetalertError(
          'Something went wrong. Please try again.'
        );
      }
      this.modalRef.hide();
      this.checkedFinalPendingList = [];
      this.selectedUserPending = [];
      this.areaForm.reset();
      this.areaForm.patchValue({
        companyName: '',
        serviceName: '',
        periodName: '',
        name: '',
      });
      this.pendingForm.patchValue({
        pendingCycleName: '',
        fromDate: '',
        toDate: '',
      });
      this.lockForm.patchValue({
        lockCycleName: '',
        fromDate: '',
        toDate: '',
      })
    });
  }

  //resetPendingLock
  resetPendingLock() {

    this.pendingAreTableList = [];
    this.pendingForm.patchValue({
      pendingCycleName: '',
      fromDate: '',
      toDate: '',
    });
    this.checkedFinalPendingList = [];
    this.selectedUserPending = [];
    this.modalRef.hide()
  }
  //komal
  getReturnCycleTempID(payrollAreaCode: any) {
    const toSelect = this.checkedFinalLockList.find(
      (element) => element.payrollAreaCode == payrollAreaCode
    );
    return toSelect.payrollAreaCode;
    // console.log('toSelect', toSelect);
  }

  getReturnCycleTem(processingCycleId: any) {
    const toSelect = this.checkedFinalPendingList.find(
      (element) => element.processingCycleId == processingCycleId
    );
    return toSelect.processingCycleId;
    // console.log('toSelect', toSelect);
  }


  //// Emp tab ////////

  reactiveEmpForm() {
    this.empForm = this.formBuilder.group({
      cycleLockPayrollAreaId: new FormControl(0),
      areaMasterId: new FormControl(0),
      id: new FormControl(0),
      name: new FormControl('', Validators.required),
      businessCycleDefinitionId: new FormControl(null),
      periodName: new FormControl('', Validators.required),
      fromDate: new FormControl(''),
      toDate: new FormControl(''),
      companyName: new FormControl(''),
      serviceName: new FormControl(''),
      groupCompanyId: new FormControl(''),
      serviceMasterId: new FormControl(''),
      employeeCode: new FormControl(''),
      employeeSet: new FormControl(''),
      areaMasterCode: new FormControl('', Validators.required),
    });
  }



  //Cycle Defination Service
  getAllCycleDefinationEmp() {
    this.lockService.getAllCycleData().subscribe((res) => {
      this.cycleDefinationListEmp = res;
      // console.log('cycleDefinationListEmp', this.cycleDefinationListEmp);
      res.data.results[0].forEach((element) => {
        const obj = {
          label: element.name,
          value: element.id,
        };
        this.NameofCycleDefinationEmp.push(obj);
      });
    });
  }


  //Company Name and GroupCompanyId API
  getAllCompanyNameEmp() {
    this.lockService.getAllCompanysName().subscribe((res) => {
      this.companyNameListEmp = res.data.results;
      // console.log('companyNameListEmp', this.companyNameListEmp);
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
      // console.log('serviceNameListEmp', this.serviceNameListEmp);
      res.data.results[0].forEach((element) => {
        const obj = {
          label: element.serviceName,
          value: element.serviceMasterId,
        };
        this.serviceNamesEmp.push(obj);
      });
    });
  }


  navigateEmpTab() {
    this.empForm.reset()
    this.empForm.controls['employeeCode'].disable()
    this.empForm.controls['employeeSet'].disable()
    this.empListFlag = false
  }

  //On get the emp code on select area
  onSelectAreaInEmp(evt: any) {
    // this.empForm.patchValue({
    //   areaMasterCode: '',
    // });
    let data = evt.split(',')
    this.selectedEmpPA = data[1]
    if (evt == '') {
      this.employeeCodes = [];
    } else {
      this.employeeCodes = [];

      this.empForm.controls['employeeCode'].enable()
      this.empForm.controls['employeeSet'].enable()
      this.empListFlag = true

      // this.lockService.getEmpCode(evt).subscribe((res) => {
      //   this.employeeCodeList = res.data.results[0];
      console.log('employeeCodeList', this.employeeCodeList);
      //   res.data.results[0].forEach((element) => {
      //     const obj = {
      //       // label: element.payrollAreaCode,
      //       // value: element.payrollAreaId,
      //       name: element.employeeCode,
      //       code: element.employeeMasterId,
      //     };
      //     this.employeeCodes.push(obj);
      //   });
      // },

      // if(this.CompanyGroupId != undefined){
      this.lockService.getEmpCodeByDefId(data[0], this.businessCycleId).subscribe((res) => {
        this.employeeCodeList = res.data.results[0];
        // console.log('employeeCodeList', this.employeeCodeList);
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
      // }

    }
  }


  onSelectServiceNameEmp(evt: any) {
    if (evt == '1') {
      if (evt == '') {
        this.ServiceAreaListEmp = [];
      } else {
        this.ServiceAreaListEmp = [];
        this.lockService.getAreawServicesName(evt, this.businessCycleId, this.businessCycleDefinationId).subscribe(
          (res) => {
            this.areaSeriveListEmp = res.data.results[0];
            // console.log('areaSeriveList', this.areaSeriveListEmp);
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
    } else {
      if (evt == '') {
        this.ServiceAreaListEmp = [];
      } else {
        this.ServiceAreaListEmp = [];
        this.lockService.getAreawServicesName(evt, this.businessCycleId, this.businessCycleDefinationId).subscribe(
          (res) => {
            this.areaSeriveList = res.data.results[0];
            // console.log('areaSeriveList', this.areaSeriveList);
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


  // // Save EMP Form
  saveEmp() {
    this.allAreaCodesEmp = [];
    const selectedPayrollAreaCodes = this.empForm.get('employeeCode').value;

    if (this.employees.length == 0) {
      if (selectedPayrollAreaCodes.length > 0) {
        selectedPayrollAreaCodes.forEach((element) => {
          this.allAreaCodesEmp.push(element.code);
        });
      } else {
        // this.alertService.sweetalertWarning('Please select Group code');
        // return false;
      }
    } else {
      this.allAreaCodes = selectedPayrollAreaCodes
    }


    // if (selectedPayrollAreaCodes.length > 0) {
    //   selectedPayrollAreaCodes.forEach((element) => {
    //     this.allAreaCodesEmp.push(element.code);
    //   });
    // } else {
    //   this.alertService.sweetalertWarning('Please select Employee Code');
    //   return false;
    // }


    const data = {
      // areaMasterId: this.getAreaMasterIDEmp(),
      // businessCycleId: this.businessCycleId,
      // cycle: this.empForm.get('periodName').value,
      companyName: this.getCompanyNameEmp(this.empForm.get('companyName').value),
      // serviceName: '',
      payrollAreaCode: this.selectedEmpPA,
      employeeMasterIdList: this.allAreaCodesEmp

    };

    // this.getServiceNameEmp(this.empForm.get('serviceName').value)

    this.lockService.postEmpForm(data).subscribe((res: any) => {
      if (res) {
        if (res.data.results.length > 0) {
          this.getEmpTableList = res.data.results;
          this.empallChecked = true;
          this.getEmpTableList.forEach(element => {
            element.isChecked = true;
              this.selectedUserEmp.push(element.employeeMasterId);
              const data = {
                // serviceName: element.serviceName,
                cycleLockEmployeeId: element.cycleLockEmployeeId,
                employeeMasterId: element.employeeMasterId,
                payrollAreaCode: element.payrollAreaCode,
                businessCycleId: element.businessCycleId,
                cycle: element.cycle,
                areaMasterId: element.areaMasterId,
                employeeCode: element.employeeCode,
                fullName: element.fullName,
                companyName: element.companyName,
                canPost: true,
              };
              this.checkedSummaryListEmp.push(data);

          });

          this.checkedEmpLockAll = true
          this.checkedSummaryListEmp.forEach(ele =>{
            ele.isChecked = true
            const data = {
              cycleLockEmployeeId: ele.cycleLockEmployeeId,
              employeeMasterId: ele.employeeMasterId,
              payrollAreaCode: ele.payrollAreaCode,
              businessCycleId: this.businessCycleId,
              cycle: this.empForm.controls['periodName'].value,
              areaMasterId: 1,
              // createDateTime : new Date(),
              // lastModifiedDateTime : null,
              isActive: 1
            }
            this.checkedFinalLockListEmp.push(data);
          })
          // console.log("getEmpTableList", this.getEmpTableList);
          this.alertService.sweetalertMasterSuccess(res.status.message, '');
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      } else {
        this.alertService.sweetalertError(
          'Something went wrong. Please try again.'
        );
      }
    });
    //  this.empForm.reset();
    //  this.empForm.patchValue({
    //   companyName : '',
    //   serviceName : '',
    //   periodName : '',
    //   name : '',
    //   employeeCode : '',
    //   areaMasterCode : '',
    // })
  }

  //Save Locked EMployees (Click on Proceed)
  // Update Lock
  saveCheckedEmp() {

    // console.log(this.empForm.controls['periodName'].value)
    if (this.checkedFinalLockListEmp.length == 0) {
      return;
    }
    const data = this.checkedFinalLockListEmp

    // const data = {
    //   areaMasterId: element.areaMasterId,
    //   employeeMasterId: element.employeeMasterId,
    //   businessCycleId: element.businessCycleId,
    //   cycle: element.companyName,
    //   // companyName: element.companyName,
    //   serviceName: element.companyName,
    //   payrollAreaCode:  element.companyName,
    // }
    // this.checkedFinalLockListEmp.push(data);


    this.lockService.postLockCheckedEmp(data).subscribe((res) => {
      if (res) {
        if (res.data.results) {
          //  this.getAreaTableSummaryList();
          this.alertService.sweetalertMasterSuccess(res.status.message, '');
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      } else {
        this.alertService.sweetalertError(
          'Something went wrong. Please try again.'
        );
      }
      this.modalRef.hide();
      this.getEmpTableList = [];
      this.selectedUserEmp = [];
      this.checkedSummaryListEmp = [];
      this.selectedUserInLockEmp = [];
      // this.getAreaTableSummaryList();
      this.empForm.reset();
      this.lockEmpForm.patchValue({
        empCycleName: '',
        fromDate: '',
        toDate: '',
      });

    });
  }


  getCompanyNameEmp(serviceCode: any) {
    const toSelect = this.companyNameListEmp.find(
      (element) => element.groupCompanyId == serviceCode
    );
    // return toSelect.companyName;

    if (toSelect != undefined) {
      return toSelect.companyName;
    }
    return null;
  }

  // Sort and Excel
  //Area Master Excel
  exportApprovalSummaryAsExcel(): void {
    this.excelData = [];
    this.header = []
    this.header = ["Business Cycle Definition", "Frequency", "Payroll Area", "Cycle Name", "From Date", "To Date"];
    this.excelData = [];
    if (this.pendingCycleList.length > 0) {
      this.pendingCycleList.forEach((element) => {
        let obj = {

          'Business Cycle Definition': element.cycleName,
          'Frequency': element.frequencyName,
          'Payroll Area': element.payrollAreaCode,
          'Cycle Name': element.periodName,
          // 'From Date':element.fromDate,
          'From Date': this.datePipe.transform(element.fromDate, 'dd-MM-yyyy'),
          'To Date': this.datePipe.transform(element.toDate, 'dd-MM-yyyy')
        };

        this.excelData.push(obj);
      });
      // console.log('this.excelData::', this.excelData);
    }
    this.excelservice.exportAsExcelFile(this.excelData, 'Lock-Status', 'Lock-Status', this.header);
    // console.log('this.excelData::', this.excelData);
  }

  excelAreaToLock() {
    this.excelData = [];
    this.header = []
    this.header = ["Company Name", "Payroll Area"];
    this.excelData = [];
    if (this.areTableList.length > 0) {
      this.areTableList.forEach((element) => {
        let obj = {

          'Company Name': element.companyName,
          'Payroll Area': element.payrollAreaCode,
        };

        this.excelData.push(obj);
      });
      console.log('this.excelData::', this.excelData);
    }
    this.excelservice.exportAsExcelFile(this.excelData, 'Area-to-Lock', 'Area-to-Lock', this.header);
    console.log('this.excelData::', this.excelData);
  }


  excelAreaLock() {
    this.excelData = [];
    this.header = []
    this.header = ["Company Name", "Payroll Area"];
    this.excelData = [];
    if (this.checkedSummaryList.length > 0) {
      this.checkedSummaryList.forEach((element) => {
        let obj = {

          'Company Name': element.companyName,
          'Payroll Area': element.payrollAreaCode,
        };

        this.excelData.push(obj);
      });
      console.log('this.excelData::', this.excelData);
    }
    this.excelservice.exportAsExcelFile(this.excelData, 'Area-Lock', 'Area-Lock', this.header);
    console.log('this.excelData::', this.excelData);
  }

  //Export to Excel In Emp
  //Area Master Excel
  exportExcelEmpTable(): void {
    this.excelDataEmp = [];
    this.header = []
    this.header = ["Emp.Code", "Emp. Name", "Company Name", "Payroll Area"];
    this.excelDataEmp = [];
    if (this.getEmpTableList.length > 0) {
      this.getEmpTableList.forEach((element) => {
        let obj = {
          'Emp.Code': element.employeeCode,
          'Emp. Name': element.fullName,
          'Company Name': element.companyName,
          'Payroll Area': element.payrollAreaCode,

        };
        this.excelDataEmp.push(obj);
      });
      // console.log('this.excelDataEmp::', this.excelDataEmp);
    }
    this.excelservice.exportAsExcelFile(this.excelDataEmp, 'Employees-to-Lock', 'Employees-to-Lock', this.header);
    // console.log('this.excelDataEmp::', this.excelDataEmp);
  }

  //Export to Excel in Employees Lock popUp
  exportExcelEmpLock(): void {
    this.excelDataEmpLock = [];
    this.header = []
    this.header = ["Emp.Code", "Emp. Name", "Company Name", "Payroll Area"];
    this.excelDataEmpLock = [];
    if (this.checkedSummaryListEmp.length > 0) {
      this.checkedSummaryListEmp.forEach((element) => {
        let obj = {
          'Emp.Code': element.employeeCode,
          'Emp. Name': element.fullName,
          'Company Name': element.companyName,
          'Payroll Area': element.payrollAreaCode,

        };
        this.excelDataEmpLock.push(obj);
      });
      // console.log('this.excelDataEmpLock::', this.excelDataEmpLock);
    }
    this.excelservice.exportAsExcelFile(this.excelDataEmpLock, 'Employee Lock', 'Employee Lock', this.header);
    // console.log('this.excelDataEmpLock::', this.excelDataEmpLock);
  }


  exportToExcelAreaLock(): void {
    this.excelDataAreaLock = [];
    this.header = []
    this.header = ["companyName", "payrollAreaCode", "serviceName"];
    this.excelDataAreaLock = [];
    if (this.checkedSummaryList.length > 0) {
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
      // console.log('this.excelDataLock::', this.excelDataLock);
    }
    this.excelservice.exportAsExcelFile(this.excelDataLock, 'Area-Lock', 'Area-Lock', this.header);
    // console.log('this.excelDataLock::', this.excelDataLock);
  }


  getServiceNameEmp(serviceCode: any) {
    const toSelect = this.serviceNameListEmp.find(
      (element) => element.serviceMasterId == serviceCode
    );
    return toSelect.serviceName;
  }


  getAreaCodesInEmp(payrollAreaCode: any) {
    const toSelect = this.areaSeriveListEmp.find(
      (element) => element.payrollAreaId == payrollAreaCode
    );
    return toSelect.payrollAreaCode;
    // console.log('toSelect', toSelect);
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
  getAreaTableSummaryListEmp() {
    this.lockService.getAllAreaTableList().subscribe((res) => {
      if (res.data.results.length > 0) {
        this.areTableListEmp = res.data.results[0];
        this.areTableList.forEach((element, i) => {
          if (i == this.HighlightRow) {
            element.isHighlightright = false;
            // if (isContain == true) {
            //   element.isHighlight = false;
            // } else {
            //   if (i == this.HighlightRow) {
            //     element.isHighlight = true;
            //   }
            // }
          }
        });
        // console.log("areTableListEmp", this.areTableListEmp)
      }
    });
  }


  resetEmpLock() {
    // this.lockEmpForm.patchValue({
    //   empCycleName: '',
    //   fromDate: '',
    //   toDate: '',
    // });
    //this.checkedSummaryListEmp = [];
    this.checkedFinalLockListEmp = [];
   // this.modalRef.hide()
  this.checkedEmpLockAll = false
   this.checkedSummaryListEmp.forEach(ele =>{
     ele.isChecked = false;
   })
  }



  //OnCheck check box in area summary table
  onCheckAreaEmp(event, element, rowIndex) {
    console.log("element: "+ JSON.stringify(element))
    if (event.checked) {
      this.selectedAreaIdsEmp.push(element.employeeMasterId);
      this.selectedUserInLockEmp.push(element.employeeMasterId);
      element.isChecked = true
      this.getEmpTableList[rowIndex].isChecked = true
      const data = {
        // serviceName: element.serviceName,
        cycleLockEmployeeId: element.cycleLockEmployeeId,
        employeeMasterId: element.employeeMasterId,
        payrollAreaCode: element.payrollAreaCode,
        businessCycleId: element.businessCycleId,
        cycle: element.cycle,
        areaMasterId: element.areaMasterId,
        // createDateTime : new Date(),
        // lastModifiedDateTime : null,
        employeeCode: element.employeeCode,
        fullName: element.fullName,
        companyName: element.companyName,
        canPost: true,
      };
      this.checkedSummaryListEmp.push(data);
    }
    else {
      this.empallChecked = false
      element.isChecked = false
      this.getEmpTableList[rowIndex].isChecked = false
     
      console.log("checkedSummaryListEmp: "+ JSON.stringify(this.checkedSummaryListEmp))
      this.checkedSummaryListEmp.forEach((ele,index) =>{
         if(ele.employeeMasterId == element.employeeMasterId){
           let ind = index;
           this.checkedSummaryListEmp.splice(ind, 1);
     
           this.selectedUserInLockEmp.splice(ind, 1);
         }
      })
     
      // const index = this.checkedSummaryListEmp.indexOf((item) => (item.employeeMasterId == element.employeeMasterId));
      // console.log(index)
     
      const index2 = this.getEmpTableList.indexOf((item) => (item.employeeMasterId == element.employeeMasterId));
      this.selectedUserEmp.splice(index2, 1);

    }
  }

  //OnCheck check box in area summary table
  allCheckInCycleLockTableEmp11(checkValue, element, rowIndex) {
    // this.RowSelectedEmp(element, rowIndex);
    if (checkValue) {
      this.isChecked = true;
      this.selectedUserEmp.push(element.employeeMasterId);
      this.selectedAreaIdsEmp.push(element.employeeMasterId);
      this.selectedUserInLockEmp.push(element.employeeMasterId);

      // this.checkedFinalLockListEmp.push(element.businessCycleId);
      const data = {

        serviceName: element.serviceName,
        cycleLockEmployeeId: element.cycleLockEmployeeId,
        employeeMasterId: element.employeeMasterId,
        payrollAreaCode: element.payrollAreaCode,
        businessCycleId: element.businessCycleId,
        cycle: element.cycle,
        areaMasterId: element.areaMasterId,
        // createDateTime : new Date(),
        // lastModifiedDateTime : null,
        employeeCode: element.employeeCode,
        fullName: element.fullName,
        companyName: element.companyName,
        canPost: true,
      };
      this.checkedSummaryListEmp.push(data);
      // console.log("checkedSummaryListEmp", this.checkedSummaryListEmp)
      // this.selectedUserInLockEmp.push(data);

      const data1 = {
        // serviceName: element.serviceName,
        cycleLockEmployeeId: element.cycleLockEmployeeId,
        employeeMasterId: element.employeeMasterId,
        payrollAreaCode: element.payrollAreaCode,
        businessCycleId: this.businessCycleId,
        cycle: this.empForm.controls['periodName'].value,
        areaMasterId: 1,
        // createDateTime : new Date(),
        // lastModifiedDateTime : null,
        isActive: 1
      }
      this.checkedFinalLockListEmp.push(data1);
    }
    else {
      const index = this.checkedSummaryListEmp.indexOf((item) => (item.employeeMasterId == element.employeeMasterId));
      this.checkedSummaryListEmp.splice(index, 1);
      this.selectedUserInLockEmp.splice(index, 1);
      const index1 = this.checkedFinalLockListEmp.indexOf((item) => (item.employeeMasterId == element.employeeMasterId));
      this.checkedFinalLockListEmp.splice(index1, 1);

      const index2 = this.getEmpTableList.indexOf((item) => (item.employeeMasterId == element.employeeMasterId));
      this.selectedUserEmp.splice(index2, 1);

    }
  }


  checkedAllEmpLock(event){
    this.checkedFinalLockListEmp = []
    if(event.checked){
      this.checkedEmpLockAll = true;
      this.checkedSummaryListEmp.forEach(ele =>{
        ele.isChecked = true
        const data = {
          cycleLockEmployeeId: ele.cycleLockEmployeeId,
          employeeMasterId: ele.employeeMasterId,
          payrollAreaCode: ele.payrollAreaCode,
          businessCycleId: this.businessCycleId,
          cycle: this.empForm.controls['periodName'].value,
          areaMasterId: 1,
          // createDateTime : new Date(),
          // lastModifiedDateTime : null,
          isActive: 1
        }
        this.checkedFinalLockListEmp.push(data);
      })
    }else{
      this.checkedEmpLockAll = false;
      this.checkedFinalLockListEmp = []
      this.checkedSummaryListEmp.forEach(ele =>{
        ele.isChecked = false
      })  
    }
  }


   //OnCheck check box in area summary table On Check Area after click on  Lock button
   onCheckEmpInLock(checkValue, element, rowIndex) {
    if (checkValue.checked) {
      this.checkedSummaryListEmp[rowIndex].isChecked = true
      this.selectedUserInLockEmp.push(element);
      const data = {
        cycleLockEmployeeId: element.cycleLockEmployeeId,
        employeeMasterId: element.employeeMasterId,
        payrollAreaCode: element.payrollAreaCode,
        businessCycleId: this.businessCycleId,
        cycle: this.empForm.controls['periodName'].value,
        areaMasterId: 1,
        // createDateTime : new Date(),
        // lastModifiedDateTime : null,
        isActive: 1
      }
      this.checkedFinalLockListEmp.push(data);
    } else {
      this.checkedEmpLockAll = false;
      this.checkedSummaryListEmp[rowIndex].isChecked = true

      this.checkedFinalLockListEmp.forEach((p,index) =>{
        if(p.employeeMasterId == element.employeeMasterId){
          let ind = index;
          this.checkedFinalLockListEmp.splice(ind, 1);
          this.selectedUserInLockEmp.splice(ind, 1);
        }
      })
      // const index = this.checkedFinalLockListEmp.indexOf((p) => (p.employeeMasterId == element.jobMasterValueId));
      // this.checkedFinalLockListEmp.splice(index, 1);
      // this.selectedUserInLockEmp.splice(index, 1);
    }

  }


  checkUncheckAll(checkValue) {
    if (checkValue) {
      this.getEmpTableList.forEach(element => {
        // this.selectedUserAsAndWhen.push(element);
        this.selectedAreaIdsEmp.push(element.employeeMasterId);
      });
    } else {
      this.getEmpTableList.forEach(element => {
        const index = this.checkedFinalLockListEmp.indexOf((item) => (item.employeeMasterId == element.employeeMasterId));
        this.checkedFinalLockListEmp.splice(index, 1);
        this.selectedAreaIdsEmp.splice(index, 1);
      });
    }
  }

  //Reset the  form
  resetAreaFormEmp() {
    this.empForm.reset();
    this.empForm.patchValue({
      companyName: '',
      serviceName: '',
      periodName: '',
      name: '',
    })
  }

  //Row select in table
  //Select Row in left table of PHG
  RowSelectedEmp(u: any, ind: number) {
    this.HighlightRow = ind;
    // console.log("ind", ind);
    // console.log("u", u);
    let temp = this.getEmpTableList;
    this.getEmpTableList = new Array();
    let index = this.selectedUserEmp.findIndex(
      (o) => o.employeeMasterId == u.employeeMasterId
    );
    // console.log("selectedUserEmp", this.selectedUserEmp);

    let isContain = this.selectedUserEmp.some(
      (o) => o.employeeMasterId == u.employeeMasterId
    );
    // console.log("selectedUserEmp isContain", isContain);

    if (isContain == true) {
      this.selectedUserEmp.splice(index, 1);
    } else {
      this.selectedUserEmp.push(u);
    }

    this.getEmpTableList = temp;

    this.getEmpTableList.forEach((element, i) => {
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



 

  // selected row in  Lock table in Emp
  //Row select in table As and When
  RowSelectedInLockEmp(u: any, ind: number) {
    this.HighlightRow = ind;
    let temp = this.checkedSummaryListEmp;
    this.checkedSummaryListEmp = new Array();
    let index = this.selectedUserInLockEmp.findIndex(
      (o) => o.employeeMasterId == u.employeeMasterId
    );
    let isContain = this.selectedUserInLockEmp.some(
      (o) => o.employeeMasterId == u.employeeMasterId
    );
    if (isContain == true) {
      this.selectedUserInLockEmp.splice(index, 1);
    } else {
      this.selectedUserInLockEmp.push(u);
    }
    this.checkedSummaryListEmp = temp;
    this.checkedSummaryListEmp.forEach((element, i) => {
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


  doubleClickOnLeftTableEmp(evt: any) { }

  //Reset the  form
  resetEmpForm() {
    this.empForm.reset();
    this.empForm.patchValue({
      companyName: '',
      serviceName: '',
      periodName: '',
      name: '',
      employeeCode: '',
    })

    this.empForm.controls['employeeCode'].setValue([])
    this.checkedFinalLockListEmp = [];
   this.checkedEmpLockAll = false
   this.empallChecked = false;
    this.checkedSummaryListEmp = []
  }


  //Row select in table
  //Select Row in left table of PHG
  RowSelectedPending(u: any, ind: number) {
    this.HighlightRow = ind;

    let temp = this.pendingAreTableList;
    this.pendingAreTableList = new Array();
    let index = this.selectedUserPending.findIndex(
      (o) => o.processingCycleId == u.processingCycleId
    );
    let isContain = this.selectedUserPending.some(
      (o) => o.processingCycleId == u.processingCycleId
    );
    if (isContain == true) {
      this.selectedUserPending.splice(index, 1);
    } else {
      this.selectedUserPending.push(u);
    }

    this.pendingAreTableList = temp;

    this.pendingAreTableList.forEach((element, i) => {
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


  pendingForLockAsWhen() {
    this.lockService.pendingForLockArea().subscribe((res) => {
      this.pendingAreaList = res.data.results[0];
      // console.log('pendingAreaList',this.pendingAreaList);
      res.data.results[0].forEach((element) => {
        const obj = {
          serviceName: element.serviceName,
          companyName: element.companyName,
          processingCycleId: element.processingCycleId,
          payrollArea: element.payrollArea,

        };
        this.pendingAreTableList.push(obj);
      });
    });
  }

  //Emp Table List
  //Get Go Cycle Name
  getSaveEmpCycleName() {
    if (this.empForm.invalid) {
      return;
    }

    const cycleName = this.empForm.get('periodName').value;
    // const periodId = this.empForm.get('periodName').value;

    // console.log("cycleName", cycleName)
    // console.log("periodId",periodId)

    this.lockService.getEmpListUsingCycleName(cycleName).subscribe((res) => {
      // console.log("res", res);

      if (res) {
        if (res.data.results.length > 0) {
          this.getEmpTableList = res.data.results,
            this.getEmpTableList.forEach(ele => {
              ele.isChecked = true
            })
          // console.log("getEmpTableList", this.getEmpTableList)
          this.alertService.sweetalertMasterSuccess(res.status.message, '');
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
        this.alertService.sweetalertMasterSuccess(res.status.message, '');
      } else {
        this.alertService.sweetalertError(
          'Something went wrong. Please try again.'
        );
      }

    })

  }

  getSelectedEmpCode(event) {
    if (event.value.length > 0) {
      this.empForm.controls['employeeSet'].disable()
      this.empForm.controls['employeeCode'].enable()
      this.empListFlag = false
    } else {
      this.empForm.controls['employeeSet'].enable()
      this.empForm.controls['employeeCode'].enable()
      this.empListFlag = true
    }
  }

  getSelectedEmpSet(value) {
    if (value != '') {
      this.empForm.controls['employeeSet'].enable()
      this.empForm.controls['employeeCode'].disable()
      this.empListFlag = false
    } else {
      this.empForm.controls['employeeSet'].enable()
      this.empForm.controls['employeeCode'].enable()
      this.empListFlag = true
    }
  }

  onSelectEmpList(event) {
    if (event.checked) {
      this.employeeListFlag = true
      this.empForm.controls['employeeSet'].disable()
      this.empForm.controls['employeeCode'].disable()
      this.empListFlag = true
    } else {
      this.employeeListFlag = false
      this.empForm.controls['employeeSet'].enable()
      this.empForm.controls['employeeCode'].enable()
      this.empListFlag = true
    }
  }

  //Save On Lock Emp Pop up
  // Update Lock
  saveLockProceedEmp() {
    if (this.checkedFinalLockList.length == 0) {
      return;
    }
    const data = { cycleLockPayrollAreaTempIds: this.checkedFinalLockList }

    this.lockService.postAreaInLock(data).subscribe((res) => {
      if (res) {
        if (res.data.results) {
          //  this.getAreaTableSummaryList();
          this.alertService.sweetalertMasterSuccess(res.status.message, '');
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      } else {
        this.alertService.sweetalertError(
          'Something went wrong. Please try again.'
        );
      }
      this.modalRef.hide();
      // this.areTableList = [];
      this.selectedUser = [];
      this.checkedSummaryList = [];
      // this.getAreaTableSummaryList();
      this.areaForm.reset();
      this.areaForm.patchValue({
        companyName: '',
        serviceName: '',
        periodName: '',
        name: '',
      });
      this.pendingForm.patchValue({
        pendingCycleName: '',
        fromDate: '',
        toDate: '',
      });
      this.lockForm.patchValue({
        lockCycleName: '',
        fromDate: '',
        toDate: '',
      });

    });
  }

}
