import { Component, OnInit, ViewChild, TemplateRef, Inject, HostListener, ChangeDetectorRef, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective } from '@angular/forms';
import { DatePipe, DOCUMENT } from '@angular/common';

import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { NumberFormatPipe } from '../../../core/utility/pipes/NumberFormatPipe';
import { from } from 'rxjs';
import Swal from 'sweetalert2';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { start } from 'repl';
import { rangeContainsMarker } from '@fullcalendar/angular';

import { CompanyGroupMasterService } from '../company-group-master/company-group-master.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';

import { isThisSecond } from 'date-fns';
import { strict } from 'assert';
import { element } from 'protractor';
import { yearsPerPage } from '@angular/material/datepicker';
import { ComplianceHeadService } from './compliance-head.service';

@Component({
  selector: 'app-compliance-head',
  templateUrl: './compliance-head.component.html',
  styleUrls: ['./compliance-head.component.scss']
})
export class ComplianceHeadComponent implements OnInit {
  countries: Array<any> = [];
  summaryHtmlDataList: Array<any> = [];
  masterGridDataList: Array<any> = [];
  shortNameList: Array<any> = ['PF',    'EPS',    'PT',    'TDS',    'ESIC',    'LWF',    'S&E',    'Factories',    'SA',    'Gratuity',    'BOCW',    'CLRA','EE','PWD'];
  aplicabilityLevelList: Array<any> = ['Central', 'State', 'City', 'Municipal', 'Corporation','Establishment'];
  public form: any = FormGroup;
  showButtonSaveAndReset:boolean = true;

  constructor(private complianceHeadService: ComplianceHeadService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      complianceHeadName: new FormControl(null, Validators.required),
      shortName: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      aplicabilityLevel: new FormControl(null, Validators.required),
      authorityHandling: new FormControl(null, Validators.required),
      website: new FormControl(null, Validators.required),

    });
  }

  ngOnInit(): void {
   this.refreshHtmlTableData();

    this.complianceHeadService.getLocationInformationOrCountryList().subscribe(res => {
      this.countries = res.data.results;
    });
  }
  save(){

    console.log('clcicked on new record save button');
    const data = this.form.getRawValue();
    console.log(data);

    this.complianceHeadService.postComplianceHead(data).subscribe(res => {
      console.log(res);
      if (res.data.results.length > 0) {
        this.sweetalertMasterSuccess('Compliance Head Saved Successfully.', '');
        this.form.reset();
        this.refreshHtmlTableData();
      } else {
        this.sweetalertWarning(res.status.messsage);
       }

      }, (error: any) => {
        this.sweetalertError(error["error"]["status"]["messsage"]);

      });


  }
  cancelView(i:number){
    this.form.enable();
    this.form.reset();
    this.showButtonSaveAndReset = true;
  }
  viewMaster(i:number){
    this.showButtonSaveAndReset = false;
    this.form.reset();
    this.form.patchValue(this.masterGridDataList[i]);
    this.form.disable();
  }
  onSelectShortName(evt:any){}
  onSelectApplicabilityLevel(evt:any){}


  refreshHtmlTableData() {
    this.summaryHtmlDataList = [];
    this.masterGridDataList = [];
    this.complianceHeadService.getComplianceHeadDetails().subscribe(res => {
      console.log(res);
      this.masterGridDataList = res.data.results;
      let i = 1;
      console.log('html table data');
      console.log(res.data.results);res.data.results.forEach(element => {
        const obj = {
          SrNo: i++,
          complianceHeadName: element.complianceHeadName,
          shortName: element.shortName,
          country: element.country,
          aplicabilityLevel: element.aplicabilityLevel,
          authorityHandling: element.authorityHandling,
        };
        this.summaryHtmlDataList.push(obj);
        console.log(this.summaryHtmlDataList);
      });
    });

  }


  sweetalert7(message: any) {
    Swal.fire({
      text: message,
    });
  }

  sweetalertWarning(message: any) {
    Swal.fire({
      title: message,
      showCloseButton: true,
      showCancelButton: false,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      background: '#e68a00',
      icon: 'warning',
      timer: 15000,
      timerProgressBar: true,
    });
  }

  sweetalertInfo(message: any) {
    Swal.fire({
      title: message,
      showCloseButton: true,
      showCancelButton: false,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      icon: 'info',
      timer: 15000,
      timerProgressBar: true,
    });
  }

  sweetalertMasterSuccess(message: any, text: any) {
    Swal.fire({
      title: message,
      text: text,
      showCloseButton: true,
      showCancelButton: false,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      icon: 'success',
      timer: 15000,
      timerProgressBar: true,
    });
  }

  sweetalertError(message: any) {
    Swal.fire({
      title: message,
      showCloseButton: true,
      showCancelButton: false,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      icon: 'error',
      timer: 15000,
      timerProgressBar: true,
    });
  }

}
