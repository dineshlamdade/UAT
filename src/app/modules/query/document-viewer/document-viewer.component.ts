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
  listDoc: File[] = [];
  ListOfDocuments: any;

  constructor( private router: Router,
    private modalService: BsModalService,
    public sanitizer: DomSanitizer) {
      if( localStorage.getItem('communicationFormSummary') != null){
      let communicationFormData = JSON.parse(localStorage.getItem('communicationFormSummary'))
      }
     }

  ngOnInit(): void {
  }

  public docViewer(template1: TemplateRef<any>, document: any) {
    //console.log('---in doc viewer--');
    this.ListOfDocuments = document;
    this.urlIndex = 0;
    //document.documents.forEach(element => {
      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
        document.documents[this.urlIndex].queryBlobURI
      );

    //});
    console.log('urlSafe::', this.urlSafe);
    this.modalRef = this.modalService.show(
      template1,
      Object.assign({}, { class: 'gray modal-xl' })
    );
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
