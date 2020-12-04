import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-information',
  templateUrl: './job-information.component.html',
  styleUrls: ['./job-information.component.scss']
})
export class JobInformationComponent implements OnInit {
  hiddenSummary:boolean = true;


  constructor() { }

  ngOnInit(): void {
    this.hiddenSummary = true;
  }

}
