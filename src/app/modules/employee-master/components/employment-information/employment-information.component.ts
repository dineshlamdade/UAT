import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employment-information',
  templateUrl: './employment-information.component.html',
  styleUrls: ['./employment-information.component.scss']
})
export class EmploymentInformationComponent implements OnInit {
  selectionEmploymentBoolean: boolean = false;
  employementJoiningInfoId: number;




  constructor() { }

  ngOnInit(): void {

    let employementJoiningInfoId = Number(localStorage.getItem('employementJoiningInfoId'));
    this.employementJoiningInfoId = employementJoiningInfoId;

    let tabStatus = localStorage.getItem('selectionBoolean');
    if (tabStatus == 'ReJoining') {
      this.selectionEmploymentBoolean = true;
    }
    if (tabStatus == 'Joining') {
      this.selectionEmploymentBoolean = false;
    }
  }

}
