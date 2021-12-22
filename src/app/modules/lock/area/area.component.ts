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
      console.log("getSetEmployeeList", this.getSetEmployeeList);
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

  }
  Areapendingforlockpopup(Areapendingforlock: TemplateRef<any>) {
    this.selectedUserPending = [];
    this.checkedFinalPendingList = [];
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


  //emp list radio button//
  areaListPasteData(event: ClipboardEvent) {
    let clipboardData = event.clipboardData;
    let pastedText = clipboardData.getData('text');
    let row_data = pastedText.split('\n');

    this.displayedColumns = ["payrollAreaCode"]
    this.areas = [];
    for (let i = 0; i < row_data.length; i++) {
      let data = row_data[i].replace('\r', '');

      // console.log("paste data: "+ data)
      // if (data != '') {
      //   const area = this.ServiceAreaList.find(a => a.label == data)
      //   let obj = area?.value;

        this.areas.push(data)
      // }
    }

    //this.areaForm.get('areaMasterCode').setValue(this.areas);
    let lastIndex = this.areas.length - 1

    this.areas.splice(lastIndex,1)

    console.log("paste araea is: "+ JSON.stringify(this.areas));

    // Create table dataSource
    // row_data.forEach(row_data => {
    //   let row = {};
    //   this.displayedColumns.forEach((a, index) => {
    //     row[a] = row_data.split('\t')[index]
    //   });
    //   // console.log(row)
    //   this.areasdata.push(row);
    // })
    // this.areadataSource = this.areasdata;
    // this.areadataSource.splice(this.areadataSource.length - 1, 1)

    // console.log("Before: " + JSON.stringify(this.areadataSource));

    // this.employeeCodeList.forEach(element => {
    //   this.areadataSource.forEach(emp => {
    //     let empcode = emp.employeeCode.split('\r')
    //     if (element.employeeCode + ',' == empcode) {
    //       emp.employeeMasterId = element.employeeMasterId
    //       emp.fullName = element.fullName
    //     }
    //   });
    // });
    // console.log("After: " + JSON.stringify(this.areadataSource));
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
      companyName: new FormControl('', Validators.required),
      serviceName: new FormControl(''),
      groupCompanyId: new FormControl(''),
      serviceMasterId: new FormControl(''),
      // areaMasterCode: new FormControl('', Validators.required),
      areaMasterCode: new FormControl({ value: "", disabled: false },),
      areaSet: new FormControl({ value: "", disabled: false },),
      areaList: new FormControl({ value: "", disabled: false },),
    });
    console.log(this.areaForm)
  }

  selectAllAreaLock(event, data, index) {
    this.selectedUserInLock = []
    if (event.checked) {
      this.checkedSummaryList.forEach((element) => {
        this.selectedUserInLock.push(element)
        this.checkedLockAll = true;
      });

    } else {
      this.checkedLockAll = false;
      // this.checkedSummaryList.forEach((element) => {
      //   const index = this.checkedSummaryList.indexOf(
      //     (p) => (p.payrollAreaCode == element.payrollAreaCode));
      //   this.checkedSummaryList[index].checkedLockAll = false;
      // });
    }
  }


  selectAll(event) {
    this.selectedUser = [];
    this.checkedSummaryList = [];
    this.checkedAll = false
    if (event.checked) {
      this.checkedAll = true;
      this.areTableList.forEach((element) => {
        element.checkedLockAll = false
        this.selectedUser.push(element.payrollAreaCode);
        this.checkedSummaryList.push(element);
      });

      console.log(JSON.stringify(this.checkedSummaryList))
    } else {
      this.checkedAll = false;
      this.areTableList.forEach((element) => {
        element.checkedLockAll = false
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
    console.log(evt);
    if (evt.value.length >= 1) {
      this.areaForm.get('areaList').disable();
      this.areaForm.get('areaSet').disable();
    }
    else {
      this.areaForm.get('areaList').enable();
      this.areaForm.get('areaSet').enable();
    }
    console.log("ServiceAreaList", this.ServiceAreaList.length);
  }


  onSelectAreaSet(evt) {
    console.log(evt);

    this.payrollareaSetlist.push(evt.itemValue.code)
    if (evt.value.length >= 1) {
      this.areaForm.get('areaList').disable();
      this.areaForm.get('areaMasterCode').disable();
    }
    else {
      this.areaForm.get('areaList').enable();
      this.areaForm.get('areaMasterCode').enable();
    }
  }

  onSelectAreaList(evt) {
    if (evt.checked) {
      this.areaForm.get('areaMasterCode').disable();
      this.areaForm.get('areaSet').disable();
    }
    else {
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

          // this.businessCycleId = this.cycleNameList.id[0][0];
          // this.businessCycleDefinationId = this.cycleNameList.businessCycleDefinitionId[0][0]
          console.log('cycleNameList', this.cycleNameList);

          res.data.results[0].forEach((element) => {
            // const obj = {
            //   label: element.periodName,
            //   value: element.businessCycleDefinitionId,
            // };
            this.periodNameList.push(element);
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


      this.periodNameList.forEach(ele => {
        if (ele.periodName === evt) {
          this.businessCycleId = ele.id;
          this.businessCycleDefinationId = ele.businessCycleDefinitionId
        }
      })


      this.lockService.pendingLockEmptyArea(evt).subscribe((res) => {
        console.log("pendingLockEmptyArea", res);
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

  //Company Name and GroupCompanyId API
  getAllCompanyName() {
    this.lockService.getAllCompanysName().subscribe((res) => {
      this.companyNameList = res.data.results;
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

  getCompanyGroupId(value) {
    this.CompanyGroupId = value
    // alert(value);
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

    this.CompanyGroupId = evt
    this.ServiceAreaList = []
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
    if (selectedPayrollAreaCodes.length > 0) {
      selectedPayrollAreaCodes.forEach((element) => {
        this.allAreaCodes.push(element.name);
      });
    } else {
      // this.alertService.sweetalertWarning('Please select Group code');
      // return false;
    }

    if (this.areaForm.get('areaMasterCode').value != '') {
      const data = {
        areaMasterId: this.getAreaMasterID(),
        businessCycleId: this.getBusinessID(),
        cycle: this.areaForm.get('periodName').value,
        // serviceName: '',
        companyName: this.getCompanyName(this.areaForm.get('companyName').value),
        payrollAreaCodeList: this.allAreaCodes,
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
    }else{

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
    return toSelect.companyName;
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
  // getAreaTableSummaryList(){
  //   this.lockService.getAllAreaTableList().subscribe((res) => {
  //     if(res.data.results.length > 0){
  //       this.areTableList = res.data.results[0];
  //       console.log("areTableList",this.areTableList)
  //       this.areTableList.forEach((element, i) => {
  //         if (i == this.HighlightRow) {
  //           element.isHighlightright = false;
  //         }
  //       });
  //     }
  //   });
  // }


  //OnCheck check box in area summary table
  onCheckArea(event, element, rowIndex) {

    if (event.checked) {
      // this.isChecked = true;
      // this.selectedUser.push(element.payrollAreaCode);
      this.selectedAreaIds.push(element.payrollAreaCode);
      this.selectedUserInLock.push(element.payrollAreaCode);

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

      // const data1 = {
      //   cycleLockPayrollAreaId: element.cycleLockPayrollAreaId,
      //   areaMasterId: element.areaMasterId,
      //   businessCycleId: element.businessCycleId,
      //   cycle: element.cycle,
      //   serviceName: element.serviceName,
      //   payrollAreaCode: element.payrollAreaCode,
      //   isActive: 1,
      // }
      // this.checkedFinalLockList.push(data1);

    }
    else {
      const index = this.checkedSummaryList.indexOf((item) => (item.payrollAreaCode == element.payrollAreaCode));
      this.checkedSummaryList.splice(index, 1);
      this.selectedUserInLock.splice(index, 1);
      this.areTableList[rowIndex].checked = true
      const index1 = this.checkedFinalLockList.indexOf((p) => (p.payrollAreaCode == element.payrollAreaCode));
      this.checkedFinalLockList.splice(index1, 1);

      const index11 = this.areTableList.indexOf((p) => (p.payrollAreaCode == element.payrollAreaCode));
      this.selectedUser.splice(index11, 1);

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
  resetAreaForm() {
    this.pendingAreTableList = [];
    this.areaForm.reset();
    this.pendingForm.reset();
    // this.areaForm.patchValue({
    //   companyName: '',
    //   serviceName: '',
    //   periodName: '',
    //   name: '',
    // });
    // this.pendingForm.patchValue({
    //   pendingCycleName: '',
    //   fromDate: '',
    //   toDate: '',
    // });
    this.lockForm.patchValue({
      lockCycleName: '',
      fromDate: '',
      toDate: '',
    });

    this.areTableList = []
    this.ServiceAreaList = []
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

    this.areaForm.get('areaList').enable();
    this.areaForm.get('areaSet').enable();
    this.areaForm.get('areaMasterCode').enable();
  }



  //Row select in table
  //Select Row in left table of PHG
  RowSelected(u: any, ind: number) {
    this.HighlightRow = ind;
    console.log("ind", ind);
    console.log("u", u);
    let temp = this.areTableList;
    this.areTableList = new Array();
    let index = this.selectedUser.findIndex(
      (o) => o.payrollAreaCode == u.payrollAreaCode
    );
    console.log("selectedUser", this.selectedUser);

    let isContain = this.selectedUser.some(
      (o) => o.payrollAreaCode == u.payrollAreaCode
    );
    console.log("selectedUser isContain", isContain);

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
    console.log("HighlightRow", this.HighlightRow)
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


  //OnCheck check box in area summary table On Check Area after click on  Lock button
  //  onCheckAreaInLock(checkValue, element, rowIndex) {
  //   // this.RowSelectedInLock(element, rowIndex);
  //   console.log("rowIndex",rowIndex);
  //   console.log("checkValue Number", checkValue);
  //   if(checkValue) {
  //     // element.canPost = true;
  //     this.selectedUserInLock.push(element);
  //     this.checkedFinalLockList.push(element.cycleLockPayrollAreaTempId);
  //   } else {
  //     // element.canPost = false;
  //      const index = this.checkedFinalLockList.indexOf((p) => (p.cycleLockPayrollAreaTempId = element.jobMasterValueId));
  //     this.checkedFinalLockList.splice(index, 1);
  //     this.selectedUserInLock.splice(index, 1);
  //   }
  // }

  //click on Check All In Pending for lock add and remove element from array
  allCheckUncheck(checkValue) {
    if (checkValue) {
      this.pendingAreTableList.forEach((element) => {
        this.selectedUserPending.push(element.processingCycleId);
        this.checkedFinalPendingList.push(element.processingCycleId);
      });
    } else {
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


  // //click on Check All In Pending for lock add and remove element from array
  // allCheckInCycleLockTable(checkValue){
  //   this.selectedUser = [];
  //   this.checkedSummaryList = [];
  //   if(checkValue){
  //   this.areTableList.forEach((element) => {
  //     this.selectedUser.push(element.payrollAreaCode);
  //     this.checkedSummaryList.push(element.payrollAreaCode);
  //   });
  //   }else {
  //     this.areTableList.forEach((element) => {
  //     const index = this.checkedSummaryList.indexOf(
  //       (p) => (p.payrollAreaCode == element.payrollAreaCode));
  //     this.checkedSummaryList.splice(index, 1);

  //     const index1 = this.areTableList.indexOf(
  //       (p) => (p.payrollAreaCode == element)
  //     );
  //     this.selectedUser.splice(index1, 1);
  //   });
  //   }
  // }



  allCheckInCycleLockTable(checkValue) {
    // alert(checkValue)
    this.selectedUser = [];
    this.checkedSummaryList = [];
    if (checkValue) {
      this.areTableList.forEach((element) => {
        this.selectedUser.push(element.payrollAreaCode);
        this.checkedSummaryList.push(element);
      });

      console.log(JSON.stringify(this.checkedSummaryList))
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
  allCheckInCycleLockTableEmp(checkValue, element) {
    if (checkValue) {
      this.isChecked = true;
      this.getEmpTableList.forEach((element) => {
        this.selectedUserEmp.push(element.employeeMasterId);
        // this.checkedSummaryListEmp.push(element.employeeMasterId);

        const data = {
          serviceName: element.serviceName,
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
        console.log("checkedSummaryListEmp", this.checkedSummaryListEmp)
        // this.selectedUserInLockEmp.push(data);

        const data1 = {
          serviceName: element.serviceName,
          cycleLockEmployeeId: element.cycleLockEmployeeId,
          employeeMasterId: element.employeeMasterId,
          payrollAreaCode: element.payrollAreaCode,
          businessCycleId: element.businessCycleId,
          cycle: element.cycle,
          areaMasterId: element.areaMasterId,
          // createDateTime : new Date(),
          // lastModifiedDateTime : null,
          isActive: 1
        }
        this.checkedFinalLockListEmp.push(data1);

      });
    } else {
      this.getEmpTableList.forEach((element) => {
        const index = this.checkedSummaryListEmp.indexOf(
          (p) => (p.employeeMasterId == element.employeeMasterId));
        this.checkedSummaryListEmp.splice(index, 1);

        const index1 = this.getEmpTableList.indexOf(
          (p) => (p.employeeMasterId == element.employeeMasterId)
        );
        this.selectedUserEmp.splice(index1, 1);
      });
    }
  }


  //OnCheck check box in area summary table On Check Area after click on  Lock button
  onCheckAreaInLock(checkValue, element, rowIndex) {
    // this.RowSelectedInLockEmp(element,rowIndex);
    // console.log("rowIndex", rowIndex);
    // console.log("checkValue Number", checkValue);
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
      console.log("checkedFinalLockList", this.checkedFinalLockList)
    } else {
      // element.canPost = false;
      const index = this.checkedFinalLockList.indexOf((p) => (p.payrollAreaCode == element.payrollAreaCode));
      this.checkedFinalLockList.splice(index, 1);


      const index1 = this.checkedSummaryList.indexOf((p) => (p.payrollAreaCode == element.payrollAreaCode));
      this.selectedUserInLock.splice(index1, 1);
    }
  }




  //Checked Pending for lock popup
  onCheckedPendigLock(checkValue, element) {
    if (checkValue) {
      this.selectedUserPending.push(element.processingCycleId);
      this.checkedFinalPendingList.push(element.processingCycleId);
    } else {
      const index = this.checkedFinalPendingList.indexOf((p) => (p.processingCycleId == element.processingCycleId));
      this.checkedFinalPendingList.splice(index, 1);

      const index1 = this.pendingAreTableList.indexOf((a) => (a.processingCycleId == element));
      this.selectedUserPending.splice(index1, 1);

    }

  }

  //Reset Lock
  resetLock() {
    this.lockForm.patchValue({
      lockCycleName: '',
      fromDate: '',
      toDate: '',
    })
    this.checkedSummaryList = [];
    this.checkedFinalLockList = [];
    this.checkedAll = false;
    this.checkedLockAll = false;

    this.areTableList.forEach(ele => {
      ele.checked = false
    })
    this.modalRef.hide()

  }

  // Update Lock
  // saveLockProceed() {

  //   if (this.checkedFinalLockList.length == 0) {
  //     return;
  //   }
  //   // const data = { cycleLockPayrollAreaTempIds : this.checkedFinalLockList }
  //   const data = this.checkedFinalLockList;

  //   this.lockService.postAreaInLock(data).subscribe((res) => {
  //     if (res) {
  //       if (res.data.results) {

  //         this.alertService.sweetalertMasterSuccess(res.status.message, '');
  //       } else {
  //         this.alertService.sweetalertWarning(res.status.message);
  //       }
  //     } else {
  //       this.alertService.sweetalertError(res.status.message)
  //     }
  //     this.modalRef.hide();
  //     this.selectedUser = [];
  //     this.checkedSummaryList = [];
  //     this.areTableList = [];
  //     // this.getAreaTableSummaryList();
  //     this.areaForm.reset();
  //     this.areaForm.patchValue({
  //       companyName: '',
  //       serviceName: '',
  //       periodName: '',
  //       name: '',
  //     });
  //     this.pendingForm.patchValue({
  //       pendingCycleName: '',
  //       fromDate: '',
  //       toDate: '',
  //     });
  //     this.lockForm.patchValue({
  //       lockCycleName: '',
  //       fromDate: '',
  //       toDate: '',
  //     });

  //   });
  // }

  saveLockProceed() {
    if (this.checkedFinalLockList.length == 0) {
      return;
    }
    // const data = { cycleLockPayrollAreaTempIds : this.checkedFinalLockList }
    const data = this.checkedFinalLockList;
    this.checkedAll = false
    this.lockService.postAreaInLock(data).subscribe((res) => {
      this.alertService.sweetalertMasterSuccess(res.status.message, '');
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
    console.log('toSelect', toSelect);
  }

  getReturnCycleTem(processingCycleId: any) {
    const toSelect = this.checkedFinalPendingList.find(
      (element) => element.processingCycleId == processingCycleId
    );
    return toSelect.processingCycleId;
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
    this.businessCycleId = evt
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
  }

  //Company Name and GroupCompanyId API
  getAllCompanyNameEmp() {
    this.lockService.getAllCompanysName().subscribe((res) => {
      this.companyNameListEmp = res.data.results;
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
    if (evt == '1') {
      if (evt == '') {
        this.ServiceAreaListEmp = [];
      } else {
        this.ServiceAreaListEmp = [];
        this.lockService.getAreawServicesName(evt, this.businessCycleId, this.businessCycleDefinationId).subscribe(
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
    } else {
      if (evt == '') {
        this.ServiceAreaListEmp = [];
      } else {
        this.ServiceAreaListEmp = [];
        this.lockService.getAreawServicesName(evt, this.businessCycleId, this.businessCycleDefinationId).subscribe(
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


  // // Save EMP Form
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


    const data = {
      areaMasterId: this.getAreaMasterIDEmp(),
      businessCycleId: this.getBusinessIDEmp(),
      cycle: this.empForm.get('periodName').value,
      companyName: this.getCompanyNameEmp(this.empForm.get('companyName').value),
      serviceName: '',
      payrollAreaCode: this.getAreaCodesInEmp(this.empForm.get('areaMasterCode').value),
      employeeMasterIdList: this.allAreaCodesEmp

    };

    // this.getServiceNameEmp(this.empForm.get('serviceName').value)

    this.lockService.postEmpForm(data).subscribe((res: any) => {
      if (res) {
        if (res.data.results.length > 0) {
          this.getEmpTableList = res.data.results;
          console.log("getEmpTableList", this.getEmpTableList);
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


  // getCompanyNameEmp(companyId: any) {
  //   const toSelect = this.companyNameListEmp.find(
  //     (element) => element.groupCompanyId == companyId);
  //   return toSelect.companyName;
  //   console.log('toSelect', toSelect);
  // }


  getCompanyNameEmp(serviceCode: any) {
    const toSelect = this.companyNameListEmp.find(
      (element) => element.groupCompanyId == serviceCode
    );
    return toSelect.companyName;
    console.log('toSelect', toSelect);
  }



  // Sort and Excel
  //Area Master Excel
  exportApprovalSummaryAsExcel(): void {
    this.excelData = [];
    this.header = []
    this.header = ["companyName", "payrollArea", "serviceName"];
    this.excelData = [];
    if (this.pendingAreTableList.length > 0) {
      this.pendingAreTableList.forEach((element) => {
        let obj = {
          companyName: element.companyName,
          payrollArea: element.payrollArea,
          serviceName: element.serviceName,
        };
        this.excelData.push(obj);
      });
      console.log('this.excelData::', this.excelData);
    }
    this.excelservice.exportAsExcelFile(this.excelData, 'Area-to-Lock', 'Area-to-Lock', this.header);
    console.log('this.excelData::', this.excelData);
  }

  //Export to Excel In Emp
  //Area Master Excel
  exportExcelEmpTable(): void {
    this.excelDataEmp = [];
    this.header = []
    this.header = ["employeeCode", "fullName", "companyName", "serviceName", "payrollAreaCode"];
    this.excelDataEmp = [];
    if (this.getEmpTableList.length > 0) {
      this.getEmpTableList.forEach((element) => {
        let obj = {
          employeeCode: element.employeeCode,
          fullName: element.fullName,
          companyName: element.companyName,
          serviceName: element.serviceName,
          payrollAreaCode: element.payrollAreaCode,
        };
        this.excelDataEmp.push(obj);
      });
      console.log('this.excelDataEmp::', this.excelDataEmp);
    }
    this.excelservice.exportAsExcelFile(this.excelDataEmp, 'Employees-to-Lock', 'Employees-to-Lock', this.header);
    console.log('this.excelDataEmp::', this.excelDataEmp);
  }

  //Export to Excel in Employees Lock popUp


  exportExcelEmpLock(): void {
    this.excelDataEmpLock = [];
    this.header = []
    this.header = ["employeeCode", "fullName", "companyName", "serviceName", "payrollAreaCode"];
    this.excelDataEmpLock = [];
    if (this.checkedSummaryListEmp.length > 0) {
      this.checkedSummaryListEmp.forEach((element) => {
        let obj = {
          employeeCode: element.employeeCode,
          fullName: element.fullName,
          companyName: element.companyName,
          serviceName: element.serviceName,
          payrollAreaCode: element.payrollAreaCode,
        };
        this.excelDataEmpLock.push(obj);
      });
      console.log('this.excelDataEmpLock::', this.excelDataEmpLock);
    }
    this.excelservice.exportAsExcelFile(this.excelDataEmpLock, 'Employee Lock', 'Employee Lock', this.header);
    console.log('this.excelDataEmpLock::', this.excelDataEmpLock);
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
      console.log('this.excelDataLock::', this.excelDataLock);
    }
    this.excelservice.exportAsExcelFile(this.excelDataLock, 'Area-Lock', 'Area-Lock', this.header);
    console.log('this.excelDataLock::', this.excelDataLock);
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
    console.log('toSelect', toSelect);
  }

  // getAreaCodesInEmp(payrollAreaCode: any) {
  //   const toSelect = this.areaSeriveListEmp.find(
  //     (element) => element.payrollArea.payrollAreaId == payrollAreaCode
  //   );
  //   return toSelect.payrollArea.payrollAreaCode;
  //   console.log('toSelect', toSelect);
  // }




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
        console.log("areTableListEmp", this.areTableListEmp)
      }
    });
  }

  //OnCheck check box in area summary table
  // onCheckAreaEmp(checkValue, element){
  //   console.log("checkValue Number", checkValue);
  //   if(checkValue){
  //     const data = {
  //       serviceName : element.serviceName,
  //       cycleLockPayrollAreaTempId : element.cycleLockPayrollAreaTempId,
  //       employeeMasterId : element.employeeMasterId,
  //       payrollAreaCode : element.payrollAreaCode,
  //       createDateTime : element.createDateTime,
  //       employeeMasterIdList :element.employeeMasterIdList,
  //       employeeCode : element.employeeCode,
  //       fullName : element.fullName,
  //       companyName : element.companyName,
  //     }
  //     console.log(element)
  //   }
  // }
  resetEmpLock() {
    this.lockEmpForm.patchValue({
      empCycleName: '',
      fromDate: '',
      toDate: '',
    });
    this.checkedSummaryListEmp = [];
    this.checkedFinalLockListEmp = [];
    this.modalRef.hide()
  }



  //OnCheck check box in area summary table
  onCheckAreaEmp(checkValue, element, rowIndex) {
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
      console.log("checkedSummaryListEmp", this.checkedSummaryListEmp)
      // this.selectedUserInLockEmp.push(data);

      const data1 = {
        serviceName: element.serviceName,
        cycleLockEmployeeId: element.cycleLockEmployeeId,
        employeeMasterId: element.employeeMasterId,
        payrollAreaCode: element.payrollAreaCode,
        businessCycleId: element.businessCycleId,
        cycle: element.cycle,
        areaMasterId: element.areaMasterId,
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
      console.log("checkedSummaryListEmp", this.checkedSummaryListEmp)
      // this.selectedUserInLockEmp.push(data);

      const data1 = {
        serviceName: element.serviceName,
        cycleLockEmployeeId: element.cycleLockEmployeeId,
        employeeMasterId: element.employeeMasterId,
        payrollAreaCode: element.payrollAreaCode,
        businessCycleId: element.businessCycleId,
        cycle: element.cycle,
        areaMasterId: element.areaMasterId,
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
    console.log("ind", ind);
    console.log("u", u);
    let temp = this.getEmpTableList;
    this.getEmpTableList = new Array();
    let index = this.selectedUserEmp.findIndex(
      (o) => o.employeeMasterId == u.employeeMasterId
    );
    console.log("selectedUserEmp", this.selectedUserEmp);

    let isContain = this.selectedUserEmp.some(
      (o) => o.employeeMasterId == u.employeeMasterId
    );
    console.log("selectedUserEmp isContain", isContain);

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



  //OnCheck check box in area summary table On Check Area after click on  Lock button
  onCheckEmpInLock(checkValue, element, rowIndex) {
    // this.RowSelectedInLockEmp(element,rowIndex);
    console.log("rowIndex", rowIndex);
    console.log("checkValue Number", checkValue);
    if (checkValue) {

      // element.canPost = true;
      this.selectedUserInLockEmp.push(element);
      const data = {
        cycleLockEmployeeId: element.cycleLockEmployeeId,
        employeeMasterId: element.employeeMasterId,
        areaMasterId: element.areaMasterId,
        businessCycleId: element.businessCycleId,
        cycle: element.cycle,
        serviceName: element.serviceName,
        payrollAreaCode: element.payrollAreaCode,
        isActive: 1,
      }
      this.checkedFinalLockListEmp.push(data);
      console.log("checkedFinalLockListEmp", this.checkedFinalLockListEmp)
    } else {
      // element.canPost = false;
      const index = this.checkedFinalLockListEmp.indexOf((p) => (p.employeeMasterId == element.jobMasterValueId));
      this.checkedFinalLockListEmp.splice(index, 1);
      this.selectedUserInLockEmp.splice(index, 1);
    }
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
  }

  //Pending for lock

  //     selectedUserPending
  // pendingAreTableList
  // checkedSummaryListPending

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

  // doubleClickOnLeftTable(evt: any) {}

  //Area Table List
  //  getAreaFromPending(){
  //   this.lockService.getAllAreaTableList().subscribe((res) => {
  //     if(res.data.results.length > 0){
  //       this.pendingAreTableList = res.data.results[0];
  //       console.log("pendingAreTableList",this.pendingAreTableList)
  //     }
  //   });
  // }





  pendingForLockAsWhen() {
    this.lockService.pendingForLockArea().subscribe((res) => {
      this.pendingAreaList = res.data.results[0];
      console.log('pendingAreaList',
        this.pendingAreaList);
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

    // this.allAreaCodesEmp = [];
    // const selectedPayrollAreaCodes = this.empForm.get('employeeCode').value;
    // if (selectedPayrollAreaCodes.length > 0) {
    //   selectedPayrollAreaCodes.forEach((element) => {
    //     this.allAreaCodesEmp.push(element.code);
    //   });
    // } else {
    //   this.alertService.sweetalertWarning('Please select Employee Code');
    //   return false;
    // }



    // const data =  {
    //    companyName : this.empForm.get('companyName').value,
    //     serviceName: this.getServiceNameEmp(this.empForm.get('serviceName').value),
    //     payrollAreaCode:  this.getAreaCodesInEmp(this.empForm.get('areaMasterCode').value),
    //     // cycle: this.empForm.get('periodName').value,
    //     //  payrollAreaCode : this.empForm.get('areaMasterCode').value
    //       employeeMasterIdList : this.allAreaCodesEmp,
    //   }



    const cycleName = this.empForm.get('periodName').value;
    // const periodId = this.empForm.get('periodName').value;

    console.log("cycleName", cycleName)
    // console.log("periodId",periodId)

    this.lockService.getEmpListUsingCycleName(cycleName).subscribe((res) => {
      console.log("res", res);

      if (res) {
        if (res.data.results.length > 0) {
          this.getEmpTableList = res.data.results,
            console.log("getEmpTableList", this.getEmpTableList)
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
