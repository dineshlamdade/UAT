import { Component, OnInit } from '@angular/core';
import { TemplateRef} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import { ExcelserviceService } from 'src/app/modules/excel_service/excelservice.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SortEvent } from 'primeng/api';
import { ServiceHoldService } from '../service-hold.service';

interface users1 {
  srno;
  ModePayment;
  BankName;
  BranchCode;
  AccountNo;
  PayeeName;
  NetPay;
  Amount;
  Priority;
  Clawback;
}


@Component({
  selector: 'app-release-new',
  templateUrl: './release-new.component.html',
  styleUrls: ['./release-new.component.scss']
})
export class ReleaseNewComponent implements OnInit {
  users1: users1[];
  public modalRef: BsModalRef;
  public releaseForm: any = FormGroup;
  public pendingForm: any = FormGroup;
  public lockEmpForm: any = FormGroup;
  public lockForm: any = FormGroup;
  public cycleDefinationListEmp : Array<any> = [];
  public NameofCycleDefinationEmp : Array<any> = [];
  public periodNameListEmp : Array<any> = [];
  public cycleNameListEmp : Array<any> = [];
  public companyNameListEmp : Array<any> = [];
  public companyNameList : Array<any> = [];
  public serviceNameListEmp : Array<any> = [];
  public serviceNamesEmp : Array<any> = [];
  public ServiceAreaListEmp : Array<any> = [];
  public areaSeriveListEmp : Array<any> = [];
  public areaSeriveList : Array<any> = [];
  public employeeCodes : Array<any> = [];
  public employeeCodeList : Array<any> = [];
  public summaryData : Array<any> = [];
  public empSetList : Array<any> = [];
  public allAreaCodesEmp : Array<any> = [];
  public getEmpTableList : Array<any> = [];
  public selectedAreaIdsEmp : Array<any> = [];
  public checkedSummaryListEmp : Array<any> = [];
  public selectedUserInLockEmp : Array<any> = [];
  public checkedFinalLockListEmp : Array<any> = [];
  HighlightRow: any;
  public selectedUserEmp : Array<any> = [];
  excelDataEmp: any[];
  header: any[];
  excelDataEmpLock: any[];
  public pendingLockList : Array<any> = [];
  public cycleNameList : Array<any> = [];
  excelData: any[];
  public selectedUserPending : Array<any> = [];
 public finalpendingLockList : Array<any> = [];
 public  checkedSummaryList : Array<any> = [];
 public checkedFinalLockList : Array<any> = [];
  pendingAreaList: any;
  public allEmpSetList: Array<any> = [];
  displayedColumns: string[];
  public employeedata:  Array<any> = [];
  public empdataSource:  Array<any> = [];
  periodNameList: Array<any> = [];
  empList: any;
// public finalpendingLockList: Array<any> = [];

  constructor(private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private holdService : ServiceHoldService,
    private alertService: AlertServiceService,
    private excelservice: ExcelserviceService) {
      this.reactiveEmpForm();
      this.pendingReactiveForm();
      this.empLockReactiveForm();
      this.lockReactiveForm();
     }

  ngOnInit(): void {
    this.getAllCycleDefinationEmp();
    this.getAllCompanyNameEmp();
    this.getAllServiceNameEmp();
    this.getSummaryData();
    this.pendingForLockAsWhen();
    this.getAllSetLists();
    this.users1 = [
      { srno: '1', ModePayment: 'AAA',BankName:'BBB',  BranchCode: 'CCC',AccountNo:'EEE',PayeeName:'FFF',NetPay:'ggg',Amount:'hhh',Priority:'iii',Clawback:'jjj'},
    
    
    ];
  }

