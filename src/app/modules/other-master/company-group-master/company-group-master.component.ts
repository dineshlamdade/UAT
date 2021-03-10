import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective } from '@angular/forms';
import { DatePipe } from '@angular/common';

import Swal from 'sweetalert2';
import { CompanyGroupMasterService } from './company-group-master.service';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';

import { ShortenStringPipe } from './../../../core/utility/pipes/shorten-string.pipe';
@Component({
  selector: 'app-company-group-master',
  templateUrl: './company-group-master.component.html',
  styleUrls: ['./company-group-master.component.scss']
})
export class CompanyGroupMasterComponent implements OnInit {
  // hideRemarkDiv: boolean;
  @ViewChild("endDate1") endDate1;
  showButtonSaveAndReset: boolean = true;
  // isEditMode: boolean = false;
  masterGridDataList: Array<any> = [];
  index: number = 0;
  // qwerty = 'disabled-button';

  companyGroupId: number = 0;
  reasonForExitList = [];
  view: boolean = false;
  companyGroupNameInvalid: boolean = false;
  shortNameInvalid: boolean = false

  isSaveAndReset: boolean = true;
  public today = new Date();

  public today1 = new Date();
  endDateModel: any;
  public bsValue: Date = new Date();


  scaleList = [];
  summaryHtmlDataList = [];
  public form: any = FormGroup;
  constructor(private shortenString: ShortenStringPipe, private formBuilder: FormBuilder, private companyGroupMasterService: CompanyGroupMasterService, private datePipe: DatePipe,
    private alertService: AlertServiceService) {
    this.form = this.formBuilder.group({
      companyGroupCode: new FormControl({ value: null, disabled: true }),
      companyGroupName: new FormControl(null, Validators.required),
      shortName: new FormControl(null, Validators.required),
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(''),
      scale: new FormControl('', Validators.required),
      reasonForExit: new FormControl(''),
      remark: new FormControl(null),
      companyGroupActive: new FormControl({ value: true, disabled: true }),
    });
    // this.sweetAlertDeletePopUpBoxConfirmation();

  }
  ngOnInit(): void {
    this.form.get('endDate').disable();
    this.form.get('reasonForExit').disable();
    this.form.get('remark').disable();
    this.form.get('companyGroupActive').disable();
    this.form.get('companyGroupActive').setValue(true);


    this.refreshHtmlTableData();
    this.companyGroupMasterService.getCompanygroupdropdownMaster().subscribe(res => {
      // console.log(res);
      res.data.results.forEach(element => {
        //console.log(element);
        // const obj = {
        //     label: element.name,
        //     value: element.previousEmployerId
        // };
        //this.previousEmployeeList.push(obj);
      });
    });

    this.companyGroupMasterService.getCompanygroupdropdownScaleMaster().subscribe(res => {
      // console.log(res);
      res.data.results.forEach(element => {
        const obj = {
          label: element.dropdownValue,
          value: element.dropdownName
        };
        this.scaleList.push(obj);
      });
    });

    this.companyGroupMasterService.getCompanygroupdropdownReasonForExitMaster().subscribe(res => {
      // console.log(res);
      res.data.results.forEach(element => {
        const obj = {
          label: element.dropdownValue,
          value: element.dropdownName
        };
        this.reasonForExitList.push(obj);
      });
    });
  }

  onSelectScale(scale1: any) {

    console.log(scale1);
    console.log(this.form.value.scale);
    console.log(this.form.get('scale').value);
    // if (scale1 == 'null') {

    //   this.form.get('scale').setValue(null);

    //   this.form.get('scale').setValidators(Validators.required);
    //   this.form.get('scale').updateValueAndValidity();

    // }
  }

  onSelectReasonForExit() {
    console.log(this.form.value.reasonForExit);
  }
  deactiveActiveCheckBox() {
    this.deactivateRemark();
  }

