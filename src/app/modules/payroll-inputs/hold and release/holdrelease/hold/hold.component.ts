import { Component, OnInit } from '@angular/core';
import { TemplateRef} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ServiceHoldService } from '../service-hold.service';
import { ExcelserviceService } from 'src/app/modules/excel_service/excelservice.service';
import {CheckboxModule} from 'primeng/checkbox';


interface City {
  name: string,
  code: string
}
interface User1 {
  srno;
  Date;
  Cheque;
  Amount;
  Attachment;
 
}
export interface emplist {
  empno;
  area;
  service;
  cmpnyname;
}
@Component({
  selector: 'app-hold',
  templateUrl: './hold.component.html',
  styleUrls: ['./hold.component.scss']
})
export class HoldComponent implements OnInit {
  cities: City[];
  users1: User1[];
  selectedCities: City[];
  public modalRef: BsModalRef;
  public holdform: any = FormGroup;
  public pendingForm: any = FormGroup;
  public lockEmpForm: any = FormGroup;
  public lockForm : any = FormGroup;
  // public empForm : any = FormGroup;
  public cycleDefinationList: Array<any> = [];
  public periodNameList: Array<any> = [];
  public cycleNameList:  Array<any> = [];
  public pendingAreTableList: Array<any> = [];
  public companyNames: Array<any> = [];

  public NameofCycleDefination: Array<any> = [];
  public companyNameList: Array<any> = [];
  public serviceNameList: Array<any> = [];
  public serviceNames: Array<any> = [];
  public ServiceAreaList: Array<any> = [];
  public areaSeriveList: Array<any> = [];
 public cycleDefinationListEmp: Array<any> = [];
  public NameofCycleDefinationEmp: Array<any> = [];
  public periodNameListEmp: Array<any> = [];
  public cycleNameListEmp: Array<any> = [];
  public companyNameListEmp:  Array<any> = [];
  public serviceNameListEmp:  Array<any> = [];
  public serviceNamesEmp:  Array<any> = [];
  public ServiceAreaListEmp: Array<any> = [];
 public areaSeriveListEmp: Array<any> = [];
 public employeeCodes: Array<any> = [];
 public employeeCodeList: Array<any> = [];
 public areTableListEmp: Array<any> = [];
 public areTableList: Array<any> = [];
  HighlightRow: number;
  public allAreaCodesEmp:  Array<any> = [];
  public allEmpSetList : Array<any> = [];
  public getEmpTableList : Array<any> = [];
  selectedUserEmp: Array<any> = [];
  public checkedFinalLockListEmp : Array<any> = [];
  public selectedUserInLockEmp: Array<any> = [];
  public checkedSummaryListEmp: Array<any> = [];
  
  public selectedAreaIdsEmp: Array<any> = [];
  excelDataEmp: any[];
  header: any[];
  excelDataEmpLock: any[];
  public summaryData: Array<any> = [];
  public empSetList: Array<any> = [];
  displayedColumns: string[];
  public serviceListData: any;
  public employeedata: Array<any> = [];
  empdataSource:  Array<any> = [];
  public empSetListtt: Array<any> = [];
  periodNameListEmp1: any[];
  cycleNameListEmp1: any;


 

  constructor(private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private holdService : ServiceHoldService,
    private alertService: AlertServiceService,
    private excelservice: ExcelserviceService,) {
     // this.reactiveAreaForm()
     this.reactiveEmpForm();
      this.lockReactiveForm();
      this.pendingReactiveForm();
      this.empLockReactiveForm();

//       this.holdform.setErrors({required: true});
//     this.holdform.valueChanges.subscribe(newValue => {
//     if(this.holdform.get('employeeCode').value || this.holdform.get('employeeSet').value){
//         this.holdform.setErrors(null);
//     } else {
//         this.holdform.setErrors({required: true});
//     } 
// });
     }

