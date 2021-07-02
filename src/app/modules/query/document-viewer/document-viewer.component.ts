import { Component, OnInit, TemplateRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss']
})
export class DocumentViewerComponent implements OnInit {
  public modalRef: BsModalRef;

  public masterfilesArray: File[] = [];
  public urlArray: Array<any> = [];
  public urlIndex: number;
  public urlSafe: SafeResourceUrl;
  documentList: any = [];
  listDoc: any= [];
  ListOfDocuments: any;
  documentURLIndex: any;

  constructor( private router: Router,
    private modalService: BsModalService,
    public sanitizer: DomSanitizer) {

      if( localStorage.getItem('GetIterationdetailsbyQueryIDData') != null){
      let communicationFormData = JSON.parse(localStorage.getItem('GetIterationdetailsbyQueryIDData'))
      this.listDoc = communicationFormData.documents;
      console.log("this.listDoc",this.listDoc);
      }
      this.openModal(this.listDoc);
     }


     public openModal(documentInformationId:any) {
      // this.documentList = this.masterInfo.masterDetail.documentDetailList;

     this.documentURLIndex = this.listDoc.findIndex(doc=> doc.documentInformationId ==documentInformationId);

    //  this.documentType = this.masterInfo.masterDetail.documentDetailList[this.documentURLIndex].documentType;

    }




  ngOnInit(): void {
  }

  public docViewer(template1: TemplateRef<any>, document: any) {

    this.ListOfDocuments = document;
    this.urlIndex = 0;
      // this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      //  this.listDoc[this.urlIndex].queryBlobURI
      // );

    // this.modalRef = this.modalService.show(
    //   template1,
    //   Object.assign({}, { class: 'gray modal-xl' })
    // );
  }
  // Previous Doc Viewer
  public previousDocViewer() { //not yet used
    this.urlIndex = this.urlIndex - 1;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.ListOfDocuments.documents[this.urlIndex].queryBlobURI
    );
  }

  // Next Doc Viewer
  public nextDocViewer() { //not yet used
  this.urlIndex = this.urlIndex + 1;
  this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
   this.ListOfDocuments.documents[this.urlIndex].queryBlobURI
  );
  }

}
