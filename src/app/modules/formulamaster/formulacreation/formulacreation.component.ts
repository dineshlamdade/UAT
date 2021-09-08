import { Component, OnInit } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { TemplateRef} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup } from '@angular/forms';
import { FormulaServiceService } from '../formula-service.service';
import { AlertServiceService } from '../../../core/services/alert-service.service';
import { DatePipe } from '@angular/common';
interface User1 {
  SrNo;
  DerivedName;
  Module;
  TableName;
  FieldName;
  DerivedType;
  JobFieldType;
  Percentageof;

}

@Component({
  selector: 'app-formulacreation',
  templateUrl: './formulacreation.component.html',
  styleUrls: ['./formulacreation.component.scss']
})
export class FormulacreationComponent implements OnInit {
    public modalRef: BsModalRef;
  
  users1: User1[];
  formulaform: any;
  formulaSummeryData: any;
  formulaData:any = [];
  keyword = 'name';
  editData: any;
  editflag: boolean = false;
  viewflag: boolean = false;
  FormulaId: any;
  formulaDataById: any;
  originalFormula: any[] = [];
  selectedFormula: any;
  formulaNameData: any;


  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
];


  constructor(private modalService: BsModalService,private formulaService: FormulaServiceService,
    private datepipe: DatePipe,
    private alertService: AlertServiceService) {

      
        this.formulaform = new FormGroup({
        "formulaId":new FormControl(0),
        "formulaName": new FormControl(""),
        "formulaDescription": new FormControl(""),
        "originalFormula": new FormControl(""),
        "displayName": new FormControl(""),
        "effectiveFromDate": new FormControl(""),
        "effectiveToDate": new FormControl(""),
        "isActive": new FormControl(""),
        "remark": new FormControl(""),
        
      })
  }

  ngOnInit() {
    this.formulaSearchList();
    this.FormulaMasterDetailsSummery();
    
    
  }

  mediumpopup(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  extralargepopup(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }

  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
        let value1 = data1[event.field];
        let value2 = data2[event.field];
        let result = null;
  
        if (value1 == null && value2 != null)
            result = -1;
        else if (value1 != null && value2 == null)
            result = 1;
        else if (value1 == null && value2 == null)
            result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string')
            result = value1.localeCompare(value2);
        else
            result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
  
        return (event.order * result);
    });
  
}

saveFormulaMasters() {

  this.formulaform.removeControl('keywordId')
  this.formulaform.controls['isActive'].setValue(1)
//   this.formulaform.controls['formulaName'].setValue('formulaName')
// this.formulaform.controls['formulaDescription'].setValue('formulaDescription');
//   this.formulaform.controls['displayName'].setValue('displayName');
//   this.formulaform.controls['effectiveFromDate'].setValue('effectiveFromDate');
//   this.formulaform.controls['effectiveToDate'].setValue('effectiveToDate');
//   this.formulaform.controls['remark'].setValue('remark');
//   this.formulaform.controls['originalFormula'].setValue('originalFormula');
     
let fromDate = new Date(this.formulaform.controls['effectiveFromDate'].value )
let effectiveFromDate = this.datepipe.transform(fromDate , 'yyyy-MM-dd')
 this.formulaform.controls['effectiveFromDate'].setValue(effectiveFromDate + ' 00:00:00')

 let toDate = new Date(this.formulaform.controls['effectiveToDate'].value )
let effectiveToDate = this.datepipe.transform(toDate , 'yyyy-MM-dd')

//  let effectiveToDate = new Date(this.datepipe.transform('yyyy-MM-dd' , this.formulaform.controls['effectiveToDate'].value ))
 this.formulaform.controls['effectiveToDate'].setValue(effectiveToDate + ' 00:00:00')


 this.formulaService.formulamasterSave(this.formulaform.value).subscribe(res => {
    this.alertService.sweetalertMasterSuccess(res.status.messsage, "" );
    this.FormulaMasterDetailsSummery();
    this.formulaform.reset()
    this.editflag = false
    this.viewflag = false
  },
  ( error: any ) => {
    this.alertService.sweetalertError( error["error"]["status"]["message"] );
  })
}

