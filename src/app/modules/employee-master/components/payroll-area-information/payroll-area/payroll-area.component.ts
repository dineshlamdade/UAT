import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SortEvent } from 'primeng/api';
import { max } from 'rxjs/operators';
import { SharedInformationService } from '../../../employee-master-services/shared-service/shared-information.service';
import { PayrollAreaInformationService } from '../payroll-area-information.service';

@Component({
  selector: 'app-payroll-area',
  templateUrl: './payroll-area.component.html',
  styleUrls: ['./payroll-area.component.scss']
})
export class PayrollAreaComponent implements OnInit {

  form: FormGroup;
  //payrollInfo = new PayrollAreaRequestModel('', '', '', '', '', '', '', '', '');
  payrollAreaInformationId: any;
  summaryData: Array<any> = [];
  payrollType = 'Primary Main,Primary Additional,Secondary'.split(',');
  copyPayrollType='Primary Main,Primary Additional,Secondary'.split(',');
  payrollAreaList: Array<any> = [];
  fromDateValidation: any;
  primaryMainAvailabe: Array<any>=[];
  employeeId: any;
  viewFlag:boolean;
  primaryPayrollList: Array<any> = [];
  copyPayrollAreaList: Array<any> = [];
  additionalPayrollAllowed: any = false;
  toDateValidation: any;
  latestPrimary: any;
  constructor(
    private payrollService: PayrollAreaInformationService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private CommonDataService: SharedInformationService

  ) { }

  ngOnInit(): void {
    this.getInitialData();
    this.getPayrollAreaInfo();
    this.getGridSummaryData();
    this.payrollAreaInformationId = '';
  }
  getInitialData() {
   
    this.form = this.formBuilder.group({
      payrollAreaInformationId: new FormControl(''),
      payrollAreaId: new FormControl(''),
      payrollAreaCode: new FormControl('', Validators.required),
      description: new FormControl(''),
      type: new FormControl('', Validators.required),
      primaryAreaName: new FormControl(''),
      payrollAreaFromDate: new FormControl('', Validators.required),
      payrollAreaToDate: new FormControl('', Validators.required),
      employeeMasterId: new FormControl(''),
      additionalPayrollAllowed: new FormControl('')
    });
    console.log('status', this.form.invalid);

  }

  // this.users1 = [
  //   { srno: '1', payrollarea: 'AAA',description:'BBB',  type: 'CCC',primaryareaname :'DDD',fromdate:'EEE',todate:'FFF',action:'ggg'},


  // ];s



  getPayrollAreaInfo(): void {
    this.employeeId = localStorage.getItem('employeeMasterId');
    this.payrollAreaList = [];
    this.payrollService.getPayrollAreaDetails().subscribe((res) => {
      this.payrollAreaList = res.data.results;
      this.primaryPayrollList = this.payrollAreaList;
      this.copyPayrollAreaList = res.data.results;
      console.log(this.payrollAreaList)
      this.form.get('employeeMasterId').setValue(this.employeeId)
    })
  }

  getGridSummaryData() {
    // const employeeMasterId = localStorage.getItem('employeeMasterId');
    this.payrollService.getPayrollAreaInformation(this.employeeId).subscribe((res => {
      this.summaryData = res.data.results[0];
      console.log(this.summaryData);

      this.removePrimaryArea();
    }))
  }

  changepayrollCode() {
    if (this.form.get('payrollAreaCode').value == null || this.form.get('payrollAreaCode').value == '') {
      this.form.get('description').setValue(null);
      this.form.reset();
      this.getInitialData();
    } else {
      // this.form.reset();
      // this.getInitialData();
      const toSelect = this.payrollAreaList.find((a) => a.payrollAreaCode === this.form.get('payrollAreaCode').value)
      this.form.get('description').setValue(toSelect.payrollAreaDescription);
      this.form.get('payrollAreaId').setValue(toSelect.payrollAreaId);
      this.fromDateValidation = new Date(toSelect.effectiveFromDate);
      this.toDateValidation = new Date(toSelect.effectiveToDate);
      const code = toSelect.payrollAreaId;
      // remove primary area list from the dropdown if 
      if (code) {
        this.primaryPayrollList = this.primaryPayrollList.filter(item => item.payrollAreaId !== code);
      }
      /// if first time to set payroll area to employee then set type to Primary Main default
      if (this.summaryData.length == 0) {
        this.form.get('type').setValue('Primary Main');
        const joiningDate = new Date(localStorage.getItem('joiningDate'))
        const formFromDate = toSelect.effectiveFromDate > joiningDate ? toSelect.effectiveFromDate : joiningDate;
        this.form.get('payrollAreaFromDate').setValue(formFromDate);
        this.form.get('payrollAreaToDate').setValue(toSelect.effectiveToDate);
        this.form.get('type').disable();
        this.form.get('primaryAreaName').disable();
      }
    }
  }

