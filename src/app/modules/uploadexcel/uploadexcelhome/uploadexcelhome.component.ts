import { Component, OnInit,TemplateRef } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-uploadexcelhome',
  templateUrl: './uploadexcelhome.component.html',
  styleUrls: ['./uploadexcelhome.component.scss']
})
export class UploadexcelhomeComponent implements OnInit {
  public modalRef: BsModalRef;
  constructor( private modalService: BsModalService) { }
  items: MenuItem[];
  preview:boolean=false;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  dropdownList1=[];
  ngOnInit(): void {
    this.dropdownList = [
      { id: 1, label: 'PA_01_Staff' },
      { id: 2, label: 'PA_02_Worker' }

    ];
    this.dropdownList1=[
      { id: 1, label: 'Employee Master' },
      { id: 2, label: 'Payroll' },
      { id: 3, label: 'Leave Management' },
      { id: 4, label: 'Expense Reimbursement ' },
      { id: 5, label: 'Assets ' },

    ];
    this.selectedItems = [
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'label',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };

  }


  onItemSelect(item:any,DeselectTab: TemplateRef<any>)
  {
    this.modalRef = this.modalService.show(
      DeselectTab,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  MergeTab(template3: TemplateRef<any>) {

    this.modalRef = this.modalService.show(
      template3,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }
  DeselectTab(DeselectTab: TemplateRef<any>) {

    this.modalRef = this.modalService.show(
      DeselectTab,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  DownloadCriteria(template2: TemplateRef<any>) {

    this.modalRef = this.modalService.show(
      template2,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }
  displayPreview()
  {
this.preview=true;
  }

}
