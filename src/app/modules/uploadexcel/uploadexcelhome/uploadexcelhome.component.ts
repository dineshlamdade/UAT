import { Title } from '@angular/platform-browser';
import { Component, OnInit, TemplateRef, ViewChildren, QueryList, ElementRef } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';




import * as FileSaver from 'file-saver';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MenuItem } from 'primeng/api';
import { of } from 'rxjs';
import { groupBy } from 'rxjs/operators';
import { AlertServiceService } from 'src/app/core/services/alert-service.service';
import { ExcelService } from './excel.service';
import { UploadExcelHomeService } from './upload-excel-home.service';
import { NgIfContext } from '@angular/common';
@Component({
  selector: 'app-uploadexcelhome',
  templateUrl: './uploadexcelhome.component.html',
  styleUrls: ['./uploadexcelhome.component.scss'],
})
export class UploadexcelhomeComponent implements OnInit {
  sheetDataArray = [];
  // for edit
  templateMasterId: number = 0;
  previewTableData = [];

  buttonIndex: number;
  errorInSequence = false;
  checkboxNameToBeCheckedByDefault: string;
  indexNextAndPrevious: number;

  personalInfoMergeTab: boolean = false;
  complianceInfoMergeTab: boolean = false;
  contactInfoMergeTab: boolean = false;
  identityInfoMergeTab: boolean = false;
  jobInfoMergeTab: boolean = false;
  previousEmployementMergeTab: boolean = false;
  eduAndSkillMergeTab: boolean = false;
  employmentInfoMergeTab: boolean = false;
  familyInfoMergeTab: boolean = false;
  payrollInfoMergeTab: boolean = false;



  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;
  public wrongSequenceNumberisEntered: boolean = false;
  public anantTemp = {};
  public sheetsize: number = 0;
  public json: any;
  public tempMergeSelectedArrayList = [];
  public formData: any;
  public fileInput: any;
  public hideNextButton: boolean = false;
  public hidePreviousButton: boolean = false;
  selectAllEnableDisable: boolean = false;
  selectAllModel: boolean = false;

  public selectedMergedGroupList = [];
  public employeeMasterModuleList = [];
  //   { checked: false, group: 0, disabled: false, assignValue: '', id: '1', title: 'Personal Information' },
  //   { checked: false, group: 0, disabled: false, assignValue: '', id: '2', title: 'Compliance Information' },
  //   { checked: false, group: 0, disabled: false, assignValue: '', id: '3', title: 'Contact Information' },
  //   { checked: false, group: 0, disabled: false, assignValue: '', id: '4', title: 'Identity Information' },
  //   { checked: false, group: 0, disabled: false, assignValue: '', id: '5', title: 'Education & Skill Information' },
  //   { checked: false, group: 0, disabled: false, assignValue: '', id: '6', title: 'Employment Information' },
  //   { checked: false, group: 0, disabled: false, assignValue: '', id: '7', title: 'Previous Employment  Information' },
  //   { checked: false, group: 0, disabled: false, assignValue: '', id: '8', title: 'Payroll Information' },
  //   { checked: false, group: 0, disabled: false, assignValue: '', id: '9', title: 'Family Information' },
  //   { checked: false, group: 0, disabled: false, assignValue: '', id: '10', title: 'Job Information' },

  // ];
  // public mergeArrayList: [
  //   { leftSideMenuList: 'Personal Information', values: [] },
  //   { leftSideMenuList: 'Compliance Information', values: [] },
  //   { leftSideMenuList: 'Identity Information', values: [] },
  //   { leftSideMenuList: 'Contact Information', values: [] },
  //   { leftSideMenuList: 'Previous Employment  Information', values: [] },
  //   { leftSideMenuList: 'Education & Skill Information', values: [] },
  //   { leftSideMenuList: 'Employment Information', values: [] },
  //   { leftSideMenuList: 'Payroll Information', values: [] },
  //   { leftSideMenuList: 'Family Information', values: [] },
  //   { leftSideMenuList: 'Job Information', values: [] },
  // ];

  public mergePersonalInformation = false;
  public mergeComplianceInformation = false;
  public mergeContactInformation = false;
  public mergeIdentityInformation = false;
  public mergeEducationAndSkillInformation = false;
  public mergeEmploymentInformation = false;
  public mergePreviousEmploymentInformation = false;
  public mergePayrollInformation = false;
  public mergeFamilyInformation = false;
  public mergeJobInformation = false;
  public selectedPersonalInformationFields = [];
  public selectedDropDownSequenceNumberList = [];
  public masterGetExcelTableFieldsResponse: any;
  public leftSideBarMenuList = [];
  public selectedCounterPersonalInformationList = [];
  public selectedCounterComplianceInformationList = [];
  public selectedCounterIdentityInformationList = [];
  public selectedCounterContactInformationList = [];
  public selectedCounterPreviousEmploymentInformationList = [];
  public selectedCounterEducationAndSkillInformationList = [];
  public selectedCounterEmploymentInformationList = [];
  public selectedCounterPayrollInformationList = [];
  public selectedCounterFamilyInformationList = [];
  public selectedCounterJobInformationList = [];
  public fieldNameArrayList = [];
  public global = [];
  public counterPersonalInformation = 0;
  public counterContactInformation = 0;
  public counterIdentityInformation = 0;
  public counterComplianceInformation = 0;
  public counterEducationAndSkillInformation = 0;
  public counterPreviousEmploymentInformation = 0;
  public counterPayrollInformation = 0;
  public counterFamilyInformation = 0;
  public counterEmploymentInformation = 0;
  public counterJobInformation = 0;
  public sequenceArray = [];
  public sequenceSelect = true;
  public isEditMode = false;
  public modalRef: BsModalRef;
  public form: any = FormGroup;
  public checkedEmployeeMaster = true;
  public checkedPayrollMaster = false;
  public checkedLeaveManangement = false;
  public checkedAssetMaster = false;
  public ordersData = [];
  public arrayOfObj = [];
  public filterDropDownList = [];
  public selectedSummaryCheckBoxHtmlDataList = [];
  public summaryOfExcelTemplate = [];
  public masterOfExcelTemplate: any;
  // public customizedResponse: Array<any> = [];

  public checkBoxHtmlDataList = [];
  public excelDataList: any = [];
  public checkBoxHtmlDataList1 = [];
  public items: MenuItem[];
  public preview = false;
  public dropdownList = [];
  public selectedItems = [];
  public mergeSelected = [];
  public dropdownSettings = {};
  public dropdownList1 = [];
  constructor(private modalService: BsModalService, private formBuilder: FormBuilder, private excelService: ExcelService,
    private uploadeExcelHomeService: UploadExcelHomeService, private alertService: AlertServiceService) {
    this.excelDataList = [];

    this.form = this.formBuilder.group({
      filterTemplateDropDown: new FormControl(''),
      orders: new FormArray([]),
      templateName: new FormControl('', Validators.required),
      description: new FormControl(''),
      remark: new FormControl(''),
      orderCheckbox: new FormControl(''),
    });
  }

