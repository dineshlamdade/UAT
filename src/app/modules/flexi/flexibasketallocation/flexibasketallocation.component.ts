import { Component, OnInit, TemplateRef } from '@angular/core';
import {SliderModule} from 'primeng/slider';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Options, LabelType } from '@angular-slider/ngx-slider';
@Component({
  selector: 'app-flexibasketallocation',
  templateUrl: './flexibasketallocation.component.html',
  styleUrls: ['./flexibasketallocation.component.scss']
})
export class FlexibasketallocationComponent implements OnInit {
  val: 20;
  val2: 20;filters: any;
  pemi: any = {
      value: "5"
  }
  remi: any = {
      value: "6"
  }
  temi: any = {
      value: "20"
  }
  memi: any = {
      value: "240"
  }

  query: any = {
      amount: "",
      interest: "",
      tenureYr: "",
      tenureMo: ""
  }

  result = {
      emi: "",
      interest: "",
      total: ""
  }
  yrToggel: boolean;
  poptions: Options = {
      floor: 0,
      ceil: 100,
      translate: (value: any, label: LabelType): string => {
          switch (label) {
              case LabelType.Low:
                  return value + '<b></b>';
              case LabelType.High:
                  return value + '<b></b>';
              default:
                  return value + '<b></b>';
          }
      }
  };
  rangeValues: number[] = [20,80];
  public modalRef: BsModalRef;
  constructor(private modalService: BsModalService){}

  range: any = 0;
  min = 0;
  max = 100;
  onRangeValueChange(event: any) {
      const value = event.value;
      this.range = value;
  }
  mediumpopup(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }
  
  remibur(template2: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template2,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }
  noofschool(template1: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template1,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  ngOnInit(): void {
  }

}
