import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoanService } from '../loan.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-new-loan',
  templateUrl: './add-new-loan.component.html',
  styleUrls: ['./add-new-loan.component.scss']
})
export class AddNewLoanComponent implements OnInit {
  AddLoanForm:FormGroup;
  public modalRef: BsModalRef;
  loanData: any;
  editflag: boolean = false;
  isVisible:boolean=false;
  isShown: boolean= true;
  loanTypeData: any;
  isAssetValue:boolean=true;
  loanType: any;
  scheduleData: any;
  loanCode: any;
  noOfInstallment: any;
  installmentAmount: number = 0;
  loanCodeName: any;

  constructor(public formBuilder : FormBuilder,
    private modalService: BsModalService, public loanservice:LoanService,public toster : ToastrService ) {
    this.AddLoanForm = this.formBuilder.group(
      {
        "createdBy":new FormControl(''),
        "createDateTime":new FormControl(''),
        "lastModifiedBy":new FormControl(''),
        "lastModifiedDateTime":new FormControl(''),
        "active":new FormControl(true),
        "employeeCode":new FormControl(''),

        "installmentAmount":new FormControl(''),

        "loanMasterId":new FormControl('',[Validators.required]),
        "loanCode":new FormControl(''),

        "loanType": new FormControl(''),
        "repaymentType":new FormControl(''),
        "underlineAssestValue":new FormControl(''),
        "carOrInstitutionType":new FormControl(''),

        "loanAmount":new FormControl('',[Validators.required]),
        "interestRate":new FormControl(''),

        "noOfInstallment":new FormControl(''),
        "endDate":new FormControl(''),
        "remark":new FormControl(''),
        "externalReferenceNumber":new FormControl(''),
        "loanApplicationNumber": new FormControl(''),
        guarantors : [
          {
            "employeeCode":new FormControl(''),
            "employeeFullName":new FormControl(''),
            "createdBy":new FormControl(''),
            "createDateTime":new FormControl(''),
            "lastModifiedBy":new FormControl(''),
            "lastModifiedDateTime":new FormControl(''),
            "active":new FormControl(true),
          }
      ],
        deviations: [
        {
            "deviationType":new FormControl(''),
            "userLimit":new FormControl(''),
            "deviationValue":new FormControl(''),
            "addloanFormSubmitreason":new FormControl(''),
            "createdBy":new FormControl(''),
            "createDateTime":new FormControl(''),
            "lastModifiedBy":new FormControl(''),
            "lastModifiedDateTime":new FormControl(''),
            "active":new FormControl(true),
        }
    ],
    "uploadDocuments": [],
    "approverDetails": [
      {
              "approverLevel": new FormControl(''),
              "approverCode": new FormControl(''),
              "approverName": new FormControl(''),
              "actionDate": new FormControl(''),
              "action": new FormControl(''),
              "remark":new FormControl(''),
              "status": new FormControl(''),
              "createdBy": new FormControl(''),
              "createDateTime": new FormControl(''),
              "lastModifiedBy":new FormControl(''),
              "lastModifiedDateTime": new FormControl(''),
              "active": new FormControl(true),
      }
     ],
      }
    )
   }

  ngOnInit(): void {
    this.getAllData();
    this.getAllLoanType();

  }

  get f(){
    return this.AddLoanForm.controls;
  }
  addloanFormSubmit()
  {
    if(!this.editflag){
    this.loanservice.addLoan(this.AddLoanForm.value).subscribe(res =>
      {
        this.toster.success("",'Loan Added Successfully');
        this.getAllData();

      })
    }else
    {

    }

    if (this.AddLoanForm.invalid) {
      return;
    }
    this.reset();

  }


  updateLoan()
  {
    this.loanservice.updateLoan(this.AddLoanForm.value).subscribe(res =>
      {
        this.toster.success("",'Loan Updated Successfully');
        this.getAllData();
      })
  }
  editQuery(loan)
  {
    this.editflag = true;
    this.AddLoanForm.enable();
    this.AddLoanForm.patchValue(loan);
    this.isVisible =true;
    this.isShown = false;

  }
  viewQuery(loan)
  {
    this.editflag = false;
   this.AddLoanForm.patchValue(loan);
   this.AddLoanForm.disable();
  }
  reset(){
    this.AddLoanForm.enable();
    this.AddLoanForm.reset();
    this.AddLoanForm.controls['repaymentType'].disable();
    // this.AddLoanForm.controls['endDate'].disable();
    this.AddLoanForm.controls['interestRate'].disable();
    this.AddLoanForm.controls['noOfInstallment'].disable();
    // this.AddLoanForm.controls['installmentAmount'].disable();
  }
cancel()
{
  this.reset();
}

schedule(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(
    template,
    Object.assign({}, { class: 'gray modal-xl' })
  );
this.allScheduleData();

}
getAllData()
{
this.loanservice.getAll().subscribe(res =>
  {
    this.loanData = res.data.results;
  })
}
getAllLoanType()
{
  this.loanservice.getAllLoanType().subscribe(res => {
    this.loanTypeData = res.data.results[0];

  })
}

loanAmount:number;
flatIntrest:number;
allScheduleData()
{
  let data =
  {
    "flatIntrest": this.flatIntrest,
    "loanAmount": this.loanAmount,
    "loanCode":this.loanCodeName,
  }
  this.loanservice.allScheduleData(data).subscribe(res =>
    {
      this.scheduleData = res.data.results[0];
    })

}

assetValueShowHide($event)
{
this.loanType = $event;
this.loanTypeData.forEach(element => {
  if(element.loanMasterId == this.loanType){
    this.AddLoanForm.controls['underlineAssestValue'].setValue(element.underliningAsset);
    this.AddLoanForm.controls['interestRate'].setValue(element.intRate);
    this.AddLoanForm.controls['repaymentType'].setValue(element.recoveryMethod);
    this.AddLoanForm.controls['noOfInstallment'].setValue(element.recoveryNoOfInstallments);

    this.noOfInstallment = element.recoveryNoOfInstallments;
    this.flatIntrest = element.intRate;
    // this.installmentAmount = this.loanAmount / this.noOfInstallament;

    console.log("**********",element);
  }

});

this.loanCode = $event;
this.loanTypeData.forEach(element => {
  if(element.loanMasterId == this.loanType){
    this.loanCodeName = element.loanCode;
  if(element.loanCode == 'Car Loan' || element.loanCode =='Education Loan'){

    this.isAssetValue = false;
    this.AddLoanForm.controls['carOrInstitutionType'].setValue(element.loanCode);
  }
  else{
    this.isAssetValue = true;
  }}
});

}
calculateInstallmentAmount(value)
{
      this.loanAmount = value;
      this.installmentAmount = this.loanAmount / this.noOfInstallment;
      this.installmentAmount = Math.round(this.installmentAmount );
      this.AddLoanForm.controls['installmentAmount'].setValue(this.installmentAmount);

}

}
