import { Component, OnInit } from '@angular/core';
import { DeclarationService } from './declaration.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertServiceService } from '../../../core/services/alert-service.service';
import { CKEditor4 } from 'ckeditor4-angular/ckeditor';
export interface summaryTempList {
  declarationMessageName;
  module;
}
@Component({
  selector: 'app-declaration-form',
  templateUrl: './declaration-form.component.html',
  styleUrls: ['./declaration-form.component.scss']
})
export class DeclarationFormComponent implements OnInit {
  public declarationForm: FormGroup;
  public claimGridDataList: Array<any> = [];
  public selectedListElement: Array<any> = [];
  public dropdownListData: Array<any> = [];
  public keywordList: Array<any> = [];
  
  public submitted: boolean = false;
  public loading: boolean = false;
  public modalRef: BsModalRef;
  public dropListModel: string;
  public dropdownListid: any;
  public templateUserIdList = [];
  public isView: boolean = false;
  public isEdit: boolean = false;
  public declarationMessageId: number = 0;
  public keyword: any = [];
  public declarationTempList: summaryTempList[];
  queryForm: FormGroup;
  ckeConfig: any;
  // public Editor = ClassicEditor;
  queryListData: any;
  editflag: boolean = false;
  hideRemarkDiv: boolean = false;
  isVisible: boolean = false;
  isShown: boolean = true;
  p: number = 1;
  moduleListData: any;


  // editorConfig = {
  //   toolbar: [
  //     { name: 'basicstyles', items: [ 'Bold', 'Italic' ] },
  //     { name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', '-', 'Undo', 'Redo' ] },
  //     { name: 'document', items: ['Source'] }
  //   ],
  //   allowedContent: true,
  //   fullPage: true,
  //   startupMode: 'source',
  // };

  fieldMap: any;
  mappingData: any = [];

  public allTechnologies = ["Reimbursement", "Reimbursement1", "Reimbursement2"];
  constructor(
    public declarationService: DeclarationService,
    public fb: FormBuilder,
    private modalService: BsModalService,
    private alertService: AlertServiceService,
  ) {
    this.keyword = [
      {
        'name': 'Employee Code',
        'id': 1,
        'description': '10250'
      },
      {
        'name': 'Employee Full Name',
        'id': 2,
        'description': 'Swapnil Darekar'
      },
      {
        'name': 'Employee Email',
        'id': 3,
        'description': 'Swapnil@paysquare.com'
      },
      {
        'name': 'Employee Contact',
        'id': 4,
        'description': '9730825383'
      },
      {
        'name': 'Employee Gender',
        'id': 5,
        'description': 'Male'
      },
      {
        'name': 'Employee Grade',
        'id': 6,
        'description': 'A Grade'
      },
      {
        'name': 'Employee Company',
        'id': 7,
        'description': 'Paysquare'
      },
      {
        'name': 'Date',
        'id': 8,
        'description': '23-04-2021'
      },

    ]

    this.keyword.forEach(element => {
      this.mappingData.push(
        [element.id.toString(), '[' + element.description + ']']
      )
    })

    this.fieldMap = new Map<string, string>(this.mappingData);

  }
  ngOnInit(): void {
    this.declarationForm = this.fb.group({
      // createdBy: new FormControl(''),
      // createDateTime: new FormControl(''),
      // lastModifiedBy: new FormControl(''),
      // lastModifiedDateTime: new FormControl(''),
      declarationMessageId: new FormControl(''),
      declarationMessageName: new FormControl('', Validators.required),
      module: new FormControl('', Validators.required),
      payRollArea: new FormControl(''),
      groupCompanyId: new FormControl(1),
      rembDeclarationMessage: new FormControl('', Validators.required),
      fieldId: new FormControl(''),
      active: new FormControl(true),

    });
    // this.getAllFields();
    this.getClaimTemplatesList();
    this.getStandardKeyword();
  }
  get f() { return this.declarationForm.controls; }

