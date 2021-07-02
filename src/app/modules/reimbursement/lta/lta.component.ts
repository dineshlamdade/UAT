import { Component, OnInit } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SortEvent } from 'primeng/api';
export interface User1 {
  srno;
  BlockNo;
  ClaimNo;
  Dateofsubmission;
  ClaimType;
  ClaimName;
  Claimamount;
  Rejectedamount;
  Approvedamount;
  status;
  remark;
}
export interface ltaavailed {
  leavesapplicationno;
  appldate;
  leavetype;
  fromdate;
  todate;
  totalleaves;
  leaveremark;

}
export interface cltax {

  Amount;
  rejectedamt;
  approvedamt;
  remark;
  status;
}

export interface clntx {

  billno;
  billdate;
  Traveldetails;
  from;
  to;
  billamount;
  rejectedamount;
  approvedamount;
  remark;
  psid;
  status;
}
export interface clntx1 {
  psid;
  startdate;
  Traveldetails;
  from;
  to;
  billamount;
  remark;
  document;
  status;
}
@Component({
  selector: 'app-lta',
  templateUrl: './lta.component.html',
  styleUrls: ['./lta.component.scss']
})
export class LtaComponent implements OnInit {

  public modalRef: BsModalRef;

  users1: User1[];
  cltaxs: cltax[];
  clntxs: clntx[];
  clntxs1:clntx1[];
  ltaavailed1: ltaavailed[];
  constructor(private modalService: BsModalService) { }

  mediumpopup(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }
  mediumpopup1(template1: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template1,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  
  model(template2: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template2,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  ngOnInit(): void {
    this.users1 = [
      { srno: '1', BlockNo: '2018-2021', ClaimNo: '11', Dateofsubmission: '1-Mar-2021', ClaimType: 'Taxable', ClaimName: 'Raj', Claimamount: '5,000.00', Rejectedamount: '5,000.00', Approvedamount: '00.00', remark: 'Remark1',status: 'Done',  },
      { srno: '2', BlockNo: '2014-2017', ClaimNo: '11', Dateofsubmission: '1-Mar-2021', ClaimType: 'Non-Taxable', ClaimName: 'Shree', Claimamount: '5,000.00', Rejectedamount: '5,000.00', Approvedamount: '00.00', remark: 'Remark1' , status: 'Inprogress',},
      { srno: '3', BlockNo: '2014-2017', ClaimNo: '11', Dateofsubmission: '1-Mar-2021', ClaimType: 'Taxable', ClaimName: 'Shreya', Claimamount: '5,000.00', Rejectedamount: '5,000.00', Approvedamount: '00.00', remark: 'Remark1' , status: 'Done',},
      { srno: '4', BlockNo: '2018-2021', ClaimNo: '11', Dateofsubmission: '1-Mar-2021', ClaimType: 'Taxable', ClaimName: 'Pihu', Claimamount: '5,000.00', Rejectedamount: '5,000.00', Approvedamount: '00.00', remark: 'Remark1' , status: 'Done', },
    ];

    this.ltaavailed1 = [
      { leavesapplicationno: '1', appldate: '22-Jan-2021', leavetype: 'Paid', fromdate: '24-Jan-2021', todate: '24-Jan-2021', totalleaves: '1', leaveremark: 'Personalwork' },
      { leavesapplicationno: '2', appldate: '22-Feb-2021', leavetype: 'Marriage', fromdate: '1-Feb-2021', todate: '23-Feb-2021', totalleaves: '22', leaveremark: 'abcbc' },

    ];
    this.cltaxs = [
      { Amount: '', rejectedamt: 'aaa', approvedamt: 'aaaa', remark: '', status: '' },
     


    ];
    this.clntxs = [{
      billno: '111', billdate: '21-jan-2021', Traveldetails: 'Sector', from: 'Pune', to: 'Chennai',
      billamount: '8,000.00', rejectedamount: '2,000.00', approvedamount: '5,000.00', remark: 'Na', psid: 'yes', status: 'submitted'
    }];
    this.clntxs1=[{
      psid:'2344',
  startdate:'21-jan-2021',
  Traveldetails:'Sector',
  from:'Pune',
  to:'Chennai',
  billamount:'5,000.00',
  remark:'wsw',
  document:'sss',
  status:'111',
    }]

  }

}
