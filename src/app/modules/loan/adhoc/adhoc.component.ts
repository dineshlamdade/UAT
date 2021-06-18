import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoanService } from '../loan.service';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from '../../uploadexcel/uploadexcelhome/excel.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import jspdf from 'jspdf';
import * as _html2canvas from "html2canvas";
import { Router } from '@angular/router';
const html2canvas: any = _html2canvas;

@Component({
  selector: 'app-adhoc',
  templateUrl: './adhoc.component.html',
  styleUrls: ['./adhoc.component.scss']
})
export class AdhocComponent implements OnInit {
  AddLoanForm: FormGroup;
  public modalRef: BsModalRef;
  loanData: any;
  editflag: boolean = false;
  isShown: boolean = true;
  loanTypeData: any;
  isAssetValue: boolean = false;
  loanType: any;
  scheduleData: any;
  loanCode: any;
  noOfInstallment: any;
  installmentAmount: any = 0;
  loanCodeName: any;
  dataOfFootballers: any[];
  documentList: any = [];
  guarantorsList: any;
  getscheduleData: any;
  // minFractionDigits: number;
  public masterfilesArray: File[] = [];
  public urlArray: Array<any> = [];
  public urlIndex: number;
  public urlSafe: SafeResourceUrl;
  approvalData: any;
  carType: boolean = false;
  instituteType: boolean = false;
  EndDate: Date;
  guarantorDataForTable: any;
  empCode: any;
  fullName: string = '';
  excelData: any[];
  guarentedCount: any = [];
  empIndex: any;
  documentIndex: any;
  selectedDoc: any;

  @Input() public data: any;
  @Input() public applyLoanData: any;

  deviationAmount: any;
  deviationIntrest: any;
  deviationNoOfInstallment: any;
  calculatedDeviationAmt: number;
  allowedLoanAmount: number;
  devaiationData: any[] = [];
  deviationVal: number;

  isUploadDocument: boolean = true;
  calculatedDeviationInt: number;
  allowedRateInterest: number;
  calculatedDeviationIntallment: number;
  allowedInstallment: any;
  guarentor: any = [];
  deletedData: any;
  approvalDetailsData: any;
  recoveryAllMethod: any;
  flatIntrestVisible: boolean = false;
  guarantorName: any = [];
  updatedData: any;
  editLoanData: any;
  isVisible: boolean = true;
  isVisiblee: boolean = false;
  isVisibleee:boolean= false;
  viewFlag: boolean = false;
  viewAppNo:boolean = false;
  applicationNo: any;
  applicationDate: any;
  display: boolean;
  // config="{backdrop: static, keyboard: false}";

  constructor(public formBuilder: FormBuilder,
    private router: Router,
    private modalService: BsModalService, public loanservice: LoanService, public toster: ToastrService,
    private datePipe: DatePipe, private excelservice: ExcelService, public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

}
