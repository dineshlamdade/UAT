import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';


@Component({
  selector: 'app-garnishment-master',
  templateUrl: './garnishment-master.component.html',
  styleUrls: ['./garnishment-master.component.scss']
})
export class GarnishmentMasterComponent implements OnInit {

  
  submitted = false;
  form:FormGroup;

  constructor(private formbuilder: FormBuilder) 
  { 
    this.form = this.formbuilder.group({
      // code: new FormControl(
      //   { value: null, disabled: true },
      //   Validators.required
      // ),
      code: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      contactNumber: new FormControl(null, Validators.required),
     

      phoneNumber: new FormControl(null, Validators.required),
      emailId: new FormControl(null, Validators.required),
      address1: new FormControl(null, Validators.required),
      address2: new FormControl(null, Validators.required),
      address3: new FormControl(null,Validators.required),
      country: new FormControl(null, Validators.required),
      pin: new FormControl(null, Validators.required),
      // annualAmount: new FormControl(
      //   { value: null, disabled: true },
      //   Validators.required
      // ),
      state: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      village: new FormControl(null, Validators.required),
      pan: new FormControl(null, Validators.required),
      accountNoPayeeBook: new FormControl(null, Validators.required),
      deductionHead: new FormControl(null, Validators.required),
      formula: new FormControl(null, Validators.required),
      sdm: new FormControl(null, Validators.required),
      frequency: new FormControl(null, Validators.required),
      incomeTexSection: new FormControl(null, Validators.required),
      familyMember: new FormControl(null, Validators.required),

      // ecs: new FormControl('0'),
      // licMasterPaymentDetailsId: new FormControl(0),
      // licMasterId: new FormControl(0),
    });

  }

 
  ngOnInit(): void {
    

  }

   get masterForm() {
    return this.form.controls;
  }
  //-------------- Post Master Page Data API call -------------------
  public addMaster(formData: any, formDirective: FormGroupDirective): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
  }
}
