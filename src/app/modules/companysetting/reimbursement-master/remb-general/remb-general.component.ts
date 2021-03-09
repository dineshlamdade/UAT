import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-remb-general',
  templateUrl: './remb-general.component.html',
  styleUrls: ['./remb-general.component.scss']
})
export class RembGeneralComponent implements OnInit {
  public dropdownList = [];
  public selectedItems = [];
  constructor() {

  }

  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'label',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 2,
    allowSearchFilter: true
  };



  dropdownList1 = [
    { id: 1, label: 'ABC' },
    { id: 2, label: 'PQR' },
    { id: 3, label: 'XYZ' },
    { id: 4, label: 'AAA' },
    { id: 5, label: 'BBB' }
  ];

  ngOnInit(): void {
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

}
