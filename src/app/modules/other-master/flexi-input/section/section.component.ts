import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SortEvent } from 'primeng/api';

import { DatePipe, DOCUMENT } from '@angular/common';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { FlexiInputService } from '../flexi-input.service';
export interface ltaavailed {
  flexisectionname;
  flexisection;
  maxlimit;
  ownfixedlimit;
  balancingapplicable;
  balancingapplicableearning;

}
export interface Summ {
type;
EDhead;
attribute;
nonedhead;
orderno;
}
interface City {
  name: string,
  code: string
}
@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  Summs:Summ[];
  cities: City[];

  public modalRef: BsModalRef;
  public flexiSextionNoList: Array<any> = [];
  public ltaavailed1: Array<any> = [];
  public balancingList: Array<any> = [];
  public ownFixList: Array<any> = [];
  public tableDataList : Array<any> = [];
  public sectionForm: any;
  public FormBuilder: any;
  constructor(private flexiInputService : FlexiInputService, private modalService: BsModalService, private formBuilder: FormBuilder,  @Inject(DOCUMENT) private document: Document,
  public sanitizer: DomSanitizer,    private datePipe: DatePipe,
  private http: HttpClient,
  public dialog: MatDialog)  {



   }

  ngOnInit(): void {

    this.sectionReactiveForm();
    this.getTableData();
    // Flexi Section No.
    this.flexiSextionNoList = [
      { label: 'CTC', value: 'CTC' },
      { label: 'Fixed Section', value: 'Fixed Section' },
      { label: 'Flexi Section1', value: 'Flexi Section1' },
      { label: 'Flexi Section2', value: 'Flexi Section2' },
      { label: 'Flexi Section3', value: 'Flexi Section3' },
    ];


      // Flexi Section No.
      this.ownFixList = [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ];


        // balancing List
    this.balancingList = [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' }
    ];



  }

  openmodel(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
    }
  //Reactive on Section Master
  sectionReactiveForm(){
  this.sectionForm = this.formBuilder.group({
  flexiSectionName :  new FormControl(''),
  flexiSectionNumber : new FormControl('', Validators.required),
  ownFixLimit : new FormControl('', Validators.required),
  ownFixLimitValue : new FormControl('', Validators.required),
  derivedValue : new FormControl('', Validators.required),
  balancing : new FormControl('', Validators.required),
  })

}



//Get Table Data List API Call
getTableData(){
this.flexiInputService.getAllSectionTableList().subscribe((res) =>{
  this.tableDataList =  res.data.results;
  console.log("public Table data List", this.tableDataList);
})

}
//Post Section Json
// {
//   "balancingFigureApplicable": 1,
//   "derivedValue": 1,
//   "flexiSectionName": "f1",
//   "isActive": 1,
//   "ownFixLimit": 1,
//   "ownFixedLimitValue": 1
// }

//Update  Json
// {
//   "flexiSectionMasterId": 1,
//   "flexiSectionName": "FlexiModel",
//   "ownFixLimit": 1,
//   "ownFixedLimitValue": 1,
//   "derivedValue": 1,
//   "balancingFigureApplicable": 1
// }

//Reset Form Function
resetForm(){
  this.sectionForm.reset();
  this.sectionForm.patchValue({
  flexiSectionName: '',
  flexiSectionNumber: '',
  derivedValue: '',
  ownFixLimit: '',
  ownFixLimitValue: '',
  balancing: ''
});
}
}
