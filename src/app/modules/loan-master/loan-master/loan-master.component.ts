import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loan-master',
  templateUrl: './loan-master.component.html',
  styleUrls: ['./loan-master.component.scss']
})
export class LoanMasterComponent implements OnInit {

  public tabIndex = 0;
  public windowScrolled: boolean;
  public data: any;

  constructor() { }

  ngOnInit(): void {
  }


  changeTabIndexForRedirect(event: any) {
    this.tabIndex = event.tabIndex;
    this.data = event;
    console.log('data::', this.data);
  }

 


  changeTabIndex(index: number) {
    if (index !== 2) {
      this.data = undefined;
    }
    this.tabIndex = index;
  }


}
