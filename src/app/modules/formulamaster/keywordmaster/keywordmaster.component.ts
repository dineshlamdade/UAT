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

  constructor(private datepipe: DatePipe,private keywordservice: KeywordserviceService,
    private toster: ToastrService,private formulaservice: FormulaServiceService) { }

  ngOnInit() {
    this.KeywordMasterDetailsSummery();
    this.formulaList();
  }

  KeywordMasterDetailsSummery(){
    
    this.keywordservice.KeywordMasterDetailsSummery().subscribe(res =>{
    this.keywordSummeryData = res.data.results;
  })
}

formulaList(){
    
  this.formulaservice.formulamasterSummery().subscribe(res =>{
  this.formulaListData = res.data.results;
})
}

}