  //................. Submit claim form.................
  submitClaimMaster() {
    window.scrollTo(0, 0);
    console.log("this.declarationMessageId", this.declarationMessageId);
    console.log("its edit ")
    if (this.declarationMessageId > 0) {
      this.submitted = true;
      if (this.declarationForm.invalid) {
        return;
      }
      console.log(this.declarationForm.value);
      let postData = this.declarationForm.getRawValue();
      console.log("postData", postData);
      this.declarationService.editClaimData(postData).subscribe((res) => {
        console.log("Claim value", res);
        // this.templateUserIdList.push(res.data.results[0]);
        this.alertService.sweetalertMasterSuccess("Declaration form updated successfully", "");
        // console.log("templateUserId", this.templateUserIdList);
        this.getClaimTemplatesList();
      })
      this.resetForm();
      this.declarationForm.reset({
        active: new FormControl(true),
      });
    } else {
      console.log("its save ")
      this.submitted = true;
      if (this.declarationForm.invalid) {
        return;
      }
      console.log(this.declarationForm.value);
      let postData = this.declarationForm.getRawValue();
      console.log("postData", postData);
      this.declarationService.postClaimData(postData).subscribe((res) => {
        console.log("Claim value", res);
        this.templateUserIdList.push(res.data.results[0]);
        this.alertService.sweetalertMasterSuccess("Declaration form submitted successfully", "");
        console.log("templateUserId", this.templateUserIdList);
      })
      this.declarationForm.reset({
        active: new FormControl(true),
      });
    }



  }
  // ....................Active remark disabled....................
  activeRemark(event) {
    if (event == false) {
      this.declarationForm.controls.remark.enable();
    } else {
      this.declarationForm.controls.remark.disable();
    }
  }

  //....................... Get all fields list for selected checkbox list...................
  // getAllFields() {
  //   this.declarationService.getClaimFields().subscribe((res) => {
  //     console.log(res);
  //     // const nature = { nature: "List" }
  //     // const returnClaimData = Object.assign(res.data.results[0], nature);
  //     this.claimGridDataList = res.data.results;
  //     console.log(" this.claimGridDataList", this.claimGridDataList)
  //   })
  // }
  //....................... View and Edit post list for selected checkbox list...................
  getClaimTemplateViewById(claimTempId, companyId) {
    console.log("claimtempid", claimTempId, companyId);
    window.scrollTo(0, 0);
    this.declarationService.getClaimTemplateViewById(claimTempId, companyId).subscribe((res) => {
      console.log(res);
      let claimTemplateList = res.data.results[0];
      console.log(claimTemplateList);
      this.declarationForm.patchValue(claimTemplateList);
      this.declarationForm.disable();
      this.claimGridDataList = [];
      this.claimGridDataList = res.data.results[0].reimbursementListSummaryHeadTemplateDetailsResponseDTO;
      this.isView = true;
      console.log("this.selectedListElement", this.claimGridDataList)

    })

  }
  getStandardKeyword(){
    this.declarationService.getStandardKeyword().subscribe((res)=>{
      this.keywordList = res.data.results;
      console.log("getStandardKeyword", this.keywordList);
    });
  }
  getClaimTemplateEditById(claimTempId, companyId) {
    this.declarationMessageId = claimTempId;
    window.scrollTo(0, 0);
    this.declarationService.getClaimTemplateViewById(claimTempId, companyId).subscribe((res) => {
      console.log(res);
      this.isEdit = true;
      let claimTemplateList = res.data.results[0];
      console.log(claimTemplateList);
      this.declarationForm.enable();
      this.declarationForm.patchValue(claimTemplateList);
      this.claimGridDataList = res.data.results[0].reimbursementListSummaryHeadTemplateDetailsResponseDTO;
      // this.isView = true;
      console.log("this.selectedListElement", this.selectedListElement)

    })

  }




  //.........................Get all claim template list .................

  getClaimTemplatesList() {
    this.declarationService.getClaimTemplateList().subscribe((res) => {
      console.log(res);
      this.templateUserIdList = res.data.results[0];
      this.declarationTempList = this.templateUserIdList;
      console.log("templateUserIdList", this.templateUserIdList)
    })
  }

  // ...........................Select table list data ......................

  checkedListData(index, isChecked, fieldName) {
    // console.log(index, isChecked, claimId);
    console.log(this.claimGridDataList[index]);
    this.claimGridDataList[index].enable = isChecked;
    if (isChecked == true) {
      let listData = this.claimGridDataList[index];
      listData.mandatory = false;
      listData.dropDownValues = [];
      this.selectedListElement.push(listData);
      console.log("myvalue", this.selectedListElement);
    } else {
      const indexValue = this.selectedListElement.indexOf(fieldName);
      this.selectedListElement.splice(indexValue, 1);
    }
    console.log("selected value", this.selectedListElement);
  }

