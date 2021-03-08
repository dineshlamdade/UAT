import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
export interface data {
  srno;
  usergrup;
  desc;

}
export interface assigndata {
  grupcode;
  shrtname;
  grupname;

}
export interface Grplistdata {
  grupnm;
}

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss']
})
export class UserGroupComponent implements OnInit {

  data: data[];
  assigndata:assigndata[];
  Grplistdata:Grplistdata[];
  public modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
    this.data = [
      { srno: '1', usergrup: 'System Admin',desc:'System Admin Desc' },
      { srno: '2', usergrup: 'DB Admin',desc:'DB Admin Desc' },
      { srno: '3', usergrup: 'Paysquare Admin',desc:'Paysquare Admin Desc' },
      { srno: '4', usergrup: 'App_Admin',desc:'App_Admin Desc' },
    ];
    this.assigndata = [
      { grupcode: '854332', shrtname: 'Eaton',grupname:'Eaton Pvt Ltd' },
      { grupcode: '223434', shrtname: 'TCS',grupname:'Tata' },
      { grupcode: '654564', shrtname: 'Abbott',grupname:'Abbott Pvt ltd' },
      { grupcode: '675876', shrtname: 'Schindler',grupname:'Schindler Pvt ltd' },
    ];
    this.Grplistdata=[{grupnm:'Paysquare1'},
    {grupnm:'Paysquare2'},
    {grupnm:'Paysquare3'},
    {grupnm:'Paysquare4'},
    {grupnm:'Paysquare5'},
    {grupnm:'Paysquare6'},
    {grupnm:'Paysquare7'},
    {grupnm:'Paysquare8'},
    {grupnm:'Paysquare9'}]
  }

  AssignedGroup(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  Grouplist(template2: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template2,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }
}