  extralargepopup(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }
  Emplist(emplist: TemplateRef<any>) {
    this.releaseForm.get('employeeCode').disable();
    this.releaseForm.get('employeeSet').disable();

    this.modalRef = this.modalService.show(
      emplist,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  smallpopup(holdtemplate: TemplateRef<any>) {
    // this.modalRef = this.modalService.show(
    //   template,
    //   Object.assign({}, { class: 'gray modal-xl' })
    // );

    if(this.checkedSummaryListEmp.length > 0){
      this.modalRef = this.modalService.show(
        holdtemplate,
        Object.assign({}, { class: 'gray modal-xl' })
      );
     }

  }
  Areapendingforlockpopup(Areapendingforlock: TemplateRef<any>) {
    this.selectedUserPending = [];
    this.finalpendingLockList = [];

    this.modalRef = this.modalService.show(
      Areapendingforlock,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  reactiveEmpForm(){
    this.releaseForm = this.formBuilder.group({
      cycleLockPayrollAreaId: new FormControl(0),
      areaMasterId: new FormControl(0),
      id: new FormControl(0),
      name: new FormControl('', Validators.required),
      businessCycleDefinitionId: new FormControl(null),
      businessCycleId : new FormControl(null),
      periodName: new FormControl('', Validators.required),
      fromDate: new FormControl(''),
      toDate: new FormControl(''),
      companyName: new FormControl(''),
      release : new FormControl(''),
      serviceName: new FormControl('', Validators.required),
      groupCompanyId: new FormControl(''),
      serviceMasterId: new FormControl(''),
     // employeeCode: new FormControl(''),
      areaMasterCode: new FormControl('', Validators.required),
     // employeeSet : new FormControl('')
      employeeCode: new FormControl({ value: "", disabled: false },),
      employeeSet: new FormControl({ value: "", disabled: false },),
      areaList: new FormControl({ value: "", disabled: false },),
    });
  }

  onSelectArea(evt){
    console.log(evt);
    if(evt.value.length >= 1){
      this.releaseForm.get('employeeSet').disable();
      this.releaseForm.get('areaList').disable();
    }
    else {
      this.releaseForm.get('employeeSet').enable();
      this.releaseForm.get('areaList').enable();
    }
   // console.log("employeeCodes", this.employeeCodes.length);
  }
  onSelectArea1(evt){
    console.log(evt);
    if(evt.value.length >= 1){
      this.releaseForm.get('employeeCode').disable();
      this.releaseForm.get('areaList').disable();
    }
    else {
      this.releaseForm.get('employeeCode').enable();
      this.releaseForm.get('areaList').enable();
    }
   // console.log("employeeCodes", this.employeeCodes.length);
  }
  onSelectArea2(evt){
    console.log(evt);
    if(evt.value.length >= 1){
      this.releaseForm.get('employeeCode').disable();
      this.releaseForm.get('employeeSet').disable();
    }
    else {
      this.releaseForm.get('employeeCode').enable();
      this.releaseForm.get('employeeSet').enable();
    }
   // console.log("employeeCodes", this.employeeCodes.length);
  }

  pendingReactiveForm(){
    this.pendingForm = this.formBuilder.group({
     pendingCycleName: new FormControl(''),
     fromDate: new FormControl(''),
     toDate: new FormControl(''),
    })
   }
 
     empLockReactiveForm(){
     this.lockEmpForm = this.formBuilder.group({
       empCycleName: new FormControl(''),
      fromDate: new FormControl(''),
      toDate: new FormControl(''),
     })
    }
 
 
   lockReactiveForm(){
     this.lockForm = this.formBuilder.group({
      lockCycleName: new FormControl(''),
      fromDate: new FormControl(''),
      toDate: new FormControl(''),
     })
    }

    getAllCycleDefinationEmp() {
      this.holdService.getAllCycleData().subscribe((res) => {
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

    onChangeDefination(evt: any) {
      this.releaseForm.patchValue({
        fromDate: '',
        toDate: '',
      });
      if (evt == '') {
        this.periodNameList = [];
      } else {
        this.periodNameList = [];
        this.holdService.getAllCycleNames1(evt).subscribe(
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

    onSelectCycleName(evt: any) {
      if (evt != '') {
        this.cycleNameList.forEach((element) => {
          if (element.periodName == evt) {
            this.releaseForm.patchValue({
              fromDate: new Date(element.fromDate),
              toDate: new Date(element.toDate),
            });
            this.lockEmpForm.patchValue({
              empCycleName : evt,
              fromDate: new Date(element.fromDate),
              toDate: new Date(element.toDate),
            });
          }
        });
      } else {
        this.releaseForm.patchValue({
          fromDate: '',
          toDate: '',
        });
        this.lockEmpForm.patchValue({
          fromDate: '',
          toDate: '',
        });
      }
    }
    
    getAllCompanyNameEmp() {
      this.holdService.getAllCompanysName().subscribe((res) => {
        this.companyNameListEmp = res.data.results;
        console.log('companyNameListEmp', this.companyNameListEmp);
        res.data.results.forEach((element) => {
          const obj = {
            label: element.companyName,
            value: element.groupCompanyId,
          };
          this.companyNameList.push(obj);
        });
      });
    }

    getAllServiceNameEmp() {
      this.holdService.getAllServicesName().subscribe((res) => {
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

    onSelectServiceNameEmp(evt: any) {
      if(evt == '1'){
       if (evt == '') {
         this.ServiceAreaListEmp = [];
       } else {
         this.ServiceAreaListEmp = [];
         this.holdService.getAreawServicesName(evt).subscribe(
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
         this.holdService.getAreawServicesName(evt).subscribe(
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


     onSelectAreaInEmp(evt: any) {
      // this.empForm.patchValue({
      //   areaMasterCode: '',
      // });
    
      if (evt == '') {
        this.employeeCodes = [];
      } else {
        this.employeeCodes = [];
        this.holdService.getEmpCode(evt).subscribe((res) => {
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

    resetEmpForm(){
      this.releaseForm.reset();
      this.releaseForm.patchValue({
        companyName : '',
        serviceName : '',
        periodName : '',
        name : '',
        employeeCode : '',
      })
      this.releaseForm.get('employeeCode').enable();
      this.releaseForm.get('employeeSet').enable();
      }

      getSummaryData(){
        this.holdService.getSummaryData().subscribe((res) => {
          // this.summaryData = res.data.results[0];
            this.summaryData = res.data.results[0];
            console.log('summaryData', this.summaryData);
            res.data.results[0].forEach((element) => {
              const obj = {
                  // label: element.payrollAreaCode,
                  // value: element.payrollAreaId,
                name: element.employeeSetName,
                code: element.employeeSetMasterId,
              };
              this.empSetList.push(obj);
            });
          },
          (error: any) => {
            this.alertService.sweetalertError(
              error['error']['status']['message']
            );
          }
        //  console.log('summary data is',this.summaryData)
         
        //  ,error => {
        // // //   // if(error.error.status.code == ''){
        // // //      //this.toaster.success( 'Duplicate Area Set Name' );
        // // //     // this.alertService.sweetalertError('Dulicate Areaset');
        // // //     // this.areasetForm.controls['areaSetName'].reset();
    
        // // //   // }
        // setTimeout(()=>{
        //    this.summaryData = []
        //  },200)
         
        //  }
         )
        } 

        //go button and save data
        saveEmp() {
          this.allAreaCodesEmp = [];
          const selectedPayrollAreaCodes = this.releaseForm.get('employeeCode').value;
          if (selectedPayrollAreaCodes.length > 0) {
            selectedPayrollAreaCodes.forEach((element) => {
              this.allAreaCodesEmp.push(element.code);
            });
          }
           else {
           // this.alertService.sweetalertWarning('Please select Employee Code');
            return false;
          }
        
        
          const data = {
            areaMasterId: this.getAreaMasterIDEmp(),
            businessCycleId: this.getBusinessIDEmp(),
            cycle: this.releaseForm.get('periodName').value,
            release : this.releaseForm.get('release').value,
            companyName: this.getCompanyNameEmp(this.releaseForm.get('companyName').value),
            serviceName: this.getServiceNameEmp(this.releaseForm.get('serviceName').value),
            payrollAreaCode:  this.getAreaCodesInEmp(this.releaseForm.get('areaMasterCode').value),
            employeeMasterIdList:  this.allAreaCodesEmp
        
          };
        
        
          this.holdService.postEmpForm(data).subscribe((res: any) => {
            if(res){
             if(res.data.results.length > 0) {
              this.getEmpTableList = res.data.results;
              console.log("getEmpTableList", this.getEmpTableList);
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
        // this.holdform.reset();
        //  this.holdform.patchValue({
        //   companyName : '',
        //   serviceName : '',
        //   periodName : '',
        //   name : '',
        //   employeeCode : '',
        //   areaMasterCode : '',
        // })
        }
        
        getAreaMasterIDEmp() {
          if (this.areaSeriveListEmp.length > 0) {
            return this.areaSeriveListEmp[0].areaMaster.areaMasterId;
          } else {
            return 0;
          }
        }
        getBusinessIDEmp() {
          if (this.cycleNameList.length > 0) {
            return this.cycleNameList[0].id;
          } else {
            return 0;
          }
        }
        getCompanyNameEmp(serviceCode: any) {
          const toSelect = this.companyNameListEmp.find(
            (element) => element.groupCompanyId == serviceCode
          );
          return toSelect.companyName;
          console.log('toSelect', toSelect);
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
            (element) => element.payrollAreaId == payrollAreaCode
          );
          return toSelect.payrollAreaCode;
          console.log('toSelect', toSelect);
        }
        
        RowSelectedEmp(u: any, ind: number) {
          this.HighlightRow = ind;
          console.log("ind",ind);
          console.log("u",u);
          let temp = this.getEmpTableList;
          this.getEmpTableList = new Array();
          let index = this.selectedUserEmp.findIndex(
            (o) => o.employeeMasterId == u.employeeMasterId
          );
          console.log("selectedUserEmp",this.selectedUserEmp);
        
          let isContain = this.selectedUserEmp.some(
            (o) => o.employeeMasterId == u.employeeMasterId
          );
          console.log("selectedUserEmp isContain",isContain);
        
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
        
  
        onCheckAreaEmp(checkValue, element, rowIndex){
          this.RowSelectedEmp(element, rowIndex);
          if(checkValue){
            this.selectedAreaIdsEmp.push(element.employeeMasterId);
            // this.checkedFinalLockListEmp.push(element.businessCycleId);
            const data = {
              serviceName : element.serviceName,
              cycleLockEmployeeId : element.cycleLockEmployeeId,
              employeeMasterId : element.employeeMasterId,
              payrollAreaCode : element.payrollAreaCode,
              businessCycleId : element.businessCycleId,
              cycle : element.cycle,
              areaMasterId : element.areaMasterId,
              // createDateTime : new Date(),
              // lastModifiedDateTime : null,
              isActive: 1,
              release : 1,
              employeeCode : element.employeeCode,
              fullName : element.fullName,
              companyName : element.companyName,
              canPost : true,
            };
            this.checkedSummaryListEmp.push(data);
            console.log("checkedSummaryListEmp",this.checkedSummaryListEmp)
            this.selectedUserInLockEmp.push(data);
        
            const data1 = {
                serviceName : element.serviceName,
                cycleLockEmployeeId : element.cycleLockEmployeeId,
                employeeMasterId : element.employeeMasterId,
                payrollAreaCode : element.payrollAreaCode,
                businessCycleId : element.businessCycleId,
                cycle : element.cycle,
                areaMasterId : element.areaMasterId,
                // createDateTime : new Date(),
                // lastModifiedDateTime : null,
                isActive: 1,
                release : 1
            }
            this.checkedFinalLockListEmp.push(data1);
          }
          else {
            const index = this.checkedSummaryListEmp.indexOf((item) => (item.employeeMasterId == element.employeeMasterId));
            this.checkedSummaryListEmp.splice(index, 1);
            this.selectedUserInLockEmp.splice(index, 1);
            const index1 = this.checkedFinalLockListEmp.indexOf((item) => (item.employeeMasterId == element.employeeMasterId));
            this.checkedFinalLockListEmp.splice(index1, 1);
            this.selectedAreaIdsEmp.splice(index1, 1);
        
          }
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


exportExcelEmpTable(): void {
  this.excelDataEmp = [];
  this.header = []
  this.header =["employeeCode", "fullName", "companyName","payrollAreaCode"];
  this.excelDataEmp = [];
  if(this.getEmpTableList.length>0){
   this.getEmpTableList.forEach((element) => {
    let obj = {
      employeeCode: element.employeeCode,
      fullName: element.fullName,
      companyName: element.companyName,
     // serviceName: element.serviceName,
      payrollAreaCode: element.payrollAreaCode,
    };
    this.excelDataEmp.push(obj);
  });
    console.log('this.excelDataEmp::', this.excelDataEmp);
  }
  this.excelservice.exportAsExcelFile(this.excelDataEmp, 'Employees-to-Lock', 'Employees-to-Lock' ,this.header);
  console.log('this.excelDataEmp::', this.excelDataEmp);
}

saveCheckedEmp(){

  if(this.checkedFinalLockListEmp.length == 0){
    return;
  }
  const data =  this.checkedFinalLockListEmp

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


  this.holdService.postLockCheckedEmp(data).subscribe((res) =>{
    if(res){
      if(res.data.results) {
        //  this.getAreaTableSummaryList();
        this.alertService.sweetalertMasterSuccess( res.status.message, '' );
      } else {
        this.alertService.sweetalertWarning(res.status.messsage);
      }
    }else {
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
    this.releaseForm.reset();
    this.lockEmpForm.patchValue({
      empCycleName: '',
      fromDate: '',
      toDate: '',
    });

  });
}

exportExcelEmpLock(): void {
  this.excelDataEmpLock = [];
  this.header = []
  this.header =["employeeCode", "fullName", "companyName","payrollAreaCode"];
  this.excelDataEmpLock = [];
  if(this.checkedSummaryListEmp.length>0){
   this.checkedSummaryListEmp.forEach((element) => {
    let obj = {
      employeeCode: element.employeeCode,
      fullName: element.fullName,
      companyName: element.companyName,
     // serviceName: element.serviceName,
      payrollAreaCode: element.payrollAreaCode,
    };
    this.excelDataEmpLock.push(obj);
  });
    console.log('this.excelDataEmpLock::', this.excelDataEmpLock);
  }
  this.excelservice.exportAsExcelFile(this.excelDataEmpLock, 'Employee Lock', 'Employee Lock' ,this.header);
  console.log('this.excelDataEmpLock::', this.excelDataEmpLock);
}

resetEmpLock(){
  this.checkedSummaryListEmp = [];
  this.checkedFinalLockListEmp = [];
  this.modalRef.hide()

}

onCheckEmpInLock(checkValue, element, rowIndex) {
  // this.RowSelectedInLockEmp(element,rowIndex);
  console.log("rowIndex",rowIndex);
  console.log("checkValue Number", checkValue);
  if(checkValue) {

    // element.canPost = true;
    this.selectedUserInLockEmp.push(element);
    const data = {
      cycleLockEmployeeId : element.cycleLockEmployeeId,
      employeeMasterId: element.employeeMasterId,
      areaMasterId: element.areaMasterId,
      businessCycleId: element.businessCycleId,
      cycle: element.cycle,
      serviceName: element.serviceName,
      payrollAreaCode :  element.payrollAreaCode,
      isActive : 1,
      release : 1
    }
    this.checkedFinalLockListEmp.push(data);
    console.log("checkedFinalLockListEmp", this.checkedFinalLockListEmp)
  } else {
    // element.canPost = false;
     const index = this.checkedFinalLockListEmp.indexOf((p) => (p.employeeMasterId = element.jobMasterValueId));
    this.checkedFinalLockListEmp.splice(index, 1);
    this.selectedUserInLockEmp.splice(index, 1);
  }
}


// onSelectCycleName(evt: any) {
//   if (evt != '') {
//     // this.holdService.pendingLockEmptyArea(evt).subscribe((res) =>{
//     //   console.log("pendingLockEmptyArea",res);
//     //   this.pendingLockList = res.data.results[0];
//     //});
//     this.cycleNameList.forEach((element) => {
//       if (element.periodName == evt) {
//         this.releaseForm.patchValue({
//           fromDate: new Date(element.fromDate),
//           toDate: new Date(element.toDate),
//           cycleNamePending : element.periodName,
//         });
//         this.pendingForm.patchValue({
//           pendingCycleName : evt,
//           fromDate: new Date(element.fromDate),
//           toDate: new Date(element.toDate),
//         });
//          this.lockForm.patchValue({
//           lockCycleName : evt,
//           fromDate: new Date(element.fromDate),
//           toDate: new Date(element.toDate),
//         });

//       }
//     });

//   } else {
//     this.releaseForm.patchValue({
//       fromDate: '',
//       toDate: '',
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

//   }
// }

exportApprovalSummaryAsExcel(): void {
  this.excelData = [];
  this.header = []
  this.header =["employeeCode","payrollAreaCode", "cycle"];
  this.excelData = [];
  if(this.pendingLockList.length>0){
   this.pendingLockList.forEach((element) => {
    let obj = {
      employeeCode : element.employeeCode,
      fullName: element.fullName,
      companyName: element.companyName,
      payrollAreaCode: element.payrollAreaCode,
      serviceName: element.serviceName,
      cycle : element.cycle
    };
    this.excelData.push(obj);
  });
    console.log('this.excelData::', this.excelData);
  }
  this.excelservice.exportAsExcelFile(this.excelData, 'Area-to-Lock', 'Area-to-Lock' ,this.header);
  console.log('this.excelData::', this.excelData);
}

// RowSelectedPending(u: any, ind: number) {
//   this.HighlightRow = ind;

//   let temp = this.pendingLockList;
//   this.pendingLockList = new Array();
//   let index = this.selectedUserPending.findIndex(
//     (o) => o.businessCycleId
//     == u.businessCycleId

//   );
//   let isContain = this.selectedUserPending.some(
//     (o) => o.businessCycleId
//     == u.businessCycleId

//   );
//   if (isContain == true) {
//     this.selectedUserPending.splice(index, 1);
//   } else {
//     this.selectedUserPending.push(u);
//   }

//   this.pendingLockList = temp;

//   this.pendingLockList.forEach((element, i) => {
//     if (i == this.HighlightRow) {
//       element.isHighlightright = false;
//       if (isContain == true) {
//         element.isHighlight = false;
//       } else {
//         if (i == this.HighlightRow) {
//           element.isHighlight = true;
//         }
//       }
//     }
//   });
// }

onCheckedPendigLock(checkValue, element) {
  if(checkValue){
    this.finalpendingLockList.push(element.businessCycleId);
  } else {
     const index = this.finalpendingLockList.indexOf((p) => (p.businessCycleId = element.businessCycleId));
    this.finalpendingLockList.splice(index, 1);
  }
}
//Pending for lock On Row Selection
inPendingForLock(checkValue, element, rowIndex) {
  // this.RowSelectedPendingforLock(element, rowIndex);
  if (checkValue) {
    this.selectedUserPending.push(element.businessCycleId);
    // const obj ={
    //   areaMasterId:element.areaMasterId,
    //   cycle : element.cycle,
    //   companyName :element.companyName,
    //   payrollAreaCode : element.payrollAreaCode,
    //   isActive : element.isActive,
    //   businessCycleId : element.businessCycleId,
    //   empList : element.empList

    // }
    this.finalpendingLockList.push(element.employeeMasterId);
   // this.finalpendingLockList.push(obj);
   // this.selectedUserPending.push(obj);
  } else {
    const index = this.finalpendingLockList.indexOf(
      (p) => (p.businessCycleId == element.businessCycleId)
    );
    this.finalpendingLockList.splice(index, 1);

    const index1 = this.pendingLockList.indexOf(
      (p) => (p.businessCycleId == element)
    );
    this.selectedUserPending.splice(index1, 1);
  }
}

//Reset Lock
resetLock(){
  this.checkedSummaryList = [];
  this.checkedFinalLockList = [];
  this.modalRef.hide()

}
resetPendingLock(){
  this.pendingLockList = [];
  this.finalpendingLockList = [];
  this.modalRef.hide()
}



pendingLockProceed(){
 // const data = [{empList : this.finalpendingLockList}]
  const data = {empList : this.finalpendingLockList}
 

  // this.finalpendingLockList
  this.holdService.postPendingAreaLock(data).subscribe((res) =>{

    if(res){
      if(res.data.results) {
        this.alertService.sweetalertMasterSuccess( res.status.message, '' );
        this.finalpendingLockList.forEach(element => {
          const index = this.pendingLockList.indexOf(
            (p) => (p.businessCycleId == element)
          );
          this.pendingLockList.splice(index, 1);
          // this.selectedUserPending.splice(index, 1);
        });

        this.finalpendingLockList = [];
        this.selectedUserPending = [];
      } else {
        this.alertService.sweetalertWarning(res.status.messsage);
      }
    }else {
      this.alertService.sweetalertError(
        'Something went wrong. Please try again.'
      );
    }
    this.modalRef.hide();
    this.finalpendingLockList = [];
    this.selectedUserPending = [];
  //  this.modalRef.hide();
    //this.pendingLockList = [];
        this.releaseForm.reset();
        this.releaseForm.patchValue({
          companyName : '',
          serviceName : '',
          periodName : '',
          name : '',
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

pendingForLockAsWhen() {

  this.holdService.pendingForLockArea().subscribe((res) => {
    this.pendingAreaList = res.data.results[0];
    console.log('pendingAreaList',
    this.pendingAreaList);
    res.data.results[0].forEach((element) => {
      const obj = {
        employeeCode :element.employeeCode,
        businessCycleId: element.businessCycleId,
        employeeMasterId: element.employeeMasterId,
        holdEmployeeId: element.holdEmployeeId,
        areaMaster: element.areaMaster.areaMasterCode,
        cycle : element.cycle,
        isActive : element.isActive,
        release : element.release,
        //processingCycleId: element.processingCycleId,
        payrollAreaCode: element.payrollAreaCode,
        serviceName : element.areaMaster.serviceMaster.serviceName,
        
        

      };
      this.pendingLockList.push(obj);
    });
  });
}
// allCheckUncheck(checkValue){
//   if(checkValue){
//   this.pendingLockList.forEach((element) => {
//     this.selectedUserPending.push(element.processingCycleId);
//     this.finalpendingLockList.push(element.processingCycleId);
//   });
//   }else {
//     this.pendingLockList.forEach((element) => {
//     const index = this.finalpendingLockList.indexOf(
//       (p) => (p.processingCycleId == element.processingCycleId));
//     this.finalpendingLockList.splice(index, 1);

//     const index1 = this.pendingLockList.indexOf(
//       (p) => (p.processingCycleId == element)
//     );
//     this.selectedUserPending.splice(index1, 1);
//   });
//   }
// }

//click on Check All In Pending for lock add and remove element from array
allCheckUncheck(checkValue){
  if(checkValue){
  this.pendingLockList.forEach((element) => {
    this.selectedUserPending.push(element.holdEmployeeId);
    this.finalpendingLockList.push(element.holdEmployeeId);
  });
  }else {
    this.pendingLockList.forEach((element) => {
    const index = this.finalpendingLockList.indexOf(
      (p) => (p.holdEmployeeId == element.holdEmployeeId));
    this.finalpendingLockList.splice(index, 1);

    const index1 = this.pendingLockList.indexOf(
      (p) => (p.holdEmployeeId == element)
    );
    this.selectedUserPending.splice(index1, 1);
  });
  }
}

getAllSetLists(){
  //Get Compnay API
 
    this.holdService.getAllSetLists().subscribe((res) => {
      this.allEmpSetList = res.data.results[0];
      console.log('allEmpSetList', this.allEmpSetList);
      // res.data.results.forEach((element) => {
      //   const obj = {
      //     code: element.companyName,
      //     name: element.companyCode,
      //   };
      //   this.empSetList.push(obj);
      // });
    });


}

//emp list radio button//
employeeListPasteData(event: ClipboardEvent) {
  let clipboardData = event.clipboardData;
  let pastedText = clipboardData.getData('text');
  let row_data = pastedText.split('\n');
  // this.displayedColumns = row_data[0].split('\t');
  // this.displayedColumns = ["employeeCode", "employeeName"]
  this.displayedColumns = ["employeeCode"]
let emp=[];
for(let i= 0;i<row_data.length;i++){
  let data=row_data[i].replace('\r','');
  if(data!=''){
const employee=this.employeeCodeList.find(a=>a.label ==data)
let obj=employee?.value;

emp.push(obj)
}
}

  this.releaseForm.get('employeeCode').setValue(emp);
  //this.excelData=row_data;
  //this.excelData1=row_data;

  //delete row_data[0];
  // Create table dataSource
  row_data.forEach(row_data => {
    let row = {};
    this.displayedColumns.forEach((a, index) => {
      row[a] = row_data.split('\t')[index]
    });
    // console.log(row)
    this.employeedata.push(row);
  })
  this.empdataSource = this.employeedata;
  this.empdataSource.splice(this.empdataSource.length-1,1)

  console.log("Before: " + JSON.stringify(this.empdataSource));
  
  this.employeeCodeList.forEach(element => {
    this.empdataSource.forEach(emp => {
      let empcode = emp.employeeCode.split('\r')
      if(element.employeeCode+',' == empcode){
        emp.employeeMasterId = element.employeeMasterId
        emp.fullName = element.fullName 
      }
    });
  });
  console.log("After: " + JSON.stringify(this.empdataSource));
}





}
