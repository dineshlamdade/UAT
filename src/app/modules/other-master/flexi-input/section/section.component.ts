import { element } from 'protractor';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Component, Inject, OnInit, enableProdMode } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SortEvent } from 'primeng/api';

import { DatePipe, DOCUMENT } from '@angular/common';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { FlexiInputService } from '../flexi-input.service';
import { AlertServiceService } from '../../../../core/services/alert-service.service';
import { ExcelserviceService } from '../../../../core/services/excelservice.service';
export interface ltaavailed {
  flexisectionname;
  flexisection;
  maxlimit;
  ownfixedlimit;
  balancingapplicable;
  balancingapplicableearning;
}
export interface Summ {
  type;
  EDhead;
  attribute;
  nonedhead;
  orderno;
}
interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit {
  Summs: Summ[];
  cities: City[];
  public validloanAccountNumber : boolean = false;
  public isUpdateMode = false;
  public hideRemarkDiv2 = false;
  public isViewMode = false;
  public flexiSectionMasterIds: number;
  public isUpdateModeSave = true;
  public fixedAndDerived = true;
  excelData: any[];
  excelDataEmp: any[];
  excelDataEmpLock: any[];
  header: any[];
  public ownFlexiList: Array<any> = [];
  public derivedNameList: Array<any> = [];
  public modalRef: BsModalRef;
  public flexiSextionNoList: Array<any> = [];
  public ltaavailed1: Array<any> = [];
  public balancingList: Array<any> = [];
  public ownFixList: Array<any> = [];
  public tableDataList: Array<any> = [];
  public tableDataList1: Array<any> = [];
  public editDataList: Array<any> = [];
  public flexiList: Array<any> = [];
  public sectionForm: any;
  public derivedList: Array<any> = [];
  public FormBuilder: any;
  deletedjobMasterId: number;
  modalRef1: BsModalRef;
  modalRef2: BsModalRef;
  deleteModalRef: BsModalRef;
  public loanAccountNumbers: any;
  constructor(
    private flexiInputService: FlexiInputService,
    private alertService: AlertServiceService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private excelservice: ExcelserviceService,
    @Inject(DOCUMENT) private document: Document,
    public sanitizer: DomSanitizer,
    private datePipe: DatePipe,
    private http: HttpClient,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.sectionReactiveForm();
    this.getTableData();
    this.getOwnFlexiDropDownList();
    // Flexi Section No.
    this.flexiSextionNoList = [
      { label: 'CTC', value: 'CTC' },
      { label: 'Fixed Section', value: 'Fixed Section' },
      { label: 'Flexi Section 1', value: 'Flexi Section1' },
      { label: 'Flexi Section 2', value: 'Flexi Section2' },
      { label: 'Flexi Section 3', value: 'Flexi Section3' },
      { label: 'Balancing Figure', value: 'Balancing Figure' },
    ];

    // Flexi Section No.
    this.ownFixList = [
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' },
    ];

    // balancingFigureApplicable List
    this.balancingList = [
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' },
    ];
  }

  openmodel(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }
  //Reactive on Section Master
  sectionReactiveForm() {
    this.sectionForm = this.formBuilder.group({
      flexiSectionName: new FormControl('', Validators.required),
      flexiSectionNo: new FormControl('', Validators.required),
      ownFixLimit: new FormControl('', Validators.required),
      sdmvalue: new FormControl('', Validators.required),
      derivedValue: new FormControl('', Validators.required),
      balancingFigureApplicable: new FormControl('', Validators.required),
      remark : new FormControl({ value: '', disabled: true },Validators.required),
      isActive : new FormControl({ value: true, disabled: true }),

    });
  }

  //Own Flexi Drop Down List
  getOwnFlexiDropDownList() {
    this.flexiInputService.getOwnFlexiDropDownList().subscribe((res) => {
      this.flexiList = res.data.results;
      this.ownFlexiList = [];
      console.log(this.flexiList);
      this.flexiList[0].forEach((element) => {
        const obj = {
          label: element.sdmvalue,
          value: element.id,
        };
        this.ownFlexiList.push(obj);
      });
      console.log('Own Flexi List', this.ownFixList);
    });
  }
  //on Change own limit
  onChengeOwnLimit(evt:any){
    if(evt == 'No'){
      this.fixedAndDerived = false
      this.derivedNameList = [];
      this.ownFlexiList = [];
      this.sectionForm.get('sdmvalue').clearValidators();
      this.sectionForm.get('sdmvalue').updateValueAndValidity();
      this.sectionForm.get('derivedValue').clearValidators();
      this.sectionForm.get('derivedValue').updateValueAndValidity();
      this.sectionForm.controls['balancingFigureApplicable'].setValue('Yes').value
      // this.sectionForm.controls['balancingFigureApplicable'].patchValue(
      //   this.sectionForm.controls['balancingFigureApplicable'].setValue('Yes').value
      // );
      // this.sectionForm.setValue('balancingFigureApplicable').value));
      // this.sectionForm.patchValue({
      //   balancingFigureApplicable: new Date(element.balancingFigureApplicable),

      // });
    }else{
      this.fixedAndDerived = true
      this.getOwnFlexiDropDownList();
      this.sectionForm.patchValue({
        sdmvalue: '',
        derivedValue: '',
      });
      this.sectionForm.get('sdmvalue').setValidators([Validators.required]);
      this.sectionForm.get('sdmvalue').updateValueAndValidity();
      this.sectionForm.get('derivedValue').setValidators([Validators.required]);
      this.sectionForm.get('derivedValue').updateValueAndValidity();
      // this.ngOnInit()
    }

  }

  // Dirived drop down list
  onChangeDefinationEmp(evt: any) {
    if (evt == '') {
      this.derivedNameList = [];
    } else {
      this.derivedNameList = [];
      this.flexiInputService.getDerivedNameList(evt).subscribe(
        (res) => {
          this.derivedList = res.data.results[0];
          // console.log('PeriodName In EMP ', this.cycleNameListEmp);
          res.data.results[0].forEach((element) => {
            const obj = {
              label: element.derivedName,
              value: element.sdmDerivedTableId,
            };
            this.derivedNameList.push(obj);
          });
        },
        (error: any) => {
          this.alertService.sweetalertError(
            error['error']['status']['message']
          );
        }
      );
    }
  }

  //Get Table Data List API Call
  getTableData() {
    this.flexiInputService.getAllSectionTableList().subscribe((res) => {
      if(res.data.results.length > 0){
      this.tableDataList1 = res.data.results;
      this.loanAccountNumbers = res.data;
      console.log('public Table data List', this.tableDataList);
      this.tableDataList1.forEach((element) => {
        const obj = {

          flexiSectionMasterId: element.flexiSectionMasterId,
          flexiSectionName: element.flexiSectionName,
          flexiSectionNo: element.flexiSectionNo,
          ownFixLimit: element.ownFixLimit === 1 ? 'Yes' : 'No',
          sdmvalue: element.ownFixedLimitValue,
          balancingFigureApplicable:
            element.balancingFigureApplicable === 1 ? 'Yes' : 'No',
            remark :  element.remark,
            isActive: element.isActive,
          //  flexiSectionMasterId : element.flexiSectionMasterId,
          derivedValue: element.derivedValue,
        };
        this.tableDataList.push(obj);
      });
    }

    });

  }

  // find  ids
  derivedNamesList(code: any) {
    const toSelect = this.derivedList.find(
      (element) => element.sdmDerivedTableId == code
    );
    return toSelect.sdmDerivedTableId;
    console.log('toSelect', toSelect);
  }

  getFlexiName(code: any) {
    const toSelect = this.flexiList[0].find((element) => element.id == code);
    return toSelect.id;
    console.log('toSelect', toSelect);
  }

  //Post Section Json
  saveSectionData() {
    if (this.sectionForm.invalid) {
      return;
    };

//     if(this.loanAccountNumbers.results.length > 0){
//     if(this.sectionForm.controls['flexiSectionName'].value){
//    const data = this.sectionForm.controls['flexiSectionName'].value;
//    console.log(data);
//     if (data) {

//       this.loanAccountNumbers.results.forEach(results => {
//         if (results.flexiSectionName == data) {
//           this.validloanAccountNumber = true;
//         }
//       });
//       if (this.validloanAccountNumber) {
//         this.validloanAccountNumber = false;
//         this.alertService.sweetalertError(
//          'Flexi Section Name Already Exists'
//         );
//         return;
//       }
//     }
//   }
// }

  if(this.sectionForm.get('ownFixLimit').value == "No"){
    const data = {
      balancingFigureApplicable:
        this.sectionForm.get('balancingFigureApplicable').value == 'Yes'
          ? 1
          : 0,
      derivedValue: '',
      flexiSectionNo: this.sectionForm.get('flexiSectionNo').value,
      flexiSectionName: this.sectionForm.get('flexiSectionName').value,
      isActive: 1,
      ownFixLimit: this.sectionForm.get('ownFixLimit').value == 'Yes' ? 1 : 0,
      ownFixedLimitValue: '',
    };
    console.log('Data', data);

    this.flexiInputService.postSectionMaster(data).subscribe((res) => {
      if (res) {
        if (res.data.results.length > 0) {
          this.tableDataList = [];
          this.getTableData();
          this.alertService.sweetalertMasterSuccess('Flexi Section Added Successfully', '');

        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      } else {
        this.alertService.sweetalertError(
          'Something went wrong. Please try again.'
        );
      }
    },error => {
      if(error.error.status.code == '403'){
        //this.toaster.success( 'Duplicate Area Set Name' );
        this.alertService.sweetalertError('Flexi Section Name Already Exists');
        this.sectionForm.controls['sectionForm'].reset();
      }

    });
    this.hideRemarkDiv2 = false;
    this.sectionForm.reset();
    this.fixedAndDerived = true
    this.sectionForm.get('isActive').setValue(1);
    this.sectionForm.get('isActive').disable();
    this.sectionForm.patchValue({
      flexiSectionName: '',
      flexiSectionNo: '',
      derivedValue: '',
      ownFixLimit: '',
      sdmvalue: '',
      balancingFigureApplicable: '',
    });

}else{
    const data = {
      balancingFigureApplicable:
        this.sectionForm.get('balancingFigureApplicable').value == 'Yes'
          ? 1
          : 0,
      derivedValue: this.derivedNamesList(
        this.sectionForm.get('derivedValue').value
      ),
      flexiSectionNo: this.sectionForm.get('flexiSectionNo').value,
      flexiSectionName: this.sectionForm.get('flexiSectionName').value,
      isActive: 1,
      ownFixLimit: this.sectionForm.get('ownFixLimit').value == 'Yes' ? 1 : 0,
      ownFixedLimitValue: this.getFlexiName(
        this.sectionForm.get('sdmvalue').value
      ),
    };

    console.log('Data', data);

    this.flexiInputService.postSectionMaster(data).subscribe((res) => {
      if (res) {
        if (res.data.results.length > 0) {
          this.tableDataList = [];
          this.getTableData();
          this.alertService.sweetalertMasterSuccess('Flexi Section Added Successfully', '');
        } else {
          this.alertService.sweetalertWarning(res.status.messsage);
        }
      } else {
        this.alertService.sweetalertError(
          'Something went wrong. Please try again.'
        );
      }
    },error => {
      if(error.error.status.code == '403'){
        //this.toaster.success( 'Duplicate Area Set Name' );
        this.alertService.sweetalertError('Flexi Section Name Already Exists');
        this.sectionForm.controls['sectionForm'].reset();
      }

    }
    );
    this.hideRemarkDiv2 = false;
    this.fixedAndDerived = true
    this.sectionForm.reset();
    this.sectionForm.get('isActive').setValue(1);
    this.sectionForm.get('isActive').disable();
    this.sectionForm.patchValue({
      flexiSectionName: '',
      flexiSectionNo: '',
      derivedValue: '',
      ownFixLimit: '',
      sdmvalue: '',
      balancingFigureApplicable: '',
    });

  }

    // this.getTableData();
  }

  //Edit

  //Delete API code
  UploadModal1(template: TemplateRef<any>, user1) {
    this.deleteModalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
    this.deletedjobMasterId = user1.flexiSectionMasterId;
  }

  //Delete API Call
  DeletePayrollHeadGroup(): void {
    this.flexiInputService
      .delete12(this.deletedjobMasterId)
      .subscribe((res) => {
        this.alertService.sweetalertMasterSuccess(
          'Record deleted Successfully',
          ''
        );
        //   console.log(res);
        // //  if(res){
        //    this.alertService.sweetalertMasterSuccess("Record deleted Successfully", '' )
        //   this.getTableData();
        //   this.sectionForm.reset();
        // // }
        //   // else {
        //     this.alertService.sweetalertError(
        //       'Something went wrong. Please try again.'
        //     );
        //   // }
        // })
        console.log(res);
        this.tableDataList = [];
        this.getTableData();
      });
  }

  //Reset Form Function
  resetForm() {
    this.sectionForm.reset();
    this.hideRemarkDiv2 = false;
    this.sectionForm.get('isActive').setValue(1);
    this.sectionForm.get('isActive').disable();
    this.sectionForm.patchValue({
      flexiSectionName: '',
      flexiSectionNo: '',
      derivedValue: '',
      ownFixLimit: '',
      sdmvalue: '',
      balancingFigureApplicable: '',
    });
  }

  //Edit functionality patch value for form control
  editUpdateDataJobMaster(data) {

    if(data.ownFixLimit == 'No'){
      this.fixedAndDerived = false
      this.derivedNameList = [];
      this.ownFlexiList = [];
      this.sectionForm.get('sdmvalue').clearValidators();
      this.sectionForm.get('sdmvalue').updateValueAndValidity();
      this.sectionForm.get('derivedValue').clearValidators();
      this.sectionForm.get('derivedValue').updateValueAndValidity();
    }else{
      this.fixedAndDerived = true
      this.getOwnFlexiDropDownList();
      this.sectionForm.patchValue({
        sdmvalue: '',
        derivedValue: '',
      });
      this.sectionForm.get('sdmvalue').setValidators([Validators.required]);
      this.sectionForm.get('sdmvalue').updateValueAndValidity();
      this.sectionForm.get('derivedValue').setValidators([Validators.required]);
      this.sectionForm.get('derivedValue').updateValueAndValidity();
      // this.ngOnInit()
    }

    this.sectionForm.get('isActive').setValue(0)
    this.hideRemarkDiv2 = false;
    this.isViewMode = false;
    this.sectionForm.enable();
    window.scrollTo(0, 0);
    this.hideRemarkDiv2 = false;
    this.sectionForm.get('flexiSectionName').disable();
    // this.sectionForm.get('isActive').setValue(1);
    // this.sectionForm.get('isActive').enable();
    this.sectionForm.patchValue(data);
    console.log('data', data);
    this.isUpdateMode = true;
    this.isUpdateModeSave = false;
    this.flexiSectionMasterIds = data.flexiSectionMasterId;
    let str = data.sdmvalue;
    this.onChangeDefinationEmp(str.toString());
    this.sectionForm.controls['flexiSectionName'].patchValue(
      data.flexiSectionName
    );
    this.sectionForm.controls['remark'].patchValue(data.remark);
    // this.sectionForm.controls['isActive'].patchValue(data.isActive);
    this.sectionForm.controls['flexiSectionNo'].patchValue(data.flexiSectionNo);
    this.sectionForm.controls['balancingFigureApplicable'].patchValue(
      data.balancingFigureApplicable == 'Yes' ? 'Yes' : 'No'
    );
    this.sectionForm.controls['ownFixLimit'].patchValue(
      data.ownFixLimit == 'Yes' ? 'Yes' : 'No'
    );
    this.sectionForm.controls['sdmvalue'].patchValue(
      this.getFlexiValueName(this.sectionForm.setValue('sdmvalue').value)
    );
    this.sectionForm.controls['derivedName'].patchValue(
      this.derivedNamesListInEdit(
        this.sectionForm.setValue('derivedName').value
      )
    );
  }

  //DeActive for
  deactivateRemark() {
    console.log( 'in deactive remakr' );

    if ( this.sectionForm.get( 'isActive' ).value === false ) {
      this.sectionForm.get( 'remark' ).enable();
      this.hideRemarkDiv2 = true;
      this.sectionForm.controls['remark'].setValidators( Validators.required );
      this.sectionForm.controls['remark'].updateValueAndValidity();
    } else {

      this.hideRemarkDiv2 = false;
      this.sectionForm.controls["remark"].clearValidators();
      this.sectionForm.controls["remark"].updateValueAndValidity();

    }
  }


  //Click on View button pach value and form will disabled
  viewMode(data) {
    this.sectionForm.get('isActive').setValue(0)
    this.hideRemarkDiv2 = false;
    // this.sectionForm.get('isActive').setValue(1);
    this.sectionForm.get('isActive').disable();
    this.hideRemarkDiv2 = false;
    this.isViewMode = true;
    window.scrollTo(0, 0);
    // this.sectionForm.reset();
    if(data.ownFixLimit == 'No'){
      this.fixedAndDerived = false
      this.derivedNameList = [];
      this.ownFlexiList = [];
      this.sectionForm.get('sdmvalue').clearValidators();
      this.sectionForm.get('sdmvalue').updateValueAndValidity();
      this.sectionForm.get('derivedValue').clearValidators();
      this.sectionForm.get('derivedValue').updateValueAndValidity();
    }else{
      this.fixedAndDerived = true
      this.getOwnFlexiDropDownList();
      this.sectionForm.patchValue({
        sdmvalue: '',
        derivedValue: '',
      });
      this.sectionForm.get('sdmvalue').setValidators([Validators.required]);
      this.sectionForm.get('sdmvalue').updateValueAndValidity();
      this.sectionForm.get('derivedValue').setValidators([Validators.required]);
      this.sectionForm.get('derivedValue').updateValueAndValidity();
      // this.ngOnInit()
    }
    this.sectionForm.disable();
    this.hideRemarkDiv2 = false;
    this.sectionForm.get('isActive').setValue(1);
    this.sectionForm.get('isActive').disable();
    this.sectionForm.patchValue(data);
    console.log('data', data);
    this.isUpdateModeSave = false;
    this.flexiSectionMasterIds = data.flexiSectionMasterId;
    let str = data.sdmvalue;
    this.onChangeDefinationEmp(str.toString());
    this.sectionForm.controls['flexiSectionName'].patchValue(
      data.flexiSectionName
    );
    this.sectionForm.controls['flexiSectionNo'].patchValue(data.flexiSectionNo);
    this.sectionForm.controls['balancingFigureApplicable'].patchValue(
      data.balancingFigureApplicable == 'Yes' ? 'Yes' : 'No'
    );
    this.sectionForm.controls['ownFixLimit'].patchValue(
      data.ownFixLimit == 'Yes' ? 'Yes' : 'No'
    );
    this.sectionForm.controls['sdmvalue'].patchValue(
      this.getFlexiValueName(this.sectionForm.setValue('sdmvalue').value)
    );
    this.sectionForm.controls['derivedName'].patchValue(
      this.derivedNamesListInEdit(
        this.sectionForm.setValue('derivedName').value
      )
    );

    this.isUpdateMode = false;
    this.hideRemarkDiv2 = false;
  }

  // cancel view from update
  cancelViewInUpdate() {
    this.isViewMode = false;
    this.sectionForm.get('flexiSectionName').enable();
    this.sectionForm.reset();
    this.isUpdateMode = false;
    this.isUpdateModeSave = true;
    this.hideRemarkDiv2 = false;
    this.sectionForm.get('isActive').setValue(1);
    this.sectionForm.get('isActive').disable();

    this.hideRemarkDiv2 = false;
     this.sectionForm.get( 'remark' ).disable();
     this.sectionForm.get( 'isActive' ).setValue(true);


    this.sectionForm.patchValue({
      flexiSectionName: '',
      flexiSectionNo: '',
      derivedValue: '',
      ownFixLimit: '',
      sdmvalue: '',
      balancingFigureApplicable: '',
    });
  }

  //cancel view from update mode
  cancelViewInUpdateView() {
    this.sectionForm.enable();
    this.isViewMode = false;
    this.sectionForm.reset();
    this.isUpdateMode = false;
    this.isUpdateModeSave = true;
    this.hideRemarkDiv2 = false;
    this.sectionForm.get( 'remark' ).disable();
     this.sectionForm.get( 'isActive' ).setValue(true);

    this.sectionForm.get('isActive').setValue(1);
    this.sectionForm.get('isActive').disable();
    this.sectionForm.patchValue({
      flexiSectionName: '',
      flexiSectionNo: '',
      derivedValue: '',
      ownFixLimit: '',
      sdmvalue: '',
      balancingFigureApplicable: '',
    });
  }

  // find derivedName from the list
  derivedNamesListInEdit(code: any) {
    const toSelect = this.derivedList.find(
      (element) => element.sdmDerivedTableId == code
    );
    return toSelect.derivedName;
    console.log('toSelect', toSelect);
  }

  // find SDmcalue form the flexiList
  getFlexiValueName(code: any) {
    const toSelect = this.flexiList[0].find((element) => element.id == code);
    return toSelect.sdmvalue;
    console.log('toSelect', toSelect);
  }

  //Put Update method API bind
  putMethod() {
    this.sectionForm.get('isActive').setValue(true)

    this.isUpdateMode = true;
    this.isUpdateModeSave = false;
    // if (this.sectionForm.invalid) {
    //   return;
    // }

    // if(this.sectionForm.get('isActive').value == 0){
    //   this.alertService.sweetalertError(
    //     'Please Select isActive'
    //   );
    // }
    if(this.sectionForm.get('ownFixLimit').value == "No"){
    const data = {
      balancingFigureApplicable:
        this.sectionForm.get('balancingFigureApplicable').value == 'Yes'
          ? 1
          : 0,
      derivedValue: '',
      // derivedValue: this.derivedNamesList(
      //   this.sectionForm.get('derivedValue').value
      // ),
      flexiSectionNo : this.sectionForm.get('flexiSectionNo').value,
      flexiSectionName: this.sectionForm.get('flexiSectionName').value,
      flexiSectionMasterId: this.flexiSectionMasterIds,
      ownFixLimit: this.sectionForm.get('ownFixLimit').value == 'Yes' ? 1 : 0,
      // ownFixedLimitValue: this.getFlexiName(
      //   this.sectionForm.get('sdmvalue').value
      // ),
      ownFixedLimitValue: '',
      isActive : this.sectionForm.get('isActive').value == 'true' ? 1 : 0,
      remark : this.sectionForm.get('remark').value,
    };

    this.flexiInputService.putMaster(data).subscribe(
      (res: any) => {
        if ( res.data.results.length > 0 ) {
          console.log( 'data is updated' );
          // this.isEditMode = false;
          this.alertService.sweetalertMasterSuccess( 'Recored Updated Successfully.', '' );
          this.hideRemarkDiv2 = false;
          this.tableDataList = [];
          this.getTableData();
          this.sectionForm.get('flexiSectionName').enable();
          this.fixedAndDerived = true
          this.sectionForm.reset();
          this.sectionForm.get('isActive').setValue(true);
         this.sectionForm.get('isActive').disable()
         this.sectionForm.get('sdmvalue').setValidators([Validators.required]);
         this.sectionForm.get('sdmvalue').updateValueAndValidity();
         this.sectionForm.get('derivedValue').setValidators([Validators.required]);
         this.sectionForm.get('derivedValue').updateValueAndValidity();
         this.sectionForm.patchValue({
          flexiSectionName: '',
          flexiSectionNo: '',
          derivedValue: '',
          ownFixLimit: '',
          sdmvalue: '',
          balancingFigureApplicable: '',
        });
        } else {
          this.alertService.sweetalertWarning( res.status.messsage );
        }
        this.sectionForm.get('flexiSectionName').enable();

      });

    }else{
      const data = {
        balancingFigureApplicable:
          this.sectionForm.get('balancingFigureApplicable').value == 'Yes'
            ? 1
            : 0,
        derivedValue: this.derivedNamesList(
          this.sectionForm.get('derivedValue').value
        ),
        flexiSectionNo : this.sectionForm.get('flexiSectionNo').value,
        flexiSectionName: this.sectionForm.get('flexiSectionName').value,
        flexiSectionMasterId: this.flexiSectionMasterIds,
        ownFixLimit: this.sectionForm.get('ownFixLimit').value == 'Yes' ? 1 : 0,
        ownFixedLimitValue: this.getFlexiName(
          this.sectionForm.get('sdmvalue').value
        ),
        isActive : this.sectionForm.get('isActive').value == 'true' ? 1 : 0,
        remark : this.sectionForm.get('remark').value,
      };

      this.flexiInputService.putMaster(data).subscribe(
        (res: any) => {
          if ( res.data.results.length > 0 ) {
            console.log( 'data is updated' );
            // this.isEditMode = false;
            this.alertService.sweetalertMasterSuccess( 'Recored Updated Successfully.', '' );
            this.hideRemarkDiv2 = false;
            this.tableDataList = [];
            this.getTableData();
            this.sectionForm.get('flexiSectionName').enable();
            this.fixedAndDerived = true
            this.sectionForm.reset();
            this.sectionForm.get('isActive').setValue(true);
           this.sectionForm.get('isActive').disable()
           this.sectionForm.patchValue({
            flexiSectionName: '',
            flexiSectionNo: '',
            derivedValue: '',
            ownFixLimit: '',
            sdmvalue: '',
            balancingFigureApplicable: '',
          });
          } else {
            this.alertService.sweetalertWarning( res.status.messsage );
          }
          this.sectionForm.get('flexiSectionName').enable();

        });

      }


  }

  //Delete Method
  changeEvent2($event) {
    if ($event.target.checked) {
      this.hideRemarkDiv2 = false;
    } else {
      this.hideRemarkDiv2 = true;
    }
  }

  //export to excel
    // Sort and Excel
//Area Master Excel
exportApprovalSummaryAsExcel(): void {
  this.excelData = [];
  this.header = []
  this.header =["flexiSectionName", "flexiSectionNo","ownFixLimit","sdmvalue","balancingFigureApplicable"];
  this.excelData = [];
  if(this.tableDataList.length>0){
   this.tableDataList.forEach((element) => {
    let obj = {
      // flexiSectionMasterId: element.flexiSectionMasterId,
      flexiSectionName: element.flexiSectionName,
      flexiSectionNo: element.flexiSectionNo,
      ownFixLimit: element.ownFixLimit,
      sdmvalue: element.sdmvalue,
      balancingFigureApplicable: element.balancingFigureApplicable,
   };
    this.excelData.push(obj);
  });
    console.log('this.excelData::', this.excelData);
  }
  this.excelservice.exportAsExcelFile(this.excelData, 'Section Master', 'Section Master' ,this.header);
  console.log('this.excelData::', this.excelData);
}
}
