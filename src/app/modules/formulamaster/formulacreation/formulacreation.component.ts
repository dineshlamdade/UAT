import { Component, OnInit } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { TemplateRef} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
interface User1 {
  SrNo;
  DerivedName;
  Module;
  TableName;
  FieldName;
  DerivedType;
  JobFieldType;
  Percentageof;

}

@Component({
  selector: 'app-formulacreation',
  templateUrl: './formulacreation.component.html',
  styleUrls: ['./formulacreation.component.scss']
})
export class FormulacreationComponent implements OnInit {
    public modalRef: BsModalRef;
    users1: User1[];
  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
    this.users1 = [
      { SrNo: '1', DerivedName: 'grp',Module:'AAA',TableName:'B',FieldName:'Hold',DerivedType:'C',JobFieldType:'D',Percentageof:'E'},
     
    ];
    
  }
  mediumpopup(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
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
