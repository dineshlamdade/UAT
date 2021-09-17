import { Component, OnInit, ViewChild } from '@angular/core';
// import { Table } from "primeng/table";
import { Table } from 'primeng/table/primeng-table';
import { TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


export interface User1 {
  srno;
  headtype;
  headcode;
  headdesc;
  openingval;
  chngamount;
  chngper;
  closingamt;
  unitofmeasure;
  remark;
}
@Component({
  selector: 'app-business-year',
  templateUrl: './business-year.component.html',
  styleUrls: ['./business-year.component.scss']
})
export class BusinessYearComponent implements OnInit {
  areaSection = true;
  employeeSection = false;
  users1: User1[];
  public modalRef: BsModalRef;

  dropdownSettings = {};
  dropdownList = [];
  selectedItems = [];

  constructor(private modalService: BsModalService) { }

  BusinessPendingForLockPopup(BusinessPendingForLock: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      BusinessPendingForLock,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  ngOnInit(): void {
    this.users1 = [
      { srno: '1', headtype: 'Earning', headcode: 'AAA', headdesc: 'AAA Desc', openingval: '0.00', chngamount: '0.00', chngper: '2', closingamt: '0.00', unitofmeasure: 'PM', remark: 'Remark1' },
      { srno: '2', headtype: 'Earning', headcode: 'AAA', headdesc: 'AAA Desc', openingval: '0.00', chngamount: '0.00', chngper: '2', closingamt: '0.00', unitofmeasure: 'MM', remark: 'Remark1' },
      { srno: '3', headtype: 'Earning', headcode: 'AAA', headdesc: 'AAA Desc', openingval: '0.00', chngamount: '0.00', chngper: '2', closingamt: '0.00', unitofmeasure: 'PM', remark: 'Remark1' },
      { srno: '4', headtype: 'Earning', headcode: 'AAA', headdesc: 'AAA Desc', openingval: '0.00', chngamount: '0.00', chngper: '2', closingamt: '0.00', unitofmeasure: 'PA', remark: 'Remark1' },
    ];


    this.selectedItems = [];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'label',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };

    this.dropdownList = [
      { id: 1, label: 'ABC' },
      { id: 2, label: 'PQR' },
      { id: 3, label: 'XYZ' },
      { id: 4, label: 'AAA' },
      { id: 5, label: 'BBB' }
    ];


  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  ViewHistory(template44: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template44,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  cycleList(template3: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template3,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  lockarea(template2: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template2,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }


  areaSelect() {
 this.areaSection = true;
 this.employeeSection = false;
  }
  employeeSelect() {
    this.areaSection = false;
    this.employeeSection = true;
  }
  // Schedule(template2: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(
  //     template2,
  //     Object.assign({}, { class: 'gray modal-lg' })
  //   );
  // }

}