  save() {
    console.log(this.form);
    if (this.companyGroupId > 0) {
      console.log('clcicked on edit button');
      const companyGroupName = this.form.get('companyGroupName').value;
      const scale = this.form.get('scale').value;
      const companyGroupCode = this.form.get('companyGroupCode').value;
      const data = this.form.getRawValue();
      const startDate = this.datePipe.transform(this.form.get('startDate').value, 'dd-MMM-y');
      const endDate = this.datePipe.transform(this.form.get('endDate').value, 'dd-MMM-y');
      data.startDate = startDate;
      data.endDate = endDate;
      data.companyGroupId = this.companyGroupId;
      data.companyGroupActive = 'true';
      console.log(data);

      this.companyGroupMasterService.putCompanyGroupMaster(data).subscribe(res => {
        console.log(res);
        if (res.data.results.length > 0) {
          console.log('data is updated');
          this.alertService.sweetalertMasterSuccess('Company Group Master Updated Successfully.', '');
          this.companyGroupId = 0;
          //  this.isEditMode = false;


          this.form.reset();
          this.isSaveAndReset = true;
          this.showButtonSaveAndReset = true;
          this.refreshHtmlTableData();
          this.saveFormValidation();
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      }, (error: any) => {
        this.alertService.sweetalertError(error["error"]["status"]["messsage"]);

      });

    } else {
      console.log('clicked on new record save button');
      const companyGroupName = this.form.get('companyGroupName').value;
      const scale = this.form.get('scale').value;
      const companyGroupCode = this.form.get('companyGroupCode').value;
      const data = this.form.getRawValue();
      const startDate = this.datePipe.transform(this.form.get('startDate').value, 'dd-MMM-y');
      const endDate = this.datePipe.transform(this.form.get('endDate').value, 'dd-MMM-y');
      data.startDate = startDate;
      data.endDate = endDate;
      data.companyGroupId = 0;
      data.companyGroupActive = 'true';
      data.remark = '';
      data.reasonForExit = '';
      console.log(data);

      this.companyGroupMasterService.postCompanyGroupMaster(data).subscribe(res => {
        console.log(res);
        if (res.data.results.length > 0) {
          this.alertService.sweetalertMasterSuccess('Company Group Master Saved Successfully.', '');
          this.form.reset();
          this.refreshHtmlTableData();
          this.saveFormValidation();
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }

      }, (error: any) => {
        this.alertService.sweetalertError(error["error"]["status"]["messsage"]);

      });
    }
  }

  reset() {
    // this.isEditMode = false;
    this.companyGroupId = -1;
    this.showButtonSaveAndReset = true;
    this.companyGroupId = 0;
    this.form.get('companyGroupActive').setValue(true);
    this.saveFormValidation();

  }

  cancelView() {

    this.form.enable();
    this.companyGroupId = -1;
    this.isSaveAndReset = true;
    this.showButtonSaveAndReset = true;
    this.companyGroupId = -1;
    this.form.get('companyGroupActive').setValue(true);
    this.saveFormValidation();


  }
  onBsValueChangeDateOfSetup() {
    console.log(this.datePipe.transform(this.form.get('endDate').value, 'dd-MMM-y'));
  }

  editMaster(i: number, companyGroupId: number) {
    window.scrollTo(0, 0);
    this.isSaveAndReset = false;
    this.index = 0;
    this.showButtonSaveAndReset = true;
    this.companyGroupId = companyGroupId;
    this.form.reset();
    this.form.enable();
    // const to = this.datePipe.transform(this.form.get('endDate').value, 'yyyy-MM-dd');
    // this.datePipe.transform(this.endDate1.nativeElement.value, 'dd-MMM-y');
    // this.endDate1.nativeElement.value = this.datePipe.transform(this.today, 'dd-MMM-y');
    // this.form.get('endDate').setValue(this.datePipe.transform(this.today, 'dd-MMM-y'));


    this.form.controls["remark"].clearValidators();
    this.form.controls["remark"].updateValueAndValidity();

    this.form.controls["reasonForExit"].clearValidators();
    this.form.controls["reasonForExit"].updateValueAndValidity();



    this.index = this.summaryHtmlDataList.findIndex(function (rowData) {
      return rowData.companyGroupId === companyGroupId;
    });
    console.log(this.masterGridDataList);
    this.form.patchValue(this.masterGridDataList[i]);

    this.form.controls['endDate'].clearValidators();
    this.form.controls['remark'].clearValidators();
    this.form.controls["endDate"].updateValueAndValidity();
    this.form.controls["remark"].updateValueAndValidity();
    this.form.get('companyGroupCode').disable();
    this.form.get('companyGroupActive').disable();
    this.deactivateRemark();
  }
  viewMaster(i: number, companyGroupId: number) {
    window.scrollTo(0, 0);
    this.showButtonSaveAndReset = false;

    this.form.reset();
    this.form.patchValue(this.masterGridDataList[i]);
    this.form.disable();
  }
  refreshHtmlTableData() {
    this.summaryHtmlDataList = [];
    this.masterGridDataList = [];
    this.companyGroupMasterService.getCompanyGroupMasterGetAllActiveAndInActive().subscribe(res => {
      console.log('getCompanyGroupMasterGetAllActiveAndInActive', res);
      this.masterGridDataList = res.data.results;
      let i = 1;
      console.log('html table data');
      console.log(res.data.results);
      res.data.results.forEach(element => {
        const obj = {
          SrNo: i++,
          companyGroupCode: element.companyGroupCode,
          companyGroupName: element.companyGroupName,
          shortenCompanyGroupName: this.shortenString.transform(element.companyGroupName),
          shortName: element.shortName,
          shortenShortName: this.shortenString.transform(element.shortName),
          StartDate: element.startDate,
          EndDate: element.endDate,
          ReasonforExit: element.reasonForExit,
          Scale: element.scale,
          companyGroupId: element.companyGroupId,
          companyGroupActive: element.companyGroupActive,
          servicePeriod: element.servicePeriod,
          servicePeriodShort: element.servicePeriodShort
        };
        this.summaryHtmlDataList.push(obj);

      });
    });

  }
  saveFormValidation() {
    this.form.reset();
    this.form.enable();
    this.form.get('endDate').disable();
    this.form.get('reasonForExit').disable();
    this.form.get('remark').disable();
    this.form.get('companyGroupActive').disable();
    this.form.get('companyGroupActive').setValue(true);


    this.form.controls['endDate'].clearValidators();
    this.form.controls['remark'].clearValidators();
    this.form.controls["endDate"].updateValueAndValidity();
    this.form.controls["remark"].updateValueAndValidity();


    // this.form.controls["companyGroupCode"].setValidators(Validators.required);
    // this.form.controls["companyGroupCode"].updateValueAndValidity();

    this.form.controls["companyGroupName"].setValidators(Validators.required);
    this.form.controls["companyGroupName"].updateValueAndValidity();

    this.form.controls["shortName"].setValidators(Validators.required);
    this.form.controls["shortName"].updateValueAndValidity();

    this.form.controls["scale"].setValidators(Validators.required);
    this.form.controls["scale"].updateValueAndValidity();

    this.form.controls["startDate"].setValidators(Validators.required);
    this.form.controls["startDate"].updateValueAndValidity();

    this.form.get('companyGroupActive').setValue(true);
    this.form.get('companyGroupActive').disable();
    this.form.get('endDate').disable();
    this.form.patchValue({
      scale: '',
      reasonForExit: ''

    });
    this.form.get('companyGroupCode').disable();
  }
  onChangeEndDate(evt: any) {
    console.log(this.form.get('endDate').value);
    // console.log(this.endDateModel);
    //  console.log(evt.target.value);
    //  console.log(this.form.get('endDate').value);
    if (this.form.get('endDate').value == '' || this.form.get('endDate').value == null) {
      this.form.controls["remark"].clearValidators();
      this.form.controls["remark"].updateValueAndValidity();

      this.form.controls["reasonForExit"].clearValidators();
      this.form.controls["reasonForExit"].updateValueAndValidity();

      this.form.patchValue({
        remark: '',
        reasonForExit: '',
      });
      this.form.get('remark').disable();
      this.form.get('reasonForExit').disable();

    } else {
      console.log(evt);
      console.log(this.form.get('endDate').value);
      const from = this.datePipe.transform(this.form.get('startDate').value, 'yyyy-MM-dd');
      const to = this.datePipe.transform(this.form.get('endDate').value, 'yyyy-MM-dd');
      if (from > to) {
        this.form.controls['endDate'].reset()

      }
      this.form.controls["remark"].setValidators(Validators.required);
      this.form.controls["remark"].updateValueAndValidity();

      this.form.controls["reasonForExit"].setValidators(Validators.required);
      this.form.controls["reasonForExit"].updateValueAndValidity();

      this.form.get('companyGroupActive').setValue(true);
      this.deactivateRemark();
    }


  }
  onChangeEngagementEndDate(evt: any) {
    let endDate12 = this.datePipe.transform(this.form.get('endDate').value, 'dd-MMM-y');
    // debugger
    // console.log(this.endDate1);
    // console.log(this.endDate1.nativeElement);
    // console.log(this.endDate1.nativeElement.value);
    // if (this.endDate1 !== undefined) {
    //   this.endDate1.nativeElement.value = this.datePipe.transform(this.endDate1.nativeElement.value, 'dd-MMM-y');

    // }
    //  console.log(this.endDate1.nativeElement.value);
    // const endDate = this.datePipe.transform(this.endDateModel, 'yyyy-MM-dd');



    if (endDate12 == '' || endDate12 == null) {
      this.form.controls["remark"].clearValidators();
      this.form.controls["remark"].updateValueAndValidity();

      this.form.controls["reasonForExit"].clearValidators();
      this.form.controls["reasonForExit"].updateValueAndValidity();

      this.form.patchValue({
        remark: '',
        reasonForExit: '',
      });
      this.form.get('remark').disable();
      this.form.get('reasonForExit').disable();

    } else {
      this.form.get('remark').enable();
      this.form.get('reasonForExit').enable();
      this.form.controls["remark"].setValidators([Validators.required]);
      this.form.controls["remark"].updateValueAndValidity();

      this.form.controls["reasonForExit"].setValidators([Validators.required]);
      this.form.controls["reasonForExit"].updateValueAndValidity();
      // this.form.get('companyGroupActive').setValue(true);
      // this.hideRemarkDiv = false;
      this.deactivateRemark();







      // } else {
      //   this.form.get('companyGroupActive').setValue(false);
      //   this.hideRemarkDiv = true;
      //   this.deactivateRemark();

      //
    }
  }
  // const endDate = this.datePipe.transform(this.form.get('endDate').value, 'dd-MMM-y');
  // console.log(endDate);
  // this.form.get('remark').setValidators([Validators.required]);
  // this.form.get('reasonForExit').setValidators([Validators.required]);

  // console.log(endDate);
  // if(endDate !== '31-Dec-9999'){
  //   this.form.get('remark').setValidators([Validators.required]);
  //   this.form.get('reasonForExit').setValidators([Validators.required]);

  // } else {
  //   this.form.remark.clearValidators();
  //   this.form.reasonForExit.clearValidators();
  // }
  //  this.form.get['remark'].setValidator([Validators.required]);
  //  this.form.get['remark'].updateValueAndValidity();
  //  this.form.get('reasonForExit').setValidator([Validators.required]);
  //  this.form.get('reasonForExit').updateValueAndValidity();


  // sweetalert7(message: any) {
  //   Swal.fire({
  //     text: message,
  //   });
  // }

  // sweetalertWarning(message: any) {
  //   Swal.fire({
  //     title: message,
  //     showCloseButton: true,
  //     showCancelButton: false,
  //     toast: true,
  //     position: 'top-end',
  //     showConfirmButton: false,
  //     background: '#e68a00',
  //     icon: 'warning',
  //     timer: 15000,
  //     timerProgressBar: true,
  //   });
  // }

  // sweetalertInfo(message: any) {
  //   Swal.fire({
  //     title: message,
  //     showCloseButton: true,
  //     showCancelButton: false,
  //     toast: true,
  //     position: 'top-end',
  //     showConfirmButton: false,
  //     icon: 'info',
  //     timer: 15000,
  //     timerProgressBar: true,
  //   });
  // }

  // sweetalertMasterSuccess(message: any, text: any) {
  //   Swal.fire({
  //     title: message,
  //     text: text,
  //     showCloseButton: true,
  //     showCancelButton: false,
  //     toast: true,
  //     position: 'top-end',
  //     showConfirmButton: false,
  //     icon: 'success',
  //     timer: 15000,
  //     timerProgressBar: true,
  //   });
  // }

  // sweetalertError(message: any) {
  //   Swal.fire({
  //     title: message,
  //     showCloseButton: true,
  //     showCancelButton: false,
  //     toast: true,
  //     position: 'top-end',
  //     showConfirmButton: false,
  //     icon: 'error',
  //     timer: 15000,
  //     timerProgressBar: true,
  //   });
  // }
  deactivateRemark() {

    if (this.form.get('companyGroupActive').value === false) {
      this.form.get('remark').enable();
      /// this.hideRemarkDiv = false;

      this.form.get('remark').setValidators([Validators.required]);
    } else {
      // this.form.get('remark').clearValidators();
      //  this.hideRemarkDiv = true;
      // this.form.get('remark').disable();
      // this.form.get('remark').reset();
    }
  }
  // get remark1(){
  //   const temp = <FormGroup>this.form.control.remark;
  //   return temp.controls.remark;
  // }
  // get reasonForExit1(){
  //   const temp = <FormGroup>this.form.control.reasonForExit;
  //   return temp.controls.reasonForExit;
  // }
  onSelectSetToNull() {
    console.log('on select null');
    this.form('scale').setValue = '';
  }
  // focusOnEndDate() {
  //   this.endDate1.nativeElement.focus();
  // }

  // sweetAlertDeletePopUpBoxConfirmation() {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     showCloseButton: true,
  //     showCancelButton: true,
  //     toast: true,
  //     position: 'top-end',
  //     icon: 'warning',
  //     showConfirmButton: true,
  //     text: 'This record will be permanantly deleted!',
  //   }).then(function (value) {
  //     if (value) {
  //       console.log(value);
  //       if (value.isConfirmed == true) {
  //         console.log('delete record');
  //       }
  //     }
  //   });
  // }



  isShortNameContainsOnlySpecialCharacter() {
    this.shortNameInvalid = false
    var splChars = "*|,\":<>[]{}`\!';()@&^$#%1234567890 ";
    for (var i = 0; i < this.form.get('shortName').value.length; i++) {
      if (splChars.indexOf(this.form.get('shortName').value.charAt(i)) != -1) {
        //alert("Illegal characters detected!");
        this.shortNameInvalid = true;
      } else {
        this.shortNameInvalid = false;
        break;
      }

    }
    if (this.shortNameInvalid == true) {
      this.form.get('shortName').status = 'INVALID';
    }
  }


  isContainsOnlySpecialCharacter() {
    this.companyGroupNameInvalid = false
    console.log('isContainsOnlySpecialCharacter');
    var splChars = "* |,\":<>[]{}^`\!';()@&$#%1234567890";
    for (var i = 0; i < this.form.get('companyGroupName').value.length; i++) {
      if (splChars.indexOf(this.form.get('companyGroupName').value.charAt(i)) != -1) {
        //alert("Illegal characters detected!");
        this.companyGroupNameInvalid = true;
      } else {
        this.companyGroupNameInvalid = false;
        break;
      }

    }
    if (this.companyGroupNameInvalid == true) {
      //this.companyGroupNameInvalid = false;
      //   this.form.get('companyGroupName').inValid = true;
      this.form.get('companyGroupName').status = 'INVALID';

    }
  }
  keyPressedSpaceNotAllow(event: any) {
    const pattern = /[ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
