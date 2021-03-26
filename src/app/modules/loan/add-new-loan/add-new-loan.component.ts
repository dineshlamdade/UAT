import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

  constructor(public formBuilder : FormBuilder,
    private modalService: BsModalService, public loanservice:LoanService,public toster : ToastrService ) {
    this.AddLoanForm = this.formBuilder.group(
      {
        createdBy:new FormControl(''),
        createDateTime:new FormControl(''),
        lastModifiedBy:new FormControl(''),
        lastModifiedDateTime:new FormControl(''),
        active:new FormControl(true),
        employeeCode:new FormControl(''),

        loanType: new FormControl(''),
        repaymentType:new FormControl(''),
        underlineAssestValue:new FormControl(''),
        carOrInstitutionType:new FormControl(''),
        loanAmount:new FormControl(''),
        interestRate:new FormControl(''),
        noOfInstallment:new FormControl(''),
        endDate:new FormControl(''),
        remark:new FormControl(''),
        externalReferenceNumber:new FormControl(''),
        guarantors : [
          {
              employeeCode:new FormControl(''),
              employeeFullName:new FormControl(''),
              createdBy:new FormControl(''),
              createDateTime:new FormControl(''),
              lastModifiedBy:new FormControl(''),
              lastModifiedDateTime:new FormControl(''),
              active:new FormControl(true),
          }
      ],
        deviations: [
        {
            deviationType:new FormControl(''),
            userLimit:new FormControl(''),
            deviationValue:new FormControl(''),
            reason:new FormControl(''),
            createdBy:new FormControl(''),
            createDateTime:new FormControl(''),
            lastModifiedBy:new FormControl(''),
            lastModifiedDateTime:new FormControl(''),
            active:new FormControl(true),
        }
    ],
    uploadDocuments: [],
    approverDetails: [
      {
          approverLevel: new FormControl(''),
          approverCode: new FormControl(''),
          approverName: new FormControl(''),
          actionDate: new FormControl(''),
          action: new FormControl(''),
          remark:new FormControl(''),
          status: new FormControl(''),
          createdBy: new FormControl(''),
          createDateTime: new FormControl(''),
          lastModifiedBy:new FormControl(''),
          lastModifiedDateTime: new FormControl(''),
          active: new FormControl(true),
      }
     ],
      }
    )
   }

  ngOnInit(): void {
    this.getAllData();
    this.getAllLoanType();

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
      // this.updateLoan();
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
    this.AddLoanForm.controls['code'].disable();
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
  }
cancel()
{
  this.reset();
}

schedule(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(
    template,
    Object.assign({}, { class: 'gray modal-md' })
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
    this.loanTypeData = res.data.results;

  })
}
allScheduleData()
{
  this.loanservice.allScheduleData(this.AddLoanForm.value).subscribe(res =>
    {
      // this.toster.success("",'Loan Updated Successfully');
    })

}

}
