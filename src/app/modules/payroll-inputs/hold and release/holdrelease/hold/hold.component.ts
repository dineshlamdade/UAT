import { Component, OnInit } from '@angular/core';
import { TemplateRef} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ServiceHoldService } from '../service-hold.service';
import { ExcelserviceService } from 'src/app/modules/excel_service/excelservice.service';

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
  public getEmpTableList : Array<any> = [];
  selectedUserEmp: Array<any> = [];
  public checkedFinalLockListEmp : Array<any> = [];
  public selectedUserInLockEmp: Array<any> = [];
  public checkedSummaryListEmp: Array<any> = [];
  
  public selectedAreaIdsEmp: Array<any> = [];
  excelDataEmp: any[];
  header: any[];
  excelDataEmpLock: any[];


 

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
     }

  ngOnInit(): void {


    this.getAllCycleDefinationEmp();
    this.getAllCompanyNameEmp();
    this.getAllServiceNameEmp()
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
      name: new FormControl('', Validators.required),
      businessCycleDefinitionId: new FormControl(null),
      periodName: new FormControl('', Validators.required),
      fromDate: new FormControl(''),
      toDate: new FormControl(''),
      companyName: new FormControl(''),
      serviceName: new FormControl('', Validators.required),
      groupCompanyId: new FormControl(''),
      serviceMasterId: new FormControl(''),
      employeeCode: new FormControl(''),
      areaMasterCode: new FormControl('', Validators.required),
    });
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

    onSelectCycleNameEmp(evt: any) {
      if (evt != '') {
        this.cycleNameListEmp.forEach((element) => {
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

    resetEmpForm(){
      this.holdform.reset();
      this.holdform.patchValue({
        companyName : '',
        serviceName : '',
        periodName : '',
        name : '',
        employeeCode : '',
      })
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
        if (this.cycleNameListEmp.length > 0) {
          return this.cycleNameListEmp[0].id;
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
          cycle: this.holdform.get('periodName').value,
          companyName: this.getCompanyNameEmp(this.holdform.get('companyName').value),
          serviceName: this.getServiceNameEmp(this.holdform.get('serviceName').value),
          payrollAreaCode:  this.getAreaCodesInEmp(this.holdform.get('areaMasterCode').value),
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
       this.holdform.reset();
       this.holdform.patchValue({
        companyName : '',
        serviceName : '',
        periodName : '',
        name : '',
        employeeCode : '',
        areaMasterCode : '',
      })
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
          // this.selectedAreaIdsEmp.splice(index1, 1);
      
        }
      }
      
      
      exportExcelEmpTable(): void {
        this.excelDataEmp = [];
        this.header = []
        this.header =["employeeCode", "fullName", "companyName","serviceName", "payrollAreaCode"];
        this.excelDataEmp = [];
        if(this.getEmpTableList.length>0){
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
        this.header =["employeeCode", "fullName", "companyName","serviceName", "payrollAreaCode"];
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
      
      
  
}
