// import { Component, OnInit } from '@angular/core';
import { Component, HostListener, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { AlertServiceService } from '../../../../core/services/alert-service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SortEvent } from 'primeng/api';
// import { InvestmentApprovalDocumentRemarkInfo } from '../interfaces/investment-approval-document-remark-info';
// import { InvestmentApprovalEmployeeInfo } from '../interfaces/investment-approval-employee-info';
// import { InvestmentApprovalMasterDocumentInfo } from '../interfaces/investment-approval-master-document-info';
// import { InvestmentApprovalTransactionInfo } from '../interfaces/investment-approval-transaction-info';
import { OnetimeInvestmentsTransactionApprovalService } from './onetime-investments-transaction-approval.service';
import { NumberFormatPipe } from '../../../../core/utility/pipes/NumberFormatPipe';
// import { InvestmentApprovalMasterInfo } from '../interfaces/investment-approval-master-info';



@Component({
  selector: 'app-onetime-investments-transaction-approval',
  templateUrl: './onetime-investments-transaction-approval.component.html',
  styleUrls: ['./onetime-investments-transaction-approval.component.scss']
})
export class OnetimeInvestmentsTransactionApprovalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