FormulaMasterDetailsSummery(){
  this.formulaService.formulamasterSummery().subscribe(res => {
    this.formulaSummeryData = res.data.results;
    },
  ( error: any ) => {
    this.alertService.sweetalertError( error["error"]["status"]["message"] );
  })
}


formulaSearchList() {
  this.formulaService.getFormulaAllData().subscribe(res => {
    this.formulaData = res.data.results;
    // res.data.results.forEach((element: any) => {
    //   this.formulaData.push({
    //     id: element.keywordId,
    //     name: element.keywordName
    //   })
    // });
    
  });
}

selectEvent(item: any) {
  // do something with selected item
  this.selectedFormula = item.name
  // console.log('selectEvent',item)
  this.formulaform.controls['originalFormula'].setValue(item.name)
}

getFormulaData(value){
  console.log(JSON.stringify(value))
  this.originalFormula = []
  value.forEach(element => {
    this.originalFormula.push(element.keywordName)
  });

}

onChangeSearch(val: string) {
  // fetch remote data from here
  // And reassign the 'data' which is binded to 'data' property.
 // console.log('onChangeSearch',val)
}

onFocused(e: any) {
  // do something when input is focused
  // console.log('onfocused',e)
}

editFormulaSummaryData(data){
  this.editData = data
  //console.log('data',data)
  this.editflag = true;
  this.viewflag = false;
  this.formulaform.enable()
  this.formulaform.patchValue(data)
  this.originalFormula.push(data.originalFormula)
  this.FormulaId = data.formulaId
  this.getDataById()
}

viewSummaryData(data){
  this.editflag = false;
  this.viewflag = true;
  this.formulaform.disable();
  this.originalFormula.push(data.originalFormula)
  this.FormulaId = data.formulaId
  this.formulaform.patchValue(data)
  //console.log("dddddd",data)
}

deleteSummaryData(data){

  this.FormulaId = data.formulaId;

  const formData = new FormData();

  formData.append('FormulaId', this.FormulaId)

  this.formulaService.DeleteById(this.FormulaId).subscribe(res => {
    // this.toster.success("","Keyword Deleted successfully")
    this.alertService.sweetalertMasterSuccess(res.status.messsage, "" );
    this.FormulaMasterDetailsSummery()
   },
   ( error: any ) => {
     this.alertService.sweetalertError( error["error"]["status"]["message"] );
   })
}

getDataById(){
  
  const formData = new FormData();

  formData.append('FormulaId', this.FormulaId)

  this.formulaService.EditByFormulaById(this.FormulaId).subscribe(res => {
   this.formulaDataById = res.data.result;
   this.formulaform.patchValue(this.formulaDataById)
  })
}

updateFormula(){


let fromDate = new Date(this.formulaform.controls['effectiveFromDate'].value )
let effectiveFromDate = this.datepipe.transform(fromDate , 'yyyy-MM-dd')
 this.formulaform.controls['effectiveFromDate'].setValue(effectiveFromDate + ' 00:00:00')

 let toDate = new Date(this.formulaform.controls['effectiveToDate'].value )
let effectiveToDate = this.datepipe.transform(toDate , 'yyyy-MM-dd')

//  let effectiveToDate = new Date(this.datepipe.transform('yyyy-MM-dd' , this.formulaform.controls['effectiveToDate'].value ))
 this.formulaform.controls['effectiveToDate'].setValue(effectiveToDate + ' 00:00:00')


  this.formulaService.UpdateFormula(this.formulaform.value).subscribe(res => {
    // this.toster.success("", "Keyword data updated successfully")
    this.alertService.sweetalertMasterSuccess(res.status.messsage, "" );
    this.FormulaMasterDetailsSummery();
    this.formulaform.reset()
    this.editflag = false
    this.viewflag = false
  },
  ( error: any ) => {
    this.alertService.sweetalertError( error["error"]["status"]["message"] );
  })
}

GetByFormulaName(data){
 
  const formData = new FormData();

  formData.append('formulaName', data.formulaName)

  this.formulaService.GetByFormulaName(data.formulaName).subscribe(res => {
    this.formulaNameData= res.data.results;
    
  },
  ( error: any ) => {
    this.alertService.sweetalertError( error["error"]["status"]["message"] );
  })
}

reset(){
  this.formulaform.reset();
  this.editflag = false;
  this.viewflag = false;
  this.formulaform.enable()
}

}
