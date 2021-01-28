import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-payrollAreaMaster',
  templateUrl: './payrollAreaMaster.component.html',
  styleUrls: ['./payrollAreaMaster.component.scss'],
})
export class PayrollAreaMasterComponent implements OnInit {
  public form: FormGroup;
  public summary: Array<any> = [];

  public dropdownList = [];
  public selectedItems = [];
  public dropdownSettings: IDropdownSettings = {};

  constructor(private formBuilder: FormBuilder,) {
    
    
    this.form = this.formBuilder.group({
      code: new FormControl(null),
      description: new FormControl(null),
      id: new FormControl(0),
      numberOfApprover: new FormControl(null),
      changeOfApproverByManager: new FormControl(null),
      policyStartDate: new FormControl(null),
      active: new FormControl(null),
      remark: new FormControl(null),
    });
   }

  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  setPolicyEndDate() {}

}
