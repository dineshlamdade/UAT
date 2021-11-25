import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { GarnishmentService } from '../garnishment-master/garnishment.service';
import { NonRecurringAmtService } from '../non-recurring-amt.service';
import { PayrollInputsService } from '../payroll-inputs.service';

@Component({
  selector: 'app-fastentry-garnishment',
  templateUrl: './fastentry-garnishment.component.html',
  styleUrls: ['./fastentry-garnishment.component.scss']
})
export class FastentryGarnishmentComponent implements OnInit {

  public modalRef: BsModalRef;
  selectedPayrollArea: any = '';
  headData: any[];
  parollArea: any[];
  selectedOnceEvery: any = 1;
  selectedFrequency: any = 'Monthly';
  selectedTransactionType: any = 'NoOfTransaction';
  selectedNoOfTransaction: any = 1;
  headMasterId: any = null;
  tableData: any[];
  selectedClawBack: any;
  selectedAmount: any;
  selectedRemark: any;
  selectedFromDate: any = '';
  selectedToDate: any = '';
  setMinToDate: any;
  effectiveFromDate: any;
  effectiveToDate: any;
  headGroupDefinitionId: any;
  frequencyDataByPayroll: any;
  saveTransactionData: any = [];
  saveTransactionType: any = 'NoOfTransaction';
  saveNumberTransaction: any = 1;
  saveToDate: any = '';
  saveFromDate: any;
  saveClawback: any = '';
  saveAmount: any;
  saveRemark: any;
  headDescription: any;
  employeeData: any;
  employeeName: any;
  employeeMasterId: any;
  employeeCode: any;
  tempTableData: any = [];
  selectedEmployeeData: any = [];
  payrollEmployeeData: any;
  selectedTransactionIndex: any;
  clawbackFrequency: any;
  clawbackperiod: number;
  selectedClawbackInputType: any;
  clawbackDate: string;
  selectedApplicableAt: any;
  selectedTransactionClawback: any;
  selectedClawbackRowIndex: any;
  nonRecurringTransactionGroupDeviationList: any = [];
  deviationModeData: any[];
  repeatModeData: any[];
  deviationData: any[];
  deviationcount: number;
  repeatcount: number;
  selectedDevData: any;
  repeatRemarkText: any;
  selectedDeviationdata: any;
  devationRemarkText: any;


  applicationForm: FormGroup
  saveDisabledBtn: boolean = true;
  garnishmentMasterData: any;
  selectedGarnishmentData: any;
  address: string;
  nature: any;
  edHead: any;
  familyMembers: string;
  garnishmentMasterTransactionTypeList: any;
  garnishmentMasterInputTypeList: any;
  garnishmentMasterDocumentList: any;
  garnishmentMasterFrequencyList: any;
  editFlag: any;
  editApplicationData: any;
  selectedInputType: any;
  selectedInputTypeName: any;
  selectedTransactionTypeId: any;
  selectedFrequencyType: any;
  goalFlag: any;

