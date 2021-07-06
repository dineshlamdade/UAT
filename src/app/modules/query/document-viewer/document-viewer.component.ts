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
  documentURLIndex: number;
  queryDocumentId: any;
  documents: any;

  constructor( private router: Router, private modalService: BsModalService,  public sanitizer: DomSanitizer) {


     }



  ngOnInit(): void {
    if( localStorage.getItem('GetIterationdetailsbyQueryIDData') != null){
      let communicationFormData = JSON.parse(localStorage.getItem('GetIterationdetailsbyQueryIDData'))
      this.listDoc = communicationFormData.documents;
      console.log("this.listDoc",this.listDoc);

      this.listDoc.forEach(element => {
        this.queryDocumentId = element.queryDocumentId;
      });
      console.log("this.queryDocumentId",this.queryDocumentId);
      }
      this.openModal(this.queryDocumentId);
  }


  public openModal(queryDocumentId:any) {
    this.documentList = this.listDoc;
    console.log("queryDocumentId",queryDocumentId)
    console.log(" this.documentList", this.documentList)
    console.log(" this.urlSafe", this.urlSafe)
   this.documentURLIndex = this.listDoc.findIndex(doc=> doc.queryDocumentId == queryDocumentId);
   this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
  this.documentList[this.documentURLIndex].queryBlobURI
  );
  console.log(" this.documentURLIndex", this.documentURLIndex)
  console.log(" this.urlSafe", this.urlSafe)

  }

  public docViewer(template1: TemplateRef<any>, index: any) {

    // this.ListOfDocuments = document;
    this.documentURLIndex = index;

      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.listDoc[this.documentURLIndex].queryBlobURI
       );

     this.modalRef = this.modalService.show(
       template1,
       Object.assign({}, { class: 'gray modal-xl' })
     );
  }
  // Previous Doc Viewer
  public previousDocViewer() { //not yet used
    this.urlIndex = this.documentURLIndex - 1;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.listDoc[this.urlIndex].queryBlobURI
    );
  }

  // Next Doc Viewer
  public nextDocViewer() { //not yet used
  this.urlIndex = this.documentURLIndex + 1;
  this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
    this.listDoc[this.urlIndex].queryBlobURI
  );
  }

}
