import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compliance-information',
  templateUrl: './compliance-information.component.html',
  styleUrls: ['./compliance-information.component.scss']
})
export class ComplianceInformationComponent implements OnInit {
  hiddenSummary:boolean = true;
  constructor() { }

  ngOnInit(): void {
    this.hiddenSummary = true;
  }

}