  constructor(private datepipe: DatePipe,
    private nonRecService: NonRecurringAmtService,
    private payrollservice: PayrollInputsService,
    private modalService: BsModalService,
    private garnishmentservice : GarnishmentService,
    private toaster: ToastrService) {
    this.headData = [
      { displayName: 'Incentive', headMasterId: 27 },
      { displayName: 'Performance_Incentive', headMasterId: 29 },
    ]

    this.parollArea = [
      { name: 'PA-Staff', code: 'RM' },
      { name: 'PA-Worker', code: 'NY' },
      { name: 'PA_Apprentic', code: 'LDN' },
      { name: 'PA_Expat', code: 'IST' },
    ];



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
        "goalBalanceAmount": new FormControl(0),
        "numberOfTransactions": new FormControl(""),
        "remark": new FormControl(""),
        "isActive": new FormControl(1),
        "familyMemberInfoId": new FormControl(1)
      })


      if (localStorage.getItem('payrollListEmpData') != null) {
        this.payrollEmployeeData = JSON.parse(localStorage.getItem('payrollListEmpData'))
        this.selectedEmployeeData = this.payrollEmployeeData
        this.selectedPayrollArea = 'PA-Staff'
      }  
  }

  ngOnInit(): void {
    this.getEmployeeList()
    this.getAllGarnishmentMaster()
    this.payrollheadmaster()
  }

  /** e&d head */
  payrollheadmaster(){
    this.garnishmentservice.payrollheadmaster().subscribe(res =>{
      this.headData = res.data.results
    })
  }

    /** Garnishment Master data */
    getAllGarnishmentMaster() {
      this.applicationForm.reset()
      this.garnishmentservice.getAllGarnishmentMaster().subscribe(res => {
        this.garnishmentMasterData = res.data.results;
      })
    }
  

  getEmployeeList() {
    this.payrollEmployeeData = []
    this.payrollservice.getAllEmployeeDetails().subscribe((res) => {
      this.employeeData = res.data.results[0];
      // for(let i=0; i <= 5; i++){
      //   this.payrollEmployeeData.push(this.employeeData[i])
      // }
    });
  }

  /** Common selection Data  */
  onPayrollSelect(event) {
    // event.name
    //this.selectedPayrollArea.push(event)
    this.selectedPayrollArea = event
    this.PayrollAreaByPayrollAreaCode(event)
  }

  PayrollAreaByPayrollAreaCode(payrollArea) {
    const formData = new FormData();

    formData.append('payrollArea', payrollArea)
    this.nonRecService.PayrollAreaByPayrollAreaCode(formData).subscribe(
      res => {
        this.effectiveFromDate = new Date(res.data.results[0].effectiveFromDate)
        this.effectiveToDate = new Date(res.data.results[0].effectiveToDate)
        this.headGroupDefinitionId = res.data.results[0].headGroupDefinitionResponse.headGroupDefinitionId
        //alert(this.effectiveFromDate)
        this.nonRecService.payrollAreaDetails(this.headGroupDefinitionId).subscribe(
          res => {
            this.frequencyDataByPayroll = res.data.results
          }
        )
      }
    )

    this.payrollservice.getPayrollWiseEmployeeList(1).subscribe(
      res => {
        this.payrollEmployeeData = res.data.results[0]
      }
    )
  }

  /** Table data push */
  getAllSelectedData() {
    this.saveDisabledBtn = false
    this.saveNumberTransaction = this.selectedNoOfTransaction
    this.saveAmount = this.selectedAmount
    this.saveRemark = this.selectedRemark
    this.tableData = []
    this.selectedEmployeeData.forEach(element => {
      this.tableData.push({
        'employeeMasterId': element.employeeMasterId,
        "employeeCode": element.employeeCode,
        "employeeName": element.fullName,
        'payrollArea': element.payrollAreaId,
        'fromDate': this.selectedFromDate,
        'transactionsType': this.selectedTransactionType,
        'numberOfTransactions': this.selectedNoOfTransaction,
        'toDate': this.selectedToDate,
        'quantity': this.selectedAmount,
        'remark': this.selectedRemark
      })
    });
    this.selectedEmployeeData.forEach(element => {
      this.applicationForm.controls['employeeMasterId'].setValue(element.employeeMasterId)
      this.saveTransactionData.push(this.applicationForm.value)
    })

    this.saveTransactionData.forEach(element =>{
      if(element.numberOfTransactions == null){
        element.numberOfTransactions = ''
      }
      if(element.quantity == null){
        element.quantity = ''
      }
      if(element.onceEvery == '' || element.onceEvery == null || element.onceEvery == 0 || element.frequency == '' || element.fromDate == '' || element.fromDate == null || element.transactionsType == '' 
			|| element.quantity == '' || element.quantity == null || element.quantity == 0 || element.employeeMasterId == '' || element.nonSalaryDetailId == ''){
				this.saveDisabledBtn = true
			}

			if(element.transactionsType == 'NoOfTransaction'){
				if(element.numberOfTransactions == '' || element.numberOfTransactions == 0 || element.numberOfTransactions == null){
					this.saveDisabledBtn = true
				}
			}
			if(element.transactionsType == 'Defined Date'){
				if(element.toDate == ''){
					this.saveDisabledBtn = true
				}
			}


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

    

    if(this.editFlag){
        this.applicationForm.controls['garnishmentMasterFrequencyId'].setValue(this.editApplicationData.garnishmentMasterFrequencyResponseDTO.garnishmentMasterFrequencyId)
        this.applicationForm.controls['garnishmentMasterTransactionTypeId'].setValue(this.editApplicationData.garnishmentMasterTransactionTypeResponseDTO.garnishmentMasterTransactionTypeId)
        this.applicationForm.controls['garnishmentMasterInputTypeId'].setValue(this.editApplicationData.garnishmentMasterInputTypeResponseDTO.garnishmentMasterInputTypeId)
    }

    this.selectedGarnishmentData.garnishmentMasterInputTypeList.forEach(element => {
      if(element.defaultInput == true){
        this.selectedInputType = element.garnishmentMasterInputTypeId
        this.selectedInputTypeName = element.inputTypeName
      }
    });

    this.selectedGarnishmentData.garnishmentMasterTransactionTypeList.forEach(element => {
      if(element.defaultTransactionType == true){
        this.selectedTransactionType = element.transactionTypeName
        this.selectedTransactionTypeId = element.garnishmentMasterTransactionTypeId
      }
    });


    if(this.selectedTransactionType != 'NoOfTransaction'){
      this.applicationForm.controls['numberOfTransactions'].disable()
    }

    this.selectedGarnishmentData.garnishmentMasterFrequencyList.forEach(element => {
        this.selectedFrequencyType = element.garnishmentMasterFrequencyId
    });

    this.goalFlag = this.selectedGarnishmentData.goal

  }

  getSelectedGarnishmentData(garnishment){
    this.selectedGarnishmentData.garnishmentMasterInputTypeList.forEach(element => {
      if(element.garnishmentMasterInputTypeId == garnishment){
        this.selectedInputTypeName = element.inputTypeName
      }
    }); 
  }

}