import { Component, OnInit, TemplateRef } from '@angular/core';
import { CKEditorModule } from 'ckeditor4-angular';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


export interface user2 {
  SrNo: any;
  RefNo: any;
  Documents: any;
  Description: any;
  By: any;
  Date_Time: any;
   
}
export interface status{
  SrNo: any;
  RefNo: any; 
  By: any;
  Date_Time: any;
  status: any;
   
}
export interface contact{
  role: any;
  Comapny: any; 
  Name: any;
  Tel_No: any;
  Email: any;
  Grade: any;
  Designation: any;
}
@Component({
  selector: 'app-query-communication',
  templateUrl: './query-communication.component.html',
  styleUrls: ['./query-communication.component.scss']
})


export class QueryCOmmunicationComponent implements OnInit {
 
  emoji1:boolean=false;
  emoji2:boolean=false;
  emoji3:boolean=false;
  emoji4:boolean=false;
  emoji5:boolean=false;
public modalRef: BsModalRef;


constructor(private modalService: BsModalService){}
Popup1(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(
    template,
    Object.assign({}, { class: 'gray modal-md' })
  );
}



  
  users: user2[];
  status1:status[];
  contact1:contact[];
  ngOnInit(): void {
    this.users = [
      { SrNo: '1', RefNo:'1111',Documents:'DOC1',Description:'aaaa', By:'AAA',Date_Time:'12-8-2020 '},
      { SrNo: '2', RefNo:'1112',Documents:'Doc 2',Description:'aaaa', By:'AAA',Date_Time:'12-9-2021 ' },
    ];
      this.status1 = [
        { SrNo: '1', RefNo:'1111', By:'AAA',Date_Time:'12-8-2020 ',status:'done'},
        { SrNo: '2', RefNo:'1112', By:'AAA',Date_Time:'12-9-2021',status:'done'},
      ];
      this.contact1 = [
        { role: '1', Comapny:'1111', Name:'AAA',Tel_No:'12-8-2020 ',Email:'done',Grade:'A',Designation:'Worker'},
        { role: '2', Comapny:'1112', Name:'AAA',Tel_No:'12-9-2021',Email:'done',Grade:'A',Designation:'Worker'},
      ];
  }
  isRelyDiv = true;
  isShowDiv = false;
  isforwardDiv= true;

  toggleDisplayDiv() {
    this.isRelyDiv = !this.isRelyDiv;
    this.isShowDiv = true;
  }
  toggleReplyDiv(){
    this.isShowDiv = false;
    this.isRelyDiv = true;
  }
  toggleDisplayforwarddiv() 
  {
    this.isforwardDiv = !this.isforwardDiv;
    this.isShowDiv = true;
  }
  toggleforwardDiv(){
    this.isShowDiv = false;
    this.isforwardDiv = true;
  }

  changeemoji1(){
    this.emoji1=true;
  

  }
  changeemoji2(){
    this.emoji2=true;


  }
  changeemoji3(){
    this.emoji3=true;


  }
  changeemoji4(){
    this.emoji4=true;


  }
  changeemoji5(){
    this.emoji5=true;


  }
}
;