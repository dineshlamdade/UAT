import { element } from 'protractor';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  TemplateRef,
} from '@angular/core';
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

  public typeList: Array<any> = [];
  public cycleNameList: Array<any> = [];
  public compnaysList: Array<any> = [];
  // public goAsandWhenList: Array<any> = [];
  public selectedUserPending: Array<any> = [];

  public summaryList: Array<any> = [];
  public summaryTableList: Array<any> = [];
  public cycleNames: Array<any> = [];
  public gocycleNames: Array<any> = [];
  public goCycleNameList: Array<any> = [];
  public goAsandWhenList: Array<any> = [];

  public cycle: Array<any> = [];
  public checkedSummaryList: Array<any> = [];
  public allAreaCodes: Array<any> = [];
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


  @ViewChild('username') username: ElementRef;
  radioModel = 'Middle';
  areaSection = true;
  employeeSection = false;
  users2: User2[];
  public form: any = FormGroup;
  excelDataPendingForLock: any[];

  constructor(
    private modalService: BsModalService,
    private alertService: AlertServiceService,
    private excelservice: ExcelserviceService,
    private formBuilder: FormBuilder,
    private lockService: LockService,
    private datePipe: DatePipe
  ) {
    this.typeList = [
      { label: 'Supplementry Cycle', value: 'Supplementry' },
      { label: 'As & When Cycle', value: 'As & When' },
    ];
  }

  ngOnInit(): void {
    this.getLockTable();
    this.asAndWhenForm();
    this.getCompnay();

    this.pendingForLockAsWhen();
  }

  //Reactive Form
  asAndWhenForm() {
    this.form = this.formBuilder.group({
      companyName: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      periodName: new FormControl('', Validators.required),
      startDate: new FormControl(''),
      endDate: new FormControl(''),

    });
  }

  //Get Compnay API
  getCompnay() {
    this.lockService.getCompnays().subscribe((res) => {
      this.companyNameList = res.data.results;
      console.log('companyNameList', this.companyNameList);
      res.data.results.forEach((element) => {
        const obj = {
          label: element.companyName,
          value: element.companyCode,
        };
        this.compnaysList.push(obj);
      });
    });
  }

  //Get API Cycle lock table list
  getLockTable() {
    // this.lockService.getAsAndWhenType().subscribe((res) => {
    //   this.getLockTableDataList = res.data.results[0];
    //   this.goAsandWhenList.forEach((element, i) => {
    //     if (i == this.HighlightRow) {
    //       element.isHighlightright = false;
    //     }
    //   });
    //   console.log('getLockTableDataList', this.getLockTableDataList);
    //   res.data.results[0].forEach((element) => {
    //     const obj = {
    //       companyName: element.companyName,
    //       serviceName: element.serviceName,
    //       type: element.type,
    //       cycle: element.cycle,
    //       createDateTime: new Date(element.createDateTime),
    //       fromDate: new Date(element.fromDate),
    //       toDate: new Date(element.toDate),
    //       businessCycleId: element.businessCycleId,
    //     };

    //     this.goAsandWhenList.push(obj);
    //   });



    // });
  }

  //On Chenge  defination
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
          console.log('cycleNameList And from , to Date ', this.cycleNameList);
          this.cycleNameList.forEach((element) => {
            const obj = {
              label: element.periodName,
              value: element.periodId,
            };
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



  //on Change Cycle Name get the From date and to Date
  onSelectCycleName(evt: any) {
    if (evt != '') {
      this.cycleNameList.forEach((element) => {
        if (element.periodId == evt) {
          this.form.patchValue({
            startDate: new Date(element.fromDate),
            endDate: new Date(element.toDate),

          });
          // this.form.patchValue( { shortName: evt.target.value } );
        }
      });
    } else {
      this.form.patchValue({
        startDate: '',
        endDate: '',
      });
    }
  }
  //Get Go Cycle Name
  getTypeAndID(){

    if (this.form.invalid) {
      return;
    }

    const supplimentrType = this.form.get('type').value;
    const periodId = this.form.get('periodName').value;

  console.log("supplimentrType", supplimentrType)
  console.log("periodId",periodId)

      this.lockService.getGoCycleName(supplimentrType, periodId).subscribe((res) => {
        console.log("res", res);

        if (res) {
          if (res.data.results.length > 0) {
            this.goAsandWhenList =  res.data.results[0],
            console.log("goAsandWhenList", this.goAsandWhenList)
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


  //Save Supplementr click on lock PopUp
  save() {

    const data =
      {
        businessCycleIdsList: this.checkedFinalLockList,
      };

    this.lockService.postAsAndWhen(data).subscribe((res) => {
      if (res) {
        if (res.data.results) {
          this.getLockTable();
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
      this.goAsandWhenList = [];
      this.checkedSummaryList = [];
      this.selectedUser = [];
      this.getLockTable();
      this.form.reset();
      this.form.patchValue({
        companyName : '',
        periodName : '',
        type : '',
        startDate : '',
        endDate : '',
      })
    });

  }

// Save Pending for Lock PopUp
  savePenidngForLock() {

    const data =
      {
        businessCycleIdsList: this.finalpendingLockList,
      };
    this.lockService.postAsAndWhen(data).subscribe((res) => {
      if (res) {
        if (res.data.results) {
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
      this.form.reset();
      this.form.patchValue({
        companyName : '',
        periodName : '',
        type : '',
        startDate : '',
        endDate : '',
      })
    });

  }

  //Reset  the form

  resetForm() {
    this.form.reset();
    this.form.patchValue({
      companyName: '',
      type: '',
      periodName: '',
      startDate: '',
      endDate: '',
    });
  }

  //Check box  Select in the summary table
  onCheckArea(checkValue, element, rowIndex) {
    this.RowSelected(element, rowIndex);
    if (checkValue) {
      const data = {
        companyName: element.companyName,
        serviceName: element.serviceName,
        type: element.type,
        cycle: element.cycle,
        createDateTime: new Date(element.createDateTime),
        fromDate: new Date(element.fromDate),
        toDate: new Date(element.toDate),
        businessCycleId: element.businessCycleId,
      };
      this.checkedSummaryList.push(data);
      console.log('checkedSummaryList', this.checkedSummaryList);
    } else {
      const index = this.checkedSummaryList.indexOf(
        (item) => item.businessCycleId == element.businessCycleId
      );
      this.checkedSummaryList.splice(index, 1);
      console.log('checkedSummaryList', this.checkedSummaryList);
    }
  }

  doubleClickOnLeftTable(evt: any) {}

  //Row select in table
  RowSelected(u: any, ind: number) {
    this.HighlightRow = ind;
    let temp = this.goAsandWhenList;
    this.goAsandWhenList = new Array();
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
    this.goAsandWhenList = temp;
    this.goAsandWhenList.forEach((element, i) => {
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
    this.header = [];
    this.header = [
      'companyName',
      'serviceName',
      'type',
      'cycle',
      'createDateTime',
      'fromDate',
      'toDate',
    ];
    this.excelData = [];
    if (this.goAsandWhenList.length > 0) {
      // this.employeeList = this.employeeList.filter((emp)=>this.psidList.some((p)=>p.psid=emp.proofSubmissionId));
      //this.employeeList =  this.areTableList;
      this.goAsandWhenList.forEach((element) => {
        let obj = {
          companyName: element.companyName,
          serviceName: element.serviceName,
          type: element.type,
          cycle: element.cycle,
          createDateTime: new Date(element.createDateTime),
          fromDate: new Date(element.fromDate),
          toDate: new Date(element.toDate),
          businessCycleId: element.businessCycleId,
        };
        this.excelData.push(obj);
      });
      console.log('this.excelData::', this.excelData);
    }
    this.excelservice.exportAsExcelFile(
      this.excelData,
      'Cycles to Lock',
      'Cycles to Lock',
      this.header
    );
    console.log('this.excelData::', this.excelData);
  }

  //Excel pending for lock
  AsWhenExportApprovalSummaryAsExcel(): void {
    this.excelDataAsAndWhen = [];
    this.header = [];
    this.header = [
      'companyName',
      'serviceName',
      'type',
      'cycle',
      'createDateTime',
      'fromDate',
      'toDate',
    ];
    this.excelDataAsAndWhen = [];
    if (this.checkedSummaryList.length > 0) {
      // this.employeeList = this.employeeList.filter((emp)=>this.psidList.some((p)=>p.psid=emp.proofSubmissionId));
      //this.employeeList =  this.areTableList;
      this.checkedSummaryList.forEach((element) => {
        let obj = {
          companyName: element.companyName,
          serviceName: element.serviceName,
          type: element.type,
          cycle: element.cycle,
          createDateTime: new Date(element.createDateTime),
          fromDate: new Date(element.fromDate),
          toDate: new Date(element.toDate),
          businessCycleId: element.businessCycleId,
        };
        this.excelDataAsAndWhen.push(obj);
      });
      console.log('this.excelDataAsAndWhen::', this.excelDataAsAndWhen);
    }
    this.excelservice.exportAsExcelFile(
      this.excelDataAsAndWhen,
      'As & When /Supplementry Cycle Lock',
      'As & When /Supplementry Cycle Lock',
      this.header
    );
    console.log('this.excelDataAsAndWhen::', this.excelDataAsAndWhen);
  }

  exportApprovalPendingForLock(): void {
    this.excelDataPendingForLock = [];
    this.header = [];
    this.header = [
      'companyName',
      'serviceName',
      'type',
      'cycle',
      'createDateTime',
      'fromDate',
      'toDate',
    ];
    this.excelDataPendingForLock = [];
    if (this.pendingLockList.length > 0) {
      // this.employeeList = this.employeeList.filter((emp)=>this.psidList.some((p)=>p.psid=emp.proofSubmissionId));
      //this.employeeList =  this.areTableList;
      this.pendingLockList.forEach((element) => {
        let obj = {
          companyName: element.companyName,
          serviceName: element.serviceName,
          type: element.type,
          cycle: element.cycle,
          createDateTime: new Date(element.createDateTime),
          fromDate: new Date(element.fromDate),
          toDate: new Date(element.toDate),
          businessCycleId: element.businessCycleId,
        };
        this.excelDataPendingForLock.push(obj);
      });
      console.log(
        'this.excelDataPendingForLock::',
        this.excelDataPendingForLock
      );
    }
    this.excelservice.exportAsExcelFile(
      this.excelDataPendingForLock,
      'Pending for lock',
      'Pending for lock',
      this.header
    );
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
    if (this.checkedSummaryList.length > 0) {
      this.modalRef = this.modalService.show(
        template2,
        Object.assign({}, { class: 'gray modal-lg' })
      );
    }
  }

  //On Check Cycle lock poup Check box
  //OnCheck check box in area summary table On Check Area after click on  Lock button
  onCheckAreaInLock(checkValue, element, rowIndex) {


    this.RowSelectedInLock(element, rowIndex);
    if (checkValue) {
      this.checkedFinalLockList.push(element.businessCycleId);
    } else {
      const index = this.checkedFinalLockList.indexOf(
        (p) => (p.businessCycleId = element.businessCycleId)
      );
      this.checkedFinalLockList.splice(index, 1);
    }
  }

  //Pending for lock On Row Selection
  inPendingForLock(checkValue, element, rowIndex) {
    this.RowSelectedPendingforLock(element, rowIndex);
    if (checkValue) {
      this.finalpendingLockList.push(element.businessCycleId);
    } else {
      const index = this.finalpendingLockList.indexOf(
        (p) => (p.businessCycleId = element.businessCycleId)
      );
      this.finalpendingLockList.splice(index, 1);
    }
  }

  //Reset Cycle table
  resetLock() {
    this.checkedSummaryList = [];
    this.checkedFinalLockList = [];
    this.selectedUserAsAndWhen = [];
    this.modalRef.hide();
  }

  //Reset Pending for lock  table
  resetPendingForLock() {
    this.pendingLockList = [];
    this.finalpendingLockList = [];
    this.selectedUserPending = [];
    this.modalRef.hide();
  }

  //Pending for lock
  pendingForLockAsWhen() {
    this.lockService.pendingForLockAsWhen().subscribe((res) => {
      this.pendingForLockList = res.data.results[0];
      console.log('pendingForLockList', this.pendingForLockList);
      res.data.results[0].forEach((element) => {
        const obj = {
          cycleLockAsAndWhenAndSuppTempId:
            element.cycleLockAsAndWhenAndSuppTempId,
          businessCycleId: element.businessCycleId,
          payrollAreaCode: element.payrollAreaCode,
          payrollAreaId: element.payrollAreaId,
          areaMasterId: element.areaMasterId,
          cycle: element.cycle,
          type: element.type,
          serviceName: element.serviceName,
          companyName: element.companyName,
          createDateTime: element.createDateTime,
          fromDate: element.fromDate,
          toDate: element.toDate,
          isActive: element.isActive,
          isChecked: element.isChecked,
        };
        this.pendingLockList.push(obj);
      });
    });
  }

  Aswhen2(aswhen2: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      aswhen2,
      Object.assign({}, { class: 'gray modal-lg' })
    );
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
}
