import { Title } from '@angular/platform-browser';
import { Component, OnInit, TemplateRef } from '@angular/core';
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
@Component({
  selector: 'app-uploadexcelhome',
  templateUrl: './uploadexcelhome.component.html',
  styleUrls: ['./uploadexcelhome.component.scss'],
})
export class UploadexcelhomeComponent implements OnInit {
  public anantTemp = {};
  public sheetsize: number = 0;
  public json: any;
  public tempMergeSelectedArrayList = [];
  public formData: any;
  public fileInput: any;
  public selectedMergedGroupList = [];
  public employeeMasterModuleList = [
    { checked: false, group: 0, disabled: false, assignValue: '', id: '1', title: 'Personal Information' },
    { checked: false, group: 0, disabled: false, assignValue: '', id: '2', title: 'Compliance Information' },
    { checked: false, group: 0, disabled: false, assignValue: '', id: '3', title: 'Contact Information' },
    { checked: false, group: 0, disabled: false, assignValue: '', id: '4', title: 'Identity Information' },
    { checked: false, group: 0, disabled: false, assignValue: '', id: '5', title: 'Education & Skill Information' },
    { checked: false, group: 0, disabled: false, assignValue: '', id: '6', title: 'Employment Information' },
    { checked: false, group: 0, disabled: false, assignValue: '', id: '7', title: 'Previous Employment  Information' },
    { checked: false, group: 0, disabled: false, assignValue: '', id: '8', title: 'Payroll Information' },
    { checked: false, group: 0, disabled: false, assignValue: '', id: '9', title: 'Family Information' },

  ];
  public mergeArrayList: [
    { leftSideMenuList: 'Personal Information', values: [] },
    { leftSideMenuList: 'Compliance Information', values: [] },
    { leftSideMenuList: 'Identity Information', values: [] },
    { leftSideMenuList: 'Contact Information', values: [] },
    { leftSideMenuList: 'Previous Employment Information', values: [] },
    { leftSideMenuList: 'Education & Skill Information', values: [] },
    { leftSideMenuList: 'Employment Information', values: [] },
    { leftSideMenuList: 'Payroll Information', values: [] },
    { leftSideMenuList: 'Family Information', values: [] },];

