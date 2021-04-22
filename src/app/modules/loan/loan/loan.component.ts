import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {
  LoanForm: FormGroup;
  public modalRef: BsModalRef;


  constructor(public formBuilder : FormBuilder, private router: Router, private modalService: BsModalService,) {
    this.LoanForm = this.formBuilder.group({

    })

   }

  ngOnInit(): void {
  }
  loanFormSubmit()
  {

  }
  nextPage()
  {
    this.router.navigate(['/loan/add-new-loan']);
  }
  disbursementRequest(template1: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template1,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  adhocRepayment(template2: TemplateRef<any>){
    this.modalRef = this.modalService.show(
      template2,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  rescheduleRequest(template3: TemplateRef<any>)
  {
    this.modalRef = this.modalService.show(
      template3,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  settlementRequest(template4: TemplateRef<any>)
  {
    this.modalRef = this.modalService.show(
      template4,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  download(){}
  exportAsXLSX(){}
}
