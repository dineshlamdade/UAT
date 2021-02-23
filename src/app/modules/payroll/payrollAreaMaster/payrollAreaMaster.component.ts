import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { PayrollService } from '../payroll.service';

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

  constructor(private formBuilder: FormBuilder,
    private service: PayrollService) {
    this.form = this.formBuilder.group({
      payrollAreaId: new FormControl(null),
      payrollAreaCode: new FormControl(null, Validators.required),
      payrollAreaDescription: new FormControl(null),
      headGroupDefinitionId: new FormControl(0),
      currency: new FormControl(null),
      companyId: new FormControl(null),
      businessCycleDefinitionId: new FormControl(null),
      policyStartDate: new FormControl(null),
      defaultAttendace: new FormControl(null),
      defaultLanguage: new FormControl(null),
      minNetPaySDM: new FormControl(null),
      effectiveFromDate: new FormControl(null),
      effectiveToDate: new FormControl(null),
      isActive: new FormControl(null),
      remark: new FormControl(null),
    });
   }

  ngOnInit() {
    this.onPageLoad()
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

  onPageLoad() {
    this.service.getPayrollAreaDetails().subscribe((data)=>{
      console.log(data)
    })
    this.service.getBussinessCycleDetails().subscribe((data)=>{
      console.log(data)
    })
  }

}
