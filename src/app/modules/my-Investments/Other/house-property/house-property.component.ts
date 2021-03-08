import { Component, OnInit } from '@angular/core';
import { HousePropertyService } from './../house-property.service';

@Component({
  selector: 'app-house-property',
  templateUrl: './house-property.component.html',
  styleUrls: ['./house-property.component.scss']
})
export class HousePropertyComponent implements OnInit {

//   public selectedHouseName: string;
//   @Input() housename: string;
//  @Output() myEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }
  // redirectToMaster(institution: string, mode: string) {
  //   this.tabIndex = 1;
  //   const data = {
  //     housename : housename,
  //     tabIndex : this.tabIndex,
  //     canEdit: (mode == 'edit' ? true : false)
  //   };
  //   this.housename = housename;
  //   this.myEvent.emit(data);
  // }

  // jumpToMasterPage(policyNo: string) {
  //   this.tabIndex = 1;
  //   const data = {
  //     string : housename,
  //     tabIndex : this.tabIndex
  //   };;
  //   this.housename.emit(data);
  // }



}