  public addPayrollAreaInfo(formData: any): void {

    console.log('save called');
    const data = this.form.getRawValue();
    data.employeeMasterId = this.employeeId;
    data.additionalPayrollAllowed = this.additionalPayrollAllowed;
    data.payrollAreaFromDate = this.datePipe.transform(data.payrollAreaFromDate, 'dd-MMM-yyyy');
    data.payrollAreaToDate = this.datePipe.transform(data.payrollAreaToDate, 'dd-MMM-yyyy');
    console.log(data);


    this.payrollService.postPayrollAreaInfoForm(data).subscribe(res => {

      this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);

      this.form.get('type').enable();
      this.form.get('primaryAreaName').enable();
      this.form.reset();
      this.form.markAsPristine();
      this.getInitialData();
      this.getGridSummaryData();

      // if (this.form.invalid) {
      //   return;
      // }
    }
      , (error: any) => {
        this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
      })
  }

  editPayroll(payroll: any) {
    //add primary main to payrollType while updating 
    if(this.viewFlag==true){
    this.viewFlag=false;
    this.form.enable();
    this.form.get('description').disable();
    }
    //check Primary main is available in payrolltype or not 
    const typeAvailable = this.payrollType.find(a => a === 'Primary Main')
    if (payroll.type === 'Primary Main' && !typeAvailable) {
      this.payrollType.push('Primary Main');
    }
    const payrollAvailable = this.payrollAreaList.find(item => item.payrollAreaId === payroll.payrollAreaId)
    if (!payrollAvailable) {
      this.payrollAreaList = this.copyPayrollAreaList;
//remove secondary an daddtial payroll from payroll Area List
if(payroll.type==='Primary Main'){
    let arr:Array<any> =  this.summaryData.filter(a=>a.type!=='Primary Main');
     this.payrollAreaList = this.payrollAreaList.filter(ar => !arr.find(rm => (rm.payrollAreaId === ar.payrollAreaId) ))
  // this.payrollAreaList=listRemaining;
}
    }
    this.form.patchValue(payroll);
    if(payroll.type==='Primary Main'){
      this.form.get('primaryAreaName').disable();
    }
    this.form.get('payrollAreaFromDate').setValue(new Date(payroll.payrollAreaFromDate));
    this.form.get('payrollAreaToDate').setValue(new Date(payroll.payrollAreaToDate));

    console.log('status',this.form.invalid)
  }

  removePrimaryArea() {
    this.primaryMainAvailabe = this.summaryData.filter(a => a.type  === 'Primary Main');

    const maxDate = new Date(Math.max.apply(null,
      this.primaryMainAvailabe
      .map(x => new Date(x.payrollAreaFromDate))));

    this.latestPrimary = this.primaryMainAvailabe.find(a=>a.payrollAreaFromDate === this.datePipe.transform(maxDate, 'dd-MMM-yyyy'))
    if ( this.latestPrimary) {
      //remove type if primary main is already used
      this.payrollType = this.payrollType.filter(item => item !== this.latestPrimary.type);

      // remove primary payroll from payroll Area list if it is already is primary
      this.payrollAreaList = this.payrollAreaList.filter(item => item.payrollAreaId !== this.latestPrimary.payrollAreaId)

      //primary AreaList
      this.primaryPayrollList = this.summaryData.filter(a => a.type === 'Primary Main');
    }
  }

  deletePayroll(payrolllAreaInformationId){
    this.payrollService.deletePayrollAreaGridItem(payrolllAreaInformationId).subscribe(res=>{
      this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
    }, (error: any) => {
      this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
    })
  }

  viewPayroll(payroll){
    this.payrollAreaList=this.copyPayrollAreaList;
    this.viewFlag=true;
    this.payrollType=this.copyPayrollType;
    this.form.patchValue(payroll);
    this.form.disable();
  }
changePrimaryAreaName(){
  const toSelect = this.summaryData.filter(c=>c.payrollAreaCode===this.form.get('primaryAreaName').value)
  if(toSelect){
    this.fromDateValidation=new Date(toSelect[0].payrollAreaFromDate);
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


}
