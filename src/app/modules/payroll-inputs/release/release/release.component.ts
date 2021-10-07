import { Component, OnInit } from '@angular/core';
import { TemplateRef} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SortEvent } from 'primeng/api';
interface users1 {
  srno;
  ModePayment;
  BankName;
  BranchCode;
  AccountNo;
  PayeeName;
  NetPay;
  Amount;
  Priority;
  Clawback;
}

@Component({
  selector: 'app-release',
  templateUrl: './release.component.html',
  styleUrls: ['./release.component.scss']
})
export class ReleaseComponent implements OnInit {
  users1: users1[];
  public modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
    this.users1 = [
      { srno: '1', ModePayment: 'AAA',BankName:'BBB',  BranchCode: 'CCC',AccountNo:'EEE',PayeeName:'FFF',NetPay:'ggg',Amount:'hhh',Priority:'iii',Clawback:'jjj'},
    
    
    ];
  }
  extralargepopup(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }
  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
        let value1 = data1[event.field];
        let value2 = data2[event.field];
        let result = null;
  
        if (value1 == null && value2 != null)
            result = -1;
        else if (value1 != null && value2 == null)
            result = 1;
        else if (value1 == null && value2 == null)
            result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string')
            result = value1.localeCompare(value2);
        else
            result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
  
        return (event.order * result);
    });
  
}
}
