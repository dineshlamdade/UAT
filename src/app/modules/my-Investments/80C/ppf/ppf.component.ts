import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ppf',
  templateUrl: './ppf.component.html',
  styleUrls: ['./ppf.component.scss']
})
export class PPFComponent implements OnInit {
  public tabIndex = 0;
  constructor() { }


  ngOnInit(): void {
  }

  summaryPage(){

    this.tabIndex = 0;
  }
  masterPage()
  {
    this.tabIndex = 1;
  }
  declarationPage()
  {

    this.tabIndex = 2;

  }

}
