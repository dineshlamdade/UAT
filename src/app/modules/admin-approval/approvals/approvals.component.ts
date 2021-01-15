import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.scss']
})
export class ApprovalsComponent implements OnInit {

  constructor() { }

  dropdownList = [];
  JFdropdownList=[];
  JF2dropdownList=[];
  selectedItems = [];
  dropdownSettings = {};
  sourceProducts: any[];

  targetProducts: any[];

  dropdownList1=[];
  dropdownList3=[];
  ngOnInit() {
    this.dropdownList1 = [
      { id: 1, label: 'ABC' },
      { id: 2, label: 'PQR' },
      { id: 3, label: 'XYZ' },
      { id: 4, label: 'AAA' },
      { id: 5, label: 'BBB' }
    ];
    this.dropdownList3= [
      { id: 1, label: 'House Rent' },
      { id: 2, label: 'Loan' },
      { id: 3, label: 'Chapter VI-A' },
      { id: 4, label: '80-C' }
    ];
    this.JFdropdownList=[
      { id: 1, label: 'Grade' },
      { id: 2, label: 'Department' },

    ]
    this.JF2dropdownList = [
      { id: 1, label: 'G1' },
      { id: 2, label: 'G2' },
      { id: 3, label: 'D1' },
      { id: 4, label: 'D2' },
      { id: 5, label: 'D3' }
    ];
    this.selectedItems = [
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'label',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

}