  ngOnInit(): void {


    this.getAllCycleDefinationEmp();
    this.getAllCompanyNameEmp();
    this.getAllServiceNameEmp();
    
  this.getSummaryData();
  this.getAllSetLists();
    // this.getAllServiceName()
    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];
  this.users1 = [
    { srno: '1', Date: 'Earning',Cheque:'AAA',Amount: 'bbb',Attachment:'AAA Desc' },


];
  }
  extralargepopup(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }
  Emplist(emplist: TemplateRef<any>) {
    this.holdform.get('employeeCode').disable();
    this.holdform.get('employeeSet').disable();

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



  // reactiveAreaForm() {
  //   this.holdform = this.formBuilder.group({
  //     cycleLockPayrollAreaId: new FormControl(0),
  //     areaMasterId: new FormControl(0),
  //     id: new FormControl(0),
  //     name: new FormControl('', Validators.required),
  //     businessCycleDefinitionId: new FormControl(null),
  //     periodName: new FormControl('', Validators.required),
  //     fromDate: new FormControl(''),
  //     toDate: new FormControl(''),
  //     // companyName : new FormControl ('', Validators.required),
  //     companyName: new FormControl('',Validators.required),
  //     serviceName: new FormControl('', Validators.required),
  //     groupCompanyId: new FormControl(''),
  //     serviceMasterId: new FormControl(''),
  //     areaMasterCode: new FormControl('', Validators.required),

  //   });
  //   console.log(this.holdform)
  // }

  reactiveEmpForm(){
    this.holdform = this.formBuilder.group({
      cycleLockPayrollAreaId: new FormControl(0),
      areaMasterId: new FormControl(0),
      id: new FormControl(0),
      release : new FormControl(''),
      name: new FormControl('', Validators.required),
      businessCycleDefinitionId: new FormControl(null),
      businessCycleId : new FormControl(null),
      periodName: new FormControl('', Validators.required),
      fromDate: new FormControl(''),
      toDate: new FormControl(''),
      companyName: new FormControl(''),
      serviceName: new FormControl('', Validators.required),
      groupCompanyId: new FormControl(''),
      serviceMasterId: new FormControl(''),
      //employeeCode: new FormControl(''),
     // employeeSet : new FormControl(''),
      areaMasterCode: new FormControl('', Validators.required),
      employeeCode: new FormControl({ value: "", disabled: false },),
      employeeSet: new FormControl({ value: "", disabled: false },),
      areaList: new FormControl({ value: "", disabled: false },),
      
      
     
    });
  }
  
  onSelectArea(evt){
    console.log(evt);
    if(evt.value.length >= 1){
      this.holdform.get('employeeSet').disable();
      this.holdform.get('areaList').disable();
    }
    else {
      this.holdform.get('employeeSet').enable();
      this.holdform.get('areaList').enable();
    }
   // console.log("employeeCodes", this.employeeCodes.length);
  }
  onSelectArea1(evt){
    console.log(evt);
    if(evt.value.length >= 1){
      this.holdform.get('employeeCode').disable();
      this.holdform.get('areaList').disable();
    }
    else {
      this.holdform.get('employeeCode').enable();
      this.holdform.get('areaList').enable();
    }
   // console.log("employeeCodes", this.employeeCodes.length);
  }
  onSelectArea2(evt){
    console.log(evt);
    if(evt.value.length >= 1){
      this.holdform.patchValue({
        employeeCode: ''
        //employeeSet: '',
      });

      this.holdform.get('employeeCode').disable();
      this.holdform.get('employeeSet').disable();
    }
    else {
      this.holdform.get('employeeCode').enable();
      this.holdform.get('employeeSet').enable();
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
           // value: element.businessYearDefinition.id,
           value : element.id
          };
          this.NameofCycleDefinationEmp.push(obj);
        });
      });
    }

    onChangeDefination(evt: any) {
      this.holdform.patchValue({
        fromDate: '',
        toDate: '',
      });
      if (evt == '') {
        this.periodNameList = [];
      } else {
        this.periodNameList = [];
        this.holdService.getAllCycleNames(evt).subscribe(
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

    onChangeDefinationEmp(evt: any) {
      this.holdform.patchValue({
        fromDate: '',
        toDate: '',
      });
      if (evt == '') {
        this.periodNameListEmp = [];
      } else {
        this.periodNameListEmp = [];
        this.holdService.getCycleNameInEmp(evt).subscribe(
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

    onSelectCycleName(evt: any) {
      if (evt != '') {
        this.cycleNameList.forEach((element) => {
          if (element.periodName == evt) {
            this.holdform.patchValue({
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
        this.holdform.patchValue({
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

    // getSetName(evt : any){
    //   this.holdService.getEmpSetName(evt).subscribe((res) => {
    //     this.empSetListtt = res.data.results[0];
    //     console.log('employeeSetName is', this.empSetListtt);

    // })
 // }
    resetEmpForm(){
      this.holdform.reset();
      this.holdform.patchValue({
        companyName : '',
        serviceName : '',
        periodName : '',
        name : '',
        employeeCode : '',
        
      })
      this.holdform.get('employeeCode').enable();
      this.holdform.get('employeeSet').enable();
      }

      getAreaTableSummaryListEmp(){
        this.holdService.getAllAreaTableList().subscribe((res) => {
          if(res.data.results.length > 0){
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
            console.log("areTableListEmp",this.areTableListEmp)
          }
        });
      }

      getAreaMasterIDEmp() {
        if (this.areaSeriveListEmp.length > 0) {
          return this.areaSeriveListEmp[0].areaMaster.areaMasterId;
        } else {
          return 0;
        }
      }
      
      
      //Get Business Cycle ID
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
      
      saveEmp() {
        this.allAreaCodesEmp = [];
        const selectedPayrollAreaCodes = this.holdform.get('employeeCode').value;
        this.allEmpSetList = []
        const selectedPayrollEmpSet = this.holdform.get('employeeSet').value;
        
        if (selectedPayrollAreaCodes.length > 0) {
          selectedPayrollAreaCodes.forEach((element) => {
            this.allAreaCodesEmp.push(element.code);
          });
        } else if(selectedPayrollEmpSet.length > 0) {
          selectedPayrollEmpSet.forEach((element) => {
            this.allEmpSetList.push(element.code);
          });
        } else{
         // this.alertService.sweetalertWarning('Please select Employee Code');
         
          return false;
      
        }
      
      
        const data = {
          areaMasterId: this.getAreaMasterIDEmp(),
          businessCycleId: this.getBusinessIDEmp(),
          cycle: this.holdform.get('periodName').value,
          release : this.holdform.get('release').value,
          companyName: this.getCompanyNameEmp(this.holdform.get('companyName').value),
          serviceName: this.getServiceNameEmp(this.holdform.get('serviceName').value),
          payrollAreaCode:  this.getAreaCodesInEmp(this.holdform.get('areaMasterCode').value),
        employeeMasterIdList:  this.allAreaCodesEmp,
        employeeMasterSetlist : this.allEmpSetList

      
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
      //  this.holdform.get('employeeCode').enable();
      //  this.holdform.get('employeeSet').enable();
       
       //this.employeeCodes = [];
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
          this.holdform.reset();
          this.lockEmpForm.patchValue({
            empCycleName: '',
            fromDate: '',
            toDate: '',
          });
      
        });
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
            release : 0
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
            isActive: 1,
             release : 0,
            // createDateTime : new Date(),
            // lastModifiedDateTime : null,
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
              release : 0
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
      
      exportExcelEmpTable(): void {
        this.excelDataEmp = [];
        this.header = []
        this.header =["employeeCode", "fullName", "companyName","payrollAreaCode","serviceName"];
        this.excelDataEmp = [];
        if(this.getEmpTableList.length>0){
         this.getEmpTableList.forEach((element) => {
          let obj = {
            employeeCode: element.employeeCode,
            fullName: element.fullName,
           // periodName : element.cycle,
            companyName: element.companyName,
           serviceName: element.serviceName,
            payrollAreaCode: element.payrollAreaCode,
          };
          this.excelDataEmp.push(obj);
        });
          console.log('this.excelDataEmp::', this.excelDataEmp);
        }
        this.excelservice.exportAsExcelFile(this.excelDataEmp, 'Employees-to-Lock', 'Employees-to-Lock' ,this.header);
        console.log('this.excelDataEmp::', this.excelDataEmp);
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
      

      exportExcelEmpLock(): void {
        this.excelDataEmpLock = [];
        this.header = []
        this.header =["employeeCode", "fullName", "companyName","payrollAreaCode","serviceName"];
        this.excelDataEmpLock = [];
        if(this.checkedSummaryListEmp.length>0){
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
        this.excelservice.exportAsExcelFile(this.excelDataEmpLock, 'Employee Lock', 'Employee Lock' ,this.header);
        console.log('this.excelDataEmpLock::', this.excelDataEmpLock);
      }
      
      resetEmpLock(){
        this.checkedSummaryListEmp = [];
        this.checkedFinalLockListEmp = [];
        this.modalRef.hide()
      
      }

      
      getSaveEmpCycleName(){
        if (this.holdform.invalid) {
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



   const cycleName = this.holdform.get('periodName').value;
   // const periodId = this.empForm.get('periodName').value;

 console.log("cycleName", cycleName)
 // console.log("periodId",periodId)

     this.holdService.getEmpListUsingCycleName(cycleName).subscribe((res) => {
       console.log("res", res);

       if (res) {
         if (res.data.results.length > 0) {
           this.getEmpTableList =  res.data.results,
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

   getSummaryData(){
    this.holdService.getSummaryData().subscribe((res) => {
      // this.summaryData = res.data.results[0];
        this.summaryData = res.data.results[0];
        console.log('summaryData is', this.summaryData);
        res.data.results[0].forEach((element) => {
          const obj = {
              // label: element.payrollAreaCode,
              // value: element.payrollAreaId,
            name: element.employeeSetName,
            code: element.employeeSetMasterId,
          };
          this.empSetList.push(obj);
        });
      }
      ,
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

  this.holdform.get('employeeCode').setValue(emp);
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

//employee set
getAllSetLists(){
  //Get Compnay API
 
    this.holdService.getAllSetLists().subscribe((res) => {
      this.allEmpSetList = res.data.results[0];
      console.log('allEmpSetList', this.allEmpSetList);
      res.data.results.forEach((element) => {
        const obj = {
          code: element.companyName,
          name: element.companyCode,
        };
        this.empSetList.push(obj);
      });
    });


}


// getSelectedEmployeeSet(event){
//   this.employeeSetData.forEach(element => {
//     if(element.employeeSetMasterId == event){
//      element.employeeSetMasterDetailsList.forEach(ele => {
//        this.empSetList.push(ele)
//      });
//     }
//   });

//   console.log("employeedata is: "+ JSON.stringify(this.employeeListData))
// }
    
  
}
