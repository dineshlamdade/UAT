import { Component, OnInit } from '@angular/core';
import { ClaimService } from './claim.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertServiceService } from '../../../core/services/alert-service.service';
@Component( {
  selector: 'app-claim-form',
  templateUrl: './claim-form.component.html',
  styleUrls: ['./claim-form.component.scss']
} )
export class ClaimFormComponent implements OnInit {
  public claimForm: FormGroup;
  public claimGridDataList: Array<any> = [];
  public dropdownListData: Array<any> = [];
  public submitted: boolean = false;
  public loading: boolean = false;
  public modalRef: BsModalRef;
  public dropListModel: string;
  public dropdownListid: any;
  public templateUserIdList = [];
  public isView: boolean = false;
  public isEdit: boolean = false;
  public claimTempId: number = 0;
  constructor(
    public claimService: ClaimService,
    public fb: FormBuilder,
    private modalService: BsModalService,
    private alertService: AlertServiceService,
  ) { }

  ngOnInit(): void {
    this.claimForm = this.fb.group({
      claimTempId: new FormControl(''),
      claimTemplateName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      groupCompanyId: new FormControl(1),
      active: new FormControl(true),
      remark: new FormControl({ value: '', disabled: true }),
      claimTemplateDetailsRequestDTO: new FormGroup({
        claimTempDetailsId: new FormControl(''),
        claimTempStandardFieldMasterId: new FormControl(''),
        fieldName: new FormControl(''),
        displayName: new FormControl(''),
        enable: new FormControl(''),
        mandatory: new FormControl(''),
        dropDownValues: new FormControl({}),
        sequence: new FormControl(''),
        active: new FormControl(),
        nature: new FormControl(''),
      })
    });
    this.getAllFields();
    this.getClaimTemplatesList();
    // this.isView=false;
  }
  get f() { return this.claimForm.controls; }

  //................. Submit claim form.................
  submitClaimMaster() {
    window.scrollTo( 0, 0 );
    if ( this.claimTempId > 0 ) {
      this.submitted = true;
      if ( this.claimForm.invalid ) {
        return;
      }
      let isAllSelectField = this.claimGridDataList.every(obj => obj.enable == false);
      if (isAllSelectField) {
        this.alertService.sweetalertWarning('Please select any field list')
        return
      }else{
      console.log(this.claimForm.value);
      let postData = this.claimForm.getRawValue();
      this.claimGridDataList.forEach(element=>{
        if(element.dropDownValues === null){
          element.dropDownValues = [];
        }
      })
      postData.claimTemplateDetailsRequestDTO = this.claimGridDataList;
      console.log("postData", postData);
      this.claimService.editClaimData(postData).subscribe((res) => {
        console.log("Claim value", res);
        // this.templateUserIdList.push(res.data.results[0]);
        this.alertService.sweetalertMasterSuccess("Claim form updated successfully", "");
        console.log("templateUserId", this.templateUserIdList);
      })
      this.dropdownListData = [];
    }
 this.resetForm();
      
    } else {
      this.submitted = true;
      if ( this.claimForm.invalid ) {
        return;
      }
      let isAllSelectField = this.claimGridDataList.every(obj => obj.enable == false);
      if (isAllSelectField) {
        this.alertService.sweetalertWarning('Please select any field list')
        return
      }else{
      console.log(this.claimForm.value);
      let postData = this.claimForm.getRawValue();
      postData.claimTemplateDetailsRequestDTO = this.claimGridDataList  ;
      console.log("postData", postData);
      this.claimService.postClaimData(postData).subscribe((res) => {
        console.log("Claim value", res);
        this.templateUserIdList.push(res.data.results[0]);
        this.alertService.sweetalertMasterSuccess("Claim form submitted successfully", "");
        console.log("templateUserId", this.templateUserIdList);
      })
    }
      this.resetForm();
    }
  }
  // ....................Active remark disabled....................
  activeRemark( event ) {
    if ( event == false ) {
      this.claimForm.controls.remark.enable();
    } else {
      this.claimForm.controls.remark.disable();
    }
  }

