import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lic',
  templateUrl: './lic.component.html',
  styleUrls: ['./lic.component.scss']
})
export class LicComponent implements OnInit {

  public tabIndex = 0;

  constructor() { }

  ngOnInit(): void {
  }

  changeTabIndex(index:number)
  {
    this.tabIndex = index;
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