  // .................... Change Event Pass Value............
  moduleChange(event) {
    console.log("event", event)
  }

  companyChange(event) {
    console.log("event", event)
  }

  resetForm() {
    window.scrollTo(0, 0);
    this.declarationForm.reset({
      active: new FormControl(true),
    });
    // this.getAllFields();
    this.isView = false;
    this.isEdit = false;
    this.declarationForm.enable();
    // this.claimForm.controls.remark.disable();

  }

  mindatoryChangeEvt(index, changeValue, fieldName) {
    console.log(index, changeValue, fieldName);
    if (changeValue == "") {
      let falseValue = "false";
      let indexData = this.claimGridDataList.findIndex(getIndex => getIndex.fieldName == fieldName);
      this.claimGridDataList[indexData].mandatory = JSON.parse(falseValue.toLowerCase());
      console.log("mindatory index2", this.selectedListElement);
    } else {
      let indexData = this.claimGridDataList.findIndex(getIndex => getIndex.fieldName == fieldName);
      this.claimGridDataList[indexData].mandatory = JSON.parse(changeValue.toLowerCase());
      console.log("mindatory index", this.selectedListElement);
    }
  }


  displayChangeEvt(index, changeValue, fieldName) {
    console.log(index, changeValue, fieldName);
    let indexData = this.claimGridDataList.findIndex(getIndex => getIndex.fieldName == fieldName);
    this.claimGridDataList[indexData].displayName = changeValue;
    console.log("Display change", this.selectedListElement);
  }


  // ................Dropdown List Values.................
  getDropdownListvalue(dropList, dropdownListid) {
    this.dropdownListData.push(dropList);
    console.log("dropdownListData", this.dropdownListData);
    this.dropListModel = '';
    let indexField = this.selectedListElement.findIndex(getIndex => getIndex.fieldName == dropdownListid)
    this.selectedListElement[indexField].dropDownValues = this.dropdownListData;
  }

  getDropdownListRemove(index, dropdownListid) {
    this.dropdownListData.splice(index, 1);
    console.log(this.dropdownListData);
    let indexField = this.selectedListElement.findIndex(getIndex => getIndex == dropdownListid)
    this.selectedListElement[indexField].dropDownValues = this.dropdownListData;
  }

  // ....................Popup box section...................

  modalDropdownList(template: TemplateRef<any>, srno: any, fieldName: string) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
    this.dropdownListid = fieldName;
    console.log(this.dropdownListid);
  }




  /*** CKeditor Drag and Drop */

  allowDrop(ev): void {
    ev.preventDefault();
  }
  drag(ev): void {
    ev.dataTransfer.setData('text', ev.target.id);
  }
  drop(ev): void {
    ev.preventDefault();
    const data = ev.dataTransfer.getData('text');
    const dataValue = this.fieldMap.get(data);

    console.log("data value after drop: " + dataValue)
    const startPos = ev.target.selectionStart;
    const endPos = ev.target.selectionEnd;

    console.log(ev.target.value)

    ev.target.value = ev.target.value.substring(0, startPos)
      + dataValue
      + ev.target.value.substring(endPos, ev.target.value.length);

    let bodyValue = ev.target.value.substring(0, startPos)
      + '[' + data + ']'
    console.log(bodyValue)
  }

  public onChange( event: CKEditor4.EventInfo ) {
    console.log("cks", event.editor.getData() );
    
}
  editorConfig = {
    toolbar: [
      { name: 'document', items: ['Source', '-', 'Save', 'NewPage', 'ExportPdf', 'Preview', 'Print', '-', 'Templates'] },
      { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
      { name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt'] },
      { name: 'forms', items: ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'] },
      '/',
      { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat'] },
      { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language'] },
      { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
      { name: 'insert', items: ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe'] },
      '/',
      { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
      { name: 'colors', items: ['TextColor', 'BGColor'] },
      { name: 'tools', items: ['Maximize', 'ShowBlocks'] },
      { name: 'about', items: ['About'] },
      { name: 'colors' },

    ],
    allowedContent: true,


  };


}