  //....................... Get all fields list for selected checkbox list...................
  getAllFields() {
    this.claimService.getClaimFields().subscribe( ( res ) => {
      console.log( res );
      // const nature = { nature: "List" }
      // const returnClaimData = Object.assign(res.data.results[0], nature);
      this.claimGridDataList = res.data.results;
      console.log( " this.claimGridDataList", this.claimGridDataList )
    } )
  }
  //....................... View and Edit post list for selected checkbox list...................
  getClaimTemplateViewById( claimTempId ) {
    window.scrollTo( 0, 0 );
    this.claimService.getClaimTemplateViewById( claimTempId ).subscribe( ( res ) => {
      console.log( res );
      let claimTemplateList = res.data.results[0];
      console.log( claimTemplateList );
      this.claimForm.patchValue( claimTemplateList );
      this.claimForm.disable();
      //  this.claimGridDataList = [];
      this.claimGridDataList = res.data.results[0].claimTemplateDetailsResponseDTO;
      this.isView = true;
      console.log("this.claimGridDataList", this.claimGridDataList)

    } )

  }
  getClaimTemplateEditById( claimTempId ) {
    this.claimTempId = claimTempId;
    window.scrollTo( 0, 0 );
    this.claimService.getClaimTemplateViewById( claimTempId ).subscribe( ( response ) => {
      console.log( response );
      let claimTemplateList = response.data.results[0];
      console.log(claimTemplateList);
      this.claimForm.patchValue(claimTemplateList);
     // this.claimGridDataList = res.data.results[0].claimTemplateDetailsResponseDTO;
    //  this.claimGridDataList = response.data.results[0].claimTemplateDetailsResponseDTO;
        this.isEdit = true;
      // console.log("this.claimGridDataList", this.claimGridDataList)
      for (let i = 0; i < response.data.results[0].claimTemplateDetailsResponseDTO.length; i++) {
        const myobj = {
          claimTempStandardFieldMasterId: response.data.results[0].claimTemplateDetailsResponseDTO[i].claimTempStandardFieldMasterId,
          claimTempDetailsId: response.data.results[0].claimTemplateDetailsResponseDTO[i].claimTempDetailsId,
          fieldName: response.data.results[0].claimTemplateDetailsResponseDTO[i].fieldName,
          displayName: response.data.results[0].claimTemplateDetailsResponseDTO[i].displayName,
          enable: response.data.results[0].claimTemplateDetailsResponseDTO[i].enable,
          dropDownValues: response.data.results[0].claimTemplateDetailsResponseDTO[i].dropDownValues,
          // claimForm: response.data.results[0].claimTemplateDetailsResponseDTO[i].claimForm,
          sequence: response.data.results[0].claimTemplateDetailsResponseDTO[i].sequence,
          mandatory: response.data.results[0].claimTemplateDetailsResponseDTO[i].mandatory,
          nature: response.data.results[0].claimTemplateDetailsResponseDTO[i].nature,
          remark: response.data.results[0].claimTemplateDetailsResponseDTO[i].remark,
          active: response.data.results[0].claimTemplateDetailsResponseDTO[i].active,
          // active: 1,
        };
        let s = this.claimGridDataList.findIndex( o => o.fieldName == response.data.results[0].claimTemplateDetailsResponseDTO[i].fieldName );
        this.claimGridDataList[s] = myobj;
        // this.registersList.splice(s,1);
        // this.registersList.push(myobj);
      }
    } )

  }




  //.........................Get all claim template list .................

  getClaimTemplatesList() {
    this.claimService.getClaimTemplateList().subscribe( ( res ) => {
      console.log( res );
      this.templateUserIdList = res.data.results;
      console.log( "191", this.templateUserIdList );
    } )
  }

  // ...........................Select table list data ......................

