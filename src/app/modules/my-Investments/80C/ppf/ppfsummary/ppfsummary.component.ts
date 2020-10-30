import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-ppfsummary',
  templateUrl: './ppfsummary.component.html',
  styleUrls: ['./ppfsummary.component.scss']
})
export class PPFSummaryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('ppfSummary');
  }

}
