import { CompanySettingsService } from './../company-settings.service';
import { AlertServiceService } from './../../../core/services/alert-service.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HostListener } from '@angular/core';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { trigger, transition, animate, style } from '@angular/animations'

@Component({
  selector: 'app-loan-master',
  templateUrl: './loan-master.component.html',
  styleUrls: ['./loan-master.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('500ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        style({transform: 'translateX(0%)'}),
        animate('0ms ease-in', style({transform: 'translateX(-100%)'}))
      ])
    ]),

  ]
})
export class LoanMasterComponent implements OnInit {
  public tabIndex = 0;
  public windowScrolled: boolean;
  public summaryGridData: Array<any> = [];
  public generalForm: FormGroup;
  frequencyOfPaymentList: { value: number; label: string; }[];
  public methodOfComputation: string[] = ['Day Basis','Month Basis'];
  public dateOfTransactions: string[] = ['Chargeable','Non-Chargeable'];
  public cycleOfDisbursement: string[] = ['Full Period','Outstanding Days'];
  public cycleOfLastInstallment: string[] = ['Full Period','Outstanding Days'];
  public cycleOfAdhocPayments: string[] = ['From same Cycle','Next Cycle'];
  public beforePrincipalRepaymentStarts: string[] = ['Add in the Loan Amount','Recover in each of the Cycle'];
  public principalRepaymentMethod: string[] = ['EMI','Reducing Balance','Flat Interest','Perpetual','Principal First & then Interest'];
  public principalRepaymentMonth: number[] = [1,2,3,4,5,6,7,8,9,10,11,12];
  public principalRepaymentRecoveryStarts: string[] = ['After first Disbursement','After full Disbursement'];
  public adhocPaymentsTreatment: string[] = ['Reduce Installment','Reduce Tenure'];
  public skippedPaymentPrincipal: string[] = ['Yes','No'];
  public skippedPaymentInterest: string[] = ['Yes','No'];
  public taxSettingsLoanCategory: string[] = ['Car Loan','Education Loan','Housing Loan','Two Wheeler','Other Loan'];
  public taxSettingsLoanSubCategory: string[] = ['First Hand','Second Hand'];
  public guarantorDetails: number[] = [1,2,3];
  selectedImageFileLogo1: any;
  interval;
  stepperIndex= 0;


  constructor(private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private service: CompanySettingsService,
    private alertService: AlertServiceService) {

    this.generalForm = this.formBuilder.group({
        loanMasterId: new FormControl(null),
        loanCode: new FormControl(null, Validators.required),
        loanDescription: new FormControl(null),
        servicePeriod: new FormControl(null),
        underliningAsset: new FormControl(null),
        minRemainingServiceLoanApplication: new FormControl(null),
        minRemainingServiceLoanCompletion: new FormControl(null),
        noOfTimesOfSalary: new FormControl(null),
        salaryDefinition: new FormControl(null),
        maxAmountLoan: new FormControl(null),
        gapBetTwoLoanApp: new FormControl(null),
        gapEndOfEarlierLoanAndNewLoanApp: new FormControl(null),
        noOfInstances: new FormControl(null),
        noOfInstancesMonth:  new FormControl(null),
        recoveryMethod: new FormControl(null),
        recoveryNoOfInstallments:  new FormControl(null),
        intRate:  new FormControl(null),
        firstPriThanIntNoOfInstallmentForIntRecovery:  new FormControl(null),
        intAddInPri:  new FormControl(null),
        intDateOfTransactions:  new FormControl(null),
        intCycleOfDisbursement:  new FormControl(null),
        intAdhocPayments: new FormControl(null),
        intBeforePriRepaymentsSatrts:  new FormControl(null),
        recoveryToStartDisbursements: new FormControl(null),
        recoveryToStartSalaryCycles: new FormControl(null),
        adhocPaymentsTreatment: new FormControl(null),
        documentLName: new FormControl(null),
        assignmentsIntHead:  new FormControl(null),
        assignmentPriHead:  new FormControl(null),
        assignmentsLoanPayment: new FormControl(null),
        assignmentsPerquisite: new FormControl(null),
        taxSettingPerquisiteType:  new FormControl(null),
        taxSettingPerquisiteSubCategory: new FormControl(null),
        taxSettingCalculatePerquisiteOn: new FormControl(null),
        minimumNetPayLoan: new FormControl(null),
        noOfGuarantor:  new FormControl(null),
        loanApplicationTemplate:  new FormControl(null),
        approvalWorkFlowSDM:  new FormControl(null)
      
    })
  }

  ngOnInit(): void {
    this.tabIndex = 0;
    this.frequencyOfPaymentList = [{
      value:1,
      label: 'Hello'
    },
    {
      value:2,
      label: 'Cello'
    },
  ]

   this.service.getLoanMaster().subscribe((res)=> {
    console.log(res)
     this.summaryGridData = res.data.results[0];
  })


    
  }

  changeTabIndexForRedirect(event: any) {
    this.tabIndex = event.tabIndex;
  }

  changeTabIndex(index: number) {
    console.log(index)
   
      if (index > 1){
     
    this.tabIndex = this.generalForm.get('loanCode').value ===null? 1: index
    this.tabIndex === 1? this.alertService.sweetalertWarning('Please fill value in General - Code') : null;
    }else{
      this.tabIndex = index;
    }
  }

  public modalRef: BsModalRef;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop > 100
    ) {
      this.windowScrolled = true;
    } else if (
      (this.windowScrolled && window.pageYOffset) ||
      document.documentElement.scrollTop ||
      document.body.scrollTop < 10
    ) {
      this.windowScrolled = false;
    }
  }

  scrollToTop() {
    (function smoothscroll() {
      let currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - currentScroll / 8);
      }
    })();
  }
  submitGeneral() {
    console.log(this.generalForm.getRawValue());
    this.scrollToTop()
    this.tabIndex = this.generalForm.get('loanCode').value ===null? 1: 2
    this.tabIndex === 1? this.alertService.sweetalertWarning('Please fill value in General - Code') : null;
  }

  submitRecovery(){
    this.scrollToTop()
    this.tabIndex = this.generalForm.get('loanCode').value ===null? 1: 3
    this.tabIndex === 1? this.alertService.sweetalertWarning('Please fill value in General - Code') : null;
    // console.log(this.generalForm.getRawValue());
  }

  save() {
    this.scrollToTop()
    this.tabIndex = this.generalForm.get('loanCode').value ===null? 1: 0
    this.tabIndex === 1? this.alertService.sweetalertWarning('Please fill value in General - Code') : null;
    console.log(this.generalForm.getRawValue());
    this.generalForm.reset()
  }

  edit(data) {
    this.generalForm.enable();
    this.generalForm.patchValue(data);
    this.tabIndex = 1;
  }

  view(data) {
    this.generalForm.disable();
    this.generalForm.patchValue(data);
    this.tabIndex = 1;
  }

  templateUpload(event, uploadFile){
    console.log('in log1');

    let file = (event.target.files[0] as File);
    let reader = new FileReader();
    console.log(reader);

    if (event.target.files && event.target.files.length) {


      this.selectedImageFileLogo1 = event.target.files[0];
      const [file] = event.target.files;
      reader.readAsDataURL(file);
     // console.log(reader.result);
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }

    abc(i) {
      if((i > 1) && (this.generalForm.get('loanCode').status ==='INVALID')){
        return;
      }
      this.stepperIndex = i;

    }
}