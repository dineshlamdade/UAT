import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loan-master',
  templateUrl: './loan-master.component.html',
  styleUrls: ['./loan-master.component.scss']
})
export class LoanMasterComponent implements OnInit {

  public tabIndex = 0;
  public windowScrolled: boolean;
  public data: any;
  url: string;

  constructor(private router: Router) {
    
    this.url = window.location.pathname
      if(this.url == "/loan-master/summary"){
        this.tabIndex = 0
      } 
      if(this.url == "/loan-master/general"){
        this.tabIndex = 1
        // this.tabIndex = 4
      } 
      if(this.url == "/loan-master/recovery"){
        this.tabIndex = 2
      } 
      if(this.url == "/loan-master/payment"){
        this.tabIndex = 3
      }  
   }

  ngOnInit(): void {}

  changeTabIndex(index: number) {
    this.tabIndex = index;
    if(this.tabIndex == 0){
      this.router.navigate(['/loan-master/summary'])
    }
    // if(this.tabIndex == 4){
    //   this.router.navigate(['/loan-master/general'])
    // }
    if(this.tabIndex == 1 || this.tabIndex == 4){
      this.router.navigate(['/loan-master/general'])
    }
    if(this.tabIndex == 2){
      this.router.navigate(['/loan-master/recovery'])
    }
    if(this.tabIndex == 3){
      this.router.navigate(['/loan-master/payment'])
    }
  }
}