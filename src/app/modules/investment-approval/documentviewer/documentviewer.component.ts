import { Component, OnInit, TemplateRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { InvestmentApprovalMasterDocumentInfo } from '../interfaces/investment-approval-master-document-info';
import { InvestmentApprovalMasterInfo } from '../interfaces/investment-approval-master-info';
innerHeight
@Component({
  selector: 'app-documentviewer',
  templateUrl: './documentviewer.component.html',
  styleUrls: ['./documentviewer.component.scss']
})
export class DocumentviewerComponent implements OnInit {

  public documentSafeURL: SafeResourceUrl;
  public modalRef: BsModalRef;
  public documentURLIndex: number;
  public documentType: string='';
  public masterInfo: InvestmentApprovalMasterInfo;
  public documentList: InvestmentApprovalMasterDocumentInfo [];
  public documentInformationId: any;

  constructor(
    private router: Router,
    private modalService: BsModalService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    //console.log("getData::",this.router.getCurrentNavigation().extras.state);
    this.masterInfo = JSON.parse(localStorage.getItem("masterInfo"));
    console.log("masterInfo::",this.masterInfo);
    localStorage.removeItem("masterInfo");
    console.log("masterInfo after remove::",localStorage.getItem("masterInfo"));

    this.documentInformationId =localStorage.getItem("documentInformationId");
    console.log("documentInformationId::",this.documentInformationId);
    localStorage.removeItem("documentInformationId");
    console.log("documentInformationId after remove::",localStorage.getItem("documentInformationId"));

    this.openModal(this.documentInformationId);
  }

  public openModal(documentInformationId:any) {
    this.documentList = this.masterInfo.masterDetail.documentDetailList;

   this.documentURLIndex = this.documentList.findIndex(doc=> doc.documentInformationId ==documentInformationId);

   this.documentType =
    this.masterInfo.masterDetail.documentDetailList[this.documentURLIndex].documentType;

  }
  public docViewer(documentViewerTemplate: TemplateRef<any>, index: any) {

    this.documentURLIndex = index;

    this.documentSafeURL = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.masterInfo.masterDetail.documentDetailList[this.documentURLIndex].blobURI
    );
    this.documentType =
    this.masterInfo.masterDetail.documentDetailList[this.documentURLIndex].documentType;

    this.modalRef = this.modalService.show(
      documentViewerTemplate,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }

  public nextDocViewer() {
    this.documentURLIndex = this.documentURLIndex + 1;
    this.documentSafeURL = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.masterInfo.masterDetail.documentDetailList[this.documentURLIndex].blobURI
    );
    this.documentType =
    this.masterInfo.masterDetail.documentDetailList[this.documentURLIndex].documentType;
  }

  public previousDocViewer() {
    this.documentURLIndex = this.documentURLIndex - 1;
    this.documentSafeURL = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.masterInfo.masterDetail.documentDetailList[this.documentURLIndex].blobURI
    );
    this.documentType =
    this.masterInfo.masterDetail.documentDetailList[this.documentURLIndex].documentType;
  }
}
