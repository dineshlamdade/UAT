import { Component, OnInit, ViewEncapsulation, ViewChild, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { EventEmitterService } from './../../employee-master-services/event-emitter/event-emitter.service';
import { Subscription } from 'rxjs';
import { PayrollAreaRequestModel } from './payroll-area-information.model';
import { PayrollAreaInformationService } from './payroll-area-information.service';
import { SharedInformationService } from '../../employee-master-services/shared-service/shared-information.service';
import { Router } from '@angular/router';
import { PreviousEmploymentInformationService } from '../previous-employment-information/previous-employment-information.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { familyAddressDetailRequestDTO } from '../family-information/family-information.model';
import { distinct } from 'rxjs/operators';
import { resolveSanitizationFn } from '@angular/compiler/src/render3/view/template';
import { SortEvent } from 'primeng/api';


interface users1 {
  srno;
  payrollarea;
  description;
  type;
  primaryareaname;
  fromdate;
  todate;
  action;
 
}

@Component({
  selector: 'app-payroll-area-information',
  templateUrl: './payroll-area-information.component.html',
  styleUrls: ['./payroll-area-information.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PayrollAreaInformationComponent implements OnInit {
  users1: users1[];
  constructor() { }

  ngOnInit(): void {
    this.users1 = [
      { srno: '1', payrollarea: 'AAA',description:'BBB',  type: 'CCC',primaryareaname :'DDD',fromdate:'EEE',todate:'FFF',action:'ggg'},
    
    
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
