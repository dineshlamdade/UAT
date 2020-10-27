import { Component, OnInit, ViewChild, ViewEncapsulation, Pipe, PipeTransform } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PreviousEmploymentInformation } from './../../dto-models/previous-employment-information.model';
// import * as wjcGrid from '@grapecity/wijmo.grid';
// import * as wjcCore from '@grapecity/wijmo';
// import * as wjcInput from '@grapecity/wijmo.input';
import { DatePipe } from '@angular/common';
import { Subscribable, Subscription } from 'rxjs';
import { EventEmitterService } from './../../employee-master-services/event-emitter/event-emitter.service';
import { PreviousEmploymentInformationService } from './../../employee-master-services/previous-employment-information/previous-employment-information.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from './../../shared modals/confirmation-modal/confirmation-modal.component';
import Swal from 'sweetalert2';
import { SharedInformationService } from './../../employee-master-services/shared-service/shared-information.service';


@Component({
  selector: 'app-previous-employment-information',
  templateUrl: './previous-employment-information.component.html',
  styleUrls: ['./previous-employment-information.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PreviousEmploymentInformationComponent implements OnInit {

  previousEmploymentInfoForm: FormGroup;
  previousEmploymentInformation = new PreviousEmploymentInformation('', '', '', '', '', '', '', '', '', '', '', '', '');
  previousEmploymentInformationArray: Array<any> = [];
  // currencyArray = 'Dollar, Euro, Rupee, Yen, Pound'.split(',');
  currencyArray: Array<any> = [];
  summaryGridData: Array<any> = [];
  previousSmmaryGridData: Array<any> = [];
  countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'];
  private _currentEditItem: any = null;
  editingItem: any;
  viewItem: any;
  companyList: Array<any> = [];
  designationList: Array<any> = [];
  joiningDateList: Array<any> = [];
  leavingDateList: Array<any> = [];
  ctcPerAnumList: Array<any> = [];

  remarkList: Array<any> = [];
  jobProfileList: Array<any> = [];
  gratuityList: Array<any> = [];
  leaveEncashmentList: Array<any> = [];
  vouluntaryRetirementList: Array<any> = [];
  currencyList: Array<any> = [];
  ht: any;
  flexNew: any;
  eNew: any;
  date = { joiningDate: "", leavingDate: "" }
  never: boolean = false;
  initiatePreviousEmploymentInfoForm: Subscription
  employeeMasterId: number;
  deletePreviousEmploymentId: Array<any> = [];
  item: any;
  confirmDeleteSubscription: Subscription;
  EmptyGridTrue: boolean = false;
  addPush: boolean = false;
  tomorrow = new Date();
  Retirement: any;
  Encashment: any;
  Gratuity: any;
  CTCANNUM: any;
  public today = new Date();



  constructor(private formBuilder: FormBuilder, public datepipe: DatePipe,
    private EventEmitterService: EventEmitterService,
    private PreviousEmpInformationService: PreviousEmploymentInformationService,
    public dialog: MatDialog, private CommonDataService: SharedInformationService) {
    this.tomorrow.setDate(this.tomorrow.getDate());
  }


  ngOnInit(): void {
    const empId = localStorage.getItem('employeeMasterId')
    this.employeeMasterId = Number(empId);

    this.previousEmploymentInfoForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      joiningDate: [this.date.joiningDate],
      leaveDate: [this.date.leavingDate],
      remark: [''],
      designation: [''],
      jobProfile: [''],
      ctsPerAnum: [''],
      currency: [''],
      gratuity: [''],
      leaveEncashment: [''],
      vouluntaryRetirement: ['']
    });

    this.getPreviousEmployees();

    this.PreviousEmpInformationService.getCurrencyList().subscribe(res => {
      this.currencyArray = res.data.results;
      setTimeout(() => {
        this.previousEmploymentInformation.currency = '';
      }, 1)
    })


    // this.initiatePreviousEmploymentInfoForm = this.EventEmitterService.setPreviousEmploymentInfoInitiate().subscribe(res => {
    // })
    this.confirmDeleteSubscription = this.EventEmitterService.setConfirmDeletePreviousEmpForm().subscribe(res => {
      debugger
      this.deleteEmpGridRow(res);
      this.previousEmploymentInfoForm.markAsTouched();
      this.EmptyGridTrue = true;
    })
  }

  getPreviousEmployees() {
    this.PreviousEmpInformationService.getPreviousEmpInformation(this.employeeMasterId).subscribe(res => {
      debugger
      this.previousSmmaryGridData = res.data.results[0];
      // this.pushToGrid(this.summaryGridData);
      if (this.previousSmmaryGridData.length > 0) {
        this.EmptyGridTrue = true;
      }
    });
  }

  previousEmploymentInfoSubmit() {
    debugger
    this.summaryGridData.forEach(data => {
      debugger
      data.employeeMasterId = this.employeeMasterId;

      if (data.employeePreviousEmploymentId) {
        this.PreviousEmpInformationService.putPreviousEmpInfoForm(this.summaryGridData).subscribe(res => {
          debugger
          // this.previousSmmaryGridData = res.data.results[0];
          this.getPreviousEmployees();

          // if (this.summaryGridData.length > 0) {
          //   this.EmptyGridTrue = true;
          // }
          this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
          this.previousEmploymentInformation.previousEmployerName = '';
          this.previousEmploymentInformation.previousDesignation = '';
          this.previousEmploymentInformation.dateOfJoining = '';
          this.previousEmploymentInformation.dateOfRelieving = '';
          this.previousEmploymentInformation.lastCTCPerAnnum = '';
          this.previousEmploymentInformation.remark = '';
          this.previousEmploymentInformation.previousJobProfile = '';
          this.previousEmploymentInformation.currency = '';
          this.previousEmploymentInformation.exemptGratuityReceived = '';
          this.previousEmploymentInformation.exemptLeaveSalaryReceived = '';
          this.previousEmploymentInformation.exemptVRSReceived = '';
          this.previousEmploymentInformation.employeePreviousEmploymentId = '';
        }, (error: any) => {
          this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
          // this.notifyService.showError(error["error"]["status"]["messsage"], "Error..!!")
        })
      } else {
        this.PreviousEmpInformationService.postPreviousEmpInfoForm(this.summaryGridData).subscribe(res => {
          debugger
          // this.previousSmmaryGridData = res.data.results[0];
          this.getPreviousEmployees();

          if (this.previousSmmaryGridData.length > 0) {
            this.EmptyGridTrue = true;
          }
          this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
          
        }, (error: any) => {
          this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
        })
      }
    })
  }

  updateEmpGridRow(previousEmploymentInformation){
    this.summaryGridData.push(previousEmploymentInformation);
    this.previousEmploymentInfoSubmit();
  }


  pushToGrid() {

    let data = [];

    let summaryGridData = [];
    summaryGridData.push(this.previousEmploymentInformation);
    // for (let i = 0; i < this.companyList.length; i++) {
    for (var val of summaryGridData) {
      data.push({
        // id: i,
        previousEmployerName: val.previousEmployerName,
        previousDesignation: val.previousDesignation,
        dateOfJoining: val.dateOfJoining,
        dateOfRelieving: val.dateOfRelieving,
        lastCTCPerAnnum: val.lastCTCPerAnnum,
        lastCTCPerAnnumNew: '(' + val.currency + ')' + ' ' + val.lastCTCPerAnnum,
        remark: val.remark,
        previousJobProfile: val.previousJobProfile,
        currency: val.currency,
        exemptGratuityReceived: val.exemptGratuityReceived,
        exemptLeaveSalaryReceived: val.exemptLeaveSalaryReceived,
        exemptVRSReceived: val.exemptVRSReceived,
      });
    }
    summaryGridData.forEach(dta => {
      if (dta.currency == '' && dta.lastCTCPerAnnum == '') {
        data.forEach(res => {
          return res.lastCTCPerAnnum = '';
        })
      }
    })

    this.summaryGridData = data;
    this.EmptyGridTrue = true;

    let temp = this.summaryGridData.forEach(data => {
      return data.dateOfJoining = this.datepipe.transform(data.dateOfJoining, 'dd-MMM-yyyy');
    })
    let temp1 = this.summaryGridData.forEach(data => {
      return data.dateOfRelieving = this.datepipe.transform(data.dateOfRelieving, 'dd-MMM-yyyy');
    })
    this.previousEmploymentInfoSubmit();


    this.previousEmploymentInformation.previousEmployerName = '';
    this.previousEmploymentInformation.previousDesignation = '';
    this.previousEmploymentInformation.dateOfJoining = '';
    this.previousEmploymentInformation.dateOfRelieving = '';
    this.previousEmploymentInformation.lastCTCPerAnnum = '';
    this.previousEmploymentInformation.remark = '';
    this.previousEmploymentInformation.previousJobProfile = '';
    this.previousEmploymentInformation.currency = '';
    this.previousEmploymentInformation.exemptGratuityReceived = '';
    this.previousEmploymentInformation.exemptLeaveSalaryReceived = '';
    this.previousEmploymentInformation.exemptVRSReceived = '';

    this.addPush = false;
  }

  editEmpGridRow(employee) {
    this.previousEmploymentInformation.previousEmployerName = employee.previousEmployerName;
    this.previousEmploymentInformation.previousDesignation = employee.previousDesignation;
    this.previousEmploymentInformation.dateOfJoining = employee.dateOfJoining;
    this.previousEmploymentInformation.dateOfRelieving = employee.dateOfRelieving;
    this.previousEmploymentInformation.lastCTCPerAnnum = employee.lastCTCPerAnnum;
    this.previousEmploymentInformation.remark = employee.remark;
    this.previousEmploymentInformation.previousJobProfile = employee.previousJobProfile;
    this.previousEmploymentInformation.currency = employee.currency;
    this.previousEmploymentInformation.exemptGratuityReceived = employee.exemptGratuityReceived;
    this.previousEmploymentInformation.exemptLeaveSalaryReceived = employee.exemptLeaveSalaryReceived;
    this.previousEmploymentInformation.exemptVRSReceived = employee.exemptVRSReceived;
    this.previousEmploymentInformation.employeePreviousEmploymentId = employee.employeePreviousEmploymentId;
  }


  deleteEmpGridRowDiaglog(employee) {
    debugger
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '664px', height: '241px',
      data: {
        pageValue: 'PreviousEmpForm', info: 'Do you really want to delete?',
        employee: employee
      }
    });
  }

  deleteEmpGridRow(employee) {
    this.PreviousEmpInformationService.deleteGridItem(employee.employeePreviousEmploymentId).subscribe(res => {
      if (res.data.results[0]) {
        this.previousSmmaryGridData = res.data.results[0];
        this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
        this.previousSmmaryGridData.forEach(data => {
          return data.dateOfJoining = this.datepipe.transform(data.dateOfJoining, 'dd-MMM-yyyy');
        })
        this.previousSmmaryGridData.forEach(data => {
          return data.dateOfRelieving = this.datepipe.transform(data.dateOfRelieving, 'dd-MMM-yyyy');
        })

        if (this.summaryGridData.length > 0) {
          this.EmptyGridTrue = true;
        } else {
          this.EmptyGridTrue = false;
        }
      }
    }, (error: any) => {
      this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
    })
  }


  checkValidations() {
    if (this.previousEmploymentInformation.previousEmployerName !== '') {
      this.previousEmploymentInfoForm.get('companyName').valueChanges
        .subscribe(value => {
          if (value) {
            this.previousEmploymentInfoForm.get('joiningDate').setValidators(Validators.required)
          } else {
            this.previousEmploymentInfoForm.get('joiningDate').clearValidators();
          }
        }
        );
    }
  }
  resetForm() {
    this.previousEmploymentInfoForm.reset();
    this.previousEmploymentInformation.employeePreviousEmploymentId = '';
  }

  CTCCommaFormatted(event, grid) {
    // skip for arrow keys
    if (event.which >= 37 && event.which <= 40) return;

    // format number
    if (this.previousEmploymentInformation.lastCTCPerAnnum && !grid) {
      this.previousEmploymentInformation.lastCTCPerAnnum = this.previousEmploymentInformation.lastCTCPerAnnum.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    if (this.CTCANNUM && grid == 'grid') {
      this.CTCANNUM = this.CTCANNUM.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }


  GratuityCommaFormatted(event, grid) {
    // skip for arrow keys
    if (event.which >= 37 && event.which <= 40) return;

    // format number
    if (this.previousEmploymentInformation.exemptGratuityReceived && !grid) {
      this.previousEmploymentInformation.exemptGratuityReceived = this.previousEmploymentInformation.exemptGratuityReceived.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    if (this.Gratuity && grid == 'grid') {
      this.Gratuity = this.Gratuity.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }


  leaveEncashmentCommaFormatted(event, grid) {
    // skip for arrow keys
    if (event.which >= 37 && event.which <= 40) return;

    // format number
    if (this.previousEmploymentInformation.exemptLeaveSalaryReceived && !grid) {
      this.previousEmploymentInformation.exemptLeaveSalaryReceived = this.previousEmploymentInformation.exemptLeaveSalaryReceived.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    if (this.Encashment && grid == 'grid') {
      this.Encashment = this.Encashment.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }

  vouluntaryRetirementCommaFormatted(event, grid) {
    // skip for arrow keys
    if (event.which >= 37 && event.which <= 40) return;

    // format number
    if (this.previousEmploymentInformation.exemptVRSReceived && !grid) {
      this.previousEmploymentInformation.exemptVRSReceived = this.previousEmploymentInformation.exemptVRSReceived.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    if (this.Retirement && grid == 'grid') {
      this.Retirement = this.Retirement.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }

  commaNumberCheck(args) {
    if (args.key === 'e' || args.key === '+' || args.key === '-') {
      return false;
    } else {
      return true;
    }
  }

  // sweetalertMasterSuccess(message: any, text: any) {
  //   Swal.fire({
  //     title: message,
  //     text: text,
  //     showCloseButton: true,
  //     showCancelButton: false,
  //     toast: true,
  //     position: 'top-end',
  //     showConfirmButton: false,
  //     icon: 'success',
  //     timer: 15000,
  //     timerProgressBar: true,
  //   })
  // }

  // sweetalertError(message: any) {
  //   Swal.fire({
  //     title: message,
  //     showCloseButton: true,
  //     showCancelButton: false,
  //     toast: true,
  //     position: 'top-end',
  //     showConfirmButton: false,
  //     icon: 'error',
  //     timer: 15000,
  //     timerProgressBar: true,
  //   })
  // }
}