  public ngOnInit(): void {




    this.dropdownList = [
      { id: 1, label: 'PA_01_Staff' },
      { id: 2, label: 'PA_02_Worker' },
    ];
    this.dropdownList1 = [
      { id: 1, label: 'Employee Master' },
      { id: 2, label: 'Payroll' },
      { id: 3, label: 'Leave Management' },
      { id: 4, label: 'Expense Reimbursement ' },
      { id: 5, label: 'Assets ' },
    ];
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'label',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true,
    };
    this.getAllExcelTemplate();
    this.getExcelTableFields();
  }
  getExcelTableFields() {
    this.fieldNameArrayList = [];
    this.masterGetExcelTableFieldsResponse = {};
    this.leftSideBarMenuList = [];
    this.uploadeExcelHomeService.getExcelTableFields().subscribe((res) => {
      this.masterGetExcelTableFieldsResponse = res;
      let counter = 1;
      let globalCounter = 1;
      let idForEmpMasterModule = 1;
      this.leftSideBarMenuList.push({ id: 1, name: 'Select All', disable: false });

      res.data.results.forEach((element) => {
        let flagForEmployeeCode = false;
        let flagForCompanyName = false;
        this.leftSideBarMenuList.push({ id: counter++, name: element.sheetName, disable: false, group: 0, hide: false });

        this.employeeMasterModuleList.push({ checked: false, group: 0, disabled: false, assignValue: '', id: idForEmpMasterModule++, title: element.sheetName });

        for (let i = 0; i < element.fields.length; i++) {
          if (element.fields[i].customLabelName == 'NA') { } else {

            if (element.fields[i].customLabelName == 'Employee Code' || element.fields[i].customLabelName == 'Company Name') {
              if (element.fields[i].customLabelName == 'Employee Code' && flagForEmployeeCode == false) {
                this.fieldNameArrayList.push({ Sequence: 0, tab: element.sheetName, tableName: element.fields[i].tableName, fieldName: element.fields[i].customLabelName, isMandatory: element.fields[i].isMandatory, isdropdownValue: element.fields[i].isdropdownValue, isChecked: false, merged: 0, counter: globalCounter++ });
                flagForEmployeeCode = true;
              }
              if (element.fields[i].customLabelName == 'Company Name' && flagForCompanyName == false) {
                this.fieldNameArrayList.push({ Sequence: 0, tab: element.sheetName, tableName: element.fields[i].tableName, fieldName: element.fields[i].customLabelName, isMandatory: element.fields[i].isMandatory, isdropdownValue: element.fields[i].isdropdownValue, isChecked: false, merged: 0, counter: globalCounter++ });
                flagForCompanyName = true;
              }
            } else {
              this.fieldNameArrayList.push({ Sequence: 0, tab: element.sheetName, tableName: element.fields[i].tableName, fieldName: element.fields[i].customLabelName, isMandatory: element.fields[i].isMandatory, isdropdownValue: element.fields[i].isdropdownValue, isChecked: false, merged: 0, counter: globalCounter++ });
            }
          }
        }
      });
      this.global = this.fieldNameArrayList;
      console.log(this.fieldNameArrayList);
    });
    of(this.getOrders()).subscribe((orders) => {
      this.ordersData = orders;
      this.addCheckboxes();
    });
  }

  getAllExcelTemplate() {
    this.summaryOfExcelTemplate = [];
    this.masterOfExcelTemplate = {};
    const companyId = 1;
    this.uploadeExcelHomeService.getAllExcelTemplate(companyId).subscribe((res) => {
      this.masterOfExcelTemplate = res.data.results;
      let i = 1;
      res.data.results.forEach((element) => {
        const obj = {
          SrNo: i++,
          companyId: element.companyId,
          createdBy: element.createdBy,
          excelFile: element.excelFile,
          isActive: element.isActive,
          remark: element.remark,
          templateDescription: element.templateDescription,
          templateMasterId: element.templateMasterId,
          templateName: element.templateName,
        };
        this.summaryOfExcelTemplate.push(obj);
      });
    });
  }

  onItemSelect(item: any, DeselectTab: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      DeselectTab,
      Object.assign({}, { class: 'gray modal-xl' }),
    );
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  DeselectTab(DeselectTab: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      DeselectTab,
      Object.assign({}, { class: 'gray modal-lg' }),
    );
  }

  DownloadCriteria(template2: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template2,
      Object.assign({}, { class: 'gray modal-md' }),
    );
  }
  displayPreview() {
    this.preview = true;
  }
  public addCheckboxes() {

    this.ordersData.forEach(() => this.ordersFormArray.push(new FormControl(false)));
  }
  get ordersFormArray() {
    return this.f.orders as FormArray;
  }
  get f() { return this.form.controls; }
  submit() {
    const selectedOrderIds = this.form.value.orders
      .map((checked, i) => checked ? this.ordersData[i].id : null)
      .filter((v) => v !== null);
    console.log(selectedOrderIds);
  }

  onChangeCheckBoxLeftMenu(checked: boolean, tabName: string) {
    this.tempMergeSelectedArrayList = [];
    console.log('in   onChangeCheckBoxLeftMenu checked function is dynamic to all', checked, 'tabName', tabName);

    let index1 = this.employeeMasterModuleList.findIndex(o => o.assignValue == tabName);

    for (let i = 0; i < this.employeeMasterModuleList.length; i++) {
      if (this.employeeMasterModuleList[i].assignValue == tabName) {
        this.tempMergeSelectedArrayList.push(this.employeeMasterModuleList[i]);

      }
    }

    let findGroupValue = this.employeeMasterModuleList.findIndex(o => o.assignValue == tabName);
    console.log('findGroupValue ', findGroupValue);

    if (findGroupValue == -1) {

      for (let i = 0; i < this.employeeMasterModuleList.length; i++) {
        if (this.employeeMasterModuleList[i].group > 0) {
          this.employeeMasterModuleList[i].disabled = true;
        }
        else if (this.employeeMasterModuleList[i].assignValue === '' && this.employeeMasterModuleList[i].group == 0) {
          this.employeeMasterModuleList[i].disabled = false;
          this.employeeMasterModuleList[i].checked = false;
        } else { }
      }

    } else {
      for (let i = 0; i < this.employeeMasterModuleList.length; i++) {
        if (this.employeeMasterModuleList[i].group === this.employeeMasterModuleList[findGroupValue].group || this.employeeMasterModuleList[i].group == 0) {
          this.employeeMasterModuleList[i].disabled = false;
          if (this.employeeMasterModuleList[i].group == 0) {
            this.employeeMasterModuleList[i].checked = false;
          }
        } else {
          this.employeeMasterModuleList[i].disabled = true;
        }
      }
    }


    if (checked == true) {

      // hide merge/unmerge button
      console.log('check this one', this.employeeMasterModuleList);

      for (let j = 0; j < this.employeeMasterModuleList.length; j++) {
        if (this.employeeMasterModuleList[j].group > 0) {
          if (this.employeeMasterModuleList[j].assignValue !== this.employeeMasterModuleList[j].title) {
            let findIndexOfOrdersData = this.ordersData.findIndex(o => o.name == this.employeeMasterModuleList[j].title);
            if (findIndexOfOrdersData !== -1) {
              this.ordersData[findIndexOfOrdersData].hide = true;
            }
          }
        } else {
          let findIndexOfOrdersData = this.ordersData.findIndex(o => o.name == this.employeeMasterModuleList[j].title);
          if (findIndexOfOrdersData !== -1) {
            this.ordersData[findIndexOfOrdersData].hide = false;
          }

        }

      }
      console.log('ordersData in true stmt ', this.ordersData);

      let indx = this.filterDropDownList.findIndex(o => o == tabName);
      if (indx == -1) {
        this.filterDropDownList.push(tabName);
        //  this.logicForHideNextButtonAndPreviousButton(tabName);
        ///  this.buttonIndex = this.filterDropDownList.length;
      }
      let counter = 1;
      for (let i = 0; i < this.fieldNameArrayList.length; i++) {
        if (this.fieldNameArrayList[i].tab === tabName) {
          this.sequenceArray.push({ disable: false, value: counter++ });
        }
      }
      // commented on 01-02-21
      this.onChangFilterDropDown(tabName);

      this.form.patchValue({
        filterTemplateDropDown: tabName
      });

    } else {


      // hide merge/unmerge button

      // for(let j=0; j<this.employeeMasterModuleList.length;j++){
      //   if(this.employeeMasterModuleList[j].group> 0){
      //     if(this.employeeMasterModuleList[j].assignValue !== this.employeeMasterModuleList[j].title ){


      //       let findIndexOfOrdersData = this.ordersData.findIndex(o=>o.name == this.employeeMasterModuleList[j].title);
      //       if(findIndexOfOrdersData !== -1){
      //         this.ordersData[findIndexOfOrdersData].hide = true;
      //       }

      //     }

      //   }
      // }

      for (let j = 0; j < this.employeeMasterModuleList.length; j++) {
        if (this.employeeMasterModuleList[j].group > 0) {
          if (this.employeeMasterModuleList[j].assignValue !== this.employeeMasterModuleList[j].title) {
            let findIndexOfOrdersData = this.ordersData.findIndex(o => o.name == this.employeeMasterModuleList[j].title);
            if (findIndexOfOrdersData !== -1) {
              this.ordersData[findIndexOfOrdersData].hide = true;
            }
          }
        } else {
          let findIndexOfOrdersData = this.ordersData.findIndex(o => o.name == this.employeeMasterModuleList[j].title);
          if (findIndexOfOrdersData !== -1) {
            this.ordersData[findIndexOfOrdersData].hide = false;
          }

        }

      }

      console.log('ordersData  in false stmt ', this.ordersData);

      console.log('before delete ', this.fieldNameArrayList);

      for (let i = this.checkBoxHtmlDataList.length - 1; i >= 0; --i) {
        if (this.checkBoxHtmlDataList[i].tab == tabName) {
          this.checkBoxHtmlDataList[i].isChecked = false;
          this.checkBoxHtmlDataList.splice(i, 1);
        }
      }
      for (let b = 0; b < this.fieldNameArrayList.length; b++) {
        if (this.fieldNameArrayList[b].tab == tabName) {
          this.fieldNameArrayList[b].isChecked = false;
          this.fieldNameArrayList[b].Sequence = 0;
          this.fieldNameArrayList.splice(b, 1);
        }
      }

      for (let k = this.selectedSummaryCheckBoxHtmlDataList.length - 1; k >= 0; --k) {
        if (this.selectedSummaryCheckBoxHtmlDataList[k].tab == tabName) {
          this.selectedSummaryCheckBoxHtmlDataList[k].isChecked = false;
          this.selectedSummaryCheckBoxHtmlDataList[k].Sequence = 0;
          this.selectedSummaryCheckBoxHtmlDataList.splice(k, 1);
        }
      }

      const index = this.filterDropDownList.findIndex((o) => o == tabName);
      this.filterDropDownList.splice(index, 1);
      if (index !== 0) {
        //this.leftSideMenuCheckBoxChnanged(true, this.filterDropDownList[index - 1]);
      }

      console.log('fieldNameArrayList', this.fieldNameArrayList);
      console.log('checkBoxHtmlDataList', this.checkBoxHtmlDataList);
      console.log('selectedSummaryCheckBoxHtmlDataList', this.selectedSummaryCheckBoxHtmlDataList);

    }
  }

  leftSideMenuCheckBoxChnanged(evt: boolean, leftSideMenuName: string) {
    console.log(evt, '', leftSideMenuName);
    if (leftSideMenuName == 'Select All') {
    } else {
      this.onChangeCheckBoxLeftMenu(evt, leftSideMenuName);
    }
    //this.buttonPrevious();
  }

  findMissingNumber(tabName: string) {
    let missedNumber = 0;
    for (let i = 0; i < this.selectedSummaryCheckBoxHtmlDataList.length; i++) {
      if (this.selectedSummaryCheckBoxHtmlDataList[i].tab == tabName) {
        this.selectedSummaryCheckBoxHtmlDataList.sort((a, b) => a.Sequence - b.Sequence);
      }
    }
    let flag = false;
    console.log('after sorting selectedSummaryCheckBoxHtmlDataList', this.selectedSummaryCheckBoxHtmlDataList);

    for (let k = 0; k < this.selectedSummaryCheckBoxHtmlDataList.length; k++) {
      if (this.selectedSummaryCheckBoxHtmlDataList[k].tab == tabName) {

        let p = k + 1;
        if (this.selectedSummaryCheckBoxHtmlDataList[k].Sequence == p.toString()) {
          console.log('p  ', p.toString());
        } else {
          if (flag == false) {
            missedNumber = p;
          }
        }

      }
    }
    console.log('missed number is  ', missedNumber);
  }



  //  incrementCounter(row: any, isChecked: boolean, tabName: string, tableName: string) {

  //   for (let i = 0; i < this.selectedSummaryCheckBoxHtmlDataList.length; i++) {
  //     if (this.selectedSummaryCheckBoxHtmlDataList[i].tab == tabName) {
  //       this.selectedSummaryCheckBoxHtmlDataList.sort((a, b) => Number(a.Sequence) - Number(b.Sequence));
  //     }
  //   }

  //   let largestElement = 0;
  //   let s = 0;
  //   if (row.Sequence === 0) {
  //     for (let k = 0; k < this.selectedSummaryCheckBoxHtmlDataList.length; k++) {
  //       s =0;

  //       if (this.selectedSummaryCheckBoxHtmlDataList[k].tab == tabName ) {
  //         s = 0;
  //         console.log(this.selectedSummaryCheckBoxHtmlDataList[k]);

  //         if (largestElement < Number(this.selectedSummaryCheckBoxHtmlDataList[k].Sequence)) {
  //           largestElement = Number(this.selectedSummaryCheckBoxHtmlDataList[k].Sequence);
  //         }
  //         if(this.selectedSummaryCheckBoxHtmlDataList[k].Sequence == s.toString()){

  //         } else {

  //            largestElement = Number(s);
  //            largestElement = Number(largestElement) ;
  //             const index = this.selectedSummaryCheckBoxHtmlDataList.findIndex((o) => o == row);
  //             this.selectedSummaryCheckBoxHtmlDataList[index].Sequence = s.toString();

  //         }
  //       }
  //     }
  //   }

  //   //console.log(JSON.stringify(this.selectedSummaryCheckBoxHtmlDataList));
  //  // let largestNo = this.findMissingNumber1(tabName, tableName);
  //   //console.log('largestNo ', largestNo);
  //   const index = this.selectedSummaryCheckBoxHtmlDataList.findIndex((o) => o == row);
  //   this.selectedSummaryCheckBoxHtmlDataList[index].Sequence = largestElement.toString();
  // }

  decrementCounter(row: any, isChecked: boolean, tabName: string) {


    const index = this.selectedSummaryCheckBoxHtmlDataList.findIndex((o) => o === row);
    this.selectedSummaryCheckBoxHtmlDataList[index].Sequence = 0;
    this.selectedSummaryCheckBoxHtmlDataList.splice(index, 1);


    const tableName = [...new Set(this.selectedSummaryCheckBoxHtmlDataList.map((item) => item.tableName))];
    console.log(tableName);

    let mInd = tableName.findIndex(o => o == row.tableName);
    console.log(mInd);


    for (let k = tableName.length; k > mInd; --k) {
      for (let j = 0; j < this.selectedSummaryCheckBoxHtmlDataList.length; j++) {
        if (this.selectedSummaryCheckBoxHtmlDataList[j].tab == row.tab && this.selectedSummaryCheckBoxHtmlDataList[j].tableName == tableName[k]) {
          let s = Number(this.selectedSummaryCheckBoxHtmlDataList[j].Sequence) + -1;
          this.selectedSummaryCheckBoxHtmlDataList[j].Sequence = s.toString();
        }
      }
    }
  }
  notMoreThanOneMandatoryFieldDecrementCounter(row: any, evt: boolean, tabName: string) {
    const index = this.selectedSummaryCheckBoxHtmlDataList.findIndex((o) => o === row);
    row.Sequence = 0;
    this.selectedSummaryCheckBoxHtmlDataList.splice(index, 1);
    let count = 1;
    this.selectedSummaryCheckBoxHtmlDataList.forEach((value, index) => {
      if (value.tab == tabName) {
        console.log('index', index);
        this.selectedSummaryCheckBoxHtmlDataList[index].Sequence = count++;
      }
    });
  }


  abc() {
    // let index = this.filterDropDownList.findIndex(o => o == this.form.get('filterTemplateDropDown').value);
    // console.log(index);
    // this.selectAllModel = !this.selectAllModel;
    // console.log(this.selectAllModel)
    // console.log('selectedSummaryCheckBoxHtmlDataList', this.selectedSummaryCheckBoxHtmlDataList);
    // console.log('filterTemplateDropDown', this.fieldNameArrayList);
    // this.checkThatAllItemsAreSelectedFromThatLeftMenu(this.form.get('filterTemplateDropDown').value);
    // this.findMissingNumber(this.form.get('filterTemplateDropDown').value);
    // this.getLargestNumberByTabWiseAndTableNameWise('Compliance Type', 'EmployeeComplianceInfo');

    let index;
    for (let i = 0; i < this.filterDropDownList.length; i++) {
      if (this.filterDropDownList[i] == this.form.get('filterTemplateDropDown').value) {
        index = i;
      }
    }


    this.alertService.sweetalertError(index);
  }

  onChangeSequenceCheckBox(seq, myselect, row) {
    console.log('row', row);
    console.log('seq', seq);
    console.log('myselect ', myselect);


    for (let i = 0; i < this.selectedSummaryCheckBoxHtmlDataList.length; i++) {
      if (this.selectedSummaryCheckBoxHtmlDataList[i].tab == row.tab) {
        this.selectedSummaryCheckBoxHtmlDataList.sort((a, b) => a.Sequence - b.Sequence);
      }
    }

    console.log('selectedSummaryCheckBoxHtmlDataList', this.selectedSummaryCheckBoxHtmlDataList);
    console.log('cond1 ', row.tab == this.form.get('filterTemplateDropDown').value);
    if (row.tab == this.form.get('filterTemplateDropDown').value) {
      const index = this.selectedSummaryCheckBoxHtmlDataList.findIndex((o) => o.fieldName == row.fieldName && o.tab == row.tab);
      if (index == -1) {
        row.checked = true;

        this.selectedSummaryCheckBoxHtmlDataList.push(row);
      } else {
        this.selectedSummaryCheckBoxHtmlDataList[index].Sequence = row.Sequence.toString();
      }


      let flag = false;
      for (let j = 0; j < this.selectedSummaryCheckBoxHtmlDataList.length; j++) {
        if (this.selectedSummaryCheckBoxHtmlDataList[j].tab == row.tab) {
          const k = j + 1;
          if (this.selectedSummaryCheckBoxHtmlDataList[j].Sequence == k.toString()) {
            console.log('c ', k.toString());
          } else {
            console.log('im in else', j);
            console.log(this.selectedSummaryCheckBoxHtmlDataList);
            //    this.selectedSummaryCheckBoxHtmlDataList.splice(j,1);
            flag = true;
            this.alertService.sweetalertError('Sequence are not properly allocated.');
            //this.selectedSummaryCheckBoxHtmlDataList[j].Sequence ='';
          }
        }
      }
      if (flag == true) {
        //  this.alertService.sweetalertWarning('Sequence are not properly allocated.');
      }
    }
    const index = this.sequenceArray.indexOf((p) => p == seq);
    if (index !== -1) {
      return false;
    }
    const delIndex = this.sequenceArray.findIndex((o) => o == seq);
  }

  summaryCheckBoxHtmlDataListSelectAll(evt: boolean) {
    this.onChangePreviewDropDown(this.form.get('filterTemplateDropDown').value);


    if (evt == true) {

      for (let q = 0; q < this.selectedSummaryCheckBoxHtmlDataList.length; q++) {
        if ((this.selectedSummaryCheckBoxHtmlDataList[q].tab == this.form.get('filterTemplateDropDown').value) && (this.selectedSummaryCheckBoxHtmlDataList[q].isMandatory == 0)) {
          this.selectedSummaryCheckBoxHtmlDataList[q].isChecked = false;
          this.selectedSummaryCheckBoxHtmlDataList[q].Sequence = '0';
          this.selectedSummaryCheckBoxHtmlDataList.splice(q, 1);
        }
      }

      for (let i = 0; i < this.fieldNameArrayList.length; i++) {
        if (this.fieldNameArrayList[i].tab == this.form.get('filterTemplateDropDown').value && this.fieldNameArrayList[i].isMandatory == 0) {
          this.fieldNameArrayList[i].isChecked = true;
          this.selectedSummaryCheckBoxHtmlDataList.push(this.fieldNameArrayList[i]);
          const m1 = this.selectedSummaryCheckBoxHtmlDataList.filter((o) => o.isMandatory == 1 && o.tab == this.fieldNameArrayList[i].tab);
          const tableName = [...new Set(m1.map((item) => item.tableName))];
          console.log(tableName);
          if (tableName.length > 1) {
            this.selectAllLogicForMoreThanOneMandatoryFieldInDifferntTables(this.fieldNameArrayList[i]);
          } else {
            // this.incrementCounter(this.fieldNameArrayList[i],true,this.fieldNameArrayList[i].tabName, this.fieldNameArrayList[i].tableName);
            // this.summaryCheckBoxHtmlDataListChanged(true, this.fieldNameArrayList[i]);
            this.getLargestNumberByTabWiseAndTableNameWise(this.fieldNameArrayList[i].tab, this.fieldNameArrayList[i].tableName, this.fieldNameArrayList[i]);
          }
        }
      }
    } else {
      console.log('add uncheck logic here tab is', this.form.get('filterTemplateDropDown').value);
      for (let i = this.selectedSummaryCheckBoxHtmlDataList.length - 1; i >= 0; i--) {
        if (this.selectedSummaryCheckBoxHtmlDataList[i].tab == this.form.get('filterTemplateDropDown').value && this.selectedSummaryCheckBoxHtmlDataList[i].isMandatory == 0) {
          this.selectedSummaryCheckBoxHtmlDataList[i].isChecked = false;
          this.selectedSummaryCheckBoxHtmlDataList[i].Sequence = '0';
          const m1 = this.selectedSummaryCheckBoxHtmlDataList.filter((o) => o.isMandatory == 1 && o.tab == this.fieldNameArrayList[i].tab);
          const tableName = [...new Set(m1.map((item) => item.tableName))];
          console.log(tableName);
          if (tableName.length > 1) {
            this.UnSelectAllLogicForMoreThanOneMandatoryFieldInDifferntTables(this.selectedSummaryCheckBoxHtmlDataList[i])
          } else {
            //  this.decrementCounter(this.selectedSummaryCheckBoxHtmlDataList[i],true,this.selectedSummaryCheckBoxHtmlDataList[i].tabName, this.selectedSummaryCheckBoxHtmlDataList[i].tableName);
            this.notMoreThanOneMandatoryFieldDecrementCounter(this.selectedSummaryCheckBoxHtmlDataList[i], false, this.selectedSummaryCheckBoxHtmlDataList[i].tabName);
          }
          // this.summaryCheckBoxHtmlDataListChanged(false, this.selectedSummaryCheckBoxHtmlDataList[i]);
        }
      }
      let ind = this.filterDropDownList.findIndex(o => o == this.form.get('filterTemplateDropDown').value);
      this.filterDropDownList.splice(ind, 1);
      this.filterDropDownList.push(this.form.get('filterTemplateDropDown').value);
    }

  }
  selectAllLogicForMoreThanOneMandatoryFieldInDifferntTables(row: any) {
    const m1 = this.selectedSummaryCheckBoxHtmlDataList.filter((o) => o.isMandatory == 1 && o.tab == row.tab);
    const tableName = [...new Set(m1.map((item) => item.tableName))];
    console.log(tableName);
    if (tableName.length > 1) {
      let largestElement = 0;
      let m = 0;
      for (let i = 0; i < tableName.length; i++) {
        largestElement = 0;

        for (let j = 0; j < this.selectedSummaryCheckBoxHtmlDataList.length; j++) {
          if (this.selectedSummaryCheckBoxHtmlDataList[j].tab == row.tab && this.selectedSummaryCheckBoxHtmlDataList[j].tableName == row.tableName) {
            m = m + 1;
            if (Number(this.selectedSummaryCheckBoxHtmlDataList[j].Sequence) > largestElement) {
              largestElement = Number(this.selectedSummaryCheckBoxHtmlDataList[j].Sequence);
            }
          }
        }
      }
      let s = Number(largestElement + 1);
      const index = this.selectedSummaryCheckBoxHtmlDataList.findIndex((o) => o == row);

      this.selectedSummaryCheckBoxHtmlDataList[index].Sequence = s.toString();

      let mInd = tableName.findIndex(o => o == row.tableName);
      console.log(mInd);


      for (let k = mInd + 1; k < tableName.length; k++) {
        for (let j = 0; j < this.selectedSummaryCheckBoxHtmlDataList.length; j++) {
          if (this.selectedSummaryCheckBoxHtmlDataList[j].tab == row.tab && this.selectedSummaryCheckBoxHtmlDataList[j].tableName == tableName[k]) {
            let s = Number(this.selectedSummaryCheckBoxHtmlDataList[j].Sequence) + 1;
            this.selectedSummaryCheckBoxHtmlDataList[j].Sequence = s.toString();
          }
        }
      }
    } else {
      console.log('table length is not greate than 1');
      //   this.incrementCounter(this.fieldNameArrayList[i], true, this.form.get('filterTemplateDropDown').value, this.fieldNameArrayList[i].tableName);
    }
  }

  UnSelectAllLogicForMoreThanOneMandatoryFieldInDifferntTables(row: any) {
    this.decrementCounter(row, false, row.tab);

  }

  summaryCheckBoxHtmlDataListChanged(evt: boolean, row: any) {
    this.onChangePreviewDropDown(this.form.get('filterTemplateDropDown').value);
    // this.getLargestNumberByTabWiseAndTableNameWise(row.tab, row.tableName);
    this.checkThatAllItemsAreSelectedFromThatLeftMenu(row.tab);

    const m1 = this.selectedSummaryCheckBoxHtmlDataList.filter((o) => o.isMandatory == 1 && o.tab == row.tab);
    const tableName = [...new Set(m1.map((item) => item.tableName))];
    console.log(tableName);

    let ind = this.filterDropDownList.findIndex(o => o == row.tab);

    if (evt == true) {
      row.isChecked = true;
      this.selectedSummaryCheckBoxHtmlDataList.push(row);

      // this.incrementCounter(row, evt, row.tab,row.tableName);
      if (row.isMandatory == 1) {
        this.getLargestNumberByTabWiseAndTableNameWise(row.tab, row.tableName, row);
      } else {
        //  this.getLargestNumberByTabWiseAndTableNameWise(row.tab, row.tableName, row);
        if (tableName.length > 1) {
          let largestElement = 0;
          for (let i = 0; i < tableName.length; i++) {
            largestElement = 0;
            for (let j = 0; j < this.selectedSummaryCheckBoxHtmlDataList.length; j++) {
              if (this.selectedSummaryCheckBoxHtmlDataList[j].tab == row.tab && this.selectedSummaryCheckBoxHtmlDataList[j].tableName == row.tableName) {
                if (Number(this.selectedSummaryCheckBoxHtmlDataList[j].Sequence) > largestElement) {
                  largestElement = Number(this.selectedSummaryCheckBoxHtmlDataList[j].Sequence);
                }
              }
            }
          }
          let s = Number(largestElement + 1);
          const index = this.selectedSummaryCheckBoxHtmlDataList.findIndex((o) => o == row);
          console.log('index', index);
          this.selectedSummaryCheckBoxHtmlDataList[index].Sequence = s.toString();

          let mInd = tableName.findIndex(o => o == row.tableName);
          console.log(mInd);
          for (let k = mInd + 1; k < tableName.length; k++) {
            for (let j = 0; j < this.selectedSummaryCheckBoxHtmlDataList.length; j++) {
              if (this.selectedSummaryCheckBoxHtmlDataList[j].tab == row.tab && this.selectedSummaryCheckBoxHtmlDataList[j].tableName == tableName[k]) {
                let s = Number(this.selectedSummaryCheckBoxHtmlDataList[j].Sequence) + 1;
                this.selectedSummaryCheckBoxHtmlDataList[j].Sequence = s.toString();
              }
            }
          }
        } else {
          //  this.getLargestNumberByTabWiseAndTableNameWise(row.tab, row.tableName, row);
          this.incrementCounter(row, evt, row.tab, row.tableName);
        }

      }

    } else {
      row.isChecked = false;
      if (tableName.length > 1) {
        this.decrementCounter(row, evt, row.tab);
      } else {
        this.notMoreThanOneMandatoryFieldDecrementCounter(row, evt, row.tab);

      }

    }

    this.counterPersonalInformation = 0;
    this.counterContactInformation = 0;
    this.counterIdentityInformation = 0;
    this.counterComplianceInformation = 0;
    this.counterEducationAndSkillInformation = 0;
    this.counterPreviousEmploymentInformation = 0;
    this.counterEmploymentInformation = 0;
    this.counterFamilyInformation = 0;
    this.counterPayrollInformation = 0;
    this.counterJobInformation = 0;
    for (let i = 0; i < this.selectedSummaryCheckBoxHtmlDataList.length; i++) {
      if (this.selectedSummaryCheckBoxHtmlDataList[i].tab === 'Personal Information') {
        this.counterPersonalInformation++;
      }
      if (this.selectedSummaryCheckBoxHtmlDataList[i].tab === 'Contact Information') {
        this.counterContactInformation++;
      }
      if (this.selectedSummaryCheckBoxHtmlDataList[i].tab === 'Identity Information') {
        this.counterIdentityInformation++;
      }
      if (this.selectedSummaryCheckBoxHtmlDataList[i].tab === 'Compliance Information') {
        this.counterComplianceInformation++;
      }
      if (this.selectedSummaryCheckBoxHtmlDataList[i].tab === 'Previous Employment  Information') {
        this.counterPreviousEmploymentInformation++;
      }
      if (this.selectedSummaryCheckBoxHtmlDataList[i].tab === 'Education & Skill Information') {
        this.counterEducationAndSkillInformation++;
      }
      if (this.selectedSummaryCheckBoxHtmlDataList[i].tab === 'Employment Information') {
        this.counterEmploymentInformation++;
      }
      if (this.selectedSummaryCheckBoxHtmlDataList[i].tab === 'Family Information') {
        this.counterFamilyInformation++;
      }
      if (this.selectedSummaryCheckBoxHtmlDataList[i].tab === 'Payroll Information') {
        this.counterPayrollInformation++;
      }
      if (this.selectedSummaryCheckBoxHtmlDataList[i].tab === 'Job Information') {
        this.counterJobInformation++;
      }
    }
  }

  getFilteredRecordByTableName(element, index, array, tableName) {
    return (element == tableName);
  }

  onChangFilterDropDown(leftSideMenuName: string) {
    this.onChangePreviewDropDown(leftSideMenuName);

    this.sequenceArray = [];
    this.checkBoxHtmlDataList1 = [];
    this.global.filter((o) => {
      if (o.tab === leftSideMenuName) {
        this.checkBoxHtmlDataList1.push(o);
      }
    });
    console.log('after clear checkBoxHtmlDataList1', this.checkBoxHtmlDataList1);
    this.fieldNameArrayList = [];
    this.fieldNameArrayList = this.checkBoxHtmlDataList1;
    console.log('after adding new fieldNameArrayList', this.fieldNameArrayList);

    let counter = 1;

    for (let i = 0; i < this.fieldNameArrayList.length; i++) {
      if (this.fieldNameArrayList[i].tab === leftSideMenuName) {
        if (this.fieldNameArrayList[i].isMandatory == 1) {
          this.summaryCheckBoxHtmlDataListChanged(true, this.fieldNameArrayList[i]);
        }
        this.sequenceArray.push({ disable: false, value: counter++ });
      }
    }
    if (this.filterDropDownList.length == 1 || this.filterDropDownList.length == 0) {
      this.hideNextButton = false;
      this.hidePreviousButton = false;
    }
    let index = this.filterDropDownList.findIndex(o => o == this.form.get('filterTemplateDropDown').value);
    if (index == this.filterDropDownList.length - 1) {
      this.hideNextButton = true;
    }
  }
  logicForHideNextButtonAndPreviousButton(tabName: string) {

    // let index = this.filterDropDownList.find((o, index) => index == tabName);
    //let index = this.filterDropDownList.findIndex((o) => o == tabName);
    // console.log('index is ',index +'filterdropdown list ',this.filterDropDownList)

    let index;
    for (let i = 0; i < this.filterDropDownList.length; i++) {
      if (this.filterDropDownList[i] == tabName) {
        index = i;
      }
    }

    this.alertService.sweetalertError(index);

    if (this.filterDropDownList.length > 1 && index !== -1) {
      // this.hideNextButton = true;

      if (index == this.filterDropDownList.length - 1) {
        this.hideNextButton = false;
        this.hidePreviousButton = true;
      }

      if (index == 0) {
        this.hidePreviousButton = true;
      } else {
        // this.hidePreviousButton = true;
      }
    }
    if (index == 1) {
      this.hidePreviousButton = true;
    }
  }


  test() {
    console.log('in test');
    for (let i = 0; i < this.summaryCheckBoxHtmlDataListChanged.length; i++) {
      if (this.summaryCheckBoxHtmlDataListChanged[i].tab === this.form.get('filterTemplateDropDown').value) {
        this.selectedSummaryCheckBoxHtmlDataList.sort((a, b) => a.Sequence - b.Sequence);
      }
    }
    console.log('array sorting done ', this.form.get('filterTemplateDropDown').value, '  ', this.selectedSummaryCheckBoxHtmlDataList);
  }

  onClickEmployeeMaster(evt: any) {
    console.log('in onClickEmployeeMaster', evt.target.checked);
    if (evt.target.checked == true) {
      this.checkedEmployeeMaster = true;
    } else {
      this.checkedEmployeeMaster = false;
    }
  }
  onClickPayrollMaster(evt: any) {
    console.log(evt.target.checked);
    if (evt.target.checked == true) {
      this.checkedPayrollMaster = true;
    } else {
      this.checkedPayrollMaster = false;
    }
  }
  onClickAssetMaster(evt: any) {
    console.log(evt.target.checked);
    if (evt.target.checked == true) {
      this.checkedAssetMaster = true;
    } else {
      this.checkedAssetMaster = false;
    }
  }
  onClickLeaveManagement(evt: any) {

    console.log(evt.target.checked);
    if (evt.target.checked == true) {
      this.checkedLeaveManangement = true;
    } else {
      this.checkedLeaveManangement = false;
    }
  }
  public saveAsBlob(data: any) {
    console.log(data);
    const pre = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + data;
    console.log(pre);
    // const linkSource = 'data:application/pdf;base64,' + data;

    FileSaver.saveAs(pre, 'nameFile' + '.xlsx');

  }
  downloadFile(i: number) {
    this.saveAsBlob(this.masterOfExcelTemplate[i].excelFile);
  }
  deleteTemplate(templateMasterId: number) {
    this.uploadeExcelHomeService.deleteExcelTemplate(templateMasterId).subscribe((res) => {
      console.log(res);
      this.alertService.sweetalertMasterSuccess(res.status.messsage, '');

    }, (error: any) => {
      this.alertService.sweetalertError(error.error.status.messsage);
    }, () => {
      this.getAllExcelTemplate();
    });

  }
  saveMaster() {
    if (this.isEditMode == false) {
      let a = this.isSequenceAreProperlyAllocatedTableNameWise();
      console.log(a);
      if (a == false) {

        this.sheetsize = 0;
        this.json = [];
        let temp = [];
        const sheet1 = [];
        let oneAllowEmpCode = 0;
        for (let q = 0; q < this.employeeMasterModuleList.length; q++) {
          if (this.employeeMasterModuleList[q].group > 0) {
            this.selectedSummaryCheckBoxHtmlDataList.forEach((element, index) => {
              if (this.employeeMasterModuleList[q].title == element.tab) {
                element.tab = this.employeeMasterModuleList[q].assignValue;
              }
            });
          }
        }
        console.log('After merge selectedSummaryCheckBoxHtmlDataList', this.selectedSummaryCheckBoxHtmlDataList);
        let counter = 0;

        const assignValueArray = [...new Set(this.employeeMasterModuleList.map((item) => item.assignValue))];
        console.log('assign value array', assignValueArray);

        let deleteEmpCode = false;
        for (let t = 0; t < assignValueArray.length; t++) {
          console.log('imp check this', assignValueArray[t]);
          if (assignValueArray[t].length !== 0) {
            for (let p = 0; p < this.selectedSummaryCheckBoxHtmlDataList.length; p++) {
              console.log(assignValueArray[t]);
              console.log(this.selectedSummaryCheckBoxHtmlDataList[p].tab)
              console.log('check this', this.selectedSummaryCheckBoxHtmlDataList[p].tab == assignValueArray[t]);
              if (this.selectedSummaryCheckBoxHtmlDataList[p].tab == assignValueArray[t]) {
                if (this.selectedSummaryCheckBoxHtmlDataList[p].fieldName == 'Employee Code') {
                  if (deleteEmpCode == true) {
                    this.selectedSummaryCheckBoxHtmlDataList.splice(p, 1);
                  }
                  deleteEmpCode = true;
                }
              }
            }
          }
        }
        /// below code is used for removing employee code in one sheet multiple times....

        const unique = [...new Set(this.selectedSummaryCheckBoxHtmlDataList.map((item) => item.tableName))];
        // console.log('unique', unique); // 2 found  Employee Personal Info and EmployeeMaster Table


        for (let i = 0; i < unique.length; i++) {

          const result = this.selectedSummaryCheckBoxHtmlDataList.filter((o) => o.tableName == unique[i]);
          console.log('result is', result);
          let fieldName = '';
          let seq = '';
          const set = new Set(result);
          set.forEach((o) => {
            if (fieldName.length == 0) {
              fieldName = o.fieldName;
              seq = o.Sequence;
              if (o.fieldName == 'Company Code') {
                fieldName = fieldName + ',' + 'Employee Code';
                seq = seq + ',' + o.Sequence;
              }
              if (this.addFromDateToDate(o.fieldName)) {
                fieldName = fieldName + ',' + 'From Date' + ',' + 'To Date';
              }
            } else {
              fieldName = fieldName + ',' + o.fieldName;
              seq = seq + ',' + o.Sequence;
              if (this.addFromDateToDate(o.fieldName)) {
                fieldName = fieldName + ',' + 'From Date' + ',' + 'To Date';
              }
            }
            let a = o.tab.split(" ");

            temp[i] = ({ sheetName:o.tab , tableName: unique[i], fields: fieldName, sequence: seq, mergeTabName: '' });
            //below line code used for concatenate Employee_Personal like that


            // temp[i] = ({ sheetName: 'Employee_' + a[0], tableName: unique[i], fields: fieldName, sequence: seq, mergeTabName: '' });
            //temp[i] = ({ sheetName: 'Employee_' + a[0], tableName: unique[i], fields: fieldName });
          });
        }
        console.log('temp printed ', temp);
        const sheetNameUnique = [...new Set(temp.map((item) => item.sheetName))];
        const tempData = {};
        //  let json = JSON.stringify(temp);
        this.json = temp;
        console.log('json is printed ', this.json);


        // const sheetNameUnique = [...new Set(JSON.stringify(temp).map((item) => item.sheetName))]; /// sheetName means tabName
        console.log(sheetNameUnique);
        let sheetArray = [];
        for (let x = 0; x < sheetNameUnique.length; x++) {
          let tempArr = [];
          for (let y = 0; y < this.json.length; y++) {
            if (sheetNameUnique[x] == this.json[y].sheetName) {
              const propertyName: string = 'sheet' + (x + 1);
              tempArr.push({
                sheetName: this.json[y].sheetName,
                tableName: this.json[y].tableName,
                fields: this.json[y].fields,
                sequence: this.json[y].sequence,
                mergeTabName: this.json[y].mergeTabName,
              });
            }
          }
          this.objectify('sheet' + (x + 1), tempArr);
        }

        for (let i = 0; i < temp.length; i++) {
          for (let j = 0; j < sheetNameUnique.length; j++) {
            if (temp[i].sheetName === sheetNameUnique) {
              // this.customizedResponse[j][sheetName]
            }
          }
        }
        sheet1.push(temp);
        let saveObject = {
          templateMasterId: 0,
          templateName: this.form.get('templateName').value,
          remark: this.form.get('remark').value,
          description: this.form.get('description').value,
          companyId: 1,
          module: 'EmpMaster',
          sheetSize: this.sheetsize.toString(),
        };
        let object3 = { ...saveObject, ...this.anantTemp }
        console.log('json obj for saving', JSON.stringify(object3));

        this.uploadeExcelHomeService.postExcelTemplateGeneration(object3).subscribe((res) => {
          if (res.data.results.length > 0) {
            this.alertService.sweetalertMasterSuccess(res.status.messsage, '');
            this.getAllExcelTemplate();
          } else {
            this.alertService.sweetalertWarning(res.status.messsage);
          }

        }, (error: any) => {
          this.alertService.sweetalertError(error.error.status.messsage);

        }, () => {

        });
      }



    } else {

    }
  }


  cancelView() {
    this.isEditMode = false;
    this.errorInSequence = false;


    this.filterDropDownList = [];

    // reset value merge unmerge left side menu

    this.personalInfoMergeTab = false;
    this.complianceInfoMergeTab = false;
    this.contactInfoMergeTab = false;
    this.identityInfoMergeTab = false;
    this.jobInfoMergeTab = false;
    this.previousEmployementMergeTab = false;
    this.eduAndSkillMergeTab = false;
    this.employmentInfoMergeTab = false;
    this.familyInfoMergeTab = false;
    this.payrollInfoMergeTab = false;


    this.isEditMode = false;
    this.preview = false;
    this.form.reset();
    this.selectedSummaryCheckBoxHtmlDataList = [];
    this.employeeMasterModuleList = [];
    this.fieldNameArrayList = [];
    this.sequenceArray = [];

    this.hideNextButton = false;
    this.hidePreviousButton = false;

    this.mergePersonalInformation = false;
    this.mergeComplianceInformation = false;
    this.mergeContactInformation = false;
    this.mergeIdentityInformation = false;
    this.mergeEducationAndSkillInformation = false;
    this.mergeEmploymentInformation = false;
    this.mergePreviousEmploymentInformation = false;
    this.mergePayrollInformation = false;
    this.mergeFamilyInformation = false;
    this.mergeJobInformation = false;



    this.global = [];
    this.counterPersonalInformation = 0;
    this.counterContactInformation = 0;
    this.counterIdentityInformation = 0;
    this.counterComplianceInformation = 0;
    this.counterEducationAndSkillInformation = 0;
    this.counterPreviousEmploymentInformation = 0;
    this.counterPayrollInformation = 0;
    this.counterFamilyInformation = 0;
    this.counterEmploymentInformation = 0;
    this.counterJobInformation = 0;




    this.getAllExcelTemplate();

    this.getExcelTableFields();
  }
  uploadExcelSheet() {
    console.log('in upload excel sheet', this.formData);
    if (this.formData == undefined) {
      this.alertService.sweetalertInfo('Please select excel sheet to be upload.');

    } else {
      this.uploadeExcelHomeService.postExcelUpload(this.formData).subscribe((res) => {

        this.alertService.sweetalertWarning(res.status.messsage);

      }, (error: any) => {
        this.alertService.sweetalertError(error.error.status.messsage);

      });
    }
  }
  readFile(event, uploadFile) {
    console.log('read file');
    const file = (event.target.files[0] as File);
    const reader = new FileReader();
    let selectedImageFileLogo3: any;

    if (event.target.files && event.target.files.length) {
      selectedImageFileLogo3 = event.target.files[0];
      const [file] = event.target.files;
      reader.readAsDataURL(file);

    }

    this.formData = new FormData();
    this.formData.append('file', event.target.files[0]);
    console.log('in upload excel sheet', this.formData);
    console.log('formData', this.formData);
  }

  // buttonNext() {
  //   let index = this.filterDropDownList.findIndex(o => o == this.form.get('filterTemplateDropDown').value);
  //   console.log('button next index is', index, 'filterDropDownList.length - 1 is ', this.filterDropDownList.length - 1);
  //   this.buttonIndex = index;

  //   if (index == 0) {
  //     this.hidePreviousButton = true;
  //     this.hideNextButton = false;
  //   }
  //   if (index == this.filterDropDownList.length - 1) {

  //     this.hidePreviousButton = true;
  //     this.hideNextButton = false;

  //   } else {
  //   //  this.onChangFilterDropDown(this.filterDropDownList[index + 1]);
  //   this.logicForHideNextButtonAndPreviousButton(this.filterDropDownList[index-1]);
  //     this.form.patchValue({
  //       filterTemplateDropDown: this.filterDropDownList[index + 1]
  //     });
  //   }


  // }
  buttonPrevious() {
    console.log('clicked on previous');
    let index = this.filterDropDownList.findIndex(o => o == this.form.get('filterTemplateDropDown').value);
    console.log('clicked on previous index', index);
    this.buttonIndex = index;
    if (this.filterDropDownList.length > 1) {







      // if (this.filterDropDownList.length > 1 && index !== -1) {
      //   // this.hideNextButton = true;

      //   if (index == this.filterDropDownList.length - 1) {
      //     this.hideNextButton = true;
      //     this.hidePreviousButton = true;
      //   }

      //   if (index == 0) {
      //     this.hidePreviousButton = true;
      //   } else {
      //     // this.hidePreviousButton = true;
      //   }
      // }
      // if (index == 1) {
      //   this.hidePreviousButton = true;
      // }




      if (index == (this.filterDropDownList.length - 1)) {
        this.hideNextButton = true;
        this.hidePreviousButton = false;
      }
      if (index == 1) {
        this.hideNextButton = true;
        this.hidePreviousButton = false;
        this.onChangFilterDropDown(this.filterDropDownList[index - 1]);
        //this.logicForHideNextButtonAndPreviousButton(this.filterDropDownList[index-1]);
        this.form.patchValue({
          filterTemplateDropDown: this.filterDropDownList[index - 1],
        });
      } else if (index !== 0) {
        this.hidePreviousButton = true;
        this.onChangFilterDropDown(this.filterDropDownList[index - 1]);
        // this.logicForHideNextButtonAndPreviousButton(this.filterDropDownList[index-1])
        this.form.patchValue({
          filterTemplateDropDown: this.filterDropDownList[index - 1],
        });
      }
    }

  }

  buttonNext() {
    let index = this.filterDropDownList.findIndex(o => o == this.form.get('filterTemplateDropDown').value);
    this.buttonIndex = index;

    if (this.filterDropDownList.length > 1) {


      if (index == 0) {
        this.hidePreviousButton = true;
      }

      if (index == this.filterDropDownList.length - 1) {
        // this.alertService.sweetalertWarning('You reached to last element');
        this.hidePreviousButton = true;
        this.hideNextButton = false;

      } else {
        this.hideNextButton = true;
        this.onChangFilterDropDown(this.filterDropDownList[index + 1]);
        // this.logicForHideNextButtonAndPreviousButton(this.filterDropDownList[index-1])
        this.form.patchValue({
          filterTemplateDropDown: this.filterDropDownList[index + 1]
        });
      }

    }
  }
  // buttonPrevious() {
  //   console.log('clicked on previous');
  //   let index = this.filterDropDownList.findIndex(o => o == this.form.get('filterTemplateDropDown').value);
  //   this.indexNextAndPrevious = index;
  //   console.log('clicked on previous index', index);

  //   // if (index == this.filterDropDownList.length - 1 && index !== 0) {
  //   //   this.alertService.sweetalertWarning('You reached to last element 11');
  //   //   // this.hidePreviousButton = true;
  //   //   this.hideNextButton = true;
  //   //   this.hidePreviousButton = false;
  //   // }
  //   // if (index == 0) {
  //   //   this.alertService.sweetalertWarning('You reached to first element 12');
  //   //   this.hideNextButton = true;
  //   //   this.hidePreviousButton = false;
  //   // } else {
  //     // this.hidePreviousButton = true;
  //     if(index >0){
  //       if(index ==1){
  //         this.hidePreviousButton = false;
  //       }
  //       console.log('value sending is', this.filterDropDownList[index - 1]);
  //       this.onChangFilterDropDown(this.filterDropDownList[index - 1]);
  //       this.form.patchValue({
  //         filterTemplateDropDown: this.filterDropDownList[index - 1],
  //       });
  //     } else {
  //       this.hidePreviousButton = false;
  //     }


  // }
  getOrders() {
    return this.leftSideBarMenuList;

  }
  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        // get a list of checkbox values (boolean)
        .map((control) => control.value)
        // total up the number of checked checkboxes
        .reduce((prev, next) => next ? prev + next : prev, 0);

      // if the total is not greater than the minimum, return the error message
      return totalSelected >= min ? null : { required: true };
    };

    return validator;
  }


  objectify(key, value) {
    this.sheetsize++;
    this.anantTemp[key] = value;

  }

  onmergeSelected(evt: boolean, emp: any) {

    console.log('evt', evt, '', emp);
    let index = this.tempMergeSelectedArrayList.findIndex(o => o.title == emp.title);
    if (evt == true) {
      emp.checked = true;
      if (index == -1) {
        this.tempMergeSelectedArrayList.push(emp);
      }
    } else {
      emp.checked = false;
      if (index == -1) {
        console.log(' not found');
      } else {
        this.tempMergeSelectedArrayList.splice(index, 1);
      }
    }
    // console.log('selectedMergedGroupList ', this.selectedMergedGroupList);
    console.log('tempMergeSelectedArrayList ', this.tempMergeSelectedArrayList);
    console.log('employeeMasterModuleList ', this.employeeMasterModuleList);

  }
  onClosePopUpWindow() {
    const indexOfEmpMasterModule = this.employeeMasterModuleList.findIndex(o => o.title == this.tempMergeSelectedArrayList[0].title);
    this.employeeMasterModuleList[indexOfEmpMasterModule].checked = false;
    this.employeeMasterModuleList[indexOfEmpMasterModule].disabled = false;
    this.tempMergeSelectedArrayList = [];
  }

  MergeTab(template3: TemplateRef<any>, checkboxNameToBeCheckedByDefault: string) {
    this.tempMergeSelectedArrayList = [];
    this.checkboxNameToBeCheckedByDefault = checkboxNameToBeCheckedByDefault;


    let index = this.employeeMasterModuleList.findIndex(o => o.title == this.checkboxNameToBeCheckedByDefault);
    this.employeeMasterModuleList[index].checked = true;
    this.employeeMasterModuleList[index].disabled = true;


    // this.tempMergeSelectedArrayList.push(this.employeeMasterModuleList[index]);
    // this.tempMergeSelectedArrayList[0].checked = true;
    // this.tempMergeSelectedArrayList[0].disabled = true;



    let assignValueArray = [...new Set(this.employeeMasterModuleList.map((item) => item.assignValue))];
    console.log('assignVAlue array', assignValueArray);
    let removeBlankspace = assignValueArray.findIndex(o => o == '');
    console.log('removeBlanck space index', removeBlankspace);
    assignValueArray.splice(removeBlankspace, 1);

    for (let k = 0; k < assignValueArray.length; k++) {
      for (let j = 0; j < this.employeeMasterModuleList.length; j++) {
        if (assignValueArray[k] == this.employeeMasterModuleList[j].assignValue) {
          console.log('added into temp', this.employeeMasterModuleList[k]);
          this.tempMergeSelectedArrayList.push(this.employeeMasterModuleList[j]);
        }
      }
    }
    let findGroup = this.employeeMasterModuleList.findIndex(o => o.assignValue == this.checkboxNameToBeCheckedByDefault);
    if (findGroup !== -1) {
      let group = this.employeeMasterModuleList[findGroup].assignValue;
      console.log('group  ', group);

      for (let i = 0; i < this.employeeMasterModuleList.length; i++) {
        if (this.employeeMasterModuleList[i].assignValue == group) {
          if (this.employeeMasterModuleList[i].assignValue !== this.checkboxNameToBeCheckedByDefault) {
            this.tempMergeSelectedArrayList.push(this.employeeMasterModuleList[i]);
          }
        } else if (this.employeeMasterModuleList[i].group !== 0) {
          this.employeeMasterModuleList[i].disabled = true;
        }
      }
    }

    for (let i = 0; i < this.employeeMasterModuleList.length; i++) {
      if (this.employeeMasterModuleList[i].group == 0 && this.employeeMasterModuleList[i].title !== this.checkboxNameToBeCheckedByDefault) {
        this.employeeMasterModuleList[i].checked = false;
        this.employeeMasterModuleList[i].disabled = false;
      }

      if (this.employeeMasterModuleList[i].assignValue == this.checkboxNameToBeCheckedByDefault) {
        this.employeeMasterModuleList[i].disabled = false;
        //this.employeeMasterModuleList[i].checked = false;
      }
      if (this.employeeMasterModuleList[i].title == this.checkboxNameToBeCheckedByDefault) {
        this.employeeMasterModuleList[i].checked = true;
        this.employeeMasterModuleList[i].disabled = true;
        if (this.employeeMasterModuleList[i].assignValue !== this.checkboxNameToBeCheckedByDefault) {
          this.tempMergeSelectedArrayList.push(this.employeeMasterModuleList[i]);
        }
      } else {

      }
    }
    this.modalRef = this.modalService.show(
      template3,
      Object.assign({}, { class: 'gray modal-md' }),
    );
  }

  saveMergeAndUnmerge() {
    const selectedOrderIds = this.form.value.orders
      .map((checked, i) => checked ? this.ordersData[i].id : null)
      .filter((v) => v !== null);
    console.log('selectedOrderIds', selectedOrderIds);
    console.log(this.ordersData);




    if (this.tempMergeSelectedArrayList.length == 1) {

      console.log('this.tempMergeSelectedArrayList.length ==1)', this.tempMergeSelectedArrayList.length)
      let j = this.employeeMasterModuleList.findIndex(o => o.title == this.checkboxNameToBeCheckedByDefault);
      this.employeeMasterModuleList[j].group = 0;
      this.employeeMasterModuleList[j].assignValue = '';
      this.employeeMasterModuleList[j].checked = false;

      this.tempMergeSelectedArrayList[0].assignValue = '';
      this.tempMergeSelectedArrayList[0].group = 0;
      this.tempMergeSelectedArrayList[0].checked = false;

      let idx = this.ordersData.findIndex(o => o.name == this.checkboxNameToBeCheckedByDefault);
      this.ordersData[idx].disable = false;
    }

    console.log('tempMergeSelectedArrayList', this.tempMergeSelectedArrayList);
    console.log('tempMergeSelectedArrayList length', this.tempMergeSelectedArrayList.length);
    console.log(this.ordersData);


    let largestElement: number = 0;
    const mergedIndex = this.employeeMasterModuleList.findIndex(o => o.assignValue == this.checkboxNameToBeCheckedByDefault);
    console.log('merged index is ', mergedIndex);
    if (mergedIndex == -1) {
      for (let k = 0; k < this.employeeMasterModuleList.length; k++) {
        if (largestElement < Number(this.employeeMasterModuleList[k].group)) {
          largestElement = Number(this.employeeMasterModuleList[k].group);
        }
      }
      largestElement = largestElement + 1;
      console.log('largese', largestElement);
    } else {
      //if (this.tempMergeSelectedArrayList[0].checked == true) {
      console.log('found merged index', mergedIndex);
      largestElement = this.employeeMasterModuleList[mergedIndex].group;

    }
    console.log('largest element in a group is ', largestElement);


    for (let j = 0; j < this.employeeMasterModuleList.length; j++) {
      if (this.employeeMasterModuleList[j].checked == false) {
        if (this.employeeMasterModuleList[j].assignValue == this.checkboxNameToBeCheckedByDefault) {
          this.employeeMasterModuleList[j].group = 0;
          this.employeeMasterModuleList[j].assignValue = '';
          let idx = this.ordersData.findIndex(o => o.name == this.employeeMasterModuleList[j].title);
          this.ordersData[idx].disable = false;
          this.ordersData[idx].group = '';

        }
      }


      for (let a = 0; a < this.tempMergeSelectedArrayList.length; a++) {

        let ind = this.employeeMasterModuleList.findIndex(o => o.title == this.tempMergeSelectedArrayList[a].title);
        if (ind == -1) {
          console.log('index not found');

        } else {
          if (this.tempMergeSelectedArrayList[a].group == 0) {
            this.employeeMasterModuleList[ind].group = largestElement;
            this.employeeMasterModuleList[ind].assignValue = this.checkboxNameToBeCheckedByDefault;
            let idx = this.ordersData.findIndex(o => o.name == this.tempMergeSelectedArrayList[a].title);
            this.ordersData[idx].disable = true;
          }
        }
      }
    }



    let group = 0;
    let countOfClose = 0;
    const mergedIndex1 = this.employeeMasterModuleList.findIndex(o => o.assignValue == this.checkboxNameToBeCheckedByDefault);
    if (mergedIndex1 !== -1) {
      group = this.employeeMasterModuleList[mergedIndex1].group;

      countOfClose = this.employeeMasterModuleList.filter(x => {
        return x.group == group
      }).length


      // logic for uncheck one disable button


      console.log('group is', group);
      console.log('count of close ', countOfClose);



      if (countOfClose == 1) {

        const mergedIndex = this.employeeMasterModuleList.findIndex(o => o.assignValue == this.checkboxNameToBeCheckedByDefault);


        this.employeeMasterModuleList[mergedIndex].group = 0;
        this.employeeMasterModuleList[mergedIndex].assignValue = '';
        let idx = this.ordersData.findIndex(o => o.name == this.checkboxNameToBeCheckedByDefault);
        this.ordersData[idx].disable = false;


        this.leftSideMenuCheckBoxChnanged(false, this.checkboxNameToBeCheckedByDefault);



      }
    }



    console.log('len is ', countOfClose);




    for (let t = 0; t < this.employeeMasterModuleList.length; t++) {
      if (this.checkboxNameToBeCheckedByDefault == this.employeeMasterModuleList[t].assignValue) {
        if (this.employeeMasterModuleList[t].checked == true) {
          this.leftSideMenuCheckBoxChnanged(true, this.employeeMasterModuleList[t].title);
        } else {
          this.leftSideMenuCheckBoxChnanged(false, this.employeeMasterModuleList[t].title);
        }

      }
    }





    // logic for hiding Merge/ Tab field button




    this.tempMergeSelectedArrayList = [];
    this.selectedMergedGroupList = [];

    console.log('employeeMasterModuleList', this.employeeMasterModuleList);
  }
  // below code is used for deselect of all checkbox field
  // uncheckAll() {
  //   this.checkboxes.forEach((element) => {
  //     element.nativeElement.checked = false;
  //   });
  // }

  findMissingNumber1(tabName: string, tableName: string): number {

    for (let i = 0; i < this.selectedSummaryCheckBoxHtmlDataList.length; i++) {
      if (this.selectedSummaryCheckBoxHtmlDataList[i].tab == tabName) {
        this.selectedSummaryCheckBoxHtmlDataList.sort((a, b) => Number(a.Sequence) - Number(b.Sequence));
      }
    }

    console.log('after sorting selectedSummaryCheckBoxHtmlDataList', this.selectedSummaryCheckBoxHtmlDataList);

    let noReturn = 0;
    let missNo = 0;
    let flag = false;
    let p = 0;
    for (let k = 0; k < this.selectedSummaryCheckBoxHtmlDataList.length; k++) {
      if ((this.selectedSummaryCheckBoxHtmlDataList[k].tab == tabName) && (this.selectedSummaryCheckBoxHtmlDataList[k].tableName == tableName)) {
        p = k + 1;
        console.log('p  ', p.toString());
        missNo = p;
        console.log('miss no', missNo);


      } else {
        this.alertService.sweetalertError('Missing sequence no. is--- ' + p);
        if (flag == false) {
          if (p !== this.selectedSummaryCheckBoxHtmlDataList[k].Sequence && (this.selectedSummaryCheckBoxHtmlDataList[k].tab == tabName) && (this.selectedSummaryCheckBoxHtmlDataList[k].tableName == tableName)) {
            noReturn = p;
            this.alertService.sweetalertError('Missing sequence no. is ' + p);
            flag = true;
          }
        }
      }
    }
    return p;
  }

  addFromDateToDate(fieldName): boolean {
    if (fieldName == 'Establishment'
      || fieldName == 'Project'
      || fieldName == 'Sub Location'
      || fieldName == 'Work Location'
      || fieldName == 'Business Area'
      || fieldName == 'Sub Area'
      || fieldName == 'Strategic Business Unit'
      || fieldName == 'Division'
      || fieldName == 'Department'
      || fieldName == 'Sub Department'
      || fieldName == 'Cost Center'
      || fieldName == 'Sub-Cost Center'
      || fieldName == 'Profit Center'
      || fieldName == 'Employee Type'
      || fieldName == 'Employee Status'
      || fieldName == 'Employee Tax Category'
      || fieldName == 'Grade'
      || fieldName == 'Designation 1'
      || fieldName == 'Designation 2'
      || fieldName == 'Reporting To'
      || fieldName == 'Billable'
      || fieldName == 'On - Bench') {
      return true;
    } else {
      return false;
    }
  }
  checkThatAllItemsAreSelectedFromThatLeftMenu(tabName: string) {
    this.selectAllModel = false;
    let counterForfalse = 1;
    for (let j = 0; j < this.fieldNameArrayList.length; j++) {
      if (this.fieldNameArrayList[j].isChecked == false && this.fieldNameArrayList[j].tab == tabName) {
        counterForfalse++;
      }
    }
    if (counterForfalse == 1) {
      this.selectAllModel = true
    }
  }


  incrementCounter(row: any, isChecked: boolean, tabName: string, tableName: string) {

    console.log('check this', row);
    let largestElement = 0;
    if (row.Sequence == 0) {
      for (let k = 0; k < this.selectedSummaryCheckBoxHtmlDataList.length; k++) {
        if (this.selectedSummaryCheckBoxHtmlDataList[k].tab == tabName) {
          if (largestElement < Number(this.selectedSummaryCheckBoxHtmlDataList[k].Sequence)) {
            largestElement = Number(this.selectedSummaryCheckBoxHtmlDataList[k].Sequence);
          }
        }
      }
      largestElement = Number(largestElement) + 1;
      console.log(' this.selectedSummaryCheckBoxHtmlDataList', this.selectedSummaryCheckBoxHtmlDataList);
      const index = this.selectedSummaryCheckBoxHtmlDataList.findIndex((o) => o == row);
      console.log('index  ', index);
      this.selectedSummaryCheckBoxHtmlDataList[index].Sequence = largestElement.toString();
    }

  }

  getLargestNumberByTabWiseAndTableNameWise(tabName: string, tableName: string, row?: any) {


    console.log('TabName', tabName, ' Table Name', tableName);
    let largest = 0;
    let counter = 0;
    if (row.Sequence == 0) {
      for (let i = 0; i < this.selectedSummaryCheckBoxHtmlDataList.length; i++) {

        if (this.selectedSummaryCheckBoxHtmlDataList[i].tab == tabName) {
          if (Number(this.selectedSummaryCheckBoxHtmlDataList[i].Sequence) > largest) {
            largest = Number(this.selectedSummaryCheckBoxHtmlDataList[i].Sequence);
          }
        }
      }

      let s = Number(largest + 1);
      const index = this.selectedSummaryCheckBoxHtmlDataList.findIndex((o) => o == row);
      this.selectedSummaryCheckBoxHtmlDataList[index].Sequence = s.toString();
      this.selectedSummaryCheckBoxHtmlDataList[index].merge = counter;

      console.log('found largest ', largest);
      console.log(this.selectedSummaryCheckBoxHtmlDataList);

    }


  }

  isSequenceAreProperlyAllocatedTableNameWise(): boolean {




    console.log(this.selectedSummaryCheckBoxHtmlDataList);
    const tableName = [...new Set(this.selectedSummaryCheckBoxHtmlDataList.map((item) => item.tableName))];
    console.log(tableName);

    for (let k = 0; k < tableName.length; k++) {
      let greaterNo = 0
      let flag = false;
      for (let i = 0; i < this.selectedSummaryCheckBoxHtmlDataList.length; i++) {
        if (this.selectedSummaryCheckBoxHtmlDataList[i].tableName == tableName[k]) {
          if (flag == false) {
            greaterNo = Number(this.selectedSummaryCheckBoxHtmlDataList[i].Sequence);
            flag = true;
          }
          if (flag == true) {
            let a = this.selectedSummaryCheckBoxHtmlDataList[i].Sequence.includes(greaterNo++);
            console.log(a);
            if (a == false) {
              this.errorInSequence = true;
              this.alertService.sweetalertError('You have added wrong sequence at table' + tableName[k] + 'Sequence is ' + this.selectedSummaryCheckBoxHtmlDataList[i].Sequence);

            }
          }



          // console.log( Number(this.selectedSummaryCheckBoxHtmlDataList[i].Sequence),' ',tableName[k] );


        }
      }
      return this.errorInSequence;
    }
    console.log(this.selectedSummaryCheckBoxHtmlDataList);


    // const x =this.selectedSummaryCheckBoxHtmlDataList.findIndex(function (el) {
    //   return el.tableName == tableName[i];






  }

  removeOrdersFromFormArray(index: any) {
    (<FormArray>this.form.get('orders')).removeAt(index);
  }
  editMaster(templateMasterId: number) {
    this.sheetDataArray = [];
    this.isEditMode = true;
    console.log(templateMasterId);

    this.templateMasterId = templateMasterId;
    this.uploadeExcelHomeService.getExcelTemplateById(templateMasterId).subscribe((res) => {
      console.log(res);
      this.masterOfExcelTemplate = res.data.results;
      let i = 1;
      res.data.results.forEach((element) => {
        console.log('element is ', element);
        //  const tempObj1 = {
        //   templateMasterId: element.templateMasterId,
        //   templateName: element.templateName,
        //   module: element.module,
        //   description: element.description,
        //   companyId: element.companyId,
        //   remark: element.remark,

        // }
        for (let i = 0; i < element.sheetData.length; i++) {
          console.log(element.sheetData[i]);
          const tempObj = {
            tabName: element.sheetData[i].tabName,
            tableName: element.sheetData[i].tableName,
            fields: element.sheetData[i].fields,
            sequence: element.sheetData[i].sequence,
            mergeTabName: element.sheetData[i].mergeTabName,
          }
          this.sheetDataArray.push(tempObj);


        }
        // const obj = {
        //   SrNo: i++,
        //   companyId: element.companyId,
        //   createdBy: element.createdBy,
        //   excelFile: element.excelFile,
        //   isActive: element.isActive,
        //   remark: element.remark,
        //   templateDescription: element.templateDescription,
        //   templateMasterId: element.templateMasterId,
        //   templateName: element.templateName,
        // };

      });
    }, (error) => {
      console.log(error);
    }, () => {

      for (let i = 0; i < this.sheetDataArray.length; i++) {
        //if(i ==0){
        // don't do anything
        // } else {
        let tableName = this.sheetDataArray[i].tableName;
        let tabName = this.sheetDataArray[i].tabName;;
        var nameArr = this.sheetDataArray[i].fields.split(',');
        console.log('nameArr',nameArr);
        for (let k = 0; k < nameArr.length; k++) {
          this.findIndexByCalling(tabName, tableName, nameArr[k]);

        }
      }




      // assign below templatemasterid
      console.log('sheetDataArray', this.sheetDataArray);
    });

    /**
* // TODO: Calling function by sending fieldName, tableName
*/



    for (let i = 0; i < this.sheetDataArray.length; i++) {
      //if(i ==0){
      // don't do anything
      // } else {
      let tableName = this.sheetDataArray[i].tableName;
      let tabName = this.sheetDataArray[i].tabName;
      var nameArr = this.sheetDataArray[i].fields.split(',');
      console.log('nameArr',nameArr);
      for (let k = 0; k < nameArr.length; k++) {
        this.findIndexByCalling(tabName, tableName, nameArr[k]);

      }
    }




    // assign below templatemasterid
    console.log('sheetDataArray', this.sheetDataArray);

  }
  findIndexByCalling(tabName: string, tableName: string, fieldName: string) {
    console.log('tab name is  ', tabName);
    console.log('table name is  ', tableName);
    console.log('fieldName is  ', fieldName);
    console.log('fieldNameArrayList', this.fieldNameArrayList);
    let index = this.fieldNameArrayList.findIndex(o => o.fieldName == fieldName &&  o.tab==tabName && o.tableName == tableName);

   // this.fieldNameArrayList.push({ Sequence: 0, tab: element.sheetName, tableName: element.fields[i].tableName, fieldName: element.fields[i].customLabelName, isMandatory: element.fields[i].isMandatory, isdropdownValue: element.fields[i].isdropdownValue, isChecked: false, merged: 0, counter: globalCounter++ });


    console.log(index);
    console.log( this.fieldNameArrayList[index]);



    console.log('index found', index);
    if(index !== -1){
      this.summaryCheckBoxHtmlDataListChanged(true, this.fieldNameArrayList[index]);
    }



    console.log(this.selectedSummaryCheckBoxHtmlDataList);

  }
  onChangePreviewDropDown(evt: string) {
    this.previewTableData = [];

    for (let i = 0; i < this.selectedSummaryCheckBoxHtmlDataList.length; i++) {
      if (this.selectedSummaryCheckBoxHtmlDataList[i].tab == this.form.get('filterTemplateDropDown').value) {
        this.previewTableData.push(this.selectedSummaryCheckBoxHtmlDataList[i]);
      }
    }

  }
}

