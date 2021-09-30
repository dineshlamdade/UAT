import { DatePipe } from '@angular/common';
import { Component, HostListener, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { ExcelserviceService } from '../../excel_service/excelservice.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';
import { KeywordserviceService } from '../keywordservice.service';
import { FormulaServiceService } from '../formula-service.service';
@Component({
  selector: 'app-keywordmaster',
  templateUrl: './keywordmaster.component.html',
  styleUrls: ['./keywordmaster.component.scss']
})
export class KeywordmasterComponent implements OnInit {

  keywordSummeryData: any;
  formulaListData: any;
  FDHeadList: any;
  keywordForm: FormGroup;
  natureValue: string = "Master";
  editData: any;
  editflag: boolean = false;
  viewflag: boolean = false;
  keywordId: any;
  keywordDataById: any;
  natureValueFlag: boolean= false;


  constructor(private datepipe: DatePipe, private keywordservice: KeywordserviceService,
    private toster: ToastrService, private formulaservice: FormulaServiceService) {

    this.keywordForm = new FormGroup({
      "keywordId":new FormControl(0),
      "keywordName": new FormControl(""),
      "keywordDescription": new FormControl(""),
      "headMasterId": new FormControl(""),
      "formulaRelation": new FormControl(""),
      "isActive": new FormControl(""),
      "nature": new FormControl(""),
      "formula": new FormControl(""),
      "type": new FormControl(""),
      "remark": new FormControl("")
    })
  }

  ngOnInit() {
    this.KeywordMasterDetailsSummery();
    this.formulaList();
    this.globalGetAl();
  }

  KeywordMasterDetailsSummery() {

    this.keywordservice.KeywordMasterDetailsSummery().subscribe(res => {
      this.keywordSummeryData = res.data.results;
    })
  }

  formulaList() {

    this.formulaservice.formulamasterSummery().subscribe(res => {
      this.formulaListData = res.data.results;
    })
  }

  globalGetAl() {
    this.keywordservice.globalGetAl().subscribe(res => {
      this.FDHeadList = res.data.results;
    })
  }

  getSelectedNature(event){
    if(event.checked){
      if(this.natureValue ="Formula"){
        this.natureValueFlag = true;
      }
     }else{
      this.natureValue = "Master"
      this.natureValueFlag = false;
      }
  }


  saveKeyword() {
    this.keywordForm.removeControl('keywordId')
   this.keywordForm.controls['isActive'].setValue(1)
   this.keywordForm.controls['nature'].setValue(this.natureValue)
   this.keywordForm.controls['formulaRelation'].setValue('Formula')
    this.keywordservice.KeywordMasterDetails(this.keywordForm.value).subscribe(res => {
      this.toster.success("", "Keyword data saved successfully")
      this.KeywordMasterDetailsSummery();
      this.keywordForm.reset()
      this.editflag = false
      this.viewflag = false
    })
  }

  editSummaryData(data){
    this.editData = data
    this.editflag = true;
    this.viewflag = false;
    this.keywordForm.enable()
    this.keywordForm.patchValue(data)
    this.keywordId = data.keywordId
    this.getDataById()
  }

  viewSummaryData(data){
    this.editflag = false;
    this.viewflag = true;
    this.keywordForm.disable()
    this.keywordForm.patchValue(data)
  }

  deleteSummaryData(key){
    const formData = new FormData();

    formData.append('keywordId', key.keywordId)
    this.keywordservice.KeywordMasterDetailsDelete(formData).subscribe(res => {
      this.toster.success("","Keyword Deleted successfully")
      this.keywordSummeryData()
     })
  }

  getDataById(){
    const formData = new FormData();

    formData.append('keywordId', this.keywordId)

    this.keywordservice.KeywordMasterDetailsGetById(formData).subscribe(res => {
     this.keywordDataById = res.data.result;
     this.keywordForm.patchValue(this.keywordDataById)
    })
  }

  updateKeyword(){
    // alert(this.keywordId)
    this.keywordForm.controls['keywordId'].setValue(this.keywordId)
    this.keywordForm.controls['headMasterId'].setValue(parseInt(this.keywordForm.controls['headMasterId'].value))
    this.keywordForm.controls['isActive'].setValue(1)
   this.keywordForm.controls['nature'].setValue(this.natureValue)
   this.keywordForm.controls['formulaRelation'].setValue('Formula')
    this.keywordservice.KeywordMasterDetailsUpdate(this.keywordForm.value).subscribe(res => {
      this.toster.success("", "Keyword data updated successfully")
      this.KeywordMasterDetailsSummery();
      this.keywordForm.reset()
      this.editflag = false
      this.viewflag = false
    })
  }

  reset(){
    this.keywordForm.reset();
    this.editflag = false;
    this.viewflag = false;
    this.keywordForm.enable()
  }

}
