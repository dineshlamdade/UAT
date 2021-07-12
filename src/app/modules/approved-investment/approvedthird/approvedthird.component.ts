import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TemplateRef} from '@angular/core';
export interface User1 {
  PreviousEmployer;
  duedate;
  DateofPayment;
   Actual;
   Rejected;
   Approved;
   Remark;
   TransactionStatus;
   
 }
 export interface mastertable{
  Sr_No;
  Start_date;
  end_date;
  Frequency;
  AnnualAmount;
  Premiumamount;
  ECS;
 } 
 export interface Customer {
 
   dateofsubmission;
   docname;
   doctype;
   password;
   Remark;
   status;
   appname;
   datetime;
  
 }
@Component({
  selector: 'app-approvedthird',
  templateUrl: './approvedthird.component.html',
  styleUrls: ['./approvedthird.component.scss']
})
export class ApprovedthirdComponent implements OnInit {
  users1: User1[];
  mastertable2:mastertable[];
  public modalRef: BsModalRef;  
  customers: Customer[];
  constructor( private modalService: BsModalService,) { }

  ngOnInit(): void {
    
    this.users1 = [
      {PreviousEmployer: '234',duedate:'23-Jan-2021', DateofPayment: '1-Feb-2021', Actual:'4300.00', Rejected:'aaaa', Approved:'123', Remark:'33', TransactionStatus:'Submitted'},
      {PreviousEmployer: '345',duedate:'23-Jan-2021', DateofPayment: '1-Feb-2021', Actual:'420.00', Rejected:'aaaa', Approved:'1234', Remark:'44', TransactionStatus:'Approved'},
     
    ];
    this.mastertable2 = [
      {Sr_No: '1', Start_date: '1-Mar-2021', end_date:'3-Mar-2021', Frequency:'aaaa', AnnualAmount:'123', Premiumamount:'33', ECS:'yes'},
      {Sr_No: '2', Start_date: '5-May-2021', end_date:'1-May-2021', Frequency:'aaaa', AnnualAmount:'1234', Premiumamount:'44', ECS:'no'},
      {Sr_No: '3', Start_date: '11-Feb-2021', end_date:'1-Feb-2021', Frequency:'aaaa', AnnualAmount:'234', Premiumamount:'667', ECS:'yes'},
    
    
    ];
    this.customers = [
                                                                                 
      { dateofsubmission: '21-jan-2021 ', docname:'   Premium payment Receipt2', doctype:'LIC ', password:' ABC',Remark:'OkTestSubmitted ',status:'Submitted ',appname:' Raman',datetime:'21-jan-2021 12:20:00 PM ' },
      {dateofsubmission: '22-jan-2021', docname:'  Premium payment Receipt1 ', doctype:' LIC', password:'CDE ',Remark:'Hi ',status:'Pending ',appname:'Rihan ',datetime:'21-jan-2021 12:20:00 PM ' },
      { dateofsubmission: '23-jan-2021', docname:'   Premium payment Receipt3', doctype:'LIC ', password:'EFD ',Remark:' Hi',status:'Approved ',appname:'Rishabh ',datetime:'21-jan-2021 12:20:00 PM ' },
    ];
    
      }
      
      Confirmation(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(
    template,
    Object.assign({}, { class: 'gray modal-lg' })
  );
}

docViewer(template3: TemplateRef<any>) {

  this.modalRef = this.modalService.show(
    template3,
    Object.assign({}, { class: 'gray modal-md' }),
  );
}


      // turn(){
    
      //     var angle: string ;
      
      //     ("#image").data("angle") + 90 || 90;
      //     // Element.style.transform("rotate(" + angle + "deg)" )
      //     Element.setAttribute("style", "rotate(" + angle + "deg)" )
      //     ("#image").data("angle", angle);
        
      // }
    
      
      
      
}
