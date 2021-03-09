import { Component, OnInit } from '@angular/core';
import { SummaryService } from './summary.service'; 
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-summary-form',
  templateUrl: './summary-form.component.html',
  styleUrls: ['./summary-form.component.scss']
})

export class SummaryFormComponent implements OnInit {
  public summaryForm: FormGroup;
  public loading = false;
  public submitted = false;
  public summaryList = [];
  public registersLists: any;

  constructor(
    private summaryService: SummaryService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.summaryForm = this.fb.group({
      regTemplateName: new FormControl ('', Validators.required),
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
  get f() { return this.summaryForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.summaryForm.invalid) {
      return;
    }
    this.loading = true;
    console.log(this.summaryForm.value);
  }
  getAllFields() {
    // this.registersLists={};
    this.summaryService.getSummaryFields().subscribe((response) => {
      // this.registersLists = response.data.results;
      let i = 1;
      response.data.results.forEach(element => {
        const myobj = {
          srno: i++,
          fieldName: element.fieldName,
          displayName: element.displayName,
          enable: element.enable,
          dropDownValues: element.dropDownValues,
          claimForm: element.claimForm,
          sequence: element.sequence,
          mandatory: element.mandatory
        };
        this.summaryList.push(myobj);
        // console.log("registerlist" + this.registersList);
      });
      console.log(this.summaryList);
    });
  }


}
