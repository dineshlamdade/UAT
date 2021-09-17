import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SortEvent } from 'primeng/api';
export interface Customer {
  empcode;
   empName;
   Group;
   Frequency;
   Type;
   proofsubmission;
   PSIdDetails;
   SubmissionDate;
   Status;
 }

 export interface user1 {
  Group;
  ITSection;
  // noemployees;
  // nopsid;
  proofsubmitted;
  actioned;
  yettoactioned;
  submitted;
  sendback;
  approved;
 }
 interface City {
  name: string
  
}
interface groups {
  name: string
  
}

@Component({
  selector: 'app-approved-investment',
  templateUrl: './approved-investment.component.html',
  styleUrls: ['./approved-investment.component.scss']
})
export class ApprovedInvestmentComponent implements OnInit {
  public modalRef: BsModalRef;
  customers: Customer[];
  cities: City[];
  users1: user1[];
  group:groups[];
  first = 0;

  rows = 10;
  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  
    
this.customers = [
  {empcode: '551', empName: 'abc', Group:'House Rent', Frequency:'80-TTA', Type:'M',proofsubmission:'234234',PSIdDetails:'ABC',SubmissionDate:'12/3/2020',Status:'Submitted'},
  {empcode: '11', empName: 'ssss', Group:'House Rent', Frequency:'80-TTA', Type:'T',proofsubmission:'234234',PSIdDetails:'ABC',SubmissionDate:'12/3/2020',Status:'Submitted'},
  {empcode: '11', empName: 'dddddd', Group:'House Rent', Frequency:'80-TTA', Type:'M',proofsubmission:'234234',PSIdDetails:'ABC',SubmissionDate:'12/3/2020',Status:'Submitted'},
  {empcode: '555', empName: 'dddddd', Group:'House Rent', Frequency:'80-TTA', Type:'T',proofsubmission:'234234',PSIdDetails:'ABC',SubmissionDate:'12/3/2020',Status:'Submitted'},
  {empcode: '11', empName: 'dddddd', Group:'House Rent', Frequency:'80-TTA', Type:'M',proofsubmission:'234234',PSIdDetails:'ABC',SubmissionDate:'12/3/2020',Status:'Submitted'},
  {empcode: '1', empName: 'dddddd', Group:'House Rent', Frequency:'80-TTA', Type:'T',proofsubmission:'234234',PSIdDetails:'ABC',SubmissionDate:'12/3/2020',Status:'Submitted'},
  {empcode: '1', empName: 'dddddd', Group:'House Rent', Frequency:'80-TTA', Type:'M',proofsubmission:'234234',PSIdDetails:'ABC',SubmissionDate:'12/3/2020',Status:'Submitted'},
  {empcode: '1', empName: 'dddddd', Group:'House Rent', Frequency:'80-TTA', Type:'M',proofsubmission:'234234',PSIdDetails:'ABC',SubmissionDate:'12/3/2020',Status:'Submitted'},
  {empcode: '1', empName: 'dddddd', Group:'dddddd', Frequency:'80-TTA', Type:'M',proofsubmission:'234234',PSIdDetails:'ABC',SubmissionDate:'12/3/2020',Status:'Submitted'},
  {empcode: '888', empName: 'dddddd', Group:'dddddd', Frequency:'80-TTA', Type:'M',proofsubmission:'234234',PSIdDetails:'ABC',SubmissionDate:'12/3/2020',Status:'Submitted'},
  {empcode: '1', empName: 'dddddd', Group:'dddddd', Frequency:'fffff', Type:'M',proofsubmission:'234234',PSIdDetails:'ABC',SubmissionDate:'12/3/2020',Status:'Submitted'},
  {empcode: '1', empName: 'dddddd', Group:'dddddd', Frequency:'fffff', Type:'M',proofsubmission:'234234',PSIdDetails:'ABC',SubmissionDate:'12/3/2020',Status:'Submitted'},
  {empcode: '66', empName: 'dddddd', Group:'dddddd', Frequency:'fffff', Type:'123',proofsubmission:'234234',PSIdDetails:'ABC',SubmissionDate:'12/3/2020',Status:'Submitted'},
 
];


this.users1 = [
  {Group:'80-c',
  ITSection:'LIC',
  // noemployees:'Rihan',
  // nopsid:'123',
   proofsubmitted:'yes',
  actioned:'submitted',
  yettoactioned:'ABCS',
  submitted:'yes',
  sendback:'No',
  approved:'yes'}  ];
this.cities = [
  {name: 'LIC'},
  {name: 'PPF'},
  {name: 'Pensionplan'},
  
];

this.group = [
  {name: '80-C'},
  {name: 'grp2'},
  {name: 'grp3'},

];

}
customSort(event: SortEvent) {
  event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null)
          result = -1;
      else if (value1 != null && value2 == null)
          result = 1;
      else if (value1 == null && value2 == null)
          result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
          result = value1.localeCompare(value2);
      else
          result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return (event.order * result);
  });
}
UploadModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(
    template,
    Object.assign({}, { class: 'gray modal-lg' })
  );
}
UploadModal2(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(
    template,
    Object.assign({}, { class: 'gray modal-lg' })
  );
}

next() {
    this.first = this.first + this.rows;
}

prev() {
    this.first = this.first - this.rows;
}

reset() {
    this.first = 0;
}

isLastPage(): boolean {
    return this.customers ? this.first === (this.customers.length - this.rows): true;
}

isFirstPage(): boolean {
    return this.customers ? this.first === 0 : true;
}

}



