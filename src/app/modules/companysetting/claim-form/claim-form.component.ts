import { Component, OnInit } from '@angular/core';
import { ClaimService } from './claim.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-claim-form',
  templateUrl: './claim-form.component.html',
  styleUrls: ['./claim-form.component.scss']
})
export class ClaimFormComponent implements OnInit {
  public claimForm:FormGroup;
  public loading = false;
  public submitted = false;
  public claimList = [];
  public claimLists:any;


  constructor(
    private claimService:ClaimService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.claimForm = this.fb.group({
      regTemplateName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      registrationTemplateList: new FormGroup({
        regTempStandardFieldId: new FormControl(''),
        fieldName: new FormControl(''),
        displayName: new FormControl(''),
        enable: new FormControl(),
        mandatory: new FormControl(),
        dropDownValues: new FormControl(),
        claimForm: new FormControl(''),
        sequence: new FormControl(''),
      }),
    })
    this.getAllFields();
  }

  get f() { return this.claimForm.controls; }

  onSubmit(){
    this.submitted = true;
    if(this.claimForm.invalid){
      return;
    }
    this.loading = true;
    console.log(this.claimForm.value);
  }

  getAllFields(){
    this.claimService.getClaimFields().subscribe((response) =>{
      let i = 1;
      response.data.results.forEach(element =>{
        const myobj = {
          srno: i++,
          fieldName: element.fieldName,
          displayName: element.displayName,
          enable: element.enable,
          dropDownValues: element.dropDownValues,
          sequence: element.sequence,
          mandatory: element.mandatory
        };
        this.claimList.push(myobj);
      });
      console.log(this.claimList);
    })
  }

}
