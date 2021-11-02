import { element } from 'protractor';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
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
  balancingapplicable;f
  balancingapplicableearning;

}
export interface Summ {
type;
EDhead;
attribute;
nonedhead;
orderno;
}

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent implements OnInit {

  ltaavailed1: ltaavailed[];
  Summs:Summ[];
  public policyMinDate: any;
  public modalRef: BsModalRef;
  public headTypeList: Array<any> = [];
  public tempList: Array<any> = [];
  public edHeadNameList1: Array<any> = [];
  public paymentDetailMinDate: Date;
  public paymentDetailMaxDate: Date;
  public edHeadNameList: Array<any> = [];
  public formulaNames: Array<any> = [];
  public formulaNames1: Array<any> = [];
  public formulaNames2: Array<any> = [];
  public formulaNameList: Array<any> = [];
  public formulaNameList1: Array<any> = [];
  public formulaNameList2: Array<any> = [];
  // public getUpdationValue: Array<FormGroup> = [];
  public sectionOFFlexiFormNameList1: Array<any> = [];
  public sectionOFFlexiFormNameList: Array<any> = [];
  public headDerivedNameListMax1: Array<any> = [];
  public headDerivedNameListMax: Array<any> = [];
  public headDerivedNameList1: Array<any> = [];
  public headDerivedNameList: Array<any> = [];
  public applicablitySDMList1: Array<any> = [];
  public applicablitySDMList: Array<any> = [];
  public inBetweenMinMaxList1: Array<any> = [];
  public inBetweenMinMaxList: Array<any> = [];
  public InBetweenMinMaxList1 : Array<any> = [];
  public InBetweenMinMax : Array<any> = [];
  public maxEligibilityMethod1 : Array<any> = [];
  public maxEligibilityMethodList : Array<any> = [];
  public minEligibilityMethod1: Array<any> = [];
  public minEligibilityMethodList: Array<any> = [];
  public presentationMethod1: Array<any> = [];
  public presentationMethodList: Array<any> = [];
  public updationType1: Array<any> = [];
  public updationTypeList: Array<any> = [];
  public inBetweenMinMax: Array<any> = [];
  public tableDataList: Array<any> = [];
  public addedList: Array<any> = [];
  public allGroupAndDescriptionList: Array<any> = [];
  public headEditList: Array<any> = [];
  deletedjobMasterId: number;
  minId : any;
  public isUpdateMode = false;
  public canView = false;
  public hideRemarkDiv2 = false;
  public isViewMode = false;
  public isUpdateModeSave = true;
  flexiHeadSetting :any;
  public itemNameArray: Array<any> = [];
  modalRef1: BsModalRef;
  modalRef2: BsModalRef;
  deleteModalRef: BsModalRef;
  // public listInvalid : boolean = false;
  public sdmNameList1: Array<any> = [];
  public sdmNameList12: Array<any> = [];
  public sdmNameListMax: Array<any> = [];
  public sdmNameList: Array<any> = [];
  public isNonEDHeadName : boolean = true;
  public isEDHeadName : boolean = true;
  public isShowFlexiTwoSection : boolean = true;
  public isShowUpdationValue : boolean = false;
  public  isView: boolean = true;
  public editable: boolean = true;
  public invoiceForm: FormGroup;
  public minFormDate: any = '';
  public maxFromDate: any = '';
  headForm: any;
  optionList = [];
  isEditMode: boolean;
  optionId: number = 0;
  testForm: any;
  getUpdationValue: FormGroup;
  itemname: any;
  // itemNameArray: any[];
  constructor(
    private flexiInputService: FlexiInputService,
    private alertService: AlertServiceService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private fb: FormBuilder,
    private excelservice: ExcelserviceService,
    @Inject(DOCUMENT) private document: Document,
    public sanitizer: DomSanitizer,
    private datePipe: DatePipe,
    private http: HttpClient,
    public dialog: MatDialog){

   }
   openmodel(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
    }
  ngOnInit(): void {

    this.sectionReactiveForm();
    this.getEDHeadList();
    this.getFormulaNameList();
    this.getFormulaNameList1();
    this.getFormulaNameList2();
    this.getSDMName();
    this.getSDMMax();
    // this.getHeadDerivedNameList();
    this.getSectionOfFlexiForm();
    this.getApplicabilitySDM();
    this.getInBetweenMinMax();
    this.getMaxEligibilityMethod();
    this.getMinEligibilityMethod();
    this.getPresentationMethod();
    this.getUpdationType();
this.getTableData();



    this.headTypeList = [
      { label: 'E / D Head', value: 'E/D Head' },
      { label: 'Non E / D Head', value: 'Non E/D Head' },
    ];


    this.Summs = [
      { type: '1', EDhead: '', attribute: 'Paid', nonedhead: '', orderno: '', },
      { type: '2', EDhead: '', attribute: 'Marriage', nonedhead: '', orderno: ' ', },

    ];

    this.invoiceForm = this.fb.group({
      itemRows: this.fb.array([this.initItemRows()])
    });


  }

  get formArr() {
    return this.invoiceForm.get('itemRows') as FormArray;
  }
  initItemRows() {
    return this.fb.group({
      itemname: ['']
    });
  }

  createItemFormGroup(): FormGroup {
    return this.fb.group({
      name: null,
      description: null,
      qty: null
    });
  }

  addNewRow() {
    // this.formArr.push(this.initItemRows());
    // let itemNameArray = [];
    this.tempList.push({'evt': this.itemname});

    this.tempList.forEach(ele =>{
      this.itemNameArray.push(ele.evt)
      this.addedList = this.itemNameArray;
      console.log("this. itemNameArray", this.itemNameArray)
    })

    // this.form
    console.log("temp data is: "+ JSON.stringify(this.tempList))
    this.itemname = ''
  }

  deleteRow(index: number) {
    // this.formArr.removeAt(index);
    this.tempList.splice(index,1)
  }


  clickedOnYesDeleteRow() {
    console.log( 'in del Name', this.optionId );
    this.deleteRow( this.optionId );
    // let index = this.summaryHtmlDataList.findIndex( o => o.id == this.optionId );
    // this.summaryHtmlDataList.splice( index, 1 );
    // if ( this.summaryHtmlDataList.length == 0 ) {
    //   this.validOptionList = true;
    // }
  }

  sectionReactiveForm() {
    this.headForm = this.formBuilder.group({
      headType: new FormControl('', Validators.required),
      EdHead: new FormControl( '', Validators.required),
      NonEDHeadName: new FormControl( '', Validators.required, ),
      applicabilitySDM: new FormControl('',Validators.required),
      editable: new FormControl('true'),
      captionField: new FormControl('', Validators.required),
      sectionFlexiForm : new FormControl('',Validators.required),
      Instructions : new FormControl(''),
      fromDate: new FormControl( '', Validators.required),
      toDate: [new Date('31-Dec-9999'), Validators.required],

      updationType : new FormControl(''),
      presentationMethod : new FormControl(''),
      updationValues : new FormControl(''),
      formulaName : new FormControl({value: '', disabled: true}, Validators.required),
      enableHeadUpdated : new FormControl(''),
      valuesThereof : new FormControl(''),
      reducedMaster : new FormControl(''),
      alreadyPaidAmount: new FormControl(''),
      updationEarlierCycle : new FormControl(''),
      updationFutureCycle : new FormControl(''),
      updationEnablingDates : new FormControl(''),
      minEligibilityMethod: new FormControl(''),
      SDMName1 : new FormControl({value: '', disabled: true}, Validators.required),
      DerivedName : new FormControl({value: '', disabled: true},Validators.required),
      formulaName1: new FormControl('',Validators.required),
      maxEligibilityMethod : new FormControl(''),
      SDMName2 : new FormControl({value: '', disabled: true}, Validators.required),
      DerivedName2 : new FormControl({value: '', disabled: true}, Validators.required),
      formulaName2 : new FormControl({value: '', disabled: true}, Validators.required),
      inBetweenMinMax : new FormControl(''),
      nodeGap : new FormControl({value: '', disabled: true}, Validators.required),
      updationEnablingDatesTemplate : new FormControl(''),
      updationWefEarilerCycle : new FormControl(''),
      updationWefFutureCycle : new FormControl(''),
      // derivedValue: new FormControl('', Validators.required),
      // balancingFigureApplicable: new FormControl('', Validators.required),
      // isActive: new FormControl(1),
      // remark: new FormControl(''),
    });


  }


  get pfArray() { return this.f.pfFormArray as FormArray; }

  // Table Data List
  getTableData(){
    this.flexiInputService.getHeadSettingTableData().subscribe((res) =>{
      this.tableDataList = res.data.results;
      console.log(this.tableDataList)
      // this.tableDataList.flexiHeadSetting.
      // console.log(this.tableDataList.flexiHeadSetting)

    })
  }

  //Show and hide
  onChangeHeadType(evt:any){
    if(evt == 'E/D Head'){
      this.getEDHeadList();
      this.headForm.patchValue({
        EdHead: '',
        NonEDHeadName : '',
      });
      this.headForm.controls['NonEDHeadName'].reset();
      this.isNonEDHeadName = false;
      this.isEDHeadName = true;
      this.headForm.get('NonEDHeadName').clearValidators();
      this.headForm.get('NonEDHeadName').updateValueAndValidity();
      this.headForm.get('EdHead').setValidators([Validators.required]);
      this.headForm.get('EdHead').updateValueAndValidity();
    }else if(evt == 'Non E/D Head'){
      this.edHeadNameList = [];
      this.headForm.get('EdHead').clearValidators();
      this.headForm.get('EdHead').updateValueAndValidity();
      this.headForm.get('NonEDHeadName').setValidators([Validators.required]);
      this.headForm.get('NonEDHeadName').updateValueAndValidity();
      this.isNonEDHeadName = true;
      this.isEDHeadName = false;
    }else{
      this.isNonEDHeadName = true;
      this.isNonEDHeadName = true;
    }
  }

  // UploadModal1( template: TemplateRef<any> ) {
  //   this.modalRef = this.modalService.show(
  //     template,
  //     Object.assign( {}, { class: 'gray modal-md' } )
  //   );
  // }

  //On Change Updation type
  onChangeUpdationType(evt:any){
    // this.presentationMethodList = [];
    // this.getPresentationMethod()
    if(evt == "1"){
      this.isShowUpdationValue = false;
      this.headForm.controls.formulaName.disable();
      this.headForm.get('formulaName').clearValidators();
      this.headForm.get('formulaName').updateValueAndValidity();
      this.presentationMethodList.forEach(element => {
        if(element.value == 4){
          element.isVisible = true;
        } else {
          element.isVisible = false;
        }
      });
    } else if(evt == "2"){
      this.isShowUpdationValue = true;
      this.headForm.controls.formulaName.disable();
      this.headForm.get('formulaName').clearValidators();
      this.headForm.get('formulaName').updateValueAndValidity();
      this.presentationMethodList.forEach(element => {
        // if((element.value).trim() == 5 || element.value == 6) {
          if(element.value == 5 || element.value == 6) {
          element.isVisible = true;
        } else {
          element.isVisible = false;
        }
      });
    } else if(evt == "3"){
      this.headForm.controls.formulaName.enable();
      this.headForm.get('formulaName').setValidators([Validators.required]);
      this.headForm.get('formulaName').updateValueAndValidity();
      this.isShowUpdationValue = false;
      this.presentationMethodList.forEach(element => {
        if (element.value == 4){
          element.isVisible = true;
        } else {
          element.isVisible = false;
        }
      });
    }
  }


 //Get Group Drop Down List for PHG
//  getGroupList() {
//   this.flexiInputService.getAllGroupId().subscribe((res) => {
//     this.flexiInputService = res.data.results;
//     res.data.results.forEach((element) => {
//       const obj = {
//         name: element.companyGroupCode,
//         code: element.companyGroupCode,
//         inactive: true
//       };
//       this.allGroupAndDescriptionList.push(obj);
//     });
//   });
// }


//OnChange Redio
  onRadioChange(value){

    if(value == 'true'){
      this.isShowFlexiTwoSection = true;
    }else{
      this.isShowFlexiTwoSection = false;
    }
  }


  getMinID(serviceCode: any) {
    const toSelect = this.minEligibilityMethod1.find(
      (element) => element.flexiSettingDDId == serviceCode
    );
    return toSelect.value;
    console.log('toSelect', toSelect);
  }
  //OnChange Min eligiblity method
  onChangeMinMethod(evt:any){
    // this.minId = parseInt(evt);
    console.log(evt)

    if(evt == 7){
      console.log(evt)
    // if(evt == "Zero"){
      // this.getEDHeadList();
      this.headForm.patchValue({
        EdHead: '',
        NonEDHeadName : '',
      });
      this.headForm.controls['SDMName1'].reset();
      this.headForm.controls['DerivedName'].reset();
      this.headForm.controls['formulaName1'].reset();
      this.headForm.patchValue({
        SDMName1: '',
        DerivedName : '',
        formulaName1 : '',
        });
        this.headForm.controls.SDMName1.disable();
        this.headForm.controls.DerivedName.disable();
        this.headForm.controls.formulaName1.disable();
      //   this.headForm.get['SDMName1'].disable();
      // this.headForm.get['DerivedName'].disable();
      // this.headForm.get['formulaName1'].disable();
    }else if(evt == 8){
      this.headForm.controls['SDMName1'].reset();
      this.headForm.controls['DerivedName'].reset();
      this.headForm.controls['formulaName1'].reset();
      this.headForm.patchValue({
        SDMName1: '',
        DerivedName : '',
        formulaName1 : '',
        });
        this.headForm.controls.SDMName1.enable();
        this.headForm.controls.formulaName1.disable();
        this.headForm.controls.DerivedName.enable();
        this.headForm.get('SDMName1').updateValueAndValidity();
        this.headForm.get('formulaName1').setValidators([Validators.required]);
    }else if(evt == 9){
      this.headForm.controls['SDMName1'].reset();
      this.headForm.controls['DerivedName'].reset();
      this.headForm.controls['formulaName1'].reset();
      this.headForm.patchValue({
        SDMName1: '',
        DerivedName : '',
        formulaName1 : '',
        });
        // this.headForm.get['formulaName1'].enable();
        this.headForm.controls.formulaName1.enable();
        this.headForm.controls.DerivedName.disable();
        this.headForm.controls.SDMName1.disable();
        this.headForm.get('formulaName1').updateValueAndValidity();
        this.headForm.get('DerivedName').setValidators([Validators.required]);
        this.headForm.get('SDMName1').setValidators([Validators.required]);
      }
    // }else{
    //   this.headForm.controls['SDMName1'].reset();
    //   this.headForm.controls['DerivedName'].reset();
    //   this.headForm.controls['formulaName1'].reset();
    //   this.headForm.patchValue({
    //     SDMName1: '',
    //     DerivedName : '',
    //     formulaName1 : '',
    //     });
    //     this.headForm.controls.DerivedName.enable();
    //     this.headForm.get('DerivedName').updateValueAndValidity();
    // }
  }

   //OnChange Min eligiblity method
   onChangeMaxMethod(evt:any){
     console.log(evt);
     if(evt == "12"){
      // this.getEDHeadList();
      // this.headForm.patchValue({
      //   EdHead: '',
      //   NonEDHeadName : '',
      // });
      this.headForm.controls['SDMName2'].reset();
      this.headForm.controls['DerivedName2'].reset();
      this.headForm.controls['formulaName2'].reset();
      this.headForm.patchValue({
        SDMName2: '',
        DerivedName2 : '',
        formulaName2 : '',
        });
        this.headForm.controls.SDMName2.disable();
        this.headForm.controls.DerivedName2.disable();
        this.headForm.controls.formulaName2.disable();
      //   this.headForm.get['SDMName2'].disable();
      // this.headForm.get['DerivedName2'].disable();
      // this.headForm.get['formulaName2'].disable();
    }else if(evt == "10"){
      this.headForm.controls['SDMName2'].reset();
      this.headForm.controls['DerivedName2'].reset();
      this.headForm.controls['formulaName2'].reset();
      this.headForm.patchValue({
        SDMName2: '',
        DerivedName2 : '',
        formulaName2 : '',
        });
        this.headForm.controls.SDMName2.enable();
        this.headForm.controls.formulaName2.disable();
        this.headForm.controls.DerivedName2.enable();
        this.headForm.get('SDMName2').updateValueAndValidity();
        this.headForm.get('formulaName2').setValidators([Validators.required]);
    }else if(evt == "11"){
      this.headForm.controls['SDMName2'].reset();
      this.headForm.controls['DerivedName2'].reset();
      this.headForm.controls['formulaName2'].reset();
      this.headForm.patchValue({
        SDMName2: '',
        DerivedName2 : '',
        formulaName2 : '',
        });
        // this.headForm.get['formulaName2'].enable();
        this.headForm.controls.formulaName2.enable();
        this.headForm.controls.DerivedName2.disable();
        this.headForm.controls.SDMName2.disable();
        this.headForm.get('formulaName2').updateValueAndValidity();
        this.headForm.get('DerivedName2').setValidators([Validators.required]);
        this.headForm.get('SDMName2').setValidators([Validators.required]);

    }else{
      this.headForm.controls['SDMName2'].reset();
      this.headForm.controls['DerivedName2'].reset();
      this.headForm.controls['formulaName2'].reset();
      this.headForm.patchValue({
        SDMName2: '',
        DerivedName2 : '',
        formulaName2 : '',
        });
        this.headForm.controls.DerivedName2.enable();
        this.headForm.get('DerivedName2').updateValueAndValidity();
    }
  }
  // getEDHead
getEDHeadList(){
  this.flexiInputService.getEDHead().subscribe((res) =>{
    if(res.data.results.length > 0){
      this.edHeadNameList1 = res.data.results;
      console.log("edHeadNameList1", this.edHeadNameList1);
      this.edHeadNameList1.forEach((element) => {
        const obj = {
          label: element.standardName,
          value: element.headMasterId,
        };
        this.edHeadNameList.push(obj);
      });
    }

  })}

    //getFormulaName
    getFormulaNameList(){
      this.flexiInputService.getFormulaName().subscribe((res) =>{
        if(res.data.results.length > 0){
          this.formulaNames = res.data.results;
          console.log("formulaNames", this.formulaNames)
          this.formulaNames.forEach((element) => {
            const obj = {
              label: element.formulaName,
              value: element.formulaId,
            };
            this.formulaNameList.push(obj);
          });
        }
      })}


       //getFormulaName
    getFormulaNameList1(){
      this.flexiInputService.getFormulaName().subscribe((res) =>{
        if(res.data.results.length > 0){
          this.formulaNames1 = res.data.results;
          this.formulaNameList1 = [];
          console.log("formulaNames", this.formulaNames1)
          this.formulaNames1.forEach((element) => {
            const obj = {
              label: element.formulaName,
              value: element.formulaId,
            };
            this.formulaNameList1.push(obj);
          });
        }
      })}

       //getFormulaName
    getFormulaNameList2(){
      this.flexiInputService.getFormulaName().subscribe((res) =>{
        if(res.data.results.length > 0){
          this.formulaNames2 = res.data.results;
          this.formulaNameList2 = [];
          console.log("formulaNames", this.formulaNames2)
          this.formulaNames2.forEach((element) => {
            const obj = {
              label: element.formulaName,
              value: element.formulaId,
            };
            this.formulaNameList2.push(obj);
          });
        }
      })}

          //get SDM Name List
    getSDMName(){
      this.flexiInputService.getSDMName().subscribe((res) =>{
        if(res.data.results.length > 0){
          this.sdmNameList1 = res.data.results[0];
          this.sdmNameList = [];
          console.log("sdmNameList1", this.sdmNameList1)
          this.sdmNameList1.forEach((element) => {
            const obj = {
              label: element.sdmvalue,
              value: element.id,
            };
            this.sdmNameList.push(obj);
          });
        }

      })}

      //SDM List new Max
      getSDMMax(){
        this.flexiInputService.getSDMName().subscribe((res) =>{
          if(res.data.results.length > 0){
            this.sdmNameList12 = res.data.results[0];
            this.sdmNameListMax = [];
            console.log("sdmNameList12", this.sdmNameList12)
            this.sdmNameList12.forEach((element) => {
              const obj = {
                label: element.sdmvalue,
                value: element.id,
              };
              this.sdmNameListMax.push(obj);
            });
          }

        })}
    // // Head Derived Name List
    //   getHeadDerivedNameList(){
    //     this.flexiInputService.getHeadDerivedNameList(name).subscribe((res) =>{
    //       if(res.data.results.length > 0){
    //         this.headDerivedNameList1 = res.data.results;
    //         console.log("headDerivedNameList1", this.headDerivedNameList1)
    //         this.headDerivedNameList1.forEach((element) => {
    //           const obj = {
    //             label: element.derivedName,
    //             value: element.sdmDerivedMasterId,
    //           };
    //           this.headDerivedNameList.push(obj);
    //         });
    //       }

    //     })}

        // Dirived drop down list
  onChangeDefinationEmpMax(evt: any) {
    if (evt == '') {
      this.headDerivedNameListMax = [];
    } else {
      this.headDerivedNameListMax = [];
      this.flexiInputService.getHeadDerivedNameList(evt).subscribe(
        (res) => {
          this.headDerivedNameListMax1 = res.data.results[0];
          // console.log('PeriodName In EMP ', this.cycleNameListEmp);
          this.headDerivedNameListMax = [];
          res.data.results[0].forEach((element) => {
            const obj = {
              label: element.derivedName,
              value: element.sdmDerivedTableId,
            };
            this.headDerivedNameListMax.push(obj);
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
  onChangeDefinationEmp(evt: any) {
    if (evt == '') {
      this.headDerivedNameList = [];
    } else {
      this.headDerivedNameList = [];
      this.flexiInputService.getHeadDerivedNameList(evt).subscribe(
        (res) => {
          this.headDerivedNameList1 = res.data.results[0];
          // console.log('PeriodName In EMP ', this.cycleNameListEmp);
          this.headDerivedNameList = [];
          res.data.results[0].forEach((element) => {
            const obj = {
              label: element.derivedName,
              value: element.sdmDerivedTableId,
            };
            this.headDerivedNameList.push(obj);
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



//On Change In Between Min MAx
inBetweenChange(evt : any){
  if(evt == "15"){
    this.headForm.controls.nodeGap.enable();
    this.headForm.get('nodeGap').updateValueAndValidity();
  }else{
    this.headForm.controls.nodeGap.disable();
  }
}
// Section of Flexi Form
getSectionOfFlexiForm(){
  this.flexiInputService.getSectionOfFlexiForm().subscribe((res) =>{
    if(res.data.results.length > 0){
      this.sectionOFFlexiFormNameList1 = res.data.results;
      console.log("sectionOFFlexiFormNameList1", this.sectionOFFlexiFormNameList1)
      this.sectionOFFlexiFormNameList1.forEach((element) => {
        const obj = {
          label: element.flexiSectionName,
          value: element.flexiSectionMasterId,
        };
        this.sectionOFFlexiFormNameList.push(obj);
      });
    }

  })}


    //-------------------- Policy End Date Validations with Policy Start Date ---------------
    setPolicyEndDate() {
      this.policyMinDate = this.headForm.get('fromDate').value;
      const policyStart = this.datePipe.transform(
        this.headForm.get('fromDate').value,
        'yyyy-MM-dd'
      );
      const policyEnd = this.datePipe.transform(
        this.headForm.get('toDate').value,
        'yyyy-MM-dd'
      );
      this.minFormDate = this.policyMinDate;
      if (policyStart > policyEnd) {
        this.headForm.controls.toDate.reset();
      }
      this.headForm.patchValue({
        fromDate: new Date(this.policyMinDate),
      });
      this.setPaymentDetailToDate();
    }
//------------------- Payment Detail To Date Validations with Payment Detail From Date ----------------
setPaymentDetailToDate() {
  this.paymentDetailMinDate = this.headForm.get('fromDate').value;
  const from = this.datePipe.transform(
    this.headForm.get('fromDate').value,
    'yyyy-MM-dd'
  );
  const to = this.datePipe.transform(
    this.headForm.get('toDate').value,
    'yyyy-MM-dd'
  );
  if (from > to) {
    this.headForm.controls.toDate.reset();
  }
}
    //Edit form
    // this.policyMinDate = this.form.value.fromDate;
    // this.setPolicyEndDate();


    // Section of Flexi Form
    getApplicabilitySDM(){
  this.flexiInputService.getApplicabilitySDM().subscribe((res) =>{
    if(res.data.results.length > 0){
      this.applicablitySDMList1 = res.data.results[0];
      console.log("applicablitySDMList1", this.applicablitySDMList1)
      this.applicablitySDMList1.forEach((element) => {
        const obj = {
          label: element.sdmvalue,
          value: element.id,
        };
        this.applicablitySDMList.push(obj);
      });
    }
  })};

//Updation Type
  getUpdationType(){
    this.flexiInputService.getUpdationType().subscribe((res) =>{
      if(res.data.results.length > 0){
        this.updationType1 = res.data.results;
        console.log("updationType1", this.updationType1)
        this.updationType1.forEach((element) => {
          const obj = {
            label: element.value,
            value: element.flexiSettingDDId,
          };
          this.updationTypeList.push(obj);
        });
      }
    })};

    // Presentation Method

  getPresentationMethod(){
    this.flexiInputService.getPresentationMethod().subscribe((res) =>{
      if(res.data.results.length > 0){
        this.presentationMethod1 = res.data.results;
        console.log("presentationMethod1", this.presentationMethod1)
        this.presentationMethod1.forEach((element) => {
          const obj = {
            label: element.value,
            value: element.flexiSettingDDId,
            isVisible : true,
          };
          this.presentationMethodList.push(obj);
        });
      }
    })};

    filterByVisibility() {
      return this.presentationMethodList.filter( x => x.isVisible == true);
    }

    // Min Eligibility Method

    getMinEligibilityMethod(){
      this.flexiInputService.getMinEligibilityMethod().subscribe((res) =>{
        if(res.data.results.length > 0){
          this.minEligibilityMethod1 = res.data.results;
          console.log("minEligibilityMethod1", this.minEligibilityMethod1)
          this.minEligibilityMethod1.forEach((element) => {
            const obj = {
              label: element.value,
              value: element.flexiSettingDDId,
            };
            this.minEligibilityMethodList.push(obj);
          });
        }
      })};


      // Max Eligibility Method
      getMaxEligibilityMethod(){
        this.flexiInputService.getMaxEligibilityMethod().subscribe((res) =>{
          if(res.data.results.length > 0){
            this.maxEligibilityMethod1 = res.data.results;
            console.log("maxEligibilityMethod1", this.maxEligibilityMethod1)
            this.maxEligibilityMethod1.forEach((element) => {
              const obj = {
                label: element.value,
                value: element.flexiSettingDDId,
              };
              this.maxEligibilityMethodList.push(obj);
            });
          }
        })};

        // Between Min Max
        getInBetweenMinMax(){
          this.flexiInputService.getInBetweenMinMax().subscribe((res) =>{
            if(res.data.results.length > 0){
              this.inBetweenMinMaxList1 = res.data.results;
              console.log("inBetweenMinMaxList1", this.inBetweenMinMaxList1)
              this.inBetweenMinMaxList1.forEach((element) => {
                const obj = {
                  label: element.value,
                  value: element.flexiSettingDDId,
                };
                this.inBetweenMinMaxList.push(obj);
              });
            }
          })};

          editNameMaster( id: number, name: string ) {
            this.isEditMode = true;
            this.optionId = id;
            this.headForm.patchValue( {
              optionList: name,
            } );
          }



  get f() { return this.headForm.controls; }

  keyPressedSpaceNotAllow( event: any ) {
    const pattern = /[ ]/;
    let inputChar = String.fromCharCode( event.charCode );
    if ( pattern.test( inputChar ) ) {
      event.preventDefault();
    }
  }



  addRow( i?: number ) {
    var setsFormArray = this.headForm.get( 'pfFormArray' ) as FormArray;
    this.pfArray.insert( this.pfArray.length, this.formBuilder.group( {
      optionList: ['', Validators.required],
    } ) );

  }
  getServiceName(serviceCode: any) {
    const toSelect = this.maxEligibilityMethod1.find(
      (element) => element.value == serviceCode
    );
    return toSelect.flexiSettingDDId;
    console.log('toSelect', toSelect);
  }


  getMinMethodID(serviceCode: any) {
    const toSelect = this.minEligibilityMethod1.find(
      (element) => element.value == serviceCode
    );
    return toSelect.flexiSettingDDId;
    console.log('toSelect', toSelect);
  }



  // getMinMax(serviceCode: any) {
  //   const toSelect = this.inBetweenMinMaxList1.find(
  //     (element) => element.value == serviceCode
  //   );
  //   return toSelect.flexiSettingDDId;
  //   console.log('toSelect', toSelect);
  // }

  getInBetween(serviceCode: any) {
    const toSelect = this.inBetweenMinMaxList1.find(
      (element) => element.value == serviceCode
    );
    return toSelect.flexiSettingDDId;
    console.log('toSelect', toSelect);
  }



  getUpdation(serviceCode: any) {
    const toSelect = this.updationType1.find(
      (element) => element.value == serviceCode
    );
    return toSelect.flexiSettingDDId;
    console.log('toSelect', toSelect);
  }



  getPresent(serviceCode: any) {
    const toSelect = this.presentationMethod1.find(
      (element) => element.value == serviceCode
    );
    return toSelect.flexiSettingDDId;
    console.log('toSelect', toSelect);
  }


  updationSave(){
    if (this.invoiceForm.invalid) {
      return;
    }

    // this.getUpdationValue = this.invoiceForm.get('itemname') as FormArray;
    this.getUpdationValue = this.invoiceForm.value;
    console.log(this.invoiceForm);
  }



  save(){

const data = {


  flexiDependentHeadSetting : {
    enableThisHeadIfUpdated: 1,
    valuesThereOf : "test",
    },

  flexiHeadSetting  : {
    alreadyPaidAmountRecoveryPermissible : this.headForm.get('alreadyPaidAmount').value == 'Yes' ? 1 : 0,
    applicabilitySDMId : parseInt(this.headForm.get('applicabilitySDM').value),
    captionOfInputField : this.headForm.get('captionField').value,
    editable : this.headForm.get('editable').value == 'true' ? 1 : 0,
    flexiSectionMasterId : parseInt(this.headForm.get('sectionFlexiForm').value),
    formulaMasterId : parseInt(this.headForm.get('formulaName').value),
    fromDate :  this.datePipe.transform( this.headForm.get('fromDate').value, 'yyyy-MM-dd'),
    headMasterId : parseInt(this.headForm.get('EdHead').value),
    headType : this.headForm.get('headType').value,
    // inBetweenMinMax : this.getInBetween(this.headForm.get('inBetweenMinMax').value),
    inBetweenMinMax : this.headForm.get('inBetweenMinMax').value,
    // maxEligibilityMethod : this.getServiceName(this.headForm.get('maxEligibilityMethod').value),
    maxEligibilityMethod : parseInt(this.headForm.get('maxEligibilityMethod').value),
    maxEligibilitySDMId : parseInt(this.headForm.get('SDMName2').value),
    maxFormulaId : parseInt(this.headForm.get('formulaName1').value),
    maxSDMDerivedId : parseInt(this.headForm.get('DerivedName').value),
    // minEligibilityMethod : this.getMinMethodID(this.headForm.get('minEligibilityMethod').value),
    minEligibilityMethod : parseInt(this.headForm.get('minEligibilityMethod').value),
    minEligibilitySDMId : parseInt(this.headForm.get('SDMName1').value),
    minFormulaId : parseInt(this.headForm.get('formulaName2').value),
    minSDMDerivedId : parseInt(this.headForm.get('DerivedName2').value),
    nodeGap : parseInt(this.headForm.get('nodeGap').value),
    nonEdHeadName : this.headForm.get('NonEDHeadName').value,
    // presentationMethod  : this.getPresent(this.headForm.get('presentationMethod').value),
    presentationMethod  : parseInt(this.headForm.get('presentationMethod').value),
    reducedMasterValuePermissible  : this.headForm.get('reducedMaster').value == 'Yes' ? 1: 0,
    remark : this.headForm.get('Instructions').value,
    toDate  : this.datePipe.transform( this.headForm.get('toDate').value, 'yyyy-MM-dd'),
    updationEnablingDatesTemplate: this.headForm.get('updationEnablingDatesTemplate').value == 'Yes' ? 1 : 0,
    // updationType : this.getUpdation(this.headForm.get('updationType').value),
    updationType : parseInt(this.headForm.get('updationType').value),
    updationWefEarilerCycle : this.headForm.get('updationEnablingDatesTemplate').value == 'Yes' ? 1: 0,
    updationWefFutureCycle : this.headForm.get('updationWefFutureCycle').value == 'Yes' ? 1: 0,
},

flexiUpdationValue: {
  isActive: 1,
  // value: this.getUpdationValue,
  value: this.itemNameArray.toString(),
  },


  }



this.flexiInputService.postHeadMaster(data).subscribe((res) => {
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
});

this.headForm.reset();
// this.headForm.get('isActive').setValue(1);
// this.headForm.get('isActive').disable();
this.sectionReactiveForm()
this.headForm.patchValue({
       headType: '',
      EdHead: '',
      NonEDHeadName: '',
      applicabilitySDM: '',
      editable: 'true',
      captionField: '',
      sectionFlexiForm : '',
      Instructions : '',
      fromDate: '',
      toDate: '31-Dec-9999',
      updationType : '',
      presentationMethod : '',
      updationValues : '',
      formulaName : '',
      enableHeadUpdated : '',
      valuesThereof : '',
      reducedMaster : '',
      alreadyPaidAmount: '',
      updationEarlierCycle : '',
      updationFutureCycle : '',
      updationEnablingDates : '',
      minEligibilityMethod: '',
      SDMName1 : '',
      DerivedName : '',
      formulaName1: '',
      maxEligibilityMethod : '',
      SDMName2 : '',
      DerivedName2 : '',
      formulaName2 : '',
      inBetweenMinMax : '',
      nodeGap : '',
      updationEnablingDatesTemplate : '',
      updationWefEarilerCycle : '',
      updationWefFutureCycle : '',
});
}

resetForm(){
  this.sectionReactiveForm()
  this.headForm.get('editable').setValue(true);
  this.headForm.patchValue({
       headType: '',
      EdHead: '',
      NonEDHeadName: '',
      applicabilitySDM: '',
      editable: 'true',
      captionField: '',
      sectionFlexiForm : '',
      Instructions : '',
      fromDate: '',
      toDate: '31-Dec-9999',
      updationType : '',
      presentationMethod : '',
      updationValues : '',
      formulaName : '',
      enableHeadUpdated : '',
      valuesThereof : '',
      reducedMaster : '',
      alreadyPaidAmount: '',
      updationEarlierCycle : '',
      updationFutureCycle : '',
      updationEnablingDates : '',
      minEligibilityMethod: '',
      SDMName1 : '',
      DerivedName : '',
      formulaName1: '',
      maxEligibilityMethod : '',
      SDMName2 : '',
      DerivedName2 : '',
      formulaName2 : '',
      inBetweenMinMax : '',
      nodeGap : '',
      updationEnablingDatesTemplate : '',
      updationWefEarilerCycle : '',
      updationWefFutureCycle : '',
});
}



  // initItemRows() {
  //   return this.formBuilder.group({
  //     itemname: ['']
  //   });
  // }

  // addNewRow() {
  //   this.formArr.push(this.initItemRows());
  // }



  isListOnlySpecialCharacter() {
    // this.listInvalid = false
    console.log( 'isListOnlySpecialCharacter' );
    var splChars = "* |,\":<>[]{}^`\!';()@&$#%1234567890";
    for ( var i = 0; i < this.headForm.get( 'pfFormArray' )['controls'][i].get('optionList').value.length; i++ ) {
      if ( splChars.indexOf( this.headForm.get( 'pfFormArray' )['controls'][i].get('optionList').value.charAt( i ) ) != -1 ) {
        //alert("Illegal characters detected!");
        // this.listInvalid = true;
      } else {
        // this.listInvalid = false;
        break;
      }
    }
    // AttributeCreationForm.get('pfFormArray')['controls'][i].get('optionList')

    // if ( this.listInvalid == true ) {
    //   //this.companyGroupNameInvalid = false;
    //   //   this.AttributeCreationForm.get('companyGroupName').inValid = true;
    //   // this.AttributeCreationForm.get( 'optionList' ).status = 'INVALID';

    // }
  }


  addRowWithData( optionList: string ) {
    this.pfArray.push( this.formBuilder.group( {

      optionList: [optionList, Validators.required],

    } ) );

  }

  // Edit
  eidtHead(data){
    window.scrollTo(0, 0);
    // this.headForm.patchValue(data);
    this.isUpdateMode = true;
    this.isUpdateModeSave = false;
    this.isViewMode =false;
    this.headForm.enable()
    this.isNonEDHeadName = false;
    // if(Head Type)

    // if(evt == 'E/D Head'){
    //   this.isNonEDHeadName = false;
    //   this.isEDHeadName = true;
    // }
    console.log("data", data);
      this.headForm.get('EdHead').setValue(data.flexiHeadSetting.headMasterId);
      this.headForm.get('headType').setValue(data.flexiHeadSetting.headType);
      this.headForm.get('NonEDHeadName').setValue(data.flexiHeadSetting.nonEdHeadName);
      this.headForm.get('applicabilitySDM').setValue(data.flexiHeadSetting.applicabilitySDMId);
      this.headForm.get('editable').setValue(data.flexiHeadSetting.editable == 1 ? 'true' : 'false');
      this.headForm.get('captionField').setValue(data.flexiHeadSetting.captionOfInputField);
      this.headForm.get('sectionFlexiForm').setValue(data.flexiHeadSetting.flexiSectionMasterId);
      this.headForm.get('toDate').setValue(new Date(data.flexiHeadSetting.toDate));
      this.headForm.get('fromDate').setValue(new Date(data.flexiHeadSetting.fromDate));
      this.headForm.get('updationType').setValue(data.flexiHeadSetting.updationType);
      this.headForm.get('presentationMethod').setValue(data.flexiHeadSetting.presentationMethod);
      this.headForm.get('inBetweenMinMax').setValue(data.flexiHeadSetting.inBetweenMinMax);
      this.headForm.get('maxEligibilityMethod').setValue(data.flexiHeadSetting.maxEligibilityMethod);
      this.headForm.get('SDMName2').setValue(data.flexiHeadSetting.maxEligibilitySDMId);
      this.headForm.get('formulaName1').setValue(data.flexiHeadSetting.maxFormulaId);
      this.headForm.get('DerivedName').setValue(data.flexiHeadSetting.maxSDMDerivedId);
      this.headForm.get('minEligibilityMethod').setValue(data.flexiHeadSetting.minEligibilityMethod);
      this.onChangeMinMethod(data.flexiHeadSetting.minEligibilityMethod);
      this.headForm.get('SDMName1').setValue(data.flexiHeadSetting.minEligibilitySDMId);
      this.headForm.get('DerivedName2').setValue(data.flexiHeadSetting.minSDMDerivedId);
      this.headForm.get('NonEDHeadName').setValue(data.flexiHeadSetting.nodeGap);
      // this.headForm.get('SDMName1').setValue(data.flexiHeadSetting.enableThisHeadIfUpdated);
      this.headForm.get('DerivedName2').setValue(data.flexiHeadSetting.valuesThereOf);
      this.headForm.get('reducedMaster').setValue(data.flexiHeadSetting.reducedMasterValuePermissible == 1 ? 'Yes' : 'No');
      this.headForm.get('alreadyPaidAmount').setValue(data.flexiHeadSetting.alreadyPaidAmountRecoveryPermissible == 1 ? 'Yes' : 'No');
      this.headForm.get('updationWefEarilerCycle').setValue(data.flexiHeadSetting.updationWefEarilerCycle == 1 ? 'Yes' : 'No');
      this.headForm.get('updationWefFutureCycle').setValue(data.flexiHeadSetting.updationWefFutureCycle == 1 ? 'Yes' : 'No');
      this.headForm.get('updationEnablingDatesTemplate').setValue(data.flexiHeadSetting.updationEnablingDatesTemplate == 1 ? 'Yes' : 'No');

  }

  // View


  //Click on View button pach value and form will disabled
  viewMode(data) {
    console.log(data)
    this.canView = true;
    this.isUpdateMode = false;
    this.isUpdateModeSave = false;
    this.isViewMode = true;
    this.headForm.disable()
    this.headForm.get('EdHead').setValue(data.flexiHeadSetting.headMasterId);
    this.headForm.get('headType').setValue(data.flexiHeadSetting.headType);
    this.headForm.get('NonEDHeadName').setValue(data.flexiHeadSetting.nonEdHeadName);
    this.headForm.get('applicabilitySDM').setValue(data.flexiHeadSetting.applicabilitySDMId);
    this.headForm.get('editable').setValue(data.flexiHeadSetting.editable == 1 ? 'true' : 'false');
    this.headForm.get('captionField').setValue(data.flexiHeadSetting.captionOfInputField);
    this.headForm.get('sectionFlexiForm').setValue(data.flexiHeadSetting.flexiSectionMasterId);
    this.headForm.get('fromDate').setValue(data.flexiHeadSetting.fromDate);
    this.headForm.get('toDate').setValue(data.flexiHeadSetting.toDate);
    this.headForm.get('updationType').setValue(data.flexiHeadSetting.updationType);
    this.headForm.get('presentationMethod').setValue(data.flexiHeadSetting.presentationMethod);
    this.headForm.get('inBetweenMinMax').setValue(data.flexiHeadSetting.inBetweenMinMax);
    this.headForm.get('sectionFlexiForm').setValue(data.flexiHeadSetting.maxEligibilityMethod);
    this.headForm.get('SDMName2').setValue(data.flexiHeadSetting.maxEligibilitySDMId);
    this.headForm.get('formulaName1').setValue(data.flexiHeadSetting.maxFormulaId);
    this.headForm.get('DerivedName').setValue(data.flexiHeadSetting.maxSDMDerivedId);
    this.headForm.get('minEligibilityMethod').setValue(data.flexiHeadSetting.minEligibilityMethod);
    this.headForm.get('SDMName1').setValue(data.flexiHeadSetting.minEligibilitySDMId);
    this.headForm.get('DerivedName2').setValue(data.flexiHeadSetting.minSDMDerivedId);
    this.headForm.get('NonEDHeadName').setValue(data.flexiHeadSetting.nodeGap);
    this.headForm.get('SDMName1').setValue(data.flexiHeadSetting.enableThisHeadIfUpdated);
    this.headForm.get('DerivedName2').setValue(data.flexiHeadSetting.valuesThereOf);
    this.headForm.get('reducedMaster').setValue(data.flexiHeadSetting.reducedMasterValuePermissible == 1 ? 'Yes' : 'No');
    this.headForm.get('alreadyPaidAmount').setValue(data.flexiHeadSetting.alreadyPaidAmountRecoveryPermissible == 1 ? 'Yes' : 'No');
    this.headForm.get('updationWefEarilerCycle').setValue(data.flexiHeadSetting.updationWefEarilerCycle == 1 ? 'Yes' : 'No');
    this.headForm.get('updationWefFutureCycle').setValue(data.flexiHeadSetting.updationWefFutureCycle == 1 ? 'Yes' : 'No');
    this.headForm.get('updationEnablingDatesTemplate').setValue(data.flexiHeadSetting.updationEnablingDatesTemplate == 1 ? 'Yes' : 'No');

    window.scrollTo(0, 0);
  }

  // Cancel View
  cancelViewInUpdateView(){
    window.scrollTo(0, 0);
    this.headForm.reset();
    this.headForm.enable();
    this.headForm.patchValue({
      headType: '',
     EdHead: '',
     NonEDHeadName: '',
     applicabilitySDM: '',
     editable: 'true',
     captionField: '',
     sectionFlexiForm : '',
     Instructions : '',
     fromDate: '',
     toDate: '31-Dec-9999',
     updationType : '',
     presentationMethod : '',
     updationValues : '',
     formulaName : '',
     enableHeadUpdated : '',
     valuesThereof : '',
     reducedMaster : '',
     alreadyPaidAmount: '',
     updationEarlierCycle : '',
     updationFutureCycle : '',
     updationEnablingDates : '',
     minEligibilityMethod: '',
     SDMName1 : '',
     DerivedName : '',
     formulaName1: '',
     maxEligibilityMethod : '',
     SDMName2 : '',
     DerivedName2 : '',
     formulaName2 : '',
     inBetweenMinMax : '',
     nodeGap : '',
     updationEnablingDatesTemplate : '',
     updationWefEarilerCycle : '',
     updationWefFutureCycle : '',
});
  }

 //Delete API code
 deleteHead(template: TemplateRef<any>, user1) {
  this.deleteModalRef = this.modalService.show(
    template,
    Object.assign({}, { class: 'gray modal-md' })
  );
  // this.deletedjobMasterId = user1.flexiSectionMasterId;
  this.deletedjobMasterId = user1.flexiHeadSetting.flexiHeadSettingId;
}
  //Delete API Call
  DeletePayrollHeadGroup(): void {
    this.flexiInputService
      .deleteHead(this.deletedjobMasterId)
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

  // Put Method
  putMethod(){

    const data = {


      flexiDependentHeadSetting : {
        enableThisHeadIfUpdated: 1,
        valuesThereOf : "test",
        },

      flexiHeadSetting  : {
        alreadyPaidAmountRecoveryPermissible : this.headForm.get('alreadyPaidAmount').value == 'Yes' ? 1 : 0,
        applicabilitySDMId : parseInt(this.headForm.get('applicabilitySDM').value),
        captionOfInputField : this.headForm.get('captionField').value,
        editable : this.headForm.get('editable').value == 'true' ? 1 : 0,
        flexiSectionMasterId : parseInt(this.headForm.get('sectionFlexiForm').value),
        formulaMasterId : parseInt(this.headForm.get('formulaName').value),
        fromDate :  this.datePipe.transform( this.headForm.get('fromDate').value, 'yyyy-MM-dd'),
        // headMasterId : parseInt(this.headForm.get('EdHead').value) == 0 ? 1: 0,
        headType : this.headForm.get('headType').value,
        // inBetweenMinMax : this.getInBetween(this.headForm.get('inBetweenMinMax').value),
        inBetweenMinMax : this.headForm.get('inBetweenMinMax').value,
        // maxEligibilityMethod : this.getServiceName(this.headForm.get('maxEligibilityMethod').value),
        maxEligibilityMethod : parseInt(this.headForm.get('maxEligibilityMethod').value),
        maxEligibilitySDMId : parseInt(this.headForm.get('SDMName2').value),
        maxFormulaId : parseInt(this.headForm.get('formulaName1').value),
        maxSDMDerivedId : parseInt(this.headForm.get('DerivedName').value),
        // minEligibilityMethod : this.getMinMethodID(this.headForm.get('minEligibilityMethod').value),
        minEligibilityMethod : parseInt(this.headForm.get('minEligibilityMethod').value),
        minEligibilitySDMId : parseInt(this.headForm.get('SDMName1').value),
        minFormulaId : parseInt(this.headForm.get('formulaName2').value),
        minSDMDerivedId : parseInt(this.headForm.get('DerivedName2').value),
        nodeGap : parseInt(this.headForm.get('nodeGap').value),
        nonEdHeadName : this.headForm.get('NonEDHeadName').value,
        // presentationMethod  : this.getPresent(this.headForm.get('presentationMethod').value),
        presentationMethod  : parseInt(this.headForm.get('presentationMethod').value),
        reducedMasterValuePermissible  : this.headForm.get('reducedMaster').value == 'Yes' ? 1: 0,
        remark : this.headForm.get('Instructions').value,
        toDate  : this.datePipe.transform( this.headForm.get('toDate').value, 'yyyy-MM-dd'),
        updationEnablingDatesTemplate: this.headForm.get('updationEnablingDatesTemplate').value == 'Yes' ? 1 : 0,
        // updationType : this.getUpdation(this.headForm.get('updationType').value),
        updationType : parseInt(this.headForm.get('updationType').value),
        updationWefEarilerCycle : this.headForm.get('updationEnablingDatesTemplate').value == 'Yes' ? 1: 0,
        updationWefFutureCycle : this.headForm.get('updationWefFutureCycle').value == 'Yes' ? 1: 0,
    },

    flexiUpdationValue: {
      isActive: 1,
      // value: this.getUpdationValue,
      value: this.itemNameArray.toString(),
      },


      }


  this.flexiInputService.putMaster(data).subscribe(
    (res: any) => {
      if ( res.data.results.length > 0 ) {
        console.log( 'data is updated' );
        // this.isEditMode = false;
        this.alertService.sweetalertMasterSuccess( 'Recored Updated Successfully.', '' );
        this.hideRemarkDiv2 = false;
        this.tableDataList = [];
        this.getTableData();
        this.headForm.get('flexiSectionName').enable();
        this.headForm.reset();
        this.isUpdateMode = false;
        this.isUpdateModeSave = true;
       this.headForm.patchValue({
        headType: '',
       EdHead: '',
       NonEDHeadName: '',
       applicabilitySDM: '',
       editable: 'true',
       captionField: '',
       sectionFlexiForm : '',
       Instructions : '',
       fromDate: '',
       toDate: '31-Dec-9999',
       updationType : '',
       presentationMethod : '',
       updationValues : '',
       formulaName : '',
       enableHeadUpdated : '',
       valuesThereof : '',
       reducedMaster : '',
       alreadyPaidAmount: '',
       updationEarlierCycle : '',
       updationFutureCycle : '',
       updationEnablingDates : '',
       minEligibilityMethod: '',
       SDMName1 : '',
       DerivedName : '',
       formulaName1: '',
       maxEligibilityMethod : '',
       SDMName2 : '',
       DerivedName2 : '',
       formulaName2 : '',
       inBetweenMinMax : '',
       nodeGap : '',
       updationEnablingDatesTemplate : '',
       updationWefEarilerCycle : '',
       updationWefFutureCycle : '',
  });
      } else {
        this.alertService.sweetalertWarning( res.status.messsage );
      }
      this.headForm.get('flexiSectionName').enable();

    });
  }
}
