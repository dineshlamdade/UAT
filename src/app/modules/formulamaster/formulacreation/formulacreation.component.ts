import { Component, OnInit } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { TemplateRef} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup } from '@angular/forms';
import { FormulaServiceService } from '../formula-service.service';
import { AlertServiceService } from '../../../core/services/alert-service.service';
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



  constructor(private modalService: BsModalService,private formulaService: FormulaServiceService,
    private alertService: AlertServiceService) {

      this.formulaform = new FormGroup({
      formulaName: new FormControl(""),
      formulaDescription: new FormControl(""),
      originalFormula: new FormControl(""),
      displayName: new FormControl(""),
      effectiveFromDate: new FormControl(""),
      effectiveToDate: new FormControl(""),
      isActive: new FormControl(""),
      remark: new FormControl(""),
      });
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
  
 this.formulaform.controls['isActive'].setValue(1),

  this.formulaService.formulamasterSave(this.formulaform.value).subscribe(res => {
    this.alertService.sweetalertMasterSuccess(res.status.messsage, "" );
    //this.KeywordMasterDetailsSummery();
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
    // this.data = res.data.results;
    res.data.results.forEach((element: any) => {
      this.formulaData.push({
        "id": element.keywordId,
        "name": element.keywordName
      })
    });
  });
}

selectEvent(item: any) {
  // do something with selected item
}

onChangeSearch(val: string) {
  // fetch remote data from here
  // And reassign the 'data' which is binded to 'data' property.
}

onFocused(e: any) {
  // do something when input is focused
}

editFormulaSummaryData(data){
  this.editData = data
  this.editflag = true;
  this.viewflag = false;
  this.formulaform.enable()
  this.formulaform.patchValue(data)
  this.FormulaId = data.FormulaId
  this.getDataById()
}

viewSummaryData(data){
  this.editflag = false;
  this.viewflag = true;
  this.formulaform.disable()
  this.formulaform.patchValue(data)
}

deleteSummaryData(data){
  const formData = new FormData();

  formData.append('FormulaId', this.FormulaId)

  this.formulaService.DeleteById(formData).subscribe(res => {
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

  this.formulaService.EditByFormulaById(formData).subscribe(res => {
   this.formulaDataById = res.data.result;
   this.formulaform.patchValue(this.formulaDataById)
  })
}

updateFormula(){
//   this.formulaform.controls['formulaId'].setValue(this.FormulaId)
//   this.formulaform.controls['isActive'].setValue(1)
//  this.formulaform.controls['nature'].setValue(this.natureValue)
//  this.formulaform.controls['formulaRelation'].setValue('Formula')


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

reset(){
  this.formulaform.reset();
  this.editflag = false;
  this.viewflag = false;
  this.formulaform.enable()
}

}
