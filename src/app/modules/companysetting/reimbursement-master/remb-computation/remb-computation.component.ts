import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-remb-computation',
  templateUrl: './remb-computation.component.html',
  styleUrls: ['./remb-computation.component.scss']
})
export class RembComputationComponent implements OnInit {

  dropdownSettings = {};
  dropdownList = [];
  selectedItems = [];

  constructor() { }

  ngOnInit(): void {

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
      { id: 1, label: 'FNF' },
      { id: 2, label: 'Last Cycle ' },
      { id: 3, label: 'Intermediary' },
    ];

  }

  onItemSelect(event) {
    console.log(event);
  }

  onSelectAll(event) {
    console.log(event);
  }

}
