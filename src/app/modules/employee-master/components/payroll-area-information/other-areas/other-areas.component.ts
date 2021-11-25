import { Component, OnInit } from '@angular/core';
import { SortEvent } from 'primeng/api';


interface users1 {
  srno;
  payrollarea;
  service;
  area;
  fromdate;
  todate;
  action;
 
}


@Component({
  selector: 'app-other-areas',
  templateUrl: './other-areas.component.html',
  styleUrls: ['./other-areas.component.scss']
})
export class OtherAreasComponent implements OnInit {
  users1: users1[];
  constructor() { }

  ngOnInit(): void {
    this.users1 = [
      { srno: '1', payrollarea: 'AAA',service:'BBB',  area: 'CCC',fromdate:'EEE',todate:'FFF',action:'ggg'},
    
    
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
