import { Component, OnInit } from '@angular/core';
import { Console } from 'console';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HostListener } from '@angular/core';
import { TaxAdjustmentsService } from '../tax-adjustments.service';
@Component({
  selector: 'app-tax-adjustments-amount',
  templateUrl: './tax-adjustments-amount.component.html',
  styleUrls: ['./tax-adjustments-amount.component.scss']
})
export class TaxAdjustmentsAmountComponent implements OnInit {
  public modalRef: BsModalRef;
  public tabIndex = 0;
  public windowScrolled: boolean;
  public data: any;
  public  additionalTaxAdjustmenList: any;


  showData= false;
  
  
  toggle = true;
  cycle1 = false;
  cycle2 = false;
  status = "Enable";
 

  constructor(private taxAdjustmentsService: TaxAdjustmentsService,) { }

  ngOnInit(): void {
this.getAmount();
  }


 getAmount() {
  let productScanDTO = {};
  productScanDTO =[
    {
      "additionalTaxAdjustmentId": 0,
      "cycleDefinition": "string",
      "deductionAmountPerCycle": 0,
      "employeeMasterId": 0,
      "financialYear": "string",
      "fromDate": "2021-02-06T10:00:15.266Z",
      "taxAdjustmentType": "string",
      "toDate": "2021-03-06T10:00:15.266Z"
    }
  ]
    this.taxAdjustmentsService.getAdditionalTax().subscribe((res) => {
      console.log("getAdditionalTax", res);
  
    });
  }

  showtable(){
    this.showData = !this.showData
    console.log(this.showData);
    // this.getFamilyInfo();
  }



  enableDisableRule(job) {
    this.toggle = !this.toggle;
    this.cycle1 = false;
    this.cycle2 = false;
    console.log(this.toggle);
    // this.status = this.toggle ? "Enable" : "Disable";
  }
  enableDisableRule1(job) {
    this.cycle1 = !this.cycle1;
    this.toggle = false;
    this.cycle2 = false;
    console.log(this.cycle1 );
    
  }
  enableDisableRule2(job) {
    this.cycle2 = !this.cycle2;
    this.toggle = false;
    this.cycle1 = false;
    console.log(this.cycle2 );
    
  }

  // const data = this.additionalTaxAdjustmenList;
  // this.taxAdjustmentsService.postAdditionalTax(data).subscribe((res) => {
  //   console.log(res);
  //   this.transactionDetail = res.data.results[0].licTransactionDetail;
  //   this.grandDeclarationTotal = res.data.results[0].grandDeclarationTotal;
  //   this.grandActualTotal = res.data.results[0].grandActualTotal;
  //   this.grandRejectedTotal = res.data.results[0].grandRejectedTotal;
  //   this.grandApprovedTotal = res.data.results[0].grandApprovedTotal;
  //   this.transactionDetail.forEach((element) => {
  //     element.lictransactionList.forEach((element) => {
  //       element.dateOfPayment = new Date(element.dateOfPayment);
  //     });
  //   });
  // });



//   changeTabIndexForRedirect(event: any) {
//     this.tabIndex = event.tabIndex;
//     this.data = event;
//     console.log('data::', this.data);
//   }

//   changeTabIndex(index: number) {
//     if (index !== 2) {
//       this.data = undefined;
//     }
//     this.tabIndex = index;
//   }

  

//   @HostListener('window:scroll', [])
//   onWindowScroll() {
//     if (
//       window.pageYOffset ||
//       document.documentElement.scrollTop ||
//       document.body.scrollTop > 100
//     ) {
//       this.windowScrolled = true;
//     } else if (
//       (this.windowScrolled && window.pageYOffset) ||
//       document.documentElement.scrollTop ||
//       document.body.scrollTop < 10
//     ) {
//       this.windowScrolled = false;
//     }
//   }

//   scrollToTop() {
//     (function smoothscroll() {
//       let currentScroll =
//         document.documentElement.scrollTop || document.body.scrollTop;
//       if (currentScroll > 0) {
//         window.requestAnimationFrame(smoothscroll);
//         window.scrollTo(0, currentScroll - currentScroll / 8);
//       }
//     })();
//   }
// }
}