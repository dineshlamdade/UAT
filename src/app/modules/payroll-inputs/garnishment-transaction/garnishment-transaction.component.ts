import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { GarnishmentService } from '../garnishment-master/garnishment.service';
import { NonRecurringAmtService } from '../non-recurring-amt.service';
import { PayrollInputsService } from '../payroll-inputs.service';


@Component({
  selector: 'app-garnishment-transaction',
  templateUrl: './garnishment-transaction.component.html',
  styleUrls: ['./garnishment-transaction.component.scss']
})
export class GarnishmentTransactionComponent implements OnInit {
  public modalRef: BsModalRef;
  payrollListEmpData: any;
  employeeData: any;
  selectedEmployeeMasterId: number;
  employeeFinDetailsData: any;
  garnishmentMasterData: any;
  today: any;
  refralPayrollListData: any;
  applicationForm: FormGroup;
  selectedGarnishmentData: any;
  address: any;
  nature: any;
  edHead: any;
  familyMembers: any;
  garnishmentMasterTransactionTypeList: any = [];
  garnishmentMasterInputTypeList: any = [];
  garnishmentMasterDocumentList: any = [];
  garnishmentMasterFrequencyList: any = [];
  selectedTransactionType: any = '';
  selectedToDate: any = '';
  selectedFromDate: any = '';
  tempScheduleData: any;
  applicationSummaryData: any;
  applicationData: any;
  garnishmentApplicationMasterId: any;
  applicationHistoryData:any;
  viewSchedulesData: any;
  allSchedulesData: any;
  viewFlag: boolean = false;
  editFlag: boolean = false;
  editApplicationData: any;
  employeeList: any = '';
  selectedInputType: any;

  constructor(private modalService: BsModalService, private payrollservice: PayrollInputsService,
    private garnishmentservice: GarnishmentService, private nonRecService: NonRecurringAmtService,
    private alertService: ToastrService,
    private datepipe: DatePipe) {

    if (localStorage.getItem('payrollListEmpData') != null) {
      this.payrollListEmpData = JSON.parse(localStorage.getItem('payrollListEmpData'))
      // localStorage.removeItem('payrollListEmpData')
      this.getAllEmployeeDetails();
      this.getSelectedEmployeeCode(this.payrollListEmpData[0].employeeMasterId)
    }


    this.applicationForm = new FormGroup({
    "garnishmentApplicationMasterId": new FormControl(''),
      "employeeMasterId": new FormControl(""),
      "garnishmentMasterId": new FormControl(""),
      "payrollAreaId": new FormControl(""),
      "garnishmentMasterFrequencyId": new FormControl(""),
      "garnishmentMasterTransactionTypeId": new FormControl(""),
      "garnishmentMasterInputTypeId": new FormControl(""),
      "referenceName": new FormControl(""),
      "onceEvery": new FormControl(1),
      "applicationDate": new FormControl(""),
      "applicationStatus": new FormControl(""),
      "fromDate": new FormControl(""),
      "toDate": new FormControl(""),
      "percentage": new FormControl(""),
      "amount": new FormControl(""),
      "goalAmount": new FormControl(""),
      "goalBalanceAmount": new FormControl(""),
      "numberOfTransactions": new FormControl(""),
      "remark": new FormControl(""),
      "isActive": new FormControl(1)
    })
  }

  /** Get all  Employee data */
  getAllEmployeeDetails(): void {
    this.payrollservice.getAllEmployeeDetails().subscribe((res) => {
      this.employeeData = res.data.results[0];
    });
  }

  /** Get Selected Employee master Id */
  getSelectedEmployeeCode(value) {
    this.selectedEmployeeMasterId = parseInt(value)

    this.garnishmentservice.employeeFinDetails(this.selectedEmployeeMasterId).subscribe(
      res => {
        this.employeeFinDetailsData = res.data.results[0][0];
      }
    )
  }


