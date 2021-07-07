import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SortEvent } from 'primeng/api';

interface User1 {
  head;
  nature;

}

@Component({
  selector: 'app-non-recurring-qty-master',
  templateUrl: './non-recurring-qty-master.component.html',
  styleUrls: ['./non-recurring-qty-master.component.scss']
})
export class NonRecurringQtyMasterComponent implements OnInit {

  users1: User1[];
  nonrecuringForm: FormGroup;
  BasicInfoForm: FormGroup;
  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.BasicInfoForm = this.formBuilder.group({    
    });
    this.users1 = [
        { head: '1', nature: 'Earning'},
    
    
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

}
