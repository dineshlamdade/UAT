import { Component, OnInit, ViewChild, TemplateRef, Inject, HostListener } from '@angular/core';
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
import { CompanyRegistrationDetailsService } from './company-registration-details.service';
import { CompanyMasterService } from '../company-master/company-master.service';

@Component({
  selector: 'app-company-registration-details',
  templateUrl: './company-registration-details.component.html',
  styleUrls: ['./company-registration-details.component.scss']
})
export class CompanyRegistrationDetailsComponent implements OnInit {
  summaryHtmlDataList:Array <any> = [];
  issuedByList = ['Registrar of Companies', 'Commissioner of Charities'];
  showButtonSaveAndReset : boolean = true;
  //isEditMode  : boolean = false;
  registrationNumberList: Array<any> = [];
  companyRegistrationIdList: Array<any> = [];
  companyRegistrationMasterList : Array<any> = [];
  masterGridDataList : Array<any> = [];
  tempObjForCompanyRegistration: any;
  public form: any = FormGroup;
  companyRegistrationId:number = 0;
  companyMasterId: number = 0;
  isSaveAndReset:boolean = true;
  isEditMode:boolean = false;


  constructor(private formBuilder: FormBuilder, private companyGroupMasterService: CompanyGroupMasterService,private companyMasterService: CompanyMasterService,
              private companyRegistrationDetailsService: CompanyRegistrationDetailsService, private datePipe: DatePipe) {
    this.form = this.formBuilder.group({
      companyRegistrationId: new FormControl('', Validators.required),
      registrationNumber: new FormControl(null,  Validators.required),
      companyName: new FormControl({ value: null, disabled: true }),
      companyGroupName: new FormControl({ value: null, disabled: true }),
      dateOfIncorporation: new FormControl(null, Validators.required),
      issuedBy: new FormControl(null,  Validators.required),
      msmeNumber: new FormControl(null,  Validators.required),
      pan: new FormControl(null,  Validators.required),
      udyogAadhaarNumber: new FormControl(null, Validators.required),
      companyRegistrationId1: new FormControl(''),
    });

}

  ngOnInit(): void {
    this.companyRegistrationDetailsService.getAllActiveCompanyForRegistration().subscribe(res =>{
      console.log(res);
      this.tempObjForCompanyRegistration = res.data.results;
      res.data.results.forEach(element => {


        const obj = {
          code: element.code,
          companyGroupName: element.companyGroupName,
          companyMasterId: element.companyMasterId,

        };
        this.companyRegistrationIdList.push(obj);
    });

    });

    this.refreshHtmlTableData();


}
refreshHtmlTableData(){

  this.companyRegistrationDetailsService.getCompanyRegistrationMaster().subscribe(res => {
    this.summaryHtmlDataList = [];
    this.companyRegistrationMasterList = res.data.results;
    let i = 1;
    this.masterGridDataList = res.data.results;
    res.data.results.forEach(element => {

        const obj = {
          SrNo: i++,
          code: element.companyMasterResponseDto.code,
          companyRegistrationId: element.companyRegistrationId,
          companyMasterId: element.companyMasterResponseDto.companyMasterId,
          registrationNumber: element.registrationNumber,
          dateOfIncorporation: element.dateOfIncorporation,
          issuedBy: element.issuedBy,
          msmeNumber: element.msmeNumber,
          udyogAadhaarNumber: element.udyogAadhaarNumber,
          pan: element.pan,
          companyName: element.companyMasterResponseDto.companyName,
          companyGroupName: element.companyMasterResponseDto.companyGroupName
        };
        this.summaryHtmlDataList.push(obj);


        // this.companyRegistrationIdList.push({  code: obj.code,
        //   companyGroupName: obj.companyGroupName,
        //   companyMasterId: obj.companyMasterId});
        var s =this.companyRegistrationIdList.findIndex(function(o){
          return o.companyMasterId === obj.companyMasterId;
        });
        if(s !==-1){
          this.companyRegistrationIdList.splice(s, 1);

        }

//         const index1 = this.companyRegistrationIdList.findIndex(obj1 => obj1.companyMasterId === obj.companyMasterId);
//         const index = this.companyRegistrationIdList.indexOf(index1, 1);
// if (index < 0) {
//   this.companyRegistrationIdList.splice(index, 1);
// }

       // console.log(this.summaryHtmlDataList);
    });

  }, (error: any) => {
    this.sweetalertError(error["error"]["status"]["messsage"]);

  }, () => {


      });


 //  this.companyRegistrationIdList.filter((v,i,a)=>a.findIndex(t=>t.companyMasterId === v.companyMasterId) == i);
}
  save(){
    // for save postCompanyGroupMaster

    console.log(this.form);
    if (this.companyRegistrationId > 0) {

      const dateOfIncorporation1 = this.datePipe.transform(this.form.get('dateOfIncorporation').value, 'dd-MMM-y');

      const data = {
        companyRegistrationId: this.companyRegistrationId,
        companyMasterId: this.companyMasterId,
       registrationNumber: this.form.get('registrationNumber').value,
       dateOfIncorporation:dateOfIncorporation1,
       issuedBy:this.form.get('issuedBy').value,
       msmeNumber:this.form.get('msmeNumber').value,
       pan:this.form.get('pan').value,
       udyogAadhaarNumber:this.form.get('udyogAadhaarNumber').value
      };
      console.log(data);

      this.companyRegistrationDetailsService.putCompanyRegistrationDetails(data).subscribe(res => {
        console.log(res);
        if (res.data.results.length > 0) {
          console.log('data is updated');
         // this.isEditMode = false;
          this.sweetalertMasterSuccess('Company Registration Details  Updated Successfully.', '');
          this.isSaveAndReset = true;
          this.showButtonSaveAndReset = true;
          this.form.reset();
          this.isEditMode = false;
          this.refreshHtmlTableData();
        } else {
          this.sweetalertWarning(res.status.messsage);
          }
        }, (error: any) => {
          this.sweetalertError(error["error"]["status"]["messsage"]);
        });

    } else {
      console.log('clcicked on new record save button');

      const dateOfIncorporation1 = this.datePipe.transform(this.form.get('dateOfIncorporation').value, 'dd-MMM-y');

      const data = {
        companyRegistrationId: 0,
        companyMasterId: this.companyMasterId,
       registrationNumber: this.form.get('registrationNumber').value,
       dateOfIncorporation: dateOfIncorporation1,
       issuedBy: this.form.get('issuedBy').value,
       msmeNumber: this.form.get('msmeNumber').value,
       pan: this.form.get('pan').value,
       udyogAadhaarNumber: this.form.get('udyogAadhaarNumber').value
      };
      this.companyRegistrationDetailsService.postCompanyRegistrationDetails(data).subscribe(res => {
        console.log(res);
        if (res.data.results.length > 0) {
          this.sweetalertMasterSuccess('Company Registration Details Saved Successfully.', '');
          this.form.reset();
          this.refreshHtmlTableData();
        } else {
          this.sweetalertWarning(res.status.messsage);
         }

        }, (error: any) => {
          this.sweetalertError(error["error"]["status"]["messsage"]);

        });
    }
}