  public UploadModal(template3: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template3,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  ngOnInit(): void {
    this.getAllEmployeeData()
    this.today = this.datepipe.transform(new Date(), 'dd-MMM-yyyy')
    this.getAllGarnishmentMaster()
    this.getEmployeePayrollArea()
    this.getApplicationSummary()
  }

  /** Get Employee List */
  getAllEmployeeData(){
    this.payrollservice.getAllEmployeeDetails().subscribe((res) => {
      this.employeeList = res.data.results[0];
    });
  }

  /** Get Payroll Area Data by Employee */
  getEmployeePayrollArea() {
    this.nonRecService.getEmployeeWisePayrollList(this.selectedEmployeeMasterId).subscribe(
      res => {
        this.refralPayrollListData = res.data.results[0];
      })
  }

  /** Garnishment Master data */
  getAllGarnishmentMaster() {
    this.garnishmentservice.getAllGarnishmentMaster().subscribe(res => {
      this.garnishmentMasterData = res.data.results;
    })
  }

  /** Get Application Summary Data */
  getApplicationSummary() {
    this.garnishmentservice.getApplicationSummary().subscribe(res => {
      this.applicationSummaryData = res.data.results
    })
  }

  /** Get Selected Garnishment Value */
  getSelectedGarnishment(garnishmentMasterId) {
    this.garnishmentMasterData.forEach(element => {
      if (element.garnishmentMasterId == garnishmentMasterId) {
        this.selectedGarnishmentData = element
      }
    });

    console.log("this.selectedGarnishmentData : " + JSON.stringify(this.selectedGarnishmentData))

    this.address = this.selectedGarnishmentData.address1 + ',' + this.selectedGarnishmentData.address2 + ',' + this.selectedGarnishmentData.address3
    this.nature = this.selectedGarnishmentData.nature
    this.edHead = this.selectedGarnishmentData.headMasterId
    if (this.selectedGarnishmentData.familyMember == false) {
      this.familyMembers = 'false'
    } else {
      this.familyMembers = 'true'
    } 


    this.garnishmentMasterTransactionTypeList = this.selectedGarnishmentData.garnishmentMasterTransactionTypeList
    this.garnishmentMasterInputTypeList = this.selectedGarnishmentData.garnishmentMasterInputTypeList
    this.garnishmentMasterDocumentList = this.selectedGarnishmentData.garnishmentMasterDocumentList
    this.garnishmentMasterFrequencyList = this.selectedGarnishmentData.garnishmentMasterFrequencyList

    this.selectedGarnishmentData.garnishmentMasterInputTypeList.forEach(element => {
      if(element.defaultInput == true){
        this.selectedInputType = element.inputTypeName
      }
    });

    if(this.editFlag){
        this.applicationForm.controls['garnishmentMasterFrequencyId'].setValue(this.editApplicationData.garnishmentMasterFrequencyResponseDTO.garnishmentMasterFrequencyId)
        this.applicationForm.controls['garnishmentMasterTransactionTypeId'].setValue(this.editApplicationData.garnishmentMasterTransactionTypeResponseDTO.garnishmentMasterTransactionTypeId)
        this.applicationForm.controls['garnishmentMasterInputTypeId'].setValue(this.editApplicationData.garnishmentMasterInputTypeResponseDTO.garnishmentMasterInputTypeId)

      
    }

  }

  getSelectedGarnishmentData(garnishment){

  }

  getTransactionTypeForSave(transactionId) {
    this.garnishmentMasterTransactionTypeList.forEach(element => {
      if (element.garnishmentMasterTransactionTypeId == transactionId) {
        this.selectedTransactionType = element.transactionTypeName
      }
    });

    let todate = ''
    if (this.selectedTransactionType == 'NoOfTransaction') {
      this.applicationForm.controls['numberOfTransactions'].setValue(1)
      todate = ''
      this.selectedToDate = ''
    } else if (this.selectedTransactionType == 'Perpetual') {
      todate = '9999-12-31'
      this.selectedToDate = this.datepipe.transform('31-12-9999', 'dd-MMM-yyyy')
    } else {
      todate = this.selectedToDate
    }

    this.applicationForm.controls['toDate'].setValue(todate)
  }


  getFromDateForSave(event) {
    let fromdate = ''
    this.selectedFromDate = this.datepipe.transform(new Date(event), 'dd-MMM-yyyy')

    fromdate = this.datepipe.transform(new Date(event), 'yyyy-MM-dd')
    this.applicationForm.controls['fromDate'].setValue(fromdate)

  }

  getToDateForSave(event) {
    let todate = ''
    this.selectedToDate = this.datepipe.transform(new Date(event), 'dd-MMM-yyyy')

    todate = this.datepipe.transform(new Date(event), 'yyyy-MM-dd')
    this.applicationForm.controls['toDate'].setValue(todate)

  }

  /** Save application */
  saveApplication() {
    let today = new Date()
    let applicationDate = ''
    applicationDate = this.datepipe.transform(new Date(today), 'yyyy-MM-dd')
    this.applicationForm.controls['applicationDate'].setValue(applicationDate)
    this.applicationForm.controls['employeeMasterId'].setValue(this.selectedEmployeeMasterId)
    this.applicationForm.controls['payrollAreaId'].setValue(parseInt(this.applicationForm.controls['payrollAreaId'].value))
    this.applicationForm.controls['percentage'].setValue(parseInt(this.applicationForm.controls['percentage'].value))
    this.applicationForm.controls['amount'].setValue(parseInt(this.applicationForm.controls['amount'].value))
    this.applicationForm.controls['goalAmount'].setValue(parseInt(this.applicationForm.controls['goalAmount'].value))
    this.applicationForm.controls['goalBalanceAmount'].setValue(parseInt(this.applicationForm.controls['goalBalanceAmount'].value))
    this.applicationForm.controls['numberOfTransactions'].setValue(parseInt(this.applicationForm.controls['numberOfTransactions'].value))
    this.applicationForm.controls['garnishmentMasterFrequencyId'].setValue(parseInt(this.applicationForm.controls['garnishmentMasterFrequencyId'].value))
    this.applicationForm.controls['garnishmentMasterId'].setValue(parseInt(this.applicationForm.controls['garnishmentMasterId'].value))
    this.applicationForm.controls['garnishmentMasterInputTypeId'].setValue(parseInt(this.applicationForm.controls['garnishmentMasterInputTypeId'].value))
    this.applicationForm.controls['garnishmentMasterTransactionTypeId'].setValue(parseInt(this.applicationForm.controls['garnishmentMasterTransactionTypeId'].value))
    this.applicationForm.removeControl('isActive')
    this.applicationForm.removeControl('garnishmentApplicationMasterId')
    
    console.log("save application : " + JSON.stringify(this.applicationForm.value))

    this.garnishmentservice.saveApplication(this.applicationForm.value).subscribe(res => {
      this.alertService.success("Application data Saved successfully")
      this.editFlag = false;
      this.viewFlag = false;
      this.getApplicationSummary()
      // this.applicationForm.addControl('garnishmentApplicationMasterId','validator')
      this.applicationForm.reset()
    })
  }

  /** Update application */
  updateApplication() {
    let today = new Date()
    let applicationDate = ''
    applicationDate = this.datepipe.transform(new Date(today), 'yyyy-MM-dd')
    this.applicationForm.controls['applicationDate'].setValue(applicationDate)
    this.applicationForm.controls['employeeMasterId'].setValue(this.selectedEmployeeMasterId)
    this.applicationForm.controls['payrollAreaId'].setValue(parseInt(this.applicationForm.controls['payrollAreaId'].value))
    this.applicationForm.controls['percentage'].setValue(parseInt(this.applicationForm.controls['percentage'].value))
    this.applicationForm.controls['amount'].setValue(parseInt(this.applicationForm.controls['amount'].value))
    this.applicationForm.controls['goalAmount'].setValue(parseInt(this.applicationForm.controls['goalAmount'].value))
    this.applicationForm.controls['goalBalanceAmount'].setValue(parseInt(this.applicationForm.controls['goalBalanceAmount'].value))
    this.applicationForm.controls['numberOfTransactions'].setValue(parseInt(this.applicationForm.controls['numberOfTransactions'].value))
    this.applicationForm.controls['garnishmentMasterFrequencyId'].setValue(parseInt(this.applicationForm.controls['garnishmentMasterFrequencyId'].value))
    this.applicationForm.controls['garnishmentMasterId'].setValue(parseInt(this.applicationForm.controls['garnishmentMasterId'].value))
    this.applicationForm.controls['garnishmentMasterInputTypeId'].setValue(parseInt(this.applicationForm.controls['garnishmentMasterInputTypeId'].value))
    this.applicationForm.controls['garnishmentMasterTransactionTypeId'].setValue(parseInt(this.applicationForm.controls['garnishmentMasterTransactionTypeId'].value))
    this.applicationForm.removeControl('isActive')
    this.applicationForm.controls['garnishmentApplicationMasterId'].setValue(this.garnishmentApplicationMasterId)
    console.log("save application : " + JSON.stringify(this.applicationForm.value))

    this.garnishmentservice.updateApplication(this.applicationForm.value).subscribe(res => {
      this.alertService.success("Application data Updated successfully")
      this.getApplicationSummary()
      this.applicationForm.reset()
    })
  }


  /** Edit application */
  editApplication(data){
    this.editFlag = true;
    this.viewFlag = false;

    const formData = new FormData();
    formData.append('garnishmentApplicationMasterId', data.garnishmentApplicationMasterId)

    this.garnishmentApplicationMasterId = data.garnishmentApplicationMasterId

    this.garnishmentservice.getapplicationDataById(formData).subscribe(res => {
      this.editApplicationData = res.data.results[0];
      this.applicationForm.controls['payrollAreaId'].setValue(this.editApplicationData.payrollArea.payrollAreaId)
      this.applicationForm.controls['garnishmentMasterId'].setValue(this.editApplicationData.garnishmentMasterFrequencyResponseDTO.garnishmentMasterId)
      this.getSelectedGarnishment(this.editApplicationData.garnishmentMasterFrequencyResponseDTO.garnishmentMasterId)
      this.applicationForm.enable()
      this.applicationForm.patchValue(this.editApplicationData)
    })
  }

  /** View application */
  viewApplication(data){
    this.editFlag = false;
    this.viewFlag = true;

    const formData = new FormData();
    formData.append('garnishmentApplicationMasterId', data.garnishmentApplicationMasterId)

    this.garnishmentservice.getapplicationDataById(formData).subscribe(res => {
      this.editApplicationData = res.data.results[0];
      this.applicationForm.patchValue(this.editApplicationData)
      this.applicationForm.disable()
    })
  }

  /** application data by id */
  getapplicationDataById(data) {
    const formData = new FormData();
    formData.append('garnishmentApplicationMasterId', data)
    this.garnishmentservice.getApplicationHistoryById(formData).subscribe(res => {
      this.applicationData = res.data.results;
    })
  }


  /** get Application History By Id */
  viewApplicationHistoryData(template2: TemplateRef<any>,data) {
    this.modalRef = this.modalService.show(
      template2,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.garnishmentApplicationMasterId = data.garnishmentApplicationMasterId
    this.getApplicationHistoryById()
  }

  getApplicationHistoryById() {
    const formData = new FormData();
    formData.append('garnishmentApplicationMasterId', this.garnishmentApplicationMasterId)

    this.garnishmentservice.getApplicationHistoryById(formData).subscribe(res => {
      this.applicationHistoryData = res.data.results;
    })
  }


  resetData(){
    this.applicationForm.reset();
    this.applicationForm.enable();
    this.editFlag = false
    this.viewFlag = false
  }
  

  /********************************* Schedule Functions *******************/

  /** get Temp schedule data */
  schedulepopup(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.getTempScheduleData()
  };

  getTempScheduleData() {
    let today = new Date()
    let applicationDate = ''
    applicationDate = this.datepipe.transform(new Date(today), 'yyyy-MM-dd')
    this.applicationForm.controls['applicationDate'].setValue(applicationDate)
    this.applicationForm.controls['employeeMasterId'].setValue(this.selectedEmployeeMasterId)
    this.applicationForm.controls['payrollAreaId'].setValue(parseInt(this.applicationForm.controls['payrollAreaId'].value))
    this.applicationForm.controls['percentage'].setValue(parseInt(this.applicationForm.controls['percentage'].value))
    this.applicationForm.controls['amount'].setValue(parseInt(this.applicationForm.controls['amount'].value))
    this.applicationForm.controls['goalAmount'].setValue(parseInt(this.applicationForm.controls['goalAmount'].value))
    this.applicationForm.controls['goalBalanceAmount'].setValue(parseInt(this.applicationForm.controls['goalBalanceAmount'].value))
    this.applicationForm.controls['numberOfTransactions'].setValue(parseInt(this.applicationForm.controls['numberOfTransactions'].value))
    this.applicationForm.controls['garnishmentMasterFrequencyId'].setValue(parseInt(this.applicationForm.controls['garnishmentMasterFrequencyId'].value))
    this.applicationForm.controls['garnishmentMasterId'].setValue(parseInt(this.applicationForm.controls['garnishmentMasterId'].value))
    this.applicationForm.controls['garnishmentMasterInputTypeId'].setValue(parseInt(this.applicationForm.controls['garnishmentMasterInputTypeId'].value))
    this.applicationForm.controls['garnishmentMasterTransactionTypeId'].setValue(parseInt(this.applicationForm.controls['garnishmentMasterTransactionTypeId'].value))
    this.applicationForm.controls['isActive'].setValue(1)

    this.garnishmentservice.getTempSchedule(this.applicationForm.value).subscribe(res => {
      this.tempScheduleData = res.data.results;
    })

    console.log("temp schedule data is: " + JSON.stringify(this.tempScheduleData))
  }

  /**get View schedule data history */
  viewScheduleData(template1: TemplateRef<any>, data) {
    this.modalRef = this.modalService.show(
      template1,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.garnishmentApplicationMasterId = data.garnishmentApplicationMasterId
    this.getScheduleHistoryById()
  }

  getScheduleHistoryById() {
    const formData = new FormData();
    formData.append('garnishmentApplicationMasterId', this.garnishmentApplicationMasterId)
    this.garnishmentservice.getScheduleHistoryById(formData).subscribe(res => {
      this.viewSchedulesData = res.data.results;
    })
  }

  /** Get Schedule All Data */
  getApplicationScheduleData() {
    this.garnishmentservice.getApplicationScheduleData().subscribe(res => {
      this.allSchedulesData = res.data.results;
    })
  }

}
