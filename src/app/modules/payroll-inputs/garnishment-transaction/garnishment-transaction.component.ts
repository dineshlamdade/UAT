import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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
  applicationHistoryData: any;
  viewSchedulesData: any;
  allSchedulesData: any;
  viewFlag: boolean = false;
  editFlag: boolean = false;
  editApplicationData: any;
  employeeList: any = '';
  selectedInputType: any;
  selectedFrequencyType: any;
  selectedInputTypeName: any = '';
  goalFlag = false;
  selectedTransactionTypeId: any;
  payrollheaders: any;
  indexId = 1
  selectedEmpData: any = []
  selectedPayrollArea: any;
  payrollAreaId: any;
  selectedOption: string = 'single';
  isvisible: boolean = false;
  payrollId: any;
  empAccNoApplicable: any = false;
  displayName: any;
  institutionName: any;
  scheduleData: any;
  familyInformation: any;
  selectedAllFlag: boolean;
  headData: any;
  showEmployeeSelectionFlag: boolean = true;
  index: number;
  editScheduleFlag: boolean = false;
  updateScheduleData: any = [];
  discard: any;
  selecteddiscardIndex: any;
  NonRecurringTransactionScheduleEMPdData: any;
  hold: any;
  selectedHoldIndex: any;
  originalTransactionDate: any;
  scheduleAllData: (template1: TemplateRef<any>, data: any) => void;
  schedulesAllData: any;
  NonRecurringHistorybyScheduleIdData: any;
  garnishmentApplicationMasterScheduleId: any;

  constructor(private modalService: BsModalService, private payrollservice: PayrollInputsService,
    private garnishmentservice: GarnishmentService, private nonRecService: NonRecurringAmtService,
    private alertService: AlertServiceService,
    private datepipe: DatePipe) {

    this.headData = []
    const formdata = new FormData();
    formdata.append('categoryName', 'Non-Recurring-Garnishment');

    this.garnishmentservice.payrollheadmaster(formdata).subscribe(res => {
      this.headData = res.data.results
    })

    this.getAllEmployeeDetails();


    if (localStorage.getItem('payrollListEmpData') != null) {
      this.payrollListEmpData = JSON.parse(localStorage.getItem('payrollListEmpData'))
      this.selectedEmpData = this.payrollListEmpData
      // localStorage.removeItem('payrollListEmpData')
      this.indexId = 2
     this.showEmployeeSelectionFlag = false;
      //console.log("this.payrollListEmpData: " + JSON.stringify(this.payrollListEmpData))
      this.selectedPayrollArea = this.payrollListEmpData[0].payrollAreaCode
      this.payrollAreaId = this.payrollListEmpData[0].payrollAreaId
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
      "goalBalanceAmount": new FormControl(0),
      "numberOfTransactions": new FormControl(""),
      "remark": new FormControl(""),
      "isActive": new FormControl(1),
      "familyMemberInfoId": new FormControl(1),
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
    this.employeeFinDetailsData = ''
    this.payrollId = ''
    this.selectedEmployeeMasterId = parseInt(value)

    this.garnishmentservice.employeeFinDetails(this.selectedEmployeeMasterId).subscribe(
      res => {
        this.employeeFinDetailsData = res.data.results[0][0];
      }
    )

    this.getEmployeePayrollArea()
  }


  public UploadModal(template3: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template3,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  ngOnInit(): void {
    this.getAllEmployeeData()
    this.payrollheadmaster()
    this.today = this.datepipe.transform(new Date(), 'dd-MMM-yyyy')
    this.getAllGarnishmentMaster()
    this.getApplicationSummary()
  }

  /** on Click on toggle Button */
  getSelectedOption(event) {
    if (event.checked) {
      this.selectedOption = 'fastEntry'
    } else {
      this.selectedOption = 'single'
    }
  }


  /** e&d head */
  payrollheadmaster() {
    const formdata = new FormData();
    formdata.append('categoryName', 'Non-Recurring-Garnishment');

    this.garnishmentservice.payrollheadmaster(formdata).subscribe(res => {
      this.payrollheaders = res.data.results
    })
  }

  /** Get Employee List */
  getAllEmployeeData() {
    this.payrollservice.getAllEmployeeDetails().subscribe((res) => {
      this.employeeList = res.data.results[0];
    });
  }

  /** Get Payroll Area Data by Employee */
  getEmployeePayrollArea() {
    this.nonRecService.getEmployeeWisePayrollList(this.selectedEmployeeMasterId).subscribe(
      res => {
        this.refralPayrollListData = res.data.results[0];
        if (this.refralPayrollListData.length == 1) {
          this.payrollId = this.refralPayrollListData[0].payrollAreaId
          this.applicationForm['payrollAreaId'].setValue(this.refralPayrollListData[0].payrollAreaId)
        }
      })
  }

  /** Garnishment Master data */
  getAllGarnishmentMaster() {
    // this.indexId = 1
    this.editFlag = false
    this.viewFlag = false
    this.applicationForm.enable()
    this.selectedEmpData = []
    this.applicationForm.reset()
    this.garnishmentservice.getAllGarnishmentMaster().subscribe(res => {
      this.garnishmentMasterData = res.data.results;
    })
  }


  navigateToSummary() {
    this.indexId = 1
    this.selectedAllFlag = false;
    this.applicationForm.reset();
    localStorage.clear()
    this.showEmployeeSelectionFlag = true
  }

  /** Get Application Summary Data */
  getApplicationSummary() {
    this.garnishmentservice.getApplicationSummary().subscribe(res => {
      this.applicationSummaryData = res.data.results
    })
  }

  /** When clicked on checkedbox summary page*/
  isSelected(event, summeryData) {
    if (event.checked) {
      this.selectedEmpData.push(summeryData)
    } else {
      if (this.selectedEmpData.length > 0) {
        this.selectedEmpData.forEach((element, index) => {
          if (element.employeeMasterId == summeryData.employeeMasterId) {
            let ind = index;
            this.selectedEmpData.splice(ind, 1);
          }
        });
      } else {
        this.selectedEmpData = []
      }
    }
  }

  /** Get Selected Garnishment Value */
  getSelectedGarnishment(garnishmentMasterId) {
    this.tempScheduleData = ''
    this.garnishmentMasterData.forEach(element => {
      if (element.garnishmentMasterId == garnishmentMasterId) {
        this.selectedGarnishmentData = element
      }
    });




    // console.log("this.selectedGarnishmentData : " + JSON.stringify(this.selectedGarnishmentData))

    this.address = this.selectedGarnishmentData.address1 + ',' + this.selectedGarnishmentData.address2 + ',' + this.selectedGarnishmentData.address3
    this.nature = this.selectedGarnishmentData.nature
    this.edHead = this.selectedGarnishmentData.headMasterId
    this.empAccNoApplicable = this.selectedGarnishmentData.empAccNoApplicable
    this.displayName = this.selectedGarnishmentData.displayName
    this.institutionName = this.selectedGarnishmentData.nameOfInstitution

    if (this.selectedGarnishmentData.familyMember == false) {
      this.familyMembers = 'false'
    } else {
      this.familyMembers = 'true'
      this.garnishmentservice.getFamilyInformation(this.selectedEmployeeMasterId).subscribe(res => {
        this.familyInformation = res.data.results[0].familyDetailsSummaryBeans
      })
    }


    this.garnishmentMasterTransactionTypeList = this.selectedGarnishmentData.garnishmentMasterTransactionTypeList
    this.garnishmentMasterInputTypeList = this.selectedGarnishmentData.garnishmentMasterInputTypeList
    this.garnishmentMasterDocumentList = this.selectedGarnishmentData.garnishmentMasterDocumentList
    this.garnishmentMasterFrequencyList = this.selectedGarnishmentData.garnishmentMasterFrequencyList



    if (this.editFlag) {
      this.applicationForm.controls['garnishmentMasterFrequencyId'].setValue(this.editApplicationData.garnishmentMasterFrequencyResponseDTO.garnishmentMasterFrequencyId)
      this.applicationForm.controls['garnishmentMasterTransactionTypeId'].setValue(this.editApplicationData.garnishmentMasterTransactionTypeResponseDTO.garnishmentMasterTransactionTypeId)
      this.applicationForm.controls['garnishmentMasterInputTypeId'].setValue(this.editApplicationData.garnishmentMasterInputTypeResponseDTO.garnishmentMasterInputTypeId)
    }

    this.selectedGarnishmentData.garnishmentMasterInputTypeList.forEach(element => {
      if (element.defaultInput == true) {
        this.selectedInputType = element.garnishmentMasterInputTypeId
        this.selectedInputTypeName = element.inputTypeName
      }
    });

    this.selectedGarnishmentData.garnishmentMasterTransactionTypeList.forEach(element => {
      if (element.defaultTransactionType == true) {
        this.selectedTransactionType = element.transactionTypeName
        this.selectedTransactionTypeId = element.garnishmentMasterTransactionTypeId
      }
    });


    if (this.selectedTransactionType != 'NoOfTransaction') {
      this.applicationForm.controls['numberOfTransactions'].disable()
    }

    this.selectedGarnishmentData.garnishmentMasterFrequencyList.forEach(element => {
      this.selectedFrequencyType = element.garnishmentMasterFrequencyId
    });

    this.goalFlag = this.selectedGarnishmentData.goal

  }

  getSelectedGarnishmentData(garnishment) {
    this.tempScheduleData = ''
    this.selectedInputTypeName = ''
    this.applicationForm.controls['percentage'].setValue('')
    this.applicationForm.controls['amount'].setValue('')
    this.selectedGarnishmentData.garnishmentMasterInputTypeList.forEach(element => {
      if (element.garnishmentMasterInputTypeId == garnishment) {
        this.selectedInputTypeName = element.inputTypeName
      }
    });
  }

  getTransactionTypeForSave(transactionId) {
    this.tempScheduleData = ''
    this.garnishmentMasterTransactionTypeList.forEach(element => {
      if (element.garnishmentMasterTransactionTypeId == transactionId) {
        this.selectedTransactionType = element.transactionTypeName
      }
    });

    if (this.selectedTransactionType != 'NoOfTransaction') {
      this.applicationForm.controls['numberOfTransactions'].setValue('')
      this.applicationForm.controls['numberOfTransactions'].disable()
    }

    let todate = ''
    if (this.selectedTransactionType == 'NoOfTransaction') {
      this.applicationForm.controls['numberOfTransactions'].setValue(1)
      this.applicationForm.controls['numberOfTransactions'].enable()
      todate = ''
      this.selectedToDate = ''
    } else if (this.selectedTransactionType == 'Perpetual') {
      todate = '9999-12-31'
      this.selectedToDate = this.datepipe.transform(new Date(todate), 'dd-MMM-yyyy')
    } else {
      todate = this.selectedToDate
    }

    this.applicationForm.controls['toDate'].setValue(todate)
  }


  getFromDateForSave(event) {
    this.tempScheduleData = ''
    let fromdate = ''
    this.selectedFromDate = this.datepipe.transform(new Date(event), 'dd-MMM-yyyy')

    fromdate = this.datepipe.transform(new Date(event), 'yyyy-MM-dd')
    this.applicationForm.controls['fromDate'].setValue(fromdate)

  }

  getToDateForSave(event) {
    this.tempScheduleData = ''
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

    let data = [this.applicationForm.value]

    this.garnishmentservice.saveApplication(data).subscribe(res => {
      this.alertService.sweetalertMasterSuccess("","Application data Saved successfully")
      this.editFlag = false;
      this.viewFlag = false;
      this.getApplicationSummary()
      this.applicationForm.addControl('garnishmentApplicationMasterId', new FormControl[''])
      this.applicationForm.reset()
      this.editFlag = false;
      this.viewFlag = false
      this.applicationForm.controls['goalBalanceAmount'].setValue(0)
      this.applicationForm.controls['goalBalanceAmount'].disable()
      this.indexId = 1
    })
  }

  /** Update application */
  updateApplication() {
    let today = new Date()
    let applicationDate = ''
    applicationDate = this.datepipe.transform(new Date(today), 'yyyy-MM-dd')
    this.applicationForm.enable()
    this.applicationForm.controls['garnishmentApplicationMasterId'].setValue(this.garnishmentApplicationMasterId)
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
   // this.applicationForm.removeControl('isActive')
    console.log("save application : " + JSON.stringify(this.applicationForm.value))

    this.garnishmentservice.updateApplication(this.applicationForm.value).subscribe(res => {
      this.alertService.sweetalertMasterSuccess("","Application data Updated successfully")
      this.getApplicationSummary()
      this.applicationForm.reset()
      this.editFlag = false;
      this.viewFlag = false
      this.applicationForm.controls['goalBalanceAmount'].setValue(0)
      this.applicationForm.controls['goalBalanceAmount'].disable()
    })
  }


  /** Edit application */

  editTransaction() {
    this.editApplication(this.selectedEmpData)
    this.getSelectedEmployeeCode(this.selectedEmpData[0].employeeMasterResponseDTO.employeeMasterId)
  }

  editApplication(data) {
    this.editFlag = true;
    this.viewFlag = false;
    this.indexId = 2
    const formData = new FormData();
    formData.append('garnishmentApplicationMasterId', data[0].garnishmentApplicationMasterId)

    this.garnishmentApplicationMasterId = data.garnishmentApplicationMasterId

    this.garnishmentservice.getapplicationDataById(formData).subscribe(res => {
      this.editApplicationData = res.data.results[0];
      this.applicationForm.enable()
      this.applicationForm.patchValue(this.editApplicationData)
      this.applicationForm.controls['garnishmentApplicationMasterId'].setValue(this.garnishmentApplicationMasterId)
      this.applicationForm.controls['garnishmentMasterId'].setValue(this.editApplicationData.garnishmentMasterFrequencyResponseDTO.garnishmentMasterId)
      this.applicationForm.controls['payrollAreaId'].setValue(this.editApplicationData.payrollArea.payrollAreaId)
      this.getSelectedGarnishment(this.editApplicationData.garnishmentMasterFrequencyResponseDTO.garnishmentMasterId)
      this.applicationForm.controls['goalBalanceAmount'].setValue(0)
      this.applicationForm.controls['goalBalanceAmount'].disable()
      this.applicationForm.controls['payrollAreaId'].disable()
      this.applicationForm.controls['garnishmentMasterId'].disable()
    })
  }

  /** View application */
  viewApplication(data) {
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
  viewApplicationHistoryData(template2: TemplateRef<any>, data) {
    this.modalRef = this.modalService.show(
      template2,
      Object.assign({}, { class: 'gray modal-xl' })
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


  resetData() {
    this.applicationForm.reset();
    this.applicationForm.enable();
    this.editFlag = false
    this.viewFlag = false
    this.applicationForm.controls['goalBalanceAmount'].setValue(0)
    this.applicationForm.controls['goalBalanceAmount'].disable()
    this.address = ''
    this.nature = ''
    this.edHead = ''
  }


  /********************************* Schedule Functions *******************/

  /** get Temp schedule data */
  schedulepopup(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.tempScheduleData = ''
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
    //this.applicationForm.controls['isActive'].setValue(1)

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
    this.scheduleData = data;
    console.log("scheduleData: " + JSON.stringify(this.scheduleData))
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
    this.indexId = 3
    this.garnishmentservice.getApplicationScheduleData().subscribe(res => {
      this.allSchedulesData = res.data.results;
    })
  }


  /** get hold value for update schedule */
	getHoldScheduleValue(event, scheduleData, index) {
		this.selectedHoldIndex = index;
		if (event.checked) {
			this.hold = 1
			// this.NonRecurringTransactionScheduleEMPdData[index].hold = true
		} else {
			this.hold = 0
			// this.NonRecurringTransactionScheduleEMPdData[index].hold = false
			if (this.editScheduleFlag == false) {
				this.allSchedulesData.forEach((element, index) => {
					if (index == this.selectedHoldIndex) {
						element.hold = false
					}
				});
			} else {
				this.NonRecurringTransactionScheduleEMPdData.forEach((element, index) => {
					if (index == this.selectedHoldIndex) {
						element.hold = false
					}
				});
			}
		}



		if (this.updateScheduleData.length > 0) {
			this.updateScheduleData.forEach((element, index) => {
				if (element.garnishmentApplicationMasterScheduleId == scheduleData.garnishmentApplicationMasterScheduleId) {
					let ind = index;
					this.updateScheduleData.splice(ind, 1, {
						"garnishmentApplicationMasterScheduleId": element.garnishmentApplicationMasterScheduleId,
						"hold": this.hold,
						"discard": element.discard,
						"resheduleDate": element.resheduleDate,
						"remark": element.remark
					})
				} else {
					let length = this.updateScheduleData.length - 1;
					if (this.updateScheduleData[length].garnishmentApplicationMasterScheduleId == scheduleData.garnishmentApplicationMasterScheduleId) { return; }
					else {
						this.updateScheduleData.push({
							"garnishmentApplicationMasterScheduleId": scheduleData.garnishmentApplicationMasterScheduleId,
							"hold": this.hold,
							"discard": scheduleData.discard,
							"resheduleDate": scheduleData.resheduleDate,
							"remark": scheduleData.remark
						})
					}
				}
			});
		} else {
			this.updateScheduleData.push({
				"garnishmentApplicationMasterScheduleId": scheduleData.garnishmentApplicationMasterScheduleId,
				"hold": this.hold,
				"discard": scheduleData.discard,
				"resheduleDate": scheduleData.resheduleDate,
				"remark": scheduleData.remark
			})
		}

	}

	/** get discard value for update schedule */
	getDiscardScheduleValue(event, scheduleData, index) {
		this.selecteddiscardIndex = index;
		if (event.checked) {
			this.discard = 1
		//	this.NonRecurringTransactionScheduleEMPdData[index].discard = true
		} else {
			this.discard = 0
			//this.NonRecurringTransactionScheduleEMPdData[index].discard = false
			if (this.editScheduleFlag == false) {
				this.allSchedulesData.forEach((element, index) => {
					if (index == this.selecteddiscardIndex) {
						element.discard = false
					}
				});
			} else {
				this.NonRecurringTransactionScheduleEMPdData.forEach((element, index) => {
					if (index == this.selecteddiscardIndex) {
						element.discard = false
					}
				});
			}
		}
		if (this.updateScheduleData.length > 0) {
			this.updateScheduleData.forEach((element, index) => {
				if (element.garnishmentApplicationMasterScheduleId == scheduleData.garnishmentApplicationMasterScheduleId) {
					let ind = index;
					this.updateScheduleData.splice(ind, 1, {
						"garnishmentApplicationMasterScheduleId": element.garnishmentApplicationMasterScheduleId,
						"hold": element.hold,
						"discard": this.discard,
						"resheduleDate": element.resheduleDate,
						"remark": element.remark
					})
				} else {
					let length = this.updateScheduleData.length - 1;
					if (this.updateScheduleData[length].garnishmentApplicationMasterScheduleId == scheduleData.garnishmentApplicationMasterScheduleId) { return; }
					else {
						this.updateScheduleData.push({
							"garnishmentApplicationMasterScheduleId": scheduleData.garnishmentApplicationMasterScheduleId,
							"hold": scheduleData.hold,
							"discard": this.discard,
							"resheduleDate": scheduleData.resheduleDate,
							"remark": scheduleData.remark
						})
					}
				}
			});
		} else {
			this.updateScheduleData.push({
				"garnishmentApplicationMasterScheduleId": scheduleData.garnishmentApplicationMasterScheduleId,
				"hold": scheduleData.hold,
				"discard": this.discard,
				"resheduleDate": scheduleData.resheduleDate,
				"remark": scheduleData.remark
			})
		}
	}

	/** get reschedule date value for update schedule */
	getRescheduleDate(date, scheduleData) {
		if (this.updateScheduleData.length > 0) {
			this.updateScheduleData.forEach((element, index) => {
				if (element.garnishmentApplicationMasterScheduleId == scheduleData.garnishmentApplicationMasterScheduleId) {
					let ind = index;
					this.updateScheduleData.splice(ind, 1, {
						"garnishmentApplicationMasterScheduleId": element.garnishmentApplicationMasterScheduleId,
						"hold": element.hold,
						"discard": element.discard,
						"resheduleDate": this.datepipe.transform(new Date(date), 'yyyy-MM-dd'),
						"remark": element.remark
					})
				} else {
					let length = this.updateScheduleData.length - 1;
					if (this.updateScheduleData[length].garnishmentApplicationMasterScheduleId == scheduleData.garnishmentApplicationMasterScheduleId) { return; }
					else {
						this.updateScheduleData.push({
							"garnishmentApplicationMasterScheduleId": scheduleData.garnishmentApplicationMasterScheduleId,
							"hold": scheduleData.hold,
							"discard": scheduleData.discard,
							"resheduleDate": this.datepipe.transform(new Date(date), 'yyyy-MM-dd'),
							"remark": scheduleData.remark
						})
					}
				}
			});
		} else {
			this.updateScheduleData.push({
				"garnishmentApplicationMasterScheduleId": scheduleData.garnishmentApplicationMasterScheduleId,
				"hold": scheduleData.hold,
				"discard": scheduleData.discard,
				"resheduleDate": this.datepipe.transform(new Date(date), 'yyyy-MM-dd'),
				"remark": scheduleData.remark
			})
		}

	}

	/** get remark value for update schedule */
	getScheduleRemark(remark, scheduleData) {
		if (this.updateScheduleData.length > 0) {
			this.updateScheduleData.forEach((element, index) => {
				if (element.garnishmentApplicationMasterScheduleId == scheduleData.garnishmentApplicationMasterScheduleId) {
					let ind = index;
					this.updateScheduleData.splice(ind, 1, {
						"garnishmentApplicationMasterScheduleId": element.garnishmentApplicationMasterScheduleId,
						"hold": element.hold,
						"discard": element.discard,
						"resheduleDate": element.resheduleDate,
						"remark": remark
					})
				} else {
					let length = this.updateScheduleData.length - 1;
					if (this.updateScheduleData[length].garnishmentApplicationMasterScheduleId == scheduleData.garnishmentApplicationMasterScheduleId) { return; }
					else {
						this.updateScheduleData.push({
							"garnishmentApplicationMasterScheduleId": scheduleData.garnishmentApplicationMasterScheduleId,
							"hold": scheduleData.hold,
							"discard": scheduleData.discard,
							"resheduleDate": scheduleData.resheduleDate,
							"remark": remark
						})
					}
				}
			});
		} else {
			this.updateScheduleData.push({
				"garnishmentApplicationMasterScheduleId": scheduleData.garnishmentApplicationMasterScheduleId,
				"hold": scheduleData.hold,
				"discard": scheduleData.discard,
				"resheduleDate": scheduleData.resheduleDate,
				"remark": remark
			})
		}
	}

	/** Update Schedule data */
	NonRecurringTransactionScheduleupdateById() {

	
		console.log(JSON.stringify(this.updateScheduleData))
		this.garnishmentservice.updateSchedule(this.updateScheduleData).subscribe(
			res => {
				this.alertService.sweetalertMasterSuccess("", "Transaction Schedule updated successfully")
				if (this.editScheduleFlag) {
				//	this.NonRecurringTransactionScheduleEMP()
				} else {
					this.getApplicationScheduleData()
				}
			}
		)
	}

  /** View schedule history data */
	ViewScheduleHistory(template3: TemplateRef<any>, scheduleData) {
		this.modalRef = this.modalService.show(
			template3,
			Object.assign({}, {
				class: 'gray modal-lg'
			})
		);

		this.viewSchedulesData = scheduleData
		this.originalTransactionDate = this.viewSchedulesData.transactionDate
		if (!this.editScheduleFlag) {
			this.schedulesAllData = this.viewSchedulesData
		}
		//	this.selectedEmpData[this.index] = scheduleData
		this.garnishmentApplicationMasterScheduleId = scheduleData.garnishmentApplicationMasterScheduleId
    this.garnishmentApplicationMasterId = scheduleData.garnishmentApplicationMasterId
		this.NonRecurringTransactionScheduleRemarkHistorybyScheduleId()

	}

  	/** Schedule Data on popup*/
	NonRecurringTransactionScheduleRemarkHistorybyScheduleId() {

		const formData = new FormData();
		formData.append('garnishmentApplicationMasterScheduleId', this.garnishmentApplicationMasterScheduleId)
		formData.append('garnishmentApplicationMasterId', this.garnishmentApplicationMasterId)

		this.garnishmentservice.GarnishmentApplicationMasterScheduleRemarkHistory(formData).subscribe(
			res => {
				this.NonRecurringHistorybyScheduleIdData = res.data.results;
				this.NonRecurringHistorybyScheduleIdData.forEach(element => {
					if (element.transactionDate != null) {
						this.originalTransactionDate = element.transactionDate
					}
				});

			}
		)
	}

	cancelBtn() {
		this.navigateToSummary()
	}

  /** Click on Edit Schedule Button */
	editScheduleData() {
		if (this.selectedEmpData.length > 0) {
			this.index = 0;
			this.indexId = 3
			this.editScheduleFlag = true;
			this.garnishmentApplicationMasterId = this.selectedEmpData[this.index].garnishmentApplicationMasterId
			this.getScheduleDataByAppId()

		} else {
			this.alertService.sweetalertWarning("Please select atleast one employee")
		}
	}

  /**get Schedule by Appl id */
  getScheduleDataByAppId(){
    const formdata = new FormData();
    formdata.append('garnishmentApplicationMasterId',this.garnishmentApplicationMasterId)

    this.garnishmentservice.getScheduleHistoryById(formdata).subscribe(res =>{
      this.NonRecurringTransactionScheduleEMPdData = res.data.results;
    })
  }

	getRescheduleInfo(summarydata) {
		const formData = new FormData();
		formData.append('garnishmentApplicationMasterScheduleId', summarydata.garnishmentApplicationMasterScheduleId)
		formData.append('nonRecurringTransactionGroupId', summarydata.nonRecurringTransactionGroupId)

		// this.nonRecService.NonRecurringTransactionScheduleRemarkHistorybyScheduleId(formData).subscribe(
		// 	res => {
		// 		if (res.data.results[0].transactionDate != null) {
		// 			this.originalTransactionDate = res.data.results[0].transactionDate
		// 			this.isReschedule = true;
		// 		} else {
		// 			this.isReschedule = false;
		// 		}
		// 	});



		// return this.isReschedule;

	}



  navigateToTransaction() {
    this.indexId = 2
  }


  visibleempdetails() {
    this.isvisible = true;
  }
  hideempdetails() {
    this.isvisible = false;
  }

}