  onBsValueChangeDateOfIncorporation() {}
  onSelectCompanyRegistrationId(evt: any){
    let temp = this.tempObjForCompanyRegistration.find ( o => o.code == this.form.get('companyRegistrationId').value);
    this.companyMasterId = temp.companyMasterId;
    console.log(temp.companyMasterId);
    this.companyMasterId = temp.companyMasterId;
    this.form.patchValue({
      companyName: temp.companyName,
      companyGroupName: temp.companyGroupName,
      });

  }
  onSelectIssuedBy(){}

  editMaster(i: number){
    this.isEditMode = true;


    this.isSaveAndReset = false;
    this.showButtonSaveAndReset = true;
    this.form.enable();
    this.form.reset();


    this.companyRegistrationId = this.masterGridDataList[i].companyRegistrationId;
    this.companyMasterId = this.masterGridDataList[i].companyMasterResponseDto.companyMasterId;

    this.form.patchValue(this.masterGridDataList[i]);
    console.log(this.masterGridDataList[i]);

    this.form.patchValue({
      companyRegistrationId1: this.masterGridDataList[i].companyMasterResponseDto.code,
      companyName: this.masterGridDataList[i].companyMasterResponseDto.companyName,
      companyGroupName:this.masterGridDataList[i].companyMasterResponseDto.companyGroupName,
      companyGroupName1:this.masterGridDataList[i].companyMasterResponseDto.companyGroupName,
      });
    this.form.enable();
    this.form.get('companyName').disable();
    this.form.get('companyGroupName').disable();
    //this.form.get('companyGroupName1').disable();
    this.form.get('companyRegistrationId1').disable();

  }
  viewMaster(i:number){

    this.isSaveAndReset = false;
    this.isEditMode = true;
    this.showButtonSaveAndReset = false;
    this.showButtonSaveAndReset = false;
    this.form.reset();
    this.form.patchValue(this.masterGridDataList[i]);

    this.form.patchValue({
        companyRegistrationId1: this.masterGridDataList[i].companyMasterResponseDto.code,
        companyName: this.masterGridDataList[i].companyMasterResponseDto.companyName,
        companyGroupName:this.masterGridDataList[i].companyMasterResponseDto.companyGroupName,
        });
    this.form.disable();
  }
  cancelView(){
    this.isEditMode = false;
    this.isSaveAndReset = true;
    this.showButtonSaveAndReset = true;
    this.form.enable();
    this.form.reset();

    this.form.get('companyName').disable();
    this.form.get('companyGroupName').disable();
    this.showButtonSaveAndReset = true;
    this.companyRegistrationId = 0;  // for save it should be 0 and update it should have any integer value

  }




sweetalertError(message:any) {
  Swal.fire({
      title: message,
      showCloseButton: true,
      showCancelButton: false,
      toast:true,
      position:'top-end',
      showConfirmButton:false,
      icon:'error',
      timer: 15000,
      timerProgressBar: true,
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

}
