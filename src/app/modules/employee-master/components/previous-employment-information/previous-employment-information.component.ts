import { Component, OnInit, ViewChild, ViewEncapsulation, Pipe, PipeTransform } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PreviousEmploymentInformation } from './previous-employment-information.model';
// import * as wjcGrid from '@grapecity/wijmo.grid';
// import * as wjcCore from '@grapecity/wijmo';
// import * as wjcInput from '@grapecity/wijmo.input';
import { DatePipe } from '@angular/common';
import { Subscribable, Subscription } from 'rxjs';
import { EventEmitterService } from './../../employee-master-services/event-emitter/event-emitter.service';
import { PreviousEmploymentInformationService } from './previous-employment-information.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from './../../shared modals/confirmation-modal/confirmation-modal.component';
import Swal from 'sweetalert2';
import { SharedInformationService } from './../../employee-master-services/shared-service/shared-information.service';
import { Router } from '@angular/router';


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
  viewEmploymentInfoForm: boolean = false;
  validationDate: any;
  saveNextBoolean: boolean = false



  constructor(private formBuilder: FormBuilder, public datepipe: DatePipe,
    private EventEmitterService: EventEmitterService,
    private PreviousEmpInformationService: PreviousEmploymentInformationService,
    public dialog: MatDialog, private CommonDataService: SharedInformationService,
    private router: Router) {
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
      ctsPerAnum: [{ value: null, disabled: true }],
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

    const JoiningDate = localStorage.getItem('joiningDate');
    const ReJoiningDate = localStorage.getItem('rejoiningDate');

    if(ReJoiningDate){
      this.validationDate = new Date(ReJoiningDate)
    } else{
      this.validationDate = new Date(JoiningDate)

    }
    // this.initiatePreviousEmploymentInfoForm = this.EventEmitterService.setPreviousEmploymentInfoInitiate().subscribe(res => {
    // })
    this.confirmDeleteSubscription = this.EventEmitterService.setConfirmDeletePreviousEmpForm().subscribe(res => {

      this.deleteEmpGridRow(res);
      this.previousEmploymentInfoForm.markAsTouched();
      this.EmptyGridTrue = true;
    })
  }

  getPreviousEmployees() {
    this.PreviousEmpInformationService.getPreviousEmpInformation(this.employeeMasterId).subscribe(res => {

      this.previousSmmaryGridData = res.data.results[0];
      // this.pushToGrid(this.summaryGridData);
      if (this.previousSmmaryGridData.length > 0) {
        this.EmptyGridTrue = true;
      }
    });
  }

  PreviousEmpSaveNextSubmit(previousEmploymentInformation) {
    this.saveNextBoolean = true;

    this.postEmploymentInfoForm(previousEmploymentInformation);
  }



  postEmploymentInfoForm(previousEmploymentInformation) {
    
    previousEmploymentInformation.employeeMasterId = this.employeeMasterId;
    previousEmploymentInformation.dateOfJoining = this.datepipe.transform(previousEmploymentInformation.dateOfJoining, 'dd-MMM-yyyy');
    previousEmploymentInformation.dateOfRelieving = this.datepipe.transform(previousEmploymentInformation.dateOfRelieving, 'dd-MMM-yyyy');

    if (!this.previousEmploymentInformation.currency || !this.previousEmploymentInformation.lastCTCPerAnnum) {
      this.previousEmploymentInformation.currency = '';
      this.previousEmploymentInformation.lastCTCPerAnnum = '';
    }
    this.PreviousEmpInformationService.postPreviousEmpInfoForm(previousEmploymentInformation).subscribe(res => {

      this.getPreviousEmployees();
      this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
      this.resetForm();
      if (this.saveNextBoolean == true) {
        this.saveNextBoolean = false;
        this.router.navigate(['/employee-master/family-information/family-details']);
      }
    }, (error: any) => {
      this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
    })
  }

  updateEmpGridRow(previousEmploymentInformation) {

    previousEmploymentInformation.employeeMasterId = this.employeeMasterId;
    previousEmploymentInformation.dateOfJoining = this.datepipe.transform(previousEmploymentInformation.dateOfJoining, 'dd-MMM-yyyy');
    previousEmploymentInformation.dateOfRelieving = this.datepipe.transform(previousEmploymentInformation.dateOfRelieving, 'dd-MMM-yyyy');

    if (!this.previousEmploymentInformation.currency || !this.previousEmploymentInformation.lastCTCPerAnnum) {
      this.previousEmploymentInformation.currency = '';
      this.previousEmploymentInformation.lastCTCPerAnnum = '';
    }

    this.PreviousEmpInformationService.putPreviousEmpInfoForm(previousEmploymentInformation).subscribe(res => {

      this.getPreviousEmployees();
      this.CommonDataService.sweetalertMasterSuccess("Success..!!", res.status.messsage);
      this.viewEmploymentInfoForm = false;
      this.resetForm();
    }, (error: any) => {
      this.CommonDataService.sweetalertError(error["error"]["status"]["messsage"]);
    })
  }


  editEmpGridRow(employee) {
    this.viewEmploymentInfoForm = false;
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

    if (this.previousEmploymentInformation.currency) {
      const ctsPerAnum = this.previousEmploymentInfoForm.get('ctsPerAnum');
      ctsPerAnum.enable();
    }
    this.enableForm();
  }

  viewEmpGridRow(employee) {
    this.viewEmploymentInfoForm = true;

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

    this.disableForm();
  }

  deleteEmpGridRowDiaglog(employee) {

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
        this.resetForm();
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
    this.viewEmploymentInfoForm = false;
    this.previousEmploymentInfoForm.reset();
    this.previousEmploymentInformation.employeePreviousEmploymentId = '';
    this.previousEmploymentInformation.previousEmployerName = '';
    this.previousEmploymentInformation.previousDesignation = '';
    this.previousEmploymentInformation.dateOfJoining = '';
    this.previousEmploymentInformation.dateOfRelieving = '';
    this.previousEmploymentInformation.lastCTCPerAnnum = '';
    this.previousEmploymentInformation.remark = '';
    this.previousEmploymentInformation.previousJobProfile = '';
    this.previousEmploymentInformation.currency = '';
    this.previousEmploymentInfoForm.get('currency').setValue('');
    this.previousEmploymentInformation.exemptGratuityReceived = '';
    this.previousEmploymentInformation.exemptLeaveSalaryReceived = '';
    this.previousEmploymentInformation.exemptVRSReceived = '';
    const ctsPerAnum = this.previousEmploymentInfoForm.get('ctsPerAnum');
    ctsPerAnum.disable();
  }

  closePreviousEmpGridRow() {

    this.viewEmploymentInfoForm = false;
    this.resetForm();
    this.enableForm();
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

  disableForm() {

    const companyName = this.previousEmploymentInfoForm.get('companyName');
    companyName.disable();
    const joiningDate = this.previousEmploymentInfoForm.get('joiningDate');
    joiningDate.disable();
    const leaveDate = this.previousEmploymentInfoForm.get('leaveDate');
    leaveDate.disable();
    const remark = this.previousEmploymentInfoForm.get('remark');
    remark.disable();
    const designation = this.previousEmploymentInfoForm.get('designation');
    designation.disable();
    const jobProfile = this.previousEmploymentInfoForm.get('jobProfile');
    jobProfile.disable();
    const ctsPerAnum = this.previousEmploymentInfoForm.get('ctsPerAnum');
    ctsPerAnum.disable();
    const currency = this.previousEmploymentInfoForm.get('currency');
    currency.disable();
    const gratuity = this.previousEmploymentInfoForm.get('gratuity');
    gratuity.disable();
    const leaveEncashment = this.previousEmploymentInfoForm.get('leaveEncashment');
    leaveEncashment.disable();
    const vouluntaryRetirement = this.previousEmploymentInfoForm.get('vouluntaryRetirement');
    vouluntaryRetirement.disable();
  }

  enableForm() {


    const companyName = this.previousEmploymentInfoForm.get('companyName');
    companyName.enable();
    const joiningDate = this.previousEmploymentInfoForm.get('joiningDate');
    joiningDate.enable();
    const leaveDate = this.previousEmploymentInfoForm.get('leaveDate');
    leaveDate.enable();
    const remark = this.previousEmploymentInfoForm.get('remark');
    remark.enable();
    const designation = this.previousEmploymentInfoForm.get('designation');
    designation.enable();
    const jobProfile = this.previousEmploymentInfoForm.get('jobProfile');
    jobProfile.enable();
    const ctsPerAnum = this.previousEmploymentInfoForm.get('ctsPerAnum');
    ctsPerAnum.enable();
    const currency = this.previousEmploymentInfoForm.get('currency');
    currency.enable();
    const gratuity = this.previousEmploymentInfoForm.get('gratuity');
    gratuity.enable();
    const leaveEncashment = this.previousEmploymentInfoForm.get('leaveEncashment');
    leaveEncashment.enable();
    const vouluntaryRetirement = this.previousEmploymentInfoForm.get('vouluntaryRetirement');
    vouluntaryRetirement.enable();
  }

  validateCTCperAnum() {
    if (this.previousEmploymentInformation.currency) {
      const ctsPerAnum = this.previousEmploymentInfoForm.get('ctsPerAnum');
      ctsPerAnum.enable();
    } else {
      const ctsPerAnum = this.previousEmploymentInfoForm.get('ctsPerAnum');
      ctsPerAnum.disable();
    }
  }
  keyPress(event: any) {

    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
