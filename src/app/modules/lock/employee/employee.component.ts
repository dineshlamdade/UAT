import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SortEvent } from 'primeng/api';

export interface User1 {
  srno;
  headtype;
  headcode;
  headdesc;
  openingval;
  chngamount;
  chngper;
  closingamt;
  unitofmeasure;
  remark;
}
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
interface City {
  name: string,

}
interface groups {
  name: string
  
}
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
 
  customers: Customer[];
  cities: City[];

  selectedCities: City[];

  group:groups[];
  users = [];
  areaSection = true;
  employeeSection = false;
  users1: User1[];
  public modalRef: BsModalRef;

  dropdownSettings = {};
  dropdownList = [];
  selectedItems = [];
  joinUser = true;
  constructor(private modalService: BsModalService) {
    this.cities = [
      {name: 'New York'},
      {name: 'Rome'},
      {name: 'London'},
      {name: 'Istanbul'},
      {name: 'Paris'}
  ];
   }
  
  ngOnInit(): void {
    this.users1 = [
      { srno: '1', headtype: 'Earning', headcode: 'AAA', headdesc: 'AAA Desc', openingval: '0.00', chngamount: '0.00', chngper: '2', closingamt: '0.00', unitofmeasure: 'PM', remark: 'Remark1' },
      { srno: '2', headtype: 'Earning', headcode: 'AAA', headdesc: 'AAA Desc', openingval: '0.00', chngamount: '0.00', chngper: '2', closingamt: '0.00', unitofmeasure: 'MM', remark: 'Remark1' },
      { srno: '3', headtype: 'Earning', headcode: 'AAA', headdesc: 'AAA Desc', openingval: '0.00', chngamount: '0.00', chngper: '2', closingamt: '0.00', unitofmeasure: 'PM', remark: 'Remark1' },
      { srno: '4', headtype: 'Earning', headcode: 'AAA', headdesc: 'AAA Desc', openingval: '0.00', chngamount: '0.00', chngper: '2', closingamt: '0.00', unitofmeasure: 'PA', remark: 'Remark1' },
    ];
   
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
   
 

    this.selectedItems = [];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'label',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };

    this.dropdownList = [
      { id: 1, label: 'ABC' },
      { id: 2, label: 'PQR' },
      { id: 3, label: 'XYZ' },
      { id: 4, label: 'AAA' },
      { id: 5, label: 'BBB' }
    ];


  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  ViewHistory(template44: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template44,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  cycleList(template3: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template3,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  areaSelect() {
 this.areaSection = true;
 this.employeeSection = false;
  }
  employeeSelect() {
    this.areaSection = false;
    this.employeeSection = true;
  }
  createUser(uname){
    this.users.push({
      name:uname.value
    })
 
  }
  removeUsers(item){
    this.users.splice(item, 1)
  }
  // Schedule(template2: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(
  //     template2,
  //     Object.assign({}, { class: 'gray modal-lg' })
  //   );
  // }

}
function customSort(event: Event, SortEvent: any) {
  throw new Error('Function not implemented.');
}