  checkedListData(index, isChecked, fieldName) {
    console.log("hellow", index, isChecked, fieldName);
    console.log(this.claimGridDataList[index]);
    // this.registerGridDataList[index].enable = isChecked;

    const indexValue = this.claimGridDataList.findIndex(getIndex => getIndex.fieldName == fieldName);
    console.log("indexvalue", indexValue);
    this.claimGridDataList[indexValue].enable = isChecked;
    this.claimGridDataList[indexValue].mandatory = false;
    // this.claimGridDataList[indexValue].claimForm = false;
    this.claimGridDataList[indexValue].dropDownValues = [];
    if (!isChecked) {
      //console.log("registerGridDataTempList::",this.registerGridDataTempList);
    //  const tempIndexValue = this.registerGridDataTempList.findIndex(getIndex => getIndex.fieldName == fieldName);
  
      this.claimGridDataList[indexValue].displayName = '';
    //  console.log("this.registerGridDataTempList[tempIndexValue].displayName", this.registerGridDataTempList[tempIndexValue].displayName)

    }
    
    // console.log(index, isChecked, claimId);
    // console.log(this.claimGridDataList[index]);
    // this.claimGridDataList[index].enable = isChecked;
    // if (isChecked == true) {
    //   let listData = this.claimGridDataList[index];
    //   listData.mandatory = false;
    //   listData.dropDownValues = [];
    //   this.dropdownListData = [];
    //   this.claimGridDataList.push(listData);
    //   console.log("myvalue", this.claimGridDataList);
    // } else {
    //   const indexValue = this.claimGridDataList.indexOf(fieldName);
    //   this.claimGridDataList.splice(indexValue, 1);
    // }
    // console.log("selected value", this.claimGridDataList);
    // console.log("claimGridDataList value", this.claimGridDataList);
  }

  // .................... Change Event Pass Value............
  mindatoryChangeEvt( index, changeValue, fieldName ) {
    console.log( index, changeValue, fieldName );
    if ( changeValue == "" ) {
      let falseValue = "false";
      let indexData = this.claimGridDataList.findIndex(getIndex => getIndex.fieldName == fieldName);
      this.claimGridDataList[indexData].mandatory = JSON.parse(falseValue.toLowerCase());
      console.log("mindatory index2", this.claimGridDataList);
    } else {
      let indexData = this.claimGridDataList.findIndex(getIndex => getIndex.fieldName == fieldName);
      this.claimGridDataList[indexData].mandatory = JSON.parse(changeValue.toLowerCase());
      console.log("mindatory index", this.claimGridDataList);
    }
  }


  displayChangeEvt(index, changeValue, fieldName) {
    console.log(index, changeValue, fieldName);
    let indexData = this.claimGridDataList.findIndex(getIndex => getIndex.fieldName == fieldName);
    this.claimGridDataList[indexData].displayName = changeValue;
    console.log("Display change", this.claimGridDataList);
  }


  // ................Dropdown List Values.................
  getDropdownListvalue( dropList, dropdownListid ) {
    this.dropdownListData.push( dropList );
    console.log( "dropdownListData", this.dropdownListData );
    this.dropListModel = '';
    let indexField = this.claimGridDataList.findIndex(getIndex => getIndex.fieldName == dropdownListid)
    this.claimGridDataList[indexField].dropDownValues = this.dropdownListData;
  }

  getDropdownListRemove(index, dropdownListid) {
    this.dropdownListData.splice(index, 1);
    console.log(this.dropdownListData);
    let indexField = this.claimGridDataList.findIndex(getIndex => getIndex.fieldName == dropdownListid)
    this.claimGridDataList[indexField].dropDownValues = this.dropdownListData;
  }
  resetForm(){
    window.scrollTo(0, 0);
    this.claimGridDataList = [];
    this.claimForm.reset({
      active: new FormControl(true),
    });
    this.getAllFields();
    this.isView = false;
    this.isEdit = false;
    this.claimForm.enable();
    this.claimForm.controls.remark.disable();

  }
  // ....................Popup box section...................

  modalDropdownList( template: TemplateRef<any>, srno: any, fieldName: string ) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign( {}, { class: 'gray modal-md' } )
    );
    this.dropdownListid = fieldName;
    console.log( this.dropdownListid );
  }



}
