import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-new-loan',
  templateUrl: './add-new-loan.component.html',
  styleUrls: ['./add-new-loan.component.scss']
})
export class AddNewLoanComponent implements OnInit {
  AddLoanForm:FormGroup;

  constructor(public formBuilder : FormBuilder) {
    this.AddLoanForm = this.formBuilder.group(
      {
        loantype: new FormControl('null'),
      }
    )
   }

  ngOnInit(): void {
  }
  addloanFormSubmit()
  {

  }

}