  public mergePersonalInformation = false;
  public mergeComplianceInformation = false;
  public mergeContactInformation = false;
  public mergeIdentityInformation = false;
  public mergeEducationAndSkillInformation = false;
  public mergeEmploymentInformation = false;
  public mergePreviousEmploymentInformation = false;
  public mergePayrollInformation = false;
  public mergeFamilyInformation = false;
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
  public sequenceArray = [];
  public sequenceSelect = true;
  public isEditMode = false;
  public modalRef: BsModalRef;
  public form: any = FormGroup;
  public checkedEmployeeMaster = true;
  public checkedPayrollMaster = false;
  public checkedLeaveManangement = false;
  public checkedAssetMaster = false;
  public ordersData = [
    { id: 100, name: 'order 1' },
    { id: 200, name: 'order 2' },
    { id: 300, name: 'order 3' },
    { id: 400, name: 'order 4' },
  ];
  public arrayOfObj = [];
  public filterDropDownList = [];
  public selectedSummaryCheckBoxHtmlDataList = [];
  public summaryOfExcelTemplate = [];
  public masterOfExcelTemplate: any;
  public customizedResponse: Array<any> = [];

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
      orders: new FormArray([], this.minSelectedCheckboxes(1)),
      templateName: new FormControl('', Validators.required),
      description: new FormControl(''),
      remark: new FormControl(''),
      orderCheckbox: new FormControl(''),
    });
  }

  public ngOnInit(): void {



    this.getAllExcelTemplate();
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
    this.selectedItems = [
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'label',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true,
    };

    this.uploadeExcelHomeService.getExcelTableFields().subscribe((res) => {
      this.masterGetExcelTableFieldsResponse = res;
      //console.log(res);
      let counter = 0;
      res.data.results.forEach((element) => {
        this.leftSideBarMenuList.push({ id: counter++, name: element.sheetName });
        for (let i = 0; i < element.fields.length; i++) {
          this.fieldNameArrayList.push({ Sequence: 0, tab: element.sheetName, tableName: element.fields[i].tableName, fieldName: element.fields[i].fieldName, isMandatory: element.fields[i].isMandatory, isdropdownValue: element.fields[i].isdropdownValue, isChecked: false, merged: 0 });
          //  this.sequenceArray[i] = (i + 1);
          // this.sequenceArray.push({value: i, disable: false});
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

  onChangeSequenceCheckBox(seq, myselect, id) {
    console.log('id', id);
    // console.log('onChangeSequenceCheckBox()');
    // console.log(seq);
    // console.log(myselect);

    this.selectedPersonalInformationFields.sort((a, b) => a.Sequence - b.Sequence);
    console.log('array sorting done', this.selectedPersonalInformationFields);

    if (id.tab === 'Personal Information') {
      const index = this.selectedPersonalInformationFields.findIndex((o) => o.fieldName === id.fieldName);
      if (index == -1) {
        this.selectedPersonalInformationFields.push(id);
        this.selectedCounterPersonalInformationList.push(myselect);
      } else {
        this.selectedPersonalInformationFields[index].Sequence = id.Sequence.toString();
      }
      let flag = false;
      for (let j = 0; j < this.selectedPersonalInformationFields.length; j++) {
        const k = j + 1;
        if (this.selectedPersonalInformationFields[j].Sequence === k.toString()) {
        } else {
          flag = true;
        }
      }
      if (flag == true) {
        this.alertService.sweetalertError('Sequence are not properly allocated.');
      }
    }
    // this.selectedCounterList.push(myselect);
    //  console.log('selectedCounterList ',this.selectedCounterList);
    const index = this.sequenceArray.indexOf((p) => p == seq);
    if (index !== -1) {
      return false;
    }
    const delIndex = this.sequenceArray.findIndex((o) => o == seq);

    // this.sequenceArrayHide.splice(delIndex, 1);

  }
  onClickSequenceCheckBox(s, summary) {
    console.log('on change onChangeSequenceCheckBox');
    console.log(s);
    console.log(summary);
  }
  getAllExcelTemplate() {
    this.summaryOfExcelTemplate = [];
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
  MergeTab(template3: TemplateRef<any>, checkboxNameToBeCheckedByDefault: string) {
    console.log('checked checkbox is', checkboxNameToBeCheckedByDefault);
    this.onChangeCheckBoxLeftMenu(true, checkboxNameToBeCheckedByDefault);
    if (checkboxNameToBeCheckedByDefault == 'Personal Information') {

      let index = this.employeeMasterModuleList.findIndex(o => o.title == 'Personal Information');
      this.selectedMergedGroupList.push(this.employeeMasterModuleList[index]);

      let anotherIndex = this.selectedMergedGroupList.findIndex(p => p.title == 'Personal Information');
      this.selectedMergedGroupList[anotherIndex].checked = true;
      this.selectedMergedGroupList[anotherIndex].disabled = true;
    }

    if (checkboxNameToBeCheckedByDefault == 'Compliance Information') {
      let index = this.employeeMasterModuleList.findIndex(o => o.title == 'Compliance Information');
      this.selectedMergedGroupList.push(this.employeeMasterModuleList[index]);

      let anotherIndex = this.selectedMergedGroupList.findIndex(p => p.title == 'Compliance Information');
      this.selectedMergedGroupList[anotherIndex].checked = true;
      this.selectedMergedGroupList[anotherIndex].disabled = true;
    }

    if (checkboxNameToBeCheckedByDefault == 'Contact Information') {
      let index = this.employeeMasterModuleList.findIndex(o => o.title == 'Contact Information');
      this.selectedMergedGroupList.push(this.employeeMasterModuleList[index]);

      let anotherIndex = this.selectedMergedGroupList.findIndex(p => p.title == 'Contact Information');
      this.selectedMergedGroupList[anotherIndex].checked = true;
      this.selectedMergedGroupList[anotherIndex].disabled = true;

    }

    if (checkboxNameToBeCheckedByDefault == 'Identity Information') {
      let index = this.employeeMasterModuleList.findIndex(o => o.title == 'Identity Information');
      this.selectedMergedGroupList.push(this.employeeMasterModuleList[index]);

      let anotherIndex = this.selectedMergedGroupList.findIndex(p => p.title == 'Identity Information');
      this.selectedMergedGroupList[anotherIndex].checked = true;
      this.selectedMergedGroupList[anotherIndex].disabled = true;

    }

    if (checkboxNameToBeCheckedByDefault == 'Education & Skill Information') {
      let index = this.employeeMasterModuleList.findIndex(o => o.title == 'Education & Skill Information');
      this.selectedMergedGroupList.push(this.employeeMasterModuleList[index]);

      let anotherIndex = this.selectedMergedGroupList.findIndex(p => p.title == 'Education & Skill Information');
      this.selectedMergedGroupList[anotherIndex].checked = true;
      this.selectedMergedGroupList[anotherIndex].disabled = true;

    }

    if (checkboxNameToBeCheckedByDefault == 'Employment Information') {
      let index = this.employeeMasterModuleList.findIndex(o => o.title == 'Employment Information');
      this.selectedMergedGroupList.push(this.employeeMasterModuleList[index]);

      let anotherIndex = this.selectedMergedGroupList.findIndex(p => p.title == 'Employment Information');
      this.selectedMergedGroupList[anotherIndex].checked = true;
      this.selectedMergedGroupList[anotherIndex].disabled = true;

    }

    if (checkboxNameToBeCheckedByDefault == 'Previous Employment Information') {
      let index = this.employeeMasterModuleList.findIndex(o => o.title == 'Previous Employment  Information');
      this.selectedMergedGroupList.push(this.employeeMasterModuleList[index]);

      let anotherIndex = this.selectedMergedGroupList.findIndex(p => p.title == 'Previous Employment  Information');
      this.selectedMergedGroupList[anotherIndex].checked = true;
      this.selectedMergedGroupList[anotherIndex].disabled = true;

    }

    if (checkboxNameToBeCheckedByDefault == 'Payroll Information') {
      let index = this.employeeMasterModuleList.findIndex(o => o.title == 'Payroll Information');
      this.selectedMergedGroupList.push(this.employeeMasterModuleList[index]);

      let anotherIndex = this.selectedMergedGroupList.findIndex(p => p.title == 'Payroll Information');
      this.selectedMergedGroupList[anotherIndex].checked = true;
      this.selectedMergedGroupList[anotherIndex].disabled = true;

    }

    if (checkboxNameToBeCheckedByDefault == 'Family Information') {
      let index = this.employeeMasterModuleList.findIndex(o => o.title == 'Family Information');
      this.selectedMergedGroupList.push(this.employeeMasterModuleList[index]);

      let anotherIndex = this.selectedMergedGroupList.findIndex(p => p.title == 'Family Information');
      this.selectedMergedGroupList[anotherIndex].checked = true;
      this.selectedMergedGroupList[anotherIndex].disabled = true;
    }
    this.modalRef = this.modalService.show(
      template3,
      Object.assign({}, { class: 'gray modal-md' }),
    );
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
    console.log('index1 is  ', index1);
    console.log('add logic here');
    for (let i = 0; i < this.employeeMasterModuleList.length; i++) {
      if (this.employeeMasterModuleList[i].assignValue == tabName) {
        this.tempMergeSelectedArrayList.push(this.employeeMasterModuleList[i]);
      }
    }

    // if (this.employeeMasterModuleList.filter(function(e) { return e.assignValue === tabName; }).length > 0) {
    // this.employeeMasterModuleList.forEach((ele)=>{
    //   if(ele.assignValue == tabName && ele.group >0){
    //     ele.disabled = false;
    //   } else {
    //     console.log('disabled list is ', ele);
    //     ele.disabled = true;
    //   }
    // });
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
        } else {
        }
        // else if(this.employeeMasterModuleList[i].group !== 0 ){
        //   console.log('i am in third condtion');
        //   this.employeeMasterModuleList[i].disabled = true;

        // }
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
    // this.employeeMasterModuleList[i].disabled = false;


    if (checked == true) {
      let indx = this.filterDropDownList.findIndex(o=>o == tabName);
      if(indx == -1){
        this.filterDropDownList.push(tabName);
      }

      let counter = 1;
      for (let i = 0; i < this.fieldNameArrayList.length; i++) {
        if (this.fieldNameArrayList[i].tab === tabName) {
          this.sequenceArray.push({ disable: false, value: counter++ });
        }
      }
    } else {
      const index = this.filterDropDownList.findIndex((o) => o == tabName);
      this.filterDropDownList.splice(index, 1);
    }
  }

  leftSideCheckBoxChangePersonalInfo(evt: any) {
    console.log('in leftSideCheckBoxChangePersonalInfo');
    console.log(evt);
    console.log(evt.target.value);
    this.onChangeCheckBoxLeftMenu(evt.target.checked, 'Personal Information');
    if (evt.target.checked == true) {
      // this.filterDropDownList.push('Personal Information');

    } else {
      // let index = this.filterDropDownList.findIndex(o => o === 'Personal Information');
      // this.filterDropDownList.splice(index, 1);
      for (let i = this.checkBoxHtmlDataList.length - 1; i >= 0; --i) {
        if (this.checkBoxHtmlDataList[i].tab == 'Personal Information') {
          this.checkBoxHtmlDataList.splice(i, 1);
        }
      }
    }
  }

  leftSideCheckBoxChangeContactInfo(evt: any) {
    this.onChangeCheckBoxLeftMenu(evt.target.checked, 'Contact Information');
    if (evt.target.checked == true) {
      //  this.filterDropDownList.push('Contact Information');
    } else {
      const index = this.filterDropDownList.findIndex((o) => o == 'Contact Information');
      this.filterDropDownList.splice(index, 1);
    }
  }
  leftSideCheckBoxChangeIdentityInfo(evt: any) {
    this.onChangeCheckBoxLeftMenu(evt.target.checked, 'Identity Information');
    if (evt.target.checked == true) {
      /// this.filterDropDownList.push('Identity Information');
    } else {
      const index = this.filterDropDownList.findIndex((o) => o == 'Identity Information');
      this.filterDropDownList.splice(index, 1);
    }
  }
  leftSideCheckBoxChangePreviousEmploymentInfo(evt: any) {
    this.onChangeCheckBoxLeftMenu(evt.target.checked, 'Previous Employment  Information');
    if (evt.target.checked == true) {
      // this.filterDropDownList.push('Previous Employment Information');
    } else {
      const index = this.filterDropDownList.findIndex((o) => o == 'Previous Employment  Information');
      this.filterDropDownList.splice(index, 1);
    }
  }
  leftSideCheckBoxChangeEmploymentInfo(evt: any) {
    this.onChangeCheckBoxLeftMenu(evt.target.checked, 'Employment Information');
    if (evt.target.checked == true) {
      // this.filterDropDownList.push('Previous Employment Information');
    } else {
      const index = this.filterDropDownList.findIndex((o) => o == 'Employment Information');
      this.filterDropDownList.splice(index, 1);
    }
  }
  leftSideCheckBoxChangeComplianceInfo(evt: any) {
    this.onChangeCheckBoxLeftMenu(evt.target.checked, 'Compliance Information');
    if (evt.target.checked == true) {
      // this.filterDropDownList.push('Previous Employment Information');
    } else {
      const index = this.filterDropDownList.findIndex((o) => o == 'Compliance Information');
      this.filterDropDownList.splice(index, 1);
    }
  }
  leftSideCheckBoxChangeEducationAndSkillInfo(evt: any) {
    this.onChangeCheckBoxLeftMenu(evt.target.checked, 'Education & Skill Information');
    if (evt.target.checked == true) {
      // this.filterDropDownList.push('Previous Employment Information');
    } else {
      const index = this.filterDropDownList.findIndex((o) => o == 'Education & Skill Information');
      this.filterDropDownList.splice(index, 1);
    }
  }
  leftSideCheckBoxChangeFamilyInfo(evt: any) {
    this.onChangeCheckBoxLeftMenu(evt.target.checked, 'Family Information');
    if (evt.target.checked == true) {
      // this.filterDropDownList.push('Previous Employment Information');
    } else {
      const index = this.filterDropDownList.findIndex((o) => o == 'Family Information');
      this.filterDropDownList.splice(index, 1);
    }
  }
  leftSideCheckBoxChangePayrollInfo(evt: any) {
    this.onChangeCheckBoxLeftMenu(evt.target.checked, 'Payroll Information');
    if (evt.target.checked == true) {
      // this.filterDropDownList.push('Previous Employment Information');
    } else {
      const index = this.filterDropDownList.findIndex((o) => o == 'Payroll Information');
      this.filterDropDownList.splice(index, 1);
    }
  }
  incrementCounter(row: any, isChecked: boolean, tabName: string) {
    console.log('row.sequece', row.Sequence);
    // it checked that field name is already exist, if yes, then change sequence else push element.
    const index = this.selectedPersonalInformationFields.findIndex((o) => o.fieldName === row.fieldName);
    if (index == -1) {
      this.selectedPersonalInformationFields.push(row);
    } else {
      this.selectedPersonalInformationFields[index].Sequence = row.Sequence;
    }
    let largestElement = 0;
    if (row.Sequence === 0) {
      for (let k = 0; k < this.selectedSummaryCheckBoxHtmlDataList.length; k++) {
        if (this.selectedSummaryCheckBoxHtmlDataList[k].tab == tabName) {
          if (largestElement <  Number(this.selectedSummaryCheckBoxHtmlDataList[k].Sequence)) {
            largestElement =  Number(this.selectedSummaryCheckBoxHtmlDataList[k].Sequence);
          }
        }
      }
      largestElement = Number(largestElement) + 1;
      const index = this.selectedSummaryCheckBoxHtmlDataList.findIndex((o) => o == row);
      this.selectedSummaryCheckBoxHtmlDataList[index].Sequence = largestElement.toString();
    }

  }
  decrementCounter(row: any, isChecked: boolean, tabName: string) {
    console.log('summaryCheckBoxHtmlDataListChanged() in else', row.isChecked);
    const index = this.selectedSummaryCheckBoxHtmlDataList.findIndex((o) => o === row);
    console.log(index);
    this.selectedSummaryCheckBoxHtmlDataList[index].Sequence = 0;
    this.selectedSummaryCheckBoxHtmlDataList.splice(index, 1);
    let count = 1;
    this.selectedSummaryCheckBoxHtmlDataList.forEach((value, index) => {
      if (value.tab == tabName) {
        this.selectedSummaryCheckBoxHtmlDataList[index].Sequence = (count++).toString();
      }
    });

  }

  summaryCheckBoxHtmlDataListChanged(evt: any, row: any) {
    console.log('in summaryCheckBoxHtmlDataListChanged ', evt);
    console.log('row', row);
    if (evt== true) {
      this.selectedSummaryCheckBoxHtmlDataList.push(row);
      row.isChecked = true;
      this.incrementCounter(row, evt, row.tab);
      // if (row.tab === 'Personal Information') {

      //   const index = this.selectedPersonalInformationFields.findIndex((o) => o.fieldName === row.fieldName);
      //   if (index == -1) {
      //     this.selectedPersonalInformationFields.push(row);
      //   } else {
      //     this.selectedPersonalInformationFields[index].Sequence = row.Sequence;
      //   }
      //   let largestElement = 0;
      //   if (row.Sequence === 0) {
      //     for (let k = 0; k < this.selectedSummaryCheckBoxHtmlDataList.length; k++) {
      //       if( this.selectedSummaryCheckBoxHtmlDataList[k].tab == 'Personal Information'){
      //         if(largestElement < this.selectedSummaryCheckBoxHtmlDataList[k].Sequence){
      //           largestElement = this.selectedSummaryCheckBoxHtmlDataList[k].Sequence;
      //         }
      //       }
      //     }
      //     largestElement = Number(largestElement) + 1;
      //     const index = this.selectedSummaryCheckBoxHtmlDataList.findIndex((o) => o == row);
      //     this.selectedSummaryCheckBoxHtmlDataList[index].Sequence = largestElement.toString();
      //   }
      // }

      // if (row.tab == 'Compliance Information') {
      //    // it checked that field name is already exist, if yes, then change sequence else push element.
      //    const index = this.selectedPersonalInformationFields.findIndex((o) => o.fieldName === row.fieldName);
      //    if (index == -1) {
      //      this.selectedPersonalInformationFields.push(row);
      //    } else {
      //      this.selectedPersonalInformationFields[index].Sequence = row.Sequence;
      //    }
      //    let largestElement = 0;
      //    if (row.Sequence === 0) {
      //      for (let k = 0; k < this.selectedSummaryCheckBoxHtmlDataList.length; k++) {
      //        if( this.selectedSummaryCheckBoxHtmlDataList[k].tab == 'Compliance Information'){
      //          if(largestElement < this.selectedSummaryCheckBoxHtmlDataList[k].Sequence){
      //            largestElement = this.selectedSummaryCheckBoxHtmlDataList[k].Sequence;
      //          }
      //        }
      //      }
      //      largestElement = Number(largestElement) + 1;
      //      const index = this.selectedSummaryCheckBoxHtmlDataList.findIndex((o) => o == row);
      //      this.selectedSummaryCheckBoxHtmlDataList[index].Sequence = largestElement.toString();
      //    }

      // }
      /// this.selectedSummaryCheckBoxHtmlDataList[index].Sequence = largestElement.toString();
      // this.selectedSummaryCheckBoxHtmlDataList.forEach((elment,index)=>{
      //   if(elment ==row){
      //    this.selectedSummaryCheckBoxHtmlDataList[index].Sequence=largestElement;
      //   }
      // })

    } else {
      row.isChecked = false;
      this.decrementCounter(row, evt, row.tab);
      // if(row.tab== 'Compliance Information'){
      //   row.isChecked = false;
      //   console.log('summaryCheckBoxHtmlDataListChanged() in else', row.isChecked);
      //   const index = this.selectedSummaryCheckBoxHtmlDataList.findIndex((o) => o === row);
      //   console.log(index);
      //   this.selectedSummaryCheckBoxHtmlDataList[index].Sequence = 0;
      //   this.selectedSummaryCheckBoxHtmlDataList.splice(index, 1);
      //   let count = 1;
      //   this.selectedSummaryCheckBoxHtmlDataList.forEach((value, index) => {
      //     if(value.tab == 'Compliance Information') {
      //       this.selectedSummaryCheckBoxHtmlDataList[index].Sequence = (count++).toString();
      //     }
      //   });

      // }

    }
    console.log(this.selectedSummaryCheckBoxHtmlDataList);
    //this.selectedSummaryCheckBoxHtmlDataList.forEach(list => list.tab === this.assignValue);
    this.counterPersonalInformation = 0;
    this.counterContactInformation = 0;
    this.counterIdentityInformation = 0;
    this.counterComplianceInformation = 0;
    this.counterEducationAndSkillInformation = 0;
    this.counterPreviousEmploymentInformation = 0;
    this.counterEmploymentInformation = 0;
    this.counterFamilyInformation = 0;
    this.counterPayrollInformation = 0;
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
    }
  }

  getFilteredRecordByTableName(element, index, array, tableName) {
    return (element == tableName);
  }

  onChangFilterDropDown(evt: any) {
    console.log(evt);
    this.sequenceArray = [];
    console.log(this.checkBoxHtmlDataList);
    this.checkBoxHtmlDataList1 = [];

      console.log('filter', this.fieldNameArrayList);
      this.global.filter((o) => {
        if (o.tab === evt) {
          this.checkBoxHtmlDataList1.push(o);
        }
      });
      console.log('checkBoxHtmlDataList1', this.checkBoxHtmlDataList1);
      this.fieldNameArrayList = [];
      this.fieldNameArrayList = this.checkBoxHtmlDataList1;
      console.log('fieldNameArrayList', this.fieldNameArrayList);

      let counter = 1;

      for (let i = 0; i < this.fieldNameArrayList.length; i++) {
        if (this.fieldNameArrayList[i].tab === evt) {
          if(this.fieldNameArrayList[i].isMandatory ==1){
            this.summaryCheckBoxHtmlDataListChanged(true, this.fieldNameArrayList[i]);
          }
          this.sequenceArray.push({ disable: false, value: counter++ });
        }

      }


  }
  public exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.excelDataList, 'suggested-orders');
  }
  onClickEmployeeMaster(evt: any) {
    // this.checkedEmployeeMaster = false;
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
    this.sheetsize = 0;
    this.json = [];


    let temp = [];
    const sheet1 = [];


    for (let q = 0; q < this.employeeMasterModuleList.length; q++) {
      if (this.employeeMasterModuleList[q].group > 0) {
        this.selectedSummaryCheckBoxHtmlDataList.forEach((element) => {
          if (this.employeeMasterModuleList[q].title == element.tab) {
            element.tab = this.employeeMasterModuleList[q].assignValue;
          }

        });

      }
    }
    console.log('After merge selectedSummaryCheckBoxHtmlDataList', this.selectedSummaryCheckBoxHtmlDataList);


    const unique = [...new Set(this.selectedSummaryCheckBoxHtmlDataList.map((item) => item.tableName))];
    // console.log('unique', unique); // 2 found  Employee Personal Info and EmployeeMaster Table


    for (let i = 0; i < unique.length; i++) {

      const result = this.selectedSummaryCheckBoxHtmlDataList.filter((o) => o.tableName == unique[i]);
      // console.log(result);
      let fieldName = '';
      const set = new Set(result);
      set.forEach((o) => {
        if (fieldName.length == 0) {
          fieldName = o.fieldName;
        } else {
          fieldName = fieldName + ',' + o.fieldName;
        }
        temp[i] = ({ sheetName: o.tab, tableName: unique[i], fields: fieldName });
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
            fields: this.json[y].fields
          })

        }
      }
      this.objectify('sheet' + (x + 1), tempArr);

    }
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaa', this.anantTemp);
    console.log('customizedResponse', this.customizedResponse);


    // for (let x = 0; x < sheetNameUnique.length; x++) {
    //  const propertyName: string = 'sheet' + (x + 1);
    //   tempData[propertyName] = sheetNameUnique[x];
    // for (let l = 0; l < temp.length; l++) {
    //   let asd =  {
    //     sheetName: temp[l].sheetName,
    //     tableName: temp[l].tableName,
    //     fields: temp[l].fields,
    //   };
    //   this.customizedResponse[x][propertyName].push(asd);
    // }
    // console.log(tempData);
    // console.log(this.customizedResponse);
    // }
    console.log('customizedResponse', this.customizedResponse);
    // console.log(sheetNameUnique.length);
    //  console.log('uniqueSheet Name', sheetNameUnique[0], sheetNameUnique[1], sheetNameUnique[2]); // 2 found  Employee Personal Info and EmployeeMaster Table
    for (let i = 0; i < temp.length; i++) {
      for (let j = 0; j < sheetNameUnique.length; j++) {
        if (temp[i].sheetName === sheetNameUnique) {
          // this.customizedResponse[j][sheetName]
        }

      }
    }
    sheet1.push(temp);



    let saveObject = {
      templateName: this.form.get('templateName').value,
      remark: this.form.get('remark').value,
      description: this.form.get('description').value,
      companyId: 1,
      module: 'EmpMaster',
      sheetSize: this.sheetsize.toString(),
      // sheet1: sheet1[0],


    };



    let object3 = { ...saveObject, ...this.anantTemp }
    console.log('object 333333333', object3);
    console.log(JSON.stringify(object3));


    console.log('save object is ', object3);
    // console.log('json obj for saving', JSON.stringify(saveObject));

    this.uploadeExcelHomeService.postExcelTemplateGeneration(object3).subscribe((res) => {
      if (res.data.results.length > 0) {
        this.alertService.sweetalertWarning(res.status.messsage);

      } else {
        this.alertService.sweetalertWarning(res.status.messsage);
      }

    }, (error: any) => {
      this.alertService.sweetalertError(error.error.status.messsage);

    }, () => {
      this.getAllExcelTemplate();
    });


  }
  cancelView() {
    this.isEditMode = false;
    this.form.reset();

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
  buttonNext() {
    console.log('clicked on next');

  }
  buttonPrevious() {
    console.log('clicked on previous');
    // console.log(this.selectedCounterList);
    console.log(this.fieldNameArrayList);
  }
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
  // objectify1(key, value) {
  //   this.anantTemp[key] = value;

  // }
  onmergeSelected(evt: any, emp: any) {

    console.log(evt);
    console.log(evt.target.checked);
    console.log(emp);





    if (evt.target.checked == true) {
      emp.checked = true;
      let index = this.tempMergeSelectedArrayList.findIndex(o => o.title == emp.title);
      if (index == -1) {
        this.tempMergeSelectedArrayList.push(emp);
      }

    } else {
      let index = this.tempMergeSelectedArrayList.findIndex(o => o.title == emp.title);
      console.log('index  ', index);
      if (index == -1) {
        console.log(' not found');
      } else {
        this.tempMergeSelectedArrayList.splice(index, 1);
      }
      // find index and remove it
    }
    console.log('selectedMergedGroupList ', this.selectedMergedGroupList);
    console.log('tempMergeSelectedArrayList ', this.tempMergeSelectedArrayList);
    console.log('employeeMasterModuleList ', this.employeeMasterModuleList);

  }
  onClosePopUpWindow() {

    // this.tempMergeSelectedArrayList = [];
    console.log('on close pop up window', this.selectedMergedGroupList);

    const lastItem = this.selectedMergedGroupList[this.selectedMergedGroupList.length - 1];
    const indexOfEmpMasterModule = this.employeeMasterModuleList.findIndex(o => o.title == lastItem.title);
    console.log('indexOfEmpMasterModule', indexOfEmpMasterModule);
    this.employeeMasterModuleList[indexOfEmpMasterModule].checked = false;
    this.employeeMasterModuleList[indexOfEmpMasterModule].disabled = false;
    console.log('last item is ', lastItem);

    this.selectedMergedGroupList = [];
  }

  saveMergeAndUnmerge() {

    console.log(this.tempMergeSelectedArrayList);

    const lastItem = this.selectedMergedGroupList[this.selectedMergedGroupList.length - 1];
    lastItem.selected = true;
    console.log('in save Merge And Unmerge lastitem == ', lastItem);


    let largestElement = 0;
    const mergedIndex = this.employeeMasterModuleList.findIndex(o => o.assignValue == lastItem.title);
    console.log('merged index is ', mergedIndex);
    if (mergedIndex == -1) {
      for (let k = 0; k < this.employeeMasterModuleList.length; k++) {
        if (largestElement < this.employeeMasterModuleList[k].group) {
          largestElement = this.employeeMasterModuleList[k].group;
        }
      }
      largestElement = Number(largestElement) + 1;
    } else {
      largestElement = this.employeeMasterModuleList[mergedIndex].group;
    }


    console.log('largest element in a group is ', largestElement);

    // if assignValue is exist then  replace all group 0 and checked false

    let indx = this.employeeMasterModuleList.findIndex(o => o.assignValue == lastItem.title);
    if (indx !== -1) {
      for (let k = 0; k < this.employeeMasterModuleList.length; k++) {
        if (this.employeeMasterModuleList[k].assignValue == lastItem.title) {
          this.employeeMasterModuleList[k].group = 0;
          this.employeeMasterModuleList[k].checked = false;
          this.employeeMasterModuleList[k].disabled = false;
          this.employeeMasterModuleList[k].assignValue = '';
        }
      }


    }

    console.log('is it valid  ', this.tempMergeSelectedArrayList.length > 1);

    if (this.tempMergeSelectedArrayList.length > 1) {
      this.tempMergeSelectedArrayList.push(lastItem);
      for (let k = 0; k < this.tempMergeSelectedArrayList.length; k++) {

        let index = this.employeeMasterModuleList.findIndex(o => o.title == this.tempMergeSelectedArrayList[k].title);

        this.employeeMasterModuleList[index].group = largestElement;
        this.employeeMasterModuleList[index].checked = true;
        // this.employeeMasterModuleList[index].disabled = true;
        this.employeeMasterModuleList[index].assignValue = lastItem.title;
      }

    } else {
      let index = this.employeeMasterModuleList.findIndex(o => o.title == lastItem.title);
      this.employeeMasterModuleList[index].group = 0;
      this.employeeMasterModuleList[index].assignValue = '';
      this.employeeMasterModuleList[index].checked = false;

    }

    this.tempMergeSelectedArrayList = [];
    this.selectedMergedGroupList = [];

    console.log(this.employeeMasterModuleList);
  }

}

