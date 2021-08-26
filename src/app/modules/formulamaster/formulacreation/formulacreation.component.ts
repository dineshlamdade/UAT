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

  ngOnInit(): void {
    this.FormulaMasterDetailsSummery()
    
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
    // this.editflag = false
    // this.viewflag = false
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
}
