import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {
  LoanForm: FormGroup;

  constructor(public formBuilder : FormBuilder , private router: Router) {
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

}
