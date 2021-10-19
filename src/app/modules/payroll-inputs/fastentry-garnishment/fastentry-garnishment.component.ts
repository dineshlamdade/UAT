import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private datepipe: DatePipe,
    private nonRecService: NonRecurringAmtService,
    private payrollservice: PayrollInputsService,
    private modalService: BsModalService,
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
        "isActive": new FormControl(1)
      })
  }

  ngOnInit(): void {
    this.getEmployeeList()
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

  

}